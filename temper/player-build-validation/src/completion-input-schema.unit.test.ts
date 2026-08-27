import { describe, expect, it } from "bun:test"
import {
  accountCompletionInputSchema,
  characterCompletionInputSchema,
  companionCompletionInputSchema,
} from "./completion-input-schema"

describe("characterCompletionInputSchema", () => {
  it("parses a well-formed character entry (identity siblings + scalars + nested)", () => {
    const out = characterCompletionInputSchema.parse({
      name: "Sven",
      priorityOrder: 2,
      buildHash: "abc123",
      level: 50,
      classId: 3,
      quests: [1, 2, 3],
      skillLineProgress: { 1: { currentRank: 5 } },
      loreLibrary: { 1: { 0: [1, 2] } },
    })
    expect(out.name).toBe("Sven")
    expect(out.buildHash).toBe("abc123")
    expect(out.level).toBe(50)
    expect(out.quests).toEqual([1, 2, 3])
  })

  it("nulls a type-wrong known field instead of throwing (tolerant)", () => {
    const out = characterCompletionInputSchema.parse({
      name: "Sven",
      level: "fifty",
      buildHash: 12345,
    })
    expect(out.name).toBe("Sven")
    expect(out.level).toBeUndefined()
    expect(out.buildHash).toBeUndefined()
  })

  it("passes legacy/unknown keys through (loose, ingest-preserving)", () => {
    const out = characterCompletionInputSchema.parse({
      name: "Sven",
      retiredLegacyField: { anything: true },
    })
    expect(out).toMatchObject({ retiredLegacyField: { anything: true } })
  })

  it("accepts a minimal (empty) entry without throwing", () => {
    expect(() => characterCompletionInputSchema.parse({})).not.toThrow()
  })
})

describe("accountCompletionInputSchema", () => {
  it("parses scalars and passes nested containers through", () => {
    const out = accountCompletionInputSchema.parse({
      championPointsEarned: 3600,
      collectibles: [10, 20],
      achievements: { 1: { completed: true } },
    })
    expect(out.championPointsEarned).toBe(3600)
    expect(out.collectibles).toEqual([10, 20])
  })

  it("nulls a type-wrong scalar (tolerant)", () => {
    const out = accountCompletionInputSchema.parse({ championPointsEarned: "lots" })
    expect(out.championPointsEarned).toBeUndefined()
  })
})

describe("companionCompletionInputSchema", () => {
  it("parses a well-formed companion entry", () => {
    const out = companionCompletionInputSchema.parse({
      selectedBuild: "dps",
      targetBuildHash: "xyz",
      level: 20,
      rapport: 5,
    })
    expect(out.selectedBuild).toBe("dps")
    expect(out.targetBuildHash).toBe("xyz")
    expect(out.level).toBe(20)
  })

  it("nulls a type-wrong field and preserves the rest (tolerant)", () => {
    const out = companionCompletionInputSchema.parse({ level: "twenty", rapport: 5 })
    expect(out.level).toBeUndefined()
    expect(out.rapport).toBe(5)
  })
})
