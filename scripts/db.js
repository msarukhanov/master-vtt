const DB_NAME = "RoE_Database";
const DB_VERSION = 1;
const STORE_NAME = "gameData";

const dbManager = {
    db: null,

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };

            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve();
            };
            request.onerror = () => reject("Ошибка открытия IndexedDB");
        });
    },

    async saveGame(gameId, data) {
        return new Promise((resolve) => {
            const transaction = this.db.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            store.put(data, gameId);
            transaction.oncomplete = () => resolve(true);
        });
    },

    async loadGame(gameId) {
        return new Promise((resolve) => {
            const transaction = this.db.transaction([STORE_NAME], "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(gameId);
            request.onsuccess = () => resolve(request.result);
        });
    },

    async resetGame(gameId) {
        return new Promise((resolve) => {
            const transaction = this.db.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(gameId);

            transaction.oncomplete = () => {
                console.log(`Данные для ${gameId} удалены из IndexedDB.`);
                resolve(true);
            };
        });
    }
};
