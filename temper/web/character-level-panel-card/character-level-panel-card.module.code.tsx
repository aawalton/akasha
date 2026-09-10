import type { SortDirection } from "akasha/design/patterns/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player-completion/activity-categories/activity-categories.module.code.ts"
import type { CharacterCardId } from "akasha/temper/player-completion/completion-card-registry/completion-card-registry.module.code.ts"
import type { CompletionCharacter } from "akasha/temper/player-completion/completion-ui-types/completion-ui-types.module.code.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/player-completion-ui/completion-panel-card/completion-panel-card.module.code.tsx"

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
