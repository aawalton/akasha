import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import { classes } from "@temper/game-characters-classes/classes-data"
import { skillLineCategoriesSorted } from "@temper/game-characters-skill-lines/skill-line-categories"
import type { SkillLineId } from "@temper/game-characters-skill-lines/skill-lines-data"
import {
  getSkillLineIdsForClass,
  skillLines,
} from "@temper/game-characters-skill-lines/skill-lines-data"
import { type CharacterSkillMorphProgress, type MorphableSkillDetail } from "@temper/game-characters-skills-morphs-core/morph-progress-types"
import { morphableSkillLineIds } from "@temper/game-characters-skills-morphs-core/morphable-skills"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"
import type { CompletionCharacter } from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"

interface SkillMorphsProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  morphProgress: readonly CharacterSkillMorphProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  skillTypeFilter?: readonly ("active" | "ultimate")[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

interface AggregatedAbility {
  abilityIndex: number
  baseName: string
  baseCount: number
  morph1Name: string
  morph1Count: number
  morph2Name: string
  morph2Count: number
  total: number
}

const MAX_VARIANT_RANK = 4

export function SkillMorphsProgressPanelCard({
  id,
  characters,
  morphProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  skillTypeFilter,
  sortMode,
  sortDirection,
}: SkillMorphsProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? morphProgress
    : morphProgress.filter((p) => selectedCharacterIds.includes(p.characterId))
  const selectedCharacters = isAggregate
    ? characters
    : characters.filter((c) => selectedCharacterIds.includes(c.id))

  const progressMap = new Map<string, Map<string, readonly MorphableSkillDetail[]>>()
  for (const cp of selectedProgress) {
    const entries = new Map<string, readonly MorphableSkillDetail[]>()
    for (const e of cp.entries) {
      entries.set(e.skillLineId, e.skills)
    }
    progressMap.set(cp.characterId, entries)
  }

  const hasSkillTypeFilter = skillTypeFilter !== undefined && skillTypeFilter.length > 0

  function computeMorphs(
    skillLineId: string,
    eligibleCharacters: readonly CompletionCharacter[]
  ): readonly AggregatedAbility[] {
    const allSkills: (readonly MorphableSkillDetail[])[] = []
    for (const char of eligibleCharacters) {
      const skills = progressMap.get(char.id)?.get(skillLineId)
      if (skills) allSkills.push(skills)
    }
    if (allSkills.length === 0) return []

    const total = MAX_VARIANT_RANK * allSkills.length
    const firstSkills = requireFirst(allSkills)
    const template = hasSkillTypeFilter
      ? firstSkills.filter((s) => skillTypeFilter.includes(s.skillType))
      : firstSkills

    return template.map((skill) => {
      const idx = skill.abilityIndex
      let baseCount = 0
      let morph1Count = 0
      let morph2Count = 0
      for (const skills of allSkills) {
        baseCount += skills[idx]?.baseRank ?? 0
        morph1Count += skills[idx]?.morph1Rank ?? 0
        morph2Count += skills[idx]?.morph2Rank ?? 0
      }
      return {
        abilityIndex: idx,
        baseName: skill.baseName,
        baseCount,
        morph1Name: skill.morph1Name,
        morph1Count,
        morph2Name: skill.morph2Name,
        morph2Count,
        total,
      }
    })
  }

  function buildAbilityNodes(abilities: readonly AggregatedAbility[]): readonly CompletionNode[] {
    return abilities.map((a) => ({
      key: String(a.abilityIndex),
      label: a.baseName,
      children: [
        { key: "base", label: "Base", count: a.baseCount, total: a.total },
        { key: "morph1", label: a.morph1Name, count: a.morph1Count, total: a.total },
        { key: "morph2", label: a.morph2Name, count: a.morph2Count, total: a.total },
      ],
    }))
  }

  function buildAbilityNodesWithCharacters(
    skillLineId: string,
    eligibleCharacters: readonly CompletionCharacter[]
  ): readonly CompletionNode[] {
    const firstChar = eligibleCharacters[0]
    if (!firstChar) return []
    const rawTemplateSkills = progressMap.get(firstChar.id)?.get(skillLineId)
    if (!rawTemplateSkills) return []
    const templateSkills = hasSkillTypeFilter
      ? rawTemplateSkills.filter((s) => skillTypeFilter.includes(s.skillType))
      : rawTemplateSkills

    return templateSkills.map((skill) => ({
      key: String(skill.abilityIndex),
      label: skill.baseName,
      children: [
        {
          key: "base",
          label: "Base",
          children: eligibleCharacters.map(
            (char): CompletionNode => ({
              key: char.id,
              label: char.name,
              count:
                progressMap.get(char.id)?.get(skillLineId)?.[skill.abilityIndex]?.baseRank ?? 0,
              total: MAX_VARIANT_RANK,
            })
          ),
        },
        {
          key: "morph1",
          label: skill.morph1Name,
          children: eligibleCharacters.map(
            (char): CompletionNode => ({
              key: char.id,
              label: char.name,
              count:
                progressMap.get(char.id)?.get(skillLineId)?.[skill.abilityIndex]?.morph1Rank ?? 0,
              total: MAX_VARIANT_RANK,
            })
          ),
        },
        {
          key: "morph2",
          label: skill.morph2Name,
          children: eligibleCharacters.map(
            (char): CompletionNode => ({
              key: char.id,
              label: char.name,
              count:
                progressMap.get(char.id)?.get(skillLineId)?.[skill.abilityIndex]?.morph2Rank ?? 0,
              total: MAX_VARIANT_RANK,
            })
          ),
        },
      ],
    }))
  }

  function buildSkillLineNode(
    slId: SkillLineId,
    abilities: readonly AggregatedAbility[]
  ): CompletionNode {
    return {
      key: slId,
      label: skillLines.data[slId].name,
      children: buildAbilityNodes(abilities),
    }
  }

  function buildSkillLineNodeWithCharacters(
    slId: SkillLineId,
    eligibleCharacters: readonly CompletionCharacter[]
  ): CompletionNode {
    return {
      key: slId,
      label: skillLines.data[slId].name,
      children: buildAbilityNodesWithCharacters(slId, eligibleCharacters),
    }
  }

  const playableClasses = classes.list.filter((c) => c.id !== "no-class")

  function buildClassChildren(): readonly CompletionNode[] {
    if (isAggregate) {
      return playableClasses.map((cls) => {
        const classChars = selectedCharacters.filter((c) => c.classId === cls.id)
        const children = getSkillLineIdsForClass(cls.id).map((slId) =>
          buildSkillLineNodeWithCharacters(slId, classChars)
        )
        return { key: cls.id, label: cls.name, children }
      })
    }
    return selectedCharacters.flatMap((char) => {
      return getSkillLineIdsForClass(char.classId).map((slId) =>
        buildSkillLineNode(slId, computeMorphs(slId, [char]))
      )
    })
  }

  function buildStandardChildren(categoryId: string): readonly CompletionNode[] {
    const categoryLines = skillLines.list.filter(
      (sl) => sl.subcategoryId === categoryId && morphableSkillLineIds.has(sl.id)
    )

    if (isAggregate) {
      return categoryLines.map((sl) => buildSkillLineNodeWithCharacters(sl.id, selectedCharacters))
    }

    return categoryLines.map((sl) =>
      buildSkillLineNode(sl.id, computeMorphs(sl.id, selectedCharacters))
    )
  }

  const items: CompletionNode[] = skillLineCategoriesSorted
    .filter((cat) =>
      skillLines.list.some((sl) => sl.subcategoryId === cat.id && morphableSkillLineIds.has(sl.id))
    )
    .map((category) => {
      const children =
        category.id === "class" ? buildClassChildren() : buildStandardChildren(category.id)
      return { key: category.id, label: category.name, children }
    })

  const totalChildren: CompletionNode[] | undefined =
    isAggregate && items.length > 1
      ? selectedCharacters.map((char) => {
          let count = 0
          let total = 0
          const charEntries = progressMap.get(char.id)
          if (charEntries) {
            for (const [, skills] of charEntries) {
              const filtered = hasSkillTypeFilter
                ? skills.filter((s) => skillTypeFilter.includes(s.skillType))
                : skills
              for (const skill of filtered) {
                count += (skill.baseRank ?? 0) + (skill.morph1Rank ?? 0) + (skill.morph2Rank ?? 0)
                total += MAX_VARIANT_RANK * 3
              }
            }
          }
          return { key: char.id, label: char.name, count, total }
        })
      : undefined

  return (
    <CompletionPanelCard
      id={id}
      title="Skill Morphs"
      items={withActivityCategories(items, "characters")}
      totalChildren={totalChildren}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
