import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterQuestProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface QuestProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  questProgress: readonly CharacterQuestProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function QuestProgressPanelCard({
  id,
  characters,
  questProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: QuestProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? questProgress
    : questProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const template = requireFirst(selectedProgress)

    const completedLookup = new Map<string, Set<number>>()
    for (const cp of selectedProgress) {
      const ids = new Set<number>()
      for (const zone of cp.zones) {
        for (const q of zone.quests) {
          if (q.completed) ids.add(q.questId)
        }
      }
      completedLookup.set(cp.characterId, ids)
    }

    const items: CompletionNode[] = template.zones.map((zone) => ({
      key: zone.zoneName,
      label: zone.zoneName,
      children: zone.quests.map(
        (quest): CompletionNode => ({
          key: String(quest.questId),
          label: quest.name,
          children: selectedProgress.map(
            (cp): CompletionNode => ({
              key: cp.characterId,
              label: charNames.get(cp.characterId) ?? cp.characterId,
              count: completedLookup.get(cp.characterId)?.has(quest.questId) ? 1 : 0,
              total: 1,
            })
          ),
        })
      ),
    }))

    const totalChildren: CompletionNode[] = selectedProgress.map((cp) => {
      let count = 0
      let total = 0
      for (const zone of cp.zones) {
        total += zone.quests.length
        for (const q of zone.quests) {
          if (q.completed) count++
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
        title="Quests"
        items={withActivityCategories(items, "quests")}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const cp = requireFirst(selectedProgress)
  const items: CompletionNode[] = cp.zones.map((zone) => ({
    key: zone.zoneName,
    label: zone.zoneName,
    children: zone.quests.map(
      (quest): CompletionNode => ({
        key: String(quest.questId),
        label: quest.name,
        count: quest.completed ? 1 : 0,
        total: 1,
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Quests"
      items={withActivityCategories(items, "quests")}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
