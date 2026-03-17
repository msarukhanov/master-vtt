const _data = data;
let lastClickTime = 0;

elementById('main-wrapper').oninput = (e)=> {
    let val = e.target.value;
    if (!e.target.dataset || !e.target.dataset.data) return;

    const dataset = JSON.parse(e.target.dataset.data || '{}');

    const {type, name, data} = dataset;

    let show;

    switch (name) {
        case 'season-name':
            currentSeason.name = val;
            break;
        case 'show-map-toggle':
            show = hexFunction.data.show;
            show[data] = !show[data];
            hexFunction.updateHex();
            break;
        // case 'show-terrain-map':
        //     map.show.terrain = !map.show.terrain;
        //     hexFunction.updateHex();
        //     break;
        // case 'show-fog-map':
        //     map.show.fog = !map.show.fog;
        //     hexFunction.updateHex();
        //     break;
        // case 'show-factions-map':
        //     map.show.factions = !map.show.factions;
        //     hexFunction.updateHex();
        //     break;
        // case 'show-yeilds-map':
        //     map.show.yeilds = !map.show.yeilds;
        //     hexFunction.updateHex();
        //     break;
        case 'cell-resources':
            if (!map.tempCellData) map.tempCellData = {}; // Буфер текущих настроек
            if (!map.tempCellData.yield) map.tempCellData.yield = {};
            map.tempCellData.yield[data] = parseInt(val) || 0;
            break;
        case 'economy-faction-name':
            elementById('master-economy-container').querySelectorAll('tbody tr').forEach(tr => {
                const name = tr.querySelector('td').innerText.toLowerCase();
                tr.style.display = name.includes(val.toLowerCase()) ? '' : 'none';
            });
            break;
        case 'economy-faction-resources':
            const fid = data.fid;
            const res = data.res;
            val = parseInt(val) || 0;

            const targetFaction = _data.factions.find(f => String(f.id) === String(fid));
            if (targetFaction) {
                targetFaction.resources[res] = val;
                dbManager.saveGame('seasons', gameData.seasons);
            }
            break;
        case 'tf-char-name':
            this.selectedCharLink.name = val;
            break;
        case 'tf-char-id':
            this.selectedCharLink.id = val;
            break;
        case 'tf-char-num':
            this.selectedCharLink.num = Number(val);
            break;
        case 'tf-char-stat':
            this.selectedCharLink[data] = Number(val);
            break;
        case 'tf-char-stat-triple':
            this.selectedCharLink[data.key][data.k] = Number(val);
            break;
        case 'tf-obj-name':
            this.selectedObjectLink.name = val;
            break;
        case 'tf-obj-id':
            this.selectedObjectLink.id = val;
            break;
        case 'tf-obj-stat':
            this.selectedObjectLink[data] = Number(val);
            break;
        case 'tf-obj-coords':
            this.selectedCharLink[data.key][data.k] = Number(val);
            break;
        case 'tf-map-rows':
            tacticalMap.sizes.rows = Number(val);
            break;
        case 'tf-map-cols':
            tacticalMap.sizes.cols = Number(val);
            break;
        case 'tf-map-name':
            tacticalMap.mapName = val;
            break;
        case 'tf-map-id':
            tacticalMap.mapId = val;
            break;
    }

    if (e.target.tagName === 'SELECT') {
        e.target.blur(); // Снимаем фокус, чтобы клавиатура снова управляла картой/камерой
    }
    // if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
    //     e.target.blur(); // Снимаем фокус, чтобы клавиатура снова управляла картой/камерой
    // }
};

elementById('main-wrapper').onchange = (e)=> {
    let val = e.target.value;
    if (!e.target.dataset || !e.target.dataset.data) return;

    const dataset = JSON.parse(e.target.dataset.data || '{}');

    const {type, name, data} = dataset;

    switch (name) {
        case 'map-char-select-add':
            map.selectedObject = null;
            map.selectedCharacter = currentSeason.characters.find(c=>c.id===val);
            break;
        case 'map-obj-select-add':
            if(e.target.value === "-1") {
                map.selectedObject = null;
                return;
            }
            map.selectedCharacter = null;
            map.selectedObject = { val };
            map.moving = true;
            break;
        case 'dashboard-fields-change':
            dashboard.toggleFieldSetting(data.entityKey, data.fieldName);
            break;
        case 'dashboard-tabs':
            dashboard.data.config.groupedTabs[data.gIdx].tabs[data.tIdx][data.field] = val;
            break;
        case 'dashboard-player-name':
            dashboard.data.players[data.idx] = val;
            dbManager.saveGame('players', dashboard.data.players).then();
            break;
        case 'dashboard-season-name':
            dashboard.data.seasons[data.idx] = val;
            dbManager.saveGame('seasons', dashboard.data.seasons).then();
            break;
        case 'dashboard-season-player-add':
            const playerToBind = dashboard.data.players.find(p => p.id === parseInt(val));
            if (playerToBind) {
                dashboard.data.seasons[data.idx].players.push({...playerToBind});
                this.renderSeasons(elementById('admin-content'));
            }
            break;
        case 'char-stat':
            const char = currentSeason.characters.find(c => c.id === data.charId);
            // char[data.type][data.key] = Number(val);
            char[data.type][data.key] = Math.max(0, Math.floor(parseFloat(Number(val)) || 0));
            break;
        case 'diplomacy-faction-select':
            diplomacyManager.refreshList(val);
            break;
        case 'tf-map-select':
            mapManager.loadMap(val);
            break;
        case 'tf-team-select':
            tacticalMap.selectedTeam = Number(val);
            break;
        case 'tf-char-select':
            const selectedTemplate = currentSeason.characters.find(c => c.id === val);
            if (selectedTemplate) {
                tacticalMap.selectedChar = selectedTemplate; //JSON.parse(JSON.stringify(selectedTemplate));
            }
            break;
        case 'tf-obj-select':
            tacticalMap.selectedObject = val;
            break;
        case 'tf-object-type':
            tacticalMap.selectedObjectType = val;
            break;
        case 'tf-object-target-map':
            if (val >= 0) tacticalMap.selectedObjectLink.targetMapId = val;
            break;
        case 'tf-terrain-select':
            tacticalMap.selectedTerrain = val;
            break;
        case 'tf-height-select':
            tacticalMap.selectedHeight = Number(val);
            break;

        case 'editor-type-select':
            editor.typeSelect();
            break;

        case 'editor-trigger-sub-item-type':
            triggerManager.updateSubItemType(data.mode, data.index, editor.value('trigger-sub-param-type'));
            break;
        // case 'editor-trigger-sub-item-field':
        //     triggerManager.updateParam(data.mode, data.index, data.key, editor.value('trigger-sub-param-'+data.key));
        //     break;
        case 'editor-trigger-sub-item-field':
            // Извлекаем meta из данных события
            const m = data.meta;
            let targetItem;

            if (m && m.isReply) {
                // Пишем в условие реплики
                targetItem = editor.workingList[currentEditorIndex].nodes[m.nodeIdx].player[m.lineIdx].conditions[data.index];
            } else {
                // Пишем в обычный триггер (старый код)
                const trg = editor.workingList[currentEditorIndex];
                targetItem = (data.mode === 'condition') ? trg.conditions[data.index] : trg.actions[data.index];
            }

            // Записываем значение (используем твой editor.value)
            targetItem.params[data.key] = editor.value('trigger-sub-param-' + data.key);
            break;

        case 'editor-quest-stage-trigger-change':
            const quest = editor.workingList[currentEditorIndex];
            quest.stages[Number(data)].triggerId = editor.value("stage-trigger-select");
            editor.refreshQuestSections(quest);
            break;

        case 'editor-quest-stage-text':
            editor.workingList[currentEditorIndex].stages[Number(data)].text = elementById("stage-text").value;
            break;

        case 'editor-dialog-view-change':
            // Сохранение режима вида и стиля окна
            const curDialog = editor.workingList[currentEditorIndex];
            curDialog.customView.customViewMode = elementById("customViewMode").value;
            curDialog.customView.boxStyle = elementById("boxStyle").value;
            break;
        case 'editor-node-id-change':
            // Изменение ID узла (data.data — индекс узла)
            editor.workingList[currentEditorIndex].nodes[data].id = event.target.value;
            // Обновляем список, чтобы ID изменился и в "чипсах"
            editor.refreshDialogSections(editor.workingList[currentEditorIndex]);
            break;
        case 'editor-line-text':
            // Запись текста реплики: n - индекс узла, l - индекс строки, t - тип (npc/player)
            const lineData = data;
            editor.workingList[currentEditorIndex].nodes[lineData.n][lineData.t][lineData.l].text = event.target.value;
            break;
        case 'editor-line-next':
            // Выбор следующего узла для ответа игрока
            const nextData = data;
            editor.workingList[currentEditorIndex].nodes[nextData.n].player[nextData.l].next = event.target.value;
            break;
        case 'editor-line-cond':
            const nIdx = data.data.n;
            const lIdx = data.data.l;
            const reply = editor.workingList[currentEditorIndex].nodes[nIdx].player[lIdx];

            if (!reply.conditions) reply.conditions = [];

            // Используем твой механизм: открываем форму списка условий
            // Мы можем переиспользовать поп-ап или сделать вложенный список
            dialogManager.editReplyConditions(nIdx, lIdx);
            break;
        case 'editor-reply-cond-add':
            const rAdd = data.data;
            const replyAdd = editor.workingList[currentEditorIndex].nodes[rAdd.n].player[rAdd.l];
            if (!replyAdd.conditions) replyAdd.conditions = [];
            replyAdd.conditions.push({ type: 'npcRelationThreshold', params: [] }); // дефолт
            triggerManager.editReplyConditions(rAdd.n, rAdd.l);
            break;

        case 'editor-reply-cond-edit':
            const rEdit = data.data;
            triggerManager.editSubItem('condition', rEdit.c, {
                isReply: true,
                nodeIdx: rEdit.n,
                lineIdx: rEdit.l
            });
            break;
        case 'editor-reply-cond-back':
            // data.data содержит твой объект {isReply: true, nodeIdx: ..., lineIdx: ...}
            const m = data.data;
            triggerManager.editReplyConditions(m.nodeIdx, m.lineIdx);
            break;

    }

    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        e.target.blur(); // Снимаем фокус, чтобы клавиатура снова управляла картой/камерой
    }
};

// elementById('main-wrapper')

// document.body

elementById('main').onclick = (e)=> {
    // const now = Date.now();
    // console.log(now, lastClickTime);
    // if (lastClickTime && (now - lastClickTime < 200)) {
    //     console.warn("Слишком быстрый клик (защита от дребезга)");
    //     return; // Игнорируем клики чаще 5 раз в секунду
    // }
    // lastClickTime = now;

    // const target = e.target.closest('[data-data]');
    // if (!target) return;
    //
    // console.log(e);

    let val = e.target.value;
    const el = e.target;
    if (!e.target.dataset || !e.target.dataset.data) return;

    const dataset = JSON.parse(e.target.dataset.data || '{}');

    const {type, name, data} = dataset;

    let season;

    switch (name) {
        case 'global-map-click':
            // globalMap.clickMap(e);
            map.clickMap(e);
            break;
        case 'region-map':
            // regionMap.clickMap(e);
            map.clickMap(e);
            break;
        case 'tactical-map':
            // tacticalMap.handleCanvasClick(e);
            map.clickMap(e);
            break;
        case 'region-close':
            if(dialogManager.dialog) {
                dialogManager.close();
            }
            else if(playerHUD.characterMenu) {
                playerHUD.closeMenu();
            }
            else if(tacticalMap.ctx) {
                mapManager.closeInnerMap();
            }
            else {
                regionMap.close();
            }

            if(!dialogManager.dialog && !playerHUD.characterMenu && !tacticalMap.ctx && !regionMap.ctx) {
                elementById('close-region-btn').style.display = 'none';
            }

            break;

        case 'obj-eraser-mode':
            map.eraserMode = !map.eraserMode;
            el.classList.toggle('active', map.eraserMode);

            if(map.eraserMode) {
                map.selectedCharacter = null;
                map.selectedObject = null;
                map.moving = false;
                map.mapCharSelect.value = -1;
                if(map.mapObjSelect) map.mapObjSelect.value = -1;
            }
            break;
        case 'economics-menu':
            economyManager.renderMasterTable();
            break;
        case 'economics-force':
            if(confirm("Начислить ресурсы всем фракциям прямо сейчас?")) {
                // this.nextTurn();
                economyManager.renderMasterTable();
            }
            break;
        case 'diplomacy-menu':
            diplomacyManager.init();
            break;
        case 'diplomacy-manager-rel':
            console.log(data);
            diplomacyManager.setRelation(data.id, data.oppId, data.value);
            break;
        case 'diplomacy-toggle-trade-contract':
            diplomacyManager.toggleContract(data.id1, data.id2, 'trade');
            const currentMainId = document.querySelector('.diplo-main-select').value;
            diplomacyManager.refreshList(currentMainId);
            // diplomacyManager.refreshList(data.id);
            break;
        case 'cell-paint-mode':
            map.paintMode = !map.paintMode;
            el.classList.toggle('active', map.paintMode);
            break;
        case 'cell-save-button':
            hexFunction.saveCell(data.q, data.r);
            break;
        case 'cell-character-save-button':
            hexFunction.saveCellCharacter(data.q, data.r);
            break;
        case 'cell-object-save-button':
            hexFunction.saveCellObject(data.q, data.r);
            break;
        case 'cell-paint-city-mode':
            map.paintCityMode = !map.paintCityMode;
            el.classList.toggle('active', map.paintCityMode);
            break;
        case 'cell-paint-eraser-mode':
            map.paintEraser = !map.paintEraser;
            el.classList.toggle('active', map.paintEraser);
            break;
        case 'dashboard-section':
            dashboard.load(data);
            break;
        case 'dashboard-player-add':
            const name = prompt("Введите имя нового игрока:");
            if (name) {
                const newPlayer = {
                    id: Date.now(),
                    name: name
                };
                dashboard.data.players.push(newPlayer);
                dbManager.saveGame('players', dashboard.data.players).then();
                dashboard.renderPlayers(elementById('admin-content'));
            }
            break;
        case 'dashboard-player-del':
            if (confirm(`Удалить игрока ${data.name}? Это не уберет его из старых сезонов автоматически.`)) {
                dashboard.data.players.splice(data.idx, 1);
                dbManager.saveGame('players', dashboard.data.players).then();
                dashboard.renderPlayers(elementById('admin-content'));
            }
            break;
        case 'dashboard-season-add':
            main.addSeason();
            dashboard.data.seasons = gameData.seasons;
            dashboard.renderSeasons(elementById('admin-content'));
            break;
        case 'dashboard-season-save':
            if (currentSeason.id === data) {
                main.saveCurrentSeason();
            } else {
                dbManager.saveGame('seasons', gameData.seasons).then();
            }
            dashboard.renderSeasons(elementById('admin-content'));
            break;
        case 'dashboard-season-del':
            if(confirm(`Удалить ${data.name}?`)) {
                main.delSeason(data.id); // Твой метод из main
                dashboard.data.seasons = gameData.seasons;
                dashboard.renderSeasons(elementById('admin-content'));
            }
            break;
        case 'dashboard-season-player-del':
            if (confirm(`Удалить игрока ${data.name}? Это не уберет его из старых сезонов автоматически.`)) {
                dashboard.data.seasons[data.idx].players.splice(data.pIdx, 1);
                dbManager.saveGame('players', dashboard.data.players).then();
                dashboard.renderSeasons(elementById('admin-content'));
            }
            break;
        case 'editor-save':
            editor.save();
            break;
        case 'editor-save-avatars':
            editor.exportAvatars();
            break;

        case 'editor-item-add':
            editor.addItem();
            break;
        case 'editor-item-select':
            editor.selectItemById(data);
            break;
        case 'editor-item-clone':
            editor.cloneItem(data);
            break;
        case 'editor-item-save':
            editor.saveItem();
            break;
        case 'editor-item-del':
            editor.deleteItem();
            break;

        case 'editor-add-condition':
            triggerManager.addCondition();
            break;
        case 'editor-add-action':
            triggerManager.addAction();
            break;
        case 'editor-del-condition':
            triggerManager.removeSubItem('condition', data); // eventData.data — это индекс из tpl
            break;
        case 'editor-del-action':
            triggerManager.removeSubItem('action', data);
            break;
        case 'editor-edit-condition':
            triggerManager.editSubItem('condition', data);
            break;
        case 'editor-edit-action':
            triggerManager.editSubItem('action', data);
            break;

        case 'editor-quest-add-stage':
            questManager.addStage();
            break;
        case 'editor-quest-edit-stage':
            questManager.editStage(data);
            break;
        case 'editor-quest-del-stage':
            questManager.removeStage(data);
            break;

        case 'editor-dialog-node-add':
            dialogManager.addDialogNode();
            break;

        case 'editor-dialog-node-edit':
            // Открываем поп-ап редактирования конкретного узла
            dialogManager.editDialogNode(data);
            break;

        case 'editor-dialog-node-del':
            const d = editor.workingList[currentEditorIndex];
            if (confirm(`Удалить узел ${d.nodes[data].id}?`)) {
                d.nodes.splice(data, 1);
                editor.refreshDialogSections(d);
            }
            break;
        case 'editor-node-line-add':
            // Добавление новой реплики NPC или Игрока внутрь узла
            dialogManager.addDialogueLine(data.idx, data.type);
            break;

        // case 'editor-add-character':
        //     editor.addCharacter();
        //     break;
        case 'editor-short':
            editor.toggleShortList(e);
            break;
        case 'editor-clear-rel':
            editor.clearRelation();
            break;
        case 'editor-add-family':
            editor.addFamily();
            break;
        case 'editor-remove-family':
            editor.removeFamily(data);
            break;
        case 'editor-add-faction':
            editor.addFaction();
            break;
        case 'editor-remove-faction':
            editor.removeFaction(data);
            break;
        case 'editor-add-friend':
            editor.addFriend();
            break;
        case 'editor-remove-friend':
            editor.removeFriend(data);
            break;



        case 'dices-global-roll':
            dices.rollGlobal(data);
            break;
        case 'dices-roll':
            dices.processRolls();
            break;
        case 'dices-add-player':
            dices.addDicePlayer();
            break;
        case 'dices-remove-player':
            dices.deleteDicePlayer(e.target);
            break;
        case 'inventory-remove-item':
            inventoryManager.removeItem(data);
            characterManager.renderInventory(characterManager.char);
            break;
        case 'inventory-use-item':
            inventoryManager.use(data);
            characterManager.renderInventory(characterManager.char);
            break;
        case 'char-open':
            characterManager.open(data);
            break;
        case 'char-roll':
            characterManager.roll();
            break;
        case 'char-open-window':
            // characterManager.open(data);
            playerHUD.toggleHeroSheet(data);
            break;
        case 'char-close-window':
            playerHUD.close();
            break;
        case 'char-tab-window':
            playerHUD.currentTab = data;
            playerHUD.contentTab.innerHTML = '';
            playerHUD.switchTab(el);
            break;
        case 'char-modify-relations':
            characterManager.modifyRelation(data.char, data.target, Number(data.value));
            break;
        case 'char-item-effects':
            inventoryManager.showItemDetails(data.name, data.itemInfo);
            // alert(`${data.name}\n${effects}`);
            break;
        case 'char-add-item':
            if (characterManager.itemSelect.value) {
                inventoryManager.addItem(characterManager.char, characterManager.itemSelect.value);
                characterManager.open(characterManager.char.id);
            }
            break;
        case 'char-add-party':
            if (characterManager.partySelect.value) {
                partyManager.joinParty(characterManager.char.id, characterManager.partySelect.value);
                characterManager.open(characterManager.char.id);
            }
            break;
        case 'char-save':
            controls.createPopup('char-editor-popup', 'char-editor-popup', characterManager.container);
            break;
        case 'char-leave-party':
            partyManager.leaveParty(data);
            characterManager.renderParty(characterManager.char.id);
            break;


        case 'global-map-collapse-controls':
            map.handleButtons(data);
            break;
        case 'global-map-season-add':
            main.addSeason();
            break;
        case 'global-map-season-select':
            season = gameData.seasons.find(s=>Number(s.id)===Number(val));
            if(season) {
                map.controls.classList.add('season-selected');
            }
            else {
                map.controls.classList.remove('season-selected');
            }
            break;
        case 'global-map-season-load':
            season = gameData.seasons.find(s=>Number(s.id)===Number(map.mapSeasonSelect.value));
            map.mapWrapper.innerHTML = '';
            main.setCurrentSeason(season);
            map.render(true);
            break;
        case 'global-map-season-save':
            main.saveCurrentSeason();
            break;
        case 'global-map-season-del':
            main.delSeason(Number(this.mapSeasonSelect.value));
            map.mapSeasonSelect.value = -1;
            map.controls.classList.remove('season-selected');
            break;
        case 'notes-add':
            if(!map.notesTextArea.value.trim()) return;
            currentSeason.notes.push({
                id: Date.now(),
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                text: map.notesTextArea.value
            });
            map.notesTextArea.value = '';
            map.refreshNotes();
            main.saveCurrentSeason();
            break;




        case 'tf-map-resize':
            tacticalMap.initGrid();
            break;
        case 'tf-add-mode':
            tacticalMap.setMode(data);
            el.classList.add('active');
            break;
        case 'tf-toggle-mode':
            tacticalMap.toggleMode(e);
            break;
        case 'tf-gen-map':
            const type = map.selects.generatorType.value;
            const coef = Number(map.inputs.generatorNum.value);
            console.log(type, coef);
            if(type && coef) {
                tacticalHexGenerator.generate(type, Number(map.inputs.mapRows.value), Number(map.inputs.mapCols.value), {coef});
            }
            break;
        case 'tf-save-map':
            // const name = prompt("Введите название карты:", `Map ${gameData[currentGame].tacticalMaps.length + 1}`);
            if (tacticalMap.mapName && tacticalMap.mapId) {
                mapManager.saveMap(tacticalMap.mapName);
                // tacticalMap.updateMapList(); // Обновить список в селекторе
            }
            break;
        case 'tf-char-symbol':
            this.selectedCharLink.symbol = data;
            document.querySelectorAll('.symbol-btn').forEach(el => el.classList.remove('active'));
            el.classList.toggle('active');
            tacticalMap.update();
            break;







        case 'avatar-click':
            controls.createPopup('image-popup', 'image-popup', avatars[data]);
            break;
        case 'fullheight-click':
            controls.createPopup('image-popup', 'image-popup', fullheight[data]);
            break;
        case 'text-popup':
            controls.createPopup('text-popup', 'text-popup', createEl('div', '', data));
            break;
        case 'social-graph':
            socialGraph.popUp(data);
            break;
        case 'graph-go-to-loc':
            document.getElementById('graph-popup').remove();
            controls.changeTab('map');
            // setTimeout(() => {
            //     // Мы используем данные, которые пришли из dataset
            //     clickLocMap({ srcElement: { id: `loc-${id}`, data: locName } });
            // }, 100);
            break;
        case 'graph-recenter':
            // Просто перерисовываем граф от новой ноды
            const obj = socialGraph.getObject(id, kind);
            if (obj) socialGraph.draw(obj);
            break;
        case 'popup-close':
            if (e.target.id === data) e.target.remove();
            break;
        case 'list-item':
            list.clickItem(data);
            break;
        case 'search-item':
            searchEngine.clickItem(data);
            break;
        case 'char-gen-save':
            generator.confirmSave(e);
            break;
        case 'char-gen-create':
            generator.generateDraft(e);
            break;
        case 'char-gen-cancel':
            elementById('gen-popup').remove();
            break;
        case 'map-top-controls-collapse':
            el.parentElement.classList.toggle('collapsed');
            break;
        case 'global-turn-end':
            turnManager.globalTurn();
            break;
        case 'char-ability-select':
            tacticalMap.selectedAbility = data;
            tacticalMap.abilityTarget = null;
            tacticalMap.update();

            playerHUD.renderAbilitiesConfirm();
            elementById('hero-sheet').remove();
            break;
        case 'char-ability-confirm':
            if (tacticalMap.selectedAbility && tacticalMap.abilityTarget) {
                battleManager.executeAbility(
                    tacticalMap.activeUnit,
                    tacticalMap.abilityTarget.q,
                    tacticalMap.abilityTarget.r,
                    tacticalMap.selectedAbility
                );
                tacticalMap.selectedAbility = null;
                tacticalMap.abilityTarget = null;
            }
            break;
        case 'char-ability-cancel':
            tacticalMap.selectedAbility = null;
            tacticalMap.abilityTarget = null;
            elementById("confirm-action-box").remove();
            tacticalMap.update();
            break;
        case 'cell-event-save':
            const cell = tacticalMap.gridData[key];
            if (tacticalMap.eventTypeSelect.value === 'none') {
                delete cell.event;
            } else {
                cell.event = {
                    type: tacticalMap.eventTypeSelect.value,
                    text: tacticalMap.eventTextArea.value,
                    once: tacticalMap.eventOnceSelect.checked,
                    fired: false
                };
            }
            console.log("Клетка сохранена", cell);
            break;
        case 'cell-special-flag':
            document.querySelectorAll('.map-flag-btn').forEach(b => b.classList.remove('active'));
            if (map.activeHexFlag === data.id) {
                map.activeHexFlag = null;
            } else {
                map.activeHexFlag = data.id;
                el.classList.add('active');
            }
            break;
        case 'inventory-toggle-equip':
            // data: { charId, instanceId }
            inventoryManager.toggleEquip(data.charId, data.instanceId);
            break;
        case 'inventory-use-consumable':
            inventoryManager.useConsumable(data.charId, data.instanceId);
            break;
        case 'inventory-item-details':
            // Вызывается при клике на иконку в сетке инвентаря
            const char = characterManager.getCharacterById(data.charId);
            const itemInstance = char.inventory.find(i => i.instanceId === data.instanceId);
            const itemProto = _data.items.find(p => p.id === itemInstance.id);

            inventoryManager.showItemDetails(itemProto, itemInstance, char.id);
            break;
        case 'inventory-equip-request':
            // eventData.data: { charId, slot }
            inventoryManager.handleEquipRequest(data.charId, data.slot);
            break;
        case 'dialog-start':
            dialogManager.open(data);
            break;
        case 'dialog-next':
            dialogManager.clickOption(data);
            break;
        case '':

            break;
        case '':

            break;
        case 'map-inner-enter':
            mapManager.openInnerMap(data);
            break;
        case '':

            break;
        case '':

            break;
        case '':

            break;
        case '':

            break;
        case 'left-menu-tab':
            controls.clickTab2(data);
            break;
        case 'left-menu-tab-inner':
            controls.changeTab(data);
            break;
        case 'menu-icon':
            controls.clickMenuIcon(el);
            break;
    }
};

// elementById('left-menu').onclick = (e)=> {
//     const now = Date.now();
//     if (lastClickTime && (now - lastClickTime < 200)) {
//         console.warn("Слишком быстрый клик (защита от дребезга)");
//         return; // Игнорируем клики чаще 5 раз в секунду
//     }
//     lastClickTime = now;
//
//     const target = e.target.closest('[data-data]');
//     if (!target) return;
//
//     const val = e.target.value;
//     const el = e.target;
//     if (!e.target.dataset || !e.target.dataset.data) return;
//
//     const dataset = JSON.parse(e.target.dataset.data || '{}');
//
//     const {type, name, data} = dataset;
//
//     let season;
//
//     switch (name) {
//         case 'left-menu-tab':
//             controls.clickTab2(data);
//             break;
//         case 'left-menu-tab-inner':
//             controls.changeTab(data);
//             break;
//     }
// };
//
// document.getElementsByTagName('header')[0].onclick = (e)=> {
//     const now = Date.now();
//     if (lastClickTime && (now - lastClickTime < 200)) {
//         console.warn("Слишком быстрый клик (защита от дребезга)");
//         return; // Игнорируем клики чаще 5 раз в секунду
//     }
//     lastClickTime = now;
//
//     const target = e.target.closest('[data-data]');
//     if (!target) return;
//
//     const val = e.target.value;
//     const el = e.target;
//     if (!e.target.dataset || !e.target.dataset.data) return;
//
//     const dataset = JSON.parse(e.target.dataset.data || '{}');
//
//     const {type, name, data} = dataset;
//
//     let season;
//
//     switch (name) {
//         case 'left-menu-tab':
//             controls.clickTab2(data);
//             break;
//         case 'left-menu-tab-inner':
//             controls.changeTab(data);
//             break;
//     }
// };

function changeHandle(e) {

}