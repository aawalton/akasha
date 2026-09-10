import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { requireFirst } from "@akasha/utils/narrow/require-first"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/player-completion-ui/completion-panel-card/completion-panel-card.module.code.tsx"
import type { ActivityCategoryId } from "akasha/temper/temper-player-completion/activity-categories/activity-categories.module.code.ts"
import type { CharacterCardId } from "akasha/temper/temper-player-completion/completion-card-registry/completion-card-registry.module.code.ts"
import type {
  CharacterQuestProgress,
  CompletionCharacter,
} from "akasha/temper/temper-player-completion/completion-ui-types/completion-ui-types.module.code.ts"

interface CompanionQuestsPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  questProgress: readonly CharacterQuestProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CompanionQuestsPanelCard({
  id,
  characters,
  questProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: CompanionQuestsPanelCardProps) {
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
            (one): CompletionNode => ({
              key: one.characterId,
              label: charNames.get(one.characterId) ?? one.characterId,
              count: completedLookup.get(one.characterId)?.has(quest.questId) ? 1 : 0,
              total: 1,
            })
          ),
        })
      ),
    }))

    const totalChildren: CompletionNode[] = selectedProgress.map((one) => {
      let count = 0
      let total = 0
      for (const zone of one.zones) {
        total += zone.quests.length
        for (const q of zone.quests) {
          if (q.completed) count++
        }
      }
      return {
        key: one.characterId,
        label: charNames.get(one.characterId) ?? one.characterId,
        count,
        total,
      }
    })

    return (
      <CompletionPanelCard
        id={id}
        title="Companion Quests"
        items={withActivityCategories(items, ["quests", "companions"])}
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
      title="Companion Quests"
      items={withActivityCategories(items, ["quests", "companions"])}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
