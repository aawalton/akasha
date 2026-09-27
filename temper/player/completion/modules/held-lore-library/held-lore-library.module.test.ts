import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { glenumbraLore } from "akasha/temper/catalog/pursuit/temper-lore-collection/pages/glenumbra-lore/glenumbra-lore.temper-lore-collection.ts"
import { temperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.ts"
import { loreLibraryFrom } from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.code.ts"

const GLENUMBRA = namedAs(temperLoreCollection.slug, glenumbraLore.slug, null)

const ROWS: Readonly<Record<string, readonly Record<string, unknown>[]>> = {
  "temper-lore-category": [{ esoLoreCategoryId: 1, title: "Shalidor's Library" }],
  "temper-lore-collection": [
    { slug: glenumbraLore.slug, esoLoreCategoryId: 1, esoCollectionIndex: 2, title: "Glenumbra" },
    { slug: "untitled", esoLoreCategoryId: 1, esoCollectionIndex: 1 },
    { slug: "unnumbered", esoLoreCategoryId: 1, title: "Unnumbered" },
  ],
  "temper-lore-book": [
    { collection: GLENUMBRA, bookIndex: 2, title: "Second" },
    { collection: GLENUMBRA, bookIndex: 1, title: "First" },
    { collection: GLENUMBRA, bookIndex: 3 },
  ],
}

test("the lore library is named by its pages and ordered by its numbers", () => {
  expect(loreLibraryFrom((pageTypeSlug) => ROWS[pageTypeSlug] ?? [])).toEqual([
    {
      categoryIndex: 1,
      name: "Shalidor's Library",
      collections: [
        { collectionIndex: 1, name: "", books: [] },
        {
          collectionIndex: 2,
          name: "Glenumbra",
          books: [
            { bookIndex: 1, name: "First" },
            { bookIndex: 2, name: "Second" },
          ],
        },
      ],
    },
  ])
})
