const Card = {
    make(c, ctx, parent) {
        if (c.group && (!ctx.group || (ctx.group.toLowerCase() !== c.group.toLowerCase())) && !groupFilter?.value) {
            ctx.group = c.group.toLowerCase();
            if(parent){
                parent.appendChild(createEl("div", "location", c.group));
            }
        }

        const isStudentGroup = ['Школа', 'Университет'].includes(ctx.group);
        if (isStudentGroup && c.age <= 22 && c.age !== ctx.age) {
            ctx.age = c.age;
            if(parent){
                parent.appendChild(createEl("div", "location", ` > ${ctx.group} ${c.age}`));
            }
        }

        const card = createEl("div", "card");

        const getField = (label, value, isImportant = false) => {
            if (!value) return '';
            if (isImportant) {
                const parts = value.split('.');
                return `<div class="field"><span class="label">${label}:</span><span class="important"> ${parts[0]}</span>${parts.slice(1).join("; ")}</div>`;
            }
            return `<div class="field"><span class="label">${label}:</span> ${Array.isArray(value) ? value.join("; ") : value}</div>`;
        };

        const findName = (id) => data.characters.find(ch => ch.id === id)?.name || "???";

        const factionsHtml = c.factions?.length ? getField(l10n[lang].factions, c.factions.map(id => data.factions.find(f => f.id === id)?.name).join("; ")) : '';

        const familyHtml = c.family?.length
            ? getField(l10n[lang].family, c.family.map(m => `${m.type.charAt(0).toUpperCase() + m.type.slice(1)} — ${findName(m.id)}`).join("; "))
            : '';

        const friendsHtml = c.friends?.length
            ? getField(l10n[lang].friends, c.friends.map(m => `${m.type.charAt(0).toUpperCase() + m.type.slice(1)} — ${findName(m.id)}`).join("; "))
            : '';

        const relationHtml = c.relation
            ? `<div class="field"><span class="label">${l10n[lang].relation}:</span>${c.relation.type} — ${findName(c.relation.id)}</div>` : '';

        let avatarHtml = '', avatarImg, fullHeightImage;
        if (avatars[c.id]) {
            avatarImg = `<img class="avatar" data-data='{"type":"click","name":"avatar-click","data":"${c.id}"}' src="${avatars[c.id]}" alt="avatar">`;
        }
        if (fullheight[c.id]) {
            fullHeightImage = `<img class="avatar" data-data='{"type":"click","name":"fullheight-click","data":"${c.id}"}' src="${fullheight[c.id]}" alt="avatar">`;
        }
        if(avatarImg || fullHeightImage) {
            avatarHtml = `<div class="card-avatar">`;
            if (avatarImg) {
                avatarHtml += avatarImg;
            }
            else if(fullHeightImage) {
                avatarHtml += fullHeightImage;
            }
            avatarHtml += `</div>`;
        }

        card.innerHTML = `
            <div class="card-top">
                ${avatarHtml}
                <div class="card-info">
                    <div class="name">
                        ${c.name} 
                        <span class="gender ${c.gender === 'w' ? 'woman' : 'man'}">${c.gender === 'w' ? '&#x2640;' : '&#x2642;'}</span>
                    </div>
                    ${getField(l10n[lang].group, c.group)}
                    ${getField(l10n[lang].rank, c.rank)}
                    ${getField(l10n[lang].race, c.race)}
                    ${getField(l10n[lang].people, c.people)}
                    ${getField(l10n[lang].class, c.class)}
                    ${getField(l10n[lang].work, c.work)}
                    ${getField(l10n[lang].residence, c.residence)}
                    ${getField(l10n[lang].age, c.age)}
                    ${getField(l10n[lang].profession, c.profession)}    
                </div>
            </div>
        `;

        if (c.fullSize) {
            card.innerHTML += `
                  <div class="card-bottom">
                    ${getField(l10n[lang].alignment, c.alignment)}
                    ${getField(l10n[lang].excess, c.excess, true)}
                    ${getField(l10n[lang].fate, c.fate, true)}
                    ${getField(l10n[lang].class, c.class)}
                    ${getField(l10n[lang].talents, c.talents)}
                    ${getField(l10n[lang].longCampaign, c.longCampaign, c.longCampaign?.includes('.'))}
                    ${getField(l10n[lang].globalCampaign, c.globalCampaign)}
                    ${getField(l10n[lang].quests, c.quests)}
                    ${factionsHtml}
                    ${relationHtml}
                    ${familyHtml}
                    ${friendsHtml}
                </div>
            `;

            const btnBox = createEl('div', 'card-buttons');
            const btn = createEl('button', 'card-button', l10n[lang].stats);
            btn.dataset.data = JSON.stringify({type: 'click', name: 'char-open', data: c.id});
            btnBox.appendChild(btn);

            if (c.description || c.philosophy || c.family || c.friends || c.factions) {
                if (c.description) {
                    const btn = createEl('button', 'card-button', l10n[lang].description);
                    btn.dataset.data = JSON.stringify({type: 'click', name: 'text-popup', data: c.description});
                    btnBox.appendChild(btn);
                }
                if (c.family || c.friends || c.factions) {
                    const btn3 = createEl('button', 'card-button', l10n[lang].connections);
                    btn3.dataset.data = JSON.stringify({type: 'click', name: 'social-graph', data: c.id});
                    btnBox.appendChild(btn3);
                }
                if (c.philosophy) {
                    const btn2 = createEl('button', 'card-button', l10n[lang].philosophy);
                    btn2.dataset.data = JSON.stringify({type: 'click', name: 'text-popup', data: c.philosophy});
                    btnBox.appendChild(btn2);
                }
                card.appendChild(btnBox);
            }
        }

        if (c.fullSize && fullheight[c.id] && avatars[c.id]) {
            const imagesBox = createEl('div', 'card-images');
            imagesBox.innerHTML += `<img class="avatar fullheight" data-data='{"type":"click","name":"fullheight-click","data":"${c.id}"}' src="${fullheight[c.id]}" alt="avatar">`;
            card.appendChild(imagesBox);
        }

        return card;
    },

    make2(c, currentTier, ctx, parent, items) {
        if (c.rendered) return null;

        if (c.group && ctx.group !== c.group) {
            ctx.group = c.group;
            const loc = createEl("div", "location");

            if (c.group_descr && c.group_id) {
                const groupData = gameData[currentGame][c.group_id]?.find(i => i.id === c.group);
                if (groupData) {
                    loc.innerHTML = `<div class="name">${groupData.name}</div>
                                 <div class="field"><span class="label">${l10n[lang].description}:</span> ${groupData.description}</div>`;
                }
            } else {
                loc.textContent = c.group;
            }
            parent.appendChild(loc);
        }

        const card = createEl("div", `card tier-${currentTier}`);

        const getField = (label, value, extra = '') => {
            if (!value || (Array.isArray(value) && !value.length)) return '';
            const text = Array.isArray(value) ? value.join("; ") : value;
            return `<div class="field"><span class="label">${label}:</span> ${text} ${extra}</div>`;
        };

        let memberHtml = '';
        if (c.members?.length) {
            const names = c.members.map(id => data.characters.find(ch => ch.id === id)?.name).filter(Boolean);
            if (names.length) {
                memberHtml += getField(l10n[lang].leader, names[0]);
                if (names.length > 1) memberHtml += getField(l10n[lang].members, names.slice(1));
            }
        }

        const racesNot = c.racesNot?.length ? `(${l10n[lang].not} ${c.racesNot.join("; ")})` : '';
        const peoplesNot = c.peoplesNot?.length ? `(${l10n[lang].not} ${c.peoplesNot.join("; ")})` : '';

        let avatarHtml = '', avatarImg, fullHeightImage;
        if (avatars[c.id]) {
            avatarImg = `<img class="avatar" data-data='{"type":"click","name":"avatar-click","data":"${c.id}"}' src="${avatars[c.id]}" alt="avatar">`;
        }
        if (fullheight[c.id]) {
            fullHeightImage = `<img class="avatar" data-data='{"type":"click","name":"fullheight-click","data":"${c.id}"}' src="${fullheight[c.id]}" alt="avatar">`;
        }
        if(avatarImg || fullHeightImage) {
            avatarHtml = `<div class="card-avatar">`;
            if (avatarImg) {
                avatarHtml += avatarImg;
            }
            else if(fullHeightImage) {
                avatarHtml += fullHeightImage;
            }
            avatarHtml += `</div>`;
        }

        card.innerHTML = `
            <div class="card-top">
                ${avatarHtml}
                <div class="card-info">
                    <div class="name">${c.name || ""}</div>
                    ${getField(l10n[lang].factions, c.factions)}
                    ${getField(l10n[lang].factions_additional, c.factions_additional)}
                    ${getField(l10n[lang].participants, c.participants)}
                    ${getField(l10n[lang].participants_additional, c.participants_additional)}
                    ${getField(l10n[lang].races, c.races, racesNot)}
                    ${getField(l10n[lang].peoples, c.peoples, peoplesNot)}
                    ${getField(l10n[lang].roleplay, c.roleplay)}
                    ${getField(l10n[lang].roleplay_tips, c.roleplay_tips)}
                    ${getField(l10n[lang].features, c.features)}
                    ${getField(l10n[lang].strengths, c.strengths)}
                    ${getField(l10n[lang].weaknesses, c.weaknesses)}
                    ${getField(l10n[lang].period, c.period)}
                    ${getField(l10n[lang].titles, c.titles)}
                    ${getField(l10n[lang].domains, c.domains)}
                    ${getField(l10n[lang].goals, c.goals || c.goal)}
                    ${getField(l10n[lang].alignment, c.alignment)}
                    ${getField(l10n[lang].blessings, c.blessings)}
                    
                    ${getField(l10n[lang].oblivion, c.oblivion)}
                    ${getField(l10n[lang].description, c.description)}
                    ${getField(l10n[lang].text, c.text)}
                    ${getField(l10n[lang].additional, c.additional)}
                    ${getField(l10n[lang].quote, c.quote)}
                </div>
            </div>
        `;
        if(memberHtml) {
            card.innerHTML += `
                 <div class="card-bottom">
                    ${memberHtml}
                </div>
            `;
        }

        if (c.tier) {
            const children = items.filter(item => item.parent === c.id);
            if (children.length) {
                const nextTier = currentTier + 1;
                children.forEach(child => {
                    const childCard = Card.make2(child, nextTier, ctx, card, items);
                    childCard.dataset.data = JSON.stringify({type:'click',name:'list-item', data: child});
                    if (childCard) card.appendChild(childCard);
                });
            }
        }

        if (c.parent) c.rendered = true;

        return card;
    },
};