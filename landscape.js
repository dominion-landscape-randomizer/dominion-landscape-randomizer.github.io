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

    let types = ['Event','Landmark','Project','Way','Trait']
    let surprise = ""
    let sum = 0
    i = 0
    while (i < types.length){
        if (document.getElementById(types[i]+"_check").checked){
            surprise = surprise += types[i]
            i++
            continue
        }
        let n = parseInt(document.getElementById(types[i]+"_count").value)
        if (n === 0) {
            i++
            continue
        }
        sum += n
        makeList(types[i],n) 
        i++
    }
    //adds cards from the types marked 'surprise me!' to reach the total, unless it has already been reached or exceeded 
    let miscCardCount = parseInt(document.getElementById("total_count").value) - sum
    if (surprise !== "" && miscCardCount > 0){
        makeList(surprise,miscCardCount)
    }
}

//given a type or series of types (string), will make a big array containing all cards of that type that fulfill criteria, and add n of them randomly to the table
function makeList(type,n){
    var cards = []
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
    if (cards.length > 0) randomCards(cards,n)
}


//include MATH
//takes in an array of cards, and an integer. Randomly selects n (or all, if n is greater than total length) cards from the arrays and adds them to the table
function randomCards(cards, n){
    let i = cards.length
    if (n > cards.length) n = cards.length
    while (i > cards.length-n){
    //add randomly selected card to table. Replace that card in the array with the end card. Shrink array by 1
    index = Math.floor(Math.random() * i)
        addRow(cards[index])
        cards[index] = cards[i]
        i--
    }
}

function toggleNumber(type){
    let counter = document.getElementById(type+'_count')
    let check = document.getElementById(type+'_check')
    if (check.checked){counter.disabled = true}
    else counter.disabled = false
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit_button').addEventListener('click', randomize)
    let types = ['Event','Landmark','Project','Way','Trait']
    let i = 0
    while (i < types.length){
        let type = types[i]
        document.getElementById(type+'_check').addEventListener('click', function(){
            toggleNumber(type)
        })
        i++
    }
  })
