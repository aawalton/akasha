import {
  asPresent,
  asString,
  asStringArray,
  asStringOpt,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asStrTab } from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import {
  buildSetDropMechanicPart,
  type DropMechanicPartCtx,
} from "../lib-sets-tip-drop-mechanic-render-part/lib-sets-tip-drop-mechanic-render-part.module.code.ts"
import {
  buildTextLinesFromTable,
  tableContentsAreAllTheSame,
} from "../lib-sets-tip-helpers/lib-sets-tip-helpers.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"
import { buildDungeonDifficultyText } from "../lib-sets-tip-veteran-breakdown/lib-sets-tip-veteran-breakdown.module.code.ts"

export function buildSetDropMechanicInfo(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  forTooltip?: boolean
): LuaMultiReturn<
  [
    string | undefined,
    string | undefined,
    unknown,
    unknown[],
    string | undefined,
    string | undefined,
    unknown,
    unknown[],
  ]
> {
  const scratch = STATE.scratch
  const dropZoneNames = asStrTab(scratch.dropZoneNames)
  const dropMechanicNames = asStrTab(scratch.dropMechanicNames)
  if (dropZoneNames === undefined || dropMechanicNames === undefined) {
    return $multi(undefined, undefined, undefined, [], undefined, undefined, undefined, [])
  }
  const forTooltipResolved = forTooltip ?? false
  const parentDropZoneNames = asStrTab(scratch.parentDropZoneNames)
  const dropMechanicNamesClean = asStrTab(scratch.dropMechanicNamesClean)
  const dropLocationNames = asStrTab(scratch.dropLocationNames)

  const numDropZoneNames = asUnknownArray(dropZoneNames).length

  let dropZoneNamesAndParentNames = dropZoneNames
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
  const setDropZoneStr =
    numDropZoneNames > 0
      ? buildTextLinesFromTable(dropZoneNamesAndParentNames, undefined, false, false)
      : ""
  const setDropZoneStrClean = setDropZoneStr
  const setDropMechanicText = buildTextLinesFromTable(dropMechanicNames, undefined, false, false)
  const setDropMechanicTextClean = buildTextLinesFromTable(
    dropMechanicNamesClean,
    undefined,
    false,
    false
  )

  const setDropLocationsText = buildDungeonDifficultyText(setData, itemLink, !forTooltipResolved)
  const setDropLocationsTextClean = setDropLocationsText
  const setDropOverallTextsPerZone: unknown[] = []
  const setDropOverallTextsPerZoneClean: unknown[] = []

  const allZonesTheSame =
    (!STATE.useCustomTooltip && tableContentsAreAllTheSame(dropZoneNames)) || false

  const acc = {
    setDropOverallTextPerZone: asStringOpt(undefined),
    setDropOverallTextPerZoneClean: asStringOpt(undefined),
    bracketOpened: false,
  }
  const dropMechanicNamesAdded = new LuaMap<AnyNotNil, boolean>()
  const dropMechanicDropLocationNamesAdded = new LuaMap<AnyNotNil, boolean>()

  const partCtx: DropMechanicPartCtx = {
    parentDropZoneNames,
    dropMechanicNames,
    dropMechanicNamesClean,
    dropLocationNames,
    allZonesTheSame,
    forTooltipResolved,
    numDropZoneNames,
    acc,
    dropMechanicNamesAdded,
    dropMechanicDropLocationNamesAdded,
    setDropOverallTextsPerZone,
    setDropOverallTextsPerZoneClean,
  }

  if (numDropZoneNames > 0) {
    if (
      !allZonesTheSame &&
      scratch.dropZoneIdsTheSame !== undefined &&
      scratch.dropMechanicTabTheSame !== undefined
    ) {
      const sortedZoneIds: number[] = []
      for (const [dropZone] of pairs(scratch.dropZoneIdsTheSame)) {
        sortedZoneIds[sortedZoneIds.length] = dropZone
      }
      table.sort(sortedZoneIds)

      for (const [, dropZoneId] of ipairs(sortedZoneIds)) {
        const sameIndices = scratch.dropZoneIdsTheSame[dropZoneId]
        if (sameIndices !== undefined) {
          const idx = asPresent(sameIndices[0])
          const dropZoneName = asString(dropZoneNames[idx])
          const tabForZone = scratch.dropMechanicTabTheSame[dropZoneId]
          if (tabForZone !== undefined) {
            buildSetDropMechanicPart(partCtx, idx, dropZoneName, tabForZone)
          }
        }
      }
    } else {
      for (const [idx, dropZoneName] of ipairs(asStringArray(dropZoneNames))) {
        buildSetDropMechanicPart(partCtx, idx, dropZoneName, undefined)
      }
    }
  } else {
    const numDropMechanicNames = asUnknownArray(dropMechanicNames).length
    for (const [idx, dropMechanicName] of ipairs(asStringArray(dropMechanicNames))) {
      const dropMechanicNameClean = asStringOpt(dropMechanicNamesClean[idx])
      const dropMechanicDropLocationName = asStringOpt(dropLocationNames[idx])
      if (STATE.addDropMechanic || !forTooltipResolved) {
        if (dropMechanicName !== "") {
          if (!dropMechanicNamesAdded.get(dropMechanicName)) {
            dropMechanicNamesAdded.set(dropMechanicName, true)
            if (acc.setDropOverallTextPerZone === undefined) {
              acc.setDropOverallTextPerZone = "(" + dropMechanicName
              acc.setDropOverallTextPerZoneClean = "(" + asPresent(dropMechanicNameClean)
              acc.bracketOpened = true
            } else {
              if (idx === 1) {
                acc.setDropOverallTextPerZone =
                  acc.setDropOverallTextPerZone + " (" + dropMechanicName
                acc.setDropOverallTextPerZoneClean =
                  asPresent(acc.setDropOverallTextPerZoneClean) +
                  " (" +
                  asPresent(dropMechanicNameClean)
                acc.bracketOpened = true
              } else {
                acc.setDropOverallTextPerZone =
                  acc.setDropOverallTextPerZone + "; " + dropMechanicName
                acc.setDropOverallTextPerZoneClean =
                  asPresent(acc.setDropOverallTextPerZoneClean) +
                  "; " +
                  asPresent(dropMechanicNameClean)
              }
            }
          }
        }
      }
      if (STATE.addBossName || !forTooltipResolved) {
        if (dropMechanicDropLocationName !== undefined && dropMechanicDropLocationName !== "") {
          if (!dropMechanicDropLocationNamesAdded.get(dropMechanicDropLocationName)) {
            dropMechanicDropLocationNamesAdded.set(dropMechanicDropLocationName, true)
            if (acc.setDropOverallTextPerZone === undefined) {
              acc.setDropOverallTextPerZone = "'" + dropMechanicDropLocationName + "'"
              acc.setDropOverallTextPerZoneClean = "'" + dropMechanicDropLocationName + "'"
            } else {
              if (STATE.addDropMechanic || !forTooltipResolved) {
                if (
                  dropMechanicName !== undefined &&
                  !dropMechanicNamesAdded.get(dropMechanicName)
                ) {
                  dropMechanicNamesAdded.set(dropMechanicName, true)
                }
                acc.setDropOverallTextPerZone =
                  acc.setDropOverallTextPerZone + ": '" + dropMechanicDropLocationName + "'"
                acc.setDropOverallTextPerZoneClean =
                  asPresent(acc.setDropOverallTextPerZoneClean) +
                  ": '" +
                  dropMechanicDropLocationName +
                  "'"
              } else {
                if (idx === 1) {
                  acc.setDropOverallTextPerZone =
                    acc.setDropOverallTextPerZone + "('" + dropMechanicDropLocationName + "'"
                  acc.setDropOverallTextPerZoneClean =
                    asPresent(acc.setDropOverallTextPerZoneClean) +
                    "('" +
                    dropMechanicDropLocationName +
                    "'"
                  acc.bracketOpened = true
                } else {
                  acc.setDropOverallTextPerZone =
                    acc.setDropOverallTextPerZone + "; '" + dropMechanicDropLocationName + "'"
                  acc.setDropOverallTextPerZoneClean =
                    asPresent(acc.setDropOverallTextPerZoneClean) +
                    "; '" +
                    dropMechanicDropLocationName +
                    "'"
                }
              }
            }
          }
        }
      }
      if (acc.bracketOpened && acc.setDropOverallTextPerZone !== undefined) {
        if (idx === numDropMechanicNames) {
          acc.setDropOverallTextPerZone = acc.setDropOverallTextPerZone + ")"
          acc.setDropOverallTextPerZoneClean = asPresent(acc.setDropOverallTextPerZoneClean) + ")"
        }
      }
      if (idx === numDropMechanicNames) {
        setDropOverallTextsPerZone.push(acc.setDropOverallTextPerZone)
        setDropOverallTextsPerZoneClean.push(acc.setDropOverallTextPerZoneClean)
      }
    }
  }

  return $multi(
    setDropZoneStr,
    setDropMechanicText,
    setDropLocationsText,
    setDropOverallTextsPerZone,
    setDropZoneStrClean,
    setDropMechanicTextClean,
    setDropLocationsTextClean,
    setDropOverallTextsPerZoneClean
  )
}
