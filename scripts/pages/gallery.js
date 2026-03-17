const gallery = {
    init(options = {}) {
        const parent = elementById('gallery');
        if (!parent) return;

        const thumbSize = options.thumbSize || 140;
        parent.innerHTML = '';

        // 1. Стили выносим в CSS файл или создаем один раз
        if (!elementById('art-gallery-style')) {
            const style = createEl('style', '', null, null, 'art-gallery-style');
            style.textContent = `
                .art-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(${thumbSize}px, 1fr));
                    gap: 12px;
                    padding: 10px;
                }
                .art-thumb {
                    aspect-ratio: 1 / 1;
                    overflow: hidden;
                    border-radius: 8px;
                    cursor: pointer;
                    background: #222;
                    
            
                }
           
                .art-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
            `;
            document.head.appendChild(style);
        }

        const container = createEl('div', 'art-gallery');

        // 2. Рендерим только те аватары, которые реально существуют
        Object.entries(avatars).forEach(([id, src]) => {
            if (!src) return; // Пропускаем пустые записи

            const wrap = createEl('div', 'art-thumb');
            const img = createEl('img');

            // Используем нативную ленивую загрузку для экономии памяти в APK
            img.loading = "lazy";
            img.src = src;
            img.alt = id;
            img.title = getDataNameById('characters', id); // Используем имя из редактора вместо ID
            wrap.dataset.data = JSON.stringify({type:'click',name:'avatar-click', data: id});

            wrap.appendChild(img);
            container.appendChild(wrap);
        });

        parent.appendChild(container);
    }
};


// const gallery = {
//     init(options = {}) {
//
//         const parent = elementById('gallery');
//         if(!parent) return;
//
//         parent.innerHTML = '';
//
//         const {
//             container = parent,
//             thumbSize = 140
//         } = options;
//
//         if (!elementById('art-gallery-style')) {
//             const style = document.createElement('style');
//             style.id = 'art-gallery-style';
//             style.textContent = `
//               .art-gallery {
//                 display: grid;
//                 grid-template-columns: repeat(auto-fill, minmax(${thumbSize}px, 1fr));
//                 gap: 12px;
//               } `;
//             document.head.appendChild(style);
//         }
//
//         // ===== gallery =====
//         const gallery = document.createElement('div');
//         gallery.className = 'art-gallery';
//
//         Object.keys(avatars).forEach(key => {
//             const wrap = document.createElement('div');
//             wrap.className = 'art-thumb';
//
//             const img = document.createElement('img');
//             img.src = avatars[key];
//             img.alt = key;
//             img.title = key;
//
//             wrap.onclick = () => createPopup('image-popup', 'image-popup', avatars[key]);
//             wrap.appendChild(img);
//             gallery.appendChild(wrap);
//         });
//
//         parent.appendChild(gallery);
//         return gallery;
//     },
// };