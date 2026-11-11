# dominion-landscape-randomizer

This webpage is a way to add landscape card-shaped things to physical Dominion games. They are not sorted by Expansion, but by Type (Event, Landmark, etc.) and what Components (Victory Tokens, Debt etc.) are needed.
It randomly selects a specified number of landscape cards based on selected parameters. 

To use:
- Select which Components you own (or are willing to use makeshift versions of). By default all tokens are selected, but not cards.
- Select which Landscape types you want, the minimum and maximum you want chosen.
- Select how many Landscapes you want in total. By default this is 2, the maximum reccommended amount.

There is also a generator for Way of the Mouse, which allows you to choose which expansions the $2/$3 cost cards come from.
The expansions are shown by their symbols and listed in order of original release, with Promo cards at the end.
If it's a Liaison, an Ally will be added, and if it's a Fate card, a generator for Boons will be displayed. 

## Integration with the Dominion Randomizer

The [Dominion Randomizer](https://github.com/vbst7/dominion-randomizer) can open this page with its generated
landscapes pre-loaded: its "Open in Landscape Randomizer" button (next to the Landscape cards) links here with
the cards passed as URL arguments, and this page displays those cards instead of randomizing its own:

- `cards`: the Events, Landmarks, Projects and Ways, by name, comma-separated
- `traits`: the Traits (also shown in `cards`, plus the trait selector)
- `prophecies`: the Prophecies
- `allies`: the Allies
- `mouse`: the $2-$3 Action card chosen for Way of the Mouse (the Way of the Mouse landscape is displayed with it)
- `riverboat`: the $5 Action card chosen for Riverboat (the Riverboat landscape is displayed with it)

Whether DR includes `traits`, `prophecies` and `allies` in the link is decided by its settings.
Ferryman, Young Witch (Bane) and Approaching Army do not pass their associated cards, as those add a new
pile to DR's kingdom rather than a new card name. If a card name has no image on this page, it is skipped
with a warning in the browser console.

