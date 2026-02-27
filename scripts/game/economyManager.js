const economyManager = {
    // 1. Считаем чистый доход фракции за один ход
    calculateFactionTick(factionId) {
        const income = {};
        data.resources = [
            { id: 'gold', name: 'Золото', icon: '💰' },
            { id: 'wood', name: 'Дерево', icon: '🪵' },
            { id: 'ore', name: 'Руда', icon: '⛏️' },
            { id: 'food', name: 'Еда', icon: '🍞' }
        ];
        data.resources.forEach(res => {
            income[res.id] = 0;
        });
        // const income = { gold: 0, wood: 0, ore: 0, food: 0 };
        const fId = String(factionId); // Приводим к строке для надежности

        // Собираем ресурсы со всех клеток gridData, принадлежащих фракции
        Object.values(map.gridData || {}).forEach(cell => {
            if (String(cell.owner) === fId && cell.yield) {
                for (let resId in cell.yield) {
                    if (income.hasOwnProperty(resId)) {
                        income[resId] += cell.yield[resId];
                    }
                }
            }
        });

        // Считаем расходы (Upkeep) персонажей этой фракции
        let totalUpkeep = 0;
        map.mapCharacters.forEach(char => {
            // Если персонаж принадлежит фракции и у него есть стоимость содержания
            // if (String(char.factionId) === fId && char.upkeep) {
            //     totalUpkeep += char.upkeep;
            // }
        });

        income.gold -= totalUpkeep; // Вычитаем зарплаты из золота
        return income;
    },

    // 2. Главная функция: Процесс перехода хода
    nextTurn() {
        console.log("=== НАЧАЛО НОВОГО ХОДА: РАСЧЕТ ЭКОНОМИКИ ===");

        (data.factions.filter(i=>!!i.territory)).forEach(faction => {
            const tick = this.calculateFactionTick(faction.id);

            // Инициализируем казну, если её нет
            if (!faction.resources) faction.resources = { gold: 0, wood: 0, ore: 0, food: 0 };

            // Применяем изменения
            for (let resId in tick) {
                faction.resources[resId] += tick[resId];

                // Защита от отрицательных ресурсов (кроме золота, там может быть долг)
                if (resId !== 'gold' && faction.resources[resId] < 0) faction.resources[resId] = 0;
            }

            console.log(`Фракция ${faction.name}: Доход ${JSON.stringify(tick)}, Итого в казне: ${JSON.stringify(faction.resources)}`);
        });

        // Сохраняем состояние игры после начисления ресурсов
        // dbManager.saveGame('seasons', gameData.seasons);

        // Если есть UI для Мастера — обновляем его
        this.refreshMasterEconomyUI();
    },

    refreshMasterEconomyUI() {
        // Тут будет код обновления таблицы фракций в Master Tools
        console.log("Интерфейс экономики обновлен.");
    },

    renderMasterTable() {
        const container = createEl('div', 'master-economy-container');
        container.innerHTML = '<h2>⚖️ Казна Фракций</h2>';

        const searchInp = Object.assign(createEl('input'), {
            type: 'text',
            placeholder: 'Поиск фракции...',
            className: 'eco-search'
        });

        searchInp.oninput = (e) => {
            const val = e.target.value.toLowerCase();
            container.querySelectorAll('tbody tr').forEach(tr => {
                const name = tr.querySelector('td').innerText.toLowerCase();
                tr.style.display = name.includes(val) ? '' : 'none';
            });
        };
        container.prepend(searchInp);

        const table = createEl('table', 'economy-table');
        // Шапка таблицы
        table.innerHTML = `
        <thead>
            <tr>
                <th>Фракция</th>
                <th>💰 Золото</th>
                <th>🪵 Дерево</th>
                <th>⛏️ Руда</th>
                <th>🍞 Еда</th>
                <th>📉 Upkeep</th>
            </tr>
        </thead>
    `;

        const tbody = createEl('tbody');

        data.factions.forEach(faction => {
            const tr = createEl('tr');
            const v = faction.vault || { gold: 0, wood: 0, ore: 0, food: 0 };

            // Считаем текущий расход для справки
            let currentUpkeep = 0;
            map.mapCharacters.forEach(c => {
                if (String(c.factionId) === String(faction.id)) currentUpkeep += (c.upkeep || 0);
            });

            tr.innerHTML = `
            <td style="color:${faction.color}"><strong>${faction.name}</strong></td>
            <td><input type="number" class="eco-edit" data-fid="${faction.id}" data-res="gold" value="${v.gold}"></td>
            <td><input type="number" class="eco-edit" data-fid="${faction.id}" data-res="wood" value="${v.wood}"></td>
            <td><input type="number" class="eco-edit" data-fid="${faction.id}" data-res="ore" value="${v.ore}"></td>
            <td><input type="number" class="eco-edit" data-fid="${faction.id}" data-res="food" value="${v.food}"></td>
            <td class="upkeep-val">-${currentUpkeep}</td>
        `;

            // Вешаем сохранение на лету
            tr.querySelectorAll('.eco-edit').forEach(input => {
                input.onchange = (e) => {
                    const fid = e.target.dataset.fid;
                    const res = e.target.dataset.res;
                    const val = parseInt(e.target.value) || 0;

                    const targetFaction = data.factions.find(f => String(f.id) === String(fid));
                    if (targetFaction) {
                        targetFaction.vault[res] = val;
                        dbManager.saveGame(currentGame, gameData[currentGame]);
                    }
                };
            });

            tbody.append(tr);
        });

        table.append(tbody);
        container.append(table);

        // Кнопка принудительного начисления (если мастер хочет начислить ход вне очереди)
        const forceTurnBtn = createEl('button', 'master-btn', '➕ Начислить доход (ручной ход)');
        forceTurnBtn.onclick = () => {
            if(confirm("Начислить ресурсы всем фракциям прямо сейчас?")) {
                this.nextTurn();
                this.renderMasterTable(); // Перерисовать таблицу
            }
        };

        container.append(forceTurnBtn);

        // Вызываем твой стандартный попап движка
        controls.createPopup('master-eco-popup', 'master-eco-popup', container);
    },
};

const diplomacyManager = {
    statuses: [
        { value: 0, label: '😡 Война', color: '#ff4d4d' },
        { value: 50, label: '😐 Нейтралитет', color: '#ccc' },
        { value: 100, label: '🤝 Союз', color: '#4dff88' }
    ],

    // Получить статус между двумя фракциями
    getRelation(id1, id2) {
        const key = [id1, id2].sort().join('_');
        return map.diplomacy?.[key] ?? 50; // По умолчанию нейтралы
    },

    // Установить статус
    setRelation(id1, id2, value) {
        if (!map.diplomacy) map.diplomacy = {};
        const key = [id1, id2].sort().join('_');
        map.diplomacy[key] = parseInt(value);
        console.log(`Relation ${key} updated to ${value}`);
        // dbManager.saveGame(...);
    },

    renderMasterDiplomacy() {
        const container = createEl('div', 'master-diplomacy-container');
        container.innerHTML = '<h2>📜 Дипломатический Корпус</h2>';

        // 1. Селект выбора "Главной" фракции
        const header = createEl('div', 'diplo-header');
        header.innerHTML = '<span>Отношения для: </span>';

        const mainSelect = createEl('select', 'diplo-main-select');
        data.factions.forEach(f => {
            const opt = createEl('option');
            opt.value = f.id;
            opt.innerText = f.name;
            mainSelect.append(opt);
        });

        // 2. Список оппонентов (Таблица)
        const tableCont = createEl('div', 'diplo-table-cont');

        const refreshList = (currentId) => {
            tableCont.innerHTML = '';
            const table = createEl('table', 'economy-table'); // Используем твой стиль
            table.innerHTML = `<thead><tr><th>Оппонент</th><th>Статус</th><th>Действие</th></tr></thead>`;
            const tbody = createEl('tbody');

            data.factions.filter(f => f.id !== currentId).forEach(opp => {
                const tr = createEl('tr');
                const rel = this.getRelation(currentId, opp.id);
                const currentStatus = this.statuses.find(s => s.value === rel) || this.statuses[1];

                tr.innerHTML = `
                    <td style="color:${opp.color}"><strong>${opp.name}</strong></td>
                    <td class="status-cell" style="color:${currentStatus.color}">${currentStatus.label}</td>
                    <td></td>
                `;

                // Кнопки быстрой смены
                const actionsTd = tr.querySelector('td:last-child');
                this.statuses.forEach(s => {
                    const btn = createEl('button', 'diplo-mini-btn', s.label.split(' ')[0]); // Только эмодзи
                    btn.title = s.label;
                    if (s.value === rel) btn.style.border = '2px solid white';

                    btn.onclick = () => {
                        this.setRelation(currentId, opp.id, s.value);
                        refreshList(currentId); // Перерисовываем
                    };
                    actionsTd.append(btn);
                });

                tbody.append(tr);
            });
            table.append(tbody);
            tableCont.append(table);
        };

        mainSelect.onchange = (e) => refreshList(e.target.value);
        header.append(mainSelect);
        container.append(header, tableCont);

        refreshList(mainSelect.value); // Инициализация

        controls.createPopup('master-diplo-popup', 'master-eco-popup', container);
    }
};
