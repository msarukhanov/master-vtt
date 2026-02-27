const abilities = {
    init() {

    },

    activate(ctx, caster, tq, tr, ability) {
        if (caster.mpCurrent < (ability.manacost || 0)) return alert("Недостаточно маны!");

        // 1. Получаем цели по гексагональному AoE
        const targets = hexFunction.getAoeCells(tacticalMap.gridData, caster, tq, tr, ability);

        targets.forEach(t => {
            const key = `${t.q}_${t.r}`;
            const cell = tacticalMap.gridData[key];
            if (!cell || !cell.content || cell.content.type !== 'char') return;

            const targetContent = cell.content;
            if (!ability.friendlyFire && targetContent.team === caster.team) return;

            const a = caster;
            // Расчет урона (твоя логика из Snapshot)
            const dmgRange = a.attack;
            const singleDmg = Math.floor(Math.random() * (dmgRange[1] - dmgRange[0] + 1)) + dmgRange[0];
            let totalDmg = singleDmg * a.num;

            if (!!dmgRange[2]) totalDmg *= 1.5; // Крит

            const mresBonus = this.getBonus(targetContent, 'mres');
            const finalDef = Math.max(0, (targetContent.mres || 0) + mresBonus);
            const finalDmg = Math.max(1, Math.round(totalDmg - finalDef));

            // Накладываем статус
            if (ability.status) {
                if (!targetContent.statuses) targetContent.statuses = [];
                targetContent.statuses.push({ ...ability.status, duration: ability.status.duration || 3 });
            }

            // ПРИМЕНЯЕМ УРОН (по q, r)
            ctx.applyDamageToUnit(t.q, t.r, Math.round(finalDmg), !!dmgRange[2]);
        });

        // Списание ресурсов
        caster.mpCurrent -= (ability.manacost || 0);
        if (ability.cooldown > 0) {
            if (!caster.cooldowns) caster.cooldowns = {};
            caster.cooldowns[ability.id] = ability.cooldown;
        }

        tacticalMap.update(); // Обновляем канвас
    },


    getBonus(unit, statKey) {
        if (!unit.statuses || unit.statuses.length === 0) return 0;

        return unit.statuses.reduce((total, status) => {
            if (status.effects && status.effects[statKey]) {
                return total + status.effects[statKey];
            }
            return total;
        }, 0);
    }
};