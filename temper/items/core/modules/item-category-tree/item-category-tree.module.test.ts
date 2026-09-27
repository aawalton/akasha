import { expect, test } from "bun:test"
import { holdItemCategoryTreeFromCheckout } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.test-fixtures.ts"
import {
  ITEM_CATEGORY_PRIORITY,
  ITEM_CATEGORY_TREE,
} from "akasha/temper/items/core/modules/item-category-tree-data/item-category-tree-data.module.code.ts"

const held = holdItemCategoryTreeFromCheckout()

test("the roots read from the pages come in the order the code tree ranks them", () => {
  expect(held.roots.map((one) => one.id)).toEqual([...ITEM_CATEGORY_PRIORITY])
})

test("the tree read from the pages is the code tree, branch for branch", () => {
  expect(held.roots).toEqual(Object.values(ITEM_CATEGORY_TREE))
  expect(held.keyed).toEqual(ITEM_CATEGORY_TREE)
})
