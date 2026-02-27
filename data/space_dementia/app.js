gameData.spaceDementia.app = {
    groupedTabs: [
        {
            group: "Основное",
            tabs: [
                {name: "Главное меню", code: "mainMenu"},
                {name: "Сброс кэша", code: "dataReset"},
                // {name: "Галерея", code: "gallery"},
                {name: "Генератор персонажей", code: "charGen"},
                {name: "Редактор", code: "editor"},
            ]
        },
        {
            group: "Игра",
            tabs: [
                {name: "Броски", code: "dices"},
                // {name: "Глобальные ходы", code: "globalmoves"},
                {name: "Тактическая карта", code: "tacticalField"},
                {name: "Генератор персонажей", code: "chargen"},
            ]
        },
        {
            group: "Игра",
            tabs: [
                {name: "Броски", code: "dices"},
                // {name: "Глобальные ходы", code: "globalmoves"},
                {name: "Тактическая карта", code: "tacticalField"},
                {name: "Генератор персонажей", code: "chargen"},
            ]
        },
        {
            group: "Система",
            tabs: [
                {name: "Механики", code: "mechanics"},
                {name: "Классы", code: "classes"},
            ]
        },

        {
            group: "Мир и народы",
            tabs: [
                {name: "Mир", code: "cosmology"},
                {name: "Карта", code: "map"},
                {name: "Расы и народы", code: "races"},
                {name: "Фракции", code: "factions"},
                {name: "Краткая история мира", code: "history"}
            ]
        },

        {
            group: "Персонажи",
            tabs: [
                {name: "Персонажи", code: "characters"}
            ]
        }
    ],
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