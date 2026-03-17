const inventoryManager = {
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

    removeItem(instanceId, char = null) {
        const c = char || characterManager.char;
        c.inventory = c.inventory.filter(i => i.instanceId !== instanceId);
        // currentSeason.isDirty = true;
    },

    use(instanceId) {},

    showItemDetails(proto, instance) {
        const panel = elementById('item-details');
        const effects = Object.entries(proto.effects || {})
            .map(([k, v]) => `<div class="eff">${k}: <b>${v > 0 ? '+' : ''}${v}</b></div>`).join('');

        // if(proto.usable) {
        //     panel.innerHTML = `
        //         <div class="details-header">
        //             <b>${proto.name}</b>
        //             <small>${proto.type || 'Вещь'}</small>
        //         </div>
        //         <div class="details-body">${effects || 'Нет эффектов'}</div>
        //         <button class="use-item-btn" data-data='{"type":"click","name":"inventory-use-item","data":"${instance.instanceId}"}'>
        //             ${proto.type === 'equippable' ? 'Надеть' : 'Использовать'}
        //         </button>
        //     `;
        // }
        // else if (proto.slot) {
        //     const btnText = instance.isEquipped ? (l10n[lang].unequip || 'Снять') : (l10n[lang].equip || 'Надеть');
        //     panel.innerHTML = `
        //         <div class="details-header">
        //             <b>${proto.name}</b>
        //             <small>${proto.slot || 'Вещь'}</small>
        //         </div>
        //         <div class="details-body">${effects || 'Нет эффектов'}</div>
        //         <button class="use-item-btn" data-data='{
        //             "type":"click",
        //             "name":"inventory-toggle-equip",
        //             "data": { "charId": "${playerHUD.activeChar.id}", "instanceId": "${instance.instanceId}" }
        //         }'>
        //             ${btnText}
        //         </button>
        //     `;
        // }

        let actionBtn = '';

        // ЛОГИКА РАЗДЕЛЕНИЯ
        if (proto.slot) {
            // Это ЭКИПИРОВКА
            const btnText = instance.isEquipped ? (l10n[lang].unequip || 'Снять') : (l10n[lang].equip || 'Надеть');
            actionBtn = `<button class="use-item-btn equip" data-data='{
                "type":"click",
                "name":"inventory-toggle-equip",
                "data": { "charId": "${playerHUD.activeChar.id}", "instanceId": "${instance.instanceId}" }
            }'>${btnText}</button>`;
        }
        else if (proto.category === 'usable') {
            // Это РАСХОДНИК
            actionBtn = `<button class="use-item-btn consume" data-data='{
                "type":"click",
                "name":"inventory-use-consumable",
                "data": { "charId": "${playerHUD.activeChar.id}", "instanceId": "${instance.instanceId}" }
            }'>${l10n[lang].use || 'Использовать'}</button>`;
        }

        panel.innerHTML = `
            <div class="details-header">
                <b>${proto.name}</b>
                <small>${proto.slot ? (l10n[lang][proto.slot] || proto.slot) : (l10n[lang].consumable || 'Расходник')}</small>
            </div>
            <div class="details-body">
                ${proto.description || ''}
                <div class="effects-list">${effects}</div>
            </div>
            ${actionBtn}
        `;
    },

    handleEquipRequest(charId, slotType) {
        const char = characterManager.getCharacterById(charId);
        const candidates = (char.inventory || []).filter(invItem => {
            const proto = data.items.find(p => p.id === invItem.id);
            return proto && proto.slot === slotType && !invItem.isEquipped;
        });

        if (candidates.length === 0) {
            return console.log(`Нет предметов для слота: ${slotType}`);
        }

        const inventorySlots = document.querySelectorAll('.inventory-slot');
        inventorySlots.forEach(slot => {
            const slotData = JSON.parse(slot.dataset.data || '{}');
            if (slotData.data && candidates.find(c => c.instanceId === slotData.data.instanceId)) {
                slot.classList.add('highlight-suggest');
            } else {
                slot.classList.remove('highlight-suggest');
            }
        });
    },

    // getBonus(char, key) {
    //     if (!char.inventory) return 0;
    //     const inventory = char.inventory.map(i=>data.items.find(j=>j.id===i.id));
    //     return inventory.reduce((sum, item) => {
    //         return sum + (item.effects?.[key] || 0);
    //     }, 0);
    // },

    toggleEquip(charId, instanceId) {
        const char = characterManager.getCharacterById(charId);
        if (!char || !char.inventory) return;

        const item = char.inventory.find(i => i.instanceId === instanceId);
        if (!item) return;

        const proto = data.items.find(p => p.id === item.id);
        if (!proto || !proto.slot) return; // Предмет нельзя надеть

        if (item.isEquipped) {
            // СНИМАЕМ
            item.isEquipped = false;
        } else {
            // НАДЕВАЕМ
            // 1. Сначала снимаем всё, что уже надето в этот же слот
            char.inventory.forEach(i => {
                const p = data.items.find(it => it.id === i.id);
                if (p && p.slot === proto.slot) {
                    i.isEquipped = false;
                }
            });
            // 2. Надеваем текущий
            item.isEquipped = true;

            partyManager.checkPartyIntegrity(char.id)
        }

        // ПЕРЕСЧЕТ И ОБНОВЛЕНИЕ
        this.refreshCharacter(char);
    },

    useConsumable(charId, instanceId) {
        const char = characterManager.getCharacterById(charId);
        const itemIndex = char.inventory.findIndex(i => i.instanceId === instanceId);
        if (itemIndex === -1) return;

        const item = char.inventory[itemIndex];
        const proto = data.items.find(p => p.id === item.id);

        // 1. Применяем эффект (например, лечение)
        if (proto.effect === 'heal') {
            char.hp = Math.min(char.hpMax, char.hp + (proto.power || 0));
        }
        if (proto.effect === 'mana') {
            char.mp = Math.min(char.mpMax, char.mp + (proto.power || 0));
        }

        // 2. Уменьшаем количество или удаляем
        if (item.count > 1) {
            item.count--;
        } else {
            char.inventory.splice(itemIndex, 1);
        }

        // 3. Обновляем UI
        this.refreshCharacter(char);
    },

    refreshCharacter(char) {
        characterManager.initStats(char);
        if (playerHUD.activeChar && playerHUD.activeChar.id === char.id) {
            playerHUD.toggleHeroSheet(char.id);
        }
        if (char.isLord || char.partyLeader) {
            playerHUD.renderDock(char);
        }

        // Помечаем сезон "грязным" для сохранения в IndexedDB
        // currentSeason.isDirty = true;
    },

    // Модифицированный getBonus: считает ТОЛЬКО надетые вещи
    getBonus(char, key) {
        if (!char.inventory) return 0;

        return char.inventory.reduce((sum, invItem) => {
            // Считаем бонус только если предмет надет
            if (invItem.isEquipped) {
                const proto = data.items.find(p => p.id === invItem.id);
                return sum + (proto?.effects?.[key] || 0);
            }
            return sum;
        }, 0);
    }
};