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
//the list of cards on the table
var cardsToAdd = []

function addRow(imageURL, table, index, width) {
    console.log("Adding a row")
    //creates a row if it does not already exist, or index is specifically the end
    if (table.rows.length <= index || index === -1){
        let contentrow = table.insertRow(-1)
        let imageElement = document.createElement('img')
        contentrow.appendChild(imageElement)
        imageElement.src = `img/${imageURL}.jpg`   
        imageElement.width = width
    }
    //overwrites a row if it already exists
    else{
        //preload the image before changing
        const preloadedImage = new Image()
        preloadedImage.src =`img/${imageURL}.jpg`   
        preloadedImage.onload = function(){
            var image = table.rows[index].children[0]
            image.src = `img/${imageURL}.jpg`           
            }
        }
}

function randomize(){
    //empty the cards list and hide other elements
    cards = []
    hideTrait()
    hideCards()
    //hideBoon()

    let included = ""
    i = 0
    while (i < types.length){
        let min = parseInt(document.getElementById(types[i]+"_min").value)
        let max = parseInt(document.getElementById(types[i]+"_max").value)
        
        if (max < min){
            max = min
        }

        //do not include type if min and max both = 0
        if (max <= 0){
            required[types[i]] = 0
            allowed[types[i]] = 0
            i++
            continue
        }
        
        required[types[i]] = min
        allowed[types[i]] = max
        included = included + types[i]
        i++
    }
    let total = parseInt(document.getElementById("Total_count").value)
    console.log(total)
    //makes deck of all the types that are included 
    makeList(included,total)
}

//given a series of types (string), will make a big array containing all cards of that type that fulfill criteria, and add n of them randomly to the table, ensuring that the minimum is included
function makeList(type,n){
    if (type.includes('Way')){
        cards = cards.concat(waysDefault)
        if (document.getElementById("exile_check").checked){
            cards = cards.concat(waysExile)
        }
    }
    if (type.includes('Trait')){
        cards = cards.concat(traitsDefault)
        if (document.getElementById("loot_check").checked){
            cards = cards.concat(traitsLoot)
        }
    }
    if (type.includes('Project')){
        cards = cards.concat(projectsDefault)
        if (document.getElementById("coffer_check").checked){
            cards = cards.concat(projectsCoffers)
        }
    }
    if (type.includes('Landmark')){
        cards = cards.concat(landmarksDefault)
        if (document.getElementById("victory_check").checked){
            cards = cards.concat(landmarksVictory)
            if (document.getElementById("debt_check").checked){
                cards = cards.concat(landmarksDebtVictory)
            }
        }
    }
    if (type.includes('Event')){
        if (document.getElementById("av_check").checked){
            cards = cards.concat(avEventsDefault)
            if (document.getElementById("adventures_token_check").checked){
                cards = cards.concat(eventsAdventures)
            }
        }
        if (document.getElementById("em_check").checked){
            cards = cards.concat(emEventsDefault)
            if (document.getElementById("debt_check").checked){
                cards = cards.concat(emEventsDebt)
                if (document.getElementById("victory_check").checked){
                    cards = cards.concat(eventsDebtVictory)
                }
            }
            if (document.getElementById("victory_check").checked){
                cards = cards.concat(eventsVictory)
            }
        }
        if (document.getElementById("mg_check").checked){
            cards = cards.concat(mgEventsDefault)
            if (document.getElementById("horse_check").checked){
                cards = cards.concat(eventsHorses)
            }
            if (document.getElementById("exile_check").checked){
                cards = cards.concat(eventsExile)
            }
        }
        if (document.getElementById("pl_check").checked){
            cards = cards.concat(plEventsDefault)
            if (document.getElementById("loot_check").checked){
                cards = cards.concat(eventsLoot)
            }
        }
        if (document.getElementById("rs_check").checked){
            cards = cards.concat(rsEventsDefault)
            if (document.getElementById("debt_check").checked){
                cards = cards.concat(rsEventsDebt)
            }
        }
        if (document.getElementById("pr_check").checked){
            cards = cards.concat(promoEvents)
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
    cardsToAdd = []
    console.log(`n = ${n}`)
    console.log(`i = ${i}`)

    //do until n cards have been chosen
    while (chosen < n && i >= 0){
        //add randomly selected card to table. Replace that card in the array with the end card.
        //Shrink array by 1
        index = Math.floor(Math.random() * (i + 1))
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
        //display the trait selector if the card is a trait or Obelisk
        if (cards[index].getType() === cardType.TRAIT || (cards[index].getType() === cardType.LANDMARK && cards[index].getURL() === "obelisk")){
            showTrait()
        }
        //displays the mouse randomizer if the card is Way of the Mouse
        else if (cards[index].getURL() === "wayofthemouse"){
            showCards()
        }
        cardsToAdd.push(cards[index])
        chosen++
        cards[index] = cards[i]
        i--
        console.log(`chosen = ${chosen}, i = ${i}, n = ${n}`)
    }

    //replaces old table with new
    let table = document.getElementById('card_tbl')

    //adds all chosen cards to the table
    i = 0
    while (i < chosen){
        addRow(cardsToAdd[i].getURL(), table, i, 320)
        i++
    }
    //if more cards are in the table than were chosen
    while (table.rows.length > chosen){
        table.deleteRow(-1)
    }
    table.style.display = "block";
}

function chooseAlly(){
    let i = allyDefault.length
    if (document.getElementById("liaison_check").checked) i += allyLiaison.length

    let index = Math.floor(Math.random() * i)
    let table = document.getElementById('ally_tbl')
    
    if (index < allyDefault.length){
        addRow(allyDefault[index], table, 0, 320)
    }
    else{
        index -= allyDefault.length
        addRow(allyLiaison[index], table, 0, 320)
    }
}

function chooseProphecy(){
    let i = prophecyDefault.length
    if (document.getElementById("debt_check").checked) i += prophecyDebt.length

    let index = Math.floor(Math.random() * i)
    let table = document.getElementById('prophecy_tbl')
    
    if (index < prophecyDefault.length){
        //check if Approaching Army
        if (prophecyDefault[index] == "Approaching_Army"){
            addArmy()
        }
        else{
            addRow(prophecyDefault[index], table, 0, 320)
        }
    }
    else{
        index -= prophecyDefault.length
        addRow(prophecyDebt[index], table, 0, 320)
    }
}

function connectButtons(){
    document.getElementById("Total_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Total_count").value)
        document.getElementById("Total_count").value = n+1
        localStorage.setItem('Total_count', n+1)
    }) 
    document.getElementById("Total_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Total_count").value)
        document.getElementById("Total_count").value = Math.max(n-1, 0)
        localStorage.setItem('Total_count', Math.max(n-1, 0))
    }) 

    document.getElementById("Trait_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_count").value)
        document.getElementById("Trait_count").value = Math.max(n-1, 0)
    }) 
    document.getElementById("Trait_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_count").value)
        document.getElementById("Trait_count").value = n+1
    }) 

    document.getElementById("Event_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_min").value)
        document.getElementById("Event_min").value = Math.max(n-1, 0)
        localStorage.setItem('Event_min', Math.max(n-1, 0))
    })
    document.getElementById("Event_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_min").value)
        document.getElementById("Event_min").value = n+1
        localStorage.setItem('Event_min', n+1)
    }) 
    document.getElementById("Event_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_max").value)
        document.getElementById("Event_max").value = Math.max(n-1, 0)
        localStorage.setItem('Event_max', Math.max(n-1, 0))
    })
    document.getElementById("Event_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Event_max").value)
        document.getElementById("Event_max").value = n+1
        localStorage.setItem('Event_max', n+1)
    }) 
    
    document.getElementById("Landmark_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_min").value)
        document.getElementById("Landmark_min").value = Math.max(n-1, 0)
        localStorage.setItem('Landmark_min', Math.max(n-1, 0))
    })
    document.getElementById("Landmark_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_min").value)
        document.getElementById("Landmark_min").value = n+1
        localStorage.setItem('Landmark_min', n+1)
    }) 
    document.getElementById("Landmark_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_max").value)
        document.getElementById("Landmark_max").value = Math.max(n-1, 0)
        localStorage.setItem('Landmark_max', Math.max(n-1, 0))
    })
    document.getElementById("Landmark_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Landmark_max").value)
        document.getElementById("Landmark_max").value = n+1
        localStorage.setItem('Landmark_max', n+1)
    }) 

    document.getElementById("Project_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_min").value)
        document.getElementById("Project_min").value = Math.max(n-1, 0)
        localStorage.setItem('Project_min', Math.max(n-1, 0))
    })
    document.getElementById("Project_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_min").value)
        document.getElementById("Project_min").value = n+1
        localStorage.setItem('Project_min', n+1)
    }) 
    document.getElementById("Project_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_max").value)
        document.getElementById("Project_max").value = Math.max(n-1, 0)
        localStorage.setItem('Project_max', Math.max(n-1, 0))
    })
    document.getElementById("Project_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Project_max").value)
        document.getElementById("Project_max").value = n+1
        localStorage.setItem('Project_max', n+1)
    }) 

    document.getElementById("Way_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_min").value)
        document.getElementById("Way_min").value = Math.max(n-1, 0)
        localStorage.setItem('Way_min', Math.max(n-1, 0))
    })
    document.getElementById("Way_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_min").value)
        document.getElementById("Way_min").value = n+1
        localStorage.setItem('Way_min', n+1)
    }) 
    document.getElementById("Way_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_max").value)
        document.getElementById("Way_max").value = Math.max(n-1, 0)
        localStorage.setItem('Way_max', Math.max(n-1, 0))
    })
    document.getElementById("Way_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Way_max").value)
        document.getElementById("Way_max").value = n+1
        localStorage.setItem('Way_max', n+1)
    }) 

    document.getElementById("Trait_min_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_min").value)
        document.getElementById("Trait_min").value = Math.max(n-1, 0)
        localStorage.setItem('Trait_min', Math.max(n-1, 0))
    })
    document.getElementById("Trait_min_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_min").value)
        document.getElementById("Trait_min").value = n+1
        localStorage.setItem('Trait_min', n+1)
    }) 
    document.getElementById("Trait_max_down_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_max").value)
        document.getElementById("Trait_max").value = Math.max(n-1, 0)
        localStorage.setItem('Trait_max', Math.max(n-1, 0))
    })
    document.getElementById("Trait_max_up_button").addEventListener('click', function() {
        let n = parseInt(document.getElementById("Trait_max").value)
        document.getElementById("Trait_max").value = n+1
        localStorage.setItem('Trait_max', n+1)
    }) 
}

//reads local storage for the checks and counters, and intializes the checkboxes' on-click event listeners  
function readStorage(){
    for (item in counters){
        if (localStorage.getItem(counters[item]) === null) continue;
        document.getElementById(counters[item]).value = localStorage.getItem(counters[item])
    }
    for (item in checks){
        document.getElementById((String)(checks[item])).addEventListener('click', function() {
            localStorage.setItem(this.id, this.checked)
        })
        if (localStorage.getItem(checks[item]) === "true"){
            document.getElementById(checks[item]).checked = true
        }
        else{
            document.getElementById(checks[item]).checked = false
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('about_Button').addEventListener('click', function() {
        window.location.href = 'https://dominion-landscape-randomizer.github.io/about.html';
      });
    document.getElementById('submit_button').addEventListener('click', randomize)
    document.getElementById("Trait_Randomize").addEventListener('click', selectCard) 
    document.getElementById("Trait_?").addEventListener('click', function(){
        alert(`This number input is number of cards that can be affected by your Trait (or Obelisk).\n
    Traits can only go on Action and Treasure Kingdom cards (eg. not Silver, not Gardens, and not Ruins). If you pulled 2 Traits, they cannot both go on the same card.\n
    Obelisk can only go on Action Supply piles (any pile that has the type "Action", including the Ruins pile)\n
    Choose the number of cards in your setup that are eligible to get your Trait/Obelisk. Then use the randomly generated number to choose the card with that index (based on however you're sorting them on the table)`)
    }) 
    document.getElementById("Liaison_?").addEventListener('click', function(){
        alert(`Officially, you only put an Ally out if you have a Liaison in the Kingdom. However, most Allies can be played as long as each player starts with 5 Favor Tokens (Importer's setup)\n
        Two Allies specifically are only activated "when you play a Liaison". If this box is not checked, neither of those will come up.\n
        If you do not own the expansion Allies, you can either keep this box unchecked and have each player start with 5 Favor Tokens, or you can check this box and use your blank cards as a Liaison pile (eg. Underling)`)
    }) 
    document.getElementById("Expansion_Select").addEventListener('click', selectAll) 
    document.getElementById("Mouse_Randomize").addEventListener('click', mouseMakeActionList) 
    document.getElementById("Riverboat_Randomize").addEventListener('click', riverboatMakeActionList) 
    document.getElementById("Army_Randomize").addEventListener('click', armyMakeList) 
    document.getElementById("Bane_Randomize").addEventListener('click', baneMakeList) 
    document.getElementById("Ferryman_Randomize").addEventListener('click', ferrymanMakeList) 
    document.getElementById("Trait_Add").addEventListener('click', showTrait) 
    document.getElementById("Mouse_Add").addEventListener('click', addMouse) 
    document.getElementById("Riverboat_Add").addEventListener('click', addRiverboat) 
    document.getElementById("Army_Add").addEventListener('click', addArmy)
    document.getElementById("Bane_Add").addEventListener('click', addBane)
    document.getElementById("Ferryman_Add").addEventListener('click', addFerryman)
    document.getElementById("Add_Ally").addEventListener('click', chooseAlly) 
    document.getElementById("Add_Prophecy").addEventListener('click', chooseProphecy) 
    document.getElementById("Remove_Ally").addEventListener('click', function(){
        document.getElementById('ally_tbl').deleteRow(0)
    }) 
    document.getElementById("Remove_Prophecy").addEventListener('click', function(){
        document.getElementById('prophecy_tbl').deleteRow(0)
    }) 
    hideTrait()
    hideCards()
    hideBoon()
    connectButtons()
    connectNocturneButtons()
    readStorage()
  })
