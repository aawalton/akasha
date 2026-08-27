import { describe, expect, test } from "bun:test"
import {
  buildSandboxGlobals,
  createPermissiveStub,
  ESO_API_SEED,
  ESO_STRUCTURALLY_ABSENT,
  isPermissiveStub,
} from "./eso-sandbox-globals"

describe("createPermissiveStub", () => {
  test("exposes the __esoPermissiveStub marker", () => {
    const stub = createPermissiveStub()
    expect(isPermissiveStub(stub)).toBe(true)
  })

  test("auto-vivifies on property access (returns another stub)", () => {
    const stub = createPermissiveStub()
    expect(isPermissiveStub(stub.anyProperty)).toBe(true)
    const deep = stub.deep
    if (deep === undefined) throw new Error("expected stub")
    const nested = deep.nested
    if (nested === undefined) throw new Error("expected stub")
    expect(isPermissiveStub(nested.chain)).toBe(true)
  })

  test("memoises per-key so repeated access returns the same child", () => {
    const stub = createPermissiveStub()
    expect(stub.child).toBe(stub.child)
    const a = stub.a
    if (a === undefined) throw new Error("expected stub")
    expect(a.b).toBe(a.b)
  })

  test("is callable and returns another stub", () => {
    const stub = createPermissiveStub()
    const result = stub("x", 1)
    expect(isPermissiveStub(result)).toBe(true)
  })

  test("supports method-style invocation via index + call", () => {
    const stub = createPermissiveStub()
    const fn = stub.RegisterForEvent
    if (fn === undefined) throw new Error("expected stub")
    const result = fn("Addon", "EVENT_ADD_ON_LOADED")
    expect(isPermissiveStub(result)).toBe(true)
  })

  test("returns undefined for symbol probes (no stub leak)", () => {
    const stub = createPermissiveStub()
    expect(Reflect.get(stub, Symbol.iterator)).toBeUndefined()
  })

  test("returns undefined for the `then` probe (non-thenable)", () => {
    const stub = createPermissiveStub()
    expect(stub.then).toBeUndefined()
  })

  test("returns undefined for wasmoon's $istable / $getRef probes", () => {
    const stub = createPermissiveStub()
    expect(stub.$istable).toBeUndefined()
    expect(stub.$getRef).toBeUndefined()
  })

  test("toString resolves to Function.prototype.toString (real string)", () => {
    const stub = createPermissiveStub()
    expect(typeof stub.toString()).toBe("string")
  })
})

describe("buildSandboxGlobals", () => {
  test("seeds every ESO_API_SEED name with a permissive stub", () => {
    const g = buildSandboxGlobals()
    for (const name of ESO_API_SEED) {
      expect(g[name]).toBeDefined()
      expect(isPermissiveStub(g[name])).toBe(true)
    }
  })

  test("banned globals are structurally absent from the returned object", () => {
    const g = buildSandboxGlobals()
    for (const banned of ESO_STRUCTURALLY_ABSENT) {
      expect(Object.hasOwn(g, banned)).toBe(false)
      expect(g[banned]).toBeUndefined()
    }
  })

  test("supports overriding the ESO API seed list", () => {
    const g = buildSandboxGlobals({ esoApis: ["CUSTOM_API"] })
    expect(g.CUSTOM_API).toBeDefined()
    expect(isPermissiveStub(g.CUSTOM_API)).toBe(true)
    expect(g.EVENT_MANAGER).toBeUndefined()
  })

  test("merges extraGlobals on top of seeds", () => {
    const marker = { kind: "injected" }
    const g = buildSandboxGlobals({ extraGlobals: { MY_ADDON: marker } })
    expect(g.MY_ADDON).toBe(marker)
    expect(isPermissiveStub(g.EVENT_MANAGER)).toBe(true)
  })

  test("does not mutate the default seed list across calls", () => {
    const a = buildSandboxGlobals()
    const b = buildSandboxGlobals()
    expect(a).not.toBe(b)
    expect(a.EVENT_MANAGER).not.toBe(b.EVENT_MANAGER)
  })
})
