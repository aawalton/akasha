import { registerCatalogDomain } from "@temper/catalog-core/registry"
import { getSavedVariables } from "@temper/catalog-core/saved-variables-accessor"
import type { AntiquityLoreCatalogEntry } from "@akasha/temper-capture-shapes/antiquity-lore-catalog"
export function collectAntiquityLoreCatalog(
  this: void,
  onComplete: (this: void) => void
): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, AntiquityLoreCatalogEntry> = {}

  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    const totalLoreEntries = GetNumAntiquityLoreEntries(antiquityId)

    if (totalLoreEntries > 0) {
      const name = zo_strformat("<<1>>", GetAntiquityName(antiquityId))
      const categoryId = GetAntiquityCategoryId(antiquityId)
      const categoryName =
        categoryId !== undefined && categoryId !== 0
          ? zo_strformat("<<1>>", GetAntiquityCategoryName(categoryId))
          : ""
      const setId = GetAntiquitySetId(antiquityId)

      catalog[antiquityId] = {
        name,
        categoryId,
        categoryName,
        setId,
        totalLoreEntries,
      }
    }

    antiquityId = GetNextAntiquityId(antiquityId)
  }

  savedVars.antiquityLoreCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "antiquityLoreCatalog", collect: collectAntiquityLoreCatalog })
