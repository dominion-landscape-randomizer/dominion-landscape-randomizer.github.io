function hideCards() {
    var x = document.getElementById("card_div")
    x.style.display = "none";
    hideBoon();
    //clear mouse and riverboat tables
    document.getElementById("mouse_tbl").deleteRow(0)
    document.getElementById("riverboat_tbl").deleteRow(0)
    document.getElementById("mouse_heirloom_tbl").deleteRow(0)
    document.getElementById("riverboat_heirloom_tbl").deleteRow(0)
    document.getElementById("mouse_artifact_tbl").deleteRow(0)
    document.getElementById("riverboat_artifact_tbl").deleteRow(0)
    document.getElementById("riverboat_self_tbl").deleteRow(0)
    document.getElementById("mouse_rules_clarification").innerHTML = ""
    document.getElementById("riverboat_rules_clarification").innerHTML = ""
}

function showCards() {
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