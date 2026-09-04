import { asNumber } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asCategoryBoolMap,
  asItemIdNumberMap,
  asLibSlots,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import { validateValueAgainstCheckTable } from "../lib-sets-core-helpers/lib-sets-core-helpers.module.code.ts"

const lib = LibSets

const gilet = GetItemLinkEquipType
const giltt = GetItemLinkTraitType
const gilat = GetItemLinkArmorType
const gilwt = GetItemLinkWeaponType
const gildeid = GetItemLinkDefaultEnchantId
const gesct = GetEnchantSearchCategoryType

function getSetItemIdsFiltered(
  this: void,
  returnSingleItemId: boolean | undefined,
  setId: number | undefined,
  allSetItemIds: { [itemId: number]: number } | undefined,
  equipType?: number,
  traitType?: number,
  enchantSearchCategoryType?: number | string,
  armorType?: number,
  weaponType?: number
): LuaMultiReturn<
  [{ [itemId: number]: number } | number | undefined, { [key: string]: unknown } | undefined]
> {
  void setId
  const doLocalDebug = false
  const getAllEnchantSearchCategoryTypesOfSetId =
    enchantSearchCategoryType !== undefined && enchantSearchCategoryType === "all"
  const enchantSearchCategoriesOfSetId: { [category: number]: boolean } = {}
  let returnTableData: { [key: string]: unknown } | undefined

  if (returnSingleItemId === undefined) {
    return $multi(undefined, undefined)
  }
  if (allSetItemIds === undefined || ZO_IsTableEmpty(allSetItemIds)) {
    return $multi(undefined, undefined)
  }

  let anyItemIdFound = false
  let foundItemIdsTable: { [itemId: number]: number } | undefined
  if (returnSingleItemId === false) {
    foundItemIdsTable = {}
  }

  const buildItemLink = lib.buildItemLink
  const equipTypesValid = lib.equipTypesValid
  const traitTypesValid = lib.traitTypesValid
  const enchantSearchCategoryTypesValid = lib.enchantSearchCategoryTypesValid
  const isArmorEquipType = lib.isArmorEquipType
  const isWeaponEquipType = lib.isWeaponEquipType

  let equipTypeValid = false
  let traitTypeValid = false
  let enchantSearchCategoryTypeValid = false
  let armorTypeValid = false
  let weaponTypeValid = false

  if (equipType !== undefined) {
    equipTypeValid = validateValueAgainstCheckTable(
      equipType,
      equipTypesValid,
      undefined,
      doLocalDebug
    )
  }
  if (traitType !== undefined) {
    traitTypeValid = validateValueAgainstCheckTable(
      traitType,
      traitTypesValid,
      undefined,
      doLocalDebug
    )
  }
  if (enchantSearchCategoryType !== undefined) {
    enchantSearchCategoryTypeValid = validateValueAgainstCheckTable(
      asNumber(enchantSearchCategoryType),
      asCategoryBoolMap(enchantSearchCategoryTypesValid),
      undefined,
      doLocalDebug
    )
  }
  if (armorType !== undefined) {
    if (equipType !== undefined) {
      armorTypeValid = validateValueAgainstCheckTable(
        equipType,
        isArmorEquipType,
        undefined,
        doLocalDebug
      )
      if (!armorTypeValid) {
        return $multi(undefined, undefined)
      }
    }
    armorTypeValid = true
  }
  if (weaponType !== undefined) {
    if (equipType !== undefined) {
      weaponTypeValid = validateValueAgainstCheckTable(
        equipType,
        isWeaponEquipType,
        undefined,
        doLocalDebug
      )
      if (!weaponTypeValid) {
        return $multi(undefined, undefined)
      }
    }
    weaponTypeValid = true
  }
  if (armorTypeValid === true && weaponTypeValid === true) {
    return $multi(undefined, undefined)
  }

  let returnGenericItemId = true
  const needItemLinkOfItemId =
    equipTypeValid === true ||
    traitTypeValid === true ||
    armorTypeValid === true ||
    weaponTypeValid === true ||
    enchantSearchCategoryTypeValid === true
  if (needItemLinkOfItemId === true) {
    returnGenericItemId = false
  }

  let foundItemId: number | undefined
  for (const [setItemId, isCorrect] of pairs(allSetItemIds)) {
    foundItemId = undefined
    if (setItemId !== undefined && isCorrect === LIBSETS_SET_ITEMID_TABLE_VALUE_OK) {
      if (needItemLinkOfItemId === true) {
        const itemLink = buildItemLink(setItemId, undefined)
        if (itemLink !== undefined && itemLink !== "") {
          let isValidItemId = true

          if (isValidItemId === true && equipTypeValid === true) {
            isValidItemId = false
            const ilEquipType = gilet(itemLink)
            if (
              ilEquipType !== undefined &&
              validateValueAgainstCheckTable(asNumber(equipType), { [ilEquipType]: true }, true)
            ) {
              isValidItemId = true
            }
          }
          if (isValidItemId === true && traitTypeValid === true) {
            isValidItemId = false
            const ilTraitType = giltt(itemLink)
            if (
              ilTraitType !== undefined &&
              validateValueAgainstCheckTable(asNumber(traitType), { [ilTraitType]: true }, true)
            ) {
              isValidItemId = true
            }
          }
          if (isValidItemId === true && armorTypeValid === true) {
            isValidItemId = false
            const ilArmorType = gilat(itemLink)
            if (
              ilArmorType !== undefined &&
              validateValueAgainstCheckTable(asNumber(armorType), { [ilArmorType]: true }, true)
            ) {
              isValidItemId = true
            }
          } else if (isValidItemId === true && weaponTypeValid === true) {
            isValidItemId = false
            const ilWeaponType = gilwt(itemLink)
            if (
              ilWeaponType !== undefined &&
              validateValueAgainstCheckTable(
                asNumber(weaponType),
                { [ilWeaponType]: true },
                true,
                doLocalDebug
              )
            ) {
              isValidItemId = true
            }
          }
          if (isValidItemId === true && enchantSearchCategoryTypeValid === true) {
            isValidItemId = false
            const ilenchantId = gildeid(itemLink)
            const ilenchantSearchCategoryType = gesct(ilenchantId)
            if (ilenchantSearchCategoryType !== undefined) {
              if (getAllEnchantSearchCategoryTypesOfSetId === true) {
                isValidItemId = true
                enchantSearchCategoriesOfSetId[ilenchantSearchCategoryType] = true
              } else {
                isValidItemId = validateValueAgainstCheckTable(
                  asNumber(enchantSearchCategoryType),
                  { [ilenchantSearchCategoryType]: true },
                  true
                )
              }
            }
          }

          if (isValidItemId === true) {
            foundItemId = setItemId
          }
        }
      } else {
        if (returnGenericItemId === true) {
          foundItemId = setItemId
        }
      }
    }

    if (foundItemId !== undefined) {
      if (returnSingleItemId === true) {
        return $multi(foundItemId, returnTableData)
      } else {
        const foundItemIdsTablePresent = asItemIdNumberMap(foundItemIdsTable)
        foundItemIdsTablePresent[foundItemId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
        anyItemIdFound = true
      }
    }
  }

  if (returnSingleItemId === false && foundItemIdsTable !== undefined && anyItemIdFound === true) {
    if (getAllEnchantSearchCategoryTypesOfSetId === true) {
      returnTableData = returnTableData ?? {}
      returnTableData[LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES] =
        enchantSearchCategoriesOfSetId
    }
    return $multi(foundItemIdsTable, returnTableData)
  }
  return $multi(undefined, undefined)
}
asLibSlots(lib)["_getSetItemIdsFiltered"] = getSetItemIdsFiltered
