const editorForm = {

    formColor(c) {
        return `<div class="col">
                    ${l10n[lang].color}
                    <input type="color" id="imageInput" accept="image/*" value="${c.color}">
                </div>`;
    },

    formAvatar() {
        return `<div class="col avatar-select">
                    <input type="file" id="imageInput" accept="image/*" onchange="editor.uploadImage(event,'avatar')">
                    <img id="avatar" src="#" alt="Preview" style="display: none;">
                </div>`;
    },

    formFullHeight() {
        return `<div class="col avatar-select">
                    <input type="file" id="imageInput2" accept="image/*" onchange="editor.uploadImage(event,'fullheight')">
                    <img id="fullheight" src="#" alt="Preview" style="display: none;">
                </div>`;
    },

    formItemLocations(c) {
        return `<div class="row">${l10n[lang].location_current} ${this.locationSelect(c.location, "location")}</div>
                <div class="row">${l10n[lang].residence} ${this.locationSelect(c.residence, "residence")}</div>
                <div class="row">${l10n[lang].location_additional} ${this.locationSelect(c.additional, "additional")}</div>`;
    },

    formPersonal(c) {
        let personal = `<div class="row row-cols">
            <div class="col">ID <input id="id" value="${c.id}"></div>
            <div class="col half">${l10n[lang].age} <input id="age" type="number" value="${c.age}"></div>
            <div class="col half">${l10n[lang].gender} <select id="gender">${this.makeOptions(["m", "w"], c.gender)}</select></div>
        </div>`;
        if(data.races || data.peoples) {
            personal += `<div class="row row-cols">`;
            if (data.races) {
                personal += this.formRace(c);
            }
            if (data.peoples) {
                personal += this.formPeople(c);
            }
            personal += `</div>`;
        }
        personal += '</div>';
        return personal;
    },
    formClass(c) {
        return `<div class="row row-cols">
                    <div class="col">${l10n[lang].class} ${this.classSelect(c.class, "class")}</div>
                    <div class="col half">${l10n[lang].level} <input type="number" min="0" id="level" value="${c.level || ''}"></div>
                    <div class="col half">${l10n[lang].exp} <input type="number" min="0" id="exp" value="${c.exp || ''}"></div>
                </div>`;
    },
    formTier(c) {
        return `<div class="row row-cols">
                    <div class="col">${l10n[lang].tier} <input type="number" min="1" id="tier" value="${c.tier || ''}"></div>
                    <div class="col">
                        ${l10n[lang].parent}
                        <select id="parent" class="row-select">
                            <option value=""></option>
                                ${data.factions.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}
                        </select>
                    </div>
                </div>`;
    },
    formProfession(c) {
        return `<div class="row row-cols">
                    <div class="col">${l10n[lang].profession} <input id="profession" value="${c.profession || ''}"></div>
                    <div class="col">${l10n[lang].work} <input id="work" value="${c.work || ''}"></div>
                </div>`;
    },
    formAppearance() {
        return `<div class="row">${l10n[lang].appearance}
                    <textarea id="appearance"></textarea>
                </div>`;
    },
    formPersonality() {
        return `<div class="row">${l10n[lang].personality}
                    <textarea id="personality"></textarea>
                </div>`;
    },
    formDescription() {
        return `<div class="row">${l10n[lang].description}
                    <textarea id="description"></textarea>
                </div>`;
    },
    formPhilosophy() {
        return `<div class="row">${l10n[lang].philosophy}
                    <textarea id="philosophy"></textarea>
                </div>`;
    },

    formDialogCharacter(c) {
        return `<div class="col">${l10n[lang].character} ${this.characterSelect(c.characterId, "characterId")}</div>`;
    },

    formRace(c) {
        return `<div class="col">${l10n[lang].race} ${this.raceSelect(c.race, "race")}</div>`;
    },
    formPeople(c) {
        return `<div class="col">${l10n[lang].people} ${this.peopleSelect(c.people, "people")}</div>`;
    },
    formSource(c) {
        return `<div class="col">${l10n[lang].source}<div class="row"><input id="source" value="${c.source || ''}"></div></div>`;
    },

    formLTWH(c) {
        return `<div class="row row-cols">
                    <div class="col">L (слева) <input type="number" id="l" value="${c.l || 0}"></div>
                    <div class="col">T (сверху) <input type="number" id="t" value="${c.t || 0}"></div>
                </div>
                <div class="row row-cols">
                    <div class="col">W (ширина) <input type="number" id="w" value="${c.w || 40}"></div>
                    <div class="col">H (высота) <input type="number" id="h" value="${c.h || 40}"></div>
                </div>`;
    },

    formRelations(c) {
        return `<h3>${l10n[lang].relation}</h3>
                <div class="row row-cols">
                    <div class="col-3">${l10n[lang].character} ${this.characterSelect(c.relation, "relation")}</div>
                    <div class="col-1"><br>
                        <button class="del" type="button" data-data='{"type":"click","name":"editor-clear-rel"}'>${l10n[lang].del}</button>
                    </div>
                </div>`;
    },
    formFamily() {
        return `<h3>${l10n[lang].family}</h3>
                <div class="row row-cols">
                    <div class="col-1">${l10n[lang].character} ${this.characterSelect("", "familySelect")}</div>
                    <div class="col-1">Тип
                        <select id="familyType"><option value=""></option>${this.makeOptions(FAMILY_TYPES)}</select>
                    </div>
                    <div class="col-1"><br>
                        <button class="add" type="button" data-data='{"type":"click","name":"editor-add-family"}'>${l10n[lang].add}</button>
                    </div>
                </div>
                <div class="char-chips" id="familyList"></div>`;
    },
    formFactions() {
        return `<h3>${l10n[lang].factions}</h3>
                <div class="row row-cols">
                    <select id="factionSelect" class="row-select">
                        <option value=""></option>
                            ${data.factions.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}
                    </select>
                    <button class="add" type="button" data-data='{"type":"click","name":"editor-add-faction"}'>${l10n[lang].add}</button>
                </div>
                <div class="char-chips" id="factionsList"></div>`;
    },
    formFriends() {
        return `<h3>${l10n[lang].friends}</h3>
                <div class="row row-cols">
                    <select id="friendSelect" class="row-select">
                        <option value=""></option>
                            ${this.workingList.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}
                    </select>
                    <button class="add" type="button" data-data='{"type":"click","name":"editor-add-friend"}'>${l10n[lang].add}</button>
                </div>
                <div class="char-chips" id="friendsList"></div>`;
    },

    formTriggerBase(c) {
        return `
            <div class="row row-cols">
                <div class="col">Тип события
                    <select id="type">${this.makeOptions(Object.keys(triggerFields), c.type)}</select>
                </div>
                <div class="col half">Повторяемый 
                    <input type="checkbox" id="repeatable" ${c.repeatable ? 'checked' : ''}>
                </div>
            </div>`;
    },

    // Основной блок логики
    formTriggerLogic(c) {
        return `
          
                <h3>Условия (Conditions) <button class="primary add" type="button" data-data='{"type":"click","name":"editor-add-condition"}'>+ Добавить</button></h3>
                <div class="char-chips" id="conditionsList"></div>

                <h3>Действия (Actions) <button class="primary add" type="button" data-data='{"type":"click","name":"editor-add-action"}'>+ Добавить</button></h3>
                <div class="char-chips" id="actionsList"></div>
            `;
    },
    formQuestLogic(c) {
        return `
            <div class="quest-logic-container">
                <h3>Стадии квеста (Stages)</h3>
                <div class="char-chips" id="stagesList"></div>
                <button class="primary add" type="button" data-data='{"type":"click","name":"editor-quest-add-stage"}'>+ Добавить стадию</button>
                
                <div class="separator"></div>
                
                <div id="stageDetails" class="sub-form-container">
                    <!-- Здесь будет форма редактирования выбранной стадии -->
                </div>
            </div>`;
    },

    formDialogView(c) {
        if (!c.customView) c.customView = { customViewMode: '2sides', boxStyle: 'box' };
        return `
            <div class="row row-cols">
                <div class="col">Режим вида
                    <select id="customViewMode" data-data='{"type":"change","name":"editor-dialog-view-change"}'>
                        ${this.makeOptions(['2sides', 'closeUp'], c.customView.customViewMode)}
                    </select>
                </div>
                <div class="col">Стиль окна
                    <select id="boxStyle" data-data='{"type":"change","name":"editor-dialog-view-change"}'>
                        ${this.makeOptions(['box', 'circle'], c.customView.boxStyle)}
                    </select>
                </div>
            </div>`;
    },

    // Основной список узлов (Nodes)
    formDialogLogic(c) {
        return `
            <div class="dialog-structure">
                <h3>Узлы диалога (Nodes)</h3>
                <div id="nodesList" class="char-chips"></div>
                <button class="primary add" type="button" data-data='{"type":"click","name":"editor-dialog-node-add"}'>
                    + Добавить узел
                </button>
            </div>`;
    },
};