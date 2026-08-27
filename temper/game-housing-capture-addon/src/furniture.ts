import { registerCatalogDomain } from "@temper/catalog-core/registry"
import { getSavedVariables } from "@temper/catalog-core/saved-variables-accessor"
import type {
  FurnitureCatalogData,
  FurnitureCatalogSubCategory,
} from "@temper/game-housing-capture-core/furniture-catalog"
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
