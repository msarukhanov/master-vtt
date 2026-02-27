gameData.storiesOfTheEnd.abilities = [
    {
        id: "fireball",
        name: "Огненный шар",
        manacost: 2,
        cooldown: 2,
        range: 2,
        aoe: "square", //conus, circle, none
        aoeRange: 1, // null
        effect: { type: "damage", formula: "(intellect + focus) / 2", element: "fire" },
        hasProjectile: true,
        description: "Горящий шар..."
    },
    {
        id: "stun_strike",
        name: "Оглушающий удар",
        manacost: 2,
        cooldown: 2,
        range: 2,
        aoe: "square", //conus, circle, none
        aoeRange: 0, // null
        status: { id: "stun", duration: 1, type: "skipTurn", name: "Оглушение", icon: "🌀" },
        description: "Оглушающий удар..."
    },
    {
        id: "bless",
        name: "Благословение",
        manacost: 2,
        cooldown: 2,
        range: 2,
        aoe: "square", //conus, circle, none
        aoeRange: 0, // null
        status: {id: "bless_status", duration: 3, name: "Святость", icon: "☀️", effects: { strength: 2, attack: 1, luck: 5 }},
        description: "Благословение свыше..."
    }
];
