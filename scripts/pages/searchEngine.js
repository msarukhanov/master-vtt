const searchEngine = {
    index: [],
    txt: "",

    init() {
        this.buildIndex();
        nameFilter = elementById("searchNameFilter");

        document.addEventListener('keyup', (e) => {
            if (e.target.id.endsWith('NameFilter')) {
                const key = e.target.id.replace('NameFilter', '');
                searchEngine.query(e.target.value);
            }
        });
        setTimeout(() => nameFilter.focus(), 300);
    },

    buildIndex() {
        this.index = [];

        listKeys.forEach(key => {
            if (data[key]) {
                data[key].forEach(item => {
                    this.index.push({
                        id: item.id || '-',
                        name: item.name || item.title || "Unknown",
                        type: key, // character, faction, pantheon...
                        tags: (item.group || item.desc || "").toLowerCase()
                    });
                });
            }
        });

        currentSeason.notes.forEach(n => {
            this.index.push({ id: n.id, name: n.date, type: "note", tags: n.text.toLowerCase() });
        });
    },

    query(str) {
        this.text = str;
        const val = str.toLowerCase();
        const filtered = this.index.filter(i => {
            return i.id.toString().toLowerCase().includes(val) || i.name.toLowerCase().includes(val) || i.tags.includes(val)
        });
        searchEngine.render(filtered);
        return filtered;
    },

    render(items) {
        const parent = elementById('list');
        parent.innerHTML = "";
        if(!this.text) return;
        if(!items || !items.length) {
            parent.innerHTML = '<div></div><div class="list-empty">No results</div>';
            return;
        }

        let ctx = { group: '', age: 0 };

        items.forEach(c => {
            const card = (c.type === "characters")
                ? Card.make(c, ctx, parent)
                : Card.make2(c, 1, ctx, parent, items);

            if(card) {
                card.dataset.data = JSON.stringify({type:'click',name:'search-item', data: c});
                parent.appendChild(card);
            }
        });
    },

    clickItem(c) {
        const container = createEl('div', 'popup-content');

        let originalItem;
        if (c.type === "note") {
            originalItem = currentSeason.notes.find(n => n.id === c.id);
        } else {
            originalItem = data[c.type]?.find(i => i.id === c.id);
        }

        if (!originalItem) return;

        // Создаем карточку для попапа (уже полную)
        const card = (c.type === "characters")
            ? Card.make(originalItem, {}, container)
            : Card.make2(originalItem, 1, {}, container, [originalItem]);

        if(card) {
            container.appendChild(card);
            controls.createPopup('search-detail-popup', 'map-loc-popup', container);
        }
    }
};



