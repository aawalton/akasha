import {
  type BitReaderState,
  makeBitReader,
  readBits,
} from "akasha/temper/build-hash/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import {
  type BitWriterState,
  bitWriterToBytes,
  makeBitWriter,
  writeBits,
} from "akasha/temper/build-hash/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import { recordFromKeys } from "akasha/temper/build-hash/record-from-keys/record-from-keys.module.code.ts"
import type { CompanionArmorSlotId } from "akasha/temper/companions-core/companion-armor-slots/companion-armor-slots.module.code.ts"
import { companionArmorSlots } from "akasha/temper/companions-core/companion-armor-slots/companion-armor-slots.module.code.ts"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
} from "akasha/temper/companions-core/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionJewelrySlotId } from "akasha/temper/companions-core/companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import { companionJewelrySlots } from "akasha/temper/companions-core/companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import { companionSkillSlots } from "akasha/temper/companions-core/companion-skill-slots/companion-skill-slots.module.code.ts"
import type {
  CompanionArmorSlotItem,
  CompanionJewelrySlotItem,
  CompanionState,
  CompanionTargetArmorId,
  CompanionTargetHealthId,
  CompanionWeaponSlotItem,
} from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import type { CompanionWeaponSlotId } from "akasha/temper/companions-core/companion-weapon-slots/companion-weapon-slots.module.code.ts"
import { companionWeaponSlots } from "akasha/temper/companions-core/companion-weapon-slots/companion-weapon-slots.module.code.ts"
import { buildId } from "../../formula-framework/branded-id/branded-id.module.code.ts"
import {
  COMPANION_ARMOR_WEIGHT_BITS,
  COMPANION_BITS,
  COMPANION_QUALITY_BITS,
  COMPANION_SKILL_BITS,
  COMPANION_TRAIT_BITS,
  COMPANION_WEAPON_TYPE_BITS,
  getCompanionArmorWeightId,
  getCompanionArmorWeightIndex,
  getCompanionId,
  getCompanionIndex,
  getCompanionQualityId,
  getCompanionQualityIndex,
  getCompanionSkillId,
  getCompanionSkillIndex,
  getCompanionTraitId,
  getCompanionTraitIndex,
  getCompanionWeaponTypeId,
  getCompanionWeaponTypeIndex,
} from "../companion-codec-indices/companion-codec-indices.module.code.ts"

const COMPANION_BUILD_TYPE = 0x02

export const ESO_VERSION_49 = 49
const CODEC_MINOR_VERSION = 8

const ROLE_BITMASK_BITS = 8

const TARGET_ARMOR_BITS = 1
const TARGET_HEALTH_BITS = 1

const ROLE_BIT_INDEX: Record<CompanionBaseRoleId, number> = {
  dps: 0,
  tank: 1,
  healer: 2,
  support: 3,
}

export function encodeV49(build: CompanionState): Uint8Array {
  const writer = makeBitWriter()

  writeBits(writer, COMPANION_BUILD_TYPE, 8)
  writeBits(writer, ESO_VERSION_49, 8)
  writeBits(writer, CODEC_MINOR_VERSION, 8)

  encodeCompanion(writer, build)

  encodeEquipment(writer, build)

  encodeSkills(writer, build)

  encodeTarget(writer, build)

  return bitWriterToBytes(writer)
}

function encodeCompanion(writer: BitWriterState, build: CompanionState): undefined {
  writeBits(writer, getCompanionIndex(build.companion.id), COMPANION_BITS)
}

function encodeEquipment(writer: BitWriterState, build: CompanionState): undefined {
  const equipment = build.equipment

  for (const slotId of companionArmorSlots.ids) {
    encodeArmorSlot(writer, equipment.armor[slotId])
  }

  for (const slotId of companionJewelrySlots.ids) {
    encodeJewelrySlot(writer, equipment.jewelry[slotId])
  }

  for (const slotId of companionWeaponSlots.ids) {
    encodeWeaponSlot(writer, equipment.weapons[slotId])
  }
}

function encodeArmorSlot(writer: BitWriterState, slot: CompanionArmorSlotItem): undefined {
  if (slot.itemType === "empty") {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)
  const armor = slot.data
  writeBits(writer, getCompanionArmorWeightIndex(armor.weight), COMPANION_ARMOR_WEIGHT_BITS)
  writeBits(writer, getCompanionTraitIndex(armor.trait), COMPANION_TRAIT_BITS)
  writeBits(writer, getCompanionQualityIndex(armor.quality), COMPANION_QUALITY_BITS)
}

function encodeJewelrySlot(writer: BitWriterState, slot: CompanionJewelrySlotItem): undefined {
  if (slot.itemType === "empty") {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)
  const jewelry = slot.data
  writeBits(writer, getCompanionTraitIndex(jewelry.trait), COMPANION_TRAIT_BITS)
  writeBits(writer, getCompanionQualityIndex(jewelry.quality), COMPANION_QUALITY_BITS)
}

function encodeWeaponSlot(writer: BitWriterState, slot: CompanionWeaponSlotItem): undefined {
  if (slot.itemType === "empty") {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)
  const weapon = slot.data
  writeBits(writer, getCompanionWeaponTypeIndex(weapon.type), COMPANION_WEAPON_TYPE_BITS)
  writeBits(writer, getCompanionTraitIndex(weapon.trait), COMPANION_TRAIT_BITS)
  writeBits(writer, getCompanionQualityIndex(weapon.quality), COMPANION_QUALITY_BITS)
}

function encodeSkills(writer: BitWriterState, build: CompanionState): undefined {
  for (const slotId of companionSkillSlots.ids) {
    const skillId = build.skills["skill-bar"][slotId]
    writeBits(writer, getCompanionSkillIndex(skillId), COMPANION_SKILL_BITS)
  }
}

function encodeTarget(writer: BitWriterState, build: CompanionState): undefined {
  writeBits(writer, build.target.armor === "dungeon" ? 1 : 0, TARGET_ARMOR_BITS)
  writeBits(writer, build.target.targetHealth === "execute" ? 1 : 0, TARGET_HEALTH_BITS)
}

export function decodeV49(data: Uint8Array): CompanionState | null {
  try {
    const reader = makeBitReader(data)

    readBits(reader, 8)
    readBits(reader, 8)
    const minorVersion = readBits(reader, 8)

    const companion = decodeCompanion(reader, minorVersion)

    const equipment = decodeEquipment(reader)

    const skills = decodeSkills(reader)

    const target = decodeTarget(reader)

    return {
      id: buildId(""),
      name: "",
      description: "",
      companion,
      equipment,
      skills,
      target,
    }
  } catch {
    return null
  }
}

function decodeCompanion(
  reader: BitReaderState,
  minorVersion: number
): CompanionState["companion"] {
  const id = getCompanionId(readBits(reader, COMPANION_BITS))

  if (minorVersion >= 7) {
    return { id, baseRoles: [] }
  }

  const bitmask = readBits(reader, ROLE_BITMASK_BITS)
  const roles: CompanionBaseRoleId[] = []

  if (minorVersion === 5) {
    if ((bitmask & (1 << 0)) !== 0) roles.push("dps")
    if ((bitmask & (1 << 1)) !== 0) roles.push("tank")
    if ((bitmask & (1 << 2)) !== 0) roles.push("healer")
    if ((bitmask & (1 << 3)) !== 0 || (bitmask & (1 << 4)) !== 0) roles.push("support")
  } else if (minorVersion < 5) {
    if ((bitmask & (1 << 0)) !== 0) roles.push("dps")
    if ((bitmask & (1 << 1)) !== 0) roles.push("tank")
    if ((bitmask & (1 << 2)) !== 0) roles.push("healer")
    if ((bitmask & (1 << 3)) !== 0) roles.push("support")
  } else {
    for (const roleId of companionBaseRoles.ids) {
      if ((bitmask & (1 << ROLE_BIT_INDEX[roleId])) !== 0) {
        roles.push(roleId)
      }
    }
  }

  return { id, baseRoles: roles }
}

function decodeEquipment(reader: BitReaderState): CompanionState["equipment"] {
  const armor = recordFromKeys(companionArmorSlots.ids, (slotId) => decodeArmorSlot(reader, slotId))
  const jewelry = recordFromKeys(companionJewelrySlots.ids, (slotId) =>
    decodeJewelrySlot(reader, slotId)
  )
  const weapons = recordFromKeys(companionWeaponSlots.ids, (slotId) =>
    decodeWeaponSlot(reader, slotId)
  )

  return { armor, jewelry, weapons }
}

function decodeArmorSlot(
  reader: BitReaderState,
  slotId: CompanionArmorSlotId
): CompanionArmorSlotItem {
  const isEmpty = readBits(reader, 1) === 1
  if (isEmpty) {
    return { itemType: "empty", data: null }
  }

  const weight = getCompanionArmorWeightId(readBits(reader, COMPANION_ARMOR_WEIGHT_BITS))
  const trait = getCompanionTraitId(readBits(reader, COMPANION_TRAIT_BITS))
  const quality = getCompanionQualityId(readBits(reader, COMPANION_QUALITY_BITS))

  return {
    itemType: "armor",
    data: {
      type: slotId,
      weight,
      trait,
      quality,
    },
  }
}

function decodeJewelrySlot(
  reader: BitReaderState,
  slotId: CompanionJewelrySlotId
): CompanionJewelrySlotItem {
  const isEmpty = readBits(reader, 1) === 1
  if (isEmpty) {
    return { itemType: "empty", data: null }
  }

  const trait = getCompanionTraitId(readBits(reader, COMPANION_TRAIT_BITS))
  const quality = getCompanionQualityId(readBits(reader, COMPANION_QUALITY_BITS))

  return {
    itemType: "jewelry",
    data: {
      type: slotId,
      trait,
      quality,
    },
  }
}

function decodeWeaponSlot(
  reader: BitReaderState,
  slotId: CompanionWeaponSlotId
): CompanionWeaponSlotItem {
  const isEmpty = readBits(reader, 1) === 1
  if (isEmpty) {
    return { itemType: "empty", data: null }
  }

  const type = getCompanionWeaponTypeId(readBits(reader, COMPANION_WEAPON_TYPE_BITS))
  const trait = getCompanionTraitId(readBits(reader, COMPANION_TRAIT_BITS))
  const quality = getCompanionQualityId(readBits(reader, COMPANION_QUALITY_BITS))

  return {
    itemType: "weapon",
    data: {
      slot: slotId,
      type,
      trait,
      quality,
    },
  }
}

function decodeSkills(reader: BitReaderState): CompanionState["skills"] {
  const skillBar = recordFromKeys(companionSkillSlots.ids, () =>
    getCompanionSkillId(readBits(reader, COMPANION_SKILL_BITS))
  )

  return { "skill-bar": skillBar }
}

function decodeTarget(reader: BitReaderState): CompanionState["target"] {
  const armorBit = readBits(reader, TARGET_ARMOR_BITS)
  const armor: CompanionTargetArmorId = armorBit === 1 ? "dungeon" : "overland"
  const healthBit = readBits(reader, TARGET_HEALTH_BITS)
  const targetHealth: CompanionTargetHealthId = healthBit === 1 ? "execute" : "full"

  return { armor, targetCount: 1, targetHealth }
}
