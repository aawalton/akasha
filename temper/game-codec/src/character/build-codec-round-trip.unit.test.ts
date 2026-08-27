import { describe, expect, it } from "bun:test"
import {
  createEmptyCharacter,
  createNewCharacter,
} from "@temper/game-characters-character/build-factory"
import { BuildHash } from "@temper/shared-formula-framework/branded"
import {
  base64urlToBytes,
  bitWriterToBytes,
  bytesToBase64url,
  makeBitReader,
  makeBitWriter,
  readBits,
  writeBits,
} from "../binary-utils"
import { decodeBuild, encodeBuild } from "./build-codec"
import {
  CHAMPION_POINT_BITS,
  FOOD_OR_DRINK_BITS,
  PASSIVE_SKILL_COUNT,
  POTION_BITS,
  SKILL_BITS,
} from "./build-codec-indices"
import { encodeV51 } from "./build-codec-v51"

describe("round-trip validation", () => {
  it("should round-trip a fully populated build", () => {
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

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

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
    expect(decoded.skills).toEqual(original.skills)
    expect(decoded.championPoints).toEqual(original.championPoints)
    expect(decoded.consumables).toEqual(original.consumables)
    expect(decoded.target).toEqual(original.target)
    expect(decoded.scribing).toEqual(original.scribing)
    expect(decoded.account).toEqual(original.account)
  })

  it("should decode-round-trip a v51-encoded build (backward compatibility)", () => {
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

  it("should produce deterministic hashes for identical builds", () => {
    const buildA = createNewCharacter()
    buildA.character.class = "nightblade"
    buildA.character.race = "khajiit"
    buildA.character.attributes = { magicka: 0, health: 0, stamina: 64 }

    const buildB = createNewCharacter()
    buildB.character.class = "nightblade"
    buildB.character.race = "khajiit"
    buildB.character.attributes = { magicka: 0, health: 0, stamina: 64 }

    const hashA = encodeBuild(buildA)
    const hashB = encodeBuild(buildB)

    expect(hashA).toBe(hashB)
  })

  it("should decode minor version 4 builds with no-alliance default", () => {
    const original = createEmptyCharacter()
    original.character.class = "dragonknight"
    original.character.race = "dunmer"
    original.character.alliance = "ebonheart-pact"

    const encoded = encodeBuild(original)
    const bytes = base64urlToBytes(encoded)
    if (!bytes) return

    bytes[2] = 4

    const writer = makeBitWriter()
    const reader = makeBitReader(bytes)

    for (let i = 0; i < 31; i++) {
      writeBits(writer, readBits(reader, 1), 1)
    }
    readBits(reader, 2)
    writeBits(writer, 0, 8)

    const charRemainder = 3 + 2 + 4 + 3 * 7 + 4
    const equipmentBits = 7 + 3 + 4
    const skillsBits = 12 * SKILL_BITS
    const passivesBits = PASSIVE_SKILL_COUNT
    const cpBits = 3 * (4 * CHAMPION_POINT_BITS + 7)
    const bitsUntilPotion2 =
      charRemainder +
      equipmentBits +
      skillsBits +
      passivesBits +
      cpBits +
      FOOD_OR_DRINK_BITS +
      POTION_BITS
    for (let i = 0; i < bitsUntilPotion2; i++) {
      writeBits(writer, readBits(reader, 1), 1)
    }
    for (let i = 0; i < POTION_BITS; i++) {
      readBits(reader, 1)
    }
    while (true) {
      try {
        writeBits(writer, readBits(reader, 1), 1)
      } catch {
        break
      }
    }

    const patchedBytes = bitWriterToBytes(writer)
    const patchedEncoded = BuildHash(bytesToBase64url(patchedBytes))
    const decoded = decodeBuild(patchedEncoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.character.alliance).toBe("no-alliance")
    expect(decoded.character.roles).toEqual([])
    expect(decoded.character.class).toBe("dragonknight")
    expect(decoded.character.race).toBe("dunmer")
  })

  it("should produce URL-safe hashes under 2048 characters", () => {
    const build = createNewCharacter()
    build.character.class = "arcanist"
    build.character.race = "altmer"
    build.character.roles = ["dps", "healer", "pvp", "solo"]
    build.character.attributes = { magicka: 64, health: 0, stamina: 0 }
    build.character.mundusStone = "the-thief"
    build.character.curseState = "vampire"
    build.character.vampireStage = "stage-4"
    build.consumables.foodOrDrink = "ghastly-eye-bowl"
    build.account.esoPlus = "eso-plus-active"

    const hash = encodeBuild(build)

    expect(hash).toMatch(/^[A-Za-z0-9_-]+$/)

    const fullUrl = `https://tempereso.com/character-build/h/${hash}`
    expect(fullUrl.length).toBeLessThan(2048)
  })
})
