import {
  asNumberOpt,
  asPresent,
  asStringOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asFactionNumberMap,
  asGetSetEquippedInfoFn,
  asGetSetsOfClassIdFn,
  asIndexNumberMap,
  asIsNoEsoSetFn,
  asLibSlots,
  asSafeReturnApiTableFn,
  asTypeBoolMapOpt,
  asTypeNameMapOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asSetIdLangStringOptMap,
  asTypeToSetIdsTable,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const slots = asLibSlots(lib)

const safeReturnAPItable = asSafeReturnApiTableFn(slots["_safeReturnAPItable"])
const getSetEquippedInfo = asGetSetEquippedInfoFn(slots["_getSetEquippedInfo"])
const getSetsOfClassId = asGetSetsOfClassIdFn(slots["_getSetsOfClassId"])
const isNoESOSet = asIsNoEsoSetFn(slots["_isNoESOSet"])

type SetIdBoolTable = { [setId: number]: boolean | undefined }

function getSetArmorTypes(this: void, setId: number | undefined): unknown {
  const armorTypesOfSet: SetIdBoolTable = {}
  const armorTypeNames = asTypeNameMapOpt(lib.armorTypeNames)
  if (armorTypeNames === undefined) {
    return undefined
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  for (const [armorType] of pairs(armorTypeNames)) {
    const armorTypeData = armorTypesSets[armorType]
    if (armorTypeData !== undefined) {
      armorTypesOfSet[armorType] = (setId !== undefined ? armorTypeData[setId] : undefined) ?? false
    }
  }
  return safeReturnAPItable(armorTypesOfSet)
}
lib.GetSetArmorTypes = getSetArmorTypes

function getArmorTypeName(this: void, armorType: number | undefined): string | undefined {
  if (armorType === ARMORTYPE_NONE) {
    return undefined
  }
  const armorTypeNames = asTypeNameMapOpt(lib.armorTypeNames)
  if (armorType === undefined || armorTypeNames === undefined) {
    return undefined
  }
  const armorTypeName = armorTypeNames[armorType]
  return armorTypeName
}
lib.GetArmorTypeName = getArmorTypeName

function getItemsArmorType(this: void, itemId: number | undefined): number | undefined {
  const buildItemLink = lib.buildItemLink
  const itemLink = itemId !== undefined ? buildItemLink(itemId) : undefined
  if (itemLink !== undefined) {
    const armorTypeOfSetItem = GetItemLinkArmorType(itemLink)
    if (armorTypeOfSetItem !== undefined && armorTypeOfSetItem !== ARMORTYPE_NONE) {
      return armorTypeOfSetItem
    }
  }
  return undefined
}
lib.GetItemsArmorType = getItemsArmorType

function getSetWeaponTypes(this: void, setId: number | undefined): SetIdBoolTable | undefined {
  const weaponTypesOfSet: SetIdBoolTable = {}
  const weaponTypeNames = asTypeNameMapOpt(lib.weaponTypeNames)
  if (weaponTypeNames === undefined) {
    return undefined
  }
  const weaponTypesSets = asTypeToSetIdsTable(lib.weaponTypesSets)
  for (const [weaponType] of pairs(weaponTypeNames)) {
    const weaponTypeData = weaponTypesSets[weaponType]
    if (weaponTypeData !== undefined) {
      weaponTypesOfSet[weaponType] =
        (setId !== undefined ? weaponTypeData[setId] : undefined) ?? false
    }
  }
  return weaponTypesOfSet
}
lib.GetSetWeaponTypes = getSetWeaponTypes

function getItemsWeaponType(this: void, itemId: number | undefined): number | undefined {
  const buildItemLink = lib.buildItemLink
  const itemLink = itemId !== undefined ? buildItemLink(itemId) : undefined
  if (itemLink !== undefined) {
    const weaponTypeOfSetItem = GetItemLinkWeaponType(itemLink)
    if (weaponTypeOfSetItem !== undefined && weaponTypeOfSetItem !== WEAPONTYPE_NONE) {
      return weaponTypeOfSetItem
    }
  }
  return undefined
}
lib.GetItemsWeaponType = getItemsWeaponType

function getNumEquippedItemsByItemIdsPublic(
  this: void,
  setsItemIds: { [itemId: number]: unknown } | undefined
): number {
  if (setsItemIds === undefined) {
    return 0
  }
  let equippedItems = 0
  const equippedItemsIds: number[] = []
  const bagWornItemCache = SHARED_INVENTORY.GetOrCreateBagCache(BAG_WORN)
  for (const [, data] of pairs(bagWornItemCache)) {
    equippedItemsIds.push(data.slotIndex)
  }
  if (equippedItemsIds.length > 0) {
    for (const [, equippedItemSlot] of pairs(asIndexNumberMap(equippedItemsIds))) {
      const wornItemId = tonumber(GetItemId(BAG_WORN, equippedItemSlot))
      if (wornItemId !== undefined && setsItemIds[wornItemId] !== undefined) {
        equippedItems = equippedItems + 1
      }
    }
  }
  return equippedItems
}
lib.GetNumEquippedItemsByItemIds = getNumEquippedItemsByItemIdsPublic

function getNumEquippedItemsBySetId(
  this: void,
  setId: number | undefined
): LuaMultiReturn<[number | undefined, number | undefined, number | undefined]> {
  if (setId === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  const libSetsGetSetItemId = lib.GetSetItemId
  const itemId = libSetsGetSetItemId(setId)
  const [setIdRetRaw, equippedItems, maxEquipped] = getSetEquippedInfo(itemId)
  const setIdRet = asNumberOpt(setIdRetRaw)
  if (setIdRet === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  return $multi(asNumberOpt(equippedItems), asNumberOpt(maxEquipped), itemId)
}
lib.GetNumEquippedItemsBySetId = getNumEquippedItemsBySetId

function getNumEquippedItemsByItemId(
  this: void,
  itemId: number | undefined
): LuaMultiReturn<[number | undefined, number | undefined, number | undefined]> {
  if (itemId === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  const [setIdRetRaw, equippedItems, maxEquipped] = getSetEquippedInfo(itemId)
  const setIdRet = asNumberOpt(setIdRetRaw)
  if (setIdRet === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  return $multi(asNumberOpt(equippedItems), asNumberOpt(maxEquipped), setIdRet)
}
lib.GetNumEquippedItemsByItemId = getNumEquippedItemsByItemId

function getSetEquipTypes(this: void, setId: number | undefined): SetIdBoolTable | undefined {
  const equipTypesOfSet: SetIdBoolTable = {}
  const equipTypesValid = asTypeBoolMapOpt(lib.equipTypesValid)
  if (equipTypesValid === undefined) {
    return undefined
  }
  const weaponTypesSets = asTypeToSetIdsTable(lib.weaponTypesSets)
  for (const [equipType] of pairs(equipTypesValid)) {
    const equipTypeData = weaponTypesSets[equipType]
    if (equipTypeData !== undefined) {
      equipTypesOfSet[equipType] = (setId !== undefined ? equipTypeData[setId] : undefined) ?? false
    }
  }
  return equipTypesOfSet
}
lib.GetSetEquipTypes = getSetEquipTypes

function getSetByName(
  this: void,
  setName: string | undefined,
  lang?: string
): LuaMultiReturn<[number | undefined, unknown]> {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return $multi(undefined, undefined)
  }
  const langResolved = lib.LangAllowedCheck(lang)
  const preloaded = lib.setDataPreloaded
  const setNamesNonESO = asSetIdLangStringOptMap(preloaded[LIBSETS_TABLEKEY_SETNAMES_NO_SETID])
  const setNames = asSetIdLangStringOptMap(preloaded[LIBSETS_TABLEKEY_SETNAMES])
  for (const [setId, namesOfSets] of pairs(setNames)) {
    const setNameInLanguageToSearch = namesOfSets[langResolved]
    if (setNameInLanguageToSearch !== undefined && setNameInLanguageToSearch === setName) {
      return $multi(setId, safeReturnAPItable(namesOfSets))
    }
  }
  for (const [setId, namesOfSetsNonESO] of pairs(setNamesNonESO)) {
    const setNameNonESOInLanguageToSearch = namesOfSetsNonESO[langResolved]
    if (
      setNameNonESOInLanguageToSearch !== undefined &&
      setNameNonESOInLanguageToSearch === setName
    ) {
      return $multi(setId, safeReturnAPItable(namesOfSetsNonESO))
    }
  }
  return $multi(undefined, undefined)
}
lib.GetSetByName = getSetByName

function getSetBonuses(this: void, itemLink: string, numBonuses: number): (string | undefined)[] {
  let bonuses: (string | undefined)[]
  if (numBonuses > 0) {
    bonuses = []
    for (const i of $range(1, numBonuses)) {
      const [, description] = GetItemLinkSetBonusInfo(itemLink, false, i)
      bonuses.push(description)
    }
  } else {
    const [, , description] = GetItemLinkEnchantInfo(itemLink)
    bonuses = [description]
  }
  return bonuses
}
lib.GetSetBonuses = getSetBonuses

function getClassSets(this: void, classId: number | undefined): unknown {
  if (classId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return safeReturnAPItable(getSetsOfClassId(classId))
}
lib.GetClassSets = getClassSets

function getAllClassSets(this: void): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return false
  }
  return safeReturnAPItable(lib.classSets)
}
lib.GetAllClassSets = getAllClassSets

function jumpToSetId(
  this: void,
  setId: number | undefined,
  factionIndex?: number
): boolean | undefined {
  const setInfo = lib.setInfo
  const noSetIdSets = lib.noSetIdSets
  if (
    setId === undefined ||
    setInfo[setId] === undefined ||
    asPresent(setInfo[setId])[LIBSETS_TABLEKEY_WAYSHRINES] === undefined
  ) {
    return false
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  let factionIndexResolved = factionIndex ?? 1
  if (factionIndexResolved < 1 || factionIndexResolved > 3) {
    factionIndexResolved = 1
  }
  let jumpToNode = -1
  let setWayshrines: { [factionIndex: number]: number } | undefined
  if (isNoESOSet(setId)) {
    setWayshrines = asFactionNumberMap(asPresent(setInfo[setId])[LIBSETS_TABLEKEY_WAYSHRINES])
  } else {
    setWayshrines = asFactionNumberMap(asPresent(noSetIdSets[setId])[LIBSETS_TABLEKEY_WAYSHRINES])
  }
  if (setWayshrines === undefined) {
    return false
  }
  jumpToNode = setWayshrines[factionIndexResolved] ?? -1
  if (jumpToNode > 0) {
    FastTravelToNode(jumpToNode)
    return true
  }
  return false
}
lib.JumpToSetId = jumpToSetId

function getSpecialZoneNameById(
  this: void,
  zoneIdEqualsOrBelowZero: number | undefined,
  lang?: string
): string | undefined {
  if (zoneIdEqualsOrBelowZero === undefined) {
    return undefined
  }
  const langResolved = lib.LangAllowedCheck(lang)
  const specialZoneNamesForLang = lib.specialZoneNames[langResolved]
  if (specialZoneNamesForLang === undefined) {
    return undefined
  }
  return asStringOpt(safeReturnAPItable(specialZoneNamesForLang[zoneIdEqualsOrBelowZero]))
}
lib.GetSpecialZoneNameById = getSpecialZoneNameById
