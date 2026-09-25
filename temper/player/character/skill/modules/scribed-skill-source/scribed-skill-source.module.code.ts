import { slugIn } from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"
import { AFFIX_SCRIPT_PAGES } from "akasha/temper/catalog/skill/temper-affix-script/modules/affix-script-pages/affix-script-pages.module.code.ts"
import type { SkillSource } from "akasha/temper/catalog/skill-kind/modules/skills-source/skills-source.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"
import { getScribedSkillByGrimoireAndFocus } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import { grimoires } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"

const SLOTTED_BEHAVIOR = "either-bar" as const

export function createScribedSkillSource(scribedSkill: ScribedSkill): SkillSource | null {
  const { skillId, grimoireId, focusScriptId, affixScriptId } = scribedSkill

  const grimoire = grimoires.data[grimoireId]

  const skill = getScribedSkillByGrimoireAndFocus(grimoireId, focusScriptId)
  if (!skill) {
    return null
  }

  const affixScript = AFFIX_SCRIPT_PAGES[affixScriptId]
  const effects: Effect[] = [
    ...(affixScript.grantedBuffs ?? []).map((buff) => ({
      buffId: slugIn(buff),
      slottedBehavior: SLOTTED_BEHAVIOR,
    })),
    ...(affixScript.appliedDebuffs ?? []).map((debuff) => ({
      debuffId: slugIn(debuff),
      slottedBehavior: SLOTTED_BEHAVIOR,
    })),
  ]

  return {
    id: skillId,
    categoryId: "skills",
    skillId,
    esoSkillId: skill.esoSkillId,
    skillName: skill.name,
    skillLineId: grimoire.skillLineId,
    skillType: "active",
    effects,
  }
}
