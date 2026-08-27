import { asPresent } from "../../casts"

export const lib = LibSets

export const fallbackLang = lib.fallbackLang

export const undauntedStr = GetString(SI_VISUALARMORTYPE4)
export const dungeonStr = GetString(SI_ZONEDISPLAYTYPE2)
export const setTypeArenaName = asPresent(lib.setTypesToName[LIBSETS_SETTYPE_ARENA])
