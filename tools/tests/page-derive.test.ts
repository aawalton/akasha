import { afterAll, describe, expect, it } from "bun:test"
import { rmSync } from "node:fs"
import { deriver } from "../lib/page-derive.ts"
import { answer } from "../lib/page-query.ts"
import { plantPages } from "./page-derive-fixture.ts"

const { root, roots: ROOTS } = plantPages()

afterAll(() => rmSync(root, { recursive: true, force: true }))

const held = (pageType: string, key: string): ReadonlyMap<string, unknown> =>
  new Map(
    [...deriver(ROOTS).rows(pageType)!].map((row) => [
      row.at.replace(/^.*\//, "").replace(`.${pageType}.md`, ""),
      row.values[key],
    ])
  )

const owners = (): ReadonlyMap<string, unknown> => held("job", "owner")

const faultsOf = (pageType: string): readonly string[] => {
  const found = deriver(ROOTS)
  Array.from(found.rows(pageType) ?? [])
  return found.faults()
}

describe("a computed property resolved from its `from:` paths", () => {
  it("walks a relation to the page its `target-slug` names and reads the key there", () => {
    expect(owners().get("one")).toBe("ada")
  })

  it("takes the first path that reaches a value, and a list's first entry that reaches one", () => {
    expect(owners().get("two")).toBe("ada")
  })

  it("reaches a page of a type that extends the one the relation targets", () => {
    expect(owners().get("three")).toBe("grace")
  })

  it("answers nothing around a cycle rather than throwing", () => {
    expect(owners().get("four")).toBeNull()
  })

  it("answers nothing where a relation names no page", () => {
    expect(owners().get("five")).toBeNull()
  })

  it("leaves a page of a type declaring nothing derived exactly as its file states it", () => {
    const one = [...deriver(ROOTS).rows("site")!].find((row) => row.at.endsWith("here.site.md"))
    expect(one?.values).toEqual({ slug: "here" })
  })

  it("indexes the pages a relation targets by the `slug-property` it names", () => {
    expect(held("job", "tone").get("six")).toBe("warm")
  })

  it("says nothing about a page type whose pages are not files", () => {
    expect(deriver(ROOTS).rows("nowhere")).toBeNull()
  })
})

describe("the pages a page type answers, which are walked rather than gathered", () => {
  it("answers every page again on a second walk, so a caller may index them and then read them", () => {
    const rows = deriver(ROOTS).rows("job")!
    const indexed = new Map([...rows].map((row) => [row.at, row]))
    const read = [...rows].map((row) => row.at)
    expect(indexed.size).toBe(6)
    expect(read).toEqual([...indexed.keys()])
  })
})

describe("what the walk reports as a fault", () => {
  it("names a path key no property declares", () => {
    expect(faultsOf("job")).toContain("`no-such-key` is declared by no property on `job`")
  })

  it("names a path walked past a key that is no relation", () => {
    expect(faultsOf("job")).toContain("`title` on `job` names no `target-slug`, so a path cannot be walked past it")
  })

  it("reports nothing for a path that simply reaches no value", () => {
    expect(faultsOf("team")).toEqual([])
  })

})

describe("a computed property resolved from the property naming it back", () => {
  it("answers every page whose named property names this one", () => {
    expect(held("team", "jobs").get("roots")).toEqual(["one"])
  })

  it("answers nothing where no page names it", () => {
    expect(held("team", "jobs").get("twig")).toBeNull()
  })

  it("is carried by a page whose type extends the one declaring it", () => {
    expect(held("squad", "jobs").get("alpha")).toEqual(["three"])
  })

  it("gathers from every page type extending the one the naming property is declared on", () => {
    expect(held("person", "leads").get("grace")).toEqual(["alpha"])
  })
})

describe("what a walk back reports as a fault", () => {
  it("names a `back-from` no property declares", () => {
    expect(faultsOf("person")).toContain(
      "`back-from` on `person-nowhere` names `no-such-property`, which no property declares"
    )
  })

  it("names a property stating both, rather than reading one and dropping the other", () => {
    expect(faultsOf("person")).toContain(
      "`person-both` states both `from` and `back-from`, and a property states one or the other"
    )
  })

  it("answers nothing for the property stating both", () => {
    expect(held("person", "both").get("ada")).toBeNull()
  })
})

describe("what an answer says of a key it reached no value for", () => {
  it("names a `keys` entry no property declares and no page states, under `unfound`", () => {
    const got = answer(ROOTS, { pageType: "site", keys: ["slug", "no-such-key"] })
    expect(got?.unfound).toEqual(["no-such-key"])
  })

  it("leaves a `keys` entry a page states off `unfound`, though no property declares it", () => {
    expect(answer(ROOTS, { pageType: "site", keys: ["slug"] })?.unfound).toEqual([])
  })

  it("carries a tested key no page states on `absent`, one walk settling both", () => {
    const got = answer(ROOTS, { pageType: "site", where: [{ key: "no-such-key", is: "anything" }] })
    expect(got?.absent).toEqual(["no-such-key"])
  })

  it("carries a key tested for `empty` on `absent` too, that test naming a key like any other", () => {
    const got = answer(ROOTS, { pageType: "site", where: [{ key: "no-such-key", empty: true }] })
    expect(got?.absent).toEqual(["no-such-key"])
  })

  it("carries it on `absent` under `empty: false`, whose clean zero says least of all", () => {
    const got = answer(ROOTS, { pageType: "site", where: [{ key: "no-such-key", empty: false }] })
    expect(got?.absent).toEqual(["no-such-key"])
  })

  it("leaves a declared key that is genuinely empty off `absent`, so a true empty still answers", () => {
    const got = answer(ROOTS, { pageType: "job", where: [{ key: "owner", empty: true }] })
    expect(got?.absent).toEqual([])
    expect(got?.n).toBe(3)
  })
})

describe("a resolved value read through every operator", () => {
  it("narrows a `where`", () => {
    expect(answer(ROOTS, { pageType: "job", where: [{ key: "owner", is: "ada" }] })?.n).toBe(2)
  })

  it("groups a `count-by`", () => {
    expect(answer(ROOTS, { pageType: "job", countBy: ["owner"] })?.groups).toEqual([
      { by: { owner: null }, n: 3 },
      { by: { owner: "ada" }, n: 2 },
      { by: { owner: "grace" }, n: 1 },
    ])
  })

  it("orders a `sort-by`", () => {
    const sorted = answer(ROOTS, { pageType: "job", sortBy: "owner", descending: true, limit: 1 })
    expect(sorted?.rows[0]?.values.owner).toBe("grace")
  })

  it("is carried back by `keys`", () => {
    const carried = answer(ROOTS, { pageType: "job", where: [{ key: "title", is: "through a subtype" }], keys: ["owner"] })
    expect(carried?.rows).toEqual([{ at: "akasha:pages/job/three.job.md", values: { owner: "grace" } }])
  })
})
