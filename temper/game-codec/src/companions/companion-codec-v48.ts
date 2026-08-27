import {
  type CompanionBaseRoleId,
  companionBaseRoles,
} from "@temper/game-companions-core/companion-base-roles-data"
import type {
  CompanionArmorSlotItem,
  CompanionJewelrySlotItem,
  CompanionState,
  CompanionTargetArmorId,
  CompanionTargetHealthId,
  CompanionWeaponSlotItem,
} from "@temper/game-companions-core/companion-types"
import type { CompanionArmorSlotId } from "@temper/game-companions-core/equipment/companion-armor-slots-data"
import { companionArmorSlots } from "@temper/game-companions-core/equipment/companion-armor-slots-data"
import type { CompanionJewelrySlotId } from "@temper/game-companions-core/equipment/companion-jewelry-slots-data"
import { companionJewelrySlots } from "@temper/game-companions-core/generated/temper-companion-jewelry-slot.generated"
import type { CompanionWeaponSlotId } from "@temper/game-companions-core/equipment/companion-weapon-slots-data"
import { companionWeaponSlots } from "@temper/game-companions-core/equipment/companion-weapon-slots-data"
import { companionSkillSlots } from "@temper/game-companions-core/skills/companion-skill-slots-data"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { type BitReaderState, makeBitReader, readBits } from "../binary-utils"
import { recordFromKeys } from "../record-from-keys"
import {
  COMPANION_ARMOR_WEIGHT_BITS,
  COMPANION_BITS,
  COMPANION_QUALITY_BITS,
  COMPANION_SKILL_BITS,
  COMPANION_TRAIT_BITS,
  COMPANION_WEAPON_TYPE_BITS,
  getCompanionArmorWeightId,
  getCompanionId,
  getCompanionQualityId,
  getCompanionSkillId,
  getCompanionTraitId,
  getCompanionWeaponTypeId,
} from "./companion-codec-indices"

export const COMPANION_BUILD_TYPE = 0x02

export const ESO_VERSION_48 = 48

const ROLE_BITMASK_BITS = 8

const TARGET_ARMOR_BITS = 1
const TARGET_HEALTH_BITS = 1

const ROLE_BIT_INDEX: Record<CompanionBaseRoleId, number> = {
  dps: 0,
  tank: 1,
  healer: 2,
  support: 3,
}

export function decodeV48(data: Uint8Array): CompanionState | null {
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
      id: BuildId(""),
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
