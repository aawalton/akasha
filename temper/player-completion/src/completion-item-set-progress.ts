import { requireGet } from "../../../shared/utils-narrow/src/require-get"
import type { SetCategoryId } from "@temper/game-characters-equipment/sets/set-categories-data"
import { setCategories } from "@temper/game-characters-equipment/sets/set-categories-data"
import { setsAll } from "@temper/game-characters-equipment/sets/sets-all-data"
import type {
  AccountCompletion,
  ItemSetPieceProgress,
} from "@temper/game-completion/completion-types"

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

export interface ItemSetSubcategoryProgress {
  name: string
  sets: readonly ItemSetEntry[]
  children?: readonly ItemSetSubcategoryProgress[]
  completedSets: number
  totalSets: number
  slotsUnlocked: number
  totalSlots: number
}

interface ItemSetCategoryProgress {
  categoryId: SetCategoryId
  name: string
  subcategories: readonly ItemSetSubcategoryProgress[]
  completedSets: number
  totalSets: number
  slotsUnlocked: number
  totalSlots: number
}

export interface ItemSetOverallProgress {
  categories: readonly ItemSetCategoryProgress[]
  completedSets: number
  totalSets: number
  slotsUnlocked: number
  totalSlots: number
}

function aggregateSets(sets: readonly ItemSetEntry[]) {
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

export function transformItemSetProgress(
  completion: AccountCompletion | null | undefined
): ItemSetOverallProgress {
  const addonSets = completion?.itemSets

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

  const sortedCategoryIds = [...setCategories.ids].sort(
    (a, b) => setCategories.data[a].displayOrder - setCategories.data[b].displayOrder
  )

  const categories: ItemSetCategoryProgress[] = []
  let overallCompletedSets = 0
  let overallTotalSets = 0
  let overallSlotsUnlocked = 0
  let overallTotalSlots = 0

  for (const categoryId of sortedCategoryIds) {
    const rootMap = grouped.get(categoryId)
    if (!rootMap || rootMap.size === 0) continue

    const categoryName = setCategories.data[categoryId].name

    const subcategories: ItemSetSubcategoryProgress[] = []
    let catCompletedSets = 0
    let catTotalSets = 0
    let catSlotsUnlocked = 0
    let catTotalSlots = 0

    const nonEmptyRoots = [...rootMap.keys()].filter((r) => r !== "")
    const needsRootNesting = nonEmptyRoots.length > 1

    const flatSubMap = new Map<string, ItemSetEntry[]>()
    if (!needsRootNesting) {
      for (const subMap of rootMap.values()) {
        for (const [subName, sets] of subMap) {
          const existing = flatSubMap.get(subName)
          if (existing) existing.push(...sets)
          else flatSubMap.set(subName, [...sets])
        }
      }
    }

    if (!needsRootNesting && flatSubMap.size === 1 && flatSubMap.has("")) {
      const sets = requireGet(flatSubMap, "", "flatSubMap")
      sets.sort((a, b) => a.name.localeCompare(b.name))

      const agg = aggregateSets(sets)
      subcategories.push({ name: categoryName, sets, ...agg })
      catCompletedSets += agg.completedSets
      catTotalSets += agg.totalSets
      catSlotsUnlocked += agg.slotsUnlocked
      catTotalSlots += agg.totalSlots
    } else if (!needsRootNesting) {
      const sortedSubNames = [...flatSubMap.keys()].sort((a, b) => {
        if (a === "") return 1
        if (b === "") return -1
        return a.localeCompare(b)
      })

      for (const subName of sortedSubNames) {
        const sets = requireGet(flatSubMap, subName, "flatSubMap")
        sets.sort((a, b) => a.name.localeCompare(b.name))

        const agg = aggregateSets(sets)
        subcategories.push({ name: subName !== "" ? subName : "Other", sets, ...agg })
        catCompletedSets += agg.completedSets
        catTotalSets += agg.totalSets
        catSlotsUnlocked += agg.slotsUnlocked
        catTotalSlots += agg.totalSlots
      }
    } else {
      for (const [rootName, subMap] of rootMap) {
        if (NESTED_ROOTS.has(rootName)) {
          const children: ItemSetSubcategoryProgress[] = []
          let rootCompletedSets = 0
          let rootTotalSets = 0
          let rootSlotsUnlocked = 0
          let rootTotalSlots = 0

          for (const [subName, sets] of subMap) {
            sets.sort((a, b) => a.name.localeCompare(b.name))
            const agg = aggregateSets(sets)
            children.push({ name: subName !== "" ? subName : "Other", sets, ...agg })
            rootCompletedSets += agg.completedSets
            rootTotalSets += agg.totalSets
            rootSlotsUnlocked += agg.slotsUnlocked
            rootTotalSlots += agg.totalSlots
          }

          children.sort((a, b) => a.name.localeCompare(b.name))
          subcategories.push({
            name: rootName,
            sets: [],
            children,
            completedSets: rootCompletedSets,
            totalSets: rootTotalSets,
            slotsUnlocked: rootSlotsUnlocked,
            totalSlots: rootTotalSlots,
          })
          catCompletedSets += rootCompletedSets
          catTotalSets += rootTotalSets
          catSlotsUnlocked += rootSlotsUnlocked
          catTotalSlots += rootTotalSlots
        } else {
          for (const [subName, sets] of subMap) {
            sets.sort((a, b) => a.name.localeCompare(b.name))
            const agg = aggregateSets(sets)
            subcategories.push({
              name: subName !== "" ? subName : rootName !== "" ? rootName : "Other",
              sets,
              ...agg,
            })
            catCompletedSets += agg.completedSets
            catTotalSets += agg.totalSets
            catSlotsUnlocked += agg.slotsUnlocked
            catTotalSlots += agg.totalSlots
          }
        }
      }

      subcategories.sort((a, b) => a.name.localeCompare(b.name))
    }

    categories.push({
      categoryId,
      name: categoryName,
      subcategories,
      completedSets: catCompletedSets,
      totalSets: catTotalSets,
      slotsUnlocked: catSlotsUnlocked,
      totalSlots: catTotalSlots,
    })

    overallCompletedSets += catCompletedSets
    overallTotalSets += catTotalSets
    overallSlotsUnlocked += catSlotsUnlocked
    overallTotalSlots += catTotalSlots
  }

  return {
    categories,
    completedSets: overallCompletedSets,
    totalSets: overallTotalSets,
    slotsUnlocked: overallSlotsUnlocked,
    totalSlots: overallTotalSlots,
  }
}
