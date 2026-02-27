let nameFilter = elementById("nameFilter");
let groupFilter = elementById("groupFilter");

const list = {
    init(key) {
        nameFilter = elementById("nameFilter");
        groupFilter = elementById("groupFilter");

        const items = data[key];
        if (!items) return;

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
    }
};