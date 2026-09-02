import type { SortDirection } from "@akasha/design-patterns/sort-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import {
  ACHIEVEMENT_CATEGORY_ACTIVITY,
  ACHIEVEMENT_SUBCATEGORY_ACTIVITY,
  achievementNameToActivity,
} from "@temper/player-completion/activity-categories"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { AccountAchievementOverallProgress } from "@temper/player-completion/completion-achievement-progress"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

interface AccountAchievementsPanelCardProps {
  id?: AccountCardId
  achievementProgress: AccountAchievementOverallProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountAchievementsPanelCard({
  id,
  achievementProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountAchievementsPanelCardProps) {
  const items: CompletionNode[] = achievementProgress.categories.map((category) => {
    const catActivity = ACHIEVEMENT_CATEGORY_ACTIVITY[category.name] ?? "other"
    return {
      key: category.name,
      label: category.name,
      activityCategories: [catActivity],
      children: category.subCategories.map((sub): CompletionNode => {
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
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
