import { asNumber, asNumberOpt, asPresent, asStringOpt } from "../casts"
import { asEquipBoolTable } from "./casts"
import {
  monsterSetTypeToNoVeteranStr,
  monsterSetTypeToVeteranStr,
  setTypeToDropZoneLocalizationStr,
} from "./header"
import { addNonVeteranUndauntedChestName, getDungeonDifficultyStr } from "./helpers"
import { state } from "./state"

const lib = LibSets

const unknownDifficultyMarker = "?"

export type VeteranPieceState = "veteran" | "normal" | "unknown"

export interface VeteranPieceEntry {
  equipType: number
  state: VeteranPieceState
}

export function resolveVeteranPieces(
  this: void,
  veteranTable: { [equipType: number]: boolean | undefined },
  setEquipTypes: number[]
): VeteranPieceEntry[] {
  const sortedEquipTypes: number[] = []
  for (const equipType of setEquipTypes) {
    sortedEquipTypes.push(equipType)
  }
  sortedEquipTypes.sort((a, b) => a - b)

  const entries: VeteranPieceEntry[] = []
  for (const equipType of sortedEquipTypes) {
    const storedFlag = veteranTable[equipType]
    let pieceState: VeteranPieceState = "unknown"
    if (storedFlag === true) {
      pieceState = "veteran"
    } else if (storedFlag === false) {
      pieceState = "normal"
    }
    entries.push({ equipType: equipType, state: pieceState })
  }
  return entries
}

export function isUniformBreakdown(this: void, entries: VeteranPieceEntry[]): boolean {
  let seenState: VeteranPieceState | undefined
  for (const entry of entries) {
    if (entry.state === "unknown") {
      return false
    }
    if (seenState === undefined) {
      seenState = entry.state
    } else if (seenState !== entry.state) {
      return false
    }
  }
  return true
}

export function gatherSetVeteranPieces(
  this: void,
  setId: number | undefined,
  veteranTable: { [equipType: number]: boolean | undefined }
): VeteranPieceEntry[] {
  const setEquipTypes: number[] = []
  if (setId !== undefined) {
    for (const [equipType, isValidEquipType] of pairs(lib.equipTypesValid)) {
      if (isValidEquipType === true && lib.IsEquipTypeSet(setId, equipType)) {
        setEquipTypes.push(equipType)
      }
    }
  }
  return resolveVeteranPieces(veteranTable, setEquipTypes)
}

export function renderVeteranBreakdown(
  this: void,
  setData: { [key: string]: unknown },
  entries: VeteranPieceEntry[],
  buildTextures?: boolean
): string {
  const buildTexturesResolved = buildTextures ?? false
  const withTextures = state.tooltipTextures === true || buildTexturesResolved === true
  const setType = asNumberOpt(setData["setType"])

  let breakdownText = ""
  for (const entry of entries) {
    const [, equipSlotNameStr, equipSlotName] = lib.GetEquipSlotTexture(entry.equipType)
    const slotLabel = withTextures ? equipSlotNameStr : equipSlotName

    let difficultyStr: string
    if (entry.state === "veteran") {
      difficultyStr =
        asStringOpt(monsterSetTypeToVeteranStr[asPresent(setType)]) ??
        asStringOpt(setTypeToDropZoneLocalizationStr[asPresent(setType)]) ??
        ""
    } else if (entry.state === "normal") {
      let nonVeteranStr =
        asStringOpt(monsterSetTypeToNoVeteranStr[asPresent(setType)]) ??
        asStringOpt(setTypeToDropZoneLocalizationStr[asPresent(setType)]) ??
        ""
      if (setData["undauntedChestId"] !== undefined) {
        nonVeteranStr =
          nonVeteranStr +
          addNonVeteranUndauntedChestName(
            setType,
            asNumber(setData["undauntedChestId"]),
            buildTexturesResolved
          )
      }
      difficultyStr = nonVeteranStr
    } else {
      difficultyStr = unknownDifficultyMarker
    }

    const line = slotLabel + ": " + difficultyStr
    breakdownText = breakdownText === "" ? line : breakdownText + "\n" + line
  }
  return breakdownText
}

export function buildDungeonDifficultyText(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  buildTextures?: boolean
): unknown {
  const veteranData = setData["veteran"]
  if (type(veteranData) === "table") {
    const entries = gatherSetVeteranPieces(
      asNumberOpt(setData["setId"]),
      asEquipBoolTable(veteranData)
    )
    if (!isUniformBreakdown(entries)) {
      return renderVeteranBreakdown(setData, entries, buildTextures)
    }
  }
  const [faithfulDifficultyStr] = getDungeonDifficultyStr(setData, itemLink, buildTextures)
  return faithfulDifficultyStr
}
