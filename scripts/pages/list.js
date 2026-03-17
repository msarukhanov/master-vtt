let nameFilter = elementById("nameFilter");
let groupFilter = elementById("groupFilter");

const list = {

    key: null,
    groups: null,

    init(key) {
        nameFilter = elementById("nameFilter");
        groupFilter = elementById("groupFilter");

        let items = data[key].filter(i=>i.id);
        if (!items) return;

        list.key = key;

        list.groups = new Set();
        data[key].forEach(c => {
            if (c.group) list.groups.add(c.group.toLowerCase());
        });

        if(list.groups && list.groups.size) {
            let items2 = [];
            list.groups.forEach(key=>{
                const filtered = items.filter(i=>i.group && i.group.toLowerCase()===key);
                items2 = items2.concat(filtered);
            });
            items = items2;
        }

        items = items.map(i=>{
            const {id, group, name, gender, rank, tier, parent, members, participants, factions} = i;
            const item = {id, group, name, gender, rank, tier, parent, members, participants, factions};
            if(i.class) item.class = i.class;
            return item;
        });

        if (key === "characters") {
            list.render(items);
        } else if (key === "races") {
            list.renderList2(key, gameData[currentGame].peoples || data.races);
        } else {
            list.renderList2(key, items);
        }

        list.collectFilters();

        applyNameFilter = list.applyFilter;

        document.addEventListener('keyup', (e) => {
            if (e.target.id.endsWith('NameFilter')) {
                const key = e.target.id.replace('NameFilter', '');
                this.applyFilter(key);
            }
        });

        groupFilter.addEventListener("change", list.applyFilter);
    },
    collectFilters() {
        const groupSet = new Set();
        const additionalSet = new Set();
        data.characters.forEach(c => {
            if (c.group) groupSet.add(c.group);
        });
        data.locations.forEach(c => {
            groupSet.add(c.name);
        });
        const locs = [...groupSet];
        data.characters.forEach(c => {
            if (c.additional) {
                c.additional.split(",").forEach(a => {
                    const token = a.trim();
                    if (!token) return;
                    const lower = token.toLowerCase();
                    const isPartOfGroup = locs.some(loc =>
                        loc.toLowerCase().includes(lower)
                    );
                    if (!isPartOfGroup) additionalSet.add(token);
                });
            }
        });

        locs.sort().forEach(loc => {
            const option = document.createElement("option");
            option.value = loc.toLowerCase();
            option.textContent = loc;
            groupFilter.appendChild(option);
        });

//        [...additionalSet].sort().forEach(val => {
//            const option = document.createElement("option");
//            option.value = val.toLowerCase();
//            option.textContent = val;
//            groupFilter.appendChild(option);
//        });
    },

    render(items) {
        const parent = elementById('list');
        parent.innerHTML = "";
        if(!items || !items.length) return;

        let ctx = {
            group: '',
            age: 0
        };

        items.forEach(c => {
            const card = Card.make(c, ctx, parent);
            const d = data[list.key].find(i=>i.id===c.id);
            card.dataset.data = JSON.stringify({type:'click',name:'list-item', data:d});
            parent.appendChild(card);
        });
    },
    renderList2(type, items) {
        const parent = elementById('list');
        if(!parent) return;
        parent.innerHTML = "";

        if(!items || !items.length) return;

        items.forEach(c=>{delete c.rendered});

        let ctx = { group: '' };
        let currentGroup = '';
        let currentTier = 1;

        items.forEach(c => {
            const card = Card.make2(c, 1, ctx, parent, items);
            if(card) {
                card.dataset.data = JSON.stringify({type:'click',name:'list-item', data: c});
                parent.appendChild(card);
            }
        });
    },
    applyFilter(type) {
        const items = data[type];
        if (!items) return;

        const nameVal = elementById(`${type}NameFilter`)?.value.toLowerCase() || "";
        const groupVal = groupFilter.value.toLowerCase();


        const filtered = items.filter(c => {
            const matchesName = !nameVal ||
                (c.name || "").toLowerCase().includes(nameVal) ||
                (c.id || "").toLowerCase().includes(nameVal);

            const matchesGroup = !groupVal ||
                (c.group || "").toLowerCase().includes(groupVal) ||
                (c.additional || "").toLowerCase().includes(groupVal);

            return matchesName && matchesGroup;
        });

        if (type === 'characters') {
            list.render(filtered);
        } else {
            list.renderList2(type, filtered);
        }
    },
    clickItem(c) {
        const container = createEl('div', 'popup-content');
        let item, originalItem;

        originalItem = data[list.key]?.find(i => i.id === c.id);
        if (!originalItem) return;

        item = JSON.parse(JSON.stringify(originalItem));
        delete item.group;
        item.fullSize = true;

        // Создаем карточку для попапа (уже полную)
        const card = (list.key === "characters")
            ? Card.make(item, {}, container)
            : Card.make2(item, 1, {}, container, [item]);

        if(card) {
            container.appendChild(card);
            controls.createPopup('search-detail-popup', 'map-loc-popup', container);
        }
    }
};