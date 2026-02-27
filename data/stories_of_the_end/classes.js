gameData.storiesOfTheEnd.classes = [

    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 1,
        id: "svyashchennik",
        name: "Священник",
        parent: null
    },
    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 2,
        id: "propovednik",
        name: "Проповедник",
        note: "бафы",
        parent: "svyashchennik"
    },
    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 3,
        id: "pastyr",
        name: "Пастырь",
        note: "масс бафы",
        parent: "propovednik"
    },

    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "tank",
        tier: 2,
        id: "paladin",
        name: "Паладин",
        note: "дд/танк/саппорт",
        parent: "svyashchennik"
    },
    {
        faction: ["holyThrone", "holyEmpire", "grimwood"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "support",
        tier: 3,
        id: "rytsar_spyashchego_lesa_ayvi",
        name: "Рыцарь Спящего Леса (Айви)",
        note: "природа",
        parent: "paladin"
    },
    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "tank",
        tier: 3,
        id: "rytsar_ternovogo_ventsa_emma",
        name: "Рыцарь Тернового Венца (Эмма)",
        note: "кровь",
        parent: "paladin"
    },
    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 3,
        id: "rytsar_ordena_rassveta_leonard",
        name: "Рыцарь Ордена Рассвета (Леонард)",
        note: "обеты",
        parent: "paladin"
    },
    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "melee",
        tier: 4,
        id: "rytsar_solntsa",
        name: "Рыцарь Солнца",
        parent: "rytsar_ordena_rassveta_leonard"
    },

    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 2,
        id: "tselitel",
        name: "Целитель",
        note: "хилер",
        parent: "svyashchennik"
    },
    {
        faction: ["holyThrone", "holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 2,
        id: "gospitaler",
        name: "Госпитальер",
        note: "магия исцеления",
        parent: "tselitel"
    },

    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 1,
        id: "mag",
        name: "Маг",
        parent: null
    },

    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 2,
        id: "zaklinatel",
        name: "Заклинатель",
        parent: "mag"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 3,
        id: "mag_stikhiy",
        name: "Маг Стихий",
        note: "усиленные заклинания",
        parent: "zaklinatel"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 4,
        id: "emissar_stikhii",
        name: "Эмиссар [стихия]",
        parent: "mag_stikhiy"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": "",
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 3,
        id: "ritualist",
        name: "Ритуалист",
        note: "массовые ритуалы",
        parent: "zaklinatel"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 3,
        id: "arhimag",
        name: "Архимаг",
        note: "комбинированные заклинания",
        parent: "zaklinatel"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 4,
        id: "bely_mag",
        name: "Белый Маг",
        parent: "arhimag"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 3,
        id: "master_dogovorov",
        name: "Мастер договоров",
        note: "контракты, астрал",
        parent: "zaklinatel"
    },

    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 2,
        id: "zacharovatel",
        name: "Зачарователь",
        note: "создание артефактов",
        parent: "mag"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "tank",
        tier: 2,
        id: "boevoi_mag",
        name: "Боевой маг",
        note: "ближний бой",
        parent: "mag"
    },

    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 2,
        id: "mag_sovetnik",
        name: "Маг-советник",
        note: "ритуалы поддержки",
        parent: "mag"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "support",
        tier: 3,
        id: "pridvornyi_mag",
        name: "Придворный Маг",
        parent: "mag_sovetnik"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 4,
        id: "imperatorskiy_mag",
        name: "Императорский маг",
        parent: "pridvornyi_mag"
    },

    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild", "svyatoslaviya"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 2,
        id: "poslushnik_vechnogo_plameni",
        name: "Послушник Вечного Пламени (Алаксена)",
        parent: "mag"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild", "svyatoslaviya"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 3,
        id: "posvyashchyonnyy_dvora_plameni",
        name: "Посвящённый Двора Вечного Пламени",
        parent: "poslushnik_vechnogo_plameni"
    },
    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild", "svyatoslaviya"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": ["grimwood"],
        type: "mage",
        tier: 4,
        id: "lord_dvora_vechnogo_plameni",
        name: "Лорд Двора Вечного Пламени",
        parent: "posvyashchyonnyy_dvora_plameni"
    },

    {
        faction: ["holyThrone", "holyEmpire", "imperialMageGuild"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "support",
        tier: 2,
        id: "alkhimik_imperiya",
        name: "Алхимик (Империя)",
        parent: "mag"
    },

    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "tank",
        tier: 1,
        id: "rytsar",
        name: "Рыцарь",
        parent: null
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "tank",
        tier: 2,
        id: "polkovodets",
        name: "Полководец",
        note: "массовые ауры",
        parent: "rytsar"
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "tank",
        tier: 3,
        id: "lord_marshаl",
        name: "Лорд-Маршал",
        note: "ауры на фракцию",
        parent: "polkovodets"
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": ['crownsberg'],
        "peoplesNot": [],
        type: "tank",
        tier: 4,
        id: "desnitsa_pervogo_imperatora",
        name: "Десница Первого Императора",
        parent: "lord_marshаl/lord_protector"
    },

    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "support",
        tier: 2,
        id: "aristokrat",
        name: "Аристократ",
        note: "ауры работают вне боя",
        parent: "rytsar"
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "support",
        tier: 3,
        id: "lord_protector",
        name: "Лорд-Протектор",
        note: "бонусы в оборону и мораль",
        parent: "aristokrat"
    },

    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "melee",
        tier: 2,
        id: "rytsar_strannik",
        name: "Рыцарь-Странник",
        note: "обеты странствий",
        parent: "rytsar"
    },

    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "melee",
        tier: 2,
        id: "rytsar_sumraka",
        name: "Рыцарь Сумрака",
        note: "рыцарственность другая",
        parent: "rytsar"
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "melee",
        tier: 3,
        id: "lord_sumraka",
        name: "Лорд Сумрака",
        note: "нет штрафов на рыцаря",
        parent: "rytsar_sumraka"
    },

    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": [],
        "peoplesNot": [],
        type: "melee",
        tier: 3,
        id: "chernyi_rytsar_vi_ren",
        name: "Чёрный Рыцарь Ви'Рен",
        note: "танк/дд",
        parent: "rytsar"
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": ['viren'],
        "peoplesNot": [],
        type: "melee",
        tier: 4,
        id: "rytsar_belokamennoy_kreposti",
        name: "Рыцарь Белокаменной Крепости",
        parent: "chernyi_rytsar_vi_ren"
    },

    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": ['delys'],
        "peoplesNot": [],
        type: "melee",
        tier: 2,
        id: "duelyant_de_lis",
        name: "Дуэлянт (Де Лис)",
        note: "дд/ловкость",
        parent: "rytsar"
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": ['delys'],
        "peoplesNot": [],
        type: "melee",
        tier: 3,
        id: "rytsar_beloy_rozy",
        name: "Рыцарь Белой Розы",
        note: "скорость, дд",
        parent: "duelyant_de_lis"
    },
    {
        faction: ["holyEmpire"],
        "races": ["human"],
        "racesNot": [],
        "peoples": ['delys'],
        "peoplesNot": [],
        type: "tank",
        tier: 4,
        id: "gvardeyets_korolevy_shipov",
        name: "Гвардеец Королевы Шипов",
        note: "бафы на защиту",
        parent: "rytsar_beloy_rozy"
    },

    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "", type: "melee", tier: 1, id: "voin_sv_imp", name: "Воин", parent: null
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 2,
        id: "zashchitnik_sv_imp",
        name: "Защитник",
        note: "танк",
        parent: "voin_sv_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "strazhnik_kraunsberga",
        name: "Стражник Краунсберга",
        note: "броня и арбалет",
        parent: "zashchitnik_sv_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "palach",
        name: "Палач",
        note: "двуручник дд",
        parent: "voin_sv_imp"
    },

    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "kavalerist_sv_imp",
        name: "Кавалерист",
        note: "конный бой",
        parent: "voin_sv_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "vsadnik_rikhtera",
        name: "Всадник Рихтера",
        note: "броня, конница",
        parent: "kavalerist_sv_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "katafrakt_kelebrion",
        name: "Катафракт (Келебрион)",
        note: "броня, конница, луки",
        parent: "kavalerist_sv_imp"
    },

    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "kopeyshchik",
        name: "Копейщик",
        note: "древковое, танк/дд",
        parent: "voin_sv_imp"
    },

    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 1,
        id: "luchnik_svp_imp",
        name: "Лучник",
        parent: null
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 2,
        id: "snayper_svp_imp",
        name: "Снайпер",
        note: "дальность, магич. атаки",
        parent: "luchnik_svp_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 3,
        id: "arbaletchik_de_lis",
        name: "Арбалетчик Де Лис",
        note: "бронебойность, урон",
        parent: "snayper_svp_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 3,
        id: "reyndzher_temnolesya",
        name: "Рейнджер Темнолесья",
        note: "яды, скрытность, бл.бой",
        parent: "snayper_svp_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 4,
        id: "temnyi_reyndzher",
        name: "Тёмный Рейнджер",
        parent: "reyndzher_temnolesya"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 2,
        id: "konnyi_luchnik",
        name: "Конный лучник",
        note: "конница",
        parent: "luchnik_svp_imp"
    },

    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 1,
        id: "razvedchik_svp_imp",
        name: "Разведчик",
        parent: null
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 2,
        id: "shpion_svp_imp",
        name: "Шпион",
        note: "кража, допросы",
        parent: "razvedchik_svp_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 3,
        id: "diversant_torrino",
        name: "Диверсант (Торрино)",
        note: "взрывы, ловушки",
        parent: "shpion_svp_imp"
    },
    {
        faction: "holyEmpire",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 2,
        id: "assassin",
        name: "Ассасин",
        note: "яды",
        parent: "razvedchik_svp_imp"
    },

    // ============================
    // ЛОРЕНЦИЯ / ВАЛЕНСИЯ
    // ============================
    {
        faction: "Лоренция / Валенсия",
        type: "mage",
        tier: 2,
        id: "strelok_lorencia",
        name: "Стрелок",
//                note: "маг. атаки",
        "description": "Стрелок — элитный боец светлого города-государства, мастер артефактного оружия. Он сочетает технику, магию и стратегию, превращая каждый выстрел в смертоносное искусство. Даже новичок может почувствовать себя героем: правильная цель, точный выстрел и эффектная комбинация артефактов. Высшие круги Стрелков платят собой: раны рук, глаз и тела — цена за непревзойденный урон. Но их армия щедро обеспечена зельями и лечением, а их сила и харизма вызывают зависть и восхищение в других странах.",
        "roleplay": "Стрелок — человек действия, уверенный и харизматичный, но не фанатичный. Он любит красиво действовать: прицел, перегрев, выстрелы в нескольких целях, иногда флирт с противником или союзниками. В диалоге — чаще прямолинейный, практичный, иногда с лёгкой иронией. В бою — контролирует каждое действие, рассчитывает ману, патроны, перегрев ствола и возможные последствия. Социально — любимец публики, вызывает зависть и интерес окружающих, особенно когда демонстрирует свою силу или мастерство.",
        "features": "<ul><li>Мана через артефакты: стрелок использует магические патроны и артефакты, вместо классической школы магии.</li><li>Перегрев ствола: чем сильнее нагреваешь оружие, тем выше урон, но растет риск ран.</li><li>Стихийные выстрелы: можно менять тип магического урона — огонь, вода, молния, яды, статусы.</li><li>Высокая мобильность и гибкость: особенно в дуальном билде с пистолетами.</li><li>Элитные возможности 8+ круга: шквальный огонь, терминальный перегрев, трассирующие боеприпасы, возможность использовать несколько стихий одновременно.</li><li>Служба во благо: атакует только врагов города, пиратов и демонов; помогает мирным жителям и союзникам.</li></ul>",
        "roleplay_tips": "<ul><li>Используйте харизму стрелка в социальных сценах: флирт, демонстрация мастерства, остроумные реплики.</li><li>В бою рассчитывайте ресурсы: ману, выстрелы, перегрев, зелья.</li><li>Помните о цене силы: раны и перегрев — это часть истории персонажа, а не просто механика.</li><li>Играйте как защитник света и справедливости, но с индивидуальностью: у стрелка есть чувство юмора, личный стиль и социальная харизма.</li></ul>",
        "strengths": "<ul><li>Высокий урон благодаря артефактам и перегреву.</li><li>Гибкость в бою: стихийные выстрелы, тактические боеприпасы.</li><li>Поддержка армии и медиков снижает цену ран.</li><li>Харизма и социальная привлекательность, вызывает зависть и уважение.</li><li>Эффективен против демонов, пиратов и других угроз.</li></ul>",
        "weaknesses": "<ul><li>Раны и перегрев могут накопиться, если плохо рассчитывать ресурсы.</li><li>Сильная зависимость от артефактов и экипировки.</li><li>Меньше живучести в одиночку против магов или неожиданных угроз без поддержки.</li><li>Моральная нагрузка 8+ круга: платишь собой за максимальный урон.</li><li>Сложнее освоить многопатронные билды новичкам.</li></ul>",
        parent: null
    },
    {
        faction: "Лоренция / Валенсия",
        type: "tactical",
        tier: 3,
        id: "kommandos",
        name: "Коммандос",
        "description": "Коммандос — это опытный стрелок и стратег, мастер артефактного оружия и тактического боя. Он не только наносит урон, но и управляет полем боя, усиливая союзников и ослабляя врагов. Его навыки сочетают перегрев, стихийные выстрелы и тактические команды, делая его незаменимым в бою и на поле сражения.",
        "roleplay": "Коммандос — уверенный лидер, харизматичный и расчетливый. Он контролирует каждый ход, планирует действия отряда и использует тактические приемы. В диалогах проявляет стратегическое мышление, прямолинейность и чувство юмора. В бою — точен и расчетлив, всегда учитывает ресурсы, ману и патроны.",
        "features": "<ul><li>Тактические способности: бафы союзников и дебафы врагов.</li><li>Управление полем боя: зональные эффекты и командные приказы.</li><li>Мана через артефакты: позволяет стрелкам использовать магические патроны и артефакты.</li><li>Стихийные и многопатронные выстрелы: контроль над уронами и эффектами.</li><li>Высокая мобильность и стратегическое мышление в бою.</li><li>Элитные возможности 8–10 круга: шквальный огонь, тактическое усиление оружия, командный апогей, игнорирование дебаффов.</li></ul>",
        "roleplay_tips": "<ul><li>Используйте харизму и стратегическое мышление в социальных сценах.</li><li>Контролируйте поле боя: расставляйте союзников, накладывайте бафы и дебафы.</li><li>В бою рассчитывайте ресурсы: ману, выстрелы, перегрев, расходники.</li><li>Играйте как лидер и защитник союзников, комбинируя тактические способности и урон.</li><li>Учитывайте цену сильных способностей: ограничения по маны и единовременное использование мощных апгрейдов.</li></ul>",
        "strengths": "<ul><li>Высокий урон и контроль поля боя.</li><li>Способность усиливать союзников и ослаблять врагов.</li><li>Сочетание магических патронов и тактических навыков.</li><li>Эффективен как в одиночку, так и в команде.</li><li>Элитные способности 8–10 круга позволяют полностью доминировать на поле боя.</li></ul>",
        "weaknesses": "<ul><li>Сильная зависимость от манны и артефактов.</li><li>Сложность управления всеми тактическими эффектами и ресурсами.</li><li>Ограниченное использование мощных способностей (например, командный апогей только 1 раз за бой).</li><li>Не столь живуч в одиночку против магов или неожиданных угроз без поддержки.</li><li>Элитные способности имеют высокую стоимость и потенциальный риск ранений или перегрева оружия.</li></ul>",
        parent: "strelok_lorencia"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "tactical",
        tier: 4,
        id: "voenny_diktator_lorencii",
        name: "Военный Диктатор Лоренции",
        parent: "kommandos"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "mage",
        tier: 4,
        id: "strelok_anarxii",
        name: "Стрелок Анархии",
        parent: "kommandos"
    },

    {
        faction: "Лоренция / Валенсия",
        type: "tactical",
        tier: 3,
        id: "okhotnik_za_nagradoy",
        name: "Охотник за наградой",
        note: "дд, 2 руки",
        parent: "strelok_lorencia"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "mage",
        tier: 3,
        id: "artillerist",
        name: "Артиллерист",
        note: "заряженные атаки",
        parent: "strelok_lorencia"
    },

    {
        faction: "Лоренция / Валенсия",
        type: "assassin",
        tier: 3,
        id: "killer",
        name: "Киллер",
        note: "дд, скрытность",
        parent: "strelok_lorencia/lazutchik"
    },
//            {
//                faction: "Лоренция / Валенсия",
//                type: "assassin",
//                tier: 4,
//                id: "sikario",
//                name: "Сикарио",
//                parent: "killer"
//            },

    {
        faction: "Лоренция / Валенсия",
        type: "assassin",
        tier: 2,
        id: "lazutchik",
        name: "Лазутчик",
        note: "скрытность, бл.бой",
        parent: null
    },
    {
        faction: "Лоренция / Валенсия",
        type: "assassin",
        tier: 3,
        id: "doznavatel_tserkov",
        name: "Дознаватель (Церковь)",
        note: "допросы, расследования",
        parent: "lazutchik"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "assassin",
        tier: 3,
        id: "podryvnik",
        name: "Подрывник",
        parent: "lazutchik"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "assassin",
        tier: 3,
        id: "master_masok",
        name: "Мастер Масок",
        note: "перевоплощение, иллюзии",
        parent: "lazutchik/bard"
    },
//            {
//                faction: "Лоренция / Валенсия",
//                type: "assassin",
//                tier: 4,
//                id: "mnogolikiy",
//                name: "Многоликий",
//                note: "копия противника",
//                parent: "master_masok"
//            },

    {faction: "Лоренция / Валенсия", type: "support", tier: 2, id: "bard", name: "Бард", parent: null},
    {
        faction: "Лоренция / Валенсия",
        type: "support",
        tier: 3,
        id: "maestro",
        name: "Маэстро",
        note: "баффы, урон",
        parent: "bard"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "support",
        tier: 3,
        id: "zvezda",
        name: "Звезда",
        note: "бафы, ауры, мораль",
        parent: "bard"
    },
//            {faction: "Лоренция / Валенсия", type: "support", tier: 4, id: "aidol", name: "Айдол", parent: "zvezda"},
//            {
//                faction: "Лоренция / Валенсия",
//                type: "support",
//                tier: 4,
//                id: "orkestrant_armii",
//                name: "Оркестрант Армии",
//                note: "бафы, ауры, мораль",
//                parent: "zvezda"
//            },
    {
        faction: "Лоренция / Валенсия",
        type: "support",
        tier: 3,
        id: "lyubimchik_siren",
        name: "Любимчик Сирен",
        note: "бафы на море, призывы",
        parent: "bard/moryak"
    },

    {
        faction: "Лоренция / Валенсия",
        type: "melee",
        tier: 2,
        id: "moryak",
        name: "Моряк",
        note: "ближний бой, стрельба",
        parent: null
    },
    {
        faction: "Лоренция / Валенсия",
        type: "melee",
        tier: 3,
        id: "abordazhnik",
        name: "Абордажник",
        note: "увороты, парирования",
        parent: "moryak"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "melee",
        tier: 3,
        id: "kapitan_lorencia",
        name: "Капитан (Лоренция)",
        note: "ауры, бафы, мораль",
        parent: "moryak"
    },
//            {
//                faction: "Лоренция / Валенсия",
//                type: "melee",
//                tier: 4,
//                id: "khozyain_morey",
//                name: "Хозяин Морей",
//                parent: "kapitan_lorencia"
//            },

    {
        faction: "Лоренция / Валенсия",
        type: "support",
        tier: 3,
        id: "korabelshchik",
        name: "Корабельщик",
        parent: "moryak/inzhener"
    },

    {
        faction: "Лоренция / Валенсия",
        type: "support",
        tier: 2,
        id: "inzhener",
        name: "Инженер",
        note: "создание артефактов",
        parent: null
    },
    {
        faction: "Лоренция / Валенсия",
        type: "support",
        tier: 3,
        id: "oruzheynik_lorencia",
        name: "Оружейник (Лоренция)",
        note: "личное оружие",
        parent: "inzhener"
    },
    {
        faction: "Лоренция / Валенсия",
        type: "mage",
        tier: 4,
        id: "tekhnomant",
        name: "Техномант",
        parent: "oruzheynik_lorencia"
    },
//            {
//                faction: "Лоренция / Валенсия",
//                type: "mage",
//                tier: 4,
//                id: "fabrikator_ariman",
//                name: "Фабрикатор (Ариман)",
//                note: "ауры на производстве",
//                parent: "tekhnomant"
//            },


    // ============================
    // ЭЛЬВИНАРСКАЯ ИМПЕРИЯ
    // ============================
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 1,
        id: "rytsar_elvinar",
        name: "Рыцарь",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "rytsar_serebryanoy_luny",
        name: "Рыцарь Серебряной Луны",
        note: "ауры, бафы, обеты",
        parent: "rytsar_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "lord_serebryanoy_luny",
        name: "Лорд Серебряной Луны",
        parent: "rytsar_serebryanoy_luny"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 4,
        id: "lunnyi_klinok",
        name: "Лунный Клинок",
        parent: "lord_serebryanoy_luny/rytsar_dvukh_lun"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "rytsar_polnoluniya",
        name: "Рыцарь Полнолуния",
        note: "дд, броня, бафы",
        parent: "rytsar_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "rytsar_dvukh_lun",
        name: "Рыцарь Двух Лун",
        note: "дд и магия луны",
        parent: "rytsar_polnoluniya"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 3,
        id: "rytsar_bezdny_fa_y_da_yen",
        name: "Рыцарь Бездны (Фа'й'да'йэн)",
        note: "тени",
        parent: "rytsar_polnoluniya"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 4,
        id: "tantsuyushchaya_na_oskolkakh_bezdny",
        name: "Танцующая на Осколках Бездны",
        parent: "rytsar_bezdny_fa_y_da_yen"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 2,
        id: "rytsar_doma_oberon",
        name: "Рыцарь дома Оберон",
        note: "броня, ауры, жречество",
        parent: "rytsar_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "veteran_rytsarey_doma_oberon",
        name: "Ветеран Рыцарей дома Оберон",
        parent: "rytsар_doma_oberon"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 4,
        id: "kapitan_rytsarey_doma_oberon",
        name: "Капитан Рыцарей дома Оберон",
        parent: "veteran_rytsarey_doma_oberon"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "rytsar_doma_fa_la_n_nar",
        name: "Рыцарь дома Фа'Ла'н'Нар",
        note: "тяж.броня, дд, магия",
        parent: "rytsar_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "rytsar_korolevy_morya",
        name: "Рыцарь Королевы Моря",
        note: "ауры, дебаффы, лёд",
        parent: "rytsar_doma_fa_la_n_nar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 4,
        id: "koroleva_solyonykh_vod",
        name: "Королева Солёных Вод",
        parent: "rytsar_korolevy_morya"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 1,
        id: "reyndzher_elvinar",
        name: "Рейнджер",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 2,
        id: "strazh_lesa",
        name: "Страж Леса",
        note: "бонусный пет",
        parent: "reyndzher_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 3,
        id: "strazh_prirody_fa_mi_ssent",
        name: "Страж Природы (Фа'Ми'Ссент)",
        note: "дд, яды, контроль, призывы",
        parent: "strazh_lesa"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 4,
        id: "strazh_mirovogo_dreva",
        name: "Страж Мирового Древа",
        parent: "strazh_prirody_fa_mi_ssent"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 2,
        id: "mstitel_elvinar",
        name: "Мститель",
        note: "бонус против цели",
        parent: "reyndzher_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 3,
        id: "imperskiy_sledovatel",
        name: "Имперский следователь",
        note: "метки, дебафы, дд, пытки",
        parent: "mstitel_elvinar"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "ranged",
        tier: 2,
        id: "okhotnik_na_demonov",
        name: "Охотник на демонов",
        note: "бонус против демонов",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 3,
        id: "kholodnoe_serdtse_fa_mi_rret",
        name: "Холодное сердце (Фа'Ми'Ррет)",
        note: "ледяная магия",
        parent: "okhotnik_na_demonov"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "voin_doma_oberon",
        name: "Воин дома Оберон",
        note: "броня, тактика",
        parent: "reyndzher_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "veteran_doma_oberon",
        name: "Ветеран дома Оберон",
        note: "лунные атаки и броня",
        parent: "voin_doma_oberon"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 4,
        id: "ekzarkh_voyny_doma_oberon",
        name: "Экзарх Войны дома Оберон (Барон 1)",
        parent: "veteran_doma_oberon"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 1,
        id: "charodey_elvinar",
        name: "Чародей",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 2,
        id: "druid_elvinar",
        name: "Друид",
        parent: "charodey_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 3,
        id: "khranitel_roschi_fa_li_ril",
        name: "Хранитель Рощи (Фа'Ли'Рил)",
        parent: "druid_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 4,
        id: "khranitel_mirovogo_dreva",
        name: "Хранитель Мирового Древа",
        parent: "khranitel_roschi_fa_li_ril"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 2,
        id: "mudrets_vetrov_magii",
        name: "Мудрец Ветров Магии",
        parent: "charodey_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 3,
        id: "imperskiy_arkhimag",
        name: "Имперский Архимаг",
        parent: "mudrets_vetrov_magii"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 2,
        id: "lord_falazura",
        name: "Лорд Фалазура",
        parent: "charodey_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 3,
        id: "lord_arkhimag_falazura",
        name: "Лорд-Архимаг Фалазура",
        parent: "lord_falazura"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 4,
        id: "korol_charodey_falazura",
        name: "Король-Чародей Фалазура",
        parent: "lord_arkhimag_falazura"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "", type: "melee", tier: 1, id: "voin_elvinar", name: "Воин", parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "master_mecha",
        name: "Мастер меча",
        note: "дд/магия",
        parent: "voin_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 3,
        id: "tantsuyushchiy_s_klinками",
        name: "Танцующий с клинками",
        parent: "master_mecha"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 4,
        id: "klinok_vechnozelenogo_sada",
        name: "Клинок Вечнозелёного Сада",
        parent: "tantsuyushchiy_s_klinками/imperskiy_mechnik/tantsuyushchiy_so_smertyu_fa_y_o_lin"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "imperskiy_mechnik",
        name: "Имперский мечник",
        parent: "master_mecha"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "tantsuyushchiy_so_smertyu_fa_y_o_lin",
        name: "Танцующий со смертью (Фа'й'о'лин)",
        parent: "master_mecha"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "razoritel_fa_la_n_nar",
        name: "Разоритель (Фа'Ла'н'Нар)",
        note: "дд в броне, двуручник",
        parent: "master_mecha"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "master_kopya",
        name: "Мастер копья",
        note: "дд/танк",
        parent: "voin_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "imperskiy_gvardeyets",
        name: "Имперский гвардеец",
        note: "дальние атаки",
        parent: "master_kopya"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 4,
        id: "znamenosets_lunnogo_dvora",
        name: "Знаменосец Лунного Двора",
        parent: "imperskiy_gvardeyets/imperskiy_strazhnik"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "imperskiy_strazhnik",
        name: "Имперский стражник",
        note: "танк со щитом",
        parent: "master_kopya"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "master_glefy_fa_y_o_lin",
        name: "Мастер глефы (Фай'о'лин)",
        note: "танк/контратака",
        parent: "master_kopya"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 1,
        id: "zhrets_elvinar",
        name: "Жрец",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 2,
        id: "prositiel_lunnogo_dvora",
        name: "Проситель Лунного Двора",
        note: "бафы, дебафы, мораль",
        parent: "zhrets_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 3,
        id: "idushchiy_v_lunnykh_blikakh_fa_y_a_rsendriet",
        name: "Идущий в Лунных Бликах (Фа'й'а'Рсэндриэт)",
        note: "массовые ритуалы",
        parent: "prositiel_lunnogo_dvora"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 4,
        id: "lord_polnoy_luny",
        name: "Лорд Полной Луны",
        parent: "idushchiy_v_lunnykh_blikakh_fa_y_a_rsendriet"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 1,
        id: "tselitel_elvinar",
        name: "Целитель",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 2,
        id: "travnik_elvinar",
        name: "Травник",
        parent: "tselitel_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 3,
        id: "imperskiy_tselitel",
        name: "Имперский целитель",
        parent: "travnik_elvinar"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 2,
        id: "vedma_lesa",
        name: "Ведьма Леса",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 3,
        id: "khozyayka_lesa",
        name: "Хозяйка Леса",
        parent: "vedma_lesa"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 4,
        id: "vedma_mrachnykh_bolot",
        name: "Ведьма Мрачных болот",
        note: "Темнолесье",
        parent: "khozyayka_lesa"
    },

    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 1,
        id: "razvedchik_elvinar",
        name: "Разведчик",
        note: "яды, скрытность, бл.бой, дебафы",
        parent: null
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 2,
        id: "razvedchik_elvinar_2",
        name: "Разведчик 2",
        note: "яды, скрытность, бл.бой, дебафы",
        parent: "razvedchik_elvinar"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 3,
        id: "razvedchik_elvinar_3",
        name: "Разведчик 3",
        note: "яды, скрытность, бл.бой, дебафы",
        parent: "razvedchik_elvinar_2"
    },
    {
        faction: "elvinarKingdom",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 4,
        id: "ta_llis",
        name: "Та'Ллис",
        note: "Лезвие Ночи Новолуния",
        parent: "razvedchik_elvinar_3"
    },


    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "melee", tier: 1, id: "voin_orda", name: "Воин", parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "tank", tier: 2, id: "berserk_orki", name: "Берсерк (орки)", parent: "voin_orda"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "apostol_gneva_demony",
        name: "Апостол Гнева (Демоны)",
        parent: "berserk_orki"
    },

    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "gladiator",
        name: "Гладиатор",
        note: "танк",
        parent: "voin_orda"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "chempion_areny_demony",
        name: "Чемпион Арены (Демоны)",
        parent: "gladiator"
    },

    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 2,
        id: "reyder",
        name: "Рейдер",
        note: "наездник",
        parent: "voin_orda"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "melee",
        tier: 3,
        id: "gonitel_demony",
        name: "Гонитель (Демоны)",
        parent: "reyder"
    },

    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "assassin", tier: 1, id: "okhotnik_orda", name: "Охотник", parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 2,
        id: "golovorez",
        name: "Головорез",
        note: "стрельба, скрытность",
        parent: "okhotnik_orda"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "assassin",
        tier: 3,
        id: "sdirayushchiy_kozhu_demony",
        name: "Сдирающий кожу (Демоны)",
        parent: "golovorez"
    },

    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "mage", tier: 1, id: "shaman_orda", name: "Шаман", parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 2,
        id: "verkhovnyy_shaman",
        name: "Верховный Шаман",
        parent: "shaman_orda"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 3,
        id: "oskvernitel_kurganov_lukash",
        name: "Осквернитель Курганов (Лукаш)",
        parent: "verkhovnyy_shaman"
    },

    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 1,
        id: "zhrets_orda",
        name: "Жрец",
        note: "бафы, дебафы",
        parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 2,
        id: "razzhigatel_voin_lukash",
        name: "Разжигатель Войн (Лукаш)",
        note: "бафы, дебафы",
        parent: "zhrets_orda"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 3,
        id: "apostol_voyny_lukash",
        name: "Апостол Войны (Лукаш)",
        note: "некромантия",
        parent: "razzhigatel_voin_lukash"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 4,
        id: "sobiratel_drakonikh_cherepov_lukash",
        name: "Собиратель Драконьих Черепов (Лукаш)",
        parent: "apostol_voyny_lukash"
    },

    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "melee", tier: 1, id: "kentavr", name: "Кентавр", parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "melee", tier: 2, id: "kentavr_2", name: "Кентавр 2", parent: "kentavr"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "melee", tier: 3, id: "kentavr_3", name: "Кентавр 3", parent: "kentavr_2"
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "melee", tier: 4, id: "velikiy_khan", name: "Великий Хан", parent: "kentavr_3"
    },

    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "tank", tier: 1, id: "minotavr", name: "Минотавр", parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "tank", tier: 2, id: "minotavr_2", name: "Минотавр 2 ", parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "", type: "tank", tier: 3, id: "minotavr_3", name: "Минотавр 3", parent: null
    },
    {
        faction: "horde",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 4,
        id: "tsar_minotavrov",
        name: "Царь Минотавров",
        parent: "minotavr_3"
    },

    // ============================
    // МАУНТЕЙН
    // ============================
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "", type: "tank", tier: 1, id: "voin_maunteyn", name: "Воин", parent: null
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 2,
        id: "shchitonosec",
        name: "Щитоносец",
        parent: "voin_maunteyn"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "korolevskiy_zashchitnik",
        name: "Королевский защитник",
        parent: "shchitonosec"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 4,
        id: "telokhranitel_tsarya_gory",
        name: "Телохранитель Царя Горы",
        parent: "korolevskiy_zashchitnik"
    },

    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 2,
        id: "berserk_dvarf",
        name: "Берсерк (дварф)",
        parent: "voin_maunteyn"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 3,
        id: "veselyy_myasnik",
        name: "Весёлый мясник",
        parent: "berserk_dvarf"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 4,
        id: "mudrets_maunteyn",
        name: "Мудрец Маунтейна",
        parent: "veselyy_myasnik"
    },

    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "", type: "support", tier: 1, id: "zhrets_maunteyn", name: "Жрец", parent: null
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 2,
        id: "samogonshchik_berta",
        name: "Самогонщик (Берта)",
        note: "бафы на зельях",
        parent: "zhrets_maunteyn"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 3,
        id: "zolotoy_zhrets_berta",
        name: "Золотой Жрец (Берта)",
        note: "ауры вне боя",
        parent: "samogonshchik_berta"
    },

    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "support",
        tier: 2,
        id: "boevoi_zhrets",
        name: "Боевой жрец",
        note: "бафы, хил",
        parent: "zhrets_maunteyn"
    },

    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 2,
        id: "runnyy_zhrets",
        name: "Рунный Жрец",
        parent: "zhrets_maunteyn"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 3,
        id: "stareyshina_runnogo_zala",
        name: "Старейшина Рунного Зала",
        parent: "runnyy_zhrets"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "tank",
        tier: 4,
        id: "runnyy_rezchik",
        name: "Рунный Резчик",
        parent: "stareyshina_runnogo_zala"
    },

    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "", type: "mage", tier: 1, id: "kuznets_maunteyn", name: "Кузнец", parent: null
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 2,
        id: "lord_kuzni",
        name: "Лорд Кузни",
        parent: "kuznets_maunteyn"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 3,
        id: "mifrilovyy_master",
        name: "Мифриловый Мастер",
        parent: "lord_kuzni"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 4,
        id: "master_artefaktov_maunteyn",
        name: "Мастер Артефактов",
        parent: "mifrilovyy_master"
    },
    {
        faction: "mountainKingdom",
        "races": "",
        "peoples": "",
        type: "mage",
        tier: 2,
        id: "inzhener_maunteyn",
        name: "Инженер",
        parent: "kuznets_maunteyn"
    },

    // ============================
    // ДАНХЕЙМ И СВЯТОСЛАВИЯ
    // ============================
    {faction: "Данхейм и Святославия", type: "melee", tier: 1, id: "voin_danheym", name: "Воин", parent: null},
    {
        faction: "Данхейм и Святославия",
        type: "melee",
        tier: 2,
        id: "grabitel",
        name: "Грабитель",
        note: "дд/танк",
        parent: "voin_danheym"
    },
    {
        faction: "Данхейм и Святославия",
        type: "tank",
        tier: 3,
        id: "huskarl",
        name: "Хускарl",
        note: "тяж танк/дд",
        parent: "grabitel"
    },
    {
        faction: "Данхейм и Святославия",
        type: "melee",
        tier: 4,
        id: "voitel_valgally",
        name: "Воитель Вальгаллы",
        parent: "huskarl"
    },

    {
        faction: "Данхейм и Святославия",
        type: "tank",
        tier: 3,
        id: "deva_shchita",
        name: "Дева щита",
        parent: "grabitel"
    },
    {
        faction: "Данхейм и Святославия",
        type: "tank",
        tier: 4,
        id: "valkiriya",
        name: "Валькирия",
        parent: "deva_shchita"
    },

    {
        faction: "Данхейм и Святославия",
        type: "ranged",
        tier: 2,
        id: "metatel_toporov",
        name: "Метатель топоров",
        note: "дальние атаки",
        parent: "voin_danheym"
    },
    {
        faction: "Данхейм и Святославия",
        type: "ranged",
        tier: 2,
        id: "strelets",
        name: "Стрелец",
        note: "алебарда и лук",
        parent: "voin_danheym"
    },

    {
        faction: "Данхейм и Святославия",
        type: "melee",
        tier: 2,
        id: "krylatyy_gusar",
        name: "Крылатый Гусар",
        note: "средняя конница",
        parent: "voin_danheym"
    },

    {
        faction: "Данхейм и Святославия",
        type: "tank",
        tier: 2,
        id: "bogatyr",
        name: "Богатырь",
        note: "танк, ауры",
        parent: "voin_danheym"
    },

    {faction: "Данхейм и Святославия", type: "support", tier: 1, id: "zhrets_dan", name: "Жрец", parent: null},
    {
        faction: "Данхейм и Святославия",
        type: "support",
        tier: 2,
        id: "vedun",
        name: "Ведун",
        note: "ритуалы, бафы, дебафы",
        parent: "zhrets_dan"
    },

    {
        faction: "Данхейм и Святославия",
        type: "support",
        tier: 2,
        id: "zhrets_voyny_dany",
        name: "Жрец Войны (даны)",
        note: "бафы, дебафы",
        parent: "zhrets_dan"
    },
    {
        faction: "Данхейм и Святославия",
        type: "support",
        tier: 3,
        id: "vestnik_drakona_smerti_i_voyny",
        name: "Вестник Дракона Смерти и Войны",
        parent: "zhrets_voyny_dany/zhrets_smerti_dany"
    },
    {
        faction: "Данхейм и Святославия",
        type: "mage",
        tier: 4,
        id: "zhrets_valgally",
        name: "Жрец Вальгаллы",
        parent: "vestnik_drakona_smerti_i_voyny"
    },
    {
        faction: "Данхейм и Святославия",
        type: "support",
        tier: 2,
        id: "zhrets_smerti_dany",
        name: "Жрец Смерти (даны)",
        note: "некромантия, ритуалы",
        parent: "zhrets_dan"
    },

    {faction: "Данхейм и Святославия", type: "mage", tier: 1, id: "mag_dan", name: "Маг", parent: null},
    {
        faction: "Данхейм и Святославия",
        type: "mage",
        tier: 2,
        id: "zaklinatel_krovi",
        name: "Заклинатель Крови",
        parent: "mag_dan"
    },
    {
        faction: "Данхейм и Святославия",
        type: "mage",
        tier: 3,
        id: "zaklinatel_krovi_2",
        name: "Заклинатель Крови",
        parent: "zaklinatel_krovi"
    },
    {
        faction: "Данхейм и Святославия",
        type: "mage",
        tier: 2,
        id: "syn_doch_buri_dany",
        name: "Сын/Дочь Бури (даны)",
        note: "молния",
        parent: "mag_dan"
    },
    {
        faction: "Данхейм и Святославия",
        type: "mage",
        tier: 3,
        id: "syn_doch_buri_dany_2",
        name: "Сын/Дочь Бури 2 (даны)",
        note: "молния",
        parent: "syn_doch_buri_dany"
    },
    {
        faction: "Данхейм и Святославия",
        type: "mage",
        tier: 2,
        id: "zheleznokrovy_dany",
        name: "Железнокровый (даны)",
        note: "металл",
        parent: "mag_dan"
    },
    {
        faction: "Данхейм и Святославия",
        type: "mage",
        tier: 3,
        id: "zheleznokrovy_dany_2",
        name: "Железнокровый 2 (даны)",
        note: "металл",
        parent: "zheleznokrovy_dany"
    },

    // ============================
    // КОРОЛЕВСТВА ВОСТОКА
    // ============================
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 1,
        id: "samurai_nippon",
        name: "Самурай (ниппон)",
        parent: null
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 2,
        id: "samurai_nippon_2",
        name: "Самурай 2 (ниппон)",
        parent: "samurai_nippon"
    },
    {
        faction: "Королевства Востока",
        type: "tactical",
        tier: 3,
        id: "beskhvostyy_lis",
        name: "Бесхвостый Лис",
        note: "магия, ауры",
        parent: "samurai_nippon_2"
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 3,
        id: "mechnik_krovavogo_tumana",
        name: "Мечник Кровавого Тумана",
        note: "кража жизни, берсерк",
        parent: "samurai_nippon_2"
    },
    {
        faction: "Королевства Востока",
        type: "tank",
        tier: 3,
        id: "kenpachi",
        name: "Кенпачи",
        note: "танк",
        parent: "samurai_nippon_2"
    },

    {
        faction: "Королевства Востока",
        type: "assassin",
        tier: 1,
        id: "shinobi_nippon",
        name: "Шиноби (ниппон)",
        parent: null
    },
    {
        faction: "Королевства Востока",
        type: "assassin",
        tier: 2,
        id: "shinobi_nippon_2",
        name: "Шиноби 2 (ниппон)",
        parent: "shinobi_nippon"
    },
    {
        faction: "Королевства Востока",
        type: "assassin",
        tier: 3,
        id: "master_nindzyutsu",
        name: "Мастер Ниндзюцу",
        parent: "shinobi_nippon_2"
    },
    {
        faction: "Королевства Востока",
        type: "assassin",
        tier: 3,
        id: "nezrimyy_klinok",
        name: "Незримый Клинок",
        parent: "shinobi_nippon_2"
    },

    {
        faction: "Королевства Востока",
        type: "mage",
        tier: 4,
        id: "sura_asura",
        name: "Сура / Асура",
        parent: "beskhvostyy_lis/mechnik_krovavogo_tumana/kenpachi/master_nindzyutsu/nezrimyy_klinok"
    },

    {
        faction: "Королевства Востока",
        type: "ranged",
        tier: 1,
        id: "luchnik_vostok",
        name: "Лучник",
        parent: null
    },
    {
        faction: "Королевства Востока",
        type: "ranged",
        tier: 2,
        id: "strelek_kore",
        name: "Стрелок (корё)",
        note: "как у Лоренции",
        parent: "luchnik_vostok"
    },
    {
        faction: "Королевства Востока",
        type: "ranged",
        tier: 2,
        id: "cho_ko_nu",
        name: "Чо-ко-ну (чжунго)",
        note: "арбалетчик",
        parent: "luchnik_vostok"
    },

    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 1,
        id: "monakh_kore_chzhungo",
        name: "Монах (корё и чжунго)",
        parent: null
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 2,
        id: "daosist",
        name: "Даосист",
        parent: "monakh_kore_chzhungo"
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 2,
        id: "boets_murima",
        name: "Боец Мурима (корё)",
        parent: "monakh_kore_chzhungo"
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 2,
        id: "shaolinskiy_monakh",
        name: "Шаолиньский монах (чжунго)",
        parent: "monakh_kore_chzhungo"
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 3,
        id: "kulak_bezuprechnoy_zvezdy",
        name: "Кулак Безупречной Звезды",
        parent: "shaolinskiy_monakh"
    },

    {
        faction: "Королевства Востока",
        type: "support",
        tier: 1,
        id: "alkhimik_vostok",
        name: "Алхимик (восток)",
        note: "корё и джунго",
        parent: null
    },
    {
        faction: "Королевства Востока",
        type: "support",
        tier: 2,
        id: "master_zeliy",
        name: "Мастер Зелий",
        note: "бафер",
        parent: "alkhimik_vostok"
    },
    {
        faction: "Королевства Востока",
        type: "support",
        tier: 2,
        id: "pirotekhnik",
        name: "Пиротехник",
        note: "бомбы и горючие смеси",
        parent: "alkhimik_vostok"
    },
    {
        faction: "Королевства Востока",
        type: "support",
        tier: 2,
        id: "tselitel_vostok",
        name: "Целитель",
        note: "хилер, яды",
        parent: "alkhimik_vostok"
    },

    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 1,
        id: "voin_vostok",
        name: "Воин (восток)",
        note: "сборка уникальна",
        parent: null
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 2,
        id: "voin_vostok_2",
        name: "Воин 2 (восток)",
        note: "сборка уникальна",
        parent: "voin_vostok"
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 3,
        id: "voin_vostok_3",
        name: "Воин 3 (восток)",
        note: "сборка уникальна",
        parent: "voin_vostok_2"
    },
    {
        faction: "Королевства Востока",
        type: "melee",
        tier: 4,
        id: "svyatoi_proklyatyy_mech",
        name: "Святой / Проклятый меч",
        parent: "voin_vostok"
    },

    // ============================
    // КОРОЛЕВСТВА ЗАПАДА
    // ============================
    {
        faction: "Королевства Запада",
        type: "tank",
        tier: 1,
        id: "rytsar_ozernye",
        name: "Рыцарь (озёрные)",
        parent: null
    },
    {
        faction: "Королевства Запада",
        type: "tank",
        tier: 2,
        id: "rytsar_ozernye_2",
        name: "Рыцарь 2 (озёрные)",
        parent: "rytsar_ozernye"
    },
    {
        faction: "Королевства Запада",
        type: "tank",
        tier: 3,
        id: "rytsar_ozernye_3",
        name: "Рыцарь  3 (озёрные)",
        parent: "rytsar_ozernye_2"
    },
    {
        faction: "Королевства Запада",
        type: "melee",
        tier: 4,
        id: "konsort_ledi_ozera",
        name: "Консорт Леди Озера",
        parent: "rytsar_ozernye_3"
    },

    {faction: "Королевства Запада", type: "melee", tier: 1, id: "voin_zapad", name: "Воин", parent: null},
    {
        faction: "Королевства Запада",
        type: "melee",
        tier: 2,
        id: "voin_ledyanykh_pustoshey",
        name: "Воин Ледяных Пустошей",
        note: "северяне",
        parent: "voin_zapad"
    },

    {faction: "Королевства Запада", type: "ranged", tier: 1, id: "luchnik_zapad", name: "Лучник", parent: null},
    {
        faction: "Королевства Запада",
        type: "ranged",
        tier: 2,
        id: "vsadniki_preriy_yuzhane",
        name: "Всадники Прерий (южане)",
        note: "конные лучники",
        parent: "luchnik_zapad"
    },

    {faction: "Королевства Запада", type: "mage", tier: 1, id: "mag_zapad", name: "Маг", parent: null},

    {
        faction: "Королевства Запада",
        type: "mage",
        tier: 1,
        id: "zhrets_mireski",
        name: "Жрец Мирески",
        parent: null
    },
    {
        faction: "Королевства Запада",
        type: "mage",
        tier: 2,
        id: "grezyashchiy_o_korolevstve_fey",
        name: "Грезящий о Королевстве Фей",
        parent: "zhrets_mireski"
    },
    {
        faction: "Королевства Запада",
        type: "mage",
        tier: 3,
        id: "stranstvuyushchiy_v_poiskakh_poteryannogo_raya",
        name: "Странствующий в поисках Потерянного Рая",
        parent: "grezyashchiy_o_korolevstve_fey"
    },
    {
        faction: "Королевства Запада",
        type: "mage",
        tier: 4,
        id: "legat_temneyshey_vesny",
        name: "Легат Темнейшей Весны",
        parent: "stranstvuyushchiy_v_poiskakh_poteryannogo_raya"
    },

    // ============================
    // ПУСТЫНЯ ЛАХРА
    // ============================
    {faction: "Пустыня Лахра", type: "tank", tier: 1, id: "voin_lakhra", name: "Воин", parent: null},
    {
        faction: "Пустыня Лахра",
        type: "tank",
        tier: 2,
        id: "voin_faraona_lakhra",
        name: "Воин Фараона (Лахра)",
        note: "реген и бафы в пустыне",
        parent: "voin_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "tank",
        tier: 3,
        id: "palach_faraona",
        name: "Палач Фараона",
        note: "танк, дд, проклятия",
        parent: "voin_faraona_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "melee",
        tier: 4,
        id: "gibelniy_klinok",
        name: "Гибельный Клинок",
        parent: "palach_faraona"
    },
    {
        faction: "Пустыня Лахра",
        type: "tank",
        tier: 3,
        id: "general_pustyni",
        name: "Генерал Пустыни",
        note: "бафы, массовые ауры",
        parent: "voin_faraona_lakhra"
    },

    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 2,
        id: "tantsor_pustyni_kp",
        name: "Танцор пустыни (КП)",
        note: "ловкость",
        parent: "voin_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 3,
        id: "dervish",
        name: "Дервиш",
        note: "боевой транс",
        parent: "tantsor_pustyni_kp"
    },

    {
        faction: "Пустыня Лахра",
        type: "melee",
        tier: 2,
        id: "mamluk_kochevniki",
        name: "Мамлюк (Кочевники)",
        note: "конница",
        parent: "voin_lakhra"
    },

    {
        faction: "Пустыня Лахра",
        type: "melee",
        tier: 2,
        id: "zmeinyy_voin_pm",
        name: "Змеиный воин (ПМ)",
        note: "яды",
        parent: "voin_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "melee",
        tier: 3,
        id: "strazha_zmeinogo_dvortsa",
        name: "Стража Змеиного Дворца",
        note: "мутации змеи",
        parent: "zmeinyy_voin_pm"
    },
    {
        faction: "Пустыня Лахра",
        type: "melee",
        tier: 4,
        id: "dlan_korolevy_zmey",
        name: "Длань Королевы Змей",
        parent: "strazha_zmeinogo_dvortsa"
    },

    {
        faction: "Пустыня Лахра",
        type: "tank",
        tier: 2,
        id: "ukrotitel",
        name: "Укротитель",
        note: "звери компаньоны",
        parent: "voin_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "tank",
        tier: 3,
        id: "povelitel_zverey_kp",
        name: "Повелитель зверей (КП)",
        parent: "ukrotitel"
    },
    {
        faction: "Пустыня Лахра",
        type: "tank",
        tier: 4,
        id: "korol_zverey_kp",
        name: "Король зверей (КП)",
        parent: "povelitel_zverey_kp"
    },

    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 1,
        id: "razvedchik_lakhra",
        name: "Разведчик",
        parent: null
    },
    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 2,
        id: "khashishin",
        name: "Хашишин",
        note: "стимуляторы",
        parent: "razvedchik_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 3,
        id: "khashishin_2",
        name: "Хашишин 2",
        note: "стимуляторы",
        parent: "khashishin"
    },
    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 4,
        id: "khashishin_magistr",
        name: "Магистр Хашишин",
        note: "стимуляторы",
        parent: "khashishin_2"
    },

    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 2,
        id: "otravitel_pm",
        name: "Отравитель (ПМ)",
        note: "яды",
        parent: "razvedchik_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 3,
        id: "zmeeust_pm",
        name: "Змееуст (ПМ)",
        note: "змеи компаньоны",
        parent: "otravitel_pm"
    },

    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 2,
        id: "khazid_khi_lakhra",
        name: "Хазид'хи (горлорез) (Лахра)",
        note: "бл.бой",
        parent: "razvedchik_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "assassin",
        tier: 3,
        id: "khazid_khi_lakhra_2",
        name: "Хазид'хи (горлорез) (Лахра)",
        note: "бл.бой",
        parent: "khazid_khi_lakhra"
    },

    {faction: "Пустыня Лахра", type: "mage", tier: 1, id: "mag_lakhra", name: "Маг", parent: null},
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 2,
        id: "povelitel_peskov",
        name: "Повелитель Песков",
        note: "сфера пустыни",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 2,
        id: "povelitel_mirazhey",
        name: "Повелитель Миражей",
        note: "иллюзии",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 2,
        id: "povelitel_grobnits",
        name: "Повелитель Гробниц",
        note: "некромант",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 3,
        id: "charodey_pustyni",
        name: "Чародей Пустыни",
        parent: "povelitel_peskov/povelitel_peskov/povelitel_grobnits"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 4,
        id: "arxicharodey_pustyni",
        name: "Верховный Чародей Пустыни",
        parent: "charodey_pustyni"
    },

    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 2,
        id: "iskusitel_pm",
        name: "Искуситель (ПМ)",
        note: "контроль, саппорт",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "support",
        tier: 3,
        id: "zhrets_poroka",
        name: "Жрец Порока",
        parent: "iskusitel_pm"
    },
    {
        faction: "Пустыня Лахра",
        type: "support",
        tier: 2,
        id: "master_proklyatiy_pm",
        name: "Мастер Проклятий (ПМ)",
        note: "дебафы, дот",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "support",
        tier: 3,
        id: "povelitel_neschastiy",
        name: "Повелитель Несчастий",
        parent: "master_proklyatiy_pm"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 2,
        id: "manipulyator_pm",
        name: "Манипулятор (ПМ)",
        note: "ментальные атаки",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "support",
        tier: 3,
        id: "nechestivyy_pastyr",
        name: "Нечестивый Пастырь",
        note: "бафы, ауры",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 4,
        id: "povelitel_grekha",
        name: "Повелитель Греха",
        parent: "zhrets_poroka/povelitel_neschastiy/nechestivyy_pastyr"
    },

    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 2,
        id: "syn_zloby_lakhra",
        name: "Сын Злобы (Лахра)",
        note: "маг разрушения",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 3,
        id: "skovyvayushchiy_dushi",
        name: "Сковывающий Души",
        note: "ментал, души",
        parent: "syn_zloby_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 3,
        id: "nesushchiy_pogibel",
        name: "Несущий Погибель",
        parent: "syn_zloby_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "mage",
        tier: 4,
        id: "ispivayushchiy_dushi",
        name: "Испивающий Души",
        note: "дд, доты, проклятия",
        parent: "skovyvayushchiy_dushi/nesushchiy_pogibel"
    },

    {
        faction: "Пустыня Лахра",
        type: "support",
        tier: 2,
        id: "mumifikator",
        name: "Мумификатор",
        note: "целитель/некромант",
        parent: "mag_lakhra"
    },
    {
        faction: "Пустыня Лахра",
        type: "support",
        tier: 3,
        id: "lodchnik_reki_duat",
        name: "Лодочник реки Дуат",
        parent: "mumifikator"
    },

    // ============================
    // ДРАКОНИДЫ
    // ============================

    {faction: "Дракониды", type: "tank", tier: 1, id: "voin_drakonid", name: "Воин", parent: null},
    {
        faction: "Дракониды",
        type: "tank",
        tier: 2,
        id: "drakoniy_rytsar",
        name: "Драконий Рыцарь",
        parent: "voin_drakonid"
    },
    {
        faction: "Дракониды",
        type: "tank",
        tier: 3,
        id: "rytsar_stikhii",
        name: "Рыцарь Стихии",
        parent: "drakoniy_rytsar"
    },
    {
        faction: "Дракониды",
        type: "tank",
        tier: 4,
        id: "poludrakon",
        name: "Полудракон",
        parent: "voin_drakonid"
    },

    {
        faction: "Дракониды",
        type: "tank",
        tier: 3,
        id: "paladin_drakonidy",
        name: "Паладин (дракониды)",
        note: "святая магия вместо стих",
        parent: "drakoniy_rytsar"
    },
    {
        faction: "Дракониды",
        type: "tank",
        tier: 4,
        id: "stareyshina_tsvet_paladinov",
        name: "Старейшина [цвет] паладинов",
        parent: "paladin_drakonidy"
    },

    {
        faction: "Дракониды",
        type: "tank",
        tier: 3,
        id: "drakoniy_pravitel",
        name: "Драконий Правитель",
        note: "ауры, в том числе вне боя",
        parent: "voin_drakonid"
    },
    {
        faction: "Дракониды",
        type: "tank",
        tier: 4,
        id: "namestnik_6_koroley",
        name: "Наместник 6 королей",
        parent: "drakoniy_pravitel"
    },

    {
        faction: "Дракониды",
        type: "tank",
        tier: 2,
        id: "rytsar_bezumiya_drakonov",
        name: "Рыцарь Безумия Драконов",
        note: "навыки берсерка",
        parent: "drakoniy_rytsar"
    },
    {
        faction: "Дракониды",
        type: "tank",
        tier: 3,
        id: "rytsar_bezumiya_drakonov_2",
        name: "Рыцарь Безумия Драконов 2",
        note: "навыки берсерка",
        parent: "rytsar_bezumiya_drakonov"
    },
    {
        faction: "Дракониды",
        type: "tank",
        tier: 4,
        id: "voploshchenie_gneva_drakonov",
        name: "Воплощение Гнева Драконов",
        parent: "rytsar_bezumiya_drakonov_2"
    },

    {
        faction: "Дракониды",
        type: "melee",
        tier: 2,
        id: "okhotnik_drakonidov",
        name: "Охотник драконидов",
        note: "метание, выслеживание",
        parent: "voin_drakonid"
    },

    // ============================
    // ЗВЕРОЛЮДИ
    // ============================
    {
        faction: "Зверолюди",
        type: "melee",
        tier: 1,
        id: "voin_rakshasy",
        name: "Воин (ракшасы)",
        note: "врождённые самобафы",
        parent: null
    },
    {
        faction: "Зверолюди",
        type: "melee",
        tier: 2,
        id: "voin_rakshasy_2",
        name: "Воин 2 (ракшасы)",
        note: "врождённые самобафы",
        parent: "voin_rakshasy"
    },
    {
        faction: "Зверолюди",
        type: "meleemelee",
        tier: 3,
        id: "voin_rakshasy_3",
        name: "Воин 3 (ракшасы)",
        note: "врождённые самобафы",
        parent: "voin_rakshasy_2"
    },
    {
        faction: "Зверолюди",
        type: "support",
        tier: 1,
        id: "zacharovatel_rakshasy",
        name: "Зачарователь (ракшасы)",
        note: "создание предметов",
        parent: null
    },
    {
        faction: "Зверолюди",
        type: "support",
        tier: 2,
        id: "zacharovatel_rakshasy_2",
        name: "Зачарователь 2 (ракшасы)",
        note: "создание предметов",
        parent: "zacharovatel_rakshasy"
    },
    {
        faction: "Зверолюди",
        type: "support",
        tier: 3,
        id: "zacharovatel_rakshasy_3",
        name: "Зачарователь 3 (ракшасы)",
        note: "создание предметов",
        parent: "zacharovatel_rakshasy_2"
    },
    {
        faction: "Зверолюди",
        type: "support",
        tier: 1,
        id: "soblaznitelnitsa_zver",
        name: "Соблазнительница (жен)",
        note: "саппорт",
        parent: null
    },
    {
        faction: "Зверолюди",
        type: "support",
        tier: 2,
        id: "soblaznitelnitsa_zver_2",
        name: "Соблазнительница (жен)",
        note: "саппорт",
        parent: "soblaznitelnitsa_zver"
    },
    {
        faction: "Зверолюди",
        type: "support",
        tier: 3,
        id: "soblaznitelnitsa_zver_3",
        name: "Соблазнительница (жен)",
        note: "саппорт",
        parent: "soblaznitelnitsa_zver_2"
    },
    {
        faction: "Зверолюди",
        type: "melee",
        tier: 4,
        id: "stareishina_rakshasy",
        name: "Старейшина Ракшасов",
        note: "ауры, лидерство",
        parent: "voin_rakshasy_2/zacharovatel_rakshasy_2/soblaznitelnitsa_zver_2"
    },

    // ============================
    // БЕССМЕРТНЫЕ
    // ============================
    {faction: "Бессмертные", type: "tank", tier: 2, id: "rytsar_krovi", name: "Рыцарь Крови", parent: null},
    {
        faction: "Бессмертные",
        type: "tank",
        tier: 3,
        id: "rytsar_krovavogo_drakona",
        name: "Рыцарь Кровавого Дракона",
        parent: "rytsar_krovi"
    },

    {
        faction: "Бессмертные",
        type: "support",
        tier: 2,
        id: "krovavyy_episkop",
        name: "Кровавый Епископ",
        parent: null
    },
    {
        faction: "Бессмертные",
        type: "support",
        tier: 3,
        id: "kardinal_krovavoy_luny",
        name: "Кардинал Кровавой Луны",
        parent: "krovavyy_episkop"
    },

    {
        faction: "Бессмертные",
        type: "tactical",
        tier: 4,
        id: "rytsar_krovavoy_luny",
        name: "Рыцарь Кровавой Луны",
        parent: "rytsar_krovi/krovavyy_episkop"
    },

    // ============================
    // ДЕМОНОЛОГИ
    // ============================
    {faction: "Демонологи", type: "tank", tier: 1, id: "kultist", name: "Культист", parent: null},
    {
        faction: "Демонологи",
        type: "tank",
        tier: 1,
        id: "poslushnik_demon",
        name: "Послушник",
        parent: "kultist"
    },

    // ============================
    // ДОПОЛНИТЕЛЬНО / УНИКАЛЬНО
    // ============================
    {
        faction: "Дополнительно / Уникально",
        type: "assassin",
        tier: 2,
        id: "chumnoy_doktor_lazarius",
        name: "Чумной доктор (Лазариус)",
        note: "ассасин с магией болезни",
        parent: null
    },
    {
        faction: "Дополнительно / Уникально",
        type: "assasin",
        tier: 3,
        id: "apostol_chumy_lazarius",
        name: "Апостол Чумы (Лазариус)",
        parent: "chumnoy_doktor_lazarius"
    },

    {
        faction: "Дополнительно / Уникально",
        type: "tactical",
        tier: 2,
        id: "chernyy_khramovnik_lazarius",
        name: "Чёрный храмовник (Лазариус)",
        note: "рыцарь дд через логику",
        parent: null
    },
    {
        faction: "Дополнительно / Уникально",
        type: "tactical",
        tier: 3,
        id: "chernyy_krestonosec",
        name: "Чёрный Крестоносец",
        note: "рыцарь командир",
        parent: "chernyy_khramovnik_lazarius"
    },

    {
        faction: "Дополнительно / Уникально",
        type: "mage",
        tier: 2,
        id: "tkach_zaklinaniy_lazarius",
        name: "Ткач заклинаний (Лазариус)",
        note: "заклинатель/маг потока",
        parent: null
    },
    {
        faction: "Дополнительно / Уникально",
        type: "mage",
        tier: 3,
        id: "tkach_pustoty",
        name: "Ткач Пустоты",
        note: "изменение заклинаний",
        parent: "tkach_zaklinaniy_lazarius"
    },
    {
        faction: "Дополнительно / Уникально",
        type: "mage",
        tier: 4,
        id: "tkach_zabytykh_sudeb",
        name: "Ткач Забытых Судеб",
        parent: "tkach_pustoty"
    },

    {
        faction: "Дополнительно / Уникально",
        type: "mage",
        tier: 2,
        id: "zhritsa_ledi_khaosa_alaksena",
        name: "Жрица Леди Хаоса (Алаксена)",
        note: "магия хаоса",
        parent: null
    },
    {
        faction: "Дополнительно / Уникально",
        type: "mage",
        tier: 2,
        id: "femme_fatale_alaksena",
        name: "Фем фаталь (роковая женщина) (Алаксена)",
        note: "магия хаоса, дары",
        parent: "zhritsa_ledi_khaosa_alaksena"
    },

    {
        faction: "Дополнительно / Уникально",
        type: "ranged",
        tier: 2,
        id: "maroder_flot_uzhasa",
        name: "Мародёр (Флот ужаса)",
        note: "стрелок/моряк",
        parent: null
    },
    {
        faction: "Дополнительно / Уникально",
        type: "ranged",
        tier: 3,
        id: "koshmarnyy_desantnik_flot_uzhasa",
        name: "Кошмарный десантник (Флот ужаса)",
        note: "ауры, дебаффы, ментал",
        parent: "maroder_flot_uzhasa"
    },
    {
        faction: "Дополнительно / Уникально",
        type: "mage",
        tier: 4,
        id: "korol_mertvogo_morya",
        name: "Король Мёртвого Моря",
        parent: "koshmarnyy_desantnik_flot_uzhasa"
    },
    {
        faction: "Дополнительно / Уникально",
        type: "support",
        tier: 3,
        id: "peresmeshnik_flot_uzhasa",
        name: "Пересмешник (Флот ужаса)",
        note: "антибард/антибафер",
        parent: "maroder_flot_uzhasa"
    },
    {
        faction: "Дополнительно / Уникально",
        type: "support",
        tier: 3,
        id: "vayatel_ploti_flot_uzhasa",
        name: "Ваятель Плоти (Флот ужаса)",
        note: "маг/инженер плоти",
        parent: null
    },

    {
        faction: "Дополнительно / Уникально",
        type: "mage",
        tier: 1,
        id: "chernoknizhnik",
        name: "Чернокнижник",
        parent: null
    },
    {faction: "Дополнительно / Уникально", type: "mage", tier: 1, id: "psionik", name: "Псионик", parent: null},
];