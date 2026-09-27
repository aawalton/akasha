import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { MAX_COMPANION_RAPPORT } from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import type { CompanionCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { completionCardTitle } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import type { CompanionProgressEntry } from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"
import { companionsCompanionRapport } from "akasha/temper/player/progress/temper-completion-category/pages/companions-companion-rapport.temper-completion-category.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionRapportPanelCardRapport } from "akasha/temper/web/phrase/pages/companion-rapport-panel-card-rapport.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface CompanionRapportPanelCardProps {
  id?: CompanionCardId
  companionProgress: readonly CompanionProgressEntry[]
  selectedCompanionIds: readonly string[]
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CompanionRapportPanelCard({
  id,
  companionProgress,
  selectedCompanionIds,
  completionFilter,
  sortMode,
  sortDirection,
}: CompanionRapportPanelCardProps) {
  const phrase = usePhrase()
  if (companionProgress.length === 0) return null

  const isAggregate = selectedCompanionIds.length === 0
  const filtered = isAggregate
    ? companionProgress
    : companionProgress.filter((c) => selectedCompanionIds.includes(c.companionId))

  const companionNodes: CompletionNode[] = filtered.map((c) => ({
    key: c.companionId,
    label: c.name,
    count: c.rapport,
    total: MAX_COMPANION_RAPPORT,
  }))

  const items: CompletionNode[] = [
    {
      key: "rapport",
      label: phrase(companionRapportPanelCardRapport.slug),
      children: companionNodes,
    },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title={completionCardTitle(companionsCompanionRapport.tab, companionsCompanionRapport.nodeId)}
      items={withActivityCategories(items, "companions")}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
