import { describe, expect, it } from "bun:test"
import { queryOf } from "../lib/page-query-fields.ts"
import { bind, isRefused } from "../lib/page-query-bind"

function page(body: string): string {
  return `---\n${body}\n---\n`
}

const TAKING = page(
  "page-type: temper-net-worth-snapshot\ntakes:\n  userId: text\n  since: number\nwhere:\n  userId:\n    is: $userId\n  dataTimestamp:\n    at-or-after: $since"
)

function taking(): ReturnType<typeof queryOf> {
  return queryOf(TAKING)
}

describe("takes", () => {
  it("reads each argument with the type its value must be", () => {
    expect(taking()?.takes).toEqual({ userId: "text", since: "number" })
  })

  it("binds a given value where a test names it", () => {
    const bound = bind(taking() as never, { userId: "u", since: "17" })
    expect(isRefused(bound)).toBe(false)
    expect((bound as { where: unknown }).where).toEqual([
      { key: "userId", is: "u" },
      { key: "dataTimestamp", atOrAfter: "17" },
    ])
  })

  it("refuses an argument it takes and was not given, rather than matching nothing", () => {
    const bound = bind(taking() as never, { userId: "u" })
    expect(isRefused(bound) && bound.refused).toContain("`since` is an argument this query takes")
  })

  it("refuses an argument given that it does not take", () => {
    const bound = bind(taking() as never, { userId: "u", since: "1", spare: "x" })
    expect(isRefused(bound) && bound.refused).toContain("`spare` was given")
  })

  it("refuses a value that is not the type the argument was declared", () => {
    const bound = bind(taking() as never, { userId: "u", since: "yesterday" })
    expect(isRefused(bound) && bound.refused).toContain("is no number")
  })

  it("refuses a list where the argument takes one value", () => {
    const bound = bind(taking() as never, { userId: ["a", "b"], since: "1" })
    expect(isRefused(bound) && bound.refused).toContain("which is one value, and 2 were given")
  })

  it("spreads a list argument into the list a test states, splitting one string on commas", () => {
    const query = queryOf(
      page("page-type: temper-mined-item\ntakes:\n  ids: list(text)\nwhere:\n  itemId:\n    in:\n      - $ids")
    )
    const bound = bind(query as never, { ids: "7, 8 ,9" })
    expect((bound as { where: unknown }).where).toEqual([{ key: "itemId", in: ["7", "8", "9"] }])
  })

  it("refuses a test naming an argument the query never declared", () => {
    const query = queryOf(page("page-type: project\nwhere:\n  status:\n    is: $wanted"))
    const bound = bind(query as never, {})
    expect(isRefused(bound) && bound.refused).toContain("it takes no arguments")
  })

  it("refuses an argument it takes that no test names, which would change nothing", () => {
    const query = queryOf(page("page-type: project\ntakes:\n  status: text\nwhere:\n  status: done"))
    const bound = bind(query as never, { status: "done" })
    expect(isRefused(bound) && bound.refused).toContain("names it in no test")
  })
})

describe("contains", () => {
  it("reads a contains test, which matches text inside a value", () => {
    expect(queryOf(page("page-type: project\nwhere:\n  title:\n    contains: queue"))?.where).toEqual([
      { key: "title", contains: ["queue"] },
    ])
  })
})
