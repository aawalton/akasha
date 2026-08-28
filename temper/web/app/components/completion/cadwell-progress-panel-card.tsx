import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterCadwellProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface CadwellProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  cadwellProgress: readonly CharacterCadwellProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CadwellProgressPanelCard({
  id,
  characters,
  cadwellProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: CadwellProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? cadwellProgress
    : cadwellProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const template = requireFirst(selectedProgress)

    const completedLookup = new Map<string, Set<string>>()
    for (const cp of selectedProgress) {
      const ids = new Set<string>()
      for (const level of cp.levels) {
        for (const zone of level.zones) {
          for (const poi of zone.pois) {
            if (poi.completed) ids.add(`${level.level}-${zone.zoneIndex}-${poi.poiIndex}`)
          }
        }
      }
      completedLookup.set(cp.characterId, ids)
    }

    const items: CompletionNode[] = template.levels.map((level) => ({
      key: String(level.level),
      label: level.label,
      children: level.zones.map(
        (zone): CompletionNode => ({
          key: `${level.level}-${zone.zoneIndex}`,
          label: zone.name,
          children: zone.pois.map(
            (poi): CompletionNode => ({
              key: `${level.level}-${zone.zoneIndex}-${poi.poiIndex}`,
              label: poi.name,
              children: selectedProgress.map(
                (cp): CompletionNode => ({
                  key: cp.characterId,
                  label: charNames.get(cp.characterId) ?? cp.characterId,
                  count: completedLookup
                    .get(cp.characterId)
                    ?.has(`${level.level}-${zone.zoneIndex}-${poi.poiIndex}`)
                    ? 1
                    : 0,
                  total: 1,
                })
              ),
            })
          ),
        })
      ),
    }))

    const totalChildren: CompletionNode[] = selectedProgress.map((cp) => {
      let count = 0
      let total = 0
      for (const level of cp.levels) {
        for (const zone of level.zones) {
          total += zone.pois.length
          for (const poi of zone.pois) {
            if (poi.completed) count++
          }
        }
      }
      return {
        key: cp.characterId,
        label: charNames.get(cp.characterId) ?? cp.characterId,
        count,
        total,
      }
    })

    return (
      <CompletionPanelCard
        id={id}
        title="Cadwell's Almanac"
        items={withActivityCategories(items, "quests")}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const cp = requireFirst(selectedProgress)
  const items: CompletionNode[] = cp.levels.map((level) => ({
    key: String(level.level),
    label: level.label,
    children: level.zones.map(
      (zone): CompletionNode => ({
        key: `${level.level}-${zone.zoneIndex}`,
        label: zone.name,
        children: zone.pois.map(
          (poi): CompletionNode => ({
            key: `${level.level}-${zone.zoneIndex}-${poi.poiIndex}`,
            label: poi.name,
            count: poi.completed ? 1 : 0,
            total: 1,
          })
        ),
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Cadwell's Almanac"
      items={withActivityCategories(items, "quests")}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
