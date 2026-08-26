import { describe, expect, test } from "bun:test"
import {
  type Landed,
  landedOver,
  normalized,
  relativeFrom,
  relocatedPath,
  splitGlob,
  within,
} from "./relocated-path.ts"

const TYPINGS: Landed = { from: "packages/temper/addons", to: "temper/addons" }

const CORE: Landed = { from: "packages/temper/game/items/core", to: "temper/game-items-core" }

const LANDED: readonly Landed[] = [TYPINGS, CORE]

const FROM = "packages/temper/game/items/addon"

const TO = "temper/game-items-addon"

describe("normalized", () => {
  test("it folds a step up into the segment before it", () => {
    expect(normalized("a/b/../c")).toBe("a/c")
  })

  test("it drops a step that goes nowhere", () => {
    expect(normalized("a/./b")).toBe("a/b")
  })

  test("it keeps a step above the root, which is what says a path escaped", () => {
    expect(normalized("a/../../b")).toBe("../b")
  })
})

describe("splitGlob", () => {
  test("a path with no star is all head", () => {
    expect(splitGlob("../../addons/tsconfig.base.json")).toEqual({
      head: "../../addons/tsconfig.base.json",
      tail: "",
    })
  })

  test("the tail begins at the first segment holding a star", () => {
    expect(splitGlob("../../addons/types/eso/**/*.d.ts")).toEqual({
      head: "../../addons/types/eso",
      tail: "**/*.d.ts",
    })
  })

  test("a path that is all glob has an empty head", () => {
    expect(splitGlob("**/*.ts")).toEqual({ head: "", tail: "**/*.ts" })
  })
})

describe("relativeFrom", () => {
  test("a target beside the directory is named with a leading dot", () => {
    expect(relativeFrom("temper/game-items-addon", "temper/addons")).toBe("../addons")
  })

  test("a target beneath the directory is named without stepping up", () => {
    expect(relativeFrom("temper/game-items-addon", "temper/game-items-addon/src")).toBe("./src")
  })

  test("the directory itself is named as itself", () => {
    expect(relativeFrom("temper/x", "temper/x")).toBe(".")
  })

  test("a target at the repository root is reached by stepping up", () => {
    expect(relativeFrom("temper/game-items-addon", "tsconfig.base.json")).toBe(
      "../../tsconfig.base.json"
    )
  })
})

describe("within", () => {
  test("a directory holds itself", () => {
    expect(within("a/b", "a/b")).toBe(true)
  })

  test("a directory holds what is beneath it", () => {
    expect(within("a/b", "a/b/c")).toBe(true)
  })

  test("a sibling whose name merely begins the same is not beneath it", () => {
    expect(within("a/b", "a/bc")).toBe(false)
  })
})

describe("landedOver", () => {
  test("it finds the move whose source holds the target", () => {
    expect(landedOver(LANDED, "packages/temper/addons/types/eso")).toBe(TYPINGS)
  })

  test("nothing holding the target answers nothing", () => {
    expect(landedOver(LANDED, "packages/shared/utils/narrow")).toBe(null)
  })

  test("the longest source wins, so a package inside another is not claimed by the outer one", () => {
    const outer: Landed = { from: "packages/temper", to: "temper" }
    const inner: Landed = { from: "packages/temper/addons", to: "temper/addons" }
    expect(landedOver([outer, inner], "packages/temper/addons/types")).toBe(inner)
  })
})

describe("relocatedPath", () => {
  test("a path inside the package keeps its meaning and its spelling", () => {
    expect(relocatedPath(FROM, TO, "src/**/*.ts", LANDED)).toBe("src/**/*.ts")
  })

  test("a spec written with a leading dot keeps one", () => {
    expect(relocatedPath(FROM, TO, "./src", LANDED)).toBe("./src")
  })

  test("a package that has not moved is refused even where a folder above it has", () => {
    const container = [{ from: "packages", to: "" }]
    const blocked = ["packages/shared/utils/narrow"]
    expect(
      relocatedPath(FROM, TO, "../../../../shared/utils/narrow", container, blocked)
    ).toBe(null)
  })

  test("a package that has moved is taken even where a folder above it also moved", () => {
    const both = [{ from: "packages", to: "" }, CORE]
    const blocked = ["packages/shared/utils/narrow"]
    expect(relocatedPath(FROM, TO, "../../items/core", both, blocked)).toBe("../game-items-core")
  })

  test("a reach into a package that has already landed is renamed to where it landed", () => {
    expect(relocatedPath(FROM, TO, "../../../addons/tsconfig.base.json", LANDED)).toBe(
      "../addons/tsconfig.base.json"
    )
  })

  test("a glob tail is carried through untouched", () => {
    expect(relocatedPath(FROM, TO, "../../../addons/types/eso/**/*.d.ts", LANDED)).toBe(
      "../addons/types/eso/**/*.d.ts"
    )
  })

  test("a reach into a sibling package that landed is renamed to its new name", () => {
    expect(relocatedPath(FROM, TO, "../../items/core", LANDED)).toBe("../game-items-core")
  })

  test("a reach into a package that has not landed is refused rather than guessed", () => {
    expect(relocatedPath(FROM, TO, "../../../../shared/utils/narrow", LANDED)).toBe(null)
  })

  test("a reach above the repository root is refused", () => {
    expect(relocatedPath(FROM, TO, "../../../../../../../elsewhere", LANDED)).toBe(null)
  })

  test("a path that walked out of the package and back in is still the package's own", () => {
    expect(relocatedPath(FROM, TO, "./../addon/src", LANDED)).toBe("./src")
  })

  test("the depth of the old path does not survive into the new one", () => {
    const deep = "packages/temper/game/characters/skills/morphs/addon"
    expect(relocatedPath(deep, "temper/game-characters-skills-morphs-addon", "../../../../../addons/types", LANDED)).toBe(
      "../addons/types"
    )
  })
})

describe("the root and the container that holds the packages are moves like any other", () => {
  const ROOT: Landed = { from: "", to: "" }

  const CONTAINER: Landed = { from: "packages", to: "" }

  test("an empty source holds every path, which is what makes the root expressible", () => {
    expect(within("", "packages/temper/addons")).toBe(true)
  })

  test("a reach to a file at the source root lands at the destination root", () => {
    expect(relocatedPath(FROM, TO, "../../../../../tsconfig.base.json", [...LANDED, ROOT])).toBe(
      "../../tsconfig.base.json"
    )
  })

  test("a rootDir naming the folder the packages sat in follows that folder, not the root", () => {
    expect(relocatedPath(FROM, TO, "../../../..", [...LANDED, CONTAINER])).toBe("../..")
  })

  test("without the container stated, that same rootDir keeps a folder the destination has not got", () => {
    expect(relocatedPath(FROM, TO, "../../../..", [...LANDED, ROOT])).toBe("../../packages")
  })

  test("a package that landed still wins over the container, being the longer source", () => {
    expect(
      relocatedPath(FROM, TO, "../../../addons/tsconfig.base.json", [...LANDED, CONTAINER, ROOT])
    ).toBe("../addons/tsconfig.base.json")
  })
})
