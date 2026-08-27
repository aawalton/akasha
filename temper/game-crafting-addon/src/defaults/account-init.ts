export interface AccountPlayerEntry {
  race: number
  class: number
  level: number
  faction: number
  mount: {
    space: string
    stamina: string
    speed: string
    complete: boolean
    time: number
  }
  skillPoints: string
  skyShards: string | number
  [key: string]: unknown
}

export interface StoredTraitItem {
  link?: string
  [key: string]: unknown
}

export interface AccountOptions {
  showbutton: boolean
  lockbutton: boolean
  lockelements: boolean
  closeonmove: boolean
  useartisan: boolean
  useflask: boolean
  usequest: boolean
  usecook: boolean
  displaystyles: boolean
  markitems: boolean
  showsymbols: boolean
  marksetitems: boolean
  showstock: boolean
  stacksplit: boolean
  markduplicates: boolean
  displayrunelevel: boolean
  displaymm: boolean
  displayttc: boolean
  timeralarm: number
  mountalarm: number
  researchalarm: number
  playrunevoice: boolean
  advancedcolorgrid: boolean
  lockprotection: boolean
  inspirationgain: boolean
  sortsets: number
  sortstyles: number
  bulkcraftlimit: number
  overviewstyle: number
  userune: boolean
  userunecreation: boolean
  useruneextraction: boolean
  userunerecipe: boolean
  displayknown: boolean
  displayunknown: boolean
  displaycount: boolean
}

export interface AccountData {
  mainchar: string | false
  timer: Record<number, number>
  position: Record<number, number>
  questbox: Record<number, number>
  button: Record<number, number>
  player: Record<string, AccountPlayerEntry>
  storage: Record<string, Record<string, number | undefined>>
  materials: Record<string, { raw: boolean; link: string }>
  announce: Record<string, number>
  crafting: {
    jewelryIdSwapMigrationAlreadyDoneDone: boolean
    studies: Record<string, Record<number, Record<number, Record<number, boolean>>>>
    stored: Record<number, Record<number, Record<number, StoredTraitItem>>>
    skill: Record<string, unknown>
  }
  style: { tracking: Record<string, boolean> }
  cook: {
    tracking: Record<string, boolean>
    ingredients: Record<number, unknown>
  }
  furnisher: {
    tracking: Record<string, boolean>
    ingredients: Record<number, unknown>
  }
  trait: { tracking: Record<string, boolean> }
  coords: {
    style: Record<number, number>
    recipe: Record<number, number>
    blueprint: Record<number, number>
    rune: Record<number, number>
    cook: Record<number, number>
    overview: Record<number, number>
  }
  options: AccountOptions
  [key: string]: unknown
}

export const AccountInit: AccountData = {
  mainchar: false,
  timer: { 12: 0, 24: 0 },
  position: { 1: 350, 2: 100 },
  questbox: { 1: GuiRoot.GetWidth() - 500, 2: -20 },
  button: { 1: 75, 2: 75 },
  player: {},
  storage: {},
  materials: {},
  announce: {},
  crafting: {
    jewelryIdSwapMigrationAlreadyDoneDone: false,
    studies: {},
    stored: {},
    skill: {},
  },
  style: { tracking: {} },
  cook: { tracking: {}, ingredients: {} },
  furnisher: { tracking: {}, ingredients: {} },
  trait: { tracking: {} },
  coords: {
    style: { 1: 500, 2: 200 },
    recipe: { 1: 600, 2: 200 },
    blueprint: { 1: GuiRoot.GetWidth() - 500, 2: 140 },
    rune: { 1: GuiRoot.GetWidth() - 544, 2: 140 },
    cook: { 1: GuiRoot.GetWidth() - 544, 2: 140 },
    overview: { 1: (GuiRoot.GetWidth() - 601) / 2, 2: (GuiRoot.GetHeight() - 801) / 2 },
  },
  options: {
    showbutton: true,
    lockbutton: false,
    lockelements: false,
    closeonmove: true,
    useartisan: false,
    useflask: false,
    usequest: false,
    usecook: true,
    displaystyles: false,
    markitems: true,
    showsymbols: false,
    marksetitems: true,
    showstock: true,
    stacksplit: true,
    markduplicates: true,
    displayrunelevel: true,
    displaymm: true,
    displayttc: true,
    timeralarm: 1,
    mountalarm: 1,
    researchalarm: 1,
    playrunevoice: true,
    advancedcolorgrid: true,
    lockprotection: true,
    inspirationgain: true,
    sortsets: 1,
    sortstyles: 1,
    bulkcraftlimit: 10,
    overviewstyle: 1,
    userune: true,
    userunecreation: true,
    useruneextraction: true,
    userunerecipe: true,
    displayknown: true,
    displayunknown: true,
    displaycount: true,
  },
}
