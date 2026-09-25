import { expect, test } from "bun:test"
import { slugIn } from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"
import { AFFIX_SCRIPT_PAGES } from "akasha/temper/catalog/skill/temper-affix-script/modules/affix-script-pages/affix-script-pages.module.code.ts"
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

test("a scribed skill grants the buffs its affix script's page names", () => {
  expect(createScribedSkillSource(travelingKnifeWith("brutality-and-sorcery"))?.effects).toEqual([
    { buffId: "major-brutality", slottedBehavior: "either-bar" },
    { buffId: "major-sorcery", slottedBehavior: "either-bar" },
  ])
})

test("a scribed skill puts on its target the debuffs its affix script's page names", () => {
  expect(createScribedSkillSource(travelingKnifeWith("vulnerability"))?.effects).toEqual([
    { debuffId: "minor-vulnerability", slottedBehavior: "either-bar" },
  ])
})

test("an affix script naming no buff and no debuff grants nothing", () => {
  expect(createScribedSkillSource(travelingKnifeWith("off-balance"))?.effects).toEqual([])
  expect(createScribedSkillSource(travelingKnifeWith("no-affix-script"))?.effects).toEqual([])
})

test("every buff and debuff an affix script names is one the stats turn into effects", () => {
  for (const page of Object.values(AFFIX_SCRIPT_PAGES)) {
    for (const reference of [...(page.grantedBuffs ?? []), ...(page.appliedDebuffs ?? [])]) {
      expect(buffOrDebuff.has(slugIn(reference))).toBe(true)
    }
  }
})
