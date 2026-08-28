import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterPoiProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface PoiProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  poiProgress: readonly CharacterPoiProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function PoiProgressPanelCard({
  id,
  characters,
  poiProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: PoiProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? poiProgress
    : poiProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  let items: CompletionNode[]

  if (isAggregate && selectedProgress.length > 1) {
    const template = requireFirst(selectedProgress)

    const discoveredLookup = new Map<string, Map<number, Set<number>>>()
    for (const cp of selectedProgress) {
      const zoneLookup = new Map<number, Set<number>>()
      for (const zone of cp.zones) {
        const indices = new Set<number>()
        for (const pt of zone.poiTypes) {
          for (const p of pt.pois) {
            if (p.discovered) indices.add(p.poiIndex)
          }
        }
        zoneLookup.set(zone.zoneId, indices)
      }
      discoveredLookup.set(cp.characterId, zoneLookup)
    }

    items = template.zones.map((zone) => ({
      key: String(zone.zoneId),
      label: zone.name,
      children: zone.poiTypes.map(
        (pt): CompletionNode => ({
          key: `${zone.zoneId}-${pt.poiType}`,
          label: pt.label,
          children: pt.pois.map(
            (poi): CompletionNode => ({
              key: `${zone.zoneId}-${pt.poiType}-${poi.poiIndex}`,
              label: poi.name,
              children: selectedProgress.map(
                (cp): CompletionNode => ({
                  key: cp.characterId,
                  label: charNames.get(cp.characterId) ?? cp.characterId,
                  count: discoveredLookup.get(cp.characterId)?.get(zone.zoneId)?.has(poi.poiIndex)
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
  } else {
    const cp = requireFirst(selectedProgress)
    items = cp.zones.map((zone) => ({
      key: String(zone.zoneId),
      label: zone.name,
      children: zone.poiTypes.map(
        (pt): CompletionNode => ({
          key: `${zone.zoneId}-${pt.poiType}`,
          label: pt.label,
          children: pt.pois.map(
            (poi): CompletionNode => ({
              key: String(poi.poiIndex),
              label: poi.name,
              count: poi.discovered ? 1 : 0,
              total: 1,
            })
          ),
        })
      ),
    }))
  }

  const totalChildren: CompletionNode[] | undefined =
    isAggregate && selectedProgress.length > 1
      ? selectedProgress.map((cp) => {
          let count = 0
          let total = 0
          for (const zone of cp.zones) {
            for (const pt of zone.poiTypes) {
              total += pt.pois.length
              for (const p of pt.pois) {
                if (p.discovered) count++
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
      : undefined

  return (
    <CompletionPanelCard
      id={id}
      title="Points of Interest"
      items={withActivityCategories(items, "exploration")}
      totalChildren={totalChildren}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
