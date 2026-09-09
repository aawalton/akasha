import { asNumberArray } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSlots,
  asNumKeyTable,
  asSetIdBoolMap,
  asSetIdNumberMap,
  asSetIdToStrRecord,
  asTypeToSetIdBoolMap,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asSetItemCollectionZoneMapping,
  asTypeToSetIdNumberMap,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"
import {
  checkSetTypeAndUpdateLibTablesAndCounters,
  type LoadSetsState,
} from "../lib-sets-core-load-sets-checktype/lib-sets-core-load-sets-checktype.module.code.ts"

const lib = LibSets

const allowedDropMechanics = lib.allowedDropMechanics

function loadSets(this: void): undefined {
  if (lib.setsScanning) {
    return
  }
  lib.setsScanning = true

  const libDyn = asLibSlots(lib)
  const counterSuffix = lib.counterSuffix
  const preloaded = lib.setDataPreloaded
  const setInfo = lib.setInfo
  const noSetIdSets = lib.noSetIdSets

  const state: LoadSetsState = {
    dropZones: {},
    setId2ZoneIds: {},
    zoneId2SetIds: {},
    dropLocationNames: {},
    setId2DropLocations: {},
    dropLocation2SetIds: {},
    dropLocationNamesAdded: {},
    preloadedSetsWithProcsAllowedInPvP: {},
  }

  lib.perfectedSet2NonPerfectedSet = {}
  lib.nonPerfectedSet2PerfectedSet = {}
  lib.perfectedSets = {}
  lib.nonPerfectedSets = {}
  lib.perfectedSetsInfo = {}

  lib.setTypeToSetIdsForSetTypeTable = {}
  const setTypeToLibraryInternalVariableNames = lib.setTypeToLibraryInternalVariableNames
  if (setTypeToLibraryInternalVariableNames === undefined) {
    return
  }
  for (const [, libSetsSetTypeVariableData] of pairs(setTypeToLibraryInternalVariableNames)) {
    if (libSetsSetTypeVariableData !== undefined) {
      const libSetsSetTypeTableVariable = libSetsSetTypeVariableData["tableName"]
      const libSetsSetTypeCounterVariable = libSetsSetTypeTableVariable + counterSuffix
      if (libSetsSetTypeTableVariable !== undefined) {
        libDyn[libSetsSetTypeTableVariable] = {}
      }
      if (libSetsSetTypeCounterVariable !== undefined) {
        libDyn[libSetsSetTypeCounterVariable] = 0
      }
    }
  }

  lib.setIds = {}
  preloaded[LIBSETS_TABLEKEY_SET_PROCS_ALLOWED_IN_PVP] = state.preloadedSetsWithProcsAllowedInPvP

  checkSetTypeAndUpdateLibTablesAndCounters(asSetIdToStrRecord(setInfo), state)
  if (noSetIdSets !== undefined && !ZO_IsTableEmpty(noSetIdSets)) {
    checkSetTypeAndUpdateLibTablesAndCounters(asSetIdToStrRecord(noSetIdSets), state)
  }

  for (const [libSetsSetType, libSetsSetTypeVariableData] of pairs(
    setTypeToLibraryInternalVariableNames
  )) {
    if (libSetsSetTypeVariableData !== undefined) {
      const libSetsSetTypeTableVariable = libSetsSetTypeVariableData["tableName"]
      if (libSetsSetTypeTableVariable !== undefined) {
        asNumKeyTable(lib.setTypeToSetIdsForSetTypeTable)[libSetsSetType] =
          libDyn[libSetsSetTypeTableVariable]
      }
    }
  }

  buildEquipArmorWeaponJewelryTables(state)
  buildSetItemCollectionTables()

  lib.dropZones = state.dropZones
  lib.setId2DropZones = state.setId2ZoneIds
  lib.dropZone2SetIds = state.zoneId2SetIds
  lib.allowedDropMechanics = allowedDropMechanics
  lib.dropLocationNames = state.dropLocationNames
  lib.dropLocationNames2SetIds = state.dropLocation2SetIds
  lib.setId2DropLocationNames = state.setId2DropLocations

  lib.setsScanning = false
  lib.setsLoaded = true
}
lib.LoadSets = loadSets

function buildEquipArmorWeaponJewelryTables(this: void, _state: LoadSetsState): undefined {
  const preloaded = lib.setDataPreloaded
  const setIds = lib.setIds

  const preloadedEquipTypeData = asTypeToSetIdNumberMap(
    preloaded[LIBSETS_TABLEKEY_SETS_EQUIP_TYPES]
  )
  lib.equipTypesSets = {}
  for (const [equipType, setsDataOfEquipType] of pairs(preloadedEquipTypeData)) {
    const equipTypesSets = asTypeToSetIdBoolMap(lib.equipTypesSets)
    equipTypesSets[equipType] = equipTypesSets[equipType] ?? {}
    for (const [setId, isSetIdInEquipType] of pairs(setsDataOfEquipType)) {
      if (setIds[setId] !== undefined && isSetIdInEquipType === LIBSETS_SET_ITEMID_TABLE_VALUE_OK) {
        const target = asSetIdBoolMap(equipTypesSets[equipType])
        target[setId] = true
      }
    }
  }

  const preloadedArmorTypeData = asTypeToSetIdNumberMap(
    preloaded[LIBSETS_TABLEKEY_SETS_ARMOR_TYPES]
  )
  lib.armorSets = {}
  lib.armorTypesSets = {}
  for (const [armorType, setsDataOfArmorType] of pairs(preloadedArmorTypeData)) {
    const armorTypesSets = asTypeToSetIdBoolMap(lib.armorTypesSets)
    const armorSets = asSetIdBoolMap(lib.armorSets)
    armorTypesSets[armorType] = armorTypesSets[armorType] ?? {}
    for (const [setId, isSetIdInArmorType] of pairs(setsDataOfArmorType)) {
      armorSets[setId] = true
      if (setIds[setId] !== undefined && isSetIdInArmorType === LIBSETS_SET_ITEMID_TABLE_VALUE_OK) {
        const target = asSetIdBoolMap(armorTypesSets[armorType])
        target[setId] = true
      }
    }
  }

  const preloadedWeaponTypeData = asTypeToSetIdNumberMap(
    preloaded[LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES]
  )
  lib.weaponSets = {}
  lib.weaponTypesSets = {}
  for (const [weaponType, setsDataOfWeaponType] of pairs(preloadedWeaponTypeData)) {
    const weaponTypesSets = asTypeToSetIdBoolMap(lib.weaponTypesSets)
    const weaponSets = asSetIdBoolMap(lib.weaponSets)
    weaponTypesSets[weaponType] = weaponTypesSets[weaponType] ?? {}
    for (const [setId, isSetIdInWeaponType] of pairs(setsDataOfWeaponType)) {
      weaponSets[setId] = true
      if (
        setIds[setId] !== undefined &&
        isSetIdInWeaponType === LIBSETS_SET_ITEMID_TABLE_VALUE_OK
      ) {
        const target = asSetIdBoolMap(weaponTypesSets[weaponType])
        target[setId] = true
      }
    }
  }

  const preloadedIsJewelryData = asSetIdNumberMap(preloaded[LIBSETS_TABLEKEY_SETS_JEWELRY])
  lib.jewelrySets = {}
  for (const [setId, isSetIdJewelry] of pairs(preloadedIsJewelryData)) {
    const weaponSets = asSetIdBoolMap(lib.weaponSets)
    const jewelrySets = asSetIdBoolMap(lib.jewelrySets)
    weaponSets[setId] = true
    if (setIds[setId] !== undefined && isSetIdJewelry === LIBSETS_SET_ITEMID_TABLE_VALUE_OK) {
      jewelrySets[setId] = true
    }
  }
}

function buildSetItemCollectionTables(this: void): undefined {
  const preloaded = lib.setDataPreloaded
  const preloadedSetItemCollectionMappingToZone = asSetItemCollectionZoneMapping(
    preloaded[LIBSETS_TABLEKEY_SET_ITEM_COLLECTIONS_ZONE_MAPPING]
  )
  lib.setItemCollectionZoneId2Category = {}
  lib.setItemCollectionCategory2ZoneId = {}
  lib.setItemCollectionParentCategories = {}
  lib.setItemCollectionCategories = {}
  for (const [, category2ZoneData] of ipairs(preloadedSetItemCollectionMappingToZone)) {
    const parentCategoryId = category2ZoneData.parentCategory
    const categoryId = category2ZoneData.category
    if (parentCategoryId !== undefined) {
      lib.setItemCollectionParentCategories[parentCategoryId] =
        lib.setItemCollectionParentCategories[parentCategoryId] ?? {}
      const parentCats = asNumKeyTable(lib.setItemCollectionParentCategories[parentCategoryId])
      parentCats[categoryId] = category2ZoneData
    }
    lib.setItemCollectionCategories[categoryId] = category2ZoneData
    if (category2ZoneData.zoneIds !== undefined) {
      lib.setItemCollectionCategory2ZoneId[categoryId] =
        lib.setItemCollectionCategory2ZoneId[categoryId] ?? []
      for (const [, zoneId] of ipairs(category2ZoneData.zoneIds)) {
        lib.setItemCollectionZoneId2Category[zoneId] =
          lib.setItemCollectionZoneId2Category[zoneId] ?? []
        asNumberArray(lib.setItemCollectionZoneId2Category[zoneId]).push(categoryId)
        asNumberArray(lib.setItemCollectionCategory2ZoneId[categoryId]).push(zoneId)
      }
    }
  }
}
