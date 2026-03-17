const partyManager = {

    joinParty(leaderId, memberId) {
        const leader = characterManager.getCharacterById(leaderId);
        const member = characterManager.getCharacterById(memberId);

        if (!leader || !member) return;
        if (!leader.party) leader.party = [];
        if (leaderId !== memberId && !leader.party.includes(memberId)) {
            leader.party.push(memberId);
            member.partyLeader = leaderId;
            let cellHeroes = globalMap.gridData[leader.hex].content.heroes;
            if(cellHeroes) {
                cellHeroes = cellHeroes.filter(m => m !== memberId);
            }
            characterManager.modifyPosition(member.id, {q:null,r:null});
            // member.hex = null;
            // member.q = null;
            // member.r = null;
        }
        if(elementById('player-hud')) {
            playerHUD.renderDock(leader)
        }
    },

    leaveParty(memberId, leaderId = null) {
        const lid = leaderId || characterManager.char.id;
        const leader = characterManager.getCharacterById(lid);
        const member = characterManager.getCharacterById(memberId);

        if (leader && leader.party) {
            if(!globalMap.gridData[leader.hex].content.heroes) globalMap.gridData[leader.hex].content.heroes = [];
            globalMap.gridData[leader.hex].content.heroes.push(memberId);
            characterManager.modifyPosition(member.id, {q:leader.q,r:leader.q});
            // member.hex = String(leader.hex);
            // member.q = Number(leader.q);
            // member.r = Number(leader.r);
            delete member.partyLeader;
            leader.party = leader.party.filter(m => m !== memberId);
        }
        if(elementById('player-hud')) {
            playerHUD.renderDock(leader)
        }
    },

    checkPartyIntegrity(leaderId) {
        const leader = characterManager.getCharacterById(leaderId);
        if (!leader.party) return;

        leader.party.forEach(memberId => {
            const member = characterManager.getCharacterById(memberId);
            const relToLeader = member.relationships?.[leaderId] || 0;

            // Формула: Отношение + (Лидерство * 4)
            // Если результат ниже -70 — персонаж ставит ультиматум или уходит
            const loyaltyThreshold = relToLeader + (leader.stats.leadership * 4);

            if (loyaltyThreshold < -70) {
                // this.handleDesertion(memberId, leaderId);
                this.leaveParty(memberId, leaderId);
            }
        });
    }
};