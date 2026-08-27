import { describe, expect, it } from "bun:test"
import { companionBaseRoles } from "@temper/game-companions-core/companion-base-roles-data"
import {
  createEmptyCompanion,
  createEquipmentForBaseRoles,
} from "@temper/game-companions-core/companion-factory"
import { companions } from "@temper/game-companions-core/companions-data"
import { BuildHash, BuildId } from "@temper/shared-formula-framework/branded"
import { base64urlToBytes, bytesToBase64url } from "../binary-utils"
import { decodeCompanion, encodeCompanion } from "./companion-codec"
import { COMPANION_BUILD_TYPE } from "./companion-codec-v48"

describe("encodeCompanion and decodeCompanion", () => {
  it("should round-trip an empty build", () => {
    const original = createEmptyCompanion()
    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.companion.id).toBe(original.companion.id)
    expect(decoded.companion.baseRoles).toEqual([])

    expect(decoded.equipment.armor).toEqual(original.equipment.armor)
    expect(decoded.equipment.jewelry).toEqual(original.equipment.jewelry)
    expect(decoded.equipment.weapons).toEqual(original.equipment.weapons)

    expect(decoded.skills).toEqual(original.skills)

    expect(decoded.target.armor).toBe(original.target.armor)

    expect(decoded.target.targetCount).toBe(1)

    expect(decoded.id).toBe(BuildId(""))
    expect(decoded.name).toBe("")
    expect(decoded.description).toBe("")
  })

  it("should round-trip a build with full equipment", () => {
    const original = createEmptyCompanion()
    original.companion.id = "bastian"
    original.companion.baseRoles = ["dps"]
    original.equipment = createEquipmentForBaseRoles(["dps"])

    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.companion.id).toBe("bastian")
    expect(decoded.companion.baseRoles).toEqual([])
    expect(decoded.equipment.armor).toEqual(original.equipment.armor)
    expect(decoded.equipment.jewelry).toEqual(original.equipment.jewelry)
    for (const slotId of ["main-hand", "off-hand"] as const) {
      const originalSlot = original.equipment.weapons[slotId]
      const decodedSlot = decoded.equipment.weapons[slotId]
      expect(decodedSlot.itemType).toBe(originalSlot.itemType)
      if (decodedSlot.itemType === "weapon" && originalSlot.itemType === "weapon") {
        expect(decodedSlot.data.type).toBe(originalSlot.data.type)
        expect(decodedSlot.data.trait).toBe(originalSlot.data.trait)
        expect(decodedSlot.data.quality).toBe(originalSlot.data.quality)
      }
    }
  })

  it("should round-trip a build with partial equipment", () => {
    const original = createEmptyCompanion()
    original.companion.id = "mirri"
    original.companion.baseRoles = ["healer"]

    original.equipment.armor.head = {
      itemType: "armor",
      data: { type: "head", weight: "light", trait: "soothing", quality: "epic" },
    }
    original.equipment.jewelry.necklace = {
      itemType: "jewelry",
      data: { type: "necklace", trait: "quickened", quality: "superior" },
    }

    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.equipment.armor.head).toEqual(original.equipment.armor.head)
    expect(decoded.equipment.armor.shoulders).toEqual(original.equipment.armor.shoulders)
    expect(decoded.equipment.jewelry.necklace).toEqual(original.equipment.jewelry.necklace)
    expect(decoded.equipment.jewelry["ring-1"]).toEqual(original.equipment.jewelry["ring-1"])
  })
})

describe("companion section encoding", () => {
  it("should encode all companions correctly", () => {
    for (const companionId of companions.ids) {
      const original = createEmptyCompanion()
      original.companion.id = companionId

      const encoded = encodeCompanion(original)
      const decoded = decodeCompanion(encoded)

      expect(decoded?.companion.id).toBe(companionId)
    }
  })

  it("should not encode roles in hash (v7+)", () => {
    for (const role of companionBaseRoles.ids) {
      const original = createEmptyCompanion()
      original.companion.baseRoles = [role]

      const encoded = encodeCompanion(original)
      const decoded = decodeCompanion(encoded)

      expect(decoded?.companion.baseRoles).toEqual([])
    }
  })
})

describe("equipment section encoding", () => {
  it("should encode armor weights correctly", () => {
    const weights = ["no-weight", "light", "medium", "heavy"] as const
    for (const weight of weights) {
      const original = createEmptyCompanion()
      original.equipment.armor.chest = {
        itemType: "armor",
        data: { type: "chest", weight, trait: "no-trait", quality: "no-quality" },
      }

      const encoded = encodeCompanion(original)
      const decoded = decodeCompanion(encoded)

      expect(decoded?.equipment.armor.chest.itemType).toBe("armor")
      if (decoded?.equipment.armor.chest.itemType === "armor") {
        expect(decoded.equipment.armor.chest.data.weight).toBe(weight)
      }
    }
  })

  it("should encode weapon types correctly", () => {
    const weaponTypes = [
      "sword",
      "axe",
      "mace",
      "dagger",
      "greatsword",
      "bow",
      "inferno-staff",
      "restoration-staff",
      "shield",
    ] as const

    for (const weaponType of weaponTypes) {
      const original = createEmptyCompanion()
      original.equipment.weapons["main-hand"] = {
        itemType: "weapon",
        data: {
          slot: "main-hand",
          type: weaponType,
          trait: "aggressive",
          quality: "epic",
        },
      }

      const encoded = encodeCompanion(original)
      const decoded = decodeCompanion(encoded)

      expect(decoded?.equipment.weapons["main-hand"].itemType).toBe("weapon")
      if (decoded?.equipment.weapons["main-hand"].itemType === "weapon") {
        expect(decoded.equipment.weapons["main-hand"].data.type).toBe(weaponType)
      }
    }
  })
})

describe("skills section encoding", () => {
  it("should encode skills correctly", () => {
    const original = createEmptyCompanion()
    original.companion.id = "bastian"
    original.skills["skill-bar"]["active-1"] = "bastian-scorching-strike"
    original.skills["skill-bar"]["active-2"] = "bastian-fiery-flail"
    original.skills["skill-bar"]["ultimate"] = "bastian-unleashed-rage"

    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.skills["skill-bar"]["active-1"]).toBe("bastian-scorching-strike")
    expect(decoded.skills["skill-bar"]["active-2"]).toBe("bastian-fiery-flail")
    expect(decoded.skills["skill-bar"]["ultimate"]).toBe("bastian-unleashed-rage")
  })
})

describe("target section encoding", () => {
  it("should encode armor presets correctly", () => {
    const presets = ["overland", "dungeon"] as const
    for (const preset of presets) {
      const original = createEmptyCompanion()
      original.target.armor = preset

      const encoded = encodeCompanion(original)
      const decoded = decodeCompanion(encoded)

      expect(decoded?.target.armor).toBe(preset)
    }
  })

  it("should default targetCount to 1", () => {
    const original = createEmptyCompanion()
    original.target.targetCount = 4

    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded?.target.targetCount).toBe(1)
  })
})

describe("edge cases", () => {
  it("should always default targetCount to 1", () => {
    const original = createEmptyCompanion()
    original.target.targetCount = 5

    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded?.target.targetCount).toBe(1)
  })
})

describe("error handling", () => {
  it("should return null for invalid base64", () => {
    expect(decodeCompanion(BuildHash("!!!invalid!!!"))).toBeNull()
  })

  it("should return null for empty string", () => {
    expect(decodeCompanion(BuildHash(""))).toBeNull()
  })

  it("should return null for wrong build type", () => {
    const bytes = new Uint8Array([0x01, 48, 0, 0, 0, 0])
    const encoded = bytesToBase64url(bytes)
    expect(decodeCompanion(BuildHash(encoded))).toBeNull()
  })

  it("should return null for unknown version", () => {
    const bytes = new Uint8Array([COMPANION_BUILD_TYPE, 99, 0, 0, 0, 0])
    const encoded = bytesToBase64url(bytes)
    expect(decodeCompanion(BuildHash(encoded))).toBeNull()
  })

  it("should return null for truncated data", () => {
    const bytes = new Uint8Array([COMPANION_BUILD_TYPE, 48, 0])
    const encoded = bytesToBase64url(bytes)
    expect(decodeCompanion(BuildHash(encoded))).toBeNull()
  })
})

describe("compactness", () => {
  it("should produce compact codes for empty builds", () => {
    const build = createEmptyCompanion()
    const encoded = encodeCompanion(build)

    expect(encoded.length).toBeLessThanOrEqual(34)
  })

  it("should produce compact codes for full builds", () => {
    const build = createEmptyCompanion()
    build.companion.id = "bastian"
    build.companion.baseRoles = ["dps"]
    build.equipment = createEquipmentForBaseRoles(["dps"])

    const encoded = encodeCompanion(build)

    expect(encoded.length).toBeLessThanOrEqual(40)
  })

  it("should be URL-safe", () => {
    const build = createEmptyCompanion()
    build.companion.id = "mirri"
    build.equipment = createEquipmentForBaseRoles(["tank"])

    const encoded = encodeCompanion(build)

    expect(encoded).not.toContain("+")
    expect(encoded).not.toContain("/")
    expect(encoded).not.toContain("=")
  })
})

describe("build type identification", () => {
  it("should encode with correct build type byte", () => {
    const build = createEmptyCompanion()
    const encoded = encodeCompanion(build)
    const bytes = base64urlToBytes(encoded)

    expect(bytes).not.toBeNull()
    if (!bytes) return

    expect(bytes[0]).toBe(COMPANION_BUILD_TYPE)
    expect(bytes[1]).toBe(49)
  })
})

describe("multi-role encoding", () => {
  it("should not encode roles in hash (v7+)", () => {
    const original = createEmptyCompanion()
    original.companion.baseRoles = ["dps", "tank", "healer"]

    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded?.companion.baseRoles).toEqual([])
  })

  it("should round-trip empty roles", () => {
    const original = createEmptyCompanion()
    original.companion.baseRoles = []

    const encoded = encodeCompanion(original)
    const decoded = decodeCompanion(encoded)

    expect(decoded?.companion.baseRoles).toEqual([])
  })
})
