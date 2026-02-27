const tacticalRender = {
    init() {

    },

    update() {
        tacticalMap.ctx.clearRect(0, 0, tacticalMap.canvas.width, tacticalMap.canvas.height);

        const active = tacticalMap.activeUnit;
        const selectedAb = tacticalMap.selectedAbility;

        if (tacticalMap.viewMode === 'play') {
            hexFunction.drawCells(tacticalMap.ctx, tacticalMap.gridData, tacticalMap.activeUnit, {
                size: tacticalMap.size,
                mapCharSize: tacticalMap.mapCharSize,
                width: tacticalMap.width,
                height: tacticalMap.height,
            }, map.show);
        }
        else {
            for (const [key, cell] of Object.entries(tacticalMap.gridData)) {
                const [q, r] = key.split('_').map(Number);
                const { x, y } = hexFunction.hexToPixel(q, r, tacticalMap.size);
                hexFunction.drawHexBase(tacticalMap.ctx, x, y, cell, tacticalMap.size);
                if (cell.content) {
                    hexFunction.drawContent(tacticalMap.ctx, x, y, cell.content, q, r, tacticalMap.size);
                }

            }
        }
    },

    renderInitiativeLine() {
        this.initiativeLine.innerHTML = '';
        // if (this.viewMode !== 'play' || this.turnQueue.length === 0) {
        //     this.initiativeLine.style.display = 'none';
        //     return;
        // }
        // this.initiativeLine.style.display = 'flex';

        // Формируем порядок отображения (начиная с текущего индекса)
        const displayOrder = [
            ...this.turnQueue.slice(this.currentTurnIndex),
            ...this.turnQueue.slice(0, this.currentTurnIndex)
        ];

        displayOrder.forEach((unit, i) => {
            const item = createEl('div', `tf-init-item tf-team-${unit.team} ${i === 0 ? 'active' : ''}`);

            // Берем первую букву имени или иконку
            // const letter = unit.name ? unit.name[0].toUpperCase() : 'U';
            item.innerHTML = `
            <span class="unit-img">${unit.teamId}</span>
            <span class="unit-num">${unit.num}</span>
            <div class="init-value">${unit.initiative}</div>
        `;

            // Клик по иконке центрирует камеру на юните (опционально)
            item.onclick = () => {
                console.log("Инфо о юните:", unit);
            };

            this.initiativeLine.append(item);
        });
    },
};