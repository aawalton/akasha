import type {
  ItemCategoryNode,
  ItemCategoryRoots,
} from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"
import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export type ItemCategoryRow = Pick<
  TemperItemCategoryTree,
  | "slug"
  | "title"
  | "parent"
  | "displayOrder"
  | "priorityOrder"
  | "filterTypes"
  | "itemTypes"
  | "specializedItemTypes"
  | "traitTypeRange"
  | "equipTypes"
  | "weaponTypes"
  | "armorTypes"
  | "furnitureCategoryIds"
  | "furnitureSubcategoryIds"
  | "itemNameContains"
>

export const ITEM_CATEGORY_FIELDS: readonly (keyof ItemCategoryRow)[] = [
  "slug",
  "title",
  "parent",
  "displayOrder",
  "priorityOrder",
  "filterTypes",
  "itemTypes",
  "specializedItemTypes",
  "traitTypeRange",
  "equipTypes",
  "weaponTypes",
  "armorTypes",
  "furnitureCategoryIds",
  "furnitureSubcategoryIds",
  "itemNameContains",
]

type Under = { [parent: string]: ItemCategoryRow[] | undefined }

function parentOf(row: ItemCategoryRow): string | undefined {
  const parent = row.parent
  if (parent == null) return undefined
  return parent.substring(parent.indexOf("/") + 1)
}

function statesATest(row: ItemCategoryRow): boolean {
  return (
    row.filterTypes != null ||
    row.itemTypes != null ||
    row.specializedItemTypes != null ||
    row.traitTypeRange != null ||
    row.equipTypes != null ||
    row.weaponTypes != null ||
    row.armorTypes != null ||
    row.furnitureCategoryIds != null ||
    row.furnitureSubcategoryIds != null ||
    row.itemNameContains != null
  )
}

function nodeOf(row: ItemCategoryRow, children: ItemCategoryRoots): ItemCategoryNode {
  const node: ItemCategoryNode = { id: row.slug, name: row.title ?? row.slug }
  if (row.filterTypes != null) node.filterTypes = row.filterTypes
  if (row.itemTypes != null) node.itemTypes = row.itemTypes
  if (row.specializedItemTypes != null) node.specializedItemTypes = row.specializedItemTypes
  if (row.traitTypeRange != null) {
    const [low, high] = row.traitTypeRange
    if (low != null && high != null) node.traitTypeRange = [low, high]
  }
  if (row.equipTypes != null) node.equipTypes = row.equipTypes
  if (row.weaponTypes != null) node.weaponTypes = row.weaponTypes
  if (row.armorTypes != null) node.armorTypes = row.armorTypes
  if (row.furnitureCategoryIds != null) node.furnitureCategoryIds = row.furnitureCategoryIds
  if (row.furnitureSubcategoryIds != null) {
    node.furnitureSubcategoryIds = row.furnitureSubcategoryIds
  }
  if (row.itemNameContains != null) node.itemNameContains = row.itemNameContains
  if (children.length > 0) node.children = children
  return node
}

function branchOf(row: ItemCategoryRow, under: Under): ItemCategoryNode {
  const kin = under[row.slug] ?? []
  kin.sort((one, two) => one.displayOrder - two.displayOrder)
  return nodeOf(
    row,
    kin.map((one) => branchOf(one, under))
  )
}

function priorityOf(row: ItemCategoryRow): number {
  return row.priorityOrder ?? row.displayOrder
}

export function itemCategoryRootsOf(rows: readonly ItemCategoryRow[]): ItemCategoryRoots {
  const roots: ItemCategoryRow[] = []
  const under: Under = {}
  for (const row of rows) {
    const parent = parentOf(row)
    if (parent === undefined) {
      roots.push(row)
    } else {
      const kin = under[parent] ?? []
      kin.push(row)
      under[parent] = kin
    }
  }
  const sorted = roots.filter((row) => statesATest(row) || under[row.slug] !== undefined)
  sorted.sort((one, two) => priorityOf(one) - priorityOf(two))
  return sorted.map((row) => branchOf(row, under))
}
