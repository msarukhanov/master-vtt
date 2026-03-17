let familySelect = elementById('familySelect');
let familyType = elementById('familyType');
let friendSelect = elementById('friendSelect');
let factionSelect = elementById('factionSelect');

let raceSelect = elementById('raceSelect');
let peopleSelect = elementById('peopleSelect');

let currentEditorIndex = null, currentEditorIndex2 = null, charactersList;

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

const triggerTypes = ['newGame','playerDeath','npcDeath','npcTagKills','npcRelationThreshold','questCompleted','questFailed','questAbandoned','dialogStarted','dialogOption','enterZone','leaveZone','interact','getItem','giveItem','timePassed'];
const triggerFields = {
    'newGame': [],
    'playerDeath': [],
    'npcDeath': [
        { label: 'Персонаж', key: 0, type: 'select', source: 'characters' }
    ],
    'npcTagKills': [
        { label: 'Тег (напр. #orc)', key: 0, type: 'select', source: 'tags' },
        { label: 'Количество', key: 1, type: 'number', default: 1 }
    ],
    'npcRelationThreshold': [
        { label: 'Кто оценивает', key: 0, type: 'select', source: 'characters' },
        { label: 'Цель (к кому)', key: 1, type: 'select', source: 'characters' },
        { label: 'Порог отношений', key: 2, type: 'number', default: 0 }
    ],
    'questCompleted': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' }
    ],
    'questFailed': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' }
    ],
    'questAbandoned': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' }
    ],
    'dialogStarted': [
        { label: 'Диалог', key: 0, type: 'select', source: 'dialogues' }
    ],
    'dialogOption': [
        { label: 'Диалог', key: 0, type: 'select', source: 'dialogues' },
        { label: 'ID реплики (Reply ID)', key: 1, type: 'text' }
    ],
    'enterZone': [
        { label: 'Регион (Zone ID)', key: 0, type: 'select', source: 'regions' }
    ],
    'leaveZone': [
        { label: 'Регион (Zone ID)', key: 0, type: 'select', source: 'regions' }
    ],
    'interact': [
        { label: 'Тип цели', key: 0, type: 'select', options: ['character', 'object'] },
        { label: 'ID цели', key: 1, type: 'dynamic-select', dependency: 0 }
    ],
    'getItem': [
        { label: 'Артефакт/Предмет', key: 0, type: 'select', source: 'artifacts' }
    ],
    'giveItem': [
        { label: 'Артефакт/Предмет', key: 0, type: 'select', source: 'artifacts' }
    ],
    'timePassed': [
        { label: 'Кол-во ходов/единиц времени', key: 0, type: 'number', default: 1 }
    ]
};

const triggerActionTypes = ['startDialog','endDialog','npcRelationChange','startBattle','switchMap','moveCharacter','killCharacter','spawnCharacter','giveItem','takeItem','showPopUp','showPopUpChain','playSound','playVideo','startQuest','progressQuest','completeQuest','failQuest','abandonQuest','giveReward'];
const actionFields = {
    'startDialog': [
        { label: 'Диалог', key: 0, type: 'select', source: 'dialogues' },
        { label: 'С кем (ID)', key: 1, type: 'select', source: 'characters' }
    ],
    'endDialog': [],
    'npcRelationChange': [
        { label: 'Кто меняет', key: 0, type: 'select', source: 'characters' },
        { label: 'К кому', key: 1, type: 'select', source: 'characters' },
        { label: 'Изменение (дельта)', key: 2, type: 'number' }
    ],
    'startBattle': [
        { label: 'Вражеская группа/ID', key: 0, type: 'select', source: 'characters' }, // или bosses/units
        { label: 'Тип карты', key: 1, type: 'select', options: ['forest', 'cave', 'city', 'sea'] }
    ],
    'switchMap': [
        { label: 'ID карты/локации', key: 0, type: 'text' },
        { label: 'ID гекса спавна', key: 1, type: 'text' }
    ],
    'moveCharacter': [
        { label: 'Кого', key: 0, type: 'select', source: 'characters' },
        { label: 'Куда (HexID)', key: 1, type: 'text' }
    ],
    'killCharacter': [
        { label: 'Кого', key: 0, type: 'select', source: 'characters' }
    ],
    'spawnCharacter': [
        { label: 'Шаблон персонажа', key: 0, type: 'select', source: 'characters' },
        { label: 'Точка (HexID)', key: 1, type: 'text' }
    ],
    'giveItem': [
        { label: 'Кому', key: 0, type: 'select', source: 'characters' },
        { label: 'Что', key: 1, type: 'select', source: 'artifacts' }
    ],
    'takeItem': [
        { label: 'У кого', key: 0, type: 'select', source: 'characters' },
        { label: 'Что', key: 1, type: 'select', source: 'artifacts' }
    ],
    'showPopUp': [
        { label: 'Skipable', key: 'skipable', type: 'checkbox' },
        { label: 'Fullscreen', key: 'full', type: 'checkbox' },
        { label: 'Sound (ID)', key: 'sound', type: 'select', source: 'audio' }
    ],
    'showPopUpChain': [
        { label: 'Страницы цепочки', key: 'pages', type: 'nested-chain' } // Особая логика для массива страниц
    ],
    'playSound': [
        { label: 'Файл звука', key: 0, type: 'select', source: 'audio' }
    ],
    'playVideo': [
        { label: 'Файл видео', key: 0, type: 'text' }
    ],
    'startQuest': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' }
    ],
    'progressQuest': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' },
        { label: 'Новый этап (ID)', key: 1, type: 'text' }
    ],
    'completeQuest': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' }
    ],
    'failQuest': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' }
    ],
    'abandonQuest': [
        { label: 'Квест', key: 0, type: 'select', source: 'quests' }
    ],
    'giveReward': [
        {
            label: 'Тип награды',
            key: 0,
            type: 'select',
            options: ['resources', 'exp', 'items']
        },
        {
            label: 'Ресурс / Предмет',
            key: 1,
            type: 'dynamic-select',
            dependency: 0, // Если выбрали 'resources' — список из data.resources, если 'items' — из data.items
            sources: {
                'resources': 'resources',
                'items': 'items'
            }
        },
        {
            label: 'Количество / Значение',
            key: 2,
            type: 'number',
            default: 1
        }
    ],
};

const popUpPageFields = [
    { label: 'Текст', key: 'text', type: 'textarea' },
    { label: 'Размер шрифта', key: 'textSize', type: 'number', default: 18 },
    { label: 'Позиция текста', key: 'textPosition', type: 'select', options: [
        'position-top-left', 'position-bottom-left', 'position-top-center',
        'position-center', 'position-center-left', 'position-center-right'
    ]},
    { label: 'Цвет текста', key: 'textColor', type: 'color', default: '#ffffff' },
    { label: 'Фон текста', key: 'textBg', type: 'color', default: 'transparent' },
    { label: 'Фоновое изображение', key: 'bg', type: 'select', source: 'images' },
    { label: 'Основное изображение', key: 'image', type: 'select', source: 'images' },
    { label: 'Звук страницы', key: 'sound', type: 'select', source: 'audio' },
    { label: 'Цвет заливки', key: 'fill', type: 'color', default: 'transparent' },
    { label: 'Авто-закрытие (сек)', key: 'autoClose', type: 'number', default: 0 },
    { label: 'Skipable', key: 'skipable', type: 'checkbox', default: true }
];

const tpl = {
    tplFriend: (id) => `${getDataNameById('characters', id)}<button class="small del round" data-data='{"type":"click","name":"editor-remove-friend","data":"${id}"}'>✖</button>`,
    tplFaction: (id) => `${getDataNameById('factions', id)}<button class="small del round" data-data='{"type":"click","name":"editor-remove-faction","data":"${id}"}'>✖</button>`,
    tplFamily: (rel, i) => `${rel.type} — ${getDataNameById('characters', rel.id)}<button class="small del round" data-data='{"type":"click","name":"editor-remove-family","data":"${i}"}'>✖</button>`,
    tplDialogNode: (node, i) => `<div class="dialog-node-card">
        <div class="node-header">
            <strong>ID: ${node.id}</strong>
            <input type="text" value="${node.name || ''}" placeholder="Название узла..." 
                   data-data='{"type":"input","name":"edit-node-name","idx":${i}}'>
            <button class="del-mini" data-data='{"type":"click","name":"del-node","idx":${i}}'>×</button>
        </div>
        
        <div class="node-body">
            <div class="npc-block">
                <span>NPC:</span> ${node.npc[0]?.text || 'Текст отсутствует...'}
                <button class="edit-sub" data-data='{"type":"click","name":"edit-node-npc","idx":${i}}'>✎</button>
            </div>
            <div class="player-block">
                <span>Варианты ответов (${node.player?.length || 0})</span>
                <button class="edit-sub" data-data='{"type":"click","name":"edit-node-player","idx":${i}}'>Управлять ответами</button>
            </div>
        </div>
    </div>`
};


const editor = {
    ...editorForm,
    ...editorRender,

    selects : {
        dataType: null,
    },

    currentType: 'characters',
    dataTypes: ['characters', 'objects', 'units', 'items', 'factions', 'regions', 'religions', 'cultures', 'classes', 'abilities', 'triggers', 'quests', 'dialogs', 'terrains'],
    workingList: [],


    init(type = 'characters') {
        this.currentType = type;
        if(!gameData[currentGame][this.currentType]) gameData[currentGame][this.currentType] = [];
        this.workingList = [...gameData[currentGame][this.currentType]].sort((a,b) =>
            (a.name || a.id).localeCompare(b.name || b.id)
        );
        const box = elementById("editorDataTypes");
        box.innerHTML = "";

        editor.selects.dataType = Object.assign(createEl('select', 'map-controls-select map-season-select'),  {value:currentSeason.id});
        editor.selects.dataType.append(new Option(`Select data type`, -1));
        editor.dataTypes.forEach(i => editor.selects.dataType.append(new Option(i, i)));
        editor.selects.dataType.value = editor.currentType;
        editor.selects.dataType.dataset.data = JSON.stringify({type:'click',name:'editor-type-select'});
        box.append(editor.selects.dataType);

        const btnAdd = createEl('button', 'primary add');
        btnAdd.innerHTML = '+ New item';
        btnAdd.dataset.data = JSON.stringify({"type":"click","name":"editor-item-add"});
        box.append(btnAdd);

        this.renderList();
        this.selectItem(0);
    },

    typeSelect() {
        editor.init(editor.selects.dataType.value);
    },

    save() {
        // const result = gameData[currentGame].characters2.map(i=>getDataById('characters', i.id)||i.id);
        const result = gameData[currentGame][editor.currentType].map(i=>getDataById(editor.currentType, i.id)||i.id);
        console.log(result);
    },
    exportAvatars() {
        console.log(avatars);
    },
    uploadImage(event, type) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64String = e.target.result;
                const avatar = elementById(type);
                avatar.src = base64String;
                avatar.style.display = 'block';
                switch (type) {
                    case 'avatar':
                        avatars[editor.value("id")] = base64String;
                        break;
                    case 'fullheight':
                        fullheight[editor.value("id")] = base64String;
                        break;
                }

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
            if (avatars[item.id]) {
                const img = createEl("img", 'char-list-item-image');
                img.src = avatars[item.id];
                btn.appendChild(img);
            }

            btn.appendChild(createEl("span", "", item.name || item.id));
            btn.dataset.data = JSON.stringify({type:'click',name:'editor-item-select', data:item.id});
            box.appendChild(btn);
        });
    },

    selectItemById(id) {
        console.log(id);
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
        currentEditorIndex = index;
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
        let newItem = {isNew: true};

        const formFieldsSettings = gameData[currentGame].app.formFieldsSettings || {};
        const formFields = formFieldsSettings[this.currentType] || {};

        Object.keys(formFields).forEach(key => {
            if(formFields[key]) {
                newItem[key] = '';
            }
        });
        const date = Date.now();
        newItem.id = `${editor.currentType}_${date}`;
        newItem.name = `New ${editor.currentType}`;

        gameData[currentGame][this.currentType].push(newItem);
        this.workingList.push(newItem);

        this.renderList();
        this.selectItemById(newItem.id);

        editor.save();
    },
    cloneItem() {
        if (currentEditorIndex === null) return;
        const item = this.workingList[currentEditorIndex];

        const newItem = JSON.parse(JSON.stringify(item));
        newItem.id += '_clone';

        this.workingList.splice(currentEditorIndex+1, 0, newItem);
        this.renderList();

        this.selectItem(currentEditorIndex+1);

        const listItems = document.querySelectorAll('.char-list-item')[currentEditorIndex+1];
        listItems.scrollIntoView({ behavior: 'smooth', block: 'center' });

        editor.save();
    },
    saveItem() {
        if (currentEditorIndex === null) return;
        const c = this.workingList[currentEditorIndex];

        const fields = [
            "name", "id",
            "profession", "work", "group",
            "age", "race", "people", "gender", "alignment",
            "tier", "rank", "parent",
            "class", "level", "exp",
            "location", "residence", "additional",
            "appearance", "personality", "philosophy", "description",
            "source", "excess", "fate",
            "longCampaign", "globalCampaign", "goals",
            "roleplay", "roleplay_tips", "features", "strengths", "weaknesses",
            "oblivion", "text", "quote",
            "characterId", "customViewMode", "boxStyle",

        ];
        fields.forEach(f => {c[f] = editor.value(f);});

        const relId = editor.value("relation");

        if (relId) {
            c.relation = relId;
            const other = getDataById('characters', relId);
            if (other) {
                other.relation = c.id;
            }
        } else {
            c.relation = null;
        }

        this.renderList();

        const items = document.querySelectorAll('.char-list-item');
        items.forEach((el, i) => el.classList.toggle('active', i === currentEditorIndex));

        editor.save();


        // if (this.currentType === 'characters') {
        //     this.saveCharacter(); // Твой метод сохранения перса
        // } else {
        //     const fields = ["name", "id", "profession", "work", "location", "residence", "additional", "appearance", "personality", "philosophy", "description", "source", "gender", "parent", "tier", ];
        //     fields.forEach(f => {
        //         const el = elementById(f);
        //         if (el) {
        //             // Если поле числовое — сохраняем как число
        //             item[f] = (el.type === 'number') ? Number(el.value) : el.value;
        //         }
        //     });
        // }
        //
        // this.renderList();
        // dbManager.saveGame(currentGame, gameData[currentGame]).then();
    },
    deleteItem() {
        if (currentEditorIndex === null || !this.workingList[currentEditorIndex]) return;

        const item = this.workingList[currentEditorIndex];
        const itemName = item.name || item.id;

        if (confirm(`Вы уверены, что хотите удалить "${itemName}" из раздела ${this.currentType}?`)) {
            this.clearReferences(item.id);
            const mainList = gameData[currentGame][this.currentType];
            const indexInMain = mainList.findIndex(i => i.id === item.id);
            if (indexInMain !== -1) mainList.splice(indexInMain, 1);

            // 3. Обновляем рабочий список редактора
            this.workingList.splice(currentEditorIndex, 1);

            // 4. Сохраняем обновленную базу
            editor.save();

            // 5. Обновляем интерфейс
            this.renderList();

            // Выбираем предыдущий элемент или первый, если удалили всё
            const nextIndex = currentEditorIndex > 0 ? currentEditorIndex - 1 : 0;
            this.selectItem(this.workingList.length > 0 ? nextIndex : -1);

            console.log(`Объект ${itemName} удален.`);
        }


    },

    clearReferences(deletedId) {
        if (this.currentType === 'characters') {
            gameData[currentGame].characters.forEach(c => {
                if (c.friends) c.friends = c.friends.filter(id => id !== deletedId);
                if (c.family) c.family = c.family.filter(f => f.id !== deletedId);
                if (c.relation === deletedId) c.relation = null;
            });
            gameData[currentGame].factions.forEach(f => {
                if (f.members) f.members = f.members.filter(id => id !== deletedId);
            });
        }
        else if (this.currentType === 'factions') {
            gameData[currentGame].characters.forEach(c => {
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
        const c = this.workingList[currentEditorIndex];
        if (sectionId === "friendsList") {
            editor.renderListSection("friendsList", c.friends || [], tpl.tplFriend);
        } else if (sectionId === "factionsList") {
            editor.renderListSection("factionsList", c.factions || [], tpl.tplFaction);
        } else if (sectionId === "familyList") {
            editor.renderListSection("familyList", c.family || [], tpl.tplFamily);
        }
    },

    //social links
    toggleLink(targetId, keyMe, keyOther, action = 'add') {
        const me = this.workingList[currentEditorIndex];
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
        const me = this.workingList[currentEditorIndex];
        const other = getDataById('characters', me.relation);

        if (other && other.relation === me.id) {
            other.relation = null;
        }

        me.relation = null;

        editor.renderForm(me);
    },
    removeFamily(index) {
        const me = this.workingList[currentEditorIndex];
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

        const me = this.workingList[currentEditorIndex];
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

    save() {
        const result = (this.currentType === 'characters') ? editor.workingList.map(id => getDataById('characters', id) || id) : editor.workingList;
        gameData[currentGame][this.currentType] = result;
        // gameData[currentGame][this.currentType] = result;

        dbManager.saveGame(currentGame, gameData[currentGame]).then();
        console.log("Данные сохранены:", result);
    },

    value(id) {
        const el = elementById(id);
        if(el) {
            if(el.type === 'number') return Number(el.value || 0);
            else return (el.value || '');
        }
        return null;
    }
};



function drawGraph(character) {
    const svg = elementById("relationGraph");
    svg.innerHTML = "";

    const cx = 300;
    const cy = 200;
    const radius = 130;

    const links = [];

    if (character.relation)
    links.push({ id: character.relation, label: character.relation });

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