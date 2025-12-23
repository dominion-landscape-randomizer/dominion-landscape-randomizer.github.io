function hideCards() {
    var x = document.getElementById("card_div")
    x.style.display = "none";
    hideBoon();
    //clear mouse, riverboat, and army tables
    document.getElementById("mouse_parent").style.display = "none"
    document.getElementById("riverboat_parent").style.display = "none"
    document.getElementById("army_parent").style.display = "none"
    document.getElementById("bane_parent").style.display = "none"
    document.getElementById("ferryman_parent").style.display = "none"
    document.getElementById("mouse_card").src=""
    document.getElementById("riverboat_card").src=""
    document.getElementById("army_card").src=""
    document.getElementById("bane_card").src=""
    document.getElementById("riverboat_card").src=""
    document.getElementById("mouse_icon").style.display = "none"
    document.getElementById("riverboat_icon").style.display = "none"
    document.getElementById("army_icon").style.display = "none"
    document.getElementById("bane_icon").style.display = "none"
    document.getElementById("ferryman_icon").style.display = "none"
    document.getElementById("mouse_heirloom_tbl").deleteRow(-1)
    document.getElementById("riverboat_heirloom_tbl").deleteRow(-1)
    document.getElementById("mouse_artifact_tbl").deleteRow(-1)
    document.getElementById("riverboat_artifact_tbl").deleteRow(-1)
    document.getElementById("riverboat_self_tbl").deleteRow(-1)
    document.getElementById("yw_self_tbl").deleteRow(-1)
    document.getElementById("ferryman_self_tbl").deleteRow(-1)
    document.getElementById("mouse_rules_clarification").innerHTML = ""
    document.getElementById("riverboat_rules_clarification").innerHTML = ""
}

function showCards() {
    //reveal the card div (for Mouse, Riverboat, Approaching Army)
    var x = document.getElementById("card_div")
    x.style.display = "block";
    readCardStorage();
}

//reads local storage relevant to the Mouse section, and intializes their on-click event listener  s
function readCardStorage(){
    for (i in expansions){ 
        document.getElementById((expansions[i] + "_check")).addEventListener('click', function() {
            localStorage.setItem(this.id, this.checked)
        })

        if (localStorage.getItem(expansions[i] + "_check") === "true"){
            document.getElementById(expansions[i] + "_check").checked = true
        }
        else{
            document.getElementById(expansions[i] + "_check").checked = false
        }
    }
    
    document.getElementById(("1E_check")).addEventListener('click', function() {
        localStorage.setItem(this.id, this.checked)
    })
    if (localStorage.getItem("1E_check") === "true"){
        document.getElementById("1E_check").checked = true
    }
    else{
        document.getElementById("1E_check").checked = false
    }
}

//replaces the main image of the Mouse, Riverboat, or AA card, and shows the icon
function cardImage(imageURL, image_element, width, icon) {
    //preload the image before changing
    const preloadedImage = new Image()
    preloadedImage.src = `img/${imageURL}.jpg`
    preloadedImage.onload = function(){
        image_element.src = `img/${imageURL}.jpg`          
        image_element.width = width   
        icon.style.display = "block"
    }
}

function selectAll() {
    if (selected) {
        for (i in expansions) {
            document.getElementById(expansions[i] + "_check").checked = false
            localStorage.setItem(expansions[i] + "_check", false)
        }
        selected = false
        document.getElementById("Expansion_Select").innerHTML = "Select All Expansions"
    }
    else {
        for (i in expansions) {
            document.getElementById(expansions[i] + "_check").checked = true
            localStorage.setItem(expansions[i] + "_check", true)
        }
        selected = true
        document.getElementById("Expansion_Select").innerHTML = "Deselect All Expansions"
    }
}