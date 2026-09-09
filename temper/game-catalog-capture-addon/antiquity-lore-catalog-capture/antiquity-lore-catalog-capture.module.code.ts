import "akasha/temper/temper-eso-types/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-globals/eso-globals.type-declaration.d.ts"

import type { AntiquityLoreCatalogEntry } from "akasha/temper/capture-shapes/antiquity-lore-catalog/antiquity-lore-catalog.module.code.ts"
import { registerCatalogDomain } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"

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
