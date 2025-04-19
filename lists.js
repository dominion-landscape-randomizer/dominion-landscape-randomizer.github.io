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

const waysDefault = [new cardShapedThing("Way_of_the_Butterfly", cardType.WAY), new cardShapedThing("Way_of_the_Chameleon", cardType.WAY), new cardShapedThing("Way_of_the_Frog", cardType.WAY), new cardShapedThing("Way_of_the_Goat", cardType.WAY), new cardShapedThing("Way_of_the_Horse", cardType.WAY), new cardShapedThing("Way_of_the_Mole", cardType.WAY), new cardShapedThing("Way_of_the_Monkey", cardType.WAY), new cardShapedThing("Way_of_the_Mouse", cardType.WAY), new cardShapedThing("Way_of_the_Mule", cardType.WAY), new cardShapedThing("Way_of_the_Otter", cardType.WAY), new cardShapedThing("Way_of_the_Owl", cardType.WAY), new cardShapedThing("Way_of_the_Ox", cardType.WAY), new cardShapedThing("Way_of_the_Pig", cardType.WAY), new cardShapedThing("Way_of_the_Rat", cardType.WAY), new cardShapedThing("Way_of_the_Seal", cardType.WAY), new cardShapedThing("Way_of_the_Sheep", cardType.WAY), new cardShapedThing("Way_of_the_Squirrel", cardType.WAY), new cardShapedThing("Way_of_the_Turtle", cardType.WAY)]
const waysExile = [new cardShapedThing("Way_of_the_Worm", cardType.WAY), new cardShapedThing("Way_of_the_Camel", cardType.WAY)]
const projectsDefault = [new cardShapedThing("Barracks", cardType.PROJECT), new cardShapedThing("Canal", cardType.PROJECT), new cardShapedThing("Capitalism", cardType.PROJECT), new cardShapedThing("Cathedral", cardType.PROJECT), new cardShapedThing("Citadel", cardType.PROJECT), new cardShapedThing("City_Gate", cardType.PROJECT), new cardShapedThing("Crop_Rotation", cardType.PROJECT), new cardShapedThing("Fair", cardType.PROJECT), new cardShapedThing("Fleet", cardType.PROJECT), new cardShapedThing("Innovation", cardType.PROJECT), new cardShapedThing("Piazza", cardType.PROJECT), new cardShapedThing("Road_Network", cardType.PROJECT), new cardShapedThing("Sewers", cardType.PROJECT), new cardShapedThing("Silos", cardType.PROJECT), new cardShapedThing("Star_Chart", cardType.PROJECT)]
const projectsCoffers = [new cardShapedThing("Academy", cardType.PROJECT), new cardShapedThing("Exploration", cardType.PROJECT), new cardShapedThing("Guildhall", cardType.PROJECT), new cardShapedThing("Pageant", cardType.PROJECT), new cardShapedThing("Sinister_Plot", cardType.PROJECT)]
const landmarksDefault = [new cardShapedThing("Bandit_Fort", cardType.LANDMARK), new cardShapedThing("Fountain", cardType.LANDMARK), new cardShapedThing("Keep", cardType.LANDMARK), new cardShapedThing("Museum", cardType.LANDMARK), new cardShapedThing("Obelisk", cardType.LANDMARK), new cardShapedThing("Orchard", cardType.LANDMARK), new cardShapedThing("Palace", cardType.LANDMARK), new cardShapedThing("Tower", cardType.LANDMARK), new cardShapedThing("Triumphal_Arch", cardType.LANDMARK), new cardShapedThing("Wall", cardType.LANDMARK), new cardShapedThing("Wolf_Den", cardType.LANDMARK)]
const landmarksVictory = [new cardShapedThing("Aqueduct", cardType.LANDMARK), new cardShapedThing("Arena", cardType.LANDMARK), new cardShapedThing("Basilica", cardType.LANDMARK), new cardShapedThing("Baths", cardType.LANDMARK), new cardShapedThing("Battlefield", cardType.LANDMARK), new cardShapedThing("Colonnade", cardType.LANDMARK), new cardShapedThing("Defiled_Shrine", cardType.LANDMARK), new cardShapedThing("Labyrinth", cardType.LANDMARK), new cardShapedThing("Tomb", cardType.LANDMARK)]
const landmarksDebtVictory = [new cardShapedThing("Mountain_Pass", cardType.LANDMARK)]
const traitsDefault = [new cardShapedThing("Cheap", cardType.TRAIT), new cardShapedThing("Fated", cardType.TRAIT), new cardShapedThing("Fawning", cardType.TRAIT), new cardShapedThing("Friendly", cardType.TRAIT), new cardShapedThing("Hasty", cardType.TRAIT), new cardShapedThing("Inherited", cardType.TRAIT), new cardShapedThing("Inspiring", cardType.TRAIT), new cardShapedThing("Nearby", cardType.TRAIT), new cardShapedThing("Patient", cardType.TRAIT), new cardShapedThing("Pious", cardType.TRAIT), new cardShapedThing("Reckless", cardType.TRAIT), new cardShapedThing("Rich", cardType.TRAIT), new cardShapedThing("Shy", cardType.TRAIT), new cardShapedThing("Tireless", cardType.TRAIT)]
const traitsLoot = [new cardShapedThing("Cursed", cardType.TRAIT)]

const avEventsDefault = [new cardShapedThing("Alms", cardType.EVENT), new cardShapedThing("Bonfire", cardType.EVENT), new cardShapedThing("Expedition", cardType.EVENT), new cardShapedThing("Mission", cardType.EVENT), new cardShapedThing("Quest", cardType.EVENT), new cardShapedThing("Save", cardType.EVENT), new cardShapedThing("Scouting_Party", cardType.EVENT), new cardShapedThing("Trade", cardType.EVENT), new cardShapedThing("Travelling_Fair", cardType.EVENT)]
const emEventsDefault = [new cardShapedThing("Advance", cardType.EVENT), new cardShapedThing("Banquet", cardType.EVENT), new cardShapedThing("Delve", cardType.EVENT), new cardShapedThing("Windfall", cardType.EVENT)]
const mgEventsDefault = [new cardShapedThing("Alliance", cardType.EVENT), new cardShapedThing("Commerce", cardType.EVENT), new cardShapedThing("Delay", cardType.EVENT), new cardShapedThing("Desperation", cardType.EVENT), new cardShapedThing("Enhance", cardType.EVENT), new cardShapedThing("Gamble", cardType.EVENT), new cardShapedThing("March", cardType.EVENT), new cardShapedThing("Populate", cardType.EVENT), new cardShapedThing("Pursue", cardType.EVENT), new cardShapedThing("Reap", cardType.EVENT), new cardShapedThing("Seize_the_Day", cardType.EVENT), new cardShapedThing("Toil", cardType.EVENT)]
const plEventsDefault = [new cardShapedThing("Avoid", cardType.EVENT), new cardShapedThing("Bury", cardType.EVENT), new cardShapedThing("Deliver", cardType.EVENT), new cardShapedThing("Journey", cardType.EVENT), new cardShapedThing("Launch", cardType.EVENT), new cardShapedThing("Maelstrom", cardType.EVENT), new cardShapedThing("Mirror", cardType.EVENT), new cardShapedThing("Prepare", cardType.EVENT), new cardShapedThing("Scrounge", cardType.EVENT)]
const rsEventsDefault = [new cardShapedThing("Amass", cardType.EVENT), new cardShapedThing("Kintsugi", cardType.EVENT), new cardShapedThing("Practice", cardType.EVENT), new cardShapedThing("Gather", cardType.EVENT), new cardShapedThing("Asceticism", cardType.EVENT), new cardShapedThing("Foresight", cardType.EVENT), new cardShapedThing("Sea_Trade", cardType.EVENT), new cardShapedThing("Receive_Tribute", cardType.EVENT)]
const promoEvents = [new cardShapedThing("Summon", cardType.EVENT)]
const eventsAdventures = [new cardShapedThing("Ball", cardType.EVENT), new cardShapedThing("Borrow", cardType.EVENT), new cardShapedThing("Ferry", cardType.EVENT), new cardShapedThing("Inheritance", cardType.EVENT), new cardShapedThing("Lost_Arts", cardType.EVENT), new cardShapedThing("Pilgrimage", cardType.EVENT), new cardShapedThing("Plan", cardType.EVENT), new cardShapedThing("Raid", cardType.EVENT), new cardShapedThing("Seaway", cardType.EVENT), new cardShapedThing("Training", cardType.EVENT)]
const eventsDebtVictory = [new cardShapedThing("Triumph", cardType.EVENT), new cardShapedThing("Wedding", cardType.EVENT)]
const emEventsDebt = [new cardShapedThing("Annex", cardType.EVENT), new cardShapedThing("Donate", cardType.EVENT), new cardShapedThing("Rush", cardType.EVENT), new cardShapedThing("Tax", cardType.EVENT)]
const eventsVictory = [new cardShapedThing("Conquest", cardType.EVENT), new cardShapedThing("Dominate", cardType.EVENT), new cardShapedThing("Pathfinding", cardType.EVENT), new cardShapedThing("Ritual", cardType.EVENT), new cardShapedThing("Salt_the_Earth", cardType.EVENT)]
const eventsExile = [new cardShapedThing("Banish", cardType.EVENT), new cardShapedThing("Enclave", cardType.EVENT), new cardShapedThing("Invest", cardType.EVENT), new cardShapedThing("Transport", cardType.EVENT)]
const eventsHorses = [new cardShapedThing("Bargain", cardType.EVENT), new cardShapedThing("Demand", cardType.EVENT), new cardShapedThing("Ride", cardType.EVENT), new cardShapedThing("Stampede", cardType.EVENT)]
const eventsLoot = [new cardShapedThing("Foray", cardType.EVENT), new cardShapedThing("Invasion", cardType.EVENT), new cardShapedThing("Looting", cardType.EVENT), new cardShapedThing("Peril", cardType.EVENT), new cardShapedThing("Prosper", cardType.EVENT)]
const rsEventsDebt = [new cardShapedThing("Continue", cardType.EVENT), new cardShapedThing("Credit", cardType.EVENT)]

const allyDefault = ["Architects%27_Guild","Band_of_Nomads","Cave_Dwellers","City-state","Coastal_Haven","Crafters%27_Guild","Desert_Guides","Family_of_Inventors","Fellowship_of_Scribes","Forest_Dwellers","Gang_of_Pickpockets","Island_Folk","League_of_Bankers","Market_Towns","Mountain_Folk","Order_of_Astrologers","Order_of_Masons","Peaceful_Cult","Plateau_Shepherds","Trappers%27_Lodge","Woodworkers%27_Guild"]
const allyLiaison = ["Circle_of_Witches","League_of_Shopkeepers"]
const prophecyDefault = ["Approaching_Army","Biding_Time","Bureaucracy","Divine_Wind","Enlightenment","Flourishing_Trade","Good_Harvest","Great_Leader","Growth","Kind_Emperor","Panic","Progress","Rapid_Expansion","Sickness"]
const prophecyDebt = ["Harsh_Winter"]
    

const expansions = ['base','intrigue','seaside','alchemy','prosperity','cornucopia','hinterlands','dark_ages','guilds','adventures','empires','nocturne','renaissance','menagerie','allies','plunder','rising_sun','promo']

//$5 non-duration action cards for Riverboat
const Base_5 = ["Bandit","Council_Room","Festival","Laboratory","Library","Market","Mine","Sentry","Witch"]
const Intrigue_5 = ["Courtier","Minion","Patrol","Replace","Torturer","Trading_Post","Upgrade"]
const Intrigue1E_5 = ["Saboteur","Tribute"]
const Seaside_5 = ["Bazaar","Treasury"]
const Seaside1E_5 = ["Explorer","Ghost_Ship"]
const Alchemy_5 = ["Apprentice"]
const Prosperity_5 = ["Charlatan","City","Magnate","Mint","Rabble","Vault"]
const Prosperity1E_5 = ["Counting_House","Mountebank"]
const Cornucopia1E_5 = ["Harvest"]
const Cornucopia_5 = ["Hunting_Party","Carnival","Ferryman","Joust","Jester"]
const Hinterlands_5 = ["Berserker","Cartographer","Haggler","Highway","Inn","Margrave","Souk","Stables","Wheelwright","Witch%27s_Hut"]
const Hinterlands1E_5 = ["Embassy","Mandarin"]
const DarkAges_5 = ["Band_of_Misfits","Bandit_Camp","Catacombs","Count","Graverobber","Junk_Dealer","Mystic","Rebuild","Rogue","Knights","Cultist"]
const Knights_5 = ["Dame_Anna","Dame_Josephine","Dame_Molly","Dame_Natalie","Dame_Sylvia","Sir_Bailey","Sir_Destry","Sir_Michael","Sir_Vander"]
const GuildsCoffers_5 = ["Baker","Butcher","Merchant_Guild","Footpad"]
const Guilds_5 = ["Journeyman","Soothsayer"]
const Adventures_5 = ["Artificer","Lost_City","Royal_Carriage","Storyteller","Wine_Merchant"]
const AdventuresTokens_5 = ["Giant"]
const Empires_5 = ["Bustling_Village","Crown","Forum","Emporium","Legionary","Wild_Hunt"]
const EmpiresVP_5 = ["Groundskeeper"]
const Nocturne_5 = ["Cursed_Village","Pooka","Sacred_Grove","Tormentor","Tragic_Hero","Werewolf"]
const Renaissance_5 = ["Old_Witch","Scholar","Seer","Treasurer"]
const RenaissanceCoffers_5 = ["Recruiter","Sculptor","Swashbuckler","Villain"]
const Menagerie_5 = ["Hunting_Lodge","Falconer","Kiln"]
const MenagerieExile_5 = ["Coven","Displace","Sanctuary"]
const MenagerieHorse_5 = ["Livery","Paddock"]
const Allies_5 = ["Barbarian","Capital_City","Galleria","Hunter","Modify","Skirmisher","Specialist","Swap","Sorceress","Elder","Sorcerer","Hill_Fort"]
const AlliesLiaison_5 = ["Emissary","Guildmaster"]
const Plunder_5 = ["First_Mate","Mining_Road","Pilgrim","Trickster","Wealthy_Village"]
const RisingSunDebt_5 = ["Gold_Mine","Imperial_Envoy","Litter"]
const RisingSunOmen_5 = ["Kitsune","Tea_House"]
const RisingSun_5 = ["Rice_Broker","Ronin","Tanuki"]
const Promo_5 = ["Avanto","Governor"]

//$2 and $3 non-duration action cards (for Way of the Mouse)
const Base_Mouse = ["Cellar","Chapel","Moat","Harbinger","Merchant","Vassal","Village","Workshop"]
const Base1E_Mouse = ["Chancellor","Woodcutter"]
const Intrigue_Mouse = ["Courtyard","Lurker","Pawn","Masquerade","Shanty_Town","Steward","Swindler","Wishing_Well"]
const Intrigue1E_Mouse = ["Secret_Chamber","Great_Hall"]
const Seaside1E_Mouse = ["Embargo","Pearl_Diver","Ambassador"]
const Seaside_Mouse = ["Native_Village","Lookout","Sea_Chart","Smugglers","Warehouse"]
const Alchemy_Mouse = ["Herbalist"]
const Prosperity1E_Mouse = ["Trade_Route"]
const Prosperity_Mouse = ["Watchtower"]
const Cornucopia_Mouse = ["Hamlet","Menagerie","Shop"]
const Cornucopia1E_Mouse = ["Fortune_Teller"]
const Hinterlands_Mouse = ["Crossroads","Develop","Guard_Dog","Oasis","Scheme"]
const Hinterlands1E_Mouse = ["Duchess","Oracle"]
const DarkAges_Mouse = ["Beggar","Squire","Vagrant","Forager","Hermit","Market_Square","Sage","Storeroom","Urchin"]
const GuildsCoffers_Mouse = ["Candlestick_Maker"]
const Guilds_Mouse = ["Stonemason","Farrier","Infirmary"]
const Guilds1E_Mouse = ["Doctor"]
const Adventures_Mouse = ["Page","Peasant","Ratcatcher","Raze","Guide","Soldier","Treasure_Hunter"]
const Empires_Mouse = ["Encampment","Patrician","Settlers","Catapult","Gladiator"]
const EmpiresVP_Mouse = ["Chariot_Race","Farmers%27_Market"]
const Nocturne_Mouse = ["Druid","Faithful_Hound","Pixie","Tracker","Fool","Leprechaun","Imp","Zombie_Apprentice","Zombie_Mason","Zombie_Spy"]
const Renaissance_Mouse = ["Border_Guard","Experiment","Improve"]
const RenaissanceCoffers_Mouse = ["Lackeys","Acting_Troupe"]
const Menagerie_Mouse = ["Black_Cat","Horse","Goatherd","Sheepdog","Snowy_Village"]
const MenagerieHorse_Mouse = ["Sleigh","Scrap"]
const MenagerieExile_Mouse = ["Camel_Train"]
const AlliesLiaison_Mouse = ["Sycophant","Underling","Student"]
const Allies_Mouse = ["Merchant_Camp","Sentinel","Town_Crier","Herb_Gatherer","Old_Map","Blacksmith","Tent","Battle_Plan"]
const Plunder_Mouse = ["Shaman"]
const RisingSun_Mouse = ["Fishmonger","Snake_Witch"]
const RisingSunDebt_Mouse = ["Craftsman","Root_Cellar"]
const Promo_Mouse = ["Black_Market"]

//Attack cards (for Approaching Army)
const Base_Attack = ["Bureaucrat","Militia","Bandit","Witch"]
const Base1E_Attack = ["Spy","Thief"]
const Intrigue_Attack = ["Swindler","Minion","Replace","Torturer"]
const Intrigue1E_Attack = ["Saboteur"]
const Seaside1E_Attack = ["Ambassador","Pirate_Ship","Sea_Hag","Ghost_Ship"]
const Seaside_Attack = ["Blockade","Cutpurse","Corsair","Sea_Witch"]
const Alchemy_Attack = ["Scrying_Pool","Familiar"]
const Prosperity_Attack = ["Clerk","Charlatan","Rabble"]
const Prosperity1E_Attack = ["Mountebank","Goons"]
const Cornucopia1E_Attack = ["Fortune_Teller"]
const Cornucopia_Attack = ["Young_Witch","Jester"]
const Hinterlands1E_Attack = ["Oracle","Noble_Brigand"]
const Hinterlands_Attack = ["Berserker","Cauldron","Margrave","Witch%27s_Hut"]
const DarkAges_Attack = ["Urchin","Pillage","Rogue","Knights","Marauder","Cultist"]
const Guilds1E_Attack = ["Taxman"]
const Guilds_Attack = ["Soothsayer","Footpad"]
const Adventures_Attack = ["Haunted_Woods","Swamp_Hag"]
const AdventuresTokens_Attack = ["Bridge_Troll","Giant","Relic"] 
const Empires_Attack = ["Catapult_Rocks","Enchantress","Legionary"]
const Nocturne_Attack = ["Skulk","Idol","Tormentor","Vampire","Werewolf","Raider"]
const Renaissance_Attack = ["Old_Witch"]
const RenaissanceCoffer_Attack = ["Villain"]
const Menagerie_Attack = ["Black_Cat"]
const MenagerieExile_Attack = ["Cardinal","Coven","Gatekeeper"]
const Allies_Attack = ["Barbarian","Highwayman","Skirmisher"]
const Plunder_Attack = ["Siren","Cutthroat","Frigate","Trickster"]
const RisingSun_Attack = ["Snake_Witch","Ninja","Samurai"]
const RisingSunOmen_Attack = ["Kitsune"]