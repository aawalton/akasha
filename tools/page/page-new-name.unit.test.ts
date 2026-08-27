import { expect, test } from "bun:test"
import { newPageNameFor, placeOf } from "../../page/page-types.ts"

const stating = { slug: "alert", filed: [{ repo: "memory", place: "**/*.alert.md" }] }
const defaulted = { slug: "sprocket", filed: [{ repo: "memory", place: null }] }

test("a new page is named for its page type, whatever its type says about where it is filed", () => {
  expect(newPageNameFor(stating as never, "vigil")).toBe("vigil.alert.md")
  expect(newPageNameFor(defaulted as never, "widget")).toBe("widget.sprocket.md")
})

test("a new page is named so its own page type would match it", () => {
  const named = newPageNameFor(stating as never, "vigil")
  expect(new Bun.Glob("**/*.alert.md").match(`pages/alert/${named}`)).toBe(true)
})

test("a page type stating no place claims its own directory by the name its pages carry", () => {
  expect(placeOf("sprocket")).toBe("pages/sprocket/**/*.sprocket.md")
  const named = newPageNameFor(defaulted as never, "widget")
  expect(new Bun.Glob(placeOf("sprocket")).match(`pages/sprocket/${named}`)).toBe(true)
})
