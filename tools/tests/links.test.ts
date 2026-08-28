import { describe, expect, test } from "bun:test"
import { resolveLinks, unresolved } from "../lib/links.ts"
import type { Roots } from "../../page/page"

const ROOTS: Roots = {
  akasha: "/repo/akasha",
  "code-editor": "/repo/code-editor",
  target: "akasha",
}

const resolve = (relPath: string, body: string) =>
  resolveLinks({ relPath, body, roots: ROOTS, exists: () => false, readAt: () => null })

describe("a link whose whole target is a hole", () => {
  test("stands as a slot on a page type, where the body is a template", () => {
    const links = resolve("pages/page-type/domain.page-type.md", "- **[{task}]({href})** — {guidance}\n")
    expect(links.map((one) => one.status)).toEqual(["slot"])
    expect(unresolved(links)).toEqual([])
  })

  test("is a broken link anywhere else, page types being the only templates", () => {
    const links = resolve("pages/domain/global.domain.md", "- **[{task}]({href})** — {guidance}\n")
    expect(links.map((one) => one.status)).toEqual(["missing"])
    expect(unresolved(links)).toHaveLength(1)
  })

  test("is a broken link on a page type in another repo, no page type standing there", () => {
    const links = resolveLinks({
      relPath: "pages/page-type/domain.page-type.md",
      body: "[{task}]({href})\n",
      roots: { ...ROOTS, target: "code-editor" },
      exists: () => false,
      readAt: () => null,
    })
    expect(links.map((one) => one.status)).toEqual(["missing"])
  })
})

describe("a quote, whose link text is the target's own words", () => {
  const against = (body: string, target: string) =>
    resolveLinks({
      relPath: "pages/initiative/one.md",
      body,
      roots: ROOTS,
      exists: (at) => at === "/repo/akasha/pages/domain/one.md",
      readAt: () => target,
    })

  const QUOTE = '["Every page type has the same backing."](../../pages/domain/one.md)\n'

  test("is checked against the document it names, and stands where that document holds it", () => {
    const links = against(QUOTE, "# Intent\n\nEvery page type has the same backing.\n")
    expect(links.map((one) => one.status)).toEqual(["ok"])
  })

  test("breaks where the document no longer holds it, the file still being there", () => {
    const links = against(QUOTE, "# Intent\n\nEvery page type is kept as a file.\n")
    expect(links.map((one) => one.status)).toEqual(["missing-quote"])
    expect(unresolved(links)).toHaveLength(1)
  })

  test("matches any part of the document's text rather than a whole entry", () => {
    const links = against(
      '["page type has the same"](../../pages/domain/one.md)\n',
      "Every page type has the same backing.\n"
    )
    expect(links.map((one) => one.status)).toEqual(["ok"])
  })

  test("carries the document's own words through an inline code span", () => {
    const links = against(
      '["Every assignment but `errand` is stated on the seat."](../../pages/domain/one.md)\n',
      "Every assignment but `errand` is stated on the seat.\n"
    )
    expect(links.map((one) => one.status)).toEqual(["ok"])
  })

  test("is an ordinary link where the text stands in no quotation marks", () => {
    const links = against(
      "[Every page type has the same backing.](../../pages/domain/one.md)\n",
      "the document says nothing of the sort\n"
    )
    expect(links.map((one) => one.status)).toEqual(["ok"])
  })
})

describe("a page type's other links", () => {
  test("a target carrying a hole and more than a hole is still resolved as a path", () => {
    const links = resolve("pages/page-type/domain.page-type.md", "[a](./{name}.md)\n")
    expect(links.map((one) => one.status)).toEqual(["missing"])
    expect(unresolved(links)).toHaveLength(1)
  })

  test("a target naming a real path is resolved as a path", () => {
    const links = resolveLinks({
      relPath: "pages/page-type/domain.page-type.md",
      body: "[a](../page-type/domain.md)\n",
      roots: ROOTS,
      exists: (at) => at === "/repo/akasha/pages/page-type/domain.md",
      readAt: () => null,
    })
    expect(links.map((one) => one.status)).toEqual(["ok"])
  })
})
