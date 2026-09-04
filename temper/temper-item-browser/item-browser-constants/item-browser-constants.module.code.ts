export const ADDON_NAME = "TemperItemBrowser"
export const SAVED_VARIABLES_NAME = "TemperItemBrowser_SavedVariables"
export const ADDON_URL = "https://www.esoui.com/downloads/info1480.html"
export const SLASH_COMMANDS_LIST = ["/itembrowser", "/ib"] as const

export const TAB_NAME = "ItemBrowser"
export const DATA_TYPE = 1
export const SORT_TYPE = 1

export const FLAG_CRAFTED = 0x01
export const FLAG_JEWELRY = 0x02
export const FLAG_WEAPON = 0x04
export const FLAG_MONSTER = 0x08
export const FLAG_MIXED_WEIGHTS = 0x10
export const FLAG_ALLIANCE_STYLE = 0x20
export const FLAG_MULTI_STYLE = 0x40
export const FLAG_MANUAL_STYLE = 0x80
export const FLAG_MYTHIC = 0x100
export const FLAG_SHIELD = 0x200

export interface ItemFlags {
  readonly crafted: number
  readonly jewelry: number
  readonly weapon: number
  readonly monster: number
  readonly mixedWeights: number
  readonly allianceStyle: number
  readonly multiStyle: number
  readonly manualStyle: number
  readonly mythic: number
  readonly shield: number
}

export const FLAGS: ItemFlags = {
  crafted: FLAG_CRAFTED,
  jewelry: FLAG_JEWELRY,
  weapon: FLAG_WEAPON,
  monster: FLAG_MONSTER,
  mixedWeights: FLAG_MIXED_WEIGHTS,
  allianceStyle: FLAG_ALLIANCE_STYLE,
  multiStyle: FLAG_MULTI_STYLE,
  manualStyle: FLAG_MANUAL_STYLE,
  mythic: FLAG_MYTHIC,
  shield: FLAG_SHIELD,
}

export const PLEDGE_FILTER_ID = 14

export const FLAG_SHOW_HEADER = 0x01
export const FLAG_SHOW_PIECES = 0x02
export const FLAG_SHOW_ACCOUNTS = 0x04
export const FLAG_FULL_PIECES = 0x08
export const FLAG_OTHER_SERVER = 0x10
export const FLAG_BROWSER_ITEM = 0x0b
export const MASK_HIDE_ACCOUNTS = 0xfb

export const CRAFTED_ENCHANTMENTS: { readonly [armorType: number]: number | undefined } = {
  [ARMORTYPE_NONE]: 0,
  [ARMORTYPE_HEAVY]: 26580,
  [ARMORTYPE_LIGHT]: 26582,
  [ARMORTYPE_MEDIUM]: 26588,
}
