const tacticalHexGrid = {

    initGrid(r, c) {
        tacticalMap.rows = r;
        tacticalMap.cols = c;
        tacticalMap.gridData = {};

        const padding = 1;

        for (let row = 0; row < r; row++) {
            let r_offset = Math.floor(row / 2) + 1;
            for (let col = -r_offset; col < c - r_offset; col++) {
                const q = col + tacticalMap.padding;
                const r = row + tacticalMap.padding;
                const key = `${q}_${r}`;
                tacticalMap.gridData[key] = {
                    terrain: 'grass',
                    height: 1,
                    content: null,
                    explored: true
                };
            }
        }
        console.log(`Гексагональное поле ${r}x${c} создано.`);
        tacticalMap.update();
    },

    handleCanvasClick(e) {
        const rect = e.target.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const { q, r } = hexFunction.pixelToHex(mouseX, mouseY, tacticalMap.size);
        const key = `${q}_${r}`;
        const cell = tacticalMap.gridData[key];

        if (!cell) return;

        if (tacticalMap.viewMode === 'edit') {
            tacticalHexGrid.handleCellClickEditor(q, r);
        }
        else {
            tacticalHexGrid.handleCellClickPlay(q, r);
        }
        tacticalMap.update();
    },

    handleCellClickEditor(q, r) {
        const key = `${q}_${r}`;
        const cell = tacticalMap.gridData[key];

        if (tacticalMap.mode === 'erase') {
            cell.content = null;
            tacticalMap.selectedCharLink = null;
            tacticalMap.selectedObjectLink = null;
        }
        else if (tacticalMap.mode === 'character') {
            if (!cell.content) {
                teamCounters[tacticalMap.selectedTeam]++;
                const template = tacticalMap.selectedChar || defaultStats;
                cell.content = {
                    type: 'char',
                    team: tacticalMap.selectedTeam || 1,
                    teamId: teamCounters[tacticalMap.selectedTeam],
                    instId: Math.floor(Math.random()*10000),
                    ...JSON.parse(JSON.stringify(defaultStats)),
                    ...JSON.parse(JSON.stringify(template))
                };
                tacticalMap.selectedChar = null;
            }
        }
        else if (tacticalMap.mode === 'terrain') {
            cell.terrain = tacticalMap.selectedTerrain;
            cell.height = tacticalMap.selectedHeight;
        }
        else if (tacticalMap.mode === 'object') {
            if (!cell.content) {
                cell.content = {
                    type: 'obj',
                    obj: tacticalMap.selectedObject,
                    id: Math.floor(Math.random()*10000),
                    inventory: [] // Задел под лут
                };
            }
        }
        else {
            if (tacticalMap.moving) {
                if (!cell.content) {
                    cell.content = tacticalMap.moving.data;
                    tacticalMap.gridData[tacticalMap.moving.q + "_" + tacticalMap.moving.r].content = null;
                    tacticalMap.moving = null;
                } else { tacticalMap.moving = null; }
            }
            else if (cell.content) {
                if (cell.content.type === 'char') {
                    // Записываем q, r вместо x, y
                    tacticalMap.selectedCharLink = { q, r, ...cell.content };
                    tacticalMap.selectedObjectLink = null;
                    tacticalMap.renderCharEditor();
                }
                else if (cell.content.type === 'obj') {
                    tacticalMap.selectedObjectLink = { q, r, ...cell.content };
                    tacticalMap.selectedCharLink = null;
                }
            }
            else {
                tacticalMap.selectedCharLink = null;
                tacticalMap.selectedObjectLink = null;
                tacticalMap.editorContainer.innerHTML = '';
                // Передаем q, r в редактор клетки
                tacticalMap.renderCellEditor(q, r);
            }
        }
    },

    handleCellClickPlay (q, r) {
        const key = `${q}_${r}`;
        const cell = tacticalMap.gridData[key];

        const active = tacticalMap.activeUnit;
        if (!active || tacticalMap.viewMode !== 'play') return;

        // ЕСЛИ ВЫБРАНА СПОСОБНОСТЬ
        if (tacticalMap.selectedAbility) {
            const dist = hexFunction.getHexDistance(q, r, active.q, active.r);

            // Клик только внутри допустимого радиуса
            if (dist <= tacticalMap.selectedAbility.range) {
                tacticalMap.abilityTarget = { q, r }; // Фиксируем прицел
                // tacticalField.renderPlayCard(); // Чтобы появилась кнопка "ОК"
                tacticalMap.update(); // Перерисовываем для красной зоны
            } else {
                console.log("Цель вне радиуса действия способности");
            }
            return;
        }

        if (tacticalMap.canAttack(q, r)) {
            tacticalMap.executeAttack(active, {q, r, ...cell.content});
        }
        else if (hexFunction.canReach(tacticalMap.gridData, tacticalMap.activeUnit, q, r) && !active.hasMoved) {
            hexFunction.executeMove(tacticalMap.gridData, tacticalMap.activeUnit, tacticalMap.size, tacticalMap.zoom, q, r);
        }
    },
};