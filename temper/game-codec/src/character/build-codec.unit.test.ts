import { describe, expect, it } from "bun:test"
import {
  createEmptyCharacter,
  createNewCharacter,
} from "@temper/game-characters-character/build-factory"
import { BuildHash, BuildId } from "@temper/shared-formula-framework/branded"
import { base64urlToBytes, bytesToBase64url } from "../binary-utils"
import { decodeBuild, encodeBuild } from "./build-codec"
import { encodeV51 } from "./build-codec-v51"
import { decodeV52, ESO_VERSION_52 } from "./build-codec-v52"

describe("encodeBuild and decodeBuild", () => {
  it("should round-trip an empty build", () => {
    const original = createEmptyCharacter()
    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.character.class).toBe(original.character.class)
    expect(decoded.character.race).toBe(original.character.race)
    expect(decoded.character.alliance).toBe(original.character.alliance)
    expect(decoded.character.roles).toEqual([])
    expect(decoded.character.vampireStage).toBe(original.character.vampireStage)
    expect(decoded.character.curseState).toBe(original.character.curseState)
    expect(decoded.character.mundusStone).toBe(original.character.mundusStone)
    expect(decoded.character.attributes).toEqual(original.character.attributes)
    expect(decoded.character.skillLineIds).toEqual(original.character.skillLineIds)

    expect(decoded.equipment.armor).toEqual(original.equipment.armor)
    expect(decoded.equipment.jewelry).toEqual(original.equipment.jewelry)
    expect(decoded.equipment["primary-weapon-bar"]).toEqual(
      original.equipment["primary-weapon-bar"]
    )
    expect(decoded.equipment["backup-weapon-bar"]).toEqual(original.equipment["backup-weapon-bar"])

    expect(decoded.skills).toEqual(original.skills)

    expect(decoded.championPoints).toEqual(original.championPoints)

    expect(decoded.consumables).toEqual(original.consumables)

    expect(decoded.target).toEqual(original.target)

    expect(decoded.scribing).toEqual(original.scribing)

    expect(decoded.id).toBe(BuildId(""))
    expect(decoded.name).toBe("")
    expect(decoded.description).toBe("")
    expect(decoded.character.name).toBe("")
  })

  it("should round-trip a new build with defaults", () => {
    const original = createNewCharacter()
    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.character.class).toBe(original.character.class)
    expect(decoded.character.race).toBe(original.character.race)
    expect(decoded.character.alliance).toBe(original.character.alliance)
    expect(decoded.character.mundusStone).toBe(original.character.mundusStone)
    expect(decoded.consumables.foodOrDrink).toBe(original.consumables.foodOrDrink)
    expect(decoded.consumables.potion).toBe(original.consumables.potion)
  })

  it("should round-trip a build with equipped items", () => {
    const original = createEmptyCharacter()

    original.equipment.armor.head = {
      itemType: "armor",
      data: {
        type: "head",
        weight: "heavy",
        trait: "divines",
        enchantment: "health",
        set: "no-set",
      },
    }

    original.equipment.jewelry.necklace = {
      itemType: "jewelry",
      data: {
        type: "necklace",
        trait: "bloodthirsty",
        enchantment: "increase-magical-harm",
        set: "no-set",
      },
    }

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.equipment.armor.head).toEqual(original.equipment.armor.head)
    expect(decoded.equipment.jewelry.necklace).toEqual(original.equipment.jewelry.necklace)
  })

  it("should round-trip a build with weapons", () => {
    const original = createEmptyCharacter()

    original.equipment["primary-weapon-bar"]["main-hand"] = {
      itemType: "weapon",
      data: {
        type: "inferno-staff",
        trait: "precise",
        enchantment: "weapon-damage",
        poison: "no-poison",
        set: "no-set",
      },
    }

    original.equipment["backup-weapon-bar"]["off-hand"] = {
      itemType: "shield",
      data: {
        type: "shield",
        weight: "shield",
        trait: "sturdy",
        enchantment: "health",
        set: "no-set",
      },
    }

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.equipment["primary-weapon-bar"]["main-hand"]).toEqual(
      original.equipment["primary-weapon-bar"]["main-hand"]
    )
    expect(decoded.equipment["backup-weapon-bar"]["off-hand"]).toEqual(
      original.equipment["backup-weapon-bar"]["off-hand"]
    )
  })

  it("should round-trip a build with skills", () => {
    const original = createEmptyCharacter()

    original.skills["primary-skill-bar"]["active-1"] = "molten-whip-20805"
    original.skills["primary-skill-bar"]["ultimate"] = "shifting-standard-32958"

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.skills["primary-skill-bar"]["active-1"]).toBe(
      original.skills["primary-skill-bar"]["active-1"]
    )
    expect(decoded.skills["primary-skill-bar"]["ultimate"]).toBe(
      original.skills["primary-skill-bar"]["ultimate"]
    )
  })

  it("should round-trip a build with attributes", () => {
    const original = createEmptyCharacter()
    original.character.attributes = { magicka: 30, health: 10, stamina: 24 }

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.character.attributes.magicka).toBe(30)
    expect(decoded.character.attributes.health).toBe(10)
    expect(decoded.character.attributes.stamina).toBe(24)
  })

  it("should produce compact codes", () => {
    const build = createNewCharacter()
    const encoded = encodeBuild(build)

    expect(encoded.length).toBeLessThan(500)
  })

  it("should encode with type byte header matching companion format", () => {
    const build = createEmptyCharacter()
    const encoded = encodeBuild(build)
    const bytes = base64urlToBytes(encoded)

    expect(bytes).not.toBeNull()
    if (!bytes) return

    expect(bytes[0]).toBe(0x01)
    expect(bytes[1]).toBe(52)
    expect(bytes[2]).toBe(7)
  })
})

describe("v52 active encoder", () => {
  function buildFullyPopulatedCharacter() {
    const original = createEmptyCharacter()

    original.character.class = "dragonknight"
    original.character.race = "dunmer"
    original.character.alliance = "ebonheart-pact"
    original.character.roles = ["dps", "solo"]
    original.character.attributes = { magicka: 40, health: 10, stamina: 14 }
    original.character.mundusStone = "the-shadow"
    original.character.curseState = "vampire"
    original.character.vampireStage = "stage-4"
    original.character.skillLineIds = [
      "dragonknight-ardent-flame",
      "dragonknight-draconic-power",
      "dragonknight-earthen-heart",
    ]

    const armorSlots = ["head", "shoulders", "chest", "hands", "waist", "legs", "feet"] as const
    for (const slot of armorSlots) {
      original.equipment.armor[slot] = {
        itemType: "armor",
        data: {
          type: slot,
          weight: "light",
          trait: "divines",
          enchantment: "magicka",
          set: "no-set",
        },
      }
    }

    original.equipment.jewelry.necklace = {
      itemType: "jewelry",
      data: {
        type: "necklace",
        trait: "bloodthirsty",
        enchantment: "increase-magical-harm",
        set: "no-set",
      },
    }

    original.equipment["primary-weapon-bar"]["main-hand"] = {
      itemType: "weapon",
      data: {
        type: "inferno-staff",
        trait: "precise",
        enchantment: "weapon-damage",
        poison: "no-poison",
        set: "no-set",
      },
    }
    original.equipment["backup-weapon-bar"]["main-hand"] = {
      itemType: "weapon",
      data: {
        type: "lightning-staff",
        trait: "infused",
        enchantment: "absorb-magicka",
        poison: "no-poison",
        set: "no-set",
      },
    }

    original.skills["primary-skill-bar"]["active-1"] = "molten-whip-20805"
    original.skills["primary-skill-bar"]["ultimate"] = "shifting-standard-32958"

    original.championPoints.warfare.slotted = [
      "fighting-finesse",
      "deadly-aim",
      "master-at-arms",
      "thaumaturge",
    ]
    original.championPoints.fitness.slotted = [
      "boundless-vitality",
      "fortified",
      "rejuvenation",
      "no-fitness-star",
    ]

    original.consumables.foodOrDrink = "ghastly-eye-bowl"

    original.target.armor = "dungeon"
    original.target.health = 1

    original.account.esoPlus = "eso-plus-active"

    return original
  }

  it("should round-trip a fully populated build under the v52 encoder", () => {
    const original = buildFullyPopulatedCharacter()

    const encoded = encodeBuild(original)
    const bytes = base64urlToBytes(encoded)
    expect(bytes).not.toBeNull()
    if (!bytes) return
    expect(bytes[1]).toBe(ESO_VERSION_52)
    expect(bytes[1]).toBe(52)

    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    const decodedDirect = decodeV52(bytes)
    expect(decodedDirect).toEqual(decoded)

    expect(decoded.character.class).toBe(original.character.class)
    expect(decoded.character.race).toBe(original.character.race)
    expect(decoded.character.alliance).toBe(original.character.alliance)
    expect(decoded.character.roles).toEqual([])
    expect(decoded.character.attributes).toEqual(original.character.attributes)
    expect(decoded.character.mundusStone).toBe(original.character.mundusStone)
    expect(decoded.character.curseState).toBe(original.character.curseState)
    expect(decoded.character.vampireStage).toBe(original.character.vampireStage)
    expect(decoded.character.skillLineIds).toEqual(original.character.skillLineIds)
    expect(decoded.equipment).toEqual(original.equipment)
    expect(decoded.skills).toEqual(original.skills)
    expect(decoded.championPoints).toEqual(original.championPoints)
    expect(decoded.consumables).toEqual(original.consumables)
    expect(decoded.target).toEqual(original.target)
    expect(decoded.scribing).toEqual(original.scribing)
    expect(decoded.account).toEqual(original.account)
  })

  it("should decode-round-trip a v51-encoded build (backward compatibility)", () => {
    const original = buildFullyPopulatedCharacter()

    const v51Bytes = encodeV51(original)
    expect(v51Bytes[1]).toBe(51)

    const decoded = decodeBuild(BuildHash(bytesToBase64url(v51Bytes)))
    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.character.class).toBe(original.character.class)
    expect(decoded.character.race).toBe(original.character.race)
    expect(decoded.character.alliance).toBe(original.character.alliance)
    expect(decoded.character.roles).toEqual([])
    expect(decoded.character.attributes).toEqual(original.character.attributes)
    expect(decoded.character.mundusStone).toBe(original.character.mundusStone)
    expect(decoded.character.curseState).toBe(original.character.curseState)
    expect(decoded.character.vampireStage).toBe(original.character.vampireStage)
    expect(decoded.character.skillLineIds).toEqual(original.character.skillLineIds)
    expect(decoded.equipment).toEqual(original.equipment)
    expect(decoded.championPoints).toEqual(original.championPoints)
    expect(decoded.consumables).toEqual(original.consumables)
    expect(decoded.target).toEqual(original.target)
    expect(decoded.scribing).toEqual(original.scribing)
    expect(decoded.account).toEqual(original.account)
  })
})
