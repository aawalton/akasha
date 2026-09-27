import { requireGet } from "akasha/code/type/narrowing/modules/require-get/require-get.module.code.ts"
import type { SetCategoryId } from "akasha/temper/catalog/gear/equipment/modules/set-category-ids/set-category-ids.module.code.ts"
import { setCategories } from "akasha/temper/player/character/characters-equipment/modules/set-categories/set-categories.module.code.ts"
import { setsAll } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import type {
  AccountCompletion,
  ItemSetPieceProgress,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"

export interface SetCategoryCatalogEntry {
  key: string
  activity?: string
  esoCategoryNames?: readonly string[]
  nestedEsoCategoryNames?: readonly string[]
}

const NO_ACTIVITY: ActivityCategoryId = "other"

const NO_CATEGORY: SetCategoryId = "other"

type CategoryOfName = ReadonlyMap<string, SetCategoryId>

function categoriesByEsoName(catalog: readonly SetCategoryCatalogEntry[]): CategoryOfName {
  const byName = new Map<string, SetCategoryId>()
  for (const entry of catalog) {
    for (const name of entry.esoCategoryNames ?? []) {
      byName.set(name.toLowerCase(), entry.key as SetCategoryId)
    }
  }
  return byName
}

function resolveSetCategoryId(byName: CategoryOfName, esoCategoryName: string): SetCategoryId {
  return byName.get(esoCategoryName.toLowerCase()) ?? NO_CATEGORY
}

function nestedRootsOf(catalog: readonly SetCategoryCatalogEntry[]): ReadonlySet<string> {
  const nested = new Set<string>()
  for (const entry of catalog) {
    for (const name of entry.nestedEsoCategoryNames ?? []) nested.add(name)
  }
  return nested
}

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
  activity: ActivityCategoryId
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
  addonSets: AccountCompletion["itemSets"] | undefined,
  byName: CategoryOfName
): Map<SetCategoryId, Map<string, Map<string, ItemSetEntry[]>>> {
  const grouped = new Map<SetCategoryId, Map<string, Map<string, ItemSetEntry[]>>>()

  for (const set of setsAll().list) {
    if (set.esoSetId === 0) continue

    const addonProgress = addonSets?.[set.esoSetId]

    const categoryId =
      addonProgress?.categoryName != null
        ? resolveSetCategoryId(byName, addonProgress.categoryName)
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
      const pieces: ItemSetPieceProgress[] = addonProgress.pieces ?? []

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
  categoryName: string,
  nestedRoots: ReadonlySet<string>
): readonly ItemSetSubcategoryProgress[] {
  const nonEmptyRoots = [...rootMap.keys()].filter((r) => r !== "")

  if (nonEmptyRoots.length > 1) {
    const subcategories: ItemSetSubcategoryProgress[] = []
    for (const [rootName, subMap] of rootMap) {
      if (nestedRoots.has(rootName)) {
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
  completion: AccountCompletion | null | undefined,
  setCategoryCatalog: readonly SetCategoryCatalogEntry[]
): ItemSetOverallProgress {
  const grouped = groupSetsByCategory(completion?.itemSets, categoriesByEsoName(setCategoryCatalog))
  const activities = new Map<string, ActivityCategoryId>()
  for (const entry of setCategoryCatalog) {
    if (entry.activity !== undefined)
      activities.set(entry.key, entry.activity as ActivityCategoryId)
  }

  const nestedRoots = nestedRootsOf(setCategoryCatalog)

  const categories: ItemSetCategoryProgress[] = []
  let overall = NO_TOTALS

  for (const category of setCategories()) {
    const categoryId = category.id
    const rootMap = grouped.get(categoryId)
    if (!rootMap || rootMap.size === 0) continue

    const categoryName = category.name
    const subcategories = subcategoriesOfCategory(rootMap, categoryName, nestedRoots)

    let categoryTotals = NO_TOTALS
    for (const subcategory of subcategories) {
      categoryTotals = addTotals(categoryTotals, subcategory)
    }

    categories.push({
      categoryId,
      name: categoryName,
      activity: activities.get(categoryId) ?? NO_ACTIVITY,
      subcategories,
      ...categoryTotals,
    })
    overall = addTotals(overall, categoryTotals)
  }

  return { categories, ...overall }
}
