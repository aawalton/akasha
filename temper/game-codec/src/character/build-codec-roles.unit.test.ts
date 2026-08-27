import { describe, expect, it } from "bun:test"
import { roles } from "@temper/game-characters-character/generated/temper-character-role.generated"
import { createEmptyCharacter } from "@temper/game-characters-character/build-factory"
import { base64urlToBytes, makeBitReader, readBits } from "../binary-utils"
import { decodeBuild, encodeBuild } from "./build-codec"

describe("edge cases", () => {
  it("should handle max attribute values", () => {
    const original = createEmptyCharacter()
    original.character.attributes = { magicka: 64, health: 0, stamina: 0 }

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.character.attributes.magicka).toBe(64)
    expect(decoded.character.attributes.health).toBe(0)
    expect(decoded.character.attributes.stamina).toBe(0)
  })

  it("should handle target armor values", () => {
    const original = createEmptyCharacter()

    original.target.armor = "dungeon"
    let encoded = encodeBuild(original)
    let decoded = decodeBuild(encoded)
    expect(decoded?.target.armor).toBe("dungeon")

    original.target.armor = "overland"
    encoded = encodeBuild(original)
    decoded = decodeBuild(encoded)
    expect(decoded?.target.armor).toBe("overland")
  })

  it("should handle empty scribing array", () => {
    const original = createEmptyCharacter()
    original.scribing = []

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.scribing).toEqual([])
  })
})

describe("role encoding", () => {
  it("should not encode roles in hash (v6+)", () => {
    for (const roleId of roles.ids) {
      const original = createEmptyCharacter()
      original.character.roles = roleId === "no-role" ? [] : [roleId]

      const encoded = encodeBuild(original)
      const decoded = decodeBuild(encoded)

      expect(decoded?.character.roles).toEqual([])
    }
  })

  it("should not include role bitmask in v6+ encoding", () => {
    const build = createEmptyCharacter()
    build.character.roles = ["dps", "healer"]

    const encoded = encodeBuild(build)
    const bytes = base64urlToBytes(encoded)
    if (!bytes) return

    const reader = makeBitReader(bytes)
    readBits(reader, 8)
    readBits(reader, 8)
    readBits(reader, 8)
    readBits(reader, 3)
    readBits(reader, 4)
    readBits(reader, 2)
    const vampireStage = readBits(reader, 3)
    expect(vampireStage).toBe(0)
  })

  it("should decode roles as empty from v6+ hash", () => {
    const original = createEmptyCharacter()
    original.character.roles = ["dps", "healer"]

    const encoded = encodeBuild(original)
    const decoded = decodeBuild(encoded)

    expect(decoded).not.toBeNull()
    if (!decoded) return

    expect(decoded.character.roles).toEqual([])
  })
})
