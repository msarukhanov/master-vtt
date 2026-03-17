gameData.storiesOfTheEnd.app = {
    groupedTabs: [
        {
            groupKey: "main",
            tabs: [
                {tabKey: "mainMenu", code: "mainMenu"},
                {tabKey: "dataReset", code: "dataReset"},
                {tabKey: "gallery", code: "gallery"},
                {tabKey: "charGen", code: "charGen"},
                {tabKey: "editor", code: "editor"},
            ]
        },
        {
            groupKey: "game",
            tabs: [
                {tabKey: "dashboard", code: "dashboard"},
                {tabKey: "dices", code: "dices"},
                {tabKey: "tacticalField", code: "tacticalField"},
                {tabKey: "charGen", code: "chargen"},
            ]
        },
        {
            groupKey: "system",
            tabs: [
                {tabKey: "mechanics", code: "mechanics"},
                {tabKey: "legacies", code: "legacies"},
                {tabKey: "talents", code: "talents"},
                {tabKey: "classes", code: "classes"},
                {tabKey: "magic", code: "magic"},
            ]
        },
        {
            groupKey: "world",
            tabs: [
                {tabKey: "map", code: "map"},
                {tabKey: "races", code: "races"},
                {tabKey: "factions", code: "factions"},
                {tabKey: "history", code: "history"}
            ]
        },
        {
            groupKey: "highPowers",
            tabs: [
                {tabKey: "firstborn", code: "firstborn"},
                {tabKey: "pantheons", code: "pantheons"},
                {tabKey: "cosmology", code: "cosmology"},
            ]
        },
        {
            groupKey: "characters",
            tabs: [
                {tabKey: "characters", code: "characters"},
                {tabKey: "characterHistory", code: "characterHistory"}
            ]
        },
        {
            groupKey: "bosses",
            tabs: [
                {tabKey: "bosses", code: "bosses"},
            ]
        },
        {
            groupKey: "adventures",
            tabs: [
                {tabKey: "campaigns", code: "campaigns"},
                {tabKey: "worldQuests", code: "worldQuests"},
                {tabKey: "dlc", code: "dlc"}
            ]
        },
        {
            groupKey: "content",
            tabs: [
                {tabKey: "relics", code: "relics"},
                {tabKey: "gallery", code: "gallery"},
                {tabKey: "base", code: "base"}
            ]
        }
    ],
    formFieldsSettings: {
        characters: {
            avatar: true,
            fullheight: true,
            personal: false,
            // profession: true,
            // locations: true,
            class: true,
            level: true,

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

            color: true,
            tier: true,

            // profession: true,
            // locations: true,

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
        },

        triggers: {
            triggerBase: true, // Базовые параметры (тип, повторяемость)
            logic: true        // Списки условий и действий
        },
        quests: {
            description: true,
            questLogic: true // Наш новый блок со стадиями
        },
        dialogs: {
            character: true, // Привязка к NPC из реестра
            dialogView: true, // Настройки камер (2sides, closeUp)
            dialogLogic: true // Список узлов (Nodes)
        }
    }
};