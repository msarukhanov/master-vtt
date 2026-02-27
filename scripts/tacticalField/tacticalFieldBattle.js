const tacticalFieldBattle = {
    showDamagePopup(q, r, amount, isCrit = false) {
        // Получаем центр гекса на экране
        const pos = hexFunction.hexToPixel(q, r, tacticalMap.size);
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

    executeAttack(attacker, target) {
        const dist = hexFunction.getHexDistance(attacker.q, attacker.r, target.q, target.r);

        const performDamage = () => {
            const dmgRange = attacker.attack;
            const singleDmg = Math.floor(Math.random() * (dmgRange[1] - dmgRange[0] + 1)) + dmgRange[0];
            let totalDmg = singleDmg * attacker.num;

            if (!!dmgRange[2]) totalDmg *= 1.5;

            const defBonus = charManager.getBonus(target, 'def');
            const finalDef = Math.max(0, (target.def[0] + target.def[1]) / 2 + defBonus);
            const finalDmg = Math.max(1, Math.round(totalDmg - finalDef));

            this.applyDamageToUnit(target.q, target.r, Math.round(finalDmg), !!dmgRange[2]);
            this.nextTurn();
        };

        if (dist > 1) {
            this.animateProjectile(attacker.q, attacker.r, target.q, target.r, 'arrow', performDamage);
        } else {
            performDamage();
        }
    },

    animateProjectile(startQ, startR, endQ, endR, type = 'arrow', callback) {
        const startPos = hexFunction.hexToPixel(startQ, startR, tacticalMap.size);
        const endPos = hexFunction.hexToPixel(endQ, endR, tacticalMap.size);

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
            abilities.activate(this, caster, tq, tr, ability);
            this.nextTurn();
        };

        if (ability.hasProjectile) {
            // Пускаем файербол или магический сгусток
            const projectileType = ability.projectileType || 'magic';
            this.animateProjectile(caster.q, caster.r, tq, tr, projectileType, performCast);
        } else {
            performCast();
        }
        // abilities.activate(this, caster, tx, ty, ability);
        // this.nextTurn(); // Завершаем ход после каста
    },

    applyDamageToUnit(q, r, damage, isCrit = false) {
        const key = `${q}_${r}`;
        const cell = tacticalMap.gridData[key];
        if (!cell || !cell.content || cell.content.type !== 'char') return;

        const t = cell.content;

        // 1. Расчет HP стека (без изменений)
        let targetTotalHP = (t.num - 1) * t.hp + (t.hpCurrent || t.hp);
        targetTotalHP -= damage;

        // 2. Всплывающий урон над гексом
        this.showDamagePopup(q, r, damage, isCrit);

        if (targetTotalHP <= 0) {
            // СМЕРТЬ: Превращаем в объект-труп
            const corpseLoot = t.inventory || [];
            cell.content = {
                type: 'obj',
                obj: 'corpse',
                name: `Труп ${t.name}`,
                inventory: corpseLoot
            };

            // 3. Удаление из очереди (фильтруем по q, r)
            const targetIdx = this.turnQueue.findIndex(u => u.q === q && u.r === r);

            if (targetIdx !== -1) {
                // Если убитый был в очереди ПЕРЕД текущим юнитом, сдвигаем индекс
                if (targetIdx < this.currentTurnIndex) {
                    this.currentTurnIndex--;
                }
                // Вырезаем бедолагу из очереди
                this.turnQueue.splice(targetIdx, 1);
            }

            console.log(`${t.name} пал в бою на гексе ${key}!`);
        } else {
            // ВЫЖИВАНИЕ: Обновляем стек
            t.num = Math.ceil(targetTotalHP / t.hp);
            t.hpCurrent = targetTotalHP % t.hp || t.hp;

            // Синхронизация данных (ссылка в cell.content уже ведет на t)
            cell.content.hpCurrent = t.hpCurrent;
            cell.content.num = t.num;
        }

        // Принудительно перерисовываем канвас (чтобы обновить HP-бар или заменить на труп)
        tacticalMap.update();
    },

    canAttackAnywhere(unit) {
        if (!unit) return false;
        let found = false;

        const radius = unit.attackRadius || 1;

        for (let y = unit.y - radius; y <= unit.y + radius; y++) {
            for (let x = unit.x - radius; x <= unit.x + radius; x++) {
                if (tacticalMap.gridData[y] && tacticalMap.gridData[y][x] && tacticalMap.gridData[y][x].content) {
                    const target = tacticalMap.gridData[y][x].content;
                    if (target?.type === 'tacticalMap' && target.team !== unit.team) {
                        const dist = Math.max(Math.abs(x - unit.x), Math.abs(y - unit.y));
                        if (dist <= (unit.attackRadius || 1)) found = true;
                    }
                }
            }
        }

        return found;
    },

    canAttack(targetQ, targetR) {
        const active = tacticalMap.activeUnit;
        const targetCell = tacticalMap.gridData[`${targetQ}_${targetR}`];

        if (!targetCell || targetCell.content?.type !== 'char' || targetCell.content.team === active.team) return false;

        const dist = hexFunction.getHexDistance(targetQ, targetR, active.q, active.r);
        return dist <= (active.attackRadius || 1);
    },
};