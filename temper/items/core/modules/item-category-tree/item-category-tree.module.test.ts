import { expect, test } from "bun:test"
import { itemCategoriesOf } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import { holdItemCategoryTreeFromCheckout } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.test-fixtures.ts"
import type { ItemCategoryNode } from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"

const UNDER = "temper-item-category-tree/"

const BRANCHES = [
  { slug: "all", title: "All Categories", displayOrder: 0, priorityOrder: 0 },
  { slug: "tools", title: "Tools", displayOrder: 1, priorityOrder: 2, filterTypes: [1] },
  { slug: "food", title: "Food", displayOrder: 2, priorityOrder: 1 },
  { slug: "bread", parent: `${UNDER}food`, displayOrder: 2, itemTypes: [4] },
  {
    slug: "stew",
    title: "Stew",
    parent: `${UNDER}food`,
    displayOrder: 1,
    itemTypes: [5],
    traitTypeRange: [1, 3],
  },
]

const probe = itemCategoriesOf(BRANCHES)

function everyId(nodes: readonly ItemCategoryNode[]): readonly string[] {
  return nodes.flatMap((one) => [one.id, ...everyId(one.children ?? [])])
}

test("the roots come in priority order, leaving out the branch that takes every item", () => {
  expect(probe.roots.map((one) => one.id)).toEqual(["food", "tools"])
  expect(Object.keys(probe.keyed)).toEqual(["food", "tools"])
})

test("a branch's children come in display order, and one with no title is named by its slug", () => {
  const children = probe.keyed.food?.children ?? []
  expect(children.map((one) => one.id)).toEqual(["stew", "bread"])
  expect(children[1]?.name).toBe("bread")
})

test("a branch carries the tests its page states and nothing else", () => {
  expect(probe.keyed.food?.children?.[0]).toEqual({
    id: "stew",
    name: "Stew",
    itemTypes: [5],
    traitTypeRange: [1, 3],
  })
})

test("the tree read from the checkout names each branch once and leaves out every item's branch", () => {
  const ids = everyId(holdItemCategoryTreeFromCheckout().roots)
  expect(ids.length).toBeGreaterThan(0)
  expect(new Set(ids).size).toBe(ids.length)
  expect(ids).not.toContain("all")
})
