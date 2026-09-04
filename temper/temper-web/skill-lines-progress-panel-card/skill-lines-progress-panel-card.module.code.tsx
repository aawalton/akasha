import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { getRacialSkillLineIdForRace } from "@akasha/temper-character-skills/passive-queries"
import { classes } from "@akasha/temper-classes/character-class"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { CharacterCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type {
  CharacterSkillLineProgress,
  CompletionCharacter,
  SkillLineProgressEntry,
} from "@akasha/temper-player-completion/completion-ui-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { skillLineCategoriesSorted } from "@akasha/temper-skill-lines/skill-line-category-data"
import {
  getSkillLineIdsForClass,
  type SkillLineId,
  skillLines,
} from "@akasha/temper-skill-lines/skill-lines"
import {
  EXCLUDED_CATEGORIES,
  EXCLUDED_SKILL_LINES,
} from "@akasha/temper-skill-morphs-access/eso-id-helpers"

interface SkillLinesProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  progress: readonly CharacterSkillLineProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function SkillLinesProgressPanelCard({
  id,
  characters,
  progress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: SkillLinesProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? progress
    : progress.filter((p) => selectedCharacterIds.includes(p.characterId))
  const selectedCharacters = isAggregate
    ? characters
    : characters.filter((c) => selectedCharacterIds.includes(c.id))

  const progressMap = new Map<string, Map<string, SkillLineProgressEntry>>()
  for (const cp of selectedProgress) {
    const entries = new Map<string, SkillLineProgressEntry>()
    for (const e of cp.entries) {
      entries.set(e.skillLineId, e)
    }
    progressMap.set(cp.characterId, entries)
  }

  function buildCharacterChildren(
    skillLineId: SkillLineId,
    eligibleCharacters: readonly CompletionCharacter[]
  ): readonly CompletionNode[] {
    const sl = skillLines.data[skillLineId]
    return eligibleCharacters.map(
      (char): CompletionNode => ({
        key: char.id,
        label: char.name,
        count: progressMap.get(char.id)?.get(skillLineId)?.currentRank ?? 0,
        total: progressMap.get(char.id)?.get(skillLineId)?.maxRank ?? sl.maxRank,
      })
    )
  }

  function computeRanks(
    skillLineId: SkillLineId,
    eligibleCharacters: readonly CompletionCharacter[]
  ): { count: number; total: number } {
    const sl = skillLines.data[skillLineId]
    let count = 0
    let total = 0
    for (const char of eligibleCharacters) {
      const entry = progressMap.get(char.id)?.get(skillLineId)
      if (entry) {
        count += entry.currentRank
        total += entry.maxRank
      }
    }
    if (total === 0) total = sl.maxRank
    return { count, total }
  }

  const playableClasses = classes.list.filter((c) => c.id !== "no-class")

  function buildClassChildren(): readonly CompletionNode[] {
    if (isAggregate) {
      return playableClasses.map((cls) => {
        const classChars = selectedCharacters.filter((c) => c.classId === cls.id)
        const children = getSkillLineIdsForClass(cls.id).map(
          (slId): CompletionNode => ({
            key: slId,
            label: skillLines.data[slId].name,
            children: buildCharacterChildren(slId, classChars),
          })
        )
        return { key: cls.id, label: cls.name, children }
      })
    }
    return selectedCharacters.flatMap((char) => {
      return getSkillLineIdsForClass(char.classId).map((slId): CompletionNode => {
        const ranks = computeRanks(slId, [char])
        return {
          key: slId,
          label: skillLines.data[slId].name,
          count: ranks.count,
          total: ranks.total,
        }
      })
    })
  }

  function buildRacialChildren(): readonly CompletionNode[] {
    const racialLines = isAggregate
      ? skillLines.list.filter(
          (sl) => sl.subcategoryId === "racial" && !EXCLUDED_SKILL_LINES.has(sl.id)
        )
      : selectedCharacters
          .map((char) => {
            const slId = getRacialSkillLineIdForRace(char.raceId)
            return slId != null ? skillLines.data[slId] : null
          })
          .filter((sl) => sl !== null)

    return racialLines.map((sl): CompletionNode => {
      const eligibleChars = selectedCharacters.filter(
        (c) => getRacialSkillLineIdForRace(c.raceId) === sl.id
      )

      if (isAggregate) {
        return {
          key: sl.id,
          label: sl.name,
          children: buildCharacterChildren(sl.id, eligibleChars),
        }
      }

      const ranks = computeRanks(sl.id, eligibleChars)
      return {
        key: sl.id,
        label: sl.name,
        count: ranks.count,
        total: ranks.total,
      }
    })
  }

  function buildStandardChildren(categoryId: string): readonly CompletionNode[] {
    const categoryLines = skillLines.list.filter(
      (sl) => sl.subcategoryId === categoryId && !EXCLUDED_SKILL_LINES.has(sl.id)
    )

    if (isAggregate) {
      return categoryLines.map(
        (sl): CompletionNode => ({
          key: sl.id,
          label: sl.name,
          children: buildCharacterChildren(sl.id, selectedCharacters),
        })
      )
    }

    return categoryLines.map((sl): CompletionNode => {
      const ranks = computeRanks(sl.id, selectedCharacters)
      return {
        key: sl.id,
        label: sl.name,
        count: ranks.count,
        total: ranks.total,
      }
    })
  }

  const items: CompletionNode[] = skillLineCategoriesSorted
    .filter((cat) => !EXCLUDED_CATEGORIES.has(cat.id))
    .map((category) => {
      let children: readonly CompletionNode[]
      if (category.id === "class") {
        children = buildClassChildren()
      } else if (category.id === "racial") {
        children = buildRacialChildren()
      } else {
        children = buildStandardChildren(category.id)
      }
      const activityCategories: ActivityCategoryId[] =
        category.id === "alliance-war"
          ? ["characters", "pvp"]
          : category.id === "craft"
            ? ["characters", "crafting"]
            : category.id === "world"
              ? ["characters", "exploration"]
              : category.id === "guild"
                ? ["characters", "quests"]
                : ["characters"]
      return {
        key: category.id,
        label: category.name,
        children: withActivityCategories(children, activityCategories),
        activityCategories,
      }
    })

  const totalChildren: CompletionNode[] | undefined =
    isAggregate && items.length > 1
      ? selectedCharacters.map((char) => {
          let count = 0
          let total = 0
          const entries = progressMap.get(char.id)
          if (entries) {
            for (const entry of entries.values()) {
              count += entry.currentRank
              total += entry.maxRank
            }
          }
          return { key: char.id, label: char.name, count, total }
        })
      : undefined

  return (
    <CompletionPanelCard
      id={id}
      title="Skill Lines"
      items={items}
      totalChildren={totalChildren}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
