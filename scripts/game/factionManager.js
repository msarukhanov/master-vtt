const factionManager = {

    init() {
        if(!data.factions || !data.factions.length) return;

        if(!currentSeason.factions) {
            const factions = JSON.parse(JSON.stringify(data.factions));
            factions.forEach(f=>{
                if(!f.religion) {

                }
                if(!f.resources) {
                    f.resources = { "gold": 500, "wood": 100, "ore": 50, "food": 200 }
                }
                if(f.parent) {
                    f.loyalty = 100;
                    f.isRebel = false;
                }
                f.units = factionManager.getUnits(f.id);
                f.buildings = factionManager.getBuildings(f.id);
            });

            currentSeason.factions = factions;
        }
    },

    getFaction(factionId) {
        return (currentSeason.factions || data.factions).find(f => f.id === factionId)
    },

    getFullHierarchy(factionId) {
        let current = this.getFaction(factionId);
        let tree = [factionId];
        while (current && current.parent) {
            tree.push(current.parent);
            current = this.getFaction(current.parent);
        }
        return tree;
    },

    getRelations(factionId) {
        const relations = {};
        Object.entries(currentSeason.diplomacy).forEach(([key, rel]) => {
            if(key.includes(factionId)) {
                const faction = key.replace(factionId,'').replace('_','');
                relations[faction] = rel;
            }
        });
        return relations;
    },

    getReligion(factionId) {
        let faction = this.getFaction(factionId);
        let religion = faction.religion;

        if (!religion) {
            religion = this.getReligion(faction.parent);
        }
        return religion;
    },

    getUnits(factionId, rec = false) {
        let faction = this.getFaction(factionId);
        let units = [...(faction.units || [])];

        if (faction.parent) {
            units = units.concat(this.getUnits(faction.parent, true));
        }
        if(faction.uniqueUnits && !rec) {
            units = units.concat(faction.uniqueUnits);
        }
        return units;
    },

    getBuildings(factionId, rec = false) {
        let faction = this.getFaction(factionId);
        let units = [...(faction.buildings || [])];

        if (faction.parent) {
            units = units.concat(this.getBuildings(faction.parent, true));
        }
        if(faction.uniqueBuildings && !rec) {
            units = units.concat(faction.uniqueBuildings);
        }
        return units;
    },

    moveCellAllowed(unitFactionId, cellFactionId) {
        // 1. Если фракции совпадают — проход разрешен всегда
        if (unitFactionId === cellFactionId) return true;

        // 2. Получаем "генеалогическое древо" обеих фракций
        const unitTree = this.getFullHierarchy(unitFactionId);
        const cellTree = this.getFullHierarchy(cellFactionId);
        const hasCommonParent = unitTree.some(id => cellTree.includes(id));
        const relation = diplomacyManager.getRelation(unitFactionId, cellFactionId);
        if (hasCommonParent && this.isLoyal(unitFactionId) && this.isLoyal(cellFactionId)) return true;
        if (relation <= -100) return false;
        if (relation >= 0) return true;

        return false;
    },

    isLoyal(factionId) {
        const faction = this.getFaction(factionId);
        return faction && faction.parent && !faction.isRebel;
    },

    // Механика восстания
    triggerRevolt(factionId) {
        const faction = this.getFaction(factionId);
        if (!faction || !faction.parent) return;

        faction.isRebel = true;
        faction.loyalty = 0;

        const parentId = faction.parent;

        // 1. Объявляем войну Сюзерену
        diplomacyManager.setRelation(factionId, parentId, -100);

        // 2. Все остальные ЛОЯЛЬНЫЕ вассалы этого сюзерена тоже объявляют войну предателю
        currentSeason.factions.forEach(f => {
            if (f.parent === parentId && f.id !== factionId && !f.isRebel) {
                diplomacyManager.setRelation(factionId, f.id, -100);
                console.log(`⚔️ ${f.name} выступает против мятежников из ${faction.name}!`);
            }
        });
    }
};