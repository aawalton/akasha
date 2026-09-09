import {
  asNumber,
  asNumberArray,
  asNumRecord,
  asNumRecordOpt,
  asPresent,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asNewSetIdsByWorldOpt,
  asSetItemIdsTableOpt,
} from "../lib-sets-debug-casts/lib-sets-debug-casts.module.code.ts"
import {
  apiVersion,
  DEBUG_HOLDER,
  isPTSAPIVersionLive,
  libPrefix,
  MAJOR,
  PLEASE_RELOAD_UI,
  SCAN_STATE,
  worldName,
} from "../lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"

const lib = LibSets

const tsort = table.sort

function lengthOf(this: void, t: object): number {
  let n = 0
  for (const [k] of ipairs(asNumRecord(t))) {
    n = k
  }
  return n
}

export function getFirstEntryOfTable(
  this: void,
  tabName: { [k: number]: unknown } | undefined,
  keyOrValue?: boolean
): unknown {
  if (tabName === undefined) {
    return undefined
  }
  const wantKey = keyOrValue ?? false
  for (const [k, v] of pairs(tabName)) {
    if (wantKey === true) {
      return k
    }
    return v
  }
  return undefined
}

function myCombineNonContiguousTables(
  this: void,
  dest: { [k: number]: unknown },
  ...sources: ({ [k: number]: unknown } | undefined)[]
): undefined {
  for (const sourceTable of sources) {
    if (sourceTable !== undefined) {
      for (const [key, data] of pairs(sourceTable)) {
        if (dest[asNumber(key)] === undefined) {
          dest[asNumber(key)] = data
        }
      }
    }
  }
}

function checkForNewSetIds(
  this: void,
  setIdTable: { [setId: number]: unknown } | undefined,
  funcToCallForEachSetId: ((this: void, setId: number) => unknown) | undefined,
  combineFromSV: boolean,
  forceShowOtherApiVersionSets: boolean
): undefined {
  if (setIdTable === undefined) {
    return
  }
  const runFuncForEachSetId =
    funcToCallForEachSetId !== undefined && type(funcToCallForEachSetId) === "function"
  SCAN_STATE.newSetIdsFound = []
  const setsOfNewerAPIVersion = lib.setsOfNewerAPIVersion
  const blacklistedSetIds = lib.blacklistedSetIds
  const setInfo = lib.setInfo
  let svLoadedAlready = false

  let tableToProcess: { [setId: number]: unknown } = {}
  if (combineFromSV === true) {
    lib.LoadSavedVariables()
    svLoadedAlready = true
    const svDebugData = asPresent(lib.svDebugData)
    const loadedCompressedSetItemIdsFromSV = asNumRecordOpt(
      svDebugData[LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED]
    )
    myCombineNonContiguousTables(tableToProcess, setIdTable, loadedCompressedSetItemIdsFromSV)
  } else {
    tableToProcess = setIdTable
  }

  for (const [setId, setItemIds] of pairs(tableToProcess)) {
    let doAddAsNew = false
    if (blacklistedSetIds[asNumber(setId)] === undefined) {
      if (setItemIds !== undefined && setInfo !== undefined) {
        if (setInfo[asNumber(setId)] === undefined) {
          doAddAsNew = true
        } else {
          if (
            setsOfNewerAPIVersion !== undefined &&
            (forceShowOtherApiVersionSets === true || !isPTSAPIVersionLive)
          ) {
            for (const [, setIdOfNewerAPIVersion] of ipairs(setsOfNewerAPIVersion)) {
              if (setId === setIdOfNewerAPIVersion) {
                doAddAsNew = true
                break
              }
            }
          }
        }
        if (doAddAsNew === true) {
          SCAN_STATE.newSetIdsFound.push(asNumber(setId))
        }
        if (runFuncForEachSetId === true) {
          asPresent(funcToCallForEachSetId)(asNumber(setId))
        }
      }
    }
  }

  if (combineFromSV === true) {
    if (!svLoadedAlready) {
      lib.LoadSavedVariables()
    }
    const svDebugData = lib.svDebugData
    const newSetIdsByWorld =
      svDebugData !== undefined
        ? asNewSetIdsByWorldOpt(svDebugData[LIBSETS_TABLEKEY_NEWSETIDS])
        : undefined
    const newSetIdsForWorld =
      newSetIdsByWorld !== undefined ? newSetIdsByWorld[worldName] : undefined
    const newSetIdsFromSV =
      newSetIdsForWorld !== undefined ? newSetIdsForWorld[apiVersion] : undefined
    if (newSetIdsFromSV !== undefined && lengthOf(newSetIdsFromSV) > 0) {
      df(
        ">>found newSetData in the SavedVariables - WorldName: %s, APIVersion: %s",
        tostring(worldName),
        tostring(apiVersion)
      )
      for (const [idx, newSetIdToCheck] of ipairs(newSetIdsFromSV)) {
        if (type(newSetIdToCheck) === "number") {
          let addNow = true
          if (newSetIdToCheck !== undefined) {
            for (const [, newSetIdLoadedBefore] of ipairs(SCAN_STATE.newSetIdsFound)) {
              if (newSetIdToCheck === newSetIdLoadedBefore) {
                addNow = false
                break
              }
            }
          }
          if (addNow === true && newSetIdToCheck !== undefined) {
            SCAN_STATE.newSetIdsFound[idx - 1] = asNumber(newSetIdToCheck)
            if (runFuncForEachSetId === true) {
              asPresent(funcToCallForEachSetId)(asNumber(newSetIdToCheck))
            }
          }
        }
      }
    }
  }
  tsort(SCAN_STATE.newSetIdsFound)
}
DEBUG_HOLDER.checkForNewSetIds = checkForNewSetIds

export function getAllSetItemIds(this: void): { [setId: number]: { [itemId: number]: number } } {
  checkForNewSetIds(
    asNumRecordOpt(lib.setDataPreloaded[LIBSETS_TABLEKEY_SETITEMIDS]),
    lib.DecompressSetIdItemIds,
    true,
    false
  )
  return lib.CachedSetItemIdsTable
}

function compressSetItemIdTable(this: void, toMinify: number[]): (number | string)[] {
  const minifiedTable: (number | string)[] = []
  let numConsecutive = 0
  let lastPosition = 1
  for (const i of $range(2, toMinify.length)) {
    if (asPresent(toMinify[lastPosition - 1]) + numConsecutive + 1 === toMinify[i - 1]) {
      numConsecutive = numConsecutive + 1
    } else {
      if (numConsecutive > 0) {
        minifiedTable.push(tostring(toMinify[lastPosition - 1]) + "," + tostring(numConsecutive))
      } else {
        minifiedTable.push(asPresent(toMinify[lastPosition - 1]))
      }
      numConsecutive = 0
      lastPosition = i
    }
  }
  if (numConsecutive > 0) {
    minifiedTable.push(tostring(toMinify[lastPosition - 1]) + "," + tostring(numConsecutive))
  } else {
    minifiedTable.push(asPresent(toMinify[lastPosition - 1]))
  }
  tsort(minifiedTable)
  return minifiedTable
}

function compressSetItemIdsNow(
  this: void,
  setsDataTable: { [setId: number]: { [itemId: number]: number } } | undefined,
  noReloadInfo?: boolean
): undefined {
  const noReload = noReloadInfo ?? false
  d(libPrefix + " Compressing the set itemIds now...")
  lib.LoadSavedVariables()
  const svDebugData = asPresent(lib.svDebugData)
  let sourceTable = setsDataTable
  if (sourceTable === undefined) {
    sourceTable = asSetItemIdsTableOpt(svDebugData[LIBSETS_TABLEKEY_SETITEMIDS])
  }
  if (sourceTable === undefined) {
    d("<Aborting: setsDataTable is missing")
    return
  }

  const compressed: { [setId: number]: (number | string)[] } = {}
  svDebugData[LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED] = compressed
  for (const [setId, setItemIdsOfSetId] of pairs(sourceTable)) {
    const helperTabNoGapIndex: number[] = []
    for (const [k] of pairs(setItemIdsOfSetId)) {
      helperTabNoGapIndex.push(asNumber(k))
    }
    tsort(asNumberArray(setItemIdsOfSetId))
    compressed[asNumber(setId)] = compressSetItemIdTable(helperTabNoGapIndex)
  }
  d(
    ">>> " +
      libPrefix +
      " Compression of set itemIds has finished and was saved to SavedVariables file '" +
      MAJOR +
      ".lua' table '" +
      LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED +
      "'"
  )
  if (noReload === true) {
    return
  }
  d(PLEASE_RELOAD_UI)
}
DEBUG_HOLDER.compressSetItemIdsNow = compressSetItemIdsNow
lib.DebugCompressSetItemIdsNow = compressSetItemIdsNow
