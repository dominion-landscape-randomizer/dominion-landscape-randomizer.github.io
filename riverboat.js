var selected = false //if all expansion check boxes are checked
var riverboatActionCards = []

function addRiverboat() {
    //display riverboat in its spot
    let rbt = document.getElementById("riverboat_self_tbl")
    addRow("Riverboat", rbt, 0, 200)
    showCards()
    document.getElementById("riverboat_parent").style.display = "block"
}

function riverboatMakeActionList() {
    document.getElementById("riverboat_heirloom_tbl").innerHTML = "";
    document.getElementById("riverboat_rules_clarification").innerHTML = "";
    document.getElementById("riverboat_artifact_tbl").innerHTML = "";
    riverboatActionCards = []

    if (document.getElementById("base_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Base_5)
    }
    if (document.getElementById("intrigue_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Intrigue_5)
        if (document.getElementById("1E_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(Intrigue1E_5)
        }
    }
    if (document.getElementById("seaside_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Seaside_5)
        if (document.getElementById("1E_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(Seaside1E_5)
        }
    }
    if (document.getElementById("alchemy_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Alchemy_5)
    }
    if (document.getElementById("prosperity_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Prosperity_5)
        if (document.getElementById("1E_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(Prosperity1E_5)
        }
    }
    if (document.getElementById("cornucopia_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Cornucopia_5)
        if (document.getElementById("1E_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(Cornucopia1E_5)
        }
    }
    if (document.getElementById("guilds_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Guilds_5)
        if (document.getElementById("coffer_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(GuildsCoffers_5)
        }
    }
    if (document.getElementById("hinterlands_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Hinterlands_5)
        if (document.getElementById("1E_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(Hinterlands1E_5)
        }
    }
    if (document.getElementById("dark_ages_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(DarkAges_5)
    }
    if (document.getElementById("adventures_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Adventures_5)
        if (document.getElementById("adventures_token_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(AdventuresTokens_5)
        }
    }
    if (document.getElementById("empires_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Empires_5)
        if (document.getElementById("victory_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(EmpiresVP_5)
        }
    }
    if (document.getElementById("nocturne_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Nocturne_5)
    }
    if (document.getElementById("renaissance_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Renaissance_5)
        if (document.getElementById("coffer_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(RenaissanceCoffers_5)
        }
    }
    if (document.getElementById("menagerie_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Menagerie_5)
        if (document.getElementById("exile_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(MenagerieExile_5)
        }
        if (document.getElementById("horse_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(MenagerieHorse_5)
        }
    }
    if (document.getElementById("allies_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Allies_5).concat(AlliesLiaison_5)
    }
    if (document.getElementById("plunder_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Plunder_5)
        /*if (document.getElementById("loot_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(PlunderLoot_5)
        }*/
    }
    if (document.getElementById("rising_sun_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(RisingSun_5).concat(RisingSunOmen_5)
        if (document.getElementById("debt_check").checked) {
            riverboatActionCards = riverboatActionCards.concat(RisingSunDebt_5)
        }
    }
    if (document.getElementById("promo_check").checked) {
        riverboatActionCards = riverboatActionCards.concat(Promo_5)
    }

    if (riverboatActionCards.length > 0) { riverboatChooseAction() }
    else { alert("Riverboat cannot choose a card, as no expansions have been selected") }
}

function isOmen(imageURL) {
    //check if chosen card is an omen
    for (i in RisingSunOmen_5) {
        if (imageURL === RisingSunOmen_5[i]) {
            //add message
            document.getElementById("riverboat_rules_clarification").innerHTML = `If you do not already have a Prophecy out, press the Prophecy button below to add one.
            When an Omen is played, remove one token from the Prophecy. Put 5 tokens on the Prophecy for 2 players, 8 for 3 players, 10 for 4 players, 12 for 5 players, and 13 for 6 players.`
        }
    }
}

function isKnights(){
    let index = Math.floor(Math.random() * Knights_5.length)
    let imageURL = Knights_5[index]
    let table = document.getElementById("riverboat_tbl")
    addRow(imageURL, table, 0, 200);
}

function riverboatChooseAction() {
    //randomly choose one card, display it
    document.getElementById("riverboat_parent").style.display = "block"
    let index = Math.floor(Math.random() * riverboatActionCards.length)
    let imageURL = riverboatActionCards[index]
    cardImage(imageURL, document.getElementById("riverboat_card"), 200, document.getElementById("riverboat_icon"));
    document.getElementById("riverboat_rules_clarification").innerHTML = ``;


    if (document.getElementById("allies_check").checked) {
        //check if chosen card is a liaison
        for (i in AlliesLiaison_5) {
            if (imageURL === AlliesLiaison_5[i]) {
                //add message
                document.getElementById("riverboat_rules_clarification").innerHTML = `As a Liaison is present, all players start the game with 1 Favor Token.
                If you do not already have an Ally out, press the Ally button below to add one.`
            }
        }
    }

    if (document.getElementById("rising_sun_check").checked) {
        isOmen(imageURL);
    }

    if (document.getElementById("nocturne_check").checked) {
        isNocturne(imageURL);
    }

    if (document.getElementById("renaissance_check").checked) {
        if (imageURL === "Treasurer") {
            addRow("Key", document.getElementById("riverboat_artifact_tbl"), 0, 320)
        }
        else if (imageURL === "Swashbuckler") {
            addRow("Treasure_Chest", document.getElementById("riverboat_artifact_tbl"), 0, 320)
        }
    }

    if (document.getElementById("dark_ages_check").checked) {
        if (imageURL === "Knights") {
            isKnights()
        }
        else if (imageURL === "Bandit_Camp") {
            document.getElementById("riverboat_rules_clarification").innerHTML = "If you don't have Dark Ages, you can use some other card (eg. blanks) as a stand-in for Spoils"
            addRow("Spoils", document.getElementById("riverboat_heirloom_tbl"), 0, 200)
        }
    }
    
    if (document.getElementById("adventures_check").checked) {
        if (imageURL === "Royal_Carriage" || imageURL === "Wine_Merchant") {
            document.getElementById("riverboat_rules_clarification").innerHTML = "As Riverboat says \"leaving it there\", the Reserve card is never put on the Tavern Mat"
        }
    }
    
    if (document.getElementById("cornucopia_check").checked) {
        if (imageURL === "Joust") {
            document.getElementById("riverboat_rules_clarification").innerHTML = "Joust comes with a variety of Rewards. If you do not own Cornucopia & Guilds, you can see their wiki page and use different cards as stand-ins, or just choose a new Riverboat card."
        }
    }
}