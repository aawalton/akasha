import type {
  AccountCompletion,
  AntiquityLoreProgress,
} from "@temper/game-completion/completion-types"
import type {
  AccountAntiquityLoreProgress,
  AntiquityLoreCategoryProgress,
} from "./completion-ui-types"
import { antiquityData } from "./generated/antiquity-data.generated"

function isExhaustiveEntry(value: unknown): value is AntiquityLoreProgress {
  return typeof value === "object" && value !== null && "name" in value
}

export function transformAntiquityLoreProgress(
  completion: AccountCompletion | null | undefined
): AccountAntiquityLoreProgress {
  const empty: AccountAntiquityLoreProgress = {
    categories: [],
    acquiredCount: 0,
    totalCount: 0,
  }

  const acquiredMap = new Map<number, number>()

  if (completion?.antiquityLore) {
    for (const [idStr, value] of Object.entries(completion.antiquityLore)) {
      if (isExhaustiveEntry(value)) {
        if (value.loreEntriesAcquired > 0) {
          acquiredMap.set(Number(idStr), value.loreEntriesAcquired)
        }
      } else if (typeof value === "number" && value > 0) {
        acquiredMap.set(Number(idStr), value)
      }
    }
  }

  const categories: AntiquityLoreCategoryProgress[] = []
  let overallAcquired = 0
  let overallTotal = 0

  for (const cat of antiquityData) {
    let catAcquired = 0
    let catTotal = 0

    const antiquities = cat.antiquities.map((ant) => {
      const loreEntriesAcquired = acquiredMap.get(ant.antiquityId) ?? 0
      catAcquired += loreEntriesAcquired
      catTotal += ant.totalLoreEntries
      return {
        antiquityId: ant.antiquityId,
        name: ant.name,
        setId: ant.setId,
        loreEntriesAcquired,
        totalLoreEntries: ant.totalLoreEntries,
      }
    })

    categories.push({
      categoryId: cat.categoryId,
      name: cat.name,
      antiquities,
      acquiredCount: catAcquired,
      totalCount: catTotal,
    })

    overallAcquired += catAcquired
    overallTotal += catTotal
  }

  if (categories.length === 0) return empty

  return {
    categories,
    acquiredCount: overallAcquired,
    totalCount: overallTotal,
  }
}
