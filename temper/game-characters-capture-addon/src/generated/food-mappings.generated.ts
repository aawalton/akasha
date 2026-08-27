/**
 * Food Mappings (Generated)
 *
 * Maps ESO food/drink buff ability IDs to temper indices and string IDs.
 * Source: engine/food-and-drink/food-or-drink-source.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const FOOD_ABILITY_ID_TO_INDEX: Record<number, number> = {
  [17407]: 1, // Lilmoth Garlic Hagfish
  [61260]: 2, // Firsthold Fruit and Cheese Plate
  [61261]: 3, // Hearty Garlic Corn Chowder
  [72959]: 4, // Mistral Banana Bunny Hash
  [72956]: 5, // Sticky Pork and Radish Noodles
  [72961]: 6, // Invigorated Stewed Merringar
  [17581]: 7, // Crown Fortifying Meal
  [84709]: 8, // Crunchy Spider Skewer
  [84725]: 9, // Frosted Brains
  [86673]: 10, // Lava Foot Soup and Saltrice
  [89955]: 11, // Candied Jesters Coins
  [107748]: 12, // Artaeum Pickled Fish Bowl
  [89971]: 13, // Jewels of Misrule
  [100498]: 14, // Clockwork Citrus Filet
  [107789]: 15, // Artaeum Takeaway Broth
  [72824]: 16, // Orzorgas Smoked Bear Haunch
  [127596]: 17, // Bewitched Sugar Skulls
  [61322]: 18, // Markarth Mead
  [61325]: 19, // Muthseras Remorse
  [61328]: 20, // Hagravens Tonic
  [72968]: 21, // Port Hunding Pinot Noir
  [72965]: 22, // Camlorn Sweet Brown Ale
  [72971]: 23, // Honest Lassie Honey Tea
  [17614]: 24, // Crown Refreshing Drink
  [84700]: 25, // Ghastly Eye Bowl
  [84735]: 26, // Purifying Bloody Mara
  [127572]: 27, // Pack Leaders Bone Broth
  [86677]: 28, // Bergama Warning Fire
  [86559]: 29, // Hissmir Fish-Eye Rye
  [84731]: 30, // Witchmothers Potent Brew
  [127531]: 31, // Corrupting Bloody Mara
  [89957]: 32, // Dubious Camoran Throne
  [100488]: 33, // Spring Loaded Infusion
}

export const FOOD_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
  [17407]: "lilmoth-garlic-hagfish", // Lilmoth Garlic Hagfish
  [61260]: "firsthold-fruit-and-cheese-plate", // Firsthold Fruit and Cheese Plate
  [61261]: "hearty-garlic-corn-chowder", // Hearty Garlic Corn Chowder
  [72959]: "mistral-banana-bunny-hash", // Mistral Banana Bunny Hash
  [72956]: "sticky-pork-and-radish-noodles", // Sticky Pork and Radish Noodles
  [72961]: "invigorated-stewed-merringar", // Invigorated Stewed Merringar
  [17581]: "crown-fortifying-meal", // Crown Fortifying Meal
  [84709]: "crunchy-spider-skewer", // Crunchy Spider Skewer
  [84725]: "frosted-brains", // Frosted Brains
  [86673]: "lava-foot-soup-and-saltrice", // Lava Foot Soup and Saltrice
  [89955]: "candied-jesters-coins", // Candied Jesters Coins
  [107748]: "artaeum-pickled-fish-bowl", // Artaeum Pickled Fish Bowl
  [89971]: "jewels-of-misrule", // Jewels of Misrule
  [100498]: "clockwork-citrus-filet", // Clockwork Citrus Filet
  [107789]: "artaeum-takeaway-broth", // Artaeum Takeaway Broth
  [72824]: "orzorgas-smoked-bear-haunch", // Orzorgas Smoked Bear Haunch
  [127596]: "bewitched-sugar-skulls", // Bewitched Sugar Skulls
  [61322]: "markarth-mead", // Markarth Mead
  [61325]: "muthseras-remorse", // Muthseras Remorse
  [61328]: "hagravens-tonic", // Hagravens Tonic
  [72968]: "port-hunding-pinot-noir", // Port Hunding Pinot Noir
  [72965]: "camlorn-sweet-brown-ale", // Camlorn Sweet Brown Ale
  [72971]: "honest-lassie-honey-tea", // Honest Lassie Honey Tea
  [17614]: "crown-refreshing-drink", // Crown Refreshing Drink
  [84700]: "ghastly-eye-bowl", // Ghastly Eye Bowl
  [84735]: "purifying-bloody-mara", // Purifying Bloody Mara
  [127572]: "pack-leaders-bone-broth", // Pack Leaders Bone Broth
  [86677]: "bergama-warning-fire", // Bergama Warning Fire
  [86559]: "hissmir-fish-eye-rye", // Hissmir Fish-Eye Rye
  [84731]: "witchmothers-potent-brew", // Witchmothers Potent Brew
  [127531]: "corrupting-bloody-mara", // Corrupting Bloody Mara
  [89957]: "dubious-camoran-throne", // Dubious Camoran Throne
  [100488]: "spring-loaded-infusion", // Spring Loaded Infusion
}

export function getFoodIndex(abilityId: number): number {
  return FOOD_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}

export function getFoodTemperId(abilityId: number): string {
  return FOOD_ABILITY_ID_TO_TEMPER_ID[abilityId] ?? "no-food-or-drink"
}
