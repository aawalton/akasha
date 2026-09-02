
import type { AchievementCatalogEntry } from "@akasha/temper-capture-shapes/achievement-catalog"
import { achievementCatalogSchema } from "@temper/game-completion-capture-host/achievement-catalog-schema"
import { CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

interface CatalogSubCategory {
  name: string
  achievements: Record<number, AchievementCatalogEntry>
}

interface CatalogCategory {
  name: string
  subCategories: Record<string, CatalogSubCategory>
}

interface CatalogData {
  categories: Record<number, CatalogCategory>
}

function extractCatalogFromSavedVars(accountWide: Record<string, unknown>): CatalogData {
  if (accountWide.achievementCatalog === undefined)
    throw dataError(
      "No achievementCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const parsed = achievementCatalogSchema.parse(accountWide.achievementCatalog)

  const categories: Record<number, CatalogCategory> = {}

  for (const [catIdxStr, cat] of Object.entries(parsed.categories)) {
    const catIdx = Number(catIdxStr)
    const subCategories: Record<string, CatalogSubCategory> = {}

    if (cat.generalSubCategory && Object.keys(cat.generalSubCategory.achievements).length > 0) {
      subCategories.general = {
        name: cat.generalSubCategory.name,
        achievements: cat.generalSubCategory.achievements,
      }
    }

    for (const [subIdx, sub] of Object.entries(cat.subCategories)) {
      if (Object.keys(sub.achievements).length > 0) {
        subCategories[subIdx] = { name: sub.name, achievements: sub.achievements }
      }
    }

    if (Object.keys(subCategories).length > 0) {
      categories[catIdx] = { name: cat.name, subCategories }
    }
  }

  return { categories }
}

interface AchievementEntry {
  achievementId: number
  name: string
  points: number
  totalSteps: number
}

interface SubCategoryData {
  name: string
  achievements: readonly AchievementEntry[]
}

interface CategoryData {
  name: string
  subCategories: readonly SubCategoryData[]
}

function buildCategoryHierarchy(
  catalog: CatalogData,
  filter: "account" | "character"
): readonly CategoryData[] {
  const result: CategoryData[] = []

  const sortedCatIndices = Object.keys(catalog.categories)
    .map(Number)
    .sort((a, b) => a - b)

  for (const catIdx of sortedCatIndices) {
    const cat = catalog.categories[catIdx]
    if (cat === undefined) continue
    const subCategories: SubCategoryData[] = []

    const sortedSubKeys = Object.keys(cat.subCategories).sort((a, b) => {
      if (a === "general") return -1
      if (b === "general") return 1
      return Number(a) - Number(b)
    })

    for (const subKey of sortedSubKeys) {
      const sub = cat.subCategories[subKey]
      if (sub === undefined) continue
      const achievements: AchievementEntry[] = []

      for (const [achIdStr, ach] of Object.entries(sub.achievements)) {
        const isCharSpecific = ach.isCharacterSpecific
        if (filter === "account" && isCharSpecific) continue
        if (filter === "character" && !isCharSpecific) continue

        achievements.push({
          achievementId: Number(achIdStr),
          name: ach.name,
          points: ach.points,
          totalSteps: ach.totalSteps,
        })
      }

      if (achievements.length > 0) {
        achievements.sort((a, b) => a.achievementId - b.achievementId)
        subCategories.push({
          name: sub.name,
          achievements,
        })
      }
    }

    if (subCategories.length > 0) {
      result.push({
        name: cat.name,
        subCategories,
      })
    }
  }

  return result
}

function formatCategoryArray(categories: readonly CategoryData[]): string {
  const categoryLines: string[] = []

  for (const cat of categories) {
    const subCategoryLines: string[] = []

    for (const sub of cat.subCategories) {
      const achievementLines = sub.achievements.map(
        (a) =>
          `      { achievementId: ${a.achievementId}, name: ${JSON.stringify(a.name)}, points: ${a.points}, totalSteps: ${a.totalSteps} }`
      )

      subCategoryLines.push(
        `    { name: ${JSON.stringify(sub.name)}, achievements: [\n${achievementLines.join(",\n")}\n    ]}`
      )
    }

    categoryLines.push(
      `  { name: ${JSON.stringify(cat.name)}, subCategories: [\n${subCategoryLines.join(",\n")}\n  ]}`
    )
  }

  return categoryLines.join(",\n")
}

function countAchievements(categories: readonly CategoryData[]): number {
  let count = 0
  for (const cat of categories) {
    for (const sub of cat.subCategories) {
      count += sub.achievements.length
    }
  }
  return count
}

function generateDataFile(
  accountCategories: readonly CategoryData[],
  characterCategories: readonly CategoryData[],
  apiVersion: string
): string {
  const accountCount = countAchievements(accountCategories)
  const characterCount = countAchievements(characterCategories)

  return `\
/**
 * Achievement Static Data (Generated)
 *
 * Account: ${accountCategories.length} categories, ${accountCount} achievements
 * Character: ${characterCategories.length} categories, ${characterCount} achievements
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate achievement
 */

interface AchievementEntry {
  achievementId: number
  name: string
  points: number
  totalSteps: number
}

interface AchievementSubCategoryEntry {
  name: string
  achievements: readonly AchievementEntry[]
}

interface AchievementCategoryEntry {
  name: string
  subCategories: readonly AchievementSubCategoryEntry[]
}

export const accountAchievementData: AchievementCategoryEntry[] = [
${formatCategoryArray(accountCategories)}
]

export const characterAchievementData: AchievementCategoryEntry[] = [
${formatCategoryArray(characterCategories)}
]
`
}

export const tier: Tier = {
  slug: "achievement",
  summary: "Achievements, split into account-wide and character-specific",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/achievement-data.generated.ts",
  format: true,
  emit: (accountWide, apiVersion): TierEmit => {
    const catalog = extractCatalogFromSavedVars(accountWide)

    const totalAchievements = Object.values(catalog.categories).reduce(
      (sum, cat) =>
        sum +
        Object.values(cat.subCategories).reduce(
          (subSum, sub) => subSum + Object.keys(sub.achievements).length,
          0
        ),
      0
    )

    const accountCategories = buildCategoryHierarchy(catalog, "account")
    const characterCategories = buildCategoryHierarchy(catalog, "character")

    const accountCount = countAchievements(accountCategories)
    const characterCount = countAchievements(characterCategories)

    return {
      content: generateDataFile(accountCategories, characterCategories, apiVersion),
      report: [
        `Found catalog with ${Object.keys(catalog.categories).length} categories, ${totalAchievements} achievements (apiVersion: ${apiVersion})`,
        `Account: ${accountCount} achievements, Character: ${characterCount} achievements`,
      ],
      warnings:
        accountCount === 0
          ? ["Warning: Found 0 account achievements — catalog may be incomplete"]
          : [],
    }
  },
}
