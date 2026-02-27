const assets = {
    mapIcons : {},
    terrains: {},
    loadedAvatars: {}
};

const assetsManager = {

    terrainsUrls: [
        './assets/terrain/desert.png',
        './assets/terrain/grass.png',
        './assets/terrain/sand.png',
        './assets/terrain/sea.png',
        './assets/terrain/clearSea.jpg',
        './assets/terrain/snow.png',
        './assets/terrain/iceSnow.jpg',
        './assets/terrain/beachSand.jpg',
        './assets/terrain/brickWall.jpg',
        './assets/terrain/mudLeaves.png',
        './assets/terrain/forestLeaves.jpg',
        './assets/terrain/stoneRoad.png',
        './assets/terrain/stoneWall.jpg',
        './assets/terrain/rockMountain.png',
        './assets/terrain/lava.jpg',
    ],
    
    mapIconsUrls: ['./assets/map-icons/ancient-temple.svg','./assets/map-icons/blacksmith.svg','./assets/map-icons/castle.svg','./assets/map-icons/cathedral.svg','./assets/map-icons/city.svg','./assets/map-icons/farm.svg','./assets/map-icons/fisherhouse.svg','./assets/map-icons/fort.svg','./assets/map-icons/fort-ladder.svg','./assets/map-icons/gate.svg','./assets/map-icons/graveyard.svg','./assets/map-icons/guild.svg','./assets/map-icons/inn.svg','./assets/map-icons/mausoleum.svg','./assets/map-icons/maze.svg','./assets/map-icons/obelisk.svg','./assets/map-icons/ritual.svg','./assets/map-icons/ruins.svg','./assets/map-icons/stable.svg','./assets/map-icons/tavern.svg','./assets/map-icons/tent.svg','./assets/map-icons/tower.svg','./assets/map-icons/warehouse.svg','./assets/map-icons/windmill.svg'],

    async init(game) {
        // Ждем загрузки всех ассетов перед стартом
        await Promise.all([
            this.loadAssets('mapIcons', this.mapIconsUrls),
            this.loadAssets('terrains', this.terrainsUrls),
            this.loadAvatars(game),
        ]);
        console.log("Assets loaded", assets);
    },

    loadAssets(type, files) {
        return new Promise((resolve) => {
            let loadedCount = 0;
            if (files.length === 0) resolve();
            for (const url of files) {
                const img = new Image();
                const name = url.split('/').pop().split('.')[0];
                img.onload = () => {
                    loadedCount++;
                    assets[type][name] = img;
                    if (loadedCount === files.length) resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load: ${url}`);
                    loadedCount++;
                    if (loadedCount === files.length) resolve();
                };
                img.src = url;
            }
        });
    },

    loadAvatars(game) {
        const files = Object.keys(images[game].avatars);
        return new Promise((resolve) => {
            let loadedCount = 0;
            if (files.length === 0) resolve();
            for (const url of files) {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    assets.loadedAvatars[url] = img;
                    if (loadedCount === files.length) resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load: ${url}`);
                    loadedCount++;
                    if (loadedCount === files.length) resolve();
                };
                img.src = images[game].avatars[url];
            }
        });
    }
    
};