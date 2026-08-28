import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterLoreLibraryProgress,
  CompletionCharacter,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

interface LoreLibraryProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  loreLibraryProgress: readonly CharacterLoreLibraryProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function LoreLibraryProgressPanelCard({
  id,
  characters,
  loreLibraryProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: LoreLibraryProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? loreLibraryProgress
    : loreLibraryProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const template = requireFirst(selectedProgress)

    const knownLookup = new Map<string, Set<string>>()
    for (const cp of selectedProgress) {
      const keys = new Set<string>()
      for (const cat of cp.categories) {
        for (const col of cat.collections) {
          for (const book of col.books) {
            if (book.known)
              keys.add(`${cat.categoryIndex}:${col.collectionIndex}:${book.bookIndex}`)
          }
        }
      }
      knownLookup.set(cp.characterId, keys)
    }

    const items: CompletionNode[] = template.categories.map((cat) => ({
      key: String(cat.categoryIndex),
      label: cat.name,
      children: cat.collections.map(
        (col): CompletionNode => ({
          key: String(col.collectionIndex),
          label: col.name,
          children: col.books.map(
            (book): CompletionNode => ({
              key: String(book.bookIndex),
              label: book.name,
              children: selectedProgress.map(
                (cp): CompletionNode => ({
                  key: cp.characterId,
                  label: charNames.get(cp.characterId) ?? cp.characterId,
                  count: knownLookup
                    .get(cp.characterId)
                    ?.has(`${cat.categoryIndex}:${col.collectionIndex}:${book.bookIndex}`)
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
      for (const cat of cp.categories) {
        for (const col of cat.collections) {
          total += col.books.length
          for (const book of col.books) {
            if (book.known) count++
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
        title="Lore Library"
        items={withActivityCategories(items, "exploration")}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const cp = requireFirst(selectedProgress)
  const items: CompletionNode[] = cp.categories.map((cat) => ({
    key: String(cat.categoryIndex),
    label: cat.name,
    children: cat.collections.map(
      (col): CompletionNode => ({
        key: String(col.collectionIndex),
        label: col.name,
        children: col.books.map(
          (book): CompletionNode => ({
            key: String(book.bookIndex),
            label: book.name,
            count: book.known ? 1 : 0,
            total: 1,
          })
        ),
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Lore Library"
      items={withActivityCategories(items, "exploration")}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
