import type { TraitEffect } from "../potion-constants/potion-constants.module.code.ts"
import {
  FAVORITE_COLOR,
  TRAIT_CONTROL_NAMES,
  TRAIT_EFFECT,
} from "../potion-constants/potion-constants.module.code.ts"
import type {
  AccountSettings,
  Ingredient,
  IngredientFactory,
  Inventory,
  Language,
  PlayerSettings,
  Potion,
  PotionFactory,
  Quest,
  Reagent,
} from "../potion-types/potion-types.module.code.ts"

type LibAlchemyStationSurface = LibAlchemyStationLib
type LibMainMenu2Surface = typeof LibMainMenu2

type TraitFilter = Record<string, TraitEffect>

export interface PotMaker {
  name: string
  version: string
  descriptorPotion: string
  descriptorPoison: string
  traitEffect: typeof TRAIT_EFFECT
  traitControlNames: Record<number, string>
  reagentControlNames: Record<number, string>
  favoriteColor: Record<string, ZoColorDef>
  dataDefaults: PlayerSettings
  accountDefaults: AccountSettings

  ResultControls: Control[]
  PositiveTraitControls: Control[]
  NegativeTraitControls: Control[]
  SolventFilterControls: Control[]
  ReagentFilterControls: Control[]

  onlyReagentFilter: boolean | undefined
  potion2ReagentFilter: boolean | undefined
  questPotionsOnly: boolean
  favoritesOnly: boolean
  favoriteFilter: TraitFilter | ((this: void, potion: Potion) => boolean) | undefined
  doablePotions: Potion[]
  atAlchemyStation: boolean
  resultListShown: boolean
  initialized: boolean
  selected: Potion | undefined
  samePotions: Record<string, unknown>
  sameTraits: Record<string, unknown>
  resultsMaxIndex: number
  BagMode: boolean
  BankMode: boolean
  solventMode: number
  quests: Quest[] | undefined

  allReagents: Record<number, Reagent>
  badTraitMatches: Record<string, boolean>
  oppositeTraits: Record<string, string>
  traitColor: Record<string, ZoColorDef>
  SelectedSolvents: Record<number, Map<Control, boolean>>

  Ingredient: IngredientFactory
  Potion: PotionFactory
  Inventory: Inventory
  language: Language
  languageSupported: boolean
  loading: Control
  modeBar: Control
  modeBarLabel: LabelControl
  contentWindowPotion: Control
  contentWindowPoison: Control
  keybindStripDescriptor: unknown[]
  LAS: LibAlchemyStationSurface
  LMM2: LibMainMenu2Surface

  initVar: (this: void, lang?: string) => undefined
  IsProtected: (this: void, bagId: number, slotIndex: number) => boolean
  ToggleButton: (this: void, resultButton: Control, button: number) => undefined
  SetToggleButton: (this: void, resultButton: Control, checkState: number | boolean) => undefined
  ToggleButtonIsChecked: (this: void, resultButton: Control) => boolean
  GetToggleButtonCheckState: (this: void, resultButton: Control) => number
  ApplyLanguageSpecific: (this: void) => undefined
  ClearFilter: (this: void) => undefined
  AddToCraftTable: (this: void, potion: Potion) => undefined
  toggleBag: (this: void, button: Control) => undefined
  toggleBank: (this: void, button: Control) => undefined
  addAllStuffToInventory: (this: void) => undefined
  addStuffToInventoryForBag: (this: void, bagId: number) => undefined
  updateStuffofInventory: (this: void) => undefined
  addStuffToInventory: (this: void) => undefined
  searchAgain: (this: void) => undefined
  StopJobs: (this: void) => undefined
  findDoablePotions: (
    this: void,
    searchTerms?: TraitFilter,
    searchSolvent?: Ingredient,
    searchReagent?: Ingredient
  ) => undefined
  Init: (this: void) => undefined
  interactWithAlchemyStation: (this: void, eventCode: number, craftSkill: number) => undefined
  endInteractionWithAlchemyStation: (this: void, eventCode: number) => undefined
  craftCompleted: (this: void, craftSkill: number) => undefined
  slotUpdated: (this: void, eventCode: number, bagId: number, slotIndex: number) => undefined
  updateInventory: (this: void) => undefined
  OnSkillXP: (
    this: void,
    skillType: number,
    skillIndex: number,
    previousXP: number,
    currentXP: number
  ) => undefined
  checkAll: (this: void, checkButton: Control, isChecked: boolean) => undefined
  checkButtonClicked: (this: void, checkButton: Control, isChecked: boolean) => undefined
  showTraitTip: (this: void, resultButton: Control, state: boolean) => undefined
  showReagentTip: (this: void, sender: Control, state: boolean) => undefined
  showPotionTip: (this: void, resultButton: Control, state: boolean) => undefined
  previous: (this: void) => undefined
  next: (this: void) => undefined
  findFavorites: (this: void) => undefined
  findWrits: (this: void) => undefined
  InternalStartSearch: (this: void, quests?: Quest[]) => undefined
  GetQuests: (this: void) => Quest[]
  startSearch: (this: void) => undefined
  restartSearch: (this: void) => undefined
  RenderPage: (this: void) => undefined
  refreshTraits: (this: void) => undefined
  SolventClicked: (this: void, sender: Control, button: number) => undefined
  ReagentClicked: (this: void, sender: Control, button: number) => undefined
  PotionClicked: (this: void, sender: Control, button: number) => undefined
  createControls: (this: void) => undefined
  updateControls: (this: void) => undefined
  close: (this: void) => undefined
  SetSelected: (this: void, potion: Potion) => undefined
  ToggleFavorite: (this: void) => undefined
  initWindows: (this: void) => undefined
  initMainMenu: (this: void) => undefined
  initFavorites: (this: void) => undefined
  initSettingsMenu: (this: void) => undefined
  InitializeKeybindStripDescriptors: (this: void) => undefined
  initTraitLearned: (this: void) => undefined
  SelectPotionOfWrit: (this: void) => boolean
}

const DATA_DEFAULTS: PlayerSettings = {
  lastUsedTab: "TemperPotions",
  useUnknown: true,
  useMissing: false,
  fakeThirdSlot: false,
  training: false,
}

const ACCOUNT_DEFAULTS: AccountSettings = {
  showAsDefault: true,
  XPMode: true,
  reagentStackOrder: false,
  showInFavorites: "REAGENTS",
  filterFavoriteByTraits: true,
  filterFavoriteByReagents: false,
  filterFavoriteBySolvents: true,
  showMainMenuItem: true,
  useItemSaver: true,
  suppressNewTraitDialog: false,
  autoSwitchTab: true,
  favorites: {},
}

function asPotMaker(value: unknown): PotMaker {
  return value as PotMaker
}

export const PotMaker: PotMaker = asPotMaker({
  name: "TemperPotions",
  version: "5.10.2",
  descriptorPotion: "TemperPotions",
  descriptorPoison: "PoisonMaker",
  TRAIT_EFFECT,
  TRAIT_CONTROL_NAMES,
  reagentControlNames: {
    1: "Reagent1",
    2: "Reagent2",
    3: "Reagent3",
    4: "Reagent4",
  },
  FAVORITE_COLOR,
  DATA_DEFAULTS,
  ACCOUNT_DEFAULTS,
  ResultControls: [],
  PositiveTraitControls: [],
  NegativeTraitControls: [],
  SolventFilterControls: [],
  ReagentFilterControls: [],
  onlyReagentFilter: undefined,
  potion2ReagentFilter: undefined,
  questPotionsOnly: false,
  favoritesOnly: false,
  favoriteFilter: undefined,
  doablePotions: [],
  atAlchemyStation: false,
  resultListShown: false,
  initialized: false,
  selected: undefined,
  samePotions: {},
  sameTraits: {},
  resultsMaxIndex: 0,
  BagMode: true,
  BankMode: true,
  solventMode: ITEMTYPE_POTION_BASE,
  quests: undefined,
  allReagents: {},
  badTraitMatches: {},
  oppositeTraits: {},
  traitColor: {},
  SelectedSolvents: {
    [ITEMTYPE_POTION_BASE]: new Map<Control, boolean>(),
    [ITEMTYPE_POISON_BASE]: new Map<Control, boolean>(),
  },
})
