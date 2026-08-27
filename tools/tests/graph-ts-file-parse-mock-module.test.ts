import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { type ParsedMockModuleCall, visitForMockModuleCalls } from "../lib/graph/producers/file/ts-file/parse-mock-module.ts"

const parseAll = (text: string): readonly ParsedMockModuleCall[] => {
  const sf = ts.createSourceFile("/x.test.ts", text, ts.ScriptTarget.ESNext, true)
  return visitForMockModuleCalls(sf)
}

type LiteralMockModuleCall = Extract<ParsedMockModuleCall, { specifierKind: "literal" }>

const parse = (text: string): readonly LiteralMockModuleCall[] =>
  parseAll(text).filter((call) => call.specifierKind === "literal")

describe("visitForMockModuleCalls", () => {
  test("bare object-literal factory captures keys in source order", () => {
    const out = parse(`mock.module("./x", () => ({ foo: 1, bar() {} }))`)
    expect(out).toHaveLength(1)
    expect(out[0]?.specifier).toBe("./x")
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo", "bar"],
      delegatedKeys: [],
    })
  })

  test("await wrapper plus shorthand and string-literal property names", () => {
    const out = parse(`async function f() { await mock.module("./x", () => ({ a, "b": 2 })) }`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["a", "b"],
      delegatedKeys: [],
    })
  })

  test("block body with single return of object literal is accepted", () => {
    const out = parse(`mock.module("./x", () => { return { a: 1 } })`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["a"],
      delegatedKeys: [],
    })
  })

  test("spread in factory is unanalyzable", () => {
    const out = parse(`mock.module("./x", () => ({ ...other }))`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({ kind: "unanalyzable", reason: "factory-has-spread" })
  })

  test("computed property name is unanalyzable", () => {
    const out = parse(`mock.module("./x", () => ({ [k]: 1 }))`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({ kind: "unanalyzable", reason: "factory-has-computed-key" })
  })

  test("getter accessor is unanalyzable", () => {
    const out = parse(`mock.module("./x", () => ({ get foo() { return 1 } }))`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({ kind: "unanalyzable", reason: "factory-has-accessor" })
  })

  test("non-arrow function factory is unanalyzable", () => {
    const out = parse(`mock.module("./x", function() { return { a: 1 } })`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({
      kind: "unanalyzable",
      reason: "factory-not-arrow-function",
    })
  })

  test("arrow returning a call expression is unanalyzable", () => {
    const out = parse(`mock.module("./x", () => makeMock())`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({
      kind: "unanalyzable",
      reason: "factory-body-not-object-literal",
    })
  })

  test("block body with multiple statements is unanalyzable", () => {
    const out = parse(`mock.module("./x", () => { const x = 1; return { a: x } })`)
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({
      kind: "unanalyzable",
      reason: "factory-body-not-object-literal",
    })
  })

  test("non-literal specifier is emitted on the unreadable arm, not dropped", () => {
    const out = parseAll(`mock.module(specVar, () => ({}))`)
    expect(out).toEqual([{ specifierKind: "unreadable", specifierText: "specVar", line: 1 }])
  })

  test("a template with substitutions is unreadable and quotes its own source", () => {
    const out = parseAll("mock.module(`./${dir}/x`, () => ({}))")
    expect(out).toEqual([{ specifierKind: "unreadable", specifierText: "`./${dir}/x`", line: 1 }])
  })

  test("an unreadable specifier spread over lines is quoted on one", () => {
    const out = parseAll(`mock.module(\n  buildSpecifier(\n    base\n  ),\n  () => ({})\n)`)
    expect(out).toHaveLength(1)
    expect(out[0]).toEqual({
      specifierKind: "unreadable",
      specifierText: "buildSpecifier( base )",
      line: 1,
    })
  })

  test("an unreadable specifier longer than the limit is truncated", () => {
    const long = "x".repeat(200)
    const out = parseAll(`mock.module(${long}, () => ({}))`)
    expect(out).toHaveLength(1)
    const only = out[0]
    expect(only?.specifierKind).toBe("unreadable")
    if (only === undefined || only.specifierKind !== "unreadable") return
    expect(only.specifierText).toBe(`${"x".repeat(80)}…`)
  })

  test("a readable and an unreadable call in one file are both emitted", () => {
    const out = parseAll(`mock.module("./a", () => ({ a: 1 }))\nmock.module(spec, () => ({}))`)
    expect(out).toHaveLength(2)
    expect(out.map((c) => c.specifierKind)).toEqual(["literal", "unreadable"])
  })

  test("multiple mock.module calls preserve source order", () => {
    const out = parse(`mock.module("./a", () => ({ a: 1 }))\nmock.module("./b", () => ({ b: 2 }))`)
    expect(out).toHaveLength(2)
    expect(out[0]?.specifier).toBe("./a")
    expect(out[0]?.line).toBe(1)
    expect(out[1]?.specifier).toBe("./b")
    expect(out[1]?.line).toBe(2)
  })

  test("non-`mock` identifier is not detected", () => {
    const out = parse(`notMock.module("./x", () => ({}))`)
    expect(out).toEqual([])
  })

  test("non-`module` member is not detected", () => {
    const out = parse(`mock.notModule("./x", () => ({}))`)
    expect(out).toEqual([])
  })
})

describe("visitForMockModuleCalls — delegatedKeys", () => {
  test("await import binding: property-access value is delegated, stub is not", () => {
    const out = parse(
      `const real = await import("./x")\n` +
        `mock.module("./x", () => ({ keep: real.keep, stub: () => false }))`
    )
    expect(out).toHaveLength(1)
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["keep", "stub"],
      delegatedKeys: ["keep"],
    })
  })

  test("namespace import binding delegates via property access", () => {
    const out = parse(
      `import * as real from "./x"\n` + `mock.module("./x", () => ({ a: real.a, b: real.b, c: 1 }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["a", "b", "c"],
      delegatedKeys: ["a", "b"],
    })
  })

  test("default import binding delegates", () => {
    const out = parse(`import real from "./x"\nmock.module("./x", () => ({ a: real.a }))`)
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["a"],
      delegatedKeys: ["a"],
    })
  })

  test("property access on a base NOT bound to the mocked specifier is not delegation", () => {
    const out = parse(
      `import * as other from "./other"\n` + `mock.module("./x", () => ({ a: other.a }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["a"],
      delegatedKeys: [],
    })
  })

  test("const = import(specifier) (no await) also binds for delegation", () => {
    const out = parse(`const real = import("./x")\nmock.module("./x", () => ({ a: real.a }))`)
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["a"],
      delegatedKeys: ["a"],
    })
  })

  test("a binding to a different specifier does not delegate this mock", () => {
    const out = parse(`const real = await import("./y")\nmock.module("./x", () => ({ a: real.a }))`)
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["a"],
      delegatedKeys: [],
    })
  })
})

describe("visitForMockModuleCalls — snapshot-const delegation", () => {
  test("module-scope const snapshot of a real export is delegated", () => {
    const out = parse(
      `import * as real from "./x"\n` +
        `const realFoo = real.foo\n` +
        `mock.module("./x", () => ({ foo: realFoo, bar: () => 0 }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo", "bar"],
      delegatedKeys: ["foo"],
    })
  })

  test("const alias of the namespace binding delegates via property access", () => {
    const out = parse(
      `import * as real from "./x"\n` +
        `const alias = real\n` +
        `mock.module("./x", () => ({ foo: alias.foo }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: ["foo"],
    })
  })

  test("snapshot const from a different specifier is not delegation", () => {
    const out = parse(
      `import * as other from "./y"\n` +
        `const otherFoo = other.foo\n` +
        `mock.module("./x", () => ({ foo: otherFoo }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: [],
    })
  })

  test("let snapshot is not a delegation base by itself (mutable without reset)", () => {
    const out = parse(
      `import * as real from "./x"\n` +
        `let realFoo = real.foo\n` +
        `mock.module("./x", () => ({ foo: realFoo }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: [],
    })
  })
})

describe("visitForMockModuleCalls — benign-default wrapper delegation", () => {
  const WRAPPER_PREFIX =
    `import * as real from "./x"\n` +
    `const realFoo = real.foo\n` +
    `let currentFoo: typeof realFoo = realFoo\n`

  test("wrapper over a mutable binding with afterAll reset is delegated", () => {
    const out = parse(
      WRAPPER_PREFIX +
        `afterAll(() => { currentFoo = realFoo })\n` +
        `mock.module("./x", () => ({ foo: (a: number, b: number) => currentFoo(a, b) }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: ["foo"],
    })
  })

  test("no-arg wrapper with afterAll reset is delegated", () => {
    const out = parse(
      WRAPPER_PREFIX +
        `afterAll(() => { currentFoo = realFoo })\n` +
        `mock.module("./x", () => ({ foo: () => currentFoo() }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: ["foo"],
    })
  })

  test("wrapper without an afterAll reset is NOT delegated", () => {
    const out = parse(
      WRAPPER_PREFIX + `mock.module("./x", () => ({ foo: (a: number) => currentFoo(a) }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: [],
    })
  })

  test("afterAll resetting a different binding does not delegate the wrapper", () => {
    const out = parse(
      WRAPPER_PREFIX +
        `let otherBinding = realFoo\n` +
        `afterAll(() => { otherBinding = realFoo })\n` +
        `mock.module("./x", () => ({ foo: (a: number) => currentFoo(a) }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: [],
    })
  })

  test("afterAll resetting to a non-snapshot value does not delegate", () => {
    const out = parse(
      WRAPPER_PREFIX +
        `const fake = () => 0\n` +
        `afterAll(() => { currentFoo = fake })\n` +
        `mock.module("./x", () => ({ foo: (a: number) => currentFoo(a) }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: [],
    })
  })

  test("wrapper calling an unrelated module-scope fn is NOT delegated", () => {
    const out = parse(
      `import * as real from "./x"\n` +
        `const scripted = () => 0\n` +
        `afterAll(() => {})\n` +
        `mock.module("./x", () => ({ foo: () => scripted() }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: [],
    })
  })

  test("afterAll reset via post-install namespace deref is NOT delegated (recursion trap)", () => {
    const out = parse(
      `import * as real from "./x"\n` +
        `let currentFoo = real.foo\n` +
        `afterAll(() => { currentFoo = real.foo })\n` +
        `mock.module("./x", () => ({ foo: () => currentFoo() }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: [],
    })
  })

  test("direct real-property initializer with snapshot-const reset is delegated", () => {
    const out = parse(
      `import * as real from "./x"\n` +
        `const realFoo = real.foo\n` +
        `let currentFoo = real.foo\n` +
        `afterAll(() => { currentFoo = realFoo })\n` +
        `mock.module("./x", () => ({ foo: () => currentFoo() }))`
    )
    expect(out[0]?.factory).toEqual({
      kind: "object-literal",
      factoryKeys: ["foo"],
      delegatedKeys: ["foo"],
    })
  })
})
