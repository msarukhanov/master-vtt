const playerHUD = {
    activeChar: null,
    currentTab: 'stats', // 'stats', 'inv', 'spells'
    contentTab: null,

    init(unit) {
        const mainWrapper = elementById("main-wrapper");
        // Создаем основной контейнер интерфейса
        const hud = createEl('div', 'player-hud-container', '', null, 'player-hud');
        mainWrapper.appendChild(hud);
        this.renderDock(unit);
    },

    destroy() {
        elementById("player-hud").remove();
    },

    close() {
        elementById('hero-sheet').remove();
    },

    // Рисуем круги в углу (Dock)
    renderDock(leader) {
        const hud = elementById('player-hud');
        let dock = elementById('hud-dock');
        if (!dock) {
            dock = createEl('div', 'hud-dock', '', null, 'hud-dock');
            hud.appendChild(dock);
        }
        dock.innerHTML = '';

        // Главный герой
        const mainOrb = this.createOrb(leader, true);
        mainOrb.onclick = () => this.toggleHeroSheet(leader);

        // Пати
        const partyLine = createEl('div', 'party-line');
        (leader.party || []).forEach(m => {
            const sub = this.createOrb(m, false);
            sub.onclick = () => this.toggleHeroSheet(m);
            partyLine.append(sub);
        });

        dock.append(mainOrb, partyLine);
    },

    createOrb(char, isBig) {
        const orb = createEl('div', `hud-orb ${isBig ? 'big' : 'small'}`);
        const img = avatars[char.id] ? `<img src="${avatars[char.id]}">` : `<span>${char.symbol || '👤'}</span>`;
        orb.innerHTML = `
            <div class="orb-avatar">${img}</div>
            <div class="orb-hp-mini"><div style="width:${char.hpCurrent / char.hp * 100}%"></div></div>
        `;
        return orb;
    },

    // Всплывающее меню с Табами
    toggleHeroSheet(char) {
        this.activeChar = char;
        let sheet = elementById('hero-sheet');
        if (sheet) {
            sheet.remove();
        }
        if(!char) return;

        sheet = createEl('div', 'hero-sheet', '', null, 'hero-sheet');

        const closeBtn = createEl('button', 'close-hud-btn', '✖', '', 'close-hud-btn');
        closeBtn.onclick = () => this.close();
        sheet.appendChild(closeBtn);

        // 1. Верхний ряд переключения (Party в меню)
        const header = createEl('div', 'sheet-header');
        header.innerHTML = `<h4>${char.name} (x${char.num})</h4>`;

        this.contentTab = createEl('div', 'sheet-content');

        // 2. ТАБЫ
        const tabs = createEl('div', 'sheet-tabs');
        ['stats', 'inventory', 'abilities'].forEach(t => {
            const btn = createEl('button', `tab-btn ${this.currentTab === t ? 'active' : ''}`, l10n[lang][t] || t);
            btn.onclick = () => {
                this.currentTab = t;
                playerHUD.contentTab.innerHTML = '';
                playerHUD.switchTab();
            };
            tabs.append(btn);
        });

        // 3. КОНТЕНТ (подтягиваем из твоих менеджеров)
        playerHUD.switchTab();

        sheet.append(header, tabs, playerHUD.contentTab);
        elementById('player-hud').appendChild(sheet);
    },

    switchTab() {
        if (this.currentTab === 'stats') playerHUD.contentTab.append(this.renderStats(this.activeChar));
        if (this.currentTab === 'inventory') playerHUD.contentTab.append(this.renderInventory(this.activeChar));
        if (this.currentTab === 'abilities') playerHUD.contentTab.append(this.renderAbilities(this.activeChar));
    },

    renderStats(char) {
        const grid = createEl('div', 'stats-display-grid');

        const colImg = createEl('div', 'stats-display-grid-col');
        const img = avatars[char.id] ? `<img src="${avatars[char.id]}">` : `<span>${char.symbol || '👤'}</span>`;
        colImg.innerHTML = img;

        const colStats = createEl('div', 'stats-display-grid-col col-stats');
        // Берем только статы из charManager, но без инпутов
        colStats.innerHTML += `<div class="stat-row">
            <b>❤️ HP:</b> 
            <span>${char.hpCurrent} / ${char.hp}</span> 
            ${charManager.getBonus(char,'hp') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'hp')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>❤️ MP:</b> 
            <span>${char.mpCurrent} / ${char.mp}</span> 
            ${charManager.getBonus(char,'mp') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'mp')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>⚔️ Atk:</b> 
            <span>${char.attack[0]}-${char.attack[1]}</span> 
            ${charManager.getBonus(char,'attack') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'attack')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>⚔️ Atk Type:</b> 
            <span>${char.attackType}</span> 
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>⚔️ Atk Rad:</b> 
            <span>${char.attackRadius}</span> 
            ${charManager.getBonus(char,'attackRadius') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'attackRadius')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>🛡️ Def:</b> 
            <span>${char.def[0]}-${char.def[1]}</span> 
            ${charManager.getBonus(char,'def') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'def')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>Mres:</b> 
            <span>${char.mres}</span> 
            ${charManager.getBonus(char,'mres') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'mres')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>Vision:</b> 
            <span>${char.visionRadius}</span> 
            ${charManager.getBonus(char,'visionRadius') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'visionRadius')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>Walk:</b> 
            <span>${char.currentWalkRange} / ${char.walkRadius}</span> 
            ${charManager.getBonus(char,'walkRadius') > 0 ? `<span class="stat-bonus-pos">(+${charManager.getBonus(char,'walkRadius')})</span>` : ''}
        </div>`;

        // grid.innerHTML += `<div class="stat-row"><b>${k}:</b> <span>${v}</span></div>`;
        //
        // Object.entries(char || {}).forEach(([k, v]) => {
        //     grid.innerHTML += `<div class="stat-row"><b>${k}:</b> <span>${v}</span></div>`;
        // });
        grid.append(colImg, colStats);
        return grid;
    },

    renderInventory(char) {
        const invGrid = createEl('div', 'inventory-grid');
        const inv = char.inventory || [];

        if (inv.length === 0) {
            invGrid.innerHTML = `<div class="empty-msg">${l10n[lang].empty || 'Пусто'}</div>`;
            return invGrid;
        }

        inv.forEach(itemInfo => {
            const proto = data.items.find(i => i.id === itemInfo.id);
            const slot = createEl('div', 'inventory-slot');
            // Если у предмета будет иконка в будущем — добавим img, пока символ/имя
            slot.innerHTML = `<span class="item-icon">${proto.icon || '📦'}</span>`;

            // Показываем бафф при наведении/клике
            slot.onclick = () => {
                const effects = Object.entries(proto.effects || {})
                    .map(([k, v]) => `${k}: ${v > 0 ? '+' : ''}${v}`).join('\n');
                alert(`${proto.name}\n${effects}`);
            };
            invGrid.append(slot);
        });

        return invGrid;
    },

    renderInventory(char) {
        const invContainer = createEl('div', 'inventory-main-container');

        // 1. Сетка слотов
        const invGrid = createEl('div', 'inventory-grid');
        const items = char.inventory || [];

        // Создаем фиксированное кол-во слотов (например, 20), чтобы сетка не «прыгала»
        for (let i = 0; i < 20; i++) {
            const slot = createEl('div', 'inventory-slot');
            const itemInfo = items[i];

            if (itemInfo) {
                const proto = data.items.find(it => it.id === itemInfo.id);
                slot.innerHTML = `<span class="item-icon">${proto.icon || '📦'}</span>`;
                if (itemInfo.count > 1) slot.innerHTML += `<span class="item-count">${itemInfo.count}</span>`;

                slot.onclick = () => this.showItemDetails(proto, itemInfo, char);
            } else {
                slot.classList.add('empty');
            }
            invGrid.append(slot);
        }

        // 2. Панель деталей (внизу сетки)
        const details = createEl('div', 'item-details-panel', 'Выберите предмет', null, 'item-details');

        invContainer.append(invGrid, details);
        return invContainer;
    },

    showItemDetails(proto, instance, char) {
        const panel = elementById('item-details');
        const effects = Object.entries(proto.effects || {})
            .map(([k, v]) => `<div class="eff">${k}: <b>${v > 0 ? '+' : ''}${v}</b></div>`).join('');

        panel.innerHTML = `
        <div class="details-header">
            <b>${proto.name}</b>
            <small>${proto.type || 'Вещь'}</small>
        </div>
        <div class="details-body">${effects || 'Нет эффектов'}</div>
        <button class="use-item-btn" onclick="inventoryManager.use('${instance.instanceId}', '${char.id}')">
            ${proto.type === 'equippable' ? 'Надеть' : 'Использовать'}
        </button>
    `;
    },


    renderAbilities(char) {
        const skillsGrid = createEl('div', 'abilities-grid');
        const skills = char.abilities || [];

        if (skills.length === 0) {
            skillsGrid.innerHTML = `<div class="empty-msg">${l10n[lang].no_skills || 'Нет умений'}</div>`;
            return skillsGrid;
        }

        skills.forEach(abId => {
            const ab = data.abilities.find(a => a.id === abId);
            if (!ab) return;

            const currentCD = char.cooldowns?.[abId] || 0;
            const hasMana = char.mpCurrent >= (ab.manacost || 0);
            const isAvailable = currentCD === 0 && hasMana;

            const btn = createEl('button', `skill-card ${!isAvailable ? 'disabled' : ''}`);
            btn.innerHTML = `
            <div class="skill-icon">${ab.icon || '🔥'}</div>
            <div class="skill-info">
                <span class="skill-name">${ab.name}</span>
                <span class="skill-cost">💧 ${ab.manacost || 0}</span>
            </div>
            ${currentCD > 0 ? `<div class="skill-cd">${currentCD}⏳</div>` : ''}
        `;

            if (isAvailable && tacticalMap.viewMode === 'play') {
                btn.onclick = () => {
                    tacticalMap.selectedAbility = ab;
                    tacticalMap.abilityTarget = null;
                    tacticalMap.update();
                    // Закрываем меню после выбора, чтобы видеть поле
                    this.renderAbilitiesConfirm();
                    elementById('hero-sheet').remove();
                };
            }
            skillsGrid.append(btn);
        });

        return skillsGrid;
    },

    renderAbilitiesConfirm() {
        const confirmBox = createEl('div', 'confirm-action-box',0,'','confirm-action-box');

        const confirmBtn = createEl('button', 'btn-confirm-cast', `${l10n[lang].confirm || 'OK'}`);
        confirmBtn.onclick = () => {
            if (tacticalMap.selectedAbility && tacticalMap.abilityTarget) {
                tacticalMap.executeAbility(
                    tacticalMap.activeUnit,
                    tacticalMap.abilityTarget.q,
                    tacticalMap.abilityTarget.r,
                    tacticalMap.selectedAbility
                );
                tacticalMap.selectedAbility = null;
                tacticalMap.abilityTarget = null;
            }
        };
        const cancelBtn = createEl('button', 'btn-cancel-cast', `✖`);
        cancelBtn.onclick = () => {
            tacticalMap.selectedAbility = null;
            tacticalMap.abilityTarget = null;
            elementById("confirm-action-box").remove();
            tacticalMap.update();
        };
        confirmBox.append(confirmBtn,cancelBtn);

        elementById("main-wrapper").append(confirmBox);
    }
};

