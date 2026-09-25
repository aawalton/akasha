import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import {
  ACHIEVEMENT_CATEGORY_ACTIVITY,
  ACHIEVEMENT_SUBCATEGORY_ACTIVITY,
  achievementNameToActivity,
} from "akasha/temper/player/completion/temper-player-completion/modules/activity-category-mapping/activity-category-mapping.module.code.ts"
import { accountAchievementNodes } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import type { AccountAchievementOverallProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { childrenOf } from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-nodes/completion-progress-nodes.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

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
  const items: CompletionNode[] = accountAchievementNodes(achievementProgress).map((category) => {
    const catActivity = ACHIEVEMENT_CATEGORY_ACTIVITY[category.label] ?? "other"
    return {
      key: category.key,
      label: category.label,
      activityCategories: [catActivity],
      children: childrenOf(category).map((sub): CompletionNode => {
        const subActivity =
          sub.label === "General"
            ? catActivity
            : (ACHIEVEMENT_SUBCATEGORY_ACTIVITY[sub.label] ?? catActivity)
        return {
          key: sub.key,
          label: sub.label,
          activityCategories: [subActivity],
          children: childrenOf(sub).map((achievement): CompletionNode => {
            const matched = achievementNameToActivity(achievement.label)
            const cats = [subActivity, matched].filter(
              (c): c is ActivityCategoryId => c !== undefined
            )
            return { ...achievement, activityCategories: [...new Set(cats)] }
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
