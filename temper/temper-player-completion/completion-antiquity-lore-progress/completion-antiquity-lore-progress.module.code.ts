import type {
  AccountCompletion,
  AntiquityLoreProgress,
} from "@akasha/temper-completion/completion-progress"
import type {
  AccountAntiquityLoreProgress,
  AntiquityLoreCategoryProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface AntiquityCatalogAntiquity {
  esoAntiquityId: number
  antiquityName: string
  esoAntiquitySetId: number
  totalLoreEntries: number
}

export interface AntiquityCatalogCategory {
  esoAntiquityCategoryId: number
  title: string
  antiquities: readonly AntiquityCatalogAntiquity[]
}

function isExhaustiveEntry(value: unknown): value is AntiquityLoreProgress {
  return typeof value === "object" && value !== null && "name" in value
}

function acquiredLoreEntries(
  completion: AccountCompletion | null | undefined
): Map<number, number> {
  const acquired = new Map<number, number>()
  const raw = completion?.antiquityLore
  if (!raw) return acquired

  for (const [idStr, value] of Object.entries(raw)) {
    if (isExhaustiveEntry(value)) {
      if (value.loreEntriesAcquired > 0) {
        acquired.set(Number(idStr), value.loreEntriesAcquired)
      }
    } else if (typeof value === "number" && value > 0) {
      acquired.set(Number(idStr), value)
    }
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
        setId: antiquity.esoAntiquitySetId,
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
