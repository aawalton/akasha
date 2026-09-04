import { asPresent, asStringOpt } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  selectZoneGroupEntries,
  type ZoneGroupMember,
} from "../lib-sets-tip-drop-mechanic-group-select/lib-sets-tip-drop-mechanic-group-select.module.code.ts"
import { addZoneColor } from "../lib-sets-tip-header/lib-sets-tip-header.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

type StrTab = { [idx: number]: unknown }

export interface DropMechanicPartAcc {
  setDropOverallTextPerZone: string | undefined
  setDropOverallTextPerZoneClean: string | undefined
  bracketOpened: boolean
}

export interface DropMechanicPartCtx {
  parentDropZoneNames: StrTab
  dropMechanicNames: StrTab
  dropMechanicNamesClean: StrTab
  dropLocationNames: StrTab
  allZonesTheSame: boolean
  forTooltipResolved: boolean
  numDropZoneNames: number
  acc: DropMechanicPartAcc
  dropMechanicNamesAdded: LuaMap<AnyNotNil, boolean>
  dropMechanicDropLocationNamesAdded: LuaMap<AnyNotNil, boolean>
  setDropOverallTextsPerZone: unknown[]
  setDropOverallTextsPerZoneClean: unknown[]
}

export function buildSetDropMechanicPart(
  this: void,
  ctx: DropMechanicPartCtx,
  idx: number,
  dropZoneName: string,
  dropMechanicDataOfZoneId: { [idx: number]: number } | undefined
): undefined {
  const {
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
  } = ctx

  const listAllDropMechanicsOfSameZone = dropMechanicDataOfZoneId !== undefined
  const parentZoneName = asStringOpt(parentDropZoneNames[idx])
  if (!allZonesTheSame) {
    acc.setDropOverallTextPerZone = undefined
    acc.setDropOverallTextPerZoneClean = undefined
    acc.bracketOpened = false
  }
  const dropMechanicName = asStringOpt(dropMechanicNames[idx])
  const dropMechanicNameClean = asStringOpt(dropMechanicNamesClean[idx])
  let dropMechanicDropLocationName = asStringOpt(dropLocationNames[idx])

  if (STATE.addDropLocation || !forTooltipResolved) {
    if (allZonesTheSame === true) {
      if (idx === 1) {
        if (parentZoneName !== undefined) {
          acc.setDropOverallTextPerZone = addZoneColor(parentZoneName)
          acc.setDropOverallTextPerZoneClean = parentZoneName
        } else {
          acc.setDropOverallTextPerZone = addZoneColor(dropZoneName)
          acc.setDropOverallTextPerZoneClean = dropZoneName
        }
      }
    } else {
      if (dropMechanicName !== undefined || listAllDropMechanicsOfSameZone) {
        if (parentZoneName !== undefined) {
          acc.setDropOverallTextPerZone = addZoneColor(parentZoneName)
          acc.setDropOverallTextPerZoneClean = parentZoneName
        } else {
          acc.setDropOverallTextPerZone = addZoneColor(dropZoneName)
          acc.setDropOverallTextPerZoneClean = dropZoneName
        }
      }
    }
  }

  if (STATE.addDropMechanic || !forTooltipResolved) {
    if (listAllDropMechanicsOfSameZone) {
      const groupMembers: ZoneGroupMember[] = []
      for (const [loopIndex] of pairs(asPresent(dropMechanicDataOfZoneId))) {
        groupMembers.push({
          index: loopIndex,
          name: asStringOpt(dropMechanicNames[loopIndex]),
          nameClean: asStringOpt(dropMechanicNamesClean[loopIndex]),
          locationName: asStringOpt(dropLocationNames[loopIndex]),
        })
      }

      let namesEmitted = 0
      for (const groupEntry of selectZoneGroupEntries(groupMembers)) {
        const loopDropMechanicName = groupEntry.name
        if (loopDropMechanicName !== undefined) {
          const loopDropMechanicNameClean = asPresent(groupEntry.nameClean)
          if (acc.setDropOverallTextPerZone === undefined) {
            acc.setDropOverallTextPerZone = "(" + loopDropMechanicName
            acc.setDropOverallTextPerZoneClean = "(" + loopDropMechanicNameClean
            acc.bracketOpened = true
          } else if (namesEmitted === 0) {
            acc.setDropOverallTextPerZone =
              acc.setDropOverallTextPerZone + " (" + loopDropMechanicName
            acc.setDropOverallTextPerZoneClean =
              asPresent(acc.setDropOverallTextPerZoneClean) + " (" + loopDropMechanicNameClean
            acc.bracketOpened = true
          } else {
            acc.setDropOverallTextPerZone =
              acc.setDropOverallTextPerZone + "; " + loopDropMechanicName
            acc.setDropOverallTextPerZoneClean =
              asPresent(acc.setDropOverallTextPerZoneClean) + "; " + loopDropMechanicNameClean
          }
          namesEmitted = namesEmitted + 1
        }

        if (STATE.addBossName || !forTooltipResolved) {
          let loopDropMechanicDropLocationName = groupEntry.locationName
          if (parentZoneName !== undefined) {
            if (loopDropMechanicDropLocationName === undefined) {
              loopDropMechanicDropLocationName = dropZoneName
            } else {
              loopDropMechanicDropLocationName =
                dropZoneName + ": " + loopDropMechanicDropLocationName
            }
          }
          if (
            loopDropMechanicDropLocationName !== undefined &&
            loopDropMechanicDropLocationName !== ""
          ) {
            if (acc.setDropOverallTextPerZone === undefined) {
              acc.setDropOverallTextPerZone = "'" + loopDropMechanicDropLocationName + "'"
              acc.setDropOverallTextPerZoneClean = "'" + loopDropMechanicDropLocationName + "'"
            } else {
              if (STATE.addDropMechanic || !forTooltipResolved) {
                acc.setDropOverallTextPerZone =
                  acc.setDropOverallTextPerZone + ": '" + loopDropMechanicDropLocationName + "'"
                acc.setDropOverallTextPerZoneClean =
                  asPresent(acc.setDropOverallTextPerZoneClean) +
                  ": '" +
                  loopDropMechanicDropLocationName +
                  "'"
              } else {
                acc.setDropOverallTextPerZone =
                  acc.setDropOverallTextPerZone + " ('" + loopDropMechanicDropLocationName + "'"
                acc.setDropOverallTextPerZoneClean =
                  asPresent(acc.setDropOverallTextPerZoneClean) +
                  " ('" +
                  loopDropMechanicDropLocationName +
                  "'"
                acc.bracketOpened = true
              }
            }
          }
        }
      }
    } else if (dropMechanicName !== undefined && dropMechanicName !== "") {
      if (allZonesTheSame === true) {
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
      } else {
        if (acc.setDropOverallTextPerZone === undefined) {
          acc.setDropOverallTextPerZone = dropMechanicName
          acc.setDropOverallTextPerZoneClean = dropMechanicNameClean
        } else {
          acc.setDropOverallTextPerZone = acc.setDropOverallTextPerZone + " (" + dropMechanicName
          acc.setDropOverallTextPerZoneClean =
            asPresent(acc.setDropOverallTextPerZoneClean) + " (" + asPresent(dropMechanicNameClean)
          acc.bracketOpened = true
        }
      }
    }
  }

  if ((STATE.addBossName || !forTooltipResolved) && !listAllDropMechanicsOfSameZone) {
    if (parentZoneName !== undefined) {
      if (dropMechanicDropLocationName === undefined) {
        dropMechanicDropLocationName = dropZoneName
      } else {
        dropMechanicDropLocationName = dropZoneName + ": " + dropMechanicDropLocationName
      }
    }

    if (allZonesTheSame === true) {
      if (dropMechanicDropLocationName !== undefined && dropMechanicDropLocationName !== "") {
        if (!dropMechanicDropLocationNamesAdded.get(dropMechanicDropLocationName)) {
          dropMechanicDropLocationNamesAdded.set(dropMechanicDropLocationName, true)
          if (acc.setDropOverallTextPerZone === undefined) {
            acc.setDropOverallTextPerZone = "'" + dropMechanicDropLocationName + "'"
            acc.setDropOverallTextPerZoneClean = "'" + dropMechanicDropLocationName + "'"
          } else {
            if (STATE.addDropMechanic || !forTooltipResolved) {
              if (dropMechanicName !== undefined && !dropMechanicNamesAdded.get(dropMechanicName)) {
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
    } else {
      if (dropMechanicDropLocationName !== undefined && dropMechanicDropLocationName !== "") {
        if (acc.setDropOverallTextPerZone === undefined) {
          acc.setDropOverallTextPerZone = "'" + dropMechanicDropLocationName + "'"
          acc.setDropOverallTextPerZoneClean = "'" + dropMechanicDropLocationName + "'"
        } else {
          if (STATE.addDropMechanic || !forTooltipResolved) {
            acc.setDropOverallTextPerZone =
              acc.setDropOverallTextPerZone + ": '" + dropMechanicDropLocationName + "'"
            acc.setDropOverallTextPerZoneClean =
              asPresent(acc.setDropOverallTextPerZoneClean) +
              ": '" +
              dropMechanicDropLocationName +
              "'"
          } else {
            acc.setDropOverallTextPerZone =
              acc.setDropOverallTextPerZone + " ('" + dropMechanicDropLocationName + "'"
            acc.setDropOverallTextPerZoneClean =
              asPresent(acc.setDropOverallTextPerZoneClean) +
              " ('" +
              dropMechanicDropLocationName +
              "'"
            acc.bracketOpened = true
          }
        }
      }
    }
  }

  if (acc.bracketOpened && acc.setDropOverallTextPerZone !== undefined) {
    if (allZonesTheSame === true) {
      if (idx === numDropZoneNames) {
        acc.setDropOverallTextPerZone = acc.setDropOverallTextPerZone + ")"
        acc.setDropOverallTextPerZoneClean = asPresent(acc.setDropOverallTextPerZoneClean) + ")"
      }
    } else {
      acc.setDropOverallTextPerZone = acc.setDropOverallTextPerZone + ")"
      acc.setDropOverallTextPerZoneClean = asPresent(acc.setDropOverallTextPerZoneClean) + ")"
    }
  }

  if (!allZonesTheSame) {
    if (
      !ZO_IsElementInNumericallyIndexedTable(
        setDropOverallTextsPerZone,
        acc.setDropOverallTextPerZone
      )
    ) {
      setDropOverallTextsPerZone.push(acc.setDropOverallTextPerZone)
      setDropOverallTextsPerZoneClean.push(acc.setDropOverallTextPerZoneClean)
    }
  } else {
    if (idx === numDropZoneNames) {
      setDropOverallTextsPerZone.push(acc.setDropOverallTextPerZone)
      setDropOverallTextsPerZoneClean.push(acc.setDropOverallTextPerZoneClean)
    }
  }
}
