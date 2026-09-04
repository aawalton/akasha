import type { BitReaderState } from "@akasha/temper-build-hash/build-hash-bit-reader"
import { readBits } from "@akasha/temper-build-hash/build-hash-bit-reader"
import type { BitWriterState } from "@akasha/temper-build-hash/build-hash-bit-writer"
import { writeBits } from "@akasha/temper-build-hash/build-hash-bit-writer"
import { recordFromKeys } from "@akasha/temper-build-hash/record-from-keys"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlot,
  WeaponSlotItem,
} from "@akasha/temper-characters-equipment/loadout-types"
import type { ArmorSlotId } from "@akasha/temper-equipment-kinds/armor-slots"
import type {
  EquipmentQualityId,
  EquipmentQualityOptionId,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { JewelrySlotId } from "@akasha/temper-equipment-kinds/jewelry-slots"
import {
  ARMOR_ENCHANT_BITS,
  ARMOR_TRAIT_BITS,
  ARMOR_WEIGHT_BITS,
  armorSlotIds,
  getArmorEnchantId,
  getArmorEnchantIndex,
  getArmorTraitId,
  getArmorTraitIndex,
  getArmorWeightId,
  getArmorWeightIndex,
  getJewelryEnchantId,
  getJewelryEnchantIndex,
  getJewelryTraitId,
  getJewelryTraitIndex,
  getPoisonId,
  getPoisonIndex,
  getQualityId,
  getQualityIndex,
  getSetId,
  getSetIndex,
  getWeaponEnchantId,
  getWeaponEnchantIndex,
  getWeaponTraitId,
  getWeaponTraitIndex,
  getWeaponTypeId,
  getWeaponTypeIndex,
  JEWELRY_ENCHANT_BITS,
  JEWELRY_TRAIT_BITS,
  jewelrySlotIds,
  POISON_BITS,
  QUALITY_BITS,
  SET_BITS,
  WEAPON_ENCHANT_BITS,
  WEAPON_TRAIT_BITS,
  WEAPON_TYPE_BITS,
} from "../build-codec-indices/build-codec-indices.module.code.ts"

export function encodeEquipment(writer: BitWriterState, build: CharacterState): undefined {
  const equipment = build.equipment

  for (const slotId of armorSlotIds) {
    encodeArmorSlot(writer, equipment.armor[slotId])
  }

  for (const slotId of jewelrySlotIds) {
    encodeJewelrySlot(writer, equipment.jewelry[slotId])
  }

  encodeWeaponBar(writer, equipment["primary-weapon-bar"])
  encodeWeaponBar(writer, equipment["backup-weapon-bar"])
}

function encodeArmorSlot(writer: BitWriterState, slot: ArmorSlotItem): undefined {
  if (slot.itemType === "empty" || (slot.data.set === "no-set" && slot.data.trait === "no-trait")) {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)
  const armor = slot.data
  writeBits(writer, getArmorWeightIndex(armor.weight), ARMOR_WEIGHT_BITS)
  writeBits(writer, getArmorTraitIndex(armor.trait), ARMOR_TRAIT_BITS)
  writeBits(writer, getArmorEnchantIndex(armor.enchantment), ARMOR_ENCHANT_BITS)
  writeBits(writer, getSetIndex(armor.set), SET_BITS)
  writeBits(writer, getQualityIndex(armor.quality ?? "no-quality"), QUALITY_BITS)
  writeBits(writer, getQualityIndex(armor.enchantmentQuality ?? "no-quality"), QUALITY_BITS)
}

function encodeJewelrySlot(writer: BitWriterState, slot: JewelrySlotItem): undefined {
  if (slot.itemType === "empty" || (slot.data.set === "no-set" && slot.data.trait === "no-trait")) {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)
  const jewelry = slot.data
  writeBits(writer, getJewelryTraitIndex(jewelry.trait), JEWELRY_TRAIT_BITS)
  writeBits(writer, getJewelryEnchantIndex(jewelry.enchantment), JEWELRY_ENCHANT_BITS)
  writeBits(writer, getSetIndex(jewelry.set), SET_BITS)
  writeBits(writer, getQualityIndex(jewelry.quality ?? "no-quality"), QUALITY_BITS)
  writeBits(writer, getQualityIndex(jewelry.enchantmentQuality ?? "no-quality"), QUALITY_BITS)
}

function encodeWeaponBar(writer: BitWriterState, bar: WeaponSlot): undefined {
  encodeWeaponSlot(writer, bar["main-hand"])
  encodeWeaponSlot(writer, bar["off-hand"])
}

function encodeWeaponSlot(writer: BitWriterState, slot: WeaponSlotItem): undefined {
  if (
    slot.itemType === "empty" ||
    (slot.itemType === "weapon" && slot.data.set === "no-set" && slot.data.trait === "no-trait")
  ) {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)

  if (slot.itemType === "shield") {
    writeBits(writer, 1, 1)
    const shield = slot.data
    writeBits(writer, getArmorTraitIndex(shield.trait), ARMOR_TRAIT_BITS)
    writeBits(writer, getArmorEnchantIndex(shield.enchantment), ARMOR_ENCHANT_BITS)
    writeBits(writer, getSetIndex(shield.set), SET_BITS)
    writeBits(writer, getQualityIndex(shield.quality ?? "no-quality"), QUALITY_BITS)
    writeBits(writer, getQualityIndex(shield.enchantmentQuality ?? "no-quality"), QUALITY_BITS)
  } else {
    writeBits(writer, 0, 1)
    const weapon = slot.data
    writeBits(writer, getWeaponTypeIndex(weapon.type), WEAPON_TYPE_BITS)
    writeBits(writer, getWeaponTraitIndex(weapon.trait), WEAPON_TRAIT_BITS)
    writeBits(writer, getWeaponEnchantIndex(weapon.enchantment), WEAPON_ENCHANT_BITS)
    writeBits(writer, getPoisonIndex(weapon.poison), POISON_BITS)
    writeBits(writer, getSetIndex(weapon.set), SET_BITS)
    writeBits(writer, getQualityIndex(weapon.quality ?? "no-quality"), QUALITY_BITS)
    writeBits(writer, getQualityIndex(weapon.enchantmentQuality ?? "no-quality"), QUALITY_BITS)
  }
}

export function decodeEquipment(reader: BitReaderState): CharacterState["equipment"] {
  const armor = recordFromKeys(armorSlotIds, (slotId) => decodeArmorSlot(reader, slotId))
  const jewelry = recordFromKeys(jewelrySlotIds, (slotId) => decodeJewelrySlot(reader, slotId))

  const primaryWeaponBar = decodeWeaponBar(reader)
  const backupWeaponBar = decodeWeaponBar(reader)

  return {
    armor,
    jewelry,
    "primary-weapon-bar": primaryWeaponBar,
    "backup-weapon-bar": backupWeaponBar,
  }
}

function decodeArmorSlot(reader: BitReaderState, slotId: ArmorSlotId): ArmorSlotItem {
  const isEmpty = readBits(reader, 1) === 1
  if (isEmpty) {
    return {
      itemType: "armor",
      data: {
        type: slotId,
        weight: "no-weight",
        set: "no-set",
        trait: "no-trait",
        enchantment: "no-enchant",
        quality: "no-quality",
      },
    }
  }

  const weight = getArmorWeightId(readBits(reader, ARMOR_WEIGHT_BITS))
  const trait = getArmorTraitId(readBits(reader, ARMOR_TRAIT_BITS))
  const enchantment = getArmorEnchantId(readBits(reader, ARMOR_ENCHANT_BITS))
  const set = getSetId(readBits(reader, SET_BITS))
  const quality = decodeQuality(reader)
  const enchantmentQuality = decodeEnchantmentQuality(reader)

  return {
    itemType: "armor",
    data: {
      type: slotId,
      weight,
      trait,
      enchantment,
      set,
      quality,
      enchantmentQuality,
    },
  }
}

function decodeJewelrySlot(reader: BitReaderState, slotId: JewelrySlotId): JewelrySlotItem {
  const isEmpty = readBits(reader, 1) === 1
  if (isEmpty) {
    const type = slotId === "necklace" ? "necklace" : "ring"
    return {
      itemType: "jewelry",
      data: {
        type,
        set: "no-set",
        trait: "no-trait",
        enchantment: "no-enchant",
        quality: "no-quality",
      },
    }
  }

  const trait = getJewelryTraitId(readBits(reader, JEWELRY_TRAIT_BITS))
  const enchantment = getJewelryEnchantId(readBits(reader, JEWELRY_ENCHANT_BITS))
  const set = getSetId(readBits(reader, SET_BITS))
  const quality = decodeQuality(reader)
  const enchantmentQuality = decodeEnchantmentQuality(reader)

  const type = slotId === "necklace" ? "necklace" : "ring"

  return {
    itemType: "jewelry",
    data: {
      type,
      trait,
      enchantment,
      set,
      quality,
      enchantmentQuality,
    },
  }
}

function decodeWeaponBar(reader: BitReaderState): WeaponSlot {
  return {
    "main-hand": decodeWeaponSlot(reader),
    "off-hand": decodeWeaponSlot(reader),
  }
}

function decodeWeaponSlot(reader: BitReaderState): WeaponSlotItem {
  const isEmpty = readBits(reader, 1) === 1
  if (isEmpty) {
    return {
      itemType: "weapon",
      data: {
        type: "no-type",
        set: "no-set",
        trait: "no-trait",
        enchantment: "no-enchant",
        poison: "no-poison",
        quality: "no-quality",
      },
    }
  }

  const isShield = readBits(reader, 1) === 1
  if (isShield) {
    const trait = getArmorTraitId(readBits(reader, ARMOR_TRAIT_BITS))
    const enchantment = getArmorEnchantId(readBits(reader, ARMOR_ENCHANT_BITS))
    const set = getSetId(readBits(reader, SET_BITS))
    const quality = decodeQuality(reader)
    const enchantmentQuality = decodeEnchantmentQuality(reader)

    return {
      itemType: "shield",
      data: {
        type: "shield",
        weight: "shield",
        trait,
        enchantment,
        set,
        quality,
        enchantmentQuality,
      },
    }
  }

  const type = getWeaponTypeId(readBits(reader, WEAPON_TYPE_BITS))
  const trait = getWeaponTraitId(readBits(reader, WEAPON_TRAIT_BITS))
  const enchantment = getWeaponEnchantId(readBits(reader, WEAPON_ENCHANT_BITS))
  const poison = getPoisonId(readBits(reader, POISON_BITS))
  const set = getSetId(readBits(reader, SET_BITS))
  const quality = decodeQuality(reader)
  const enchantmentQuality = decodeEnchantmentQuality(reader)

  return {
    itemType: "weapon",
    data: {
      type,
      trait,
      enchantment,
      poison,
      set,
      quality,
      enchantmentQuality,
    },
  }
}

function decodeQuality(reader: BitReaderState): EquipmentQualityOptionId | undefined {
  const id = getQualityId(readBits(reader, QUALITY_BITS))
  if (id === "no-quality") return undefined
  return id
}

function decodeEnchantmentQuality(reader: BitReaderState): EquipmentQualityId | undefined {
  const id = getQualityId(readBits(reader, QUALITY_BITS))
  if (id === "no-quality") return undefined
  if (id === "mythic") return "legendary"
  return id
}
