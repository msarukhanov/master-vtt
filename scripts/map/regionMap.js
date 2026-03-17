const regionMap = {
    canvas: null,
    ctx: null,

    gridData: null,

    sizes: {
        rows: 0,
        cols: 0,
        padding: 2,
        cellSize: 40,
        charSize: 40,
    },

    camera: {
        x: 0,
        y: 0,
        zoom: 2,
        angleY: 0.6
    },

    show: {
        grid: true,
        terrain: false,
        tradeRoutes: false,

        fog: false,
        regions: true,
        labels: true,

        factions: false,
        religions: false,
        cultures: false,

        characters: true,
        objects: true,
        yeilds: true,
    },

    activeUnit: null,

    currentBounds: null,
    currentReachable: null,

    get width() { return Math.sqrt(3) * this.sizes.cellSize; },
    get height() { return 2 * this.sizes.cellSize; },

    init(regionId) {
        map.currentRegion = regionId;
        map.container.classList.add('region-mode');
        map.isRegionView = true;

        const bounds = regionMap.getRegionBounds(regionId);
        if (!bounds) return;
        regionMap.currentBounds = bounds;

        // 2. Инициализация UI
        if (!regionMap.canvas) {
            const wrapper = createEl('div','region-wrapper',0,null,'region-wrapper');
            const inner = createEl('div','region-wrapper-inner',0,null,'region-wrapper-inner');
            regionMap.canvas = document.createElement('canvas');
            regionMap.ctx = regionMap.canvas.getContext('2d');
            regionMap.canvas.dataset.data = JSON.stringify({type:'button',name:'region-map'});
            regionMap.canvas.id = 'region-canvas';

            inner.appendChild(regionMap.canvas);
            wrapper.appendChild(inner);
            map.container.appendChild(wrapper);
            elementById('close-region-btn').style.display = 'block';
            // map.container.appendChild(regionMap.canvas)
        }

        regionMap.canvas.width = regionMap.currentBounds.width;
        regionMap.canvas.height = regionMap.currentBounds.height;

        map.renderControls();

        const cells = Object.entries(globalMap.gridData || {})
            .filter(([key, cellData]) => cellData.region === map.currentRegion);
        if(!cells.length) return;

        let minQ = Infinity, maxQ = -Infinity, minR = Infinity, maxR = -Infinity;
        cells.forEach(([key, cell]) => {
            const [q, r] = key.split('_').map(Number);
            minQ = Math.min(minQ, q);
            maxQ = Math.max(maxQ, q);
            minR = Math.min(minR, r);
            maxR = Math.max(maxR, r);
        });

        regionMap.sizes.rows = maxQ;
        regionMap.sizes.cols = maxR;

        regionMap.gridData = {};

        for (let q = minQ - regionMap.sizes.padding; q <= maxQ + regionMap.sizes.padding; q++) {
            for (let r = minR - regionMap.sizes.padding; r <= maxR + regionMap.sizes.padding; r++) {
                const key = `${q}_${r}`;
                const originalCell = globalMap.gridData[key];

                const pos = hexFunction.hexToPixel(q, r);
                const isSameRegion = originalCell && originalCell.region === map.currentRegion;

                regionMap.gridData[key] = {
                    ...(originalCell || {}), // Копируем данные персонажей/объектов, если есть
                    q: q,
                    r: r,
                    // Приводим К ЛОКАЛЬНЫМ координатам канваса региона:
                    x: pos.x - regionMap.currentBounds.x,
                    y: pos.y - regionMap.currentBounds.y,
                    isFog: !isSameRegion,
                    terrain: isSameRegion ? originalCell.terrain : 'fog'
                };

                // if (originalCell && originalCell.region === globalMap.currentRegion) {
                //     regionMap.gridData[key] = originalCell;
                // }
                // else {
                //     const pos = hexFunction.hexToPixel(q, r);
                //     regionMap.gridData[key] = {
                //         q: q,
                //         r: r,
                //         x: pos.x - regionMap.currentBounds.x,
                //         y: pos.y - regionMap.currentBounds.y,
                //         isFog: !originalCell,
                //         terrain: originalCell ? originalCell.terrain : 'fog'
                //     };
                // }
            }
        }

        regionMap.update();

        map.scrollTo();
    },

    getRegionBounds(regionId) {
        const {sizes:{cellSize}, camera:{zoom, angleY}} = hexFunction.data;
        const regionCells = Object.entries(globalMap.gridData)
            .filter(([key, data]) => data.region === regionId);

        if (regionCells.length === 0) return null;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        regionCells.forEach(([key, data]) => {
            const [q, r] = key.split('_').map(Number);
            const { x, y } = hexFunction.hexToPixel(q, r);

            // Расширяем границы с учетом радиуса гекса
            minX = Math.min(minX, x - (cellSize * zoom));
            minY = Math.min(minY, y - (cellSize * zoom * angleY));
            maxX = Math.max(maxX, x + (cellSize * zoom));
            maxY = Math.max(maxY, y + (cellSize * zoom * angleY));
        });

        const width = maxX - minX;
        const height = maxY - minY;

        return {
            centerX: minX + width / 2,
            centerY: minY + height / 2,
            x: minX,
            y: minY,
            width: width,
            height: height
        };
    },

    update() {
        const {ctx, sizes:{padding}, camera:{zoom, angleY}} = hexFunction.data;
        const sourceImg = document.getElementById('world-map');

        ctx.clearRect(0, 0, regionMap.canvas.width, regionMap.canvas.height);

        ctx.save();
        ctx.drawImage(
            sourceImg,
            regionMap.currentBounds.x / zoom,
            regionMap.currentBounds.y / zoom / angleY,
            regionMap.currentBounds.width / zoom,
            regionMap.currentBounds.height / zoom / angleY,
            0, 0,
            regionMap.canvas.width,
            regionMap.canvas.height
        );
        ctx.restore();

        if(regionMap.show.tradeRoutes) {
            tradeManager.renderTradePaths();
        }
        hexFunction.drawCells();
        if(regionMap.show.labels) {
            hexFunction.drawLabels();
        }
    },
    //
    // clickMap(e) {
    //     const {sizes} = hexFunction.data;
    //     const canvas = regionMap.canvas;
    //     const rect = canvas.getBoundingClientRect();
    //
    //     // 1. Координаты клика относительно окна
    //     const clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
    //     const clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;
    //
    //     // 2. РЕАЛЬНЫЙ коэффициент растяжения канваса (Ratio)
    //     // Мы делим количество ПИКСЕЛЕЙ в канвасе на его РАЗМЕР на экране
    //     const scaleX = canvas.width / rect.width;
    //     const scaleY = canvas.height / rect.height;
    //
    //     // 3. lx/ly — это точка ВНУТРИ системы координат канваса (пиксели)
    //     const lx = (clientX - rect.left) * scaleX;
    //     const ly = (clientY - rect.top) * scaleY;
    //
    //     // 4. Пересчет в МИРОВЫЕ координаты (PNG):
    //     // Сначала делим на зум отрисовки, потом прибавляем старт региона
    //     const worldX = (lx / regionMap.camera.zoom * globalMap.camera.zoom) + regionMap.currentBounds.x;
    //     const worldY = (ly / regionMap.camera.zoom * globalMap.camera.zoom) + regionMap.currentBounds.y;
    //
    //     // 4. Гекс
    //     const { q, r } = hexFunction.pixelToHex(worldX, worldY);
    //
    //     const hexKey = `${q}_${r}`;
    //     const cell = globalMap.gridData[hexKey];
    //
    //     // 1. Ищем, есть ли персонаж в точке клика
    //     let clickedChar;
    //     if(cell.content && cell.content.unit) {
    //         clickedChar = characterManager.getCharacterById(cell.content.unit);
    //         // Кликнули в персонажа -> ВЫДЕЛЯЕМ
    //         clickedChar.q = q;
    //         clickedChar.r = r;
    //         if(!clickedChar.currentWalkRange && clickedChar.currentWalkRange!== 0 ) {
    //             clickedChar.currentWalkRange = clickedChar.walkRadius;
    //         }
    //         regionMap.activeUnit = clickedChar;
    //         playerHUD.init(regionMap.activeUnit);
    //         hexFunction.revealFog(q, r);
    //
    //         map.scrollToChar();
    //
    //
    //         // hexFunction.getReachableCells(map.gridData, map.activeUnit);
    //     }
    //
    //     console.log(hexKey, cell, clickedChar, map.currentRegion);
    //
    //     if (clickedChar) {
    //
    //     }
    //     else if (regionMap.activeUnit) {
    //         // Кликнули в ПУСТОЕ МЕСТО, но перс выбран -> ХОДИМ
    //         // Проверка: клетка должна быть нашего региона
    //         // if (cell && cell.region === map.currentRegion) {
    //         //     regionMap.moveCharInRegion(q, r);
    //         //     console.log("Двигаем в", q, r);
    //         // }
    //
    //         const key = `${q}_${r}`;
    //         const cell = regionMap.gridData[key];
    //
    //         const active = regionMap.activeUnit;
    //
    //         // ЕСЛИ ВЫБРАНА СПОСОБНОСТЬ
    //         if (tacticalMap.selectedAbility) {
    //             const dist = hexFunction.getHexDistance(q, r, active.q, active.r);
    //
    //             // Клик только внутри допустимого радиуса
    //             if (dist <= tacticalMap.selectedAbility.range) {
    //                 tacticalMap.abilityTarget = { q, r }; // Фиксируем прицел
    //                 tacticalMap.update(); // Перерисовываем для красной зоны
    //             } else {
    //                 console.log("Цель вне радиуса действия способности");
    //             }
    //             return;
    //         }
    //
    //         if (battleManager.canAttack(q, r)) {
    //             battleManager.executeAttack(active, {q, r, ...cell.content.unit});
    //         }
    //         else if (hexFunction.canReach(q, r)) { // && !active.hasMoved && !active.hasMoved
    //             hexFunction.executeMove(q, r);
    //         }
    //     }
    //
    //     // Всегда перерисовываем, чтобы обновить рамки/позиции
    //     regionMap.update();
    // },

    close() {
        if (regionMap.canvas) {
            regionMap.canvas.remove();
            document.getElementById('region-wrapper').remove();
            regionMap.canvas = null;
            regionMap.ctx = null;
        }

        map.isRegionView = false;
        map.currentRegion = null;

        // globalMap.camera = { x: 0, y: 0, scale: 1 };

        setTimeout(()=>{
            map.container.scrollTo({
                left: globalMap.camera.x,
                top: globalMap.camera.y,
                behavior: 'instant'
            });
        },10);

        map.container.classList.remove('region-mode');

        map.renderControls();
        hexFunction.updateHex();

        // elementById('close-region-btn').style.display = 'none';
        //
        // const closeBtn = document.getElementById('close-region-btn');
        // // if (closeBtn) closeBtn.remove();
        // if (closeBtn) closeBtn.style.display = 'none';
    },
};