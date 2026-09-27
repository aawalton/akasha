import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import type { CharacterCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { completionCardTitle } from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import type { CompletionCharacter } from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { characterLevelPanelCardLevel } from "akasha/temper/web/phrase/pages/character-level-panel-card-level.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

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
  const phrase = usePhrase()
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

  const items: CompletionNode[] = [
    { key: "level", label: phrase(characterLevelPanelCardLevel.slug), children: characterNodes },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title={completionCardTitle("characters", "character-level")}
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
