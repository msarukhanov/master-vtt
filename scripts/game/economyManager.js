const economyManager = {
    // 1. Считаем чистый доход фракции за один ход
    calculateFactionTick(factionId) {
        const income = {};

        map.resources.forEach(res => {
            income[res.id] = 0;
        });
        // const income = { gold: 0, wood: 0, ore: 0, food: 0 };
        const fId = String(factionId); // Приводим к строке для надежности

        // Собираем ресурсы со всех клеток gridData, принадлежащих фракции
        Object.values(globalMap.gridData || {}).forEach(cell => {
            if(String(cell.faction) === fId) {
                if (cell.yield) {
                    for (let resId in cell.yield) {
                        if (income.hasOwnProperty(resId)) {
                            income[resId] += cell.yield[resId];
                        }
                    }
                }
                if (cell.isCity) {
                    income.gold += 10;
                }

                // 3. БОНУС СТОЛИЦЫ: +25 золота
                if (cell.isCapital) {
                    income.gold += 25;
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

        data.factions.filter(f => !!f.territory).forEach(faction => {
            // 1. Сбор ресурсов с земли (твой код)
            const tick = this.calculateFactionTick(faction.id);
            if (!faction.resources) faction.resources = { gold: 0, wood: 0, ore: 0, food: 0 };

            for (let resId in tick) {
                faction.resources[resId] += tick[resId];
                if (resId !== 'gold' && faction.resources[resId] < 0) faction.resources[resId] = 0;
            }
            // 2. Включаем торговые процессы
            tradeManager.processAutoTrade(faction);

            // 3. Проверка на банкротство
            if (faction.resources.gold < -100) {
                console.warn(`${faction.name} в глубоком дефолте! Риск восстания.`);
            }
            else {
                console.log(`Фракция ${faction.name}: Доход ${JSON.stringify(tick)}, Итого в казне: ${JSON.stringify(faction.resources)}`);
            }
        });
    },

    refreshMasterEconomyUI() {
        // Тут будет код обновления таблицы фракций в Master Tools
        console.log("Интерфейс экономики обновлен.");
    },

    renderMasterTable() {
        const container = createEl('div', 'master-economy-container',0,null,'master-economy-container');
        container.innerHTML = '<h2>⚖️ Казна Фракций</h2>';

        const searchInp = Object.assign(createEl('input'), {
            type: 'text',
            placeholder: 'Поиск фракции...',
            className: 'eco-search'
        });
        searchInp.dataset.data = JSON.stringify({type:'input',name:'economy-faction-name'});

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

            // Считаем текущий расход для справки
            let currentUpkeep = 0;
            map.mapCharacters.forEach(c => {
                if (String(c.factionId) === String(faction.id)) currentUpkeep += (c.upkeep || 0);
            });

            const v = faction.resources || { gold: 0, wood: 0, ore: 0, food: 0 }; // Используем resources

            tr.innerHTML = `
                <td style="color:${faction.color}"><strong>${faction.name}</strong></td>
                <td><input type="number" class="eco-edit" data-data='${JSON.stringify({type:"change", name:"economy-faction-resources", data:{fid:faction.id, res:"gold"}})}' value="${v.gold}"></td>
                <td><input type="number" class="eco-edit" data-data='${JSON.stringify({type:"change", name:"economy-faction-resources", data:{fid:faction.id, res:"wood"}})}' value="${v.wood}"></td>
                <td><input type="number" class="eco-edit" data-data='${JSON.stringify({type:"change", name:"economy-faction-resources", data:{fid:faction.id, res:"ore"}})}' value="${v.ore}"></td>
                <td><input type="number" class="eco-edit" data-data='${JSON.stringify({type:"change", name:"economy-faction-resources", data:{fid:faction.id, res:"food"}})}' value="${v.food}"></td>
                <td class="upkeep-val">-${currentUpkeep}</td>
            `;

            tbody.append(tr);
        });

        table.append(tbody);
        container.append(table);

        // Кнопка принудительного начисления (если мастер хочет начислить ход вне очереди)
        const forceTurnBtn = createEl('button', 'master-btn', '➕ Начислить доход (ручной ход)');
        forceTurnBtn.dataset.data = JSON.stringify({type:'click',name:'economy-force'});

        container.append(forceTurnBtn);

        // Вызываем твой стандартный попап движка
        controls.createPopup('master-eco-popup', 'master-eco-popup', container);
    },
};
