var threeButton
var boonButton
var hexButton
var numBoons = 0
var hex = false;
var boonsDeck = ["e/ee/The_Earth%27s_Gift","c/c4/The_Field%27s_Gift","1/19/The_Flame%27s_Gift","6/6e/The_Forest%27s_Gift","a/a2/The_Moon%27s_Gift","1/17/The_Mountain%27s_Gift","b/b4/The_River%27s_Gift","f/f4/The_Sea%27s_Gift","9/9a/The_Sky%27s_Gift","e/eb/The_Sun%27s_Gift","c/ce/The_Swamp%27s_Gift","a/af/The_Wind%27s_Gift"]
var hexDeck = ["7/7c/Bad_Omens","e/ec/Delusion","0/08/Envy","d/d4/Famine","0/00/Fear","9/95/Greed","5/58/Haunting","0/0b/Locusts","3/31/Misery","e/e5/Plague","5/58/Poverty","5/51/War"]

function hideBoon() {
    document.getElementById("3_Boons").style.display = "none";
    document.getElementById("1_Boon").style.display = "none";
    document.getElementById("1_Hex").style.display = "none";
    var x = document.getElementById("boon_div").style.display = "none";
}

function showBoon() {
    numBoons = 0
    document.getElementById("boon_count").innerHTML = "Boons left in deck: 12"
    var x = document.getElementById("boon_div")
    document.getElementById("boon_tbl").innerHTML = "";
    x.style.display = "block";
}

function isNocturne(imageURL) {
    hex = false;
    switch (imageURL) {
        case "f/f0/Druid":
            threeButton = document.getElementById("3_Boons");
            threeButton.innerHTML = "3 New Boons"
            threeButton.style.display = "inline"
            showBoon()
            receiveBoons(3, boonsDeck, 0)
            break;
        case "9/9a/Tracker":
            boonButton = document.getElementById("1_Boon");
            boonButton.style.display = "inline"
            showBoon()
            addRow("1/18/Pouch", document.getElementById("heirloom_tbl"), 0, 200)
            document.getElementById("rules_clarification").innerHTML = "All players start with a Pouch instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it."
            break;
        case "d/d2/Fool":
            threeButton = document.getElementById("3_Boons");
            threeButton.innerHTML = "Receive 3 Boons"
            threeButton.style.display = "inline"
            boonButton = document.getElementById("1_Boon");
            boonButton.style.display = "inline"
            showBoon()
            addRow("3/3e/Lost_in_the_Woods", document.getElementById("state_tbl"), 0, 320)
            addRow("3/3e/Lucky_Coin", document.getElementById("heirloom_tbl"), 0, 200)
            document.getElementById("rules_clarification").innerHTML = "All players start with a Lucky Coin instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it."
            break;
        case "2/23/Leprechaun":
            hex = true
            hexButton = document.getElementById("1_Hex");
            hexButton.style.display = "inline"
            showBoon()
            document.getElementById("boon_count").innerHTML = "Hexes left in deck: 12"
            addRow("6/68/Wish", document.getElementById("heirloom_tbl"), 0, 200)
            break;
        case "f/f7/Pixie":
            addRow("d/da/Goat", document.getElementById("heirloom_tbl"), 0, 200)
            document.getElementById("rules_clarification").innerHTML = "Way of the Mouse cannot trash the set-aside Pixie, therefore it cannot receive Boons.<br>All players start with a Goat instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it."
            //hideboons
            break;
        case "8/8d/Secret_Cave":
            let heriloomTable = document.getElementById("heirloom_tbl")
            addRow("d/db/Magic_Lamp", heriloomTable, 0, 200)
            addRow("6/68/Wish", heriloomTable, 1, 200)
            document.getElementById("rules_clarification").innerHTML = "All players start with a Magic Lamp instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it, and use blank cards for Wishes (the Wish pile has 12 cards)."
    }
}

function shuffleBoons(deck){
    let i = deck.length - 1
    let shuffled = deck
    while (i > 0){
        //swap randomly selected card with the one at index i. Repeat for whole deck
        index = Math.floor(Math.random() * i)
        let temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
        i--
    }
    numBoons = deck.length;
    return shuffled
}

//if the deck is empty, reshuffle the deck. Otherwise, add one boon/hex at index i. 
function receiveBoons(n, deck, i){
    if (numBoons === 0) numBoons = 12
    if (numBoons === 12){
        deck = shuffleBoons(deck)
    }
    numBoons--

    if (hex){
        document.getElementById("boon_count").innerHTML = "Hexes left in deck: " + numBoons
        let state_table = document.getElementById("state_tbl");
        //display state relevant to Hex that was just received.
        //Will stay out unless a new action card is chosen
        if (state_table.rows.length < 4){
            if (deck[numBoons] == "3/31/Misery") {
                addRow("6/6b/Miserable", state_table, -1, 320)
                addRow("0/0d/Twice_Miserable", state_table, -1, 320)
            }
            else if (deck[numBoons] == "e/ec/Delusion") addRow("9/9b/Deluded", state_table, -1, 320)
            else if (deck[numBoons] == "0/08/Envy") addRow("8/8c/Envious", state_table, -1, 320)    
        }
    }
    else{
        document.getElementById("boon_count").innerHTML = "Boons left in deck: " + numBoons
        //display Will-o'-Wisp if relevant Boon revealed. Will stay out unless a new action card is chosen
        //(So that players can see the instructions for the rest of the game)
        if (deck[numBoons] === "c/ce/The_Swamp%27s_Gift"){
            addRow("4/4f/Will-o'-Wisp", document.getElementById("heirloom_tbl"), 1, 200)
        }
    }

    addRow(deck[numBoons], document.getElementById("boon_tbl"), i, 320)



    if (n > 1) receiveBoons(n-1, deck, i+1)
}

function connectNocturneButtons(){
    document.getElementById("3_Boons").addEventListener('click', function(){
        receiveBoons(3, boonsDeck, 0)
    })
    document.getElementById("1_Boon").addEventListener('click', function(){
        document.getElementById("boon_tbl").innerHTML = ""
        receiveBoons(1, boonsDeck, 0)
    })
    document.getElementById("1_Hex").addEventListener('click', function(){
        receiveBoons(1, hexDeck, 0)
    })
}