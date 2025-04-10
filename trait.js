//randomly selects number between 1 and n inclusive, displaying it in the text area
function selectCard(){
    console.log("selecting card")
    let n = document.getElementById("Trait_count").value
    let index = Math.ceil(Math.random() * n)
    document.getElementById("Trait_index").value = index;
}

function hideTrait(){
    var x = document.getElementById("trait_div")
    x.style.display = "none";
}

function showTrait(){
    var x = document.getElementById("trait_div")
    document.getElementById("Trait_index").value = "";
    x.style.display = "block";
}