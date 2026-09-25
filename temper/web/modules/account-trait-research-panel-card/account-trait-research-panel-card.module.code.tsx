import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import { accountTraitResearchNodes } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-nodes/completion-account-nodes.module.code.ts"
import type { AccountTraitResearchUnionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-trait-union/completion-account-trait-union.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionFilter,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface AccountTraitResearchPanelCardProps {
  id?: AccountCardId
  traitResearchUnion: AccountTraitResearchUnionProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountTraitResearchPanelCard({
  id,
  traitResearchUnion,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountTraitResearchPanelCardProps) {
  return (
    <CompletionPanelCard
      id={id}
      title="Crafting Traits"
      items={withActivityCategories(accountTraitResearchNodes(traitResearchUnion), "crafting")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
