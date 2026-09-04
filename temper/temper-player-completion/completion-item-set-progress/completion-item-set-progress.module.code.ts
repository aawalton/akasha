import { setCategories } from "@akasha/temper-characters-equipment/set-categories"
import { setsAll } from "@akasha/temper-characters-equipment/sets-all"
import type {
  AccountCompletion,
  ItemSetPieceProgress,
} from "@akasha/temper-completion/completion-progress"
import type { SetCategoryId } from "@akasha/temper-equipment/set-category-ids"
import { requireGet } from "@akasha/utils-narrow/require-get"

const ESO_CATEGORY_NAME_MAP: Record<string, SetCategoryId> = {
  dungeons: "dungeon",
  "dlc dungeons": "dungeon",
  trials: "trial",
  arenas: "arena",
  "infinite archive": "arena",
  pvp: "pvp",
  "aldmeri dominion": "overland",
  "daggerfall covenant": "overland",
  "ebonheart pact": "overland",
  "dlc zones": "overland",
  miscellaneous: "overland",
  "season of the worm cult part 1": "overland",
}

function resolveSetCategoryId(esoCategoryName: string): SetCategoryId {
  return ESO_CATEGORY_NAME_MAP[esoCategoryName.toLowerCase()] ?? "other"
}

const NESTED_ROOTS = new Set(["Infinite Archive"])

interface ItemSetEntry {
  esoSetId: number
  name: string
  slotsUnlocked: number
  totalSlots: number
  pieces: readonly ItemSetPieceProgress[]
}

interface SetTotals {
  completedSets: number
  totalSets: number
  slotsUnlocked: number
  totalSlots: number
}

export interface ItemSetSubcategoryProgress extends SetTotals {
  name: string
  sets: readonly ItemSetEntry[]
  children?: readonly ItemSetSubcategoryProgress[]
}

interface ItemSetCategoryProgress extends SetTotals {
  categoryId: SetCategoryId
  name: string
  subcategories: readonly ItemSetSubcategoryProgress[]
}

export interface ItemSetOverallProgress extends SetTotals {
  categories: readonly ItemSetCategoryProgress[]
}

const NO_TOTALS: SetTotals = {
  completedSets: 0,
  totalSets: 0,
  slotsUnlocked: 0,
  totalSlots: 0,
}

function addTotals(carried: SetTotals, next: SetTotals): SetTotals {
  return {
    completedSets: carried.completedSets + next.completedSets,
    totalSets: carried.totalSets + next.totalSets,
    slotsUnlocked: carried.slotsUnlocked + next.slotsUnlocked,
    totalSlots: carried.totalSlots + next.totalSlots,
  }
}

function aggregateSets(sets: readonly ItemSetEntry[]): SetTotals {
  let completedSets = 0
  let slotsUnlocked = 0
  let totalSlots = 0
  for (const set of sets) {
    slotsUnlocked += set.slotsUnlocked
    totalSlots += set.totalSlots
    if (set.totalSlots > 0 && set.slotsUnlocked >= set.totalSlots) completedSets++
  }
  return { completedSets, totalSets: sets.length, slotsUnlocked, totalSlots }
}

function sortedSubcategory(name: string, sets: ItemSetEntry[]): ItemSetSubcategoryProgress {
  sets.sort((a, b) => a.name.localeCompare(b.name))
  return { name, sets, ...aggregateSets(sets) }
}

function groupSetsByCategory(
  addonSets: AccountCompletion["itemSets"] | undefined
): Map<SetCategoryId, Map<string, Map<string, ItemSetEntry[]>>> {
  const grouped = new Map<SetCategoryId, Map<string, Map<string, ItemSetEntry[]>>>()

  for (const set of setsAll.list) {
    if (set.esoSetId === 0) continue

    const addonProgress = addonSets?.[set.esoSetId]

    const categoryId =
      addonProgress?.categoryName != null
        ? resolveSetCategoryId(addonProgress.categoryName)
        : set.subcategoryId

    if (categoryId === "crafted") continue

    const rootName = addonProgress?.categoryName ?? ""
    const subcategoryName = addonProgress?.subcategoryName ?? ""

    let rootMap = grouped.get(categoryId)
    if (!rootMap) {
      rootMap = new Map()
      grouped.set(categoryId, rootMap)
    }

    let subMap = rootMap.get(rootName)
    if (!subMap) {
      subMap = new Map()
      rootMap.set(rootName, subMap)
    }

    let list = subMap.get(subcategoryName)
    if (!list) {
      list = []
      subMap.set(subcategoryName, list)
    }

    if (addonProgress) {
      const rawPieces = addonProgress.pieces
      const pieces: ItemSetPieceProgress[] = Array.isArray(rawPieces)
        ? rawPieces
        : rawPieces
          ? Object.values(rawPieces)
          : []

      list.push({
        esoSetId: set.esoSetId,
        name: set.name,
        slotsUnlocked: addonProgress.slotsUnlocked,
        totalSlots: addonProgress.totalSlots,
        pieces,
      })
    } else {
      list.push({
        esoSetId: set.esoSetId,
        name: set.name,
        slotsUnlocked: 0,
        totalSlots: 0,
        pieces: [],
      })
    }
  }

  return grouped
}

function flattenRoots(
  rootMap: Map<string, Map<string, ItemSetEntry[]>>
): Map<string, ItemSetEntry[]> {
  const flatSubMap = new Map<string, ItemSetEntry[]>()
  for (const subMap of rootMap.values()) {
    for (const [subName, sets] of subMap) {
      const existing = flatSubMap.get(subName)
      if (existing) existing.push(...sets)
      else flatSubMap.set(subName, [...sets])
    }
  }
  return flatSubMap
}

function nestedRootSubcategory(
  rootName: string,
  subMap: Map<string, ItemSetEntry[]>
): ItemSetSubcategoryProgress {
  let totals = NO_TOTALS
  const children: ItemSetSubcategoryProgress[] = []

  for (const [subName, sets] of subMap) {
    const child = sortedSubcategory(subName !== "" ? subName : "Other", sets)
    children.push(child)
    totals = addTotals(totals, child)
  }

  children.sort((a, b) => a.name.localeCompare(b.name))
  return { name: rootName, sets: [], children, ...totals }
}

function subcategoriesOfCategory(
  rootMap: Map<string, Map<string, ItemSetEntry[]>>,
  categoryName: string
): readonly ItemSetSubcategoryProgress[] {
  const nonEmptyRoots = [...rootMap.keys()].filter((r) => r !== "")

  if (nonEmptyRoots.length > 1) {
    const subcategories: ItemSetSubcategoryProgress[] = []
    for (const [rootName, subMap] of rootMap) {
      if (NESTED_ROOTS.has(rootName)) {
        subcategories.push(nestedRootSubcategory(rootName, subMap))
        continue
      }
      for (const [subName, sets] of subMap) {
        subcategories.push(
          sortedSubcategory(subName !== "" ? subName : rootName !== "" ? rootName : "Other", sets)
        )
      }
    }
    subcategories.sort((a, b) => a.name.localeCompare(b.name))
    return subcategories
  }

  const flatSubMap = flattenRoots(rootMap)

  if (flatSubMap.size === 1 && flatSubMap.has("")) {
    return [sortedSubcategory(categoryName, requireGet(flatSubMap, "", "flatSubMap"))]
  }

  const sortedSubNames = [...flatSubMap.keys()].sort((a, b) => {
    if (a === "") return 1
    if (b === "") return -1
    return a.localeCompare(b)
  })

  return sortedSubNames.map((subName) =>
    sortedSubcategory(
      subName !== "" ? subName : "Other",
      requireGet(flatSubMap, subName, "flatSubMap")
    )
  )
}

export function transformItemSetProgress(
  completion: AccountCompletion | null | undefined
): ItemSetOverallProgress {
  const grouped = groupSetsByCategory(completion?.itemSets)

  const sortedCategoryIds = [...setCategories.ids].sort(
    (a, b) => setCategories.data[a].displayOrder - setCategories.data[b].displayOrder
  )

  const categories: ItemSetCategoryProgress[] = []
  let overall = NO_TOTALS

  for (const categoryId of sortedCategoryIds) {
    const rootMap = grouped.get(categoryId)
    if (!rootMap || rootMap.size === 0) continue

    const categoryName = setCategories.data[categoryId].name
    const subcategories = subcategoriesOfCategory(rootMap, categoryName)

    let categoryTotals = NO_TOTALS
    for (const subcategory of subcategories) {
      categoryTotals = addTotals(categoryTotals, subcategory)
    }

    categories.push({ categoryId, name: categoryName, subcategories, ...categoryTotals })
    overall = addTotals(overall, categoryTotals)
  }

  return { categories, ...overall }
}
