import { filterAndOrganizeSets } from "./set-categories-data"
import type { FilterableSelectDialogConfig } from "./set-select-types"
import { createSetSource, type SetSource } from "./set-source"
import type { SetsAll } from "./sets-all-data"

export function getMaxBonusPieceCount(set: SetsAll): number {
  if (set.bonuses.length === 0) {
    return 1
  }
  return Math.max(...set.bonuses.map((bonus) => bonus.count))
}

function sortEffects(effects: readonly string[]): readonly string[] {
  return [...effects].sort((a, b) => {
    const aLower = a.toLowerCase()
    const bLower = b.toLowerCase()

    const getPriority = (name: string) => {
      if (
        name.includes("damage") ||
        name.includes("critical") ||
        name.includes("power") ||
        name.includes("penetration")
      )
        return 1
      if (
        name.includes("magicka") ||
        name.includes("stamina") ||
        name.includes("recovery") ||
        name.includes("cost")
      )
        return 2
      if (name.includes("health") || name.includes("resistance") || name.includes("armor")) return 3
      return 4
    }

    const aPriority = getPriority(aLower)
    const bPriority = getPriority(bLower)

    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }

    return a.localeCompare(b)
  })
}

function toSetSource(set: SetsAll): SetSource | null {
  return createSetSource(set.id, getMaxBonusPieceCount(set))
}

function buildNoSetSource(): SetSource {
  const source = createSetSource("no-set", 1)
  if (source === null) {
    throw new Error("NO_SET_SOURCE: createSetSource('no-set', 1) returned null")
  }
  return source
}

export const NO_SET_SOURCE: SetSource = buildNoSetSource()

export function createSetSelectConfig(
  sets: readonly SetsAll[]
): FilterableSelectDialogConfig<SetSource> {
  const setSources: SetSource[] = sets
    .map(toSetSource)
    .filter((source): source is SetSource => source !== null)

  const organized = filterAndOrganizeSets(sets)
  const categories = organized.map((category) => ({
    id: category.type,
    label: category.type,
    items: category.sets.map(toSetSource).filter((source): source is SetSource => source !== null),
  }))

  return {
    title: "Select Equipment Set",
    searchPlaceholder: "Search equipment sets...",
    emptyMessage: "No equipment sets found.",
    categories,
    allItems: [NO_SET_SOURCE, ...setSources],
    sortEffects,
    filterItem: (item, searchTerm) => {
      const lower = searchTerm.toLowerCase()
      return item.name.toLowerCase().includes(lower)
    },
  }
}
