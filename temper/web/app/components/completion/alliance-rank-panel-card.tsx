import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { CompletionCharacter } from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface AllianceRankPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AllianceRankPanelCard({
  id,
  characters,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AllianceRankPanelCardProps) {
  if (characters.length === 0) return null

  const isAggregate = selectedCharacterIds.length === 0
  const filtered = isAggregate
    ? characters
    : characters.filter((c) => selectedCharacterIds.includes(c.id))

  const characterNodes: CompletionNode[] = filtered.map((c) => ({
    key: c.id,
    label: c.name,
    count: c.allianceRank,
    total: c.maxAllianceRank,
  }))

  const items: CompletionNode[] = [
    { key: "alliance-rank", label: "Alliance Rank", children: characterNodes },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title="Alliance Rank"
      items={withActivityCategories(items, "pvp")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
