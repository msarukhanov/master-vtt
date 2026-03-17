let dicePlayers = 0;
let dicePlayersCount = 0;
let dicePlayerId = 0;

const dicesWrapper = elementById("dices");

const dices = {
    makeDices(main = dicesWrapper) {
        dicePlayersCount = 0;
        main.innerHTML = '';

        const diceMenu = createEl('div', 'dice-menu');

        // Кнопки глобальных бросков
        [['Chars', 'characters'], ['Factions', 'factions']].forEach(([label, type]) => {
            const btn = createEl('button', 'dice-button global', label);
            btn.dataset.data = JSON.stringify({type:'input',name:'dices-global-roll', data: type});
            diceMenu.appendChild(btn);
        });

        const addBtn = createEl('button', 'dice-button add', '+');
        const playersContainer = createEl('div', 'dice-players',0,null,'dice-players');
        addBtn.dataset.data = JSON.stringify({type:'input',name:'dices-add-player'});

        diceMenu.append(addBtn, createEl('div', 'line-break'), createEl('span', 'dice-rounds-text', `${l10n[lang].rounds}`));

        const diceRounds = createEl('input', 'dice-rounds', '', '', 'dice-rounds');
        diceRounds.value = 1;

        const rollBtn = createEl('button', 'dice-button roll', 'Roll');
        rollBtn.dataset.data = JSON.stringify({type:'input',name:'dices-global-roll'});

        diceMenu.append(diceRounds, rollBtn);
        main.append(diceMenu, playersContainer, createEl('div', 'dice-results', '', '', 'dice-results'));

        dices.addDicePlayer(playersContainer);

        const diceLog = createEl('div', 'dice-log', '', '', 'dice-log');
        main.appendChild(diceLog);
    },

    addDicePlayer() {
        const container = elementById('dice-players');
        if (dicePlayersCount > 9) return;
        dicePlayersCount++;

        const playerCard = createEl('div', 'dice-player card');
        playerCard.innerHTML = `
            <div class="del" data-data='{"type":"click","name":"dices-remove-player"}'>✖</div>
            <div class="dice-player-header">
                <input type="text" class="p-name" placeholder="${l10n[lang].char_name_placeholder}...">
            </div>
            <div class="dice-grid">
                <div class="dice-field">
                    <label>${l10n[lang].number}</label>
                    <input type="number" class="p-num" value="10">
                </div>
                <div class="dice-field">
                    <label>${l10n[lang].difficulty}</label>
                    <input type="number" class="p-dif" value="7">
                </div>
                <div class="dice-field">
                    <label>${l10n[lang].crits}<input type="checkbox" checked class="p-if-crit"></label>
                    <input type="number" class="p-crit" value="10">
                </div>
                <div class="dice-field">
                    <label>${l10n[lang].fails}<input type="checkbox" checked class="p-if-fail"></label>
                    <input type="number" class="p-fail" value="1">
                </div>
            </div>
        `;
        container.appendChild(playerCard);
    },

    deleteDicePlayer(btn) {
        dicePlayersCount--;
        btn.closest('.dice-player').remove();
    },

    rollDiceLogic(p) {
        let results = [];
        let rawSuccesses = 0;
        let crits = 0;
        let fails = 0;

        // 1. Первичный бросок
        for (let i = 0; i < p.num; i++) {
            const roll = Math.floor(Math.random() * 10) + 1;
            results.push(roll);

            if (roll >= p.dif) rawSuccesses++;
            if (p.ifCrit && roll >= p.crit) crits++;
            if (p.ifFail && roll <= p.fail) fails++;
        }

        // 2. АННИГИЛЯЦИЯ (Порядок критически важен)

        // Сначала провалы съедают криты (право на переброс)
        let activeFails = fails;
        let activeCrits = crits;

        while (activeFails > 0 && activeCrits > 0) {
            activeFails--;
            activeCrits--;
            // Важно: крит при этом перестал быть критом,
            // но он ВСЁ ЕЩЕ остается успехом (т.к. 10 > сложности).
            // Одна "1" съела только возможность взрыва.
        }

        // Теперь оставшиеся провалы съедают обычные успехи
        let finalSuccesses = rawSuccesses;
        while (activeFails > 0 && finalSuccesses > 0) {
            activeFails--;
            finalSuccesses--;
        }

        // 3. РЕКУРСИЯ (Взрываются только выжившие криты)
        if (activeCrits > 0) {
            // При перебросе провалы (единицы) уже не учитываются по правилам
            const extra = this.rollDiceLogic({ ...p, num: activeCrits, ifFail: false });
            results = [...results, ...extra.results];
            finalSuccesses += extra.successes;
        }

        return { results, successes: finalSuccesses };
    },

    processRolls(globalPlayers = null) {
        const rounds = Number(elementById('dice-rounds').value) || 0;
        if (rounds < 1) return;

        const players = globalPlayers || Array.from(document.querySelectorAll('.dice-player')).map(block => ({
            name: block.querySelector('.p-name').value || 'NoName',
            num: Number(block.querySelector('.p-num').value),
            dif: Number(block.querySelector('.p-dif').value),
            ifCrit: block.querySelector('.p-if-crit').checked,
            crit: Number(block.querySelector('.p-crit').value),
            ifFail: block.querySelector('.p-if-fail').checked,
            fail: Number(block.querySelector('.p-fail').value)
        }));

        const finalResults = [];
        for (let r = 0; r < rounds; r++) {
            const roundData = players.map(p => ({
                ...p,
                ...this.rollDiceLogic(p)
            }));

            if (globalPlayers) roundData.sort((a, b) => b.successes - a.successes);
            finalResults.push(roundData);
        }
        this.printResults(finalResults);
        finalResults.forEach(roundData => this.addLog(roundData));
    },

    rollGlobal(type) {
        const globalData = data[type].map(item => ({
            name: item.name,
            num: 10, dif: 7, ifCrit: true, crit: 10, ifFail: true, fail: 1
        }));
        this.processRolls(globalData);
    },

    printResults(result) {
        const container = elementById('dice-results');
        container.innerHTML = '';

        result.forEach((round, i) => {
            const roundEl = createEl('div', 'dice-results-round', `${l10n[lang].round}: ${i + 1}`);
            round.forEach(p => {
                const pEl = createEl('div', 'dice-results-player');
                pEl.innerHTML = `
                    <b>${p.name}</b><br>
                    ${l10n[lang].successes}: ${p.successes} / ${p.num}<br>
                    <small>${l10n[lang].rolls}: ${p.results.join(', ')}</small>
                `;
                roundEl.appendChild(pEl);
            });
            container.appendChild(roundEl);
        });
    },

    addLog(roundResults) {
        const logBox = elementById('dice-log');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const entry = createEl('div', 'log-entry');

        const summary = roundResults.map(p =>
            `<span class="log-player">${p.name}:</span> <b>${p.successes}</b>`
        ).join(' | ');

        entry.innerHTML = `<small>[${time}]</small> ${summary}`;

        logBox.insertBefore(entry, logBox.firstChild);

        if (logBox.children.length > 20) {
            logBox.lastChild.remove();
        }
    }

};
