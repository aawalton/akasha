export interface ItemCategoryNode {
  id: string
  name: string
  filterTypes?: readonly number[]
  itemTypes?: readonly number[]
  specializedItemTypes?: readonly number[]
  traitTypeRange?: readonly [number, number]
  equipTypes?: readonly number[]
  weaponTypes?: readonly number[]
  armorTypes?: readonly number[]
  furnitureCategoryIds?: readonly number[]
  furnitureSubcategoryIds?: readonly number[]
  itemNameContains?: string
  children?: readonly ItemCategoryNode[]
}

export interface ItemCategoryTree {
  [categoryId: string]: ItemCategoryNode | undefined
}

export interface ClassifiableItem {
  filterType: number
  itemType: number
  specializedItemType?: number
  traitType?: number
  equipType?: number
  weaponType?: number
  armorType?: number
  furnitureCategoryId?: number
  furnitureSubcategoryId?: number
  itemName?: string
}

export type CategoryPath = readonly string[]
