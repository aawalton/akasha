import { expect, test } from "bun:test"
import {
  itemIconsLua,
  itemIdsIn,
} from "akasha/temper/eso/ui-harness/modules/item-icons-seeding/item-icons-seeding.module.code.ts"

test("every item a saved file links is named once, in order", () => {
  const source =
    '["a"] = "|H1:item:49694:1:1|h|h", ["b"] = "|H0:item:30164:2|h|h|H1:item:49694:3|h|h"'
  expect(itemIdsIn([source])).toEqual([30164, 49694])
})

test("an item's icon is answered by the id its link holds", () => {
  const lua = itemIconsLua(new Map([[49694, "/esoui/art/icons/sword.dds"]])).join("\n")
  expect(lua).toContain('[49694] = "/esoui/art/icons/sword.dds"')
  expect(lua).toContain('string.match(link or "", "item:(%d+):")')
})

test("an item with no icon kept is answered as before", () => {
  expect(itemIconsLua(new Map()).join("\n")).toContain("return before(link)")
})
