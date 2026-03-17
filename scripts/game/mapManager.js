const mapManager = {
    saveMap() {
        const mapSnapshot = {
            mapId: this.mapId || Date.now(),
            mapName: this.mapName,
            rows: this.sizes.rows,
            cols: this.sizes.cols,
            entryCell: this.entryCell,
            // Сохраняем объект гексов целиком
            gridData: JSON.parse(JSON.stringify(tacticalMap.gridData))
        };

        if (this.mapId) {
            const index = gameData[currentGame].tacticalMaps.findIndex(m => Number(m.id) === Number(this.mapId));
            if (index > -1) gameData[currentGame].tacticalMaps[index] = mapSnapshot;
        } else {
            gameData[currentGame].tacticalMaps.push(mapSnapshot);
        }

        console.log(`Карта "${this.mapName}" (Гексы) сохранена!`);
        // dbManager.saveGame(currentGame, gameData[currentGame]);
    },

    loadMap(id) {
        const {canvas, sizes:{cellSize, width, height}, camera:{zoom}} = hexFunction.data;
        const _map = gameData[currentGame].tacticalMaps.find(m => m.mapId === id);
        if (!_map) return;
        console.log(_map);
        tacticalMap.mapId = _map.mapId;
        tacticalMap.mapName = _map.mapName;
        tacticalMap.sizes.rows = _map.rows;
        tacticalMap.sizes.cols = _map.cols;
        tacticalMap.entryCell = _map.entryCell;

        if (_map.gridData) {
            tacticalMap.gridData = JSON.parse(JSON.stringify(_map.gridData));
        } else {
            console.warn("Загрузка старой карты-массива. Конвертация...");
            tacticalMap.initGrid();
        }

        hexFunction.updateHex();
        //
        // if(tfRowInput) {
        //     tfRowInput.value = this.sizes.rows;
        //     tfColInput.value = this.sizes.cols;
        //     tacticalMap.initEditorControls();
        // }
    },

    openInnerMap({mapId, additional}) {
        if(!tfTacticalField || !tacticalMap.canvas) {
            tfTacticalField = createEl('div', 'tactical-field', '', null, 'tactical-field');
            tfGridWrapper = createEl('div', 'grid-wrapper');
            tfGrid = createEl('div', 'grid');

            tacticalMap.canvas = createEl('canvas', 'tfCanvas', '', null, 'tfCanvas');
            tacticalMap.ctx = tacticalMap.canvas.getContext('2d');
            tacticalMap.canvas.dataset.data = JSON.stringify({type: 'button', name: 'tactical-map'});
            tfGrid.append(tacticalMap.canvas);

            tacticalMap.initiativeLine = createEl('div', 'tf-initiative-line');
            tfGridWrapper.append(tacticalMap.initiativeLine, tfGrid);
            tfTacticalField.append(tfGridWrapper);
            map.container.appendChild(tfTacticalField);
        }

        tacticalMap.activeUnit = globalMap.activeUnit || regionMap.activeUnit;

        if(mapId !== '-1') {
            if(tacticalMap.activeUnit) {
                mapManager.enterMap(mapId);
            }
            else {
                mapManager.loadMap(mapId);
            }
        }
        else {
            // if(tacticalMap.activeUnit) {
            //     //TODO add generator for random map in Play Mode
            // }
            // else {}

            const mapTempId = 'map-' + (additional.cityId || (additional.hex + '–' + additional.terrain));
            const mapTempName = additional.cityName || (additional.hex + '–' + additional.terrain);

            tacticalMap.mapId = mapTempId;
            tacticalMap.mapName = mapTempName;
            tacticalMap.gridData = {};
            tacticalMap.sizes.rows = 6;
            tacticalMap.sizes.cols = 8;
            tacticalMap.activeUnit = null;

            tacticalMap.initGrid();
            hexFunction.updateHex();

        }

        Object.entries(tacticalMap.gridData).forEach(([key, cell]) => {
            if (cell?.content?.unit) {
                const [q, r] = key.split('_').map(Number);
                const unit = characterManager.getCharacterById(cell.content.unit);
                characterManager.modifyPosition(unit.id, {q,r});
                // unit.q = q;
                // unit.r = r;
                // unit.hex = key;
            }
        });

        elementById('close-region-btn').style.display = 'block';
        map.renderGridEditor();
        map.container.classList.toggle('play-mode');
    },

    closeInnerMap() {
        const {activeUnit} = hexFunction.data;
        if(activeUnit) {
            const active = characterManager.getCharacterById(activeUnit.id);
            characterManager.modifyPosition(active.id, {q:activeUnit.oldPos.q,r:activeUnit.oldPos.r});
            // active.q = activeUnit.oldPos.q;
            // active.r = activeUnit.oldPos.r;
            // activeUnit.hex = activeUnit.oldPos.hex;
            delete activeUnit.oldPos;
        }

        tacticalMap.canvas = null;
        tacticalMap.ctx = null;
        tacticalMap.gridData = {};
        tacticalMap.sizes.rows = 6;
        tacticalMap.sizes.cols = 8;
        tacticalMap.activeUnit = null;

        tfTacticalField.remove();

        if(!regionMap.ctx) {
            // elementById('close-region-btn').style.display = 'none';
            setTimeout(()=>{
                map.container.scrollTo({
                    left: globalMap.camera.x,
                    top: globalMap.camera.y,
                    behavior: 'instant'
                });
            },10);
        }
        else {
            setTimeout(()=>{
                map.container.scrollTo({
                    left: regionMap.camera.x,
                    top: regionMap.camera.y,
                    behavior: 'instant'
                });
            },10);
        }
        map.container.classList.toggle('play-mode');
    },

    enterMap(mapId) {
        const {activeUnit} = hexFunction.data;
        if(!activeUnit) return;
        const map = gameData[currentGame].tacticalMaps.find(i => i.mapId === mapId);

        if (!map || !map.entryCell) return;

        mapManager.loadMap(mapId);

        activeUnit.oldPos = {
            q: activeUnit.q,
            r: activeUnit.r,
            hex: activeUnit.hex
        };
        tacticalMap.gridData[map.entryCell].content.unit = activeUnit.id;
        const [q, r] = map.entryCell.split('_').map(Number);
        characterManager.modifyPosition(activeUnit.id, {q,r});
        // activeUnit.q = q;
        // activeUnit.r = r;
        activeUnit.team = 1;
        activeUnit.teamId = 1;
        activeUnit.num = 1;
        // activeUnit.hex = map.entryCell;
        //
        // this.currentTurnIndex = this.turnQueue.findIndex(u => u.q === q && u.r === r);
        // this.activeUnit = this.turnQueue[this.currentTurnIndex];

        tacticalMap.toggleMode();
        // this.startBattle();

        // Синхронизируем активного юнита в новой очереди

        hexFunction.updateHex();
    },

    switchLocation(mapId, startQ, startR) {
        const map = gameData[currentGame].tacticalMaps.find(i => i.id === mapId);
        if (!map) return alert("Ошибка: Карта не найдена");

        const traveler = JSON.parse(JSON.stringify(tacticalMap.activeUnit));
        mapManager.loadMap(mapId);

        // Размещаем в объекте по ключу q_r
        tacticalMap.gridData[`${startQ}_${startR}`].content.unit = traveler.id;

        battleManager.startBattle(true);

        // Синхронизируем активного юнита в новой очереди
        tacticalMap.currentTurnIndex = tacticalMap.turnQueue.findIndex(u => u.q === startQ && u.r === startR);
        tacticalMap.activeUnit = tacticalMap.turnQueue[this.currentTurnIndex];

        tacticalMap.update();
    },

    findInnerMapById(id) {
        return gameData[currentGame].tacticalMaps.find(i => i.id === mapId);
    },

    findInnerMapByHex() {},

    findHexByInnerMap(innerMap) {
        const {gridData} = hexFunction.data;
        let hex = Object.keys(globalMap.gridData).find(key=>{return globalMap.gridData[key].innerMap === innerMap});

        return hex;
    },
};