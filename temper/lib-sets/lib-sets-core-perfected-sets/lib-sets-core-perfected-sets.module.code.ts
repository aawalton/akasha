import {
  asNumber,
  asNumberArray,
  asNumberOpt,
  asPresent,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asIndexNumberMapOpt,
  asLibSlots,
  asSetIdToStrRecord,
  asStrRecord,
  asStrRecordEntryOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import { asSetIdPerfectedLinkMap } from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

function isAPerfectedOrNonPerfectedSetId(this: void, setId: number): boolean {
  const perfectedSetsInfo = lib.perfectedSetsInfo
  const perfectedSet2NonPerfectedSet = lib.perfectedSet2NonPerfectedSet
  const nonPerfectedSet2PerfectedSet = lib.nonPerfectedSet2PerfectedSet
  const setInfo = lib.setInfo
  if (perfectedSetsInfo[setId] !== undefined) {
    return true
  }
  if (perfectedSet2NonPerfectedSet[setId] !== undefined) {
    return true
  }
  if (nonPerfectedSet2PerfectedSet[setId] !== undefined) {
    return true
  }

  const setData = asPresent(setInfo[setId])
  if (
    setData["isPerfectedSet"] !== undefined &&
    setData["isPerfectedSet"] === LIBSETS_SET_ITEMID_TABLE_VALUE_OK
  ) {
    return true
  }
  if (setData["perfectedSetId"] !== undefined) {
    return true
  }
  return false
}
asLibSlots(lib)["_isAPerfectedOrNonPerfectedSetId"] = isAPerfectedOrNonPerfectedSetId

function fillPerfectedSetDataLookupTables(this: void, setId: number): undefined {
  const setInfo = lib.setInfo
  const perfectedSet2NonPerfectedSet = lib.perfectedSet2NonPerfectedSet
  const nonPerfectedSet2PerfectedSet = lib.nonPerfectedSet2PerfectedSet
  let perfectedSetId: number | undefined
  let perfectedSetZoneId: number | undefined
  let nonPerfectedSetId: number | undefined
  let nonPerfectedSetZoneId: number | undefined
  const setData = asStrRecordEntryOpt(setInfo[setId])

  if (setData !== undefined) {
    if (
      setData["isPerfectedSet"] !== undefined &&
      setData["isPerfectedSet"] === LIBSETS_SET_ITEMID_TABLE_VALUE_OK
    ) {
      perfectedSetId = setId
      const zoneIds = asIndexNumberMapOpt(setData["zoneIds"])
      perfectedSetZoneId = (zoneIds !== undefined ? zoneIds[1] : undefined) ?? undefined

      for (const [setIdOfNonPerfectedSet, setDataToSearch] of pairs(setInfo)) {
        if (nonPerfectedSetId === undefined) {
          if (setId !== setIdOfNonPerfectedSet) {
            const setDataToSearchTab = asStrRecord(setDataToSearch)
            const perfectedSetIdData = asNumberOpt(setDataToSearchTab["perfectedSetId"])
            if (perfectedSetIdData !== undefined && perfectedSetIdData === setId) {
              nonPerfectedSetId = setIdOfNonPerfectedSet
              const nonPerfZoneIds = asIndexNumberMapOpt(setDataToSearchTab["zoneIds"])
              nonPerfectedSetZoneId =
                (nonPerfZoneIds !== undefined ? nonPerfZoneIds[1] : undefined) ?? undefined
              break
            }
          }
        } else {
          break
        }
      }
    }

    if (
      setData["perfectedSetId"] !== undefined &&
      (perfectedSetId === undefined ||
        perfectedSetZoneId === undefined ||
        nonPerfectedSetId === undefined ||
        nonPerfectedSetZoneId === undefined)
    ) {
      const setDataOfPerfectedSet = asStrRecordEntryOpt(
        setInfo[asNumber(setData["perfectedSetId"])]
      )
      if (setDataOfPerfectedSet !== undefined) {
        perfectedSetId = perfectedSetId ?? asNumber(setData["perfectedSetId"])
        const perfZoneIds = asIndexNumberMapOpt(setDataOfPerfectedSet["zoneIds"])
        perfectedSetZoneId =
          perfectedSetZoneId ??
          (perfZoneIds !== undefined ? perfZoneIds[1] : undefined) ??
          undefined

        nonPerfectedSetId = nonPerfectedSetId ?? setId
        const nonPerfZoneIds = asIndexNumberMapOpt(setData["zoneIds"])
        nonPerfectedSetZoneId =
          nonPerfectedSetZoneId ??
          (nonPerfZoneIds !== undefined ? nonPerfZoneIds[1] : undefined) ??
          undefined
      }
    }

    if (
      perfectedSetId !== undefined &&
      perfectedSetZoneId !== undefined &&
      nonPerfectedSetId !== undefined &&
      nonPerfectedSetZoneId !== undefined
    ) {
      perfectedSet2NonPerfectedSet[perfectedSetId] = {
        setId: nonPerfectedSetId,
        zoneId: nonPerfectedSetZoneId,
      }
      nonPerfectedSet2PerfectedSet[nonPerfectedSetId] = {
        setId: perfectedSetId,
        zoneId: perfectedSetZoneId,
      }
    }
  }
}
asLibSlots(lib)["_fillPerfectedSetDataLookupTables"] = fillPerfectedSetDataLookupTables

function addToPerfectedSetsTables(
  this: void,
  setId: number | undefined,
  isPerfected: boolean | undefined
): boolean {
  const perfectedSet2NonPerfectedSet = lib.perfectedSet2NonPerfectedSet
  const nonPerfectedSet2PerfectedSet = lib.nonPerfectedSet2PerfectedSet
  const perfectedSets = asNumberArray(lib.perfectedSets)
  const nonPerfectedSets = asNumberArray(lib.nonPerfectedSets)
  if (setId === undefined || isPerfected === undefined) {
    return false
  }
  if (isPerfected === true) {
    if (perfectedSet2NonPerfectedSet[setId] !== undefined) {
      perfectedSets[perfectedSets.length] = setId
      return true
    }
  } else {
    if (nonPerfectedSet2PerfectedSet[setId] !== undefined) {
      nonPerfectedSets[nonPerfectedSets.length] = setId
      return true
    }
  }
  return false
}

function fillPerfectedSetsTables(this: void): undefined {
  const setInfo = lib.setInfo
  for (const [setId] of pairs(setInfo)) {
    fillPerfectedSetDataLookupTables(setId)
    let wasAdded = addToPerfectedSetsTables(setId, true)
    if (!wasAdded) {
      wasAdded = addToPerfectedSetsTables(setId, false)
    }
  }
}
asLibSlots(lib)["_fillPerfectedSetsTables"] = fillPerfectedSetsTables

function getPerfectedSetData(this: void, setId: number): { [k: string]: unknown } | undefined {
  const setInfo = lib.setInfo
  const perfectedSetsInfo = asSetIdToStrRecord(lib.perfectedSetsInfo)
  const perfectedSet2NonPerfectedSet = asSetIdPerfectedLinkMap(lib.perfectedSet2NonPerfectedSet)
  const nonPerfectedSet2PerfectedSet = asSetIdPerfectedLinkMap(lib.nonPerfectedSet2PerfectedSet)
  if (perfectedSetsInfo[setId] !== undefined) {
    return perfectedSetsInfo[setId]
  }

  const setData = asStrRecord(asPresent(setInfo[setId]))
  let isPerfectedSet: boolean | undefined
  let perfectedSetId: number | undefined
  let perfectedSetZoneId: number | undefined
  let nonPerfectedSetId: number | undefined
  let nonPerfectedSetZoneId: number | undefined

  if (setData["isPerfectedSet"] !== undefined) {
    if (setData["isPerfectedSet"] === LIBSETS_SET_ITEMID_TABLE_VALUE_OK) {
      isPerfectedSet = true
      perfectedSetId = setId
    }
  } else if (setData["perfectedSetId"] !== undefined) {
    isPerfectedSet = false
    nonPerfectedSetId = setId
  } else {
    return undefined
  }

  fillPerfectedSetDataLookupTables(setId)

  if (
    isPerfectedSet !== undefined &&
    (perfectedSetId !== undefined || nonPerfectedSetId !== undefined)
  ) {
    if (isPerfectedSet === true) {
      if (perfectedSet2NonPerfectedSet[asPresent(perfectedSetId)] !== undefined) {
        const nonPerfectedSetLookupData = asPresent(
          perfectedSet2NonPerfectedSet[asPresent(perfectedSetId)]
        )
        nonPerfectedSetId = nonPerfectedSetLookupData.setId
        nonPerfectedSetZoneId = nonPerfectedSetLookupData.zoneId
        if (nonPerfectedSet2PerfectedSet[nonPerfectedSetId] !== undefined) {
          const perfectedSetLookupData = asPresent(nonPerfectedSet2PerfectedSet[nonPerfectedSetId])
          perfectedSetZoneId = perfectedSetLookupData.zoneId
        }
      }
    } else {
      if (nonPerfectedSet2PerfectedSet[asPresent(nonPerfectedSetId)] !== undefined) {
        const perfectedSetLookupData = asPresent(
          nonPerfectedSet2PerfectedSet[asPresent(nonPerfectedSetId)]
        )
        perfectedSetId = perfectedSetLookupData.setId
        perfectedSetZoneId = perfectedSetLookupData.zoneId
        if (perfectedSet2NonPerfectedSet[perfectedSetId] !== undefined) {
          const nonPerfectedSetLookupData = asPresent(perfectedSet2NonPerfectedSet[perfectedSetId])
          nonPerfectedSetZoneId = nonPerfectedSetLookupData.zoneId
        }
      }
    }

    if (
      perfectedSetId !== undefined &&
      nonPerfectedSetId !== undefined &&
      perfectedSetZoneId !== undefined &&
      nonPerfectedSetZoneId !== undefined
    ) {
      perfectedSetsInfo[setId] = {
        isPerfectedSet: isPerfectedSet,

        perfectedSetId: perfectedSetId,
        perfectedSetZoneId: perfectedSetZoneId,

        nonPerfectedSetId: nonPerfectedSetId,
        nonPerfectedSetZoneId: nonPerfectedSetZoneId,
      }
    }
  } else {
    return undefined
  }
  return perfectedSetsInfo[setId]
}
asLibSlots(lib)["_getPerfectedSetData"] = getPerfectedSetData
