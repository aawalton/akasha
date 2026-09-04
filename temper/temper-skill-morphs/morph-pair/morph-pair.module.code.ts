import type { Skill } from "@akasha/temper-character-skills/character-skills"
import { requireGet } from "@akasha/utils-narrow/require-get"

export interface MorphPair {
  baseName: string
  lineRankNeeded: number
  skills: readonly Skill[]
}

export function groupSkillsIntoMorphPairs(skills: readonly Skill[]): readonly MorphPair[] {
  const groups = new Map<string, Skill[]>()

  for (const skill of skills) {
    const key = skill.baseName !== "" ? skill.baseName : skill.name
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    requireGet(groups, key, "groups").push(skill)
  }

  return Array.from(groups.entries()).map(([baseName, skills]) => ({
    baseName,
    lineRankNeeded: Math.min(...skills.map((s) => s.lineRankNeeded)),
    skills: skills.sort((a, b) => a.rank - b.rank),
  }))
}
