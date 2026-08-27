import {
  asBoolean,
  asBooleanOpt,
  asString,
  asStringOpt,
  asStrRecord,
  asStrRecordOpt,
  asTyped,
} from "../casts"
import { asChestNameTable } from "./casts"
import { state } from "./state"

const lib = LibSets

const langToUse = lib.LangAllowedCheck(lib.clientLang)
const localization = asStrRecord(lib.localization[langToUse])

const dungeonStr = asString(localization["dropZoneDungeon"])
const vetDungeonStr = asString(localization["dropZoneVeteranDungeon"])
const imperialCityStr = asString(localization["dropZoneImperialCity"])
const imperialSewersStr = asString(localization["dropZoneImperialSewers"])
const cyrodiilStr = asString(localization["dropZoneCyrodiil"])
const undauntedChestStr = asString(localization["undauntedChest"])

const setTypeToTexture = lib.setTypeToTexture
const vetDungTexture = asString(setTypeToTexture["vet_dung"])
const setTypeToDropZoneLocalizationStr = lib.setTypeToDropZoneLocalizationStr

state.veteranDungeonIconStr = zo_iconTextFormat(vetDungTexture, 24, 24, dungeonStr, undefined)

export const monsterSetTypeToVeteranStr: { [setType: number]: string } = {
  [LIBSETS_SETTYPE_MONSTER]: state.veteranDungeonIconStr,
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: imperialCityStr,
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: cyrodiilStr,
}
export const monsterSetTypeToNoVeteranStr: { [setType: number]: string } = {
  [LIBSETS_SETTYPE_MONSTER]: undauntedChestStr,
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: imperialSewersStr,
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: cyrodiilStr,
}

export const blacklistedSetIdsForZoneTooltips: { [setId: number]: boolean } = {
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

const MM_name = "MasterMerchant"
const MM_windowListName = "WindowList"
const MM_contentsName = "Contents"
const MM_WindowListName = MM_name + MM_windowListName
export const masterMerchantCtrlNames: { [ctrlName: string]: boolean } = {
  [MM_WindowListName]: true,
  [MM_WindowListName + MM_contentsName]: true,
  [MM_name + "Guild" + MM_windowListName + MM_contentsName]: true,
}
export const IIfACtrlNames: { [ctrlName: string]: boolean } = {
  IIFA_ListItem: true,
}

export const undauntedChestIdNames = asChestNameTable(lib.undauntedChestIds[langToUse])
export const reconstructionCostsStr = asString(localization["reconstructionCosts"])
export const neededTraitsStr = asString(localization["neededTraits"])
export const droppedByStr = asString(localization["droppedBy"])
export const dropMechanicStr = asString(localization["dropMechanic"])
export const dropLocationZonesStr = asString(localization["dropZones"])

export const tooltipGameDataEntryToAddAfter = TOOLTIP_GAME_DATA_MYTHIC_OR_STOLEN

export { dungeonStr, langToUse, setTypeToDropZoneLocalizationStr, vetDungTexture }

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
  state.setReconstructionCostPlaceholder = false
  state.setTypePlaceholder = false
  state.dropMechanicPlaceholder = false
  state.dropZonesPlaceholder = false
  state.bossNamePlaceholder = false
  state.neededTraitsPlaceholder = false
  state.dlcNamePlaceHolder = false
  state.setSearchFavoritesPlaceHolder = false
  state.addLineBreakAfterNonEmptyParts = false

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
          state.setTypePlaceholder = true
          doAdd = true
          state.lastPlaceHolderInCustomTooltip = "setTypePlaceholder"
        } else if (placeholder === "<<2>>") {
          state.dropMechanicPlaceholder = true
          doAdd = true
          state.lastPlaceHolderInCustomTooltip = "dropMechanicPlaceholder"
        } else if (placeholder === "<<3>>") {
          state.dropZonesPlaceholder = true
          doAdd = true
          state.lastPlaceHolderInCustomTooltip = "dropZonesPlaceholder"
        } else if (placeholder === "<<4>>") {
          state.bossNamePlaceholder = true
          doAdd = true
          state.lastPlaceHolderInCustomTooltip = "bossNamePlaceholder"
        } else if (placeholder === "<<5>>") {
          state.neededTraitsPlaceholder = true
          state.setReconstructionCostPlaceholder = true
          doAdd = true
          state.lastPlaceHolderInCustomTooltip = "neededTraitsPlaceholder"
        } else if (placeholder === "<<6>>") {
          state.dlcNamePlaceHolder = true
          doAdd = true
          state.lastPlaceHolderInCustomTooltip = "dlcNamePlaceHolder"
        } else if (placeholder === "<<7>>") {
          state.setSearchFavoritesPlaceHolder = true
          doAdd = true
          state.lastPlaceHolderInCustomTooltip = "setSearchFavoritesPlaceHolder"
        }
      }
      if (doAdd === true) {
        state.addLineBreakAfterNonEmptyParts = asBoolean(
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
  const tooltipSV = state.tooltipSV
  if (tooltipSV === undefined) {
    return
  }
  state.tooltipTextures = asBooleanOpt(tooltipSV["tooltipTextures"])
  state.veteranDungeonIconStr =
    state.tooltipTextures === true
      ? zo_iconTextFormat(vetDungTexture, 24, 24, dungeonStr, undefined)
      : vetDungeonStr
  monsterSetTypeToVeteranStr[LIBSETS_SETTYPE_MONSTER] = state.veteranDungeonIconStr

  state.addDropLocation = asBooleanOpt(tooltipSV["addDropLocation"])
  state.addDropMechanic = asBooleanOpt(tooltipSV["addDropMechanic"])
  state.addDLC = asBooleanOpt(tooltipSV["addDLC"])
  state.addBossName = asBooleanOpt(tooltipSV["addBossName"])
  state.addSetType = asBooleanOpt(tooltipSV["addSetType"])
  state.addNeededTraits = asBooleanOpt(tooltipSV["addNeededTraits"])
  state.addReconstructionCost = asBooleanOpt(tooltipSV["addReconstructionCost"])
  state.addFavorites = asBooleanOpt(tooltipSV["addFavorites"])

  state.anyTooltipInfoToAdd =
    state.useCustomTooltip === true ||
    (!state.useCustomTooltip &&
      (state.addDropLocation === true ||
        state.addDropMechanic === true ||
        state.addDLC === true ||
        state.addBossName === true ||
        state.addSetType === true ||
        state.addNeededTraits === true ||
        state.addReconstructionCost === true ||
        state.addFavorites === true))
}
lib.IsLibSetsTooltipEnabled = isLibSetsTooltipEnabled

const slots = asTyped<{ [slot: string]: unknown }>(lib)
slots["_getLibSetsTooltipSavedVariables"] = getLibSetsTooltipSavedVariables
