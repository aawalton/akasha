import "@akasha/temper-eso-types/eso-api-2"
import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"

import type { AchievementCatalogData } from "@akasha/temper-capture-shapes/achievement-catalog"
import { runBatched } from "@akasha/temper-capture-writer/run-batched"
import { BATCH_DELAY, BATCH_SIZE } from "@akasha/temper-catalog-core/batch-config"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"
import { requireNumericKey } from "@akasha/temper-narrow/require-numeric-key"
import { requireDefined } from "@akasha/utils-narrow/require-defined"

export interface AchievementWorkItem {
  categoryIndex: number
  subCategoryIndex: number | undefined
  subCategoryName: string
  achievementId: number
}

export function collectAchievementCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: AchievementCatalogData = { categories: {} }
  const seen: Record<number, boolean> = {}

  const workItems: AchievementWorkItem[] = []

  for (let categoryIndex = 1; categoryIndex <= GetNumAchievementCategories(); categoryIndex++) {
    const [rawCategoryName, numSubCategories, numGeneralAchievements] =
      GetAchievementCategoryInfo(categoryIndex)
    const categoryName = zo_strformat("<<1>>", rawCategoryName)

    catalog.categories[categoryIndex] = {
      name: categoryName,
      subCategories: {},
    }

    if (numGeneralAchievements > 0) {
      const baseIds = ZO_GetAchievementIds(categoryIndex, undefined, numGeneralAchievements, false)
      for (const id of baseIds) {
        let currentId = GetFirstAchievementInLine(id)
        currentId = currentId !== 0 ? currentId : id
        while (currentId !== 0) {
          if (!seen[currentId]) {
            seen[currentId] = true
            workItems.push({
              categoryIndex,
              subCategoryIndex: undefined,
              subCategoryName: "General",
              achievementId: currentId,
            })
          }
          currentId = GetNextAchievementInLine(currentId)
        }
      }
    }

    for (let subIndex = 1; subIndex <= numSubCategories; subIndex++) {
      const [rawSubName, numAchievements] = GetAchievementSubCategoryInfo(categoryIndex, subIndex)
      const subName = zo_strformat("<<1>>", rawSubName)
      if (numAchievements <= 0) continue

      const baseIds = ZO_GetAchievementIds(categoryIndex, subIndex, numAchievements, false)
      for (const id of baseIds) {
        let currentId = GetFirstAchievementInLine(id)
        currentId = currentId !== 0 ? currentId : id
        while (currentId !== 0) {
          if (!seen[currentId]) {
            seen[currentId] = true
            workItems.push({
              categoryIndex,
              subCategoryIndex: subIndex,
              subCategoryName: subName !== "" ? subName : `Subcategory ${subIndex}`,
              achievementId: currentId,
            })
          }
          currentId = GetNextAchievementInLine(currentId)
        }
      }
    }
  }

  runBatched<AchievementWorkItem>({
    items: workItems,
    batchSize: BATCH_SIZE,
    batchDelay: BATCH_DELAY,
    process: function (this: void, item: AchievementWorkItem): undefined {
      const categoryEntry = catalog.categories[item.categoryIndex]
      if (!categoryEntry) return

      const [rawAchName, , points] = GetAchievementInfo(item.achievementId)
      const achName = zo_strformat("<<1>>", rawAchName)
      const totalSteps = GetAchievementNumCriteria(item.achievementId)
      const isCharacterSpecific = GetAchievementPersistenceLevel(item.achievementId) === 0

      const entry = {
        name: achName,
        points,
        totalSteps,
        isCharacterSpecific,
      }

      if (item.subCategoryIndex === undefined) {
        if (!categoryEntry.generalSubCategory) {
          categoryEntry.generalSubCategory = {
            name: item.subCategoryName,
            achievements: {},
          }
        }
        categoryEntry.generalSubCategory.achievements[item.achievementId] = entry
      } else {
        if (!categoryEntry.subCategories[item.subCategoryIndex]) {
          categoryEntry.subCategories[item.subCategoryIndex] = {
            name: item.subCategoryName,
            achievements: {},
          }
        }
        requireDefined(
          categoryEntry.subCategories[item.subCategoryIndex],
          "achievement subCategory"
        ).achievements[item.achievementId] = entry
      }
    },
    onComplete: function (this: void): undefined {
      for (const [key, categoryEntry] of Object.entries(catalog.categories)) {
        if (
          Object.keys(categoryEntry.subCategories).length === 0 &&
          !categoryEntry.generalSubCategory
        ) {
          delete catalog.categories[requireNumericKey(key, "achievement category")]
        }
      }
      savedVars.achievementCatalog = catalog
      onComplete()
    },
  })
}
registerCatalogDomain({ key: "achievementCatalog", collect: collectAchievementCatalog })
