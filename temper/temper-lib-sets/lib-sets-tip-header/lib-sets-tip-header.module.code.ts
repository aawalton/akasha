import {
  asBoolean,
  asBooleanOpt,
  asString,
  asStringOpt,
  asStrRecord,
  asStrRecordOpt,
  asTyped,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asChestNameTable } from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

const langToUse = lib.LangAllowedCheck(lib.clientLang)
const localization = asStrRecord(lib.localization[langToUse])

const dungeonStr = asString(localization["dropZoneDungeon"])
const vetDungeonStr = asString(localization["dropZoneVeteranDungeon"])
const imperialCityStr = asString(localization["dropZoneImperialCity"])
const imperialSewersStr = asString(localization["dropZoneImperialSewers"])
const cyrodiilStr = asString(localization["dropZoneCyrodiil"])
const undauntedChestStr = asString(localization["undauntedChest"])

const SET_TYPE_TO_TEXTURE = lib.setTypeToTexture
const vetDungTexture = asString(SET_TYPE_TO_TEXTURE["vet_dung"])
const SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR = lib.setTypeToDropZoneLocalizationStr

STATE.veteranDungeonIconStr = zo_iconTextFormat(vetDungTexture, 24, 24, dungeonStr, undefined)

export const MONSTER_SET_TYPE_TO_VETERAN_STR: { [setType: number]: string } = {
  [LIBSETS_SETTYPE_MONSTER]: STATE.veteranDungeonIconStr,
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: imperialCityStr,
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: cyrodiilStr,
}
export const MONSTER_SET_TYPE_TO_NO_VETERAN_STR: { [setType: number]: string } = {
  [LIBSETS_SETTYPE_MONSTER]: undauntedChestStr,
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: imperialSewersStr,
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: cyrodiilStr,
}

export const BLACKLISTED_SET_IDS_FOR_ZONE_TOOLTIPS: { [setId: number]: boolean } = {
  326: true,
  327: true,
  328: true,
  329: true,
  334: true,
  380: true,
  381: true,
  483: true,
  484: true,
  485: true,
  486: true,
  509: true,
  510: true,
  511: true,
  512: true,
}

export const popupTooltip = PopupTooltip
export const infoTooltip = InformationTooltip
export const itemTooltip = ItemTooltip

const MM_NAME = "MasterMerchant"
const MM_WINDOW_LIST_NAME = "WindowList"
const MM_CONTENTS_NAME = "Contents"
const MM_WindowListName = MM_NAME + MM_WINDOW_LIST_NAME
export const MASTER_MERCHANT_CTRL_NAMES: { [ctrlName: string]: boolean } = {
  [MM_WindowListName]: true,
  [MM_WindowListName + MM_CONTENTS_NAME]: true,
  [MM_NAME + "Guild" + MM_WINDOW_LIST_NAME + MM_CONTENTS_NAME]: true,
}
export const IIFA_CTRL_NAMES: { [ctrlName: string]: boolean } = {
  IIFA_ListItem: true,
}

export const undauntedChestIdNames = asChestNameTable(lib.undauntedChestIds[langToUse])
export const reconstructionCostsStr = asString(localization["reconstructionCosts"])
export const neededTraitsStr = asString(localization["neededTraits"])
export const droppedByStr = asString(localization["droppedBy"])
export const dropMechanicStr = asString(localization["dropMechanic"])
export const dropLocationZonesStr = asString(localization["dropZones"])

export const tooltipGameDataEntryToAddAfter = TOOLTIP_GAME_DATA_MYTHIC_OR_STOLEN

export { dungeonStr, langToUse, SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR, vetDungTexture }

export function addZoneColor(this: void, str: string): string {
  return "|cA9A9A9" + str + "|r"
}

function getLibSetsTooltipSavedVariables(this: void): { [key: string]: unknown } | undefined {
  if (lib.svData === undefined) {
    return undefined
  }
  return asStrRecordOpt(lib.svData["tooltipModifications"])
}

function getDropMechanicTexture(
  this: void,
  dropMechanicId: number | undefined
): string | undefined {
  if (dropMechanicId === undefined) {
    return undefined
  }
  return lib.dropMechanicIdToTexture[dropMechanicId]
}
lib.GetDropMechanicTexture = getDropMechanicTexture

function isCustomTooltipEnabled(this: void, value?: string): boolean {
  STATE.setReconstructionCostPlaceholder = false
  STATE.setTypePlaceholder = false
  STATE.dropMechanicPlaceholder = false
  STATE.dropZonesPlaceholder = false
  STATE.bossNamePlaceholder = false
  STATE.neededTraitsPlaceholder = false
  STATE.dlcNamePlaceHolder = false
  STATE.setSearchFavoritesPlaceHolder = false
  STATE.addLineBreakAfterNonEmptyParts = false

  const svData = asStrRecordOpt(lib.svData)
  let useCustomTooltipPattern = value
  if (useCustomTooltipPattern === undefined) {
    useCustomTooltipPattern = asStringOpt(svData?.["useCustomTooltipPattern"])
  }
  if (useCustomTooltipPattern !== undefined && useCustomTooltipPattern !== "") {
    const [patternMatchStart] = string.find(useCustomTooltipPattern, "<<%d>>", 1, false)
    if (patternMatchStart !== undefined) {
      let doAdd = false
      for (const [placeholder] of string.gmatch(useCustomTooltipPattern, "<<%d>>+")) {
        if (placeholder === "<<1>>") {
          STATE.setTypePlaceholder = true
          doAdd = true
          STATE.lastPlaceHolderInCustomTooltip = "setTypePlaceholder"
        } else if (placeholder === "<<2>>") {
          STATE.dropMechanicPlaceholder = true
          doAdd = true
          STATE.lastPlaceHolderInCustomTooltip = "dropMechanicPlaceholder"
        } else if (placeholder === "<<3>>") {
          STATE.dropZonesPlaceholder = true
          doAdd = true
          STATE.lastPlaceHolderInCustomTooltip = "dropZonesPlaceholder"
        } else if (placeholder === "<<4>>") {
          STATE.bossNamePlaceholder = true
          doAdd = true
          STATE.lastPlaceHolderInCustomTooltip = "bossNamePlaceholder"
        } else if (placeholder === "<<5>>") {
          STATE.neededTraitsPlaceholder = true
          STATE.setReconstructionCostPlaceholder = true
          doAdd = true
          STATE.lastPlaceHolderInCustomTooltip = "neededTraitsPlaceholder"
        } else if (placeholder === "<<6>>") {
          STATE.dlcNamePlaceHolder = true
          doAdd = true
          STATE.lastPlaceHolderInCustomTooltip = "dlcNamePlaceHolder"
        } else if (placeholder === "<<7>>") {
          STATE.setSearchFavoritesPlaceHolder = true
          doAdd = true
          STATE.lastPlaceHolderInCustomTooltip = "setSearchFavoritesPlaceHolder"
        }
      }
      if (doAdd === true) {
        STATE.addLineBreakAfterNonEmptyParts = asBoolean(
          svData?.["addLineBreakAtCustomTooltipParts"]
        )
        return true
      }
    }
  }
  return false
}
lib.IsLibSetsCustomTooltipEnabled = isCustomTooltipEnabled

function isLibSetsTooltipEnabled(this: void): undefined {
  const tooltipSV = STATE.tooltipSV
  if (tooltipSV === undefined) {
    return
  }
  STATE.tooltipTextures = asBooleanOpt(tooltipSV["tooltipTextures"])
  STATE.veteranDungeonIconStr =
    STATE.tooltipTextures === true
      ? zo_iconTextFormat(vetDungTexture, 24, 24, dungeonStr, undefined)
      : vetDungeonStr
  MONSTER_SET_TYPE_TO_VETERAN_STR[LIBSETS_SETTYPE_MONSTER] = STATE.veteranDungeonIconStr

  STATE.addDropLocation = asBooleanOpt(tooltipSV["addDropLocation"])
  STATE.addDropMechanic = asBooleanOpt(tooltipSV["addDropMechanic"])
  STATE.addDLC = asBooleanOpt(tooltipSV["addDLC"])
  STATE.addBossName = asBooleanOpt(tooltipSV["addBossName"])
  STATE.addSetType = asBooleanOpt(tooltipSV["addSetType"])
  STATE.addNeededTraits = asBooleanOpt(tooltipSV["addNeededTraits"])
  STATE.addReconstructionCost = asBooleanOpt(tooltipSV["addReconstructionCost"])
  STATE.addFavorites = asBooleanOpt(tooltipSV["addFavorites"])

  STATE.anyTooltipInfoToAdd =
    STATE.useCustomTooltip === true ||
    (!STATE.useCustomTooltip &&
      (STATE.addDropLocation === true ||
        STATE.addDropMechanic === true ||
        STATE.addDLC === true ||
        STATE.addBossName === true ||
        STATE.addSetType === true ||
        STATE.addNeededTraits === true ||
        STATE.addReconstructionCost === true ||
        STATE.addFavorites === true))
}
lib.IsLibSetsTooltipEnabled = isLibSetsTooltipEnabled

const slots = asTyped<{ [slot: string]: unknown }>(lib)
slots["_getLibSetsTooltipSavedVariables"] = getLibSetsTooltipSavedVariables
