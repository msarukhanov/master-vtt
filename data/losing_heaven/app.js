gameData.losingHeaven.app = {
    groupedTabs: [
        {
            groupKey: "main",
            tabs: [
                {tabKey: "mainMenu", code: "mainMenu"},
                {tabKey: "dataReset", code: "dataReset"},
                {tabKey: "gallery", code: "gallery"},
                {tabKey: "editor", code: "editor"},
            ]
        },
        {
            groupKey: "game",
            tabs: [
                {tabKey: "dices", code: "dices"},
                {tabKey: "tacticalField", code: "tacticalField"},
                {tabKey: "charGen", code: "charGen"},
            ]
        },
        {
            groupKey: "world",
            tabs: [
                {tabKey: "map", code: "map"},
                {tabKey: "characters", code: "characters"},
                {tabKey: "factions", code: "factions"},
                {tabKey: "history", code: "history"},
            ]
        },
        // {
        //     groupKey: "adventures",
        //     tabs: [
        //         {name: "Стартовые кампании", code: "startingCampaigns"},
        //         {name: "Мировые Квесты", code: "worldQuests"},
        //         {name: "Дополнения", code: "dlc"}
        //     ]
        // },
    ],
    mapSettings: {
        freeClickColors: ['#c0c0c0'],
    },
    formFieldsSettings: {
        characters: {
            avatar: true,
            personal: true,
            profession: true,
            locations: true,

            appearance: true,
            personality: true,
            description: true,
            philosophy: true,

            relations: true,
            family: true,
            factions: true,
            friends: true,
        },
        factions: {
            avatar: true,

            profession: true,
            locations: true,

            description: true,
            philosophy: true,

            factions: true,
            friends: true,
        },
        races: {
            avatar: true,

            appearance: true,
            personality: true,
            description: true,
        },
        peoples: {
            avatar: true,

            appearance: true,
            personality: true,
            description: true,

            races: true,
        },
        classes: {
            avatar: true,

            races: true,
            peoples: true,

            description: true,
        },
        locations: {
            avatar: true,
            description: true,
            ltwh: true,
        }
    }
};