import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterMountTrainingProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface MountTrainingPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  mountTrainingProgress: readonly CharacterMountTrainingProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function MountTrainingPanelCard({
  id,
  characters,
  mountTrainingProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: MountTrainingPanelCardProps) {
  if (characters.length === 0) return null

  const isAggregate = selectedCharacterIds.length === 0
  const charNames = new Map(characters.map((c) => [c.id, c.name]))

  const filtered = isAggregate
    ? mountTrainingProgress
    : mountTrainingProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  const items: CompletionNode[] = [
    {
      key: "carrying-capacity",
      label: "Carrying Capacity",
      children: filtered.map((p) => ({
        key: p.characterId,
        label: charNames.get(p.characterId) ?? p.characterId,
        count: p.carryCapacity,
        total: p.maxCarryCapacity,
      })),
    },
    {
      key: "speed",
      label: "Speed",
      children: filtered.map((p) => ({
        key: p.characterId,
        label: charNames.get(p.characterId) ?? p.characterId,
        count: p.speed,
        total: p.maxSpeed,
      })),
    },
    {
      key: "stamina",
      label: "Stamina",
      children: filtered.map((p) => ({
        key: p.characterId,
        label: charNames.get(p.characterId) ?? p.characterId,
        count: p.stamina,
        total: p.maxStamina,
      })),
    },
  ]

  const totalChildren: CompletionNode[] | undefined =
    isAggregate && filtered.length > 1
      ? filtered.map((p) => ({
          key: p.characterId,
          label: charNames.get(p.characterId) ?? p.characterId,
          count: p.carryCapacity + p.speed + p.stamina,
          total: p.maxCarryCapacity + p.maxSpeed + p.maxStamina,
        }))
      : undefined

  return (
    <CompletionPanelCard
      id={id}
      title="Mount Training"
      items={withActivityCategories(items, "characters")}
      totalChildren={totalChildren}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
