
//    import { pipeline } from '@huggingface/transformers';
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

// 1. Отключаем интернет
env.allowLocalModels = true;
env.allowRemoteModels = false;
// 2. Указываем путь к папке с моделями (относительно index.html)
env.localModelPath = './models/';

const modelName = 'SmolLM-135M-Instruct-ONNX';
//    const modelName = 'SmolLM2-135M-Instruct-ONNX';


let generator = null;

// Состояния персонажей (можно расширять)
const npcs = {
    "smith": {
        name: "Blacksmith Grom",
        role: "Your name is Grom. You are dwarf. You're a stern fantasy blacksmith. You speak briefly, using words like 'steel,' 'hammer,' 'foreigner.'",
        history: []
    }
};

/**
 * 1 & 2. Загрузка библиотеки и модели
 */
async function initAI() {
    if (generator) return;

    console.log("Загрузка модели... (может занять время при первом запуске)");

    generator = await pipeline('text-generation', modelName, {
        model_file: 'onnx/model_q4',
//            model_file: 'onnx/model_quantized',
        dtype: 'q4', // указываем тип квантования
        device: 'webgpu', // для скорости на Android
    });

    console.log("ИИ готов к работе!");
}

/**
 * 3. Функция общения с сохранением истории
 */
async function chatWithNPC(npcId, userText) {
    if (!generator) await initAI();

    const npc = npcs[npcId];

    // Добавляем сообщение игрока в историю
    npc.history.push({ role: 'user', content: userText });

    // Ограничиваем историю (последние 5 реплик), чтобы не перегружать память телефона
    if (npc.history.length > 5) npc.history.shift();

    // Собираем промпт: Системная роль + История
    const messages = [
        { role: 'system', content: npc.role },
        ...npc.history
    ];

    // Генерация ответа
    console.log("Sending message...");
    const output = await generator(messages, {
        max_new_tokens: 128,
        use_cache: true,
        temperature: 0.7,
        do_sample: true,
        top_k: 50
    });

    const botReply = output[0].generated_text.at(-1).content;

    // Сохраняем ответ бота в историю
    npc.history.push({ role: 'assistant', content: botReply });

    return botReply;
}

initAI().then(async ()=>{
    const reply = await chatWithNPC('smith', "Hello, my name is M! What is your name?");
    console.log("Кузнец:", reply);
});