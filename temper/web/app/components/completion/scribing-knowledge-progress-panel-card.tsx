import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterScribingProgress,
  CompletionCharacter,
  ScribingKnowledgeItem,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface ScribingKnowledgeProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  scribingProgress: readonly CharacterScribingProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

type ScribingCategory = "grimoires" | "focusScripts" | "signatureScripts" | "affixScripts"

const CATEGORIES: { key: ScribingCategory; label: string }[] = [
  { key: "grimoires", label: "Grimoires" },
  { key: "focusScripts", label: "Focus Scripts" },
  { key: "signatureScripts", label: "Signature Scripts" },
  { key: "affixScripts", label: "Affix Scripts" },
]

function aggregateItems(
  selectedProgress: readonly CharacterScribingProgress[],
  key: ScribingCategory
): readonly { name: string; count: number; total: number }[] {
  const itemMap = new Map<string, { knownSum: number; count: number }>()
  for (const progress of selectedProgress) {
    for (const item of progress[key]) {
      let agg = itemMap.get(item.name)
      if (!agg) {
        agg = { knownSum: 0, count: 0 }
        itemMap.set(item.name, agg)
      }
      agg.count++
      if (item.unlocked) agg.knownSum++
    }
  }

  const items: { name: string; count: number; total: number }[] = []
  for (const [name, agg] of itemMap) {
    items.push({ name, count: agg.knownSum, total: agg.count })
  }

  return items
}

function singleCharItems(
  items: readonly ScribingKnowledgeItem[]
): readonly { name: string; count: number; total: number }[] {
  return items.map((item) => ({
    name: item.name,
    count: item.unlocked ? 1 : 0,
    total: 1,
  }))
}

function buildScribingKnownLookup(
  selectedProgress: readonly CharacterScribingProgress[],
  key: ScribingCategory
): Map<string, Map<string, boolean>> {
  const lookup = new Map<string, Map<string, boolean>>()
  for (const progress of selectedProgress) {
    const charMap = new Map<string, boolean>()
    for (const item of progress[key]) {
      charMap.set(item.name, item.unlocked)
    }
    lookup.set(progress.characterId, charMap)
  }
  return lookup
}

export function ScribingKnowledgeProgressPanelCard({
  id,
  characters,
  scribingProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: ScribingKnowledgeProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? scribingProgress
    : scribingProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const isSingle = selectedProgress.length === 1
  const charNames = new Map(characters.map((c) => [c.id, c.name]))

  const items: CompletionNode[] = CATEGORIES.map((cat) => {
    if (isAggregate && !isSingle) {
      const knownLookup = buildScribingKnownLookup(selectedProgress, cat.key)
      const uniqueNames = new Map<string, true>()
      for (const progress of selectedProgress) {
        for (const item of progress[cat.key]) {
          uniqueNames.set(item.name, true)
        }
      }

      return {
        key: cat.key,
        label: cat.label,
        children: [...uniqueNames.keys()].map(
          (name): CompletionNode => ({
            key: name,
            label: name,
            children: selectedProgress.map(
              (cp): CompletionNode => ({
                key: cp.characterId,
                label: charNames.get(cp.characterId) ?? cp.characterId,
                count: knownLookup.get(cp.characterId)?.get(name) ? 1 : 0,
                total: 1,
              })
            ),
          })
        ),
      }
    }

    return {
      key: cat.key,
      label: cat.label,
      children: (isSingle
        ? singleCharItems(requireFirst(selectedProgress)[cat.key])
        : aggregateItems(selectedProgress, cat.key)
      ).map(
        (item): CompletionNode => ({
          key: item.name,
          label: item.name,
          count: item.count,
          total: item.total,
        })
      ),
    }
  })

  const totalChildren: CompletionNode[] | undefined =
    isAggregate && !isSingle
      ? selectedProgress.map((progress) => {
          let count = 0
          let total = 0
          for (const cat of CATEGORIES) {
            const catItems = progress[cat.key]
            total += catItems.length
            for (const item of catItems) {
              if (item.unlocked) count++
            }
          }
          return {
            key: progress.characterId,
            label: charNames.get(progress.characterId) ?? progress.characterId,
            count,
            total,
          }
        })
      : undefined

  return (
    <CompletionPanelCard
      id={id}
      title="Skill Scribing"
      items={withActivityCategories(items, "crafting")}
      totalChildren={totalChildren}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
