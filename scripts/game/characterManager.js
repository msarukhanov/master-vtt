const characterManager = {

    charId: null,
    char: null,
    container: null,
    skillSelect: null,
    itemSelect: null,
    partySelect: null,
    resultDisplay: null,

    open(charId) {
        const char = characterManager.getCharacterById(charId);
        if (!char) return;
        characterManager.char = char;
        characterManager.charId = charId;

        // Гарантируем наличие всех полей перед правкой
        // characterManager.initStats(char);

        characterManager.container = createEl('div', 'char-manager');
        characterManager.container.innerHTML = `<h3>${char.name}</h3>`;

        const actionBox = this.renderActions(char);
        characterManager.container.appendChild(actionBox);

        // Блок Статов
        const statsBox = createEl('div', 'editor-section', `<h4>${l10n[lang].stats}</h4>`);
        const statsGrid = createEl('div', 'editor-grid');

        Object.keys(char.stats).forEach(s => {
            statsGrid.appendChild(characterManager.makeInput(char.stats, s, 'stats',charId));
        });
        statsBox.appendChild(statsGrid);

        // Блок Навыков
        const skillsBox = createEl('div', 'editor-section', `<h4>${l10n[lang].skills}</h4>`);
        const skillsGrid = createEl('div', 'editor-grid');

        Object.keys(char.skills).forEach(s => {
            skillsGrid.appendChild(this.makeInput(char.skills, s, 'skills',charId));
        });
        skillsBox.appendChild(skillsGrid);

        characterManager.container.append(statsBox, skillsBox);

        const invBox = characterManager.renderInventory(char);
        characterManager.container.appendChild(invBox);

        const partyBox = characterManager.renderParty(char);
        characterManager.container.appendChild(partyBox);

        // Кнопка сохранения
        const saveBtn = createEl('button', 'save-btn', `<h4>${l10n[lang].save}</h4>`);
        saveBtn.dataset.data = JSON.stringify({type:'click',name:'char-save'});
        characterManager.container.appendChild(saveBtn);

        controls.createPopup('char-editor-popup', 'char-editor-popup', characterManager.container);
    },

    close() {
        characterManager.container.remove();
    },

    renderActions(char) {
        const actionBox = createEl('div', 'editor-section actions-box');
        actionBox.innerHTML = `<h4>${l10n[lang].actions}</h4>`;

        const actionControls = createEl('div', 'action-controls-row');

        // Селект со списком из конфига base.action.skills
        characterManager.skillSelect = createEl('select', 'action-select');
        Object.keys(gameData.base.action.skills).forEach(skillKey => {
            const option = createEl('option', '', l10n[lang][skillKey] || skillKey);
            option.value = skillKey;
            characterManager.skillSelect.appendChild(option);
        });

        const rollBtn = createEl('button', 'action-roll-btn', '🎲');
        rollBtn.dataset.data = JSON.stringify({type:'click',name:'char-roll'});
        characterManager.resultDisplay = createEl('div', 'action-result-display', `${l10n[lang].waiting}...`);

        actionControls.append(characterManager.skillSelect, rollBtn);
        actionBox.append(actionControls, characterManager.resultDisplay);
        return actionBox;
    },

    renderInventory(char) {
        const invBox = createEl('div', 'editor-section inventory-section');
        invBox.innerHTML = `<h4>${l10n[lang].inventory}</h4>`;

        const invList = createEl('div', 'inventory-list-editor');

// Список уже надетых вещей
        if (char.inventory && char.inventory.length > 0) {
            char.inventory.forEach(_item => {
                const item = data.items.find(c => c.id === _item.id) || { name: '???' };
                const itemRow = createEl('div', 'inv-item-row');

                // Формируем строку эффектов для наглядности (напр. "str +1, agility +2")
                const effectsStr = Object.entries(item.effects || {})
                    .map(([k, v]) => `${l10n[lang][k] || k} ${v > 0 ? '+' + v : v}`)
                    .join(', ');

                itemRow.innerHTML = `
            <div class="inv-info">
                <span class="inv-name">${item.name}</span>
                <span class="inv-effects">${effectsStr}</span>
            </div>
            <button class="inv-del-btn" data-data='{"type":"click","name":"inventory-remove-item","data":"${item.instanceId}"}'>🗑️</button>`;
                invList.appendChild(itemRow);
            });
        } else {
            invList.innerHTML = `<div class="inv-empty">${l10n[lang].empty}</div>`;
        }

        const addRow = createEl('div', 'inv-add-row');
        characterManager.itemSelect = createEl('select', 'inv-select');
        characterManager.itemSelect.innerHTML = `<option value="">${l10n[lang].save_to_inventory_select}</option>`;

        (data.items || []).forEach(proto => {
            const opt = createEl('option', '', proto.name);
            opt.value = proto.id;
            characterManager.itemSelect.appendChild(opt);
        });

        const addBtn = createEl('button', 'inv-add-btn', 'OK');
        addBtn.dataset.data = JSON.stringify({type:'click',name:'char-add-item'});

        addRow.append(characterManager.itemSelect, addBtn);
        invBox.append(invList, addRow);
        //
        // invBox.append(invList, addInvBtn);
        return invBox;

    },

    renderParty(char) {
        const partyBox = createEl('div', 'editor-section inventory-section');
        partyBox.innerHTML = `<h4>${l10n[lang].party}</h4>`;

        const partyList = createEl('div', 'inventory-list-editor');

        if (char.party && char.party.length > 0) {
            char.party.forEach(mId => {
                // const member = data.characters.find(c => c.id === mId) || { name: '???' };
                const m = characterManager.getCharacterById(mId);
                const row = createEl('div', 'inv-item-row');
                row.innerHTML = `
                    <div class="inv-info">
                        <span class="inv-name">👤 ${m.name}</span>
                    </div>
                    <button class="inv-del-btn"  data-data='{"type":"click","name":"char-leave-party","data":"${m.id}"}'>✖</button>
                `;
                partyList.appendChild(row);
            });
        } else {
            partyList.innerHTML = `<div class="inv-empty">${l10n[lang].lone}</div>`;
        }

        const addMemberRow = createEl('div', 'inv-add-row');
        characterManager.partySelect = createEl('select', 'inv-select');
        characterManager.partySelect.innerHTML = `<option value="">${l10n[lang].save_to_party_select}</option>`;

        (currentSeason.characters.filter(c=>!c.isLord&&!c.partyLeader)).forEach(other => {
            // const other = characterManager.getCharacterById(c);
            if (other.id && (other.id !== char.id)) {
                characterManager.partySelect.appendChild(new Option(other.name, other.id));
            }
        });

        const addMBtn = createEl('button', 'inv-add-btn', 'OK');
        addMBtn.dataset.data = JSON.stringify({type:'click',name:'char-add-party',data:char.id});

        addMemberRow.append(characterManager.partySelect, addMBtn);
        partyBox.append(partyList, addMemberRow);
        return partyBox;
    },

    initStats(char) {
        if (!char.stats) char.stats = {};
        if (!char.skills) char.skills = {};

        // Заполняем статы (минимум 1)
        Object.keys(gameData.base.char.stats).forEach(stat => {
            if (char.stats[stat] === undefined) {
                char.stats[stat] = 1;
            }
        });

        // Заполняем навыки (минимум 0)
        Object.keys(gameData.base.char.skills).forEach(skill => {
            if (char.skills[skill] === undefined) {
                char.skills[skill] = 0;
            }
        });

        char.hpMax = char.hpMax || 10;
        char.mpMax = char.mpMax || 10;
        char.wpMax = char.wpMax || 0;

        char.currentWalkRange = char.walkRadius || 3;
        char.hp = char.hpMax || 10;
        char.mp = char.mpMax || 10;
        char.wp = char.wpMax || 0;

        return char;
    },

    makeInput(obj, key, type, charId) {
        const label = l10n[lang][key] || key;

        const wrap = createEl('div', 'input-wrap');
        wrap.innerHTML = `<label>${label}</label>`;

        const input = createEl('input', type === 'stats' ? 'num-stat' : 'num-skill');
        input.type = 'number';
        input.value = obj[key];
        input.dataset.data = JSON.stringify({type:'input',name:'char-stat', data:{type,key,charId}});

        wrap.appendChild(input);
        return wrap;
    },

    getBonus(char, skillKey) {
        return (abilityManager.getBonus(char, skillKey) + inventoryManager.getBonus(char, skillKey));
    },

    roll() {
        const skillKey = characterManager.skillSelect.value;
        const rollData = characterManager.calculateSkillRoll(skillKey);

        const roll = dices.rollDiceLogic({
            num: rollData.pool,
            dif: rollData.difficulty,
            ifCrit: true,
            crit: 10,
            ifFail: true,
            fail: 1
        });

        characterManager.resultDisplay.innerHTML = `<b>${l10n[lang].successes}: ${roll.successes}</b> <small>(${rollData.pool}к, сл. ${rollData.difficulty})</small>`;
    },

    calculateSkillRoll(skillKey) {
        const char = characterManager.getCharacterById(characterManager.charId);

        const formula = gameData.base.action.skills[skillKey];
        // const skillValue = (characterManager.char.skills[skillKey] || 0) + inventoryManager.getBonus(characterManager.char, skillKey);

        // const statusSkillBonus = this.getStatusBonus(char, skillKey);
        const skillValue = (char.skills[skillKey] || 0) + this.getBonus(char, skillKey);

        const expression = formula.replace(/[a-z_]+/g, (match) => {
            const baseStat = char.stats[match] || 0;
            const bonus = this.getBonus(char, match);
            return baseStat + bonus; // Складываем стат и бонус от вещей
        });

        const pool = Math.max(1, Math.floor(eval(expression)));
        const difficulty = Math.max(2, 10 - skillValue);

        return { pool, difficulty };
    },

    getCharacterById(charId) {
        return currentSeason.characters.find(c=>c.id===charId);
    },

    prepareCharacters() {
        Object.values(currentSeason.characters).forEach(c=>{
            if(c.hex && globalMap.gridData[c.hex] && globalMap.gridData[c.hex].content) {
                globalMap.gridData[c.hex].content.unit = c.id;
            }
        })
    },

    prepareCharacter(c) {
        const char = {
            id:c.id,
            name: c.name,
            factions: c.factions,
            alignment: c.alignment,
            talents: c.talents,
            gender: c.gender,
            age: c.age,
            rank: c.rank,
            isLord: c.isLord,
            quests: c.quests,

            attack: [2, 7, false],
            attackType: 'p',
            def: [2, 1, false],
            pres: 1,
            mres: 1,
            initiative: 1,
            visionRadius: 3,
            walkRadius: 3,
            attackRadius: 1,
            inventory: [],
            party: [],
            abilities: ["fireball","stun_strike"],
            statuses: [],
            cooldowns: {},
            q: null,
            r: null,
        };
        if(c.rank === 'epic' || c.rank === 'legendary') {
            char.isLord = true;
            char.party = [];
            char.units = [];
        }
        if(!c.stats) {
            characterManager.initStats(char);
        }
        return char;
    },

    modifyPosition(charId, {q,r,x,y}) {
        const character = characterManager.getCharacterById(charId);
        if(tacticalMap.ctx)  {
            const hex = `${q}_${r}`;
            character.x = x;
            character.y = y;
            character.q = q;
            character.r = r;
            character.hex = hex;
            character.localPosition = {x, y, q, r, hex};
            character.innerMap = tacticalMap.mapId;
            character.worldHex = mapManager.findHexByInnerMap(tacticalMap.mapId);
        }
        else {
            const hex = `${q}_${r}`;
            character.x = x;
            character.y = y;
            character.q = q;
            character.r = r;
            character.hex = hex;
            character.worldHex = hex;
            character.worldPosition = {x, y, q, r, hex};
        }
    },

    getRelation(subjId, objId) {
        const subj = characterManager.getCharacterById(subjId);
        const obj = characterManager.getCharacterById(objId);
        if (!subj || !obj) return;

        return subj.relationships[objId] || 0;
    },

    modifyRelation(subjId, objId, baseValue) {
        const subj = characterManager.getCharacterById(subjId);
        const obj = characterManager.getCharacterById(objId);
        if (!subj || !obj) return;

        // Коэффициент Внушаемости (насколько Subj поддается влиянию)
        // и Коэффициент Влияния (насколько Obj убедителен)
        const influence = 1 + ((obj.stats.charisma||0) / 10);
        const sensitivity = 1 - ((subj.skills.leadership||0) / 10); // Лидеры менее внушаемы

        const finalChange = Math.round(baseValue * influence * sensitivity);

        if (!subj.relationships) subj.relationships = {};
        subj.relationships[objId] = (subj.relationships[objId] || 0) + finalChange;

        // Лимиты [-100, 100]
        subj.relationships[objId] = Math.max(-100, Math.min(100, subj.relationships[objId]));

        main.saveCurrentSeason();
    },

    modifyRomances(subjId, objId, value) {
        const subj = characterManager.getCharacterById(subjId);
        const obj = characterManager.getCharacterById(objId);
        if (!subj || !obj) return;
        if(value) {
            if (!obj.romances) obj.romances = {};
            obj.romances[subjId] = true;
            if (!subj.romances) subj.romances = {};
            subj.romances[objId] = true;
        }
        else {
            delete obj.romances[subjId];
            delete subj.romances[objId];
        }

        main.saveCurrentSeason();
    },

    masterSocialPanel(charId, targetCharId) {
        const char = characterManager.getCharacterById(charId);
        const target = characterManager.getCharacterById(targetCharId);

        const container = createEl('div', 'master-social-editor');
        const obj1 = {char:charId,target:targetCharId,value:5};
        const obj2 = {char:charId,target:targetCharId,value:-5};
        container.innerHTML = `
            <h3>👥 Отношения: ${char.name}</h3>
            <button class="use-item-btn" data-data='{"type":"click","name":"char-modify-relations","data":${JSON.stringify(obj1)}}'>+5</button>
            <button class="use-item-btn" data-data='{"type":"click","name":"char-modify-relations","data":${JSON.stringify(obj2)}}'>-5</button>
        `;
        // <p>К игроку: <input type="number" value="${char.relationships[target.id] || 0}" class="rel-input"> / 100</p>
        // Вызов твоего стандартного попапа
        controls.createPopup('social-pop', 'Social Editor', container);
    }
};
