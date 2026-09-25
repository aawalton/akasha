import { expect, test } from "bun:test"
import {
  couldTurn,
  generateChange,
} from "akasha/temper/catalog/world/lorebook/modules/lore-book-writing/lore-book-writing.change-generator.code.ts"

function changing(changed: readonly string[]) {
  return { root: "/nowhere", changed, before: () => null, after: () => null }
}

test("a change touching a lore book page could turn the tables", () => {
  const at =
    "temper/catalog/pursuit/temper-lore-collection/pages/dwemer/books/a/a.temper-lore-book.ts"
  expect(couldTurn(changing([at]))).toBe(true)
})

test("a change touching no lore book or collection writes nothing", () => {
  expect(generateChange(changing(["alan/notes/today.md"]))).toEqual({ edits: [], said: [] })
})
