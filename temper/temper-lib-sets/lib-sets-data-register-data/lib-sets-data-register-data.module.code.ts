import { asNumber, asNumRecord, asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asNoSetIdSetsElement,
  asNumKeyedNumRecord,
  asNumToNumRecord,
  asSetInfoElement,
  asUnknown,
} from "../lib-sets-data-casts/lib-sets-data-casts.module.code.ts"
import { BLACKLISTED_SET_IDS } from "../lib-sets-gen-blacklisted-set-ids/lib-sets-gen-blacklisted-set-ids.module.code.ts"
import { NO_SET_ID_SETS } from "../lib-sets-gen-no-set-id-sets/lib-sets-gen-no-set-id-sets.module.code.ts"
import { SET_DATA_PRELOADED } from "../lib-sets-gen-set-data-preloaded/lib-sets-gen-set-data-preloaded.module.code.ts"
import { SET_INFO } from "../lib-sets-gen-set-info/lib-sets-gen-set-info.module.code.ts"
import { SETS_OF_NEWER_API_VERSION } from "../lib-sets-gen-sets-of-newer-api-version/lib-sets-gen-sets-of-newer-api-version.module.code.ts"
import { SPECIAL_BONUS_SETS } from "../lib-sets-gen-special-bonus-sets/lib-sets-gen-special-bonus-sets.module.code.ts"
import { ZONE_IDS_OF_NEWER_API_VERSION } from "../lib-sets-gen-zone-ids-of-newer-api-version/lib-sets-gen-zone-ids-of-newer-api-version.module.code.ts"

const lib = LibSets

lib.setDataPreloaded = asTyped<LibSetsApi["setDataPreloaded"]>(SET_DATA_PRELOADED)
lib.zoneIdsOfNewAPIVersionOnly = [...ZONE_IDS_OF_NEWER_API_VERSION]

lib.blacklistedSetIds = asTyped<LibSetsApi["blacklistedSetIds"]>(BLACKLISTED_SET_IDS)
lib.specialBonusSets = asTyped<LibSetsApi["specialBonusSets"]>(SPECIAL_BONUS_SETS)
lib.setsOfNewerAPIVersion = [...SETS_OF_NEWER_API_VERSION]
lib.setInfo = asTyped<LibSetsApi["setInfo"]>(SET_INFO)
lib.noSetIdSets = asTyped<LibSetsApi["noSetIdSets"]>(NO_SET_ID_SETS)

const isPTSAPIVersionLive = lib.checkIfPTSAPIVersionIsLive()

function removeFutureSetData(this: void): undefined {
  if (!isPTSAPIVersionLive) {
    const setsOfNewerAPIVersion = lib.setsOfNewerAPIVersion
    const setDataPreloaded = lib.setDataPreloaded
    if (setsOfNewerAPIVersion !== undefined && !ZO_IsTableEmpty(setsOfNewerAPIVersion)) {
      const nonSetIds = lib.noSetIdSets
      const setInfo = lib.setInfo
      const nonExistingSetIdsAtCurrentApiVersion = lib.nonExistingSetIdsAtCurrentApiVersion
      const setIdsToSetItemIds = asNumRecord(setDataPreloaded[LIBSETS_TABLEKEY_SETITEMIDS])
      const setIdsNoSetToSetItemIds = asNumRecord(
        setDataPreloaded[LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID]
      )
      const setNamesNoSetToSetItemIds = asNumRecord(
        setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES_NO_SETID]
      )
      const preloadedEquipTypeData = asNumKeyedNumRecord(
        setDataPreloaded[LIBSETS_TABLEKEY_SETS_EQUIP_TYPES]
      )
      const preloadedArmorTypeData = asNumKeyedNumRecord(
        setDataPreloaded[LIBSETS_TABLEKEY_SETS_ARMOR_TYPES]
      )
      const preloadedWeaponTypeData = asNumKeyedNumRecord(
        setDataPreloaded[LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES]
      )
      const preloadedIsJewelryData = asNumRecord(setDataPreloaded[LIBSETS_TABLEKEY_SETS_JEWELRY])
      const setIdsToSetNames = asNumRecord(setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES])
      for (const [, setIdOfNewAPIVersion] of ipairs(setsOfNewerAPIVersion)) {
        if (setIdOfNewAPIVersion !== undefined) {
          if (nonSetIds[setIdOfNewAPIVersion] !== undefined) {
            lib.noSetIdSets[setIdOfNewAPIVersion] = asNoSetIdSetsElement(undefined)
            nonExistingSetIdsAtCurrentApiVersion[setIdOfNewAPIVersion] = true
          }
          if (setInfo[setIdOfNewAPIVersion] !== undefined) {
            lib.setInfo[setIdOfNewAPIVersion] = asSetInfoElement(undefined)
            nonExistingSetIdsAtCurrentApiVersion[setIdOfNewAPIVersion] = true
          }
          if (setIdsToSetItemIds[setIdOfNewAPIVersion] !== undefined) {
            setIdsToSetItemIds[setIdOfNewAPIVersion] = undefined
          }
          if (setIdsNoSetToSetItemIds[setIdOfNewAPIVersion] !== undefined) {
            setIdsNoSetToSetItemIds[setIdOfNewAPIVersion] = undefined
          }
          if (setIdsToSetNames[setIdOfNewAPIVersion] !== undefined) {
            setIdsToSetNames[setIdOfNewAPIVersion] = undefined
          }
          if (setNamesNoSetToSetItemIds[setIdOfNewAPIVersion] !== undefined) {
            setNamesNoSetToSetItemIds[setIdOfNewAPIVersion] = undefined
          }
          for (const [, equipTypeData] of pairs(preloadedEquipTypeData)) {
            if (equipTypeData[setIdOfNewAPIVersion] !== undefined) {
              asTyped<{ [setId: number]: unknown }>(preloadedEquipTypeData)[setIdOfNewAPIVersion] =
                undefined
            }
          }
          for (const [, armorTypeData] of pairs(preloadedArmorTypeData)) {
            if (armorTypeData[setIdOfNewAPIVersion] !== undefined) {
              asTyped<{ [setId: number]: unknown }>(preloadedArmorTypeData)[setIdOfNewAPIVersion] =
                undefined
            }
          }
          for (const [, weaponTypeData] of pairs(preloadedWeaponTypeData)) {
            if (weaponTypeData[setIdOfNewAPIVersion] !== undefined) {
              asTyped<{ [setId: number]: unknown }>(preloadedWeaponTypeData)[setIdOfNewAPIVersion] =
                undefined
            }
          }
          if (preloadedIsJewelryData[setIdOfNewAPIVersion] !== undefined) {
            preloadedIsJewelryData[setIdOfNewAPIVersion] = undefined
          }
        }
      }
    }
    const zoneIdsOfNewAPIVersionOnly = lib.zoneIdsOfNewAPIVersionOnly
    if (
      asUnknown(!zoneIdsOfNewAPIVersionOnly) === undefined &&
      !ZO_IsTableEmpty(zoneIdsOfNewAPIVersionOnly)
    ) {
      const wayshrines2ZoneIds = asNumToNumRecord(
        setDataPreloaded[LIBSETS_TABLEKEY_WAYSHRINENODEID2ZONEID]
      )
      for (const [, zoneIdOfNewAPIVersion] of pairs(zoneIdsOfNewAPIVersionOnly)) {
        if (zoneIdOfNewAPIVersion !== undefined) {
          for (const [wayshrineNodeIndex, zoneId] of pairs(wayshrines2ZoneIds)) {
            if (zoneId === zoneIdOfNewAPIVersion) {
              wayshrines2ZoneIds[wayshrineNodeIndex] = asNumber(undefined)
            }
          }
        }
      }
    }
  }
}
lib.removeFutureSetData = removeFutureSetData
