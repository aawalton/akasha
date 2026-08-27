import { describe, expect, it } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { championPoints } from "@temper/game-characters-champion-points/champion-points-source"
import { curses } from "@temper/game-characters-character/curse-data"
import { foodOrDrink } from "@temper/game-characters-character/food-and-drink/food-or-drink-source"
import { mundus } from "@temper/game-characters-character/mundus-source"
import { vampireStages } from "@temper/game-characters-character/vampire-stages-data"
import { classes } from "@temper/game-characters-classes/classes-data"
import { armorEnchants } from "@temper/game-characters-equipment/enchants/armor-enchants-data"
import { jewelryEnchants } from "@temper/game-characters-equipment/enchants/jewelry-enchants-data"
import { weaponEnchantments } from "@temper/game-characters-equipment/enchants/weapon-enchants-data"
import { setsAll } from "@temper/game-characters-equipment/sets/sets-all-data"
import { armorTraits } from "@temper/game-characters-equipment/traits/armor-traits-data"
import { jewelryTraits } from "@temper/game-characters-equipment/traits/jewelry-traits-data"
import { weaponTraits } from "@temper/game-characters-equipment/traits/weapon-traits-data"
import { weaponTypes } from "@temper/game-characters-equipment/weapons/weapon-types-data"
import { races } from "@temper/game-characters-races/generated/temper-race.generated"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import { affixScripts } from "@temper/game-characters-skills/scribing/affix-scripts-data"
import { focusScripts } from "@temper/game-characters-skills/scribing/focus-scripts-data"
import { grimoires } from "@temper/game-characters-skills/scribing/grimoires-data"
import { signatureScripts } from "@temper/game-characters-skills/scribing/signature-scripts-data"
import { skills } from "@temper/game-characters-skills/skills-data"
import { z } from "zod"
import {
  AFFIX_SCRIPT_BITS,
  ARMOR_ENCHANT_BITS,
  ARMOR_TRAIT_BITS,
  ARMOR_WEIGHT_BITS,
  ATTRIBUTE_BITS,
  CHAMPION_POINT_BITS,
  CLASS_BITS,
  CURSE_BITS,
  ESO_PLUS_BITS,
  FOCUS_SCRIPT_BITS,
  FOOD_OR_DRINK_BITS,
  GRIMOIRE_BITS,
  JEWELRY_ENCHANT_BITS,
  JEWELRY_TRAIT_BITS,
  MUNDUS_BITS,
  POISON_BITS,
  POTION_BITS,
  RACE_BITS,
  SCRIBED_SKILL_BITS,
  SET_BITS,
  SIGNATURE_SCRIPT_BITS,
  SKILL_BITS,
  SKILL_LINE_BITS,
  skillLineIds,
  VAMPIRE_STAGE_BITS,
  WEAPON_ENCHANT_BITS,
  WEAPON_TRAIT_BITS,
  WEAPON_TYPE_BITS,
} from "./build-codec-indices"
import { CHARACTER_BUILD_TYPE } from "./build-codec-v48"

const GENERATED_DIR = resolve(
  import.meta.dir,
  "../../../../game/characters/capture/addon/src/generated"
)

const requiredFiles = [
  "codec-constants.generated.ts",
  "character-class-mappings.generated.ts",
  "character-race-mappings.generated.ts",
  "champion-point-mappings.generated.ts",
  "player-skill-mappings.generated.ts",
  "mundus-mappings.generated.ts",
  "curse-mappings.generated.ts",
  "food-mappings.generated.ts",
  "player-equipment-mappings.generated.ts",
  "set-mappings.generated.ts",
  "scribing-mappings.generated.ts",
  "skill-line-mappings.generated.ts",
]

const missingFiles = requiredFiles.filter((f) => !existsSync(resolve(GENERATED_DIR, f)))

function readGenerated(filename: string): string {
  return readFileSync(resolve(GENERATED_DIR, filename), "utf-8")
}

function countMappingEntries(content: string, tableName: string, entryRe: RegExp): number {
  const outer = z
    .array(z.string())
    .nullable()
    .safeParse(content.match(new RegExp(`${tableName}.*?\\{([^}]+)\\}`, "s")))
  if (!outer.success || outer.data === null) return 0
  const body = outer.data[1] ?? ""
  const inner = z.array(z.string()).nullable().safeParse(body.match(entryRe))
  if (!inner.success || inner.data === null) return 0
  return inner.data.length
}

describe("character codec addon data sync", () => {
  it("all required generated files are present (guards against a stale path)", () => {
    expect(missingFiles).toEqual([])
  })

  it("character codec constants match engine values", () => {
    const content = readGenerated("codec-constants.generated.ts")

    expect(content).toContain(`CHARACTER_BUILD_TYPE = ${CHARACTER_BUILD_TYPE}`)
    expect(content).toContain(`CHARACTER_CLASS_BITS = ${CLASS_BITS}`)
    expect(content).toContain(`CHARACTER_RACE_BITS = ${RACE_BITS}`)
    expect(content).toContain(`CHARACTER_VAMPIRE_STAGE_BITS = ${VAMPIRE_STAGE_BITS}`)
    expect(content).toContain(`CHARACTER_CURSE_BITS = ${CURSE_BITS}`)
    expect(content).toContain(`CHARACTER_MUNDUS_BITS = ${MUNDUS_BITS}`)
    expect(content).toContain(`CHARACTER_SKILL_LINE_BITS = ${SKILL_LINE_BITS}`)
    expect(content).toContain(`CHARACTER_ATTRIBUTE_BITS = ${ATTRIBUTE_BITS}`)
    expect(content).toContain(`CHARACTER_ARMOR_WEIGHT_BITS = ${ARMOR_WEIGHT_BITS}`)
    expect(content).toContain(`CHARACTER_ARMOR_TRAIT_BITS = ${ARMOR_TRAIT_BITS}`)
    expect(content).toContain(`CHARACTER_ARMOR_ENCHANT_BITS = ${ARMOR_ENCHANT_BITS}`)
    expect(content).toContain(`CHARACTER_JEWELRY_TRAIT_BITS = ${JEWELRY_TRAIT_BITS}`)
    expect(content).toContain(`CHARACTER_JEWELRY_ENCHANT_BITS = ${JEWELRY_ENCHANT_BITS}`)
    expect(content).toContain(`CHARACTER_WEAPON_TYPE_BITS = ${WEAPON_TYPE_BITS}`)
    expect(content).toContain(`CHARACTER_WEAPON_TRAIT_BITS = ${WEAPON_TRAIT_BITS}`)
    expect(content).toContain(`CHARACTER_WEAPON_ENCHANT_BITS = ${WEAPON_ENCHANT_BITS}`)
    expect(content).toContain(`CHARACTER_POISON_BITS = ${POISON_BITS}`)
    expect(content).toContain(`CHARACTER_SET_BITS = ${SET_BITS}`)
    expect(content).toContain(`CHARACTER_SKILL_BITS = ${SKILL_BITS}`)
    expect(content).toContain(`CHARACTER_SCRIBED_SKILL_BITS = ${SCRIBED_SKILL_BITS}`)
    expect(content).toContain(`CHARACTER_GRIMOIRE_BITS = ${GRIMOIRE_BITS}`)
    expect(content).toContain(`CHARACTER_FOCUS_SCRIPT_BITS = ${FOCUS_SCRIPT_BITS}`)
    expect(content).toContain(`CHARACTER_SIGNATURE_SCRIPT_BITS = ${SIGNATURE_SCRIPT_BITS}`)
    expect(content).toContain(`CHARACTER_AFFIX_SCRIPT_BITS = ${AFFIX_SCRIPT_BITS}`)
    expect(content).toContain(`CHARACTER_CHAMPION_POINT_BITS = ${CHAMPION_POINT_BITS}`)
    expect(content).toContain(`CHARACTER_FOOD_OR_DRINK_BITS = ${FOOD_OR_DRINK_BITS}`)
    expect(content).toContain(`CHARACTER_POTION_BITS = ${POTION_BITS}`)
    expect(content).toContain(`CHARACTER_ESO_PLUS_BITS = ${ESO_PLUS_BITS}`)
  })

  it("class esoId → index entries match engine data", () => {
    const content = readGenerated("character-class-mappings.generated.ts")
    for (const [i, id] of classes.ids.entries()) {
      const cls = classes.data[id]
      if (!cls || cls.esoClassId === 0) continue
      expect(content).toContain(`[${cls.esoClassId}]: ${i},`)
    }
  })

  it("race esoId → index entries match engine data", () => {
    const content = readGenerated("character-race-mappings.generated.ts")
    for (const [i, id] of races.ids.entries()) {
      const race = races.data[id]
      if (!race || race.esoRaceId === 0) continue
      expect(content).toContain(`[${race.esoRaceId}]: ${i},`)
    }
  })

  it("player skill esoId → index entries match engine data", () => {
    const content = readGenerated("player-skill-mappings.generated.ts")
    const seen = new Set<number>()
    for (const [i, id] of skills.ids.entries()) {
      const skill = skills.data[id]
      if (!skill || skill.esoSkillId === 0) continue
      if (seen.has(skill.esoSkillId)) continue
      seen.add(skill.esoSkillId)
      expect(content).toContain(`[${skill.esoSkillId}]: ${i},`)
    }
  })

  it("set esoId → index entries match engine data", () => {
    const content = readGenerated("set-mappings.generated.ts")
    for (const [i, id] of setsAll.ids.entries()) {
      const set = setsAll.data[id]
      if (!set || set.esoSetId === 0) continue
      expect(content).toContain(`[${set.esoSetId}]: ${i},`)
    }
  })

  it("armor trait entries match engine data count", () => {
    const content = readGenerated("player-equipment-mappings.generated.ts")
    const entryCount = countMappingEntries(content, "PLAYER_ARMOR_TRAIT_ESO_ID_TO_INDEX", /\[/g)
    expect(entryCount).toBe(armorTraits.ids.length)
  })

  it("weapon trait entries match engine data count", () => {
    const content = readGenerated("player-equipment-mappings.generated.ts")
    const entryCount = countMappingEntries(content, "PLAYER_WEAPON_TRAIT_ESO_ID_TO_INDEX", /\[/g)
    expect(entryCount).toBe(weaponTraits.ids.length)
  })

  it("jewelry trait entries match engine data count", () => {
    const content = readGenerated("player-equipment-mappings.generated.ts")
    const entryCount = countMappingEntries(content, "PLAYER_JEWELRY_TRAIT_ESO_ID_TO_INDEX", /\[/g)
    expect(entryCount).toBe(jewelryTraits.ids.length)
  })

  it("armor enchant entries match engine data count", () => {
    const content = readGenerated("player-equipment-mappings.generated.ts")
    const entryCount = countMappingEntries(content, "PLAYER_ARMOR_ENCHANT_ESO_ID_TO_INDEX", /\[/g)
    expect(entryCount).toBe(armorEnchants.ids.length)
  })

  it("weapon enchant entries match engine data count", () => {
    const content = readGenerated("player-equipment-mappings.generated.ts")
    const entryCount = countMappingEntries(content, "PLAYER_WEAPON_ENCHANT_ESO_ID_TO_INDEX", /\[/g)
    expect(entryCount).toBe(weaponEnchantments.ids.length)
  })

  it("jewelry enchant entries match engine data count", () => {
    const content = readGenerated("player-equipment-mappings.generated.ts")
    const entryCount = countMappingEntries(content, "PLAYER_JEWELRY_ENCHANT_ESO_ID_TO_INDEX", /\[/g)
    expect(entryCount).toBe(jewelryEnchants.ids.length)
  })

  it("weapon type entries match engine data count", () => {
    const content = readGenerated("player-equipment-mappings.generated.ts")
    const entryCount = countMappingEntries(content, "PLAYER_WEAPON_TYPE_ESO_ID_TO_INDEX", /\[/g)
    expect(entryCount).toBe(weaponTypes.ids.length)
  })

  it("champion point esoSkillId → index entries match engine data", () => {
    const content = readGenerated("champion-point-mappings.generated.ts")
    for (const [i, id] of championPoints.ids.entries()) {
      const cp = championPoints.data[id]
      if (!cp || cp.esoChampionSkillId === 0) continue
      expect(content).toContain(`[${cp.esoChampionSkillId}]: ${i},`)
    }
  })

  it("food abilityId → index entries match engine data", () => {
    const content = readGenerated("food-mappings.generated.ts")
    for (const [i, id] of foodOrDrink.ids.entries()) {
      const food = foodOrDrink.data[id]
      if (!food || food.abilityId === 0) continue
      expect(content).toContain(`[${food.abilityId}]: ${i},`)
    }
  })

  it("mundus esoMundusId → index entries match engine data", () => {
    const content = readGenerated("mundus-mappings.generated.ts")
    for (const [i, id] of mundus.ids.entries()) {
      const m = mundus.data[id]
      if (!m || m.esoMundusId === 0) continue
      expect(content).toContain(`[${m.esoMundusId}]: ${i},`)
    }
  })

  it("skill line esoId → index entries match engine data (non-companion)", () => {
    const content = readGenerated("skill-line-mappings.generated.ts")
    const filteredIds = skillLines.ids.filter(
      (id) => skillLines.data[id]?.subcategoryId !== "companion"
    )
    for (const [i, id] of filteredIds.entries()) {
      const sl = skillLines.data[id]
      if (!sl || sl.esoSkillLineId === 0) continue
      expect(content).toContain(`[${sl.esoSkillLineId}]: ${i},`)
    }
  })

  it("skill line mapping excludes companion skill lines", () => {
    const content = readGenerated("skill-line-mappings.generated.ts")
    const companionLines = skillLines.list.filter((sl) => sl.subcategoryId === "companion")
    for (const sl of companionLines) {
      if (sl.esoSkillLineId === 0) continue
      expect(content).not.toContain(`[${sl.esoSkillLineId}]:`)
    }
  })

  it("skill line index count matches build-codec-indices filtered count", () => {
    const content = readGenerated("skill-line-mappings.generated.ts")
    const engineCount = skillLineIds.length
    const genCount = countMappingEntries(content, "SKILL_LINE_ESO_ID_TO_INDEX", /\[\d+\]/g)
    expect(genCount + 1).toBe(engineCount)
  })

  it("vampire stage abilityId → index entries match engine data", () => {
    const content = readGenerated("curse-mappings.generated.ts")
    for (const [i, id] of vampireStages.ids.entries()) {
      const stage = vampireStages.data[id]
      if (!stage || stage.esoVampireStageId === 0) continue
      expect(content).toContain(`[${stage.esoVampireStageId}]: ${i},`)
    }
  })

  it("curse temperId → index entries match engine data", () => {
    const content = readGenerated("curse-mappings.generated.ts")
    for (const [i, id] of curses.ids.entries()) {
      const curse = curses.data[id]
      if (!curse) continue
      expect(content).toContain(`"${curse.id}": ${i},`)
    }
  })

  it("grimoire name → index entries match engine data", () => {
    const content = readGenerated("scribing-mappings.generated.ts")
    for (const [i, id] of grimoires.ids.entries()) {
      const g = grimoires.data[id]
      if (!g) continue
      expect(content).toContain(`["${g.name}"]: ${i},`)
    }
  })

  it("focus script name → index entries match engine data", () => {
    const content = readGenerated("scribing-mappings.generated.ts")
    for (const [i, id] of focusScripts.ids.entries()) {
      const s = focusScripts.data[id]
      if (!s) continue
      expect(content).toContain(`["${s.name}"]: ${i},`)
    }
  })

  it("signature script name → index entries match engine data", () => {
    const content = readGenerated("scribing-mappings.generated.ts")
    for (const [i, id] of signatureScripts.ids.entries()) {
      const s = signatureScripts.data[id]
      if (!s || s.itemId === 0) continue
      expect(content).toContain(`["${s.name}"]: ${i},`)
    }
  })

  it("affix script name → index entries match engine data", () => {
    const content = readGenerated("scribing-mappings.generated.ts")
    for (const [i, id] of affixScripts.ids.entries()) {
      const s = affixScripts.data[id]
      if (!s || s.itemId === 0) continue
      expect(content).toContain(`["${s.name}"]: ${i},`)
    }
  })
})
