const tacticalFieldPlay = {
    ...tacticalFieldBattle,

    switchLocation(mapId, startQ, startR) {
        const map = gameData[currentGame].tacticalMaps.find(i => i.id === mapId);
        if (!map) return alert("Ошибка: Карта не найдена");

        const traveler = JSON.parse(JSON.stringify(this.activeUnit));
        this.loadMap(mapId);

        // Размещаем в объекте по ключу q_r
        tacticalMap.gridData[`${startQ}_${startR}`].content = traveler;

        this.startBattle();

        // Синхронизируем активного юнита в новой очереди
        this.currentTurnIndex = this.turnQueue.findIndex(u => u.q === startQ && u.r === startR);
        this.activeUnit = this.turnQueue[this.currentTurnIndex];

        tacticalMap.update();
    },

    startBattle() {
        this.turnQueue = [];

        Object.entries(tacticalMap.gridData).forEach(([key, cell]) => {
            if (cell?.content?.type === 'char') {
                const [q, r] = key.split('_').map(Number);

                const stats = {
                    ...cell.content,
                    currentWalkRange: cell.content.walkRadius || 3,
                    hpCurrent: cell.content.hp || 10,
                    mpCurrent: cell.content.mp || 10,
                    wpCurrent: cell.content.wp || 0,
                    cooldowns: {}
                };

                this.turnQueue.push({
                    q, r,
                    ...stats,
                    hasMoved: false,
                });
            }
        });

        this.turnQueue.sort((a, b) => b.initiative - a.initiative);
        this.currentTurnIndex = 0;
        this.renderInitiativeLine();
        this.selectActiveUnit();
    },

    selectActiveUnit() {
        if (this.turnQueue.length === 0) return;
        tacticalMap.activeUnit = this.turnQueue[this.currentTurnIndex];
        // Сброс параметров хода для нового юнита
        const cds = tacticalMap.activeUnit.cooldowns || {};
        for (let key in cds) {
            if (cds[key] > 0) cds[key]--;
            if (cds[key] <= 0) delete cds[key];
        }

        let skipThisTurn = false;
        if (tacticalMap.activeUnit.statuses && tacticalMap.activeUnit.statuses.length > 0) {
            tacticalMap.activeUnit.statuses = tacticalMap.activeUnit.statuses.filter(status => {
                // Эффект: Урон в начале хода (Яд/Горение)
                if (status.type === 'dot') {
                    this.applyDamageToUnit(tacticalMap.activeUnit.x, tacticalMap.activeUnit.y, status.value || 1, false);
                    console.log(`${tacticalMap.activeUnit.name} получает урон от ${status.name}`);
                }

                // Эффект: Пропуск хода (Стан/Заморозка)
                if (status.type === 'skipTurn') {
                    skipThisTurn = true;
                }

                // Уменьшаем длительность
                status.duration--;
                return status.duration > 0; // Удаляем, если время вышло
            });
        }

        // Если юнит в стане — сразу передаем ход дальше
        if (skipThisTurn) {
            console.log(`${tacticalMap.activeUnit.name} оглушен и пропускает ход!`);
            // Небольшая задержка, чтобы игрок понял, почему ход пролетел
            setTimeout(() => this.nextTurn(), 800);
            return;
        }

        tacticalMap.activeUnit.hasMoved = false;
        tacticalMap.activeUnit.currentWalkRange = tacticalMap.activeUnit.walkRadius || 3;
        tacticalMap.activeUnit.visionRadius = tacticalMap.activeUnit.visionRadius || 2;

        playerHUD.init(tacticalMap.activeUnit);

        // this.renderPlayCard();
        hexFunction.revealFog(tacticalMap.gridData, tacticalMap.activeUnit, tacticalMap.activeUnit.q, tacticalMap.activeUnit.r);
    },

    handleTrigger(event, unit) {
        switch (event.type) {
            case 'dialog':
                // Используй свой UI для вывода текста
                alert(event.text);
                break;

            case 'damage':
                // Ловушка: наносит урон наступившему
                this.applyDamageToUnit(unit.x, unit.y, event.value || 5, false);
                console.log("Ловушка сработала!");
                break;

            case 'spawn':
                // Спавнит моба на соседней клетке (пример)
                this.spawnUnit(event.unitId, unit.x + 1, unit.y);
                break;
        }
    },

    nextTurn() {
        this.selectedAbility = null;
        this.abilityTarget = null;
        this.currentReachable = null;
        this.currentTurnIndex++;
        if (this.currentTurnIndex >= this.turnQueue.length) this.currentTurnIndex = 0;
        this.selectActiveUnit();
        this.renderInitiativeLine();
        tacticalMap.update();
    },
};
