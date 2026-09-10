import type { AchievementTallyCategory } from "../completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type {
  AccountCompletionCardChecker,
  ItemProgress,
} from "../completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { AccountCardId } from "../completion-card-registry/completion-card-registry.module.code.ts"

function achievementIdsUnder(
  catalog: readonly AchievementTallyCategory[],
  itemPath: readonly (string | number)[]
): readonly number[] | null {
  if (itemPath.length === 0) {
    const all: number[] = []
    for (const category of catalog) {
      for (const sub of category.subCategories) {
        for (const achievement of sub.achievements) all.push(achievement.esoAchievementId)
      }
    }
    return all
  }

  const categoryName = itemPath[0]
  if (typeof categoryName !== "string") return null
  const category = catalog.find((entry) => entry.name === categoryName)
  if (!category) return null

  if (itemPath.length === 1) {
    const all: number[] = []
    for (const sub of category.subCategories) {
      for (const achievement of sub.achievements) all.push(achievement.esoAchievementId)
    }
    return all
  }

  const subCategoryName = itemPath[1]
  if (typeof subCategoryName !== "string") return null
  const subCategory = category.subCategories.find((entry) => entry.name === subCategoryName)
  if (!subCategory) return null

  if (itemPath.length === 2) {
    return subCategory.achievements.map((achievement) => achievement.esoAchievementId)
  }

  if (itemPath.length === 3) {
    const achievementId = Number(itemPath[2])
    const found = subCategory.achievements.find(
      (achievement) => achievement.esoAchievementId === achievementId
    )
    if (!found) return null
    return [found.esoAchievementId]
  }

  return null
}

export function buildAccountAchievementsChecker(
  catalog: readonly AchievementTallyCategory[]
): AccountCompletionCardChecker {
  return {
    isCardComplete(completion) {
      if (!completion) return false
      const achievements = completion.achievements
      if (!achievements) return false
      const entries = Object.values(achievements)
      if (entries.length === 0) return false
      return entries.every((achievement) => achievement.completed)
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      const achievements = completion.achievements
      if (!achievements) return false
      const ids = achievementIdsUnder(catalog, itemPath)
      if (ids === null || ids.length === 0) return false
      return ids.every((id) => achievements[id]?.completed ?? false)
    },
    getItemPickerLevels(currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Category",
          options: catalog.map((category) => ({ value: category.name, label: category.name })),
        }
      }

      const categoryName = currentPath[0]
      if (typeof categoryName !== "string") return null
      const category = catalog.find((entry) => entry.name === categoryName)
      if (!category) return null

      if (currentPath.length === 1) {
        return {
          label: "Subcategory",
          options: category.subCategories.map((sub) => ({ value: sub.name, label: sub.name })),
        }
      }

      if (currentPath.length === 2) {
        const subCategoryName = currentPath[1]
        if (typeof subCategoryName !== "string") return null
        const subCategory = category.subCategories.find((entry) => entry.name === subCategoryName)
        if (!subCategory) return null
        return {
          label: "Achievement",
          options: subCategory.achievements.map((achievement) => ({
            value: achievement.esoAchievementId,
            label: achievement.name,
          })),
        }
      }

      return null
    },
    getLeafDetailProgress(completion, itemPath): ItemProgress | undefined {
      if (itemPath.length !== 3) return undefined
      const ids = achievementIdsUnder(catalog, itemPath)
      if (ids === null || ids.length === 0) return undefined
      const achievements = completion?.achievements
      const id = ids[0]
      if (id === undefined) return undefined
      return { current: achievements?.[id]?.completed ? 1 : 0, total: 1 }
    },
  }
}

export const ACCOUNT_COMPLETION_CARD_CHECKERS: Partial<
  Record<AccountCardId, AccountCompletionCardChecker>
> = {}
