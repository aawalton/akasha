import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import { bytesToBase64url } from "@akasha/temper-bit-codec/base64url"
import { bitWriterToBytes, makeBitWriter, writeBits } from "@akasha/temper-bit-codec/bit-writer"
import {
  getArmorTraitIndex,
  getArmorWeightIndex,
  getJewelryTraitIndex,
  getQualityIndex,
  getWeaponTraitIndex,
  getWeaponTypeIndex,
} from "@akasha/temper-bit-codec/equipment-mappings"
import {
  ARMOR_WEIGHT_BITS,
  CODEC_MINOR_VERSION,
  COMPANION_BITS,
  COMPANION_BUILD_TYPE,
  ESO_VERSION,
  QUALITY_BITS,
  SKILL_BITS,
  TARGET_ARMOR_BITS,
  TARGET_HEALTH_BITS,
  TRAIT_BITS,
  WEAPON_TYPE_BITS,
} from "../companions-codec-constants/companions-codec-constants.module.code.ts"
import { getCompanionIndex } from "../companions-id-map/companions-id-map.module.code.ts"
import { getSkillIndex } from "../companions-skill-map/companions-skill-map.module.code.ts"

export const ARMOR_SLOTS = [
  EQUIP_SLOT_HEAD,
  EQUIP_SLOT_SHOULDERS,
  EQUIP_SLOT_CHEST,
  EQUIP_SLOT_HAND,
  EQUIP_SLOT_WAIST,
  EQUIP_SLOT_LEGS,
  EQUIP_SLOT_FEET,
]

export const JEWELRY_SLOTS = [EQUIP_SLOT_NECK, EQUIP_SLOT_RING1, EQUIP_SLOT_RING2]

export const WEAPON_SLOTS = [EQUIP_SLOT_MAIN_HAND, EQUIP_SLOT_OFF_HAND]

export const SKILL_SLOT_INDICES = [3, 4, 5, 6, 7, 8]

export interface CompanionBuildData {
  companionIndex: number
  armor: ArmorSlotData[]
  jewelry: JewelrySlotData[]
  weapons: WeaponSlotData[]
  skills: number[]
  targetArmorIndex: number
  targetHealthIndex: number
}

export interface ArmorSlotData {
  isEmpty: boolean
  weightIndex: number
  traitIndex: number
  qualityIndex: number
}

export interface JewelrySlotData {
  isEmpty: boolean
  traitIndex: number
  qualityIndex: number
}

export interface WeaponSlotData {
  isEmpty: boolean
  typeIndex: number
  traitIndex: number
  qualityIndex: number
}

export function encodeCompanionBuild(build: CompanionBuildData): string {
  const writer = makeBitWriter()

  writeBits(writer, COMPANION_BUILD_TYPE, 8)
  writeBits(writer, ESO_VERSION, 8)
  writeBits(writer, CODEC_MINOR_VERSION, 8)

  writeBits(writer, build.companionIndex, COMPANION_BITS)

  for (const slot of build.armor) {
    if (slot.isEmpty) {
      writeBits(writer, 1, 1)
    } else {
      writeBits(writer, 0, 1)
      writeBits(writer, slot.weightIndex, ARMOR_WEIGHT_BITS)
      writeBits(writer, slot.traitIndex, TRAIT_BITS)
      writeBits(writer, slot.qualityIndex, QUALITY_BITS)
    }
  }

  for (const slot of build.jewelry) {
    if (slot.isEmpty) {
      writeBits(writer, 1, 1)
    } else {
      writeBits(writer, 0, 1)
      writeBits(writer, slot.traitIndex, TRAIT_BITS)
      writeBits(writer, slot.qualityIndex, QUALITY_BITS)
    }
  }

  for (const slot of build.weapons) {
    if (slot.isEmpty) {
      writeBits(writer, 1, 1)
    } else {
      writeBits(writer, 0, 1)
      writeBits(writer, slot.typeIndex, WEAPON_TYPE_BITS)
      writeBits(writer, slot.traitIndex, TRAIT_BITS)
      writeBits(writer, slot.qualityIndex, QUALITY_BITS)
    }
  }

  for (const skillIndex of build.skills) {
    writeBits(writer, skillIndex, SKILL_BITS)
  }

  writeBits(writer, build.targetArmorIndex, TARGET_ARMOR_BITS)
  writeBits(writer, build.targetHealthIndex, TARGET_HEALTH_BITS)

  return bytesToBase64url(bitWriterToBytes(writer))
}

export function captureCompanionBuild(): CompanionBuildData | null {
  if (!HasActiveCompanion()) {
    return null
  }

  const companionId = GetActiveCompanionDefId()
  const companionIndex = getCompanionIndex(companionId)

  const armor: ArmorSlotData[] = []
  for (const slot of ARMOR_SLOTS) {
    armor.push(captureArmorSlot(slot))
  }

  const jewelry: JewelrySlotData[] = []
  for (const slot of JEWELRY_SLOTS) {
    jewelry.push(captureJewelrySlot(slot))
  }

  const weapons: WeaponSlotData[] = []
  for (const slot of WEAPON_SLOTS) {
    weapons.push(captureWeaponSlot(slot))
  }

  const skills: number[] = []
  for (const slotIndex of SKILL_SLOT_INDICES) {
    const abilityId = GetSlotBoundId(slotIndex, HOTBAR_CATEGORY_COMPANION)
    skills.push(getSkillIndex(abilityId))
  }

  return {
    companionIndex,
    armor,
    jewelry,
    weapons,
    skills,
    targetArmorIndex: 0,
    targetHealthIndex: 0,
  }
}

export function captureArmorSlot(slot: number): ArmorSlotData {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)

  if (itemLink === "") {
    return { isEmpty: true, weightIndex: 0, traitIndex: 0, qualityIndex: 0 }
  }

  const armorType = GetItemArmorType(BAG_COMPANION_WORN, slot)
  const traitType = GetItemTrait(BAG_COMPANION_WORN, slot)
  const quality = GetItemDisplayQuality(BAG_COMPANION_WORN, slot)

  return {
    isEmpty: false,
    weightIndex: getArmorWeightIndex(armorType),
    traitIndex: getArmorTraitIndex(traitType),
    qualityIndex: getQualityIndex(quality),
  }
}

export function captureJewelrySlot(slot: number): JewelrySlotData {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)

  if (itemLink === "") {
    return { isEmpty: true, traitIndex: 0, qualityIndex: 0 }
  }

  const traitType = GetItemTrait(BAG_COMPANION_WORN, slot)
  const quality = GetItemDisplayQuality(BAG_COMPANION_WORN, slot)

  return {
    isEmpty: false,
    traitIndex: getJewelryTraitIndex(traitType),
    qualityIndex: getQualityIndex(quality),
  }
}

export function captureWeaponSlot(slot: number): WeaponSlotData {
  const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)

  if (itemLink === "") {
    return { isEmpty: true, typeIndex: 0, traitIndex: 0, qualityIndex: 0 }
  }

  const weaponType = GetItemWeaponType(BAG_COMPANION_WORN, slot)
  const traitType = GetItemTrait(BAG_COMPANION_WORN, slot)
  const quality = GetItemDisplayQuality(BAG_COMPANION_WORN, slot)

  const traitIndex =
    weaponType === WEAPONTYPE_SHIELD
      ? getArmorTraitIndex(traitType)
      : getWeaponTraitIndex(traitType)

  return {
    isEmpty: false,
    typeIndex: getWeaponTypeIndex(weaponType),
    traitIndex,
    qualityIndex: getQualityIndex(quality),
  }
}
