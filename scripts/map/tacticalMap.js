const defaultStats = {
    name: 'Unit',
    symbol: '👤',
    num: 1,
    hp: 10,
    hpCurrent: 0,
    mp: 10,
    mpCurrent: 10,
    wp: 3,
    wpCurrent: 0,
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
    tfCharTeamSelect, tfCharSelect, tfObjBtn, tfObjSelect, tfEraseBtn, tfGridWrapper, tfGrid;

const tacticalMap = {

    ...tacticalRender,
    ...tacticalFieldEditor,
    ...tacticalFieldPlay,

    mapId: null,
    gridData: {},

    ctx: null,
    canvas: null,

    offsetX: 60, // Смещение вправо (примерно ширина гекса)
    offsetY: 60, // Смещение вниз

    padding: 1,
    zoom: 1,

    rows: 6,
    cols: 8,
    cell: 60,

    size: 40,
    mapCharSize: 50,
    get width() { return Math.sqrt(3) * this.size; },
    get height() { return 2 * this.size; },

    mode: 'select',
    viewMode: 'edit',
    selectedTeam: 1,
    selectedChar: null,
    selectedCharLink: null,
    selectedTerrain: 'grass',
    selectedHeight: 1,
    selectedObject: 'tree',
    selectedObjectLink: null,
    moving: null,

    turnQueue: [],
    currentTurnIndex: 0,
    activeUnit: null,
    animatingUnit: null,
    initiativeLine: null,
    exploredCells: null,
    currentReachable: null,

    selectedAbility: null,
    abilityTarget: null,

    teams: [1,2,3,4,5],
    teamColors: {
        1: "#e74c3c",
        2: "#3498db",
        3: "#2ecc71",
        4: "#f1c40f",
        5: "#9b59b6",
        0: "#333",
    },

    objectTypes: ['tree', 'rock', 'mountain', 'water', 'wall', 'town_hall', 'house', 'temple', 'well', 'lamp', 'pit', 'corpse', 'chest', 'portal'],
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
        "barrel": "🛢",
        "temple" : "⛪",
        "well" : "⛲",
        "lamp" : "🏮",
    },

    terrainTypes: ['grass', 'stone', 'dirt', 'sand', 'snow'],
    terrainHeights: [1, 1.5, 2, 2.5, 3],
    symbols: ['👤', '⚔️', '🧚‍♀️', '🧚‍♂️', '🧙‍♀️', '🧙', '🧟‍♀️', '🧟‍♂️', '🏹', '🛡️', '💀', '🐉', '🐎'],

    init(main = elementById('tacticalField')) {
        if(!gameData[currentGame].tacticalMaps) gameData[currentGame].tacticalMaps = [];
        tfTacticalField = createEl('div', 'tactical-field', '', null, 'tactical-field');

        tfControls = createEl('div', 'controls', '', null, 'tf-controls');
        tacticalMap.initEditorControls();

        tfGridWrapper = createEl('div', 'grid-wrapper');
        tfGrid = createEl('div', 'grid');

        tacticalMap.canvas = createEl('canvas', 'tfCanvas', '', null, 'tfCanvas');
        tacticalMap.ctx = tacticalMap.canvas.getContext('2d');
        tacticalMap.canvas.onclick = (e) => tacticalHexGrid.handleCanvasClick(e);

        tfGrid.append(tacticalMap.canvas);

        tacticalMap.initiativeLine = createEl('div', 'tf-initiative-line');
        tfGridWrapper.append(tacticalMap.initiativeLine, tfGrid);

        tacticalMap.editorContainer = createEl('div', 'tf-editor-container');
        tfControls.append(tacticalMap.editorContainer);

        tfTacticalField.append(tfControls, tfGridWrapper);
        main.innerHTML = '';
        main.appendChild(tfTacticalField);

        tacticalMap.canvas.width = tacticalMap.cols * tacticalMap.width + 40;
        tacticalMap.canvas.height = tacticalMap.rows * (tacticalMap.height * 0.75) + 40;

        tacticalHexGrid.initGrid(tacticalMap.rows, tacticalMap.cols);
    },

    setMode(m, btn) {
        this.clearSelection();
        this.mode = (this.mode === m) ? 'select' : m;
        [tfCharBtn, tfObjBtn, tfEraseBtn].forEach(b => b.classList.remove('active'));
        if (this.mode !== 'select') btn.classList.add('active');
        tfControls.className = 'controls mode-' + this.mode;
    },

    saveMap(name = "New Map") {
        const mapSnapshot = {
            id: this.mapId || Date.now(),
            name: name,
            rows: this.rows,
            cols: this.cols,
            // Сохраняем объект гексов целиком
            gridData: JSON.parse(JSON.stringify(tacticalHexGrid.gridData))
        };

        if (this.mapId) {
            const index = gameData[currentGame].tacticalMaps.findIndex(m => Number(m.id) === Number(this.mapId));
            if (index > -1) gameData[currentGame].tacticalMaps[index] = mapSnapshot;
        } else {
            gameData[currentGame].tacticalMaps.push(mapSnapshot);
        }

        console.log(`Карта "${name}" (Гексы) сохранена!`);
        // dbManager.saveGame(currentGame, gameData[currentGame]);
    },

    loadMap(id) {
        const map = gameData[currentGame].tacticalMaps.find(m => Number(m.id) === Number(id));
        if (!map) return;

        this.mapId = id;
        this.rows = map.rows;
        this.cols = map.cols;

        // Восстанавливаем объектную сетку v3.0 (если она есть) или конвертируем старую (если это массив)
        if (map.gridData && !Array.isArray(map.gridData)) {
            tacticalHexGrid.gridData = JSON.parse(JSON.stringify(map.gridData));
        } else {
            // Фоллбэк: если загружаем старую карту-массив, конвертируем её в гексы
            console.warn("Загрузка старой карты-массива. Конвертация...");
            tacticalHexGrid.initGrid(this.rows, this.cols);
            // Тут можно добавить логику переноса данных из массива в ключи q_r
        }

        tfRowInput.value = this.rows;
        tfColInput.value = this.cols;

        // Обновляем размер холста и рисуем
        tacticalMap.init();
    },


    clearSelection() {
        tacticalMap.moving = null;
    },
};








