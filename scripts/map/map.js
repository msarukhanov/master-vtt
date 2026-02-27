const map = {

    mapWrapper: null,
    controls:null,
    notes:null,
    hexEditor:null,

    mapCharacters: [],
    mapObjects: [],
    gridData: [],

    size: 40,
    mapCharSize: 50,
    get width() { return Math.sqrt(3) * this.size; },
    get height() { return 2 * this.size; },

    moving: false,
    selectedCharacter: null,
    selectedCharacterLink: null,
    selectedObject: null,
    selectedObjectLink: null,
    selectedCell: null,

    factionSelect: null,
    regionSelect: null,
    terrainSelect: null,
    // terrains: ['grass', 'stone', 'water', 'sand'],
    terrains: [
        "clearSea",
        "sea",
        "beachSand",

        "desert",
        "sand",

        "grass",
        "mudLeaves",
        "forestLeaves",

        "snow",
        "iceSnow",

        "brickWall",

        "stoneRoad",
        "stoneWall",
        "rockMountain",
        "lava"
    ],
    heightSelect: null,
    heights: [1, 1.5, 2, 2.5, 3, 3.5, 4],

    teams: [1,2,3,4,5],
    objectTypes: ['tree', 'rock', 'chest', 'wall', 'water', 'pit', 'corpse', 'portal'],

    impassableTerrains: ['water', 'mountain', 'lava', 'pit'],

    mapSeasonSelect: null,
    mapCharSelect: null,
    mapObjSelect: null,
    eraserMode: false,
    paintMode: false,

    isRegionView: false,
    globalCamera: {
        x: 0,      // Текущий сдвиг по X
        y: 0,      // Текущий сдвиг по Y
        scale: 1,  // Текущий зум
    },
    camera: {
        x: 0,      // Текущий сдвиг по X
        y: 0,      // Текущий сдвиг по Y
        scale: 1,  // Текущий зум
    },
    show: {
        fog: false,
        factions: false,
        yeilds: true,
        terrain: false,
    },
    fogToggle: null,

    activeUnit: null,
    currentReachable: null,
    animatingUnit: null,

    render(skipControls = false) {
        this.mapWrapper = elementById("map");
        this.mapCharacters = [...(currentSeason.mapCharacters || [])];
        this.mapObjects = [...(currentSeason.mapObjects || [])];
        currentSeason.gridData = currentSeason.gridData || {};
        this.gridData = {...(currentSeason.gridData || {})};

        this.gridData = gameData.storiesOfTheEnd.gridData;
        data.resources = [
            { id: 'gold', name: 'Золото', icon: '💰' },
            { id: 'wood', name: 'Дерево', icon: '🪵' },
            { id: 'ore', name: 'Руда', icon: '⛏️' },
            { id: 'food', name: 'Еда', icon: '🍞' }
        ];

        if(!skipControls) this.renderControls(this.mapWrapper);
        if(!skipControls) this.renderHexEditor(this.mapWrapper);

        const _map = document.createElement("img");
        _map.id = 'world-map';
        _map.src = images[currentGame].map;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        _map.onload = () => {
            canvas.width = _map.width;
            canvas.height = _map.height;
            ctx.drawImage(_map, 0, 0);

            globalMap.init();
        };

        _map.onclick = this.clickMap;

        this.mapWrapper.appendChild(_map);
    },

    renderControls() {
        this.renderNotes();

        const mainWrapper = elementById("main-wrapper");
        this.controls = createEl('div', 'map-controls collapsed');

        const collapseBtn = createEl('div', 'collapse-btn', '⚙️');
        collapseBtn.onclick = () => {
            this.notes.classList.add('collapsed');
            this.controls.classList.toggle('collapsed');
            this.hexEditor.classList.add('collapsed');
        };
        this.controls.append(collapseBtn);

        function addSeason() {
            const season = main.addSeason();
            this.mapWrapper.innerHTML = '';
            main.setCurrentSeason(season);
            map.render(true);
        }

        const seasonRow = createEl('div', 'map-season-row');
        seasonRow.innerHTML = `<label>Choose <button onclick="addSeason()">➕</button></label> `;
        this.mapSeasonSelect = Object.assign(createEl('select', 'map-controls-select map-season-select'),  {value:currentSeason.id});
        this.mapSeasonSelect.append(new Option(`Select season`, -1));
        gameData.seasons.forEach(i => this.mapSeasonSelect.append(new Option(`${i.name}`, i.id)));
        this.mapSeasonSelect.onclick = (e) => {
            const season = gameData.seasons.find(s=>Number(s.id)===Number(e.target.value));
            if(season) {
                this.controls.classList.add('season-selected');
            }
            else {
                this.controls.classList.remove('season-selected');
            }
        };
        seasonRow.append(this.mapSeasonSelect);
        this.controls.append(seasonRow);

        const seasonRow2 = createEl('div', 'map-season-edit');
        seasonRow2.innerHTML = `<label>Name</label><label>Load</label><label>Save</label><label>Del</label>`;
        const nameInp = Object.assign(createEl('input'), { type: 'text', value: currentSeason.name, placeholder: 'Имя ' });
        nameInp.oninput = () => { currentSeason.name = nameInp.value; };
        const btnLoad = createEl('button', `save-btn`, '💾');
        btnLoad.onclick = () => {
            const season = gameData.seasons.find(s=>Number(s.id)===Number(this.mapSeasonSelect.value));
            this.mapWrapper.innerHTML = '';
            main.setCurrentSeason(season);
            map.render(true);
        };
        const btnSave = createEl('button', `save-btn`, '↺');
        btnSave.onclick = () => {
            main.saveCurrentSeason();
        };
        const btnDel = createEl('button', `del-btn`, '❌');
        btnDel.onclick = () => {
            main.delSeason(Number(this.mapSeasonSelect.value));
            this.mapSeasonSelect.value = -1;
            this.controls.classList.remove('season-selected');
        };
        seasonRow2.append(nameInp, btnLoad,btnSave,btnDel);
        this.controls.append(seasonRow2);

        const showRow = createEl('div', 'map-controls-row');
        showRow.innerHTML = `<label>Terrain</label><label>Chars</label><label></label>`;
        // const showRowLocs = Object.assign(createEl('input'), { type: 'checkbox', checked: true});
        // showRowLocs.oninput = () => { this.mapWrapper.classList.toggle('hiddenLocations'); };
        // const showRowChars = Object.assign(createEl('input'), { type: 'checkbox', checked: true});
        // showRowChars.oninput = () => { this.mapWrapper.classList.toggle('hiddenCharacters'); };

        const showRowTerrain = Object.assign(createEl('input'), { type: 'checkbox', checked: map.show.terrain});
        showRowTerrain.oninput = () => {
            map.show.terrain = !map.show.terrain;
            globalMap.update();
        };
        showRow.append(showRowTerrain);
        this.controls.append(showRow);

        const showRow2 = createEl('div', 'map-controls-row');
        showRow2.innerHTML = `<label>Fog</label><label>Factions</label><label></label>`;
        const showRowFog = Object.assign(createEl('input'), { type: 'checkbox', checked: map.show.fog});
        showRowFog.oninput = () => {
            map.show.fog = !map.show.fog;
            globalMap.update();
        };
        const showRowFactions = Object.assign(createEl('input'), { type: 'checkbox', checked: map.show.factions});
        showRowFactions.oninput = () => {
            map.show.factions = !map.show.factions;
            globalMap.update();
        };
        showRow2.append(showRowFog, showRowFactions);
        this.controls.append(showRow2);

        const showRow3 = createEl('div', 'map-controls-row');
        showRow3.innerHTML = `<label>Yields</label><label></label><label></label>`;
        const showRowYeild = Object.assign(createEl('input'), { type: 'checkbox', checked: map.show.yeilds});
        showRowYeild.oninput = () => {
            map.show.yeilds = !map.show.yeilds;
            globalMap.update();
        };
        showRow3.append(showRowYeild);
        this.controls.append(showRow3);

        this.mapCharSelect = createEl('select', 'map-controls-select map-character-select');
        this.mapCharSelect.append(new Option(`Select character`, -1));
        data.characters.forEach(i => this.mapCharSelect.append(new Option(`${i.name}`, i.id)));
        this.mapCharSelect.onclick = (e) => {
            map.selectedObject = null;
            map.selectedCharacter = data.characters.find(c=>c.id===e.target.value);
            if(map.selectedCharacterLink) {
                map.selectedCharacterLink.classList.remove('selected');
            }
            map.selectedCharacterLink = null;
        };

        this.controls.append(this.mapCharSelect);

        this.mapObjSelect = createEl('select', 'map-controls-select map-object-select');
        this.mapObjSelect.append(new Option(`Select object`, -1));
        this.objectTypes.forEach(type => this.mapObjSelect.append(new Option(type, type)));

        this.mapObjSelect.onchange = (e) => {
            if(e.target.value === "-1") {
                map.selectedObject = null;
                return;
            }
            map.selectedCharacter = null;
            map.selectedObject = { type: e.target.value };
            map.moving = true;
        };
        this.controls.append(this.mapObjSelect);

        const btnRow = createEl('div', 'map-controls-row');
        const eraserBtn = createEl('button', 'map-controls-btn eraser-btn', `${l10n[lang].erase}`);
        eraserBtn.onclick = () => {
            map.eraserMode = !map.eraserMode;
            eraserBtn.classList.toggle('active', map.eraserMode);

            if(map.eraserMode) {
                map.selectedCharacter = null;
                map.selectedObject = null;
                map.moving = false;
                map.mapCharSelect.value = -1;
                if(map.mapObjSelect) map.mapObjSelect.value = -1;
                if(map.selectedCharacterLink) map.selectedCharacterLink.classList.remove('selected');
            }
        };

        const masterEcoBtn = createEl('button', 'map-controls-btn master-eco-btn', `${l10n[lang].economics}`);
        masterEcoBtn.onclick = () => {
            economyManager.renderMasterTable();
        };
        btnRow.append(eraserBtn,masterEcoBtn);
        this.controls.append(btnRow);

        mainWrapper.append(this.controls);
    },

    renderHexEditor() {
        const mainWrapper = elementById("main-wrapper");
        this.hexEditor = createEl('div', 'map-hex-editor collapsed');

        const collapseBtn = createEl('div', 'collapse-btn', '&#9638;️');
        collapseBtn.onclick = () => {
            this.notes.classList.add('collapsed');
            this.controls.classList.add('collapsed');
            this.hexEditor.classList.toggle('collapsed');

        };
        this.hexEditor.append(collapseBtn);

        // 1. Селект Региона (Локации)
        const locLabel = createEl('label', '', 'Region:');
        this.regionSelect = createEl('select', 'map-controls-select');
        this.regionSelect.append(new Option('No Region', -1));
        data.locations.forEach(loc => {
            this.regionSelect.append(new Option(loc.name, loc.id));
        });

        // 2. Селект Владельца (Фракции)
        const factionLabel = createEl('label', '', 'Owner:');
        this.factionSelect = createEl('select', 'map-controls-select');
        this.factionSelect.append(new Option('Neutral', -1));
        (data.factions.filter(i=>!!i.territory)).forEach(f => {
            this.factionSelect.append(new Option(f.name, f.id));
        });

        // 3. Селект Террейна (Тип ландшафта)
        const terLabel = createEl('label', '', 'Terrain:');
        this.terrainSelect = createEl('select', 'map-controls-select');
        this.terrainSelect.append(new Option('None', -1));
        this.terrains.forEach(t => {
            this.terrainSelect.append(new Option(t, t));
        });

        const heightLabel = createEl('label', '', 'Height:');
        this.heightSelect = createEl('select', 'map-controls-select');
        this.heightSelect.append(new Option('Neutral', -1));
        this.heights.forEach(t => {
            this.heightSelect.append(new Option(t, t));
        });

        // Режим покраски (Paint Mode)
        map.paintMode = false;
        const paintBtn = createEl('button', 'map-controls-btn', '🖌️ Paint');
        paintBtn.onclick = () => {
            map.paintMode = !map.paintMode;
            paintBtn.classList.toggle('active', map.paintMode);
        };

        const resWrapper = createEl('div', 'hex-res-editor');
        resWrapper.innerHTML = '<h4>Ресурсы клетки</h4>';

        data.resources.forEach(res => {
            const row = createEl('div', 'res-row');
            const label = createEl('label', '', `${res.icon} ${res.name}`);
            const input = Object.assign(createEl('input', 'hex-res-input', 0, res.id), {
                type: 'number',
                value: 0,
                min: 0
            });

            // При изменении сразу записываем в "память" редактора (как с регионом)
            input.oninput = () => {
                if (!map.tempCellData) map.tempCellData = {}; // Буфер текущих настроек
                if (!map.tempCellData.yield) map.tempCellData.yield = {};
                map.tempCellData.yield[res.id] = parseInt(input.value) || 0;
            };

            row.append(label, input);
            resWrapper.append(row);
        });

        this.hexEditor.append(locLabel, this.regionSelect, factionLabel, this.factionSelect,
            terLabel, this.terrainSelect, heightLabel, this.heightSelect, resWrapper, paintBtn);
        // this.controls.append(editor);

        mainWrapper.append(this.hexEditor);
    },

    clickMap(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // const { x, y } = map.getMousePos(e);
        console.log(x,y);
        // 1. Получаем координаты гекса
        const { q, r } = hexFunction.pixelToHex(x, y, map.size);
        const hexKey = `${q}_${r}`;

        console.log(q,r, hexKey, map.paintMode, map.selectedCharacter);
        // 2. Если включен режим покраски (Paint Mode)
        if (map.paintMode) {
            if (!map.gridData) map.gridData = {};

            let currentYield = null;
            if(map.tempCellData) {
                currentYield = {};
                Object.keys(map.tempCellData.yield).forEach(key => {
                    const val = parseInt(map.tempCellData.yield[key]) || 0;
                    if (val > 0) currentYield[key] = map.tempCellData.yield[key];
                });
            }

            console.log(map.regionSelect.value, map.factionSelect.value, map.terrainSelect.value, map.heightSelect.value);

            if(map.regionSelect.value && map.regionSelect.value !== "-1") {
                map.gridData[hexKey].region = map.regionSelect.value;
            }
            if(map.factionSelect.value && map.factionSelect.value !== "-1") {
                map.gridData[hexKey].owner = map.factionSelect.value;
            }
            if(map.terrainSelect.value && map.terrainSelect.value !== "-1") {
                map.gridData[hexKey].terrain = map.terrainSelect.value;
            }
            if(map.heightSelect.value && map.heightSelect.value > 0) {
                map.gridData[hexKey].height = map.heightSelect.value;
            }
            if(currentYield) {
                map.gridData[hexKey].yield = currentYield;
            }

            // Записываем данные из селекторов твоего редактора
            // map.gridData[hexKey] = {
            //     region: map.regionSelect.value, // ID из data.locations
            //     owner: map.factionSelect.value,  // ID из data.factions
            //     terrain: map.terrainSelect.value,           // строка типа 'grass'
            //     yield: currentYield
            // };

            console.log(map.gridData);

            // 3. Сразу перерисовываем слой, чтобы увидеть результат
            globalMap.update();

            // 4. Сохраняем в БД
            // dbManager.saveGame(currentGame, gameData[currentGame]);
        }
        else {
            // Логика обычного клика (выбор персонажа или инфо о клетке)
            const cell = map.gridData?.[hexKey];
            if (cell) {
                const hexPos = hexFunction.hexToPixel(q, r, map.size);

                console.log("Клетка:", cell, map.isRegionView, map.selectedCharacter);
                if (!map.isRegionView) {
                    // МЫ НА ГЛОБАЛЬНОЙ КАРТЕ добавляем перса из редактора
                    if (map.selectedCharacter) {
                        if(map.mapCharSelect.value) {
                            // 2. Записываем данные в персонажа
                            map.selectedCharacter.regionId = cell.region;
                            map.selectedCharacter.x = hexPos.x;
                            map.selectedCharacter.y = hexPos.y;
                            map.selectedCharacter.hex = hexKey;

                            cell.content = {
                                type: 'char',
                                instId: Math.floor(Math.random()*10000),
                                ...JSON.parse(JSON.stringify(defaultStats)),
                                ...JSON.parse(JSON.stringify(map.selectedCharacter))
                            };
                            globalMap.update();

                            map.selectedCharacter = null;
                            map.mapCharSelect.value = -1;
                        }
                    }
                    else {
                        regionMap.init(cell.region);
                    }
                } else {
                    // МЫ ВНУТРИ РЕГИОНА
                    // Здесь обычное поклеточное перемещение (q, r)
                    // if (map.selectedCharacter) {
                    //     map.moveCharacter(q, r);
                    // }
                    // else {
                    //     // map.selectedCharacter =
                    // }
                }
            }
        }
    },

    deleteCharacter(charId) {
        const index = map.mapCharacters.findIndex(c => c.id === charId);
        if(index > -1) map.mapCharacters.splice(index, 1);

        data.locations.forEach(loc => {
            if(loc.characters) loc.characters = loc.characters.filter(c => c.id !== charId);
        });

        event.currentTarget.remove();
        dbManager.saveGame(currentGame, gameData[currentGame]);
    },

    clickObject(event) {
        const objId = event.currentTarget.data;
        if(!objId) return;

        if(map.eraserMode) {
            const index = map.mapObjects.findIndex(c => c.id === objId);
            if(index > -1) map.mapObjects.splice(index, 1);

            event.currentTarget.remove();
            dbManager.saveGame(currentGame, gameData[currentGame]);
            return;
        }

        map.selectedObject = map.mapObjects.find(c=>c.id===objId);
        map.mapCharSelect.value = map.selectedObject.id;
        if(map.selectedObjectLink) {
            map.selectedObjectLink.classList.remove('selected');
        }

        map.selectedObjectLink = event.currentTarget;
        map.selectedObjectLink.classList.add('selected');

        if(map.moving) {
            return;
        }

        map.moving = true;
    },


    renderNotes() {
        const mainWrapper = elementById("main-wrapper");

        this.notes = createEl('div', 'map-notes collapsed');
        const notesBtn = createEl('div', 'collapse-btn', '📜');
        notesBtn.onclick = () => {
            this.controls.classList.add('collapsed');
            this.notes.classList.toggle('collapsed');
            this.hexEditor.classList.add('collapsed');
        };
        this.notes.append(notesBtn);

        const list = createEl('div', 'notes-list');
        list.id = 'notes-list';

        const footer = createEl('div', 'notes-footer');
        const area = createEl('textarea');
        const addBtn = createEl('button', '', '➕');

        addBtn.onclick = () => {
            if(!area.value.trim()) return;
            currentSeason.notes.push({
                id: Date.now(),
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                text: area.value
            });
            area.value = '';
            this.refreshNotes();
            main.saveCurrentSeason();
        };

        footer.append(area, addBtn);
        this.notes.append(list, footer);
        mainWrapper.append(this.notes);
        this.refreshNotes();
    },

    refreshNotes() {
        const list = elementById('notes-list');
        list.innerHTML = '';
        currentSeason.notes.forEach(n => {
            const item = createEl('div', 'note-item');
            item.innerHTML = `<small>${n.date}</small><div>${n.text}</div>`;
            list.prepend(item);
        });
    },

    showContextMenu(e, charMap, element, type) {
        e.preventDefault();
        e.stopPropagation();

        const oldMenu = document.getElementById('map-context-menu');
        if (oldMenu) oldMenu.remove();

        const menu = createEl('div', 'map-context-menu', 0, '', 'map-context-menu');

        const actions = [
            { label: l10n[lang].info, icon: '📜', click: () => { searchEngine.clickItem({...charMap, type}); } },
            { label: l10n[lang].character, icon: '👤', click: () => { charManager.open(charMap.id); } },
            { label: l10n[lang].del, icon: '🗑️', click: () => {map.deleteCharacter(charMap.id)}}
        ];

        actions.forEach(act => {
            const item = createEl('div', 'menu-item', `${act.icon} ${act.label}`);
            item.onclick = () => {
                act.click();
                menu.remove();
            };
            menu.appendChild(item);
        });

        const rect = this.mapWrapper.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

        menu.style.left = x + 'px';
        menu.style.top = y + 'px';

        this.mapWrapper.appendChild(menu);

        setTimeout(() => {
            const close = () => { menu.remove(); document.removeEventListener('click', close); };
            document.addEventListener('click', close);
        }, 10);
    },

};

