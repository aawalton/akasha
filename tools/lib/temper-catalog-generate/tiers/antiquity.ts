
import { antiquityLoreCatalogSchema } from "@temper/game-collections-antiquities-capture-host/saved-variables-schema"
import { CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

type CategoryMap = Map<
  number,
  {
    name: string
    antiquities: Map<number, { name: string; setId: number; totalLoreEntries: number }>
  }
>

function extractAntiquityDataFromSavedVars(accountWide: Record<string, unknown>): CategoryMap {
  const rawCatalog = accountWide.antiquityLoreCatalog
  if (!rawCatalog)
    throw dataError(
      "No antiquityLoreCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const antiquityCatalog = antiquityLoreCatalogSchema.parse(rawCatalog)

  const categoryMap: CategoryMap = new Map()

  for (const [idStr, entry] of Object.entries(antiquityCatalog)) {
    const antiquityId = Number(idStr)
    const { categoryId, categoryName, name, setId, totalLoreEntries } = entry
    if (name === "" || totalLoreEntries === 0) continue

    let category = categoryMap.get(categoryId)
    if (!category) {
      category = { name: categoryName, antiquities: new Map() }
      categoryMap.set(categoryId, category)
    }

    if (!category.antiquities.has(antiquityId)) {
      category.antiquities.set(antiquityId, { name, setId, totalLoreEntries })
    }
  }

  return categoryMap
}

function generateDataFile(
  categoryMap: Map<
    number,
    {
      name: string
      antiquities: Map<number, { name: string; setId: number; totalLoreEntries: number }>
    }
  >,
  apiVersion: string
): string {
  const sortedCategories = [...categoryMap.entries()].sort((a, b) => a[0] - b[0])

  let totalAntiquities = 0

  const categoryLines: string[] = []

  for (const [categoryId, cat] of sortedCategories) {
    const sortedAntiquities = [...cat.antiquities.entries()].sort((a, b) => a[0] - b[0])
    if (sortedAntiquities.length === 0) continue

    totalAntiquities += sortedAntiquities.length

    const antiquityLines = sortedAntiquities.map(
      ([antiquityId, ant]) =>
        `    { antiquityId: ${antiquityId}, name: ${JSON.stringify(ant.name)}, setId: ${ant.setId}, totalLoreEntries: ${ant.totalLoreEntries} }`
    )

    categoryLines.push(
      `  { categoryId: ${categoryId}, name: ${JSON.stringify(cat.name)}, antiquities: [\n${antiquityLines.join(",\n")}\n  ]}`
    )
  }

  return `\
/**
 * Antiquity Lore Static Data (Generated)
 *
 * ${sortedCategories.length} categories, ${totalAntiquities} antiquities
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate antiquity
 */

interface AntiquityEntry {
  antiquityId: number
  name: string
  setId: number
  totalLoreEntries: number
}

interface AntiquityCategoryEntry {
  categoryId: number
  name: string
  antiquities: readonly AntiquityEntry[]
}

export const antiquityData: AntiquityCategoryEntry[] = [
${categoryLines.join(",\n")}
]
`
}

export const tier: Tier = {
  slug: "antiquity",
  summary: "Antiquity lore entries, by category",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/antiquity-data.generated.ts",
  format: false,
  emit: (accountWide, apiVersion): TierEmit => {
    const categoryMap = extractAntiquityDataFromSavedVars(accountWide)

    return {
      content: generateDataFile(categoryMap, apiVersion),
      report: [
        `Found ${categoryMap.size} categories, ${[...categoryMap.values()].reduce((sum, c) => sum + c.antiquities.size, 0)} antiquities (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
