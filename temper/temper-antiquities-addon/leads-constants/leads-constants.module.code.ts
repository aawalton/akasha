import { STRINGS } from "../leads-ui-strings/leads-ui-strings.module.code.ts"

export const ADDON_NAME = "TemperLeads"
export const SAVED_VARIABLES_NAME = "TemperLeads_SavedVariables"
export const SLASH_COMMAND = "/temperleads"

export const FURNISHING = GetString("SI_ITEMTYPE", ITEMTYPE_FURNISHING)
export const MAJOR_ADORNMENT = GetString(
  "SI_COLLECTIBLECATEGORYTYPE",
  COLLECTIBLE_CATEGORY_TYPE_FACIAL_ACCESSORY
)
export const MOTIF_CHAPTER = GetString(
  "SI_SPECIALIZEDITEMTYPE",
  SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER
)
export const BODY_MARKING = GetString(
  "SI_COLLECTIBLECATEGORYTYPE",
  COLLECTIBLE_CATEGORY_TYPE_BODY_MARKING
)
export const EMOTE = GetString("SI_COLLECTIBLECATEGORYTYPE", COLLECTIBLE_CATEGORY_TYPE_EMOTE)
export const HEAD_MARKING = GetString(
  "SI_COLLECTIBLECATEGORYTYPE",
  COLLECTIBLE_CATEGORY_TYPE_HEAD_MARKING
)
export const TREASURE = GetString("SI_SPECIALIZEDITEMTYPE", SPECIALIZED_ITEMTYPE_TREASURE)
export const CONTAINER = GetString("SI_SPECIALIZEDITEMTYPE", SPECIALIZED_ITEMTYPE_CONTAINER)
export const HAT = GetString("SI_COLLECTIBLECATEGORYTYPE", COLLECTIBLE_CATEGORY_TYPE_HAT)
export const LIGHT = GetString("SI_SPECIALIZEDITEMTYPE", SPECIALIZED_ITEMTYPE_FURNISHING_LIGHT)

export const IS_SET: Record<string, boolean> = {
  [FURNISHING]: false,
  [MAJOR_ADORNMENT]: false,
  [MOTIF_CHAPTER]: false,
  [BODY_MARKING]: false,
  [EMOTE]: false,
  [HEAD_MARKING]: false,
  [TREASURE]: false,
  [CONTAINER]: false,
  [HAT]: false,
  [LIGHT]: false,
}

export const DROPDOWN_MAJOR_CANFIND = 0
export const DROPDOWN_MAJOR_CANSCRY = 1
export const DROPDOWN_MAJOR_MISSINGCODEX = 2
export const DROPDOWN_MAJOR_NEVERDUGOUT = 3
export const DROPDOWN_MAJOR_ACTIONABLE = 4
export const DROPDOWN_MAJOR_ALL = 5
export const DROPDOWN_MAJOR_GROUPDUNGEONS = 6
export const DROPDOWN_MAJOR_LATESTDLC = 7
export const DROPDOWN_ZONE_ALL = 0
export const DROPDOWN_ZONE_CURRENT = 1
export const DROPDOWN_ZONE_LATESTDLC = 2
export const DROPDOWN_ZONE_NODLC = 3
export const DROPDOWN_SETTYPE_ALL = 0
export const DROPDOWN_SETTYPE_NOOBVIOUS = 1
export const DROPDOWN_SETTYPE_MULTIPART = 2

export interface DropdownData {
  ChoicesMajor: string[]
  TooltipsMajor: string[]
  ChoicesZone: string[]
  TooltipsZone: string[]
  TooltipsZoneGenerated: string
  ChoicesSetType: string[]
  TooltipsSetType: string[]
  TooltipsSetTypeGenerated: string
}

export const DROPDOWN_DATA: DropdownData = {
  ChoicesMajor: [...STRINGS.DropdownData.ChoicesMajor],
  TooltipsMajor: [...STRINGS.DropdownData.TooltipsMajor],
  ChoicesZone: [...STRINGS.DropdownData.ChoicesZone],
  TooltipsZone: [...STRINGS.DropdownData.TooltipsZone],
  TooltipsZoneGenerated: STRINGS.DropdownData.TooltipsZoneGenerated,
  ChoicesSetType: [...STRINGS.DropdownData.ChoicesSetType],
  TooltipsSetType: [...STRINGS.DropdownData.TooltipsSetType],
  TooltipsSetTypeGenerated: STRINGS.DropdownData.TooltipsSetTypeGenerated,
}
