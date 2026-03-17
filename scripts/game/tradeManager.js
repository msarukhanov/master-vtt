const tradeManager = {
    // Настройки цен (базовая стоимость ресурсов в золоте)
    marketPrices: {
        wood: 2,
        ore: 4,
        food: 1
    },

    terrainWeights: {
        'road': 1,
        'grass': 2,
        'forest': 5,
        'sea': 1,
        'mountain': 999
    },

    nextTurn() {
        const {gridData} = hexFunction.data;
        console.log("🌀 Пересчет глобальной логистики...");

        // 1. ВНЕШНИЕ ПУТИ (Пакты)
        if (currentSeason.contracts) {
            Object.keys(currentSeason.contracts).forEach(key => {
                const [id1, id2] = key.split('_');
                const contract = currentSeason.contracts[key];
                if (contract.trade) {
                    // Ищем и сохраняем путь прямо в контракт
                    contract.path = tradeManager.findPhysicalRoute(id1, id2);
                } else {
                    contract.path = null;
                }
            });
        }

        // 2. ВНУТРЕННИЕ ПУТИ (Снабжение городов)
        (data.factions.filter(i=>i.territory)).forEach(faction => {
            const fId = String(faction.id);
            const capital = tradeManager.getFactionCapital(fId);
            if (!capital) return;

            // Инициализируем массив путей снабжения для фракции в стейте сезона
            if (!currentSeason.supplyLines) currentSeason.supplyLines = {};
            currentSeason.supplyLines[fId] = [];

            // Ищем все города этой фракции
            Object.keys(gridData).forEach(key => {
                const [q, r] = key.split('_');
                const cell = gridData[key];
                if (String(cell.faction) === fId && cell.isCity && !cell.isCapital) {
                    const cityPos = { q: Number(q), r: Number(r)};
                    const path = tradeManager.findRouteByCoords(cityPos, capital, fId, fId);
                    if (path) {
                        currentSeason.supplyLines[fId].push(path);
                    }
                }
            });
        });

        hexFunction.updateHex();
    },

    // 1. Поиск торговых партнеров
    getPotentialPartners(factionId) {
        return data.factions.filter(f => {
            if (f.id === factionId) return false;
            // const rel = diplomacyManager.getRelation(factionId, f.id);
            const rel = factionManager.moveCellAllowed(factionId, f.id);
            return rel >= 0; // Торгуем только с нейтралами и союзниками
        });
    },

    // 2. Логика автоматической торговли (вызывается в nextTurn)
    processAutoTrade(faction) {
        if (!faction.resources || !faction.resources.gold) return;

        const partners = this.getPotentialPartners(faction.id);
        // Список торгуемых ресурсов (все кроме золота)
        const tradableResources = ['wood', 'ore', 'food'];

        partners.forEach(partner => {
            if (!partner.resources) return;

            const contract = diplomacyManager.getContract(faction.id, partner.id);

            // Торгуем ТОЛЬКО если подписан пакт
            if (!contract.trade) return;

            // const rel = diplomacyManager.getRelation(faction.id, partner.id);
            const rel = factionManager.moveCellAllowed(faction.id, partner.id);

            // Внутри economyManager.processAutoTrade
            const route = tradeManager.findPhysicalRoute(faction.id, partner.id);
            if (!route || route.length === 0) {
                console.log(`⚠️ Путь между ${faction.name} и ${partner.name} заблокирован!`);
                return; // Торговля невозможна физически
            }
            contract.path = route;

            // Коэффициент выгоды теперь зависит от отношений (в союзе торговать приятнее)
            const relBonus = rel >= 100 ? 0.1 : 0;
            // Доп. бонус к выгоде, если фракции в союзе (еще больше "халявы" из воздуха)
            const allianceBonus = rel >= 100 ? 0.1 : 0;

            tradableResources.forEach(resId => {
                const basePrice = this.marketPrices[resId] || 1;
                const amount = 10; // Базовая пачка товара

                // УСЛОВИЕ: У нас мало (<10), у партнера избыток (>50)
                if (faction.resources[resId] < 10 && partner.resources[resId] > 50) {

                    const distance = route.length;
                    // Логистический налог: каждые 10 гексов съедают 5% выгоды
                    const logisticsTax = Math.min(0.3, (distance / 10) * 0.05);

                    const costForBuyer = Math.floor(amount * basePrice * (0.8 - allianceBonus + logisticsTax));
                    const gainForSeller = Math.floor(amount * basePrice * (1.2 + allianceBonus - logisticsTax));

                    // const costForBuyer = Math.floor(amount * basePrice * (0.8 - allianceBonus));
                    //
                    // const gainForSeller = Math.floor(amount * basePrice * (1.2 + allianceBonus));

                    // Проверяем, есть ли у покупателя золото
                    if (faction.resources.gold >= costForBuyer) {
                        // 1. Списываем/Начисляем ресурсы
                        faction.resources[resId] += amount;
                        partner.resources[resId] -= amount;

                        // 2. Денежный обмен (генерация прибыли из торгового оборота)
                        faction.resources.gold -= costForBuyer;
                        partner.resources.gold += gainForSeller;

                        console.log(`📦 [ТОРГОВЛЯ] ${faction.name} купил ${amount} ${resId} у ${partner.name}.`);
                        console.log(`💰 Экономика: Покупатель потратил ${costForBuyer}, Продавец получил ${gainForSeller}`);
                    }
                }
            });
        });
    },

    // 1. Поиск столицы фракции
    getFactionCapital(factionId) {
        const {gridData} = hexFunction.data;
        const capEntry = Object.entries(gridData).find(([key, cell]) =>
            String(cell.faction) === String(factionId) && cell.isCapital === true
        );

        // Если мастер не назначил столицу — берем первый гекс (fallback)
        const target = capEntry || Object.entries(gridData).find(([key, cell]) =>
            String(cell.faction) === String(factionId)
        );

        if (!target) return null;
        const [q, r] = target[0].split('_').map(Number);
        return { q, r };
    },

    // 2. Детектор порта (соседство с водой)
    isCoastal(q, r) {
        const {gridData} = hexFunction.data;
        const cell = gridData[`${q}_${r}`];
        if (!cell || cell.terrain === 'sea') return false;
        if (!cell.isPort) return false;

        const directions = [
            {q: 1, r: 0}, {q: 1, r: -1}, {q: 0, r: -1},
            {q: -1, r: 0}, {q: -1, r: 1}, {q: 0, r: 1}
        ];

        return directions.some(d => {
            const neighbor = gridData[`${q + d.q}_${r + d.r}`];
            return neighbor && neighbor.terrain === 'sea';
        });
    },

    findRouteByCoords(start, end, id1, id2) {
        if (!start || !end) return null;

        // ВОЗВРАЩАЕМ ТВОЮ СТРОКУ (все переменные на месте)
        const {gridData} = hexFunction.data;

        // Вспомогательная эвристика (h)
        const getH = (a, b) => (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;

        // В очереди f — приоритет для сортировки, cost — реальный пройденный путь
        let queue = [{ path: [start], cost: 0, f: getH(start, end) }];
        let visited = new Map();

        while (queue.length > 0) {
            // СОРТИРОВКА ПО f (прогноз + реальность)
            queue.sort((a, b) => a.f - b.f);

            let { path, cost } = queue.shift();
            let current = path[path.length - 1];
            let currentKey = `${current.q}_${current.r}`;

            // Проверка посещенности по РЕАЛЬНОМУ весу (cost)
            if (visited.has(currentKey) && visited.get(currentKey) <= cost) continue;
            visited.set(currentKey, cost);

            if (current.q === end.q && current.r === end.r) return path;

            const neighbors = [
                {q: 1, r: 0}, {q: 1, r: -1}, {q: 0, r: -1},
                {q: -1, r: 0}, {q: -1, r: 1}, {q: 0, r: 1}
            ].map(d => ({ q: current.q + d.q, r: current.r + d.r }));

            for (let n of neighbors) {
                const nKey = `${n.q}_${n.r}`;
                const nCell = gridData[nKey];

                // Базовые фильтры
                if (!nCell || nCell.terrain === 'mountain' || nCell.terrain === 'rockMountain') continue;

                const currentCell = gridData[currentKey];

                // Проверка высоты
                if (Math.abs(Number(currentCell.height || 1) - Number(nCell.height || 1)) >= 1) continue;

                // // Дипломатия
                // if (diplomacyManager.getRelation(id1, nCell.owner) < 0) continue;
                // if (diplomacyManager.getRelation(id2, nCell.owner) < 0) continue;

                const isCurrentSea = currentCell.terrain === 'sea';
                const isTargetSea = nCell.terrain === 'sea';

                // Морская логика (использует твой isCoastal)
                if (!isCurrentSea && isTargetSea && !this.isCoastal(current.q, current.r)) continue;
                if (isCurrentSea && !isTargetSea && !this.isCoastal(n.q, n.r)) continue;

                // Дипломатия транзита
                if (nCell.faction && !factionManager.moveCellAllowed(id1, nCell.faction)) {
                    continue; // Гекс непроходим из-за политики
                }
                // if (!isTargetSea && nCell.owner && nCell.owner !== id1 && nCell.owner !== id2) {
                //     const relation = diplomacyManager.getRelation(id1, nCell.owner);
                //     const isPublicHub = nCell.isCity || nCell.isTradeHub;
                //     if (isPublicHub) {
                //         if (relation <= 0) continue;
                //     } else {
                //         if (relation <= 50) continue;
                //     }
                // }

                // Веса шага
                let stepWeight;
                if (nCell.isCapital || nCell.isCity) stepWeight = 0.5;
                else if (nCell.isTradeHub) stepWeight = 0.1;
                else stepWeight = this.terrainWeights[nCell.terrain] || 2;

                const nextCost = cost + stepWeight;

                queue.push({
                    path: [...path, n],
                    cost: nextCost,
                    f: nextCost + getH(n, end) // Новая f для следующей сортировки
                });
            }
        }
        return null;
    },

    // 4. ГЛОБАЛЬНЫЙ МЕТОД: Поиск между фракциями (использует мотор выше)
    findPhysicalRoute(id1, id2) {
        const start = this.getFactionCapital(id1);
        const end = this.getFactionCapital(id2);

        // Передаем координаты в универсальный искатель
        return this.findRouteByCoords(start, end, id1, id2);
    },

    renderTradePaths() {
        const {ctx, sizes:{cellSize, bounds}, camera:{zoom}} = hexFunction.data;
        if (!currentSeason.contracts && !currentSeason.supplyLines) return;

        if(currentSeason.supplyLines) {
            Object.values(currentSeason.supplyLines).flat().forEach(path => {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = "rgba(0, 255, 255, 1)"; // gold
                path.forEach((step, index) => {
                    const pos = hexFunction.hexToPixel(step.q, step.r);
                    if(regionMap.ctx) {
                        pos.x = (pos.x - bounds.x);
                        pos.y = (pos.y - bounds.y)
                    }
                    if (index === 0) ctx.moveTo(pos.x, pos.y);
                    else ctx.lineTo(pos.x, pos.y);
                });
                ctx.stroke();
            });
        }

        if(currentSeason.contracts) {
            Object.values(currentSeason.contracts).forEach(contract => {
                // const canvas = elementById('grid-canvas');
                // const ctx = canvas.getContext('2d');
                if (contract.trade && contract.path) {
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "rgba(255, 215, 0, 1)"; // gold
                    // ctx.setLineDash([5, 5]); // Пунктир, чтобы не путать с границами

                    contract.path.forEach((step, index) => {
                        const pos = hexFunction.hexToPixel(step.q, step.r);
                        if(regionMap.ctx) {
                            pos.x = (pos.x - bounds.x);
                            pos.y = (pos.y - bounds.y)
                        }
                        if (index === 0) ctx.moveTo(pos.x, pos.y);
                        else ctx.lineTo(pos.x, pos.y);
                    });
                    ctx.stroke();
                    // ctx.setLineDash([]); // Сброс пунктира
                }
            });
        }


    },

    // 3. Интерфейс создания торгового пакта (для Мастера)
    renderTradeEditor(f1Id, f2Id) {
        const rel = diplomacyManager.getRelation(f1Id, f2Id);
        if (rel < 0) return '<div>Торговля невозможна: Война</div>';

        const cont = createEl('div', 'trade-setup');
        cont.innerHTML = `
            <h4>Настройка каравана</h4>
            <select id="trade-res">
                ${Object.keys(this.marketPrices).map(res => `<option value="${res}">${res}</option>`).join('')}
            </select>
            <input type="number" id="trade-amount" value="5">
            <button class="diplo-mini-btn">Запустить караван</button>
        `;
        // Привязка к твоему глобальному обработчику через dataset
        cont.querySelector('button').dataset.data = JSON.stringify({
            type: 'click',
            name: 'create-trade-route',
            data: { from: f1Id, to: f2Id }
        });
        return cont;
    }
};