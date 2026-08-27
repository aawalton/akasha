import { describe, expect, it } from "bun:test"
import { queryOf } from "../lib/page-query-fields.ts"

function page(body: string): string {
  return `---\n${body}\n---\n`
}

describe("queryOf", () => {
  it("reads a bare page type, which is the whole of the simplest query", () => {
    expect(queryOf(page("page-type: project"))).toEqual({ pageType: "project" })
  })

  it("says nothing where no page type is named, rather than guessing one", () => {
    expect(queryOf(page("where:\n  status: done"))).toBeNull()
  })

  it("reads a scalar under `where` as an `is` test, the shorthand the pages are written in", () => {
    expect(queryOf(page("page-type: project\nwhere:\n  status: done"))).toEqual({
      pageType: "project",
      where: [{ key: "status", is: "done" }],
    })
  })

  it.each([
    ["in", "  status:\n    in:\n      - done\n      - checks", { key: "status", in: ["done", "checks"] }],
    ["not-in", "  status:\n    not-in:\n      - done", { key: "status", notIn: ["done"] }],
    ["has", "  tags:\n    has: author:amy", { key: "tags", has: "author:amy" }],
    ["empty", "  parent-seq:\n    empty: true", { key: "parent-seq", empty: true }],
    ["at-or-after", "  seq:\n    at-or-after: '19000'", { key: "seq", atOrAfter: "19000" }],
  ] as const)("reads the `%s` test", (_named, clause, test) => {
    expect(queryOf(page(`page-type: project\nwhere:\n${clause}`))?.where).toEqual([test])
  })

  it("reads a count, which answers in groups rather than rows", () => {
    expect(queryOf(page("page-type: project\ncount-by:\n  - status"))).toEqual({
      pageType: "project",
      countBy: ["status"],
    })
  })

  it("reads a sort, a limit and the keys to carry back", () => {
    expect(
      queryOf(page("page-type: project\nsort-by: seq\ndescending: true\nlimit: 10\nkeys:\n  - seq\n  - status"))
    ).toEqual({
      pageType: "project",
      sortBy: "seq",
      descending: true,
      limit: 10,
      keys: ["seq", "status"],
    })
  })

  it("leaves `descending` off where it is not stated true, so a sort rises by default", () => {
    expect(queryOf(page("page-type: project\nsort-by: seq"))).toEqual({ pageType: "project", sortBy: "seq" })
  })
})
