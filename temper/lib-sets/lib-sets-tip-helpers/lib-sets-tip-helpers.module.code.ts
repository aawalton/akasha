import {
  asAnyObject,
  asNumber,
  asNumberOpt,
  asPresent,
  asString,
  asStringArray,
  asStringOpt,
  asStrRecordOpt,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asAnyNotNilTable,
  asEquipBoolTable,
  asFavoritesAccessor,
} from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import {
  MONSTER_SET_TYPE_TO_NO_VETERAN_STR,
  MONSTER_SET_TYPE_TO_VETERAN_STR,
  SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR,
  undauntedChestIdNames,
} from "../lib-sets-tip-header/lib-sets-tip-header.module.code.ts"
import { getSetReconstructionCost } from "../lib-sets-tip-item-link/lib-sets-tip-item-link.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

const SET_TYPE_TO_TEXTURE = lib.setTypeToTexture
const undauntedChestTexture = asString(SET_TYPE_TO_TEXTURE["undaunted chest"])
const vetDungTexture = asString(SET_TYPE_TO_TEXTURE["vet_dung"])

export function isLineBreakAtEnd(this: void, str: string | undefined): boolean {
  if (str === undefined || str === "") {
    return false
  }
  const endOfStr = string.sub(str, -2)
  return endOfStr !== undefined && endOfStr !== "" && endOfStr === "\n"
}

const IS_SPECIAL_CHAR: { [ch: string]: boolean } = {
  "[": true,
  "(": true,
  ")": true,
  "]": true,
}

export function addLineBreakIfNotEmpty(
  this: void,
  str: string | undefined,
  nextChar?: string,
  customSetStringPart?: string
): string | undefined {
  if (
    str !== undefined &&
    str !== "" &&
    isLineBreakAtEnd(str) === false &&
    (nextChar === undefined || (nextChar !== undefined && !IS_SPECIAL_CHAR[nextChar])) &&
    (customSetStringPart === undefined ||
      (customSetStringPart !== undefined &&
        customSetStringPart !== STATE.lastPlaceHolderInCustomTooltip))
  ) {
    str = str + "\n"
  }
  return str
}

export function checkTraitsNeededGiven(this: void, setData: { [key: string]: unknown }): boolean {
  const setType = asNumberOpt(setData["setType"])
  return (
    setType !== undefined &&
    setData["traitsNeeded"] !== undefined &&
    setType === LIBSETS_SETTYPE_CRAFTED
  )
}

export function tableContentsAreAllTheSame(this: void, tabToCheck: unknown): boolean {
  if (ZO_IsTableEmpty(asAnyObject(tabToCheck))) {
    return false
  }
  const entriesChecked = new LuaMap<AnyNotNil, boolean>()
  for (const [, entry] of pairs(asAnyNotNilTable(tabToCheck))) {
    entriesChecked.set(entry, true)
  }
  if (NonContiguousCount(entriesChecked) === 1) {
    return true
  }
  return false
}

export function buildSetNeededTraitsInfo(
  this: void,
  setData: { [key: string]: unknown }
): string | undefined {
  if (!checkTraitsNeededGiven(setData)) {
    return undefined
  }
  const traitsNeeded = tostring(setData["traitsNeeded"])
  if (traitsNeeded === "") {
    return undefined
  }
  return tostring(traitsNeeded)
}

export function addNonVeteranUndauntedChestName(
  this: void,
  setType: number | undefined,
  undauntedChestId: number | undefined,
  buildTextures?: boolean
): string {
  if (
    setType === undefined ||
    undauntedChestId === undefined ||
    asString(undauntedChestId) === "" ||
    undauntedChestId <= 0
  ) {
    return ""
  }
  const buildTexturesResolved = buildTextures ?? false
  if (setType === LIBSETS_SETTYPE_MONSTER) {
    const undauntedChestName = asPresent(undauntedChestIdNames[undauntedChestId])
    let undauntedChestTextureAndName: string
    if (STATE.tooltipTextures === true || buildTexturesResolved === true) {
      undauntedChestTextureAndName = zo_iconTextFormatNoSpace(
        undauntedChestTexture,
        24,
        24,
        undauntedChestName,
        undefined
      )
    } else {
      undauntedChestTextureAndName = undauntedChestName
    }
    if (undauntedChestTextureAndName === "") {
      return ""
    }
    return " (" + undauntedChestTextureAndName + ")"
  }
  return ""
}

export function getDungeonDifficultyStr(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  buildTextures?: boolean
): LuaMultiReturn<[unknown, boolean]> {
  const buildTexturesResolved = buildTextures ?? false
  const veteranData = setData["veteran"]
  const setType = asNumberOpt(setData["setType"])
  if (veteranData !== undefined) {
    if (type(veteranData) === "table") {
      const equipType = GetItemLinkEquipType(asPresent(itemLink))
      if (equipType !== undefined) {
        const isVeteran = asEquipBoolTable(veteranData)[asNumber(equipType)]
        if (isVeteran) {
          const veteranStr =
            MONSTER_SET_TYPE_TO_VETERAN_STR[asPresent(setType)] ??
            SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[asPresent(setType)]
          return $multi(veteranStr, true)
        } else {
          let nonVeteranStr =
            asStringOpt(MONSTER_SET_TYPE_TO_NO_VETERAN_STR[asPresent(setType)]) ??
            asStringOpt(SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[asPresent(setType)])
          if (setData["undauntedChestId"] !== undefined) {
            nonVeteranStr =
              asPresent(nonVeteranStr) +
              addNonVeteranUndauntedChestName(
                setType,
                asNumber(setData["undauntedChestId"]),
                buildTexturesResolved
              )
          }
          return $multi(nonVeteranStr, false)
        }
      }
    } else {
      if (!veteranData) {
        let nonVeteranStr =
          asStringOpt(MONSTER_SET_TYPE_TO_NO_VETERAN_STR[asPresent(setType)]) ??
          asStringOpt(SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[asPresent(setType)])
        if (setData["undauntedChestId"] !== undefined) {
          nonVeteranStr =
            asPresent(nonVeteranStr) +
            addNonVeteranUndauntedChestName(
              setType,
              asNumber(setData["undauntedChestId"]),
              buildTexturesResolved
            )
        }
        return $multi(nonVeteranStr, false)
      } else {
        const veteranStr =
          MONSTER_SET_TYPE_TO_VETERAN_STR[asPresent(setType)] ??
          SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[asPresent(setType)]
        return $multi(veteranStr, true)
      }
    }
  }
  return $multi(SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[asPresent(setType)], false)
}

export function buildTextLinesFromTable(
  this: void,
  tableVar: { [idx: number]: unknown },
  prefixStr?: string,
  alwaysNewLine?: boolean,
  doSort?: boolean
): string {
  const numEntries = asUnknownArray(tableVar).length
  if (numEntries === 0) {
    return ""
  }
  const alwaysNewLineResolved = alwaysNewLine ?? false
  const doSortResolved = doSort ?? false
  let retStrVar = ""
  if (numEntries >= 1) {
    if (doSortResolved) {
      table.sort(asUnknownArray(tableVar))
    }
    let entriesEmitted = 0
    for (const [, tableEntryStr] of ipairs(asStringArray(tableVar))) {
      if (tableEntryStr !== "") {
        if (entriesEmitted > 0) {
          retStrVar = retStrVar + (alwaysNewLineResolved ? "\n" : ", ")
        }
        retStrVar = retStrVar + tableEntryStr
        entriesEmitted = entriesEmitted + 1
      }
    }
  }
  return prefixStr !== undefined && prefixStr !== "" ? prefixStr + retStrVar : retStrVar
}

export function buildSetSearchFavoritesInfo(
  this: void,
  setData: { [key: string]: unknown }
): string | undefined {
  const setId = asNumberOpt(setData["setId"])
  if (setId === undefined) {
    return undefined
  }
  STATE.libSetsSearchUIShared =
    STATE.libSetsSearchUIShared ?? asStrRecordOpt(LibSets_SearchUI_Shared)
  const shared = asFavoritesAccessor(asPresent(STATE.libSetsSearchUIShared))
  const setSearchFavoriteCategoriesOfSetId = shared.GetAllFavoritesCategories(shared, setId)
  if (ZO_IsTableEmpty(asAnyObject(setSearchFavoriteCategoriesOfSetId))) {
    return undefined
  }

  let result = ""
  const possible = lib.possibleSetSearchFavoriteCategoriesUnsorted
  for (const [, setSearchFavoriteCategory] of ipairs(
    asStringArray(setSearchFavoriteCategoriesOfSetId)
  )) {
    const texture = possible[setSearchFavoriteCategory]
    if (texture !== undefined && texture !== "") {
      if (result === "") {
        result = zo_iconFormat(texture, 24, 24)
      } else {
        result = result + " " + zo_iconFormat(texture, 24, 24)
      }
    }
  }
  return result
}

export function buildSetDLCInfo(
  this: void,
  setData: { [key: string]: unknown }
): string | undefined {
  const dlcId = asNumberOpt(setData["dlcId"])
  if (dlcId === undefined) {
    return undefined
  }
  return lib.GetDLCName(dlcId)
}

export function buildReconstructionCostInfo(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  buildTextures?: boolean
): LuaMultiReturn<[string | undefined, string | undefined]> {
  const setId = asNumberOpt(setData["setId"])
  if (setId === undefined || itemLink === undefined) {
    return $multi(undefined, undefined)
  }
  const [cost, costClean] = getSetReconstructionCost(itemLink, setId, buildTextures)
  return $multi(cost, costClean)
}

function buildSetTypeInfo(
  this: void,
  setData: { setType?: number; setId?: number; classId?: number; [key: string]: unknown },
  buildTextures?: boolean
): LuaMultiReturn<[string, string | undefined]> {
  const buildTexturesResolved = buildTextures ?? false
  const setType = asNumberOpt(setData["setType"])
  if (setType === undefined) {
    return $multi(asPresent<string>(undefined), undefined)
  }
  const setTypeName = asPresent(lib.GetSetTypeName(setType))
  let setTypeTexture: string | undefined
  if (STATE.tooltipTextures === true || buildTexturesResolved === true) {
    if (setData["isVeteran"] !== undefined) {
      setTypeTexture = vetDungTexture
    } else {
      setTypeTexture = lib.GetSetTypeTexture(
        setType,
        asNumberOpt(setData["setId"]),
        asNumberOpt(setData["classId"])
      )
    }
  }
  return $multi(setTypeName, setTypeTexture)
}
lib.buildSetTypeInfo = buildSetTypeInfo

export function checkNonNeededLineBreak(
  this: void,
  patternNew: string,
  numberToCheck: number
): string {
  if (type(numberToCheck) !== "number") {
    return patternNew
  }
  const numberToCheckStr = tostring(numberToCheck)
  for (let num = 1; num <= 7; num++) {
    if (num !== numberToCheck) {
      const [adjacentMatchStart] = string.find(
        patternNew,
        "<<" + tostring(num) + ">><br><<" + numberToCheckStr + ">>"
      )
      if (adjacentMatchStart !== undefined) {
        patternNew = string.gsub(
          patternNew,
          "<<" + tostring(num) + ">><br>",
          "<<" + tostring(num) + ">>"
        )[0]
      }
    }
  }
  return patternNew
}
