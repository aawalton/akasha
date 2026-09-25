import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { glenumbraLore } from "akasha/temper/catalog/pursuit/temper-lore-collection/pages/glenumbra-lore/glenumbra-lore.temper-lore-collection.ts"
import { skillBooks } from "akasha/temper/catalog/pursuit/temper-lore-collection/pages/skill-books/skill-books.temper-lore-collection.ts"
import { temperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.ts"
import {
  placeOf,
  tablesOf,
} from "akasha/temper/catalog/world/lorebook/modules/lore-book-tables/lore-book-tables.module.code.ts"

const SKILL = {
  address: namedAs(temperLoreCollection.slug, skillBooks.slug, null),
  value: { title: "Skill Books", esoLoreCategoryId: 3, esoCollectionIndex: 23 },
}

const GLENUMBRA = {
  address: namedAs(temperLoreCollection.slug, glenumbraLore.slug, null),
  value: {
    title: "Glenumbra Lore",
    esoLoreCategoryId: 1,
    esoCollectionIndex: 1,
    esoLoreCollectionId: 3,
    loreCollectionDescription: "Words",
    gamepadIcon: "icon.dds",
    hidden: false,
    bookTotal: 10,
  },
}

test("a place is written back under the table's keys, in the table's order", () => {
  const place = placeOf({ id: "x", mapY: 0.2, mapId: 7, alternate: { mapId: 5 } })
  expect(Object.keys(place)).toEqual(["4", "pm", "py"])
})

test("a book with a game id is an entry of the book table", () => {
  const book = {
    value: {
      esoBookId: 20,
      title: "Tannins",
      collection: SKILL.address,
      charted: true,
      bookIndex: 78,
    },
    positions: [],
    pins: [],
  }
  const tables = tablesOf([book], [SKILL])
  expect(tables.books).toEqual([[20, { c: true, cn: "Skill Books", e: [], n: "Tannins" }]])
  expect(tables.captured[0]?.collections[0]?.books).toEqual([{ bookIndex: 78, name: "Tannins" }])
})

test("a Shalidor pin is listed under its map, in the order the map lists it", () => {
  const book = {
    value: { title: "Code", collection: GLENUMBRA.address, bookIndex: 2 },
    positions: [],
    pins: [
      { mapId: 1, mapOrder: 2, mapX: 0.3, mapY: 0.4, locationDetails: [1] },
      { mapId: 1, mapOrder: 1, mapX: 0.1, mapY: 0.2 },
    ],
  }
  const tables = tablesOf([book], [GLENUMBRA])
  expect(tables.shalidor).toEqual([
    [
      1,
      [
        { 1: 0.1, 2: 0.2, 3: 1, 4: 2 },
        { 1: 0.3, 2: 0.4, 3: 1, 4: 2, ld: [1] },
      ],
    ],
  ])
  expect(tables.library).toEqual([
    [1, [[1, { d: "Words", g: "icon.dds", h: false, k: 3, n: "Glenumbra Lore", t: 10 }]]],
  ])
})
