import { describe, expect, it } from "bun:test"
import { createEmptyCharacter } from "@temper/game-characters-character/build-factory"
import { createEmptyCompanion } from "@temper/game-companions-core/companion-factory"
import {
  applyCharacterMetadata,
  applyCompanionMetadata,
  extractCharacterMetadata,
  extractCompanionMetadata,
} from "./build-metadata"

describe("build-metadata targetCount round-trip", () => {
  it("preserves character targetCount through extract → apply", () => {
    const base = createEmptyCharacter()
    const edited = { ...base, target: { ...base.target, targetCount: 3 } }

    const restored = applyCharacterMetadata(base, extractCharacterMetadata(edited))

    expect(restored.target.targetCount).toBe(3)
  })

  it("preserves companion targetCount through extract → apply", () => {
    const base = createEmptyCompanion()
    const edited = { ...base, target: { ...base.target, targetCount: 3 } }

    const restored = applyCompanionMetadata(base, extractCompanionMetadata(edited))

    expect(restored.target.targetCount).toBe(3)
  })
})
