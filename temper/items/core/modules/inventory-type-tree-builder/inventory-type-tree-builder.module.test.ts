import { expect, test } from "bun:test"
import type {
  InventoryItemRow,
  InventoryTypeEntry,
} from "akasha/temper/items/core/modules/inventory-grouping-types/inventory-grouping-types.module.code.ts"
import type {
  InventoryLeafNode,
  InventoryNode,
} from "akasha/temper/items/core/modules/inventory-node-types/inventory-node-types.module.code.ts"
import { buildInventoryTypeNodes } from "akasha/temper/items/core/modules/inventory-type-tree-builder/inventory-type-tree-builder.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()

const MACE_LINK = "|H0:item:87874:363:50:0:0:0:0:0:0:0:0:0:0:0:0:15:0:0:0:0:0|h|h"

const OTHER_MACE_LINK = "|H0:item:87874:363:50:0:0:0:0:0:0:0:0:0:0:0:0:15:0:0:0:300:0|h|h"

function entryOf(key: string, itemLink: string | undefined): InventoryTypeEntry {
  const row: InventoryItemRow = {
    key,
    itemName: "Savage Werewolf's Mace",
    quality: 4,
    stackCount: 1,
    value: undefined,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 50,
    ...(itemLink === undefined ? {} : { itemLink }),
  }
  return { row, path: [] }
}

function leafOf(node: InventoryNode | undefined): InventoryLeafNode {
  if (node === undefined || "children" in node) throw new Error("no leaf was built")
  return node
}

function childLeavesOf(node: InventoryNode | undefined): readonly InventoryLeafNode[] {
  if (node === undefined || !("children" in node)) throw new Error("no branch was built")
  return node.children.map(leafOf)
}

test("two slots holding one item fold into a leaf that opens that item's tooltip", () => {
  const [built] = buildInventoryTypeNodes(
    [entryOf("a", MACE_LINK), entryOf("b", MACE_LINK)],
    "Equipment",
    {}
  )
  const leaf = leafOf(built)
  expect(leaf.slotCount).toBe(2)
  expect(leaf.itemLink).toBe(MACE_LINK)
  expect(leaf.tooltipInstance?.stackCount).toBe(2)
  expect(leaf.tooltipInstance?.quality).toBe(4)
})

test("two items of one name and quality but different links are a branch of leaves, each with its tooltip", () => {
  const [built] = buildInventoryTypeNodes(
    [entryOf("a", MACE_LINK), entryOf("b", OTHER_MACE_LINK)],
    "Equipment",
    {}
  )
  const children = childLeavesOf(built)
  expect(children.map((child) => child.itemLink)).toEqual([MACE_LINK, OTHER_MACE_LINK])
  expect(children.every((child) => child.tooltipInstance !== undefined)).toBe(true)
})

test("a leaf's tooltip carries the enchant its own slot was read with", () => {
  const entry = entryOf("a", MACE_LINK)
  entry.row.enchantHeader = "Absorb Stamina Enchantment"
  entry.row.enchantDescription = "Deals |cffffff1124|r Physical Damage."
  const leaf = leafOf(buildInventoryTypeNodes([entry], "Equipment", {})[0])
  expect(leaf.tooltipInstance?.enchantHeader).toBe("Absorb Stamina Enchantment")
  expect(leaf.tooltipInstance?.enchantDescription).toBe("Deals |cffffff1124|r Physical Damage.")
})

test("slots with no link still fold together, with no tooltip to open", () => {
  const [built] = buildInventoryTypeNodes(
    [entryOf("a", undefined), entryOf("b", undefined)],
    "Equipment",
    {}
  )
  const leaf = leafOf(built)
  expect(leaf.slotCount).toBe(2)
  expect(leaf.tooltipInstance).toBeUndefined()
})
