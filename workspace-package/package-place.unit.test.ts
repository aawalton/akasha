import { describe, expect, test } from "bun:test"
import { collisionsIn, landedFor, type Placing, placeOf, planFrom } from "./package-place.ts"

describe("placeOf", () => {
  test("a scoped name becomes the scope as a folder and the rest as the name", () => {
    expect(placeOf("@temper/game-items-addon")).toBe("temper/game-items-addon")
  })

  test("an unscoped name is a folder of its own", () => {
    expect(placeOf("lua-compiler")).toBe("lua-compiler")
  })

  test("the depth of the old path leaves no trace in the new one", () => {
    expect(placeOf("@temper/game-collections-antiquities-capture-core")).toBe(
      "temper/game-collections-antiquities-capture-core"
    )
  })

  test("a name carrying a second slash is refused rather than guessed at", () => {
    expect(placeOf("@temper/game/items")).toBe(null)
  })

  test("a scope with no name is refused", () => {
    expect(placeOf("@temper/")).toBe(null)
  })

  test("a name that is only a scope is refused", () => {
    expect(placeOf("@temper")).toBe(null)
  })

  test("an empty name is refused", () => {
    expect(placeOf("")).toBe(null)
  })
})

describe("planFrom", () => {
  const NAMED = new Map([
    ["packages/temper/game/items/addon", "@temper/game-items-addon"],
    ["packages/shared/utils/narrow", "@shared/utils-narrow"],
  ])

  test("every package is given the place its own name states", () => {
    expect(planFrom(NAMED)).toEqual([
      { name: "@shared/utils-narrow", from: "packages/shared/utils/narrow", to: "shared/utils-narrow" },
      { name: "@temper/game-items-addon", from: "packages/temper/game/items/addon", to: "temper/game-items-addon" },
    ])
  })

  test("a package whose name states no place is left out rather than guessed at", () => {
    expect(planFrom(new Map([["packages/x", "@a/b/c"]]))).toEqual([])
  })
})

describe("collisionsIn", () => {
  test("two packages claiming one place are named, a plan being settled before anything moves", () => {
    const plan: readonly Placing[] = [
      { name: "@shared/utils-narrow", from: "akasha:packages/shared/utils/narrow", to: "shared/utils-narrow" },
      { name: "@shared/utils-narrow", from: "code-editor:packages/shared/utils/narrow", to: "shared/utils-narrow" },
    ]
    expect(collisionsIn(plan)).toEqual([
      "shared/utils-narrow is claimed by akasha:packages/shared/utils/narrow and code-editor:packages/shared/utils/narrow",
    ])
  })

  test("a plan where each place is claimed once has nothing to report", () => {
    expect(collisionsIn(planFrom(new Map([["a", "@x/one"], ["b", "@x/two"]])))).toEqual([])
  })
})

describe("landedFor", () => {
  const PLAN = planFrom(new Map([["packages/temper/addons", "@temper/addons"]]))

  test("the table opens with a root going nowhere, no relative path crossing a repository", () => {
    expect(landedFor(PLAN)[0]).toEqual({ from: "", to: null })
  })

  test("every planned package is an entry, whether or not it has moved yet", () => {
    expect(landedFor(PLAN)).toContainEqual({ from: "packages/temper/addons", to: "temper/addons" })
  })

  test("a plan naming nothing still refuses everything, which is the safe answer", () => {
    expect(landedFor([])).toEqual([{ from: "", to: null }])
  })
})
