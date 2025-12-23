var threeButton
var boonButton
var hexButton
var numBoons = 0
var numHexes = 0
var boonsDeck = ["The_Earth%27s_Gift","The_Field%27s_Gift","The_Flame%27s_Gift","The_Forest%27s_Gift","The_Moon%27s_Gift","The_Mountain%27s_Gift","The_River%27s_Gift","The_Sea%27s_Gift","The_Sky%27s_Gift","The_Sun%27s_Gift","The_Swamp%27s_Gift","The_Wind%27s_Gift"]
var hexDeck = ["Bad_Omens","Delusion","Envy","Famine","Fear","Greed","Haunting","Locusts","Misery","Plague","Poverty","War"]

function hideBoon() {
    document.getElementById("3_Boons").style.display = "none";
    document.getElementById("1_Boon").style.display = "none";
    document.getElementById("Hex").style.display = "none";
    document.getElementById("boon_div").style.display = "none";
    document.getElementById("hex_div").style.display = "none";
}

function showBoon() {
    numBoons = 0
    document.getElementById("boon_count").innerHTML = "Boons left in deck: 12"
    var x = document.getElementById("boon_div")
    var t = document.getElementById("boon_tbl")
    t.innerHTML = "";
    t.style.display = "block";
    x.style.display = "block";
}

function showHex() {
    numHexes = 0
    document.getElementById("hex_count").innerHTML = "Hexes left in deck: 12"
    var x = document.getElementById("hex_div")
    var t = document.getElementById("hex_tbl")
    t.innerHTML = "";
    t.style.display = "block";
    x.style.display = "block";
}

function isNocturne(imageURL) {
    hex = false;
    switch (imageURL) {
        case "druid":
            threeButton = document.getElementById("3_Boons");
            threeButton.innerHTML = "3 New Boons"
            threeButton.style.display = "inline"
            showBoon()
            receiveBoons(3, 0)
            break;
        case "tracker":
            boonButton = document.getElementById("1_Boon");
            boonButton.style.display = "inline"
            showBoon()
            addRow("pouch", document.getElementById("mouse_heirloom_tbl"), 0, 200)
            document.getElementById("mouse_rules_clarification").innerHTML = "All players start with a Pouch instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it."
            break;
        case "fool":
            threeButton = document.getElementById("3_Boons");
            threeButton.innerHTML = "Receive 3 Boons"
            threeButton.style.display = "inline"
            boonButton = document.getElementById("1_Boon");
            boonButton.style.display = "inline"
            showBoon()
            addRow("lostinthewoods", document.getElementById("state_tbl_b"), 0, 320)
            addRow("luckycoin", document.getElementById("mouse_heirloom_tbl"), 0, 200)
            document.getElementById("mouse_rules_clarification").innerHTML = "All players start with a Lucky Coin instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it."
            break;
        case "leprechaun":
            hexButton = document.getElementById("Hex");
            hexButton.style.display = "inline"
            showHex()
            document.getElementById("hex_count").innerHTML = "Hexes left in deck: 12"
            addRow("wish", document.getElementById("mouse_heirloom_tbl"), 0, 200)
            break;
        case "pixie":
            addRow("goat", document.getElementById("mouse_heirloom_tbl"), 0, 200)
            document.getElementById("mouse_rules_clarification").innerHTML = "Way of the Mouse cannot trash the set-aside Pixie, therefore it cannot receive Boons.<br>All players start with a Goat instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it."
            //hideboons
            break;
        case "secretcave":
            let heirloomTable = document.getElementById("mouse_heirloom_tbl")
            addRow("magiclamp", heirloomTable, 0, 200)
            addRow("wish", heirloomTable, 1, 200)
            document.getElementById("mouse_rules_clarification").innerHTML = "All players start with a Magic Lamp instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it, and use blank cards for Wishes (the Wish pile has 12 cards)."
            break;
        case "pooka":
            addRow("cursedgold", document.getElementById("riverboat_heirloom_tbl"), 0, 200)
            document.getElementById("riverboat_rules_clarification").innerHTML = "All players start with a Cursed Gold instead of one starting copper. If you don't have Nocturne, you can use some other card to represent it."
            break;
        case "tormentor":
            document.getElementById("riverboat_rules_clarification").innerHTML = "Riverboat is in play, therefore no Imps can be gained."
            hexButton = document.getElementById("Hex");
            hexButton.style.display = "inline"
            showHex()
            document.getElementById("hex_count").innerHTML = "Hexes left in deck: 12"
            break;
        case "sacredgrove":
            boonButton = document.getElementById("1_Boon");
            boonButton.style.display = "inline"
            showBoon()
            break;
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

function receiveBoons(n, i){
    if (numBoons === 0) numBoons = 12
    if (numBoons === 12){
        boonsDeck = shuffleBoons(boonsDeck)
    }
    numBoons--    

    document.getElementById("boon_count").innerHTML = "Boons left in deck: " + numBoons
    //display Will-o'-Wisp if relevant Boon revealed. Will stay out unless a new action card is chosen
    //(So that players can see the instructions for the rest of the game)
    if (boonsDeck[numBoons] === "theswampsgift"){
        addRow("willowisp", document.getElementById("mouse_heirloom_tbl"), 1, 200)
    }

    addRow(boonsDeck[numBoons], document.getElementById("boon_tbl"), i, 320)
    if (n > 1) receiveBoons(n-1, i+1)
}

//if the deck is empty, reshuffle the deck. Otherwise, add one hex at index i. 
function receiveHex(){
    if (numHexes === 0) numHexes = 12
    if (numHexes === 12){
        hexDeck = shuffleBoons(hexDeck)
    }
    numHexes--

    document.getElementById("hex_count").innerHTML = "Hexes left in deck: " + numHexes
    let state_table = document.getElementById("state_tbl_h");
    //display state relevant to Hex that was just received.
    //Will stay out unless a new action card is chosen
    if (state_table.rows.length < 4){
        if (hexDeck[numHexes] == "misery") {
            addRow("miserable", state_table, -1, 320)
            addRow("twicemiserable", state_table, -1, 320)
        }
        else if (hexDeck[numHexes] == "delusion") addRow("deluded", state_table, -1, 320)
        else if (hexDeck[numHexes] == "envy") addRow("envious", state_table, -1, 320)    
    }

    addRow(hexDeck[numHexes], document.getElementById("hex_tbl"), 0, 320)
}

function connectNocturneButtons(){
    document.getElementById("3_Boons").addEventListener('click', function(){
        receiveBoons(3, 0)
    })
    document.getElementById("1_Boon").addEventListener('click', function(){
        document.getElementById("boon_tbl").innerHTML = ""
        receiveBoons(1, 0)
    })
    document.getElementById("Hex").addEventListener('click', function(){
        receiveHex(1, 0)
    })
}