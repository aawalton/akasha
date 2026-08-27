import type { AccountCompletionCardChecker } from "./completion-card-checker-types"
import { resolveAccountAchievements } from "./completion-card-progress-achievements"
import type { AccountCardId } from "./completion-card-registry"
import { accountAchievementData } from "./generated/achievement-data.generated"

export const ACCOUNT_COMPLETION_CARD_CHECKERS: Partial<
  Record<AccountCardId, AccountCompletionCardChecker>
> = {
  "account-achievements": {
    isCardComplete(completion) {
      if (!completion) return false
      const achievements = completion.achievements
      if (!achievements) return false
      const entries = Object.values(achievements)
      if (entries.length === 0) return false
      return entries.every((a) => a.completed)
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      const achievements = completion.achievements
      if (!achievements) return false

      if (itemPath.length === 3) {
        const achievementId = Number(itemPath[2])
        return achievements[achievementId]?.completed ?? false
      }

      if (itemPath.length === 2) {
        const categoryName = itemPath[0]
        const subCategoryName = itemPath[1]
        if (typeof categoryName !== "string" || typeof subCategoryName !== "string") return false
        const category = accountAchievementData.find((c) => c.name === categoryName)
        if (!category) return false
        const subCategory = category.subCategories.find((s) => s.name === subCategoryName)
        if (!subCategory) return false
        return subCategory.achievements.every((a) => achievements[a.achievementId]?.completed)
      }

      if (itemPath.length === 1) {
        const categoryName = itemPath[0]
        if (typeof categoryName !== "string") return false
        const category = accountAchievementData.find((c) => c.name === categoryName)
        if (!category) return false
        return category.subCategories.every((sub) =>
          sub.achievements.every((a) => achievements[a.achievementId]?.completed)
        )
      }

      return false
    },
    getItemPickerLevels(currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Category",
          options: accountAchievementData.map((cat) => ({
            value: cat.name,
            label: cat.name,
          })),
        }
      }

      if (currentPath.length === 1) {
        const categoryName = currentPath[0]
        if (typeof categoryName !== "string") return null
        const category = accountAchievementData.find((c) => c.name === categoryName)
        if (!category) return null
        return {
          label: "Subcategory",
          options: category.subCategories.map((sub) => ({
            value: sub.name,
            label: sub.name,
          })),
        }
      }

      if (currentPath.length === 2) {
        const categoryName = currentPath[0]
        const subCategoryName = currentPath[1]
        if (typeof categoryName !== "string" || typeof subCategoryName !== "string") return null
        const category = accountAchievementData.find((c) => c.name === categoryName)
        if (!category) return null
        const subCategory = category.subCategories.find((s) => s.name === subCategoryName)
        if (!subCategory) return null
        return {
          label: "Achievement",
          options: subCategory.achievements.map((a) => ({
            value: a.achievementId,
            label: a.name,
          })),
        }
      }

      return null
    },
    getLeafDetailProgress(completion, itemPath) {
      return resolveAccountAchievements(completion, itemPath)
    },
  },
}
