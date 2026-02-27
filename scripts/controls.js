
//
// const mainElements = {
//     loading: elementById('loading'),
//     mainMenu: elementById('main-menu'),
//
//     headerMenuInner: elementById('header-menu-inner'),
//     leftMenuInner: elementById('left-menu-inner'),
//     grid: elementById('grid'),
//     gridFactions: elementById('gridFactions'),
//     map: elementById('map'),
//     dices: elementById('dices'),
//     charactersList: elementById('charactersList')
// };

const controls = {
    init() {
        const leftMenu = elementById('left-menu-inner');
        const headerMenu = elementById('header-menu-inner');

        // Очищаем меню перед рендером (полезно при смене игры)
        leftMenu.innerHTML = '';
        headerMenu.innerHTML = '';

        // Универсальная функция создания таба
        const makeTab = (item) => {
            const container = createEl('div', 'main-tab');
            const group = createEl('div', 'left-menu-title', l10n[lang].tabs[item.groupKey]);
            group.onclick = this.clickTab2;

            const subTabContainer = createEl('div', 'main-tab-inner sub-tab');

            item.tabs.forEach(tab => {
                const link = createEl('div', 'left-menu-tab');
                // Вместо JSON в атрибутах, сохраняем объект прямо в свойство элемента
                const linkInner = createEl('span', 'left-menu-tab-inner', l10n[lang].tabs[tab.tabKey]);
                linkInner._tabData = tab;
                linkInner.onclick = this.clickTab;

                link.appendChild(linkInner);
                subTabContainer.appendChild(link);
            });

            container.appendChild(group);
            container.appendChild(subTabContainer);
            return container;
        };

        groupedTabs.forEach((item) => {
            leftMenu.appendChild(makeTab(item));
            headerMenu.appendChild(makeTab(item));
        });
    },

    changeTab(tabCode) {

        if(tabCode === 'mainMenu') {
            elementById('main-menu').style.display = 'flex';
            elementById('header-menu-inner').innerHTML = '';
            elementById('left-menu-inner').innerHTML = '';
            elementById('main-wrapper').innerHTML = '';
            return;
        }

        if(tabCode === 'dataReset') {
            dbManager.resetGame(currentGame).then(()=>{
                main.setCurrentGame(currentGame);
            });

            return;
        }

        if(tabCode === 'charGen') {
            generator.generateDraft();

            return;
        }

        // if (tabCode !== currentTab) {
        //     currentTab = tabCode;
        //     document.body.className = `tab-${tabCode}`;
        // }

        if (tabCode !== currentTab) {
            // 1. Сначала убираем видимость у старой вкладки (если она была)
            const oldWrapper = document.querySelector('.wrapper[style*="display: block"]');
            if (oldWrapper) {
                oldWrapper.style.opacity = "0";
                oldWrapper.style.transform = "translateY(10px)";
                // Ждем окончания анимации перед тем как скрыть совсем
                setTimeout(() => { oldWrapper.style.display = 'none'; }, 300);
            }

            elementById('main-wrapper').innerHTML = '';

            if(listKeys.includes(tabCode)) {
                elementById('main-wrapper').innerHTML =
                    `<div class="wrapper ${tabCode}">
                        <div class="filters">
                            <input id="${tabCode}NameFilter" placeholder="Имя">
                            <select id="groupFilter">
                                <option value="">${l10n[lang].all_groups}</option>
                            </select>
                        </div>
                        <div id="list" class="grid"></div>
                    </div>`;
                list.init(tabCode);
            }
            else if(tabCode === 'search') {
                elementById('main-wrapper').innerHTML =
                    `<div class="wrapper ${tabCode}">
                        <div class="filters">
                            <input id="${tabCode}NameFilter" placeholder="Имя">
                        </div>
                        <div id="list" class="grid"></div>
                    </div>`;
                searchEngine.init();
            }
            else if(tabCode === 'editor') {
                elementById('main-wrapper').innerHTML =
                    `<div class="wrapper editor-main">
                        <div id="editor-list">
                            <button class="short-list-button" onclick="editor.toggleShortList(event)"><<</button>
                            <button onclick="editor.save()">${l10n[lang].save}</button>
                            <button onclick="editor.exportAvatars()">Export avatars</button>
                            <button onclick="editor.addCharacter()">+ ${l10n[lang].newChar}</button>
                            <div id="editorList"></div>
                        </div>
                        <div id="editor">
                            <h2 id="editorTitle">${l10n[lang].character}</h2>
                            <div id="form"></div>
                        </div>
                    </div>`;
                map.render();
            }
            else if(tabCode === 'dashboard') {
                elementById('main-wrapper').innerHTML = `<div class="wrapper dashboard" id="dashboard"></div>`;
                dashboard.init();
            }
            else if(tabCode === 'map') {
                elementById('main-wrapper').innerHTML = `<div class="wrapper map" id="map"></div>`;
                map.render();
            }
            else if(tabCode === 'tacticalField') {
                elementById('main-wrapper').innerHTML = `<div class="wrapper tacticalField" id="tacticalField"></div>`;
                tacticalMap.init()
            }
            else if(tabCode === 'editor') {
                elementById('main-wrapper').innerHTML = `<div class="wrapper dices" id="dices"></div>`;
                editor.init();
            }
            else if(tabCode === 'dices') {
                elementById('main-wrapper').innerHTML = `<div class="wrapper dices" id="dices"></div>`;
                dices.makeDices();
            }
            else if(tabCode === 'gallery') {
                elementById('main-wrapper').innerHTML = `<div class="wrapper gallery" id="gallery"></div>`;
                gallery.init();
            }

            // 2. Переключаем класс на body
            currentTab = tabCode;
            document.body.className = `tab-${tabCode}`;

            window.scrollTo({ top: 0, behavior: 'instant' });

            // 3. Находим новый wrapper
            const newWrapper = document.querySelector(`.wrapper.${tabCode}`) || document.getElementById(tabCode);

            if (newWrapper) {
                newWrapper.scrollTop = 0;
                // Сначала делаем его частью DOM
                newWrapper.style.display = (tabCode === 'editor') ? 'flex' : 'block';

                // Ждем 1 кадр (через setTimeout 0), чтобы браузер "понял",
                // что элемент появился, и запустил transition
                setTimeout(() => {
                    newWrapper.style.opacity = "1";
                    newWrapper.style.transform = "translateY(0)";
                }, 10);
            }
        }

        if (tabCode === 'map') {
            setTimeout(() => {
                const mapEl = elementById('world-map');
                mapEl?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }, 100);
        }

        document.title = 'RoE: ' + l10n[lang].tabs[tabCode];
    },

    clickMenuIcon() {
        elementById('left-menu').classList.toggle("open");
        elementById('menu-icon').classList.toggle("menu-icon-change");
    },

    clickTab(event) {
        // Достаем данные напрямую из свойства, без JSON.parse
        const tabData = event.currentTarget._tabData;
        if (!tabData) return;

        // Закрываем меню
        elementById('left-menu').classList.remove("open");
        elementById('menu-icon').classList.remove("menu-icon-change");

        controls.changeTab(tabData.code);
    },

    clickTab2(event) {
        const parent = event.currentTarget.parentElement;
        const isOpen = parent.classList.contains('open');

        // Закрываем все остальные группы
        document.querySelectorAll('.main-tab').forEach(el => el.classList.remove('open'));

        // Переключаем текущую (если была закрыта — откроем)
        if (!isOpen) parent.classList.add('open');
    },

    createPopup(id, className, contentNode) {
        const existing = elementById(id);
        if (existing) {
            existing.remove();
            // Убираем return null, чтобы при вызове из генератора
            // (когда мы пересоздаем) функция продолжала работу и рисовала новый
        }

        const popup = createEl('div', className, null, null, id);

        // Закрываем только при клике строго по фону (id оверлея)
        popup.onclick = (e) => {
            if (e.target.id === id) popup.remove();
        };

        let inner;

        // Проверяем, пришел ли нам готовый элемент или строка/путь
        if (contentNode instanceof HTMLElement) {
            inner = contentNode;
        } else {
            switch (id) {
                case 'image-popup':
                    inner = document.createElement("img");
                    inner.src = contentNode;
                    break;
                case 'text-popup':
                    inner = document.createElement("div");
                    inner.innerHTML = contentNode;
                    break;
                case 'gen-popup':
                    inner = document.createElement("div");
                    inner.innerHTML = contentNode;
                    break;
                default:
                    inner = document.createElement("div");
                    inner.innerHTML = contentNode;
            }
        }

        // Останавливаем всплытие, чтобы клики по кнопкам/тексту внутри не доходили до фона
        inner.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        popup.appendChild(inner);
        document.body.appendChild(popup);
        return popup;
    }
};
