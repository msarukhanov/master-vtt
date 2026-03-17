const units = [
    {
        id: "sun_empire_recruit",
        name: "Рекрут Священной Империи",
        class: "warrior",
        level: 1,
        description: "Молодой ополченец в стеганом поддоспешнике, вооруженный простым копьем. Еще не нюхал пороха, но предан Солнцу.",
        visual: "Isometric fantasy unit, young human soldier, yellow and white gambeson, simple iron spear, kettle hat helmet, stylized as a classic RTS game asset, clean black outlines, bright daylight lighting."
    },
    {
        id: "sun_empire_archer",
        name: "Стрелок Священной Империи",
        class: "archer",
        level: 2,
        description: "Меткие лучники, носящие желтые накидки. Их стрелы перед боем благословляются священниками света.",
        visual: "Isometric fantasy unit, archer in leather armor with a bright yellow tabard, longbow in hands, quiver on back, hood with sun embroidery, stylized as a 2D game asset, sharp outlines, warm colors."
    },
    {
        id: "sun_empire_guard",
        name: "Стражник Священной Империи",
        class: "warrior",
        level: 4,
        description: "Профессиональный пехотинец в тяжелых латах с гербом Краунсберга. Держат строй так же крепко, как их предки.",
        visual: "Isometric fantasy unit, heavy infantry in full plate armor, silver steel with gold trim, large kite shield with a sun emblem, one-handed mace, closed visored helmet, 3D render style game icon."
    },
    {
        id: "sun_empire_young_knight",
        name: "Рыцарь Священной Империи",
        class: "knight",
        level: 4,
        description: "Молодой дворянин на породистом жеребце. Его броня еще не знала глубоких вмятин, а копье жаждет первого турнира или боя за Императора.",
        visual: "Isometric fantasy unit, knight on a white horse, polished plate armor, yellow plumes on helmet, holding a long lance with a sun pennant, knight's barding on horse, bright cinematic lighting, classic RTS style."
    },
    {
        id: "sun_empire_assassin",
        name: "Тень Короны",
        class: "assassin",
        level: 5,
        description: "Тайные агенты герцогства. Охотятся на еретиков и шпионов в узких улочках столицы.",
        visual: "Isometric fantasy unit, rogue in dark grey and yellow hooded leather armor, dual daggers, masked face, lean build, dynamic pose, stylized game asset, subtle glow from daggers."
    },
    {
        id: "sun_empire_priest",
        name: "Священник Цекрви Света",
        class: "priest",
        level: 6,
        description: "Носитель воли Императора. Исцеляет раненых теплом веры и ослепляет врагов вспышками света.",
        visual: "Isometric fantasy unit, priest in long white and gold robes, holding a sun-shaped staff, bald head with a golden circlet, glowing palms, bright ethereal lighting, classic RPG style."
    },
    {
        id: "sun_empire_mage",
        name: "Боевой Маг Священной Империи",
        class: "mage",
        level: 6,
        description: "Выпускник академии Гильдии Магов Краунсберга. Управляет энергией плазмы и фокусирует солнечные лучи в смертоносные столпы огня.",
        visual: "Isometric fantasy unit, battle mage, yellow silk robes with metal spaulders, levitating glowing sun sphere between hands, intense yellow magical aura, high quality game sprite style."
    },
    {
        id: "sun_paladin",
        name: "Паладин Церкви Света",
        class: "paladin",
        level: 8,
        description: "Элита Империи. Рыцарь в ослепительно белых доспехах, чей клинок горит священным пламенем.",
        visual: "Isometric fantasy unit, elite paladin, massive white and gold plate armor, giant two-handed claymore glowing with fire, cape blowing in the wind, heroic pose, polished metal texture, game character asset."
    },
    {
        id: "sun_empire_veteran_knight",
        name: "Рыцарь-ветеран",
        class: "knight",
        level: 8,
        description: "Стальной кулак Империи. Ветеран на бронированном дестриэ, способный проломить любой строй. Его вера так же непоколебима, как и его конь.",
        visual: "Isometric fantasy unit, veteran knight on a heavy armored warhorse, scarred dark steel armor, massive morningstar in hand, yellow tattered cloak, horse covered in full plate barding with sun engravings, dramatic shadows."
    },
    {
        id: "crownsberg_guard",
        name: "Городской стражник Крауснберга",
        class: "warrior",
        level: 8,
        description: "Мастер позиционной войны. Устанавливает тяжелый ростовой щит легиона, из-за которого ведет прицельный огонь, пробивая даже рыцарские доспехи.",
        visual: "Isometric fantasy unit, crossbowman kneeling behind a large roman shield decorated with a golden sun, heavy mechanical crossbow, iron breastplate, kettle hat, focused aiming, clean black outlines, game asset style."
    },
    {
        id: "crownsberg_archmage",
        name: "Архимаг Краунсберга",
        class: "mage",
        level: 10,
        description: "Архимаг Гильдии Магов Империи. Управляет энергией плазмы и фокусирует солнечные лучи в смертоносные столпы огня.",
        visual: "Isometric fantasy unit, battle mage, yellow silk robes with metal spaulders, levitating glowing sun sphere between hands, intense yellow magical aura, high quality game sprite style."
    },


    {
        id: "delys_couturier",
        name: "Кутюрье Де Лис",
        class: "priest",
        level: 5,
        description: "Мастера боевой эстетики. Они не только латают раны, но и накладывают чары красоты на доспехи союзников, внушая врагам трепет перед истинным изяществом.",
        visual: "Isometric fantasy unit, elegant noblewoman in a high-fashion fantasy gown, silk and lace battle-dress, holding a glowing needle and shimmering thread of light, aura of rose petals, floating ribbons, bright vibrant colors, clean black outlines, stylized game sprite."
    },
    {
        id: "delys_drummer",
        name: "Барабанщик Де Лис",
        class: "bard",
        level: 3,
        description: "Душа полка. В нарядном мундире наполеоновской эпохи, он задает ритм наступления, превращая кровавую бойню в торжественный парад.",
        visual: "Isometric fantasy unit, soldier in a lavish Napoleonic-style uniform, blue and gold jacket with epaulettes, tall shako hat with a white feather, carrying a large ceremonial drum with lily symbols, upbeat marching pose, bright daylight, clean black outlines, classic RTS style."
    },
    {
        id: "delys_cavalier",
        name: "Шевалье Лилии",
        class: "knight",
        level: 7,
        description: "Конный рыцарь Флорелии. Его доспехи украшены гравировкой в виде лоз, а конь несется так легко, словно не касается земли. Вооружен длинной боевой рапирой.",
        visual: "Isometric fantasy unit, graceful knight on a slender white horse, silver plate armor with floral engravings, long thin rapier-lance, horse covered in silk barding with lily patterns, flowing cape, bright cinematic lighting, high-quality 2D game asset."
    },
    {
        id: "delys_crossbowman",
        name: "Арбалетчик Де Лис",
        class: "archer",
        level: 8,
        description: "Элитный снайпер Флорелии. Высокая, грациозная воительница с тяжелым ростовым арбалетом. Ее выстрелы бьют без промаха, а движения напоминают смертельный танец.",
        visual: "Isometric fantasy unit, slender female sniper, inspired by Drow Ranger aesthetic, long flowing cloak with lily embroidery, ornate heavy mechanical ballista-style crossbow, leather and silver filigree armor, hooded with a silver circlet, elegant aiming pose, clean black outlines, high-quality 2D game asset style."
    },
    {
        id: "delys_duelist",
        name: "Дуэлянт Лилии",
        class: "assassin",
        level: 10,
        description: "Легендарный мастер клинка, чье искусство фехтования превращено в чистую магию движения. Он не носит тяжелых лат, полагаясь на безупречный ритм и смертоносную точность своей рапиры. Говорят, он может разрубить летящую стрелу и нанести десять ударов в сердце прежде, чем тело врага коснется земли.",
        visual: "Isometric fantasy unit, legendary male fencer, elegant high-collared blue and silver coat, slim leather trousers, ornate silver rapier and a small parrying dagger, long flowing white cape with gold embroidery, cocked hat with a large feather, graceful en garde pose, blurring effect around the blade, high quality 2D game asset, vibrant colors, clean black outlines."
    },


    {
        id: "viren_flagellant",
        name: "Флагелянт Ви'Рен",
        class: "priest",
        level: 4,
        description: "Монах-фанатик, который несет свет Эммы через самоистязание. Его молитвы звучат под свист плетей, а аура боли исцеляет союзников и повергает врагов в ужас.",
        visual: "Isometric fantasy unit, grim priest in tattered grey robes and leather harness, bare chest covered in scars, holding a spiked flail in one hand and a holy book in the other, blindfolded, aura of dark red light, gothic atmosphere, clean black outlines, game asset style."
    },
    {
        id: "viren_black_knight",
        name: "Чёрный Рыцарь Ви'Рен",
        class: "warrior",
        level: 5,
        description: "Тяжелая пехота из бывших каторжан. Закованные в грубое, непробиваемое железо шахт, они вооружены огромными горняцкими молотами. У них нет щитов — только жажда раздавить врага прежде, чем пасть самим.",
        visual: "Isometric fantasy unit, hulking warrior in dark rusted plate armor, oversized mining warhammer, glowing red eyes behind a barred visor, soot-covered textures, heavy stomping pose, classic RTS isometric view, high detail."
    },
    {
        id: "viren_emma_priest",
        name: "Кровавый Жрец Эммы",
        class: "mage",
        level: 7,
        description: "Верховный служитель культа Ангела Света и Крови. Он верит, что истинное просвещение приходит через страдание. В бою он вскрывает вены на своих ладонях, превращая струю крови в пылающие плети или взрывную плазму, которая выжигает еретиков и чудесным образом закрывает раны верных слуг Империи.",
        visual: "Isometric fantasy unit, sinister high priest in stiff blood-red and black velvet robes, ornate iron collar, floating orbs of liquid blood rotating around him, a staff topped with a large ruby heart-shaped crystal, hands glowing with dark red magical energy, droplets of light falling, gothic game asset style, sharp shadows, clean black outlines."
    },
    {
        id: "viren_thorn_knight",
        name: "Рыцарь Тернового Венца",
        class: "paladin",
        level: 10,
        description: "Высшая каста ви'ренского рыцарства. Они приносят клятву вечного страдания: их доспехи изнутри утыканы шипами, которые впиваются в тело при каждом движении. Эта боль питает их магию света, превращая кровь в сияющее карающее пламя. На поле боя они неудержимы, ибо смерть для них — желанное избавление.",
        visual: "Isometric fantasy unit, elite knight on a massive black warhorse, black obsidian plate armor wrapped in glowing red thorny vines, a literal crown of thorns on the helmet, tattered crimson cape, massive jagged greatsword glowing with holy blood-red light, horse in spiked plate barding, dark moody lighting, high-quality 3D render style, sharp outlines."
    },

    {
        id: "grimwood_ranger",
        name: "Рейнджер Темнолесья",
        class: "archer",
        level: 4,
        description: "Бесшумные охотники Темнолесья. Их стрелы оперены крыльями ночных птиц и смазаны ядом мертвой лозы. Они видят в кромешной тьме так же ясно, как человек — солнечным днем.",
        visual: "Isometric fantasy unit, slender dark elf archer, hooded cloak made of tattered dark green fabric and raven feathers, obsidian recurve bow, leather armor with thorn patterns, glowing emerald eyes, misty forest background, clean black outlines, game asset style."
    },
    {
        id: "grimwood_knight",
        name: "Рыцарь Темнолесья",
        class: "warrior",
        level: 6,
        description: "Пешие латники в доспехах из «железного дерева» и заговоренной стали. Их щиты украшены гербами павших шляхетских родов, а мечи длинны и тонки, как иглы терновника.",
        visual: "Isometric fantasy unit, dark elf knight in ornate black and silver plate armor, dark green surcoat with a withered tree emblem, long slender longsword, heavy kite shield with thorn engravings, stoic pose, moody forest lighting, sharp 2D vector style."
    },
    {
        id: "grimwood_slayer",
        name: "Убийца Гримвуда",
        class: "assassin",
        level: 7,
        description: "Мастера скрытности, способные буквально растворяться в тенях деревьев. Они наносят удар из ниоткуда, используя парные клинки, выкованные из метеоритного железа.",
        visual: "Isometric fantasy unit, elite elven assassin, crouched pose, sleek black leather outfit with silver buckles, dual serrated daggers dripping with green ichor, face masked with a skull-like silk veil, subtle shadow aura, high-quality game sprite."
    },
    {
        id: "grimwood_witch",
        name: "Ведьма Темнолесья",
        class: "mage",
        level: 8,
        description: "Хранительницы запретных знаний. Они управляют ростом ядовитых грибов и шепотом мертвых корней. Говорят, каждая ведьма хранит свое сердце в старом пне глубоко в чаще.",
        visual: "Isometric fantasy unit, beautiful dark forest witch, long flowing dark emerald dress, crown of black branches, wooden staff with a glowing green crystal, swirling autumn leaves and swamp gas around her, eerie magical glow, detailed 2D illustration style."
    },
    {
        id: "grimwood_hydra_order",
        name: "Орден Гидры",
        class: "assassin",
        level: 9,
        description: "Высшая элита Гримвуда. Они носят доспехи из чешуи змей-мутантов, которые меняют оттенок в зависимости от освещения. Орден Гидры специализируется на затяжных боях: их тактика — нанести множество мелких кровоточащих ран, прежде чем нанести решающий удар. Снаряжены короткими эльфийскими клинками на тонких черных цепях и скрытыми наручными самострелами.",
        visual: "Isometric fantasy unit, elite dark elf hybrid assassin-ranger, sleek dark emerald dragon-scale leather armor, hooded tattered cloak, holding dual curved silver daggers attached to fine black chains, mechanical wrist-mounted crossbows, cold professional pose, sharp facial features, isolated on plain white background, high-quality 2D game asset style, clean black outlines."
    },
    {
        id: "grimwood_grove_guardian",
        name: "Хранитель Рощи",
        class: "paladin",
        level: 10,
        description: "Элита Темнолесья в массивных обсидиановых доспехах. Их задача — «прополка» мира от тех, кто не вписывается в замысел Темной Природы. Их огромные косы выкованы из упавших звезд и закалены в соке древних ядовитых древ.",
        visual: "Isometric fantasy unit, massive elite knight in heavy black plate armor, helmet adorned with gnarled wooden horns, wielding a giant two-handed scythe with a dull silver blade and glowing green runes, tattered velvet cape of deep forest green, dark magical aura, high detail isometric 3D render."
    },


    {
        id: "richter_rider",
        name: "Наемный рейтар",
        class: "warrior",
        level: 4,
        description: "Профессиональный наемник на крепком коне. Носит кирасу и открытый шлем. Вооружен тяжелым палашом и парой пистолей. Надежен, пока звенит монета.",
        visual: "Isometric fantasy unit, mercenary cavalryman on a brown horse, iron breastplate, open lobster-tail helmet, dark blue scarf, holding a heavy broadsword, horse with simple leather harness, isolated on plain white background, classic RTS game asset, clean black outlines."
    },
    {
        id: "richter_knight",
        name: "Рыцарь Рихтера",
        class: "paladin",
        level: 7,
        description: "Костяк армии герцогства. Закованный в вороненую сталь всадник на бронированном коне. Его натиск неостановим, а дисциплина доведена до автоматизма.",
        visual: "Isometric fantasy unit, heavy knight on a black warhorse, full plate armor in dark blued steel with gold trim, dark blue caparison with gold embroidery, long heavy lance, closed visored helmet, isolated on plain white background, high-quality 2D game asset, sharp outlines."
    },
    {
        id: "richter_iron_guard",
        name: "Железная Гвардия Рихтера",
        class: "paladin",
        level: 10,
        description: "Живая стена из стали и воли. Самая тяжелая конница в мире. И всадник, и конь полностью скрыты под монолитными пластинами брони. Один их вид заставляет врага бросать оружие.",
        visual: "Isometric fantasy unit, ultra-heavy elite cavalry, massive knight in monolithic black and gold plate armor, giant warhorse covered in full steel plate barding, massive morningstar, dark blue velvet cloak, heroic unstoppable pose, isolated on plain white background, detailed 3D render style, clean black outlines."
    },


    {
        id: "kelebrion_militia",
        name: "Ополченец Келебриона",
        class: "warrior",
        level: 3,
        description: "В отличие от обычных рекрутов, эти воины снабжены качественными кольчугами и щитами, освященными в Великом Соборе. Их вера непоколебима, а подготовка превосходит многих профессиональных солдат других герцогств.",
        visual: "Isometric fantasy unit, elite militia soldier, bright white gambeson with golden sun embroidery, polished silver chainmail, kettle hat with gold trim, large heater shield with a radiant sun, sharp spear, noble posture, isolated on plain white background, clean black outlines, vibrant colors."
    },
    {
        id: "kelebrion_knight",
        name: "Рыцарь Келебриона",
        class: "knight",
        level: 5,
        description: "В отличие от обычных рекрутов, эти воины снабжены качественными кольчугами и щитами, освященными в Великом Соборе. Их вера непоколебима, а подготовка превосходит многих профессиональных солдат других герцогств.",
        visual: "Isometric fantasy unit, elite militia soldier, bright white gambeson with golden sun embroidery, polished silver chainmail, kettle hat with gold trim, large heater shield with a radiant sun, sharp spear, noble posture, isolated on plain white background, clean black outlines, vibrant colors."
    },
    {
        id: "kelebrion_high_priest",
        name: "Жрец Рассвета",
        class: "priest",
        level: 8,
        description: "Истинные проводники божественного света. Они не просто лечат, они превращают поле боя в слепящий чертог бога. Их молитвы способны испепелять нежить на расстоянии и даровать союзникам неуязвимость.",
        visual: "Isometric fantasy unit, high priest in lavish white and gold silk robes, golden sun-disk halo behind the head, holding a staff topped with a burning gemstone, glowing hands, serene and powerful expression, isolated on plain white background, magical light effects, high-quality 2D game asset."
    },
    {
        id: "kelebrion_paladin",
        name: "Паладин Рассвета",
        class: "paladin",
        level: 9,
        description: "Совершенные рыцари света. Их доспехи сделаны из сплава золота и небесного железа. Каждый удар их меча сопровождается вспышкой, а присутствие на поле боя внушает врагам священный ужас.",
        visual: "Isometric fantasy unit, grand paladin in ornate gold and white plate armor, blue velvet cape, majestic winged helmet, holding a flaming longsword, shield with sunbeams, heroic standing pose, isolated on plain white background, polished metal textures, sharp outlines."
    },
    {
        id: "kelebrion_cataphract",
        name: "Солнечный Катафракт",
        class: "archer", // Класс лучник, но по факту тяжелая конница
        level: 10,
        description: "Ультимативная сила Келебриона. Тяжелая конница, где и всадник, и конь закованы в ламеллярную золотую броню. В отличие от рыцарей Рихтера, они несут смерть издалека, используя мощные композитные луки, стреляющие магическими лучами.",
        visual: "Isometric fantasy unit, elite cataphract on a golden-armored horse, rider in heavy gold lamellar armor, holding a glowing composite bow, quiver with arrows made of light, horse covered in intricate golden scales, majestic charging pose, isolated on plain white background, detailed 3D render style, clean black outlines."
    },

    {
        id: "danheim_berserker",
        name: "Берсерк Лукаша",
        class: "warrior",
        level: 4,
        description: "Воины, испившие ритуального отвара. Они не носят брони, веря, что Лукаш заберет их только тогда, когда придет время. В бою впадают в транс, игнорируя раны и круша черепа парными топорами.",
        visual: "Isometric fantasy unit, half-naked viking berserker, blue war paint, bear fur pelt on shoulders, dual bearded axes, wild bearded face, muscular build, blood-splattered leather trousers, isolated on plain white background, sharp 2D game asset style."
    },
    {
        id: "danheim_marine",
        name: "Морская пехота Данхейма",
        class: "warrior",
        level: 5,
        description: "Костяк драккаров. Профессиональные воины в кольчугах и кожаных ламеллярах. Их круглые щиты украшены рунами защиты от штормов.",
        visual: "Isometric fantasy unit, viking marine, chainmail armor, iron nasal helmet, large round wooden shield with blue and grey patterns, heavy battle axe, fur-lined boots, solid standing pose, isolated on plain white background, clean black outlines."
    },
    {
        id: "danheim_lukash_priest",
        name: "Жрец Лукаша",
        class: "priest",
        level: 6,
        description: "Служители бога смерти. Они не шепчут молитвы, а выкрикивают проклятия. Способны поднимать павших союзников в виде призрачных теней и высасывать тепло из сердец врагов.",
        visual: "Isometric fantasy unit, grim viking priest, dark grey robes, bone necklaces, staff topped with a raven skull, pale skin, eerie gray magical glow from hands, isolated on plain white background, moody 2D vector style."
    },
    {
        id: "danheim_ulfhednar",
        name: "Вульфхеднар",
        class: "assassin",
        level: 7,
        description: "Охотники, чья душа слилась с духом волка. Они быстрее любого человека и способны учуять страх жертвы за версту. Сражаются когтеобразными кинжалами.",
        visual: "Isometric fantasy unit, wolf-warrior, wearing a complete wolf skin with the head as a hood, leather armor with iron studs, jagged bone daggers, predatory crouching pose, glowing yellow eyes, isolated on plain white background, high-quality game sprite."
    },
    // {
    //     id: "danheim_shieldmaiden",
    //     name: "Дева Щита",
    //     class: "paladin",
    //     level: 8,
    //     description: "Элитные воительницы, давшие обет защищать границы Данхейма. Их щиты практически непробиваемы, а мастерство владения мечом отточено веками набегов.",
    //     visual: "Isometric fantasy unit, beautiful but fierce female viking warrior, ornate silver engraved plate and mail armor, long blonde braids, large reinforced shield with a raven emblem, shining steel sword, heroic stance, isolated on plain white background, detailed 3D render style."
    // },
    {
        id: "danheim_bride_of_lukash",
        name: "Невеста Лукаша",
        class: "paladin",
        level: 8,
        description: "Элитный орден воительниц, принесших обет богу смерти. Они считаются его земными женами. Их бледная кожа исписана синими рунами, а доспехи украшены фатой из тончайшей серебряной кольчуги. В бою они впадают в ледяное спокойствие, нанося удары с потусторонней точностью. Считается, что поцелуй такой девы перед боем — гарантия места в чертогах Лукаша.",
        visual: "Isometric fantasy unit, ethereal female viking warrior, pale skin with blue runic tattoos, intricate silver plate armor with a translucent chainmail veil, long white hair, large round mirror-shield, slender glowing longsword, serene but deadly expression, isolated on plain white background, high-quality 2D game asset, sharp outlines."
    },
    {
        id: "danheim_huscarl",
        name: "Хускарл Великого Зала",
        class: "warrior",
        level: 9,
        description: "Тяжелая элита Данхейма. Великаны в массивных чешуйчатых доспехах, вооруженные огромными двуручными топорами-бродэксами. Один взмах такого топора разрубает всадника вместе с конем.",
        visual: "Isometric fantasy unit, massive heavy viking huscarl, full steel scale armor, fur cloak, giant two-handed dane axe, heavy iron helmet with crow wings, immovable object pose, isolated on plain white background, clean black outlines."
    },
    {
        id: "danheim_rider_of_sorrow",
        name: "Всадник Горя",
        class: "paladin",
        level: 10,
        description: "Супер-элита, рыцари смерти северных морей. Они скачут на призрачных конях, чьи копыта не оставляют следов. Их доспехи выкованы из льда и проклятого серебра, а оружие несет холод могилы.",
        visual: "Isometric fantasy unit, skeletal viking knight on a ghostly undead horse, ethereal green flames, frozen black steel armor, massive tattered cape, giant ice-covered flail, horse with tattered barding and glowing eyes, isolated on plain white background, epic cinematic lighting, 3D game asset style."
    },


    {
        id: "svyatoslaviya_militia",
        name: "Славянское ополчение",
        class: "warrior",
        level: 2,
        description: "Простые общинники в стеганых кафтанах и кожаных шлемах. Вооружены рогатинами и топорами. Сильны числом и верой в родную землю.",
        visual: "Isometric fantasy unit, Slavic peasant soldier, thick padded white kaftan, leather cap with fur, holding a long spear (rogatina) and a small wooden axe, simple wooden shield, isolated on plain white background, clean black outlines, classic RTS style."
    },
    {
        id: "svyatoslaviya_streltsy",
        name: "Государевы стрельцы",
        class: "archer",
        level: 4,
        description: "Регулярные стрелки в ярких кафтанах. Мастера стрельбы из композитных луков, способные засыпать врага градом стрел с золотым оперением.",
        visual: "Isometric fantasy unit, Slavic archer in a long bright red kaftan with gold buttons, traditional tall hat (murmolka) with fur, heavy composite bow, large quiver, ornate dagger on belt, focused pose, isolated on plain white background, vibrant colors, sharp outlines."
    },
    {
        id: "svyatoslaviya_fury_maidens",
        name: "Ярые девы",
        class: "assassin",
        level: 5,
        description: "Ритуальные воительницы, вышедшие из древних лесов. Они сражаются практически нагими, покрытые лишь сакральной росписью и оберегами. Их дикий танец и безумные крики ввергают врагов в ступор, деморализуя целые полки.",
        visual: "Isometric fantasy unit, fierce Slavic warrior woman, minimal tribal leather loincloth, body covered in intricate blue woad tattoos and protective runes, long braided hair, dual bronze daggers, wild screaming expression, bone necklaces, isolated on plain white background, high-quality 2D game asset."
    },
    {
        id: "svyatoslaviya_druzhina", //TODO
        name: "Княжеский дружинник",
        class: "warrior",
        level: 6,
        description: "Тяжелая пехота в кольчугах и ламеллярных доспехах. Профессионалы, составляющие костяк любой армии Святославии. Непоколебимы в обороне.",
        visual: "Isometric fantasy unit, heavy Slavic infantryman, silver lamellar armor over mail, conical steel helmet with aventail, large teardrop shield with a red sun, heavy broadsword, isolated on plain white background, detailed 3D render style, clean outlines."
    },
    {
        id: "svyatoslaviya_bogatyr", //TODO
        name: "Богатырь-всадник",
        class: "paladin",
        level: 8,
        description: "Тяжелая конница Святославии. Могучие воины на сильных конях, способные прорвать любой строй своим сокрушительным чарджем.",
        visual: "Isometric fantasy unit, heroic Slavic knight on a powerful brown horse, mirror-polished scale armor, bright red cloak, heavy mace and heater shield, horse with leather barding and fur, heroic charging pose, isolated on plain white background, vibrant colors."
    },
    {
        id: "svyatoslaviya_vityaz", //TODO
        name: "Витязь Золотого Пояса",
        class: "paladin",
        level: 9,
        description: "Элита богатырства. Те, чьи имена воспевают гусляры. Их доспехи покрыты золотой гравировкой, а мастерство боя граничит с божественным вмешательством.",
        visual: "Isometric fantasy unit, legendary Slavic knight on a massive white warhorse, ornate golden plate and scale armor, flowing white fur cape, giant glowing longsword, horse in full golden barding with sun emblems, isolated on plain white background, epic lighting, sharp outlines."
    },
    {
        id: "svyatoslaviya_winged_hussar", //TODO
        name: "Крылатый пересвет",
        class: "paladin",
        level: 10,
        description: "Ультимативная мощь Святославии. Тяжелейшая конница, за спиной которой закреплены каркасы с перьями хищных птиц. Свист ветра в их крыльях наводит ужас на лошадей врага, а их пики пронзают любую броню.",
        visual: "Isometric fantasy unit, ultra-heavy Slavic winged cavalry, massive steel plate armor with golden trim, two large wooden frames with eagle feathers attached to the back, holding a very long lance with a red and white pennant, heavy warhorse in steel barding, majestic charging pose, isolated on plain white background, detailed game asset."
    },


    {
        id: "esteban_blood_drago_richter",
        name: "Рыцарь Кровавого Дракона Рихтер",
        class: "paladin",
        level: 10,
        description: "Бывший мастер конного боя Рихтера, обращенный в вампира. Его конь — неживой монстр в чешуйчатых латах, а сам рыцарь стал живым тараном, чья инерция подпитывается магией крови.",
        visual: "Isometric fantasy unit, vampire knight on a massive undead warhorse, monolithic black plate armor with crimson dragon engravings, glowing red eyes, heavy barding with dragon scale patterns, dark red velvet cloak, holding a heavy lance, isolated on plain white background, 3D render style, sharp outlines."
    },
    {
        id: "esteban_blood_drago_crownsberg",
        name: "Рыцарь Кровавого Дракона Краунсберг",
        class: "paladin",
        level: 8,
        description: "Ветеран Империи, сменивший веру в Солнце на служение Дракону. Сохранил немецкую строгость, но его доспехи теперь сочатся темной энергией.",
        visual: "Isometric fantasy unit, vampire veteran knight on a black horse, ornate dark steel plate armor, yellow accents replaced by glowing red light, tattered crimson surcoat, holding a jagged longsword, isolated on plain white background, clean black outlines, gothic game asset."
    },
    {
        id: "esteban_blood_drago_kelebrion",
        name: "Рыцарь Кровавого Дракона Келебрион",
        class: "archer",
        level: 10,
        description: "Падший катафракт. Вместо солнечных стрел он выпускает сгустки застывшей крови, которые разрывают плоть врага изнутри.",
        visual: "Isometric fantasy unit, vampire cataphract on an armored horse, red gold lamellar armor, holding a demonic composite bow made of bone and sinew, quiver with glowing red arrows, isolated on plain white background, high-quality 2D game asset."
    },
    {
        id: "esteban_blood_drago_delys",
        name: "Рыцарь Кровавого Дракона Де Лис",
        class: "assassin",
        level: 9,
        description: "Вампир-дуэлянт на грациозном черном жеребце. Его рапира тонка как игла и жаждет крови. Двигается так быстро, что кажется размытым пятном.",
        visual: "Isometric fantasy unit, elegant vampire fencer on a slender black horse, silver and crimson duelist coat over light plate, long thin rapier glowing with red ichor, flamboyant hat with a bat-wing feather, isolated on plain white background, sharp outlines."
    },
    {
        id: "esteban_blood_drago_grimwood",
        name: "Рыцарь Кровавого Дракона Гримвуд",
        class: "warrior",
        level: 9,
        description: "Бывший Хранитель Рощи, чья коса теперь служит Сангвиниусу. Его броня оплетена мертвыми лозами, а конь бесшумно ступает по ковру из костей.",
        visual: "Isometric fantasy unit, dark elf vampire knight on a skeletal horse, black obsidian armor with thorny red vines, wielding a massive scythe with a blood-stained blade, tattered emerald-and-red cloak, isolated on plain white background, detailed 3D render."
    },
    {
        id: "esteban_blood_drago_samurai",
        name: "Мечник Кровавого Тумана Самурай",
        class: "assassin",
        level: 9,
        description: "Вампир-самурай, чье лезвие поглощает свет. Вокруг него всегда клубится красный туман, скрывающий момент удара.",
        visual: "Isometric fantasy unit, vampire samurai on a dark horse, traditional samurai armor in black and scarlet, demonic oni mask, long katana dripping with blood, swirling red mist at the horse's hooves, isolated on plain white background, stylized game sprite."
    },
    {
        id: "esteban_blood_drago_svyatoslaviya",
        name: "Крылатый Кровавый Всадник Святославия",
        class: "paladin",
        level: 9,
        description: "Тяжелый рыцарь с крыльями за спиной, сделанными из костей и перепонок летучих мышей. Его пика пронзает сердца, а свист крыльев лишает рассудка.",
        visual: "Isometric fantasy unit, heavy vampire winged hussar, steel plate armor with ruby gemstones, large bat-like wings attached to the back, long lance with a crimson pennant, horse in full plate barding, isolated on plain white background, epic cinematic lighting."
    },
    {
        id: "esteban_blood_cardinal",
        name: "Кардинал Кровавой Луны",
        class: "priest",
        level: 9,
        description: "Высший духовный чин Эстебана. Управляет приливами крови в телах смертных. Его молитвы к Сангвиниусу могут мгновенно восстановить растерзанную армию вампиров.",
        visual: "Isometric fantasy unit, high vampire cardinal, lavish cardinal robes in deep scarlet and gold, tall miter with a blood-drop gem, staff with a beating dragon heart inside a crystal, floating blood orbs, isolated on plain white background, majestic and sinister, sharp outlines."
    },


    {
        id: "dwarf_miner",
        name: "Дварф Рудокоп",
        class: "warrior",
        level: 1,
        description: "Работяга из глубоких шахт. Закован в грубую кожу и стальные пластины. Его кирка одинаково хорошо дробит и гранит, и черепа врагов.",
        visual: "Isometric fantasy unit, dwarf miner, heavy leather apron over chainmail, iron pot helmet with a candle holder, large heavy pickaxe, soot-covered face, sturdy pose, isolated on plain white background, clean black outlines, game asset style."
    },
    {
        id: "dwarf_smith",
        name: "Дварф Кузнец",
        class: "warrior",
        level: 3,
        description: "Мастер металла. Одет в тяжелый ламинарный доспех. В бою использует кузнечный молот, которым привык ковать легенды.",
        visual: "Isometric fantasy unit, dwarf blacksmith, thick bronze and iron plate armor, leather tool belt, massive glowing forging hammer, glowing red embers on his apron, braided beard with metal rings, isolated on plain white background, sharp outlines."
    },
    {
        id: "dwarf_infantry",
        name: "Дварф Воин",
        class: "warrior",
        level: 4,
        description: "Регулярная пехота. Квадратный щит и короткий широкий топор. Его невозможно сдвинуть с места, когда он встает в строй.",
        visual: "Isometric fantasy unit, dwarf soldier, full steel plate armor, large rectangular iron shield with runic engravings, short broadsword, heavy boots, stoic pose, isolated on plain white background, classic RTS style."
    },
    {
        id: "dwarf_gunner",
        name: "Дварф Стрелок",
        class: "archer",
        level: 4,
        description: "Мастер пороха. Вооружен тяжелым мушкетом собственной сборки. Запах серы для него слаще любого эля.",
        visual: "Isometric fantasy unit, dwarf musketeer, reinforced leather and iron armor, heavy ornate flintlock musket, bandolier with powder flasks, smoking barrel, iron goggles on forehead, isolated on plain white background, vibrant colors."
    },
    {
        id: "dwarf_berserker",
        name: "Дварф Берсерк",
        class: "assassin",
        level: 5,
        description: "Безумец в тяжелых наручах и поножах, но с голым торсом, покрытым шрамами и татуировками. Сражается парными топорами в вихре ярости.",
        visual: "Isometric fantasy unit, dwarf berserker, heavy spiked iron greaves and gauntlets, bare muscular chest with blue tattoos, mohawk hair, dual notched battle axes, bloodshot eyes, isolated on plain white background, aggressive pose."
    },
    {
        id: "dwarf_mountain_priest",
        name: "Дварф Жрец Горы",
        class: "priest", // Элита
        level: 6,
        description: "Служитель земных недр. Его доспехи украшены необработанными кристаллами. Призывает мощь камня на помощь братьям.",
        visual: "Isometric fantasy unit, dwarf priest, stone-textured grey plate armor, staff topped with a large glowing emerald, crown of raw quartz, eyes glowing with earthen light, isolated on plain white background, magical aura."
    },
    {
        id: "dwarf_moonshiner",
        name: "Дварф Самогонщик",
        class: "priest",
        level: 5,
        description: "Боевой алхимик-пивовар. Разносит бочонки с 'живительной влагой', которая заставляет дварфов игнорировать любую боль.",
        visual: "Isometric fantasy unit, dwarf alchemist, leather gear with many small kegs and mugs, holding a large foamy tankard and a copper pipe, messy beard, red nose, jolly but dangerous, isolated on plain white background."
    },
    {
        id: "dwarf_singer",
        name: "Дварф Певец",
        class: "mage",
        level: 5,
        description: "Мастер матерных баллад и скабрезных песен. Его голос настолько груб и полон перегара, что враги теряют волю к жизни от шока и стыда.",
        visual: "Isometric fantasy unit, dwarf bard, ornate mail armor, holding a lute made of iron and wood, shouting expression, tattered green cloak, axe on back, isolated on plain white background, clean black outlines."
    },
    {
        id: "dwarf_engineer",
        name: "Дварф Инженер",
        class: "mage",
        level: 7,
        description: "Гений механики. Бронирован по самые уши, таскает с собой кучу инструментов и взрывчатки. Может починить замок или взорвать гору.",
        visual: "Isometric fantasy unit, dwarf engineer, complex plate armor with gears and pipes, large wrench and bags of bombs, mechanical backpack with a small steam chimney, goggles, isolated on plain white background."
    },
    {
        id: "dwarf_rune_lord",
        name: "Дварф Рунный Жрец",
        class: "priest", // Элита
        level: 9,
        description: "Хранитель древних слов силы. Каждая пластина его мифрилового доспеха — это отдельное заклинание. Его молот бьет молниями рунного света.",
        visual: "Isometric fantasy unit, elite dwarf rune lord, glowing blue silver armor covered in glowing ancient runes, massive hammer crackling with electricity, aura of floating Norse symbols, isolated on plain white background, epic lighting."
    },
    {
        id: "dwarf_butcher",
        name: "Дварф Мудрый Мясник",
        class: "warrior", // Элита
        level: 9,
        description: "Элитный снабженец и воин. В совершенстве знает анатомию — как животных, так и врагов. Вооружен огромными тесаками.",
        visual: "Isometric fantasy unit, large dwarf butcher, blood-stained heavy plate armor, spiked apron, holding two giant meat cleavers, necklace of bones and sausages, grim expression, isolated on plain white background."
    },
    {
        id: "dwarf_defender",
        name: "Дварф Защитник",
        class: "paladin", // Элита
        level: 9,
        description: "Живой бастион. Закован в сверхтяжелую броню, за которой не видно самого дварфа. Его щит — это передвижная стена.",
        visual: "Isometric fantasy unit, ultra-heavy dwarf guardian, massive fortress-like plate armor, giant tower shield with a mountain emblem, heavy mace, immovable stance, isolated on plain white background, sharp outlines."
    },
    {
        id: "dwarf_champion",
        name: "Дварф Чемпион",
        class: "paladin", // Суперэлита
        level: 10,
        description: "Легенда подгорного царства. Закован в мифрил и золото. Его присутствие на поле боя делает армию дварфов буквально бессмертной.",
        visual: "Isometric fantasy unit, legendary dwarf hero, ornate golden and silver plate armor, magnificent winged helmet, massive two-handed axe glowing with white light, long white beard with diamonds, heroic pose, isolated on plain white background, 3D render style."
    },

    //TODO ========================================
    {
        id: "east_spearman",
        name: "Копейщик",
        class: "warrior",
        level: 1,
        description: "Рядовой солдат с бамбуковым или деревянным копьем.",
        visual: "Isometric fantasy unit, eastern soldier, simple lamellar leather chest piece, conical straw hat, holding a long spear, isolated on plain white background, clean black outlines."
    },
    {
        id: "east_swordsman",
        name: "Мечник",
        class: "warrior",
        level: 2,
        description: "Пехотинец, вооруженный базовым одноручным изогнутым клинком.",
        visual: "Isometric fantasy unit, eastern swordsman, reinforced fabric armor, iron helmet, holding a dao-style sword, isolated on plain white background, game asset style."
    },
    {
        id: "east_archer",
        name: "Лучник",
        class: "archer",
        level: 3,
        description: "Стрелок, использующий классический рекурсивный лук.",
        visual: "Isometric fantasy unit, eastern archer, light robes, traditional quiver on back, aiming a wooden bow, isolated on plain white background, vibrant colors."
    },


    {
        id: "nippon_samurai",
        name: "Самурай",
        class: "warrior",
        level: 4,
        description: "Благородный воин в лакированных доспехах.",
        visual: "Isometric fantasy unit, samurai in black lacquered plate armor, mempo mask, katana in hand, isolated on plain white background, sharp outlines."
    },
    {
        id: "nippon_shadow_priestess",
        name: "Жрица Тени",
        class: "priest",
        level: 5,
        description: "Служительница Бездны, плетущая заклинания из мрака.",
        visual: "Isometric fantasy unit, miko priestess in black and violet robes, holding a ritual paper fan, glowing dark energy, isolated on plain white background."
    },
    {
        id: "nippon_shadow_dancer",
        name: "Теневой танцор",
        class: "assassin",
        level: 6,
        description: "Смертоносный фехтовальщик, чей клинок не оставляет тени.",
        visual: "Isometric fantasy unit, assassin in sleek black silk, dual wakizashi, dynamic pose, violet flowing ribbons, isolated on plain white background."
    },
    {
        id: "nippon_kitsune_ally",
        name: "Кицунэ",
        class: "mage",
        level: 7,
        description: "Союзный дух-лиса с несколькими хвостами и магией огня.",
        visual: "Isometric fantasy unit, multi-tailed fox spirit, glowing blue and violet fur, magical orbs floating around, isolated on plain white background."
    },
    {
        id: "nippon_shadow_samurai",
        name: "Теневой Самурай",
        class: "warrior",
        level: 8,
        description: "Элитный гвардеец, наполовину состоящий из чистой тьмы.",
        visual: "Isometric fantasy unit, elite samurai, armor made of black smoke and steel, massive nodachi sword, isolated on plain white background."
    },
    {
        id: "nippon_abyss_dancer",
        name: "Танцующий с Бездной",
        class: "assassin",
        level: 9,
        description: "Мастер клинка, способный мгновенно перемещаться через тени.",
        visual: "Isometric fantasy unit, legendary dancer in tattered dark robes, ethereal glowing eyes, moving like a blur, isolated on plain white background."
    },
    {
        id: "nippon_abyss_guard",
        name: "Гвардия Бездны",
        class: "paladin",
        level: 10,
        description: "Суперэлита Императора. Монолитные воины в броне из обсидиана.",
        visual: "Isometric fantasy unit, heavy abyss guardian, full plate black armor with dragon motifs, naginata glowing with purple void light, isolated on plain white background."
    },


    {
        id: "chongu_monk",
        name: "Монах",
        class: "warrior",
        level: 4,
        description: "Мастер рукопашного боя и посоха.",
        visual: "Isometric fantasy unit, monk in simple yellow and green robes, wooden staff, calm pose, isolated on plain white background."
    },
    {
        id: "chongu_alchemist",
        name: "Алхимик",
        class: "priest",
        level: 5,
        description: "Использует эликсиры для поддержки союзников.",
        visual: "Isometric fantasy unit, alchemist carrying jade vials, smoking censers, silk robes with herbal patterns, isolated on plain white background."
    },
    {
        id: "chongu_engineer",
        name: "Инженер",
        class: "mage",
        level: 6,
        description: "Специалист по пороховым бомбам и ловушкам.",
        visual: "Isometric fantasy unit, engineer in reinforced leather, bag of jade-powder bombs, holding a fuse, iron goggles, isolated on plain white background."
    },
    {
        id: "chongu_cultivator",
        name: "Культиватор",
        class: "mage",
        level: 8,
        description: "Воин, развивающий внутреннюю энергию Ци для разрушительных атак.",
        visual: "Isometric fantasy unit, cultivator in flowing jade-colored silk, levitating slightly, glowing green aura, isolated on plain white background."
    },
    {
        id: "chongu_grand_cultivator",
        name: "Великий мастер-культиватор",
        class: "mage",
        level: 10,
        description: "Суперэлита. Человек, достигший божественного уровня через медитацию.",
        visual: "Isometric fantasy unit, ancient master, radiant emerald light, floating jade swords around him, isolated on plain white background."
    },

    {
        id: "koryo_scholar_warrior",
        name: "Воин-учёный",
        class: "mage",
        level: 4,
        description: "Сражается каллиграфией и магией свитков.",
        visual: "Isometric fantasy unit, scholar in traditional hanbok, oversized brush as a weapon, floating ink scrolls, isolated on plain white background."
    },
    {
        id: "koryo_merchant_guard",
        name: "Торговый караванщик",
        class: "warrior",
        level: 5,
        description: "Опытный наемник, защищающий богатства Корё.",
        visual: "Isometric fantasy unit, merchant warrior, heavy silk and iron mail, large curved blade, pouches of gold coins on belt, isolated on plain white background."
    },
    {
        id: "koryo_musician_skald",
        name: "Боевой музыкант",
        class: "priest",
        level: 6,
        description: "Играет на каягыме, вдохновляя войска и подавляя врагов звуковыми волнами.",
        visual: "Isometric fantasy unit, musician sitting or standing, playing a traditional zither, glowing sound ripples, blue and white robes, isolated on plain white background."
    },
    {
        id: "koryo_hwarang",
        name: "Хваран",
        class: "paladin",
        level: 8,
        description: "«Цветущий рыцарь». Элита Корё, сочетающая красоту, философию и мастерское владение луком и мечом.",
        visual: "Isometric fantasy unit, Hwarang warrior, beautiful ornate blue and white armor, floral patterns, holding a recurve bow and a slender blade, isolated on plain white background."
    },
    {
        id: "koryo_geomungo_master",
        name: "Мастер Геомунго",
        class: "mage",
        level: 10,
        description: "Суперэлита. Музыкант, чья мелодия способна изменять саму реальность.",
        visual: "Isometric fantasy unit, elder master playing a giant black lute, massive shockwaves of energy, traditional scholar hat, isolated on plain white background."
    },


    {
        id: "valencia_deckhand",
        name: "Матрос Валенсии",
        class: "warrior",
        level: 1,
        description: "Просоленный морем боец. Не носит брони, полагаясь на ловкость и старую добрую саблю. Смерти не боится, так как верит, что уже наполовину в могиле.",
        visual: "Isometric fantasy unit, pirate deckhand, open vest, loose striped trousers, bandana, holding a rusty cutlass, skull tattoos, tanned skin, cynical grin, isolated on plain white background, clean black outlines."
    },
    {
        id: "valencia_pistolero",
        name: "Пистолеро",
        class: "archer",
        level: 3,
        description: "Стрелок с парой магических пистолей. Его пули светятся призрачным светом и игнорируют физические преграды, неся холод самой смерти.",
        visual: "Isometric fantasy unit, mexican-style pirate, short embroidered jacket, wide sombrero with skull charms, dual ornate flintlock pistols glowing with blue magic, bandolier, isolated on plain white background, vibrant colors."
    },
    {
        id: "valencia_cavalier",
        name: "Морской кавалер",
        class: "warrior",
        level: 5,
        description: "Офицер пиратского флота. Носит трофейную испанскую кирасу поверх яркого пончо. В одной руке сабля, в другой — мушкет.",
        visual: "Isometric fantasy unit, pirate officer, steel conquistador breastplate over a colorful mexican poncho, wide hat, holding a saber and a smoking musket, defiant pose, isolated on plain white background, sharp outlines."
    },
    {
        id: "valencia_powder_witch",
        name: "Пороховая ведьма",
        class: "mage",
        level: 7,
        description: "Заклинательница огня и копоти. Она управляет взрывами и может заставить вражеские пушки стрелять в своих же владельцев.",
        visual: "Isometric fantasy unit, female pirate mage, dark dress with lace, necklaces of bullets and bones, holding a smoking crystal orb, swirling black gunpowder smoke around her, isolated on plain white background, magical effects."
    },
    {
        id: "valencia_death_musketeer",
        name: "Мушкетер Смерти",
        class: "archer", // Элита
        level: 8,
        description: "Элитный снайпер в маске-черепе. Его ростовое ружье стреляет душами павших врагов. Каждый выстрел звучит как погребальный звон.",
        visual: "Isometric fantasy unit, elite pirate sniper, long dark coat, face painted as a sugar skull (calavera), massive heavy magic musket with glowing runes, standing stoically, isolated on plain white background, 3D render style."
    },
    {
        id: "valencia_baron_samedi_style",
        name: "Барон Побережья",
        class: "priest", // Элита
        level: 9,
        description: "Духовный лидер пиратов. Проводник между миром живых и мертвых. Способен поднять павших матросов прямо во время абордажа.",
        visual: "Isometric fantasy unit, tall pirate lord, top hat with feathers and bones, elegant but tattered velvet suit, cane topped with a glowing skull, cigar in mouth, ghastly aura, isolated on plain white background, epic cinematic lighting."
    },
    {
        id: "valencia_dreadnought_captain",
        name: "Капитан Кровавого Прилива",
        class: "paladin", // Суперэлита
        level: 10,
        description: "Живая легенда, заключившая сделку с морским дьяволом. Закован в черную броню, облепленную кораллами. Его воля подчиняет себе шторм.",
        visual: "Isometric fantasy unit, massive pirate captain, heavy black plate armor with gold filigree and barnacles, huge glowing cutlass, tattered crimson captain's coat, majestic pose, isolated on plain white background, detailed 3D asset."
    },


    {
        id: "dread_fleet_skin-stitcher",
        name: "Живодер Ужаса",
        class: "assassin",
        level: 6,
        description: "Корабельный хирург, сошедший с ума. Его фартук и наручи сшиты из лиц поверженных врагов. В бою использует длинные хирургические крючья и иглы с ядом.",
        visual: "Isometric fantasy unit, twisted pirate surgeon, apron made of stitched human faces, iron mask with one glowing red eye, holding oversized surgical hooks and long needles, bloodstains on leather, isolated on plain white background, gruesome details, sharp outlines."
    },
    {
        id: "dread_fleet_flayed_vanguard",
        name: "Одраный гвардеец",
        class: "warrior",
        level: 7,
        description: "Тяжелый пехотинец, чья броня обтянута кусками дубленой кожи. Он не чувствует боли, так как его нервы давно выжжены темной магией Валенсии.",
        visual: "Isometric fantasy unit, heavy pirate warrior, rusted plate armor partially covered with stretched tanned skin, spiked spaulders, large jagged cleaver, belt with shrunken heads, grim stoic pose, isolated on plain white background, dark moody colors."
    },
    {
        id: "dread_fleet_soul_cannoneer",
        name: "Канонир Пустых Душ",
        class: "archer",
        level: 8,
        description: "Монструозный стрелок, таскающий на плече небольшую пушку, ствол которой обмотан кожей и костями. Снаряды этого орудия — вопящие души, разрывающие разум врага.",
        visual: "Isometric fantasy unit, hulking pirate gunner, leather mask, carrying a large portable cannon bound in human skin and rope, glowing ghostly green light from the barrel, tattered rags, isolated on plain white background, high-quality 2D game asset."
    },
    {
        id: "dread_fleet_bone_priest",
        name: "Костяной жрец",
        class: "priest",
        level: 9,
        description: "Высший иерарх Флота Ужаса. Его посох — это позвоночник морского чудовища, а мантии шелестят пергаментом из человеческой плоти. Призывает призрачные цепи из Бездны.",
        visual: "Isometric fantasy unit, skeletal pirate priest in tattered black velvet and skin robes, wearing a crown made of jawbones, long staff made of a giant spine with a glowing skull, aura of black mist, isolated on plain white background, epic cinematic lighting."
    },
    {
        id: "dread_fleet_admiral_of_void",
        name: "Адмирал Пустоты",
        class: "paladin", // Суперэлита
        level: 10,
        description: "Верховный правитель Флота Ужаса. Его доспех — это сплав проклятого золота Валенсии и костей древних королей. Он не дышит, не моргает и не знает пощады.",
        visual: "Isometric fantasy unit, legendary pirate admiral, monolithic black and gold plate armor with bone inlays, tattered cape made of multiple stitched flags, giant executioner's cutlass glowing with cold blue fire, majestic horrific pose, isolated on plain white background, detailed 3D asset."
    },


    {
        id: "lawrencia_sailor",
        name: "Моряк Республики",
        class: "warrior",
        level: 2,
        description: "Дисциплинированный матрос торгового флота. Вооружен абордажной саблей и надежным магическим пистолем. Носит практичную форму с медными пуговицами.",
        visual: "Isometric fantasy unit, steampunk sailor, blue and white naval uniform, leather gaiters, holding a polished saber and a brass flintlock pistol, naval cap, isolated on plain white background, clean black outlines, bright daylight."
    },
    {
        id: "lawrencia_rifleman",
        name: "Стрелок Света",
        class: "archer",
        level: 4,
        description: "Костяк армии. Использует дальнобойные магические винтовки, питаемые кристаллами света. Носит характерную шляпу с небольшим римским гребнем.",
        visual: "Isometric fantasy unit, lorencia rifleman, long blue coat, white trousers, steampunk goggles on a wide-brimmed hat with a small red crest, holding a long ornate magical rifle with brass pipes, isolated on plain white background, sharp outlines."
    },
    {
        id: "lawrencia_engineer_alchemist",
        name: "Инженер-Алхимик",
        class: "mage",
        level: 6,
        description: "Ученый на поле боя. Метает колбы с нестабильным светом и чинит паровых автоматонов на ходу.",
        visual: "Isometric fantasy unit, steampunk engineer, tool-heavy leather apron, vials of glowing liquid, holding a wrench and a glass bomb, many pouches and brass gadgets, isolated on plain white background, vibrant colors."
    },
    {
        id: "lawrencia_sicario",
        name: "Сиккарио Лоренции",
        class: "assassin", // Элита
        level: 7,
        description: "Выходец из криминальных кварталов, вставший на службу Республике. Виртуоз быстрой стрельбы. В каждой руке по тяжелому магическому револьверу, стреляющему сгустками плазмы.",
        visual: "Isometric fantasy unit, gunslinger assassin, long duster coat, leather holster belts, dual heavy magical revolvers glowing with blue light, bandana over face, stylish cowboy-steampunk hybrid, isolated on plain white background, dynamic pose."
    },
    {
        id: "lawrencia_commandos",
        name: "Коммандос Республики",
        class: "archer", // Элита
        level: 8,
        description: "Элитное подразделение стрелков. Оснащены паровыми ранцами для коротких рывков и винтовками с оптическими кристаллами. Мастера точечного устранения целей.",
        visual: "Isometric fantasy unit, elite steampunk commando, tactical blue armor with brass fittings, mechanical backpack with small steam vents, advanced magic sniper rifle, tactical visor, isolated on plain white background, detailed 3D render style."
    },
    {
        id: "lawrencia_punisher_battalion",
        name: "Карательный Батальон",
        class: "warrior", // Суперэлита
        level: 10,
        description: "Ультимативная пехота коммандос. Ветераны в тяжелой механизированной броне. Их появление означает конец любых переговоров. Вооружены скорострельными магическими карабинами.",
        visual: "Isometric fantasy unit, heavy mechanized commando, full plate power armor in blue and gold, steam hissing from joints, massive rapid-fire magic rifle, cape with the Republic emblem, heroic imposing pose, isolated on plain white background, epic cinematic lighting."
    },
    {
        id: "lawrencia_pretorian",
        name: "Преторианская Гвардия",
        class: "paladin", // Суперэлита
        level: 10,
        description: "Высшая гвардия Сената. Сочетание римской чести и технологий будущего. Закованы в белое золото, используют силовые щиты и копья-разрядники.",
        visual: "Isometric fantasy unit, steampunk praetorian guard, ornate white and gold plate armor, large red transverse crest on helmet, mechanical tower shield glowing with energy, electrified spear (pilum), isolated on plain white background, majestic 3D asset."
    },


    {
        id: "torino_infantry",
        name: "Солдат Торино",
        class: "warrior",
        level: 3,
        description: "Дисциплинированный пехотинец в серой шинели и стальном нагруднике. Его шлем украшен стилизованными крыльями, а взгляд холоден и пуст.",
        visual: "Isometric fantasy unit, Torino soldier, dark grey military greatcoat, black leather boots, iron breastplate, steel helmet with small pale-purple wing motifs, holding a short carbine and a combat dagger, isolated on plain white background, clean black outlines."
    },
    {
        id: "torino_inquisitor",
        name: "Инквизитор Ангела Смерти",
        class: "priest",
        level: 6,
        description: "Духовный наставник полка. Следит за чистотой веры и отсутствием страха смерти. Его присутствие на поле боя запрещает солдатам отступать.",
        visual: "Isometric fantasy unit, sinister priest in long black and pale-purple liturgical robes, tall iron collar, face hidden by a polished silver skull mask, holding a staff topped with a mechanical winged hourglass, isolated on plain white background, sharp outlines."
    },
    {
        id: "torino_wing_hussar",
        name: "Штурмовик 'Крыло Смерти'",
        class: "assassin",
        level: 7,
        description: "Элитный боец, оснащенный механическими крыльями Лоренцийского образца, но модифицированными для бесшумного пикирования. Атакует сверху, используя парные магические клинки.",
        visual: "Isometric fantasy unit, winged commando, sleek black tactical armor, large mechanical pale-purple energy wings, dual glowing violet daggers, dynamic flying pose, isolated on plain white background, high-quality 2D game asset."
    },
    {
        id: "torino_centurion",
        name: "Центурион Торино",
        class: "paladin",
        level: 8,
        description: "Офицер высшего звена. Командует железным кулаком. Его броня — шедевр технической мысли, позволяющая выживать в самом эпицентре взрыва.",
        visual: "Isometric fantasy unit, military officer in heavy blued-steel plate armor, officer's cap with a purple plume, holding a heavy magic pistol and a power-saber, stoic commanding pose, isolated on plain white background, detailed 3D render."
    },
    {
        id: "torino_death_corps",
        name: "Корпус Смерти",
        class: "warrior",
        level: 10, // Суперэлита
        description: "Вершина военной машины Торино. Сверхмощный коммандос в полностью герметичной броне. В его руках — тяжелый многоствольный магический пулемет, способный превратить целую армию в пыль под аккомпанемент фиолетовых вспышек.",
        visual: "Isometric fantasy unit, ultra-heavy elite commando, bulky charcoal-grey power armor, pale-purple glowing pipes and vents, massive multi-barrel magical gatling gun, glowing violet optics, heroic unstoppable pose, isolated on plain white background, epic cinematic lighting, sharp outlines."
    },


    {
        id: "tua_militia_phalanx",
        name: "Крестьянин-фалангист",
        class: "warrior", level: 1,
        description: "Простолюдины, обученные Маннфредом держать плотный строй. Их длинные копья создают непреодолимый лес пик для вражеской конницы.",
        visual: "Isometric fantasy unit, medieval peasant soldier, green and brown tunic, iron helmet, holding a very long spear in a phalanx pose, large wooden shield, isolated on plain white background, clean black outlines."
    },
    {
        id: "tua_peasant_archer",
        name: "Лучник с баррикадой",
        class: "archer", level: 2,
        description: "Крестьянские стрелки. Перед боем вкапывают в землю заостренные колья, создавая временную защиту от чарджа.",
        visual: "Isometric fantasy unit, peasant archer, simple hood, longbow, standing behind a small wooden spike barricade, quiver on belt, isolated on plain white background, sharp outlines."
    },
    {
        id: "tua_battle_cart",
        name: "Стрелковая телега",
        class: "archer", level: 4,
        description: "Маневренная повозка, набитая лучниками. Кельтская колесница на новый лад — быстрая, шумная и смертоносная.",
        visual: "Isometric fantasy unit, wooden horse-drawn cart, two peasant archers firing from inside, brightly colored banners, moving pose, isolated on plain white background, game asset style."
    },
    {
        id: "tua_battle_maiden",
        name: "Дева Битвы",
        class: "priest", level: 5,
        description: "Жанна д’Арк на минималках. Молодые девы в доспехах, которые несут знамя и вдохновляют солдат криками о чести. Вместо магии используют веру.",
        visual: "Isometric fantasy unit, young woman in shining silver breastplate over a simple white dress, holding a large heraldic banner and a sword, determined expression, isolated on plain white background, vibrant colors."
    },
    {
        id: "tua_knight_errant",
        name: "Странствующий рыцарь",
        class: "paladin", level: 5,
        description: "Молодой дворянин в поисках славы. Конный копейщик, чье рвение часто опережает здравый смысл.",
        visual: "Isometric fantasy unit, knight on a galloping horse, colorful surcoat, long cavalry lance with a small pennant, feathered helmet, isolated on plain white background, dynamic pose."
    },
    {
        id: "tua_suzerain_knight",
        name: "Рыцарь Сюзерена",
        class: "paladin", level: 7,
        description: "Тяжелая кавалерия в классическом понимании. Щит, меч и стальная уверенность в своем превосходстве.",
        visual: "Isometric fantasy unit, heavy knight on a powerful horse covered in silk barding, full plate armor, large heater shield with complex heraldry, broadsword, isolated on plain white background, detailed 3D render."
    },
    {
        id: "tua_fearless_knight",
        name: "Бесстрашный рыцарь",
        class: "warrior", level: 7,
        description: "Конный воин, сменивший копье на массивный топор. Идет в самую гущу боя, игнорируя опасность.",
        visual: "Isometric fantasy unit, knight on a black warhorse, holding a massive long-handled battle axe, ornate shield, bulky armor, isolated on plain white background, sharp outlines."
    },
    {
        id: "tua_count_guard",
        name: "Телохранитель Графа",
        class: "warrior", level: 8,
        description: "Единственная элитная пехота. Сверхтяжелые доспехи и ростовые щиты. Стоят насмерть, защищая своего господина.",
        visual: "Isometric fantasy unit, elite foot knight, massive ornate plate armor, large tower shield, mace in hand, standing stoically, isolated on plain white background, high-quality 2D game asset."
    },
    {
        id: "tua_fair_lady",
        name: "Прекрасная Дама",
        class: "mage", level: 8,
        description: "Аристократки в роскошных платьях верхом на конях. Их фанатизм и красота ослепляют врагов и даруют союзникам ярость.",
        visual: "Isometric fantasy unit, noble lady in a flowing medieval gown and silk veil, riding a white horse, holding a silver chalice, aura of light and flower petals, isolated on plain white background, majestic style."
    },
    {
        id: "tua_beauty_knight",
        name: "Рыцарь Красоты",
        class: "paladin", level: 9,
        description: "Женский конный орден. Сочетание смертоносного изящества и лучшей стали Алюры.",
        visual: "Isometric fantasy unit, female knight in gold-filigree silver armor, riding a slender graceful horse, thin rapier-like lance, flowing blue capes, isolated on plain white background, sharp outlines."
    },
    {
        id: "tua_vow_knight",
        name: "Рыцарь Обета",
        class: "paladin", level: 9,
        description: "Суперэлита. Рыцари, давшие обет никогда не отступать. Их доспехи покрыты свитками с их клятвами.",
        visual: "Isometric fantasy unit, legendary knight on an armored stallion, intricate plate armor with parchment scrolls attached, giant sword, heroic pose, isolated on plain white background, 3D render style."
    },
    {
        id: "tua_lady_knight",
        name: "Рыцарь Леди",
        class: "paladin", level: 10,
        description: "Абсолютная суперэлита. Личная гвардия Леди Озера. Самый мощный конный отряд, чьи кони скачут по воде и воздуху, а мечи сияют чистым светом.",
        visual: "Isometric fantasy unit, divine knight on a glowing white destrier, ethereal blue and silver plate armor, longsword made of pure light, aura of mist and moonlight, isolated on plain white background, epic cinematic lighting."
    },


    {
        id: "lahra_pharaoh_warrior",
        name: "Воин Фараона",
        class: "warrior", level: 2,
        description: "Базовая пехота в кожаных доспехах с медными вставками. Щит обтянут кожей кобры, в руках — бронзовый хопеш.",
        visual: "Isometric fantasy unit, Egyptian soldier, bronze khopesh sword, shield with snake skin pattern, linen white loincloth (schenti), bronze collar, isolated on plain white background, clean black outlines."
    },
    {
        id: "lahra_snake_warrior",
        name: "Воин Змеи",
        class: "warrior",
        level: 4,
        description: "Профессиональный солдат, прошедший обряд инициации ядом. Его шлем имитирует капюшон кобры, а удары быстры и смертельны.",
        visual: "Isometric fantasy unit, elite soldier, helmet shaped like a cobra hood, dark gold scale armor, curved jade blade, aggressive striking pose, isolated on plain white background, vibrant turquoise and gold colors."
    },
    {
        id: "lahra_snake_commander",
        name: "Командир Змеи",
        class: "warrior",
        level: 6,
        description: "Лидер отряда, чье тело покрыто ритуальными татуировками-змеями. Его присутствие заставляет солдат сражаться с фанатизмом обреченных.",
        visual: "Isometric fantasy unit, imposing commander, ornate black gold chestpiece, massive serpent-shaped glaive, turquoise cape, commanding gesture, isolated on plain white background, sharp outlines."
    },
    {
        id: "lahra_pharaoh_general",
        name: "Генерал Фараона",
        class: "paladin",
        level: 8,
        description: "Высшая военная знать. Закован в тяжелую золотую броню, имитирующую чешую змея. Каждое его движение источает древнюю мощь Лахры.",
        visual: "Isometric fantasy unit, egyptian general, heavy gold and obsidian plate armor, majestic golden mask of a giant cobra, holding a ceremonial scepter and shield, isolated on plain white background, 3D render style."
    },
    {
        id: "lahra_hashashin",
        name: "Египетский Хашашин",
        class: "assassin",
        level: 5,
        description: "Теневой убийца пустыни. Лицо скрыто маской, в руках — парные кинжалы-клыки. Двигается бесшумно, как ползущая в песке гадюка.",
        visual: "Isometric fantasy unit, desert assassin, hooded black linen outfit, gold and turquoise jewelry, dual curved daggers dripping with green venom, glowing yellow eyes, isolated on plain white background, stealthy pose."
    },
    {
        id: "lahra_master_poison",
        name: "Мастер Ядов",
        class: "mage",
        level: 7,
        description: "Верховный маг-аптекарь. Он может отравить колодец или превратить кровь врага в густую черную желчь одним жестом.",
        visual: "Isometric fantasy unit, wizard in dark robes, carrying floating vials of green toxic liquid, holding a staff with a snake skull, swirling toxic gas, isolated on plain white background, magical effects."
    },
    {
        id: "lahra_snake_charmer",
        name: "Заклинатель Змей",
        class: "priest",
        level: 5,
        description: "Маг-саппорт. Его флейта не только гипнотизирует рептилий, но и управляет волей союзников, снимая страх и усталость.",
        visual: "Isometric fantasy unit, mage with a golden pungi flute, giant spectral cobra rising behind him, silk robes, isolated on plain white background, stylized 2D asset."
    },
    {
        id: "lahra_magic_chariot",
        name: "Магическая колесница",
        class: "warrior",
        level: 9, // Элита
        description: "Верх инженерной мысли Лахры. Колесница из золота и черного дерева, парящая над песком без упряжи, ведомая лишь волей змеиного жреца.",
        visual: "Isometric fantasy unit, levitating ornate golden chariot, decorated with giant serpent heads, no horses, magical blue fire beneath, driver in pharaoh attire firing a bow, isolated on plain white background, epic lighting."
    },
    {
        id: "lahra_mummy",
        name: "Древняя Мумия",
        class: "warrior",
        level: 8, // Элита
        description: "Восставший из мертвых страж гробниц. Заговоренные бинты делают его почти неуязвимым для обычного оружия.",
        visual: "Isometric fantasy unit, tall muscular mummy, tattered ancient bandages, glowing blue eyes, golden jewelry, bronze axe, aura of dust and sand, isolated on plain white background, high-quality game sprite."
    },
    {
        id: "lahra_son_of_malice",
        name: "Сын Злобы",
        class: "mage",
        level: 10, // Суперэлита
        description: "Аватар бога Малактари. Существо, в котором почти не осталось человеческого — чешуйчатая кожа, четыре руки и абсолютная власть над песком и смертью.",
        visual: "Isometric fantasy unit, monstrous four-armed humanoid, covered in obsidian scales, crown of living snakes, eyes burning with purple fire, levitating above sand, multiple floating daggers, isolated on plain white background, cinematic 3D render."
    },


    {
        id: "alSallah_desert_scout",
        name: "Пустынный разведчик",
        class: "warrior",
        level: 2,
        description: "Легкий пехотинец в тюрбане и просторных одеждах. Знает каждый бархан и мастерски владеет кривым кинжалом.",
        visual: "Isometric fantasy unit, arabian desert scout, light beige robes, brown turban covering face, holding a curved dagger and a small round wooden shield, isolated on plain white background, clean black outlines."
    },
    {
        id: "alSallah_sand_archer",
        name: "Лучник дюн",
        class: "archer",
        level: 3,
        description: "Меткий стрелок, способный часами выжидать цель, зарывшись в песок. Использует мощные композитные луки.",
        visual: "Isometric fantasy unit, arabian archer, sand-colored camouflage cloak, traditional curved bow, leather quiver, focused aiming pose, isolated on plain white background, sharp outlines."
    },
    {
        id: "alSallah_bedouin_rider",
        name: "Наездник-бедуин",
        class: "warrior",
        level: 4,
        description: "Костяк армии султаната. Всадник на быстроногом верблюде, вооруженный длинным копьем. Идеален для изнуряющих налетов.",
        visual: "Isometric fantasy unit, bedouin warrior riding a humped camel, flowing white and blue robes, long bamboo spear with a sun pennant, saddlebags with supplies, isolated on plain white background, realistic camel anatomy."
    },
    {
        id: "alSallah_sun_fanatic",
        name: "Фанатик Пророка",
        class: "paladin",
        level: 5,
        description: "Воин, уверовавший в слова нового Пророка. Не знает страха и боли, бросаясь в бой с именем Солнца на устах.",
        visual: "Isometric fantasy unit, shirtless arabian fanatic, loose trousers, sun tattoos on chest, large scimitar, intense expression, bright yellow sashes, isolated on plain white background, vibrant colors."
    },

    {
        id: "oas_saber_rider",
        name: "Наездник на саблезубе",
        class: "paladin",
        level: 7, // Элита
        description: "Тяжелая ударная сила Оазиса. Воин в легких доспехах верхом на огромном саблезубом тигре. Связь между зверем и человеком почти телепатическая.",
        visual: "Isometric fantasy unit, warrior riding a massive saber-toothed tiger, minimal golden jewelry, silk loincloth, holding a spear, tiger has glowing amber eyes and muscular build, isolated on plain white background, high-quality game asset."
    },
    {
        id: "oas_lioness_warrior",
        name: "Львица",
        class: "assassin",
        level: 8, // Элита
        description: "Девушки-воительницы, подражающие повадкам хищников. Почти нагие, они полагаются на сверхъестественную ловкость и стальные когти на руках.",
        visual: "Isometric fantasy unit, athletic woman with feline grace, wearing only golden ornaments and silk strips, large steel claws attached to hands (katars), cat-like movement, fierce expression, isolated on plain white background, sharp outlines."
    },
    {
        id: "oas_night_dancer",
        name: "Ночная танцовщица",
        class: "assassin",
        level: 7, // Элита
        description: "Мастера танца с саблями. Их движения завораживают, превращая битву в смертельный балет. Используют две изогнутые сабли.",
        visual: "Isometric fantasy unit, beautiful arabian-style dancer, translucent veils, silk harem pants, dual sharp scimitars, dynamic spinning pose, gold jewelry clinking, isolated on plain white background, vibrant colors."
    },
    {
        id: "oas_blood_brother",
        name: "Кровный брат",
        class: "warrior",
        level: 9, // Элита
        description: "Личные телохранители Короля. Суровые молчаливые гиганты, вооруженные парой зазубренных серпов. Их верность абсолютна.",
        visual: "Isometric fantasy unit, muscular male guardian, bare chest, simple leather belt, dual large khopesh-style sickles, stoic expression, tattoos of cat paws, isolated on plain white background, detailed 3D render."
    },
    {
        id: "oas_sky_rider",
        name: "Небесный наездник",
        class: "paladin",
        level: 10, // Суперэлита
        description: "Легендарные защитники Оазиса. Летают на огромных крылатых саблезубых тиграх. Появляются в небе как символ надежды и кары небесной.",
        visual: "Isometric fantasy unit, majestic winged saber-toothed tiger flying, rider in ornate gold and azure armor, long spear glowing with light, tiger has large feathered wings, epic heroic pose, isolated on plain white background, cinematic lighting."
    },


    {
        id: "elvinar_spearman",
        name: "Гвардеец-копейщик",
        class: "warrior",
        level: 5,
        description: "Профессиональная пехота в платиновой броне. Дисциплина, отточенная тысячелетиями.",
        visual: "Isometric fantasy unit, high elf spearman, silver plate armor, long elegant spear, leaf-shaped shield, isolated on white background."
    },
    {
        id: "elvinar_ranger",
        name: "Рейнджер",
        class: "archer",
        level: 5,
        description: "Мастер дальнего боя. Его зрение не знает преград.",
        visual: "Isometric fantasy unit, high elf archer, silver and green leather armor, longbow, isolated on white background."
    },
    {
        id: "elvinar_swordsman",
        name: "Мечник",
        class: "warrior",
        level: 5,
        description: "Классический фехтовальщик Эльвинара. Баланс грации и стали.",
        visual: "Isometric fantasy unit, high elf swordsman, silver breastplate, slender longsword, elegant pose, isolated on white background."
    },
    {
        id: "elvinar_scout",
        name: "Разведчик",
        class: "assassin",
        level: 5,
        description: "Тень в лесах и горах. Мастер скрытных маневров.",
        visual: "Isometric fantasy unit, elf scout, grey leather armor, hooded, dual daggers, isolated on white background."
    },
    {
        id: "elvinar_mage",
        name: "Маг Эльвинара",
        class: "mage",
        level: 6,
        description: "Классический заклинатель, использующий энергию природы и эфира.",
        visual: "Isometric fantasy unit, high elf mage, flowing blue and silver silk robes, staff with a floating crystal, glowing hands, isolated on white background."
    },
    {
        id: "elvinar_druid",
        name: "Друид",
        class: "mage",
        level: 6,
        description: "Связан с Мировым Древом. Управляет корнями и зверями.",
        visual: "Isometric fantasy unit, elf druid, wooden and bronze ornaments, staff of living vine, green leaves aura, isolated on white background."
    },
    {
        id: "elvinar_moon_priestess",
        name: "Жрица Луны",
        class: "priest",
        level: 7,
        description: "Проводник воли Богини. Носит легкие одежды, лечит и благословляет.",
        visual: "Isometric fantasy unit, elf priestess, flowing white translucent robes, silver tiara, crescent moon staff, soft glow, isolated on white background."
    },

    {
        id: "elvinar_faiolin_sword",
        name: "Мечник Фа'й'о'лин",
        class: "warrior",
        level: 8,
        description: "Элитный мастер клинка из Дома Дуэлянтов.",
        visual: "Isometric fantasy unit, elite elf swordsman, ornate silver armor, two slender blades, dynamic combat stance, isolated on white background."
    },
    {
        id: "elvinar_fayarsendriet_priestess",
        name: "Жрица Луны Фа'й'а'Рсэндриэт",
        class: "priest",
        level: 8,
        description: "Элитная жрица в боевом облачении из лунного серебра.",
        visual: "Isometric fantasy unit, armored moon priestess, full plate silver, glowing scepter, majestic holy aura, isolated on white background."
    },
    {
        id: "elvinar_faidayen_mage",
        name: "Маг Бездны Фа'й'да'йэн",
        class: "mage",
        level: 8,
        description: "Допущен к запретным знаниям. Магия фиолетового пламени.",
        visual: "Isometric fantasy unit, elf void mage, dark purple robes, violet energy swirls, mysterious mask, isolated on white background."
    },
    {
        id: "elvinar_faidayen_ranger",
        name: "Рейнджер Фа'й'да'йэн",
        class: "archer",
        level: 8,
        description: "Стрелы этого Дома проходят сквозь реальность.",
        visual: "Isometric fantasy unit, elite elf ranger, purple-silver armor, glowing violet bow, arrows of mist, isolated on white background."
    },
    {
        id: "elvinar_faliril_druid",
        name: "Друид Фа'Ли'Рил",
        class: "mage",
        level: 8,
        description: "Архидруид, способный пробуждать ярость древних лесов.",
        visual: "Isometric fantasy unit, elder druid, armor of white bark and emeralds, massive vine staff, nature energy, isolated on white background."
    },
    {
        id: "elvinar_famirret_frost",
        name: "Маг Холода Фа'Ми'Ррет",
        class: "mage",
        level: 8,
        description: "Снежный эльф. Его магия замораживает саму волю.",
        visual: "Isometric fantasy unit, snow elf, white furs, icy armor, staff of frozen diamond, snowflakes, isolated on white background."
    },
    {
        id: "elvinar_oberon_all",
        name: "Элита Дома Оберон",
        class: "paladin",
        level: 9,
        description: "Рейнджеры и рыцари в черном. Максимальный пафос и мощь.",
        visual: "Isometric fantasy unit, elite elf in black plate armor, silver filigree, tattered black cape, heroic and grim, isolated on white background."
    },
    {
        id: "elvinar_moon_blade",
        name: "Лунный Клинок",
        class: "paladin",
        level: 10,
        description: "Суперэлита. Мечник-паладин с лунным нимбом над головой.",
        visual: "Isometric fantasy unit, legendary paladin, radiant white-gold armor, crescent moon halo, blade of pure light, isolated on white background."
    },


    {
        id: "falannar_thrall_rower",
        name: "Раб-гребец",
        class: "warrior",
        level: 5,
        description: "Утопленник, чьи мышцы вечно подпитываются солью и некромантией. Использует тяжелое весло как палицу.",
        visual: "Isometric fantasy unit, bloated undead elf, seaweeds over skin, holding a massive reinforced wooden oar, glowing blue eyes, isolated on white background."
    },
    {
        id: "falannar_marine_axeman",
        name: "Гвардеец Анар",
        class: "warrior",
        level: 6,
        description: "Дисциплинированная пехота. Тяжелый топор из обсидиана и щит, оббитый кожей кракена.",
        visual: "Isometric fantasy unit, dark elf in black plate armor with coral spikes, large bearded axe, teal cloak, cold professional pose, isolated on white background."
    },
    {
        id: "falannar_deck_cleaver",
        name: "Абордажный палач",
        class: "warrior",
        level: 7,
        description: "Элитный боец ближнего боя. Его задача — прорубать путь сквозь ряды защитников корабля.",
        visual: "Isometric fantasy unit, heavy dark elf warrior, massive two-handed cleaver, plate armor with bone filigree, skull-shaped helmet, isolated on white background."
    },
    {
        id: "falannar_void_necromancer",
        name: "Некромант Бездны",
        class: "mage",
        level: 8,
        description: "Маг, поднимающий павших прямо во время боя. Его посох — это позвоночник морского змея.",
        visual: "Isometric fantasy unit, elf necromancer, dark robes, staff of bone with blue fire, floating skulls around, isolated on white background."
    },
    {
        id: "falannar_tide_caller",
        name: "Призыватель Прилива",
        class: "priest",
        level: 9,
        description: "Жрец, управляющий мертвой водой. Может вызвать цунами из душ утопленников.",
        visual: "Isometric fantasy unit, tall elf in ceremonial robes of fish skin and silver, holding a glowing conch, ethereal water aura, isolated on white background."
    },
    {
        id: "falannar_abyss_captain",
        name: "Капитан Глубин",
        class: "paladin",
        level: 10,
        description: "Суперэлита. Бессмертный рыцарь на призрачном морском коне. Его броня не ржавеет тысячи лет.",
        visual: "Isometric fantasy unit, legendary elf knight on skeletal seahorse-like beast, ancient black plate armor, glowing trident, majestic grim pose, isolated on white background."
    },

    {
        id: "falazur_chem_thrall",
        name: "Химический раб",
        class: "warrior",
        level: 5,
        description: "Накачан базовыми стимуляторами. Безумно агрессивен, не чувствует боли.",
        visual: "Isometric fantasy unit, muscular elf slave, glowing green tubes in back, iron shackles, dual daggers, crazed expression, isolated on white background."
    },
    {
        id: "falazur_toxin_archer",
        name: "Стрелок Скверны",
        class: "archer",
        level: 6,
        description: "Стреляет полыми болтами, внутри которых — разъедающая кислота Азур.",
        visual: "Isometric fantasy unit, elf in leather and brass armor, gas mask, crossbow with glass canisters, toxic green gas trail, isolated on white background."
    },
    {
        id: "falazur_mutant_beast",
        name: "Алхимический зверь",
        class: "warrior",
        level: 8,
        description: "Бывший эльф, ставший жертвой экспериментов. Четыре руки, костяные наросты и ярость.",
        visual: "Isometric fantasy unit, monstrous four-armed elf mutant, hulking build, glowing veins, metal plates bolted to skin, isolated on white background."
    },
    {
        id: "falazur_arcane_alchemist",
        name: "Архихимик Азур",
        class: "mage",
        level: 9,
        description: "Мастер взрывных эликсиров. Каждая его колба — маленькая катастрофа.",
        visual: "Isometric fantasy unit, elf alchemist, copper backpack with pipes, throwing a glowing violet vial, laboratory robes, isolated on white background."
    },
    {
        id: "falazur_stinger_assassin",
        name: "Жалящий Тень",
        class: "assassin",
        level: 9,
        description: "Убийца, чьи клинки — это хирургические инструменты, соединенные с баллонами яда.",
        visual: "Isometric fantasy unit, sleek elf in black latex-like armor, dual mechanical daggers with tubes, green glowing visor, isolated on white background."
    },
    {
        id: "falazur_grand_mutator",
        name: "Великий Мутатор",
        class: "mage",
        level: 10,
        description: "Суперэлита. Сочетает магию плоти и алхимию. Может превратить врага в лужу слизи за секунду.",
        visual: "Isometric fantasy unit, imposing elf lord, floating vats of acid, staff with a beating heart in glass, glowing mutagenic aura, isolated on white background."
    },

    {
        id: "famirin_bound_slave",
        name: "Связанный фанатик",
        class: "warrior",
        level: 5,
        description: "Воин-раб в кандалах, чей разум стерт наслаждением. Идет в бой с улыбкой.",
        visual: "Isometric fantasy unit, handsome human slave, silk blindfold, iron chains as weapons, serene expression, pink aura, isolated on white background."
    },
    {
        id: "famirin_ecstasy_witch",
        name: "Ведьма Экстаза",
        class: "mage",
        level: 7,
        description: "Ментальный маг. Плетет иллюзии, которые сводят врагов с ума от вожделения.",
        visual: "Isometric fantasy unit, seductive female elf, purple silk robes, gold chains, holding a rose-gold mirror, pink magical mist, isolated on white background."
    },
    {
        id: "famirin_shadow_succubus",
        name: "Теневая соблазнительница",
        class: "assassin",
        level: 8,
        description: "Ассасин, убивающая через поцелуй или тончайшую иглу в сердце.",
        visual: "Isometric fantasy unit, graceful female elf, black lace armor, tiny horns, dual needles, moving like a blur, isolated on white background."
    },
    {
        id: "famirin_pain_master",
        name: "Мастер Боли",
        class: "warrior",
        level: 9,
        description: "Элитный фехтовальщик, черпающий силу в собственных и чужих страданиях. Использует плети и клинки.",
        visual: "Isometric fantasy unit, male elf, leather and gold harness, multi-headed whip, cruel smile, blood-red eyes, isolated on white background."
    },
    {
        id: "famirin_siren_vocalist",
        name: "Сирена Ми'Рин",
        class: "mage",
        level: 9,
        description: "Ее голос парализует целые отряды, заставляя их бросать оружие и падать на колени.",
        visual: "Isometric fantasy unit, beautiful elf singer, levitating, ornate golden harp, sonic ripples in pink, flowing hair, isolated on white background."
    },
    {
        id: "famirin_avatar_of_desire",
        name: "Аватар Желания",
        class: "paladin",
        level: 10,
        description: "Суперэлита. Женщина-полудемон с огромными крыльями, чье присутствие — это экстаз и смерть одновременно.",
        visual: "Isometric fantasy unit, legendary female elf-succubus, giant bat wings, minimal golden plate armor, giant rapier of violet light, divine aura, isolated on white background."
    },

    {
        id: "harjari_warrior_rakshasa",
        name: "Воин-Ракшас",
        class: "warrior", level: 5,
        description: "Четырехрукий гуманоидный кот. Базовая мощь Харджари. В каждой руке он держит по зазубренному клинку, превращаясь в живую мясорубку.",
        visual: "Isometric fantasy unit, four-armed tiger-man (rakshasa), wearing bright silk dhotis and gold chest plates, wielding four curved swords (tulwars), fierce leonine face, isolated on plain white background, vibrant indian colors, sharp outlines."
    },
    {
        id: "harjari_maid_enchantress",
        name: "Служанка-чародейка",
        class: "mage", level: 6, // Женский юнит
        description: "Официально — прислуга в храмах, фактически — мощные маги. Втайне от господ они годами оттачивают искусство плетения заклинаний через танцы.",
        visual: "Isometric fantasy unit, slender female cat-woman (feline humanoid), two arms, wearing a flowing translucent silk sari with gold embroidery, elegant dancing pose, glowing magical orbs in hands, jewelry on forehead, isolated on plain white background, magical light effects."
    },
    {
        id: "harjari_item_crafter",
        name: "Мастер Артефактов",
        class: "priest", level: 7,
        description: "Ракшасы-мужчины, создающие зачарованные доспехи и оружие. Способны на ходу чинить магические предметы и усиливать снаряжение союзников.",
        visual: "Isometric fantasy unit, older four-armed cat-man, heavy leather apron over silk, many small tools in his multiple hands, holding a glowing magical scepter and a hammer, isolated on plain white background, detailed gold textures."
    },
    {
        id: "harjari_rebel_fencer",
        name: "Мятежная фехтовальщица",
        class: "assassin", level: 8, // Женский юнит
        description: "Те самые «кошкодевочки», восставшие против гнета. Полагаются на скорость и грацию, используя свою двурукую анатомию как преимущество для невероятных прыжков и выпадов.",
        visual: "Isometric fantasy unit, agile female feline warrior, two arms, sleek leather and gold armor, wielding a long elegant rapier, dynamic leaping pose, long braided fur, determined expression, isolated on plain white background, sharp outlines."
    },
    {
        id: "harjari_rajah_guard",
        name: "Гвардеец Раджи",
        class: "paladin", level: 9, // Элита
        description: "Четырехрукие гиганты в тяжелейших золотых латах. Их задача — подавлять бунты и охранять высшую касту. Вооружены тяжелыми алебардами.",
        visual: "Isometric fantasy unit, massive four-armed tiger warrior, heavy golden plate armor encrusted with rubies, wearing a royal turban, wielding four different polearms, stoic pose, isolated on plain white background, 3D render style."
    },
    {
        id: "harjari_avatar_of_kali",
        name: "Воплощение Ярости",
        class: "paladin", level: 10, // Суперэлита
        description: "Мистическое существо, в которое превращается самая достойная из женщин-воительниц. Несмотря на наличие двух рук, она управляет еще шестью призрачными конечностями из чистой магической энергии.",
        visual: "Isometric fantasy unit, legendary female feline goddess, two physical arms holding a greatsword, six spectral glowing blue arms behind her holding daggers, radiant aura, divine silk robes, isolated on plain white background, epic cinematic lighting."
    },


    // --- КРАСНЫЕ (Огонь, Патриархат - Мужчины) ---
    {
        id: "drakonid_red_warrior",
        name: "Красный воин",
        class: "warrior", level: 5,
        description: "Могучий самец с алой чешуей. Его тело излучает жар, а в бою он использует тяжелую обсидиановую палицу.",
        visual: "Isometric fantasy unit, male red-scaled dragonid warrior, thick red scales, obsidian mace, leather harness, orange eyes, smoke from nostrils, isolated on white background."
    },
    {
        id: "drakonid_red_elite",
        name: "Элитный огнерожденный",
        class: "warrior", level: 8,
        description: "Закаленный в лаве боец. Его чешуя ороговела до состояния камня, а удары воспламеняют воздух.",
        visual: "Isometric fantasy unit, muscular male red dragonid, heavy volcanic rock armor plates, glowing orange veins on chest, massive two-handed axe, isolated on white background."
    },
    {
        id: "drakonid_red_dragon_knight",
        name: "Красный драконий рыцарь",
        class: "paladin", level: 10,
        description: "Суперэлита Партурнакса. Сверхтяжелая броня из черной стали, огромные крылья и пламенеющий двуручный меч.",
        visual: "Isometric fantasy unit, legendary red dragonid knight, massive black dragon-steel plate armor, large wings, flaming greatsword, majestic pose, isolated on white background."
    },

    // --- ЗЕЛЕНЫЕ (Природа, Матриархат - Женщины) ---
    {
        id: "drakonid_green_warrior",
        name: "Зеленая воительница",
        class: "warrior", level: 5,
        description: "Грациозная самка, чья чешуя имитирует листву. Вооружена костяным копьем и щитом из панциря древней рептилии.",
        visual: "Isometric fantasy unit, female green-scaled dragonid, agile build, bone spear, shield made of turtle shell, leaf-patterned scales, isolated on white background."
    },
    {
        id: "drakonid_green_elite",
        name: "Элитная охотница джунглей",
        class: "assassin", level: 8,
        description: "Мастер засад. Ее движения бесшумны, а когти и клинки смазаны ядом, вызывающим паралич.",
        visual: "Isometric fantasy unit, elite female green dragonid, sleek dark green armor made of thorns, dual bone sickles dripping with poison, crouching pose, isolated on white background."
    },
    {
        id: "drakonid_green_dragon_knight",
        name: "Зеленая драконья рыцарша",
        class: "paladin", level: 10,
        description: "Владычица лесов. Обладает мощными крыльями, похожими на листья, и доспехами из 'живого' изумрудного металла.",
        visual: "Isometric fantasy unit, legendary female green dragonid, emerald plate armor with ivy engravings, leaf-like wings, massive vine-covered halberd, isolated on white background."
    },

    // --- СИНИЕ (Молния, Патриархат - Мужчины) ---
    {
        id: "drakonid_blue_warrior",
        name: "Синий воин",
        class: "warrior", level: 5,
        description: "Быстрый самец с лазурной чешуей. Между его рогами иногда проскакивают искры статического электричества.",
        visual: "Isometric fantasy unit, male blue-scaled dragonid, blue scales, holding a bronze trident, leather and iron straps, blue glowing eyes, isolated on white background."
    },
    {
        id: "drakonid_blue_elite",
        name: "Элитный громовержец",
        class: "mage", level: 8,
        description: "Воин-маг, способный концентрировать энергию бури в своих руках. Его удары сопровождаются громом.",
        visual: "Isometric fantasy unit, elite male blue dragonid, azure lamellar armor, lightning crackling around hands, heavy mace, dynamic electrical aura, isolated on white background."
    },
    {
        id: "drakonid_blue_dragon_knight",
        name: "Синий драконий рыцарь",
        class: "paladin", level: 10,
        description: "Повелитель небес в сверкающих сапфировых латах. Его крылья позволяют ему пикировать со скоростью молнии.",
        visual: "Isometric fantasy unit, legendary blue dragonid knight, polished sapphire plate armor, massive leathery wings, lightning-shaped lance, isolated on white background."
    },

    // --- ЧЕРНЫЕ (Яд/Болота, Патриархат - Мужчины) ---
    {
        id: "drakonid_black_warrior",
        name: "Черный воин",
        class: "warrior", level: 5,
        description: "Мрачный житель топей. Его чешуя покрыта защитной слизью, а оружие сделано из заговоренного черного дерева.",
        visual: "Isometric fantasy unit, male black-scaled dragonid, dark obsidian scales, holding a jagged dark wood axe, swamp reed decorations, isolated on white background."
    },
    {
        id: "drakonid_black_elite",
        name: "Элитный мастер скверны",
        class: "assassin", level: 8,
        description: "Специалист по уничтожению из тени. Его броня поглощает свет, а присутствие вызывает гниение растений вокруг.",
        visual: "Isometric fantasy unit, elite male black dragonid, black bone armor, dual serrated daggers, dark mist aura, glowing yellow eyes, isolated on plain white background."
    },
    {
        id: "drakonid_black_dragon_knight",
        name: "Черный драконий рыцарь",
        class: "paladin", level: 10,
        description: "Самый жуткий из рыцарей. Его доспехи кажутся живой тьмой, а крылья напоминают крылья летучей мыши-переростка.",
        visual: "Isometric fantasy unit, legendary black dragonid knight, dark obsidian plate armor with bone filigree, massive tattered wings, giant scythe, isolated on white background."
    },

    // --- БЕЛЫЕ (Холод, Матриархат - Женщины) ---
    {
        id: "drakonid_white_warrior",
        name: "Белая воительница",
        class: "warrior", level: 5,
        description: "Снежная дева гор. Ее белая чешуя тверда как лед, а взгляд замораживает волю врага.",
        visual: "Isometric fantasy unit, female white-scaled dragonid, pale blue eyes, holding a crystal spear, white fur accents on leather armor, isolated on white background."
    },
    {
        id: "drakonid_white_elite",
        name: "Элитная ледяная стражница",
        class: "warrior", level: 8,
        description: "Защитница ледяных пиков. Носит доспехи из нетающего магического льда и сражается массивным ледяным молотом.",
        visual: "Isometric fantasy unit, elite female white dragonid, translucent ice plate armor, massive frost hammer, swirling snowflakes around her, isolated on white background."
    },
    {
        id: "drakonid_white_dragon_knight",
        name: "Белая драконья рыцарша",
        class: "paladin", level: 10,
        description: "Вершина изящества и мощи. Белоснежные доспехи, крылья из ледяных кристаллов и меч, выкованный в сердце вечной мерзлоты.",
        visual: "Isometric fantasy unit, legendary female white dragonid, radiant white-silver plate armor, crystalline wings, long blade made of ice, majestic cold aura, isolated on white background."
    }// --- КРАСНЫЕ (Огонь, Патриархат - Мужчины) ---
    {
        id: "drakonid_red_warrior",
        name: "Красный воин",
        class: "warrior", level: 5,
        description: "Могучий самец с алой чешуей. Его тело излучает жар, а в бою он использует тяжелую обсидиановую палицу.",
        visual: "Isometric fantasy unit, male red-scaled dragonid warrior, thick red scales, obsidian mace, leather harness, orange eyes, smoke from nostrils, isolated on white background."
    },
    {
        id: "drakonid_red_elite",
        name: "Элитный огнерожденный",
        class: "warrior", level: 8,
        description: "Закаленный в лаве боец. Его чешуя ороговела до состояния камня, а удары воспламеняют воздух.",
        visual: "Isometric fantasy unit, muscular male red dragonid, heavy volcanic rock armor plates, glowing orange veins on chest, massive two-handed axe, isolated on white background."
    },
    {
        id: "drakonid_red_dragon_knight",
        name: "Красный драконий рыцарь",
        class: "paladin", level: 10,
        description: "Суперэлита Партурнакса. Сверхтяжелая броня из черной стали, огромные крылья и пламенеющий двуручный меч.",
        visual: "Isometric fantasy unit, legendary red dragonid knight, massive black dragon-steel plate armor, large wings, flaming greatsword, majestic pose, isolated on white background."
    },

    // --- ЗЕЛЕНЫЕ (Природа, Матриархат - Женщины) ---
    {
        id: "drakonid_green_warrior",
        name: "Зеленая воительница",
        class: "warrior", level: 5,
        description: "Грациозная самка, чья чешуя имитирует листву. Вооружена костяным копьем и щитом из панциря древней рептилии.",
        visual: "Isometric fantasy unit, female green-scaled dragonid, agile build, bone spear, shield made of turtle shell, leaf-patterned scales, isolated on white background."
    },
    {
        id: "drakonid_green_elite",
        name: "Элитная охотница джунглей",
        class: "assassin", level: 8,
        description: "Мастер засад. Ее движения бесшумны, а когти и клинки смазаны ядом, вызывающим паралич.",
        visual: "Isometric fantasy unit, elite female green dragonid, sleek dark green armor made of thorns, dual bone sickles dripping with poison, crouching pose, isolated on white background."
    },
    {
        id: "drakonid_green_dragon_knight",
        name: "Зеленая драконья рыцарша",
        class: "paladin", level: 10,
        description: "Владычица лесов. Обладает мощными крыльями, похожими на листья, и доспехами из 'живого' изумрудного металла.",
        visual: "Isometric fantasy unit, legendary female green dragonid, emerald plate armor with ivy engravings, leaf-like wings, massive vine-covered halberd, isolated on white background."
    },

    // --- СИНИЕ (Молния, Патриархат - Мужчины) ---
    {
        id: "drakonid_blue_warrior",
        name: "Синий воин",
        class: "warrior", level: 5,
        description: "Быстрый самец с лазурной чешуей. Между его рогами иногда проскакивают искры статического электричества.",
        visual: "Isometric fantasy unit, male blue-scaled dragonid, blue scales, holding a bronze trident, leather and iron straps, blue glowing eyes, isolated on white background."
    },
    {
        id: "drakonid_blue_elite",
        name: "Элитный громовержец",
        class: "mage", level: 8,
        description: "Воин-маг, способный концентрировать энергию бури в своих руках. Его удары сопровождаются громом.",
        visual: "Isometric fantasy unit, elite male blue dragonid, azure lamellar armor, lightning crackling around hands, heavy mace, dynamic electrical aura, isolated on white background."
    },
    {
        id: "drakonid_blue_dragon_knight",
        name: "Синий драконий рыцарь",
        class: "paladin", level: 10,
        description: "Повелитель небес в сверкающих сапфировых латах. Его крылья позволяют ему пикировать со скоростью молнии.",
        visual: "Isometric fantasy unit, legendary blue dragonid knight, polished sapphire plate armor, massive leathery wings, lightning-shaped lance, isolated on white background."
    },

    // --- ЧЕРНЫЕ (Яд/Болота, Патриархат - Мужчины) ---
    {
        id: "drakonid_black_warrior",
        name: "Черный воин",
        class: "warrior", level: 5,
        description: "Мрачный житель топей. Его чешуя покрыта защитной слизью, а оружие сделано из заговоренного черного дерева.",
        visual: "Isometric fantasy unit, male black-scaled dragonid, dark obsidian scales, holding a jagged dark wood axe, swamp reed decorations, isolated on white background."
    },
    {
        id: "drakonid_black_elite",
        name: "Элитный мастер скверны",
        class: "assassin", level: 8,
        description: "Специалист по уничтожению из тени. Его броня поглощает свет, а присутствие вызывает гниение растений вокруг.",
        visual: "Isometric fantasy unit, elite male black dragonid, black bone armor, dual serrated daggers, dark mist aura, glowing yellow eyes, isolated on plain white background."
    },
    {
        id: "drakonid_black_dragon_knight",
        name: "Черный драконий рыцарь",
        class: "paladin", level: 10,
        description: "Самый жуткий из рыцарей. Его доспехи кажутся живой тьмой, а крылья напоминают крылья летучей мыши-переростка.",
        visual: "Isometric fantasy unit, legendary black dragonid knight, dark obsidian plate armor with bone filigree, massive tattered wings, giant scythe, isolated on white background."
    },

    // --- БЕЛЫЕ (Холод, Матриархат - Женщины) ---
    {
        id: "drakonid_white_warrior",
        name: "Белая воительница",
        class: "warrior", level: 5,
        description: "Снежная дева гор. Ее белая чешуя тверда как лед, а взгляд замораживает волю врага.",
        visual: "Isometric fantasy unit, female white-scaled dragonid, pale blue eyes, holding a crystal spear, white fur accents on leather armor, isolated on white background."
    },
    {
        id: "drakonid_white_elite",
        name: "Элитная ледяная стражница",
        class: "warrior", level: 8,
        description: "Защитница ледяных пиков. Носит доспехи из нетающего магического льда и сражается массивным ледяным молотом.",
        visual: "Isometric fantasy unit, elite female white dragonid, translucent ice plate armor, massive frost hammer, swirling snowflakes around her, isolated on white background."
    },
    {
        id: "drakonid_white_dragon_knight",
        name: "Белая драконья рыцарша",
        class: "paladin", level: 10,
        description: "Вершина изящества и мощи. Белоснежные доспехи, крылья из ледяных кристаллов и меч, выкованный в сердце вечной мерзлоты.",
        visual: "Isometric fantasy unit, legendary female white dragonid, radiant white-silver plate armor, crystalline wings, long blade made of ice, majestic cold aura, isolated on white background."
    },

    {
        id: "bekka_porcelain_infantry",
        name: "Фарфоровый пехотинец",
        class: "warrior",
        level: 5,
        description: "Человеческий скелет внутри кукольного корпуса. Двигается дергано, издает звук бьющейся посуды.",
        visual: "Isometric fantasy unit, tall ball-jointed porcelain doll warrior, cracked face, holding a rusty cleaver, visible internal brass gears, isolated on white background, sharp outlines."
    },
    {
        id: "bekka_needle_spider",
        name: "Игольчатый паук",
        class: "assassin",
        level: 7,
        description: "Многоногая конструкция из пальцев и швейных игл. Парализует жертву ядом из катушек.",
        visual: "Isometric fantasy unit, mechanical spider made of bone and wood, multiple sewing needle legs, spools of black thread, glowing red glass eyes, isolated on white background."
    },
    {
        id: "bekka_flesh_marionette",
        name: "Мясная марионетка",
        class: "warrior",
        level: 9,
        description: "Элитный гигант, сшитый из тел павших героев. Управляется Беккой через толстые цепи.",
        visual: "Isometric fantasy unit, hulking flesh golem, stitched skin, metal staples, wooden puppet crossbar attached to back with thick chains, massive club made of stone, isolated on white background."
    },

    {
        id: "albrecht_hellfire_soldier",
        name: "Солдат Адского Огня",
        class: "archer",
        level: 6,
        description: "Стрелок в обгоревшей броне. Его мушкет стреляет сгустками живого пламени.",
        visual: "Isometric fantasy unit, renegade soldier, scorched grey military coat, demonic eyes on the breastplate, heavy musket glowing with red lava, smoking boots, isolated on white background."
    },
    {
        id: "albrecht_demon_reiter",
        name: "Демонический рейтар",
        class: "paladin",
        level: 8,
        description: "Конный стрелок на мутировавшем скакуне. Использует серу вместо пороха.",
        visual: "Isometric fantasy unit, cavalryman on a horse with red scales and horns, wearing jagged black steel armor, holding two smoking pistols, demonic energy aura, isolated on white background."
    },
    {
        id: "albrecht_chaos_heavy",
        name: "Тяжелый Осквернитель",
        class: "warrior",
        level: 10,
        description: "Суперэлита. Рыцарь в броне, которая буквально пожирает его плоть, давая взамен силу демона.",
        visual: "Isometric fantasy unit, ultra-heavy warrior, blue plate armor covered in organic red tentacles and eyes, massive jagged sword, steam vents releasing black smoke, isolated on white background."
    },

    {
        id: "lucy_shadow_squire",
        name: "Теневой оруженосец",
        class: "warrior",
        level: 5,
        description: "Крестьянин, верный Люси. Одет в черное тряпье с гербом мертвой розы.",
        visual: "Isometric fantasy unit, peasant soldier in tattered black tabard, shield with a withered rose, holding a dark iron spear, pale skin, isolated on white background."
    },
    {
        id: "lucy_night_cavalier",
        name: "Кавалер Ночи",
        class: "paladin",
        level: 8,
        description: "Рыцарь в истлевших шелках и вороненой стали. Всегда следует законам чести, даже когда режет горло.",
        visual: "Isometric fantasy unit, knight on a black horse, ornate dark silver armor, tattered purple cloak, elegant lance with a black pennant, noble pose, isolated on white background."
    },
    {
        id: "lucy_lady_guardian",
        name: "Страж Леди",
        class: "paladin",
        level: 10,
        description: "Личная гвардия Люси. Безмолвные воители в доспехах, полных черного тумана.",
        visual: "Isometric fantasy unit, elite knight, monolithic black plate armor with silver filigree, glowing violet visor, massive black shield, aura of dark rose petals, isolated on white background."
    },

    {
        id: "asmodeus_pill_addict",
        name: "Одержимый пилюлей",
        class: "warrior",
        level: 5,
        description: "Рядовой сектант, чьи вены раздулись от темной Ци. Сражается голыми руками или обломками стали.",
        visual: "Isometric fantasy unit, crazed human in ragged robes, bulging black veins, glowing red eyes, aggressive martial arts pose, dark energy mist, isolated on white background."
    },
    {
        id: "asmodeus_sky_assassin",
        name: "Небесный ассасин",
        class: "assassin",
        level: 8,
        description: "Мастер скрытности, использующий техники 'Шага Бездны'. Наносит удары в спину из невидимости.",
        visual: "Isometric fantasy unit, ninja-style cultivator, black silk outfit, glowing red runes on mask, dual floating daggers, semi-transparent shadow effect, isolated on white background."
    },
    {
        id: "asmodeus_demon_cultivator",
        name: "Демонический практик",
        class: "mage",
        level: 10,
        description: "Мастер высшего уровня. Управляет гравитацией и кровью, превращая поле боя в ад.",
        visual: "Isometric fantasy unit, elder master, long white hair, black and red hanfu, levitating, massive black energy sphere in hands, isolated on white background, epic lighting."
    },

    {
        id: "nikki_junkie_elf",
        name: "Обдолбанный эльф",
        class: "assassin",
        level: 6,
        description: "Бывший аристократ под кайфом. Не чувствует боли, атакует с безумной скоростью.",
        visual: "Isometric fantasy unit, wild elf, tattered noble silk, dual daggers, face painted with neon warpaint, manic expression, blurred movement, isolated on white background."
    },
    {
        id: "nikki_wasteland_thug",
        name: "Головорез Пустошей",
        class: "warrior",
        level: 7,
        description: "Тяжелый наемник в самодельной броне из мусора и трофейных эльфийских пластин.",
        visual: "Isometric fantasy unit, hulking mercenary, mismatched iron plate armor, spiked leather, massive rusted cleaver, mohawk, cigar in mouth, isolated on white background."
    },
    {
        id: "nikki_death_dancer_elite",
        name: "Танцовщица Никки",
        class: "assassin",
        level: 9,
        description: "Элитная последовательница. Сражается почти нагой, в ритуальных бинтах, используя длинные цепи с лезвиями.",
        visual: "Isometric fantasy unit, female elf, bandages and silk ribbons, dual chained blades, ecstatic dancing combat pose, glowing green veins (toxins), isolated on white background."
    },


    {
        id: "sephiroth_broken_refugee",
        name: "Обездоленный (Инициат)",
        class: "warrior", level: 2,
        description: "Новоприбывший в Церковь. Его раны зашиты живыми нитями-червями. Сражается обломками своего прошлого, обретая новую надежду в боли.",
        visual: "Isometric fantasy unit, thin human in grey rags, bandages made of pulsating grey worms, holding a rusted iron pipe and a wooden plank, serene expression, isolated on white background, sharp outlines."
    },
    {
        id: "sephiroth_worm_slinger",
        name: "Метатель червей",
        class: "archer", level: 3,
        description: "Дистанционный юнит. Выплевывает или мечет сгустки паразитов, которые вгрызаются в доспехи врага, разъедая металл и плоть.",
        visual: "Isometric fantasy unit, mutated elf with distended jaw, carrying a jar of writhing maggots, leather apron, green-tinted skin, isolated on white background, game asset style."
    },
    {
        id: "sephiroth_symbiotic_monk",
        name: "Симбиотический монах",
        class: "warrior", level: 4,
        description: "Монах, достигший гармонии с червем. Его кости стали гибкими, позволяя наносить удары под неестественными углами.",
        visual: "Isometric fantasy unit, bald human in white monk robes, extra long limbs, martial arts pose, grey veins on neck, glowing milky eyes, isolated on white background, clean black outlines."
    },
    {
        id: "sephiroth_flesh_weaver",
        name: "Ткач Плоти",
        class: "mage", level: 5,
        description: "Маг-саппорт. Сшивает раны союзников на расстоянии, используя магические нити. Его присутствие ускоряет регенерацию всей группы.",
        visual: "Isometric fantasy unit, female hybrid, four silver needles floating around her fingers, holding a spool of glowing red thread, translucent silk veil, isolated on white background, magical aura."
    },
    {
        id: "sephiroth_cocoon_warden",
        name: "Страж Кокона",
        class: "warrior", level: 6,
        description: "Тяжелый пехотинец. Его доспех — это затвердевший хитин огромного червя. При получении урона броня выпускает облако парализующих спор.",
        visual: "Isometric fantasy unit, heavy warrior in bone-white chitinous plate armor, spiked shoulders, large shield made of a giant insect wing, mace in hand, isolated on white background, detailed 3D render."
    },
    {
        id: "sephiroth_worm_harvester",
        name: "Жнец-паразит",
        class: "assassin", level: 7,
        description: "Элитный убийца. Вместо рук у него пучки плотоядных червей, способных вытягиваться на несколько метров, чтобы схватить жертву.",
        visual: "Isometric fantasy unit, hooded elf in dark grey leather, arms transformed into masses of long grey tentacles, stealthy pose, glowing red optics, isolated on white background, sharp outlines."
    },
    {
        id: "sephiroth_pale_exorcist",
        name: "Бледный Экзорцист",
        class: "priest", level: 8, // Элита
        description: "Высший чин Церкви. 'Изгоняет' саму жизнь из врагов, перекачивая их кровь в резервуары Сефирота. Его молитвы звучат как низкий гул роя.",
        visual: "Isometric fantasy unit, tall priest in ornate pale-gold vestments, carrying a massive silver syringe-staff, surrounded by a swirling cloud of tiny flies and worms, glowing white halo, isolated on white background."
    },
    {
        id: "sephiroth_blood_deacon",
        name: "Диакон Тёмного Мессии",
        class: "priest", level: 7,
        description: "Служитель Церкви, который делится 'благодатью' Сефирота. Он выпускает рои лечебных червей, которые облепляют союзников, закрывая их раны живым щитом.",
        visual: "Isometric fantasy unit, sinister priest in pale gold and grey liturgical vestments, carrying a silver censer releasing thick grey smoke and tiny worms, glowing palms, isolated on white background, magical light effects."
    },
    {
        id: "sephiroth_symbiote_guardian",
        name: "Страж-симбионт",
        class: "warrior", level: 8,
        description: "Тяжелый боец, чья броня срослась с телом. В критический момент его доспехи могут 'раскрыться', выпуская щупальца из червей для захвата врагов.",
        visual: "Isometric fantasy unit, heavy warrior in organic-looking white and silver plate armor, pulsing red veins on the metal, holding a massive jagged greatsword, intimidating stance, isolated on white background, detailed 3D render."
    },
    {
        id: "sephiroth_abomination_knight",
        name: "Рыцарь-Изверг",
        class: "paladin", level: 8, // Элита
        description: "Благородный воин, чье тело было полностью разрушено и пересобрано Сефиротом. Несёт веру Тёмного Мессии на острие проклятого клинка.",
        visual: "Isometric fantasy unit, knight in silver plate armor with organic pulsing gaps, large tattered white cape, heavy greatsword with a living eye at the hilt, heroic but terrifying pose, isolated on white background."
    },
    {
        id: "sephiroth_artoria_herald",
        name: "Вестник Артории",
        class: "mage", level: 9,
        description: "Полудемон-фанатик, следующий за подругой Сефирота. Использует магию безумия и хаоса, чтобы 'освободить' разум врагов от оков нормальности.",
        visual: "Isometric fantasy unit, demonic hybrid woman, small black horns, tattered silk dress, floating in the air, surrounded by chaotic red and black energy, manic laughter expression, isolated on white background."
    },

    {
        id: "defiler_dark_apostle",
        name: "Тёмный Апостол",
        class: "mage", level: 9, // Суперэлита
        description: "Вестник Тёмного Совета. Распространяет скверну словом и делом. Его шепот заставляет разум врага гнить заживо.",
        visual: "Isometric fantasy unit, sinister priest in high-collared black silk robes with silver runes, carrying a burning lantern of void-light, pale skin, elongated fingers, aura of whispering shadows, isolated on white background, sharp outlines."
    },
    {
        id: "defiler_dark_herald",
        name: "Тёмный Глашатай",
        class: "assassin", level: 9, // Суперэлита
        description: "Убийца, существующий между измерениями. Использует магию теней, чтобы проходить сквозь стены и наносить удары прямо в сердце жертвы.",
        visual: "Isometric fantasy unit, shadowy assassin, sleek obsidian leather outfit, smoke-like tattered cloak, dual ethereal daggers glowing with purple energy, semi-transparent body effect, isolated on white background."
    },
    {
        id: "defiler_dark_incarnation",
        name: "Тёмное Воплощение",
        class: "warrior", level: 9, // Супермутант
        description: "Вершина лабораторного безумия. Гигантское существо, в котором смешаны ткани десятков рас. Его сила чудовищна, а регенерация позволяет срастаться даже после прямого попадания из пушки.",
        visual: "Isometric fantasy unit, massive four-armed biological abomination, grey muscular skin, metal plates bolted to shoulders, glowing red tubes connected to chest, terrifying spiked claws, isolated on white background, detailed textures."
    },
    {
        id: "defiler_immaculate_doll",
        name: "Безупречный (Вассал Бездушного)",
        class: "warrior", level: 9, // Суперэлита
        description: "Идеальное создание из плоти. Бесполый, прекрасный и абсолютно лишенный эмоций солдат. Его движения совершенны, а мастерство владения копьем не имеет равных.",
        visual: "Isometric fantasy unit, androgynous porcelain-skinned warrior, athletic build, no hair, wearing minimal white silk and silver armor, holding a slender silver partisan spear, angelic but cold face, isolated on white background, sharp cinematic lighting."
    },
    {
        id: "defiler_corrupted_guard",
        name: "Осквернённый гвардеец",
        class: "paladin", level: 10, // Суперэлита
        description: "Падший рыцарь, ставший сосудом для некромантии, Бездны и демонической ярости. Его броня — это сплав проклятого металла и живой плоти. Не знает страха, усталости и милосердия.",
        visual: "Isometric fantasy unit, massive knight in chaotic plate armor, pulsating purple and green veins on metal, glowing demonic eyes on shield, tattered black cape, giant jagged sword dripping with shadow, isolated on white background, 3D render style."
    },
    {
        id: "defiler_dark_council",
        name: "Магистр Тёмного Совета",
        class: "mage", level: 10, // Архисуперэлита
        description: "Один из тринадцати столпов зла. Ученый-чернокнижник, чье тело — лишь оболочка для накопленной скверны. Мастер запредельной магии, способный стирать города с карты реальности.",
        visual: "Isometric fantasy unit, ancient dark elf archmage, floating above ground, tattered robes of shifting shadow and starlight, multiple floating grimoires, eyes burning with white void fire, staff made of a celestial spine, isolated on white background, epic god-like aura."
    },



    {
        id: "rat_hunger_drone",
        name: "Алчущий (Дрон Гнезда)",
        class: "warrior", level: 1,
        description: "Самый нижний чин. Крысёныш, почти ослепший от голода, чей разум заполнен шепотом Амэ. Сражается ржавым куском арматуры или просто когтями, стремясь откусить кусочек врага.",
        visual: "Isometric fantasy unit, small scrawny ratman, tattered burlap rags, feverish yellow eyes, holding a rusted metal spike, hunched aggressive pose, isolated on white background, clean black outlines."
    },
    {
        id: "rat_plague_slinger",
        name: "Чумной пращник",
        class: "archer", level: 2,
        description: "Стрелок, использующий пращу для метания 'подарков' — глиняных сфер, наполненных нечистотами и личинками Амэ. При попадании сфера разбивается, заражая территорию вокруг.",
        visual: "Isometric fantasy unit, ratman in a hooded dirty tunic, leather sling, carrying a pouch of glowing orange clay balls, focused aiming pose, isolated on white background, sharp outlines."
    },
    {
        id: "rat_scavenger_scout",
        name: "Сборщик-разведчик",
        class: "assassin", level: 3,
        description: "Быстрый и юркий крысолюд в кожаной броне. Его задача — находить 'еду' (трупы или припасы) и помечать цели для Лавины липким светящимся мускусом.",
        visual: "Isometric fantasy unit, agile ratman scout, dark leather harness, dual bone daggers, large twitching ears, glowing amber scent trail behind him, isolated on white background, game asset style."
    },
    {
        id: "rat_flesh_carrier",
        name: "Носитель Благодати",
        class: "warrior", level: 3,
        description: "Смертник, к спине которого пришит пульсирующий кусок Плоти Амэ. Когда он погибает, плоть детонирует, разбрасывая вокруг зараженные споры и исцеляя ближайших крыс.",
        visual: "Isometric fantasy unit, stout ratman, a large pulsating red meat growth attached to his back with copper wires, holding a wooden shield, desperate running pose, isolated on white background, vibrant toxic colors."
    },
    {
        id: "rat_blessed_eater",
        name: "Вкусивший Благодати",
        class: "warrior", level: 4,
        description: "Рядовой крысолюд, допущенный к Плоти Амэ. Его тело раздуто, а из ран вместо крови течет священный гной. Он бежит в бой с ликованием, желая разделить дар Богини с врагом.",
        visual: "Isometric fantasy unit, bloated ratman, pale skin with yellow boils, rusted iron plates bolted to flesh, holding a jagged copper cleaver, ecstatic expression, isolated on white background, sharp outlines."
    },
    {
        id: "rat_censer_bearer",
        name: "Носитель Кадила",
        class: "priest", level: 5,
        description: "Младший жрец, распыляющий аромат Амэ. Этот дым исцеляет крыс и заставляет плоть врагов покрываться язвами прямо под доспехами.",
        visual: "Isometric fantasy unit, ratman monk in tattered orange robes, gas mask, swinging a massive copper censer on a chain, thick yellow smoke aura, isolated on white background, vibrant toxic colors."
    },
    {
        id: "rat_flesh_apostle",
        name: "Апостол Плоти",
        class: "priest", level: 7,
        description: "Маг-проповедник. Он раздает куски Плоти Амэ союзникам, вызывая мгновенный рост костяных шипов и мускулов. Его вера непоколебима.",
        visual: "Isometric fantasy unit, elder ratman priest, ornate copper crown, carrying a basket of pulsating red meat, holding a staff of bone, radiant amber light, isolated on white background, high-quality 2D asset."
    },
    {
        id: "rat_plague_surgeon",
        name: "Хирург Амэ",
        class: "mage", level: 8, // Элита
        description: "Мастер 'спасения'. Сшивает разорванные тела крыс магией и медью. Считает, что любая форма жизни без опухоли — это 'недоразумение', которое нужно исправить хирургически.",
        visual: "Isometric fantasy unit, hunched ratman in a bloody medical apron, multiple mechanical copper arms with needles and saws, back-mounted tanks of green fluid, isolated on white background, detailed bio-punk style."
    },
    {
        id: "rat_cataphract_of_rot",
        name: "Катафракт Гнили",
        class: "paladin", level: 9, // Элита
        description: "Тяжелый кавалерист на огромной мутировавшей крысе. И всадник, и зверь закованы в медь, через которую циркулируют соки Амэ. Неостановимый таран истинной любви.",
        visual: "Isometric fantasy unit, armored ratman on a giant monstrous rat, copper plate barding with pulsing tubes, long lance dripping with ichor, majestic tattered banners, isolated on white background, 3D render style."
    },
    {
        id: "rat_herald_of_salvage",
        name: "Глашатай Спасения",
        class: "paladin", level: 10, // Суперэлита
        description: "Вершина теократии. Исполин, чье тело — храм Амэ. Он несет на плечах реликвию с куском Сердца Богини. Его появление на поле боя означает начало Лавины.",
        visual: "Isometric fantasy unit, massive ratman lord, heavy ornate copper armor, carrying a golden shrine on his back with a glowing red heart inside, massive flail made of guts and iron, holy amber aura, isolated on white background, epic cinematic lighting."
    },


    /////// wrath_and_discord


    // --- ПОДРАСА: КЕРБЕРЫ (Псовые) ---
    {
        id: "wra_ker_hound",
        name: "Гончая Раскола",
        class: "warrior", level: 3,
        description: "Быстрый четырехлапый зверь. Медные пластины вживлены в череп. Лай вызывает галлюцинации и вспышки ярости у смертных.",
        visual: "Isometric fantasy unit, demonic wolf-dog, red-black skin, copper plates bolted to spine, glowing orange eyes, jagged teeth, pouncing pose, isolated on white background."
    },
    {
        id: "wra_ker_slayer",
        name: "Растерзатель Керберов",
        class: "warrior", level: 6,
        description: "Двуногий волк-гуманоид. Использует тяжелые зазубренные цепи с крюками, чтобы выдергивать бойцов из строя фаланги.",
        visual: "Isometric fantasy unit, bipedal wolf-man, muscular, copper spikes on shoulders, wielding a long heavy chain with a hook, howling expression, isolated on white background."
    },
    {
        id: "wra_ker_alpha",
        name: "Гарм-Воевода",
        class: "paladin", level: 10, // Суперэлита
        description: "Высшая форма (Бейлор). Мастер загонной тактики. Его рык парализует волю, заставляя врагов в ужасе убивать друг друга.",
        visual: "Isometric fantasy unit, massive black-furred werewolf lord, heavy ornate obsidian armor with red trim, giant jagged claymore, red mist from armor joints, majestic pose, isolated on white background."
    },

    // --- ПОДРАСА: БУЦЕФАЛЫ (Тяжелые копытные / Кентавры) ---
    {
        id: "wra_buc_crusher",
        name: "Бык-Крушитель",
        class: "warrior", level: 5,
        description: "Могучий минотавр-мутант. Его топор-колун из черного железа способен расколоть ростовой щит вместе с защитником.",
        visual: "Isometric fantasy unit, powerful bull-man, copper breastplate, massive stone-iron axe, steam from nostrils, charging pose, isolated on white background."
    },
    {
        id: "wra_buc_herald",
        name: "Горн Раздора",
        class: "priest", level: 8,
        description: "Демонический бык, чьи рога стали медными трубами. Звук его 'музыки' заставляет сердца врагов разрываться от избытка адреналина.",
        visual: "Isometric fantasy unit, large minotaur priest, ornate copper collar, brass horn-instruments fused to his head, wearing skin robes, glowing amber runes, isolated on white background."
    },
    {
        id: "wra_buc_god_king",
        name: "Баал-Молох Разрушитель",
        class: "paladin", level: 10, // Суперэлита
        description: "Высший Пит Лорд. Четырехногий исполин-кентавр. Его тело — печь, источающая жар. Ведущий таран легионов Гнева.",
        visual: "Isometric fantasy unit, colossal four-legged bull-demon, burning horns, full bronze plate armor, giant flaming glaive, magma dripping from chest, isolated on white background."
    },

    // --- ПОДРАСА: ГЕКАТОНХЕЙРЫ (Приматы) ---
    {
        id: "wra_hek_stalker",
        name: "Прыгун Бездны",
        class: "assassin", level: 4,
        description: "Четырехрукий примат. Игнорирует вертикальные преграды, запрыгивая на стены и крыши зданий Чонгу.",
        visual: "Isometric fantasy unit, four-armed ape-demon, muscular limbs, dual obsidian daggers, leaping pose, glowing red eyes, isolated on white background."
    },
    {
        id: "wra_hek_butcher",
        name: "Мясник-Горилла",
        class: "warrior", level: 8,
        description: "Массивный примат в ламеллярной броне. В четырех руках держит по тяжелому тесаку, выкашивая целые отряды пехоты.",
        visual: "Isometric fantasy unit, massive silverback gorilla demon, four arms, heavy iron lamellar armor, wielding four thick cleavers, blood-splattered, isolated on white background."
    },
    {
        id: "wra_hek_avatar",
        name: "Шива-Разрушитель Гнева",
        class: "paladin", level: 10, // Суперэлита
        description: "Шестирукий мастер клинка. Воплощение смертельного танца. Двигается так быстро, что кажется размытым стальным вихрем.",
        visual: "Isometric fantasy unit, tall six-armed ape-humanoid demon, golden-iron armor, six different swords, flowing red silk ribbons, crown of teeth, swirling combat pose, isolated on white background."
    },

    // --- ПОДРАСА: ОСКВЕРНЕННЫЕ КЛИНКИ (Падшие) ---
    {
        id: "wra_fal_renegade",
        name: "Рыцарь Кровавой Клятвы",
        class: "paladin", level: 8,
        description: "Бывший элитный воин смертных. Сохранил разум и тактику, но наполнил их бесконечной яростью и жаждой раздора.",
        visual: "Isometric fantasy unit, fallen knight, jagged dark steel armor fused with red flesh, horned helmet, heavy mace and heater shield with a cracked skull, isolated on white background."
    },

    ////// avarice_gluttony

    {
        id: "avg_feeder_hound",
        name: "Гончая-Пожиратель",
        class: "warrior", level: 3,
        description: "Псовый демон, чья пасть разорвана до самых ушей. Он не кусает, он заглатывает куски доспехов и оружия, лишая врагов снаряжения прямо в бою.",
        visual: "Isometric fantasy unit, bloated demonic dog, golden collar, distended jaw, copper plates on belly, drooling golden ichor, isolated on white background."
    },
    {
        id: "avg_meat_carver",
        name: "Раздельщик Туш",
        class: "warrior", level: 5,
        description: "Массивный бык-демон. Вместо рук — огромные мясницкие крюки. Его задача — 'подготавливать' пленников для стола Высших, освежёвывая их магией.",
        visual: "Isometric fantasy unit, bull-demon in a blood-stained silk apron, copper jewelry, wielding two giant meat hooks, calm but terrifying expression, isolated on white background."
    },
    {
        id: "avg_silver_carrier",
        name: "Серебряный Носильщик",
        class: "warrior", level: 6,
        description: "Многорукая горилла, чья кожа покрыта слоем расплавленного серебра. Таскает на себе огромные блюда, которые использует как ростовые щиты.",
        visual: "Isometric fantasy unit, silver-skinned ape demon, four arms, holding two massive ornate silver platters, gold chains, defensive stance, isolated on white background."
    },
    {
        id: "avg_gluttony_monk",
        name: "Монах Бесконечного Пира",
        class: "priest", level: 7,
        description: "Копытный демон-баран в шелковой рясе. Его молитвы вызывают у врагов приступы дикого голода, заставляя их бросать мечи и начинать есть землю или друг друга.",
        visual: "Isometric fantasy unit, ram-demon priest, lavish purple robes, holding a golden chalice and a bone spoon, aura of greasy yellow mist, isolated on white background."
    },

    // --- ВЫСШИЕ (Женщины-Хозяйки и Гурманы) ---
    {
        id: "avg_silk_strangler",
        name: "Шелковая Душительница",
        class: "assassin", level: 7,
        description: "Суккуб, чьи одежды — живой разумный шелк. Ткань сама обвивает шеи врагов, пока демонесса неспешно пьет вино из их страха.",
        visual: "Isometric fantasy unit, slender female demon, dress of flowing sentient red silk, golden tiara, calm face, silk ribbons strangling a ghostly figure, isolated on white background."
    },
    {
        id: "avg_ambrosia_mage",
        name: "Ведьма Нектара",
        class: "mage", level: 8,
        description: "Маг, превращающий кровь в сладкое вино. Враги умирают с блаженной улыбкой, пока их вены кристаллизуются в сахар.",
        visual: "Isometric fantasy unit, beautiful female demon, holding a crystal amphora, swirling wine-colored magic, dress made of grapes and gold, isolated on white background."
    },
    {
        id: "avg_velvet_collector",
        name: "Коллекционерка Мгновений",
        class: "assassin", level: 9,
        description: "Элита Алчности. Крадет не вещи, а таланты. Ударив воина, она забирает его навык фехтования, оставляя его беспомощным ребенком.",
        visual: "Isometric fantasy unit, elegant demoness in a black velvet gown, holding a golden cage with a flickering soul inside, thin rapier of light, isolated on white background."
    },
    {
        id: "avg_palace_steward",
        name: "Управительница Палат",
        class: "priest", level: 9,
        description: "Правая рука Матриарха. Заведует 'налогом на жизнь'. Ее присутствие высасывает золото из кошельков и магию из артефактов в радиусе мили.",
        visual: "Isometric fantasy unit, tall female demon, massive baroque wig with gems, silver scales on skin, holding a giant golden key and a ledger, isolated on white background."
    },
    {
        id: "avg_brand_ambassador",
        name: "Амбассадор Роскоши",
        class: "assassin", level: 6,
        description: "Безупречно красивая женщина или мужчина. Не атакует оружием. Просто своим присутствием вызывает у врагов жгучее желание обладать тем, что на нем надето. Противник бросает меч, чтобы сорвать золотую брошь — и в этот момент его убивают.",
        visual: "Isometric fantasy unit, stunningly dressed demon in haute couture silk, gold filigree jewelry, holding a glass of amber nectar, arrogant smile, isolated on white background."
    },
    {
        id: "avg_debt_collector",
        name: "Коллектор Реальности",
        class: "warrior", level: 8,
        description: "Рыцарь в доспехах из платины. Он приходит забирать 'долги'. Его удары не ранят плоть, они 'изымают' у врага его ману, его удачу или его память, превращая их в золотые слитки.",
        visual: "Isometric fantasy unit, tall knight in smooth platinum plate armor, no visor, holding a scepter that looks like a scale, calm majestic walk, isolated on white background."
    },
    {
        id: "avg_golden_matriarch_boss",
        name: "Председательница Сейма",
        class: "mage", level: 10,
        description: "Сам Лидер Аспекта. Выглядит как вершина моды и стиля. Она может купить верность любого, кроме тех, кто вообще не знает цены вещам. Она правит миром через контракты, которые невозможно разорвать.",
        visual: "Isometric fantasy unit, legendary female demon, wearing a dress made of light and liquid diamonds, floating on a throne of solid gold bullion, surrounded by spectral servants in suits, epic aura of wealth, isolated on white background."
    },
    // --- СУПЕРЭЛИТА (Воплощения) ---
    {
        id: "avg_incarnation_greed",
        name: "Императрица Пустых Карманов",
        class: "mage", level: 10,
        description: "Высшая форма Алчности. Каждое ее движение стоит жизни тысячи рабов. Она — живое воплощение дефицита: там, где она проходит, исчезает всё ценное.",
        visual: "Isometric fantasy unit, legendary female demon, dress of pure diamond light, multiple golden arms holding artifacts of fallen gods, cold divine beauty, isolated on white background."
    },


    //betrayal_deception

    // --- УКРАШЕНИЯ И АМУЛЕТЫ (Низшие-манипуляторы) ---
    {
        id: "bet_pendant_greed",
        name: "Ожерелье Сирены",
        class: "mage", level: 5,
        description: "Демон-украшение. Женщина, надевшая его, становится неотразимой, но ожерелье медленно сжимается, заставляя её предавать близких ради 'внимания' камней.",
        visual: "Isometric fantasy unit, spectral female figure, transparent skin, wearing a massive collar of glowing violet gems that look like eyes, long phantom fingers reaching out, isolated on white background."
    },
    // --- ЖЕНЩИНЫ (Искусительницы и Причины) ---
    {
        id: "bet_lady_sorrow",
        name: "Дева Забытых Клятв",
        class: "assassin", level: 7,
        description: "Демон в облике идеальной невесты или вдовы. Она — воплощение причины бросить долг. В бою её фата превращается в стальную сеть, а поцелуй стирает память о верности.",
        visual: "Isometric fantasy unit, beautiful woman in tattered black lace wedding dress, porcelain mourning mask, long silver claws hidden in sleeves, aura of dark rose petals, isolated on white background."
    },
    // --- ОРУЖИЕ (Активное Предательство) ---
    {
        id: "bet_living_blade",
        name: "Клинок Отступника",
        class: "warrior", level: 8,
        description: "Меч, внутри которого заперт архидемон. Он дарует владельцу технику бога, но в решающий момент боя 'соскальзывает', вонзаясь в спину лучшего друга владельца.",
        visual: "Isometric fantasy unit, levitating jagged longsword, blade made of dark glass with a pulsing red vein inside, hilt shaped like a screaming face, dripping black ichor, isolated on white background."
    },
    // --- ДОСПЕХИ (Защита с подвохом) ---
    {
        id: "bet_mimic_armor",
        name: "Доспех Иуды",
        class: "warrior", level: 7, // Демон-артефакт
        description: "Сверхмощный живой доспех. Дает владельцу неуязвимость, но медленно прорастает шипами внутрь, заменяя нервную систему демоническими нитями.",
        visual: "Isometric fantasy unit, empty suit of jagged black plate armor, glowing violet cracks, many internal spikes, floating above the ground, dark smoke inside, isolated on white background."
    },
    {
        id: "bet_iron_maiden_armor",
        name: "Панцирь Ложного Мученика",
        class: "paladin", level: 8,
        description: "Сверхтяжелый доспех. Делает владельца почти неуязвимым, но питается его жизненной силой, постепенно заменяя кровь носителя на жидкое проклятое серебро.",
        visual: "Isometric fantasy unit, knight in massive ornate silver armor, red silk ribbons tied to joints, chestplate has a giant weeping eye, no visible face under the helm, isolated on white background."
    },
    // --- СКАКУНЫ (Транспорт в Бездну) ---
    {
        id: "bet_nightmare_steed",
        name: "Конь Триумфатора",
        class: "warrior", level: 8,
        description: "Великолепный черный жеребец с гривой из холодного пламени. Не знает усталости, но каждый его шаг отдаляет наездника от дома и приводит прямиком в засаду Осквернителя.",
        visual: "Isometric fantasy unit, majestic black stallion, ethereal purple flames instead of mane, gold barding with runes of betrayal, glowing white eyes, hooves leaving trails of smoke, isolated on white background."
    },
    {
        id: "bet_beauty_trap",
        name: "Сирена Предательства",
        class: "assassin", level: 8,
        description: "Демон, принимающий облик идеальной женщины. Она — 'причина' предать клятву верности. В бою превращается в массу из лезвий и теней.",
        visual: "Isometric fantasy unit, stunningly beautiful figure in white silk, hiding a massive obsidian blade behind the back, half of the face is a horrific skull, isolated on white background."
    },
    {
        id: "bet_oath_breaker",
        name: "Рыцарь Сломанного Меча",
        class: "paladin", level: 9, // Суперэлита Осквернителя
        description: "Падший чемпион, чей разум полностью заменен волей проклятого меча. Он сражается с техникой величайших мастеров, но его движения — кукольные.",
        visual: "Isometric fantasy unit, tall knight in tattered regal armor, holding a shattered blade glowing with malevolent green light, erratic twitching movements, isolated on white background."
    },
    // --- СУПЕРЭЛИТА: КОРОНА (Верховная Власть) ---
    {
        id: "bet_crown_of_usurper",
        name: "Корона Самозванца",
        class: "mage", level: 10,
        description: "Высший демон-артефакт. Любой, кто наденет её, получает власть над разумами, но становится марионеткой Осквернителя. Носитель видит мир как шахматную доску, где фигуры — его друзья.",
        visual: "Isometric fantasy unit, floating ancient crown of obsidian and blood-diamonds, shadows of hands reaching from the crown to embrace a spectral head, dark throne silhouette behind, epic sinister aura, isolated on white background."
    }
];
