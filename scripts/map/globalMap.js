const globalMap = {

    // Инициализация слоя (вызывать один раз при загрузке карты)
    init() {
        let canvas = document.getElementById('grid-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'grid-canvas';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            map.mapWrapper.appendChild(canvas);
        }
        const img = document.getElementById('world-map');
        canvas.width = img.width;
        canvas.height = img.height;

        globalMap.update();

        turnManager.init();
    },

    getRegionBounds(regionId) {
        const regionCells = Object.entries(map.gridData)
            .filter(([key, data]) => data.region === regionId);

        if (regionCells.length === 0) return null;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        regionCells.forEach(([key, data]) => {
            const [q, r] = key.split('_').map(Number);
            const { x, y } = hexFunction.hexToPixel(q, r, map.size);

            // Расширяем границы с учетом радиуса гекса
            minX = Math.min(minX, x - map.size);
            minY = Math.min(minY, y - map.size);
            maxX = Math.max(maxX, x + map.size);
            maxY = Math.max(maxY, y + map.size);
        });

        const width = maxX - minX;
        const height = maxY - minY;

        return {
            // Центр — это ровно середина между крайними точками
            centerX: minX + width / 2,
            centerY: minY + height / 2,
            x: minX,
            y: minY,
            width: width,
            height: height
        };
    },

    drawRegionBorders(ctx, q, r, regionId) {
        const center = hexFunction.hexToPixel(q, r, map.size);
        const size = map.size;

        // 6 направлений соседей для Pointy Topped гекса
        const neighbors = [
            {dq: 1, dr: 0},  {dq: 0, dr: 1},  {dq: -1, dr: 1},
            {dq: -1, dr: 0}, {dq: 0, dr: -1}, {dq: 1, dr: -1}
        ];

        ctx.save();
        ctx.strokeStyle = "#ffffff"; // Белая внешняя граница
        ctx.lineWidth = 4;           // Сделаем жирнее для наглядности
        ctx.lineCap = "round";

        neighbors.forEach((dir, i) => {
            const nKey = `${q + dir.dq}_${r + dir.dr}`;
            const neighbor = map.gridData[nKey];
            const neighborRegion = neighbor ? neighbor.region : -1;

            // ВАЖНО: Рисуем грань, только если ID регионов РАЗНЫЕ
            // Это создаст общую внешнюю контурную линию для всей группы гексов
            if (neighborRegion !== regionId) {
                // Углы гекса для каждой грани (i и i+1)
                const angle1 = (Math.PI / 180) * (60 * i - 30);
                const angle2 = (Math.PI / 180) * (60 * (i + 1) - 30);

                ctx.beginPath();
                ctx.moveTo(center.x + size * Math.cos(angle1), center.y + size * Math.sin(angle1));
                ctx.lineTo(center.x + size * Math.cos(angle2), center.y + size * Math.sin(angle2));
                ctx.stroke();
            }
        });
        ctx.restore();
    },

    switchLocation(mapId, startQ, startR) {
        this.currentTurnIndex = this.turnQueue.findIndex(u => u.q === startQ && u.r === startR);
        this.activeUnit = this.turnQueue[this.currentTurnIndex];

        globalMap.update();
    },

    update() {
        if (!map.gridData) return;

        const canvas = document.getElementById('grid-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hexFunction.drawCells(ctx, map.gridData, map.activeUnit, {
            size: map.size,
            mapCharSize: map.mapCharSize,
            width: map.width,
            height: map.height
        }, map.show);
    },
};