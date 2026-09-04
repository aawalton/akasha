import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type {
  FurnitureCatalogData,
  FurnitureCatalogSubCategory,
} from "@akasha/temper-capture-shapes/furniture-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

export function collectFurnitureCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: FurnitureCatalogData = { categories: {} }

  const numCategories = GetNumFurnitureCategories()
  for (let i = 1; i <= numCategories; i++) {
    const categoryId = GetFurnitureCategoryId(i)
    const categoryName = zo_strformat("<<1>>", GetFurnitureCategoryName(categoryId))

    const subcategories: Record<number, FurnitureCatalogSubCategory> = {}
    const numSub = GetNumFurnitureSubcategories(i)
    for (let j = 1; j <= numSub; j++) {
      const subId = GetFurnitureSubcategoryId(i, j)
      const subName = zo_strformat("<<1>>", GetFurnitureCategoryName(subId))
      subcategories[subId] = { name: subName }
    }

    catalog.categories[categoryId] = {
      name: categoryName,
      subcategories,
    }
  }

  savedVars.furnitureCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "furnitureCatalog", collect: collectFurnitureCatalog })
