import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSlots,
  asSafeReturnApiTableFn,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asSetIdBoolOptMap,
  asTypeToSetIdsTable,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

function checkIfSetsAreLoadedProperly(this: void, setId?: number): boolean {
  return lib.checkIfSetsAreLoadedProperly(setId)
}

function safeReturnAPItable(this: void, tabData: unknown): unknown {
  const fn = asSafeReturnApiTableFn(asLibSlots(lib)["_safeReturnAPItable"])
  return fn(tabData)
}

function isArmorTypeSet(
  this: void,
  setId: number | undefined,
  armorType: number | undefined
): boolean | undefined {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined || armorType === undefined) {
    return false
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  const armorTypeTable = armorTypesSets[armorType]
  if (armorTypeTable === undefined) {
    return undefined
  }
  return armorTypeTable[setId] ?? false
}
lib.IsArmorTypeSet = isArmorTypeSet

function isLightArmorSet(this: void, setId: number | undefined): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined) {
    return false
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  return asPresent(armorTypesSets[ARMORTYPE_LIGHT])[setId] ?? false
}
lib.IsLightArmorSet = isLightArmorSet

function isMediumArmorSet(this: void, setId: number | undefined): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined) {
    return false
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  return asPresent(armorTypesSets[ARMORTYPE_MEDIUM])[setId] ?? false
}
lib.IsMediumArmorSet = isMediumArmorSet

function isHeavyArmorSet(this: void, setId: number | undefined): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined) {
    return false
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  return asPresent(armorTypesSets[ARMORTYPE_HEAVY])[setId] ?? false
}
lib.IsHeavyArmorSet = isHeavyArmorSet

function isAllArmorSet(this: void, setId: number | undefined): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined) {
    return false
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  if (
    asPresent(armorTypesSets[ARMORTYPE_LIGHT])[setId] !== undefined &&
    asPresent(armorTypesSets[ARMORTYPE_MEDIUM])[setId] !== undefined &&
    asPresent(armorTypesSets[ARMORTYPE_HEAVY])[setId] !== undefined
  ) {
    return true
  }
  return false
}
lib.IsAllArmorSet = isAllArmorSet

function isArmorSet(this: void, setId: number | undefined): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined) {
    return false
  }
  const armorSets = asSetIdBoolOptMap(lib.armorSets)
  return armorSets[setId] ?? false
}
lib.IsArmorSet = isArmorSet

function isJewelrySet(this: void, setId: number | undefined): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined) {
    return false
  }
  const jewelrySets = asSetIdBoolOptMap(lib.jewelrySets)
  return jewelrySets[setId] ?? false
}
lib.IsJewelrySet = isJewelrySet

function isWeaponSet(this: void, setId: number | undefined): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined) {
    return false
  }
  const weaponSets = asSetIdBoolOptMap(lib.weaponSets)
  return weaponSets[setId] ?? false
}
lib.IsWeaponSet = isWeaponSet

function isWeaponTypeSet(
  this: void,
  setId: number | undefined,
  weaponType: number | undefined
): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined || weaponType === undefined) {
    return false
  }
  const weaponTypesSets = asTypeToSetIdsTable(lib.weaponTypesSets)
  const weaponTypeTable = weaponTypesSets[weaponType]
  if (weaponTypeTable === undefined) {
    return false
  }
  return weaponTypeTable[setId] ?? false
}
lib.IsWeaponTypeSet = isWeaponTypeSet

function isEquipTypeSet(
  this: void,
  setId: number | undefined,
  equipType: number | undefined
): boolean {
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  if (setId === undefined || equipType === undefined) {
    return false
  }
  const equipTypesSets = asTypeToSetIdsTable(lib.equipTypesSets)
  const equipTypeTable = equipTypesSets[equipType]
  if (equipTypeTable === undefined) {
    return false
  }
  return equipTypeTable[setId] ?? false
}
lib.IsEquipTypeSet = isEquipTypeSet

function getAllArmorTypeSets(this: void, armorType: number | undefined): unknown {
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  if (armorType === undefined) {
    return undefined
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  return safeReturnAPItable(armorTypesSets[armorType])
}
lib.GetAllArmorTypeSets = getAllArmorTypeSets

function getAllArmorSets(this: void): unknown {
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return safeReturnAPItable(lib.armorSets)
}
lib.GetAllArmorSets = getAllArmorSets

function getAllJewelrySets(this: void): unknown {
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return safeReturnAPItable(lib.jewelrySets)
}
lib.GetAllJewelrySets = getAllJewelrySets

function getAllWeaponSets(this: void): unknown {
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return safeReturnAPItable(lib.weaponSets)
}
lib.GetAllWeaponSets = getAllWeaponSets

function getAllWeaponTypeSets(this: void, weaponType: number | undefined): unknown {
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  if (weaponType === undefined) {
    return undefined
  }
  const weaponTypesSets = asTypeToSetIdsTable(lib.weaponTypesSets)
  return safeReturnAPItable(weaponTypesSets[weaponType])
}
lib.GetAllWeaponTypeSets = getAllWeaponTypeSets

function getAllEquipTypeSets(this: void, equipType: number | undefined): unknown {
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  if (equipType === undefined) {
    return undefined
  }
  const equipTypesSets = asTypeToSetIdsTable(lib.equipTypesSets)
  return safeReturnAPItable(equipTypesSets[equipType])
}
lib.GetAllEquipTypeSets = getAllEquipTypeSets
