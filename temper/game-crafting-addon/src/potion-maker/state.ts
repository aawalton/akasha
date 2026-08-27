import type { TraitEffect } from "./constants"
import { favoriteColor, traitControlNames, traitEffect } from "./constants"
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
} from "./types"

type LibAlchemyStationSurface = typeof LibAlchemyStation
type LibMainMenu2Surface = typeof LibMainMenu2

type TraitFilter = Record<string, TraitEffect>

export interface PotMaker {
  name: string
  version: string
  descriptorPotion: string
  descriptorPoison: string
  traitEffect: typeof traitEffect
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

  initVar: (this: void, lang?: string) => void
  IsProtected: (this: void, bagId: number, slotIndex: number) => boolean
  ToggleButton: (this: void, resultButton: Control, button: number) => void
  SetToggleButton: (this: void, resultButton: Control, checkState: number | boolean) => void
  ToggleButtonIsChecked: (this: void, resultButton: Control) => boolean
  GetToggleButtonCheckState: (this: void, resultButton: Control) => number
  ApplyLanguageSpecific: (this: void) => void
  ClearFilter: (this: void) => void
  AddToCraftTable: (this: void, potion: Potion) => void
  toggleBag: (this: void, button: Control) => void
  toggleBank: (this: void, button: Control) => void
  addAllStuffToInventory: (this: void) => void
  addStuffToInventoryForBag: (this: void, bagId: number) => void
  updateStuffofInventory: (this: void) => void
  addStuffToInventory: (this: void) => void
  searchAgain: (this: void) => void
  StopJobs: (this: void) => void
  findDoablePotions: (
    this: void,
    searchTerms?: TraitFilter,
    searchSolvent?: Ingredient,
    searchReagent?: Ingredient
  ) => void
  Init: (this: void) => void
  interactWithAlchemyStation: (this: void, eventCode: number, craftSkill: number) => void
  endInteractionWithAlchemyStation: (this: void, eventCode: number) => void
  craftCompleted: (this: void, craftSkill: number) => void
  slotUpdated: (this: void, eventCode: number, bagId: number, slotIndex: number) => void
  updateInventory: (this: void) => void
  OnSkillXP: (
    this: void,
    skillType: number,
    skillIndex: number,
    previousXP: number,
    currentXP: number
  ) => void
  checkAll: (this: void, checkButton: Control, isChecked: boolean) => void
  checkButtonClicked: (this: void, checkButton: Control, isChecked: boolean) => void
  showTraitTip: (this: void, resultButton: Control, state: boolean) => void
  showReagentTip: (this: void, sender: Control, state: boolean) => void
  showPotionTip: (this: void, resultButton: Control, state: boolean) => void
  previous: (this: void) => void
  next: (this: void) => void
  findFavorites: (this: void) => void
  findWrits: (this: void) => void
  InternalStartSearch: (this: void, quests?: Quest[]) => void
  GetQuests: (this: void) => Quest[]
  startSearch: (this: void) => void
  restartSearch: (this: void) => void
  RenderPage: (this: void) => void
  refreshTraits: (this: void) => void
  SolventClicked: (this: void, sender: Control, button: number) => void
  ReagentClicked: (this: void, sender: Control, button: number) => void
  PotionClicked: (this: void, sender: Control, button: number) => void
  createControls: (this: void) => void
  updateControls: (this: void) => void
  close: (this: void) => void
  SetSelected: (this: void, potion: Potion) => void
  ToggleFavorite: (this: void) => void
  initWindows: (this: void) => void
  initMainMenu: (this: void) => void
  initFavorites: (this: void) => void
  initSettingsMenu: (this: void) => void
  InitializeKeybindStripDescriptors: (this: void) => void
  initTraitLearned: (this: void) => void
  SelectPotionOfWrit: (this: void) => boolean
}

const dataDefaults: PlayerSettings = {
  lastUsedTab: "TemperPotions",
  useUnknown: true,
  useMissing: false,
  fakeThirdSlot: false,
  training: false,
}

const accountDefaults: AccountSettings = {
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
  traitEffect,
  traitControlNames,
  reagentControlNames: {
    1: "Reagent1",
    2: "Reagent2",
    3: "Reagent3",
    4: "Reagent4",
  },
  favoriteColor,
  dataDefaults,
  accountDefaults,
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
