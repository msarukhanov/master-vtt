const dashboard = {
    data: {
        config: {},
        seasons: [],
        maps: [],
        players: []
    },

    currentSection: '',

    init(main = elementById('dashboard')) {
        dashboard.data.config = gameData[currentGame].app;

        dashboard.data.seasons = gameData.seasons;
        dashboard.data.maps = gameData[currentGame].tacticalMaps || [];
        dashboard.data.players = gameData.players || [];

        main.innerHTML = `
            <div class="dashboard-wrapper">
                <aside class="dashboard-sidebar">
                    <nav id="sidebar-nav" class="sidebar-nav">
                        <button class="nav-btn" data-section="config" data-data='{"type":"click","name":"dashboard-section","data":"config"}'>Настройки </button>
                        <button class="nav-btn" data-section="navigation" data-data='{"type":"click","name":"dashboard-section","data":"navigation"}'>Навигация</button>
                        <button class="nav-btn" data-section="seasons" data-data='{"type":"click","name":"dashboard-section","data":"seasons"}'>Сезоны</button>
                        <button class="nav-btn" data-section="maps" data-data='{"type":"click","name":"dashboard-section","data":"maps"}'>Карты</button>
                        <button class="nav-btn" data-section="players" data-data='{"type":"click","name":"dashboard-section","data":"players"}'>Игроки</button>
                    </nav>
                </aside>
                <main id="admin-content" class="dashboard-content"></main>
            </div>
        `;

        this.load('config')
    },

    load(section) {
        const ws = elementById('admin-content');
        this.currentSection = section;

        // Выделение активной кнопки
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === section);
        });

        if (section === 'config') this.renderFieldsEditor(ws);
        if (section === 'navigation') this.renderNavEditor(ws);
        if (section === 'seasons') this.renderSeasons(ws);
        if (section === 'maps') this.renderMaps(ws);
        if (section === 'players') this.renderPlayers(ws); // Поправил на renderPlayers
    },


    renderFieldsEditor(ws) {
        const settings = dashboard.data.config.formFieldsSettings;
        ws.innerHTML = ''; // Очищаем рабочую область

        const header = document.createElement('h2');
        header.textContent = "Настройки полей форм";
        ws.append(header);

        const grid = document.createElement('div');
        grid.className = 'entities-grid';

        Object.entries(settings).forEach(([entityKey, fields]) => {
            const card = document.createElement('div');
            card.className = 'entity-card';

            const title = document.createElement('h3');
            title.textContent = entityKey.toUpperCase();
            card.append(title);

            const list = document.createElement('div');
            list.className = 'fields-list';

            Object.entries(fields).forEach(([fieldName, isEnabled]) => {
                const label = document.createElement('label');
                label.className = 'field-row';

                // Создаем чекбокс вручную
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = isEnabled;
                checkbox.dataset.data = JSON.stringify({type:'input',name:'dashboard-fields-change', data:{entityKey, fieldName}});

                const span = document.createElement('span');
                span.textContent = fieldName;

                label.append(checkbox, span);
                list.append(label);
            });

            card.append(list);
            grid.append(card);
        });

        ws.append(grid);
    },

    // ВОТ ОН, ЗДЕСЬ:
    toggleFieldSetting(entity, field) {
        this.data.config.formFieldsSettings[entity][field] = !this.data.config.formFieldsSettings[entity][field];
        console.log(`Toggled ${entity}.${field} to:`, this.data.config.formFieldsSettings[entity][field]);
    },

    renderNavEditor(ws) {
        const config = dashboard.data.config;
        ws.innerHTML = ''; // Очистка

        const header = document.createElement('h2');
        header.textContent = "Структура навигации (groupedTabs)";
        ws.append(header);

        const groupsContainer = document.createElement('div');
        groupsContainer.className = 'groups-list'; // Стилизуем под вертикальный список групп

        config.groupedTabs.forEach((group, gIdx) => {
            const groupBlock = document.createElement('div');
            groupBlock.className = 'group-card';
            groupBlock.style.marginBottom = '20px';

            const groupTitle = document.createElement('h3');
            groupTitle.textContent = `Группа: ${group.groupKey}`;
            groupBlock.append(groupTitle);

            const tabsGrid = document.createElement('div');
            tabsGrid.className = 'entities-grid'; // Используем готовую сетку для табов

            group.tabs.forEach((tab, tIdx) => {
                const tabCard = document.createElement('div');
                tabCard.className = 'entity-card';

                // Поле tabKey
                const keyLabel = document.createElement('label');
                keyLabel.className = 'field-row';
                keyLabel.innerHTML = '<b>Key:</b>';
                const keyInput = document.createElement('input');
                keyInput.type = 'text';
                keyInput.value = tab.tabKey;
                keyInput.dataset.data = JSON.stringify({type:'input',name:'dashboard-tabs', data:{gIdx, tIdx, field:'tabKey'}});
                keyLabel.append(keyInput);

                // Поле code
                const codeLabel = document.createElement('label');
                codeLabel.className = 'field-row';
                codeLabel.innerHTML = '<b>Code:</b>';
                const codeInput = document.createElement('input');
                codeInput.type = 'text';
                codeInput.value = tab.code;
                codeInput.dataset.data = JSON.stringify({type:'input',name:'dashboard-tabs', data:{gIdx, tIdx, field:'code'}});
                codeLabel.append(codeInput);

                const showLabel = document.createElement('label');
                showLabel.className = 'field-row';
                showLabel.innerHTML = '<b>Show:</b>';
                const showInput = document.createElement('input');
                showInput.type = 'text';
                showInput.value = tab.code;
                showInput.dataset.data = JSON.stringify({type:'input',name:'dashboard-tabs', data:{gIdx, tIdx, field:'show'}});
                showLabel.append(codeInput);

                tabCard.append(keyLabel, codeLabel, showLabel);
                tabsGrid.append(tabCard);
            });

            groupBlock.append(tabsGrid);
            groupsContainer.append(groupBlock);
        });

        ws.append(groupsContainer);
    },

    renderMaps(ws) { /* ... */ },

    renderPlayers(ws) {
        ws.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'content-header';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '20px';

        const h2 = document.createElement('h2');
        h2.textContent = "Управление игроками (Global)";

        const addBtn = document.createElement('button');
        addBtn.className = 'btn-primary';
        addBtn.textContent = "+ Создать игрока";
        addBtn.dataset.data = JSON.stringify({type:'input',name:'dashboard-player-add'});

        header.append(h2, addBtn);
        ws.append(header);

        const grid = document.createElement('div');
        grid.className = 'entities-grid';

        dashboard.data.players.forEach((player, idx) => {
            const card = document.createElement('div');
            card.className = 'entity-card';

            const idLabel = document.createElement('small');
            idLabel.textContent = `ID: ${player.id}`;
            idLabel.style.opacity = '0.5';

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'dash-input';
            nameInput.value = player.name;
            nameInput.dataset.data = JSON.stringify({type:'input',name:'dashboard-player-name', data:{idx,field:'name'}});

            const delBtn = document.createElement('button');
            delBtn.className = 'btn-danger';
            delBtn.style.marginTop = '10px';
            delBtn.textContent = "Удалить игрока";
            delBtn.dataset.data = JSON.stringify({type:'input',name:'dashboard-player-del', data:{idx,field:'name',name:player.name}});

            card.append(idLabel, nameInput, delBtn);
            grid.append(card);
        });

        ws.append(grid);
    },


    renderSeasons(ws) {
        ws.innerHTML = '';

        // Шапка с кнопкой создания
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';

        const h2 = document.createElement('h2');
        h2.textContent = "Управление сезонами";

        const addSeasonBtn = document.createElement('button');
        addSeasonBtn.textContent = "+ Создать новый сезон";
        addSeasonBtn.dataset.data = JSON.stringify({type:'input',name:'dashboard-season-add'});

        header.append(h2, addSeasonBtn);
        ws.append(header);

        const seasonsGrid = document.createElement('div');
        seasonsGrid.className = 'entities-grid';

        dashboard.data.seasons.forEach((season, idx) => {
            const card = document.createElement('div');
            card.className = 'entity-card';

            // Редактируемое название
            const nameLabel = document.createElement('label');
            nameLabel.innerHTML = '<b>Название:</b>';
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = season.name;
            nameInput.dataset.data = JSON.stringify({type:'input',name:'dashboard-season-name', data:{idx,field:'name'}});

            const gameInfo = document.createElement('label');
            gameInfo.textContent = `Игра: ${season.game} (ID: ${season.id})`;

            const playerList = document.createElement('div');
            playerList.className = 'season-players-list';
            playerList.innerHTML = '<b>Участники:</b>';

            if(!season.players) season.players = [];

            season.players.forEach((p, pIdx) => {
                const pRow = document.createElement('div');
                pRow.textContent = `${p.name} (ID: ${p.id}) `;

                const removeBtn = document.createElement('button');
                removeBtn.textContent = "−";
                removeBtn.dataset.data = JSON.stringify({type:'input',name:'dashboard-season-player-del', data:{idx,pIdx,name:p.name}});
                pRow.append(removeBtn);
                playerList.append(pRow);
            });

            const addSelect = document.createElement('select');
            addSelect.innerHTML = '<option value="">+ Добавить игрока</option>';
            dashboard.data.players.forEach(p => {
                if (!season.players.find(sp => sp.id === p.id)) {
                    const opt = document.createElement('option');
                    opt.value = p.id;
                    opt.textContent = p.name;
                    addSelect.append(opt);
                }
            });
            addSelect.dataset.data = JSON.stringify({type:'input',name:'dashboard-season-player-add', data:{idx}});

            // Кнопки управления конкретным сезоном
            const controls = document.createElement('div');
            controls.style.marginTop = '15px';
            controls.style.display = 'flex';
            controls.style.gap = '10px';

            const saveBtn = document.createElement('button');
            saveBtn.textContent = "💾 Сохранить";
            saveBtn.classList.add('btn-primary');
            addSelect.dataset.data = JSON.stringify({type:'input',name:'dashboard-season-save', data: season.id});

            const delBtn = document.createElement('button');
            delBtn.textContent = "🗑️ Удалить";
            delBtn.classList.add('btn-danger');
            delBtn.dataset.data = JSON.stringify({type:'input',name:'dashboard-season-save', data: season});

            controls.append(saveBtn, delBtn);

            card.append(nameLabel, nameInput, gameInfo, playerList, addSelect, controls);
            seasonsGrid.append(card);
        });

        ws.append(seasonsGrid);
    },

    saveSeason() {
        main.saveCurrentSeason();
        console.log("Сезон сохранен в DB");
    },

    createNewSeason (ws) {
        const newSeason = main.addSeason();
        this.data.seasons = gameData.seasons;
        this.renderSeasons(ws);
    },

    deleteSeason(id, ws) {
        if (confirm(`Удалить сезон #${id}?`)) {
            main.delSeason(id);
            this.data.seasons = gameData.seasons;
            this.renderSeasons(ws);
        }
    }
};
