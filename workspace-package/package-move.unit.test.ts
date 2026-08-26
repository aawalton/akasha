import { describe, expect, test } from "bun:test"
import type { Repointed } from "../repoint/repoint.ts"
import type { Landed } from "./relocated-path.ts"
import {
  carriesManifest,
  movesForPackage,
  namesTsconfig,
  within,
  withTsconfigsRelocated,
} from "./package-move.ts"

const FROM = "packages/temper/game/items/addon"

const TO = "temper/game-items-addon"

const TRACKED = [
  "packages/temper/game/items/addon/package.json",
  "packages/temper/game/items/addon/tsconfig.json",
  "packages/temper/game/items/addon/src/main.ts",
  "packages/temper/game/items/addon/metadata/TemperItems.txt",
  "packages/temper/game/items/core/package.json",
  "packages/temper/game/items/addon-extras/package.json",
]

const LANDED: readonly Landed[] = [
  { from: "packages/temper/addons", to: "temper/addons" },
  { from: "packages", to: "" },
]

function entry(relPath: string, body: string, moved: boolean): Repointed {
  return { relPath, body, notes: [], moved }
}

describe("within", () => {
  test("a directory holds a file beneath it", () => {
    expect(within(FROM, `${FROM}/src/main.ts`)).toBe(true)
  })

  test("a sibling whose name merely begins the same is not beneath it", () => {
    expect(within(FROM, "packages/temper/game/items/addon-extras/package.json")).toBe(false)
  })
})

describe("carriesManifest", () => {
  test("a directory with a manifest is a package", () => {
    expect(carriesManifest(TRACKED, FROM)).toBe(true)
  })

  test("a directory with no manifest is not", () => {
    expect(carriesManifest(TRACKED, "packages/temper/game/items")).toBe(false)
  })
})

describe("movesForPackage", () => {
  test("every tracked file under the package is given a destination", () => {
    const moves = movesForPackage(FROM, TO, TRACKED)
    expect([...moves.entries()].sort()).toEqual([
      ["packages/temper/game/items/addon/metadata/TemperItems.txt", `${TO}/metadata/TemperItems.txt`],
      ["packages/temper/game/items/addon/package.json", `${TO}/package.json`],
      ["packages/temper/game/items/addon/src/main.ts", `${TO}/src/main.ts`],
      ["packages/temper/game/items/addon/tsconfig.json", `${TO}/tsconfig.json`],
    ])
  })

  test("a sibling package sharing a name prefix is left where it is", () => {
    const moves = movesForPackage(FROM, TO, TRACKED)
    expect(moves.has("packages/temper/game/items/addon-extras/package.json")).toBe(false)
  })

  test("the tree under the package is carried whole, not flattened", () => {
    const moves = movesForPackage(FROM, TO, TRACKED)
    expect(moves.get(`${FROM}/src/main.ts`)).toBe(`${TO}/src/main.ts`)
  })

  test("a package holding nothing tracked moves nothing", () => {
    expect(movesForPackage("packages/nothing", "nothing", TRACKED).size).toBe(0)
  })
})

describe("namesTsconfig", () => {
  test("the plain name is one", () => {
    expect(namesTsconfig("temper/x/tsconfig.json")).toBe(true)
  })

  test("a name with a middle suffix is one, a package having several", () => {
    expect(namesTsconfig("temper/x/tsconfig.base.json")).toBe(true)
  })

  test("a file merely mentioning it is not", () => {
    expect(namesTsconfig("temper/x/check-tsconfig.ts")).toBe(false)
  })

  test("a manifest is not", () => {
    expect(namesTsconfig("temper/x/package.json")).toBe(false)
  })
})

describe("withTsconfigsRelocated", () => {
  const CONFIG = '{ "extends": "../../../addons/tsconfig.base.json", "include": ["src"] }'

  test("a moved tsconfig has its paths renamed to where their targets landed", () => {
    const out = withTsconfigsRelocated(
      [entry(`${TO}/tsconfig.json`, CONFIG, true)],
      FROM,
      TO,
      LANDED
    )
    expect(out.entries[0]?.body).toContain('"../addons/tsconfig.base.json"')
    expect(out.renamed).toBe(1)
  })

  test("a file that only had a mention repointed is left as the survey left it", () => {
    const said = entry("packages/elsewhere/notes.md", CONFIG, false)
    const out = withTsconfigsRelocated([said], FROM, TO, LANDED)
    expect(out.entries[0]).toBe(said)
  })

  test("a moved file that is not a tsconfig is left alone", () => {
    const said = entry(`${TO}/package.json`, CONFIG, true)
    const out = withTsconfigsRelocated([said], FROM, TO, LANDED)
    expect(out.entries[0]).toBe(said)
  })

  test("a path into a package that has not moved is refused, named by the file carrying it", () => {
    const body = '{ "extends": "../../../../shared/utils/narrow/tsconfig.json" }'
    const out = withTsconfigsRelocated(
      [entry(`${TO}/tsconfig.json`, body, true)],
      FROM,
      TO,
      LANDED,
      ["packages/shared/utils/narrow"]
    )
    expect(out.refused).toEqual([
      `${TO}/tsconfig.json:../../../../shared/utils/narrow/tsconfig.json`,
    ])
  })

  test("what it renamed is added to the notes the survey already carried", () => {
    const said = { ...entry(`${TO}/tsconfig.json`, CONFIG, true), notes: ["a link was repointed"] }
    const out = withTsconfigsRelocated([said], FROM, TO, LANDED)
    expect(out.entries[0]?.notes).toEqual([
      "a link was repointed",
      "../../../addons/tsconfig.base.json → ../addons/tsconfig.base.json",
    ])
  })

  test("a tsconfig that is not readable JSON is carried through rather than dropped", () => {
    const said = entry(`${TO}/tsconfig.json`, "not json", true)
    const out = withTsconfigsRelocated([said], FROM, TO, LANDED)
    expect(out.entries[0]).toBe(said)
    expect(out.refused).toEqual([])
  })
})
