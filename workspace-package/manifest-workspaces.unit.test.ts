import { describe, expect, test } from "bun:test"
import { manifestWorkspaces, workspacesIn } from "./manifest-workspaces.ts"

const MANIFEST = `{
  "name": "code",
  "private": true,
  "workspaces": [
    "packages/temper/game/items/addon",
    "packages/shared/utils/narrow"
  ]
}
`

describe("workspacesIn", () => {
  test("it reads the array a manifest states", () => {
    expect(workspacesIn(MANIFEST)).toEqual([
      "packages/temper/game/items/addon",
      "packages/shared/utils/narrow",
    ])
  })

  test("a manifest stating none has an empty one rather than nothing", () => {
    expect(workspacesIn('{ "name": "x" }')).toEqual([])
  })

  test("a body that is not JSON answers nothing", () => {
    expect(workspacesIn("not json")).toBe(null)
  })

  test("an array holding something other than a path answers nothing", () => {
    expect(workspacesIn('{ "workspaces": [1] }')).toBe(null)
  })

  test("the object form bun also accepts is not read as a list", () => {
    expect(workspacesIn('{ "workspaces": { "packages": ["a"] } }')).toBe(null)
  })
})

describe("manifestWorkspaces", () => {
  test("a package leaving is dropped from the array", () => {
    const out = manifestWorkspaces(MANIFEST, "packages/temper/game/items/addon", "dropping")
    expect(out?.changed).toBe(true)
    expect(workspacesIn(out?.body ?? "")).toEqual(["packages/shared/utils/narrow"])
  })

  test("a package arriving is added to the array", () => {
    const out = manifestWorkspaces(MANIFEST, "temper/addons", "adding")
    expect(workspacesIn(out?.body ?? "")).toContain("temper/addons")
  })

  test("everything else the manifest states survives the rewrite", () => {
    const out = manifestWorkspaces(MANIFEST, "temper/addons", "adding")
    const read = JSON.parse(out?.body ?? "{}") as Record<string, unknown>
    expect(read.name).toBe("code")
    expect(read.private).toBe(true)
  })

  test("dropping what the array never named changes nothing", () => {
    const out = manifestWorkspaces(MANIFEST, "packages/elsewhere", "dropping")
    expect(out?.changed).toBe(false)
    expect(out?.body).toBe(MANIFEST)
  })

  test("adding what a glob already covers changes nothing", () => {
    const globbed = '{ "workspaces": ["temper/*"] }'
    const out = manifestWorkspaces(globbed, "temper/addons", "adding")
    expect(out?.changed).toBe(false)
  })

  test("adding what is already named changes nothing", () => {
    const out = manifestWorkspaces(MANIFEST, "packages/shared/utils/narrow", "adding")
    expect(out?.changed).toBe(false)
  })

  test("a manifest that is not readable JSON answers nothing rather than being rewritten", () => {
    expect(manifestWorkspaces("not json", "a", "adding")).toBe(null)
  })

  test("the body ends with a newline, which is how a manifest is written", () => {
    const out = manifestWorkspaces(MANIFEST, "temper/addons", "adding")
    expect(out?.body.endsWith("\n")).toBe(true)
  })
})
