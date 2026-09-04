import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-07"
import "@akasha/temper-eso-types/eso-enums-11"
import "@akasha/temper-eso-types/eso-functions-06"
import "@akasha/temper-eso-types/eso-functions-08"
import { getArmorWeightIndex, getQualityIndex } from "@akasha/temper-bit-codec/equipment-mappings"
import type {
  CharacterArmorSlotData,
  CharacterJewelrySlotData,
  CharacterWeaponSlotData,
} from "../character-capture-codec-types/character-capture-codec-types.module.code.ts"
import { getEnchantQualityIndex } from "../character-capture-enchant-quality/character-capture-enchant-quality.module.code.ts"
import {
  getPlayerArmorEnchantIndex,
  getPlayerArmorTraitIndex,
  getPlayerJewelryEnchantIndex,
  getPlayerJewelryTraitIndex,
  getPlayerWeaponEnchantIndex,
  getPlayerWeaponTraitIndex,
  getPlayerWeaponTypeIndex,
} from "../character-capture-equipment-map/character-capture-equipment-map.module.code.ts"
import { getSetIndex } from "../character-capture-set-map/character-capture-set-map.module.code.ts"

export function captureCharacterArmorSlot(slot: number): CharacterArmorSlotData {
  const itemLink = GetItemLink(BAG_WORN, slot, LINK_STYLE_DEFAULT)

  if (itemLink === "") {
    return {
      isEmpty: true,
      weightIndex: 0,
      traitIndex: 0,
      enchantIndex: 0,
      setIndex: 0,
      qualityIndex: 0,
      enchantQualityIndex: 0,
    }
  }

  const armorType = GetItemArmorType(BAG_WORN, slot)
  const traitType = GetItemTrait(BAG_WORN, slot)
  const enchantCategory = getEnchantCategory(itemLink)
  const setId = getItemSetId(itemLink)

  return {
    isEmpty: false,
    weightIndex: getArmorWeightIndex(armorType),
    traitIndex: getPlayerArmorTraitIndex(traitType),
    enchantIndex: getPlayerArmorEnchantIndex(enchantCategory),
    setIndex: getSetIndex(setId),
    qualityIndex: getQualityIndex(GetItemDisplayQuality(BAG_WORN, slot)),
    enchantQualityIndex: getEnchantQualityIndex(itemLink),
  }
}

export function captureCharacterJewelrySlot(slot: number): CharacterJewelrySlotData {
  const itemLink = GetItemLink(BAG_WORN, slot, LINK_STYLE_DEFAULT)

  if (itemLink === "") {
    return {
      isEmpty: true,
      traitIndex: 0,
      enchantIndex: 0,
      setIndex: 0,
      qualityIndex: 0,
      enchantQualityIndex: 0,
    }
  }

  const traitType = GetItemTrait(BAG_WORN, slot)
  const enchantCategory = getEnchantCategory(itemLink)
  const setId = getItemSetId(itemLink)

  return {
    isEmpty: false,
    traitIndex: getPlayerJewelryTraitIndex(traitType),
    enchantIndex: getPlayerJewelryEnchantIndex(enchantCategory),
    setIndex: getSetIndex(setId),
    qualityIndex: getQualityIndex(GetItemDisplayQuality(BAG_WORN, slot)),
    enchantQualityIndex: getEnchantQualityIndex(itemLink),
  }
}

export function captureCharacterWeaponSlot(slot: number): CharacterWeaponSlotData {
  const itemLink = GetItemLink(BAG_WORN, slot, LINK_STYLE_DEFAULT)
  const emptySlot: CharacterWeaponSlotData = {
    isEmpty: true,
    isShield: false,
    shieldTraitIndex: 0,
    shieldEnchantIndex: 0,
    typeIndex: 0,
    traitIndex: 0,
    enchantIndex: 0,
    poisonIndex: 0,
    setIndex: 0,
    qualityIndex: 0,
    enchantQualityIndex: 0,
  }

  if (itemLink === "") {
    return emptySlot
  }

  const weaponType = GetItemWeaponType(BAG_WORN, slot)
  const traitType = GetItemTrait(BAG_WORN, slot)
  const enchantCategory = getEnchantCategory(itemLink)
  const setId = getItemSetId(itemLink)
  const qualityIndex = getQualityIndex(GetItemDisplayQuality(BAG_WORN, slot))
  const enchantQualityIndex = getEnchantQualityIndex(itemLink)

  if (weaponType === WEAPONTYPE_SHIELD) {
    return {
      isEmpty: false,
      isShield: true,
      shieldTraitIndex: getPlayerArmorTraitIndex(traitType),
      shieldEnchantIndex: getPlayerArmorEnchantIndex(enchantCategory),
      typeIndex: 0,
      traitIndex: 0,
      enchantIndex: 0,
      poisonIndex: 0,
      setIndex: getSetIndex(setId),
      qualityIndex,
      enchantQualityIndex,
    }
  }

  return {
    isEmpty: false,
    isShield: false,
    shieldTraitIndex: 0,
    shieldEnchantIndex: 0,
    typeIndex: getPlayerWeaponTypeIndex(weaponType),
    traitIndex: getPlayerWeaponTraitIndex(traitType),
    enchantIndex: getPlayerWeaponEnchantIndex(enchantCategory),
    poisonIndex: 0,
    setIndex: getSetIndex(setId),
    qualityIndex,
    enchantQualityIndex,
  }
}

export function getEnchantCategory(itemLink: string): number {
  const enchantId = GetItemLinkFinalEnchantId(itemLink)
  if (enchantId === 0) return 0
  return GetEnchantSearchCategoryType(enchantId)
}

export function getItemSetId(itemLink: string): number {
  const [hasSet, , , , , setIdRaw] = GetItemLinkSetInfo(itemLink, true)
  if (!hasSet) return 0
  return setIdRaw ?? 0
}
