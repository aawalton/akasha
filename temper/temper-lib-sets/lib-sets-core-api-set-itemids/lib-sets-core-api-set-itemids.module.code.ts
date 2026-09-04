import { asNumberOpt } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asCategoryBoolMap,
  asItemIdNumberMapOpt,
  asLibSlots,
  asSafeReturnApiTableFn,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import { asCategoryBoolMapOpt } from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const libSlots = asLibSlots(lib)

type GetSetItemIdsFilteredFn = (
  this: void,
  returnSingleItemId: boolean | undefined,
  setId: number | undefined,
  allSetItemIds: { [itemId: number]: number } | undefined,
  equipType?: number,
  traitType?: number,
  enchantSearchCategoryType?: number | string,
  armorType?: number,
  weaponType?: number
) => LuaMultiReturn<
  [{ [itemId: number]: number } | number | undefined, { [key: string]: unknown } | undefined]
>
function asGetSetItemIdsFilteredFn(value: unknown): GetSetItemIdsFilteredFn {
  return value as GetSetItemIdsFilteredFn
}
const getSetItemIdsFiltered = asGetSetItemIdsFilteredFn(libSlots["_getSetItemIdsFiltered"])

type CheckSetItemIdsAreValidFn = (
  this: void,
  setId: number | undefined,
  setItemIds: { [itemId: number]: number } | undefined
) => void
function asCheckSetItemIdsAreValidFn(value: unknown): CheckSetItemIdsAreValidFn {
  return value as CheckSetItemIdsAreValidFn
}
const checkSetItemIdsAreValidOnThisAPIVersion = asCheckSetItemIdsAreValidFn(
  libSlots["_checkSetItemIdsAreValidOnThisAPIVersion"]
)

function getSetItemIds(
  this: void,
  setId: number | undefined,
  isNoESOSetId: boolean | undefined,
  equipType?: number,
  traitType?: number,
  enchantSearchCategoryType?: number | string,
  armorType?: number,
  weaponType?: number
): LuaMultiReturn<
  [{ [itemId: number]: number } | undefined, { [key: string]: unknown } | undefined]
> {
  if (setId === undefined) {
    return $multi(undefined, undefined)
  }
  if (armorType !== undefined && weaponType !== undefined) {
    return $multi(undefined, undefined)
  }

  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return $multi(undefined, undefined)
  }
  let isNoESOSetIdResolved = isNoESOSetId
  if (isNoESOSetIdResolved === undefined) {
    const isNoESOSet = lib.IsNoESOSet
    isNoESOSetIdResolved = isNoESOSet(setId)
  }
  const decompressSetIdItemIds = lib.DecompressSetIdItemIds
  const setItemIds = decompressSetIdItemIds(setId, isNoESOSetIdResolved)
  if (setItemIds === undefined) {
    return $multi(undefined, undefined)
  }

  checkSetItemIdsAreValidOnThisAPIVersion(setId, setItemIds)

  if (
    equipType !== undefined ||
    traitType !== undefined ||
    enchantSearchCategoryType !== undefined ||
    armorType !== undefined ||
    weaponType !== undefined
  ) {
    const [validItemIds, returnTab] = getSetItemIdsFiltered(
      false,
      setId,
      setItemIds,
      equipType,
      traitType,
      enchantSearchCategoryType,
      armorType,
      weaponType
    )
    return $multi(asItemIdNumberMapOpt(validItemIds), returnTab)
  }
  return $multi(setItemIds, undefined)
}
lib.GetSetItemIds = getSetItemIds

function getSetItemId(
  this: void,
  setId: number | undefined,
  isNoESOSetId?: boolean,
  equipType?: number,
  traitType?: number,
  enchantSearchCategoryType?: number | string,
  armorType?: number,
  weaponType?: number
): number | undefined {
  const [setItemIds] = getSetItemIds(setId, isNoESOSetId)
  if (setItemIds === undefined) {
    return undefined
  }

  const [setItemId] = getSetItemIdsFiltered(
    true,
    setId,
    setItemIds,
    equipType,
    traitType,
    enchantSearchCategoryType,
    armorType,
    weaponType
  )
  return asNumberOpt(setItemId)
}
lib.GetSetItemId = getSetItemId

function getSetFirstItemId(
  this: void,
  setId: number | undefined,
  isNoESOSetId?: boolean,
  equipType?: number,
  traitType?: number,
  enchantSearchCategoryType?: number | string,
  armorType?: number,
  weaponType?: number
): number | undefined {
  return getSetItemId(
    setId,
    isNoESOSetId,
    equipType,
    traitType,
    enchantSearchCategoryType,
    armorType,
    weaponType
  )
}
lib.GetSetFirstItemId = getSetFirstItemId

function getSetEnchantSearchCategories(
  this: void,
  setId: number,
  equipType?: number,
  traitType?: number,
  armorType?: number,
  weaponType?: number
): unknown {
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  let enchantSearchCategoriesOfSetId: { [category: number]: boolean } | undefined
  const isNoESOSet = lib.IsNoESOSet
  const isNonEsoSetId = isNoESOSet(setId)
  const noSetIdSets = lib.noSetIdSets
  const setInfo = lib.setInfo
  const safeReturnAPItable = asSafeReturnApiTableFn(libSlots["_safeReturnAPItable"])

  if (isNonEsoSetId === true) {
    enchantSearchCategoriesOfSetId = asCategoryBoolMapOpt(
      noSetIdSets[setId]?.[LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES]
    )
  } else {
    enchantSearchCategoriesOfSetId = asCategoryBoolMapOpt(
      setInfo[setId]?.[LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES]
    )
  }
  if (
    enchantSearchCategoriesOfSetId !== undefined &&
    !ZO_IsTableEmpty(enchantSearchCategoriesOfSetId)
  ) {
    return safeReturnAPItable(enchantSearchCategoriesOfSetId)
  }

  const [, returnTab] = getSetItemIds(
    setId,
    isNonEsoSetId,
    equipType,
    traitType,
    "all",
    armorType,
    weaponType
  )
  if (
    returnTab === undefined ||
    returnTab[LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES] === undefined
  ) {
    return undefined
  }
  enchantSearchCategoriesOfSetId = asCategoryBoolMap(
    returnTab[LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES]
  )

  if (
    equipType === undefined &&
    traitType === undefined &&
    armorType === undefined &&
    weaponType === undefined &&
    !ZO_IsTableEmpty(enchantSearchCategoriesOfSetId)
  ) {
    if (isNonEsoSetId === true) {
      const noSetIdSetData = noSetIdSets[setId]
      if (noSetIdSetData !== undefined) {
        noSetIdSetData[LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES] =
          enchantSearchCategoriesOfSetId
      }
    } else {
      const setInfoData = setInfo[setId]
      if (setInfoData !== undefined) {
        setInfoData[LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES] = enchantSearchCategoriesOfSetId
      }
    }
  }
  return safeReturnAPItable(enchantSearchCategoriesOfSetId)
}
lib.GetSetEnchantSearchCategories = getSetEnchantSearchCategories
