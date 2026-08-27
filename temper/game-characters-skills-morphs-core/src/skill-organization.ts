import { requireGet } from "../../../shared/utils-narrow/src/require-get"
import { skillLineCategoriesSorted } from "@temper/game-characters-skill-lines/skill-line-categories"
import type { SkillLineId } from "@temper/game-characters-skill-lines/skill-lines-data"
import {
  getSkillCategory,
  getSkillLineName,
  getSkillLineOrder,
} from "@temper/game-characters-skills/skill-line-queries"
import type { Skill } from "@temper/game-characters-skills/skills-data"
import { groupSkillsIntoMorphPairs, type MorphPair } from "./morph-pair"

interface SkillLineData {
  id: SkillLineId
  displayName: string
  morphPairs: readonly MorphPair[]
}

export interface CategoryData {
  name: string
  skillLines: readonly SkillLineData[]
}

export function organizeSkills(
  skills: readonly Skill[],
  searchFilter: string,
  characterSkillLineIds: readonly SkillLineId[]
): readonly CategoryData[] {
  const searchLower = searchFilter.toLowerCase()
  const filteredSkills =
    searchFilter !== ""
      ? skills.filter(
          (s) =>
            s.name.toLowerCase().includes(searchLower) ||
            s.baseName?.toLowerCase().includes(searchLower) ||
            s.skillLineId?.toLowerCase().includes(searchLower)
        )
      : skills

  const categoryMap = new Map<string, Map<SkillLineId, Skill[]>>()

  for (const skill of filteredSkills) {
    const category = getSkillCategory(skill.skillLineId)
    const skillLineId = skill.skillLineId

    if (!categoryMap.has(category)) {
      categoryMap.set(category, new Map())
    }
    const skillLineMap = requireGet(categoryMap, category, "categoryMap")
    if (!skillLineMap.has(skillLineId)) {
      skillLineMap.set(skillLineId, [])
    }
    requireGet(skillLineMap, skillLineId, "skillLineMap").push(skill)
  }

  const categories: CategoryData[] = []

  const categoryOrder = skillLineCategoriesSorted.map((category) => category.name)
  for (const categoryName of categoryOrder) {
    const skillLineMap = categoryMap.get(categoryName)
    if (!skillLineMap || skillLineMap.size === 0) continue

    const skillLines: SkillLineData[] = []
    for (const [skillLineId, skills] of skillLineMap) {
      const morphPairs = groupSkillsIntoMorphPairs(skills).toSorted(
        (a, b) => a.lineRankNeeded - b.lineRankNeeded
      )

      skillLines.push({
        id: skillLineId,
        displayName: getSkillLineName(skillLineId),
        morphPairs,
      })
    }

    skillLines.sort((a, b) => {
      const orderA = getSkillLineOrder(a.id, characterSkillLineIds)
      const orderB = getSkillLineOrder(b.id, characterSkillLineIds)
      return orderA - orderB
    })

    categories.push({
      name: categoryName,
      skillLines,
    })
  }

  return categories
}
