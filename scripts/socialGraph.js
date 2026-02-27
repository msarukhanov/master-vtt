const colors = {
    family: '#e74c3c',
    partner: '#f1c40f',
    friend: '#3498db',
    faction: '#2ecc71',
    location: '#3498db' // синий для локаций
};

const socialGraph = {
    draw(item) {
        const svg = elementById("relationGraph");
        if (!svg) return;

        svg.innerHTML = "";
        const cx = 300, cy = 200, radius = 150;

        // 1. Собираем ВСЕ связи в один массив с указанием типа объекта (kind)
        const links = [];

        // Партнер
        if (item.relation?.id)
        links.push({ id: item.relation.id, label: item.relation.type, type: 'partner', kind: 'characters' });

        // Друзья
        (item.friends || []).forEach(id =>
            links.push({ id, label: "друг", type: 'friend', kind: 'characters' }));

        // Семья
        (item.family || []).forEach(f =>
            links.push({ id: f.id, label: f.type, type: 'family', kind: 'characters' }));

        (item.members || []).forEach(f =>
            links.push({ id: f.id, label: f.type, type: 'members', kind: 'characters' }));

        // ФРАКЦИИ (Добавляем новый тип связи)
        (item.factions || []).forEach(id =>
            links.push({ id, label: l10n[lang].is_in, type: 'faction', kind: 'factions' }));

        if (item.location)
            links.push({ id: item.location, label: l10n[lang].location, type: 'location', kind: 'locations', isName: true });

        if (item.group)
            links.push({ id: item.group, label: l10n[lang].work, type: 'location', kind: 'locations', isName: true });

        if (item.residence)
            links.push({ id: item.residence, label: l10n[lang].residence, type: 'location', kind: 'locations', isName: true });

        let svgContent = "";

        // 2. Сначала рисуем ЛИНИИ
        links.forEach((link, i) => {
            const angle = (i / links.length) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            // Цветовая кодировка линий
            const colors = { family: '#e74c3c', partner: '#f1c40f', friend: '#3498db', faction: '#2ecc71' };
            const color = colors[link.type] || '#666';

            svgContent += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="2" opacity="0.5" />`;
            svgContent += `<text x="${(cx + x) / 2}" y="${(cy + y) / 2 - 5}" font-size="10" fill="#999" text-anchor="middle">${link.label}</text>`;
        });

        // 3. Рисуем ЦЕНТРАЛЬНЫЙ узел (Персонаж)
        svgContent += this.getNodeHtml(cx, cy, item.name, item.id, 'main', 'characters');

        // 4. Рисуем ПЕРИФЕРИЙНЫЕ узлы
        links.forEach((link, i) => {
            const angle = (i / links.length) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            const other = socialGraph.getObject(link.id,link.kind);

            if (other) {
                svgContent += this.getNodeHtml(x, y, other.name || other.id, other.id, 'other', link.kind);
            }
        });

        svg.innerHTML = svgContent;
        elementById("graph-popup-name").innerHTML = item.name;
    },

    getNodeHtml(x, y, name, id, type, kind) {
        const isMain = type === 'main';
        const isFact = kind === 'factions';
        const isLoc = kind === 'locations';

        // Цвета: Оранжевый (центр), Зеленый (фракция), Синий (локация), Серый (персонаж)
        const color = isMain ? "var(--active–color)" :
            isFact ? "#27ae60" :
                isLoc  ? "#2980b9" : "#444";

        const safeName = name.length > 12 ? name.substring(0, 10) + '..' : name;

        let shape = "";
        if (isFact) {
            // Прямоугольник для фракций
            shape = `<rect x="${x-40}" y="${y-20}" width="80" height="40" rx="5" fill="${color}" stroke="#222" />`;
        } else if (isLoc) {
            // РОМБ для локаций (через polygon)
            shape = `<polygon points="${x},${y-30} ${x+40},${y} ${x},${y+30} ${x-40},${y}" fill="${color}" stroke="#222" />`;
        } else {
            // КРУГ для людей
            shape = `<circle cx="${x}" cy="${y}" r="35" fill="${color}" stroke="#222" stroke-width="2"/>`;
        }

        // ЛОГИКА КЛИКА:
        // Если локация — закрываем граф и вызываем твой клик по карте (clickLocMap)
        // Если другое — перерисовываем граф вокруг этого объекта
        const clickAction = isLoc
            ? `document.getElementById('graph-popup')?.remove(); controls.changeTab('map'); setTimeout(() => { clickLocMap({srcElement: {id: 'loc-${id}', data: '${name}'}}); }, 100);`
            : `socialGraph.draw(socialGraph.getObject('${id}', '${kind}'))`;

        return `
        <g class="graph-node" onclick="${clickAction}" style="cursor:pointer">
            ${shape}
            <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
                  fill="#fff" font-size="11" font-weight="${isMain ? 'bold' : 'normal'}">
                ${safeName}
            </text>
        </g>
    `;
    },

    //
    //
    // getNodeHtml(x, y, name, id, type, kind) {
    //     const isMain = type === 'main';
    //     const isFact = kind === 'factions';
    //     const color = isMain ? "var(--active–color)" : (isFact ? "#27ae60" : "#444");
    //     const safeName = name.length > 12 ? name.substring(0, 10) + '..' : name;
    //
    //     const shape = isFact
    //         ? `<rect x="${x-40}" y="${y-20}" width="80" height="40" rx="5" fill="${color}" stroke="#222" />`
    //         : `<circle cx="${x}" cy="${y}" r="35" fill="${color}" stroke="#222" stroke-width="2"/>`;
    //
    //     // ИСПРАВЛЕНИЕ: Передаем в onclick команду перерисовки графа для этого объекта
    //     // Мы используем строковую команду, которая выполнится в контексте браузера при клике
    //     const clickAction = `socialGraph.draw(socialGraph.getObject('${id}', '${kind}'))`;
    //
    //     return `
    //         <g class="graph-node" onclick="${clickAction}" style="cursor:pointer">
    //             ${shape}
    //             <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
    //                   fill="#fff" font-size="11" font-weight="${isMain ? 'bold' : 'normal'}">
    //                 ${safeName}
    //             </text>
    //         </g>
    //     `;
    // },

    popUp(item) {
        // 1. Создаем контейнер для SVG
        const wrapper = createEl('div', 'graph-popup-wrapper');
        wrapper.innerHTML = `
        <h2 style="text-align:center; margin-bottom:10px;">Связи: <span id="graph-popup-name">${item.name}</span></h2>
        <div class="graph-svg-container">
            <svg id="relationGraph" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto; background:#111; border-radius:8px; border:1px solid #444;"></svg>
        </div>
        <p style="text-align:center; font-size:12px; color:#888; margin-top:10px;">${l10n[lang].click_graph_text}</p>
    `;

        controls.createPopup('graph-popup', 'graph-popup', wrapper);
        socialGraph.draw(item);
    },

    getObject(id, type) {
        if (!data[type]) return null;
        // Сначала ищем по ID, если не нашли — по имени (для локаций)
        return data[type].find(i => i.id === id) || data[type].find(i => i.name === id);
    }
};

