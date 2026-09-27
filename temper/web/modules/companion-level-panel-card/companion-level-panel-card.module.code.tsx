import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { CompanionCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { completionCardTitle } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import type { CompanionProgressEntry } from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"
import { companionsCompanionLevel } from "akasha/temper/player/progress/temper-completion-category/pages/companions-companion-level.temper-completion-category.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionLevelPanelCardLevel } from "akasha/temper/web/phrase/pages/companion-level-panel-card-level.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface CompanionLevelPanelCardProps {
  id?: CompanionCardId
  companionProgress: readonly CompanionProgressEntry[]
  selectedCompanionIds: readonly string[]
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CompanionLevelPanelCard({
  id,
  companionProgress,
  selectedCompanionIds,
  completionFilter,
  sortMode,
  sortDirection,
}: CompanionLevelPanelCardProps) {
  const phrase = usePhrase()
  const isAggregate = selectedCompanionIds.length === 0
  const filtered = isAggregate
    ? companionProgress
    : companionProgress.filter((c) => selectedCompanionIds.includes(c.companionId))

  const companionNodes: CompletionNode[] = filtered.flatMap((c) =>
    c.level === undefined
      ? []
      : [{ key: c.companionId, label: c.name, count: c.level, total: c.maxLevel }]
  )

  const items: CompletionNode[] = [
    { key: "level", label: phrase(companionLevelPanelCardLevel.slug), children: companionNodes },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title={completionCardTitle(companionsCompanionLevel.tab, companionsCompanionLevel.nodeId)}
      items={withActivityCategories(items, "companions")}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
