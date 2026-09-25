import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import { COLLECTIBLE_CATEGORY_TO_ACTIVITY } from "akasha/temper/player/completion/temper-player-completion/modules/activity-category-mapping/activity-category-mapping.module.code.ts"
import { accountCollectibleNodes } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { childrenOf } from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-nodes/completion-progress-nodes.module.code.ts"
import type { AccountCollectiblesProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface AccountCollectiblesPanelCardProps {
  id?: AccountCardId
  collectiblesProgress: AccountCollectiblesProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountCollectiblesPanelCard({
  id,
  collectiblesProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountCollectiblesPanelCardProps) {
  const items: CompletionNode[] = accountCollectibleNodes(collectiblesProgress).map((category) => {
    const activity = COLLECTIBLE_CATEGORY_TO_ACTIVITY[Number(category.key)] ?? "other"
    return {
      key: category.key,
      label: category.label,
      activityCategories: [activity],
      children: withActivityCategories(childrenOf(category), activity),
    }
  })

  return (
    <CompletionPanelCard
      id={id}
      title="Collectibles"
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
