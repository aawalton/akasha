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
  if (parent === undefined) return undefined
  return parent.substring(parent.indexOf("/") + 1)
}

function statesATest(row: ItemCategoryRow): boolean {
  return (
    row.filterTypes !== undefined ||
    row.itemTypes !== undefined ||
    row.specializedItemTypes !== undefined ||
    row.traitTypeRange !== undefined ||
    row.equipTypes !== undefined ||
    row.weaponTypes !== undefined ||
    row.armorTypes !== undefined ||
    row.furnitureCategoryIds !== undefined ||
    row.furnitureSubcategoryIds !== undefined ||
    row.itemNameContains !== undefined
  )
}

function nodeOf(row: ItemCategoryRow, children: ItemCategoryRoots): ItemCategoryNode {
  const node: ItemCategoryNode = { id: row.slug, name: row.title ?? row.slug }
  if (row.filterTypes !== undefined) node.filterTypes = row.filterTypes
  if (row.itemTypes !== undefined) node.itemTypes = row.itemTypes
  if (row.specializedItemTypes !== undefined) node.specializedItemTypes = row.specializedItemTypes
  if (row.traitTypeRange !== undefined) {
    const [low, high] = row.traitTypeRange
    if (low !== undefined && high !== undefined) node.traitTypeRange = [low, high]
  }
  if (row.equipTypes !== undefined) node.equipTypes = row.equipTypes
  if (row.weaponTypes !== undefined) node.weaponTypes = row.weaponTypes
  if (row.armorTypes !== undefined) node.armorTypes = row.armorTypes
  if (row.furnitureCategoryIds !== undefined) node.furnitureCategoryIds = row.furnitureCategoryIds
  if (row.furnitureSubcategoryIds !== undefined) {
    node.furnitureSubcategoryIds = row.furnitureSubcategoryIds
  }
  if (row.itemNameContains !== undefined) node.itemNameContains = row.itemNameContains
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
