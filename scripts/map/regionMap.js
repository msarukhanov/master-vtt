const regionMap = {
    canvas: null,
    ctx: null,

    zoom: 2,
    // zoom: 1,

    gridData: null,

    size: 80,
    // size: 40,
    mapCharSize: 100,
    // mapCharSize: 50,

    get width() { return Math.sqrt(3) * this.size; },
    get height() { return 2 * this.size; },

    currentBounds: null,

    init(regionId) {
        // 1. ЗАПОМИНАЕМ глобальную камеру (чтобы вернуться назад)
        // map.globalCamera = JSON.parse(JSON.stringify(map.camera));

        const bounds = globalMap.getRegionBounds(regionId);
        if (!bounds) return;
        regionMap.currentBounds = bounds; // Сохраняем для расчетов кликов и отрисовки


        // console.log(`Найдено клеток для региона ${regionId}:`, cells.length, regionMap.gridData);

        // 2. Инициализация UI
        if (!regionMap.canvas) {
            const wrapper = createEl('div','region-wrapper',0,null,'region-wrapper');
            const inner = createEl('div','region-wrapper-inner',0,null,'region-wrapper-inner');
            regionMap.canvas = document.createElement('canvas');
            regionMap.canvas.id = 'region-canvas';
            inner.appendChild(regionMap.canvas);
            wrapper.appendChild(inner);
            map.mapWrapper.appendChild(wrapper);
            // map.mapWrapper.appendChild(regionMap.canvas);

            const closeBtn = createEl('button', 'close-region-btn', '✖');
            closeBtn.id = 'close-region-btn';
            closeBtn.onclick = () => regionMap.close();
            map.mapWrapper.appendChild(closeBtn);

            regionMap.canvas.onclick = (e) => {
                const canvas = regionMap.canvas;
                const rect = canvas.getBoundingClientRect();

                // 1. Координаты клика относительно окна
                const clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
                const clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;

                // 2. РЕАЛЬНЫЙ коэффициент растяжения канваса (Ratio)
                // Мы делим количество ПИКСЕЛЕЙ в канвасе на его РАЗМЕР на экране
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;

                // 3. lx/ly — это точка ВНУТРИ системы координат канваса (пиксели)
                const lx = (clientX - rect.left) * scaleX;
                const ly = (clientY - rect.top) * scaleY;

                // 4. Пересчет в МИРОВЫЕ координаты (PNG):
                // Сначала делим на зум отрисовки, потом прибавляем старт региона
                const worldX = (lx / regionMap.zoom) + regionMap.currentBounds.x;
                const worldY = (ly / regionMap.zoom) + regionMap.currentBounds.y;

                // 4. Гекс
                const { q, r } = hexFunction.pixelToHex(worldX, worldY, map.size);

                const hexKey = `${q}_${r}`;
                const cell = map.gridData[hexKey];
                console.log(hexKey, cell);

                // 1. Ищем, есть ли персонаж в точке клика
                let clickedChar;
                if(cell.content && cell.content.type === 'char') {
                    clickedChar = cell.content;
                    // Кликнули в персонажа -> ВЫДЕЛЯЕМ
                    clickedChar.q = q;
                    clickedChar.r = r;
                    if(!clickedChar.currentWalkRange && clickedChar.currentWalkRange!== 0 ) {
                        clickedChar.currentWalkRange = clickedChar.walkRadius;
                    }
                    map.activeUnit = clickedChar;
                    playerHUD.init(map.activeUnit);
                    hexFunction.revealFog(map.gridData, map.activeUnit, q, r);
                    // hexFunction.getReachableCells(map.gridData, map.activeUnit);

                    console.log("Выбран персонаж:", clickedChar);
                }

                console.log(hexKey, clickedChar, map.currentRegionId);

                if (clickedChar) {

                }
                else if (map.activeUnit) {
                    // Кликнули в ПУСТОЕ МЕСТО, но перс выбран -> ХОДИМ
                    // Проверка: клетка должна быть нашего региона
                    // if (cell && cell.region === map.currentRegionId) {
                    //     regionMap.moveCharInRegion(q, r);
                    //     console.log("Двигаем в", q, r);
                    // }

                    const key = `${q}_${r}`;
                    const cell = map.gridData[key];

                    const active = map.activeUnit;
                    if (!active) return;

                    // ЕСЛИ ВЫБРАНА СПОСОБНОСТЬ
                    if (tacticalMap.selectedAbility) {
                        const dist = hexFunction.getHexDistance(q, r, active.q, active.r);

                        // Клик только внутри допустимого радиуса
                        if (dist <= tacticalMap.selectedAbility.range) {
                            tacticalMap.abilityTarget = { q, r }; // Фиксируем прицел
                            tacticalMap.update(); // Перерисовываем для красной зоны
                        } else {
                            console.log("Цель вне радиуса действия способности");
                        }
                        return;
                    }

                    if (tacticalMap.canAttack(q, r)) {
                        tacticalMap.executeAttack(active, {q, r, ...cell.content});
                    }
                    else if (hexFunction.canReach(map.gridData, map.activeUnit, q, r)) { // && !active.hasMoved && !active.hasMoved
                        hexFunction.executeMove(map.gridData, map.activeUnit, regionMap.size, regionMap.zoom, q, r);
                    }
                }

                // Всегда перерисовываем, чтобы обновить рамки/позиции
                regionMap.update();
            };
        }

        // 4. Стейт движка
        map.mapWrapper.classList.add('region-mode');
        map.isRegionView = true;
        map.currentRegionId = regionId;

        map.globalCamera = { x: bounds.x - bounds.width/2, y: bounds.y - bounds.height/2, scale: 1 };

        regionMap.canvas.width = bounds.width * regionMap.zoom;
        regionMap.canvas.height = bounds.height * regionMap.zoom;

        // Рисуем фон (вырезку)


        // Рисуем сетку
        regionMap.update();
    },

    update() {
        const sourceImg = document.getElementById('world-map');
        regionMap.ctx = regionMap.canvas.getContext('2d');
        regionMap.ctx.clearRect(0, 0, regionMap.canvas.width, regionMap.canvas.height);
        regionMap.ctx.save();
        regionMap.ctx.drawImage(
            sourceImg,
            regionMap.currentBounds.x, regionMap.currentBounds.y, regionMap.currentBounds.width, regionMap.currentBounds.height,
            0, 0, regionMap.canvas.width, regionMap.canvas.height
        );
        regionMap.ctx.restore();

        const cells = Object.entries(map.gridData || {})
            .filter(([key, cellData]) => cellData.region === map.currentRegionId);
        if(!cells.length) return;

        regionMap.gridData = {};
        cells.forEach(i=>{regionMap.gridData[i[0]]=i[1];});

        hexFunction.drawCells(regionMap.ctx, regionMap.gridData, map.activeUnit, {
            size: regionMap.size,
            mapCharSize: regionMap.mapCharSize,
            width: regionMap.width,
            height: regionMap.height,
            bounds: regionMap.currentBounds,
            zoom: regionMap.zoom
        }, map.show);
    },

    close() {
        if (regionMap.canvas) {
            regionMap.canvas.remove();
            document.getElementById('region-wrapper').remove();
            regionMap.canvas = null;
            regionMap.ctx = null;
        }

        map.isRegionView = false;
        map.currentRegionId = null;

        map.camera = { x: 0, y: 0, scale: 1 };

        setTimeout(()=>{
            map.mapWrapper.scrollTo({
                left: map.globalCamera.x,
                top: map.globalCamera.y,
                behavior: 'instant'
            });
        },10);

        map.mapWrapper.classList.remove('region-mode');
        globalMap.update();

        const closeBtn = document.getElementById('close-region-btn');
        if (closeBtn) closeBtn.remove();
    },
};