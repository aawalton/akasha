export interface CharacterData {
  income: Record<number, number>
  favorites: Record<number, Record<string, Record<number, number> | undefined>>
  recipe: number
  furniture: number
  potency: number
  essence: number
  aspect: number
  potencytype: number
  enchant: number
  runemode: string
  hidestyles: boolean
  hidecrownstyles: boolean
  hideperfectedstyles: boolean
  hideunknownstyles: boolean
  hideKnownRecipes: boolean
  hideUnknownRecipes: boolean
  hideKnownBlueprints: boolean
  hideUnknownBlueprints: boolean
  previewtype: number
  [key: string]: unknown
}

export const CharInit: CharacterData = {
  income: { 1: GetDate(), 2: GetCurrentMoney() },
  favorites: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
  recipe: 1,
  furniture: 1,
  potency: 1,
  essence: 1,
  aspect: 1,
  potencytype: 1,
  enchant: ITEMTYPE_GLYPH_ARMOR,
  runemode: "craft",
  hidestyles: false,
  hidecrownstyles: false,
  hideperfectedstyles: false,
  hideunknownstyles: false,
  hideKnownRecipes: false,
  hideUnknownRecipes: false,
  hideKnownBlueprints: false,
  hideUnknownBlueprints: false,
  previewtype: 1,
}
