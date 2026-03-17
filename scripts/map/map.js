const map = {

    container: null,

    mapWrapper: null,
    buttons: null,
    controls:null,
    notes:null,
    notesTextArea: null,
    gridEditor: null,
    hexEditor:null,
    socialEditor:null,
    characterEditor: null,
    objectEditor: null,

    moving: false,
    selectedCharacter: null,
    selectedObject: null,
    selectedObjectLink: null,
    selectedCell: null,

    mode: 'edit',
    clickMode: 'select',
    menu: '',

    containers: {
        closeBtn: null,

        cellResources: null,
        cellFlags: null,
        cellSave: null,

        cellCharacterSave: null,
        cellObjectSave: null,
        cellInnerMap: null
    },

    selects : {
        season:  null,
        generatorType: null,

        region: null,
        faction: null,
        culture: null,
        religion: null,
        terrain: null,
        height: null,

        character: null,
        team: null,

        object: null,
        innerMap: null,
    },

    inputs : {
        seasonName: null,
        generatorNum: null,

        mapId: null,
        mapName: null,
        mapRows: null,
        mapCols: null,

        cityId: null,
        cityName: null,
        cityPopulation: null,

        objectId: null,
        objectName: null,

        hexResources: {},
    },

    selected : {
        hex: null,
        cell: null,
        character: null,
        object: null
    },

    factionSelect: null,
    regionSelect: null,

    terrainSelect: null,
    terrains: Object.keys(assets.terrains),
    impassableTerrains: ['water', 'mountain', 'lava', 'pit'],
    heightSelect: null,
    heights: [1, 1.5, 2, 2.5, 3, 3.5, 4],


    objectTypes: Object.keys(assets.objects),
    objectIcons: {
        "portal" : "🌀",
        "corpse" : "💀",
        "chest" : "📦",
        "tree" : "🌳",
        "rock" : "🪨",
        "mountain" : "⛰",
        "water" : "💧",
        "pit" : "🕳",
        "door" : "🚪",
        "wall" : "🧱",
        "town_hall" : "🏛",
        "house" : "🏠",
        "market": "⚖️",
        "tavern": "🍺",
        "temple" : "⛪",
        "well" : "⛲",
        "lamp" : "🏮",
        "barracks": "⚔️",
        "prison": "⛓️",
        "statue": "🗿",
        "scaffold": "🪓",
        "tower": "🏰",
        "bench": "🪑",
        "flowers": "🌸",
        "garden": "🌿",
        "fountain": "⛲",
        "stall": "⛺",
        "cart": "🛒",
        "barrel": "🛢", // Больше бочек для трущоб
        "bones": "🦴",   // У тюрьмы
        "gold_statue": "🔱", // Элитный декор
    },
    obstacleObjects: [
        'mountain','rockyMountain','snowMountain',
        'house', 'fountain', 'statue1', 'obelisk',
        'blacksmith', 'castle', 'church', 'city',
        'stable', 'temple', 'tower', 'townhall', 'tavern',
        'mausoleum', 'maze', 'mine', 'port', 'pyramid'
    ],
    interactableObjects: [
        'house', 'obelisk', 'blacksmith', 'castle', 'church',
        'stable', 'temple', 'tower', 'townhall', 'tavern',
        'mausoleum', 'maze', 'mine', 'obelisk', 'port', 'pyramid'
    ],

    teams: [1,2,3,4,5],
    teamColors: {
        1: "#e74c3c",
        2: "#3498db",
        3: "#2ecc71",
        4: "#f1c40f",
        5: "#9b59b6",
        0: "#333",
    },

    resources: [
        { id: 'gold', name: 'Золото', icon: '💰' },
        { id: 'wood', name: 'Дерево', icon: '🪵' },
        { id: 'ore', name: 'Руда', icon: '⛏️' },
        { id: 'food', name: 'Еда', icon: '🍞' }
    ],
    flags: [
        { id: 'isCapital', icon: '⭐', label: 'Столица' },
        { id: 'isTradeHub', icon: '⚖️', label: 'Торговый Узел' },
        { id: 'isFort', icon: '🏰', label: 'Форт' },
        { id: 'isPort', icon: '⚓', label: 'Порт' },
        { id: 'isCity', icon: '🏘', label: 'Город' }
    ],

    mapSeasonSelect: null,
    mapCharSelect: null,
    mapObjSelect: null,
    eraserMode: false,
    paintMode: false,

    isRegionView: false,

    currentReachable: null,
    animatingUnit: null,

    currentRegion: null,
    currentMap: null,

    render(skipControls = false) {

        // const filtered = (data.characters.filter(i=>!i.id));
        // console.log(filtered);

        map.container = elementById("map");

        if(map.container) {
            map.container.addEventListener('scroll', () => {
                let d;
                if (tacticalMap.ctx) d = tacticalMap;
                else if (regionMap.ctx) d = regionMap;
                else d = globalMap;
                d.camera.x = map.container.scrollLeft;
                d.camera.y = map.container.scrollTop;
            });
        }

        map.terrains = Object.keys(assets.terrains);
        map.objectTypes = Object.keys(assets.objects);

        currentSeason.gridData = gameData.storiesOfTheEnd.gridData;
        // currentSeason.diplomacy = gameData.storiesOfTheEnd.diplomacy;
        // currentSeason.contracts = gameData.storiesOfTheEnd.contracts;
        // currentSeason.parties = gameData.storiesOfTheEnd.parties;
        currentSeason.characters = gameData.storiesOfTheEnd._characters;
        //
        globalMap.init();
        // // this.mapCharacters = [...(currentSeason.mapCharacters || [])];
        // // this.mapObjects = [...(currentSeason.mapObjects || [])];
        //
        // currentSeason.gridData = currentSeason.gridData || {};
        // currentSeason.diplomacy = currentSeason.diplomacy || {};
        // currentSeason.contracts = currentSeason.contracts || {};
        // if(!currentSeason.characters) {
        //     currentSeason.characters = data.characters.map(c=>characterManager.prepareCharacter(c));
        // }
        //
        // currentSeason.exploredCells = currentSeason.exploredCells || {};
        //
        // this.gridData = {...(currentSeason.gridData || {})};

        if(!skipControls) this.renderControls(map.container);
        if(!skipControls) this.renderGridEditor(map.container);
        if(!skipControls) this.renderHexEditor(map.container);
        if(!skipControls) this.renderCharacterEditor(map.container);
        if(!skipControls) this.renderObjectsEditor(map.container);
        // if(!skipControls) this.renderSocialEditor(map.container);
        this.renderNotes();

        this.renderButtons();

        // tacticalMap.initShort(map.container);
    },

    scrollTo(x=0,y=0) {
        const centerX = x ? (x - map.container.clientWidth / 2) : ((map.container.scrollWidth - map.container.clientWidth) / 2);
        const centerY = y ? (y - map.container.clientHeight / 2) : ((map.container.scrollHeight - map.container.clientHeight) / 2);
        map.container.scrollTo({
            left: centerX,
            top: centerY,
            behavior: 'smooth' // плавный перелет
        });
    },

    scrollToChar(char = null) {
        const {sizes:{bounds},activeUnit} = hexFunction.data;
        if(!char) {
            char = activeUnit;
        }
        let { x, y } = hexFunction.hexToPixel(char.q, char.r);
        if(!bounds) map.scrollTo(x,y);
        else map.scrollTo((x - bounds.x),(y - bounds.y));
    },

    handleButtons(btn) {
        switch (btn) {
            case 'play':
                map.mode = btn;
                map.buttons.classList.add('play');
                map.buttons.classList.remove('edit');
                break;
            case 'edit':
                map.mode = btn;
                map.buttons.classList.remove('play');
                map.buttons.classList.add('edit');
                break;
            case 'select':
            case 'paint':
            case 'erase':
                map.clickMode = btn;
                break;
            default:
                map.menu = (map.menu === btn) ? '' : btn;
                ['notes', 'controls', 'gridEditor', 'hexEditor', 'characterEditor', 'objectEditor'].forEach(key => {
                    if (key === btn) {
                        map[key].classList.toggle('collapsed');
                    }
                    else {
                        map[key].classList.add('collapsed');
                    }
                });
                break;
        }
        map.renderButtons();
    },

    renderButtons() {
        const mainWrapper = elementById("main-wrapper");
        if(!this.buttons) {
            this.buttons = createEl('div', 'map-top-buttons ' + (map.mode==='edit'?'edit':'play'));
        }
        this.buttons.innerHTML = '';

        const playBtn = createEl('div', 'collapse-btn edit-btn ', '🎮');
        playBtn.innerHTML = assets.icons.play;
        playBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'play'});

        const editBtn = createEl('div', 'collapse-btn play-btn ', '📝');
        editBtn.innerHTML = assets.icons.edit;
        editBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'edit'});

        //next-turn-btn
        const turnBtn = createEl('div', 'collapse-btn play-btn', '⏳');
        turnBtn.innerHTML = assets.icons.hourglass;
        turnBtn.dataset.data = JSON.stringify({type:'click',name:'global-turn-end'});

        const settingsBtn = createEl('div', 'collapse-btn edit-btn ' + (map.menu==='controls'?'selected':''), '⚙️');
        settingsBtn.innerHTML = assets.icons.settings;
        settingsBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'controls'});

        const selectBtn = createEl('div', 'collapse-btn edit-btn ' + (map.clickMode==='select'?'selected':''), '↖️');
        selectBtn.innerHTML = assets.icons.select;
        selectBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'select'});

        const paintBtn = createEl('div', 'collapse-btn edit-btn ' + (map.clickMode==='paint'?'selected':''), '🖌');
        paintBtn.innerHTML = assets.icons.paint;
        paintBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'paint'});

        const eraserBtn = createEl('div', 'collapse-btn edit-btn ' + (map.clickMode==='erase'?'selected':''), '🧽');
        eraserBtn.innerHTML = assets.icons.erase;
        eraserBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'erase'});

        const gridBtn = createEl('div', 'collapse-btn edit-btn ' + (map.menu==='gridEditor'?'selected':''), '▦');
        gridBtn.innerHTML = assets.icons.global;
        gridBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'gridEditor'});

        const hexBtn = createEl('div', 'collapse-btn edit-btn ' + (map.menu==='hexEditor'?'selected':''), '⬢');
        hexBtn.innerHTML = assets.icons.hex;
        hexBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'hexEditor'});

        const characterBtn = createEl('div', 'collapse-btn edit-btn ' + (map.menu==='characterEditor'?'selected':''), '👥');
        characterBtn.innerHTML = assets.icons.charInfo;
        characterBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'characterEditor'});

        const objectBtn = createEl('div', 'collapse-btn edit-btn ' + (map.menu==='objectEditor'?'selected':''), '🌲');
        objectBtn.innerHTML = assets.icons.house;
        objectBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'objectEditor'});

        // const socialBtn = createEl('div', 'collapse-btn edit-btn ' + (map.menu==='socialEditor'?'selected':''), '👥');
        // socialBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'socialEditor'});

        const notesBtn = createEl('div', 'collapse-btn ' + (map.menu==='notes'?'notes':''), '📜');
        notesBtn.innerHTML = assets.icons.notes;
        notesBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'notes'});

        this.buttons.append(playBtn, editBtn, turnBtn, settingsBtn, selectBtn, eraserBtn, paintBtn, gridBtn, hexBtn, characterBtn, objectBtn, notesBtn);
        mainWrapper.append(this.buttons);

        if(!map.closeBtn) {
            map.closeBtn = createEl('button', 'close-region-btn', '✖',null, 'close-region-btn');
            map.closeBtn.dataset.data = JSON.stringify({type:'click',name:'region-close'});
            // map.container.appendChild(closeBtn);
            mainWrapper.appendChild(map.closeBtn);
        }
    },

    renderControls() {
        const {show} = hexFunction.data;

        const mainWrapper = elementById("main-wrapper");
        if(!this.controls) {
            this.controls = createEl('div', 'map-top-controls map-controls collapsed');
        }
        else {
            this.controls.innerHTML = '';
            // return;
        }
        this.controls.innerHTML = '';
        //
        // const collapseBtn = createEl('div', 'collapse-btn', '⚙️');
        // collapseBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'controls'});
        // this.controls.append(collapseBtn);

        const seasonRow = createEl('div', 'map-season-row');
        seasonRow.innerHTML = `<label>Choose <button data-data='{"type":"click","name":"global-map-season-add"}'>➕</button></label> `;
        map.selects.season = Object.assign(createEl('select', 'map-controls-select map-season-select'),  {value:currentSeason.id});
        map.selects.season.append(new Option(`Select season`, -1));
        gameData.seasons.forEach(i => map.selects.season.append(new Option(`${i.name}`, i.id)));
        map.selects.season.dataset.data = JSON.stringify({type:'click',name:'global-map-season-select'});
        seasonRow.append(this.selects.season);
        this.controls.append(seasonRow);

        const seasonRow2 = createEl('div', 'map-season-edit');
        seasonRow2.innerHTML = `<label>Name</label><label>Load</label><label>Save</label><label>Del</label>`;
        map.inputs.seasonName = Object.assign(createEl('input'), { type: 'text', value: currentSeason.name, placeholder: 'Имя '});
        map.inputs.seasonName.dataset.data = JSON.stringify({type:'input',name:'season-name'});
        const btnLoad = createEl('button', `save-btn`, '↺');
        btnLoad.innerHTML = assets.icons.load;
        btnLoad.dataset.data = JSON.stringify({type:'click',name:'global-map-season-load'});
        const btnSave = createEl('button', `save-btn`, '💾');
        btnSave.innerHTML = assets.icons.save;
        btnLoad.dataset.data = JSON.stringify({type:'click',name:'global-map-season-save'});
        const btnDel = createEl('button', `del-btn`, '❌');
        btnDel.innerHTML = assets.icons.erase;
        btnLoad.dataset.data = JSON.stringify({type:'click',name:'global-map-season-del'});
        seasonRow2.append(map.inputs.seasonName, btnLoad,btnSave,btnDel);
        this.controls.append(seasonRow2);

        const controlRows = [
            ['grid', 'terrain', 'tradeRoutes'],
            ['fog', 'regions', 'labels'],
            ['factions', 'religions', 'cultures'],
            ['characters', 'objects', 'yeilds']
        ];
        controlRows.forEach(r=>{
            const showRow = createEl('div', 'map-controls-row');
            let inputs = [];
            r.forEach(c=>{
                showRow.innerHTML += `<label>${c}</label>`;
                const field = Object.assign(createEl('input'), { type: 'checkbox', checked: show[c]});
                field.dataset.data = JSON.stringify({type:'input',name:'show-map-toggle',data:c});
                inputs.push(field);
                // showRow1.append(field);
            });
            showRow.append(...inputs);
            this.controls.append(showRow);
        });


        const btnRow = createEl('div', 'map-controls-row');

        const masterEcoBtn = createEl('button', 'map-controls-btn master-eco-btn', `${l10n[lang].economics}`);
        masterEcoBtn.dataset.data = JSON.stringify({type:'button',name:'economics-menu'});

        const masterDipBtn = createEl('button', 'map-controls-btn master-eco-btn', `${l10n[lang].diplomacy}`);
        masterDipBtn.dataset.data = JSON.stringify({type:'button',name:'diplomacy-menu'});

        btnRow.append(masterDipBtn, masterEcoBtn,);
        this.controls.append(btnRow);

        mainWrapper.append(this.controls);
    },

    renderGridEditor() {
        const {view} = hexFunction.data;
        const mainWrapper = elementById("main-wrapper");

        if (!this.gridEditor) {
            this.gridEditor = createEl('div', 'map-top-controls map-hex-editor collapsed');

            const gridWrapper = createEl('div', 'hex-editor-block collapsed');
            gridWrapper.innerHTML = `<h4 data-data='{"type":"click","name":"map-top-controls-collapse"}'>Grid</h4>`;

            const mapIdLabel = createEl('label', '', `🏷️ ${l10n[lang].mapId}`);
            map.inputs.mapId = createEl('input', 'map-controls-input');
            map.inputs.mapId.placeholder = "Введите ID...";
            map.inputs.mapId.dataset.data = JSON.stringify({type:'input', name:'tf-map-id'});

            const mapNameLabel = createEl('label', '', `🏷️${l10n[lang].mapName}`);
            map.inputs.mapName = createEl('input', 'map-controls-input');
            map.inputs.mapName.placeholder = "Введите название...";
            map.inputs.mapName.dataset.data = JSON.stringify({type:'input', name:'tf-map-name'});

            const rowsLabel = createEl('label', '', `${l10n[lang].rows}`);
            map.inputs.mapRows = Object.assign(createEl('input', 'map-controls-input', 0), {type: 'number', value: 0, min: 0});
            const colsLabel = createEl('label', '', `${l10n[lang].cols}`);
            map.inputs.mapCols = Object.assign(createEl('input', 'map-controls-input', 0), {type: 'number', value: 0, min: 0});
            const resizeBtn = createEl('button', '', `${l10n[lang].resize}`);
            resizeBtn.dataset.data = JSON.stringify({type:'input',name:'tf-tf-map-resize'});

            map.selects.generatorType = createEl('select', 'map-controls-select');
            ['cave','forest','city'].forEach(i => map.selects.generatorType.append(new Option(`Gen ${i}`, i)));
            map.inputs.generatorNum = Object.assign(createEl('input'), { type: 'number', value: 1, min: 1 });
            const genBtn = createEl('button', '', `${l10n[lang].generate}`);
            genBtn.dataset.data = JSON.stringify({type:'input',name:'tf-gen-map'});

            gridWrapper.append(
                mapIdLabel, map.inputs.mapId,
                mapNameLabel, map.inputs.mapName,
                rowsLabel, map.inputs.mapRows,
                colsLabel, map.inputs.mapCols,
                resizeBtn,
                map.selects.generatorType, map.inputs.generatorNum,
                genBtn
            );

            this.gridEditor.append(
                gridWrapper
            );

            mainWrapper.append(this.gridEditor);
        }

        if(view === 'tactical') {
            console.log(map.inputs.mapId, tacticalMap.mapId);
            map.inputs.mapId.disabled = false;
            map.inputs.mapId.value = tacticalMap.mapId;
            console.log(map.inputs.mapId, tacticalMap.mapId);

            map.inputs.mapName.disabled = false;
            map.inputs.mapName.value = tacticalMap.mapName;

            map.inputs.mapRows.value = tacticalMap.sizes.rows;
            map.inputs.mapCols.value = tacticalMap.sizes.cols;
            console.log(tacticalMap.mapId, tacticalMap.mapId, tacticalMap.sizes);
        }
        else if(view === 'region') {
            map.inputs.mapId.value = map.currentRegion;
            map.inputs.mapId.disabled = true;

            map.inputs.mapName.value = map.currentRegion;
            map.inputs.mapName.disabled = true;

            map.inputs.mapRows.value = regionMap.sizes.rows;
            map.inputs.mapCols.value = regionMap.sizes.cols;
        }
        else {
            map.inputs.mapId.value = 'global';
            map.inputs.mapId.disabled = true;

            map.inputs.mapName.value = 'Global';
            map.inputs.mapName.disabled = true;

            map.inputs.mapRows.value = globalMap.sizes.rows;
            map.inputs.mapCols.value = globalMap.sizes.cols;
        }
    },

    renderHexEditor() {
        const mainWrapper = elementById("main-wrapper");

        if (!this.hexEditor) {
            this.hexEditor = createEl('div', 'map-top-controls map-hex-editor collapsed');

            const hexWrapper = createEl('div', 'hex-editor-block collapsed');
            hexWrapper.innerHTML = `<h4 data-data='{"type":"click","name":"map-top-controls-collapse"}'>Hex</h4>`;

            map.containers.cellFlags = createEl('div', 'flags-container');

            map.flags.forEach(flag => {
                const btn = createEl('button', 'map-flag-btn', flag.icon);
                btn.title = flag.label;
                btn.dataset.data = JSON.stringify({type:'button',name:'cell-special-flag',data:flag});
                map.containers.cellFlags.append(btn);
            });

            // 3. Селект Террейна (Тип ландшафта)
            const terLabel = createEl('label', '', `${l10n[lang].terrain}`);
            map.selects.terrain = createEl('select', 'map-controls-select');
            map.selects.terrain.append(new Option('No Terrain', -1));
            map.terrains.forEach(t => {map.selects.terrain.append(new Option(t, t));});

            const heightLabel = createEl('label', '', `${l10n[lang].height}`);
            map.selects.height = createEl('select', 'map-controls-select');
            map.selects.height.append(new Option('No Height', -1));
            map.heights.forEach(t => {map.selects.height.append(new Option(t, t));});

            // 1. Селект Региона (Локации)
            const regionLabel = createEl('label', '', `${l10n[lang].region}`);
            map.selects.region = createEl('select', 'map-controls-select');
            map.selects.region.append(new Option('No Region', -1));
            gameData[currentGame].regions.forEach(loc => {map.selects.region.append(new Option(loc.name, loc.id));});

            // 2. Селект Владельца (Фракции)
            const factionLabel = createEl('label', '', `${l10n[lang].owner}`);
            map.selects.faction = createEl('select', 'map-controls-select');
            map.selects.faction.append(new Option('No Faction', -1));
            (data.factions.filter(i=>i.territory)).forEach(f => {map.selects.faction.append(new Option(f.name, f.id));});

            this.activeHexFlag = null; // По умолчанию просто красим владельца

            const innerMapLabel = createEl('label', '', `${l10n[lang].map}`);
            map.selects.innerMap = createEl('select', 'map-controls-select');
            map.selects.innerMap.append(new Option('No Map', -1));
            gameData[currentGame].tacticalMaps.forEach(t => {map.selects.innerMap.append(new Option(t.mapName, t.mapId));});

            map.containers.cellInnerMap = createEl('button', 'map-controls-btn', `${l10n[lang].map}`);
            map.containers.cellInnerMap.dataset.data = JSON.stringify({type:'click',name:'map-inner-enter',data: {mapId:'-1'}});

            hexWrapper.append(
                terLabel, map.selects.terrain,
                heightLabel, map.selects.height,
                regionLabel, map.selects.region,
                factionLabel, map.selects.faction, map.containers.cellFlags,
                innerMapLabel, map.selects.innerMap, map.containers.cellInnerMap,
            );

            // map.paintEraser = false;
            // const paintEraserBtn = createEl('button', 'map-controls-btn', `${l10n[lang].paintEraser || 'Eraser'}`);
            // paintEraserBtn.dataset.data = JSON.stringify({type:'button',name:'cell-paint-eraser-mode'});
            //
            // // Режим покраски (Paint Mode)
            // map.paintMode = false;
            // const paintBtn = createEl('button', 'map-controls-btn', `${l10n[lang].paint}`);
            // paintBtn.dataset.data = JSON.stringify({type:'button',name:'cell-paint-mode'});

            const resWrapper = createEl('div', 'hex-editor-block collapsed');
            resWrapper.innerHTML = `<h4 data-data='{"type":"click","name":"map-top-controls-collapse"}'>${l10n[lang].cellResources}</h4>`;

            map.resources.forEach(res => {
                const row = createEl('div', 'res-row');
                const label = createEl('label', '', `${res.icon} ${res.name}`);
                map.inputs.hexResources[res.id] = Object.assign(createEl('input', 'hex-res-input', 0, res.id), {
                    type: 'number',
                    value: 0,
                    min: 0
                });
                map.inputs.hexResources[res.id].dataset.data = JSON.stringify({type:'input',name:'cell-resources',data:res.id});

                row.append(label, map.inputs.hexResources[res.id]);
                resWrapper.append(row);
            });
            //capLabel, this.isCapitalMode,


            const socialWrapper = createEl('div', 'hex-editor-block collapsed');
            socialWrapper.innerHTML = `<h4 data-data='{"type":"click","name":"map-top-controls-collapse"}'>Social</h4>`;

            const cultures = gameData[currentGame].cultures || [];
            const religions = gameData[currentGame].religions || [];

            const cityNameLabel = createEl('label', '', `🏷️ ${l10n[lang].cityName || 'Название города'}`);
            map.inputs.cityName = createEl('input', 'map-controls-input');
            map.inputs.cityName.placeholder = "Введите название...";
            map.inputs.cityName.dataset.data = JSON.stringify({type:'input', name:'cell-city-name'});

            const cityIdLabel = createEl('label', '', `🏷️ ${l10n[lang].cityId || 'ID города'}`);
            map.inputs.cityId = createEl('input', 'map-controls-input');
            map.inputs.cityId.placeholder = "Введите ID...";
            map.inputs.cityId.dataset.data = JSON.stringify({type:'input', name:'cell-city-id'});

            // 1. Селект Доминирующей Культуры
            const cultLabel = createEl('label', '', `🎭 ${l10n[lang].culture || 'Культура'}`);
            map.selects.culture = createEl('select', 'map-controls-select');
            map.selects.culture.append(new Option('Default', -1));
            cultures.forEach(c => this.selects.culture.append(new Option(c.name, c.id)));
            map.selects.culture.dataset.data = JSON.stringify({type:'input', name:'cell-social-culture'});

            // 2. Селект Доминирующей Религии
            const relLabel = createEl('label', '', `🔯 ${l10n[lang].religion || 'Религия'}`);
            map.selects.religion = createEl('select', 'map-controls-select');
            map.selects.religion .append(new Option('Default', -1));
            religions.forEach(r => this.selects.religion .append(new Option(r.name, r.id)));
            map.selects.religion.dataset.data = JSON.stringify({type:'input', name:'cell-social-religion'});

            // 3. Поле численности населения
            const popLabel = createEl('label', '', `👥 ${l10n[lang].population || 'Население'}`);
            map.inputs.cityPopulation = Object.assign(createEl('input', 'map-controls-input', 0), {
                type: 'number',
                value: 0,
                min: 0
            });
            //
            //
            // map.popInput = createEl('input', 'map-controls-input');
            // map.popInput.type = 'number';
            // map.popInput.placeholder = '1000';
            map.inputs.cityPopulation.dataset.data = JSON.stringify({type:'input', name:'cell-social-pop'});

            // map.paintEraser = false;
            // const paintEraserBtn = createEl('button', 'map-controls-btn', `${l10n[lang].paintEraser || 'Eraser'}`);
            // paintEraserBtn.dataset.data = JSON.stringify({type:'button',name:'cell-paint-eraser-mode'});
            //
            // Режим покраски (Paint Mode)


            socialWrapper.append(
                cityIdLabel, map.inputs.cityId,
                cityNameLabel, map.inputs.cityName,
                cultLabel, map.selects.culture,
                relLabel, map.selects.religion,
                popLabel, map.inputs.cityPopulation,
            );

            this.hexEditor.append(
                hexWrapper,
                resWrapper,
                socialWrapper,
            );

            mainWrapper.append(this.hexEditor);
        }
        // this.hexEditor.innerHTML = '';
        //
        // const collapseBtn = createEl('div', 'collapse-btn', '&#9638;️');
        // collapseBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'hexEditor'});
        // this.hexEditor.append(collapseBtn);

        if(map.selected.cell) {
            ['terrain', 'height', 'region', 'faction', 'innerMap'].forEach(key=>{
                if(map.selected.cell[key]) {
                    map.selects[key].value = map.selected.cell[key];
                }
            });
            if(map.selected.cell.innerMap && (map.selected.cell.innerMap!=='-1')) {
                map.containers.cellInnerMap.dataset.data = JSON.stringify({type:'click',name:'map-inner-enter',data: {mapId:map.selected.cell.innerMap}});
            }
            else {
                map.containers.cellInnerMap.dataset.data = JSON.stringify({type:'click',name:'map-inner-enter',data: {
                    mapId: '-1',
                    additional: {
                        hex: map.selected.hex,
                        terrain: map.selected.cell.terrain,
                        isCity: map.selected.cell.isCity,
                        cityId: map.selected.cell.cityId,
                        cityName: map.selected.cell.cityName
                    }
                }});
            }
            document.querySelectorAll('.map-flag-btn').forEach(b => {
                b.classList.remove('active');
                try  {
                    const data = JSON.parse(b.getAttribute('data-data'));
                    const flag = data.data.id;
                    if(map.selected.cell[flag]) {
                        b.classList.add('active');
                    }
                } catch (e) {}
            });

            if(map.selected.cell.cityId) {
                map.inputs.cityId.value = map.selected.cell.cityId;
            }
            if(map.selected.cell.cityName) {
                map.inputs.cityName.value = map.selected.cell.cityName;
            }
            if(map.selected.cell.social) {
                if(map.selected.cell.social.population) {
                    map.inputs.cityPopulation.value = map.selected.cell.social.population;
                }
                if(map.selected.cell.social.dominance) {
                    if (map.selected.cell.social.dominance.culture) {
                        map.selects.culture.value = map.selected.cell.social.dominance.culture;
                    }
                    if (map.selected.cell.social.dominance.religion) {
                        map.selects.religion.value = map.selected.cell.social.dominance.religion;
                    }
                }
            }

            if(map.containers.cellSave) {
                map.containers.cellSave.remove();
            }
            const [q, r] =  map.selected.hex.split('_').map(Number);
            map.containers.cellSave = createEl('button', 'map-controls-btn', `${l10n[lang].save}`);
            map.containers.cellSave.dataset.data = JSON.stringify({type:'button',name:'cell-save-button', data:{q,r}});
            this.hexEditor.append(
                map.containers.cellSave,
            );
        }
        else {
            ['terrain', 'height', 'region', 'faction', 'innerMap', 'culture', 'religion'].forEach(key=>{
                map.selects[key].value = -1;
            });
            document.querySelectorAll('.map-flag-btn').forEach(b => {
                b.classList.remove('active');
            });
            map.inputs.cityId.value = '';
            map.inputs.cityName.value = '';
            map.inputs.cityPopulation = 0;

            if(map.containers.cellSave) {
                map.containers.cellSave.remove();
            }
        }
    },

    renderCharacterEditor() {
        const mainWrapper = elementById("main-wrapper");

        if (!map.characterEditor) {
            map.characterEditor = createEl('div', 'map-top-controls map-social-editor collapsed');
            mainWrapper.append(map.characterEditor);
        }
        map.characterEditor.innerHTML = '';


        const charLabel = createEl('label', '', `${l10n[lang].characters}`);
        map.selects.character = createEl('select', 'map-controls-select map-character-select');
        map.selects.character.append(new Option(`No Character`, -1));
        (currentSeason.characters.filter(c=>c.isLord && !c.hex)).forEach(i => map.selects.character.append(new Option(`${i.name}`, i.id)));
        map.selects.character.dataset.data = JSON.stringify({type:'input',name:'map-char-select-add'});

        const teamLabel = createEl('label', '', `${l10n[lang].team}`);
        map.selects.team = createEl('select', 'tf-char-select');
        map.teams.forEach(i => map.selects.team.append(new Option(`Team ${i}`, i)));
        map.selects.team.dataset.data = JSON.stringify({type:'input',name:'tf-team-select'});

        map.characterEditor.append(
            charLabel, map.selects.character,
            teamLabel,  map.selects.team
        );

        if(map.selected.character) {
            const nameLabel = createEl('label', '', map.selected.character.name || map.selected.character.id);
            const editBtn = createEl('button', 'map-controls-btn', 'Edit');
            editBtn.dataset.data = JSON.stringify({type:'click',name:'char-open', data: map.selected.character.id});

            map.selects.character.value = map.selected.character.id;

            if(map.selects.team.value) {
                map.selects.team.value = map.selected.character.team;
            }

            const [q, r] =  map.selected.hex.split('_').map(Number);
            map.containers.cellCharacterSave = createEl('button', 'map-controls-btn', `${l10n[lang].save}`);
            map.containers.cellCharacterSave.dataset.data = JSON.stringify({type:'button',name:'cell-character-save-button', data:{q,r}});

            map.characterEditor.append(
                nameLabel,
                editBtn,
                map.containers.cellCharacterSave,
            );
        }
        else {
            map.selects.character.value = -1;
            map.selects.team.value = -1;
        }
    },

    renderObjectsEditor() {
        const mainWrapper = elementById("main-wrapper");

        if (!map.objectEditor) {
            map.objectEditor = createEl('div', 'map-top-controls map-social-editor collapsed');
            mainWrapper.append(map.objectEditor);
        }
        map.objectEditor.innerHTML = '';

        const objLabel = createEl('label', '', `${l10n[lang].objects}`);
        map.selects.object = createEl('select', 'map-controls-select map-object-select');
        map.selects.object.append(new Option(`No Object`, -1));
        map.objectTypes.forEach(type => map.selects.object.append(new Option(type, type)));
        map.selects.object.dataset.data = JSON.stringify({type:'input',name:'map-obj-select-add'});

        const objIdLabel = createEl('label', '', `${l10n[lang].id}`);
        map.inputs.objectId = Object.assign(createEl('input'), { type: 'text', value: ''});
        const objNameLabel = createEl('label', '', `${l10n[lang].name}`);
        map.inputs.objectName = Object.assign(createEl('input'), { type: 'text', value: ''});

        map.objectEditor.append(
            objIdLabel, map.inputs.objectId,
            objNameLabel, map.inputs.objectName,
            objLabel, this.selects.object,
        );

        if(map.selected.object) {
            const nameLabel = createEl('label', '', map.selected.object.name || map.selected.object.id || map.selected.object.obj);

            map.selects.object.value = map.selected.object.obj;

            if(map.selected.object.id) {
                map.inputs.objectId.value = map.selected.object.id;
            }

            if(map.selected.object.name) {
                map.inputs.objectName.value = map.selected.object.name;
            }

            const [q, r] =  map.selected.hex.split('_').map(Number);
            map.containers.cellObjectSave = createEl('button', 'map-controls-btn', `${l10n[lang].save}`);
            map.containers.cellObjectSave.dataset.data = JSON.stringify({type:'button',name:'cell-object-save-button', data:{q,r}});

            map.objectEditor.append(
                nameLabel,
                map.containers.cellObjectSave,
            );
        }
        else {
            map.selects.object.value = -1;
            map.inputs.objectId.value = '';
            map.inputs.objectName.value = '';
        }
    },

    renderNotes() {
        const mainWrapper = elementById("main-wrapper");

        if (!map.notes) {
            map.notes = createEl('div', 'map-top-controls map-notes collapsed');
            mainWrapper.append(map.notes);
        }
        map.notes.innerHTML = '';


        // const notesBtn = createEl('div', 'collapse-btn', '📜');
        // notesBtn.dataset.data = JSON.stringify({type:'click',name:'global-map-collapse-controls',data:'notes'});
        //
        // this.notes.append(notesBtn);

        const list = createEl('div', 'notes-list');
        list.id = 'notes-list';

        const footer = createEl('div', 'notes-footer');
        map.notesTextArea = createEl('textarea');
        const addBtn = createEl('button', '', '➕');

        addBtn.dataset.data = JSON.stringify({type:'click',name:'notes-add'});

        footer.append(map.notesTextArea, addBtn);
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

    // showContextMenu(e, charMap, element, type) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     const oldMenu = document.getElementById('map-context-menu');
    //     if (oldMenu) oldMenu.remove();
    //
    //     const menu = createEl('div', 'map-context-menu', 0, '', 'map-context-menu');
    //
    //     const actions = [
    //         { label: l10n[lang].info, icon: '📜', click: () => { searchEngine.clickItem({...charMap, type}); } },
    //         { label: l10n[lang].character, icon: '👤', click: () => { characterManager.open(charMap.id); } },
    //         { label: l10n[lang].del, icon: '🗑️', click: () => {map.deleteCharacter(charMap.id)}}
    //     ];
    //
    //     actions.forEach(act => {
    //         const item = createEl('div', 'menu-item', `${act.icon} ${act.label}`);
    //         item.onclick = () => {
    //             act.click();
    //             menu.remove();
    //         };
    //         menu.appendChild(item);
    //     });
    //
    //     const rect = map.container.getBoundingClientRect();
    //     const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    //     const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    //
    //     menu.style.left = x + 'px';
    //     menu.style.top = y + 'px';
    //
    //     map.container.appendChild(menu);
    //
    //     setTimeout(() => {
    //         const close = () => { menu.remove(); document.removeEventListener('click', close); };
    //         document.addEventListener('click', close);
    //     }, 10);
    // },


    clickMap(e) {
        const {currentMap, canvas, view} = hexFunction.data;
        let x, y, q, r , hexKey, cell;
        const rect = canvas.getBoundingClientRect();

        if(view === 'global') {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        else if(view === 'tactical') {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        else if(view === 'region') {
            const clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
            const clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const lx = (clientX - rect.left) * scaleX;
            const ly = (clientY - rect.top) * scaleY;

            x = (lx / regionMap.camera.zoom * globalMap.camera.zoom) + regionMap.currentBounds.x;
            y = (ly / regionMap.camera.zoom * globalMap.camera.zoom) + regionMap.currentBounds.y;
        }

        const pos = hexFunction.pixelToHex(x, y);
        q = pos.q;
        r = pos.r;
        hexKey = `${q}_${r}`;

        if (!currentMap.gridData[hexKey]) currentMap.gridData[hexKey] = {};
        cell = currentMap.gridData[hexKey];

        console.log("Клетка:", view, x, y, q,r, hexKey, cell, map.paintMode, map.selectedCharacter);

        if(map.mode === 'edit') {
            map.clickEditor(q, r);
        }
        else {
            map.clickPlay(q, r);
        }
    },

    clickEditor(q, r) {
        const {currentMap, canvas, view} = hexFunction.data;
        const hexKey = `${q}_${r}`;
        const hexPos = hexFunction.hexToPixel(q, r);
        let cell = currentMap.gridData[hexKey];
        if (!cell.content) cell.content = {};
        console.log(map.selected.hex, hexKey, map.mode, map.clickMode, map.menu);
        if (map.clickMode === 'select') {
            if (map.selected.hex === hexKey) {
                map.clearEditorSelection();
            }
            else {
                if (map.menu === 'hexEditor') {
                    map.selected.hex = hexKey;
                    map.selected.cell = cell;
                    map.renderHexEditor();
                }
                else if (map.menu === 'characterEditor') {
                    map.selected.hex = hexKey;
                    map.selected.character = characterManager.getCharacterById(cell.content.unit);
                    map.renderCharacterEditor();
                }
                else if (map.menu === 'objectEditor') {
                    map.selected.hex = hexKey;
                    map.selected.object = cell.content.obj;
                    map.renderObjectsEditor();
                }
            }
        }
        else if(map.clickMode === 'erase') {
            if (map.menu === 'hexEditor') {
                currentMap.gridData[hexKey] = { content: cell.content }
            }
            else if (map.menu === 'characterEditor') {
                if(cell.content && cell.content.unit) {
                    const character = characterManager.getCharacterById(cell.content.unit);
                    delete character.regionId;
                    delete character.x;
                    delete character.y;
                    delete character.q;
                    delete character.r;
                    delete character.hex;
                    delete cell.content.unit;
                }
            }
            else if (map.menu === 'objectEditor') {
                if(cell.content && cell.content.obj) {
                    delete cell.content.obj;
                }
            }
            hexFunction.updateHex();
        }
        else if(map.clickMode === 'paint') {
            if(map.menu === 'hexEditor') {
                hexFunction.saveCell(q,r);
            }
            else if (map.menu === 'characterEditor') {
                if (map.selects.character.value) {
                    // 2. Записываем данные в персонажа
                    map.selectedCharacter.regionId = cell.region;
                    characterManager.modifyPosition(map.selectedCharacter.id, {x:hexPos.x,y:hexPos.y,q,r});
                    // map.selectedCharacter.x = hexPos.x;
                    // map.selectedCharacter.y = hexPos.y;
                    // map.selectedCharacter.q = q;
                    // map.selectedCharacter.r = r;
                    // map.selectedCharacter.hex = hexKey;

                    cell.content.unit = map.selectedCharacter.id;
                    globalMap.update();

                    map.selectedCharacter = null;
                    map.selects.character.value = -1;

                    map.renderCharacterEditor();
                }
            }
            else if (map.menu === 'objectEditor') {
                if (map.selects.object.value) {
                    cell.content.obj = {
                        type: 'obj',
                        obj: map.selects.object.value
                    };
                    globalMap.update();
                    map.selects.object.value = -1;

                    map.renderObjectsEditor();
                }
            }
        }
    },

    clearEditorSelection() {
        map.selected.hex = null;
        map.selected.cell = null;
        map.selected.character = null;
        map.selected.object = null;
    },

    clickPlay(q,r) {
        const {currentMap, show, view, activeUnit} = hexFunction.data;

        const hexKey = `${q}_${r}`;
        const hexPos = hexFunction.hexToPixel(q, r);

        let cell = currentMap.gridData[hexKey];
        if (!cell.content) cell.content = {};

        let targetCharacter, targetObject;
        if (show.characters && cell.content && cell.content.unit) {
            targetCharacter = characterManager.getCharacterById(cell.content.unit);
        }
        if (show.characters && cell.content && cell.content.obj) {
            targetObject = cell.content.obj;
        }

        if(view === 'global') {
            if(show.characters) {
                if(targetCharacter) {
                    if(!activeUnit || (activeUnit.id !== targetCharacter.id)) {
                        map.selectCharacter(targetCharacter, q, r);
                    }
                    else {
                        map.selectCharacter(null, q, r);
                    }
                }
                else if(!targetCharacter && activeUnit) {
                    if (hexFunction.canReach(q, r)) {
                        hexFunction.executeMove(q, r);
                    }
                }
            }
            else {
                regionMap.init(cell.region);
                map.renderControls();
            }
        }
        else if(view === 'region') {
            if(targetCharacter) {
                if(!activeUnit || (activeUnit.id !== targetCharacter.id)) {
                    map.selectCharacter(targetCharacter, q, r);
                }
                else {
                    map.selectCharacter(null, q, r);
                }
            }
            if(!targetCharacter && activeUnit) {
                if (hexFunction.canReach(q, r)) {
                    hexFunction.executeMove(q, r);
                }
            }
        }
        else if(view === 'tactical') {
            if(!activeUnit && targetCharacter) {
                map.selectCharacter(targetCharacter, q, r);
            }
            else if(activeUnit && !targetCharacter) {
                if (hexFunction.canReach(q, r)) {
                    hexFunction.executeMove(q, r);
                }
            }
            else if(activeUnit && targetObject) {
                if (targetCharacter) {
                    dialogManager.open(targetCharacter.id, targetObject.obj); // obj.obj это 'blacksmith', 'tavern' и т.д.
                }
                else {
                    dialogManager.open(null, targetObject.obj, {
                        // id: key+'_'+cell.content.obj.obj,
                        id: 'tahiri',
                        type: targetObject.obj,
                        name: targetObject.obj
                    });
                }
            }
            else if(activeUnit && targetCharacter) {
                if(activeUnit.id === targetCharacter.id) {
                    map.selectCharacter(null, q, r);
                }
                else {
                    if (targetCharacter.team && battleManager.canAttack(q, r)) {
                        battleManager.executeAttack(activeUnit, targetCharacter);
                    }
                    else {
                        dialogManager.open(targetCharacter.id);
                    }
                }
            }
        }
    },

    selectCharacter(targetCharacter, q, r) {
        const {currentMap, show, view, activeUnit} = hexFunction.data;

        if (targetCharacter) {
            characterManager.modifyPosition(targetCharacter.id, {q,r});
            // targetCharacter.q = q;
            // targetCharacter.r = r;
            if (!targetCharacter.currentWalkRange && targetCharacter.currentWalkRange !== 0) {
                targetCharacter.currentWalkRange = targetCharacter.walkRadius;
            }
            currentMap.activeUnit = targetCharacter;
            playerHUD.init(currentMap.activeUnit);
            hexFunction.revealFog(q, r);
            map.scrollToChar();
        }
        else {
            currentMap.activeUnit = null;
            playerHUD.close();
        }
        hexFunction.updateHex();
    },

    createFloatingBtn(point, actionName, data) {
        const {gridData, activeUnit, sizes: {charSize, cellSize, width}, camera:{zoom}} = hexFunction.data;


        let innerLabel;
        if(actionName === 'innerMap') {
            const innerMap = gameData[currentGame].tacticalMaps.find(m=>m.mapId===gridData[data].innerMap);
            if(innerMap) {
                innerLabel = createEl('div', 'interaction-label');
                // innerLabel.innerHTML = innerMap.mapName;
                const innerMapBtn = createEl('button', 'interaction-button');
                innerMapBtn.innerHTML = assets.icons.gate;
                innerMapBtn.dataset.data = JSON.stringify({type:'click',name:'map-inner-enter',data:{
                    mapId:gridData[data].innerMap
                }});
                innerLabel.append(innerMapBtn);
            }
        }
        else if(actionName) {
            const char = characterManager.getCharacterById(data);
            if(char) {
                innerLabel = createEl('div', 'interaction-label');
                // innerLabel.innerHTML = char.name.split(' ')[0];
                const attackBtn = createEl('button', 'interaction-button');
                attackBtn.innerHTML = assets.icons.attack;
                attackBtn.dataset.data = JSON.stringify({type:'click',name:'dialog-start',data:data});
                const dialogBtn = createEl('button', 'interaction-button');
                dialogBtn.innerHTML = assets.icons.conversation;
                dialogBtn.dataset.data = JSON.stringify({type:'click',name:'dialog-start',data:data});
                innerLabel.append(attackBtn, dialogBtn);
            }
        }
        if(innerLabel) {
            const interactionLine = createEl('div', 'interaction-line');
            interactionLine.append(innerLabel);

            interactionLine.style.width = `${width*zoom}px`;
            interactionLine.style.left = `${point.x - width*zoom/2}px`;
            interactionLine.style.top = `${point.y}px`;
            //- charSize*zoom*2

            if(tacticalMap.ctx) {
                tfGrid.append(interactionLine);
            }
            else {
                map.container.append(interactionLine);
            }
        }
    }
};

