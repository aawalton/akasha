import {
  asNumber,
  asNumberArray,
  asPresent,
  asString,
  asStringOpt,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLangNameIndexTableOpt,
  asNumIndexTableOpt,
  asUnknownRecordArray,
  asZoneIdGroupsOpt,
  asZoneMechanicGroupsOpt,
} from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import {
  BLACKLISTED_SET_IDS_FOR_ZONE_TOOLTIPS,
  langToUse,
} from "../lib-sets-tip-header/lib-sets-tip-header.module.code.ts"
import { tableContentsAreAllTheSame } from "../lib-sets-tip-helpers/lib-sets-tip-helpers.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

const doesClientLangEqualFallbackLang = lib.clientLang === lib.fallbackLang
const fallbackLang = lib.fallbackLang

export function getSetDropMechanicInfo(
  this: void,
  setData: { [key: string]: unknown },
  buildTextures?: boolean
): undefined {
  const buildTexturesResolved = buildTextures ?? false
  const scratch = STATE.scratch
  scratch.dropZoneNames = {}
  scratch.parentDropZoneNames = {}
  scratch.dropMechanicNames = {}
  scratch.dropMechanicNamesClean = {}
  scratch.dropLocationNames = {}
  scratch.dropZoneIdsTheSame = undefined
  scratch.dropMechanicTabTheSame = undefined

  const dropMechanicTab = asNumIndexTableOpt(setData[LIBSETS_TABLEKEY_DROPMECHANIC])
  if (dropMechanicTab === undefined) {
    return
  }

  const dropZoneIds = asNumIndexTableOpt(setData[LIBSETS_TABLEKEY_ZONEIDS])
  const dropMechanicNamesOfSet = asLangNameIndexTableOpt(
    setData[LIBSETS_TABLEKEY_DROPMECHANIC_NAMES]
  )
  const dropMechanicDropLocationNamesOfSet = asLangNameIndexTableOpt(
    setData[LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES]
  )

  scratch.dropZoneIdsTheSame = asZoneIdGroupsOpt(setData[LIBSETS_TABLEKEY_ZONEIDS_SORTED])
  scratch.dropMechanicTabTheSame = asZoneMechanicGroupsOpt(
    setData[LIBSETS_TABLEKEY_DROPMECHANIC_SORTED]
  )

  function lGetDropMechanicName(this: void, pIdx: number, pDropMechanicIdOfZone: number): unknown {
    let lDropMechanicName: unknown
    if (
      dropMechanicNamesOfSet === undefined ||
      dropMechanicNamesOfSet[pIdx] === undefined ||
      asPresent(dropMechanicNamesOfSet[pIdx])[langToUse] === undefined
    ) {
      lDropMechanicName =
        scratch.dropMechanicNamesProcessed[pDropMechanicIdOfZone] ??
        lib.getDropMechanicName(pDropMechanicIdOfZone, langToUse)[0]
    } else {
      lDropMechanicName = asPresent(dropMechanicNamesOfSet[pIdx])[langToUse]
    }
    scratch.dropMechanicNamesProcessed[pDropMechanicIdOfZone] = lDropMechanicName
    scratch.dropMechanicNamesClean[pIdx] = lDropMechanicName
    return lDropMechanicName
  }

  function lAddDropMechanicInfo(
    this: void,
    pIdx: number,
    pDropMechanicIdOfZone: number
  ): undefined {
    let dropMechanicNameOfZone = lGetDropMechanicName(pIdx, pDropMechanicIdOfZone)
    if (dropMechanicNameOfZone !== undefined) {
      if (STATE.tooltipTextures === true || buildTexturesResolved === true) {
        const dropMechanicTexture = lib.GetDropMechanicTexture(pDropMechanicIdOfZone)
        if (dropMechanicTexture !== undefined) {
          dropMechanicNameOfZone = zo_iconTextFormatNoSpace(
            dropMechanicTexture,
            24,
            24,
            asString(dropMechanicNameOfZone),
            undefined
          )
        }
      }
      scratch.dropMechanicNames[pIdx] = dropMechanicNameOfZone
    }

    if (dropMechanicDropLocationNamesOfSet?.[pIdx] !== undefined) {
      let dropMechanicDropLocationNameOfZone = asStringOpt(
        asPresent(dropMechanicDropLocationNamesOfSet[pIdx])[langToUse]
      )
      if (
        (dropMechanicDropLocationNameOfZone === undefined ||
          dropMechanicDropLocationNameOfZone === "") &&
        !doesClientLangEqualFallbackLang
      ) {
        dropMechanicDropLocationNameOfZone = asPresent(dropMechanicDropLocationNamesOfSet[pIdx])[
          fallbackLang
        ]
      }
      if (dropMechanicDropLocationNameOfZone !== undefined) {
        scratch.dropLocationNames[pIdx] = dropMechanicDropLocationNameOfZone
      }
    }
  }

  if (dropZoneIds === undefined) {
    const setId = asNumber(setData["setId"])
    if (!BLACKLISTED_SET_IDS_FOR_ZONE_TOOLTIPS[setId]) {
      d("[LibSets]ERROR getSetDropMechanicInfo - dropZoneIds MISSING! setId: " + tostring(setId))
    } else {
      if (dropMechanicNamesOfSet !== undefined) {
        for (const [idx] of ipairs(asUnknownRecordArray(dropMechanicNamesOfSet))) {
          const dropMechanicId = dropMechanicTab[idx]
          if (dropMechanicId !== undefined) {
            lAddDropMechanicInfo(idx, dropMechanicId)
          }
        }
      }
    }
    return
  }

  if (!STATE.useCustomTooltip) {
    const numDropZones = asUnknownArray(dropZoneIds).length
    if (numDropZones > 1) {
      const allZonesTheSame = tableContentsAreAllTheSame(dropZoneIds) || false
      if (!allZonesTheSame) {
        if (scratch.dropZoneIdsTheSame === undefined) {
          const zoneIdsChecked = new LuaMap<number, boolean>()
          const sameTab: { [zoneId: number]: number[] } = {}
          for (const [idx, zoneId] of ipairs(asNumberArray(dropZoneIds))) {
            if (!zoneIdsChecked.get(zoneId)) {
              for (const [compareIdx, compareZoneId] of ipairs(asNumberArray(dropZoneIds))) {
                if (idx !== compareIdx) {
                  if (sameTab[zoneId] === undefined) {
                    sameTab[zoneId] = [idx]
                  }
                  if (zoneId === compareZoneId) {
                    asPresent(sameTab[zoneId]).push(compareIdx)
                  }
                }
              }
              zoneIdsChecked.set(zoneId, true)
            }
          }
          scratch.dropZoneIdsTheSame = sameTab
        }

        if (!ZO_IsTableEmpty(scratch.dropZoneIdsTheSame)) {
          setData[LIBSETS_TABLEKEY_ZONEIDS_SORTED] = scratch.dropZoneIdsTheSame

          if (scratch.dropMechanicTabTheSame === undefined) {
            const tabTheSame: { [zoneId: number]: { [idx: number]: number } } = {}
            for (const [zoneId, dropIndices] of pairs(asPresent(scratch.dropZoneIdsTheSame))) {
              for (const [, dropIndex] of ipairs(dropIndices)) {
                const dropMechanicIdOfZone = dropMechanicTab[dropIndex]
                if (dropMechanicIdOfZone !== undefined) {
                  tabTheSame[zoneId] = tabTheSame[zoneId] ?? {}
                  asPresent(tabTheSame[zoneId])[dropIndex] = dropMechanicIdOfZone
                }
              }
            }
            if (ZO_IsTableEmpty(tabTheSame)) {
              scratch.dropMechanicTabTheSame = undefined
              scratch.dropZoneIdsTheSame = undefined
            } else {
              scratch.dropMechanicTabTheSame = tabTheSame
              setData[LIBSETS_TABLEKEY_DROPMECHANIC_SORTED] = tabTheSame
            }
          }
        } else {
          scratch.dropZoneIdsTheSame = undefined
          scratch.dropMechanicTabTheSame = undefined
        }
      }
    }
  }

  for (const [idx, zoneId] of ipairs(asNumberArray(dropZoneIds))) {
    const isDungeon = lib.IsDungeonZoneId(zoneId)
    const isPublicDungeon = lib.IsPublicDungeonZoneId(zoneId)
    let parentZoneId: number | undefined
    let parentZoneName: string | undefined
    if (isDungeon === true || isPublicDungeon === true) {
      parentZoneId = GetParentZoneId(zoneId)
      if (parentZoneId === undefined) {
        parentZoneId =
          isPublicDungeon === true
            ? lib.GetPublicDungeonZoneIdParentZoneId(zoneId)
            : asNumber(lib.GetDungeonZoneIdParentZoneId)
      }
      if (parentZoneId !== undefined) {
        parentZoneName =
          asStringOpt(scratch.zoneNamesProcessed[parentZoneId]) ?? lib.GetZoneName(parentZoneId)
        scratch.parentDropZoneNames[idx] = parentZoneName
      }
    }

    const zoneName = asStringOpt(scratch.zoneNamesProcessed[zoneId]) ?? lib.GetZoneName(zoneId)
    scratch.dropZoneNames[idx] = zoneName
    scratch.zoneNamesProcessed[zoneId] = zoneName

    const dropMechanicIdOfZone = dropMechanicTab[idx]
    if (dropMechanicIdOfZone !== undefined) {
      lAddDropMechanicInfo(idx, dropMechanicIdOfZone)
    }
  }
}
