const triggerManager = {

    check(type, params = []) {
        console.log(`[Trigger Check] Type: ${type}`, params);

        const trigger = (data.triggers || []).find(t => {
            // 1. Если триггер уже сработал и он не повторяемый — пропускаем
            if (currentSeason.triggerStates?.[t.id] && !t.repeatable) return false;

            if (t.type !== type) return false;

            if (type === 'playerDeath') return player.character.isDead;

            if (type === 'enterZone' || type === 'leaveZone') {
                if (t.params[0] !== params[0]) return false; // params[0] - ID региона
            }

            if (!t.conditions || !t.conditions.length) return true; // Если условий нет - срабатывает сразу

            return t.conditions.every(cond => triggerManager.evaluateCondition(cond, params));
        });

        if (trigger) {
            this.executeActions(trigger.actions);

            // Фиксация срабатывания в стейте сезона (Твои Deltas)
            if (!trigger.repeatable) {
                if (!currentSeason.triggerStates) currentSeason.triggerStates = {};
                currentSeason.triggerStates[trigger.id] = true;
                // Сохраняем в IndexedDB
                dbManager.saveGame(currentGame, gameData[currentGame]);
            }
            return true;
        }
        return false;
    },

    evaluateCondition(condition, params, questData, index) {
        let check = true;
        const p = condition.params;  // Параметры условия из редактора
        const ep = params;           // Параметры события из игры

        switch (condition.type) {
            case 'npcDeath':
                check = (p[0] === ep[0]) && (characterManager.getCharacterById(ep[0]).hp <= 0);
                break;

            case 'npcTagKills':
                const victim = characterManager.getCharacterById(ep[0]);
                check = victim.tags.includes(p[0]) && (victim.hp <= 0);
                if (check && questData) {
                    questData[index].params[1]++;
                    check = (questData[index].params[1] >= p[1]);
                    if (check) questData[index].status = 'completed1';
                }
                break;

            case 'npcRelationThreshold':
                check = (p[0] === ep[0]) && (p[1] === ep[1]) && (p[2] <= Number(ep[2]));
                if (check && questData) {
                    questData[index].params[2] = Number(ep[2]);
                    questData[index].status = 'completed';
                }
                break;

            case 'dialogueStarted':
                check = (p[0] === ep[0]);
                break;

            case 'dialogueOption':
                check = (p[0] === ep[0]) && (p[1] === ep[1]);
                break;

            case 'enterZone':
            case 'leaveZone':
                check = (condition.id === ep[1]);
                break;

            case 'questCompleted':
            case 'questFailed':
            case 'questAbandoned':
                check = (p[0] === ep[0]);
                break;

            case 'getItem':
            case 'giveItem':
            case 'takeItem':
                check = (condition.id === ep[0]);
                break;

            case 'interact':
                check = (p[0] === ep[0]) && (p[1] === ep[1]);
                break;

            case 'timePassed':
                check = (currentWorldTime >= p[0]);
                break;

            case 'newGame':
                check = true;
                break;
        }
        return check;
    },

    executeActions(actions) {
        for (const action of actions) {
            const p = action.params;
            let char, quest;

            switch (action.type) {
                case 'startDialogue':
                    dialogManager.open(p[0]); // p[1] - начальная реплика
                    dialogManager.renderStep(p[1]); // p[1] - начальная реплика
                    break;

                case 'endDialogue':
                    dialogManager.close();
                    break;

                case 'npcRelationChange':
                    characterManager.modifyRelation(p[0],p[1],p[2]);
                    // Рекурсивная проверка порога отношений
                    this.checkTrigger('npcRelationThreshold', [p[0], p[1], characterManager.getRelation(p[0],p[1])]);
                    break;

                case 'startBattle':
                    char = characterManager.getCharacterById(p[0]);
                    tacticalMap.startBattle(char);
                    break;

                case 'switchMap':
                    mapManager.switch(p[0], p[1]); // ID карты и HexID
                    break;

                case 'moveCharacter':
                    characterManager.modifyPosition(p[0], {q:p[1],r:p[2]});
                    // if (p[0] === player.id) camera.moveTo(p[1], p[2]);
                    break;

                case 'killCharacter':
                    characterManager.kill(p[0]);
                    break;

                case 'spawnCharacter':
                    characterManager.spawn(p[0], p[1]); // шаблон и HexID
                    break;

                case 'giveItem':
                    inventoryManager.give(p[0], p[1]); // Кому и Что
                    break;

                case 'takeItem':
                    inventoryManager.take(p[0], p[1]);
                    break;

                case 'showPopUp':
                    uiManager.inGamePopUp(action);
                    break;

                case 'showPopUpChain':
                    uiManager.showPopUpChain(action.pages);
                    break;

                case 'playSound':
                    audioManager.play(p[0]);
                    break;

                case 'playVideo':
                    uiManager.playVideo(p[0]);
                    break;

                case 'startQuest':
                    questManager.proceedQuest(p[0], 'accept');
                    break;

                case 'progressQuest':
                    questManager.proceedQuest(p[0], 'progress', p[1]);
                    break;

                case 'completeQuest':
                    questManager.proceedQuest(p[0], 'complete');
                    break;

                case 'failQuest':
                    questManager.proceedQuest(p[0], 'fail');
                    break;

                case 'abandonQuest':
                    questManager.proceedQuest(p[0], 'abandon');
                    break;

                case 'giveReward':
                    const rewardType = p[0];  // 'resources', 'exp', 'items'
                    const rewardId = p[1];    // ID ресурса или предмета
                    const amount = Number(p[2]);

                    switch (rewardType) {
                        case 'resources':
                            // Добавляем к ресурсам текущего игрока/фракции
                            // Например: economyManager.addResource(rewardId, amount);
                            if (!currentSeason.vault) currentSeason.vault = {};
                            currentSeason.vault[rewardId] = (currentSeason.vault[rewardId] || 0) + amount;
                            break;

                        case 'exp':
                            // Начисляем опыт лидеру группы (или всей группе)
                            characterManager.addExperience(player.id, amount);
                            break;

                        case 'items':
                            // Выдаем предмет в инвентарь
                            inventoryManager.give(player.id, rewardId, amount);
                            break;
                    }

                    // Визуальное уведомление (опционально, если не стоит отдельный showPopUp)
                    console.log(`Награда получена: ${rewardType} - ${amount}`);
                    break;
            }
        }
    },


    addCondition() {
        const c = editor.workingList[currentEditorIndex];
        if (!c.conditions) c.conditions = [];

        c.conditions.push({ type: 'npcDeath', params: [] });

        editor.refreshTriggerSections(c);
    },

    // Добавление пустого действия
    addAction() {
        const c = editor.workingList[currentEditorIndex];
        if (!c.actions) c.actions = [];

        c.actions.push({ type: 'showPopUp', params: [] });

        editor.refreshTriggerSections(c);
    },

    // Удаление по индексу
    removeSubItem(type, index) {
        const c = editor.workingList[currentEditorIndex];
        if (type === 'condition') c.conditions.splice(index, 1);
        else c.actions.splice(index, 1);

        editor.refreshTriggerSections(c);
    },

    editSubItem(mode, index, meta = null) {
        const c = editor.workingList[currentEditorIndex];
        let item;

        // ОПРЕДЕЛЯЕМ ИСТОЧНИК ДАННЫХ
        if (meta && meta.isReply) {
            // Если это реплика: c.nodes[узел].player[реплика].conditions[индекс]
            item = c.nodes[meta.nodeIdx].player[meta.lineIdx].conditions[index];
        } else {
            // Если это обычный триггер (твой старый код)
            item = (mode === 'condition') ? c.conditions[index] : c.actions[index];
        }

        const config = (mode === 'condition') ? triggerFields : actionFields;
        const fields = config[item.type] || [];

        let html = `<h3>Edit ${item.type}</h3>`;

        // Данные для смены ТИПА (добавляем meta в JSON)
        const typeData = JSON.stringify({
            "type": "change",
            "name": "editor-trigger-sub-item-type",
            "data": { mode, index, meta }
        });

        html += `<div class="row">Тип 
                <select id="trigger-sub-param-type" data-data='${typeData}'>
                    ${editor.makeOptions(Object.keys(config), item.type)}
                </select>
             </div><hr>`;

        // Рендер полей ПАРАМЕТРОВ
        fields.forEach(f => {
            const fieldData = JSON.stringify({
                "type": "change",
                "name": "editor-trigger-sub-item-field",
                "data": { mode, index, key: f.key, meta } // Прокидываем meta дальше
            });

            html += `<div class="row">${f.label}`;
            if (f.type === 'select') {
                let selectHtml = editor.multiSelect(item.params[f.key], `trigger-sub-param-${f.key}`, f.source);
                html += selectHtml.replace('<select', `<select data-data='${fieldData}'`);
            } else {
                html += `<input type="${f.type}" id="trigger-sub-param-${f.key}" value="${item.params[f.key] || ''}" data-data='${fieldData}'>`;
            }
            html += `</div>`;
        });

        // Кнопка "Назад" в зависимости от контекста
        if (meta && meta.isReply) {
            html += `<button class="primary" data-data='{"type":"click","name":"editor-reply-cond-back","data":${JSON.stringify(meta)}}'>Назад к реплике</button>`;
        }

        controls.createPopup('char-editor-popup', 'char-editor-popup', html);
    },

    //
    // editSubItem(mode, index) {
    //     const c = editor.workingList[currentEditorIndex];
    //     const item = (mode === 'condition') ? c.conditions[index] : c.actions[index];
    //     const config = (mode === 'condition') ? triggerFields : actionFields;
    //     const fields = config[item.type] || [];
    //
    //     // Создаем HTML формы параметров на основе конфига
    //     let html = `<h3>Edit ${item.type}</h3>`;
    //
    //     const data = JSON.stringify({
    //         "type":"change",
    //         "name":"editor-trigger-sub-item-type",
    //         "data": {
    //             mode, index
    //         }
    //     });
    //     // Селект смены типа (если передумали)
    //     html += `<div class="row">Тип
    //                 <select id="trigger-sub-param-type" data-data='${data}'>
    //                     ${editor.makeOptions(Object.keys(config), item.type)}
    //                 </select>
    //              </div><hr>`;
    //
    //     // Отрисовка полей из конфига
    //     fields.forEach(f => {
    //         const data = JSON.stringify({
    //             "type":"change",
    //             "name":"editor-trigger-sub-item-field",
    //             "data": { mode, index, key: f.key }
    //         });
    //         html += `<div class="row">${f.label}`;
    //         if (f.type === 'select') {
    //             let selectHtml = editor.multiSelect(item.params[f.key], `trigger-sub-param-${f.key}`, f.source);
    //             html += selectHtml.replace('<select', `<select data-data='${data}'`);
    //             // html += editor.multiSelect(item.params[f.key], `sub-param-${f.key}`, f.source);
    //         } else {
    //             html += `<input type="${f.type}" id="trigger-sub-param-${f.key}" value="${item.params[f.key] || ''}" data-data='${data}'>`;
    //         }
    //         html += `</div>`;
    //     });
    //
    //     controls.createPopup('char-editor-popup', 'char-editor-popup', html);
    // },

    updateSubItemType(mode, index, newType) {
        const c = editor.workingList[currentEditorIndex];
        const item = (mode === 'condition') ? c.conditions[index] : c.actions[index];
        item.type = newType;
        item.params = [];
        triggerManager.editSubItem(mode, index);
        editor.refreshTriggerSections(c);
    },

    updateParam(mode, itemIndex, paramKey, value) {
        const c = editor.workingList[currentEditorIndex];
        const item = (mode === 'condition') ? c.conditions[itemIndex] : c.actions[itemIndex];
        item.params[paramKey] = value;
        editor.refreshTriggerSections(c);
    },

};