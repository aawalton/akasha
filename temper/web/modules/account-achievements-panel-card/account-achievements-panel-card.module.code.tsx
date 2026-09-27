import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import { achievementNameToActivity } from "akasha/temper/player/completion/temper-player-completion/modules/activity-category-mapping/activity-category-mapping.module.code.ts"
import { accountAchievementNodes } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import type { AccountAchievementOverallProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { completionCardTitle } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
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
  const headings = achievementProgress.categories
  const items: CompletionNode[] = accountAchievementNodes(achievementProgress).map(
    (category, at) => {
      const heading = headings[at]
      const catActivity = heading?.activity ?? "other"
      return {
        key: category.key,
        label: category.label,
        activityCategories: [catActivity],
        children: childrenOf(category).map((sub, subAt): CompletionNode => {
          const subActivity = heading?.subCategories[subAt]?.activity ?? catActivity
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
    }
  )

  return (
    <CompletionPanelCard
      id={id}
      title={completionCardTitle("account", "account-achievements")}
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
