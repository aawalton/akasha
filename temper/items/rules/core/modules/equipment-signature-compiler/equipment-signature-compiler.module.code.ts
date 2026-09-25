import { companionArmorSlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-slots/companion-armor-slots.module.code.ts"
import {
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT,
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT,
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-eso-trait-map/companion-eso-trait-map.module.code.ts"
import { companionJewelrySlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { companionWeaponTypes } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions as companionsData } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import {
  ESO_COMPANION_EQUIPMENT_CONSTANT_PAGES,
  equipTypeNumber,
} from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/modules/eso-companion-equipment-constant-pages/eso-companion-equipment-constant-pages.module.code.ts"
import { armorSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import { resolveQuality } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { jewelrySlots } from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-slots/jewelry-slots.module.code.ts"
import {
  PLAYER_ARMOR_TRAIT_TO_ESO,
  PLAYER_JEWELRY_TRAIT_TO_ESO,
  PLAYER_WEAPON_TRAIT_TO_ESO,
} from "akasha/temper/catalog/gear/equipment/modules/eso-trait-map/eso-trait-map.module.code.ts"
import { ESO_PLAYER_EQUIPMENT_CONSTANT_PAGES } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/modules/eso-player-equipment-constant-pages/eso-player-equipment-constant-pages.module.code.ts"
import type { TemperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.page-type.types.ts"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { weaponTypes } from "akasha/temper/player/character/characters-equipment/modules/weapon-types-data/weapon-types-data.module.code.ts"

function esoNumsIn(
  family: TemperEsoPlayerEquipmentConstant["constantFamily"]
): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of ESO_PLAYER_EQUIPMENT_CONSTANT_PAGES) {
    if (one.constantFamily === family) found.set(one.constantId, one.esoNum)
  }
  return found
}

const PLAYER_WEAPON_TYPE_TO_ESO = esoNumsIn("weapon-type")

const PLAYER_ARMOR_TYPE_TO_ESO = esoNumsIn("armor-type")

const PLAYER_QUALITY_TO_ESO = esoNumsIn("quality")

const ESO_EQUIP_TYPES = {
  EQUIP_TYPE_ONE_HAND: equipTypeNumber("EQUIP_TYPE_ONE_HAND"),
  EQUIP_TYPE_TWO_HAND: equipTypeNumber("EQUIP_TYPE_TWO_HAND"),
  EQUIP_TYPE_OFF_HAND: equipTypeNumber("EQUIP_TYPE_OFF_HAND"),
}

const COMPANION_QUALITY_TO_ESO: Record<string, number> = {}
for (const one of ESO_COMPANION_EQUIPMENT_CONSTANT_PAGES) {
  if (one.kind === "quality-companion-to-eso" && one.valueNum !== undefined) {
    COMPANION_QUALITY_TO_ESO[one.keyText] = one.valueNum
  }
}

const PLAYER_ARMOR_SLOT_TO_EQUIP_TYPE: Record<string, number> = {
  head: equipTypeNumber("EQUIP_TYPE_HEAD"),
  shoulders: equipTypeNumber("EQUIP_TYPE_SHOULDERS"),
  chest: equipTypeNumber("EQUIP_TYPE_CHEST"),
  hands: equipTypeNumber("EQUIP_TYPE_HAND"),
  waist: equipTypeNumber("EQUIP_TYPE_WAIST"),
  legs: equipTypeNumber("EQUIP_TYPE_LEGS"),
  feet: equipTypeNumber("EQUIP_TYPE_FEET"),
}

const PLAYER_JEWELRY_SLOT_TO_EQUIP_TYPE: Record<string, number> = {
  necklace: equipTypeNumber("EQUIP_TYPE_NECK"),
  "ring-1": equipTypeNumber("EQUIP_TYPE_RING"),
  "ring-2": equipTypeNumber("EQUIP_TYPE_RING"),
}

const COMPANION_WEAPON_TRAIT_TO_ESO: Record<string, number> = {}
for (const [esoType, traitId] of Object.entries(ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT)) {
  COMPANION_WEAPON_TRAIT_TO_ESO[traitId] = Number(esoType)
}

const COMPANION_ARMOR_TRAIT_TO_ESO: Record<string, number> = {}
for (const [esoType, traitId] of Object.entries(ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT)) {
  COMPANION_ARMOR_TRAIT_TO_ESO[traitId] = Number(esoType)
}

const COMPANION_JEWELRY_TRAIT_TO_ESO: Record<string, number> = {}
for (const [esoType, traitId] of Object.entries(ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT)) {
  COMPANION_JEWELRY_TRAIT_TO_ESO[traitId] = Number(esoType)
}

export function compileWantedEquipmentForBuild(
  decoded: CharacterState,
  esoCharId: string
): readonly WantedEquipmentSignature[] {
  const signatures: WantedEquipmentSignature[] = []

  for (const slotId of armorSlots.ids) {
    const slot = decoded.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    const traitType = PLAYER_ARMOR_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null || traitType === 0) continue
    const equipType = PLAYER_ARMOR_SLOT_TO_EQUIP_TYPE[slotId]
    if (equipType == null) continue

    const quality = PLAYER_QUALITY_TO_ESO.get(resolveQuality(slot.data.quality)) ?? 5
    const armorType = PLAYER_ARMOR_TYPE_TO_ESO.get(slot.data.weight)
    const sig: WantedEquipmentSignature = { esoCharId, equipType, traitType, quality }
    if (armorType != null && armorType !== 0) sig.armorType = armorType
    signatures.push(sig)
  }

  for (const slotId of jewelrySlots.ids) {
    const slot = decoded.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    const traitType = PLAYER_JEWELRY_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null || traitType === 0) continue
    const equipType = PLAYER_JEWELRY_SLOT_TO_EQUIP_TYPE[slotId]
    if (equipType == null) continue

    const quality = PLAYER_QUALITY_TO_ESO.get(resolveQuality(slot.data.quality)) ?? 5
    signatures.push({ esoCharId, equipType, traitType, quality })
  }

  for (const barId of ["primary-weapon-bar", "backup-weapon-bar"] as const) {
    const bar = decoded.equipment[barId]

    const mainHand = bar["main-hand"]
    if (mainHand.itemType === "weapon" && mainHand.data.type !== "no-type") {
      const traitType = PLAYER_WEAPON_TRAIT_TO_ESO[mainHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const weaponTypeData = weaponTypes.data[mainHand.data.type]
        const isTwoHanded = weaponTypeData?.isTwoHanded ?? false
        const equipType = isTwoHanded
          ? ESO_EQUIP_TYPES.EQUIP_TYPE_TWO_HAND
          : ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
        const quality = PLAYER_QUALITY_TO_ESO.get(resolveQuality(mainHand.data.quality)) ?? 5
        const weaponType = PLAYER_WEAPON_TYPE_TO_ESO.get(mainHand.data.type)
        const sig: WantedEquipmentSignature = { esoCharId, equipType, traitType, quality }
        if (weaponType != null) sig.weaponType = weaponType
        signatures.push(sig)
      }
    } else if (mainHand.itemType === "shield") {
      const traitType = PLAYER_ARMOR_TRAIT_TO_ESO[mainHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const quality = PLAYER_QUALITY_TO_ESO.get(resolveQuality(mainHand.data.quality)) ?? 5
        signatures.push({
          esoCharId,
          equipType: ESO_EQUIP_TYPES.EQUIP_TYPE_OFF_HAND,
          traitType,
          quality,
        })
      }
    }

    const offHand = bar["off-hand"]
    if (offHand.itemType === "weapon" && offHand.data.type !== "no-type") {
      const traitType = PLAYER_WEAPON_TRAIT_TO_ESO[offHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const weaponTypeData = weaponTypes.data[offHand.data.type]
        const isTwoHanded = weaponTypeData?.isTwoHanded ?? false
        const equipType = isTwoHanded
          ? ESO_EQUIP_TYPES.EQUIP_TYPE_TWO_HAND
          : ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
        const quality = PLAYER_QUALITY_TO_ESO.get(resolveQuality(offHand.data.quality)) ?? 5
        const weaponType = PLAYER_WEAPON_TYPE_TO_ESO.get(offHand.data.type)
        const sig: WantedEquipmentSignature = { esoCharId, equipType, traitType, quality }
        if (weaponType != null) sig.weaponType = weaponType
        signatures.push(sig)
      }
    } else if (offHand.itemType === "shield") {
      const traitType = PLAYER_ARMOR_TRAIT_TO_ESO[offHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const quality = PLAYER_QUALITY_TO_ESO.get(resolveQuality(offHand.data.quality)) ?? 5
        signatures.push({
          esoCharId,
          equipType: ESO_EQUIP_TYPES.EQUIP_TYPE_OFF_HAND,
          traitType,
          quality,
        })
      }
    }
  }

  return signatures
}

export function compileWantedCompanionEquipmentForBuild(
  decoded: CompanionState,
  companionId: string
): readonly WantedCompanionEquipmentSignature[] {
  const signatures: WantedCompanionEquipmentSignature[] = []

  const companionName = companionsData.has(companionId)
    ? companionsData.data[companionId].name
    : companionId

  for (const slotId of companionArmorSlots.ids) {
    const slot = decoded.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    if (slot.data.trait === "no-trait") continue
    const traitType = COMPANION_ARMOR_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null) continue
    const equipType = companionArmorSlots.data[slotId].equipType
    if (equipType == null) continue

    const quality = COMPANION_QUALITY_TO_ESO[slot.data.quality] ?? 5
    const armorType = PLAYER_ARMOR_TYPE_TO_ESO.get(slot.data.weight)
    const sig: WantedCompanionEquipmentSignature = {
      companionName,
      equipType,
      traitType,
      quality,
    }
    if (armorType != null && armorType !== 0) sig.armorType = armorType
    signatures.push(sig)
  }

  for (const slotId of companionJewelrySlots.ids) {
    const slot = decoded.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    if (slot.data.trait === "no-trait") continue
    const traitType = COMPANION_JEWELRY_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null) continue
    const equipType = companionJewelrySlots.data[slotId].equipType
    if (equipType == null) continue

    const quality = COMPANION_QUALITY_TO_ESO[slot.data.quality] ?? 5
    signatures.push({ companionName, equipType, traitType, quality })
  }

  const mainHand = decoded.equipment.weapons["main-hand"]
  if (mainHand.itemType === "weapon" && mainHand.data.type !== "no-type") {
    if (mainHand.data.trait !== "no-trait" && mainHand.data.type !== "shield") {
      const traitType = COMPANION_WEAPON_TRAIT_TO_ESO[mainHand.data.trait]
      if (traitType != null) {
        const isTwoHanded = companionWeaponTypes.data[mainHand.data.type]?.isTwoHanded ?? false
        const equipType = isTwoHanded
          ? ESO_EQUIP_TYPES.EQUIP_TYPE_TWO_HAND
          : ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
        const quality = COMPANION_QUALITY_TO_ESO[mainHand.data.quality] ?? 5
        const weaponType = PLAYER_WEAPON_TYPE_TO_ESO.get(mainHand.data.type)
        const sig: WantedCompanionEquipmentSignature = {
          companionName,
          equipType,
          traitType,
          quality,
        }
        if (weaponType != null) sig.weaponType = weaponType
        signatures.push(sig)
      }
    }

    const isTwoHanded = companionWeaponTypes.data[mainHand.data.type]?.isTwoHanded ?? false
    if (!isTwoHanded) {
      const offHand = decoded.equipment.weapons["off-hand"]
      if (
        offHand.itemType === "weapon" &&
        offHand.data.type !== "no-type" &&
        offHand.data.trait !== "no-trait"
      ) {
        if (offHand.data.type === "shield") {
          const traitType = COMPANION_ARMOR_TRAIT_TO_ESO[offHand.data.trait]
          if (traitType != null) {
            const quality = COMPANION_QUALITY_TO_ESO[offHand.data.quality] ?? 5
            signatures.push({
              companionName,
              equipType: ESO_EQUIP_TYPES.EQUIP_TYPE_OFF_HAND,
              traitType,
              quality,
            })
          }
        } else {
          const traitType = COMPANION_WEAPON_TRAIT_TO_ESO[offHand.data.trait]
          if (traitType != null) {
            const equipType = ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
            const quality = COMPANION_QUALITY_TO_ESO[offHand.data.quality] ?? 5
            const weaponType = PLAYER_WEAPON_TYPE_TO_ESO.get(offHand.data.type)
            const sig: WantedCompanionEquipmentSignature = {
              companionName,
              equipType,
              traitType,
              quality,
            }
            if (weaponType != null) sig.weaponType = weaponType
            signatures.push(sig)
          }
        }
      }
    }
  }

  return signatures
}
