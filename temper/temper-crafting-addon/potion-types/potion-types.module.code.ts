import type { TraitEffect } from "../potion-constants/potion-constants.module.code.ts"

export interface BagSlot {
  bagId: number
  slotIndex: number
  stack: number
}

export interface Reagent {
  traits: Record<string, boolean>
  itemId: number
  itemLink?: string
  matching?: number[]
}

export interface MatchResult {
  matched: Record<string, TraitEffect>
  passSingleTrait: boolean
  count: number
}

export interface Ingredient {
  name: string
  itemId: number
  level: number
  icon: string
  stack: number
  pack: BagSlot[]
  traits: Record<string, TraitEffect>
  itemLink?: string
  matchIngredient1: (this: void, self: Ingredient, passiveIngredient: Ingredient) => MatchResult
  matchIngredient: (this: void, self: Ingredient, passiveIngredient: Ingredient) => MatchResult
  ResetStack: (this: void, self: Ingredient) => undefined
}

export interface IngredientFactory {
  name: string
  itemId: number
  level: number
  icon: string
  new: (this: void, o: Partial<Ingredient> & { itemId: number }) => Ingredient
  solvent: (this: void, o: Partial<Ingredient>) => Ingredient
}

export interface Potion {
  name: string
  searchName: string
  upperName: string
  solvent: Ingredient | undefined
  ingredients: Ingredient[]
  traits: Record<string, TraitEffect>
  numTraits: number
  qualityColor: string | ZoColorDef
  quantity: number
  itemLink: string
  itemId: string | number
  samePotionId: string | number
  sameTraitsId: string | number
}

export interface PotionFactory {
  new: (this: void, o: Partial<Potion>) => Potion
  get: (this: void, resultButton: Control) => Potion
  show: (this: void, resultButton: Control) => undefined
  GetQualityColor: (this: void, self: Potion) => string | ZoColorDef
  GetName: (this: void, self: Potion) => string
  GetUpperName: (this: void, self: Potion) => string
  MatchesQuest: (this: void, self: Potion) => boolean
  conformsToSearch: (this: void, self: Potion, searchTerms: Record<string, TraitEffect>) => boolean
  createFavoriteIdentifier: (this: void, self: Potion) => undefined
  getIngredientString: (this: void, self: Potion) => string
  getInBagString: (this: void, self: Potion) => string
  getPotionNameString: (this: void, self: Potion) => string
  SetToolTip: (this: void, self: Potion, resultButton: Control) => undefined
}

export interface IngredientView extends Ingredient {
  protected?: boolean
}
export interface TraitData {
  name: string
  icon: string
}
export interface ControlFields {
  reagent?: IngredientView
  solvent?: IngredientView
  potion?: {
    itemId: number
    itemLink: string
    samePotionId: number | string
    sameTraitsId: number | string
  }
  trait?: TraitData
  Trait?: string
  text?: string
  traitControls?: Control[]
}

export interface Inventory {
  reagents: Record<number, Ingredient>
  solvents: Record<number, Ingredient>
}

export interface Quest {
  name: string
  traits: Record<string, TraitEffect>
  solventType?: number
  [key: string]: unknown
}

export interface Favorite {
  samePotion?: boolean
  sameTraits?: boolean
  [key: string]: unknown
}

export interface PlayerSettings {
  lastUsedTab: string
  useUnknown: boolean
  useMissing: boolean
  fakeThirdSlot: boolean
  training: boolean
  favorites?: Record<string, Favorite>
  [key: string]: unknown
}

export interface AccountSettings {
  showAsDefault: boolean
  XPMode: boolean
  reagentStackOrder: boolean
  showInFavorites: string
  filterFavoriteByTraits: boolean
  filterFavoriteByReagents: boolean
  filterFavoriteBySolvents: boolean
  showMainMenuItem: boolean
  useItemSaver: boolean
  suppressNewTraitDialog: boolean
  autoSwitchTab: boolean
  favorites: Record<string, Favorite>
  [key: string]: unknown
}

export interface Language {
  name: string
  check_all: string
  uncheck_all: string
  search: string
  search_again: string
  only: string
  potion2reagents: string
  questpotionsonly: string
  need_solvent: string
  search_results: string
  combinations: string
  favorites: string
  mark_favorite: string
  unmark_favorite: string
  skill: string
  settings_short: string
  settings_enableBtn: string
  use_missing_reagents_short: string
  use_missing_reagents_long: string
  use_missing_reagents_warning: string
  use_unknown_traits_short: string
  use_unknown_traits_long: string
  fake_third_slot_short: string
  fake_third_slot_long: string
  training_short: string
  training_long: string
  training_warning: string
  same_window_coords_short: string
  same_window_coords_long: string
  show_xp_short: string
  show_xp_long: string
  reagent_stackorder_short: string
  reagent_stackorder_long: string
  show_favorite_header: string
  show_favorite_short: string
  show_favorite_long: string
  show_favorite_reagents: string
  show_favorite_potion: string
  show_favorite_traits: string
  filter_favorite_traits: string
  filter_favorite_solvents: string
  filter_favorite_reagents: string
  show_mainmenu_item_short: string
  show_mainmenu_item_long: string
  show_as_default: string
  show_as_default_long: string
  item_saver_header: string
  use_item_saver: string
  use_item_saver_long: string
  item_saver_protected: string
  suppress_new_trait_dialog: string
  suppress_new_trait_dialog_long: string
  auto_switch_tabs: string
  auto_switch_tabs_long: string
  traitNames: Record<string, string>
}
