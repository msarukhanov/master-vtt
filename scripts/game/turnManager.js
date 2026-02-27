const turnManager = {
    init() {
        const mainWrapper = elementById("main-wrapper");
        const turnBtn = createEl('button', 'next-turn-btn', '⏳ Завершить ход');
        turnBtn.onclick = () => {
            if(confirm("Завершить текущий ход и собрать ресурсы?")) {
                economyManager.nextTurn();
            }
        };
        mainWrapper.append(turnBtn);
    }
};