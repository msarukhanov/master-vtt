let familySelect = elementById('familySelect');
let familyType = elementById('familyType');
let friendSelect = elementById('friendSelect');
let factionSelect = elementById('factionSelect');

let raceSelect = elementById('raceSelect');
let peopleSelect = elementById('peopleSelect');

let currentIndex = null, charactersList;

const familyReverse = {
    "мать": "сын",
    "отец": "сын",
    "сын": "мать",
    "дочь": "мать",
    "брат": "брат",
    "сестра": "сестра",
    "дядя": "племянник",
    "тётя": "племянник",
    "кузен": "кузен",
    "кузина": "кузина"
};

const RELATION_TYPES = ["", "женат", "замужем", "встречается"];
const FAMILY_TYPES = ["брат", "сестра", "мать", "отец", "сын", "дочь", "дядя", "тётя", "кузен", "кузина", "племянник", "племянница"];



const tpl = {
    tplFriend: (id) => `${getDataNameById('characters', id)}<button class="small del round" onclick="editor.removeFriend('${id}')">✖</button>`,
    tplFaction: (id) => `${getDataNameById('factions', id)}<button class="small del round" onclick="editor.removeFaction('${id}')">✖</button>`,
    tplFamily: (rel, i) => `${rel.type} — ${getDataNameById('characters', rel.id)}<button class="small del round" onclick="editor.removeFamily(${i})">✖</button>`
};



const editor = {
    currentType: 'characters',
    workingList: [],
    init(type = 'characters') {
        this.currentType = type;
        this.workingList = [...data[this.currentType]].sort((a,b) =>
            (a.name || a.id).localeCompare(b.name || b.id)
        );
        this.renderList();
        this.selectItem(0);
    },

    switchMode(type) {
        this.init(type);
    },

    save() {
        const result = gameData[currentGame].characters2.map(i=>getDataById('characters', i.id)||i.id);
        console.log(result);
    },
    exportAvatars() {
        console.log(avatars);
    },
    uploadAvatar(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64String = e.target.result;
                const avatar = elementById('avatar');
                avatar.src = base64String;
                avatar.style.display = 'block';
                avatars[editor.value("id")] = base64String;
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file.");
        }
    },

    renderList() {
        const box = elementById("editorList");
        box.innerHTML = "";

        this.workingList.forEach((item, i) => {
            const btn = createEl("button", 'char-list-item');

            // Аватар только для персонажей
            if (this.currentType === 'characters' && avatars[item.id]) {
                const img = createEl("img", 'char-list-item-image');
                img.src = avatars[item.id];
                btn.appendChild(img);
            }

            btn.appendChild(createEl("span", "", item.name || item.id));
            btn.onclick = () => this.selectItem(i, btn);
            box.appendChild(btn);
        });
    },

    selectItemById(id) {
        // Ищем индекс элемента в текущем рабочем списке (this.workingList)
        const index = this.workingList.findIndex(item => item.id === id);

        if (index !== -1) {
            // Если нашли — вызываем твой стандартный выбор по индексу
            this.selectItem(index);

            // Прокрутка списка к активному элементу (удобно для APK)
            const activeBtn = document.querySelectorAll('.char-list-item')[index];
            activeBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            console.warn(`Объект с ID ${id} не найден в текущем списке ${this.currentType}`);
        }
    },
    selectItem(index, element=null) {
        currentIndex = index;
        const item = this.workingList[index];
        if (!item) return;

        // Подсветка активного
        document.querySelectorAll('.char-list-item').forEach(el => el.classList.remove('active'));
        const target = element || document.querySelectorAll('.char-list-item')[index];
        target?.classList.add('active');

        elementById("editorTitle").textContent = item.name || item.id;

        this.renderForm(item);
    },
    addItem() {
        let newItem = {};

        switch (this.currentType) {
            case 'characters':
                newItem = {
                    id: `new_char_${Date.now()}`,
                    name: "New character",
                    location: "", work: "", residence: "",
                    profession: "", additional: "", source: "manual",
                    gender: "m", age: 18,
                    relation: null, family: [], friends: [], factions: []
                };
                break;

            case 'factions':
                newItem = {
                    id: `new_fact_${Date.now()}`,
                    name: "New faction",
                    description: "",
                    members: []
                };
                break;

            case 'locations':
                newItem = {
                    id: `new_loc_${Date.now()}`,
                    name: "New location",
                    l: 100, t: 100, w: 50, h: 50,
                    description: ""
                };
                break;

            default:
                newItem = { id: `item_${Date.now()}`, name: "New object" };
        }
        data[this.currentType].push(newItem);
        this.workingList.push(newItem);

        this.renderList();
        this.selectItem(this.workingList.length - 1);

        dbManager.saveGame(currentGame, gameData[currentGame]);
    },
    saveItem() {
        if (currentIndex === null) return;
        const item = this.workingList[currentIndex];

        if (this.currentType === 'characters') {
            this.saveCharacter(); // Твой метод сохранения перса
        } else {
            const fields = ["name", "id", "description", "l", "t", "w", "h", "source"];
            fields.forEach(f => {
                const el = elementById(f);
                if (el) {
                    // Если поле числовое — сохраняем как число
                    item[f] = (el.type === 'number') ? Number(el.value) : el.value;
                }
            });
        }

        this.renderList();
        dbManager.saveGame(currentGame, gameData[currentGame]).then();
    },
    deleteItem() {
        if (currentIndex === null || !this.workingList[currentIndex]) return;

        const item = this.workingList[currentIndex];
        const itemName = item.name || item.id;

        if (confirm(`Вы уверены, что хотите удалить "${itemName}" из раздела ${this.currentType}?`)) {
            this.clearReferences(item.id);
            const mainList = data[this.currentType];
            const indexInMain = mainList.findIndex(i => i.id === item.id);
            if (indexInMain !== -1) mainList.splice(indexInMain, 1);

            // 3. Обновляем рабочий список редактора
            this.workingList.splice(currentIndex, 1);

            // 4. Сохраняем обновленную базу
            dbManager.saveGame(currentGame, gameData[currentGame]);

            // 5. Обновляем интерфейс
            this.renderList();

            // Выбираем предыдущий элемент или первый, если удалили всё
            const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
            this.selectItem(this.workingList.length > 0 ? nextIndex : -1);

            console.log(`Объект ${itemName} удален.`);
        }
    },

    clearReferences(deletedId) {
        if (this.currentType === 'characters') {
            data.characters.forEach(c => {
                if (c.friends) c.friends = c.friends.filter(id => id !== deletedId);
                if (c.family) c.family = c.family.filter(f => f.id !== deletedId);
                if (c.relation?.id === deletedId) c.relation = null;
            });
            data.factions.forEach(f => {
                if (f.members) f.members = f.members.filter(id => id !== deletedId);
            });
        }
        else if (this.currentType === 'factions') {
            data.characters.forEach(c => {
                if (c.factions) c.factions = c.factions.filter(id => id !== deletedId);
            });
        }
    },


    toggleShortList(event) {
        elementById('editor-list').classList.toggle('short');
        let html = event.srcElement.innerText;
        event.srcElement.innerText = (html === '<<') ? '>>' : '<<';
    },
    renderListSection(containerId, list, itemTemplate) {
        const box = elementById(containerId);
        if (!box) return;
        box.innerHTML = "";

        list.forEach((item, i) => {
            const row = document.createElement("div");
            row.className = "editor-list-row";
            row.innerHTML = itemTemplate(item, i);
            box.appendChild(row);
        });
    },
    refreshSection(sectionId) {
        const c = this.workingList[currentIndex];
        if (sectionId === "friendsList") {
            editor.renderListSection("friendsList", c.friends || [], tpl.tplFriend);
        } else if (sectionId === "factionsList") {
            editor.renderListSection("factionsList", c.factions || [], tpl.tplFaction);
        } else if (sectionId === "familyList") {
            editor.renderListSection("familyList", c.family || [], tpl.tplFamily);
        }
    },

    saveCharacter() {
        if (currentIndex === null) return;
        const c = this.workingList[currentIndex];

        const fields = ["name", "id", "profession", "work", "location", "residence", "additional", "appearance", "personality", "philosophy", "description", "source", "gender"];
        fields.forEach(f => { c[f] = value(f); });
        c.age = Number(value("age"));

        const relId = value("relationId");
        const relType = value("relationType");

        if (relId) {
            c.relation = { type: relType, id: relId };
            const other = getDataById('characters', relId);
            if (other) {
                // Авто-реверс пола/типа связи
                const reverseType = relType === "женат" ? "замужем" :
                    relType === "замужем" ? "женат" : "встречается";
                other.relation = { type: reverseType, id: c.id };
            }
        } else {
            c.relation = null;
        }

        this.renderList();

        const items = document.querySelectorAll('.char-list-item');
        items.forEach((el, i) => el.classList.toggle('active', i === currentIndex));

        const result = data.characters.map(id => getDataById('characters', id) || id);

        dbManager.saveGame(currentGame, gameData[currentGame]).then();
        console.log("Данные сохранены:", result);
    },


    //social links
    toggleLink(targetId, keyMe, keyOther, action = 'add') {
        const me = this.workingList[currentIndex];
        const other = (keyMe === 'factions')
            ? getDataById('factions', targetId)
            : getDataById('characters', targetId);

        if (!me || !other) return;
        if (!me[keyMe]) me[keyMe] = [];
        if (!other[keyOther]) other[keyOther] = [];

        if (action === 'add') {
            if (!me[keyMe].includes(targetId)) me[keyMe].push(targetId);
            if (!other[keyOther].includes(me.id)) other[keyOther].push(me.id);
        } else {
            me[keyMe] = me[keyMe].filter(id => id !== targetId);
            other[keyOther] = other[keyOther].filter(id => id !== me.id);
        }
        editor.refreshSection(keyMe+'List');
    },
    clearRelation() {
        const me = this.workingList[currentIndex];
        const other = getDataById('characters', me.relation?.id);

        if (other && other.relation?.id === me.id) {
            other.relation = null;
        }

        me.relation = null;

        editor.renderForm(me);
    },
    removeFamily(index) {
        const me = this.workingList[currentIndex];
        const rel = me.family[index];
        const other = getDataById('characters', rel.id);

        me.family.splice(index, 1);
        if (other && other.family) {
            other.family = other.family.filter(f => f.id !== me.id);
        }
        this.refreshSection("familyList");
    },
    addFamily() {
        const charId = familySelect.value;
        const type = familyType.value;
        if (!charId || !type) return;

        const me = this.workingList[currentIndex];
        if (!me.family) me.family = [];
        me.family.push({ type, id: charId });
        this.refreshSection("familyList");
    },
    addFriend() {
        const id = friendSelect.value;
        if (id) this.toggleLink(id, 'friends', 'friends', 'add');
    },
    addFaction() {
        const id = factionSelect.value;
        if (id) this.toggleLink(id, 'factions', 'members', 'add');
    },

    locationSelect(value, id) {
        const options = data.locations.map(l =>
            `<option ${l.name === value ? "selected" : ""}>${l.name}</option>`
        ).join("");
        return `<select id="${id}"><option value=""></option>${options}</select>`;
    },
    characterSelect(value, id) {
        const options = this.workingList.map(c =>
            `<option value="${c.id}" ${c.id === value ? "selected" : ""}>${c.name}</option>`
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

    renderForm(c) {
        const f = elementById("form");

        const formFieldsSettings = gameData[currentGame].app.formFieldsSettings || {};
        const formFields = formFieldsSettings[this.currentType] || {};

        f.innerHTML = `
        <div class="row">${l10n[lang].name}
            <input type="text" id="name">
        </div>
        <div class="row row-cols">
            ${formFields.avatar ? this.formAvatar() : ''}
            <div class="row row-cols">
                <div class="col">ID <input id="id" value="${c.id}"></div>
                ${formFields.personal ? this.formPersonal(c) : ''}
            </div>
        </div>
        ${formFields.personal ? this.formProfession(c) : ''}
        ${formFields.locations ? this.formItemLocations(c) : ''}
        
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
        
        
        <h3>${l10n[lang].source}</h3>
        <div class="row"><input id="source" value="${c.source || ''}"></div>
        
        <div class="actions">
            <button class="primary save" onclick="editor.saveItem()">${l10n[lang].save}</button>
            <button class="primary del" onclick="editor.deleteItem()">${l10n[lang].del}</button>
        </div>
    `;

        const textFields = ['name', 'appearance', 'personality', 'description', 'philosophy'];
        textFields.forEach(field => {
            const el = elementById(field);
            if (el) el.value = c[field] || "";
        });

        const avatarImg = elementById('avatar');
        if (avatars[c.id]) {
            avatarImg.src = avatars[c.id];
            avatarImg.style.display = 'block';
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
    },

    makeOptions (list, selected) {
        return list.map(t => `<option ${selected === t ? "selected" : ""}>${t}</option>`).join("")
    },

    formAvatar() {
        return `<div class="col avatar-select">
                    <input type="file" id="imageInput" accept="image/*" onchange="editor.uploadAvatar(event)">
                    <img id="avatar" src="#" alt="Preview" style="max-width: 200px; display: none;">
                </div>`;
    },

    formItemLocations(c) {
        return `<div class="row">${l10n[lang].location_current} ${this.locationSelect(c.location, "location")}</div>
                <div class="row">${l10n[lang].residence} ${this.locationSelect(c.residence, "residence")}</div>
                <div class="row">${l10n[lang].location_additional} ${this.locationSelect(c.additional, "additional")}</div>`;
    },

    formPersonal(c) {
        let personal = `<div class="col">${l10n[lang].age} <input id="age" type="number" value="${c.age}"></div>
                <div class="col">${l10n[lang].gender}
                <select id="gender">${this.makeOptions(["m", "w"], c.gender)}</select>`;
        if(data.races) {
            personal += this.formRace(c);
        }
        if(data.peoples) {
            personal += this.formPeople(c);
        }
        personal += '</div>';
        return personal;
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

    formRace(c) {
        return `<div class="row">${l10n[lang].race} ${this.raceSelect(c.race, "race")}</div>`;
    },
    formPeople(c) {
        return `<div class="row">${l10n[lang].people} ${this.peopleSelect(c.people, "people")}</div>`;
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
                    <div class="col-3">${l10n[lang].character} ${this.characterSelect(c.relation?.id, "relationId")}</div>
                    <div class="col-1">${l10n[lang].type}
                        <select id="relationType">${this.makeOptions(RELATION_TYPES, c.relation?.type)}</select>
                    </div>
                    <div class="col-1"><br>
                        <button class="del" type="button" onclick="editor.clearRelation()">${l10n[lang].del}</button>
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
                        <button class="add" type="button" onclick="editor.addFamily()">${l10n[lang].add}</button>
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
                    <button class="add" type="button" onclick="editor.addFaction()">${l10n[lang].add}</button>
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
                    <button class="add" type="button" onclick="editor.addFriend()">${l10n[lang].add}</button>
                </div>
                <div class="char-chips" id="friendsList"></div>`;
    }
};



function drawGraph(character) {
    const svg = elementById("relationGraph");
    svg.innerHTML = "";

    const cx = 300;
    const cy = 200;
    const radius = 130;

    const links = [];

    if (character.relation?.id)
    links.push({ id: character.relation.id, label: character.relation.type });

    character.friends.forEach(id =>
        links.push({ id, label: "друг" })
    );

    character.family.forEach(f =>
        links.push({ id: f.id, label: f.type })
    );

    // центр
    drawNode(svg, cx, cy, character.name);

    links.forEach((link, i) => {
        const angle = (i / links.length) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        drawLine(svg, cx, cy, x, y, link.label);

        const other = getDataById('characters', link.id);
        if (other)
            drawNode(svg, x, y, other.name);
    });
}

function drawNode(svg, x, y, name) {
    svg.innerHTML += `
        <circle cx="${x}" cy="${y}" r="30" fill="#ddd"/>
        <text x="${x}" y="${y}" text-anchor="middle"
              dominant-baseline="middle" font-size="12">
            ${name}
        </text>
    `;
}

function drawLine(svg, x1, y1, x2, y2, label) {
    svg.innerHTML += `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="#666"/>
        <text x="${(x1+x2)/2}" y="${(y1+y2)/2}"
              font-size="11">${label}</text>
    `;
}