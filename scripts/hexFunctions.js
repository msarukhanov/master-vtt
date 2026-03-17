

const hexFunction = {

    getHexDistance(q1, r1, q2, r2) {
        return (Math.abs(q1 - q2) +
            Math.abs(q1 + r1 - q2 - r2) +
            Math.abs(r1 - r2)) / 2;
    },

    lerp(a, b, t) {
        return a + (b - a) * t;
    },

    hexLerp(q1, r1, q2, r2, t) {
        return {
            q: hexFunction.lerp(q1, q2, t),
            r: hexFunction.lerp(r1, r2, t)
        };
    },

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

    hexToPixel(q, r) {
        const {sizes:{cellSize}, camera:{zoom, angleY}} = hexFunction.data;
        const x = cellSize * zoom * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
        const y = cellSize * zoom * (3/2 * r) * angleY;
        return { x, y };
    },

    pixelToHex(x, y, offsetX = 0, offsetY = 0) {
        const {sizes:{cellSize}, camera:{zoom, angleY}} = hexFunction.data;
        // 1. Учитываем смещение камеры и текущий масштаб
        // let q = ((Math.sqrt(3) / 3 * (x - offsetX)) - (1 / 3 * (y - offsetY))) / (cellSize * zoom);
        // let r = (2 / 3 * (y / angleY - offsetY)) / (cellSize * zoom);

        const _x = (x - offsetX) / (cellSize * zoom);
        const _y = ((y - offsetY) / angleY) / (cellSize * zoom); // корректируем наклон здесь

        // 2. Стандартная матрица для Pointy-Top гексов (гекс углом вверх)
        let q = (Math.sqrt(3) / 3 * _x) - (1 / 3 * _y);
        let r = (2 / 3 * _y);

        return hexFunction.hexRound(q + 0.000001, r + 0.000001);
    },

    hexRound(q, r) {
        let s = -q - r;
        let rq = Math.round(q);
        let rr = Math.round(r);
        let rs = Math.round(s);

        let q_diff = Math.abs(rq - q);
        let r_diff = Math.abs(rr - r);
        let s_diff = Math.abs(rs - s);

        if (q_diff > r_diff && q_diff > s_diff) {
            rq = -rr - rs;
        } else if (r_diff > s_diff) {
            rr = -rq - rs;
        }
        return { q: rq, r: rr };
    },

    getCell(q, r) {
        const {gridData} = hexFunction.data;
        return gridData[`${q}_${r}`] || null;
    },

    isNeighbor(q1, r1, q2, r2) {
        const directions = [
            {dq: 1, dr: 0}, {dq: 1, dr: -1}, {dq: 0, dr: -1},
            {dq: -1, dr: 0}, {dq: -1, dr: 1}, {dq: 0, dr: 1}
        ];
        let check = false;
        directions.forEach(d => {
            if((q1 + d.dq) === q2 && (r1 + d.dr)===r2) check = true;
        });
        return check;
    },

    getNeighbors(q, r) {
        const directions = [
            {dq: 1, dr: 0}, {dq: 1, dr: -1}, {dq: 0, dr: -1},
            {dq: -1, dr: 0}, {dq: -1, dr: 1}, {dq: 0, dr: 1}
        ];
        const neighbors = [];
        directions.forEach(d => {
            const neighbor = hexFunction.getCell(q + d.dq, r + d.dr);
            if (neighbor) {
                neighbors.push({ q: q + d.dq, r: r + d.dr, data: neighbor });
            }
        });
        return neighbors;
    },

    getHexesInRadius(centerQ, centerR, radius) {
        const results = [];
        for (let q = -radius; q <= radius; q++) {
            for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
                const targetQ = centerQ + q;
                const targetR = centerR + r;
                results.push(`${targetQ}_${targetR}`);
            }
        }
        return results;
    },

    drawHex(x, y, noPath = false) {
        const {ctx, sizes:{cellSize}, camera:{zoom, angleY}} = hexFunction.data;
        if(!noPath) ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30);
            const px = x + cellSize * zoom * Math.cos(angle);
            const py = y + cellSize * zoom * Math.sin(angle)*angleY;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        if(!noPath) ctx.closePath();
    },

    drawGrid(x, y, lineWidth = 2) {
        const {ctx} = hexFunction.data;
        ctx.lineWidth = lineWidth;
        hexFunction.drawHex(x, y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.stroke();
    },

    // drawTerrain(x, y, terrain) {
    //     const {ctx, sizes, camera:{zoom}} = hexFunction.data;
    //     ctx.save();
    //     hexFunction.drawHex(x, y);
    //     ctx.clip();
    //
    //     const terrainImg = assets.terrains[terrain];
    //     if (terrainImg) {
    //         ctx.drawImage(terrainImg, x, y, sizes.width, sizes.height*angleY);
    //
    //     } else {
    //         ctx.fillStyle = hexFunction.getTerrainColor(terrain);
    //         ctx.fill();
    //     }
    //     ctx.restore();
    // },

    drawTerrain(x, y, terrain) {
        const {ctx, sizes, camera:{zoom, angleY}} = hexFunction.data;
        const terrainImg = assets.terrains[terrain];

        ctx.save();

        // 1. Создаем маску (чтобы трава не вылезала за края гекса)
        hexFunction.drawHex(x, y);
        ctx.clip();

        if (terrainImg) {
            // 2. Считаем актуальные размеры с учетом зума и сжатия angleY
            const w = sizes.width * zoom;
            const h = sizes.height * zoom * angleY;

            // 3. Рисуем картинку, центрируя её (вычитаем половину размера из центра x, y)
            ctx.drawImage(
                terrainImg,
                x - w / 2,
                y - h / 2,
                w,
                h
            );

        } else {
            // Фоллбек, если картинка не загрузилась
            ctx.fillStyle = hexFunction.getTerrainColor(terrain);
            ctx.fill();
        }

        ctx.restore();
    },


    drawFog(x, y, q, r) {
        const {ctx, gridData, activeUnit, sizes} = hexFunction.data;

        const isExplored = currentSeason.exploredCells[activeUnit.id] && currentSeason.exploredCells[activeUnit.id][`${q}_${r}`];
        const dist = hexFunction.getHexDistance(activeUnit.q, activeUnit.r, q, r);
        let inActiveVision = (dist <= (activeUnit.visionRadius || 2)) && hexFunction.canSee(q, r);

        if (inActiveVision) {

        } else if (isExplored) {
            hexFunction.drawHexHighlight(x, y, "rgba(0,0,0,0.5)");
        } else {
            hexFunction.drawHexHighlight(x, y, "rgba(0,0,0,1)");
        }
        return {
            isExplored
        }
    },

    drawExplored(x, y) {
        const {ctx} = hexFunction.data;
        ctx.save();
        hexFunction.drawHex(x, y);
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fill();
        ctx.restore();
    },

    drawHexHighlight(x, y, color, lineWidth = 0) {
        const {ctx} = hexFunction.data;
        ctx.save();
        hexFunction.drawHex(x, y);
        ctx.fillStyle = color;
        ctx.fill();
        if (lineWidth > 0) {
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
        ctx.restore();
    },

    drawRegionBorders(q, r, regionId) {
        const {ctx, gridData, sizes:{cellSize}, camera:{zoom, angleY}} = hexFunction.data;
        const center = hexFunction.hexToPixel(q, r);

        // 6 направлений соседей для Pointy Topped гекса
        const neighbors = [
            {dq: 1, dr: 0},  {dq: 0, dr: 1},  {dq: -1, dr: 1},
            {dq: -1, dr: 0}, {dq: 0, dr: -1}, {dq: 1, dr: -1}
        ];

        ctx.save();
        ctx.strokeStyle = "#FFFFFF"; // Белая внешняя граница
        ctx.lineWidth = 2;           // Сделаем жирнее для наглядности
        ctx.lineCap = "round";

        neighbors.forEach((dir, i) => {
            const nKey = `${q + dir.dq}_${r + dir.dr}`;
            const neighbor = gridData[nKey];
            const neighborRegion = neighbor ? neighbor.region : -1;

            // ВАЖНО: Рисуем грань, только если ID регионов РАЗНЫЕ
            // Это создаст общую внешнюю контурную линию для всей группы гексов
            if (neighborRegion !== regionId) {
                // Углы гекса для каждой грани (i и i+1)
                const angle1 = (Math.PI / 180) * (60 * i - 30);
                const angle2 = (Math.PI / 180) * (60 * (i + 1) - 30);

                ctx.beginPath();
                ctx.moveTo(center.x + cellSize * zoom * Math.cos(angle1), center.y + cellSize * zoom * Math.sin(angle1)*angleY);
                ctx.lineTo(center.x + cellSize * zoom * Math.cos(angle2), center.y + cellSize * zoom * Math.sin(angle2)*angleY);
                ctx.stroke();
            }
        });
        ctx.restore();
    },

    drawProvinceBorders(q, r, provinceId) {
        const {ctx, gridData, sizes:{cellSize}, camera:{zoom, angleY}} = hexFunction.data;
        const center = hexFunction.hexToPixel(q, r);

        // 6 направлений соседей для Pointy Topped гекса
        const neighbors = [
            {dq: 1, dr: 0},  {dq: 0, dr: 1},  {dq: -1, dr: 1},
            {dq: -1, dr: 0}, {dq: 0, dr: -1}, {dq: 1, dr: -1}
        ];

        ctx.save();
        ctx.strokeStyle = "#ffff00"; // Белая внешняя граница
        ctx.lineWidth = 1;           // Сделаем жирнее для наглядности
        ctx.lineCap = "round";

        neighbors.forEach((dir, i) => {
            const nKey = `${q + dir.dq}_${r + dir.dr}`;
            const neighbor = gridData[nKey];
            const neighborRegion = neighbor ? neighbor.provinceId : -1;

            // ВАЖНО: Рисуем грань, только если ID регионов РАЗНЫЕ
            // Это создаст общую внешнюю контурную линию для всей группы гексов
            if (neighborRegion !== provinceId) {
                // Углы гекса для каждой грани (i и i+1)
                const angle1 = (Math.PI / 180) * (60 * i - 30);
                const angle2 = (Math.PI / 180) * (60 * (i + 1) - 30);

                ctx.beginPath();
                ctx.moveTo(center.x + cellSize * zoom * Math.cos(angle1), center.y + cellSize * zoom * Math.sin(angle1)*angleY);
                ctx.lineTo(center.x + cellSize * zoom * Math.cos(angle2), center.y + cellSize * zoom * Math.sin(angle2)*angleY);
                ctx.stroke();
            }
        });
        ctx.restore();
    },

    drawFactionBorders(q, r, factionId) {
        const {ctx, gridData, sizes:{cellSize}, camera:{zoom, angleY}} = hexFunction.data;
        const center = hexFunction.hexToPixel(q, r);
        const faction = data.factions.find(f => f.id === factionId);
        const size = cellSize * zoom - 1;

        // 6 направлений соседей для Pointy Topped гекса
        const neighbors = [
            {dq: 1, dr: 0},  {dq: 0, dr: 1},  {dq: -1, dr: 1},
            {dq: -1, dr: 0}, {dq: 0, dr: -1}, {dq: 1, dr: -1}
        ];

        ctx.save();
        ctx.strokeStyle = faction.color; // Белая внешняя граница
        ctx.lineWidth = 2;           // Сделаем жирнее для наглядности
        ctx.lineCap = "round";

        neighbors.forEach((dir, i) => {
            const nKey = `${q + dir.dq}_${r + dir.dr}`;
            const neighbor = gridData[nKey];
            let faction = -1;
            if(neighbor && neighbor.provinceHex) {
                faction = gridData[neighbor.provinceHex].faction;
            }
            // const neighborRegion = neighbor ? neighbor.faction : -1;

            if (faction !== factionId) {
                // Углы гекса для каждой грани (i и i+1)
                const angle1 = (Math.PI / 180) * (60 * i - 30);
                const angle2 = (Math.PI / 180) * (60 * (i + 1) - 30);

                ctx.beginPath();
                ctx.moveTo(center.x + cellSize * zoom * Math.cos(angle1), center.y + cellSize * zoom * Math.sin(angle1)*angleY);
                ctx.lineTo(center.x + cellSize * zoom * Math.cos(angle2), center.y + cellSize * zoom * Math.sin(angle2)*angleY);
                ctx.stroke();
            }
        });
        ctx.restore();
    },

    drawContent(x, y, cellData, q, r) {
        const {ctx, show, sizes, camera:{zoom, angleY}} = hexFunction.data;
        // ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";


        // let icon2;
        // if (cellData.isCapital) icon2 = "⭐";
        // // else if (cellData.isPort) icon = "⚓";
        // // else if (cellData.isTradeHub) icon = "⚖️";
        // else if (cellData.isFort) icon2 = "🏰";
        // // else if (cellData.isCity) icon = "🏘";
        // if(icon2) {
        //     ctx.font = "30px serif";
        //     ctx.fillText(icon2,  x - 15,  y + 10.5);
        // }

        if(!cellData.content) return;

        if(show.objects && cellData.content.obj) {
            hexFunction.drawObject(x, y, cellData.content.obj, q, r);
        }

        let icon;
        if (cellData.isCapital) icon = "city";
        else if (cellData.isPort) icon = "port";
        else if (cellData.isTradeHub) icon = "city";
        else if (cellData.isFort) icon = "castle";
        else if (cellData.isCity) icon = "city";
        if(icon) {
            const terrainImg = assets.objects[icon];
            if (terrainImg) {
                ctx.save();
                ctx.beginPath();
                hexFunction.drawHex(x, y, true);
                ctx.drawImage(terrainImg, x - sizes.width * zoom/2, y - sizes.height * zoom/2*angleY, sizes.width * zoom, sizes.height * zoom*angleY);
                ctx.restore();
            }
        }

        if(show.characters && cellData.content.unit) {
            hexFunction.drawUnit(x, y, characterManager.getCharacterById(cellData.content.unit), q, r);
        }
        //
        // if (content.obj) {
        //     hexFunction.drawObject(ctx, x, y, content.obj, q, r, size);
        // }
        // if (content.unit) {
        //     hexFunction.drawUnit(ctx, x, y, characterManager.getCharacterById(content.unit), q, r, size); // Твоя текущая функция для персонажей
        // }
    },

    drawUnit(x, y, unit, q, r) {
        const {ctx, sizes:{charSize}, camera:{zoom}} = hexFunction.data;

        if (map.animatingUnit && map.animatingUnit.q === q && map.animatingUnit.r === r) return;
        if (tacticalMap.animatingUnit && tacticalMap.animatingUnit.q === q && tacticalMap.animatingUnit.r === r) return;

        ctx.save();
        // 1. Рисуем подложку (командный круг), чтобы юнит не сливался с фоном
        // ctx.beginPath();
        // ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
        ctx.beginPath();
        // Рисуем эллипс: ширина полная, высота сплющена (например, 0.4 от ширины)
        // x, y — центр гекса, где стоят ноги
        ctx.ellipse(x, y, charSize * zoom * 0.5, charSize * zoom * 0.25, 0, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Полупрозрачный черный
        ctx.fill();
        ctx.restore();

        ctx.lineWidth = 2;
        if(unit.team) {
            ctx.strokeStyle = map.teamColors[unit.team];
            ctx.stroke();
        }
        else {
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
        }


        // 2. ОТРИСОВКА ПОРТРЕТА
        // Проверяем наличие загруженного изображения
        let image;
        if(fullheight[unit.id] && assets.loadedFullHeight[unit.id]) {
            image = assets.loadedFullHeight[unit.id];
        }
        else if(avatars[unit.id] && assets.loadedAvatars[unit.id]) {
            image = assets.loadedAvatars[unit.id];
        }
        if(!image) return;

        const coef = 0.8;
        const maxSize = charSize * coef * zoom; // Максимальный размер внутри гекса
        const ratio = Math.min(maxSize / image.width, maxSize / image.height) * zoom;
        const newWidth = image.width * ratio * coef;
        const newHeight = image.height * ratio * coef;

        ctx.save();
        // Обрезаем по кругу подложки
        ctx.beginPath();
        ctx.arc(x, y, charSize * coef, 0, Math.PI * 2);
        // ctx.clip();

        // Рисуем картинку ровно по центру
        ctx.drawImage(
            image,
            x - newWidth / 2,
            y - newHeight,
            newWidth,
            newHeight
        );
        ctx.restore();

        // 3. Полоска HP чуть ниже центра
        const barW = newWidth;
        const barH = 4;
        const barY = y - (newHeight * 1);
        const nameY = y - (newHeight * 1.10);

        ctx.fillStyle = "red";
        ctx.fillRect(x - barW/2, barY, barW, barH);
        ctx.fillStyle = "#00ff00";
        // const hpPercent = (unit.hp || unit.hpMax) / unit.hpMax;
        const hpPercent = unit.hp / unit.hpMax;
        ctx.fillRect(x - barW/2, barY, barW * hpPercent, barH);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillStyle = "cyan";

        // const fontSize = Math.max(10, 18 / zoom);
        const fontSize = 10 + (zoom-1)*10;
        ctx.font = `bold ${fontSize}px serif`;
        const name = (unit.name.split(" "))[0];
        ctx.strokeText(name || unit.id, x, nameY);
        ctx.fillText(name || unit.id, x, nameY);

        ctx.restore();
    },

    drawObject(x, y, content, q, r) {
        if(!content) return;
        const {ctx, sizes, camera:{zoom, angleY}} = hexFunction.data;
        ctx.save();

        let icon = '❓';
        if(content.obj && assets.objects[content.obj]) {
            const terrainImg = assets.objects[content.obj];
            if (terrainImg) {
                ctx.beginPath();
                hexFunction.drawHex(x, y, true);
                ctx.clip();
                ctx.drawImage(terrainImg, x - sizes.width * zoom/2, y - sizes.height * zoom/2*angleY, sizes.width * zoom, sizes.height * zoom*angleY);
                // ctx.drawImage(terrainImg, x - sizes.width / 2, drawY - sizes.height / 2, sizes.width, sizes.height);
                // ctx.drawImage(terrainImg, x - sizes.width * zoom/2, y - sizes.height * zoom/2, sizes.width * zoom, sizes.height * zoom * angleY);
            }
        }
        else {
            ctx.font = "30px Arial";
            icon = map.objectIcons[content.obj];
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
        }

        // Если это портал, можно добавить свечение
        if (content.obj === 'portal') {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "cyan";
            ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
            ctx.strokeText(icon, x, y);
        }

        ctx.restore();
    },

    drawCells(config = {}) {
        const {play} = config;
        const {ctx, gridData, activeUnit, show, sizes, camera:{zoom, angleY}} = hexFunction.data;
        const active = activeUnit;
        const grid = gridData;
        const factionCells = {}, regionCells = {}, religionCells = {}, cultureCells = {};

        const sortedCells = Object.entries(grid).sort((a, b) => {
            const rA = parseInt(a[0].split('_')[1]);
            const rB = parseInt(b[0].split('_')[1]);
            if (rA !== rB) return rA - rB;
            return parseInt(a[0].split('_')[0]) - parseInt(b[0].split('_')[0]);
        });

        const interactionLines = document.querySelectorAll('.interaction-line');
        interactionLines.forEach(element => {element.remove();});

        for (const [key, cellData] of sortedCells) {
            const [q, r] = key.split('_').map(Number);
            let { x, y } = hexFunction.hexToPixel(q, r);

            if(!cellData.content) cellData.content = {};

            if(sizes.bounds) {
                x = (x - sizes.bounds.x);
                y = (y - sizes.bounds.y);
            }

            if (cellData.isFog) {
                hexFunction.drawHexHighlight(x, y, "rgba(0,0,0,1)");
                continue;
            }

            let isExplored = true;
            if(activeUnit) {
                isExplored = currentSeason.exploredCells[activeUnit.id] && currentSeason.exploredCells[activeUnit.id][`${q}_${r}`];
                hexFunction.drawFog(x,y,q,r);
            }
            if(!isExplored) continue;

            const hShift = ((cellData.height || 1) - 1) * 5;
            const drawY = (y - hShift);

            // 2. Рисуем "толщину" (боковую грань) для 3D эффекта
            if (hShift > 0) {
                if(show.terrain) {
                    ctx.save(); // Сохраняем состояние для clip
                    hexFunction.drawHex(x, y + 1);
                    ctx.clip();
                    ctx.fillStyle = "rgba(0,0,0,0.3)";
                    ctx.fill();

                    const terrainImg = assets.terrains[cellData.terrain];
                    if (terrainImg) {
                        // ctx.drawImage(terrainImg, x - sizes.width / 2, y - sizes.height / 2, sizes.width, sizes.height);
                        // ctx.drawImage(terrainImg, x - sizes.width/2 - 10, y - sizes.height/2, sizes.width + 20, sizes.height);
                        const w = sizes.width * zoom;
                        const h = sizes.height * zoom * angleY;
                        ctx.drawImage(
                            terrainImg,
                            x - w / 2,
                            y - h / 2,
                            w,
                            h
                        );
                    } else {
                        ctx.fillStyle = hexFunction.getTerrainColor(cellData.terrain);
                        ctx.fill();
                    }

                    hexFunction.drawHex(x, y);
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.fill();
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.restore();
                }
            }

            // 3. РИСУЕМ ТЕРРЕЙН (PNG или Цвет)
            if(show.terrain) {
                hexFunction.drawTerrain(x, drawY, cellData.terrain);
            }
        }

        if(show.tradeRoutes) {
            tradeManager.renderTradePaths();
        }

        for (const [key, cellData] of sortedCells) {
            const [q, r] = key.split('_').map(Number);
            let { x, y } = hexFunction.hexToPixel(q, r);

            if(!cellData.content) cellData.content = {};

            if(sizes.bounds) {
                x = (x - sizes.bounds.x);
                y = (y - sizes.bounds.y);
            }

            if (cellData.isFog) {
                hexFunction.drawHexHighlight(x, y, "rgba(0,0,0,1)");
                continue;
            }

            let isExplored = true;
            if(activeUnit) {
                isExplored = currentSeason.exploredCells[activeUnit.id] && currentSeason.exploredCells[activeUnit.id][`${q}_${r}`];
                // hexFunction.drawFog(x,y,q,r);
            }
            if(!isExplored) continue;

            const hShift = ((cellData.height || 1) - 1) * 5;
            const drawY = (y - hShift);

            // 4. РИСУЕМ СЕТКУ (поверх террейна)
            if(show.grid) {
                hexFunction.drawGrid(x, drawY);
            }

            let provinceData;
            if(cellData.isCity) {
                provinceData = cellData;
            }
            else if(cellData.provinceHex) {
                provinceData = gridData[cellData.provinceHex];
                delete cellData.faction;
            }
            delete cellData.inVision;

            if(show.regions) {
                if (cellData.provinceId && cellData.provinceId !== -1) {
                    hexFunction.drawProvinceBorders(q, r, cellData.provinceId);
                }

                if (cellData.region && cellData.region !== -1) {
                    // if (!factionCells[cellData.region]) factionCells[cellData.region] = [];
                    // factionCells[cellData.region].push({x, y});

                    ctx.globalAlpha = 0.25;
                    const region = (data.regions || []).find(f => f.id === cellData.region);
                    ctx.fillStyle = region?.color || 'rgba(255,255,255,0)';
                    ctx.beginPath();
                    hexFunction.drawHex(x, drawY, true);
                    ctx.fill();
                    ctx.globalAlpha = 1.0;

                    hexFunction.drawRegionBorders(q, r, cellData.region);
                }
            }

            if(provinceData) {
                if(show.factions) {
                    if (provinceData.faction && provinceData.faction !== -1) {
                        // if (!factionCells[provinceData.faction]) factionCells[provinceData.faction] = [];
                        // factionCells[provinceData.faction].push({x, y});

                        ctx.globalAlpha = 0.25;
                        const faction = data.factions.find(f => f.id === provinceData.faction);
                        ctx.fillStyle = faction?.color || 'rgba(255,255,255,0)';
                        ctx.beginPath();
                        hexFunction.drawHex(x, drawY, true);
                        ctx.fill();
                        ctx.globalAlpha = 1.0;

                        hexFunction.drawFactionBorders(q, r, provinceData.faction);
                    }
                }
                if(provinceData.social && provinceData.social.dominance) {
                    const dom = provinceData.social.dominance;
                    if (show.religions) {
                        if (dom.religion) {
                            // if (!religionCells[dom.religion]) religionCells[dom.religion] = [];
                            // religionCells[dom.religion].push({x, y});

                            ctx.globalAlpha = 0.25;
                            const religion = (gameData[currentGame].religions||[]).find(f => f.id === dom.religion);
                            ctx.fillStyle = religion?.color || 'rgba(255,255,255,0)';
                            ctx.beginPath();
                            hexFunction.drawHex(x, drawY, true);
                            ctx.fill();
                            ctx.globalAlpha = 1.0;
                        }
                    }
                    if (show.cultures) {
                        if (dom.culture) {
                            // if (!cultureCells[dom.culture]) cultureCells[dom.culture] = [];
                            // cultureCells[dom.culture].push({x, y});

                            ctx.globalAlpha = 0.25;
                            const culture = (gameData[currentGame].cultures||[]).find(f => f.id === dom.culture);
                            ctx.fillStyle = culture?.color || 'rgba(255,255,255,0)';
                            ctx.beginPath();
                            hexFunction.drawHex(x, drawY, true);
                            ctx.fill();
                            ctx.globalAlpha = 1.0;
                        }
                    }
                }
            }

            if(tacticalMap.entryCell === key) {
                hexFunction.drawHexHighlight(x, y, "rgba(0, 0, 255, 0.3)"); // вход
            }

            if(show.yeilds) {
                if (cellData.yield && Object.keys(cellData.yield).length > 0) {
                    ctx.font = "12px Arial";
                    ctx.fillStyle = "#FFFFFF";
                    const firstResId = Object.keys(cellData.yield)[0];
                    const resIcon = map.resources.find(r => r.id === firstResId)?.icon || '💎';
                    ctx.fillText(resIcon, x - 10, y + 15);
                }
            }

            if (cellData.isCity && cellData.cityName) {
                const fontSize = 18 * angleY * zoom;
                ctx.font = `bold ${fontSize}px serif`;
                ctx.strokeStyle = "black";
                ctx.lineWidth = 4;
                ctx.fillStyle = "#FFFFFF";
                if (cellData.isCapital) ctx.fillStyle = "gold";

                const labelY = y - (35 * zoom);
                let cityName = provinceNames[cellData.cityId] ? provinceNames[cellData.cityId][lang] : cellData.cityId;

                ctx.strokeText(cityName || cellData.cityId, x, labelY);
                ctx.fillText(cityName || cellData.cityId, x, labelY);
            }

            if(active) {

                if(currentSeason.exploredCells[active.id][key]) {
                    if(cellData.content.unit) {
                        console.log(key, cellData, hexFunction.canReach(q, r), hexFunction.isInteractable(cellData));
                    }
                // if (cellData.explored) {
                    if (active.q === q && active.r === r) {
                        hexFunction.drawHexHighlight(x, y, "rgba(255, 255, 255, 0.4)", 3); // Выделение
                    }
                    else if((hexFunction.getHexDistance(q, r, active.q,active.r) <= 1) && hexFunction.isInteractable(cellData)) {
                        hexFunction.drawHexHighlight(x, y, "rgba(255, 255, 0, 0.5)"); // интеракция
                        if(cellData.content.unit) {
                            map.createFloatingBtn({x, y:drawY}, 'dialog', cellData.content.unit);
                        }
                    }
                    else if (hexFunction.canReach(q, r)) { //!active.hasMoved &&
                        hexFunction.drawHexHighlight(x, y, "rgba(0, 255, 0, 0.3)"); // Ход
                    }
                    else if (battleManager.canAttack(q, r)) {
                        hexFunction.drawHexHighlight(x, y, "rgba(255, 0, 0, 0.3)"); // Атака
                    }
                }

                // hexFunction.drawFog(x,y,q,r);

                const selectedAb = tacticalMap.selectedAbility || map.selectedAbility;
                if (selectedAb) {
                    const distFromCaster = hexFunction.getHexDistance(q, r, active.q, active.r);
                    if (distFromCaster <= selectedAb.range) {
                        hexFunction.drawHexHighlight(x, y, "rgba(255, 255, 0, 0.2)");
                    }

                    if (tacticalMap.abilityTarget) {
                        const aoeCells = hexFunction.getAoeCells(
                            tacticalMap.gridData,
                            tacticalMap.activeUnit,
                            tacticalMap.abilityTarget.q,
                            tacticalMap.abilityTarget.r,
                            selectedAb
                        );

                        if (aoeCells.some(c => c.q === q && c.r === r)) {
                            hexFunction.drawHexHighlight(x, y, "rgba(255, 0, 0, 0.5)", 2); // Яркий красный с обводкой
                        }
                    }
                }

                if(cellData.innerMap && activeUnit.hex && (key === activeUnit.hex)) {
                    map.createFloatingBtn({x, y:drawY}, 'innerMap', key);
                }

            }

            hexFunction.drawContent(x, y, cellData, q, r);

            if (show.fog) {
                hexFunction.drawFog(x,drawY,q,r);
            }
        }

        // if(show.regions) {
        //     ctx.globalAlpha = 0.25;
        //     for (const regionId in regionCells) {
        //         const region = data.regions.find(f => f.id == regionId);
        //         ctx.fillStyle = region?.color || 'rgba(255,255,255,0)';
        //         ctx.beginPath();
        //         regionCells[regionId].forEach(pos => {
        //             hexFunction.drawHex(pos.x, pos.y, true);
        //         });
        //         ctx.fill();
        //     }
        //     ctx.globalAlpha = 1.0;
        // }
        //
        // if(show.factions) {
        //     ctx.globalAlpha = 0.25;
        //     for (const factionId in factionCells) {
        //         const faction = data.factions.find(f => f.id == factionId);
        //         ctx.fillStyle = faction?.color || 'rgba(255,255,255,0)';
        //         ctx.beginPath();
        //         factionCells[factionId].forEach(pos => {
        //             hexFunction.drawHex(pos.x, pos.y, true);
        //         });
        //         ctx.fill();
        //     }
        //     ctx.globalAlpha = 1.0;
        // }
        // if(show.religions) {
        //     ctx.globalAlpha = 0.25;
        //     for (const relId in religionCells) {
        //         const religion = (gameData[currentGame].religions||[]).find(f => f.id == relId);
        //         ctx.fillStyle = religion?.color || 'rgba(255,255,255,0)';
        //         ctx.beginPath();
        //         religionCells[relId].forEach(pos => {
        //             hexFunction.drawHex(pos.x, pos.y, true);
        //         });
        //         ctx.fill();
        //     }
        //     ctx.globalAlpha = 1.0;
        // }
        // if(show.cultures) {
        //     ctx.globalAlpha = 0.25;
        //     for (const culId in cultureCells) {
        //         const culture = (gameData[currentGame].cultures||[]).find(f => f.id == culId);
        //         ctx.fillStyle = culture?.color || 'rgba(255,255,255,0)';
        //         ctx.beginPath();
        //         cultureCells[culId].forEach(pos => {
        //             hexFunction.drawHex(pos.x, pos.y, true);
        //         });
        //         ctx.fill();
        //     }
        //     ctx.globalAlpha = 1.0;
        // }
    },

    drawLabels() {
        // 1. Прямая привязка к данным (проверь эти пути!)
        const {gridData, ctx, sizes:{cellSize}, camera:{zoom}} = hexFunction.data;

        if (!gridData || !ctx) return;

        const regionPoints = {};

        ctx.save();
        // ОБЯЗАТЕЛЬНО: Сбрасываем фильтры и прозрачность, которые могли остаться от гексов
        ctx.globalAlpha = 1.0;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const existingProvinces = {};
        const missingProvinces = {};

        Object.keys(gridData).forEach(key => {
            const cell = gridData[key];
            const [q, r] = key.split('_').map(Number);

            const {x, y} = hexFunction.hexToPixel(q, r);

            // Сбор для регионов
            if (cell.region && cell.region !== -1) {
                if (!regionPoints[cell.region]) regionPoints[cell.region] = [];
                regionPoints[cell.region].push({x, y});
            }
        });

        if (zoom < 3) {
            gameData[currentGame].regions.forEach(reg => {
                const points = regionPoints[reg.id];
                if (points && points.length > 0) {
                    const avgX = points.reduce((s, p) => s + p.x, 0) / points.length;
                    const avgY = points.reduce((s, p) => s + p.y, 0) / points.length;

                    ctx.shadowBlur = 0;
                    ctx.font = `bold ${30 * zoom}px serif`;
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.fillText(reg.name.toUpperCase(), avgX, avgY);
                }
            });
        }

        ctx.restore();
    },

    canReach(targetQ, targetR) {
        let {currentReachable} = hexFunction.data;
        currentReachable = hexFunction.getReachableCells();
        return currentReachable.has(`${targetQ}_${targetR}`);
    },

    findPath(grid, startQ, startR, endQ, endR) {
        const queue = [[{q: startQ, r: startR}]];
        const visited = new Set([`${startQ}_${startR}`]);

        while (queue.length > 0) {
            const path = queue.shift();
            const current = path[path.length - 1];

            if (current.q === endQ && current.r === endR) return path;

            const neighbors = hexFunction.getNeighbors(current.q, current.r);
            for (const n of neighbors) {
                const key = `${n.q}_${n.r}`;
                // Проверка проходимости (та же, что в canReach)
                // const canPass = !n.data.content || n.data.content.obj?.type === 'portal';
                const canPass = !hexFunction.isObstacle(n.data);
                const isLiquid = map.impassableTerrains.includes(n.data.terrain);

                if (!visited.has(key) && canPass && !isLiquid) {
                    visited.add(key);
                    queue.push([...path, {q: n.q, r: n.r}]);
                }
            }
        }
        return null; // Пути нет
    },

    getReachableCells() {
        const {gridData, activeUnit} = hexFunction.data;
        if (!activeUnit) return new Set();

        const reachable = new Set();
        const fringe = [{ q: activeUnit.q, r: activeUnit.r, dist: 0 }];
        reachable.add(`${activeUnit.q}_${activeUnit.r}`);

        while (fringe.length > 0) {
            const current = fringe.shift();
            const currentCell = hexFunction.getCell(current.q, current.r);

            if (current.dist < activeUnit.currentWalkRange) {
                const neighbors = hexFunction.getNeighbors(current.q, current.r);
                neighbors.forEach(n => {
                    const key = `${n.q}_${n.r}`;
                    if (reachable.has(key)) return;
                    n.data.height = Number((n.data.height || 1));

                    // const isObstacle = n.data.content?.unit && n.data.content?.obj?.type !== 'portal';
                    const isObstacle = hexFunction.isObstacle(n.data);
                    const isLiquid = map.impassableTerrains.includes(n.data.terrain);
                    const heightDiff = Math.abs(n.data.height - currentCell.height);

                    if (!isObstacle && !n.data.isFog && !isLiquid && heightDiff <= 0.5) {
                        reachable.add(key);
                        fringe.push({ q: n.q, r: n.r, dist: current.dist + 1 });
                    }
                });
            }
        }
        return reachable;
    },

    isObstacle(cell) {
        if(cell.isFog) return true;
        if(cell.content.unit) return true;

        if(!cell.content.obj) return false;
        else if(map.obstacleObjects.includes(cell.content.obj.obj)) return true;

        return false;
    },

    isInteractable(cell) {
        if(cell.content && cell.content.obj && cell.content.obj.obj && map.interactableObjects.includes(cell.content.obj.obj)) {
            return true;
        }
        else if(cell.content && cell.content.unit) {
            const char = characterManager.getCharacterById(cell.content.unit);
            if(!char || char.team) return true;

            cell.isInteractable = true;
            return true;
        }
        else if(cell.innerMap && gameData[currentGame].tacticalMaps.find(m=>m.mapId===cell.innerMap)) {
            cell.isInteractable = true;
            return true;
        }

        return false;
    },

    revealFog(centerQ, centerR) {
        const {activeUnit} = hexFunction.data;
        if (!activeUnit) return;

        const charId = activeUnit.id; // Или factionId, смотря чей туман

        if (!currentSeason.exploredCells[charId]) currentSeason.exploredCells[charId] = {};

        const radius = activeUnit.visionRadius || 2;
        // Берем только гексы в радиусе (вместо 2000 перебираем ~15-30)
        const nearbyKeys = hexFunction.getHexesInRadius(centerQ, centerR, radius);

        nearbyKeys.forEach(key => {
            const [q, r] = key.split('_').map(Number);

            // Твоя функция рейкастинга (проверка луча)
            if (hexFunction.canSee(q, r)) {
                // Записываем в НАШ объект, а не в ячейку сетки!
                currentSeason.exploredCells[charId][key] = true;
            }
        });

        hexFunction.updateHex();

        // const centerKey = `${centerQ}_${centerR}`;
        // const centerCell = grid[centerKey];
        // if (!centerCell) return;
        //
        // Object.entries(grid).forEach(([key, cell]) => {
        //     const [q, r] = key.split('_').map(Number);
        //
        //     if (hexFunction.canSee(grid, active, q, r)) {
        //         cell.explored = true;
        //     }
        // });
        //
        // hexFunction.updateHex();
    },

    canSee(targetQ, targetR) {
        const {gridData, activeUnit} = hexFunction.data;
        if (!activeUnit) return false;

        // 1. Быстрая проверка дистанции
        const dist = hexFunction.getHexDistance(activeUnit.q, activeUnit.r, targetQ, targetR);
        if (dist > (activeUnit.visionRadius || 2)) return false;
        if (dist === 0) return true;

        // 2. Рейкастинг: проверяем все клетки на пути
        const line = hexFunction.getLine(activeUnit.q, activeUnit.r, targetQ, targetR);

        for (let i = 0; i < line.length - 1; i++) {
            const point = line[i];
            // Пропускаем саму клетку, где стоит юнит
            if (point.q === activeUnit.q && point.r === activeUnit.r) continue;

            const cell = hexFunction.getCell(point.q, point.r);
            if (!cell) return false;

            // ПРЕПЯТСТВИЯ: если на пути стена или высокая гора
            if(hexFunction.isObstacle(cell)) return false;
            // if (cell.content?.obj?.type === 'wall' || cell.terrain === 'mountain') return false;

            // Высота: если клетка на пути намного выше юнита, она закрывает обзор
            const heightDiff = cell.height - hexFunction.getCell(activeUnit.q, activeUnit.r).height;
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

    executeMove(targetQ, targetR) {
        let {gridData, activeUnit, currentReachable, sizes} = hexFunction.data;
        if(!activeUnit) return;
        const path = hexFunction.findPath(gridData, activeUnit.q, activeUnit.r, targetQ, targetR);
        if (!path || path.length < 2) return;

        path.shift(); // Убираем текущую клетку

        const step = () => {
            if (path.length === 0 || activeUnit.currentWalkRange <= 0) {
                currentReachable = null;
                hexFunction.revealFog(activeUnit.q, activeUnit.r);
                if (activeUnit.currentWalkRange <= 0) hexFunction.nextTurn();
                return;
            }

            // --- ТОЧКА ОЧИСТКИ ---
            const oldQ = activeUnit.q;
            const oldR = activeUnit.r;
            const oldKey = `${oldQ}_${oldR}`;

            const nextCell = path.shift();
            const newKey = `${nextCell.q}_${nextCell.r}`;

            // 1. Копируем данные
            const unitData = gridData[oldKey].content.unit;

            // 2. СТЕРЕТЬ СТАРУЮ КЛЕТКУ (Явно)
            gridData[oldKey].content.unit = null;

            // 3. ЗАПИСАТЬ В НОВУЮ
            gridData[newKey].content.unit = unitData; //{...unitData, q: nextCell.q,r: nextCell.r};

            const targetCell = gridData[newKey];

            if (targetCell.content.unit) {
                const obj = characterManager.getCharacterById(targetCell.content.unit);
                // ЛОГИКА ЛУТА (Сундуки и Трупы)
                if (obj.inventory?.length > 0) {
                    const foundLoot = [...obj.inventory];
                    activeUnit.inventory = [...(activeUnit.inventory || []), ...foundLoot];
                    obj.inventory = []; // Очищаем, чтобы не лутать вечно
                    console.log(`Подобрано предметов: ${foundLoot.length}`);
                }
            }
            if (targetCell.content.obj) {
                const obj = targetCell.content.obj;
                if (obj.type === 'portal') {
                    const tId = obj.targetMapId;
                    const [tQ, tR] = (obj.targetCoords || [0, 0]).map(Number);
                    // Останавливаем пошаговый ход и прыгаем в новую локацию
                    mapManager.switchLocation(tId, tQ, tR);
                    return; // Выход из рекурсии step
                }
            }
            // ЛОГИКА ТРИГГЕРОВ (Диалоги, Урон)
            if (targetCell.event && !targetCell.event.fired) {
                battleManager.handleTrigger(targetCell.event, activeUnit);
                if (targetCell.event.once) targetCell.event.fired = true;
            }

            // 4. Обновить координаты в объекте юнита
            characterManager.modifyPosition(activeUnit.id, {q:nextCell.q,r:nextCell.r});
            // activeUnit.q = nextCell.q;
            // activeUnit.r = nextCell.r;
            // activeUnit.hex = newKey;
            activeUnit.currentWalkRange -= 1;

            const startPos = hexFunction.hexToPixel(oldQ, oldR);
            const endPos = hexFunction.hexToPixel(nextCell.q, nextCell.r);

            hexFunction.updateHex();

            hexFunction.animateMove(oldQ, oldR, nextCell.q, nextCell.r, () => {
                hexFunction.revealFog(activeUnit.q, activeUnit.r);
                playerHUD.renderDock(activeUnit);
                main.saveCurrentSeason();
                step();
            });
        };

        step();
    },

    animateMove(oldQ, oldR, newQ, newR, callback) {
        const {gridData, sizes:{cellSize, charSize, width, height, bounds}, camera:{zoom}} = hexFunction.data;

        const unitData = characterManager.getCharacterById(gridData[`${newQ}_${newR}`].content.unit);
        if (!unitData) return callback();

        const startPos = hexFunction.hexToPixel(oldQ, oldR);
        const endPos = hexFunction.hexToPixel(newQ, newR);

        // const startPos = hexFunction.hexToPixel(oldQ, oldR, size);
        // const endPos = hexFunction.hexToPixel(newQ, newR, size);

        const ghost = createEl('div', `ghost-character character tf-team-${unitData.team} selected`);

        // Если есть аватар — используем его, иначе символ
        let image;
        if(fullheight[unitData.id] && assets.loadedFullHeight[unitData.id]) {
            image = assets.loadedFullHeight[unitData.id];
            ghost.append(image);
        }
        else if(avatars[unitData.id] && assets.loadedAvatars[unitData.id]) {
            // const img = new Image();
            // img.src = avatars[unitData.id];
            // ghost.append(img);
            image = assets.loadedAvatars[unitData.id];
            ghost.append(image);
        } else {
            ghost.innerHTML = `<div class="unit-symbol">${unitData.symbol || '👤'}</div>`;
        }

        const coef = 0.8;
        const maxSize = charSize * coef * zoom; // Максимальный размер внутри гекса
        const ratio = Math.min(maxSize / image.width, maxSize / image.height) * zoom;
        const newWidth = image.width * ratio * coef;
        const newHeight = image.height * ratio * coef;

        let offsetX=0, offsetY=0, padding={x:0,y:0};

        // const coef = 1.5;
        // const maxSize = cellSize * zoom * coef; // Максимальный размер внутри гекса
        // const ratio = Math.min(maxSize / image.width, maxSize / image.height);
        // const newWidth = image.width * ratio;
        // const newHeight = image.height * ratio;

        if(tacticalMap.ctx) {
            // offsetX = charSize*coef/4 + cellSize * zoom * coef /4;
            // offsetY = charSize*coef/4 + cellSize * zoom * coef /4;

            offsetX = (newWidth)/2;
            offsetY = (newHeight);
        }
        else if(regionMap.ctx) {
            offsetX = (newWidth)/2;
            offsetY = (newHeight);

            startPos.x = (startPos.x - bounds.x);
            startPos.y = (startPos.y - bounds.y);
            endPos.x = (endPos.x - bounds.x);
            endPos.y = (endPos.y - bounds.y);
        }
        else {
            // offsetX = 0;
            // offsetY = 0;
            offsetX = (newWidth)/2;
            offsetY = (newHeight);
        }

        Object.assign(ghost.style, {
            position: 'absolute',
            left: `${startPos.x - offsetX}px`,
            top: `${startPos.y - offsetY}px`,
            width: `${newWidth}px`,
            height: `${newHeight}px`,
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
            ghost.style.left = `${endPos.x - offsetX}px`;
            ghost.style.top = `${endPos.y - offsetY}px`;
        });

        setTimeout(()=>{
            ghost.remove();
            map.animatingUnit = null;
            tacticalMap.animatingUnit = null;

            hexFunction.updateHex();

            if (typeof callback === 'function') callback();
        }, 400);
    },

    saveCell(q,r) {
        const hexKey = `${q}_${r}`;
        const hexPos = hexFunction.hexToPixel(q, r);
        let cell = globalMap.gridData[hexKey];
        if (!cell.content) cell.content = {};

        let currentYield = null;
        if (map.tempCellData) {
            currentYield = {};
            Object.keys(map.tempCellData.yield).forEach(key => {
                const val = parseInt(map.tempCellData.yield[key]) || 0;
                if (val > 0) currentYield[key] = map.tempCellData.yield[key];
            });
        }
        if (currentYield) {
            cell.yield = currentYield;
        }

        ['terrain', 'height', 'region', 'faction', 'innerMap'].forEach(key => {
            if (map.selects[key].value !== "-1") {
                cell[key] = map.selects[key].value;
            }
            else if (map.paintEraser) delete cell[key];
        });
        document.querySelectorAll('.map-flag-btn').forEach(b => {
            b.classList.remove('active');
            try  {
                const data = JSON.parse(b.getAttribute('data-data'));
                const flag = data.data.id;
                if(b.classList.contains('active')) {
                    map.selected.cell[flag] = true;
                    if (flag === 'isCapital') {
                        Object.values(globalMap.gridData).forEach(cell => {
                            if (String(cell.faction) === String(cell.faction)) delete cell.isCapital;
                        });
                    }
                }
                else {
                    delete map.selected.cell[flag];
                }
            } catch (e) {}
        });

        const cityId = map.inputs.cityId.value;
        const cityName = map.inputs.cityName.value;

        // if (!cityId) return; // Без ID красить нельзя

        if (cell.isCity) {
            if (cityId) {
                cell.cityId = cityId;
            }
            if (cityName) {
                cell.cityName = cityName;
            }

            if (!cell.social) {
                cell.social = {
                    cultures: {}, religions: {},
                    dominance: {}, pressure: {cultures: {}, religions: {}}
                };
            }

            const selectedCult = map.selects.culture.value;
            const selectedRel = map.selects.religion.value;

            if (selectedCult !== "-1") {
                cell.social.cultures = {[selectedCult]: 1.0};
                cell.social.dominance.culture = selectedCult;
            }
            if (selectedRel !== "-1") {
                cell.social.religions = {[selectedRel]: 1.0};
                cell.social.dominance.religion = selectedRel;
            }
            if (parseInt(map.inputs.cityPopulation.value)) {
                cell.social.population = parseInt(map.popInput.value) || 0;
            }
        }

        // 2. ДЛЯ ВСЕХ КЛЕТОК (и городов, и полей): Привязка к провинции
        // Теперь каждый гекс знает, к какому "центру" он относится
        if (cityId) {
            cell.provinceId = cityId;
            cell.provinceHex = Object.keys(globalMap.gridData).find(key =>
                globalMap.gridData[key].isCity && globalMap.gridData[key].cityId === cityId
            );
        }

        globalMap.update();
    },

    saveCellCharacter(q,r) {
        const hexKey = `${q}_${r}`;
        const hexPos = hexFunction.hexToPixel(q, r);
        let cell = globalMap.gridData[hexKey];

        if (map.selects.character.value !== "-1") {
            if (!cell.content) cell.content = {};
            cell.content.unit = map.selects.character.value;
        }

        const character = characterManager.getCharacterById(cell.content.unit);

        if (character && map.selects.team.value) {
            character.team = map.selects.team.value;
        }

        globalMap.update();
    },

    saveCellObject(q,r) {
        const hexKey = `${q}_${r}`;
        const hexPos = hexFunction.hexToPixel(q, r);
        let cell = globalMap.gridData[hexKey];

        if (map.selects.object.value !== "-1") {
            if (!cell.content) cell.content = {};
            cell.content.obj = {type: 'obj', obj: map.selects.object.value};
        }

        if (map.inputs.objectId.value) {
            if (!cell.content) cell.content = {};
            cell.content.obj.id = map.inputs.objectId.value;
        }

        if (map.inputs.objectName.value) {
            if (!cell.content) cell.content = {};
            cell.content.obj.name = map.inputs.objectName.value;
        }

        globalMap.update();
    },

    nextTurn() {
        if(tacticalMap.ctx) {
            battleManager.nextTurn();
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
            if (cell.content?.obj?.type === 'lamp' || cell.content?.lightSource) {
                const [q, r] = key.split('_').map(Number);
                const radius = cell.content.lightRadius || 3;

                // 3. Светим во все стороны, проверяя canSee
                Object.keys(grid).forEach(targetKey => {
                    const [tq, tr] = targetKey.split('_').map(Number);

                    if (hexFunction.canSee(q, r)) { // Передаем источник как центр зрения
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
        let d, view = 'global';
        if(tacticalMap.ctx) {
            view = 'tactical';
            d = tacticalMap;
        }
        else if(regionMap.ctx) {
            view = 'region';
            d = regionMap;
        }
        else {
            // d = map;
            d = globalMap;
        }
        const sizes = {
            // cellSize: d.sizes.cellSize,
            // charSize: d.sizes.charSize,
            //
            // rows: d.sizes.rows,
            // cols: d.sizes.cols,
            // padding: d.sizes.padding,
            ...d.sizes,
            width: d.width,
            height: d.height,
            bounds: d.currentBounds
        };
        const {canvas, ctx, gridData, activeUnit, show, camera, currentBounds} = d;
        return {currentMap: d, canvas, ctx, view, gridData, activeUnit, show, sizes, camera, currentBounds};
    },

    getTerrainColor(t) {
        const colors = { grass: '#4e7c32', stone: '#7a7a7a', water: '#3498db', dirt: '#8b4513' };
        return colors[t] || '#4e7c32';
    }
};