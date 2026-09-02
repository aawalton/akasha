import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { AccountQuestUnionProgress } from "@akasha/temper-player-completion/completion-account-union-progress"
import type { CompanionCardId } from "@akasha/temper-player-completion/completion-card-registry"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface CompanionQuestsUnionPanelCardProps {
  id?: CompanionCardId
  questUnion: AccountQuestUnionProgress
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CompanionQuestsUnionPanelCard({
  id,
  questUnion,
  completionFilter,
  sortMode,
  sortDirection,
}: CompanionQuestsUnionPanelCardProps) {
  const items: CompletionNode[] = questUnion.zones.map((zone) => ({
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
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Companion Quests"
      items={withActivityCategories(items, ["quests", "companions"])}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
