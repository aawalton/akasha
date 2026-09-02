import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import { MAX_COMPANION_RAPPORT } from "@akasha/temper-player-completion/companion-rapport"
import type { CharacterCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type {
  CharacterCompanionRapportProgress,
  CompletionCharacter,
} from "@akasha/temper-player-completion/completion-ui-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { requireFirst } from "@akasha/utils-narrow/require-first"

interface CharacterCompanionRapportPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  companionRapportProgress: readonly CharacterCompanionRapportProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CharacterCompanionRapportPanelCard({
  id,
  characters,
  companionRapportProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: CharacterCompanionRapportPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? companionRapportProgress
    : companionRapportProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const rapportLookup = new Map<string, Map<string, number>>()
    for (const cp of selectedProgress) {
      for (const entry of cp.entries) {
        let charMap = rapportLookup.get(entry.companionId)
        if (!charMap) {
          charMap = new Map()
          rapportLookup.set(entry.companionId, charMap)
        }
        charMap.set(cp.characterId, entry.rapport)
      }
    }

    const template = requireFirst(selectedProgress)
    const items: CompletionNode[] = template.entries.map((entry) => ({
      key: entry.companionId,
      label: entry.name,
      children: selectedProgress.map(
        (cp): CompletionNode => ({
          key: cp.characterId,
          label: charNames.get(cp.characterId) ?? cp.characterId,
          count: rapportLookup.get(entry.companionId)?.get(cp.characterId) ?? 0,
          total: MAX_COMPANION_RAPPORT,
        })
      ),
    }))

    const totalChildren: CompletionNode[] = selectedProgress.map((cp) => {
      let count = 0
      let total = 0
      for (const entry of cp.entries) {
        count += rapportLookup.get(entry.companionId)?.get(cp.characterId) ?? 0
        total += MAX_COMPANION_RAPPORT
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
        title="Companion Rapport"
        items={withActivityCategories(items, "companions")}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const cp = requireFirst(selectedProgress)
  const items: CompletionNode[] = cp.entries.map(
    (entry): CompletionNode => ({
      key: entry.companionId,
      label: entry.name,
      count: entry.rapport,
      total: MAX_COMPANION_RAPPORT,
    })
  )

  return (
    <CompletionPanelCard
      id={id}
      title="Companion Rapport"
      items={withActivityCategories(items, "companions")}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
