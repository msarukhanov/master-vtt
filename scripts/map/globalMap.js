const globalMap = {
    canvas: null,
    ctx: null,

    gridData: null,

    sizes: {
        rows: 0,
        cols: 0,
        padding: 0,
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

    currentReachable: null,
    currentTurnIndex: null,

    get width() { return Math.sqrt(3) * this.sizes.cellSize; },
    get height() { return 2 * this.sizes.cellSize; },

    init() {
        const {ctx, sizes:{padding}, camera:{zoom, angleY}} = hexFunction.data;
        this.gridData = {...(currentSeason.gridData || {})};

        const _map = document.createElement("img");
        _map.id = 'world-map';
        _map.src = images[currentGame].map;
        _map.dataset.data = JSON.stringify({type:'click',name:'global-map-click'});

        _map.onload = () => {
            const width = _map.width * zoom;
            _map.height *= angleY * zoom;
            _map.width = width;

            map.canvas = document.getElementById('grid-canvas');
            if (!map.canvas) {
                globalMap.canvas = document.createElement('canvas');
                globalMap.canvas.id = 'grid-canvas';
                globalMap.canvas.style.position = 'absolute';
                globalMap.canvas.style.top = '0';
                globalMap.canvas.style.left = '0';
                globalMap.canvas.style.pointerEvents = 'none';
                globalMap.ctx = globalMap.canvas.getContext('2d');
                map.container.appendChild(globalMap.canvas);
            }
            globalMap.canvas.width = _map.width;
            globalMap.canvas.height = _map.height;

            globalMap.update();
            characterManager.prepareCharacters();

            turnManager.init();

            map.container.appendChild(_map);

            let minQ = Infinity, maxQ = -Infinity, minR = Infinity, maxR = -Infinity;
            Object.keys(globalMap.gridData).forEach((key) => {
                const [q, r] = key.split('_').map(Number);
                minQ = Math.min(minQ, q);
                maxQ = Math.max(maxQ, q);
                minR = Math.min(minR, r);
                maxR = Math.max(maxR, r);
            });

            globalMap.sizes.rows = maxQ;
            globalMap.sizes.cols = maxR;
            map.renderGridEditor(map.container);

            map.scrollTo();
        };
    },

    // switchLocation(mapId, startQ, startR) {
    //     this.currentTurnIndex = this.turnQueue.findIndex(u => u.q === startQ && u.r === startR);
    //     this.activeUnit = this.turnQueue[this.currentTurnIndex];
    //
    //     globalMap.update();
    // },



    update() {
        if (!globalMap.gridData) return;
        if (!globalMap.canvas) return;



        globalMap.ctx.clearRect(0, 0, globalMap.canvas.width, globalMap.canvas.height);


        hexFunction.drawCells();
        // if(globalMap.show.tradeRoutes) {
        //     tradeManager.renderTradePaths();
        // }
        if(globalMap.show.labels) {
            hexFunction.drawLabels();
        }
        // tradeManager.renderTradePaths();
    },

};