import {
  type AccountCompletion,
  unlockedCollectibleIds,
} from "akasha/temper/completion/modules/completion-progress/completion-progress.module.code.ts"
import type {
  AccountCollectiblesProgress,
  CollectibleCategoryProgress,
  CollectibleSubCategoryProgress,
} from "akasha/temper/player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"

export interface CollectibleCatalogCollectible {
  esoCollectibleId: number
  collectibleName: string
}

export interface CollectibleCatalogCategory {
  slug: string
  title: string
  esoCategoryIndex?: number
  parent?: string
  displayOrder?: number
  collectibles?: readonly CollectibleCatalogCollectible[]
}

function categoriesByParent(
  catalog: readonly CollectibleCatalogCategory[],
  slugs: ReadonlySet<string>
): Map<string, CollectibleCatalogCategory[]> {
  const byParent = new Map<string, CollectibleCatalogCategory[]>()

  for (const category of catalog) {
    const parent = category.parent
    if (!parent || !slugs.has(parent)) continue
    const siblings = byParent.get(parent)
    if (siblings) siblings.push(category)
    else byParent.set(parent, [category])
  }

  for (const siblings of byParent.values()) {
    siblings.sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
  }

  return byParent
}

function subCategoryProgress(
  category: CollectibleCatalogCategory,
  unlockedIds: ReadonlySet<number>
): CollectibleSubCategoryProgress {
  let unlockedCount = 0

  const collectibles = (category.collectibles ?? []).map((entry) => {
    const unlocked = unlockedIds.has(entry.esoCollectibleId)
    if (unlocked) unlockedCount++
    return { id: entry.esoCollectibleId, name: entry.collectibleName, unlocked }
  })

  return {
    name: category.title,
    collectibles,
    unlockedCount,
    totalCount: collectibles.length,
  }
}

export function transformCollectiblesProgress(
  completion: AccountCompletion | null | undefined,
  collectibleCatalog: readonly CollectibleCatalogCategory[]
): AccountCollectiblesProgress {
  const empty: AccountCollectiblesProgress = {
    categories: [],
    unlockedCount: 0,
    totalCount: 0,
  }
  if (collectibleCatalog.length === 0) return empty

  const unlockedIds = unlockedCollectibleIds(completion)
  const slugs = new Set(collectibleCatalog.map((category) => category.slug))
  const byParent = categoriesByParent(collectibleCatalog, slugs)

  const categories: CollectibleCategoryProgress[] = []
  let overallUnlocked = 0
  let overallTotal = 0

  for (const heading of collectibleCatalog) {
    const parent = heading.parent
    if (parent && slugs.has(parent)) continue

    const subCategories: CollectibleSubCategoryProgress[] = []
    if (heading.collectibles && heading.collectibles.length > 0) {
      subCategories.push(subCategoryProgress(heading, unlockedIds))
    }
    for (const child of byParent.get(heading.slug) ?? []) {
      subCategories.push(subCategoryProgress(child, unlockedIds))
    }

    let headingUnlocked = 0
    let headingTotal = 0
    for (const subCategory of subCategories) {
      headingUnlocked += subCategory.unlockedCount
      headingTotal += subCategory.totalCount
    }

    categories.push({
      categoryIndex: heading.esoCategoryIndex ?? 0,
      name: heading.title,
      subCategories,
      unlockedCount: headingUnlocked,
      totalCount: headingTotal,
    })

    overallUnlocked += headingUnlocked
    overallTotal += headingTotal
  }

  if (categories.length === 0) return empty

  return {
    categories,
    unlockedCount: overallUnlocked,
    totalCount: overallTotal,
  }
}
