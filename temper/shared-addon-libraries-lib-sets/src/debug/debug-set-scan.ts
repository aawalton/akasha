import { asNumber, asPresent } from "../casts"
import { asNewSetIdsSV, asSetNamesTable, asSetNamesTableOpt } from "./casts"
import { getAllSetItemIds } from "./debug-helpers"
import {
  apiVersion,
  clientLang,
  debugHolder,
  debugOutputStartLine,
  fallbackLang,
  libPrefix,
  MAJOR,
  pleaseReloadUI,
  scanState,
  storedInSVFileLibSetsInTable,
  unknownName,
  worldName,
} from "./debug-state"

const lib = LibSets

const tsort = table.sort
const zocstrfor = ZO_CachedStrFormat
const buildItemLink = lib.buildItemLink
const isSetByItemId = lib.IsSetByItemId

const upperCaseFirstFormatter = "<<C:1>>"

function debugGetAllSetNames(this: void, noReloadInfo?: boolean): undefined {
  d(debugOutputStartLine + libPrefix + "GetAllSetNames, language: " + tostring(clientLang))
  const noReload = noReloadInfo ?? false
  let svLoadedAlready = false
  let setNamesAdded = 0

  let setWasChecked = false
  const setIdsTable: number[] = []
  const setNamesOfLangTable: { [setId: number]: string } = {}
  let maxSetIdChecked = 0

  const isNonOfficialLanguage = lib.nonOfficialLanguages[clientLang] ?? false

  const allSetItemIds = getAllSetItemIds()
  if (allSetItemIds !== undefined) {
    for (const [setIdToCheck, setsItemIds] of pairs(allSetItemIds)) {
      setWasChecked = false
      if (setsItemIds !== undefined) {
        for (const [itemIdToCheck] of pairs(setsItemIds)) {
          if (!setWasChecked && itemIdToCheck !== undefined) {
            const [isSet, setNameRaw, setId] = isSetByItemId(asNumber(itemIdToCheck))
            if (isSet && setId === setIdToCheck) {
              setWasChecked = true

              let setName: string
              if (isNonOfficialLanguage === true) {
                const preloadedSetNames = asSetNamesTable(
                  lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES]
                )
                const entry = preloadedSetNames[asNumber(setId)]
                setName =
                  (entry !== undefined ? entry[clientLang] : undefined) ??
                  (entry !== undefined ? entry[fallbackLang] : undefined) ??
                  "n/a"
              } else {
                setName = zocstrfor(upperCaseFirstFormatter, asPresent(setNameRaw))
              }

              if (setName !== "") {
                if (!svLoadedAlready) {
                  lib.LoadSavedVariables()
                  svLoadedAlready = true
                }
                setIdsTable.push(asNumber(setId))
                setNamesOfLangTable[asNumber(setId)] = setName
                setNamesAdded = setNamesAdded + 1
              }
            }
          }
        }
      }
      if (asNumber(setIdToCheck) > maxSetIdChecked) {
        maxSetIdChecked = asNumber(setIdToCheck)
      }
    }
  }
  if (setNamesAdded > 0) {
    if (!svLoadedAlready) {
      lib.LoadSavedVariables()
      svLoadedAlready = true
    }
    if (svLoadedAlready === true) {
      tsort(setIdsTable)
      const sv = asPresent(lib.svDebugData)
      for (const [, setId] of ipairs(setIdsTable)) {
        const setName = setNamesOfLangTable[setId]
        if (setName !== undefined && setName !== "") {
          if (sv[LIBSETS_TABLEKEY_SETNAMES] === undefined) {
            sv[LIBSETS_TABLEKEY_SETNAMES] = {}
          }
          const setNamesSV = asSetNamesTable(sv[LIBSETS_TABLEKEY_SETNAMES])
          if (setNamesSV[setId] === undefined) {
            setNamesSV[setId] = {}
          }
          setNamesSV[setId][clientLang] = setName
        }
      }
    }
    const foundNewSetsCount = scanState.newSetIdsFound.length
    d(
      "-->Maximum setId found: " +
        tostring(maxSetIdChecked) +
        " / Added set names: " +
        tostring(setNamesAdded) +
        " / New setIds found: " +
        tostring(foundNewSetsCount)
    )
    if (foundNewSetsCount > 0) {
      const sv = asPresent(lib.svDebugData)
      const setNamesSV = asSetNamesTableOpt(sv[LIBSETS_TABLEKEY_SETNAMES])
      for (const [, setIdNewFound] of ipairs(scanState.newSetIdsFound)) {
        const entry = setNamesSV[setIdNewFound]
        const setNameOfNewSet = (entry !== undefined ? entry[clientLang] : undefined) ?? unknownName
        d("--->new setId: " + tostring(setIdNewFound) + ", name: " + tostring(setNameOfNewSet))
      }
    }
    d(
      storedInSVFileLibSetsInTable +
        "'" +
        LIBSETS_TABLEKEY_SETNAMES +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d(pleaseReloadUI)
  }
}
lib.DebugGetAllSetNames = debugGetAllSetNames
debugHolder.debugGetAllSetNames = debugGetAllSetNames

function showSetCountsScanned(
  this: void,
  finished: boolean,
  keepUncompressedetItemIds: boolean | undefined,
  noReloadInfo: boolean,
  packageNr: number | string
): undefined {
  const noReload = noReloadInfo
  const keepUncompressed = keepUncompressedetItemIds ?? false
  let isFinished = finished
  if (!isFinished && scanState.noFurtherItemsFound === true) {
    isFinished = true
  }

  d(
    debugOutputStartLine +
      libPrefix +
      "Scanned package '" +
      tostring(packageNr) +
      "' - itemIds: " +
      tostring(scanState.itemIdsScanned)
  )
  d("-> Sets found: " + tostring(scanState.setCount))
  d("-> Set items found: " + tostring(scanState.itemCount))
  df(
    "-->Armor: %s / Jewelry: %s / Weapons: %s",
    tostring(scanState.itemArmorCount),
    tostring(scanState.itemJewelryCount),
    tostring(scanState.itemWeaponsCount)
  )

  if (isFinished === true) {
    scanState.noFurtherItemsFound = true
    scanState.newSetIdsFound = []
    let newSetsFound = 0
    let temporarilyText = ""
    if (!keepUncompressed) {
      temporarilyText = " temporarily"
    }
    d(
      ">>> " +
        libPrefix +
        " Scanning of sets has finished! SavedVariables file '" +
        MAJOR +
        ".lua' table '" +
        LIBSETS_TABLEKEY_SETITEMIDS +
        "' was" +
        temporarilyText +
        " written! <<<"
    )
    if (scanState.setCount > 0) {
      asPresent(debugHolder.checkForNewSetIds)(scanState.sets, undefined, false, false)
      newSetsFound = scanState.newSetIdsFound.length
      if (newSetsFound > 0) {
        d(">> !!! Found " + tostring(newSetsFound) + " new setIds !!!")
        for (const [idx, newSetId] of ipairs(scanState.newSetIdsFound)) {
          let newSetName: string | undefined
          const preloadedSetNames = asSetNamesTableOpt(
            lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES]
          )
          if (preloadedSetNames[newSetId] !== undefined) {
            newSetName =
              preloadedSetNames[newSetId][clientLang] ?? preloadedSetNames[newSetId][fallbackLang]
          }
          if (newSetName === undefined) {
            newSetName = unknownName
          }
          if (newSetName !== unknownName) {
            newSetName = zocstrfor(upperCaseFirstFormatter, newSetName)
          } else {
            newSetName =
              unknownName +
              " - Name unknown in LibSets.setDataPreloaded['" +
              LIBSETS_TABLEKEY_SETNAMES +
              "']"
          }
          df(
            ">>>New setId found at index %s: %s -> name: %s",
            tostring(idx),
            tostring(newSetId),
            tostring(newSetName)
          )
          scanState.newSetIdsFound[asNumber(idx) - 1] = newSetId
        }
      }

      lib.LoadSavedVariables()
      const sv = asPresent(lib.svDebugData)
      if (newSetsFound > 0) {
        const apiVersionUpdatedStr = tostring(apiVersion) + "_UpdateInfo"
        if (sv[LIBSETS_TABLEKEY_NEWSETIDS] === undefined) {
          sv[LIBSETS_TABLEKEY_NEWSETIDS] = {}
        }
        const newSetIdsSV = asNewSetIdsSV(sv[LIBSETS_TABLEKEY_NEWSETIDS])
        if (newSetIdsSV[worldName] === undefined) {
          newSetIdsSV[worldName] = {}
        }
        const newSetIdsSVForWorld = asPresent(newSetIdsSV[worldName])
        newSetIdsSVForWorld[tostring(apiVersion)] = scanState.newSetIdsFound
        newSetIdsSVForWorld[apiVersionUpdatedStr] = {
          UpdateType: "LibSets.DebugScanAllSetData()",
          DateTime: os.date("%c"),
        }
      }

      sv[LIBSETS_TABLEKEY_SETITEMIDS] = scanState.sets
      sv[LIBSETS_TABLEKEY_SETS_EQUIP_TYPES] = scanState.setsEquipTypes
      sv[LIBSETS_TABLEKEY_SETS_ARMOR_TYPES] = scanState.setsArmorTypes
      sv[LIBSETS_TABLEKEY_SETS_JEWELRY] = scanState.setsJewelry
      sv[LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES] = scanState.setsWeaponTypes

      asPresent(debugHolder.compressSetItemIdsNow)(scanState.sets, noReload)
      if (!keepUncompressed) {
        sv[LIBSETS_TABLEKEY_SETITEMIDS] = undefined
        d(
          ">>> SavedVariables file '" +
            MAJOR +
            ".lua's table '" +
            LIBSETS_TABLEKEY_SETITEMIDS +
            "' was deleted again to free space and speed-up the loading screens! <<<"
        )
      }
    }
  } else {
    if (scanState.lastSetsCount > 0 && scanState.setCount > 0) {
      if (
        scanState.lastFoundPackageNr > 0 &&
        asNumber(packageNr) - scanState.lastFoundPackageNr >= 10
      ) {
        if (scanState.lastSetsCount === scanState.setCount) {
          scanState.noFurtherItemsFound = true
        }
      }
    }
    if (!scanState.noFurtherItemsFound) {
      if (
        scanState.setCount > 0 &&
        (scanState.lastSetsCount === 0 || scanState.setCount > scanState.lastSetsCount)
      ) {
        scanState.lastFoundPackageNr = asNumber(packageNr)
      }
      scanState.lastSetsCount = scanState.setCount
    }
  }
  d("<<" + debugOutputStartLine)
}
debugHolder.showSetCountsScanned = showSetCountsScanned

function loadSetsByIds(
  this: void,
  packageNr: number,
  from: number,
  to: number,
  noReloadInfo?: boolean
): undefined {
  const noReload = noReloadInfo ?? false
  if (!scanState.noFurtherItemsFound) {
    const isJewelryEquiptype = lib.isJewelryEquipType
    const isWeaponEquipType = lib.isWeaponEquipType
    const setNames = asSetNamesTableOpt(lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES])

    for (const setItemId of $range(from, to)) {
      scanState.itemIdsScanned = scanState.itemIdsScanned + 1
      const itemLink = buildItemLink(setItemId)
      if (itemLink !== undefined && itemLink !== "") {
        if (!IsItemLinkCrafted(itemLink)) {
          const [isSet, setName, , , , setId] = GetItemLinkSetInfo(itemLink, false)
          if (isSet === true) {
            const [itemType] = GetItemLinkItemType(itemLink)
            if (lib.setItemTypes[itemType] !== undefined) {
              if (scanState.sets[setId] === undefined) {
                scanState.sets[setId] = {}
                scanState.setCount = scanState.setCount + 1

                if (
                  (setName !== undefined && setNames[setId] === undefined) ||
                  (setNames[setId] !== undefined && setNames[setId][clientLang] === undefined)
                ) {
                  const setNameClean = zocstrfor(upperCaseFirstFormatter, setName)
                  if (setNameClean !== undefined) {
                    if (setNames[setId] === undefined) {
                      setNames[setId] = {}
                    }
                    asPresent(setNames[setId])[clientLang] = setNameClean
                  }
                }
              }
              scanState.sets[setId][setItemId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
              scanState.itemCount = scanState.itemCount + 1

              const equipType = GetItemLinkEquipType(itemLink)
              if (equipType > EQUIP_TYPE_INVALID) {
                if (scanState.setsEquipTypes[equipType] === undefined) {
                  scanState.setsEquipTypes[equipType] = {}
                }
                scanState.setsEquipTypes[equipType][setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK

                if (isJewelryEquiptype[equipType] !== undefined) {
                  if (scanState.setsJewelry[setId] === undefined) {
                    scanState.itemJewelryCount = scanState.itemJewelryCount + 1
                  }
                  scanState.setsJewelry[setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
                } else if (isWeaponEquipType[equipType] !== undefined) {
                  if (scanState.setsWeapons[setId] === undefined) {
                    scanState.itemWeaponsCount = scanState.itemWeaponsCount + 1
                  }
                  scanState.setsWeapons[setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK

                  const weaponType = GetItemLinkWeaponType(itemLink)
                  if (weaponType > WEAPONTYPE_NONE) {
                    if (scanState.setsWeaponTypes[weaponType] === undefined) {
                      scanState.setsWeaponTypes[weaponType] = {}
                    }
                    scanState.setsWeaponTypes[weaponType][setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
                  }
                } else {
                  if (scanState.setsArmor[setId] === undefined) {
                    scanState.itemArmorCount = scanState.itemArmorCount + 1
                  }
                  scanState.setsArmor[setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK

                  const armorType = GetItemLinkArmorType(itemLink)
                  if (armorType > ARMORTYPE_NONE) {
                    if (scanState.setsArmorTypes[armorType] === undefined) {
                      scanState.setsArmorTypes[armorType] = {}
                    }
                    scanState.setsArmorTypes[armorType][setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  showSetCountsScanned(false, undefined, noReload, packageNr)
}
debugHolder.loadSetsByIds = loadSetsByIds
