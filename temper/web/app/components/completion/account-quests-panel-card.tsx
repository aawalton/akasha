import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { AccountQuestUnionProgress } from "@temper/player-completion/completion-account-union-progress"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

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
