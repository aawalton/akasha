import { expect, test } from "bun:test"
import { base64urlToBytes } from "akasha/temper/build-hash/modules/build-hash-base64url/build-hash-base64url.module.code.ts"
import { stampedWith } from "akasha/temper/build-hash/modules/build-hash-test-utils/build-hash-test-utils.module.code.ts"
import {
  getCompanionArmorWeightId,
  getCompanionId,
  getCompanionQualityId,
  getCompanionSkillId,
  getCompanionTraitId,
  getCompanionWeaponTypeId,
} from "akasha/temper/companion-codec/companion-codec-indices/companion-codec-indices.module.code.ts"
import {
  ESO_VERSION_49,
  encodeV49,
} from "akasha/temper/companion-codec/companion-codec-v49/companion-codec-v49.module.code.ts"
import {
  decodeCompanion,
  ESO_VERSION_48,
  encodeCompanion,
} from "akasha/temper/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import type { CompanionJewelrySlotId } from "akasha/temper/companions-core/companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import type {
  CompanionArmorSlotItem,
  CompanionJewelrySlotItem,
  CompanionState,
  CompanionWeaponSlotItem,
} from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import type { CompanionWeaponSlotId } from "akasha/temper/companions-core/companion-weapon-slots/companion-weapon-slots.module.code.ts"
import type { CompanionArmorSlotId } from "akasha/temper/companions-core/modules/companion-armor-slots/companion-armor-slots.module.code.ts"
import {
  buildHash,
  buildId,
} from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"

const COMPANION_BUILD_TYPE = 2

const CODEC_MINOR_VERSION = 8

function armorPiece(type: CompanionArmorSlotId, seed: number): CompanionArmorSlotItem {
  return {
    itemType: "armor",
    data: {
      type,
      weight: getCompanionArmorWeightId(1 + (seed % 3)),
      trait: getCompanionTraitId(1 + (seed % 7)),
      quality: getCompanionQualityId(1 + (seed % 5)),
    },
  }
}

function jewelryPiece(type: CompanionJewelrySlotId, seed: number): CompanionJewelrySlotItem {
  return {
    itemType: "jewelry",
    data: {
      type,
      trait: getCompanionTraitId(2 + (seed % 6)),
      quality: getCompanionQualityId(2 + (seed % 4)),
    },
  }
}

function weaponPiece(slot: CompanionWeaponSlotId, seed: number): CompanionWeaponSlotItem {
  return {
    itemType: "weapon",
    data: {
      slot,
      type: getCompanionWeaponTypeId(1 + seed * 3),
      trait: getCompanionTraitId(3 + (seed % 5)),
      quality: getCompanionQualityId(4),
    },
  }
}

function representativeCompanion(): CompanionState {
  return {
    id: buildId(""),
    name: "",
    description: "",
    companion: { id: getCompanionId(3), baseRoles: [] },
    equipment: {
      armor: {
        head: armorPiece("head", 0),
        shoulders: armorPiece("shoulders", 1),
        chest: { itemType: "empty", data: null },
        hands: armorPiece("hands", 3),
        waist: armorPiece("waist", 4),
        legs: armorPiece("legs", 5),
        feet: armorPiece("feet", 6),
      },
      jewelry: {
        necklace: jewelryPiece("necklace", 0),
        "ring-1": jewelryPiece("ring-1", 1),
        "ring-2": { itemType: "empty", data: null },
      },
      weapons: {
        "main-hand": weaponPiece("main-hand", 0),
        "off-hand": weaponPiece("off-hand", 1),
      },
    },
    skills: {
      "skill-bar": {
        "active-1": getCompanionSkillId(5),
        "active-2": getCompanionSkillId(14),
        "active-3": getCompanionSkillId(23),
        "active-4": getCompanionSkillId(32),
        "active-5": getCompanionSkillId(41),
        ultimate: getCompanionSkillId(50),
      },
    },
    target: { armor: "dungeon", targetCount: 1, targetHealth: "execute" },
  }
}

test("a companion carrying equipment and skills survives update forty-nine", () => {
  const build = representativeCompanion()
  expect(decodeCompanion(encodeCompanion(build))).toEqual(build)
})

test("a companion hash read back and written again is the hash it was", () => {
  const hash = encodeCompanion(representativeCompanion())
  const build = decodeCompanion(hash)
  expect(build).not.toBeNull()
  expect(encodeCompanion(build as CompanionState)).toBe(hash)
})

test("the companion writer stamps update forty-nine", () => {
  const bytes = encodeV49(representativeCompanion())
  expect(bytes[0]).toBe(COMPANION_BUILD_TYPE)
  expect(bytes[1]).toBe(ESO_VERSION_49)
  expect(bytes[2]).toBe(CODEC_MINOR_VERSION)
  expect(ESO_VERSION_49).toBe(49)
})

test("update forty-eight reads back a companion laid out as the add-on lays one out", () => {
  const build = representativeCompanion()
  const stamped = stampedWith(encodeV49(build), ESO_VERSION_48)
  expect(base64urlToBytes(stamped)?.[0]).toBe(COMPANION_BUILD_TYPE)
  expect(base64urlToBytes(stamped)?.[1]).toBe(ESO_VERSION_48)
  expect(ESO_VERSION_48).toBe(48)
  expect(decodeCompanion(buildHash(stamped))).toEqual(build)
})
