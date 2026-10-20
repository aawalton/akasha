import {
  armorEnchantBits,
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
  jewelryEnchantBits,
  jewelryTraitBits,
  POISON_BITS,
  qualityBits,
  setBits,
  weaponEnchantBits,
  weaponTraitBits,
  weaponTypeBits,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import {
  ITEM_LEVEL_BITS,
  itemLevelOfPlace,
  itemLevelPlaceOf,
} from "akasha/temper/player/character/build/build-codec/modules/item-level-places/item-level-places.module.code.ts"
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
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlot,
  WeaponSlotItem,
} from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"

const GLYPH_SUBTYPE_BITS = 9
const GLYPH_SUBTYPE_LIMIT = 1 << GLYPH_SUBTYPE_BITS
const FIRST_MINOR_WITH_GLYPH_SUBTYPE = 8
const FIRST_MINOR_WITH_ITEM_LEVEL = 12
const GLYPH_LEVEL_BITS = 6
const GLYPH_LEVEL_LIMIT = 1 << GLYPH_LEVEL_BITS
const FIRST_MINOR_WITH_GLYPH_LEVEL = 13

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
  writeBits(writer, getArmorEnchantIndex(armor.enchantment), armorEnchantBits())
  writeBits(writer, getSetIndex(armor.set), setBits())
  writeBits(writer, getQualityIndex(armor.quality ?? "no-quality"), qualityBits())
  writeBits(writer, getQualityIndex(armor.enchantmentQuality ?? "no-quality"), qualityBits())
  encodeGlyphSubtype(writer, armor.enchantmentSubtype)
  encodeItemLevel(writer, armor.level)
  encodeGlyphLevel(writer, armor.enchantmentLevel)
}

function encodeJewelrySlot(writer: BitWriterState, slot: JewelrySlotItem): undefined {
  if (slot.itemType === "empty" || (slot.data.set === "no-set" && slot.data.trait === "no-trait")) {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)
  const jewelry = slot.data
  writeBits(writer, getJewelryTraitIndex(jewelry.trait), jewelryTraitBits())
  writeBits(writer, getJewelryEnchantIndex(jewelry.enchantment), jewelryEnchantBits())
  writeBits(writer, getSetIndex(jewelry.set), setBits())
  writeBits(writer, getQualityIndex(jewelry.quality ?? "no-quality"), qualityBits())
  writeBits(writer, getQualityIndex(jewelry.enchantmentQuality ?? "no-quality"), qualityBits())
  encodeGlyphSubtype(writer, jewelry.enchantmentSubtype)
  encodeItemLevel(writer, jewelry.level)
  encodeGlyphLevel(writer, jewelry.enchantmentLevel)
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
    writeBits(writer, getArmorEnchantIndex(shield.enchantment), armorEnchantBits())
    writeBits(writer, getSetIndex(shield.set), setBits())
    writeBits(writer, getQualityIndex(shield.quality ?? "no-quality"), qualityBits())
    writeBits(writer, getQualityIndex(shield.enchantmentQuality ?? "no-quality"), qualityBits())
    encodeGlyphSubtype(writer, shield.enchantmentSubtype)
    encodeItemLevel(writer, shield.level)
    encodeGlyphLevel(writer, shield.enchantmentLevel)
  } else {
    writeBits(writer, 0, 1)
    const weapon = slot.data
    writeBits(writer, getWeaponTypeIndex(weapon.type), weaponTypeBits())
    writeBits(writer, getWeaponTraitIndex(weapon.trait), weaponTraitBits())
    writeBits(writer, getWeaponEnchantIndex(weapon.enchantment), weaponEnchantBits())
    writeBits(writer, getPoisonIndex(weapon.poison), POISON_BITS)
    writeBits(writer, getSetIndex(weapon.set), setBits())
    writeBits(writer, getQualityIndex(weapon.quality ?? "no-quality"), qualityBits())
    writeBits(writer, getQualityIndex(weapon.enchantmentQuality ?? "no-quality"), qualityBits())
    encodeGlyphSubtype(writer, weapon.enchantmentSubtype)
    encodeItemLevel(writer, weapon.level)
    encodeGlyphLevel(writer, weapon.enchantmentLevel)
  }
}

function encodeGlyphSubtype(writer: BitWriterState, subtype: number | undefined): undefined {
  const fits = subtype !== undefined && subtype > 0 && subtype < GLYPH_SUBTYPE_LIMIT
  writeBits(writer, fits ? subtype : 0, GLYPH_SUBTYPE_BITS)
}

function encodeItemLevel(writer: BitWriterState, level: ItemLevel | undefined): undefined {
  writeBits(writer, itemLevelPlaceOf(level), ITEM_LEVEL_BITS)
}

function encodeGlyphLevel(writer: BitWriterState, level: number | undefined): undefined {
  const fits = level !== undefined && level > 0 && level < GLYPH_LEVEL_LIMIT
  writeBits(writer, fits ? level : 0, GLYPH_LEVEL_BITS)
}

export function decodeEquipment(
  reader: BitReaderState,
  minorVersion: number
): CharacterState["equipment"] {
  const armor = recordFromKeys(armorSlots.ids, (slotId) =>
    decodeArmorSlot(reader, slotId, minorVersion)
  )
  const jewelry = recordFromKeys(jewelrySlots.ids, (slotId) =>
    decodeJewelrySlot(reader, slotId, minorVersion)
  )

  const primaryWeaponBar = decodeWeaponBar(reader, minorVersion)
  const backupWeaponBar = decodeWeaponBar(reader, minorVersion)

  return {
    armor,
    jewelry,
    "primary-weapon-bar": primaryWeaponBar,
    "backup-weapon-bar": backupWeaponBar,
  }
}

function decodeArmorSlot(
  reader: BitReaderState,
  slotId: ArmorSlotId,
  minorVersion: number
): ArmorSlotItem {
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
  const enchantment = getArmorEnchantId(readBits(reader, armorEnchantBits()))
  const set = getSetId(readBits(reader, setBits()))
  const quality = decodeQuality(reader)
  const enchantmentQuality = decodeEnchantmentQuality(reader)
  const enchantmentSubtype = decodeGlyphSubtype(reader, minorVersion)
  const level = decodeItemLevel(reader, minorVersion)

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
      enchantmentSubtype,
      ...level,
    },
  }
}

function decodeJewelrySlot(
  reader: BitReaderState,
  slotId: JewelrySlotId,
  minorVersion: number
): JewelrySlotItem {
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
  const enchantment = getJewelryEnchantId(readBits(reader, jewelryEnchantBits()))
  const set = getSetId(readBits(reader, setBits()))
  const quality = decodeQuality(reader)
  const enchantmentQuality = decodeEnchantmentQuality(reader)
  const enchantmentSubtype = decodeGlyphSubtype(reader, minorVersion)
  const level = decodeItemLevel(reader, minorVersion)

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
      enchantmentSubtype,
      ...level,
    },
  }
}

function decodeWeaponBar(reader: BitReaderState, minorVersion: number): WeaponSlot {
  return {
    "main-hand": decodeWeaponSlot(reader, minorVersion),
    "off-hand": decodeWeaponSlot(reader, minorVersion),
  }
}

function decodeWeaponSlot(reader: BitReaderState, minorVersion: number): WeaponSlotItem {
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
    const enchantment = getArmorEnchantId(readBits(reader, armorEnchantBits()))
    const set = getSetId(readBits(reader, setBits()))
    const quality = decodeQuality(reader)
    const enchantmentQuality = decodeEnchantmentQuality(reader)
    const enchantmentSubtype = decodeGlyphSubtype(reader, minorVersion)
    const level = decodeItemLevel(reader, minorVersion)

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
        enchantmentSubtype,
        ...level,
      },
    }
  }

  const type = getWeaponTypeId(readBits(reader, weaponTypeBits()))
  const trait = getWeaponTraitId(readBits(reader, weaponTraitBits()))
  const enchantment = getWeaponEnchantId(readBits(reader, weaponEnchantBits()))
  const poison = getPoisonId(readBits(reader, POISON_BITS))
  const set = getSetId(readBits(reader, setBits()))
  const quality = decodeQuality(reader)
  const enchantmentQuality = decodeEnchantmentQuality(reader)
  const enchantmentSubtype = decodeGlyphSubtype(reader, minorVersion)
  const level = decodeItemLevel(reader, minorVersion)

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
      enchantmentSubtype,
      ...level,
    },
  }
}

function decodeItemLevel(
  reader: BitReaderState,
  minorVersion: number
): { readonly level?: ItemLevel; readonly enchantmentLevel?: number } {
  if (minorVersion < FIRST_MINOR_WITH_ITEM_LEVEL) return {}
  const level = itemLevelOfPlace(readBits(reader, ITEM_LEVEL_BITS))
  const glyphLevel =
    minorVersion < FIRST_MINOR_WITH_GLYPH_LEVEL ? 0 : readBits(reader, GLYPH_LEVEL_BITS)
  return {
    ...(level === undefined ? {} : { level }),
    ...(glyphLevel === 0 ? {} : { enchantmentLevel: glyphLevel }),
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

function decodeGlyphSubtype(reader: BitReaderState, minorVersion: number): number | undefined {
  if (minorVersion < FIRST_MINOR_WITH_GLYPH_SUBTYPE) return undefined
  const subtype = readBits(reader, GLYPH_SUBTYPE_BITS)
  return subtype === 0 ? undefined : subtype
}
