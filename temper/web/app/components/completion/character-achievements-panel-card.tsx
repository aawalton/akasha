import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import {
  ACHIEVEMENT_CATEGORY_ACTIVITY,
  ACHIEVEMENT_SUBCATEGORY_ACTIVITY,
  achievementNameToActivity,
} from "@temper/player-completion/activity-categories"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { CharacterAchievementProgressResult } from "@temper/player-completion/completion-achievement-progress"
import type { CompletionCharacter } from "@temper/player-completion/completion-ui-types"
import { characterAchievementData } from "@temper/player-completion/generated/achievement-data.generated"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface CharacterAchievementsPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  achievementProgress: readonly CharacterAchievementProgressResult[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CharacterAchievementsPanelCard({
  id,
  characters,
  achievementProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: CharacterAchievementsPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? achievementProgress
    : achievementProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const progressLookup = new Map<
      string,
      Map<number, { completedSteps: number; totalSteps: number }>
    >()
    for (const cp of selectedProgress) {
      const achMap = new Map<number, { completedSteps: number; totalSteps: number }>()
      for (const cat of cp.categories) {
        for (const sub of cat.subCategories) {
          for (const a of sub.achievements) {
            achMap.set(a.achievementId, {
              completedSteps: a.completedSteps,
              totalSteps: a.totalSteps,
            })
          }
        }
      }
      progressLookup.set(cp.characterId, achMap)
    }

    const items: CompletionNode[] = characterAchievementData.map((cat) => {
      const catActivity = ACHIEVEMENT_CATEGORY_ACTIVITY[cat.name] ?? "other"
      return {
        key: cat.name,
        label: cat.name,
        activityCategories: [catActivity],
        children: cat.subCategories.map((sub): CompletionNode => {
          const isGeneral = sub.name === "General"
          const subActivity = ACHIEVEMENT_SUBCATEGORY_ACTIVITY[sub.name] ?? catActivity
          if (isGeneral) {
            return {
              key: sub.name,
              label: sub.name,
              activityCategories: [catActivity],
              children: sub.achievements.map((achievement): CompletionNode => {
                const matched = achievementNameToActivity(achievement.name)
                const achCategories = [
                  ...new Set(
                    [catActivity, matched].filter((c): c is ActivityCategoryId => c !== undefined)
                  ),
                ]
                return {
                  key: String(achievement.achievementId),
                  label: achievement.name,
                  activityCategories: achCategories,
                  children: selectedProgress.map((cp): CompletionNode => {
                    const entry = progressLookup.get(cp.characterId)?.get(achievement.achievementId)
                    const completed = entry != null && entry.completedSteps >= entry.totalSteps
                    return {
                      key: cp.characterId,
                      label: charNames.get(cp.characterId) ?? cp.characterId,
                      activityCategories: achCategories,
                      count: completed ? achievement.points : 0,
                      total: achievement.points,
                    }
                  }),
                }
              }),
            }
          }
          return {
            key: sub.name,
            label: sub.name,
            activityCategories: [subActivity],
            children: sub.achievements.map((achievement): CompletionNode => {
              const matched = achievementNameToActivity(achievement.name)
              const achCategories = [
                ...new Set(
                  [subActivity, matched].filter((c): c is ActivityCategoryId => c !== undefined)
                ),
              ]
              return {
                key: String(achievement.achievementId),
                label: achievement.name,
                activityCategories: achCategories,
                children: selectedProgress.map((cp): CompletionNode => {
                  const entry = progressLookup.get(cp.characterId)?.get(achievement.achievementId)
                  const completed = entry != null && entry.completedSteps >= entry.totalSteps
                  return {
                    key: cp.characterId,
                    label: charNames.get(cp.characterId) ?? cp.characterId,
                    activityCategories: achCategories,
                    count: completed ? achievement.points : 0,
                    total: achievement.points,
                  }
                }),
              }
            }),
          }
        }),
      }
    })

    const totalChildren: CompletionNode[] = selectedProgress.map((cp) => {
      let count = 0
      let total = 0
      const achMap = progressLookup.get(cp.characterId)
      for (const cat of characterAchievementData) {
        for (const sub of cat.subCategories) {
          for (const achievement of sub.achievements) {
            total += achievement.points
            const entry = achMap?.get(achievement.achievementId)
            if (entry && entry.completedSteps >= entry.totalSteps) {
              count += achievement.points
            }
          }
        }
      }
      return {
        key: cp.characterId,
        label: charNames.get(cp.characterId) ?? cp.characterId,
        count,
        total,
      }
    })

    return (
      <CompletionPanelCard
        id={id}
        title="Achievements"
        items={items}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const cp = requireFirst(selectedProgress)

  const items: CompletionNode[] = cp.categories.map((cat) => {
    const catActivity = ACHIEVEMENT_CATEGORY_ACTIVITY[cat.name] ?? "other"
    return {
      key: cat.name,
      label: cat.name,
      activityCategories: [catActivity],
      children: cat.subCategories.map((sub): CompletionNode => {
        const isGeneral = sub.name === "General"
        const subActivity = ACHIEVEMENT_SUBCATEGORY_ACTIVITY[sub.name] ?? catActivity
        if (isGeneral) {
          return {
            key: sub.name,
            label: sub.name,
            activityCategories: [catActivity],
            children: sub.achievements.map((achievement): CompletionNode => {
              const matched = achievementNameToActivity(achievement.name)
              const cats = [catActivity, matched].filter(
                (c): c is ActivityCategoryId => c !== undefined
              )
              return {
                key: String(achievement.achievementId),
                label: achievement.name,
                activityCategories: [...new Set(cats)],
                count:
                  achievement.completedSteps >= achievement.totalSteps ? achievement.points : 0,
                total: achievement.points,
              }
            }),
          }
        }
        return {
          key: sub.name,
          label: sub.name,
          activityCategories: [subActivity],
          children: sub.achievements.map((achievement): CompletionNode => {
            const matched = achievementNameToActivity(achievement.name)
            const cats = [subActivity, matched].filter(
              (c): c is ActivityCategoryId => c !== undefined
            )
            return {
              key: String(achievement.achievementId),
              label: achievement.name,
              activityCategories: [...new Set(cats)],
              count: achievement.completedSteps >= achievement.totalSteps ? achievement.points : 0,
              total: achievement.points,
            }
          }),
        }
      }),
    }
  })

  return (
    <CompletionPanelCard
      id={id}
      title="Achievements"
      items={items}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
