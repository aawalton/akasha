import { describe, expect, test } from "bun:test"
import {
  type AddonCrossClusterInput,
  findUnattachedViewMembers,
  parseAddonSource,
} from "./addon-cross-cluster-attach"

function port(
  files: readonly { path: string; source: string }[],
  ownedGlobals: readonly string[] = ["G"]
): AddonCrossClusterInput {
  return {
    addonName: "Synth",
    ownedGlobals,
    files: files.map((f) => parseAddonSource(f.path, f.source)),
  }
}

const VIEW = {
  path: "src/ui/cross-cluster.ts",
  source: `
    interface View {
      attached: (this: void) => void
      missing: (this: void, n: number) => void
      optional?: (this: void) => void
    }
    function asView(v: unknown): View { return v as View }
    export function uxc(this: void): View { return asView(G) }
  `,
}

describe("findUnattachedViewMembers", () => {
  test("flags a non-optional view member with no attach", () => {
    const v = findUnattachedViewMembers(
      port([
        VIEW,
        { path: "src/public-api.ts", source: `G.attached = attached\nG.optional = optional` },
      ])
    )
    expect(v.map((x) => x.memberName)).toEqual(["missing"])
    expect(v[0]?.viewInterface).toBe("View")
    expect(v[0]?.declaredIn).toBe("src/ui/cross-cluster.ts")
    expect(v[0]?.kind).toBe("crash")
  })

  test("passes when every member (incl. optional) is attached", () => {
    const v = findUnattachedViewMembers(
      port([
        VIEW,
        {
          path: "src/a.ts",
          source: `G.attached = attached\nG.missing = missing\nG.optional = optional`,
        },
      ])
    )
    expect(v).toEqual([])
  })

  test("an optional member WITH an attach passes (legitimate conditional wiring)", () => {
    const v = findUnattachedViewMembers(
      port([
        VIEW,
        {
          path: "src/a.ts",
          source: `G.attached = attached\nG.missing = missing\nG.optional = optional`,
        },
      ])
    )
    expect(v.map((x) => x.memberName)).not.toContain("optional")
  })

  test("flags an optional member with ZERO attach sites as silent-disable (#12804)", () => {
    const v = findUnattachedViewMembers(
      port([VIEW, { path: "src/a.ts", source: `G.attached = attached` }])
    )
    const optional = v.find((x) => x.memberName === "optional")
    expect(optional).toBeDefined()
    expect(optional?.kind).toBe("silent-disable")
    const missing = v.find((x) => x.memberName === "missing")
    expect(missing?.kind).toBe("crash")
  })

  test("flags a flat-promised member attached only nested (G.cp.M = …) — #12764", () => {
    const view = {
      path: "src/cc.ts",
      source: `
        interface V { nested: (this: void) => void }
        function asV(v: unknown): V { return v as V }
        export function xc(this: void): V { return asV(G) }
      `,
    }
    const v = findUnattachedViewMembers(
      port([view, { path: "src/a.ts", source: `G.cp.nested = nested` }])
    )
    expect(v.map((x) => x.memberName)).toEqual(["nested"])
  })

  test("a nested attach of an unrelated name does not interfere with a flat attach", () => {
    const view = {
      path: "src/cc.ts",
      source: `
        interface V { attached: (this: void) => void }
        function asV(v: unknown): V { return v as V }
        export function xc(this: void): V { return asV(G) }
      `,
    }
    const v = findUnattachedViewMembers(
      port([view, { path: "src/a.ts", source: `G.attached = attached\nG.cp.other = other` }])
    )
    expect(v).toEqual([])
  })

  test("credits a member seeded in the globalThis.G = { … } publish literal", () => {
    const view = {
      path: "src/cc.ts",
      source: `
        interface V { seeded: (this: void) => void }
        function asV(v: unknown): V { return v as V }
        export function xc(this: void): V { return asV(G) }
      `,
    }
    const v = findUnattachedViewMembers(
      port([view, { path: "src/state.ts", source: `globalThis.G = { seeded() {} }` }])
    )
    expect(v).toEqual([])
  })

  test("a helper that merely mentions G is not a view accessor", () => {
    const files = [
      {
        path: "src/cc.ts",
        source: `
          interface NotAView { phantom: (this: void) => void }
          export function helper(this: void): NotAView {
            const x = G.something
            return makeIt(x)
          }
        `,
      },
    ]
    expect(findUnattachedViewMembers(port(files))).toEqual([])
  })

  test("detects the `G as unknown as T` accessor form", () => {
    const files = [
      {
        path: "src/cc.ts",
        source: `
          interface V { m: (this: void) => void }
          export function v(this: void): V { return G as unknown as V }
        `,
      },
    ]
    expect(findUnattachedViewMembers(port(files)).map((x) => x.memberName)).toEqual(["m"])
  })

  test("follows extends heritage for required members", () => {
    const files = [
      {
        path: "src/cc.ts",
        source: `
          interface Base { inherited: (this: void) => void }
          interface V extends Base { own: (this: void) => void }
          function asV(v: unknown): V { return v as V }
          export function xc(this: void): V { return asV(G) }
        `,
      },
      { path: "src/a.ts", source: `G.own = own` },
    ]
    expect(findUnattachedViewMembers(port(files)).map((x) => x.memberName)).toEqual(["inherited"])
  })

  test("non-function members are not required (data fields)", () => {
    const files = [
      {
        path: "src/cc.ts",
        source: `
          interface V { settings: { x: number }; fn: (this: void) => void }
          function asV(v: unknown): V { return v as V }
          export function xc(this: void): V { return asV(G) }
        `,
      },
      { path: "src/a.ts", source: `G.fn = fn` },
    ]
    expect(findUnattachedViewMembers(port(files))).toEqual([])
  })

  test("flags a promise made by a cast helper applied to the global at a CALL SITE (#18361)", () => {
    const files = [
      {
        path: "src/send.ts",
        source: `
          interface Creator { CreateWindow: (this: void) => void }
          function asCreator(value: unknown): Creator { return value as Creator }
          function run(this: void): undefined { asCreator(G).CreateWindow() }
        `,
      },
    ]
    const v = findUnattachedViewMembers(port(files))
    expect(v.map((x) => x.memberName)).toEqual(["CreateWindow"])
    expect(v[0]?.viewInterface).toBe("Creator")
    expect(v[0]?.kind).toBe("crash")
  })

  test("a call-site cast helper reaches the global from another file", () => {
    const files = [
      {
        path: "src/view.ts",
        source: `
          interface Creator { CreateWindow: (this: void) => void }
          export function asCreator(value: unknown): Creator { return value as Creator }
        `,
      },
      { path: "src/use.ts", source: `asCreator(globalThis.G).CreateWindow()` },
    ]
    expect(findUnattachedViewMembers(port(files)).map((x) => x.memberName)).toEqual([
      "CreateWindow",
    ])
  })

  test("an arrow-form cast helper promises exactly as the function form does", () => {
    const files = [
      {
        path: "src/view.ts",
        source: `
          interface Creator { CreateWindow: (this: void) => void }
          const asCreator = (value: unknown): Creator => value as Creator
          asCreator(G).CreateWindow()
        `,
      },
    ]
    expect(findUnattachedViewMembers(port(files)).map((x) => x.memberName)).toEqual([
      "CreateWindow",
    ])
  })

  test("flags an inline `(G as T)` promise at the use site", () => {
    const files = [
      {
        path: "src/use.ts",
        source: `
          interface V { m: (this: void) => void }
          function run(this: void): undefined { (G as unknown as V).m() }
        `,
      },
    ]
    expect(findUnattachedViewMembers(port(files)).map((x) => x.memberName)).toEqual(["m"])
  })

  test("a call-site promise is satisfied by a flat attach, exactly as an accessor's is", () => {
    const files = [
      {
        path: "src/view.ts",
        source: `
          interface Creator { CreateWindow: (this: void) => void }
          function asCreator(value: unknown): Creator { return value as Creator }
          asCreator(G).CreateWindow()
        `,
      },
      { path: "src/public-api.ts", source: `G.CreateWindow = CreateWindow` },
    ]
    expect(findUnattachedViewMembers(port(files))).toEqual([])
  })

  test("a cast helper applied to something OTHER than the global promises nothing", () => {
    const files = [
      {
        path: "src/view.ts",
        source: `
          interface Control { SetText: (this: Control, t: string) => void }
          function asControl(value: unknown): Control { return value as Control }
          asControl(G.controls.house).SetText("x")
          asControl(someLocal).SetText("y")
        `,
      },
    ]
    expect(findUnattachedViewMembers(port(files))).toEqual([])
  })

  test("a helper that DERIVES its result is not a cast helper", () => {
    const files = [
      {
        path: "src/view.ts",
        source: `
          interface V { phantom: (this: void) => void }
          function makeV(value: unknown): V { return build(value) }
          makeV(G).phantom()
        `,
      },
    ]
    expect(findUnattachedViewMembers(port(files))).toEqual([])
  })

  test("no owned globals → no views, no violations", () => {
    const files = [
      {
        path: "src/cc.ts",
        source: `
          interface V { m: (this: void) => void }
          export function v(this: void): V { return G as unknown as V }
        `,
      },
    ]
    expect(findUnattachedViewMembers(port(files, []))).toEqual([])
  })
})
