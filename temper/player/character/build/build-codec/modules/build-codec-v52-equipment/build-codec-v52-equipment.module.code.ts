import {
  ARMOR_ENCHANT_BITS,
  armorTraitBits,
  armorWeightBits,
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
  jewelryTraitBits,
  POISON_BITS,
  qualityBits,
  setBits,
  WEAPON_ENCHANT_BITS,
  weaponTraitBits,
  weaponTypeBits,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import type { BitReaderState } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import { readBits } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import type { BitWriterState } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import { writeBits } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import { recordFromKeys } from "akasha/temper/player/character/build/build-hash/modules/record-from-keys/record-from-keys.module.code.ts"
import {
  type ArmorSlotId,
  armorSlots,
} from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import type {
  EquipmentQualityId,
  EquipmentQualityOptionId,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import {
  type JewelrySlotId,
  jewelrySlots,
} from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-slots/jewelry-slots.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlot,
  WeaponSlotItem,
} from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"

export function encodeEquipment(writer: BitWriterState, build: CharacterState): undefined {
  const equipment = build.equipment

  for (const slotId of armorSlots.ids) {
    encodeArmorSlot(writer, equipment.armor[slotId])
  }

  for (const slotId of jewelrySlots.ids) {
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
  writeBits(writer, getArmorWeightIndex(armor.weight), armorWeightBits())
  writeBits(writer, getArmorTraitIndex(armor.trait), armorTraitBits())
  writeBits(writer, getArmorEnchantIndex(armor.enchantment), ARMOR_ENCHANT_BITS)
  writeBits(writer, getSetIndex(armor.set), setBits())
  writeBits(writer, getQualityIndex(armor.quality ?? "no-quality"), qualityBits())
  writeBits(writer, getQualityIndex(armor.enchantmentQuality ?? "no-quality"), qualityBits())
}

function encodeJewelrySlot(writer: BitWriterState, slot: JewelrySlotItem): undefined {
  if (slot.itemType === "empty" || (slot.data.set === "no-set" && slot.data.trait === "no-trait")) {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)
  const jewelry = slot.data
  writeBits(writer, getJewelryTraitIndex(jewelry.trait), jewelryTraitBits())
  writeBits(writer, getJewelryEnchantIndex(jewelry.enchantment), JEWELRY_ENCHANT_BITS)
  writeBits(writer, getSetIndex(jewelry.set), setBits())
  writeBits(writer, getQualityIndex(jewelry.quality ?? "no-quality"), qualityBits())
  writeBits(writer, getQualityIndex(jewelry.enchantmentQuality ?? "no-quality"), qualityBits())
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
    writeBits(writer, getArmorTraitIndex(shield.trait), armorTraitBits())
    writeBits(writer, getArmorEnchantIndex(shield.enchantment), ARMOR_ENCHANT_BITS)
    writeBits(writer, getSetIndex(shield.set), setBits())
    writeBits(writer, getQualityIndex(shield.quality ?? "no-quality"), qualityBits())
    writeBits(writer, getQualityIndex(shield.enchantmentQuality ?? "no-quality"), qualityBits())
  } else {
    writeBits(writer, 0, 1)
    const weapon = slot.data
    writeBits(writer, getWeaponTypeIndex(weapon.type), weaponTypeBits())
    writeBits(writer, getWeaponTraitIndex(weapon.trait), weaponTraitBits())
    writeBits(writer, getWeaponEnchantIndex(weapon.enchantment), WEAPON_ENCHANT_BITS)
    writeBits(writer, getPoisonIndex(weapon.poison), POISON_BITS)
    writeBits(writer, getSetIndex(weapon.set), setBits())
    writeBits(writer, getQualityIndex(weapon.quality ?? "no-quality"), qualityBits())
    writeBits(writer, getQualityIndex(weapon.enchantmentQuality ?? "no-quality"), qualityBits())
  }
}

export function decodeEquipment(reader: BitReaderState): CharacterState["equipment"] {
  const armor = recordFromKeys(armorSlots.ids, (slotId) => decodeArmorSlot(reader, slotId))
  const jewelry = recordFromKeys(jewelrySlots.ids, (slotId) => decodeJewelrySlot(reader, slotId))

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

  const weight = getArmorWeightId(readBits(reader, armorWeightBits()))
  const trait = getArmorTraitId(readBits(reader, armorTraitBits()))
  const enchantment = getArmorEnchantId(readBits(reader, ARMOR_ENCHANT_BITS))
  const set = getSetId(readBits(reader, setBits()))
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

  const trait = getJewelryTraitId(readBits(reader, jewelryTraitBits()))
  const enchantment = getJewelryEnchantId(readBits(reader, JEWELRY_ENCHANT_BITS))
  const set = getSetId(readBits(reader, setBits()))
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
    const trait = getArmorTraitId(readBits(reader, armorTraitBits()))
    const enchantment = getArmorEnchantId(readBits(reader, ARMOR_ENCHANT_BITS))
    const set = getSetId(readBits(reader, setBits()))
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

  const type = getWeaponTypeId(readBits(reader, weaponTypeBits()))
  const trait = getWeaponTraitId(readBits(reader, weaponTraitBits()))
  const enchantment = getWeaponEnchantId(readBits(reader, WEAPON_ENCHANT_BITS))
  const poison = getPoisonId(readBits(reader, POISON_BITS))
  const set = getSetId(readBits(reader, setBits()))
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
  const id = getQualityId(readBits(reader, qualityBits()))
  if (id === "no-quality") return undefined
  return id
}

function decodeEnchantmentQuality(reader: BitReaderState): EquipmentQualityId | undefined {
  const id = getQualityId(readBits(reader, qualityBits()))
  if (id === "no-quality") return undefined
  if (id === "mythic") return "legendary"
  return id
}
