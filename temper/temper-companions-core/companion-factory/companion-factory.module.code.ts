import { buildId } from "@akasha/temper-formula-framework/branded-id"
import { randomFrom } from "@akasha/temper-formula-framework/random-from"
import {
  type CompanionBaseRoleId,
  getArmorWeightForBaseRoles,
} from "../companion-base-roles/companion-base-roles.module.code.ts"
import { getDefaultUltimateForCompanion } from "../companion-skills/companion-skills.module.code.ts"
import type { CompanionTraitId } from "../companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import {
  type CompanionWeaponTypeId,
  companionWeaponTypes,
  DESTRUCTION_STAFF_WEAPONS,
  ONE_HANDED_MELEE_WEAPONS,
  TWO_HANDED_MELEE_WEAPONS,
} from "../companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "../companions/companions.module.code.ts"

const ACTUAL_COMPANIONS = companions.ids.filter((id) => id !== "no-companion")

const ACTUAL_BASE_ROLES: CompanionBaseRoleId[] = ["dps", "tank", "healer"]

function getDefaultArmorTraitForBaseRoles(roles: readonly CompanionBaseRoleId[]): CompanionTraitId {
  if (roles.includes("dps")) return "aggressive"
  if (roles.includes("tank")) return "vigorous"
  if (roles.includes("healer")) return "soothing"
  return "no-trait"
}

function getDefaultWeaponsForBaseRoles(roles: readonly CompanionBaseRoleId[]): {
  mainHand: CompanionWeaponTypeId
  offHand: CompanionWeaponTypeId
} {
  if (roles.includes("tank")) {
    return { mainHand: "sword", offHand: "shield" }
  }
  if (roles.includes("healer")) {
    return { mainHand: "restoration-staff", offHand: "no-type" }
  }
  if (roles.includes("dps")) {
    const weaponStyle = randomFrom(["dual-wield", "two-handed", "bow", "destruction"])
    switch (weaponStyle) {
      case "dual-wield":
        return {
          mainHand: randomFrom(ONE_HANDED_MELEE_WEAPONS),
          offHand: randomFrom(ONE_HANDED_MELEE_WEAPONS),
        }
      case "two-handed":
        return { mainHand: randomFrom(TWO_HANDED_MELEE_WEAPONS), offHand: "no-type" }
      case "bow":
        return { mainHand: "bow", offHand: "no-type" }
      case "destruction":
        return { mainHand: randomFrom(DESTRUCTION_STAFF_WEAPONS), offHand: "no-type" }
      default:
        return { mainHand: "no-type", offHand: "no-type" }
    }
  }
  return { mainHand: "no-type", offHand: "no-type" }
}

function createEmptyEquipment(): CompanionState["equipment"] {
  return {
    armor: {
      head: { itemType: "empty", data: null },
      shoulders: { itemType: "empty", data: null },
      chest: { itemType: "empty", data: null },
      hands: { itemType: "empty", data: null },
      waist: { itemType: "empty", data: null },
      legs: { itemType: "empty", data: null },
      feet: { itemType: "empty", data: null },
    },
    jewelry: {
      necklace: { itemType: "empty", data: null },
      "ring-1": { itemType: "empty", data: null },
      "ring-2": { itemType: "empty", data: null },
    },
    weapons: {
      "main-hand": { itemType: "empty", data: null },
      "off-hand": { itemType: "empty", data: null },
    },
  }
}

export function createEquipmentForBaseRoles(
  roles: readonly CompanionBaseRoleId[]
): CompanionState["equipment"] {
  if (roles.length === 0) {
    return createEmptyEquipment()
  }

  const armorTrait = getDefaultArmorTraitForBaseRoles(roles)
  const armorWeight = getArmorWeightForBaseRoles(roles)
  const weapons = getDefaultWeaponsForBaseRoles(roles)

  return {
    armor: {
      head: {
        itemType: "armor",
        data: { type: "head", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      shoulders: {
        itemType: "armor",
        data: { type: "shoulders", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      chest: {
        itemType: "armor",
        data: { type: "chest", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      hands: {
        itemType: "armor",
        data: { type: "hands", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      waist: {
        itemType: "armor",
        data: { type: "waist", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      legs: {
        itemType: "armor",
        data: { type: "legs", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      feet: {
        itemType: "armor",
        data: { type: "feet", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
    },
    jewelry: {
      necklace: {
        itemType: "jewelry",
        data: { type: "necklace", trait: armorTrait, quality: "epic" },
      },
      "ring-1": {
        itemType: "jewelry",
        data: { type: "ring-1", trait: armorTrait, quality: "epic" },
      },
      "ring-2": {
        itemType: "jewelry",
        data: { type: "ring-2", trait: armorTrait, quality: "epic" },
      },
    },
    weapons: {
      "main-hand": {
        itemType: "weapon",
        data: { slot: "main-hand", type: weapons.mainHand, trait: armorTrait, quality: "epic" },
      },
      "off-hand": {
        itemType: "weapon",
        data: { slot: "off-hand", type: weapons.offHand, trait: armorTrait, quality: "epic" },
      },
    },
  }
}

export function equipmentMatchesBaseRoleDefaults(
  equipment: CompanionState["equipment"],
  roles: readonly CompanionBaseRoleId[]
): boolean {
  if (roles.length === 0) {
    for (const slot of Object.values(equipment.armor)) {
      if (slot.itemType !== "empty") return false
    }
    for (const slot of Object.values(equipment.jewelry)) {
      if (slot.itemType !== "empty") return false
    }
    for (const slot of Object.values(equipment.weapons)) {
      if (slot.itemType !== "empty") return false
    }
    return true
  }

  const expectedTrait = getDefaultArmorTraitForBaseRoles(roles)
  const expectedWeight = getArmorWeightForBaseRoles(roles)
  const expectedQuality = "epic"

  for (const slot of Object.values(equipment.armor)) {
    if (slot.itemType !== "armor") return false
    if (slot.data.trait !== expectedTrait) return false
    if (slot.data.weight !== expectedWeight) return false
    if (slot.data.quality !== expectedQuality) return false
  }

  for (const slot of Object.values(equipment.jewelry)) {
    if (slot.itemType !== "jewelry") return false
    if (slot.data.trait !== expectedTrait) return false
    if (slot.data.quality !== expectedQuality) return false
  }

  const mainHandSlot = equipment.weapons["main-hand"]
  const mainHandType = mainHandSlot.itemType === "weapon" ? mainHandSlot.data.type : "no-type"
  const isMainHandTwoHanded =
    mainHandType !== "no-type" && companionWeaponTypes.data[mainHandType].isTwoHanded

  if (mainHandSlot.itemType !== "weapon") return false
  if (mainHandSlot.data.trait !== expectedTrait) return false
  if (mainHandSlot.data.quality !== expectedQuality) return false

  if (!isMainHandTwoHanded) {
    const offHandSlot = equipment.weapons["off-hand"]
    if (offHandSlot.itemType !== "weapon") return false
    if (offHandSlot.data.trait !== expectedTrait) return false
    if (offHandSlot.data.quality !== expectedQuality) return false
  }

  return true
}

export const createNewCompanion = (): CompanionState => {
  const randomCompanion = randomFrom(ACTUAL_COMPANIONS)
  const randomRole = randomFrom(ACTUAL_BASE_ROLES)
  const equipment = createEquipmentForBaseRoles([randomRole])
  const defaultUltimate = getDefaultUltimateForCompanion(randomCompanion)

  return {
    id: buildId(""),
    name: "",
    description: "",

    companion: {
      id: randomCompanion,
      baseRoles: [randomRole],
    },
    equipment,
    skills: {
      "skill-bar": {
        "active-1": "no-skill",
        "active-2": "no-skill",
        "active-3": "no-skill",
        "active-4": "no-skill",
        "active-5": "no-skill",
        ultimate: defaultUltimate,
      },
    },
    target: {
      armor: "dungeon",
      targetCount: 1,
      targetHealth: "full",
    },
  }
}

export const createEmptyCompanion = (): CompanionState => ({
  id: buildId(""),
  name: "",
  description: "",
  companion: {
    id: "no-companion",
    baseRoles: [],
  },
  equipment: {
    armor: {
      head: {
        itemType: "armor",
        data: { type: "head", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      shoulders: {
        itemType: "armor",
        data: { type: "shoulders", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      chest: {
        itemType: "armor",
        data: { type: "chest", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      hands: {
        itemType: "armor",
        data: { type: "hands", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      waist: {
        itemType: "armor",
        data: { type: "waist", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      legs: {
        itemType: "armor",
        data: { type: "legs", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      feet: {
        itemType: "armor",
        data: { type: "feet", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
    },
    jewelry: {
      necklace: {
        itemType: "jewelry",
        data: { type: "necklace", trait: "no-trait", quality: "epic" },
      },
      "ring-1": {
        itemType: "jewelry",
        data: { type: "ring-1", trait: "no-trait", quality: "epic" },
      },
      "ring-2": {
        itemType: "jewelry",
        data: { type: "ring-2", trait: "no-trait", quality: "epic" },
      },
    },
    weapons: {
      "main-hand": {
        itemType: "weapon",
        data: { slot: "main-hand", type: "no-type", trait: "no-trait", quality: "epic" },
      },
      "off-hand": {
        itemType: "weapon",
        data: { slot: "off-hand", type: "no-type", trait: "no-trait", quality: "epic" },
      },
    },
  },
  skills: {
    "skill-bar": {
      "active-1": "no-skill",
      "active-2": "no-skill",
      "active-3": "no-skill",
      "active-4": "no-skill",
      "active-5": "no-skill",
      ultimate: "no-skill",
    },
  },
  target: {
    armor: "dungeon",
    targetCount: 1,
    targetHealth: "full",
  },
})
