import { describe, expect, it } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { companions } from "@temper/game-companions-core/companions-data"
import { companionSkills } from "@temper/game-companions-core/skills/companion-skills-data"
import {
  COMPANION_ARMOR_WEIGHT_BITS,
  COMPANION_BITS,
  COMPANION_QUALITY_BITS,
  COMPANION_SKILL_BITS,
  COMPANION_TRAIT_BITS,
  COMPANION_WEAPON_TYPE_BITS,
} from "./companion-codec-indices"
import { COMPANION_BUILD_TYPE, ESO_VERSION_48 } from "./companion-codec-v48"

const GENERATED_DIR = resolve(import.meta.dir, "../../../../game/companions/addon/src/generated")

const requiredFiles = [
  "companion-mappings.generated.ts",
  "skill-mappings.generated.ts",
  "codec-constants.generated.ts",
]

const missingFiles = requiredFiles.filter((f) => !existsSync(resolve(GENERATED_DIR, f)))

function readGenerated(filename: string): string {
  return readFileSync(resolve(GENERATED_DIR, filename), "utf-8")
}

describe("addon data sync", () => {
  it("all required generated files are present (guards against a stale path)", () => {
    expect(missingFiles).toEqual([])
  })

  it("companion ID → index entries match temper data", () => {
    const companionContent = readGenerated("companion-mappings.generated.ts")
    for (const [i, id] of companions.ids.entries()) {
      const companion = companions.data[id]
      if (!companion || companion.esoCompanionId === 0) continue

      const pattern = `[${companion.esoCompanionId}]: ${i},`
      expect(companionContent).toContain(pattern)
    }
  })

  it("skill abilityId → index entries match temper data", () => {
    const skillContent = readGenerated("skill-mappings.generated.ts")
    const seen = new Set<number>()
    for (const [i, id] of companionSkills.ids.entries()) {
      const skill = companionSkills.data[id]
      if (!skill || skill.abilityId === 0) continue
      if (seen.has(skill.abilityId)) continue
      seen.add(skill.abilityId)

      const pattern = `[${skill.abilityId}]: ${i},`
      expect(skillContent).toContain(pattern)
    }
  })

  it("codec constants match temper values", () => {
    const codecContent = readGenerated("codec-constants.generated.ts")
    expect(codecContent).toContain(`COMPANION_BUILD_TYPE = ${COMPANION_BUILD_TYPE}`)
    expect(codecContent).toContain(`ESO_VERSION = ${ESO_VERSION_48}`)
    expect(codecContent).toContain(`COMPANION_BITS = ${COMPANION_BITS}`)
    expect(codecContent).toContain(`ARMOR_WEIGHT_BITS = ${COMPANION_ARMOR_WEIGHT_BITS}`)
    expect(codecContent).toContain(`TRAIT_BITS = ${COMPANION_TRAIT_BITS}`)
    expect(codecContent).toContain(`QUALITY_BITS = ${COMPANION_QUALITY_BITS}`)
    expect(codecContent).toContain(`WEAPON_TYPE_BITS = ${COMPANION_WEAPON_TYPE_BITS}`)
    expect(codecContent).toContain(`SKILL_BITS = ${COMPANION_SKILL_BITS}`)
  })
})
