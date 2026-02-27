const tacticalFieldEditor = {
    initEditorControls() {
        const toggleModeBtn = createEl('button', 'tf-toggle-mode', `🛠️ ${l10n[lang].editor}`);
        toggleModeBtn.onclick = () => {
            this.viewMode = this.viewMode === 'edit' ? 'play' : 'edit';
            toggleModeBtn.textContent = this.viewMode === 'edit' ? `🛠️ ${l10n[lang].editor}` : `🎮 ${l10n[lang].game}`;
            this.selectedCharLink = null;

            this.mode = this.viewMode === 'edit' ? 'select' : 'select';
            this.selectedCharLink = null;
            this.selectedObject = null;

            if (this.viewMode === 'play') {

                this.startBattle();
            } else {
                playerHUD.destroy();
                this.activeUnit = null;
                this.moving = null;

            }
            tfControls.classList.toggle('play');
            tfGridWrapper.classList.toggle('play');

            // this.render();
        };

        const mapRow = createEl('div', 'tf-edit-row');
        const saveBtn = createEl('button', '', '💾');
        saveBtn.onclick = () => {
            // const name = prompt("Введите название карты:", `Map ${gameData[currentGame].tacticalMaps.length + 1}`);
            if (name) {
                this.saveMap(name);
                this.updateMapList(); // Обновить список в селекторе
            }
        };
        this.mapSelect = createEl('select', 'tf-map-select');
        this.updateMapList = () => {
            this.mapSelect.innerHTML = `<option value="-1">${l10n[lang].load_map_text}</option>`;
            if(gameData[currentGame].tacticalMaps) {
                gameData[currentGame].tacticalMaps.forEach((m, i) => {
                    this.mapSelect.append(new Option(m.name, m.id));
                });
            }
        };
        this.mapSelect.onchange = (e) => {
            if (e.target.value >= 0) this.loadMap(e.target.value);
        };
        this.updateMapList();
        mapRow.append(saveBtn, this.mapSelect);

        const sizesRow = createEl('div', 'tf-edit-row');
        tfRowInput = Object.assign(createEl('input'), { type: 'number', value: tacticalMap.rows, min: 1 });
        tfColInput = Object.assign(createEl('input'), { type: 'number', value: tacticalMap.cols, min: 1 });
        tfResizeBtn = createEl('button', '', '↻');
        tfResizeBtn.onclick = () => {
            tacticalMap.rows = +tfRowInput.value;
            tacticalMap.cols = +tfColInput.value;
            tacticalHexGrid.initGrid(tacticalMap.rows, tacticalMap.cols);
        };
        tfEraseBtn = createEl('button', '', '🗑️');
        tfEraseBtn.onclick = () => this.setMode('erase', tfEraseBtn);
        sizesRow.append(tfRowInput, tfColInput, tfResizeBtn, tfEraseBtn);

        const charRow = createEl('div', 'tf-edit-row');
        tfCharBtn = createEl('button', '', '👤');
        tfCharBtn.onclick = () => this.setMode('character', tfCharBtn);
        tfCharTeamSelect = createEl('select', 'tf-char-select');
        this.teams.forEach(i => tfCharTeamSelect.append(new Option(`Team ${i}`, i)));
        tfCharTeamSelect.onchange = e => tacticalMap.selectedTeam = +e.target.value;
        tfCharSelect = createEl('select', 'tf-char-select');
        data.characters.forEach(i => tfCharSelect.append(new Option(`${i.name}`, i.id)));
        tfCharSelect.onchange = e => {
            const selectedTemplate = data.characters.find(c => c.id === e.target.value);
            if (selectedTemplate) {
                tacticalMap.selectedChar = JSON.parse(JSON.stringify(selectedTemplate));
            }
        };
        charRow.append(tfCharBtn, tfCharTeamSelect, tfCharSelect);

        const objRow = createEl('div', 'tf-edit-row');
        tfObjBtn = createEl('button', '', '🌳');
        tfObjBtn.onclick = () => this.setMode('object', tfObjBtn);
        tfObjSelect = createEl('select', 'tf-obj-select');
        this.objectTypes.forEach(o => tfObjSelect.append(new Option(o, o)));
        tfObjSelect.onchange = e => tacticalMap.selectedObject = e.target.value;
        objRow.append(tfObjBtn, tfObjSelect);

        const terrainRow = createEl('div', 'tf-edit-row');
        const tfTerrainBtn = createEl('button', '', '⛰️');
        tfTerrainBtn.onclick = () => this.setMode('terrain', tfTerrainBtn);
        const tfTerrainSelect = createEl('select', 'tf-terrain-select');
        this.terrainTypes.forEach(t => tfTerrainSelect.append(new Option(t, t)));
        tfTerrainSelect.onchange = e => this.selectedTerrain = e.target.value;
        const tfHeightSelect = createEl('select', 'tf-height-select');
        this.terrainHeights.forEach(h => tfHeightSelect.append(new Option(`H: ${h}`, h)));
        tfHeightSelect.onchange = e => this.selectedHeight = +e.target.value;
        terrainRow.append(tfTerrainBtn, tfTerrainSelect, tfHeightSelect);

        tfControls.append(
            toggleModeBtn, mapRow, sizesRow,
            charRow, objRow, terrainRow
        );
    },

    renderCellEditor(q, r) {
        this.editorContainer.innerHTML = '';
        if (this.viewMode !== 'edit') return;
        const key = `${q}_${r}`;
        const cell = tacticalMap.gridData[key];

        const panel = createEl('div', 'tf-char-panel compact');
        panel.innerHTML = `<h3>${l10n[lang].cell || 'Cell'} [${q}, ${r}]</h3>`;

        // 1. Выбор террейна (уже есть, но можно продублировать тут)
        // 2. Редактор событий
        const eventBox = createEl('div', 'tf-edit-row');
        eventBox.innerHTML = `<h4>${l10n[lang].cell || 'Событие (Триггер)'} [${q}, ${r}]</h4>`;

        const typeSelect = createEl('select', 'tf-map-select');
        ['none', 'dialog', 'damage', 'spawn', 'portal'].forEach(t => {
            const opt = new Option(t, t);
            if (cell.event?.type === t) opt.selected = true;
            typeSelect.add(opt);
        });

        const textArea = createEl('textarea', 'event-text-input');
        textArea.placeholder = "Текст или данные события...";
        textArea.value = cell.event?.text || '';

        const onceLabel = createEl('label');
        const onceCheck = createEl('input');
        onceCheck.type = 'checkbox';
        onceCheck.checked = cell.event?.once !== false; // по дефолту true
        onceLabel.append(onceCheck, " Сработать один раз");

        const saveBtn = createEl('button', 'btn-save-cell', 'Сохранить клетку');
        saveBtn.onclick = () => {
            if (typeSelect.value === 'none') {
                delete cell.event;
            } else {
                cell.event = {
                    type: typeSelect.value,
                    text: textArea.value,
                    once: onceCheck.checked,
                    fired: false
                };
            }
            console.log("Клетка сохранена", cell);
        };

        eventBox.append(typeSelect, textArea, onceLabel, saveBtn);
        panel.append(eventBox);
        this.editorContainer.append(panel);
    },

    renderCharEditor() {
        this.editorContainer.innerHTML = '';
        if (this.viewMode !== 'edit' || !this.selectedCharLink) return;

        const char = this.selectedCharLink;

        const panel = createEl('div', 'tf-char-panel compact');
        panel.innerHTML = `<h3>${l10n[lang].editor}: Team ${char.team} #${char.num}</h3>`;

        // 1. Имя (Длинное поле)
        const nameRow = createEl('div', 'tf-edit-row name-row');
        nameRow.innerHTML = `<label>Имя</label><label>ID</label><label>Num</label>`;
        const nameInp = Object.assign(createEl('input'), { type: 'text', value: char.name, placeholder: `${l10n[lang].char_name_placeholder}` });
        nameInp.oninput = () => { char.name = nameInp.value; };
        nameRow.append(nameInp);
        const idInp = Object.assign(createEl('input'), { type: 'text', value: char.id, placeholder: `${l10n[lang].char_id_placeholder}` });
        idInp.oninput = () => { char.id = idInp.value; };
        nameRow.append(idInp);
        const numInp = Object.assign(createEl('input'), { type: 'number', value: char.num});
        numInp.oninput = () => { char.num = numInp.value; };
        nameRow.append(numInp);
        panel.append(nameRow);

        // 2. Основные статы (HP, MP, WP) - 3 колонки
        const row1 = createEl('div', 'tf-stats-grid grid-3');
        [{l:'HP', k:'hp'}, {l:'MP', k:'mp'}, {l:'WP', k:'wp'}].forEach(f => {
            const wrap = createEl('div', 'mini-field');
            wrap.innerHTML = `<label>${f.l}</label>`;
            const inp = Object.assign(createEl('input'), { type: 'number', value: char[f.k] });
            inp.oninput = () => char[f.k] = +inp.value;
            wrap.append(inp);
            row1.append(wrap);
        });
        panel.append(row1);

        // 3. Боевые дистанции (Init, Walk, Attack) - 3 колонки
        const row2 = createEl('div', 'tf-stats-grid grid-3');
        [
            {l:'Init', k:'initiative'},
            {l:'👟 Mov.Rad', k:'walkRadius'},
            {l:'🎯 At.Rad', k:'attackRadius'}
        ].forEach(f => {
            const wrap = createEl('div', 'mini-field');
            wrap.innerHTML = `<label>${f.l}</label>`;
            const inp = Object.assign(createEl('input'), { type: 'number', value: char[f.k] || (f.k === 'walkRadius'?3:1) });
            inp.oninput = () => char[f.k] = +inp.value;
            wrap.append(inp);
            row2.append(wrap);
        });
        panel.append(row2);

        // 4. Атака и Защита (Мин, Макс, Крит)
        const addTriple = (label, key) => {
            const row = createEl('div', 'tf-edit-row triple');
            row.innerHTML = `<label>${label}</label>`;
            const val = char[key] || [2, 7, false];
            const iMin = Object.assign(createEl('input'), { type: 'number', value: val[0] });
            const iMax = Object.assign(createEl('input'), { type: 'number', value: val[1] });
            const iCrit = Object.assign(createEl('input'), { type: 'checkbox', checked: !!val[2] });
            const upd = () => { char[key] = [+iMin.value, +iMax.value, iCrit.checked]; };
            [iMin, iMax, iCrit].forEach(i => i.oninput = upd);
            row.append(iMin, iMax, iCrit);
            panel.append(row);
        };

        addTriple(`${l10n[lang].attack}`, 'attack');
        addTriple(`${l10n[lang].defence}`, 'def');

        const symbolRow = createEl('div', 'tf-edit-row symbol-row');
        symbolRow.innerHTML = `<label>${l10n[lang].symbol}</label>`;

        this.symbols.forEach(s => {
            const btn = createEl('button', `symbol-btn ${char.symbol === s ? 'active' : ''}`, s);
            btn.onclick = () => {
                char.symbol = s;
                document.querySelectorAll('.symbol-btn').forEach(el => el.classList.remove('active'));
                btn.classList.toggle('active');
                this.renderCell(this.selectedCharLink.x, this.selectedCharLink.y); // Сразу обновляем вид на поле
            };
            symbolRow.append(btn);
        });
        panel.append(symbolRow);

        this.editorContainer.append(panel);
    },

    renderObjEditor() {
        this.editorContainer.innerHTML = '';
        if (this.viewMode !== 'edit' || !this.selectedObjectLink) return;

        const obj = this.selectedObjectLink;
        const panel = createEl('div', 'tf-char-panel compact');
        panel.innerHTML = `<h3>${l10n[lang].editor}: Object ${obj.obj} #${obj.id}</h3>`;

        // 1. Имя (Длинное поле)
        const nameRow = createEl('div', 'tf-edit-row name-row');
        nameRow.innerHTML = `<label>Имя</label><label>ID</label><label>Num</label>`;
        const nameInp = Object.assign(createEl('input'), { type: 'text', value: obj.name, placeholder: `${l10n[lang].obj_name_placeholder}` });
        nameInp.oninput = () => { obj.name = nameInp.value; };
        nameRow.append(nameInp);
        const idInp = Object.assign(createEl('input'), { type: 'text', value: obj.id, placeholder: `${l10n[lang].obj_name_placeholder}` });
        idInp.oninput = () => { obj.id = idInp.value; };
        nameRow.append(idInp);
        panel.append(nameRow);

        // у объекта может быть ХП
        const row1 = createEl('div', 'tf-stats-grid grid-3');
        [{l:'HP', k:'hp'}].forEach(f => {
            const wrap = createEl('div', 'mini-field');
            wrap.innerHTML = `<label>${f.l}</label>`;
            const inp = Object.assign(createEl('input'), { type: 'number', value: obj[f.k] });
            inp.oninput = () => obj[f.k] = +inp.value;
            wrap.append(inp);
            row1.append(wrap);
        });

        const wrapMapSelect = createEl('div', 'mini-field');
        wrapMapSelect.innerHTML = `<label>${l10n[lang].map_id_placeholder}</label>`;
        const targetMapSelect = createEl('select', 'tf-map-select');
        targetMapSelect.innerHTML = `<option value="-1">${l10n[lang].load_map_text}</option>`;
        if(gameData[currentGame].tacticalMaps) {
            gameData[currentGame].tacticalMaps.forEach((m, i) => {
                targetMapSelect.append(new Option(m.name, m.id));
            });
        }
        targetMapSelect.value = obj.targetMapId || -1;
        targetMapSelect.onchange = (e) => {
            if (e.target.value >= 0) obj.targetMapId = e.target.value;
        };
        wrapMapSelect.append(targetMapSelect);
        row1.append(wrapMapSelect);

        const typeSelect = Object.assign(createEl('select', 'tf-obj-select'), {value: obj.obj});
        ['tree', 'rock', 'chest', 'wall', 'water', 'pit', 'portal'].forEach(o => typeSelect.append(new Option(o, o)));
        typeSelect.onchange = e => panel.classList.toggle('show-coords');
        row1.append(typeSelect);

        const row2 = createEl('div', 'tf-stats-grid grid-3');


        [{l:`${l10n[lang].coords}. X`, k:'targetCoords'},{l:`${l10n[lang].coords}. Y`, k:'targetCoords'}].forEach((f,k) => {
            if(!obj[f.k]) {
                obj[f.k] = [0,0];
            }
            const wrap = createEl('div', 'mini-field');
            wrap.innerHTML = `<label>${f.l}</label>`;
            const inp = Object.assign(createEl('input'), { type: 'number', value: obj[f.k][k] });
            inp.oninput = () => obj[f.k][k] = +inp.value;
            wrap.append(inp);
            row2.append(wrap);
        });

        panel.append(row1,row2);

        this.editorContainer.append(panel);
    },
};