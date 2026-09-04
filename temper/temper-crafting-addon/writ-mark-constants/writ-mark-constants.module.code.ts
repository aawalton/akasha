export const ADDON_NAME = "TemperMasterWritInventoryMarker"
export const ADDON_TITLE = "Master Writ Inventory Marker"
export const SAVED_VARIABLES_NAME = "TemperMasterWritInventoryMarker_SavedVariables"

export type MarkerState = "doable" | "completed" | "unknown"

export const DEFAULT_COLORS: Record<MarkerState, number> = {
  doable: 0xffff00,
  completed: 0x00ff00,
  unknown: 0xdd0000,
}

export const MARKERS: Record<MarkerState, string> = {
  doable: "TemperCrafting/art/yes.dds",
  completed: "TemperCrafting/art/yes.dds",
  unknown: "TemperCrafting/art/no.dds",
}

export const EQUIPMENT_CHAPTERS: Record<number, number> = {
  [26]: ITEM_STYLE_CHAPTER_HELMETS,
  [28]: ITEM_STYLE_CHAPTER_CHESTS,
  [29]: ITEM_STYLE_CHAPTER_SHOULDERS,
  [30]: ITEM_STYLE_CHAPTER_BELTS,
  [31]: ITEM_STYLE_CHAPTER_LEGS,
  [32]: ITEM_STYLE_CHAPTER_BOOTS,
  [34]: ITEM_STYLE_CHAPTER_GLOVES,
  [35]: ITEM_STYLE_CHAPTER_HELMETS,
  [37]: ITEM_STYLE_CHAPTER_CHESTS,
  [38]: ITEM_STYLE_CHAPTER_SHOULDERS,
  [39]: ITEM_STYLE_CHAPTER_BELTS,
  [40]: ITEM_STYLE_CHAPTER_LEGS,
  [41]: ITEM_STYLE_CHAPTER_BOOTS,
  [43]: ITEM_STYLE_CHAPTER_GLOVES,
  [44]: ITEM_STYLE_CHAPTER_HELMETS,
  [46]: ITEM_STYLE_CHAPTER_CHESTS,
  [47]: ITEM_STYLE_CHAPTER_SHOULDERS,
  [48]: ITEM_STYLE_CHAPTER_BELTS,
  [49]: ITEM_STYLE_CHAPTER_LEGS,
  [50]: ITEM_STYLE_CHAPTER_BOOTS,
  [52]: ITEM_STYLE_CHAPTER_GLOVES,
  [53]: ITEM_STYLE_CHAPTER_AXES,
  [56]: ITEM_STYLE_CHAPTER_MACES,
  [59]: ITEM_STYLE_CHAPTER_SWORDS,
  [62]: ITEM_STYLE_CHAPTER_DAGGERS,
  [65]: ITEM_STYLE_CHAPTER_SHIELDS,
  [67]: ITEM_STYLE_CHAPTER_SWORDS,
  [68]: ITEM_STYLE_CHAPTER_AXES,
  [69]: ITEM_STYLE_CHAPTER_MACES,
  [70]: ITEM_STYLE_CHAPTER_BOWS,
  [71]: ITEM_STYLE_CHAPTER_STAVES,
  [72]: ITEM_STYLE_CHAPTER_STAVES,
  [73]: ITEM_STYLE_CHAPTER_STAVES,
  [74]: ITEM_STYLE_CHAPTER_STAVES,
  [75]: ITEM_STYLE_CHAPTER_CHESTS,
}

export const INVENTORY_TYPES: Record<number, boolean> = {
  [INVENTORY_BACKPACK]: true,
  [INVENTORY_BANK]: true,
  [INVENTORY_HOUSE_BANK]: true,
  [INVENTORY_GUILD_BANK]: true,
}

export const SHOW_TRAIT_HIDDEN_COLUMNS: Record<string, boolean> = {
  sellInformationSortOrder: true,
}
