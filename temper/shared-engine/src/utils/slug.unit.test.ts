import { describe, expect, it } from "bun:test"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { characterUrl, companionUrl } from "./slug"

const ID = BuildId("01900000-0000-7000-8000-000000abc123")

describe("characterUrl", () => {
  it("uses the slugified name plus the last 8 hex of the buildId", () => {
    expect(characterUrl(ID, "My Nightblade")).toBe("/character-build/my-nightblade-00abc123")
  })

  it("collapses non-alphanumerics to single hyphens", () => {
    expect(characterUrl(ID, "Stamina DPS (PvP)")).toBe("/character-build/stamina-dps-pvp-00abc123")
  })

  it("trims leading and trailing hyphens after slugify", () => {
    expect(characterUrl(ID, "  Extra   Spaces  ")).toBe("/character-build/extra-spaces-00abc123")
  })

  it("falls back to untitled when name is omitted", () => {
    expect(characterUrl(ID)).toBe("/character-build/untitled-00abc123")
  })

  it("falls back to untitled when name slugifies to empty", () => {
    expect(characterUrl(ID, "!!!")).toBe("/character-build/untitled-00abc123")
  })
})

describe("companionUrl", () => {
  it("uses the slugified name plus the last 8 hex of the buildId", () => {
    expect(companionUrl(ID, "Mirri Healer")).toBe("/companion-build/mirri-healer-00abc123")
  })

  it("falls back to untitled when name is omitted", () => {
    expect(companionUrl(ID)).toBe("/companion-build/untitled-00abc123")
  })

  it("falls back to untitled when name slugifies to empty", () => {
    expect(companionUrl(ID, "***")).toBe("/companion-build/untitled-00abc123")
  })
})
