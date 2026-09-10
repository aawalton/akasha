import type { SortDirection } from "akasha/design/patterns/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player-completion/activity-categories/activity-categories.module.code.ts"
import type { AccountQuestUnionProgress } from "akasha/temper/player-completion/completion-account-union-progress/completion-account-union-progress.module.code.ts"
import type { AccountCardId } from "akasha/temper/player-completion/completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/player-completion-ui/completion-panel-card/completion-panel-card.module.code.tsx"

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
  const items = withActivityCategories(
    questUnion.zones.map((zone) => ({
      key: zone.zoneName,
      label: zone.zoneName,
      children: zone.quests.map(
        (quest): CompletionNode => ({
          key: String(quest.questId),
          label: quest.name,
          count: quest.completed ? 1 : 0,
          total: 1,
        })
      ),
    })),
    "quests"
  )

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
