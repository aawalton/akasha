import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { AccountQuestUnionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-union-progress/completion-account-union-progress.module.code.ts"
import type { CompanionCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { completionCardTitle } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import { companionsCompanionQuestsUnion } from "akasha/temper/player/progress/temper-completion-category/pages/companions-companion-quests-union.temper-completion-category.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

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
      title={completionCardTitle(
        companionsCompanionQuestsUnion.tab,
        companionsCompanionQuestsUnion.nodeId
      )}
      items={withActivityCategories(items, ["quests", "companions"])}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
