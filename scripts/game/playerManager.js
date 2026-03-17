const playerHUD = {
    activeChar: null,
    currentTab: 'stats', // 'stats', 'inv', 'spells'
    contentTab: null,
    hud: null,
    tabs: null,
    characterMenu: null,

    init(unit) {
        const mainWrapper = elementById("main-wrapper");
        // Создаем основной контейнер интерфейса
        if(!this.hud) {
            this.hud = createEl('div', 'player-hud-container', '', null, 'player-hud');
        }
        // mainWrapper.appendChild(this.hud);
        mainWrapper.appendChild(this.hud);
        this.renderDock(unit);
    },

    destroy() {
        this.hud.remove();
    },

    close() {
        this.hud.remove();
        this.hud = null;
        this.currentTab = 'stats';
        this.contentTab = null;
        this.activeChar = null;
        this.tabs = null;
    },

    closeMenu() {
        playerHUD.characterMenu.remove();
        playerHUD.characterMenu = null;
        this.currentTab = 'stats';
        this.contentTab = null;
        this.activeChar = null;
        this.tabs = null;
    },

    renderDock(leader) {
        const {gridData, activeUnit} = hexFunction.data;

        this.hud.innerHTML = '';

        let dock = elementById('hud-dock');
        if (!dock) {
            dock = createEl('div', 'hud-dock', '', null, 'hud-dock');
            this.hud.appendChild(dock);
        }
        dock.innerHTML = '';

        const mainOrb = this.createOrb(leader, true);
        mainOrb.dataset.data = JSON.stringify({type:'click',name:'char-open-window',data:leader.id});
        dock.append(mainOrb);

        if(leader.party && leader.party.length) {
            const partyLine = createEl('div', 'party-line');
            leader.party.forEach(m => {
                const sub = this.createOrb(characterManager.getCharacterById(m), false);
                sub.dataset.data = JSON.stringify({type: 'click', name: 'char-open-window', data: m});
                partyLine.append(sub);
            });
            dock.append(partyLine);
        }

        // if(leader.hex && gridData[leader.hex]?.innerMap) {
        //
        //     // const interactionLine = createEl('div', 'interaction-line');
        //     const innerMap = gridData[leader.hex].innerMap && gameData[currentGame].tacticalMaps.find(m=>m.mapId===gridData[leader.hex].innerMap);
        //     if(innerMap) {
        //         const [q, r] = leader.hex.split('_').map(Number);
        //         const point = hexFunction.hexToPixel(q, r);
        //         map.createFloatingBtn(point, 'innerMap', leader.hex);
        //     //     const innerMapLabel = createEl('div', 'interaction-label');
        //     //     innerMapLabel.innerHTML = innerMap.mapName;
        //     //     const innerMapBtn = createEl('button', 'interaction-button');
        //     //     innerMapBtn.innerHTML = assets.icons.gate;
        //     //     innerMapBtn.dataset.data = JSON.stringify({type:'click',name:'map-inner-enter',data:{
        //     //         mapId:gridData[leader.hex].innerMap
        //     //     }});
        //     //     innerMapLabel.append(innerMapBtn);
        //     //     interactionLine.append(innerMapLabel);
        //     }
        //     //
        //     // dock.append(interactionLine);
        // }
    },

    createOrb(char, isBig) {
        const orb = createEl('div', `hud-orb ${isBig ? 'big' : 'small'}`);
        const img = avatars[char.id] ? `<img src="${avatars[char.id]}">` : `<span>${char.symbol || '👤'}</span>`;
        orb.innerHTML = `
            <div class="orb-avatar">${img}</div>
            <div class="orb-hp-mini"><div style="width:${char.hp / char.hpMax * 100}%"></div></div>
        `;
        return orb;
    },

    toggleHeroSheet(charId) {
        // this.activeChar = char;
        this.activeChar = characterManager.getCharacterById(charId);
        playerHUD.characterMenu = elementById('hero-sheet');
        if (playerHUD.characterMenu) {
            playerHUD.characterMenu.remove();
        }
        if(!this.activeChar) return;

        playerHUD.characterMenu = createEl('div', 'hero-sheet', '', null, 'hero-sheet');
        //
        // const closeBtn = createEl('button', 'close-hud-btn', '✖', '', 'close-hud-btn');
        // closeBtn.dataset.data = JSON.stringify({type:'click',name:'char-close-window'});
        // playerHUD.characterMenu.appendChild(closeBtn);

        // 1. Верхний ряд переключения (Party в меню)
        const header = createEl('div', 'sheet-header');
        header.innerHTML = `<h4>${this.activeChar.name} ${(this.activeChar.num>0)?(`(x${this.activeChar.num})`):''}</h4>`;

        this.contentTab = createEl('div', 'sheet-content');

        // 2. ТАБЫ
        this.tabs = createEl('div', 'sheet-tabs');
        ['stats', 'inventory', 'abilities'].forEach(t => {
            const btn = createEl('button', `char-tab-btn ${this.currentTab === t ? 'active' : ''}`, l10n[lang][t] || t);
            btn.dataset.data = JSON.stringify({type:'click',name:'char-tab-window',data:t});
            this.tabs.append(btn);
        });

        playerHUD.switchTab();

        playerHUD.characterMenu.append(header, this.tabs, playerHUD.contentTab);
        elementById('close-region-btn').style.display = 'block';
        this.hud.appendChild(playerHUD.characterMenu);
    },

    switchTab() {
        if (this.currentTab === 'stats') playerHUD.contentTab.append(this.renderStats(this.activeChar));
        if (this.currentTab === 'inventory') playerHUD.contentTab.append(this.renderInventory(this.activeChar));
        if (this.currentTab === 'abilities') playerHUD.contentTab.append(this.renderAbilities(this.activeChar));

        this.tabs.innerHTML = '';
        ['stats', 'inventory', 'abilities'].forEach(t => {
            const btn = createEl('button', `char-tab-btn ${this.currentTab === t ? 'active' : ''}`, l10n[lang][t] || t);
            btn.dataset.data = JSON.stringify({type:'click',name:'char-tab-window',data:t});
            this.tabs.append(btn);
        });
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
            <span>${char.hp} / ${char.hpMax}</span> 
            ${characterManager.getBonus(char,'hpMax') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'hpMax')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>❤️ MP:</b> 
            <span>${char.mp} / ${char.mpMax}</span> 
            ${characterManager.getBonus(char,'mpMax') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'mpMax')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>⚔️ Atk:</b> 
            <span>${char.attack[0]}-${char.attack[1]}</span> 
            ${characterManager.getBonus(char,'attack') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'attack')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>⚔️ Atk Type:</b> 
            <span>${char.attackType}</span> 
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>⚔️ Atk Rad:</b> 
            <span>${char.attackRadius}</span> 
            ${characterManager.getBonus(char,'attackRadius') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'attackRadius')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>🛡️ Def:</b> 
            <span>${char.def[0]}-${char.def[1]}</span> 
            ${characterManager.getBonus(char,'def') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'def')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>Mres:</b> 
            <span>${char.mres}</span> 
            ${characterManager.getBonus(char,'mres') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'mres')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>Vision:</b> 
            <span>${char.visionRadius}</span> 
            ${characterManager.getBonus(char,'visionRadius') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'visionRadius')})</span>` : ''}
        </div>`;
        colStats.innerHTML += `<div class="stat-row">
            <b>Walk:</b> 
            <span>${char.currentWalkRange} / ${char.walkRadius}</span> 
            ${characterManager.getBonus(char,'walkRadius') > 0 ? `<span class="stat-bonus-pos">(+${characterManager.getBonus(char,'walkRadius')})</span>` : ''}
        </div>`;

        // grid.innerHTML += `<div class="stat-row"><b>${k}:</b> <span>${v}</span></div>`;
        //
        // Object.entries(char || {}).forEach(([k, v]) => {
        //     grid.innerHTML += `<div class="stat-row"><b>${k}:</b> <span>${v}</span></div>`;
        // });
        grid.append(colImg, colStats);
        return grid;
    },

    // renderInventory(char) {
    //     const invContainer = createEl('div', 'inventory-main-container');
    //
    //     const invGrid = createEl('div', 'inventory-grid');
    //     const items = char.inventory || [];
    //
    //     const gridSize = Math.max(24, items.length);
    //
    //     for (let i = 0; i < gridSize; i++) {
    //         const slot = createEl('div', 'inventory-slot');
    //         const itemInfo = items[i];
    //
    //         if (itemInfo) {
    //             const proto = data.items.find(it => it.id === itemInfo.id);
    //             slot.innerHTML = `<span class="item-icon">${proto.icon || '📦'}</span>`;
    //             slot.dataset.data = JSON.stringify({type:'click',name:'char-item-effects',data:{name:proto.name, effects}});
    //             if (itemInfo.count > 1) slot.innerHTML += `<span class="item-count">${itemInfo.count}</span>`;
    //             slot.dataset.data = JSON.stringify({type:'click',name:'char-item-effects',data:{name:proto.name, itemInfo}});
    //         } else {
    //             slot.classList.add('empty');
    //         }
    //         invGrid.append(slot);
    //     }
    //
    //     // 2. Панель деталей (внизу сетки)
    //     const details = createEl('div', 'item-details-panel', 'Выберите предмет', null, 'item-details');
    //
    //     invContainer.append(invGrid, details);
    //     return invContainer;
    // },

    renderInventory(char) {
        const invContainer = createEl('div', 'inventory-main-container');

        // 1. ЗОНА КУКЛЫ (Paperdoll)
        const paperDollWrapper = createEl('div', 'hero-inventory-wrapper');

        // Определяем слоты для левой и правой колонок
        const leftSlots = ['head', 'shoulders',  'body', 'legs', 'feet'];
        const rightSlots = ['neck', 'gloves', 'main_hand', 'off_hand', 'ring'];

        // Левая колонка слотов
        const leftCol = createEl('div', 'equip-slots-col');
        leftSlots.forEach(slotType => {
            leftCol.appendChild(this.createEquipSlot(char, slotType));
        });

        // Центральная часть со спрайтом
        const centerZone = createEl('div', 'paperdoll-container');
        // const spritePath = assets.loadedFullHeight[char.id] || 'assets/sprites/default_hero_full.png'; // Твои полноразмерные картинки
        const sprite = assets.loadedFullHeight[char.id];
        sprite.classList.add('full-size-sprite');
        centerZone.append(sprite);
        // centerZone.innerHTML = `<img src="${spritePath}" class="full-size-sprite" alt="${char.name}">`;
        // centerZone.innerHTML = `<img src="${spritePath}" class="full-size-sprite" alt="${char.name}">`;

        // Правая колонка слотов
        const rightCol = createEl('div', 'equip-slots-col');
        rightSlots.forEach(slotType => {
            rightCol.appendChild(this.createEquipSlot(char, slotType));
        });

        paperDollWrapper.append(leftCol, centerZone, rightCol);

        // 2. ЗОНА РЮКЗАКА (Backpack)
        const backpackContainer = createEl('div', 'backpack-container');
        backpackContainer.innerHTML = `<div class="backpack-title">${l10n[lang].backpack || 'Рюкзак'}</div>`;

        const invGrid = createEl('div', 'inventory-grid');
        const items = char.inventory || [];

        // Рендерим только те предметы, которые НЕ надеты (если у тебя есть пометка isEquipped)
        // Или просто выводим весь список, если механика позволяет дубли
        const backpackItems = items.filter(i => !i.isEquipped);
        const gridSize = Math.max(20, backpackItems.length);

        for (let i = 0; i < gridSize; i++) {
            const slot = createEl('div', 'inventory-slot');
            const itemInfo = backpackItems[i];

            if (itemInfo) {
                const proto = data.items.find(it => it.id === itemInfo.id) || { name: '???', icon: '📦' };
                let icon = proto ? proto.icon : assets.icons['emptyInventory'];
                slot.innerHTML = `<span class="item-icon">${icon}</span>`;
                if (itemInfo.count > 1) slot.innerHTML += `<span class="item-count">${itemInfo.count}</span>`;

                slot.dataset.data = JSON.stringify({
                    type: 'click',
                    name: 'inventory-item-details',
                    data: { charId: char.id, instanceId: itemInfo.instanceId }
                });
            } else {
                let icon = assets.icons['emptyInventory'];
                slot.innerHTML = `<span class="item-icon">${icon}</span>`;
                slot.classList.add('empty');
            }
            invGrid.append(slot);
        }

        backpackContainer.appendChild(invGrid);

        // 3. ПАНЕЛЬ ДЕТАЛЕЙ (всплывающая инфо)
        const details = createEl('div', 'item-details-panel', l10n[lang].select_item || 'Выберите предмет', null, 'item-details');

        invContainer.append(paperDollWrapper, backpackContainer, details);
        return invContainer;
    },

    // Вспомогательный метод для создания слота экипировки
    createEquipSlot(char, slotType) {
        const slot = createEl('div', 'equip-slot empty');
        slot.dataset.slotType = slotType; // Для CSS-подсказки (иконка шлема и т.д.)

        // Ищем предмет, который надет в этот слот
        const equippedItem = (char.inventory || []).find(i => i.isEquipped && i.slot === slotType);

        if (equippedItem) {
            const proto = data.items.find(it => it.id === equippedItem.id);
            slot.classList.remove('empty');
            slot.innerHTML = `<span class="item-icon">${proto.icon || '⚔️'}</span>`;
            slot.dataset.data = JSON.stringify({
                type: 'click',
                name: 'inventory-item-details',
                data: { charId: char.id, instanceId: equippedItem.instanceId }
            });
        } else {
            // Если пусто, вешаем клик для "быстрого выбора" из инвентаря (опционально)
            const svgIcon = assets.icons[slotType+'Inventory'] || assets.icons['emptyInventory'];
            slot.innerHTML = `<span class="item-icon">${svgIcon}</span>`;
            slot.dataset.data = JSON.stringify({
                type: 'click',
                name: 'inventory-equip-request',
                data: { charId: char.id, slot: slotType }
            });
        }

        return slot;
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
            const hasMana = char.mp >= (ab.manacost || 0);
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
                btn.dataset.data = JSON.stringify({type:'click',name:'char-ability-select',data:ab});
            }
            skillsGrid.append(btn);
        });

        return skillsGrid;
    },

    renderAbilitiesConfirm() {
        const confirmBox = createEl('div', 'confirm-action-box',0,'','confirm-action-box');

        const confirmBtn = createEl('button', 'btn-confirm-cast', `${l10n[lang].confirm || 'OK'}`);
        confirmBtn.dataset.data = JSON.stringify({type:'click',name:'char-ability-confirm'});

        const cancelBtn = createEl('button', 'btn-cancel-cast', `✖`);
        cancelBtn.dataset.data = JSON.stringify({type:'click',name:'char-ability-cancel'});

        confirmBox.append(confirmBtn,cancelBtn);

        elementById("main-wrapper").append(confirmBox);
    }
};

