import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { shapeOf } from "../lib/page-query-shape.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (slug: string, lines: readonly string[]): string =>
  page([`page-type-slug: page-type`, `slug: ${slug}`, ...lines])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`page-type-slug: page-property-definition`, `defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/page-type.page-type.md": kind("page-type", [
    "extends-slug: page",
    "files: akasha:pages/page-type/**/*.md",
  ]),
  "pages/page-type/page.page-type.md": kind("page", ["extends-slug: none", "files: none"]),
  "pages/page-type/task.page-type.md": kind("task", [
    "extends-slug: page",
    "files: akasha:pages/task/**/*.md",
    "id: 019f0000-0000-7000-8000-00000000aaaa",
    "owner-slug: person-slug",
  ]),
  "pages/page-type/chore.md": kind("chore", [
    "extends-slug: task",
    "files: akasha:pages/chore/**/*.md",
  ]),
  "pages/page-type/page-property-definition.page-type.md": kind("page-property-definition", [
    "extends-slug: page",
    "files: akasha:pages/page-property-definition/**/*.md",
  ]),
  "pages/page-type/alan-harness-tracking-field.page-type.md": kind("alan-harness-tracking-field", [
    "extends-slug: page-property-definition",
    "files: akasha:pages/alan-harness-tracking-field/**/*.md",
  ]),

  "pages/page-property-definition/page-title.page-property-definition.md": property("page-type/page", "title", [
    "type: text",
    "title: Title",
    "id: 019f0000-0000-7000-8000-00000000bbbb",
  ]),
  "pages/page-property-definition/task-effort.md": property("page-type/task", "effort", [
    "type: number",
    "title: Effort",
  ]),
  "pages/page-property-definition/task-title.md": property("page-type/task", "title", [
    "type: text",
    "title: What the task is",
  ]),
  "pages/page-property-definition/task-run.md": property("page-type/task", "run", [
    "type: number",
    "expression: effort + 1",
  ]),
  "pages/page-property-definition/task-owner.md": property("page-type/task", "owner-slug", [
    "type: relation-slug",
    "target-slug: person",
    "slug-property: person-slug",
    "may-be-gone: true",
  ]),
  "pages/page-property-definition/task-mood.md": property("page-type/task", "mood", [
    "type: select(text)",
    "values:\n  - calm\n  - hurried",
  ]),
  "pages/page-property-definition/chore-effort.md": property("page-type/chore", "effort", [
    "type: text",
    "title: Effort, said again",
  ]),
  "pages/alan-harness-tracking-field/task-tracked.md": page([
    "page-type-slug: alan-harness-tracking-field",
    "defined-on-slug: page-type/task",
    "key: tracked",
    "type: boolean",
  ]),

  "pages/task/one.md": page(["slug: one", "title: One", "effort: 3"]),
  "pages/chore/two.md": page(["slug: two", "title: Two"]),
}

const root = mkdtempSync(join("/var/tmp", "page-query-shape-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = { akasha: root }

const keysOf = (pageType: string): readonly string[] =>
  (shapeOf(ROOTS, pageType)?.declarations ?? []).map((one) => one.key).sort()

describe("the shape of a page type", () => {
  it("carries the properties defined on it", () => {
    expect(keysOf("task")).toEqual(["effort", "mood", "owner-slug", "run", "title", "tracked"])
  })

  it("reads a `defined-on-slug` written as an address, which is how they are written", () => {
    const one = shapeOf(ROOTS, "task")?.declarations.find((each) => each.key === "effort")
    expect(one?.type).toBe("number")
  })

  it("carries what an ancestor defines as well as its own", () => {
    expect(keysOf("chore")).toEqual(["effort", "mood", "owner-slug", "run", "title", "tracked"])
  })

  it("takes the nearest declaration where a type and its ancestor both declare a key", () => {
    const one = shapeOf(ROOTS, "chore")?.declarations.find((each) => each.key === "effort")
    expect(one?.title).toBe("Effort, said again")
    expect(one?.on).toBe("chore")
  })

  it("takes the type's own declaration over the one it inherits", () => {
    const one = shapeOf(ROOTS, "task")?.declarations.find((each) => each.key === "title")
    expect(one?.title).toBe("What the task is")
  })

  it("reads a definition from every population that extends the definition page type", () => {
    const one = shapeOf(ROOTS, "task")?.declarations.find((each) => each.key === "tracked")
    expect(one?.type).toBe("boolean")
  })

  it("carries the values a select states, for the reader to make options of", () => {
    const one = shapeOf(ROOTS, "task")?.declarations.find((each) => each.key === "mood")
    expect(one?.values).toEqual(["calm", "hurried"])
  })

  it("states the id the page type carries", () => {
    expect(shapeOf(ROOTS, "task")?.pageTypeId).toBe("019f0000-0000-7000-8000-00000000aaaa")
  })

  it("derives an id from the file where the page type states none", () => {
    expect(shapeOf(ROOTS, "chore")?.pageTypeId).toMatch(/^[0-9a-f-]{36}$/)
  })

  it("carries the owner a page type names, and nothing where it names none", () => {
    expect(shapeOf(ROOTS, "task")?.ownerSlug).toBe("person-slug")
    expect(shapeOf(ROOTS, "chore")?.ownerSlug).toBeNull()
  })

  it("carries what a relation points at, so a reader need not read the definitions again", () => {
    const one = shapeOf(ROOTS, "task")?.declarations.find((each) => each.key === "owner-slug")
    expect(one?.targetSlug).toBe("person")
    expect(one?.slugProperty).toBe("person-slug")
    expect(one?.mayBeGone).toBe(true)
  })

  it("says a relation may not be gone where the definition does not say it may", () => {
    const one = shapeOf(ROOTS, "task")?.declarations.find((each) => each.key === "mood")
    expect(one?.mayBeGone).toBe(false)
    expect(one?.targetSlug).toBeNull()
  })

  it("says nothing at all about a page type no page states", () => {
    expect(shapeOf(ROOTS, "no-such-type")).toBeNull()
  })
})
