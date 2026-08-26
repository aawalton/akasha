import { describe, expect, test } from "bun:test"
import {
  coveredByGlob,
  globCovers,
  globParts,
  workspacesAdding,
  workspacesDropping,
} from "./workspaces-array.ts"

const AKASHA_WORKSPACES = [
  "editor-extension",
  "native-shell/atlas",
  "lua-compiler",
  "lua-compiler/vendor/*",
]

describe("globParts", () => {
  test("it counts one trailing star as one level below the prefix", () => {
    expect(globParts("packages/*")).toEqual({ prefix: "packages", depth: 1 })
  })

  test("it counts each trailing star, so two are two levels", () => {
    expect(globParts("packages/*/*")).toEqual({ prefix: "packages", depth: 2 })
  })

  test("it refuses an entry with no star, which covers nothing by pattern", () => {
    expect(() => globParts("lua-compiler")).toThrow()
  })

  test("it refuses a star that is not trailing, rather than reading a meaning into it", () => {
    expect(() => globParts("packages/*/src")).toThrow()
  })
})

describe("globCovers", () => {
  test("a package one level under the prefix is covered", () => {
    expect(globCovers("lua-compiler/vendor/*", "lua-compiler/vendor/lua-runner")).toBe(true)
  })

  test("a package deeper than the star is not covered", () => {
    expect(globCovers("lua-compiler/vendor/*", "lua-compiler/vendor/lua-runner/src")).toBe(false)
  })

  test("the prefix itself is not covered by its own star", () => {
    expect(globCovers("lua-compiler/vendor/*", "lua-compiler/vendor")).toBe(false)
  })

  test("a literal entry covers nothing by pattern, not even itself", () => {
    expect(globCovers("lua-compiler", "lua-compiler")).toBe(false)
  })

  test("a path outside the prefix is not covered", () => {
    expect(globCovers("lua-compiler/vendor/*", "temper/game-items-addon")).toBe(false)
  })
})

describe("coveredByGlob", () => {
  test("it answers for the whole array, not one entry", () => {
    expect(coveredByGlob(AKASHA_WORKSPACES, "lua-compiler/vendor/utils")).toBe(true)
    expect(coveredByGlob(AKASHA_WORKSPACES, "temper/game-items-addon")).toBe(false)
  })

  test("a literal entry in the array is not covered by a glob", () => {
    expect(coveredByGlob(AKASHA_WORKSPACES, "editor-extension")).toBe(false)
  })
})

describe("workspacesAdding", () => {
  test("a path no entry covers is appended, and the array says it changed", () => {
    const after = workspacesAdding(AKASHA_WORKSPACES, "temper/game-items-addon")
    expect(after.changed).toBe(true)
    expect(after.workspaces).toEqual([...AKASHA_WORKSPACES, "temper/game-items-addon"])
  })

  test("a path a glob already covers is left alone, so no entry is written twice", () => {
    const after = workspacesAdding(AKASHA_WORKSPACES, "lua-compiler/vendor/lua-runner")
    expect(after.changed).toBe(false)
    expect(after.workspaces).toEqual(AKASHA_WORKSPACES)
  })

  test("a path already listed literally is left alone", () => {
    const after = workspacesAdding(AKASHA_WORKSPACES, "editor-extension")
    expect(after.changed).toBe(false)
    expect(after.workspaces).toEqual(AKASHA_WORKSPACES)
  })

  test("the entry lands at the end, so an existing order is not disturbed", () => {
    const after = workspacesAdding(["b", "a"], "c")
    expect(after.workspaces).toEqual(["b", "a", "c"])
  })
})

describe("workspacesDropping", () => {
  test("a literal entry is taken away", () => {
    const after = workspacesDropping(AKASHA_WORKSPACES, "editor-extension")
    expect(after.changed).toBe(true)
    expect(after.workspaces).toEqual(["native-shell/atlas", "lua-compiler", "lua-compiler/vendor/*"])
  })

  test("a path only a glob covered leaves no entry to take away", () => {
    const after = workspacesDropping(AKASHA_WORKSPACES, "lua-compiler/vendor/lua-runner")
    expect(after.changed).toBe(false)
    expect(after.workspaces).toEqual(AKASHA_WORKSPACES)
  })

  test("a path nothing named is left alone", () => {
    const after = workspacesDropping(AKASHA_WORKSPACES, "temper/nothing-here")
    expect(after.changed).toBe(false)
    expect(after.workspaces).toEqual(AKASHA_WORKSPACES)
  })

  test("only the named entry goes, and every other is kept in order", () => {
    const after = workspacesDropping(["a", "b", "c"], "b")
    expect(after.workspaces).toEqual(["a", "c"])
  })
})

describe("adding and dropping are the two halves of a move across repositories", () => {
  test("dropping in the source and adding in the destination leave each array right", () => {
    const source = ["packages/temper/game/items/addon", "packages/shared/*"]
    const destination = ["lua-compiler"]
    const dropped = workspacesDropping(source, "packages/temper/game/items/addon")
    const added = workspacesAdding(destination, "temper/game-items-addon")
    expect(dropped.workspaces).toEqual(["packages/shared/*"])
    expect(added.workspaces).toEqual(["lua-compiler", "temper/game-items-addon"])
  })
})
