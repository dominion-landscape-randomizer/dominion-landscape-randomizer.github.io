//the number of cards of each type that must be included
var required = 
{Event:0,
Landmark: 0,
Project: 0,
Way: 0,
Trait: 0}

//the number of cards of each type that can be included
var allowed = 
{Event:0,
Landmark: 0,
Project: 0,
Way: 0,
Trait: 0}

//the list of all cards
var cards = []

function addRow(imageURL) {
    table = document.getElementById('card_tbl')
    let contentrow = document.createElement('tr')
    contentrow.innerHTML = `<img src="https://wiki.dominionstrategy.com/images/thumb/${imageURL}.jpg/320px-${imageURL.slice(5)}.jpg"></img>`       
    table.appendChild(contentrow)
}

function randomize(){
    //clear the table
    let table = document.getElementById('card_tbl')
    let i = table.rows.length
    while (i > 0){
        table.deleteRow(0)
        i--
    }
    cards = []

    let included = ""
    i = 0
    while (i < types.length){
        let min = parseInt(document.getElementById(types[i]+"_min").value)
        let max = parseInt(document.getElementById(types[i]+"_max").value)
        
        if (max < min){
            max = min
        }

        if (max <= 0){
            required[types[i]] = min
            allowed[types[i]] = max
            i++
            continue
        }
        
        required[types[i]] = min
        allowed[types[i]] = max
        included = included + types[i]
        i++
    }
    let total = parseInt(document.getElementById("Total_count").value)
    //makes deck of all the types that are included 
    makeList(included,total)
}

//given a series of types (string), will make a big array containing all cards of that type that fulfill criteria, and add n of them randomly to the table, ensuring that the minimum is included
function makeList(type,n){
    if (type.includes('Way')){
        cards = cards.concat(waysDefault)
        if (document.getElementById("exile_check").getAttribute("checked")){
            cards = cards.concat(waysExile)
        }
    }
    if (type.includes('Trait')){
        cards = cards.concat(traitsDefault)
        if (document.getElementById("loot_check").getAttribute("checked")){
            cards = cards.concat(traitsLoot)
        }
    }
    if (type.includes('Project')){
        cards = cards.concat(projectsDefault)
        if (document.getElementById("coffer_check").getAttribute("checked")){
            cards = cards.concat(projectsCoffers)
        }
    }
    if (type.includes('Landmark')){
        cards = cards.concat(landmarksDefault)
        if (document.getElementById("victory_check").getAttribute("checked")){
            cards = cards.concat(landmarksVictory)
            if (document.getElementById("debt_check").getAttribute("checked")){
                cards = cards.concat(landmarksDebtVictory)
            }
        }
    }
    if (type.includes('Event')){
        cards = cards.concat(eventsDefault)
        if (document.getElementById("debt_check").getAttribute("checked")){
            cards = cards.concat(eventsDebt)
            if (document.getElementById("victory_check").getAttribute("checked")){
                cards = cards.concat(eventsDebtVictory)
            }
        }
        if (document.getElementById("horse_check").getAttribute("checked")){
            cards = cards.concat(eventsHorses)
        }
        if (document.getElementById("adventures_check").getAttribute("checked")){
            cards = cards.concat(eventsAdventures)
        }
        if (document.getElementById("loot_check").getAttribute("checked")){
            cards = cards.concat(eventsLoot)
        }
        if (document.getElementById("victory_check").getAttribute("checked")){
            cards = cards.concat(eventsVictory)
        }
        if (document.getElementById("exile_check").getAttribute("checked")){
            cards = cards.concat(eventsExile)
        }
    }

    if (cards.length > 0) randomCards(n)
}


//include MATH
//takes in an integer. Randomly selects n (or all, if n is greater than total length) cards from the array and adds them to the table
function randomCards(n){
    let maxSum = 0
    let minSum = 0
    let chosen = 0
    let i = 0
    while (i < types.length){
        maxSum += allowed[types[i]]
        minSum += required[types[i]]
        i++
    } 

    if (maxSum < n) n = maxSum
    let free = n - minSum

    i = cards.length - 1 
    if (n > cards.length) n = cards.length

    //do until n cards have been chosen
    while (chosen < n && i >= 0){
        //add randomly selected card to table. Replace that card in the array with the end card. Shrink array by 1
        index = Math.floor(Math.random() * i)
        //if card is not required, check if there is space for it
        if (required[cards[index].getType()] === 0){
            //if there is no space for it, do not add it to the table
            if (free === 0 || allowed[cards[index].getType()] === 0){
                cards[index] = cards[i]
                i--
                continue
            }
            //if there is space, reduce the number of free spaces left 
            free--
        }
        if (required[cards[index].getType()] > 0) required[cards[index].getType()]--
        if (allowed[cards[index].getType()] > 0) allowed[cards[index].getType()]--
        addRow(cards[index].getURL())
        chosen++
        cards[index] = cards[i]
        i--
    }
}

function connectButtons(){
    document.getElementById("Total_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Total_count").value)
        document.getElementById("Total_count").value = Math.max(n+1, 0)
    }) 
    document.getElementById("Total_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Total_count").value)
        document.getElementById("Total_count").value = Math.max(n-1, 0)
    }) 

    document.getElementById("Event_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_min").value)
        document.getElementById("Event_min").value = Math.max(n-1, 0)
    })
    document.getElementById("Event_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_min").value)
        document.getElementById("Event_min").value = Math.max(n+1, 0)
    }) 
    document.getElementById("Event_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_max").value)
        document.getElementById("Event_max").value = Math.max(n-1, 0)
    })
    document.getElementById("Event_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_max").value)
        document.getElementById("Event_max").value = Math.max(n+1, 0)
    }) 
    
    document.getElementById("Landmark_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_min").value)
        document.getElementById("Landmark_min").value = Math.max(n-1, 0)
    })
    document.getElementById("Landmark_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_min").value)
        document.getElementById("Landmark_min").value = Math.max(n+1, 0)
    }) 
    document.getElementById("Landmark_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_max").value)
        document.getElementById("Landmark_max").value = Math.max(n-1, 0)
    })
    document.getElementById("Landmark_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_max").value)
        document.getElementById("Landmark_max").value = Math.max(n+1, 0)
    }) 

    document.getElementById("Project_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_min").value)
        document.getElementById("Project_min").value = Math.max(n-1, 0)
    })
    document.getElementById("Project_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_min").value)
        document.getElementById("Project_min").value = Math.max(n+1, 0)
    }) 
    document.getElementById("Project_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_max").value)
        document.getElementById("Project_max").value = Math.max(n-1, 0)
    })
    document.getElementById("Project_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_max").value)
        document.getElementById("Project_max").value = Math.max(n+1, 0)
    }) 

    document.getElementById("Way_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_min").value)
        document.getElementById("Way_min").value = Math.max(n-1, 0)
    })
    document.getElementById("Way_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_min").value)
        document.getElementById("Way_min").value = Math.max(n+1, 0)
    }) 
    document.getElementById("Way_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_max").value)
        document.getElementById("Way_max").value = Math.max(n-1, 0)
    })
    document.getElementById("Way_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_max").value)
        document.getElementById("Way_max").value = Math.max(n+1, 0)
    }) 

    document.getElementById("Trait_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_min").value)
        document.getElementById("Trait_min").value = Math.max(n-1, 0)
    })
    document.getElementById("Trait_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_min").value)
        document.getElementById("Trait_min").value = Math.max(n+1, 0)
    }) 
    document.getElementById("Trait_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_max").value)
        document.getElementById("Trait_max").value = Math.max(n-1, 0)
    })
    document.getElementById("Trait_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_max").value)
        document.getElementById("Trait_max").value = Math.max(n+1, 0)
    }) 
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit_button').addEventListener('click', randomize)
    connectButtons();
  })
