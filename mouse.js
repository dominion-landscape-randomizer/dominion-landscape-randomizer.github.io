var selected = false //if all expansion check boxes are checked
var mouseActionCards = []

function addMouse() {
    //check if mouse is already there
    for (c in cardsToAdd) {
        if (cardsToAdd[c].getURL() === "2/29/Way_of_the_Mouse") {
            return;
        }
    }
    //if not, add it to the end
    let table = document.getElementById('card_tbl')
    addRow("2/29/Way_of_the_Mouse", table, cardsToAdd.length, 320)
    cardsToAdd.push(new cardShapedThing("2/29/Way_of_the_Mouse", cardType.WAY))
    showCards()
}

function mouseMakeActionList() {
    document.getElementById("mouse_heirloom_tbl").innerHTML = "";
    document.getElementById("mouse_rules_clarification").innerHTML = "";
    document.getElementById("mouse_artifact_tbl").innerHTML = "";
    mouseActionCards = []

    if (document.getElementById("base_check").checked) {
        mouseActionCards = mouseActionCards.concat(Base_2).concat(Base_3)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Base1E_2)
        }
    }
    if (document.getElementById("intrigue_check").checked) {
        mouseActionCards = mouseActionCards.concat(Intrigue_2).concat(Intrigue_3)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Intrigue1E_2).concat(Intrigue1E_3)
        }
    }
    if (document.getElementById("seaside_check").checked) {
        mouseActionCards = mouseActionCards.concat(Seaside_2).concat(Seaside_3)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Seaside1E_2).concat(Seaside1E_3)
        }
    }
    if (document.getElementById("alchemy_check").checked) {
        mouseActionCards = mouseActionCards.concat(Alchemy_2)
    }
    if (document.getElementById("prosperity_check").checked) {
        mouseActionCards = mouseActionCards.concat(Prosperity_3)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Prosperity1E_3)
        }
    }
    if (document.getElementById("cornucopia_check").checked) {
        mouseActionCards = mouseActionCards.concat(Cornucopia_2).concat(Cornucopia_3)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Cornucopia1E_3)
        }
    }
    if (document.getElementById("guilds_check").checked) {
        mouseActionCards = mouseActionCards.concat(Guilds_2).concat(Guilds_3)
        if (document.getElementById("coffer_check").checked) {
            mouseActionCards = mouseActionCards.concat(GuildsCoffers_2)
        }
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Guilds1E_2).concat(Guilds1E_3)
        }
    }
    if (document.getElementById("hinterlands_check").checked) {
        mouseActionCards = mouseActionCards.concat(Hinterlands_2).concat(Hinterlands_3)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Hinterlands1E_2).concat(HinterlandsIE_3)
        }
    }
    if (document.getElementById("dark_ages_check").checked) {
        mouseActionCards = mouseActionCards.concat(DarkAges_2).concat(DarkAges_3)
    }
    if (document.getElementById("adventures_check").checked) {
        mouseActionCards = mouseActionCards.concat(Adventures_2).concat(Adventures_3)
    }
    if (document.getElementById("empires_check").checked) {
        mouseActionCards = mouseActionCards.concat(Empires_2).concat(Empires_3)
        if (document.getElementById("victory_check").checked) {
            mouseActionCards = mouseActionCards.concat(EmpiresVP_3)
        }
    }
    if (document.getElementById("nocturne_check").checked) {
        mouseActionCards = mouseActionCards.concat(Nocturne_2).concat(Nocturne_3)
    }
    if (document.getElementById("renaissance_check").checked) {
        mouseActionCards = mouseActionCards.concat(Renaissance_2).concat(Renaissance_3)
        if (document.getElementById("coffer_check").checked) {
            mouseActionCards = mouseActionCards.concat(RenaissanceCoffers_3)
        }
    }
    if (document.getElementById("menagerie_check").checked) {
        mouseActionCards = mouseActionCards.concat(Menagerie_2).concat(Menagerie_3)
        if (document.getElementById("exile_check").checked) {
            mouseActionCards = mouseActionCards.concat(MenagerieExile_3)
        }
        if (document.getElementById("horse_check").checked) {
            mouseActionCards = mouseActionCards.concat(MenagerieHorse_2).concat(MenagerieHorse_3)
        }
    }
    if (document.getElementById("allies_check").checked) {
        mouseActionCards = mouseActionCards.concat(Allies_2).concat(Allies_3).concat(AlliesLiaison_3).concat(AlliesLiaison_2)
    }
    if (document.getElementById("plunder_check").checked) {
        mouseActionCards = mouseActionCards.concat(Plunder_2).concat(Plunder_3)
        if (document.getElementById("loot_check").checked) {
            mouseActionCards = mouseActionCards.concat(PlunderLoot_2)
        }
    }
    if (document.getElementById("rising_sun_check").checked) {
        mouseActionCards = mouseActionCards.concat(RisingSun_2).concat(RisingSun_3)
        if (document.getElementById("debt_check").checked) {
            mouseActionCards = mouseActionCards.concat(RisingSunDebt_3)
        }
    }
    if (document.getElementById("promo_check").checked) {
        mouseActionCards = mouseActionCards.concat(Promo_3)
    }

    if (mouseActionCards.length > 0) { mouseChooseAction() }
    else { alert("Way of the Mouse cannot choose a card, as no expansions have been selected") }
}

function isLiaisonMouse(imageURL) {
    //check if chosen card is a liaison
    if (imageURL === "4/4b/Sycophant"){
        document.getElementById("mouse_rules_clarification").innerHTML = `As a Liaison is present, all players start the game with 1 Favor Token.
        If you do not already have an Ally out, press the Ally button below to add one.`
        return;
    }
    for (i in AlliesLiaison_3) {
        if (imageURL === AlliesLiaison_3[i]) {
            //add message
            if (i === 2){ //Ally is Student
                document.getElementById("mouse_rules_clarification").innerHTML = `As a Liaison is present, all players start the game with 1 Favor Token.
                If you do not already have an Ally out, press the Ally button below to add one.
                You do not topdeck the card you played as Way of the Mouse. Command variants fail to move the set-aside Student`
                return;
            }
            else{
                document.getElementById("mouse_rules_clarification").innerHTML = `As a Liaison is present, all players start the game with 1 Favor Token.
                If you do not already have an Ally out, press the Ally button below to add one.`
                return;
            }
        }
    }
    //only reached if the card is not a Liaison
    if (imageURL === "c/c3/Merchant_Camp" || imageURL === "c/c9/Tent"){
        document.getElementById("mouse_rules_clarification").innerHTML = "You do not topdeck the card you played as Way of the Mouse. Command variants fail to move the set-aside card"
    }
}

function mouseChooseAction() {
    //randomly choose one card, add it to the table
    let index = Math.floor(Math.random() * mouseActionCards.length)
    let imageURL = mouseActionCards[index]
    let table = document.getElementById("mouse_tbl")
    addRow(imageURL, table, 0, 200);

    if (document.getElementById("allies_check").checked) {
        isLiaisonMouse(imageURL);
    }

    if (document.getElementById("nocturne_check").checked) {
        isNocturne(imageURL);
    }

    if (document.getElementById("renaissance_check").checked) {
        if (imageURL === "8/88/Border_Guard") {
            addRow("b/b8/Lantern", document.getElementById("mouse_artifact_tbl"), 0, 320)
            document.getElementById("mouse_rules_clarification").innerHTML = "The Horn is not shown, as it has no effect if a Command variant (like Mouse) plays Border Guard"
        }
    }

    if (document.getElementById("dark_ages_check").checked) {
        if (imageURL === "8/8e/Hermit") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse never puts Hermit in play, it is never discarded from play, and thus cannot gain a Madman"
        }
        else if (imageURL === "7/74/Urchin") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse never puts Urchin in play, it cannot gain a Mercenary"
        }
    }
    
    if (document.getElementById("adventures_check").checked) {
        if (imageURL === "6/60/Page" || imageURL === "7/70/Peasant") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse never puts the Traveller into play, it is never discarded from play, and thus cannot be exchanged"
        }
    }

    if (document.getElementById("1E_check").checked) {
        if (imageURL === "f/fb/Embargo") {
            document.getElementById("mouse_rules_clarification").innerHTML = "Way of the Mouse cannot trash the set-aside Embargo, therefore it cannot distribute tokens."
        }
    }
   
    if (document.getElementById("adventures_check").checked) {
        if (imageURL === "1/1d/Ratcatcher" || imageURL === "e/e1/Guide") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse says \"leaving it there\", the Reserve card is never put on the Tavern Mat"
        }
    }
    
    if (document.getElementById("empires_check").checked) {
        if (imageURL === "3/37/Farmers%27_Market") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As there is no Farmer's Market pile, Way of the Mouse only give you +Buy."
        }
        else if (imageURL === "4/4e/Encampment") {
            document.getElementById("mouse_rules_clarification").innerHTML = "Command variants like Way of the Mouse do not move the Encampment, so nothing is set aside and returned to its pile."
        }
    }

    if (document.getElementById("plunder_check").checked) {
        if (imageURL === "0/01/Search") {
            document.getElementById("mouse_rules_clarification").innerHTML = "The card you play as Mouse will stay in play until a pile empties. It does not trash itself (instead it gets discarded), but you do gain a Loot."
        }
        else if (imageURL === "c/cc/Taskmaster") {
            document.getElementById("mouse_rules_clarification").innerHTML = "The card you play as Mouse will stay in play as long as you keep gaining $2 cards, repeating Taskmaster's ability each turn."
        }
    }
}