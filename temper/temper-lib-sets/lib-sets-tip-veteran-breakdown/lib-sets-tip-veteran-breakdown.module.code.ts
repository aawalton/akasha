import {
  asNumber,
  asNumberOpt,
  asPresent,
  asStringOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asEquipBoolTable } from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import {
  MONSTER_SET_TYPE_TO_NO_VETERAN_STR,
  MONSTER_SET_TYPE_TO_VETERAN_STR,
  SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR,
} from "../lib-sets-tip-header/lib-sets-tip-header.module.code.ts"
import {
  addNonVeteranUndauntedChestName,
  getDungeonDifficultyStr,
} from "../lib-sets-tip-helpers/lib-sets-tip-helpers.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

const UNKNOWN_DIFFICULTY_MARKER = "?"

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
  const withTextures = STATE.tooltipTextures === true || buildTexturesResolved === true
  const setType = asNumberOpt(setData["setType"])

  let breakdownText = ""
  for (const entry of entries) {
    const [, equipSlotNameStr, equipSlotName] = lib.GetEquipSlotTexture(entry.equipType)
    const slotLabel = withTextures ? equipSlotNameStr : equipSlotName

    let difficultyStr: string
    if (entry.state === "veteran") {
      difficultyStr =
        asStringOpt(MONSTER_SET_TYPE_TO_VETERAN_STR[asPresent(setType)]) ??
        asStringOpt(SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[asPresent(setType)]) ??
        ""
    } else if (entry.state === "normal") {
      let nonVeteranStr =
        asStringOpt(MONSTER_SET_TYPE_TO_NO_VETERAN_STR[asPresent(setType)]) ??
        asStringOpt(SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[asPresent(setType)]) ??
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
      difficultyStr = UNKNOWN_DIFFICULTY_MARKER
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
