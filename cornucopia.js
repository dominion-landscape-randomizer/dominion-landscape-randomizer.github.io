var selected = false //if all expansion check boxes are checked
var baneCards = []
var ferrymanCards = []

function addBane() {
    //display young witch in its spot
    let rbt = document.getElementById("yw_self_tbl")
    addRow("youngwitch", rbt, 1, 200)
    showCards()
    document.getElementById("bane_parent").style.display = "block"
}

function baneMakeList() {
    baneCards = []

    if (document.getElementById("base_check").checked) {
        baneCards = baneCards.concat(Base_Bane)
        if (document.getElementById("1E_check").checked) {
            baneCards = baneCards.concat(Base1E_Bane)
        }
    }
    if (document.getElementById("intrigue_check").checked) {
        baneCards = baneCards.concat(Intrigue_Bane)
        if (document.getElementById("1E_check").checked) {
            baneCards = baneCards.concat(Intrigue1E_Bane)
        }
    }
    if (document.getElementById("seaside_check").checked) {
        baneCards = baneCards.concat(Seaside_Bane)
        if (document.getElementById("1E_check").checked) {
            baneCards = baneCards.concat(Seaside1E_Bane)
        }
    }
    if (document.getElementById("alchemy_check").checked) {
        baneCards = baneCards.concat(Alchemy_Bane)
    }
    if (document.getElementById("prosperity_check").checked) {
        baneCards = baneCards.concat(Prosperity_Bane)
        if (document.getElementById("1E_check").checked) {
            baneCards = baneCards.concat(Prosperity1E_Bane)
        }
    }
    if (document.getElementById("cornucopia_check").checked) {
        baneCards = baneCards.concat(Cornucopia_Bane)
        if (document.getElementById("1E_check").checked) {
            baneCards = baneCards.concat(Cornucopia1E_Bane)
        }
    }
    if (document.getElementById("guilds_check").checked) {
        baneCards = baneCards.concat(Guilds_Bane)
        if (document.getElementById("1E_check").checked) {
            baneCards = baneCards.concat(Guilds1E_Bane)
        }
    }
    if (document.getElementById("hinterlands_check").checked) {
        baneCards = baneCards.concat(Hinterlands_Bane)
        if (document.getElementById("1E_check").checked) {
            baneCards = baneCards.concat(Hinterlands1E_Bane)
        }
    }
    if (document.getElementById("dark_ages_check").checked) {
        baneCards = baneCards.concat(DarkAges_Bane)
    }
    if (document.getElementById("adventures_check").checked) {
        baneCards = baneCards.concat(Adventures_Bane)
    }
    if (document.getElementById("empires_check").checked) {
        baneCards = baneCards.concat(Empires_Bane)
    }
    if (document.getElementById("nocturne_check").checked) {
        baneCards = baneCards.concat(Nocturne_Bane)
    }
    if (document.getElementById("renaissance_check").checked) {
        baneCards = baneCards.concat(Renaissance_Bane)
    }
    if (document.getElementById("menagerie_check").checked) {
        baneCards = baneCards.concat(Menagerie_Bane)
    }
    if (document.getElementById("allies_check").checked) {
        baneCards = baneCards.concat(Allies_Bane)
    }
    if (document.getElementById("plunder_check").checked) {
        baneCards = baneCards.concat(Plunder_Bane)
    }
    if (document.getElementById("rising_sun_check").checked) {
        baneCards = baneCards.concat(RisingSun_Bane)
    }
    if (document.getElementById("promo_check").checked) {
        baneCards = baneCards.concat(Promo_Bane)
    }

    if (baneCards.length > 0) { baneChooseAction() }
    else { alert("Young Witch cannot choose a Bane, as no expansions have been selected") }
}

function baneChooseAction() {
    //randomly choose one card, display it
    document.getElementById("bane_parent").style.display = "block"
    let index = Math.floor(Math.random() * baneCards.length)
    let imageURL = baneCards[index]
    cardImage(imageURL, document.getElementById("bane_card"), 200, document.getElementById("bane_icon"));
}

function addFerryman() {
    //display Ferryman in its spot
    let rbt = document.getElementById("ferryman_self_tbl")
    addRow("ferryman", rbt, 0, 200)
    showCards()
    document.getElementById("ferryman_parent").style.display = "block"
}

function ferrymanMakeList() {
    ferrymanCards = []

    if (document.getElementById("base_check").checked) {
        ferrymanCards = ferrymanCards.concat(Base_Ferryman)
        if (document.getElementById("1E_check").checked) {
            ferrymanCards = ferrymanCards.concat(Base1E_Ferryman)
        }
    }
    if (document.getElementById("intrigue_check").checked) {
        ferrymanCards = ferrymanCards.concat(Intrigue_Ferryman)
        if (document.getElementById("1E_check").checked) {
            ferrymanCards = ferrymanCards.concat(Intrigue1E_Ferryman)
        }
    }
    if (document.getElementById("seaside_check").checked) {
        ferrymanCards = ferrymanCards.concat(Seaside_Ferryman)
        if (document.getElementById("1E_check").checked) {
            ferrymanCards = ferrymanCards.concat(Seaside1E_Ferryman)
        }
    }
    if (document.getElementById("prosperity_check").checked) {
        ferrymanCards = ferrymanCards.concat(Prosperity_Ferryman)
        if (document.getElementById("1E_check").checked) {
            ferrymanCards = ferrymanCards.concat(Prosperity1E_Ferryman)
        }
    }
    if (document.getElementById("cornucopia_check").checked) {
        ferrymanCards = ferrymanCards.concat(Cornucopia_Ferryman)
        if (document.getElementById("1E_check").checked) {
            ferrymanCards = ferrymanCards.concat(Cornucopia1E_Ferryman)
        }
    }
    if (document.getElementById("guilds_check").checked) {
        ferrymanCards = ferrymanCards.concat(Guilds_Ferryman)
        if (document.getElementById("1E_check").checked) {
            ferrymanCards = ferrymanCards.concat(Guilds1E_Ferryman)
        }
    }
    if (document.getElementById("hinterlands_check").checked) {
        ferrymanCards = ferrymanCards.concat(Hinterlands_Ferryman)
        if (document.getElementById("1E_check").checked) {
            ferrymanCards = ferrymanCards.concat(Hinterlands1E_Ferryman)
        }
    }
    if (document.getElementById("dark_ages_check").checked) {
        ferrymanCards = ferrymanCards.concat(DarkAges_Ferryman)
    }
    if (document.getElementById("adventures_check").checked) {
        ferrymanCards = ferrymanCards.concat(Adventures_Ferryman)
    }
    if (document.getElementById("empires_check").checked) {
        ferrymanCards = ferrymanCards.concat(Empires_Ferryman)
    }
    if (document.getElementById("nocturne_check").checked) {
        ferrymanCards = ferrymanCards.concat(Nocturne_Ferryman)
    }
    if (document.getElementById("renaissance_check").checked) {
        ferrymanCards = ferrymanCards.concat(Renaissance_Ferryman)
    }
    if (document.getElementById("menagerie_check").checked) {
        ferrymanCards = ferrymanCards.concat(Menagerie_Ferryman)
    }
    if (document.getElementById("allies_check").checked) {
        ferrymanCards = ferrymanCards.concat(Allies_Ferryman)
    }
    if (document.getElementById("plunder_check").checked) {
        ferrymanCards = ferrymanCards.concat(Plunder_Ferryman)
    }
    if (document.getElementById("rising_sun_check").checked) {
        ferrymanCards = ferrymanCards.concat(RisingSun_Ferryman)
    }
    if (document.getElementById("promo_check").checked) {
        ferrymanCards = ferrymanCards.concat(Promo_Ferryman)
    }

    if (ferrymanCards.length > 0) { ferrymanChooseAction() }
    else { alert("Young Witch cannot choose a ferryman, as no expansions have been selected") }
}

function ferrymanChooseAction() {
    //randomly choose one card, display it
    document.getElementById("ferryman_parent").style.display = "block"
    let index = Math.floor(Math.random() * ferrymanCards.length)
    let imageURL = ferrymanCards[index]
    cardImage(imageURL, document.getElementById("ferryman_card"), 200, document.getElementById("ferryman_icon"));
}