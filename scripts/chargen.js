const GEN_DATA = {
    names: {
        m: ["Араторн", "Боромир", "Гэндальф", "Фродо", "Леголас", "Гимли"],
        w: ["Арвен", "Эовин", "Галадриэль", "Тауриэль", "Роза", "Лютиэн"]
    },
    surnames: ["Бэггинс", "Странник", "Дубощит", "Зеленолист", "Белый", "Серый"],
    professions: ["Стражник", "Торговец", "Кузнец", "Наемник", "Вор", "Маг", "Пастух"],
    alignments: ["Законопослушный добрый", "Нейтральный", "Хаотичный злой", "Истинный нейтрал"]
};

const generator = {
    tempNPC: null, // Хранилище для черновика

    random(arr) {
        return arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
    },

    isClassAllowed(cls, race, people) {
        if (!cls) return false;
        const r = race || "";
        const p = people || "";

        if (cls.raceNot?.includes(r) || cls.peopleNot?.includes(p)) return false;
        if (cls.race?.length && !cls.race.includes(r)) return false;
        if (cls.people?.length && !cls.people.includes(p)) return false;

        return true;
    },

    // Этап 1: Создание черновика и показ попапа
    generateDraft(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        const gender = this.random(['m', 'w']);
        const raceObj = this.random(data.races);
        const peopleObj = this.random(data.peoples || []);
        const factionObj = this.random(data.factions || []);

        let availableClasses = data.classes || [];
        if (raceObj || peopleObj) {
            availableClasses = availableClasses.filter(c => this.isClassAllowed(c, raceObj?.name, peopleObj?.name));
        }
        const classObj = this.random(availableClasses);
        const firstName = (typeof GEN_DATA !== 'undefined') ? this.random(GEN_DATA.names[gender]) : "NPC";

        // Записываем в черновик
        this.tempNPC = {
            id: `gen_${Date.now()}`,
            name: `${firstName}`,
            gender: gender,
            age: Math.floor(Math.random() * 50) + 16,
            race: raceObj?.name || "",
            people: peopleObj?.name || "",
            class: classObj?.name || "",
            factions: factionObj ? [factionObj.id] : [],
            group: factionObj?.name || "Свободные земли",
            profession: classObj?.name || "Обыватель",
            source: "Генератор",
            appearance: `Сгенерированный ${raceObj?.name || ''} ${classObj?.name || ''}`,
            family: [], friends: []
        };

        this.showPreviewPopup();
    },

    // Этап 2: Визуализация попапа
    showPreviewPopup(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        const n = this.tempNPC;

        const content = Card.make(n, {}, null);
        content.innerHTML += `
            <div class="gen-popup-actions" style="display:flex; gap:10px; justify-content:center;">
                <button class="add" onclick="generator.confirmSave(event)">${l10n[lang].save}</button>
                <button class="save" onclick="generator.generateDraft(event)">${l10n[lang].reCreate}</button>
                <button class="del" onclick="elementById('gen-popup').remove()">${l10n[lang].cancel}</button>
            </div>
        `;

        controls.createPopup('gen-popup', 'image-popup', content);
    },

    // Этап 3: Сохранение в базу
    confirmSave(e) {
        e.stopPropagation();
        if (!this.tempNPC) return;

        const n = this.tempNPC;
        data.characters.push(n);

        // Синхронизация с фракцией
        if (n.factions.length) {
            const f = data.factions.find(fac => fac.id === n.factions[0]);
            if (f) {
                if (!f.members) f.members = [];
                f.members.push(n.id);
            }
        }

        // Финальное сохранение
        dbManager.saveGame(currentGame, gameData[currentGame]);

        // Закрываем попап и обновляем список
        elementById('gen-popup').remove();
        if (typeof list !== 'undefined') {
            list.render(data.characters);
            controls.changeTab('chars');
        }
        console.log("NPC сохранен:", n.name);
    }
};

