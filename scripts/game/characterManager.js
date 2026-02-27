const charManager = {

    open(charId) {
        const char = data.characters.find(c => c.id === charId);
        const charMap = map.mapCharacters.find(c => c.id === charId);
        if (!char) return;

        // Гарантируем наличие всех полей перед правкой
        charManager.initStats(char);

        const container = createEl('div', 'char-manager');
        container.innerHTML = `<h3>${char.name}</h3>`;

        const actionBox = this.renderActions(char);
        container.appendChild(actionBox);

        // Блок Статов
        const statsBox = createEl('div', 'editor-section', `<h4>${l10n[lang].stats}</h4>`);
        const statsGrid = createEl('div', 'editor-grid');

        Object.keys(char).forEach(s => {
            statsGrid.appendChild(this.makeInput(char.stats, s, 'stat'));
        });
        statsBox.appendChild(statsGrid);

        // Блок Навыков
        const skillsBox = createEl('div', 'editor-section', `<h4>${l10n[lang].skills}</h4>`);
        const skillsGrid = createEl('div', 'editor-grid');

        Object.keys(char.skills).forEach(s => {
            skillsGrid.appendChild(this.makeInput(char.skills, s, 'skill'));
        });
        skillsBox.appendChild(skillsGrid);

        container.append(statsBox, skillsBox);

        const invBox = this.renderInventory(charMap);
        container.appendChild(invBox);

        const partyBox = this.renderParty(charMap);
        container.appendChild(partyBox);

        // Кнопка сохранения
        const saveBtn = createEl('button', 'save-btn', `<h4>${l10n[lang].save}</h4>`);
        saveBtn.onclick = () => {
            // Твоя логика сохранения (например, Bridge.save или dbManager)
            // controls.closePopup('char-editor-popup');
            controls.createPopup('char-editor-popup', 'char-editor-popup', container);
        };
        container.appendChild(saveBtn);

        controls.createPopup('char-editor-popup', 'char-editor-popup', container);
    },

    renderActions(char) {
        const actionBox = createEl('div', 'editor-section actions-box');
        actionBox.innerHTML = `<h4>${l10n[lang].actions}</h4>`;

        const actionControls = createEl('div', 'action-controls-row');

        // Селект со списком из конфига base.action.skills
        const select = createEl('select', 'action-select');
        Object.keys(gameData.base.action.skills).forEach(skillKey => {
            const option = createEl('option', '', l10n[lang][skillKey] || skillKey);
            option.value = skillKey;
            select.appendChild(option);
        });

        const rollBtn = createEl('button', 'action-roll-btn', '🎲');
        const resultDisplay = createEl('div', 'action-result-display', `${l10n[lang].waiting}...`);

        rollBtn.onclick = () => {
            const skillKey = select.value;
            const rollData = this.calculateSkillRoll(char, skillKey);

            // Используем твой движок броска
            const roll = dices.rollDiceLogic({
                num: rollData.pool,
                dif: rollData.difficulty,
                ifCrit: true,
                crit: 10,
                ifFail: true,
                fail: 1
            });
            console.log(rollData, roll);

            resultDisplay.innerHTML = `<b>${l10n[lang].successes}: ${roll.successes}</b> <small>(${rollData.pool}к, сл. ${rollData.difficulty})</small>`;
        };

        actionControls.append(select, rollBtn);
        actionBox.append(actionControls, resultDisplay);
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
            <button class="inv-del-btn" onclick="inventoryManager.removeItem(char, '${item.instanceId}'); charManager.open('${char.id}')">🗑️</button>`;
                invList.appendChild(itemRow);
            });
        } else {
            invList.innerHTML = `<div class="inv-empty">${l10n[lang].empty}</div>`;
        }

        const addRow = createEl('div', 'inv-add-row');
        const itemSelect = createEl('select', 'inv-select');
        itemSelect.innerHTML = `<option value="">${l10n[lang].save_to_inventory_select}</option>`;

        data.items.forEach(proto => {
            const opt = createEl('option', '', proto.name);
            opt.value = proto.id;
            itemSelect.appendChild(opt);
        });

        const addBtn = createEl('button', 'inv-add-btn', 'OK');
        addBtn.onclick = () => {
            if (itemSelect.value) {
                inventoryManager.addItem(char, itemSelect.value);
                charManager.open(char.id); // Мгновенный ререндер окна
            }
        };

        addRow.append(itemSelect, addBtn);
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
            char.party.forEach(m => {
                // const member = data.characters.find(c => c.id === mId) || { name: '???' };
                const row = createEl('div', 'inv-item-row');
                row.innerHTML = `
            <div class="inv-info">
                <span class="inv-name">👤 ${m.name}</span>
            </div>
            <button class="inv-del-btn" onclick="partyManager.leaveParty('${char.id}', '${m.id}'); charManager.open('${char.id}')">✖</button>
        `;
                partyList.appendChild(row);
            });
        } else {
            partyList.innerHTML = `<div class="inv-empty">${l10n[lang].lone}</div>`;
        }

        const addMemberRow = createEl('div', 'inv-add-row');
        const charSelect = createEl('select', 'inv-select');
        charSelect.innerHTML = `<option value="">${l10n[lang].save_to_party_select}</option>`;

        data.characters.forEach(other => {
            if (other.id !== char.id) {
                charSelect.appendChild(new Option(other.name, other.id));
            }
        });

        const addMBtn = createEl('button', 'inv-add-btn', 'OK');
        addMBtn.onclick = () => {
            if (charSelect.value) {
                partyManager.joinParty(char.id, charSelect.value);
                charManager.open(char.id);
            }
        };

        addMemberRow.append(charSelect, addMBtn);
        partyBox.append(partyList, addMemberRow);
        return partyBox;
    },

    // Наполняем персонажа дефолтными значениями
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

        return char;
    },

    // Вспомогательный метод для создания инпута
    makeInput(obj, key, type) {
        const label = l10n[lang][key] || key;

        const wrap = createEl('div', 'input-wrap');
        wrap.innerHTML = `<label>${label}</label>`;

        const input = createEl('input', type === 'stat' ? 'num-stat' : 'num-skill');
        input.type = 'number';
        input.value = obj[key];
        input.onchange = (e) => {
            obj[key] = parseInt(e.target.value) || 0;
        };

        wrap.appendChild(input);
        return wrap;
    },

    getBonus(char, skillKey) {
        return (abilities.getBonus(char, skillKey) + inventoryManager.getBonus(char, skillKey));
    },

    calculateSkillRoll(char, skillKey) {
        const formula = gameData.base.action.skills[skillKey];
        // const skillValue = (char.skills[skillKey] || 0) + inventoryManager.getBonus(char, skillKey);

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
    }
};

const inventoryManager = {
    // Добавить предмет персонажу
    addItem(char, itemId) {
        const proto = data.items.find(i => i.id === itemId);
        if (!proto) return;

        if (!char.inventory) char.inventory = [];

        // Клонируем предмет, добавляя уникальный ID инстанса (для удаления)
        const newItem = JSON.parse(JSON.stringify(proto));
        newItem.instanceId = Date.now() + Math.random().toString(36).substr(2, 5);

        char.inventory.push({id:itemId, instanceId:newItem.instanceId});
        // currentSeason.isDirty = true; // Помечаем для сохранения
    },

    // Удалить конкретный экземпляр предмета
    removeItem(char, instanceId) {
        char.inventory = char.inventory.filter(i => i.instanceId !== instanceId);
        // currentSeason.isDirty = true;
    },

    // Геттер для получения бонуса к конкретному стату/навыку
    getBonus(char, key) {
        if (!char.inventory) return 0;
        const inventory = char.inventory.map(i=>data.items.find(j=>j.id===i.id));
        return inventory.reduce((sum, item) => {
            return sum + (item.effects?.[key] || 0);
        }, 0);
    }
};

const partyManager = {
    // Присоединить персонажа к лидеру
    joinParty(leaderId, memberId) {
        const leader = map.mapCharacters.find(c => c.id === leaderId);

        const _member = data.characters.find(c => c.id === memberId);
        let member = map.mapCharacters.find(c => c.id === memberId) || {
            id: _member.id,
            name: _member.name,
            x:-1, y:-1
        };

        if (!leader || !member) return;

        if (!leader.party) leader.party = [];

        if (leaderId !== memberId && !leader.party.includes(memberId)) {
            leader.party.push(member);

            map.mapCharacters = map.mapCharacters.filter(c => c.id !== memberId);

            const el = document.getElementById('char-' + memberId);
            if (el) el.remove();
        }
    },

    // Распустить группу или выгнать участника
    leaveParty(leaderId, memberId) {
        const leader = map.mapCharacters.find(c => c.id === leaderId);
        if (leader && leader.party) {
            leader.party = leader.party.filter(m => m.id !== memberId);
        }
    },

    render(leader) {
        // Удаляем старый виджет, если был
        const old = document.getElementById('party-sidebar');
        if (old) old.remove();

        if (!leader || !leader.party || leader.party.length === 0) return;

        const sidebar = createEl('div', 'party-sidebar', 0, leader.id, 'party-sidebar');

        // Добавляем самого лидера первым (опционально)
        this.addCharToSidebar(sidebar, leader, true);

        // Добавляем членов группы
        leader.party.forEach(m => {
            this.addCharToSidebar(sidebar, m, false);
        });

        elementById("main-wrapper").append(sidebar);
    },

    addCharToSidebar(parent, char, isLeader) {
        const charBox = map.renderCharacter(char, true);
        if(isLeader) charBox.classList.add('leader');

        parent.appendChild(charBox);
    }
};
