var selected = true //if all expansion check boxes are checked
var actionCards = []
var mouseAlly = false; //true if an ally was added due to Mouse, and was not there originally

function addMouse() {
    //check if mosue is already there
    for (c in cardsToAdd) {
        if (cardsToAdd[c].getURL() === "2/29/Way_of_the_Mouse") {
            return;
        }
    }
    //if not, add it to the end
    let table = document.getElementById('card_tbl')
    addRow("2/29/Way_of_the_Mouse", table, cardsToAdd.length, 320)
    cardsToAdd.push(new cardShapedThing("2/29/Way_of_the_Mouse", cardType.WAY))
    showMouse()
}

function hideMouse() {
    var x = document.getElementById("mouse_div")
    x.style.display = "none";
}

function showMouse() {
    var x = document.getElementById("mouse_div")
    document.getElementById("mouse_tbl").innerHTML = "";
    document.getElementById("state_tbl").innerHTML = "";
    document.getElementById("heirloom_tbl").innerHTML = "";
    x.style.display = "block";
    hideBoon();
    readMouseStorage();
}

//reads local storage relevant to the Mouse section, and intializes their on-click event listener  s
function readMouseStorage(){
    for (item in mouseChecks){ 
        document.getElementById(mouseChecks[item]).addEventListener('click', function() {
            localStorage.setItem(mouseChecks[item], this.checked)
        })

        if (localStorage.getItem(mouseChecks[item]) === "true"){
            document.getElementById(mouseChecks[item]).checked = true
        }
        else{
            document.getElementById(mouseChecks[item]).checked = false
            console.log(false)
        }
    }
}

function selectAll() {
    if (selected) {
        for (i in expansions) {
            document.getElementById(expansions[i] + "_check").checked = false
        }
        selected = false
        document.getElementById("Expansion_Select").innerHTML = "Select All Expansions"
    }
    else {
        for (i in expansions) {
            document.getElementById(expansions[i] + "_check").checked = true
        }
        selected = true
        document.getElementById("Expansion_Select").innerHTML = "Deselect All Expansions"
    }
}

function makeActionList() {
    hideBoon();
    document.getElementById("state_tbl").innerHTML = "";
    document.getElementById("heirloom_tbl").innerHTML = "";
    document.getElementById("rules_clarification").innerHTML = "";
    actionCards = []

    if (document.getElementById("base_check").checked) {
        actionCards = actionCards.concat(base)
        if (document.getElementById("1E_check").checked) {
            actionCards = actionCards.concat(baseRemoved)
        }
    }
    if (document.getElementById("intrigue_check").checked) {
        actionCards = actionCards.concat(intrigue)
        if (document.getElementById("1E_check").checked) {
            actionCards = actionCards.concat(intrigueRemoved)
        }
    }
    if (document.getElementById("seaside_check").checked) {
        actionCards = actionCards.concat(seaside)
        if (document.getElementById("1E_check").checked) {
            actionCards = actionCards.concat(seasideRemoved)
        }
    }
    if (document.getElementById("alchemy_check").checked) {
        actionCards = actionCards.concat(alchemy)
    }
    if (document.getElementById("prosperity_check").checked) {
        actionCards = actionCards.concat(prosperity)
        if (document.getElementById("1E_check").checked) {
            actionCards = actionCards.concat(prosperityRemoved)
        }
    }
    if (document.getElementById("cornucopia_check").checked) {
        actionCards = actionCards.concat(cornucopia)
        if (document.getElementById("1E_check").checked) {
            actionCards = actionCards.concat(cornucopiaRemoved)
        }
    }
    if (document.getElementById("guilds_check").checked) {
        actionCards = actionCards.concat(guilds)
        if (document.getElementById("1E_check").checked) {
            actionCards = actionCards.concat(guildsRemoved)
        }
        if (document.getElementById("coffer_check").checked) {
            actionCards = actionCards.concat(guildsCoffers)
        }
    }
    if (document.getElementById("hinterlands_check").checked) {
        actionCards = actionCards.concat(hinterlands)
        if (document.getElementById("1E_check").checked) {
            actionCards = actionCards.concat(hinterlandsRemoved)
        }
    }
    if (document.getElementById("dark_ages_check").checked) {
        actionCards = actionCards.concat(darkAges)
    }
    if (document.getElementById("adventures_check").checked) {
        actionCards = actionCards.concat(adventures)
    }
    if (document.getElementById("empires_check").checked) {
        actionCards = actionCards.concat(empires)
    }
    if (document.getElementById("nocturne_check").checked) {
        actionCards = actionCards.concat(nocturne)
    }
    if (document.getElementById("renaissance_check").checked) {
        actionCards = actionCards.concat(renaissance)
        if (document.getElementById("coffer_check").checked) {
            actionCards = actionCards.concat(renaissanceVillagers)
        }
    }
    if (document.getElementById("menagerie_check").checked) {
        actionCards = actionCards.concat(menagerie)
        if (document.getElementById("exile_check").checked) {
            actionCards = actionCards.concat(menagerieExile)
        }
        if (document.getElementById("horse_check").checked) {
            actionCards = actionCards.concat(menagerieHorses)
        }
    }
    if (document.getElementById("allies_check").checked) {
        actionCards = actionCards.concat(allies).concat(alliesLiaisons)
    }
    if (document.getElementById("plunder_check").checked) {
        actionCards = actionCards.concat(plunder)
        if (document.getElementById("loot_check").checked) {
            actionCards = actionCards.concat(plunderLoot)
        }
    }
    if (document.getElementById("promo_check").checked) {
        actionCards = actionCards.concat(promo)
    }

    if (actionCards.length > 0) { chooseAction() }
    else { alert("Way of the Mouse cannot choose a card, as no expansions have been selected") }
}

function isLiaison(imageURL) {
    //check if chosen card is a liaison
    for (i in alliesLiaisons) {
        if (imageURL === alliesLiaisons[i]) {
            //add message
            if (i === 3){ //Ally is Student
                document.getElementById("rules_clarification").innerHTML = `As a Liaison is present, all players start the game with 1 Favor Token.
                You do not topdeck the card you played as Way of the Mouse. Command variants fail to move the set-aside Student`
            }
            else{
                document.getElementById("rules_clarification").innerHTML = `As a Liaison is present, all players start the game with 1 Favor Token.`
            }

            //check if any ally is already in the table
            for (c in cardsToAdd) {
                if (cardsToAdd[c].getType() === cardType.ALLY) {
                    return;
                }
            }
            //if not, then add one to the end
            cards = allyDefault.concat(allyLiaison)
            let index = Math.floor(Math.random() * cards.length)
            //adds it to the cards already added
            cardsToAdd.push(cards[index])
            mouseAlly = true;
            addRow(cards[index].getURL(), document.getElementById('card_tbl'), cardsToAdd.length, 320)
            return;
        }
    }
    //only reached if the card is not a Liaison
    removemouseAlly()
    if (imageURL === "c/c3/Merchant_Camp" || imageURL === "c/c9/Tent"){
        document.getElementById("rules_clarification").innerHTML = "You do not topdeck the card you played as Way of the Mouse. Command variants fail to move the set-aside card"
    }
}

function removemouseAlly() {
    //remove the ally from the table if it was only added by a Moused Liaison
    if (mouseAlly) {
        cardsToAdd.pop()
        document.getElementById('card_tbl').deleteRow(cardsToAdd.length)
    }
    mouseAlly = false;
}

function chooseAction() {
    //randomly choose one card, add it to the table
    let index = Math.floor(Math.random() * actionCards.length)
    let imageURL = actionCards[index]
    let table = document.getElementById("mouse_tbl")
    addRow(imageURL, table, 0, 200);


    if (document.getElementById("allies_check").checked) {
        isLiaison(imageURL);
    }
    else {
        removemouseAlly()
    }

    if (document.getElementById("nocturne_check").checked) {
        isNocturne(imageURL);
    }

    if (document.getElementById("renaissance_check").checked) {
        if (imageURL === "8/88/Border_Guard") {
            addRow("b/b8/Lantern", document.getElementById("state_tbl"), 0, 320)
            document.getElementById("rules_clarification").innerHTML = "The Horn is not shown, as it has no effect if a Command variant (like Mouse) plays Border Guard"
        }
    }

    if (document.getElementById("dark_ages_check").checked) {
        if (imageURL === "8/8e/Hermit") {
            document.getElementById("rules_clarification").innerHTML = "As Way of the Mouse never puts Hermit in play, it is never discarded from play, and thus cannot gain a Madman"
        }
        else if (imageURL === "7/74/Urchin") {
            document.getElementById("rules_clarification").innerHTML = "As Way of the Mouse never puts Urchin in play, it cannot gain a Mercenary"
        }
    }
    
    if (document.getElementById("adventures_check").checked) {
        if (imageURL === "6/60/Page" || imageURL === "7/70/Peasant") {
            document.getElementById("rules_clarification").innerHTML = "As Way of the Mouse never puts the Traveller into play, it is never discarded from play, and thus cannot be exchanged"
        }
    }

    if (document.getElementById("1E_check").checked) {
        if (imageURL === "f/fb/Embargo") {
            document.getElementById("rules_clarification").innerHTML = "Way of the Mouse cannot trash the set-aside Embargo, therefore it cannot distribute tokens."
        }
    }
        
    if (document.getElementById("empires_check").checked) {
        if (imageURL === "3/37/Farmers%27_Market") {
            document.getElementById("rules_clarification").innerHTML = "As there is no Farmer's Market pile, it only give you +Buy."
        }
        else if (imageURL === "4/4e/Encampment") {
            document.getElementById("rules_clarification").innerHTML = "Command variants like Way of the Mouse do not move the Encampment, so nothing is set aside and returned to its pile."
        }
    }
}