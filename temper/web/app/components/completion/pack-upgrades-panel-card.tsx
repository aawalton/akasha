import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterPackUpgradesProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface PackUpgradesPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  packUpgradesProgress: readonly CharacterPackUpgradesProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function PackUpgradesPanelCard({
  id,
  characters,
  packUpgradesProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: PackUpgradesPanelCardProps) {
  if (characters.length === 0) return null

  const isAggregate = selectedCharacterIds.length === 0
  const charNames = new Map(characters.map((c) => [c.id, c.name]))

  const filtered = isAggregate
    ? packUpgradesProgress
    : packUpgradesProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  const items: CompletionNode[] = [
    {
      key: "pack-upgrades",
      label: "Pack Upgrades",
      children: filtered.map((p) => ({
        key: p.characterId,
        label: charNames.get(p.characterId) ?? p.characterId,
        count: p.packUpgrades,
        total: p.maxPackUpgrades,
      })),
    },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title="Pack Upgrades"
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
