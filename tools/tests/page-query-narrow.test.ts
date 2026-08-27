import { describe, expect, it } from "bun:test"
import { queryFrom } from "../lib/page-query-fields.ts"
import { bind, COMPOSED_FIELDS, composedFrom, isRefused } from "../lib/page-query-bind"

function composed(where: unknown): ReturnType<typeof queryFrom> {
  return queryFrom({ "page-type": "project", where })
}

function refusalOf(where: unknown): string | null {
  const query = composed(where)
  if (query === null) return null
  const bound = bind(query, {})
  return isRefused(bound) ? bound.refused : null
}

describe("a narrow this service cannot read", () => {
  it.each([
    ["an operator it does not implement", { status: { eq: "done" } }],
    ["an operator named as the access layer spells it", { status: { isNotEmpty: true } }],
    ["a null where a test was meant", { status: null }],
    ["a list where a test was meant", { status: ["done", "checks"] }],
    ["a `where` stated as a list of conditions", [{ key: "status", eq: "done" }]],
    ["a `where` stated as a string", "status=done"],
  ] as const)("refuses %s rather than dropping it", (_named, where) => {
    const refused = refusalOf(where)
    expect(refused).not.toBeNull()
    expect(refused).toContain("answers with every page of the type instead of the pages asked for")
  })

  it("names the key it could not read, so the caller knows which test was rejected", () => {
    expect(refusalOf({ status: { eq: "done" } })).toContain("`where` on `status`")
  })

  it("says what a test may be, rather than only that this one was wrong", () => {
    expect(refusalOf({ status: { eq: "done" } })).toContain("`at-or-after`")
    expect(refusalOf({ status: { eq: "done" } })).toContain("`ends-with`")
  })

  it("refuses the whole query where one test of several cannot be read", () => {
    expect(refusalOf({ status: "done", owner: { eq: "amy" } })).toContain("`where` on `owner`")
  })
})

describe("a narrow it can read", () => {
  it.each([
    ["a scalar string", { status: "done" }, [{ key: "status", is: "done" }]],
    ["a number, which a page states as text", { seq: 3 }, [{ key: "seq", is: "3" }]],
    ["a boolean", { enabled: true }, [{ key: "enabled", is: "true" }]],
    ["a number under `is`", { seq: { is: 3 } }, [{ key: "seq", is: "3" }]],
    ["`empty` stated as a boolean", { owner: { empty: false } }, [{ key: "owner", empty: false }]],
    ["`empty` stated as text", { owner: { empty: "true" } }, [{ key: "owner", empty: true }]],
    ["`in` over text", { status: { in: ["a", "b"] } }, [{ key: "status", in: ["a", "b"] }]],
    ["`in` over numbers", { seq: { in: [1, 2] } }, [{ key: "seq", in: ["1", "2"] }]],
    ["`not-in`", { status: { "not-in": ["a"] } }, [{ key: "status", notIn: ["a"] }]],
    ["`has`", { tags: { has: "author:amy" } }, [{ key: "tags", has: "author:amy" }]],
    ["`contains`", { title: { contains: "queue" } }, [{ key: "title", contains: ["queue"] }]],
    ["`ends-with`", { id: { "ends-with": "4dca402" } }, [{ key: "id", endsWith: "4dca402" }]],
    ["`at-or-after`", { at: { "at-or-after": "2026-01-01" } }, [{ key: "at", atOrAfter: "2026-01-01" }]],
    ["`before`", { at: { before: "2026-01-01" } }, [{ key: "at", before: "2026-01-01" }]],
    ["two tests at once", { status: "done", seq: 3 }, [{ key: "status", is: "done" }, { key: "seq", is: "3" }]],
  ] as const)("reads %s and refuses nothing", (_named, where, tests) => {
    expect(composed(where)?.where).toEqual(tests as never)
    expect(refusalOf(where)).toBeNull()
  })

  it("carries no `unreadable` where every test was read, so bind has nothing to refuse", () => {
    expect(composed({ status: "done" })?.unreadable).toBeUndefined()
  })

  it("reads a `where` stating nothing as a narrow over nothing rather than a fault", () => {
    expect(composed({})?.where).toEqual([])
    expect(refusalOf({})).toBeNull()
  })
})

describe("a top-level parameter this service cannot read", () => {
  const READABLE: readonly (readonly [string, Readonly<Record<string, unknown>>])[] = [
    ["page-type alone", {}],
    ["where", { where: { status: "done" } }],
    ["keys", { keys: ["slug"] }],
    ["count-by", { "count-by": ["status"] }],
    ["sort-by and descending", { "sort-by": "slug", descending: true }],
    ["limit and offset", { limit: 5, offset: 2 }],
    ["function and target", { function: "sum", target: "seq" }],
    ["takes, which the named route supplies", { takes: {} }],
  ]

  const UNREADABLE: readonly (readonly [string, Readonly<Record<string, unknown>>])[] = [
    ["a transposed `where`", { wehre: { status: { is: "done" } } }],
    ["`select`, which names no parameter", { select: ["created-at"] }],
    ["a parameter resembling none of them", { "zz-total-nonsense": ["x"] }],
  ]

  function refusalOfFields(extra: Readonly<Record<string, unknown>>): string | null {
    const fields = { "page-type": "project", ...extra }
    const query = queryFrom(fields)
    if (query === null) return null
    const bound = bind(composedFrom(query, fields), {})
    return isRefused(bound) ? bound.refused : null
  }

  it.each(UNREADABLE)("refuses %s rather than dropping it", (_named, fields) => {
    const refused = refusalOfFields(fields)
    expect(refused).not.toBeNull()
    expect(refused).toContain("answers with every page of the type instead of the pages asked for")
  })

  it("names the parameter it could not read, so the caller knows which was rejected", () => {
    expect(refusalOfFields({ wehre: {} })).toContain("`wehre`")
  })

  it("says which parameters it does take, rather than only that this one was wrong", () => {
    const refused = refusalOfFields({ wehre: {} })
    for (const one of COMPOSED_FIELDS) expect(refused).toContain(`\`${one}\``)
  })

  it("points `select` at `keys`, which is the parameter it was reaching for", () => {
    expect(refusalOfFields({ select: ["slug"] })).toContain("`keys` is the parameter")
  })

  it("refuses the whole query where one parameter of several cannot be read", () => {
    expect(refusalOfFields({ keys: ["slug"], wehre: {} })).toContain("`wehre`")
  })

  it.each(READABLE)("reads %s and refuses nothing", (_named, fields) => {
    expect(refusalOfFields(fields)).toBeNull()
  })

  it("leaves the page keys a query document carries out of it, which only the named route parses", () => {
    expect(queryFrom({ "page-type": "project", title: "Anything", slug: "x" })?.unreadable).toBeUndefined()
  })
})

describe("the two refusals stay apart", () => {
  it("an unreadable test refuses before the query is ever run against the pages", () => {
    expect(refusalOf({ status: { eq: "done" } })).toContain("cannot read")
  })

  it("a key the pages do not declare is a different verdict, carried on `absent`", () => {
    const query = composed({ "no-such-key": "whatever" })
    expect(query?.unreadable).toBeUndefined()
    expect(isRefused(bind(query as never, {}))).toBe(false)
  })
})
