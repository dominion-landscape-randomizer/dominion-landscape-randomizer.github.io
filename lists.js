const cardType = Object.freeze({
    EVENT: String('Event'),
    LANDMARK: String('Landmark'),
    PROJECT: String('Project'),
    WAY: String('Way'),
    ALLY: String('Ally'),
    TRAIT: String('Trait'),
    PROPHESY: String('Prophesy')
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

const types = ['Event','Landmark','Project','Way','Ally','Trait']
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
const allyDefault = [new cardShapedThing("0/05/Architects%27_Guild", cardType.ALLY),new cardShapedThing("1/1b/Band_of_Nomads", cardType.ALLY),new cardShapedThing("e/ec/Cave_Dwellers", cardType.ALLY),new cardShapedThing("a/ab/City-state", cardType.ALLY),new cardShapedThing("0/04/Coastal_Haven", cardType.ALLY),new cardShapedThing("0/0d/Crafters%27_Guild", cardType.ALLY),new cardShapedThing("f/f7/Desert_Guides", cardType.ALLY),new cardShapedThing("d/d2/Family_of_Inventors", cardType.ALLY),new cardShapedThing("9/9c/Fellowship_of_Scribes", cardType.ALLY),new cardShapedThing("7/7d/Forest_Dwellers", cardType.ALLY),new cardShapedThing("7/79/Gang_of_Pickpockets", cardType.ALLY),new cardShapedThing("9/9d/Island_Folk", cardType.ALLY),new cardShapedThing("0/03/League_of_Bankers", cardType.ALLY),new cardShapedThing("f/f2/Market_Towns", cardType.ALLY),new cardShapedThing("b/b8/Mountain_Folk", cardType.ALLY),new cardShapedThing("6/60/Order_of_Astrologers", cardType.ALLY),new cardShapedThing("1/1b/Order_of_Masons", cardType.ALLY),new cardShapedThing("b/b9/Peaceful_Cult", cardType.ALLY),new cardShapedThing("a/a4/Plateau_Shepherds", cardType.ALLY),new cardShapedThing("5/5b/Trappers%27_Lodge", cardType.ALLY),new cardShapedThing("e/e6/Woodworkers%27_Guild", cardType.ALLY)]
const allyLiaison = [new cardShapedThing("5/58/Circle_of_Witches", cardType.ALLY),new cardShapedThing("5/50/League_of_Shopkeepers", cardType.ALLY)]
const traitsDefault = [new cardShapedThing("3/3d/Cheap", cardType.TRAIT), new cardShapedThing("e/e6/Fated", cardType.TRAIT), new cardShapedThing("6/63/Fawning", cardType.TRAIT), new cardShapedThing("8/81/Friendly", cardType.TRAIT), new cardShapedThing("1/1b/Hasty", cardType.TRAIT), new cardShapedThing("0/01/Inherited", cardType.TRAIT), new cardShapedThing("b/b3/Inspiring", cardType.TRAIT), new cardShapedThing("6/67/Nearby", cardType.TRAIT), new cardShapedThing("3/36/Patient", cardType.TRAIT), new cardShapedThing("f/ff/Pious", cardType.TRAIT), new cardShapedThing("0/0f/Reckless", cardType.TRAIT), new cardShapedThing("a/a7/Rich", cardType.TRAIT), new cardShapedThing("a/a5/Shy", cardType.TRAIT), new cardShapedThing("0/08/Tireless", cardType.TRAIT)]
const traitsLoot = [new cardShapedThing("a/af/Cursed", cardType.TRAIT)]
const rsEventsDefault = [new cardShapedThing("6/63/Amass", cardType.EVENT), new cardShapedThing("a/a0/Kintsugi", cardType.EVENT), new cardShapedThing("d/df/Practice", cardType.EVENT), new cardShapedThing("d/da/Gather", cardType.EVENT), ]
const rsEventsDebt = [new cardShapedThing("d/dc/Continue", cardType.EVENT), new cardShapedThing("7/72/Credit", cardType.EVENT)]

const expansions = ['base','intrigue','seaside','alchemy','prosperity','cornucopia','hinterlands',
'dark_ages','guilds','adventures','empires',
'nocturne','renaissance','menagerie','allies',
'plunder','promo']

//action cards (for Way of the Mouse)
const base = ["1/1c/Cellar","2/29/Chapel","f/fe/Moat","3/32/Harbinger","7/78/Merchant","0/0b/Vassal","5/5a/Village","5/50/Workshop"]
const baseRemoved = ["b/b7/Chancellor","d/d6/Woodcutter"]
const intrigue = ["3/30/Courtyard","f/f7/Lurker","0/0f/Pawn","0/0e/Masquerade","8/8e/Shanty_Town","8/88/Steward","e/e7/Swindler","f/f7/Wishing_Well"]
const intrigueRemoved = ["b/b3/Secret_Chamber","9/95/Great_Hall"]
const alchemy = ["2/26/Herbalist"]
const seaside = ["c/c9/Haven","4/4f/Lighthouse","6/67/Native_Village","3/3b/Fishing_Village","c/c6/Lookout","3/30/Monkey","a/a7/Sea_Chart","0/05/Smugglers","6/6d/Warehouse"]
const seasideRemoved = ["f/fb/Embargo","5/56/Pearl_Diver","7/74/Ambassador"]
const prosperity = ["c/c2/Watchtower"]
const prosperityRemoved = ["a/a7/Trade_Route"]
const cornucopia = ["d/df/Hamlet","7/71/Menagerie","3/3b/Shop"]
const cornucopiaRemoved = ["5/55/Fortune_Teller"]
const hinterlands = ["c/cd/Crossroads","f/f7/Develop","c/c7/Guard_Dog","f/fc/Oasis","8/8d/Scheme"]
const hinterlandsRemoved = ["d/df/Duchess","9/97/Oracle"]
const darkAges = ["2/2f/Beggar","7/79/Squire","3/3f/Vagrant","e/e6/Forager","8/8e/Hermit","f/f1/Market_Square","7/70/Sage","b/b4/Storeroom","7/74/Urchin"]
const guilds = ["b/bd/Farrier","d/d2/Stonemason","a/ab/Infirmary"]
const guildsCoffers = ["2/2c/Candlestick_Maker"]
const guildsRemoved = ["b/b2/Doctor"]
const adventures = ["6/60/Page","7/70/Peasant","1/1d/Ratcatcher","d/d3/Raze","5/50/Amulet","f/fa/Caravan_Guard","1/1e/Dungeon","e/ec/Gear","e/e1/Guide"]
const empires = ["4/4e/Encampment","f/fb/Patrician","1/14/Settlers","2/25/Catapult","7/7c/Chariot_Race","b/bb/Enchantress","3/37/Farmers%27_Market","e/e9/Gladiator"]
const nocturne = ["f/f0/Druid","6/60/Faithful_Hound","f/f7/Pixie","9/9a/Tracker","d/d2/Fool","2/23/Leprechaun","8/8d/Secret_Cave"]
const renaissance = ["8/88/Border_Guard","e/e8/Lackeys","b/ba/Cargo_Ship","d/d3/Experiment","5/5a/Improve"]
const renaissanceVillagers = ["9/90/Acting_Troupe"]
const menagerie = ["7/77/Black_Cat","f/ff/Goatherd","2/21/Sheepdog","7/7e/Snowy_Village"]
const menagerieHorses = ["9/92/Sleigh","b/b8/Scrap"]
const menagerieExile = ["1/1a/Camel_Train"]
const alliesLiaisons = ["4/4b/Sycophant","a/a2/Importer","c/c6/Underling","0/01/Student"]
const allies = ["c/c3/Merchant_Camp","9/90/Sentinel","f/fd/Herb_Gatherer","d/d5/Battle_Plan","c/c9/Tent","9/91/Old_Map","d/df/Town_Crier","e/eb/Blacksmith"]
const plunder = ["2/2a/Grotto","d/d1/Shaman","8/80/Secluded_Shrine","6/6b/Siren","6/66/Stowaway","c/cc/Taskmaster"]
const plunderLoot = ["0/01/Search"]
const promo = ["f/fa/Black_Market", "d/df/Church"]