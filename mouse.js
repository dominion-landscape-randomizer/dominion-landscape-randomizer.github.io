var selected = false //if all expansion check boxes are checked
var mouseActionCards = []

function addMouse() {
    //check if mouse is already there
    for (c in cardsToAdd) {
        if (cardsToAdd[c].getURL() === "wayofthemouse") {
            return;
        }
    }
    //if not, add it to the end
    let table = document.getElementById('card_tbl')
    addRow("wayofthemouse", table, cardsToAdd.length, 320)
    cardsToAdd.push(new cardShapedThing("wayofthemouse", cardType.WAY))
    showCards()
    document.getElementById("mouse_parent").style.display = "block"
}

function mouseMakeActionList() {
    document.getElementById("mouse_heirloom_tbl").innerHTML = "";
    document.getElementById("mouse_rules_clarification").innerHTML = "";
    document.getElementById("mouse_artifact_tbl").innerHTML = "";
    mouseActionCards = []

    if (document.getElementById("base_check").checked) {
        mouseActionCards = mouseActionCards.concat(Base_Mouse)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Base1E_Mouse)
        }
    }
    if (document.getElementById("intrigue_check").checked) {
        mouseActionCards = mouseActionCards.concat(Intrigue_Mouse)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Intrigue1E_Mouse)
        }
    }
    if (document.getElementById("seaside_check").checked) {
        mouseActionCards = mouseActionCards.concat(Seaside_Mouse)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Seaside1E_Mouse)
        }
    }
    if (document.getElementById("alchemy_check").checked) {
        mouseActionCards = mouseActionCards.concat(Alchemy_Mouse)
    }
    if (document.getElementById("prosperity_check").checked) {
        mouseActionCards = mouseActionCards
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards
        }
    }
    if (document.getElementById("cornucopia_check").checked) {
        mouseActionCards = mouseActionCards.concat(Cornucopia_Mouse)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards
        }
    }
    if (document.getElementById("guilds_check").checked) {
        mouseActionCards = mouseActionCards.concat(Guilds_Mouse)
        if (document.getElementById("coffer_check").checked) {
            mouseActionCards = mouseActionCards.concat(GuildsCoffers_Mouse)
        }
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Guilds1E_Mouse)
        }
    }
    if (document.getElementById("hinterlands_check").checked) {
        mouseActionCards = mouseActionCards.concat(Hinterlands_Mouse)
        if (document.getElementById("1E_check").checked) {
            mouseActionCards = mouseActionCards.concat(Hinterlands1E_Mouse)
        }
    }
    if (document.getElementById("dark_ages_check").checked) {
        mouseActionCards = mouseActionCards.concat(DarkAges_Mouse)
    }
    if (document.getElementById("adventures_check").checked) {
        mouseActionCards = mouseActionCards.concat(Adventures_Mouse)
    }
    if (document.getElementById("empires_check").checked) {
        mouseActionCards = mouseActionCards.concat(Empires_Mouse)
        if (document.getElementById("victory_check").checked) {
            mouseActionCards = mouseActionCards.concat(EmpiresVP_Mouse)
        }
    }
    if (document.getElementById("nocturne_check").checked) {
        mouseActionCards = mouseActionCards.concat(Nocturne_Mouse)
    }
    if (document.getElementById("renaissance_check").checked) {
        mouseActionCards = mouseActionCards.concat(Renaissance_Mouse)
        if (document.getElementById("coffer_check").checked) {
            mouseActionCards = mouseActionCards.concat(RenaissanceCoffers_Mouse)
        }
    }
    if (document.getElementById("menagerie_check").checked) {
        mouseActionCards = mouseActionCards.concat(Menagerie_Mouse)
        if (document.getElementById("exile_check").checked) {
            mouseActionCards = mouseActionCards.concat(MenagerieExile_Mouse)
        }
        if (document.getElementById("horse_check").checked) {
            mouseActionCards = mouseActionCards.concat(MenagerieHorse_Mouse)
        }
    }
    if (document.getElementById("allies_check").checked) {
        mouseActionCards = mouseActionCards.concat(Allies_Mouse).concat(AlliesLiaison_Mouse).concat(AlliesLiaison_Mouse)
    }
    if (document.getElementById("plunder_check").checked) {
        mouseActionCards = mouseActionCards.concat(Plunder_Mouse)
    }
    if (document.getElementById("rising_sun_check").checked) {
        mouseActionCards = mouseActionCards.concat(RisingSun_Mouse)
        if (document.getElementById("debt_check").checked) {
            mouseActionCards = mouseActionCards.concat(RisingSunDebt_Mouse)
        }
    }
    if (document.getElementById("promo_check").checked) {
        mouseActionCards = mouseActionCards.concat(Promo_Mouse)
    }

    if (mouseActionCards.length > 0) { mouseChooseAction() }
    else { alert("Way of the Mouse cannot choose a card, as no expansions have been selected") }
}

function isLiaisonMouse(imageURL) {
    //check if chosen card is a liaison
    for (i in AlliesLiaison_Mouse) {
        if (imageURL === AlliesLiaison_Mouse[i]) {
            //add message
            if (imageURL === "student"){ //Ally is Student
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
    if (imageURL === "merchantcamp" || imageURL === "tent"){
        document.getElementById("mouse_rules_clarification").innerHTML = "You do not topdeck the card you played as Way of the Mouse. Command variants fail to move the set-aside card"
    }
}

function mouseChooseAction() {
    //randomly choose one card, display it
    document.getElementById("mouse_parent").style.display = "block"
    let index = Math.floor(Math.random() * mouseActionCards.length)
    let imageURL = mouseActionCards[index]
    cardImage(imageURL, document.getElementById("mouse_card"), 200, document.getElementById("mouse_icon"));
    document.getElementById("mouse_rules_clarification").innerHTML = ``;

    if (document.getElementById("allies_check").checked) {
        isLiaisonMouse(imageURL);
    }

    if (document.getElementById("nocturne_check").checked) {
        isNocturne(imageURL);
    }

    if (document.getElementById("renaissance_check").checked) {
        if (imageURL === "borderguard") {
            addRow("lantern", document.getElementById("mouse_artifact_tbl"), 0, 320)
            document.getElementById("mouse_rules_clarification").innerHTML = "The Horn is not shown, as it has no effect if a Command variant (like Mouse) plays Border Guard"
        }
        else if (imageURL === "experiment") {
            document.getElementById("mouse_rules_clarification").innerHTML = "Command variants like Way of the Mouse do not move the Experiment, so nothing is returned to its pile."
        }
    }

    if (document.getElementById("dark_ages_check").checked) {
        if (imageURL === "hermit") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse never puts Hermit in play, it is never discarded from play, and thus cannot gain a Madman"
        }
        else if (imageURL === "urchin") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse never puts Urchin in play, it cannot gain a Mercenary"
        }
    }
    
    if (document.getElementById("adventures_check").checked) {
        if (imageURL === "page" || imageURL === "peasant") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse never puts the Traveller into play, it is never discarded from play, and thus cannot be exchanged"
        }
    }

    if (document.getElementById("1E_check").checked) {
        if (imageURL === "embargo") {
            document.getElementById("mouse_rules_clarification").innerHTML = "Way of the Mouse cannot trash the set-aside Embargo, therefore it cannot distribute tokens."
        }
    }
   
    if (document.getElementById("adventures_check").checked) {
        if (imageURL === "ratcatcher" || imageURL === "guide") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As Way of the Mouse says \"leaving it there\", the Reserve card is never put on the Tavern Mat"
        }
    }
    
    if (document.getElementById("empires_check").checked) {
        if (imageURL === "farmersmarket") {
            document.getElementById("mouse_rules_clarification").innerHTML = "As there is no Farmer's Market pile, Way of the Mouse only give you +Buy."
        }
        else if (imageURL === "encampment") {
            document.getElementById("mouse_rules_clarification").innerHTML = "Command variants like Way of the Mouse do not move the Encampment, so nothing is set aside and returned to its pile."
        }
    }
}