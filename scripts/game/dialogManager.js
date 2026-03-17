const dialogs = {
    "blacksmith": {
        "root": {
            text: "Слышишь этот звон? Это поет лучшая сталь в Де Лис! Нужен новый клинок, милорд Пьер?",
            options: [
                { text: "Показать товары", next: "trade" },
                { text: "Расскажи о своей работе", next: "about" },
                { text: "Уйти", action: "close" }
            ]
        },
        "trade": {
            text: "Вот, взгляни на эти заготовки. Качество гарантирую.",
            action: "open_trade",
            options: [
                { text: "Назад", next: "root" }
            ]
        },
        "about": {
            text: "Мой дед ковал мечи еще для первых герцогов. Сейчас времена поспокойнее, но заказов от стражи хватает.",
            options: [
                { text: "Назад", next: "root" }
            ]
        }
    },
    "tavern": {
        "root": {
            text: "Добро пожаловать в 'Хмельной Гекс'! Пива, вина или свежих сплетен?",
            options: [
                { text: "Купить выпивку и еду", next: "trade" },
                { text: "Кто здесь околачивается?", next: "characters" },
                { text: "Уйти", action: "close" }
            ]
        },
        "characters": {
            text: "Да всё те же... О, видишь ту девушку в углу? Это Мария. Она ищет приключений на свою голову.",
            options: [
                { text: "Поговорить с Марией (Нанять)", action: "talk_maria" },
                { text: "Назад", next: "root" }
            ]
        }
    },
    "graveyard": {
        "root": {
            text: "Тсс... Здесь покоятся те, кто уже отвоевал своё. Зачем вы здесь в такой час?",
            options: [
                { text: "Почтить память павших", next: "pray" },
                { text: "Осмотреть старые склепы", next: "search" },
                { text: "Уйти", action: "close" }
            ]
        },
        "pray": {
            text: "Вы склоняете голову. Становится спокойнее... (Мораль +1)",
            options: [
                { text: "Назад", next: "root" }
            ]
        }
    }
};

const dialogManager = {
    container: null,
    dialog: null,
    history: [], // Стек для кнопки "Назад" (сохраняем!)
    charId: null,
    currentNpcId: null,
    type: '',

    // Открытие диалога (Твоя логика с проверкой активного юнита и дефолтным роутом)
    open(npcId, type = null, _npc = null) {
        const {gridData, activeUnit} = hexFunction.data;
        if(!activeUnit) return;

        this.charId = activeUnit.id;
        this.currentNpcId = _npc ? type : npcId;
        this.type = type;
        this.history = ["root"];

        // Твоя логика: если диалога нет в базе — генерируем дефолтный (Роман, Группа и т.д.)
        if(!data.dialogs[this.currentNpcId]) {
            data.dialogs[this.currentNpcId] = {
                nodes: [
                    {
                        id: "root",
                        text: "Greetings", // Поддержка старого формата текста
                        player: [ // Переходим на структуру player[] для ответов
                            {text: "Улучшить отношения на 5", action: "changeRelations", value: 5},
                            {text: "Ухудшить отношения на 5", action: "changeRelations", value: -5},
                            {text: "Добавить в группу", action: "joinParty"},
                            {text: "Начать роман", action: "romance"},
                            {text: "Уйти", action: "close"}
                        ]
                    }
                ]
            };
        }

        this.dialog = data.dialogs[this.currentNpcId];
        const npc = _npc || characterManager.getCharacterById(npcId);

        // Твоя верстка окна (сохраняем структуру с портретом)
        if(!this.container) {
            this.container = createEl('div', 'dialog-overlay', 0, null, 'dialog-overlay');
            this.container.innerHTML = `
                <div class="dialog-window">
                    <div class="npc-portrait">
                        <img id="npc-img" src="${avatars[npc.id]}" alt="NPC">
                        <div id="npc-name">${npc.name}</div>
                    </div>
                    <div class="dialog-content">
                        <div id="dialog-text"></div>
                        <div id="dialog-options"></div>
                    </div>
                </div>`;
            map.container.parentElement.append(this.container);
        }

        document.getElementById('npc-img').src = avatars[npc.id];
        document.getElementById('npc-name').innerText = npc.name;
        document.getElementById('dialog-overlay').classList.remove('interaction-hidden');

        this.renderStep("root");
    },

    // Рендер шага (поддержка и npc[] из старого проекта, и обычного text)
    renderStep(stepId) {
        // Ищем узел в массиве nodes (как в Angular) или по ключу (как сейчас)
        const step = this.dialog.nodes ? this.dialog.nodes.find(n => n.id === stepId) : this.dialog[stepId];
        if (!step) return this.close();

        const textEl = document.getElementById('dialog-text');
        const optionsEl = document.getElementById('dialog-options');

        // Логика: если есть массив npc[] (из Angular) — берем первый, иначе старый text
        textEl.innerText = step.npc ? step.npc[0].text : step.text;

        // Если у реплики есть звук — играем (из старого кода)
        if (step.npc?.[0].sound) audioManager.play(step.npc[0].sound);

        optionsEl.innerHTML = '';

        // Рендерим опции (поддержка player[] и старого options[])
        const options = step.player || step.options || [];
        options.forEach(opt => {
            if (opt.conditions && opt.conditions.length > 0) {
                const canShow = opt.conditions.every(cond =>
                    triggerManager.evaluateCondition(cond, [this.currentNpcId, opt.id])
                );
                if (!canShow) return; // Пропускаем отрисовку этой кнопки
            }

            const btn = document.createElement('button');
            btn.className = "opt-btn";
            btn.innerText = opt.text;
            // Сохраняем твой формат dataset для глобального слушателя
            btn.dataset.data = JSON.stringify({
                type: 'click',
                name: 'dialog-next',
                data: opt,
                nodeId: stepId // Добавляем ID узла для триггеров
            });
            optionsEl.appendChild(btn);
        });
    },

    // Твоя полная логика клика по опции
    clickOption(opt) {
        // 1. Системные экшены (твои: торговля, отношения, группа)
        if(opt.action) {
            if (opt.action === "close") return this.close();
            if (opt.action === "trade") this.showTradeGoods();
            else if (opt.action === "changeRelations") {
                characterManager.modifyRelation(this.charId, this.currentNpcId, Number(opt.value));
            }
            else if(opt.action === "joinParty") {
                partyManager.joinParty(this.charId, this.currentNpcId);
            }
            else if(opt.action === "romance") {
                characterManager.modifyRomances(this.charId, this.currentNpcId, true);
            }
            // Добавляем вызов универсального экшена триггеров (если есть)
            else {
                triggerManager.executeActions([{type: opt.action, params: opt.params || []}]);
            }
        }

        // 2. Генерируем ТРИГГЕР (DialogueOption) для квестов (как в Angular)
        triggerManager.checkTrigger('dialogueOption', [this.currentNpcId, opt.id || opt.next]);

        // 3. Переход (Next)
        if (opt.next) {
            this.history.push(opt.next);
            this.renderStep(opt.next);
        } else if (!opt.action) {
            this.close();
        }
    },

    showTradeGoods() {
        console.log("🛒 Торговля: " + this.currentNpcId);
    },

    close() {
        const el = document.getElementById('dialog-overlay');
        if (el) el.remove();
        this.dialog = null;
    },

    // Добавление нового узла
    addDialogNode() {
        const d = editor.workingList[currentEditorIndex];
        if (!d.nodes) d.nodes = [];

        const id = `node_${Date.now()}`;
        d.nodes.push({
            id: id,
            name: 'Новый узел',
            npc: [],
            player: []
        });

        editor.refreshDialogSections(d);
    },

    // Открытие Поп-апа узла
    editDialogNode(index) {
        const d = editor.workingList[currentEditorIndex];
        const node = d.nodes[index];

        let html = `<h3>Узел: ${node.id}</h3>
            <div class="row">ID узла <input id="node-id-input" value="${node.id}" ${node.id === 'root' ? 'disabled' : ''} 
                data-data='{"type":"input","name":"editor-node-id-change","data":${index}}'></div>
            
            <div class="separator"></div>
            <h4>Фразы NPC</h4>
            <div id="npcLinesList" class="editor-sub-list"></div>
            <button class="primary add" data-data='{"type":"click","name":"editor-node-line-add","data":{"idx":${index},"type":"npc"}}'>+ Фраза NPC</button>

            <div class="separator"></div>
            <h4>Ответы Игрока</h4>
            <div id="playerLinesList" class="editor-sub-list"></div>
            <button class="primary add" data-data='{"type":"click","name":"editor-node-line-add","data":{"idx":${index},"type":"player"}}'>+ Ответ игрока</button>
        `;

        controls.createPopup('dialog-node-popup', 'char-editor-popup', html);
        dialogManager.refreshNodeLines(node, index);
    },

    addDialogueLine(nodeIdx, type) {
        const node = editor.workingList[currentEditorIndex].nodes[nodeIdx];
        if (!node[type]) node[type] = [];
        node[type].push({ text: "" }); // Для игрока можно добавить { text: "", next: "" }
        dialogManager.editDialogNode(nodeIdx); // Перерисовываем поп-ап, чтобы появилась новая строка
    },

    // Рендер строк внутри поп-апа узла
    refreshNodeLines(node, nodeIdx) {
        // Рендерим NPC фразы
        editor.renderListSection("npcLinesList", node.npc || [], (line, i) => {
            return `<div class="row">
                <input type="text" value="${line.text || ''}" placeholder="Текст NPC..." 
                    data-data='{"type":"input","name":"editor-line-text","data":{"n":${nodeIdx},"l":${i},"t":"npc"}}'>
            </div>`;
        });

        // Рендерим ответы игрока
        editor.renderListSection("playerLinesList", node.player || [], (line, i) => {
            const d = editor.workingList[currentEditorIndex];
            const nextSelect = editor.makeOptions(d.nodes.map(n => n.id), line.next);

            return `<div class="row row-cols">
                <input class="col" type="text" value="${line.text || ''}" placeholder="Ответ..." 
                    data-data='{"type":"input","name":"editor-line-text","data":{"n":${nodeIdx},"l":${i},"t":"player"}}'>
                <select class="col half" data-data='{"type":"change","name":"editor-line-next","data":{"n":${nodeIdx},"l":${i}}}'>
                    <option value="">Конец</option>
                    ${nextSelect}
                </select>
            </div>`;
        });
    },

    // Открытие Поп-апа узла
    editDialogNode(index) {
        const d = editor.workingList[currentEditorIndex];
        const node = d.nodes[index];

        let html = `<h3>Узел: ${node.id}</h3>
            <div class="row">ID узла <input id="node-id-input" value="${node.id}" ${node.id === 'root' ? 'disabled' : ''} 
                data-data='{"type":"input","name":"editor-node-id-change","data":${index}}'></div>
            
            <div class="separator"></div>
            <h4>Фразы NPC</h4>
            <div id="npcLinesList" class="editor-sub-list"></div>
            <button class="primary add" data-data='{"type":"click","name":"editor-node-line-add","data":{"idx":${index},"type":"npc"}}'>+ Фраза NPC</button>

            <div class="separator"></div>
            <h4>Ответы Игрока</h4>
            <div id="playerLinesList" class="editor-sub-list"></div>
            <button class="primary add" data-data='{"type":"click","name":"editor-node-line-add","data":{"idx":${index},"type":"player"}}'>+ Ответ игрока</button>
        `;

        controls.createPopup('dialog-node-popup', 'char-editor-popup', html);
        dialogManager.refreshNodeLines(node, index);
    },

    // Рендер строк внутри поп-апа узла
    refreshNodeLines(node, nodeIdx) {
        // Рендерим NPC фразы
        editor.renderListSection("npcLinesList", node.npc || [], (line, i) => {
            return `<div class="row">
                <input type="text" value="${line.text || ''}" placeholder="Текст NPC..." 
                    data-data='{"type":"input","name":"editor-line-text","data":{"n":${nodeIdx},"l":${i},"t":"npc"}}'>
            </div>`;
        });

        // Рендерим ответы игрока
        editor.renderListSection("playerLinesList", node.player || [], (line, i) => {
            const d = editor.workingList[currentEditorIndex];
            const nextSelect = editor.makeOptions(d.nodes.map(n => n.id), line.next);

            return `<div class="row row-cols">
                <input class="col" type="text" value="${line.text || ''}" placeholder="Ответ..." 
                    data-data='{"type":"input","name":"editor-line-text","data":{"n":${nodeIdx},"l":${i},"t":"player"}}'>
                <select class="col half" data-data='{"type":"change","name":"editor-line-next","data":{"n":${nodeIdx},"l":${i}}}'>
                    <option value="">Конец</option>
                    ${nextSelect}
                </select>
                <!-- КНОПКА УСЛОВИЙ -->
                <button class="primary empty" data-data='{"type":"click","name":"editor-line-cond","data":{"n":${nodeIdx},"l":${i}}}'>
                    ${(line.conditions && line.conditions.length) ? '🎯 ('+line.conditions.length+')' : '🎯'}
                </button>
            </div>`;
        });
    },

    editReplyConditions(nIdx, lIdx) {
        const node = editor.workingList[currentEditorIndex].nodes[nIdx];
        const reply = node.player[lIdx];

        let html = `<h3>Условия реплики: "${reply.text.substring(0, 20)}..."</h3>
                <div id="replyConditionsList" class="char-chips"></div>
                <button class="primary add" data-data='{"type":"click","name":"editor-reply-cond-add","data":{"n":${nIdx},"l":${lIdx}}}'>
                    + Добавить условие
                </button>
                <button class="primary" data-data='{"type":"click","name":"editor-dialog-node-edit","data":${nIdx}}'>
                    Назад к узлу
                </button>`;

        // Меняем содержимое текущего поп-апа на форму условий
        const popupBody = document.querySelector('.char-editor-popup');
        if (popupBody) popupBody.innerHTML = html;

        // Отрисовываем список условий через твой стандартный метод
        editor.renderListSection("replyConditionsList", reply.conditions || [], (cond, i) => {
            return `<div class="chip-item">
                    <span data-data='{"type":"click","name":"editor-reply-cond-edit","data":{"n":${nIdx},"l":${lIdx},"c":${i}}}'>
                        ${cond.type}
                    </span>
                    <button class="del-mini" data-data='{"type":"click","name":"editor-reply-cond-del","data":{"n":${nIdx},"l":${lIdx},"c":${i}}}'>×</button>
                </div>`;
        });
    },


};


// const dialogManager = {
//     container: null,
//     dialog: null,
//     history: [], // Стек для кнопки "Назад"
//     charId: null,
//     currentNpcId: null,
//     type: '',
//
//     open(npcId, type = null, _npc = null) {
//         const {gridData, activeUnit} = hexFunction.data;
//         if(!activeUnit) return;
//
//         this.charId = activeUnit.id;
//
//         this.currentNpcId = _npc ? type : npcId;
//         this.type = type;
//         this.history = ["root"]; // Сбрасываем историю на корень
//
//         if(!dialogs[this.currentNpcId]) {
//             dialogs[this.currentNpcId] = {
//                 "root": {
//                     text: "Greetings",
//                     options: [
//                         {text: "Улучшить отношения на 5", action: "changeRelations", value: 5},
//                         {text: "Ухудшить отношения на 5", action: "changeRelations", value: -5},
//                         {text: "Добавить в группу", action: "joinParty"},
//                         {text: "Начать роман", action: "romance"},
//                         { text: "Уйти", action: "close" }
//                     ]
//                 },
//             };
//         }
//
//         this.dialog = dialogs[this.currentNpcId];
//
//         // if(!_npc) {
//         //     this.dialog['root'].options.unshift();
//         //     this.dialog['root'].options.unshift();
//         //     this.dialog['root'].options.unshift();
//         //     this.dialog['root'].options.unshift();
//         // }
//
//         const npc = _npc || characterManager.getCharacterById(npcId);
//
//         if(!this.container) {
//             this.container = createEl('div', 'dialog-overlay',0, null, 'dialog-overlay');
//             this.container.innerHTML = `
//                     <div class="dialog-window">
//                         <div class="npc-portrait">
//                             <img id="npc-img" src="${avatars[npc.id]}" alt="NPC">
//                             <div id="npc-name">${npc.name}</div>
//                         </div>
//                         <div class="dialog-content">
//                             <div id="dialog-text"></div>
//                             <div id="dialog-options"> </div>
//                         </div>
//                     </div>`;
//             map.container.parentElement.append(this.container);
//         }
//
//
//         document.getElementById('npc-img').src = avatars[npc.id];//npc.avatar;
//         document.getElementById('npc-name').innerText = npc.name;
//         document.getElementById('dialog-overlay').classList.remove('interaction-hidden');
//
//         // class="interaction-hidden"
//
//         // elementById('main-wrapper').append(dialog);
//         dialogManager.renderStep("root");
//     },
//
//     openDialog(npcId, dialog = null) {
//         dialogManager.open(npcId);
//         if(dialog) {
//             dialogManager.renderStep(dialog);
//         }
//     },
//
//     renderStep(stepId) {
//         const step = this.dialog[stepId];
//         const textEl = document.getElementById('dialog-text');
//         const optionsEl = document.getElementById('dialog-options');
//
//         textEl.innerText = step.text;
//         optionsEl.innerHTML = '';
//
//         step.options.forEach(opt => {
//             const btn = document.createElement('button');
//             btn.className = "opt-btn";
//             btn.innerText = opt.text;
//             btn.dataset.data = JSON.stringify({type:'click',name:'dialog-next', data:opt});
//             optionsEl.appendChild(btn);
//         });
//     },
//
//     clickOption(opt) {
//         if(opt.action) {
//             if (opt.action === "close") return dialogManager.close();
//             if (opt.action === "trade") {
//                 dialogManager.showTradeGoods();
//             }
//             else if (opt.action === "changeRelations") {
//                 characterManager.modifyRelation(dialogManager.charId, dialogManager.currentNpcId, Number(opt.value));
//             }
//             else if(opt.action === "joinParty") {
//                 partyManager.joinParty(dialogManager.charId, dialogManager.currentNpcId);
//             }
//             else if(opt.action === "romance") {
//                 characterManager.modifyRomances(dialogManager.charId, dialogManager.currentNpcId, true);
//             }
//         }
//
//         if (opt.next) {
//             dialogManager.history.push(opt.next);
//             dialogManager.renderStep(opt.next);
//         }
//     },
//
//     showTradeGoods() {
//         // Здесь мы вставляем в блок диалога список товаров или
//         // вызываем отдельное окно магазина поверх
//         console.log("🛒 Открыт интерфейс торговли для " + this.currentNpcId);
//     },
//
//     close() {
//         // document.getElementById('dialog-overlay').classList.add('interaction-hidden');
//         document.getElementById('dialog-overlay').remove();
//         dialogManager.dialog = null;
//     }
// };

const interactionManager = {
    openBuilding(type, cell) {
        console.log(`🏠 Входим в здание: ${type}`);

        switch(type) {
            case 'blacksmith':
                this.showTradeMenu('Кузница', ['sword', 'shield', 'plate_armor']);
                break;
            case 'tavern':
                this.showTavernMenu(cell);
                break;
            case 'market':
                this.showTradeMenu('Рынок', ['food', 'wood', 'ore', 'luxury']);
                break;
            case 'townhall':
                this.showPoliticsMenu();
                break;
            case 'door':
                this.leaveCity();
                break;
            default:
                console.log("Это просто здание, здесь никого нет.");
        }
    },
};
