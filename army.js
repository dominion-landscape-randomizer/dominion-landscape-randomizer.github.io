var selected = false //if all expansion check boxes are checked
var armyCards = []

function addArmy() {
    //display Approaching Army in Prophecies
    let prop = document.getElementById('prophecy_tbl')
    addRow("approachingarmy", prop, 0, 320)
    showCards()
    document.getElementById("army_parent").style.display = "block"
}

function armyMakeList() {
    armyCards = []

    if (document.getElementById("base_check").checked) {
        armyCards = armyCards.concat(Base_Attack)
    }
    if (document.getElementById("intrigue_check").checked) {
        armyCards = armyCards.concat(Intrigue_Attack)
        if (document.getElementById("1E_check").checked) {
            armyCards = armyCards.concat(Intrigue1E_Attack)
        }
    }
    if (document.getElementById("seaside_check").checked) {
        armyCards = armyCards.concat(Seaside_Attack)
        if (document.getElementById("1E_check").checked) {
            armyCards = armyCards.concat(Seaside1E_Attack)
        }
    }
    if (document.getElementById("alchemy_check").checked) {
        armyCards = armyCards.concat(Alchemy_Attack)
    }
    if (document.getElementById("prosperity_check").checked) {
        armyCards = armyCards.concat(Prosperity_Attack)
        if (document.getElementById("1E_check").checked) {
            armyCards = armyCards.concat(Prosperity1E_Attack)
        }
    }
    if (document.getElementById("cornucopia_check").checked) {
        armyCards = armyCards.concat(Cornucopia_Attack)
        if (document.getElementById("1E_check").checked) {
            armyCards = armyCards.concat(Cornucopia1E_Attack)
        }
    }
    if (document.getElementById("guilds_check").checked) {
        armyCards = armyCards.concat(Guilds_Attack)
        if (document.getElementById("1E_check").checked) {
            armyCards = armyCards.concat(Guilds1E_Attack)
        }
    }
    if (document.getElementById("hinterlands_check").checked) {
        armyCards = armyCards.concat(Hinterlands_Attack)
        if (document.getElementById("1E_check").checked) {
            armyCards = armyCards.concat(Hinterlands1E_Attack)
        }
    }
    if (document.getElementById("dark_ages_check").checked) {
        armyCards = armyCards.concat(DarkAges_Attack)
    }
    if (document.getElementById("adventures_check").checked) {
        armyCards = armyCards.concat(Adventures_Attack)
    }
    if (document.getElementById("empires_check").checked) {
        armyCards = armyCards.concat(Empires_Attack)
    }
    if (document.getElementById("nocturne_check").checked) {
        armyCards = armyCards.concat(Nocturne_Attack)
    }
    if (document.getElementById("renaissance_check").checked) {
        armyCards = armyCards.concat(Renaissance_Attack)
    }
    if (document.getElementById("menagerie_check").checked) {
        armyCards = armyCards.concat(Menagerie_Attack)
    }
    if (document.getElementById("allies_check").checked) {
        armyCards = armyCards.concat(Allies_Attack)
    }
    if (document.getElementById("plunder_check").checked) {
        armyCards = armyCards.concat(Plunder_Attack)
    }
    if (document.getElementById("rising_sun_check").checked) {
        armyCards = armyCards.concat(RisingSun_Attack)
    }
    //if (document.getElementById("promo_check").checked) {
    //    armyCards = armyCards.concat(Promo_Attack)
    //}

    if (armyCards.length > 0) { armyChooseAction() }
    else { alert("Approaching Army cannot choose a card, as no expansions have been selected") }
}

function armyChooseAction() {
    //randomly choose one card, display it
    document.getElementById("army_parent").style.display = "block"
    let index = Math.floor(Math.random() * armyCards.length)
    let imageURL = armyCards[index]
    cardImage(imageURL, document.getElementById("army_card"), 200, document.getElementById("army_icon"));
}