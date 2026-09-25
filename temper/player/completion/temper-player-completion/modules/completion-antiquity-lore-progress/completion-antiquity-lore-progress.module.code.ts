import type { AccountCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type {
  AccountAntiquityLoreProgress,
  AntiquityLoreCategoryProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"

interface AntiquityCatalogAntiquity {
  esoAntiquityId: number
  antiquityName: string
  set?: string
  totalLoreEntries: number
}

export interface AntiquityCatalogCategory {
  esoAntiquityCategoryId: number
  title: string
  antiquities: readonly AntiquityCatalogAntiquity[]
}

function acquiredLoreEntries(
  completion: AccountCompletion | null | undefined
): Map<number, number> {
  const acquired = new Map<number, number>()
  for (const [idStr, count] of Object.entries(completion?.antiquityLore ?? {})) {
    if (count > 0) acquired.set(Number(idStr), count)
  }
  return acquired
}

export function transformAntiquityLoreProgress(
  completion: AccountCompletion | null | undefined,
  antiquityCatalog: readonly AntiquityCatalogCategory[]
): AccountAntiquityLoreProgress {
  const empty: AccountAntiquityLoreProgress = {
    categories: [],
    acquiredCount: 0,
    totalCount: 0,
  }

  const acquiredMap = acquiredLoreEntries(completion)

  const categories: AntiquityLoreCategoryProgress[] = []
  let overallAcquired = 0
  let overallTotal = 0

  for (const category of antiquityCatalog) {
    let categoryAcquired = 0
    let categoryTotal = 0

    const antiquities = category.antiquities.map((antiquity) => {
      const loreEntriesAcquired = acquiredMap.get(antiquity.esoAntiquityId) ?? 0
      categoryAcquired += loreEntriesAcquired
      categoryTotal += antiquity.totalLoreEntries
      return {
        antiquityId: antiquity.esoAntiquityId,
        name: antiquity.antiquityName,
        set: antiquity.set ?? null,
        loreEntriesAcquired,
        totalLoreEntries: antiquity.totalLoreEntries,
      }
    })

    categories.push({
      categoryId: category.esoAntiquityCategoryId,
      name: category.title,
      antiquities,
      acquiredCount: categoryAcquired,
      totalCount: categoryTotal,
    })

    overallAcquired += categoryAcquired
    overallTotal += categoryTotal
  }

  if (categories.length === 0) return empty

  return {
    categories,
    acquiredCount: overallAcquired,
    totalCount: overallTotal,
  }
}
