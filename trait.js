//displays the FAQ
function traitQuestion(){
    alert(`This number input is number of cards that can be affected by your Trait (or Obelisk).\n
    Traits can only go on Action and Treasure Kingdom cards (eg. not Silver, not Gardens, and not Ruins). If you pulled 2 Traits, they cannot both go on the same card.\n
    Obelisk can only go on Action Supply piles (any pile that has the type "Action", including the Ruins pile)\n
    Choose the number of cards in your setup that are eligible to get your Trait/Obelisk. Then use the randomly generated number to choose the card with that index (based on however you're sorting them on the table)`)
}

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