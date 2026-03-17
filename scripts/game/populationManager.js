// social: {
//     population: 5000,
//     happiness: 1.0,
//     cultures: { "elves": 1.0 },   // Доли (1.0 = 100%)
//     religions: { "forest_gods": 1.0 },
//     dominance: {
//         culture: "elves",
//         religion: "forest_gods"
//     },
//     pressure: { cultures: {}, religions: {} } // Буфер для расчетов
// }

const populationManager = {
    // Основной цикл: вызываем в turnManager после tradeManager.refreshAllPaths()
    nextTurn() {
        const { gridData } = hexFunction.data;
        console.log("👥 Обработка демографии и культурного влияния...");

        // 1. СБРОС ДАВЛЕНИЯ (подготовка к новому расчету)
        Object.values(gridData).forEach(cell => {
            if (cell.social) {
                cell.social.pressure = { cultures: {}, religions: {} };
            }
        });

        // 2. СБОР ВНЕШНЕГО ДАВЛЕНИЯ (Соседи + Государственные центры)
        Object.keys(gridData).forEach(key => {
            const cell = gridData[key];
            const [q, r] = key.split('_').map(Number);
            if (!cell.social) return;

            // А) Диффузия от соседей (культура и вера "перетекают" через границы)
            const neighbors = hexFunction.getNeighbors(q,r);
            neighbors.forEach(nKey => {
                const nCell = gridData[nKey];
                if (nCell && nCell.social && nCell.social.dominance) {
                    this.addPressure(cell, 'cultures', nCell.social.dominance.culture, 0.05);
                    this.addPressure(cell, 'religions', nCell.social.dominance.religion, 0.05);
                }
            });

            // Б) Государственный прессинг (Столица и Храмы генерируют мощное влияние)
            if (cell.isCapital || cell.hasTemple) {
                const faction = data.factions.find(f => String(f.id) === String(cell.faction));
                if (faction) {
                    this.addPressure(cell, 'cultures', faction.culture, 0.25);
                    this.addPressure(cell, 'religions', faction.religion, 0.3);
                }
            }
        });

        // 3. МИССИОНЕРСТВО И ТОРГОВАЯ ЭКСПАНСИЯ (через твои supplyLines)
        this.processTradePressure();

        // 4. ФИНАЛЬНОЕ ОБНОВЛЕНИЕ КАЖДОГО ГЕКСА
        Object.keys(gridData).forEach(key => {
            const cell = gridData[key];
            if (!cell.social) return;

            const fId = String(cell.faction);
            const faction = data.factions.find(f => String(f.id) === fId);
            const hasSupply = this.checkSupply(key, fId);

            // А) Рост/Упадок населения (зависит от снабжения и счастья)
            this.updateGrowth(cell, hasSupply);

            // Б) Применяем накопленное давление к долям (ассимиляция)
            this.applyPressureToGroup(cell, 'cultures');
            this.applyPressureToGroup(cell, 'religions');

            // В) Обновляем лояльность (счастье)
            this.updateHappiness(cell, faction, hasSupply);

            // Г) Фиксируем новые доминанты для рендера
            cell.social.dominance.culture = this.getTop(cell.social.cultures);
            cell.social.dominance.religion = this.getTop(cell.social.religions);
        });
    },

    addPressure(cell, type, id, amount) {
        if (!id) return;
        cell.social.pressure[type][id] = (cell.social.pressure[type][id] || 0) + amount;
    },

    applyPressureToGroup(cell, type) {
        const group = cell.social[type];
        const pressures = cell.social.pressure[type];
        if (!pressures) return;

        Object.entries(pressures).forEach(([id, amount]) => {
            const step = amount * 0.02; // Коэффициент скорости изменений
            group[id] = (group[id] || 0) + step;
        });

        // Нормализация (сумма долей = 1.0)
        let total = Object.values(group).reduce((a, b) => a + b, 0);
        if (total > 0) {
            Object.keys(group).forEach(k => group[k] /= total);
        }
    },

    processTradePressure() {
        if (!currentSeason.supplyLines) return;
        Object.entries(currentSeason.supplyLines).forEach(([fId, paths]) => {
            const faction = data.factions.find(f => String(f.id) === fId);
            if (!faction) return;

            paths.forEach(path => {
                // Берем последнюю точку пути (город назначения)
                const lastStep = path[path.length - 1];
                const targetKey = `${lastStep.q}_${lastStep.r}`;
                const cell = hexFunction.data.gridData[targetKey];

                if (cell && cell.social) {
                    // Торговля несет веру и культуру владельца пути
                    this.addPressure(cell, 'religions', faction.religion, 0.15);
                    this.addPressure(cell, 'cultures', faction.culture, 0.1);
                }
            });
        });
    },

    updateGrowth(cell, hasSupply) {
        const growthBase = hasSupply ? 1.01 : 0.98; // +1% при снабжении, -2% в блокаде
        const happinessMod = 0.9 + (cell.social.happiness * 0.2); // Счастье влияет на рост
        cell.social.population = Math.floor(cell.social.population * growthBase * happinessMod);
    },

    updateHappiness(cell, faction, hasSupply) {
        let score = 1.0;
        if (!faction) return;

        if (cell.social.dominance.culture !== faction.culture) score -= 0.25;
        if (cell.social.dominance.religion !== faction.religion) score -= 0.15;
        if (!hasSupply) score -= 0.4;

        cell.social.happiness = Math.max(0.05, Math.min(1.0, score));
    },

    checkSupply(key, factionId) {
        const lines = currentSeason.supplyLines ? currentSeason.supplyLines[String(factionId)] : null;
        if (!lines) return false;
        // Проверяем, входит ли данный гекс в любой из путей снабжения фракции
        return lines.some(path => path.some(step => `${step.q}_${step.r}` === key));
    },

    getTop(group) {
        if (!group) return null;
        const sorted = Object.entries(group).sort((a, b) => b[1] - a[1]);
        return sorted?(sorted[0]?sorted[0][0]:null):null;
    }
};