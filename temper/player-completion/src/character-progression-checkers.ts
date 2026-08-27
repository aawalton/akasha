import { companions } from "@temper/game-companions-core/companions-data"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { companionQuestData } from "./companion-quest-data"
import {
  CADWELL_TOTAL_COUNT,
  cadwellCompletedCount,
  cadwellCoordinatesUnder,
  isCadwellCoordinateComplete,
} from "./completion-cadwell-lookup"
import type { CompletionCardChecker } from "./completion-card-checker-types"
import { resolveCharacterAchievements } from "./completion-card-progress-achievements"
import type { CharacterCardId } from "./completion-card-registry"
import {
  isCompanionQuestPathComplete,
  sortedCompanionQuestGroups,
} from "./completion-companion-quest-actionability"
import { isCompanionRapportPathComplete } from "./completion-companion-rapport-completeness"
import { isLoreLibraryItemComplete } from "./completion-lore-library-progress"
import { isMountTrainingPathComplete } from "./completion-mount-training-completeness"
import { extractCompletedIds } from "./completion-quest-progress"
import { characterAchievementData } from "./generated/achievement-data.generated"
import { cadwellData } from "./generated/cadwell-data.generated"

export const CHARACTER_PROGRESSION_CHECKERS: Partial<
  Record<CharacterCardId, CompletionCardChecker>
> = {
  "mount-training": {
    isCardComplete(completion) {
      if (!completion) return false
      return isMountTrainingPathComplete(completion.mountTraining)
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      return isMountTrainingPathComplete(completion.mountTraining, itemPath)
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length >= 1) return null
      return {
        label: "Stat",
        options: [
          { value: "speed", label: "Speed" },
          { value: "stamina", label: "Stamina" },
          { value: "carryCapacity", label: "Carrying Capacity" },
        ],
      }
    },
  },

  "cadwells-almanac": {
    isCardComplete(completion) {
      if (!completion?.cadwell) return false
      return cadwellCompletedCount(completion) === CADWELL_TOTAL_COUNT
    },
    isItemComplete(completion, itemPath) {
      if (!completion?.cadwell || itemPath.length === 0) return false
      const coordinates = cadwellCoordinatesUnder(itemPath)
      if (coordinates.length === 0) return false
      return coordinates.every((coordinate) => isCadwellCoordinateComplete(completion, coordinate))
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Level",
          options: cadwellData.map((lv) => ({ value: lv.level, label: lv.label })),
        }
      }

      if (currentPath.length === 1) {
        const level = Number(currentPath[0])
        const lv = cadwellData.find((l) => l.level === level)
        if (!lv) return null
        return {
          label: "Zone",
          options: lv.zones.map((z) => ({ value: z.zoneIndex, label: z.name })),
        }
      }

      if (currentPath.length === 2) {
        const level = Number(currentPath[0])
        const zoneIndex = Number(currentPath[1])
        const lv = cadwellData.find((l) => l.level === level)
        const zone = lv?.zones.find((z) => z.zoneIndex === zoneIndex)
        if (!zone) return null
        return {
          label: "POI",
          options: zone.pois.map((p) => ({ value: p.poiIndex, label: p.name })),
        }
      }

      return null
    },
  },

  "lore-library-character": {
    isCardComplete(_completion) {
      return false
    },
    isItemComplete(completion, itemPath) {
      return isLoreLibraryItemComplete(completion, itemPath)
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Category",
          options: loreLibraryData.map((cat) => ({ value: cat.categoryIndex, label: cat.name })),
        }
      }

      if (currentPath.length === 1) {
        const categoryIndex = Number(currentPath[0])
        const cat = loreLibraryData.find((c) => c.categoryIndex === categoryIndex)
        if (!cat) return null
        return {
          label: "Collection",
          options: cat.collections.map((col) => ({
            value: col.collectionIndex,
            label: col.name,
          })),
        }
      }

      return null
    },
  },

  "character-achievements": {
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
        const category = characterAchievementData.find((c) => c.name === categoryName)
        if (!category) return false
        const subCategory = category.subCategories.find((s) => s.name === subCategoryName)
        if (!subCategory) return false
        return subCategory.achievements.every((a) => achievements[a.achievementId]?.completed)
      }

      if (itemPath.length === 1) {
        const categoryName = itemPath[0]
        if (typeof categoryName !== "string") return false
        const category = characterAchievementData.find((c) => c.name === categoryName)
        if (!category) return false
        return category.subCategories.every((sub) =>
          sub.achievements.every((a) => achievements[a.achievementId]?.completed)
        )
      }

      return false
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Category",
          options: characterAchievementData.map((cat) => ({
            value: cat.name,
            label: cat.name,
          })),
        }
      }

      if (currentPath.length === 1) {
        const categoryName = currentPath[0]
        if (typeof categoryName !== "string") return null
        const category = characterAchievementData.find((c) => c.name === categoryName)
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
        const category = characterAchievementData.find((c) => c.name === categoryName)
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
      return resolveCharacterAchievements(completion, itemPath)
    },
  },

  "companion-rapport-character": {
    isCardComplete(completion) {
      if (!completion) return false
      return isCompanionRapportPathComplete(completion.companionRapport)
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      return isCompanionRapportPathComplete(completion.companionRapport, itemPath)
    },
    getItemPickerLevels(completions, currentPath) {
      if (currentPath.length >= 1) return null
      const companionIds = new Set<number>()
      for (const c of completions) {
        if (!c.companionRapport) continue
        for (const id of Object.keys(c.companionRapport)) {
          companionIds.add(Number(id))
        }
      }
      if (companionIds.size === 0) return null
      const options: { value: number; label: string }[] = []
      for (const esoId of companionIds) {
        const companion = companions.list.find((c) => c.esoCompanionId === esoId)
        options.push({ value: esoId, label: companion?.name ?? `Companion ${esoId}` })
      }
      options.sort((a, b) => {
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1
        return 0
      })
      return { label: "Companion", options }
    },
  },

  "companion-quests": {
    isCardComplete(completion) {
      if (!completion) return false
      if (!completion.quests) return false
      return isCompanionQuestPathComplete(
        extractCompletedIds(completion),
        completion.companionRapport ?? {}
      )
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      const completedIds = completion.quests ? extractCompletedIds(completion) : new Set<number>()
      return isCompanionQuestPathComplete(completedIds, completion.companionRapport ?? {}, itemPath)
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Companion",
          options: sortedCompanionQuestGroups.map((g) => ({
            value: g.companionId,
            label: g.companionName,
          })),
        }
      }
      if (currentPath.length === 1) {
        const slug = String(currentPath[0])
        const group = companionQuestData.find((g) => g.companionId === slug)
        if (!group) return null
        return {
          label: "Quest",
          options: group.quests.map((q) => ({ value: q.questId, label: q.name })),
        }
      }
      return null
    },
    getItemProgress(completion, itemPath) {
      if (itemPath.length < 2) return undefined
      const slug = String(itemPath[0])
      const questId = Number(itemPath[1])
      const group = companionQuestData.find((g) => g.companionId === slug)
      const quest = group?.quests.find((q) => q.questId === questId)
      if (!quest) return undefined
      const completedIds = completion?.quests ? extractCompletedIds(completion) : new Set<number>()
      return { current: completedIds.has(questId) ? 1 : 0, total: 1 }
    },
  },
}
