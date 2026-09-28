import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type ItemCategoryRow,
  itemCategoryRootsOf,
} from "akasha/temper/items/core/modules/item-category-tree-reading/item-category-tree-reading.module.code.ts"
import type {
  ItemCategoryNode,
  ItemCategoryRoots,
} from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"

export type ItemCategoriesKeyed = Readonly<Record<string, ItemCategoryNode>>

export interface ItemCategories {
  readonly roots: ItemCategoryRoots
  readonly keyed: ItemCategoriesKeyed
  readonly titles: ReadonlyMap<string, string>
}

export function itemCategoriesOf(rows: readonly Value[]): ItemCategories {
  const branches = rows as readonly ItemCategoryRow[]
  const roots = itemCategoryRootsOf(branches)
  const keyed: Record<string, ItemCategoryNode> = {}
  for (const root of roots) keyed[root.id] = root
  const titles = new Map(branches.map((row) => [row.slug, row.title ?? row.slug]))
  return { roots, keyed, titles }
}

export function categoryTitleOf(categories: ItemCategories, id: string): string {
  return categories.titles.get(id) ?? id
}

const UNREAD =
  "the item category tree is read from pages, and nothing has read it yet — await `loadItemCategoryTree()` where the work starts, or gate the screen on `ItemCategoryTreeGate`"

export class ItemCategoryTreeUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "ItemCategoryTreeUnread"
  }
}

let held: ItemCategories | null = null

export function holdItemCategories(categories: ItemCategories): ItemCategories {
  held = categories
  return categories
}

export function heldItemCategories(): ItemCategories | null {
  return held
}

export function heldCategoryTitle(id: string): string {
  return held === null ? id : categoryTitleOf(held, id)
}
