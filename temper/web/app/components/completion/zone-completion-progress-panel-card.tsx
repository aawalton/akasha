import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterZoneCompletionProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface ZoneCompletionProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  zoneProgress: readonly CharacterZoneCompletionProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function ZoneCompletionProgressPanelCard({
  id,
  characters,
  zoneProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: ZoneCompletionProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? zoneProgress
    : zoneProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const template = requireFirst(selectedProgress)

    const completedLookup = new Map<string, Map<number, Map<number, Set<number>>>>()
    for (const cp of selectedProgress) {
      const zoneLookup = new Map<number, Map<number, Set<number>>>()
      for (const zone of cp.zones) {
        const typeLookup = new Map<number, Set<number>>()
        for (const ct of zone.completionTypes) {
          const indices = new Set<number>()
          for (const a of ct.activities) {
            if (a.completed) indices.add(a.activityIndex)
          }
          typeLookup.set(ct.completionType, indices)
        }
        zoneLookup.set(zone.zoneId, typeLookup)
      }
      completedLookup.set(cp.characterId, zoneLookup)
    }

    const items: CompletionNode[] = template.zones.map((zone) => ({
      key: String(zone.zoneId),
      label: zone.name,
      children: zone.completionTypes.map(
        (ct): CompletionNode => ({
          key: `${zone.zoneId}-${ct.completionType}`,
          label: ct.label,
          children: ct.activities.map(
            (activity): CompletionNode => ({
              key: `${zone.zoneId}-${ct.completionType}-${activity.activityIndex}`,
              label: activity.name,
              children: selectedProgress.map(
                (cp): CompletionNode => ({
                  key: cp.characterId,
                  label: charNames.get(cp.characterId) ?? cp.characterId,
                  count: completedLookup
                    .get(cp.characterId)
                    ?.get(zone.zoneId)
                    ?.get(ct.completionType)
                    ?.has(activity.activityIndex)
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
      for (const zone of cp.zones) {
        for (const ct of zone.completionTypes) {
          total += ct.activities.length
          for (const a of ct.activities) {
            if (a.completed) count++
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
        title="Zone Completion"
        items={withActivityCategories(items, "exploration")}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const cp = requireFirst(selectedProgress)
  const items: CompletionNode[] = cp.zones.map((zone) => ({
    key: String(zone.zoneId),
    label: zone.name,
    children: zone.completionTypes.map(
      (ct): CompletionNode => ({
        key: `${zone.zoneId}-${ct.completionType}`,
        label: ct.label,
        children: ct.activities.map(
          (activity): CompletionNode => ({
            key: String(activity.activityIndex),
            label: activity.name,
            count: activity.completed ? 1 : 0,
            total: 1,
          })
        ),
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Zone Completion"
      items={withActivityCategories(items, "exploration")}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
