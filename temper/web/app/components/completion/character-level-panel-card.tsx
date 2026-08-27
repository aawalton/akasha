import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { CompletionCharacter } from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface CharacterLevelPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CharacterLevelPanelCard({
  id,
  characters,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: CharacterLevelPanelCardProps) {
  if (characters.length === 0) return null

  const isAggregate = selectedCharacterIds.length === 0
  const filtered = isAggregate
    ? characters
    : characters.filter((c) => selectedCharacterIds.includes(c.id))

  const characterNodes: CompletionNode[] = filtered.map((c) => ({
    key: c.id,
    label: c.name,
    count: c.level,
    total: c.maxLevel,
  }))

  const items: CompletionNode[] = [{ key: "level", label: "Level", children: characterNodes }]

  return (
    <CompletionPanelCard
      id={id}
      title="Character Level"
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
