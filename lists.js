const cardType = Object.freeze({
    EVENT: String('Event'),
    LANDMARK: String('Landmark'),
    PROJECT: String('Project'),
    WAY: String('Way'),
    ALLY: String('Ally'),
    TRAIT: String('Trait'),
    PROPHECY: String('Prophecy')
})

class cardShapedThing{
    constructor(url, type){
          this.URL = url
          this.TYPE = type
    }
    getURL(){
          return this.URL
    }
    getType(){
          return this.TYPE
    }
}

const types = ['Event','Landmark','Project','Way','Trait']
const checks = ['victory_check', 'adventures_token_check', 'debt_check', 'coffer_check', 'exile_check', 'horse_check', 'liaison_check', 'loot_check']
const counters = ['Total_count', 'Event_min', 'Event_max', 'Landmark_min', 'Landmark_max', 'Project_min', 'Project_max', 'Way_min', 'Way_max', 'Trait_min', 'Trait_max', 'Ally_min', 'Ally_max']

//Constant arrays containing objects of each card
//image URL from the DominionStrategyWiki

const waysDefault = [new cardShapedThing("c/cb/Way_of_the_Butterfly", cardType.WAY), new cardShapedThing("3/3c/Way_of_the_Chameleon", cardType.WAY), new cardShapedThing("4/4c/Way_of_the_Frog", cardType.WAY), new cardShapedThing("5/5a/Way_of_the_Goat", cardType.WAY), new cardShapedThing("1/13/Way_of_the_Horse", cardType.WAY), new cardShapedThing("d/d9/Way_of_the_Mole", cardType.WAY), new cardShapedThing("1/13/Way_of_the_Monkey", cardType.WAY), new cardShapedThing("2/29/Way_of_the_Mouse", cardType.WAY), new cardShapedThing("b/bf/Way_of_the_Mule", cardType.WAY), new cardShapedThing("8/86/Way_of_the_Otter", cardType.WAY), new cardShapedThing("2/2f/Way_of_the_Owl", cardType.WAY), new cardShapedThing("a/a4/Way_of_the_Ox", cardType.WAY), new cardShapedThing("b/bf/Way_of_the_Pig", cardType.WAY), new cardShapedThing("9/92/Way_of_the_Rat", cardType.WAY), new cardShapedThing("b/b3/Way_of_the_Seal", cardType.WAY), new cardShapedThing("3/3c/Way_of_the_Sheep", cardType.WAY), new cardShapedThing("8/82/Way_of_the_Squirrel", cardType.WAY), new cardShapedThing("d/d1/Way_of_the_Turtle", cardType.WAY)]
const waysExile = [new cardShapedThing("e/ec/Way_of_the_Worm", cardType.WAY), new cardShapedThing("8/8c/Way_of_the_Camel", cardType.WAY)]
const projectsDefault = [new cardShapedThing("8/8d/Barracks", cardType.PROJECT), new cardShapedThing("0/09/Canal", cardType.PROJECT), new cardShapedThing("3/3d/Capitalism", cardType.PROJECT), new cardShapedThing("c/c5/Cathedral", cardType.PROJECT), new cardShapedThing("a/a2/Citadel", cardType.PROJECT), new cardShapedThing("1/11/City_Gate", cardType.PROJECT), new cardShapedThing("1/15/Crop_Rotation", cardType.PROJECT), new cardShapedThing("7/77/Fair", cardType.PROJECT), new cardShapedThing("2/29/Fleet", cardType.PROJECT), new cardShapedThing("f/f3/Innovation", cardType.PROJECT), new cardShapedThing("e/e3/Piazza", cardType.PROJECT), new cardShapedThing("f/f2/Road_Network", cardType.PROJECT), new cardShapedThing("8/84/Sewers", cardType.PROJECT), new cardShapedThing("a/a2/Silos", cardType.PROJECT), new cardShapedThing("0/07/Star_Chart", cardType.PROJECT)]
const projectsCoffers = [new cardShapedThing("d/d9/Academy", cardType.PROJECT), new cardShapedThing("8/8f/Exploration", cardType.PROJECT), new cardShapedThing("7/71/Guildhall", cardType.PROJECT), new cardShapedThing("b/bc/Pageant", cardType.PROJECT), new cardShapedThing("0/07/Sinister_Plot", cardType.PROJECT)]
const landmarksDefault = [new cardShapedThing("4/42/Bandit_Fort", cardType.LANDMARK), new cardShapedThing("e/ee/Fountain", cardType.LANDMARK), new cardShapedThing("4/4b/Keep", cardType.LANDMARK), new cardShapedThing("b/b2/Museum", cardType.LANDMARK), new cardShapedThing("c/c6/Obelisk", cardType.LANDMARK), new cardShapedThing("8/80/Orchard", cardType.LANDMARK), new cardShapedThing("c/c4/Palace", cardType.LANDMARK), new cardShapedThing("2/29/Tower", cardType.LANDMARK), new cardShapedThing("7/7a/Triumphal_Arch", cardType.LANDMARK), new cardShapedThing("6/67/Wall", cardType.LANDMARK), new cardShapedThing("c/ca/Wolf_Den", cardType.LANDMARK)]
const landmarksVictory = [new cardShapedThing("3/3f/Aqueduct", cardType.LANDMARK), new cardShapedThing("3/36/Arena", cardType.LANDMARK), new cardShapedThing("5/54/Basilica", cardType.LANDMARK), new cardShapedThing("a/a9/Baths", cardType.LANDMARK), new cardShapedThing("b/b0/Battlefield", cardType.LANDMARK), new cardShapedThing("e/e3/Colonnade", cardType.LANDMARK), new cardShapedThing("d/dd/Defiled_Shrine", cardType.LANDMARK), new cardShapedThing("c/c0/Labyrinth", cardType.LANDMARK), new cardShapedThing("7/71/Tomb", cardType.LANDMARK)]
const landmarksDebtVictory = [new cardShapedThing("d/d5/Mountain_Pass", cardType.LANDMARK)]
const eventsDefault = [new cardShapedThing("3/37/Advance", cardType.EVENT), new cardShapedThing("7/79/Alliance", cardType.EVENT), new cardShapedThing("a/ac/Alms", cardType.EVENT), new cardShapedThing("2/2e/Avoid", cardType.EVENT), new cardShapedThing("e/e4/Banquet", cardType.EVENT), new cardShapedThing("9/90/Bonfire", cardType.EVENT), new cardShapedThing("0/04/Bury", cardType.EVENT), new cardShapedThing("4/4d/Commerce", cardType.EVENT), new cardShapedThing("1/16/Delay", cardType.EVENT), new cardShapedThing("7/7e/Deliver", cardType.EVENT), new cardShapedThing("9/9d/Delve", cardType.EVENT), new cardShapedThing("4/45/Desperation", cardType.EVENT), new cardShapedThing("7/7b/Enhance", cardType.EVENT), new cardShapedThing("e/e3/Expedition", cardType.EVENT), new cardShapedThing("e/ec/Gamble", cardType.EVENT), new cardShapedThing("3/31/Journey", cardType.EVENT), new cardShapedThing("c/c1/Launch", cardType.EVENT),
new cardShapedThing("d/dd/Maelstrom", cardType.EVENT), new cardShapedThing("c/cf/March", cardType.EVENT), new cardShapedThing("5/52/Mirror", cardType.EVENT), new cardShapedThing("3/34/Mission", cardType.EVENT), new cardShapedThing("6/6a/Populate", cardType.EVENT), new cardShapedThing("1/19/Prepare", cardType.EVENT), new cardShapedThing("9/9f/Pursue", cardType.EVENT), new cardShapedThing("3/36/Quest", cardType.EVENT), new cardShapedThing("9/9f/Reap", cardType.EVENT), new cardShapedThing("2/2e/Save", cardType.EVENT), new cardShapedThing("b/b2/Scouting_Party", cardType.EVENT), new cardShapedThing("8/8e/Scrounge", cardType.EVENT), new cardShapedThing("c/cb/Seize_the_Day", cardType.EVENT), new cardShapedThing("e/ee/Summon", cardType.EVENT), new cardShapedThing("e/e4/Toil", cardType.EVENT), new cardShapedThing("9/9d/Trade", cardType.EVENT), new cardShapedThing("b/be/Travelling_Fair", cardType.EVENT), new cardShapedThing("f/f8/Windfall", cardType.EVENT)]
const eventsDebtVictory = [new cardShapedThing("c/c9/Triumph", cardType.EVENT), new cardShapedThing("b/b6/Wedding", cardType.EVENT)]
const eventsDebt = [new cardShapedThing("b/be/Annex", cardType.EVENT), new cardShapedThing("4/42/Donate", cardType.EVENT), new cardShapedThing("f/fb/Rush", cardType.EVENT), new cardShapedThing("9/9d/Tax", cardType.EVENT)]
const eventsVictory = [new cardShapedThing("0/08/Conquest", cardType.EVENT), new cardShapedThing("c/c9/Dominate", cardType.EVENT), new cardShapedThing("2/28/Pathfinding", cardType.EVENT), new cardShapedThing("d/d1/Ritual", cardType.EVENT), new cardShapedThing("6/66/Salt_the_Earth", cardType.EVENT)]
const eventsAdventures = [new cardShapedThing("d/df/Ball", cardType.EVENT), new cardShapedThing("8/88/Borrow", cardType.EVENT), new cardShapedThing("d/d9/Ferry", cardType.EVENT), new cardShapedThing("0/02/Inheritance", cardType.EVENT), new cardShapedThing("4/4b/Lost_Arts", cardType.EVENT), new cardShapedThing("e/ee/Pilgrimage", cardType.EVENT), new cardShapedThing("2/2c/Plan", cardType.EVENT), new cardShapedThing("8/89/Raid", cardType.EVENT), new cardShapedThing("d/df/Seaway", cardType.EVENT), new cardShapedThing("9/99/Training", cardType.EVENT)]
const eventsExile = [new cardShapedThing("9/91/Banish", cardType.EVENT), new cardShapedThing("c/c3/Enclave", cardType.EVENT), new cardShapedThing("e/e3/Invest", cardType.EVENT), new cardShapedThing("7/76/Transport", cardType.EVENT)]
const eventsHorses = [new cardShapedThing("f/fb/Bargain", cardType.EVENT), new cardShapedThing("b/b7/Demand", cardType.EVENT), new cardShapedThing("b/bb/Ride", cardType.EVENT), new cardShapedThing("d/d9/Stampede", cardType.EVENT)]
const eventsLoot = [new cardShapedThing("7/70/Foray", cardType.EVENT), new cardShapedThing("8/84/Invasion", cardType.EVENT), new cardShapedThing("f/f3/Looting", cardType.EVENT), new cardShapedThing("b/b5/Peril", cardType.EVENT), new cardShapedThing("f/ff/Prosper", cardType.EVENT)]
const traitsDefault = [new cardShapedThing("3/3d/Cheap", cardType.TRAIT), new cardShapedThing("e/e6/Fated", cardType.TRAIT), new cardShapedThing("6/63/Fawning", cardType.TRAIT), new cardShapedThing("8/81/Friendly", cardType.TRAIT), new cardShapedThing("1/1b/Hasty", cardType.TRAIT), new cardShapedThing("0/01/Inherited", cardType.TRAIT), new cardShapedThing("b/b3/Inspiring", cardType.TRAIT), new cardShapedThing("6/67/Nearby", cardType.TRAIT), new cardShapedThing("3/36/Patient", cardType.TRAIT), new cardShapedThing("f/ff/Pious", cardType.TRAIT), new cardShapedThing("0/0f/Reckless", cardType.TRAIT), new cardShapedThing("a/a7/Rich", cardType.TRAIT), new cardShapedThing("a/a5/Shy", cardType.TRAIT), new cardShapedThing("0/08/Tireless", cardType.TRAIT)]
const traitsLoot = [new cardShapedThing("a/af/Cursed", cardType.TRAIT)]
const rsEventsDefault = [new cardShapedThing("6/63/Amass", cardType.EVENT), new cardShapedThing("a/a0/Kintsugi", cardType.EVENT), new cardShapedThing("d/df/Practice", cardType.EVENT), new cardShapedThing("d/da/Gather", cardType.EVENT), new cardShapedThing("0/00/Asceticism", cardType.EVENT), new cardShapedThing("f/fd/Foresight", cardType.EVENT), new cardShapedThing("2/26/Sea_Trade", cardType.EVENT), new cardShapedThing("c/ca/Receive_Tribute", cardType.EVENT)]
const rsEventsDebt = [new cardShapedThing("d/dc/Continue", cardType.EVENT), new cardShapedThing("7/72/Credit", cardType.EVENT)]

const allyDefault = ["0/05/Architects%27_Guild","1/1b/Band_of_Nomads","e/ec/Cave_Dwellers","a/ab/City-state","0/04/Coastal_Haven","0/0d/Crafters%27_Guild","f/f7/Desert_Guides","d/d2/Family_of_Inventors","9/9c/Fellowship_of_Scribes","7/7d/Forest_Dwellers","7/79/Gang_of_Pickpockets","9/9d/Island_Folk","0/03/League_of_Bankers","f/f2/Market_Towns","b/b8/Mountain_Folk","6/60/Order_of_Astrologers","1/1b/Order_of_Masons","b/b9/Peaceful_Cult","a/a4/Plateau_Shepherds","5/5b/Trappers%27_Lodge","e/e6/Woodworkers%27_Guild"]
const allyLiaison = ["5/58/Circle_of_Witches","5/50/League_of_Shopkeepers"]
const prophecyDefault = ["2/22/Approaching_Army","1/1d/Biding_Time","6/60/Bureaucracy","c/c7/Divine_Wind","3/3b/Enlightenment","c/cb/Flourishing_Trade","f/fb/Good_Harvest","5/54/Great_Leader","0/0b/Growth","5/5d/Kind_Emperor","f/f7/Panic","b/bb/Progress","4/45/Rapid_Expansion","0/04/Sickness"]
const prophecyDebt = ["4/4f/Harsh_Winter"]
    

const expansions = ['base','intrigue','seaside','alchemy','prosperity','cornucopia','hinterlands',
'dark_ages','guilds','adventures','empires',
'nocturne','renaissance','menagerie','allies',
'plunder','rising_sun','promo']

//$5 non-duration action cards for Riverboat
const Base_5 = ["4/46/Bandit","e/e0/Council_Room","e/ec/Festival","0/0c/Laboratory","9/98/Library","7/7e/Market","8/8e/Mine","4/4c/Sentry","f/f3/Witch"]
const Intrigue_5 = ["7/7c/Courtier","4/47/Minion","c/c8/Patrol","2/27/Replace","a/a9/Torturer","3/36/Trading_Post","d/d3/Upgrade"]
const Intrigue1E_5 = ["6/60/Saboteur","0/00/Tribute"]
const Seaside_5 = ["f/f7/Bazaar","f/fd/Treasury"]
const Seaside1E_5 = ["3/3a/Explorer","0/0a/Ghost_Ship"]
const Alchemy_5 = ["2/20/Apprentice"]
const Prosperity_5 = ["f/f9/Charlatan","3/30/City","7/75/Magnate","b/bc/Mint","f/f1/Rabble","6/62/Vault"]
const Prosperity1E_5 = ["5/5d/Counting_House","8/89/Mountebank"]
const Cornucopia1E_5 = ["1/1c/Harvest"]
const Cornucopia_5 = ["a/ab/Hunting_Party","3/39/Carnival","7/77/Ferryman","b/b7/Joust","1/1b/Jester"]
const Hinterlands_5 = ["c/cc/Berserker","d/d6/Cartographer","9/96/Haggler","2/29/Highway","1/1f/Inn","0/06/Margrave","e/e1/Souk","3/35/Stables","d/d6/Wheelwright","b/bf/Witch%27s_Hut"]
const Hinterlands1E_5 = ["2/2f/Embassy","6/68/Mandarin"]
const DarkAges_5 = ["5/51/Band_of_Misfits","4/43/Bandit_Camp","c/cd/Catacombs","a/a1/Count","1/13/Graverobber","c/c2/Junk_Dealer","3/37/Mystic","f/f8/Rebuild","f/f6/Rogue","9/9a/Knights","1/18/Cultist"]
const Knights_5 = ["a/ad/Dame_Anna","d/dd/Dame_Josephine","1/10/Dame_Molly","8/85/Dame_Natalie","c/c3/Dame_Sylvia","a/a6/Sir_Bailey","1/18/Sir_Destry","2/21/Sir_Michael","3/30/Sir_Vander"]
const GuildsCoffers_5 = ["b/b9/Baker","e/ed/Butcher","a/af/Merchant_Guild","e/e8/Footpad"]
const Guilds_5 = ["8/82/Journeyman","0/01/Soothsayer"]
const Adventures_5 = ["0/01/Artificer","9/9a/Lost_City","c/cf/Royal_Carriage","6/6a/Storyteller","b/b2/Wine_Merchant"]
const AdventuresTokens_5 = ["4/4c/Giant"]
const Empires_5 = ["c/c6/Bustling_Village","9/91/Crown","1/15/Forum","f/fe/Emporium","6/64/Legionary","4/48/Wild_Hunt"]
const EmpiresVP_5 = ["3/33/Groundskeeper"]
const Nocturne_5 = ["c/c9/Cursed_Village","f/f4/Pooka","3/3a/Sacred_Grove","0/07/Tormentor","2/29/Tragic_Hero","4/4b/Werewolf"]
const Renaissance_5 = ["0/0e/Old_Witch","2/2e/Scholar","4/4b/Seer","8/87/Treasurer"]
const RenaissanceCoffers_5 = ["a/af/Recruiter","e/ee/Sculptor","4/46/Swashbuckler","7/74/Villain"]
const Menagerie_5 = ["a/a5/Hunting_Lodge","a/ad/Falconer","a/ad/Kiln"]
const MenagerieExile_5 = ["0/05/Coven","9/9f/Displace","9/94/Sanctuary"]
const MenagerieHorse_5 = ["b/b6/Livery","6/6b/Paddock"]
const Allies_5 = ["9/99/Barbarian","2/28/Capital_City","2/23/Galleria","2/2a/Hunter","d/d8/Modify","7/7f/Skirmisher","4/41/Specialist","5/50/Swap","b/b7/Sorceress","3/35/Elder","2/29/Sorcerer","d/da/Hill_Fort"]
const AlliesLiaison_5 = ["9/99/Emissary","b/ba/Guildmaster"]
const Plunder_5 = ["7/79/First_Mate","9/9b/Mining_Road","6/61/Pilgrim","8/8a/Trickster","2/20/Wealthy_Village"]
const RisingSunDebt_5 = ["c/c2/Gold_Mine","5/5e/Imperial_Envoy","6/6d/Litter"]
const RisingSunOmen_5 = ["d/dc/Kitsune","3/39/Tea_House"]
const RisingSun_5 = ["a/ac/Rice_Broker","f/f6/Ronin","7/71/Tanuki"]
const Promo_5 = ["3/36/Avanto","a/a2/Governor"]

//$2 action cards (for Way of the Mouse)
const Base_2 = ["1/1c/Cellar","2/29/Chapel","f/fe/Moat"]
const Intrigue_2 = ["3/30/Courtyard","f/f7/Lurker","0/0f/Pawn"]
const Intrigue1E_2 = ["b/b3/Secret_Chamber"]
const Seaside1E_2 = ["f/fb/Embargo","5/56/Pearl_Diver"]
const Seaside_2 = ["c/c9/Haven","4/4f/Lighthouse","6/67/Native_Village"]
const Alchemy_2 = ["2/26/Herbalist"]
const Cornucopia_2 = ["d/df/Hamlet"]
const Hinterlands_2 = ["c/cd/Crossroads"]
const Hinterlands1E_2 = ["d/df/Duchess"]
const DarkAges_2 = ["2/2f/Beggar","7/79/Squire","3/3f/Vagrant"]
const Guilds_2 = ["b/bd/Farrier","d/d2/Stonemason"]
const GuildsCoffers_2 = ["2/2c/Candlestick_Maker"]
const Adventures_2 = ["6/60/Page","7/70/Peasant","1/1d/Ratcatcher","d/d3/Raze"]
const Empires_2 = ["4/4e/Encampment","f/fb/Patrician","1/14/Settlers"]
const Nocturne_2 = ["f/f0/Druid","6/60/Faithful_Hound","f/f7/Pixie","9/9a/Tracker"]
const Renaissance_2 = ["8/88/Border_Guard","e/e8/Lackeys"]
const Menagerie_2 = ["7/77/Black_Cat"]
const MenagerieHorse_2 = ["9/92/Sleigh"]
const Allies_2 = ["d/df/Town_Crier"]
const AlliesLiaison_2 = ["4/4b/Sycophant"]
const Plunder_2 = ["2/2a/Grotto","d/d1/Shaman"]
const PlunderLoot_2 = ["0/01/Search"]
const RisingSun_2 = ["5/54/Fishmonger","d/d6/Snake_Witch"]

//$3 action cards for Mouse, Young Witch and Ferryman
const Base1E_3 = ["b/b7/Chancellor","d/d6/Woodcutter"]
const Base_3 = ["3/32/Harbinger","7/78/Merchant","0/0b/Vassal","5/5a/Village","5/50/Workshop"]
const Intrigue1E_3 = ["9/95/Great_Hall"]
const Intrigue_3 = ["0/0e/Masquerade","8/8e/Shanty_Town","8/88/Steward","e/e7/Swindler","f/f7/Wishing_Well"]
const Seaside1E_3 = ["7/74/Ambassador"]
const Seaside_3 = ["3/3b/Fishing_Village","c/c6/Lookout","3/30/Monkey","a/a7/Sea_Chart","0/05/Smugglers","6/6d/Warehouse"]
const Prosperity1E_3 = ["a/a7/Trade_Route"]
const Prosperity_3 = ["c/c2/Watchtower"]
const Cornucopia1E_3 = ["5/55/Fortune_Teller"]
const Cornucopia_3 = ["7/71/Menagerie","3/3b/Shop"]
const Hinterlands_3 = ["f/f7/Develop","c/c7/Guard_Dog","f/fc/Oasis","8/8d/Scheme"]
const Hinterlands1E_3 = ["9/97/Oracle"]
const DarkAges_3 = ["e/e6/Forager","8/8e/Hermit","f/f1/Market_Square","7/70/Sage","b/b4/Storeroom","7/74/Urchin"]
const Guilds_3 = ["a/ab/Infirmary"]
const Guilds1E_3 = ["b/b2/Doctor"]
const Adventures_3 = ["5/50/Amulet","f/fa/Caravan_Guard","1/1e/Dungeon","e/ec/Gear","e/e1/Guide"]
const Empires_3 = ["2/25/Catapult","b/bb/Enchantress","e/e9/Gladiator","3/37/Farmers%27_Market"]
const EmpiresVP_3 = ["7/7c/Chariot_Race"]
const Nocturne_3 = ["d/d2/Fool","2/23/Leprechaun","8/8d/Secret_Cave","8/8b/Zombie_Apprentice","5/59/Zombie_Mason","c/c9/Zombie_Spy"]
const RenaissanceCoffers_3 = ["9/90/Acting_Troupe"]
const Renaissance_3 = ["b/ba/Cargo_Ship","d/d3/Experiment","5/5a/Improve"]
const MenagerieExile_3 = ["1/1a/Camel_Train"]
const Menagerie_3 = ["f/ff/Goatherd","2/21/Sheepdog","7/7e/Snowy_Village"]
const MenagerieHorse_3 = ["b/b8/Scrap"]
const Allies_3 = ["c/c3/Merchant_Camp","9/90/Sentinel","f/fd/Herb_Gatherer","9/91/Old_Map","e/eb/Blacksmith","c/c9/Tent","d/d5/Battle_Plan"]
const AlliesLiaison_3 = ["a/a2/Importer","c/c6/Underling","0/01/Student"]
const Plunder_3 = ["8/80/Secluded_Shrine","6/6b/Siren","6/66/Stowaway","c/cc/Taskmaster"]
const RisingSun_3 = ["d/d8/Riverboat"]
const RisingSunDebt_3 = ["7/75/Craftsman","1/16/Root_Cellar"]
const Promo_3 = ["f/fa/Black_Market","d/df/Church"]

//TODO: $4 action cards for YW and Ferryman