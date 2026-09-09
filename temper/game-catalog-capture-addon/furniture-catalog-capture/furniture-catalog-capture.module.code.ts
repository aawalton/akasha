import "akasha/temper/temper-eso-types/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"

import type {
  FurnitureCatalogData,
  FurnitureCatalogSubCategory,
} from "akasha/temper/capture-shapes/furniture-catalog/furniture-catalog.module.code.ts"
import { registerCatalogDomain } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"

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
