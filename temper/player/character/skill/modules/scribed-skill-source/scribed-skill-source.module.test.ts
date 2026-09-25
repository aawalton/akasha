import { expect, test } from "bun:test"
import { slugIn } from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"
import { GRIMOIRE_AFFIX_ROWS } from "akasha/temper/catalog/skill/temper-grimoire/modules/grimoire-affix-rows/grimoire-affix-rows.module.code.ts"
import { buffOrDebuff } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import { createScribedSkillSource } from "akasha/temper/player/character/skill/modules/scribed-skill-source/scribed-skill-source.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"

function travelingKnifeWith(affixScriptId: ScribedSkill["affixScriptId"]): ScribedSkill {
  return {
    skillId: "scribed-traveling-knife-magic-damage",
    grimoireId: "traveling-knife",
    focusScriptId: "magic-damage",
    signatureScriptId: "lingering-torment",
    affixScriptId,
  }
}

function magicDamageOn(
  grimoireId: "wield-soul" | "soul-burst",
  affixScriptId: ScribedSkill["affixScriptId"]
): ScribedSkill {
  return {
    skillId: `scribed-${grimoireId}-magic-damage`,
    grimoireId,
    focusScriptId: "magic-damage",
    signatureScriptId: "lingering-torment",
    affixScriptId,
  }
}

test("a scribed skill grants the buffs its grimoire's row for its affix script names", () => {
  expect(createScribedSkillSource(travelingKnifeWith("brutality-and-sorcery"))?.effects).toEqual([
    { buffId: "major-brutality", slottedBehavior: "either-bar" },
    { buffId: "major-sorcery", slottedBehavior: "either-bar" },
  ])
})

test("a scribed skill puts on its target the debuffs its grimoire's row names", () => {
  expect(createScribedSkillSource(travelingKnifeWith("vulnerability"))?.effects).toEqual([
    { debuffId: "minor-vulnerability", slottedBehavior: "either-bar" },
  ])
})

test("one affix script grants the major buff on one grimoire and the minor on another", () => {
  expect(createScribedSkillSource(magicDamageOn("wield-soul", "resolve"))?.effects).toEqual([
    { buffId: "major-resolve", slottedBehavior: "either-bar" },
  ])
  expect(createScribedSkillSource(magicDamageOn("soul-burst", "resolve"))?.effects).toEqual([
    { buffId: "minor-resolve", slottedBehavior: "either-bar" },
  ])
})

test("a grimoire whose row gives a major debuff puts no debuff on the target", () => {
  expect(createScribedSkillSource(magicDamageOn("wield-soul", "maim"))?.effects).toEqual([])
  expect(createScribedSkillSource(magicDamageOn("soul-burst", "maim"))?.effects).toEqual([
    { debuffId: "minor-maim", slottedBehavior: "either-bar" },
  ])
})

test("a row naming no buff and no debuff grants nothing", () => {
  expect(createScribedSkillSource(travelingKnifeWith("off-balance"))?.effects).toEqual([])
  expect(createScribedSkillSource(travelingKnifeWith("no-affix-script"))?.effects).toEqual([])
})

test("every buff and debuff a grimoire's affix row names is one the stats turn into effects", () => {
  for (const rows of Object.values(GRIMOIRE_AFFIX_ROWS)) {
    for (const row of rows) {
      for (const reference of [...(row.grantedBuffs ?? []), ...(row.appliedDebuffs ?? [])]) {
        expect(buffOrDebuff.has(slugIn(reference))).toBe(true)
      }
    }
  }
})
