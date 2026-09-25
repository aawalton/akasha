import { skillSlots } from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { SkillSource } from "akasha/temper/player/character/formula-framework/modules/skill-source/skill-source.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { createScribedSkillSource } from "akasha/temper/player/character/skill/modules/scribed-skill-source/scribed-skill-source.module.code.ts"
import type { PipelineStage } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

export const extractSkills: PipelineStage = (build, context) => {
  const sources: SkillSource[] = []

  const bars = [
    { bar: build.skills["primary-skill-bar"], barId: "primary-weapon-bar" as const },
    { bar: build.skills["backup-skill-bar"], barId: "backup-weapon-bar" as const },
  ]

  for (const { bar, barId } of bars) {
    const isActiveBar = context.bar == null || context.bar === barId
    const hasBarContext = context.bar !== undefined

    const include = (slottedBehavior?: "either-bar" | "active-bar-only"): boolean => {
      if (!hasBarContext) return true
      if (slottedBehavior === "either-bar") return true
      return isActiveBar
    }

    const filterEffects = (effects: readonly Effect[]): Effect[] =>
      effects.filter((e: Effect) => include("slottedBehavior" in e ? e.slottedBehavior : undefined))

    for (const slot of skillSlots.list) {
      const skillId = bar[slot.id]
      if (skillId === "no-skill") continue

      if (skillId.startsWith("scribed-")) {
        const scribedSkill = build.scribing.find((s) => s.skillId === skillId)
        if (!scribedSkill) continue

        const scribedSource = createScribedSkillSource(scribedSkill)
        if (scribedSource) {
          sources.push({ ...scribedSource, effects: filterEffects(scribedSource.effects) })
        }
        continue
      }

      const skill = skills.data[skillId]
      if (!skill) continue

      const filteredEffects: Effect[] =
        "effects" in skill && skill.effects ? filterEffects(skill.effects) : []

      sources.push({
        id: `skill-${skill.id}-${barId}`,
        categoryId: "skills",
        skillId: skill.id,
        esoSkillId: skill.esoSkillId,
        skillName: skill.name,
        skillLineId: skill.skillLineId,
        skillType: skill.skillType,
        effects: filteredEffects,
      })
    }
  }

  return sources
}
