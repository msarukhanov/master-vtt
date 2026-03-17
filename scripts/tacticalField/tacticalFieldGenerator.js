const tacticalHexGenerator = {
    // Вспомогательные направления для Pointy-Topped гексов
    dirs: [
        {q: 1, r: 0}, {q: 1, r: -1}, {q: 0, r: -1},
        {q: -1, r: 0}, {q: -1, r: 1}, {q: 0, r: 1}
    ],

    generate(type, rows, cols, data = {}) {
        // 1. Создаем базовую пустую сетку нужного размера
        tacticalMap.sizes.rows = rows;
        tacticalMap.sizes.cols = cols;
        tacticalMap.initGrid();
        let grid = tacticalMap.gridData;

        // 2. Выбираем алгоритм
        switch (type) {
            case 'cave':
                this.generateCave(grid, cols, rows, data.coef || 1);
                this.smoothCave(grid);
                const caves = this.findAllCaves(grid);
                if (caves.length > 1) this.connectCaves(grid, caves);
                break;
            case 'forest':
                this.generateForest(grid, cols, rows, data.coef || 1);
                break;
            case 'city':
                this.generateCity(grid, cols, rows, data.coef || 1);
                break;
        }

        // 3. Финальные штрихи: высоты и рендер
        this.applyHeightSteps(grid);
        tacticalMap.update();
    },

    // --- CAVE (Drunkard's Walk) ---
    generateCave(grid, cols, rows, coef) {
        // Сначала всё заполняем стеной
        Object.keys(grid).forEach(k => {
            grid[k] = { terrain: 'stone', height: 2, content:{obj: {type:'obj', obj:'rock'}} };
        });

        let q = 0, r = Math.floor(rows/2);
        let tilesToDig = (cols * rows) * (0.45 * coef);

        while (tilesToDig > 0) {
            const key = `${q}_${r}`;
            if (grid[key] && grid[key].terrain === 'stone') {
                grid[key] = { terrain: 'dirt', height: 1, content: {} };
                tilesToDig--;
            }
            const d = this.dirs[Math.floor(Math.random() * 6)];
            q += d.q; r += d.r;

            // Если вылетели за край — возвращаемся в центр
            if (!grid[`${q}_${r}`]) { q = 0; r = Math.floor(rows/2); }
        }
    },

    // --- FOREST (Hex Clustering) ---
    generateForest(grid, cols, rows, coef) {
        Object.keys(grid).forEach(k => {
            grid[k] = { terrain: 'grass', height: 1, content: {} };
        });

        const grovesCount = Math.floor((cols * rows) / (25 / coef));
        for (let i = 0; i < grovesCount; i++) {
            const keys = Object.keys(grid);
            const centerKey = keys[Math.floor(Math.random() * keys.length)];
            const [cq, cr] = centerKey.split('_').map(Number);

            // Сажаем деревья в радиусе 2 гексов
            Object.keys(grid).forEach(k => {
                const [q, r] = k.split('_').map(Number);
                const dist = hexFunctionhexFunction.getHexDistance(cq, cr, q, r);
                if (dist <= 2 && Math.random() > dist * 0.35) {
                    grid[k].content.obj = { type: 'obj', obj: 'tree' };
                }
            });
        }
    },

    generateCity(grid, cols, rows, coef = 1) {

        const baseTerrain = 'stoneRoad';

        const allKeys = Object.keys(grid);
        allKeys.forEach(k => {
            const [q, r] = k.split('_').map(Number);
            grid[k] = { q, r, terrain: baseTerrain, height: 1, content: {} };
        });

        // 1. ГЕОМЕТРИЯ
        const qs = allKeys.map(k => parseInt(k.split('_')[0]));
        const rs = allKeys.map(k => parseInt(k.split('_').pop()));
        const minQ = Math.min(...qs), maxQ = Math.max(...qs);
        const minR = Math.min(...rs), maxR = Math.max(...rs);
        const midR = Math.floor((minR + maxR) / 2);

        const midRowQs = allKeys.filter(k => k.endsWith(`_${midR}`)).map(k => parseInt(k.split('_')));
        const midQ = Math.floor((Math.min(...midRowQs) + Math.max(...midRowQs)) / 2);
        const center = { q: midQ, r: midR };


        const cityRadius = Math.max(maxQ - minQ, maxR - minR) / 2;
        // Функция-помощник для генерации точки на % от радиуса
        const getPosByRadius = (center, minPercent, maxPercent) => {
            const minDist = Math.floor(cityRadius * minPercent);
            const maxDist = Math.floor(cityRadius * maxPercent);
            const dist = Math.floor(Math.random() * (maxDist - minDist + 1)) + minDist;

            const angle = Math.random() * Math.PI * 2;
            // Примерный перевод полярных координат в гексагональные (упрощенно)
            const dq = Math.round(dist * Math.cos(angle));
            const dr = Math.round(dist * Math.sin(angle));

            return { q: center.q + dq, r: center.r + dr };
        };

        const points = {
            city: center,
            // townhall: { q: midQ + 1, r: midR - 1 }, // Добавили Ратушу рядом с центром
            // church: { q: midQ - 6, r: midR - 3 },
            // tavern: { q: midQ + 6, r: midR + 3 },
            // inn: { q: midQ - 2, r: midR + 6 },
            // castle: { q: midQ + 4, r: midR - 4 },
            // jailhouse: { q: midQ - 7, r: midR + 3 },
            // blacksmith: { q: midQ + 2, r: midR + 4 },
            // stable: { q: midQ + 7, r: midR - 2 },
            // graveyard: { q: midQ - 8, r: midR - 5 },
            // warehouse: { q: midQ + 5, r: midR - 1 } // Добавили Склад

            // Внутреннее кольцо (0-20% от радиуса)
            townhall: getPosByRadius(center, 0.1, 0.2),
            warehouse: getPosByRadius(center, 0.15, 0.3),

            // Торгово-ремесленный пояс (30-50% от радиуса)
            blacksmith: getPosByRadius(center, 0.3, 0.5),
            tavern: getPosByRadius(center, 0.3, 0.5),
            inn: getPosByRadius(center, 0.4, 0.6),
            stable: getPosByRadius(center, 0.4, 0.6),

            // Окраины и спецобъекты (60-85% от радиуса)
            castle: getPosByRadius(center, 0.6, 0.8),
            church: getPosByRadius(center, 0.5, 0.7),
            jailhouse: getPosByRadius(center, 0.7, 0.9),
            graveyard: getPosByRadius(center, 0.8, 0.95)
        };

        // --- НОВОЕ: ЦЕНТРАЛЬНАЯ ПЛОЩАДЬ ---
        allKeys.forEach(k => {
            const cell = grid[k];
            const d = hexFunction.getHexDistance(cell.q, cell.r, center.q, center.r);
            if (d <= 2) {
                cell.terrain = 'mud'; // Расчищаем площадь
                if (d > 0 && Math.random() < 0.2) cell.content.obj = { type: 'obj', obj: 'lamp' };
            }
        });

        // 2. СТЕНЫ: БАШНИ ПО ВСЕМУ СЕВЕРУ И ЮГУ
        const gateList = [];
        allKeys.forEach(k => {
            const cell = grid[k];
            const { q, r } = cell;
            const neighbors = [{q:1,r:0},{q:1,r:-1},{q:0,r:-1},{q:-1,r:0},{q:-1,r:1},{q:0,r:1}]
                .filter(off => grid[`${q+off.q}_${r+off.r}`]).length;

            if (neighbors < 6) {
                const rowKeys = allKeys.filter(key => key.endsWith(`_${r}`));
                const qs = rowKeys.map(key => parseInt(key.split('_')));
                const isSideEdge = (q === Math.min(...qs) || q === Math.max(...qs));
                const isVerticalEdge = (r === minR || r === maxR);

                // ВОРОТА
                const isMidGate = (r === midR && isSideEdge) ||
                    (isVerticalEdge && q === Math.floor((Math.min(...qs) + Math.max(...qs)) / 2));

                if (isMidGate) {
                    cell.terrain = 'mud';
                    cell.content.obj = { type: 'obj', obj: 'door', name: 'Gates' };
                    gateList.push({ q, r });
                }
                // БАШНИ: Весь север, весь юг и углы запада/востока
                else if ((isVerticalEdge && (q % 2 === 0)) || (isSideEdge && (r % 2 === 0))) {
                    cell.terrain = 'stoneWall';
                    cell.content.obj = { type: 'obj', obj: 'tower' };
                    cell.height = 6.5;
                } else {
                    cell.terrain = 'stoneWall';
                    cell.content.obj = null;
                    cell.height = 5.5;
                }
            }
        });

        const makeStreet = (start, end) => {
            let curr = { ...start };
            for (let i = 0; i < 30; i++) { // Увеличили лимит шагов для углов
                const dist = hexFunction.getHexDistance(curr.q, curr.r, end.q, end.r);
                if (dist === 0) break;
                let best = null, minDist = Infinity;
                [{q:1,r:0},{q:1,r:-1},{q:0,r:-1},{q:-1,r:0},{q:-1,r:1},{q:0,r:1}].forEach(off => {
                    const n = { q: curr.q + off.q, r: curr.r + off.r };
                    if (!grid[`${n.q}_${n.r}`]) return;
                    if (grid[`${n.q}_${n.r}`].terrain === 'stoneWall') return;
                    if (grid[`${n.q}_${n.r}`].content.obj) return;
                    const d = hexFunction.getHexDistance(n.q, n.r, end.q, end.r);
                    if (d < minDist) { minDist = d; best = n; }
                });
                if (!best) break;
                curr = best;
                grid[`${curr.q}_${curr.r}`].terrain = 'mud';
            }
        };

        // --- ЛОГИКА ЗАПОЛНЕНИЯ УГЛОВ ---
        // Находим 4 экстремальные точки (Углы Башен)
        const corners = [
            {q: minQ+3, r: minR+3}, // Верх-Лево
            {q: maxQ-2, r: minR+3}, // Верх-Право
            {q: minQ+3, r: maxR-2}, // Низ-Лево
            {q: maxQ-2, r: maxR-2}  // Низ-Право
        ];

        // // Тянем дороги из каждого угла в центр — это "прошьет" город насквозь
        // corners.forEach(c => {
        //     const startNode = allKeys.map(k => grid[k])
        //         .sort((a,b) => hexFunction.getHexDistance(a.q, a.r, c.q, c.r) - hexFunction.getHexDistance(b.q, b.r, c.q, c.r))[0];
        //
        //     if (startNode) makeStreet({q: startNode.q, r: startNode.r}, center);
        // });

        // --- КОЛЬЦЕВАЯ СВЯЗЬ (Соединяем все здания в цепочку) ---
        const allPoints = Object.values(points);
        for (let i = 0; i < allPoints.length; i++) {
            makeStreet(allPoints[i], allPoints[(i + 1) % allPoints.length]);
        }

        console.log(gateList, corners);
        gateList.forEach(g => makeStreet(g, center));
        corners.forEach(g => makeStreet(g, center));
        // corners.forEach(c => {
        //
        // });

        // 4. СТАВИМ ГЛАВНЫЕ ЗДАНИЯ
        Object.entries(points).forEach(([type, pos]) => {
            this.placeSpecialBuilding(grid, pos.q, pos.r, type, 1.5, baseTerrain);
        });

        // 5. ДИНАМИЧЕСКОЕ ЗОНИРОВАНИЕ (РАЙОНЫ)
        allKeys.forEach(k => {
            const cell = grid[k];
            if (cell.terrain === baseTerrain && !cell.content.obj) {
                const dToTemple = hexFunction.getHexDistance(cell.q, cell.r, points.church.q, points.church.r);
                const dToPrison = hexFunction.getHexDistance(cell.q, cell.r, points.jailhouse.q, points.jailhouse.r);
                const dToCenter = hexFunction.getHexDistance(cell.q, cell.r, center.q, center.r);

                // НОВЫЕ ДИСТАНЦИИ
                const dToBlacksmith = hexFunction.getHexDistance(cell.q, cell.r, points.blacksmith.q, points.blacksmith.r);
                const dToGraveyard = hexFunction.getHexDistance(cell.q, cell.r, points.graveyard.q, points.graveyard.r);
                const dToStable = hexFunction.getHexDistance(cell.q, cell.r, points.stable.q, points.stable.r);
                const dToWarehouse = hexFunction.getHexDistance(cell.q, cell.r, points.warehouse.q, points.warehouse.r);

                // А) ЭЛИТНЫЙ РАЙОН (У Храма)
                if (dToTemple < 4) {
                    const roll = Math.random();
                    if (roll < 0.6) cell.content.obj = { type: 'obj', obj: 'house' };
                    else {
                        cell.content.obj = { type: 'obj', obj: ['flowers', 'bench', 'garden', 'fountain', 'statue1','obelisk'][Math.floor(Math.random()*5)] };
                        cell.terrain = 'grass';
                    }
                }
                // Б) ТРУЩОБЫ (У Тюрьмы)
                else if (dToPrison < 4) {
                    const roll = Math.random();
                    if (roll < 0.8) cell.content.obj = { type: 'obj', obj: 'house' };
                    else cell.content.obj = { type: 'obj', obj: ['barrel', 'bones', 'well'][Math.floor(Math.random()*3)] };
                }
                // В) ПРОМЗОНА И СКЛАДЫ
                else if (dToBlacksmith < 3 || dToWarehouse < 3) {
                    const roll = Math.random();
                    if (roll < 0.5) cell.content.obj = { type: 'obj', obj: 'house' };
                    else {
                        cell.content.obj = { type: 'obj', obj: ['barrel', 'crate', 'wagon', 'crate'][Math.floor(Math.random()*4)] };
                        cell.terrain = baseTerrain;
                    }
                }
                // Г) ОБЫЧНЫЙ ГОРОД / КЛАДБИЩЕ / КОНЮШНЯ (Твоя логика без изменений)
                else if (dToGraveyard < 3) {
                    const roll = Math.random();
                    if (roll < 0.7) {
                        cell.content.obj = { type: 'obj', obj: ['graveyard', 'mausoleum'][Math.floor(Math.random()*2)] };
                        cell.terrain = 'grass';
                    } else {
                        cell.content.obj = { type: 'obj', obj: 'tree' };
                        cell.terrain = 'grass';
                    }
                }
                else if (dToStable < 3) {
                    const roll = Math.random();
                    if (roll < 0.4) cell.content.obj = { type: 'obj', obj: 'house' };
                    else {
                        cell.content.obj = { type: 'obj', obj: ['haycock', 'wagon', 'barrel'][Math.floor(Math.random()*3)] };
                        cell.terrain = 'dirt';
                    }
                }
                else {
                    if (Math.random() < (0.9 - dToCenter * 0.04)) {
                        cell.content.obj = { type: 'obj', obj: 'house' };
                    } else {
                        const deco = ['tree', 'tree', 'tree', 'lamp', 'well', 'sign'][Math.floor(Math.random()*7)];
                        cell.content.obj = { type: 'obj', obj: deco };
                        if (deco === 'tree') cell.terrain = 'grass';
                    }
                }
            }
        });
    },

    placeSpecialBuilding(grid, q, r, type, h, baseTerrain) {
        const key = `${q}_${r}`;
        if (!grid[key]) return;

        grid[key].content.obj = { type: 'obj', obj: type };
        grid[key].height = h;
        grid[key].terrain = baseTerrain; // Расчищаем пол

        if (type === 'tavern') {
            this.dirs.forEach(d => {
                const nKey = `${q+d.q}_${r+d.r}`;
                if (grid[nKey] && Math.random() > 0.5) {
                    grid[nKey].content.obj = { type: 'obj', obj: 'tent'};
                    grid[nKey].terrain = 'mud';
                }
            });
        }
    },

    // --- Вспомогательные функции ---
    smoothCave(grid) {
        const copy = JSON.parse(JSON.stringify(grid));
        Object.keys(grid).forEach(k => {
            const [q, r] = k.split('_').map(Number);
            let wallCount = 0;
            this.dirs.forEach(d => {
                const n = grid[`${q+d.q}_${r+d.r}`];
                if (!n || n.terrain === 'stone') wallCount++;
            });

            if (wallCount >= 4) {
                grid[k] = { terrain: 'stone', height: 2, content: {obj:{type:'obj', obj:'rock'}}};
            } else if (wallCount < 2) {
                grid[k] = { terrain: 'dirt', height: 1, content: {} };
            }
        });
    },

    applyHeightSteps(grid) {
        Object.keys(grid).forEach(k => {
            if (grid[k].height === 1) {
                const [q, r] = k.split('_').map(Number);
                const hasHigh = this.dirs.some(d => {
                    const n = grid[`${q+d.q}_${r+d.r}`];
                    return n && n.height >= 2;
                });
                if (hasHigh) grid[k].height = 1.5;
            }
        });
    },

    findAllCaves(grid) {
        const caves = [];
        const visited = new Set();
        Object.keys(grid).forEach(k => {
            if (grid[k].terrain !== 'stone' && !visited.has(k)) {
                const cave = [];
                const stack = [k];
                while (stack.length > 0) {
                    const currKey = stack.pop();
                    if (visited.has(currKey)) continue;
                    visited.add(currKey);
                    const [cq, cr] = currKey.split('_').map(Number);
                    cave.push({q: cq, r: cr});
                    this.dirs.forEach(d => {
                        const nKey = `${cq+d.q}_${cr+d.r}`;
                        if (grid[nKey] && grid[nKey].terrain !== 'stone') stack.push(nKey);
                    });
                }
                caves.push(cave);
            }
        });
        return caves;
    },

    connectCaves(grid, caves) {
        for (let i = 0; i < caves.length - 1; i++) {
            const start = caves[i][0];
            const end = caves[i+1][0];

            const tunnel = hexFunction.getLine(start.q, start.r, end.q, end.r);
            tunnel.forEach(p => {
                const k = `${p.q}_${p.r}`;
                if (grid[k]) grid[k] = { terrain: 'dirt', height: 1, content: {} };
            });
        }
    }
};


const hexGenUtils = {
    // 6 фиксированных направлений для Pointy-Topped гексов
    getDirs() {
        return [
            {q: 1, r: 0}, {q: 1, r: -1}, {q: 0, r: -1},
            {q: -1, r: 0}, {q: -1, r: 1}, {q: 0, r: 1}
        ];
    },

    countNeighbors(gridData, q, r, type = 'stone') {
        let count = 0;
        this.getDirs().forEach(d => {
            const key = `${q + d.q}_${r + d.r}`;
            if (!gridData[key] || gridData[key].terrain === type) count++;
        });
        return count;
    }
};
