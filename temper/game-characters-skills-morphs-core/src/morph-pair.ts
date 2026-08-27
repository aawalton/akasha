import { requireGet } from "../../../shared/utils-narrow/src/require-get"
import type { Skill } from "@temper/game-characters-skills/skills-data"

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
