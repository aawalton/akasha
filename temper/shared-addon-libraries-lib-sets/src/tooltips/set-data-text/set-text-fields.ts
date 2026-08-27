import {
  asNumber,
  asNumberOpt,
  asPresent,
  asStringArray,
  asStringOpt,
  asUnknownArray,
} from "../../casts"
import { asStrTab } from "../casts"
import { condenseZoneScratch } from "../condense-zone-rows"
import { getSetDropMechanicInfo } from "../drop-mechanic-collect"
import { buildSetDropMechanicInfo } from "../drop-mechanic-render"
import {
  buildReconstructionCostInfo,
  buildSetDLCInfo,
  buildSetNeededTraitsInfo,
  buildSetSearchFavoritesInfo,
  buildTextLinesFromTable,
} from "../helpers"
import type { CustomTooltipCtx } from "../set-data-text-custom"
import { state } from "../state"

const lib = LibSets

export interface SetTextFields extends CustomTooltipCtx {
  setType: number | undefined
  setDropOverallTextsPerZone: unknown[] | undefined
  setDropOverallTextsPerZoneClean: unknown[] | undefined
  runDropMechanic: boolean | undefined
}

export function collectSetTextFields(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  forTooltipResolved: boolean
): SetTextFields {
  let reconstructionCostText: string | undefined
  let reconstructionCostTextClean: string | undefined
  let setTypeText: string | undefined
  let setTypeTexture: string | undefined
  let setTypeTextClean: string | undefined
  let setNeededTraitsText: string | undefined
  let setNeededTraitsTextClean: string | undefined
  let setDropZoneStr: string | undefined
  let setDropZoneStrClean: string | undefined
  let setDropMechanicText: string | undefined
  let setDropMechanicTextClean: string | undefined
  let setDropLocationsText: string | undefined
  let setDropLocationsTextClean: string | undefined
  let setDropOverallTextsPerZone: unknown[] | undefined
  let setDropOverallTextsPerZoneClean: unknown[] | undefined
  let setDLCText: string | undefined
  let setDLCTextClean: string | undefined
  let setSearchFavoritesText: string | undefined
  let setSearchFavoritesTextClean: string | undefined

  const setId = asNumber(setData["setId"])
  const setType = asNumberOpt(setData["setType"])

  const isReconstructableSet = IsItemLinkSetCollectionPiece(asPresent(itemLink))
  if (
    isReconstructableSet === true &&
    (!forTooltipResolved ||
      (state.useCustomTooltip && state.setReconstructionCostPlaceholder) ||
      (!state.useCustomTooltip && state.addReconstructionCost))
  ) {
    ;[reconstructionCostText, reconstructionCostTextClean] = buildReconstructionCostInfo(
      setData,
      itemLink,
      !forTooltipResolved
    )
  }

  if (
    !forTooltipResolved ||
    (state.useCustomTooltip && state.setTypePlaceholder) ||
    (!state.useCustomTooltip && state.addSetType)
  ) {
    ;[setTypeText, setTypeTexture] = lib.buildSetTypeInfo(setData, !forTooltipResolved)
    setTypeTextClean = setTypeText
  }

  if (
    !isReconstructableSet &&
    (!forTooltipResolved ||
      (state.useCustomTooltip && state.neededTraitsPlaceholder) ||
      (!state.useCustomTooltip && state.addNeededTraits))
  ) {
    setNeededTraitsText = buildSetNeededTraitsInfo(setData)
    setNeededTraitsTextClean = setNeededTraitsText
  }

  if (
    !forTooltipResolved ||
    (state.useCustomTooltip && state.dlcNamePlaceHolder) ||
    (!state.useCustomTooltip && state.addDLC)
  ) {
    setDLCText = buildSetDLCInfo(setData)
    setDLCTextClean = setDLCText
  }

  if (
    !forTooltipResolved ||
    (state.useCustomTooltip && state.setSearchFavoritesPlaceHolder) ||
    (!state.useCustomTooltip && state.addFavorites)
  ) {
    setSearchFavoritesText = buildSetSearchFavoritesInfo(setData)
    setSearchFavoritesTextClean = ""
  }

  const runDropMechanic =
    !forTooltipResolved ||
    (state.useCustomTooltip &&
      (state.dropMechanicPlaceholder || state.bossNamePlaceholder || state.dropZonesPlaceholder)) ||
    (!state.useCustomTooltip &&
      (state.addDropMechanic || state.addBossName || state.addDropLocation))
  if (runDropMechanic === true) {
    getSetDropMechanicInfo(setData, !forTooltipResolved)

    if (state.useCustomTooltip === true) {
      const scratch = state.scratch
      condenseZoneScratch(scratch)

      const dropZoneNames = asStrTab(scratch.dropZoneNames)
      if (asUnknownArray(dropZoneNames).length > 0) {
        let dropZoneNamesAndParentNames = dropZoneNames
        const parentDropZoneNames = asStrTab(scratch.parentDropZoneNames)
        if (parentDropZoneNames !== undefined && !ZO_IsTableEmpty(parentDropZoneNames)) {
          dropZoneNamesAndParentNames = {}
          for (const [idx, dropZoneName] of ipairs(asStringArray(dropZoneNames))) {
            const parentZoneName = asStringOpt(parentDropZoneNames[idx])
            if (parentZoneName !== undefined) {
              dropZoneNamesAndParentNames[idx] = parentZoneName + " [" + dropZoneName + "]"
            } else {
              dropZoneNamesAndParentNames[idx] = dropZoneName
            }
          }
        }
        setDropZoneStr = buildTextLinesFromTable(
          dropZoneNamesAndParentNames,
          undefined,
          false,
          false
        )
        setDropZoneStrClean = setDropZoneStr
      } else {
        setDropZoneStr = ""
        setDropZoneStrClean = ""
      }
      setDropMechanicText = buildTextLinesFromTable(
        scratch.dropMechanicNames,
        undefined,
        false,
        false
      )
      setDropMechanicTextClean = buildTextLinesFromTable(
        scratch.dropMechanicNamesClean,
        undefined,
        false,
        false
      )
      setDropLocationsText = buildTextLinesFromTable(
        scratch.dropLocationNames,
        undefined,
        false,
        false
      )
      setDropLocationsTextClean = setDropLocationsText

      ;[, , , setDropOverallTextsPerZone, , , , setDropOverallTextsPerZoneClean] =
        buildSetDropMechanicInfo(setData, itemLink, forTooltipResolved)
    } else {
      let builtLocationsText: unknown
      let builtLocationsTextClean: unknown
      ;[
        setDropZoneStr,
        setDropMechanicText,
        builtLocationsText,
        setDropOverallTextsPerZone,
        setDropZoneStrClean,
        setDropMechanicTextClean,
        builtLocationsTextClean,
        setDropOverallTextsPerZoneClean,
      ] = buildSetDropMechanicInfo(setData, itemLink, forTooltipResolved)
      setDropLocationsText = asStringOpt(builtLocationsText)
      setDropLocationsTextClean = asStringOpt(builtLocationsTextClean)
    }
  }

  if (setDropLocationsText !== undefined && setDropLocationsText !== "") {
    if (setTypeText !== undefined && setTypeText !== "") {
      if (setTypeText === setDropLocationsText) {
        setDropLocationsText = ""
        setDropLocationsTextClean = ""
      }
    }
  }

  return {
    isReconstructableSet,
    forTooltipResolved,
    reconstructionCostText,
    reconstructionCostTextClean,
    setTypeText,
    setTypeTexture,
    setTypeTextClean,
    setNeededTraitsText,
    setNeededTraitsTextClean,
    setDropZoneStr,
    setDropZoneStrClean,
    setDropMechanicText,
    setDropMechanicTextClean,
    setDropLocationsText,
    setDropLocationsTextClean,
    setDLCText,
    setDLCTextClean,
    setSearchFavoritesText,
    setSearchFavoritesTextClean,
    setInfoText: undefined,
    setInfoTextNoTextures: undefined,
    setType,
    setDropOverallTextsPerZone,
    setDropOverallTextsPerZoneClean,
    runDropMechanic,
  }
}
