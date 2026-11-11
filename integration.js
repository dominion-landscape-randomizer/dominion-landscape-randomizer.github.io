//Integration with the Dominion Randomizer (https://github.com/vbst7/dominion-randomizer):
//when DR generates a kingdom, its "Open in Landscape Randomizer" button opens this page
//with the kingdom's landscape cards passed in the URL, e.g.
//index.html?cards=Star%20Chart,Ball&traits=Cheap&prophecies=Approaching%20Army&allies=Architects%27%20Guild&mouse=Border%20Guard&riverboat=Sea%20Witch
//- cards: the Events, Landmarks, Projects and Ways
//- traits: the Traits (only included if the DR setting allows it)
//- prophecies: the Prophecies (only included if the DR setting allows it)
//- allies: the Allies (only included if the DR setting allows it)
//- mouse: the $2-$3 Action card chosen for Way of the Mouse
//- riverboat: the $5 Action card chosen for Riverboat
//Ferryman, Young Witch (Bane) and Approaching Army do not pass their associated cards,
//as those add a new pile to DR's kingdom rather than a new card name.

//normalizes a card name so it can be matched against the wiki image names
function urlNormalize(name) {
    return name.toLowerCase().replace(/[^a-z0-9-]/g, '')
}

//derives the normalized display name from a wiki image URL, e.g.
//"https://wiki.dominionstrategy.com/images/0/07/Star_Chart.jpg" -> "starchart"
function urlNormalizeWikiImage(url) {
    let file = url.split('/').pop()
    try { file = decodeURIComponent(file) } catch (err) { }
    //strip version suffixes like "~English~2017" before the extension
    file = file.split('~')[0].replace(/\.jpg$/i, '')
    return urlNormalize(file.replace(/_/g, ' '))
}

let urlNameSlugMap = null

//maps a normalized display name to the slug used by imageurls.js and the card lists
function urlBuildNameSlugMap() {
    let map = {}
    for (let slug in wikiImages) {
        let key = urlNormalizeWikiImage(wikiImages[slug])
        if (!(key in map)) map[key] = slug
        //also match on the slug itself, in case a wiki file is named
        //differently from the card
        let slugKey = urlNormalize(slug)
        if (!(slugKey in map)) map[slugKey] = slug
    }
    return map
}

//resolves a display name (as sent by DR) to the slug used by the card lists.
//returns null when this page has no image for that name
function urlSlugForName(name) {
    if (urlNameSlugMap === null) urlNameSlugMap = urlBuildNameSlugMap()
    return urlNameSlugMap[urlNormalize(name)] || null
}

//The Mouse and Riverboat sections show rules clarifications, heirlooms and
//artifacts based on the expansion checkboxes. When a card is passed in the URL,
//tick the checkboxes of every list it belongs to, so the right clarifications
//are shown. Each entry is [candidate list, checkboxes gating that list].
const mouseListChecks = [
    [Base_Mouse, ['base_check']],
    [Base1E_Mouse, ['base_check', '1E_check']],
    [Intrigue_Mouse, ['intrigue_check']],
    [Intrigue1E_Mouse, ['intrigue_check', '1E_check']],
    [Seaside_Mouse, ['seaside_check']],
    [Seaside1E_Mouse, ['seaside_check', '1E_check']],
    [Alchemy_Mouse, ['alchemy_check']],
    [Prosperity_Mouse, ['prosperity_check']],
    [Prosperity1E_Mouse, ['prosperity_check', '1E_check']],
    [Cornucopia_Mouse, ['cornucopia_check']],
    [Cornucopia1E_Mouse, ['cornucopia_check', '1E_check']],
    [Guilds_Mouse, ['guilds_check']],
    [GuildsCoffers_Mouse, ['guilds_check', 'coffer_check']],
    [Guilds1E_Mouse, ['guilds_check', '1E_check']],
    [Hinterlands_Mouse, ['hinterlands_check']],
    [Hinterlands1E_Mouse, ['hinterlands_check', '1E_check']],
    [DarkAges_Mouse, ['dark_ages_check']],
    [Adventures_Mouse, ['adventures_check']],
    [Empires_Mouse, ['empires_check']],
    [EmpiresVP_Mouse, ['empires_check', 'victory_check']],
    [Nocturne_Mouse, ['nocturne_check']],
    [Renaissance_Mouse, ['renaissance_check']],
    [RenaissanceCoffers_Mouse, ['renaissance_check', 'coffer_check']],
    [Menagerie_Mouse, ['menagerie_check']],
    [MenagerieExile_Mouse, ['menagerie_check', 'exile_check']],
    [MenagerieHorse_Mouse, ['menagerie_check', 'horse_check']],
    [Allies_Mouse, ['allies_check']],
    [AlliesLiaison_Mouse, ['allies_check']],
    [Plunder_Mouse, ['plunder_check']],
    [RisingSun_Mouse, ['rising_sun_check']],
    [RisingSunDebt_Mouse, ['rising_sun_check', 'debt_check']],
    [Promo_Mouse, ['promo_check']]
]

const riverboatListChecks = [
    [Base_5, ['base_check']],
    [Intrigue_5, ['intrigue_check']],
    [Intrigue1E_5, ['intrigue_check', '1E_check']],
    [Seaside_5, ['seaside_check']],
    [Seaside1E_5, ['seaside_check', '1E_check']],
    [Alchemy_5, ['alchemy_check']],
    [Prosperity_5, ['prosperity_check']],
    [Prosperity1E_5, ['prosperity_check', '1E_check']],
    [Cornucopia_5, ['cornucopia_check']],
    [Cornucopia1E_5, ['cornucopia_check', '1E_check']],
    [Guilds_5, ['guilds_check']],
    [GuildsCoffers_5, ['guilds_check', 'coffer_check']],
    [Hinterlands_5, ['hinterlands_check']],
    [Hinterlands1E_5, ['hinterlands_check', '1E_check']],
    [DarkAges_5, ['dark_ages_check']],
    [Knights_5, ['dark_ages_check']],
    [Adventures_5, ['adventures_check']],
    [AdventuresTokens_5, ['adventures_check', 'adventures_token_check']],
    [Empires_5, ['empires_check']],
    [EmpiresVP_5, ['empires_check', 'victory_check']],
    [Nocturne_5, ['nocturne_check']],
    [Renaissance_5, ['renaissance_check']],
    [RenaissanceCoffers_5, ['renaissance_check', 'coffer_check']],
    [Menagerie_5, ['menagerie_check']],
    [MenagerieExile_5, ['menagerie_check', 'exile_check']],
    [MenagerieHorse_5, ['menagerie_check', 'horse_check']],
    [Allies_5, ['allies_check']],
    [AlliesLiaison_5, ['allies_check']],
    [Plunder_5, ['plunder_check']],
    [RisingSun_5, ['rising_sun_check']],
    [RisingSunOmen_5, ['rising_sun_check']],
    [RisingSunDebt_5, ['rising_sun_check', 'debt_check']],
    [Promo_5, ['promo_check']]
]

//ticks the checkboxes of every list in listChecks that contains imageURL
function urlCheckExpansionBoxes(imageURL, listChecks) {
    for (let entry of listChecks) {
        if (entry[0].includes(imageURL)) {
            for (let id of entry[1]) {
                document.getElementById(id).checked = true
            }
        }
    }
}

//adds a single landscape card row, logging a warning if the name is unknown.
//returns true when the row was added
function urlAddLandscapeRow(name, table, index, width) {
    const slug = urlSlugForName(name)
    if (slug === null) {
        console.warn('Landscape Randomizer integration: no image found for "' + name + '", skipping it')
        return false
    }
    addRow(slug, table, index, width)
    return true
}

//displays the landscape cards passed by the Dominion Randomizer in the URL
function loadFromURL() {
    let params
    try { params = new URLSearchParams(window.location.search) } catch (err) { return }
    if (!params.toString()) return

    const urlList = key => (params.get(key) || '').split(',').map(s => s.trim()).filter(s => s.length > 0)
    const cardNames = urlList('cards')
    const traitNames = urlList('traits')
    const prophecyNames = urlList('prophecies')
    const allyNames = urlList('allies')
    const mouseName = (params.get('mouse') || '').trim()
    const riverboatName = (params.get('riverboat') || '').trim()

    if (cardNames.length === 0 && traitNames.length === 0 && prophecyNames.length === 0 &&
        allyNames.length === 0 && mouseName === '' && riverboatName === '') return

    const cardTable = document.getElementById('card_tbl')
    let rowIndex = 0
    let mouseLandscapeDisplayed = false
    let needsTraitSelector = false

    for (let name of cardNames) {
        const slug = urlSlugForName(name)
        if (slug === null) {
            console.warn('Landscape Randomizer integration: no image found for "' + name + '", skipping it')
            continue
        }
        //Way of the Mouse is added below together with its chosen action card
        if (slug === 'wayofthemouse' && mouseName !== '') continue
        addRow(slug, cardTable, rowIndex, 320)
        rowIndex++
        if (slug === 'wayofthemouse') mouseLandscapeDisplayed = true
        //Obelisk uses the trait selector, as it affects a Supply pile
        if (slug === 'obelisk') needsTraitSelector = true
    }
    for (let name of traitNames) {
        if (urlAddLandscapeRow(name, cardTable, rowIndex, 320)) {
            rowIndex++
            needsTraitSelector = true
        }
    }
    if (needsTraitSelector) showTrait()

    let allyIndex = 0
    for (let name of allyNames) {
        if (urlAddLandscapeRow(name, document.getElementById('ally_tbl'), allyIndex, 320)) allyIndex++
    }

    let prophecyIndex = 0
    for (let name of prophecyNames) {
        if (urlAddLandscapeRow(name, document.getElementById('prophecy_tbl'), prophecyIndex, 320)) prophecyIndex++
    }

    const hasMouse = mouseName !== ''
    const hasRiverboat = riverboatName !== ''
    const mouseSlug = hasMouse ? urlSlugForName(mouseName) : null
    const riverboatSlug = hasRiverboat ? urlSlugForName(riverboatName) : null
    if (hasMouse && mouseSlug === null) {
        console.warn('Landscape Randomizer integration: no image found for the Way of the Mouse card "' + mouseName + '"')
    }
    if (hasRiverboat && riverboatSlug === null) {
        console.warn('Landscape Randomizer integration: no image found for the Riverboat card "' + riverboatName + '"')
    }

    //reveal the special card section when Way of the Mouse or Riverboat is present
    if (mouseLandscapeDisplayed || hasMouse || hasRiverboat) showCards()

    if (hasMouse) {
        //Way of the Mouse landscape, followed by its chosen action card
        addRow('wayofthemouse', cardTable, rowIndex, 320)
        rowIndex++
        document.getElementById('mouse_parent').style.display = 'block'
    }
    if (hasRiverboat) {
        //Riverboat landscape, followed by its chosen action card
        addRow('riverboat', document.getElementById('riverboat_self_tbl'), 0, 200)
        document.getElementById('riverboat_parent').style.display = 'block'
    }

    if (mouseSlug !== null) {
        urlCheckExpansionBoxes(mouseSlug, mouseListChecks)
        mouseDisplayAction(mouseSlug)
    }
    if (riverboatSlug !== null) {
        urlCheckExpansionBoxes(riverboatSlug, riverboatListChecks)
        riverboatDisplayAction(riverboatSlug)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadFromURL()
})


