import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import { accountQuestNodes } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import type { AccountQuestUnionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-union-progress/completion-account-union-progress.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionFilter,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface AccountQuestsPanelCardProps {
  id?: AccountCardId
  questUnion: AccountQuestUnionProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountQuestsPanelCard({
  id,
  questUnion,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountQuestsPanelCardProps) {
  const items = withActivityCategories(accountQuestNodes(questUnion), "quests")

  return (
    <CompletionPanelCard
      id={id}
      title="Quests"
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
