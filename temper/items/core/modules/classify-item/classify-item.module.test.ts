import { describe, expect, test } from "bun:test"
import { classifyItem } from "akasha/temper/items/core/modules/classify-item/classify-item.module.code.ts"
import { holdItemCategoryTreeFromCheckout } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.test-fixtures.ts"

const roots = holdItemCategoryTreeFromCheckout().roots

const TROPHY = 5
const MASTER_WRIT = 60
const CONTAINER = 18
const CONTAINER_STACKABLE = 75
const MISCELLANEOUS_FILTER = 6

describe("classify-item", () => {
  test("a task item lands under tasks and never under containers", () => {
    const tasks = [
      { itemType: TROPHY, specializedItemType: 100, leaf: "Treasure Maps" },
      { itemType: TROPHY, specializedItemType: 101, leaf: "Survey Reports" },
      { itemType: MASTER_WRIT, specializedItemType: 2750, leaf: "Master Writs" },
      { itemType: MASTER_WRIT, specializedItemType: 2760, leaf: "Holiday Writs" },
    ]
    for (const task of tasks) {
      const path = classifyItem(
        {
          filterType: MISCELLANEOUS_FILTER,
          itemType: task.itemType,
          specializedItemType: task.specializedItemType,
        },
        roots
      )
      expect(path).toEqual(["Tasks", task.leaf])
    }
  })

  test("a holiday writ stays a task even where its item type is a container's", () => {
    const path = classifyItem(
      { filterType: MISCELLANEOUS_FILTER, itemType: CONTAINER, specializedItemType: 2760 },
      roots
    )
    expect(path).toEqual(["Tasks", "Holiday Writs"])
  })

  test("an unknown writ and an unopened treasure map are stackable containers", () => {
    const path = classifyItem(
      { filterType: 3, itemType: CONTAINER_STACKABLE, specializedItemType: 890 },
      roots
    )
    expect(path).toEqual(["Miscellaneous", "Containers", "Stackable"])
  })
})
