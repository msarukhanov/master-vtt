const hexFunction = {

    getHexDistance(q1, r1, q2, r2) {
        return (Math.abs(q1 - q2) +
            Math.abs(q1 + r1 - q2 - r2) +
            Math.abs(r1 - r2)) / 2;
    },

    // Линейная интерполяция между двумя числами
    lerp(a, b, t) {
        return a + (b - a) * t;
    },

    // Интерполяция между двумя гексами
    hexLerp(q1, r1, q2, r2, t) {
        return {
            q: hexFunction.lerp(q1, q2, t),
            r: hexFunction.lerp(r1, r2, t)
        };
    },

    // Получение всех гексов на линии (Raycasting)
    getLine(q1, r1, q2, r2) {
        const dist = hexFunction.getHexDistance(q1, r1, q2, r2);
        const results = [];
        for (let i = 0; i <= dist; i++) {
            const t = dist === 0 ? 0 : i / dist;
            const { q, r } = hexFunction.hexLerp(q1, r1, q2, r2, t);
            results.push(hexFunction.hexRound(q, r));
        }
        return results;
    },

    hexToPixel(q, r, size) {
        const x = size * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
        const y = size * (3/2 * r);
        return { x, y };
    },

    pixelToHex(x, y, size) {
        const q = (Math.sqrt(3)/3 * x - 1/3 * y) / size;
        const r = (2/3 * y) / size;
        return hexFunction.hexRound(q, r);
    },

    hexRound(q, r) {
        let s = -q - r;
        let rq = Math.round(q);
        let rr = Math.round(r);
        let rs = Math.round(s);
        const qDiff = Math.abs(rq - q), rDiff = Math.abs(rr - r), sDiff = Math.abs(rs - s);
        if (qDiff > rDiff && qDiff > sDiff) rq = -rr - rs;
        else if (rDiff > sDiff) rr = -rq - rs;
        return { q: rq, r: rr };
    },

    getCell(grid, q, r) {
        return grid[`${q}_${r}`] || null;
    },

    getNeighbors(grid, q, r) {
        const directions = [
            {dq: 1, dr: 0}, {dq: 1, dr: -1}, {dq: 0, dr: -1},
            {dq: -1, dr: 0}, {dq: -1, dr: 1}, {dq: 0, dr: 1}
        ];
        const neighbors = [];
        directions.forEach(d => {
            const neighbor = hexFunction.getCell(grid, q + d.dq, r + d.dr);
            if (neighbor) {
                neighbors.push({ q: q + d.dq, r: r + d.dr, data: neighbor });
            }
        });
        return neighbors;
    },

    drawHex(ctx, x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30);
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
    },

    drawHexBase(ctx, x, y, cell, size) {
        ctx.save();

        // TODO light
        // const brightness = cell.light || 1;
        // ctx.filter = `brightness(${brightness})`;

        // Рисуем "тело" гекса с учетом высоты (сдвиг вверх)
        const hShift = ((cell.height || 1) - 1) * 10;
        const drawY = y - hShift;

        if (hShift > 0) {
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            hexFunction.drawHex(ctx, x, y, size);
            ctx.fill();
        }

        hexFunction.drawHex(ctx, x, drawY, size);
        ctx.fillStyle = hexFunction.getTerrainColor(cell.terrain);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.stroke();
        ctx.restore();
    },

    drawFog(ctx, x, y, size) {
        ctx.save();
        hexFunction.drawHex(ctx, x, y, size);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill();
        ctx.restore();
    },

    drawExplored(ctx, x, y, size) {
        ctx.save();
        hexFunction.drawHex(ctx, x, y, size);
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fill();
        ctx.restore();
    },

    drawHexHighlight(ctx, x, y, color, size, lineWidth = 0) {
        ctx.save();
        ctx.beginPath(); // ВАЖНО: Начинаем новый путь специально для этого гекса
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30);
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();

        if (lineWidth > 0) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = lineWidth;
            ctx.stroke(); // Теперь обведет весь гекс целиком
        }
        ctx.restore();
    },

    drawContent(ctx, x, y, content, q, r, size) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (content.type === 'char') {
            hexFunction.drawUnit(ctx, x, y, content, q, r, size); // Твоя текущая функция для персонажей
        }
        else if (content.type === 'obj') {
            hexFunction.drawObject(ctx, x, y, content, q, r, size);
        }
    },

    drawUnit(ctx, x, y, unit, q, r, size) {
        if (map.animatingUnit && map.animatingUnit.q === q && map.animatingUnit.r === r) return;
        if (tacticalMap.animatingUnit && tacticalMap.animatingUnit.q === q && tacticalMap.animatingUnit.r === r) return;

        ctx.save();
        // 1. Рисуем подложку (командный круг), чтобы юнит не сливался с фоном
        ctx.beginPath();
        ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);

        if(unit.team) {
            ctx.fillStyle = tacticalMap.teamColors[unit.team];
            ctx.fill();
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();

        // 2. ОТРИСОВКА ПОРТРЕТА
        // Проверяем наличие загруженного изображения
        if(avatars[unit.id]) {
            if(assets.loadedAvatars[unit.id]) {
                const img = assets.loadedAvatars[unit.id];
                // --- РАСЧЕТ ПРОПОРЦИЙ ---
                const maxSize = size * 1.2; // Максимальный размер внутри гекса
                const ratio = Math.min(maxSize / img.width, maxSize / img.height);
                const newWidth = img.width * ratio;
                const newHeight = img.height * ratio;

                ctx.save();
                // Обрезаем по кругу подложки
                ctx.beginPath();
                ctx.arc(x, y, size * 0.65, 0, Math.PI * 2);
                ctx.clip();

                // Рисуем картинку ровно по центру
                ctx.drawImage(
                    img,
                    x - newWidth / 2,
                    y - newHeight / 2,
                    newWidth,
                    newHeight
                );
                ctx.restore();
            }
            else {
                const img = new Image();
                img.src = avatars[unit.id]; // Твоя строка base64
                img.onload = () => {
                    assets.loadedAvatars[unit.id] = img;
                    hexFunction.drawUnit(ctx, x, y, unit, q, r, size);
                };
                return;
            }
        }
        else {
            ctx.save();
            ctx.font = `${tacticalHexGrid.size}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText(unit.symbol || '👤', x, y);
            ctx.restore();
        }

        // 3. Полоска HP чуть ниже центра
        const barW = size;
        const barH = 4;
        const barY = y + (size * 0.5);

        ctx.fillStyle = "red";
        ctx.fillRect(x - barW/2, barY, barW, barH);
        ctx.fillStyle = "#00ff00";
        const hpPercent = (unit.hpCurrent || unit.hp) / unit.hp;
        ctx.fillRect(x - barW/2, barY, barW * hpPercent, barH);

        ctx.restore();
    },

    drawObject(ctx, x, y, content, q, r, size) {
        ctx.save(); // Сохраняем состояние, чтобы не испортить другие рисунки

        // Отрисовка объектов: Порталы, Трупы, Сундуки
        ctx.font = "30px Arial";
        let icon = '❓';
        icon = tacticalMap.objectIcons[content.obj];
        // if (content.obj === 'portal') icon = '🌀';
        // else if (content.obj === 'corpse') icon = '💀';
        // else if (content.obj === 'chest') icon = '📦';
        // else if (content.obj === 'tree') icon = '🌳';
        // else if (content.obj === 'rock') icon = '🪨';
        // else if (content.obj === 'mountain') icon = '⛰';
        // else if (content.obj === 'water') icon = '💧';
        // else if (content.obj === 'pit') icon = '🕳';
        // else if (content.obj === 'door') icon = '🚪';
        // else if (content.obj === 'wall') icon = '🧱';
        // else if (content.obj === 'town_hall') icon = '🏛';
        // else if (content.obj === 'house') icon = '🏠';
        // else if (content.obj === 'temple') icon = '⛪';
        // else if (content.obj === 'well') icon = '⛲';
        // else if (content.obj === 'lamp') icon = '🏮';

        ctx.fillText(icon, x, y);

        // Если это портал, можно добавить свечение
        if (content.obj === 'portal') {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "cyan";
            ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
            ctx.strokeText(icon, x, y);
        }

        ctx.restore();
    },

    drawCells(ctx, grid, active, sizes, show) {
        const factionCells = {}, terrainCells = {};

        const sortedCells = Object.entries(grid).sort((a, b) => {
            const rA = parseInt(a[0].split('_')[1]);
            const rB = parseInt(b[0].split('_')[1]);
            if (rA !== rB) return rA - rB;
            return parseInt(a[0].split('_')[0]) - parseInt(b[0].split('_')[0]);
        });

        for (const [key, cellData] of sortedCells) {
            const [q, r] = key.split('_').map(Number);
            let { x, y } = hexFunction.hexToPixel(q, r, sizes.size/(sizes.zoom||1));

            if(sizes.bounds) {
                x = (x - sizes.bounds.x) * sizes.zoom;
                y = (y - sizes.bounds.y) * sizes.zoom;
            }

            if(show.fog && active) {

                if (hexFunction.canSee(grid, active, q, r)) {
                    // Рисуем обычный гекс (активная видимость)
                } else if (cellData.explored) {
                    hexFunction.drawExplored(ctx, x, y, sizes.size);
                } else {
                    hexFunction.drawFog(ctx, x, y, sizes.size);
                }

                if(!cellData.explored) {
                    hexFunction.drawHexHighlight(ctx, x, y, "rgba(0,0,0,1)", sizes.size);
                }
                else if(cellData.explored && !hexFunction.canSee(grid, active, q, r)) {
                    cellData.inVision = false;
                    hexFunction.drawHexHighlight(ctx, x, y, "rgba(0,0,0,0.5)", sizes.size);
                }
                else {
                    cellData.inVision = true;
                }
            }

            if (active && cellData.explored) {
                if (active.q === q && active.r === r) {
                    hexFunction.drawHexHighlight(ctx, x, y, "rgba(255, 255, 255, 0.4)", sizes.size, 3); // Выделение
                }
                else if (!active.hasMoved && hexFunction.canReach(grid, active, q, r)) {
                    hexFunction.drawHexHighlight(ctx, x, y, "rgba(0, 255, 0, 0.3)", sizes.size); // Ход
                }
                else if (tacticalMap.canAttack(q, r)) {
                    hexFunction.drawHexHighlight(ctx, x, y, "rgba(255, 0, 0, 0.3)", sizes.size); // Атака
                }
            }

            const hShift = ((cellData.height || 1) - 1) * 5;
            const drawY = (y - hShift);

            // 2. Рисуем "толщину" (боковую грань) для 3D эффекта
            if (hShift > 0) {
                if(show.terrain) {
                    ctx.save(); // Сохраняем состояние для clip
                    hexFunction.drawHex(ctx, x, y + 1, sizes.size);
                    ctx.clip();
                    ctx.fillStyle = "rgba(0,0,0,0.3)";
                    ctx.fill();

                    const terrainImg = assets.terrains[cellData.terrain];
                    if (terrainImg) {
                        ctx.drawImage(terrainImg, x - sizes.width / 2, y - sizes.height / 2, sizes.width, sizes.height);
                    } else {
                        ctx.fillStyle = hexFunction.getTerrainColor(cellData.terrain);
                        ctx.fill();
                    }

                    hexFunction.drawHex(ctx, x, y, sizes.size);
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.fill();
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.restore();
                }
            }

            if(show.terrain) {
                // 3. РИСУЕМ ТЕРРЕЙН (PNG или Цвет)
                ctx.save(); // Сохраняем состояние для clip
                ctx.beginPath();
                hexFunction.drawHex(ctx, x, drawY, sizes.size);
                ctx.clip();

                const terrainImg = assets.terrains[cellData.terrain];
                if (terrainImg) {
                    ctx.drawImage(terrainImg, x - sizes.width / 2, drawY - sizes.height / 2, sizes.width, sizes.height);
                } else {
                    ctx.fillStyle = hexFunction.getTerrainColor(cellData.terrain);
                    ctx.fill();
                }
                ctx.restore(); // Убираем clip
            }

            // 4. РИСУЕМ СЕТКУ (поверх террейна)
            ctx.beginPath();
            hexFunction.drawHex(ctx, x, drawY, sizes.size);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.stroke();

            if (cellData.region && cellData.region !== -1) {
                globalMap.drawRegionBorders(ctx, q, r, cellData.region);
            }

            // 5. РИСУЕМ ИКОНКУ (SVG)
            if (cellData.content) {
                if(cellData.content.type === 'char') {
                    hexFunction.drawUnit(ctx, x, y, cellData.content, q, r, sizes.mapCharSize);
                }
                else {
                    const iconImg = assets.mapIcons[cellData.content];
                    if (iconImg) {
                        const iconSize = sizes.size * 0.6; // Иконка чуть меньше гекса
                        ctx.drawImage(iconImg, x - iconSize / 2, drawY - iconSize / 2, iconSize, iconSize);
                    }
                }
            }

            // if(active && hexFunction.getHexDistance(q, r, active.q, active.r) <= active.visionRadius) {
            //     // 4. Юниты (не рисуем, если юнит в процессе анимации перемещения)
            //     if (cell.content) {
            //         const isTargetOfAnim = tacticalRender.animatingUnit?.q === q && tacticalRender.animatingUnit?.r === r;
            //         // Если это активный юнит и он сейчас анимируется — скрываем его
            //         const isActiveMoving = (active && active.q === q && active.r === r && tacticalRender.animatingUnit);
            //
            //         if (!isTargetOfAnim && !isActiveMoving) {
            //             this.drawContent(x, y, cell.content, q, r);
            //         }
            //     }
            // }

            const selectedAb = tacticalMap.selectedAbility || map.selectedAbility;
            if (active && selectedAb) {
                const distFromCaster = hexFunction.getHexDistance(q, r, active.q, active.r);

                // ЭТАП 1: Подсветка дистанции (ЖЕЛТЫЙ)
                // Показываем все гексы, куда маг может "дострелить"
                if (distFromCaster <= selectedAb.range) {
                    hexFunction.drawHexHighlight(ctx, x, y, "rgba(255, 255, 0, 0.2)", sizes.size);
                }

                // ЭТАП 2: Подсветка цели и AoE (КРАСНЫЙ)
                // Если игрок уже навел курсор или тапнул по конкретной точке
                if (tacticalMap.abilityTarget) {
                    const aoeCells = hexFunction.getAoeCells(
                        tacticalMap.gridData,
                        tacticalMap.activeUnit,
                        tacticalMap.abilityTarget.q,
                        tacticalMap.abilityTarget.r,
                        selectedAb
                    );

                    // Если текущий гекс (q, r) входит в зону поражения выбранной цели
                    if (aoeCells.some(c => c.q === q && c.r === r)) {
                        hexFunction.drawHexHighlight(ctx, x, y, "rgba(255, 0, 0, 0.5)", sizes.size, 2); // Яркий красный с обводкой
                    }
                }
            }



            if(show.yeilds) {
                if (cellData.yield && Object.keys(cellData.yield).length > 0) {
                    ctx.font = "12px Arial";
                    ctx.fillStyle = "white";
                    const firstResId = Object.keys(cellData.yield)[0];
                    const resIcon = data.resources.find(r => r.id === firstResId)?.icon || '💎';
                    ctx.fillText(resIcon, x - 10, y + 15);
                }
            }

            if(show.factions) {
                if (cellData.owner && cellData.owner !== -1) {
                    if (!factionCells[cellData.owner]) factionCells[cellData.owner] = [];
                    factionCells[cellData.owner].push({x, y});
                }
            }
        }

        if(show.factions) {
            ctx.globalAlpha = 0.25;
            for (const ownerId in factionCells) {
                const faction = data.factions.find(f => f.id == ownerId);
                ctx.fillStyle = faction?.color || '#ff0000';
                ctx.beginPath();
                factionCells[ownerId].forEach(pos => {
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 180) * (60 * i - 30);
                        const px = pos.x + sizes.size * Math.cos(angle);
                        const py = pos.y + sizes.size * Math.sin(angle);
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                });
                ctx.fill();
            }
            ctx.globalAlpha = 1.0;
        }
    },

    canReach(grid, active, targetQ, targetR) {
        // Если мы еще не построили облако путей для текущего хода — строим
        // if (!this.currentReachable) {
        //     this.currentReachable = hexFunction.getReachableCells(grid, active);
        // }
        map.currentReachable = hexFunction.getReachableCells(grid, active);
        return map.currentReachable.has(`${targetQ}_${targetR}`);
    },

    findPath(grid, startQ, startR, endQ, endR) {
        const queue = [[{q: startQ, r: startR}]];
        const visited = new Set([`${startQ}_${startR}`]);

        while (queue.length > 0) {
            const path = queue.shift();
            const current = path[path.length - 1];

            if (current.q === endQ && current.r === endR) return path;

            const neighbors = hexFunction.getNeighbors(grid, current.q, current.r);
            for (const n of neighbors) {
                const key = `${n.q}_${n.r}`;
                // Проверка проходимости (та же, что в canReach)
                const canPass = !n.data.content || n.data.content.obj === 'portal';
                const isLiquid = ['water', 'lava', 'pit'].includes(n.data.terrain);

                if (!visited.has(key) && canPass && !isLiquid) {
                    visited.add(key);
                    queue.push([...path, {q: n.q, r: n.r}]);
                }
            }
        }
        return null; // Пути нет
    },

    getReachableCells(grid, active) {
        if (!active) return new Set();

        const reachable = new Set();
        const fringe = [{ q: active.q, r: active.r, dist: 0 }];
        reachable.add(`${active.q}_${active.r}`);

        while (fringe.length > 0) {
            const current = fringe.shift();
            const currentCell = hexFunction.getCell(grid, current.q, current.r);

            if (current.dist < active.currentWalkRange) {
                const neighbors = hexFunction.getNeighbors(grid, current.q, current.r);
                neighbors.forEach(n => {
                    const key = `${n.q}_${n.r}`;
                    if (reachable.has(key)) return;
                    n.data.height = Number((n.data.height || 1));

                    const isObstacle = n.data.content && n.data.content.obj !== 'portal';
                    const isLiquid = ['water', 'lava', 'pit'].includes(n.data.terrain);
                    const heightDiff = Math.abs(n.data.height - currentCell.height);

                    if (!isObstacle && !isLiquid && heightDiff <= 0.5) {
                        reachable.add(key);
                        fringe.push({ q: n.q, r: n.r, dist: current.dist + 1 });
                    }
                });
            }
        }

        return reachable;
    },

    revealFog(grid, active, centerQ, centerR) {
        const centerKey = `${centerQ}_${centerR}`;
        const centerCell = grid[centerKey];
        if (!centerCell) return;

        Object.entries(grid).forEach(([key, cell]) => {
            const [q, r] = key.split('_').map(Number);

            if (hexFunction.canSee(grid, active, q, r)) {
                cell.explored = true;
            }
        });

        hexFunction.updateHex();
    },

    canSee(grid, active, targetQ, targetR) {
        if (!active) return false;

        // 1. Быстрая проверка дистанции
        const dist = hexFunction.getHexDistance(active.q, active.r, targetQ, targetR);
        if (dist > (active.visionRadius || 2)) return false;
        if (dist === 0) return true;

        // 2. Рейкастинг: проверяем все клетки на пути
        const line = hexFunction.getLine(active.q, active.r, targetQ, targetR);

        for (let i = 0; i < line.length - 1; i++) {
            const point = line[i];
            // Пропускаем саму клетку, где стоит юнит
            if (point.q === active.q && point.r === active.r) continue;

            const cell = hexFunction.getCell(grid, point.q, point.r);
            if (!cell) return false;

            // ПРЕПЯТСТВИЯ: если на пути стена или высокая гора
            if (cell.content?.obj === 'wall' || cell.terrain === 'mountain') return false;

            // Высота: если клетка на пути намного выше юнита, она закрывает обзор
            const heightDiff = cell.height - hexFunction.getCell(grid, active.q, active.r).height;
            if (heightDiff >= 1) return false;
        }

        return true;
    },

    getAoeCells(grid, active, tq, tr, ability) {
        if (!active) return [];

        const cells = [];
        const r = ability.aoeRange || 0;

        // Перебираем все гексы поля (для тактики это быстро)
        Object.keys(grid).forEach(key => {
            const [q, r_coord] = key.split('_').map(Number);
            const dist = hexFunction.getHexDistance(tq, tr, q, r_coord);

            let inZone = false;
            if (ability.aoe === 'circle' || ability.aoe === 'square') {
                if (dist <= r) inZone = true;
            }
            else if (ability.aoe === 'none') {
                if (q === tq && r_coord === tr) inZone = true;
            }
            // Для 'conus' на гексах логика сложнее, пока можно оставить circle

            if (inZone) cells.push({ q, r: r_coord });
        });

        return cells;
    },

    executeMove(grid, active, size, zoom, targetQ, targetR) {
        if(!active) return;
        const path = hexFunction.findPath(grid, active.q, active.r, targetQ, targetR);
        if (!path || path.length < 2) return;

        path.shift(); // Убираем текущую клетку

        const step = () => {
            if (path.length === 0 || active.currentWalkRange <= 0) {
                map.currentReachable = null;
                hexFunction.revealFog(grid, active, active.q, active.r);
                if (active.currentWalkRange <= 0) hexFunction.nextTurn();
                return;
            }

            // --- ТОЧКА ОЧИСТКИ ---
            const oldQ = active.q;
            const oldR = active.r;
            const oldKey = `${oldQ}_${oldR}`;

            const nextCell = path.shift();
            const newKey = `${nextCell.q}_${nextCell.r}`;

            // 1. Копируем данные
            const unitData = grid[oldKey].content;

            // 2. СТЕРЕТЬ СТАРУЮ КЛЕТКУ (Явно)
            grid[oldKey].content = null;

            // 3. ЗАПИСАТЬ В НОВУЮ
            grid[newKey].content = unitData;

            const targetCell = grid[newKey];

            if (targetCell.content) {
                const obj = targetCell.content;

                // ЛОГИКА ЛУТА (Сундуки и Трупы)
                if (obj.inventory?.length > 0) {
                    const foundLoot = [...obj.inventory];
                    active.inventory = [...(active.inventory || []), ...foundLoot];
                    obj.inventory = []; // Очищаем, чтобы не лутать вечно
                    console.log(`Подобрано предметов: ${foundLoot.length}`);
                }

                // ЛОГИКА ПОРТАЛА
                if (obj.obj === 'portal') {
                    const tId = obj.targetMapId;
                    const [tQ, tR] = (obj.targetCoords || [0, 0]).map(Number);
                    // Останавливаем пошаговый ход и прыгаем в новую локацию
                    this.switchLocation(tId, tQ, tR);
                    return; // Выход из рекурсии step
                }
            }

            // ЛОГИКА ТРИГГЕРОВ (Диалоги, Урон)
            if (targetCell.event && !targetCell.event.fired) {
                this.handleTrigger(targetCell.event, active);
                if (targetCell.event.once) targetCell.event.fired = true;
            }

            // 4. Обновить координаты в объекте юнита
            active.q = nextCell.q;
            active.r = nextCell.r;
            active.hex = newKey;
            active.currentWalkRange -= 1;

            const startPos = hexFunction.hexToPixel(oldQ, oldR, size / zoom);
            const endPos = hexFunction.hexToPixel(nextCell.q, nextCell.r, size / zoom);
            console.log(startPos, endPos);

            hexFunction.updateHex();

            console.log(grid);

            hexFunction.animateMove(oldQ, oldR, nextCell.q, nextCell.r, startPos, endPos, () => {
                hexFunction.revealFog(grid, active, active.q, active.r);
                step();
            });
        };

        step();
    },

    animateMove(oldQ, oldR, newQ, newR, startPos, endPos, callback) {
        const {gridData, size, mapCharSize, zoom, currentBounds} = hexFunction.data;

        const unitData = gridData[`${newQ}_${newR}`].content;
        if (!unitData) return callback();

        // const startPos = hexFunction.hexToPixel(oldQ, oldR, size);
        // const endPos = hexFunction.hexToPixel(newQ, newR, size);

        const ghost = createEl('div', `ghost-character character tf-team-${unitData.team} selected`);

        // Если есть аватар — используем его, иначе символ
        if (avatars[unitData.id]) {
            const img = new Image();
            img.src = avatars[unitData.id];
            ghost.append(img);
        } else {
            ghost.innerHTML = `<div class="unit-symbol">${unitData.symbol || '👤'}</div>`;
        }

        let offset, padding={x:0,y:0};

        if(tacticalMap.ctx) {
            offset = mapCharSize/4 + size /4;
        }
        else if(regionMap.ctx) {
            offset = (mapCharSize /2);

            const rect = elementById('region-canvas').getBoundingClientRect();
            const parentRect = elementById('map').getBoundingClientRect();
            padding = {
                // x: rect.left - parentRect.left,
                // y: rect.top - parentRect.top
                x: 0,
                y: 0
            };
            console.log(endPos, currentBounds, padding);
            startPos.x = (startPos.x - currentBounds.x) * zoom + padding.x;
            startPos.y = (startPos.y - currentBounds.y) * zoom + padding.y;
            endPos.x = (endPos.x - currentBounds.x) * zoom + padding.x;
            endPos.y = (endPos.y - currentBounds.y) * zoom + padding.y;

            console.log(startPos, endPos);
        }
        else {
            offset = 0;
        }

        Object.assign(ghost.style, {
            position: 'absolute',
            left: `${startPos.x - offset}px`,
            top: `${startPos.y - offset}px`,
            width: `${mapCharSize}px`,
            height: `${mapCharSize}px`,
            zIndex: '1000',
            transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)', // Более плавный ход
            pointerEvents: 'none'
        });

        if(tacticalMap.ctx) {
            tfGrid.appendChild(ghost);
            tacticalMap.animatingUnit = { q: newQ, r: newR };
        }
        else if(regionMap.ctx) {
            // elementById("map").appendChild(ghost);
            elementById('region-wrapper-inner').appendChild(ghost);
            map.animatingUnit = { q: newQ, r: newR };
        }
        else {
            elementById("map").appendChild(ghost);
            map.animatingUnit = { q: newQ, r: newR };
        }

        hexFunction.updateHex();

        requestAnimationFrame(() => {
            ghost.style.left = `${endPos.x - offset}px`;
            ghost.style.top = `${endPos.y - offset}px`;
        });

        setTimeout(()=>{
            ghost.remove();
            map.animatingUnit = null;
            tacticalMap.animatingUnit = null;

            hexFunction.updateHex();

            if (typeof callback === 'function') callback();
        }, 400);
    },

    nextTurn() {
        if(tacticalMap.ctx) {
            tacticalMap.nextTurn();
        }
        else if(regionMap.ctx) {
            // regionMap.update();
        }
        else {
            // globalMap.update();
        }
    },

    updateHex() {
        if(tacticalMap.ctx) {
            tacticalMap.update();
        }
        else if(regionMap.ctx) {
            regionMap.update();
        }
        else {
            globalMap.update();
        }
    },

    updateLighting(grid, active) {
        Object.values(grid).forEach(cell => cell.light = 0.2);

        // 2. Ищем все источники (фонари, факелы, магию)
        Object.entries(grid).forEach(([key, cell]) => {
            if (cell.content?.obj === 'lamp' || cell.content?.lightSource) {
                const [q, r] = key.split('_').map(Number);
                const radius = cell.content.lightRadius || 3;

                // 3. Светим во все стороны, проверяя canSee
                Object.keys(grid).forEach(targetKey => {
                    const [tq, tr] = targetKey.split('_').map(Number);

                    if (hexFunction.canSee(grid, active, q, r)) { // Передаем источник как центр зрения
                        const dist = hexFunction.getHexDistance(q, r, tq, tr);
                        if (dist <= radius) {
                            // Свет затухает с расстоянием
                            const intensity = 1 - (dist / (radius + 1));
                            grid[targetKey].light = Math.max(
                                grid[targetKey].light,
                                intensity + 0.2
                            );
                        }
                    }
                });
            }
        });
    },

    get data() {
        let d;
        if(tacticalMap.ctx) {
            d = tacticalMap;
        }
        else if(regionMap.ctx) {
            d = regionMap;
        }
        else {
            d = map;
        }
        const {gridData, size, mapCharSize, zoom, currentBounds} = d;
        return {gridData, size, mapCharSize, zoom, currentBounds};
    },

    getTerrainColor(t) {
        const colors = { grass: '#4e7c32', stone: '#7a7a7a', water: '#3498db', dirt: '#8b4513' };
        return colors[t] || '#4e7c32';
    }
};