const questManager = {
    // Аналог твоего public checkQuest
    check(quest, type, params = []) {
        if (quest.status === 'completed') return;

        // 1. Находим триггер текущей стадии
        const stageTrigger = data.triggers.find(t => t.id === quest.currentStage.triggerId);
        if (!stageTrigger) return;

        // 2. Инициализируем прогресс, если его еще нет (аналог твоего _clone и map)
        if (!quest.currentStage.progress) {
            quest.currentStage.progress = stageTrigger.conditions.map(c => ({
                params: c.params.map(p => (typeof p === 'string' ? '' : 0))
            }));
        }

        quest.currentStageIndex = quest.currentStageIndex || 0;

        // 3. Проверка: либо триггер уже сработал глобально, либо сработал сейчас специально для квеста
        const isGlobalTriggerFired = currentSeason.triggerStates?.[stageTrigger.id];

        if (isGlobalTriggerFired || triggerManager.checkTrigger(type, params, quest.currentStage.progress)) {
            quest.currentStage.status = 'completed';
        }

        // 4. Логика перехода к следующей стадии
        if (quest.currentStage.status === 'completed') {
            quest.stages[quest.currentStageIndex].status = 'completed';

            // Если стадия была последней — завершаем квест
            if (quest.currentStageIndex === (quest.stages.length - 1)) {
                quest.completedAt = Date.now();
                quest.status = 'completed';
                delete quest.currentStage;
                return true;
            }

            // Переход на следующую стадию
            quest.currentStageIndex++;
            quest.currentStage = quest.stages[quest.currentStageIndex];
            // Рекурсивно инициализируем прогресс новой стадии
            this.initStageProgress(quest);
        }

        // Сохраняем изменения в текущий сезон
        dbManager.saveGame(currentGame, gameData[currentGame]);
    },

    // Аналог твоего private proceedQuest
    proceedQuest(questId, status, stageId = null) {
        // Ищем квест в общей базе данных
        let quest = data.quests.find(q => q.id === questId);
        if (!quest) return;

        switch (status) {
            case 'accept':
                // Создаем инстанс квеста для текущего сезона
                const newQuest = JSON.parse(JSON.stringify(quest));
                newQuest.status = 'accepted';
                newQuest.addedAt = Date.now();
                newQuest.currentStageIndex = 0;
                newQuest.currentStage = newQuest.stages[0];

                this.initStageProgress(newQuest);

                if (!currentSeason.quests) currentSeason.quests = [];
                currentSeason.quests.push(newQuest);
                break;

            case 'abandon':
                quest.status = 'abandoned';
                quest.abandonedAt = Date.now();
                break;

            case 'complete':
                quest.status = 'completed';
                quest.completedAt = Date.now();
                break;
        }
        dbManager.saveGame(currentGame, gameData[currentGame]);
    },

    // Вспомогательный метод для обнуления прогресса (твоя логика из Angular)
    initStageProgress(quest) {
        const stageTrigger = data.triggers.find(t => t.id === quest.currentStage.triggerId);
        if (stageTrigger && stageTrigger.conditions) {
            quest.currentStage.progress = stageTrigger.conditions.map(c => ({
                params: c.params.map(p => (typeof p === 'number' ? 0 : ''))
            }));
        }
    },


    addStage() {
        const q = editor.workingList[currentEditorIndex];
        if (!q.stages) q.stages = [];

        // Создаем дефолтную стадию
        q.stages.push({
            id: `stage_${Date.now()}`,
            triggerId: '',
            text: 'Новая задача...',
            status: 'locked'
        });

        editor.refreshQuestSections(q);
    },

    // Открытие Поп-апа редактирования стадии
    editStage(index) {
        const q = editor.workingList[currentEditorIndex];
        const stage = q.stages[index];

        // Генерируем HTML для поп-апа в стиле твоего редактора
        let html = `<h3>Редактирование стадии ${index + 1}</h3>`;

        // 1. Выбор триггера (используем твой multiSelect)
        const triggerData = JSON.stringify({
            "type": "change",
            "name": "editor-quest-stage-trigger-change",
            "data": index
        });
        html += `<div class="row">Привязанный триггер
                    ${editor.multiSelect(stage.triggerId, "stage-trigger-select", "triggers")}
                 </div>`;

        // 2. Текст стадии (то, что видит игрок)
        const textData = JSON.stringify({
            "type": "input",
            "name": "editor-quest-stage-text-change",
            "data": index
        });
        html += `<div class="row">Текст задачи
                    <textarea id="stage-text-input" data-data='${textData}'>${stage.text || ''}</textarea>
                 </div>`;

        // Вызываем твой стандартный поп-ап
        controls.createPopup('quest-stage-popup', 'char-editor-popup', html);

        // Инъекция data-data в селект триггера (как мы делали в триггерах)
        const select = elementById("stage-trigger-select");
        if(select) select.dataset.data = triggerData;
    },

    // Удаление стадии
    removeStage(index) {
        const q = editor.workingList[currentEditorIndex];
        q.stages.splice(index, 1);
        editor.refreshQuestSections(q);
    }
};
