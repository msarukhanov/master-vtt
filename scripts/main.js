let gameData = {
    'storiesOfTheEnd': {},
    'losingHeaven': {},
    'spaceDementia': {}
}, data = {}, currentGame = '', currentSeason = null, currentTab = '', groupedTabs, mapSettings, seasons, avatars, fullheight;

let images = {
    'storiesOfTheEnd': {
        avatars: null,
        map: null,
    },
    'losingHeaven': {
        avatars: null,
        map: null,
    },
    'spaceDementia': {
        avatars: null,
        map: null,
    }
};

const listKeys = ["characters", "locations", "factions", "firstborn", "pantheons", "bosses", "classes", "items",
    "campaigns", "quests", "triggers", "history", "cosmology", "mechanics", "talents", "abilities",
    "races", "peoples", "legacies", "dlc"];

const seasonDefault = {
    id: "",
    game: "",
    name: "",
    players: [{name: "Player 1", id: "player1"}],
    playerCharacters: [{id:"char_id_1",player:"player1"}],
    mapLocations: [],
    notes: [
        {id: 1, date: new Date(), text: "Season start", data: {}}
    ]
};

const lang = 'ru';

const main = {
    async initGame(game) {
        await dbManager.init();
        await assetsManager.init(game);

        let finalData = null;

        const savedDB = await dbManager.loadGame(game);

        if (!savedDB && window.Android && window.Android.loadBackup) {
            const fileData = window.Android.loadBackup();
            if (fileData) {
                try {
                    finalData = JSON.parse(fileData);
                    console.log("Данные подтянуты из файла бэкапа");
                    // Сразу сохраняем их в IndexedDB для будущих запусков
                    await dbManager.saveGame(game, finalData);
                } catch(e) { console.error("Ошибка парсинга файла", e); }
            }
        } else {
            finalData = savedDB;
        }

        if (finalData) {
            // Сохраняем свежий 'app' конфиг из скриптов
            const currentAppConfig = gameData[game].app;
            gameData[game] = finalData;
            gameData[game].app = currentAppConfig;
            console.log("Данные успешно загружены");
        } else {
            console.log("Используются дефолтные данные из скриптов");
        }

        const savedSeasons = await dbManager.loadGame('seasons');
        gameData.seasons = savedSeasons || gameData.seasons;

        const savedPlayers = await dbManager.loadGame('players');
        gameData.players = savedPlayers || gameData.players;

        main.setCurrentGame(game);
    },
    setCurrentGame(game) {
        if (!gameData[game]) return;

        currentGame = game;
        const currentData = gameData[game];

        data = {};

        listKeys.forEach(key => {
            if (currentData[key]) data[key] = currentData[key];
        });

        groupedTabs = [...currentData.app.groupedTabs];
        mapSettings = {...(currentData.app.mapSettings || {})};
        avatars = images[game].avatars;
        fullheight = images[game].fullheight;
        // map = images[game].map;

        if(!gameData.players) {
            gameData.players = [];
        }

        if(!gameData.seasons) {
            gameData.seasons = [];
        }

        // [controls].forEach(system => system?.init?.());
        controls.init();

        main.setCurrentSeason(gameData.seasons[0]);

        elementById('main-menu').style.display = 'none';

        // controls.changeTab('map');
        controls.changeTab('editor');
        // controls.changeTab('dashboard');
    },
    setCurrentSeason(season=null) {
        if(!season) {
            season = this.addSeason();
            season.characters = gameData[currentGame]._characters;
            if(!season.characters) {
                season.characters = data.characters.map(c=>characterManager.prepareCharacter(c));
            }
            season.contracts = gameData[currentGame].contracts;
            season.diplomacy = gameData[currentGame].diplomacy;
            season.gridData = gameData[currentGame].gridData;
            season.exploredCells = gameData[currentGame].exploredCells;
        }

        // season.characters = gameData.storiesOfTheEnd._characters;
        // season.contracts = gameData.storiesOfTheEnd.contracts;
        // season.diplomacy = gameData.storiesOfTheEnd.diplomacy;
        // season.gridData = gameData.storiesOfTheEnd.gridData;
        // season.exploredCells = gameData.storiesOfTheEnd.exploredCells;

        if(!season.contracts) {
            season.contracts = {};
        }

        currentSeason = season;

        currentSeason.characters = currentSeason.characters || {};
        currentSeason.contracts = currentSeason.contracts || {};
        currentSeason.diplomacy = currentSeason.diplomacy || {};
        currentSeason.gridData = currentSeason.gridData || {};
        currentSeason.exploredCells = currentSeason.exploredCells || {};

        main.saveCurrentSeason();
        // if(season.mapLocations.length) {
        //     season.mapLocations.forEach(l=>{
        //         let oldLocIndex = gameData[currentGame].locations.findIndex(i=>i.id===l.id);
        //         if(oldLocIndex>-1) gameData[currentGame].locations[oldLocIndex] = {...gameData[currentGame].locations[oldLocIndex],...l};
        //         else gameData[currentGame].locations.push(l);
        //     })
        // }
    },
    saveCurrentSeason() {
        // currentSeason.mapCharacters = map.mapCharacters;
        // currentSeason.mapObjects = map.mapObjects;
        // currentSeason.mapLocations = gameData[currentGame].locations.filter(i=>i.characters&&i.characters.length);

        const index = gameData.seasons.findIndex(i=>i.id===Number(currentSeason.id));
        gameData.seasons[index] = currentSeason;

        dbManager.saveGame('seasons', gameData.seasons).then();
    },
    addSeason() {
        let season;
        season = JSON.parse(JSON.stringify(seasonDefault));
        season.id = Date.now();
        season.game = currentGame;
        season.name = "Season-" + season.id;
        gameData.seasons.push(season);
        dbManager.saveGame('seasons', gameData.seasons).then();
        return season;
    },
    delSeason(id) {
        const isCurrent = currentSeason.id === id;
        const index = gameData[currentGame].seasons.findIndex(i=>i.id===id);
        if(index>-1) {
            gameData.seasons.splice(index,1);
            if(isCurrent) {
                this.setCurrentSeason(gameData.seasons[0]);
            }
        }
        dbManager.saveGame('seasons', gameData.seasons).then();
    },
    saveToBackup() {
        const dataToSave = JSON.stringify(gameData[currentGame]);

        if (window.Android && window.Android.saveBackup) {
            window.Android.saveBackup(dataToSave);
            alert("Бэкап сохранен во внутреннюю память APK");
        } else {
            console.log("Интерфейс Android не найден (возможно, запуск в браузере)");
        }
    },
    async restoreFromBackup() {
        if (window.Android && window.Android.loadBackup) {
            const fileData = window.Android.loadBackup();

            if (!fileData) {
                alert("Файл бэкапа не найден на устройстве.");
                return;
            }

            if (confirm("Восстановить данные из файла? Текущий прогресс будет перезаписан.")) {
                try {
                    const parsed = JSON.parse(fileData);
                    // Сохраняем в базу
                    await dbManager.saveGame(currentGame, parsed);
                    alert("Данные восстановлены. Приложение будет перезагружено.");
                    location.reload();
                } catch (e) {
                    alert("Ошибка: файл бэкапа поврежден.");
                }
            }
        } else {
            alert("Функция доступна только в приложении (APK).");
        }
    }
};



window.addEventListener('load', (event) => {
    elementById('loading').style.display = 'none';
    elementById('main-menu').style.display = 'flex';
});