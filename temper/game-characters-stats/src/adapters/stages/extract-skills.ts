import { createScribedSkillSource } from "@temper/game-characters-skills/scribing/scribed-skill-source"
import { skillSlots } from "@temper/game-characters-skills/skill-slots-data"
import { skills } from "@temper/game-characters-skills/skills-data"
import type { SkillSource } from "@temper/shared-formula-framework/skill-source"
import type { Effect } from "@temper/shared-formula-framework/effects-types"
import type { PipelineStage } from "./types"

export const extractSkills: PipelineStage = (build, context) => {
  const sources: SkillSource[] = []

  const bars = [
    { bar: build.skills["primary-skill-bar"], barId: "primary-weapon-bar" as const },
    { bar: build.skills["backup-skill-bar"], barId: "backup-weapon-bar" as const },
  ]

  for (const { bar, barId } of bars) {
    const isActiveBar = context.bar == null || context.bar === barId
    const hasBarContext = context.bar !== undefined

    for (const slot of skillSlots.list) {
      const skillId = bar[slot.id]
      if (skillId === "no-skill") continue

      if (skillId.startsWith("scribed-")) {
        const scribedSkill = build.scribing.find((s) => s.skillId === skillId)
        if (!scribedSkill) continue

        const scribedSource = createScribedSkillSource(scribedSkill)
        if (scribedSource) {
          sources.push(scribedSource)
        }
        continue
      }

      const skill = skills.data[skillId]
      if (!skill) continue

      const include = (slottedBehavior?: "either-bar" | "active-bar-only"): boolean => {
        if (!hasBarContext) return true
        if (slottedBehavior === "either-bar") return true
        return isActiveBar
      }

      const filteredEffects: Effect[] =
        "effects" in skill && skill.effects
          ? skill.effects.filter((e: Effect) =>
              include("slottedBehavior" in e ? e.slottedBehavior : undefined)
            )
          : []

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
