import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

export const lib = LibSets

export const dungeonStr = GetString(SI_ZONEDISPLAYTYPE2)
export const undauntedStr = GetString(SI_VISUALARMORTYPE4)
export const setTypeArenaName = asPresent(lib.setTypesToName[LIBSETS_SETTYPE_ARENA])
