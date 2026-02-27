const tacticalHexGenerator = {
    // Вспомогательные направления для Pointy-Topped гексов
    dirs: [
        {q: 1, r: 0}, {q: 1, r: -1}, {q: 0, r: -1},
        {q: -1, r: 0}, {q: -1, r: 1}, {q: 0, r: 1}
    ],

    generate(type, cols, rows, data = {}) {
        // 1. Создаем базовую пустую сетку нужного размера
        tacticalHexGrid.initGrid(rows, cols);
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
            grid[k] = { terrain: 'stone', height: 2, content: {type:'obj', obj:'rock'} };
        });

        let q = 0, r = Math.floor(rows/2);
        let tilesToDig = (cols * rows) * (0.45 * coef);

        while (tilesToDig > 0) {
            const key = `${q}_${r}`;
            if (grid[key] && grid[key].terrain === 'stone') {
                grid[key] = { terrain: 'dirt', height: 1, content: null };
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
            grid[k] = { terrain: 'grass', height: 1, content: null };
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
                    grid[k].content = { type: 'obj', obj: 'tree' };
                }
            });
        }
    },

    generateCity(grid, cols, rows, coef = 1) {
        // 1. Сначала всё "пустырем" (плотно утоптанная земля/камень)
        Object.keys(grid).forEach(k => {
            grid[k] = { terrain: 'stone', height: 1, content: null };
        });

        const midR = Math.floor(rows / 2);
        const midQ = 0;

        // 2. ЦИТАДЕЛЬ (Ратуша + Своя стена)
        this.placeSpecialBuilding(grid, midQ, midR, 'town_hall', 1.5); // Высота 1.5 для захода

        // Рисуем кольцо стен вокруг Ратуши (радиус 2)
        const citadelRadius = 2;
        const gatePos = { q: midQ + 2, r: midR }; // ЕДИНСТВЕННЫЙ ВХОД (Ворота на востоке)

        Object.keys(grid).forEach(k => {
            const [q, r] = k.split('_').map(Number);
            const dist = hexFunction.getHexDistance(midQ, midR, q, r);

            if (dist === citadelRadius) {
                if (q === gatePos.q && r === gatePos.r) {
                    grid[k].content = { type: 'obj', obj: 'door', name: 'Citadel Gates' };
                    grid[k].terrain = 'road';
                } else {
                    grid[k].content = { type: 'obj', obj: 'wall' };
                    grid[k].height = 2.5;
                }
            }
        });

        // 3. ХРАМ И РЫНОК (Спецздания)
        // Храм (в одной стороне)
        const templePos = { q: midQ - 6, r: midR - 2 };
        this.placeSpecialBuilding(grid, templePos.q, templePos.r, 'temple', 1.5);

        // Рынок (в другой стороне)
        const marketPos = { q: midQ + 6, r: midR + 2 };
        this.placeSpecialBuilding(grid, marketPos.q, marketPos.r, 'market', 1.1);

        const tavernPos = { q: midQ - 2, r: midR + 6 }; // Размещаем в свободном квартале
        this.placeSpecialBuilding(grid, tavernPos.q, tavernPos.r, 'tavern', 1.3);

        // Логика декора для таверны (внутри placeSpecialBuilding)

        // 4. ГОРОДСКАЯ СТЕНА (По контуру прямоугольника)
        // 1. ОПРЕДЕЛЯЕМ ТОЧКИ ВОРОТ (например, по одной на каждой стороне)
        const gates = {
            top: Math.floor(cols / 2),
            bottom: Math.floor(cols / 2),
            left: Math.floor(rows / 2),
            right: Math.floor(rows / 2)
        };

        Object.keys(grid).forEach(k => {
            const [q, r] = k.split('_').map(Number);
            const r_offset = Math.floor(r / 2);

            // Проверка: является ли гекс краем прямоугольника
            const isTop = (r === 0);
            const isBottom = (r === rows - 1);
            const isLeft = (q === -r_offset);
            const isRight = (q === cols - r_offset - 1);

            if (isTop || isBottom || isLeft || isRight) {
                let isGatePos = false;

                // Проверяем, совпадает ли текущий гекс с выбранной точкой ворот
                if (isTop && q === gates.top - r_offset) isGatePos = true;
                if (isBottom && q === gates.bottom - r_offset) isGatePos = true;
                if (isLeft && r === gates.left) isGatePos = true;
                if (isRight && r === gates.right) isGatePos = true;

                if (isGatePos) {
                    // СТАВИМ ВОРОТА
                    grid[k].terrain = 'road';
                    grid[k].content = { type: 'obj', obj: 'door', name: 'Main Gates' };
                    grid[k].height = 1.2;
                } else {
                    // СТАВИМ ГЛУХУЮ СТЕНУ
                    grid[k].terrain = 'stone';
                    grid[k].content = { type: 'obj', obj: 'wall' };
                    grid[k].height = 2.5;
                }
            }
        });

        // 5. ЖИЛАЯ ЗАСТРОЙКА И ДЕКОР
        Object.keys(grid).forEach(k => {
            const cell = grid[k];
            if (cell.terrain === 'stone' && !cell.content) {
                if (Math.random() < 0.4 * coef) {
                    cell.content = { type: 'obj', obj: 'house' };
                    cell.height = 1.3;
                } else if (Math.random() < 0.1) {
                    const deco = ['well', 'tree', 'lamp'][Math.floor(Math.random()*3)];
                    cell.content = { type: 'obj', obj: deco };
                }
            }
        });

        // // 5. ЖИЛЫЕ КВАРТАЛЫ (Только дома и декор)
        // Object.keys(grid).forEach(k => {
        //     const cell = grid[k];
        //     if (cell.terrain === 'stone' && !cell.content) {
        //         if (Math.random() < 0.5 * coef) {
        //             cell.content = { type: 'obj', obj: 'house' };
        //             cell.height = 1.3;
        //         } else {
        //             // Дворы (декор)
        //             const decoRoll = Math.random();
        //             if (decoRoll < 0.1) cell.content = { type: 'obj', obj: 'well' };
        //             else if (decoRoll < 0.15) cell.content = { type: 'obj', obj: 'tree' };
        //             else if (decoRoll < 0.2) cell.content = { type: 'obj', obj: 'lamp' };
        //         }
        //     }
        // });
    },

    // Вспомогательная функция для крупных зданий
    placeSpecialBuilding(grid, q, r, type, h) {
        const key = `${q}_${r}`;
        if (!grid[key]) return;

        grid[key].content = { type: 'obj', obj: type };
        grid[key].height = h;
        grid[key].terrain = 'road'; // Расчищаем пол

        // Если это рынок — добавим вокруг пару сундуков/прилавков
        if (type === 'market') {
            this.dirs.forEach(d => {
                const nKey = `${q+d.q}_${r+d.r}`;
                if (grid[nKey] && Math.random() > 0.5) {
                    grid[nKey].content = { type: 'obj', obj: 'chest' };
                    grid[nKey].terrain = 'road';
                }
            });
        }
        // if (type === 'tavern') {
        //     this.dirs.forEach(d => {
        //         const nKey = `${q + d.q}_${r + d.r}`;
        //         if (grid[nKey] && Math.random() > 0.4) {
        //             // Ставим бочки или столики (используем существующие спрайты или символы)
        //             grid[nKey].content = { type: 'obj', obj: 'barrel'};
        //             grid[nKey].terrain = 'road';
        //             grid[nKey].height = 1.1; // Низкое препятствие
        //         }
        //     });
        // }
    },
    // placeSpecialBuilding(grid, q, r, type, height) {
    //     const mainKey = `${q}_${r}`;
    //     if (!grid[mainKey]) return;
    //
    //     // Само здание
    //     grid[mainKey].content = { type: 'obj', obj: type };
    //     grid[mainKey].height = height;
    //
    //     // Площадь вокруг здания (расчищаем от домов)
    //     this.dirs.forEach(d => {
    //         const nKey = `${q + d.q}_${r + d.r}`;
    //         if (grid[nKey]) {
    //             grid[nKey].terrain = 'road';
    //             grid[nKey].content = null;
    //         }
    //     });
    // },



    // // --- CITY (Hex Grid Partitioning) ---
    // generateCity(grid, cols, rows, coef) {
    //     Object.keys(grid).forEach(k => {
    //         const [q, r] = k.split('_').map(Number);
    //         // Дороги по осям (проспекты)
    //         if (q === 0 || r === Math.floor(rows/2) || (q + r) === 0) {
    //             grid[k] = { terrain: 'road', height: 1, content: null };
    //         } else {
    //             grid[k] = { terrain: 'stone', height: 1, content: null };
    //             if (Math.random() < 0.3 * coef) {
    //                 grid[k].content = { type: 'obj', obj: 'house' };
    //                 grid[k].height = 1.5;
    //             }
    //         }
    //     });
    // },

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
                grid[k] = { terrain: 'stone', height: 2, content: {type:'obj', obj:'rock'} };
            } else if (wallCount < 2) {
                grid[k] = { terrain: 'dirt', height: 1, content: null };
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
                if (grid[k]) grid[k] = { terrain: 'dirt', height: 1, content: null };
            });
        }
    }
};


// const tacticalFieldGenerator = {
//
//     generate(type, cols, rows, data = {}) {
//         tacticalField.rows = rows;
//         tacticalField.cols = cols;
//
//         let grid = Array.from({ length: rows }, () =>
//             Array.from({ length: cols }, () => ({ terrain: 'stone', height: 2, content: {type:'obj', obj:'wall'} }))
//         );
//
//         switch (type) {
//             case 'cave':
//                 tacticalField.gridData = this.generateCave(grid, cols, rows, data.coef);
//                 grid = this.generateCave(grid, cols, rows, data.coef);
//                 grid = this.smoothCave(grid, cols, rows);
//                 const caves = this.findAllCaves(grid, cols, rows);
//                 if (caves.length > 1) this.connectAllCaves(grid, caves);
//                 break;
//             case 'forest':
//                 grid = this.generateForest(grid, cols, rows, data.coef);
//                 break;
//             case 'city':
//                 grid = this.generateCity(grid, cols, rows, data.coef);
//                 break;
//         }
//
//         this.applyHeightSteps(grid, cols, rows);
//         tacticalField.gridData = grid;
//
//         tacticalField.render();
//     },
//
//     generateCave(grid, cols, rows, coef = 1) {
//         grid = Array.from({ length: rows }, () =>
//             Array.from({ length: cols }, () => ({ terrain: 'stone', height: 2, content: {type:'obj', obj:'rock'} }))
//         );
//         let x = Math.floor(cols / 2), y = Math.floor(rows / 2);
//         let tilesToDig = (cols * rows) * (0.4 * coef); // 40% карты будет полом
//
//         while (tilesToDig > 0) {
//             if (grid[y][x].terrain === 'stone') {
//                 grid[y][x] = { terrain: 'dirt', height: 1, content: null };
//                 tilesToDig--;
//             }
//             // Случайный шаг в одном из 4 направлений
//             const dir = [[0,1],[0,-1],[1,0],[-1,0]][Math.floor(Math.random()*4)];
//             x = Math.max(1, Math.min(cols - 2, x + dir[0]));
//             y = Math.max(1, Math.min(rows - 2, y + dir[1]));
//         }
//
//         return grid;
//     },
//
//     generateForest(grid, cols, rows, coef = 1) {
//         // Заполняем всё травой
//         // 1. Сначала всё травой
//         for(let y=0; y<rows; y++) {
//             for(let x=0; x<cols; x++) {
//                 grid[y][x] = { terrain: 'grass', height: 1, content: null };
//             }
//         }
//
//         // 2. Генерируем "центры рощ"
//         const grovesCount = Math.floor((cols * rows) / (40/coef));
//         for (let i = 0; i < grovesCount; i++) {
//             let cx = Math.floor(Math.random() * cols);
//             let cy = Math.floor(Math.random() * rows);
//
//             // Вокруг центра сажаем группу деревьев
//             for (let dy = -2; dy <= 2; dy++) {
//                 for (let dx = -2; dx <= 2; dx++) {
//                     let nx = cx + dx, ny = cy + dy;
//                     if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
//                         // Чем ближе к центру рощи, тем выше шанс дерева
//                         const dist = Math.sqrt(dx*dx + dy*dy);
//                         if (Math.random() > dist * 0.4) {
//                             grid[ny][nx].content = { type: 'obj', obj: 'tree' };
//                         }
//                     }
//                 }
//             }
//         }
//
//         return grid;
//     },
//
//     generateCity(grid, cols, rows, coef = 1) {
//         const midX = Math.floor(cols / 2);
//         const midY = Math.floor(rows / 2);
//
//         // 1. Сетка дорог (Road Layer)
//         for (let y = 0; y < rows; y++) {
//             for (let x = 0; x < cols; x++) {
//                 // Рисуем сетку дорог каждые 5 клеток
//                 if (x % 5 === 0 || y % 5 === 0 || x === midX || y === midY) {
//                     grid[y][x] = { terrain: 'road', height: 1, content: null };
//                 } else {
//                     grid[y][x] = { terrain: 'stone', height: 1, content: null };
//                 }
//             }
//         }
//
//         // 2. СПЕЦ-ЗДАНИЯ (Центр и Храм)
//         // Мэрия (3x3 в центре)
//         this.drawBuilding(grid, midX - 1, midY - 1, 3, 3, { obj: 'town_hall', height: 1.5 });
//
//         // Храм (3x3 в случайном месте неподалеку от центра)
//         const templeX = midX + (Math.random() > 0.5 ? 6 : -8);
//         const templeY = midY + (Math.random() > 0.5 ? 6 : -8);
//         this.drawBuilding(grid, templeX, templeY, 3, 3, { obj: 'temple', height: 1.5 });
//
//         // 3. ЖИЛАЯ ЗАСТРОЙКА (Residential)
//         const step = 5;
//         for (let y = 1; y < rows; y += step) {
//             for (let x = 1; x < cols; x += step) {
//
//                 // Пропускаем, если это центральная дорога или уже занято спец-зданием
//                 if (grid[y][x].terrain === 'road' || grid[y][x].content) continue;
//
//                 // Плотность застройки через coef
//                 if (Math.random() > 0.4 * coef) continue;
//
//                 // Рандомим размер обычного дома (от 2х2 до 3х3)
//                 const w = 2 + Math.floor(Math.random() * 2);
//                 const h = 2 + Math.floor(Math.random() * 2);
//
//                 this.drawBuilding(grid, x, y, w, h, { obj: 'house', height: 1.5 });
//             }
//         }
//
//         for (let y = 0; y < rows; y++) {
//             for (let x = 0; x < cols; x++) {
//                 const cell = grid[y][x];
//
//                 // Если клетка — пустой камень (двор/пустырь)
//                 if (cell.terrain === 'stone' && !cell.content) {
//                     const roll = Math.random();
//
//                     if (roll < 0.1 * coef) {
//                         // Сажаем дерево
//                         cell.content = { type: 'obj', obj: 'tree', char: '🌳' };
//                     } else if (roll < 0.15 * coef) {
//                         // Ставим ящики или бочки (укрытия)
//                         cell.content = { type: 'obj', obj: 'crate', char: '📦' };
//                         cell.height = 1.2; // Низкое укрытие
//                     } else if (roll < 0.17 * coef) {
//                         // Ставим фонарь или колодец
//                         const isWell = Math.random() > 0.5;
//                         cell.content = {
//                             type: 'obj',
//                             obj: isWell ? 'well' : 'lamp',
//                             char: isWell ? '🕳️' : '🏮'
//                         };
//                     }
//                 }
//             }
//         }
//
//         return grid;
//     },
//
//     drawBuilding(grid, startX, startY, w, h, params) {
//         for (let dy = 0; dy < h; dy++) {
//             for (let dx = 0; dx < w; dx++) {
//                 const ny = startY + dy;
//                 const nx = startX + dx;
//                 if (grid[ny]?.[nx]) {
//                     grid[ny][nx].content = { type: 'obj', obj: params.obj };
//                     grid[ny][nx].height = params.height;
//                     grid[ny][nx].terrain = 'stone'; // Пол внутри
//                 }
//             }
//         }
//     },
//
//     smoothStep(grid, cols, rows) {
//         const newGrid = JSON.parse(JSON.stringify(grid));
//         for(let y = 0; y < rows; y++) {
//             for(let x = 0; x < cols; x++) {
//                 const walls = tacticalFieldGenerator.countWallNeighbors(grid, x, y, cols, rows);
//                 if (walls > 4) newGrid[y][x] = 'wall';
//                 else if (walls < 4) newGrid[y][x] = 'floor';
//             }
//         }
//         return newGrid;
//     },
//
//     countWallNeighbors(grid, x, y, cols, rows) {
//         let count = 0;
//         for(let i = -1; i <= 1; i++) {
//             for(let j = -1; j <= 1; j++) {
//                 if(i === 0 && j === 0) continue;
//                 const ny = y + i, nx = x + j;
//                 if(ny < 0 || nx < 0 || ny >= rows || nx >= cols) count++; // Границы считаем стенами
//                 else if(grid[ny][nx] === 'wall') count++;
//             }
//         }
//         return count;
//     },
//
//     applyHeightSteps(data, cols, rows) {
//         // Проходим по сетке и ищем стыки 1 и 2 высоты, вставляем 1.5
//         for(let y = 1; y < rows - 1; y++) {
//             for(let x = 1; x < cols - 1; x++) {
//                 if (data[y][x].height === 1) {
//                     const hasHighNeighbor = tacticalFieldGenerator.checkNeighborHeight(data, x, y, 2);
//                     if (hasHighNeighbor) data[y][x].height = 1.5;
//                 }
//             }
//         }
//     },
//
//     findAllCaves(data, cols, rows) {
//         const caves = [];
//         const visited = new Set();
//
//         for (let y = 0; y < rows; y++) {
//             for (let x = 0; x < cols; x++) {
//                 const key = `${x},${y}`;
//                 if (data[y][x].terrain !== 'stone' && !visited.has(key)) {
//                     const newCave = mapGenerator.floodFill(data, x, y, visited, cols, rows);
//                     caves.push(newCave);
//                 }
//             }
//         }
//         return caves;
//     },
//
//     checkNeighborHeight(data, x, y, targetHeight) {
//         const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
//         return dirs.some(d => {
//             const ny = y + d[1], nx = x + d[0];
//             return data[ny]?.[nx]?.height === targetHeight;
//         });
//     },
//
//     floodFill(data, x, y, visited, cols, rows) {
//         const cave = [];
//         const stack = [[x, y]];
//         const key = (tx, ty) => `${tx},${ty}`;
//
//         while (stack.length > 0) {
//             const [cx, cy] = stack.pop();
//             const k = key(cx, cy);
//             if (visited.has(k)) continue;
//
//             visited.add(k);
//             cave.push({x: cx, y: cy});
//
//             [[0,1],[0,-1],[1,0],[-1,0]].forEach(d => {
//                 const nx = cx + d[0], ny = cy + d[1];
//                 if (ny >= 0 && ny < rows && nx >= 0 && nx < cols &&
//                     data[ny][nx].terrain !== 'stone' && !visited.has(key(nx, ny))) {
//                     stack.push([nx, ny]);
//                 }
//             });
//         }
//         return cave;
//     },
//
//     smoothCave(grid, cols, rows) {
//         // Работаем с копией, чтобы не брать данные из уже измененных клеток в том же цикле
//         const newGrid = JSON.parse(JSON.stringify(grid));
//
//         for (let y = 1; y < rows - 1; y++) {
//             for (let x = 1; x < cols - 1; x++) {
//                 let wallCount = 0;
//                 // Считаем соседей-стен (8 направлений)
//                 for (let i = -1; i <= 1; i++) {
//                     for (let j = -1; j <= 1; j++) {
//                         if (grid[y + i][x + j].terrain === 'stone') wallCount++;
//                     }
//                 }
//
//                 if (wallCount > 4) {
//                     newGrid[y][x] = { terrain: 'stone', height: 2, content: {type:'obj', obj:'rock'} };
//                 } else {
//                     newGrid[y][x] = { terrain: 'dirt', height: 1, content: null };
//                 }
//             }
//         }
//         return newGrid;
//     },
//
//     connectAllCaves(grid, caves) {
//         for (let i = 0; i < caves.length - 1; i++) {
//             // Берем случайную точку из текущей пещеры и из следующей
//             const start = caves[i][Math.floor(Math.random() * caves[i].length)];
//             const end = caves[i + 1][Math.floor(Math.random() * caves[i + 1].length)];
//
//             let currX = start.x;
//             let currY = start.y;
//
//             // Простое копание коридора "лесенкой"
//             while (currX !== end.x || currY !== end.y) {
//                 if (currX !== end.x) currX += (end.x > currX ? 1 : -1);
//                 else if (currY !== end.y) currY += (end.y > currY ? 1 : -1);
//
//                 grid[currY][currX] = { terrain: 'dirt', height: 1, content: null };
//             }
//         }
//     },
// };


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
