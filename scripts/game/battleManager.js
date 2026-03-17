const battleManager = {

    currentTurnIndex: 0,
    turnQueue: [],

    startBattle(freeRoam = null) {
        battleManager.turnQueue = [];

        const {gridData, activeUnit} = hexFunction.data;

        Object.entries(gridData).forEach(([key, cell]) => {
            if (cell?.content?.unit) {
                const [q, r] = key.split('_').map(Number);

                const unit = characterManager.getCharacterById(cell.content.unit);
                if(unit && unit.team) {
                    const stats = {
                        ...unit,
                        currentWalkRange: freeRoam ? 999 : (unit.walkRadius || 3),
                        // hp: unit.hpMax || 10,
                        // mp: unit.mpMax || 10,
                        // wp: unit.wpMax || 0,
                        cooldowns: {}
                    };

                    battleManager.turnQueue.push({
                        q, r,
                        ...stats,
                        hasMoved: false,
                    });
                }
            }
        });

        battleManager.turnQueue.sort((a, b) => b.initiative - a.initiative);
        battleManager.currentTurnIndex = 0;
        battleManager.renderInitiativeLine();
        battleManager.selectActiveUnit();
    },

    selectActiveUnit() {
        if (battleManager.turnQueue.length === 0) return;
        const unit = battleManager.turnQueue[battleManager.currentTurnIndex];
        if(!unit || !unit.id) return;
        const activeUnit = characterManager.getCharacterById(unit.id);
        // activeUnit = battleManager.turnQueue[battleManager.currentTurnIndex];
        // Сброс параметров хода для нового юнита
        const cds = tacticalMap.activeUnit.cooldowns || {};
        for (let key in cds) {
            if (cds[key] > 0) cds[key]--;
            if (cds[key] <= 0) delete cds[key];
        }

        let skipThisTurn = false;
        if (activeUnit.statuses && activeUnit.statuses.length > 0) {
            activeUnit.statuses = activeUnit.statuses.filter(status => {
                // Эффект: Урон в начале хода (Яд/Горение)
                if (status.type === 'dot') {
                    battleManager.applyDamageToUnit(activeUnit.x, activeUnit.y, status.value || 1, false);
                    console.log(`${activeUnit.name} получает урон от ${status.name}`);
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
            setTimeout(() => battleManager.nextTurn(), 800);
            return;
        }

        activeUnit.hasMoved = false;
        activeUnit.currentWalkRange = activeUnit.walkRadius || 3;
        activeUnit.visionRadius = activeUnit.visionRadius || 2;

        playerHUD.init(activeUnit);

        hexFunction.revealFog(activeUnit.q, activeUnit.r);

        map.scrollToChar();
        // let { x, y } = hexFunction.hexToPixel(activeUnit.q, activeUnit.r);
        // map.scrollTo(x,y);
    },

    handleTrigger(event, unit) {
        switch (event.type) {
            case 'dialog':
                // Используй свой UI для вывода текста
                alert(event.text);
                break;

            case 'damage':
                // Ловушка: наносит урон наступившему
                battleManager.applyDamageToUnit(unit.x, unit.y, event.value || 5, false);
                console.log("Ловушка сработала!");
                break;

            case 'spawn':
                // Спавнит моба на соседней клетке (пример)
                // battleManager.spawnUnit(event.unitId, unit.x + 1, unit.y);
                break;
        }
    },

    nextTurn() {
        tacticalMap.selectedAbility = null;
        tacticalMap.abilityTarget = null;
        tacticalMap.currentReachable = null;
        battleManager.currentTurnIndex++;
        if (battleManager.currentTurnIndex >= battleManager.turnQueue.length) battleManager.currentTurnIndex = 0;
        battleManager.selectActiveUnit();
        battleManager.renderInitiativeLine();
        tacticalMap.update();
    },

    canAttack(targetQ, targetR) {
        const {currentMap, activeUnit} = hexFunction.data;
        const targetCell = currentMap.gridData[`${targetQ}_${targetR}`];
        if(!targetCell.content || !targetCell.content.unit) return false;

        const target = characterManager.getCharacterById(targetCell.content.unit);
        if(!target) return false;

        if (target.team === activeUnit.team) return false;

        const dist = hexFunction.getHexDistance(targetQ, targetR, activeUnit.q, activeUnit.r);
        return dist <= (activeUnit.attackRadius || 1);
    },

    canAttackAnywhere(unit) {
        if (!unit) return false;
        let found = false;

        const radius = unit.attackRadius || 1;

        for (let y = unit.y - radius; y <= unit.y + radius; y++) {
            for (let x = unit.x - radius; x <= unit.x + radius; x++) {
                if (tacticalMap.gridData[y] && tacticalMap.gridData[y][x] && tacticalMap.gridData[y][x].content?.unit) {
                    const target = characterManager.getCharacterById(tacticalMap.gridData[y][x].content.unit);
                    if (target.team !== unit.team) {
                        const dist = Math.max(Math.abs(x - unit.x), Math.abs(y - unit.y));
                        if (dist <= (unit.attackRadius || 1)) found = true;
                    }
                }
            }
        }

        return found;
    },

    executeAttack(unit, target) {
        const attacker = characterManager.getCharacterById(unit.id);
        const dist = hexFunction.getHexDistance(attacker.q, attacker.r, target.q, target.r);
        console.log(attacker, target);

        const performDamage = () => {
            const dmgRange = attacker.attack;
            const singleDmg = Math.floor(Math.random() * (dmgRange[1] - dmgRange[0] + 1)) + dmgRange[0];
            let totalDmg = singleDmg * attacker.num;

            if (!!dmgRange[2]) totalDmg *= 1.5;

            const defBonus = characterManager.getBonus(target, 'def');
            const finalDef = Math.max(0, (target.def[0] + target.def[1]) / 2 + defBonus);
            const finalDmg = Math.max(1, Math.round(totalDmg - finalDef));

            battleManager.applyDamageToUnit(target.q, target.r, Math.round(finalDmg), !!dmgRange[2]);
            battleManager.nextTurn();
        };

        if (dist > 1) {
            battleManager.animateProjectile(attacker.q, attacker.r, target.q, target.r, 'arrow', performDamage);
        } else {
            performDamage();
        }
    },

    animateProjectile(startQ, startR, endQ, endR, type = 'arrow', callback) {
        const {sizes} = hexFunction.data;
        const startPos = hexFunction.hexToPixel(startQ, startR);
        const endPos = hexFunction.hexToPixel(endQ, endR);

        // Создаем элемент снаряда
        const projectile = createEl('div', `tf-projectile projectile-${type}`);

        // Выбираем иконку в зависимости от типа
        let icon = '🏹';
        if (type === 'fireball') icon = '🔥';
        if (type === 'magic') icon = '✨';
        projectile.textContent = icon;

        // Рассчитываем угол поворота (чтобы стрела смотрела в сторону полета)
        const angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x);

        Object.assign(projectile.style, {
            position: 'absolute',
            left: `${startPos.x - 15}px`,
            top: `${startPos.y - 15}px`,
            zIndex: '2000',
            fontSize: '24px',
            transform: `rotate(${angle}rad)`,
            transition: 'all 0.3s linear', // Линейно, без замедления
            pointerEvents: 'none'
        });

        tfGrid.appendChild(projectile);

        // Запускаем полет
        requestAnimationFrame(() => {
            projectile.style.left = `${endPos.x - 15}px`;
            projectile.style.top = `${endPos.y - 15}px`;
        });

        // По завершению удаляем и вызываем колбэк (урон)
        setTimeout(() => {
            projectile.remove();
            if (callback) callback();
        }, 300); // Должно совпадать с временем в transition
    },

    executeAbility(caster, tq, tr, ability) {
        const performCast = () => {
            abilityManager.activate(this, caster, tq, tr, ability);
            battleManager.nextTurn();
        };

        if (ability.hasProjectile) {
            // Пускаем файербол или магический сгусток
            const projectileType = ability.projectileType || 'magic';
            battleManager.animateProjectile(caster.q, caster.r, tq, tr, projectileType, performCast);
        } else {
            performCast();
        }
        // abilities.activate(this, caster, tx, ty, ability);
        // battleManager.nextTurn(); // Завершаем ход после каста
    },

    applyDamageToUnit(q, r, damage, isCrit = false) {
        const key = `${q}_${r}`;
        const cell = tacticalMap.gridData[key];
        if (!cell || !cell.content || !cell.content.unit) return;

        const t = characterManager.getCharacterById(cell.content.unit);

        if(!t.num) {
            t.num = 1;
        }

        // 1. Расчет HP стека (без изменений)
        let targetTotalHP = (t.num - 1) * t.hpMax + (t.hp || t.hpMax);
        targetTotalHP -= damage;

        // 2. Всплывающий урон над гексом
        battleManager.showDamagePopup(q, r, damage, isCrit);

        if (targetTotalHP <= 0) {
            // СМЕРТЬ: Превращаем в объект-труп
            const corpseLoot = t.inventory || [];
            delete cell.content.unit;
            cell.content.obj = {
                type: 'obj',
                obj: 'corpse',
                name: `Труп ${t.name}`,
                inventory: corpseLoot
            };

            // 3. Удаление из очереди (фильтруем по q, r)
            const targetIdx = battleManager.turnQueue.findIndex(u => u.q === q && u.r === r);

            if (targetIdx !== -1) {
                // Если убитый был в очереди ПЕРЕД текущим юнитом, сдвигаем индекс
                if (targetIdx < battleManager.currentTurnIndex) {
                    battleManager.currentTurnIndex--;
                }
                // Вырезаем бедолагу из очереди
                battleManager.turnQueue.splice(targetIdx, 1);
            }

            console.log(`${t.name} пал в бою на гексе ${key}!`);
        } else {
            // ВЫЖИВАНИЕ: Обновляем стек
            t.num = Math.ceil(targetTotalHP / t.hpMax);
            t.hp = targetTotalHP % t.hpMax || t.hpMax;

            // Синхронизация данных (ссылка в cell.content уже ведет на t)
            // cell.content.unit.hp = t.hp;
            // cell.content.unit.num = t.num;
        }

        // Принудительно перерисовываем канвас (чтобы обновить HP-бар или заменить на труп)
        hexFunction.updateHex();
    },

    showDamagePopup(q, r, amount, isCrit = false) {
        // Получаем центр гекса на экране
        const {sizes} = hexFunction.data;
        const pos = hexFunction.hexToPixel(q, r);
        // Находим канвас, чтобы учесть его реальное положение на странице
        const rect = tacticalMap.canvas.getBoundingClientRect();

        const popup = createEl('div', `tf-damage-popup ${isCrit ? 'crit' : ''}`);
        popup.textContent = `-${amount}`;

        // Считаем позицию относительно body
        popup.style.left = (rect.left + pos.x - 15) + 'px';
        popup.style.top = (rect.top + pos.y - 30) + 'px'; // Чуть выше центра

        document.body.appendChild(popup);
        popup.onanimationend = () => popup.remove();
    },

    renderInitiativeLine() {
        tacticalMap.initiativeLine.innerHTML = '';

        const displayOrder = [
            ...battleManager.turnQueue.slice(battleManager.currentTurnIndex),
            ...battleManager.turnQueue.slice(0, battleManager.currentTurnIndex)
        ];

        displayOrder.forEach((unit, i) => {
            const item = createEl('div', `tf-init-item tf-team-${unit.team} ${i === 0 ? 'active' : ''}`);
            item.innerHTML = `
            <span class="unit-img">${unit.teamId}</span>
            <span class="unit-num">${unit.num}</span>
            <div class="init-value">${unit.initiative}</div>
        `;
            tacticalMap.initiativeLine.append(item);
        });
    },
};