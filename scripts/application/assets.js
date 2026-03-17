const assets = {
    icons: {},
    mapIcons : {},
    terrains: {},
    objects: {},
    loadedAvatars: {},
    loadedFullHeight: {},
};

const assetsManager = {

    // terrainsUrls: [
    //     './assets/terrain/desert.png',
    //     './assets/terrain/grass.png',
    //     './assets/terrain/sand.png',
    //     './assets/terrain/sea.png',
    //     './assets/terrain/clearSea.jpg',
    //     './assets/terrain/snow.png',
    //     './assets/terrain/iceSnow.jpg',
    //     './assets/terrain/beachSand.jpg',
    //     './assets/terrain/brickWall.jpg',
    //     './assets/terrain/mudLeaves.png',
    //     './assets/terrain/forestLeaves.jpg',
    //     './assets/terrain/stoneRoad.png',
    //     './assets/terrain/stoneWall.jpg',
    //     './assets/terrain/rockMountain.png',
    //     './assets/terrain/lava.jpg',
    // ],

    iconsUrls: [
        './assets/icons/attack.svg',
        './assets/icons/charInfo.svg',
        './assets/icons/conversation.svg',
        './assets/icons/edit.svg',
        './assets/icons/erase.svg',
        './assets/icons/expander.svg',
        './assets/icons/gate.svg',
        './assets/icons/global.svg',
        './assets/icons/graph.svg',
        './assets/icons/hex.svg',
        './assets/icons/hourglass.svg',
        './assets/icons/house.svg',
        './assets/icons/load.svg',
        './assets/icons/menu.svg',
        './assets/icons/move.svg',
        './assets/icons/notes.svg',
        './assets/icons/paint.svg',
        './assets/icons/openGate.svg',
        './assets/icons/play.svg',
        './assets/icons/reload.svg',
        './assets/icons/resize.svg',
        './assets/icons/save.svg',
        './assets/icons/search.svg',
        './assets/icons/select.svg',
        './assets/icons/settings.svg',
        './assets/icons/stack.svg',
        './assets/icons/toggles.svg',

        './assets/icons/emptyInventory.svg',
        './assets/icons/bodyInventory.svg',
        './assets/icons/headInventory.svg',
        './assets/icons/glovesInventory.svg',
        './assets/icons/feetInventory.svg',
        './assets/icons/legsInventory.svg',
        './assets/icons/shouldersInventory.svg',
        './assets/icons/main_handInventory.svg',
        './assets/icons/off_handInventory.svg',
        './assets/icons/neckInventory.svg',
        './assets/icons/ringInventory.svg',

    ],

    terrainsUrls: [
        './assets/terrain/beachSand.jpg',
        './assets/terrain/brownHills.png',
        './assets/terrain/desert.png',
        './assets/terrain/grass.png',
        './assets/terrain/hills.png',
        './assets/terrain/ice.png',
        './assets/terrain/jungle.png',
        './assets/terrain/lowHills.png',
        './assets/terrain/lava.jpg',
        // './assets/terrain/mountain.png',
        './assets/terrain/mountain.jpg',
        // './assets/terrain/mud.png',
        './assets/terrain/mud.jpg',
        './assets/terrain/sea.png',
        './assets/terrain/snow.png',
        // './assets/terrain/snowMountain.png',
        './assets/terrain/snowMountain.jpg',
        './assets/terrain/stoneRoad.png',
        './assets/terrain/stoneWall.jpg',
        // './assets/terrain/swamp.png',
        './assets/terrain/swamp.jpg',
        './assets/terrain/water.png',
        // './assets/terrain/wood.png',
        './assets/terrain/wood.jpg',
        './assets/terrain/woodDark.png',
    ],

    objectUrls: [
        // './assets/objects/capital.png',
        // './assets/objects/church.png',
        // './assets/objects/city.png',
        // './assets/objects/inn.png',
        // './assets/objects/port.png',
        // './assets/objects/tradePost.png',

        './assets/objects/blacksmith.svg',
        './assets/objects/castle.svg',
        './assets/objects/chest.svg',
        './assets/objects/church.svg',
        // './assets/objects/city.svg',
        './assets/objects/city.png',
        './assets/objects/crate.svg',
        './assets/objects/dock.svg',
        './assets/objects/fortWooden.svg',
        './assets/objects/gates.svg',
        './assets/objects/graveyard.svg',
        './assets/objects/house.png',
        './assets/objects/haycock.svg',
        './assets/objects/headstone.svg',
        './assets/objects/inn.svg',
        './assets/objects/jailhouse.svg',
        './assets/objects/ladder.svg',
        './assets/objects/loghut.svg',
        './assets/objects/loghut2.svg',
        './assets/objects/map-48704.svg',
        './assets/objects/mausoleum.svg',
        './assets/objects/maze.svg',
        './assets/objects/mine.svg',
        // './assets/objects/mountain.png',
        './assets/objects/obelisk.svg',
        './assets/objects/port.png',
        // './assets/objects/port.svg',
        './assets/objects/portal.png',
        './assets/objects/pyramid.svg',
        './assets/objects/ritual.svg',
        './assets/objects/sign.svg',
        './assets/objects/smallPort.svg',
        './assets/objects/stable.svg',
        './assets/objects/statue1.svg',
        './assets/objects/tavern.svg',
        './assets/objects/temple.svg',
        './assets/objects/tent.svg',
        './assets/objects/tower.svg',
        './assets/objects/townhall.svg',
        './assets/objects/tree.svg',
        './assets/objects/village.svg',
        './assets/objects/villageHouse.svg',
        './assets/objects/wagon.svg',
        './assets/objects/warehouse.svg',
        './assets/objects/well.svg',
        './assets/objects/windmill.svg',

        // './assets/objects/wood.svg',

        './assets/objects/wood.png',
        './assets/objects/forest.png',
        './assets/objects/forestTall.png',
        './assets/objects/mountain.png',
        './assets/objects/snowMountain.png',
        './assets/objects/jungle.png',

    ],
    
    mapIconsUrls: ['./assets/map-icons/ancient-temple.svg','./assets/map-icons/blacksmith.svg','./assets/map-icons/castle.svg','./assets/map-icons/cathedral.svg','./assets/map-icons/city.svg','./assets/map-icons/farm.svg','./assets/map-icons/fisherhouse.svg','./assets/map-icons/fort.svg','./assets/map-icons/fort-ladder.svg','./assets/map-icons/gate.svg','./assets/map-icons/graveyard.svg','./assets/map-icons/guild.svg','./assets/map-icons/inn.svg','./assets/map-icons/mausoleum.svg','./assets/map-icons/maze.svg','./assets/map-icons/obelisk.svg','./assets/map-icons/ritual.svg','./assets/map-icons/ruins.svg','./assets/map-icons/stable.svg','./assets/map-icons/tavern.svg','./assets/map-icons/tent.svg','./assets/map-icons/tower.svg','./assets/map-icons/warehouse.svg','./assets/map-icons/windmill.svg'],

    async init(game) {
        // Ждем загрузки всех ассетов перед стартом
        await Promise.all([
            this.loadAssets('mapIcons', this.mapIconsUrls),
            this.loadAssets('terrains', this.terrainsUrls),
            this.loadAssets('objects', this.objectUrls),
            this.loadIcons('icons', this.iconsUrls),
            this.loadAvatars(game),
            this.loadFullHeight(game),
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

    loadIcons(type, files) {
        return new Promise((resolve) => {
            let loadedCount = 0;
            if (files.length === 0) return resolve();

            files.forEach(url => {
                const xhr = new XMLHttpRequest();
                const name = url.split('/').pop().split('.')[0];

                xhr.open('GET', url, true);

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        assets[type][name] = xhr.responseText;
                    } else {
                        console.error(`Failed to load SVG: ${url}`);
                    }

                    loadedCount++;
                    if (loadedCount === files.length) resolve();
                };

                xhr.onerror = () => {
                    console.error(`Network error while loading: ${url}`);
                    loadedCount++;
                    if (loadedCount === files.length) resolve();
                };
                xhr.send();
            });
        });
    },
    //
    //
    // loadIcons(type, files) {
    //     return new Promise((resolve) => {
    //         let loadedCount = 0;
    //         if (files.length === 0) resolve();
    //         for (const url of files) {
    //             const img = new Image();
    //             const name = url.split('/').pop().split('.')[0];
    //             img.onload = () => {
    //                 loadedCount++;
    //                 assets[type][name] = img;
    //                 if (loadedCount === files.length) resolve();
    //             };
    //             img.onerror = () => {
    //                 console.error(`Failed to load: ${url}`);
    //                 loadedCount++;
    //                 if (loadedCount === files.length) resolve();
    //             };
    //             img.src = url;
    //         }
    //         for (const url of files) {
    //             const name = url.split('/').pop().split('.')[0];
    //             try {
    //                 const response = await fetch(url);
    //                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    //
    //                 const svgText = await response.text();
    //
    //                 assets[type][name] = svgText;
    //             } catch (e) {
    //                 console.error(`Failed to load SVG: ${url}`, e);
    //             }
    //         }
    //     });
    // },

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
    },

    loadFullHeight(game) {
        const files = Object.keys(images[game].fullheight);
        return new Promise((resolve) => {
            let loadedCount = 0;
            if (files.length === 0) resolve();
            for (const url of files) {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    assets.loadedFullHeight[url] = img;
                    if (loadedCount === files.length) resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load: ${url}`);
                    loadedCount++;
                    if (loadedCount === files.length) resolve();
                };
                img.src = images[game].fullheight[url];
            }
        });
    }
    
};