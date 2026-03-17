const turnManager = {
    init() {
        // const mainWrapper = elementById("main-wrapper");
        // const turnBtn = createEl('button', 'next-turn-btn', '⏳');
        // turnBtn.dataset.data = JSON.stringify({type:'click',name:'global-turn-end'});
        // mainWrapper.append(turnBtn);

        tradeManager.nextTurn();
        populationManager.nextTurn();
    },

    globalTurn() {
        if(confirm("Завершить текущий ход и собрать ресурсы?")) {
            economyManager.nextTurn();
        }
    },

};