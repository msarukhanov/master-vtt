const diplomacyManager = {
    statuses: [
        { value: -100, label: '😡 Война', color: '#ff4d4d' },
        { value: 0, label: '😐 Нейтралитет', color: '#ccc' },
        { value: 100, label: '🤝 Союз', color: '#4dff88' }
    ],

    init() {
        const container = createEl('div', 'master-diplomacy-container');
        container.innerHTML = '<h2>📜 Дипломатический Корпус</h2>';

        // 1. Селект выбора "Главной" фракции
        const header = createEl('div', 'diplo-header');
        header.innerHTML = '<span>Отношения для: </span>';

        const mainSelect = createEl('select', 'diplo-main-select');

        // data.factions
        data.factions.filter(f => !!f.territory).forEach(f => {
            const opt = createEl('option');
            opt.value = f.id;
            opt.innerText = f.name;
            mainSelect.append(opt);
        });

        // 2. Список оппонентов (Таблица)
        const tableCont = createEl('div', 'diplo-table-cont',0,null,'diplo-table-cont');
        tableCont.dataset.data = JSON.stringify({type:'input',name:'diplomacy-faction-select'});

        header.append(mainSelect);
        container.append(header, tableCont);

        controls.createPopup('master-diplo-popup', 'master-eco-popup', container);

        diplomacyManager.refreshList(mainSelect.value); // Инициализация
    },

    // Получить статус между двумя фракциями
    getRelation(id1, id2) {
        const key = [id1, id2].sort().join('_');
        return currentSeason.diplomacy?.[key] ?? 50; // По умолчанию нейтралы
    },

    // Установить статус
    setRelation(id1, id2, value) {

        if (!currentSeason.diplomacy) currentSeason.diplomacy = {};
        const key = [id1, id2].sort().join('_');
        currentSeason.diplomacy[key] = parseInt(value);

        // ЕСЛИ ВОЙНА (0) — ПРИНУДИТЕЛЬНО РАЗРЫВАЕМ ВСЕ ПАКТЫ
        if (parseInt(value) === 0) {
            if (currentSeason.contracts && currentSeason.contracts[key]) {
                currentSeason.contracts[key].trade = false;
                currentSeason.contracts[key].openBorders = false; // На будущее
                console.log(`🧨 Все пакты между ${key} аннулированы из-за войны!`);
            }
        }
        console.log(currentSeason);
        console.log(`Relation ${key} updated to ${value}`);
        // Здесь обычно вызывается ререндер списка, чтобы UI обновился
        this.refreshList(id1);

        // dbManager.saveGame(...);
    },

    canTrade(id1, id2) {
        return this.getRelation(id1, id2) >= 50;
    },

    toggleTrade(id1, id2) {
        if (!currentSeason.contracts) currentSeason.contracts = {};
        const key = [id1, id2].sort().join('_');
        if (!currentSeason.contracts[key]) currentSeason.contracts[key] = { trade: false };

        // Инвертируем статус торговли
        currentSeason.contracts[key].trade = !currentSeason.contracts[key].trade;

        // Если началась война (0), пакт аннулируется автоматически
        if (this.getRelation(id1, id2) === 0) currentSeason.contracts[key].trade = false;
    },

    getContract(id1, id2) {
        // 1. Создаем уникальный симметричный ключ (напр. "f1_f12")
        const key = [String(id1), String(id2)].sort().join('_');

        // 2. Если реестра контрактов еще нет в объекте карты — создаем пустой
        if (!currentSeason.contracts) currentSeason.contracts = {};

        // 3. Возвращаем объект контракта или дефолтные значения (все выключено)
        return currentSeason.contracts[key] || {
            trade: false,
            openBorders: false,
            alliance: false
        };
    },

    toggleContract(id1, id2, type = 'trade') {
        const key = [String(id1), String(id2)].sort().join('_');

        if (!currentSeason.contracts) currentSeason.contracts = {};
        if (!currentSeason.contracts[key]) {
            currentSeason.contracts[key] = { trade: false, openBorders: false, alliance: false };
        }

        // Инвертируем булево значение (true -> false / false -> true)
        currentSeason.contracts[key][type] = !currentSeason.contracts[key][type];

        console.log(`Contract ${type} between ${key} is now: ${currentSeason.contracts[key][type]}`);

        // Здесь можно вызвать сохранение в IndexedDB
        // dbManager.saveGame();
    },


    refreshList(currentId) {
        const tableCont = elementById('diplo-table-cont');
        tableCont.innerHTML = '';
        const table = createEl('table', 'economy-table');
        table.innerHTML = `<thead><tr><th>Оппонент</th><th>Статус</th><th>Действие</th><th>Пакты</th></tr></thead>`;
        const tbody = createEl('tbody');

        data.factions.filter(f => f.id !== currentId).forEach(opp => {
            const tr = createEl('tr');
            const rel = diplomacyManager.getRelation(currentId, opp.id);
            const currentStatus = this.statuses.find(s => s.value === rel) || diplomacyManager.statuses[1];
            const isWar = rel < 0; // Проверка на состояние войны

            tr.innerHTML = `
                <td style="color:${opp.color}"><strong>${opp.name}</strong></td>
                <td class="status-cell" style="color:${currentStatus.color}">${currentStatus.label}</td>
                <td class="actions-cell"></td>
                <td class="contracts-cell"></td>
            `;

            // 1. Кнопки смены дипломатического статуса
            const actionsTd = tr.querySelector('.actions-cell');
            diplomacyManager.statuses.forEach(s => {
                const btn = createEl('button', 'diplo-mini-btn', s.label.split(' ')[0]);
                btn.title = s.label;
                if (s.value === rel) btn.style.border = '2px solid white';
                btn.dataset.data = JSON.stringify({
                    type: 'click',
                    name: 'diplomacy-manager-rel',
                    data: { id: currentId, oppId: opp.id, value: s.value }
                });
                actionsTd.append(btn);
            });

            // 2. Логика Пактов (Торговля)
            const contractsTd = tr.querySelector('.contracts-cell');

            if (isWar) {
                // Если война — пакты невозможны
                contractsTd.innerHTML = `<span style="color:#ff4d4d; font-size:10px;">🚫 Блокировано войной</span>`;
            } else {
                // Если мира/союз — показываем кнопку управления пактом
                const contract = diplomacyManager.getContract(currentId, opp.id);
                const tradeBtn = createEl('button', `diplo-contract-btn ${contract.trade ? 'active' : ''}`);
                tradeBtn.innerHTML = contract.trade ? '📦 Пакт: ✅' : '📦 Пакт: ❌';
                tradeBtn.dataset.data = JSON.stringify({
                    type: 'click',
                    name: 'diplomacy-toggle-trade-contract',
                    data: { id1: currentId, id2: opp.id }
                });
                contractsTd.append(tradeBtn);
            }

            tbody.append(tr);
        });
        table.append(tbody);
        tableCont.append(table);
    }

};
