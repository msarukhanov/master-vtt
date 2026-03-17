const defaultStats = {
    name: 'Unit',
    symbol: '👤',
    num: 1,
    hpMax: 10,
    hp: 0,
    mpMax: 10,
    mp: 10,
    wpMax: 3,
    wp: 0,
    attack: [2, 7, false],
    attackType: 'p',
    def: [2, 1, false],
    pres: 1,
    mres: 1,
    initiative: 1,
    walkRadius: 3,
    attackRadius: 1,
    inventory: [],
    party: [],
    abilities: ["fireball","stun_strike"],
    statuses: []
};

const teamCounters = {1:0,2:0,3:0,4:0,5:0};

let tfTacticalField, tfCanvas, tfControls, tfRowInput, tfColInput, tfResizeBtn, tfCharBtn,
    tfCharTeamSelect, tfCharSelect, tfObjBtn, tfObjSelect, tfEraseBtn, tfEntryBtn, tfGridWrapper, tfGrid;

const tacticalMap = {
    // ...tacticalFieldEditor,
    // ...tacticalFieldPlay,

    entryCell: '',
    mapName: '',
    mapId: '',

    ctx: null,
    canvas: null,

    gridData: {},

    sizes: {
        rows: 6,
        cols: 8,
        padding: 1,
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
        terrain: true,
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

    exploredCells: null,

    get width() { return Math.sqrt(3) * this.sizes.cellSize; },
    get height() { return 2 * this.sizes.cellSize; },

    mode: 'select',
    viewMode: 'edit',
    selectedTeam: 1,
    selectedChar: null,
    selectedCharLink: null,
    selectedTerrain: 'grass',
    selectedHeight: 1,
    selectedObject: 'tree',
    selectedObjectLink: null,
    selectedObjectType: null,
    moving: null,




    animatingUnit: null,
    initiativeLine: null,

    selectedAbility: null,
    abilityTarget: null,



    // objectTypes: ['tree', 'rock', 'mountain', 'water', 'wall', 'town_hall', 'house', 'temple', 'well', 'lamp', 'pit', 'corpse', 'chest', 'portal'],


    terrainTypes: ['grass', 'stone', 'dirt', 'sand', 'snow'],
    terrainHeights: [1, 1.5, 2, 2.5, 3],
    symbols: ['👤', '⚔️', '🧚‍♀️', '🧚‍♂️', '🧙‍♀️', '🧙', '🧟‍♀️', '🧟‍♂️', '🏹', '🛡️', '💀', '🐉', '🐎'],

    eventTypeSelect: null,
    eventOnceSelect: null,
    eventTextArea: null,


    init(main = elementById('tacticalField')) {
        const {canvas, sizes:{cellSize, width, height}, camera:{zoom}} = hexFunction.data;
        if(!gameData[currentGame].tacticalMaps) gameData[currentGame].tacticalMaps = [];
        tfTacticalField = createEl('div', 'tactical-field', '', null, 'tactical-field');

        tfControls = createEl('div', 'controls', '', null, 'tf-controls');
        tacticalMap.initEditorControls();

        tfGridWrapper = createEl('div', 'grid-wrapper');
        tfGrid = createEl('div', 'grid');

        tacticalMap.canvas = createEl('canvas', 'tfCanvas', '', null, 'tfCanvas');
        tacticalMap.ctx = tacticalMap.canvas.getContext('2d');
        tacticalMap.canvas.dataset.data = JSON.stringify({type:'button',name:'tactical-map'});

        tfGrid.append(tacticalMap.canvas);

        tacticalMap.initiativeLine = createEl('div', 'tf-initiative-line');
        tfGridWrapper.append(tacticalMap.initiativeLine, tfGrid);

        tacticalMap.editorContainer = createEl('div', 'tf-editor-container');
        tfControls.append(tacticalMap.editorContainer);

        tfTacticalField.append(tfControls, tfGridWrapper);
        main.innerHTML = '';
        main.appendChild(tfTacticalField);

        tacticalMap.initGrid();
        hexFunction.updateHex();
    },

    initShort(main = elementById('tacticalField')) {
        const {canvas, sizes:{cellSize, width, height}, camera:{zoom}} = hexFunction.data;
        if(!gameData[currentGame].tacticalMaps) gameData[currentGame].tacticalMaps = [];
        tfTacticalField = createEl('div', 'tactical-field', '', null, 'tactical-field');
        tfGridWrapper = createEl('div', 'grid-wrapper');
        tfGrid = createEl('div', 'grid');

        tacticalMap.canvas = createEl('canvas', 'tfCanvas', '', null, 'tfCanvas');
        tacticalMap.ctx = tacticalMap.canvas.getContext('2d');
        tacticalMap.canvas.dataset.data = JSON.stringify({type:'button',name:'tactical-map'});

        tfGrid.append(tacticalMap.canvas);
        tacticalMap.initiativeLine = createEl('div', 'tf-initiative-line');
        tfGridWrapper.append(tacticalMap.initiativeLine, tfGrid);
        tfTacticalField.append(tfGridWrapper);

        main.appendChild(tfTacticalField);

        tacticalMap.initGrid();
        hexFunction.updateHex();
    },

    setMode(m) {
        tacticalMap.clearSelection();
        tacticalMap.mode = (tacticalMap.mode === m) ? 'select' : m;
        // if (tacticalMap.mode !== 'select') btn.classList.add('active');
        tfControls.className = 'controls mode-' + tacticalMap.mode;
        if(tfCharBtn) {
            [tfCharBtn, tfObjBtn, tfEraseBtn, tfEntryBtn].forEach(b => b.classList.remove('active'));
        }
    },

    update() {
        const {canvas, ctx, sizes:{cellSize, width, height, rows, cols, padding}, camera:{zoom, angleY}} = hexFunction.data;
        canvas.width = ((cols+0.5) * width) * zoom;
        canvas.height = ((((rows+padding) * 0.75) * height) * zoom) * angleY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hexFunction.drawCells({play: tacticalMap.viewMode === 'play'});
    },

    toggleMode(e) {
        tacticalMap.viewMode = tacticalMap.viewMode === 'edit' ? 'play' : 'edit';
        tacticalMap.show.fog = tacticalMap.viewMode === 'play';
        if(e) {
            // e.target.textContent = tacticalMap.viewMode === 'edit' ? `🛠️ ${l10n[lang].editor}` : `🎮 ${l10n[lang].game}`;
        }
        else {
            tacticalMap.viewMode = 'play';
            tacticalMap.show.fog = true;
        }

        tacticalMap.mode = tacticalMap.viewMode === 'edit' ? 'select' : 'select';

        if (tacticalMap.viewMode === 'play') {
            battleManager.startBattle();
        } else {
            playerHUD.destroy();
            tacticalMap.activeUnit = null;
            tacticalMap.moving = null;
        }
        tfGridWrapper.classList.toggle('play');
        hexFunction.updateHex();
    },

    clearSelection() {
        tacticalMap.moving = null;
    },

    initGrid() {
        const {sizes:{rows, cols, padding}} = hexFunction.data;
        tacticalMap.gridData = {};

        for (let row = 0; row < rows; row++) {
            let r_offset = Math.floor(row / 2) + padding;
            for (let col = -r_offset; col < cols - r_offset; col++) {
                const q = col + padding;
                const r = row + padding;
                const key = `${q}_${r}`;
                tacticalMap.gridData[key] = {
                    terrain: 'grass',
                    height: 1,
                    content: {}
                };
            }
        }
        map.renderGridEditor(map.container);
        console.log(`Гексагональное поле ${tacticalMap.sizes.rows}x${tacticalMap.sizes.cols} создано.`);
        tacticalMap.update();
    },
};