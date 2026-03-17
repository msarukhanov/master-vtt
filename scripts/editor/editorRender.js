const editorRender = {

    locationSelect(value, id) {
        const options = data.locations.map(l =>
            `<option ${l.name === value ? "selected" : ""}>${l.name}</option>`
        ).join("");
        return `<select id="${id}"><option value=""></option>${options}</select>`;
    },

    multiSelect(value, id, type) {
        const options = ((data[type]||[]).filter(i=>i.id)).map(c =>
            `<option value="${c.id}" ${c.id === value ? "selected" : ""}>${c.name}</option>`
        ).join("");
        return `<select id="${id}"><option value=""></option>${options}</select>`;
    },

    characterSelect(value, id) {
        const options = (this.workingList.filter(i=>i.id)).map(c =>
            `<option value="${c.id}" ${c.id === value ? "selected" : ""}>${c.name}</option>`
        ).join("");
        return `<select id="${id}"><option value=""></option>${options}</select>`;
    },
    classSelect(value, id) {
        const options = data.classes.map(l =>
            `<option ${l.name === value ? "selected" : ""}>${l.name}</option>`
        ).join("");
        return `<select id="${id}"><option value=""></option>${options}</select>`;
    },
    raceSelect(value, id) {
        const options = data.races.map(l =>
            `<option ${l.name === value ? "selected" : ""}>${l.name}</option>`
        ).join("");
        return `<select id="${id}"><option value=""></option>${options}</select>`;
    },
    peopleSelect(value, id) {
        const options = data.peoples.map(l =>
            `<option ${l.name === value ? "selected" : ""}>${l.name}</option>`
        ).join("");
        return `<select id="${id}"><option value=""></option>${options}</select>`;
    },

    refreshTriggerSections(c) {
        // Используем твой tpl для отрисовки "чипсов" триггера
        this.renderListSection("conditionsList", c.conditions || [], (item, i) => {
            return `<span data-data='{"type":"click","name":"editor-edit-condition","data":${i}}'>${item.type}</span>
                    <button class="small del round" data-data='{"type":"click","name":"editor-del-condition","data":${i}}'>×</button>`;
        });

        this.renderListSection("actionsList", c.actions || [], (item, i) => {
            return `<span data-data='{"type":"click","name":"editor-edit-action","data":${i}}'>${item.type}</span>
                    <button class="small del round" data-data='{"type":"click","name":"editor-del-action","data":${i}}'>×</button>`;
        });
    },

    refreshQuestSections(c) {
        this.renderListSection("stagesList", c.stages || [], (item, i) => {
            const trigger = (data.triggers || []).find(t => t.id === item.triggerId);
            const triggerName = trigger ? (trigger.name || trigger.id) : 'Триггер не выбран';
            // return `<div class="chip-item ${currentEditorIndex2 === i ? 'active' : ''}">
            //             <span data-data='{"type":"click","name":"editor-quest-edit-stage","data":${i}}'>
            //                 ${i + 1}. ${triggerName}
            //             </span>
            //             <button class="del-mini" data-data='{"type":"click","name":"editor-quest-del-stage","data":${i}}'>×</button>
            //         </div>`;

            return `<span data-data='{"type":"click","name":"editor-quest-edit-stage","data":${i}}'>${triggerName}</span>
                    <button class="small del round" data-data='{"type":"click","name":"editor-quest-del-stage","data":${i}}'>×</button>`;
        });
    },

    renderStageForm(index) {
        const c = this.workingList[currentEditorIndex];
        const stage = c.stages[index];
        const box = elementById("stageDetails");
        if (!box) return;

        box.innerHTML = `
            <div class="row">Привязанный триггер
                ${this.multiSelect(stage? stage.triggerId: '', "stage-trigger-select", "triggers")}
            </div>
            <div class="row">Текст стадии (для игрока)
                <textarea id="stage-text" data-data='{"type":"input","name":"editor-quest-stage-text","data":${index}}'>${stage? stage.text: '' || ''}</textarea>
            </div>
        `;

        // Вешаем событие на селект триггера
        const select = elementById("stage-trigger-select");
        select.dataset.data = JSON.stringify({"type":"change","name":"editor-quest-stage-trigger-change","data":index});
    },

    // Блок настройки камер и стиля (View Modes)
    formDialogView(c) {
        if (!c.customView) c.customView = { customViewMode: '2sides' };
        return `
            <div class="row row-cols">
                <div class="col">Режим вида
                    <select id="customViewMode">${this.makeOptions(['2sides', 'closeUp'], c.customView.customViewMode)}</select>
                </div>
                <div class="col">Стиль окна
                    <select id="boxStyle">${this.makeOptions(['box', 'circle'], c.customView.boxStyle)}</select>
                </div>
            </div>
            <div class="row row-cols">
                <div class="col">Цвет фона <input type="color" id="dialogFill" value="${c.customView.fill || '#000000'}"></div>
                <div class="col">Прозрачный <input type="checkbox" id="dialogTransp" ${c.customView.fill === 'transparent' ? 'checked' : ''}></div>
            </div>`;
    },

    // Основной список узлов (Nodes)
    formDialogLogic(c) {
        return `
            <div class="dialog-structure">
                <h3>Узлы диалога (Nodes)</h3>
                <div class="char-chips" id="nodesList"></div>
                <button class="primary add" type="button" data-data='{"type":"click","name":"editor-dialog-node-add"}'>+ Добавить узел</button>
            </div>`;
    },

    // Обновление списка узлов
    refreshDialogSections(c) {
        this.renderListSection("nodesList", c.nodes || [], (node, i) => {
            return `<span data-data='{"type":"click","name":"editor-dialog-node-edit","data":${i}}'>
                        ${node.id === 'root' ? '🚩 ' : ''}${node.name || node.id}
                   </span>
                   <button class="small del round" disabled="${node.id === 'root'}" data-data='{"type":"click","name":"editor-dialog-node-del","data":${i}}'>×</button>`;
        });
    },

    renderButtons(isNew=false) {
        const actions = createEl('div', 'actions');
        const btnSave = createEl('button', 'primary add');
        btnSave.innerHTML = assets.icons.save;
        btnSave.dataset.data = JSON.stringify({"type":"click","name":"editor-item-save"});

        actions.append(btnSave);
        if(!isNew) {
            const btnClone = createEl('button', 'primary empty');
            btnClone.innerHTML = assets.icons.stack;
            btnClone.dataset.data = JSON.stringify({"type":"click","name":"editor-item-clone"});

            const btnDel = createEl('button', 'primary del');
            btnDel.innerHTML = assets.icons.erase;
            btnDel.dataset.data = JSON.stringify({"type": "click", "name": "editor-item-del"});

            actions.append(btnClone, btnDel);
        }
        return `<div class="actions">${actions.innerHTML}</div>`;
    },
    // <div class="actions">
    // <button class="primary save" data-data='{"type":"click","name":"editor-item-save"}'>${l10n[lang].save}</button>
    // <button class="primary del" data-data='{"type":"click","name":"editor-item-del"}'>${l10n[lang].del}</button>
    // </div>
    renderForm(c) {
        console.log(c);
        const f = elementById("form");

        const formFieldsSettings = gameData[currentGame].app.formFieldsSettings || {};
        const formFields = formFieldsSettings[this.currentType] || {};

    // <div class="row">${l10n[lang].name}
    //         <input type="text" id="name">
    //         </div>
        f.innerHTML = `
         ${editor.renderButtons(c.isNew)}
      
        <div class="row row-cols">
            <div class="col">ID <input id="id" value="${c.id}"></div>
            <div class="col">${l10n[lang].name} <input id="name" value="${c.name}"></div>
        </div>
       
        <div class="row row-cols">
            ${formFields.avatar ? this.formAvatar() : ''}
            ${formFields.fullheight ? this.formFullHeight() : ''}
        </div>
        ${formFields.personal ? this.formPersonal(c) : ''}
        <div class="row row-rows">
            ${formFields.tier ? this.formTier(c) : ''}
            ${formFields.color ? this.formColor(c) : ''}
        </div>
        
        ${formFields.triggerBase ? this.formTriggerBase(c) : ''}
        ${formFields.logic ? this.formTriggerLogic(c) : ''}
        
        ${formFields.questLogic ? this.formQuestLogic(c) : ''}
        
        ${formFields.dialogLogic ? this.formDialogCharacter(c) : ''}
        ${formFields.dialogView ? this.formDialogView(c) : ''}
        ${formFields.dialogLogic ? this.formDialogLogic(c) : ''}

        ${formFields.personal ? this.formProfession(c) : ''}
        ${formFields.locations ? this.formItemLocations(c) : ''}
        
        ${formFields.class ? this.formClass(c) : ''}
        
        ${formFields.races ? this.formRace(c) : ''}
        ${formFields.peoples ? this.formPeople(c) : ''}
        
        ${formFields.ltwh ? this.formLTWH(c) : ''}
        
        ${formFields.appearance ? this.formAppearance() : ''}
        ${formFields.personality ? this.formPersonality() : ''}
        ${formFields.description ? this.formDescription() : ''}
        ${formFields.philosophy ? this.formPhilosophy() : ''}

        ${formFields.relations ? this.formRelations(c) : ''}
        ${formFields.family ? this.formFamily() : ''}
        ${formFields.factions ? this.formFactions() : ''}
        ${formFields.friends ? this.formFriends() : ''}
        
        ${formFields.source ? this.formSource() : ''}
    `;


        const textFields = ['name', 'appearance', 'personality', 'description', 'philosophy'];
        textFields.forEach(field => {
            const el = elementById(field);
            if (el) el.value = c[field] || "";
        });

        if(formFields.avatar) {
            const avatarImg = elementById('avatar');
            if (avatars[c.id]) {
                avatarImg.src = avatars[c.id];
                avatarImg.style.display = 'block';
            }
        }
        if(formFields.fullheight) {
            const fullheightImg = elementById('fullheight');
            if (fullheight[c.id]) {
                fullheightImg.src = fullheight[c.id];
                fullheightImg.style.display = 'block';
            }
        }

        // Инициализация глобальных переменных для быстрого доступа
        familySelect = elementById('familySelect');
        familyType = elementById('familyType');
        friendSelect = elementById('friendSelect');
        factionSelect = elementById('factionSelect');

        if (formFields.family) this.refreshSection("familyList");
        if (formFields.friends) this.refreshSection("friendsList");
        if (formFields.factions) this.refreshSection("factionsList");

        if (formFields.family || formFields.friends || formFields.factions) socialGraph.draw(c);

        if (formFields.logic) {
            this.refreshTriggerSections(c);
        }
        if (formFields.questLogic) {
            this.refreshQuestSections(c);
        }
    },

    makeOptions (list, selected) {
        return list.map(t => `<option ${selected === t ? "selected" : ""}>${t}</option>`).join("")
    },
};