
import { describe, expect, test } from "bun:test"
import { shape as s } from "../lib/shape.ts"
import { accepts, refusal, refuses } from "./shape-fixture.ts"

describe("object", () => {
  const person = s.object({ name: s.string(), age: s.number() })

  test("refuses anything that is not an object", () => {
    for (const value of [null, undefined, "x", 1, true, []]) refuses(person, value)
    expect(refusal(person, null).message).toBe("Invalid input: expected object, received null")
    expect(refusal(person, []).message).toBe("Invalid input: expected object, received array")
    expect(refusal(person, "x").message).toBe("Invalid input: expected object, received string")
  })

  test("refuses a missing required key at that key's path", () => {
    expect(refusal(person, { name: "a" }).at).toBe("age")
    expect(refusal(person, { name: "a" }).message).toBe("Invalid input: expected number, received undefined")
    refuses(person, {})
  })

  test("refuses a wrong field and says which one", () => {
    expect(refusal(person, { name: 1, age: 2 }).at).toBe("name")
    expect(refusal(person, { name: "a", age: "2" }).at).toBe("age")
  })

  test("reports every bad field, in the order the shape declares them", () => {
    const both = person.safeParse({ name: 1, age: "x" })
    expect(both.success).toBe(false)
    if (both.success) return
    expect(both.error.issues.map((issue) => issue.path.join("."))).toEqual(["name", "age"])
  })

  test("names the path all the way down a nesting", () => {
    const nested = s.object({ a: s.object({ b: s.array(s.object({ c: s.number() })) }) })
    expect(refusal(nested, { a: { b: [{ c: "x" }] } }).at).toBe("a.b.0.c")
    expect(refusal(nested, { a: { b: [{ c: 1 }, { c: null }] } }).at).toBe("a.b.1.c")
  })

  test("STRIPS an undeclared key rather than refusing it, which is what zod does", () => {
    expect(accepts(person, { name: "a", age: 1, extra: "dropped" })).toEqual({ name: "a", age: 1 })
  })

  test("an optional key absent stays absent, and written as undefined stays written", () => {
    const maybe = s.object({ a: s.string().optional() })
    expect(Object.keys(accepts(maybe, {}) as object)).toEqual([])
    expect(Object.keys(accepts(maybe, { a: undefined }) as object)).toEqual(["a"])
    refuses(maybe, { a: 1 })
    refuses(maybe, { a: null })
  })

  test("a key whose shape merely tolerates undefined is still required", () => {
    refuses(s.object({ a: s.unknown() }), {})
    expect(refusal(s.object({ a: s.unknown() }), {}).message).toBe(
      "Invalid input: expected nonoptional, received undefined"
    )
    expect(Object.keys(accepts(s.object({ a: s.unknown() }), { a: undefined }) as object)).toEqual(["a"])
  })

  test("a default fills whether the key was absent or written as undefined", () => {
    const withDefault = s.object({ a: s.string().default("d") })
    expect(accepts(withDefault, {})).toEqual({ a: "d" })
    expect(accepts(withDefault, { a: undefined })).toEqual({ a: "d" })
    expect(accepts(withDefault, { a: "x" })).toEqual({ a: "x" })
  })

  test("output keys follow the shape, not the payload", () => {
    const ordered = s.object({ b: s.string(), a: s.string() })
    expect(Object.keys(accepts(ordered, { a: "1", b: "2" }) as object)).toEqual(["b", "a"])
  })
})

describe("object strict", () => {
  const strict = s.object({ a: s.string() }).strict()

  test("refuses an undeclared key and names it", () => {
    expect(refusal(strict, { a: "x", b: 1 }).message).toBe('Unrecognized key: "b"')
    expect(refusal(strict, { a: "x", b: 1 }).code).toBe("unrecognized_keys")
    expect(refusal(strict, { a: "x", b: 1 }).at).toBe("")
  })

  test("names every undeclared key when there is more than one", () => {
    expect(refusal(strict, { a: "x", b: 1, c: 2 }).message).toBe('Unrecognized keys: "b", "c"')
  })

  test("field failures come before the undeclared-key complaint", () => {
    const result = strict.safeParse({ a: 1, b: 2 })
    expect(result.success).toBe(false)
    if (result.success) return
    expect(result.error.issues.map((issue) => issue.code)).toEqual(["invalid_type", "unrecognized_keys"])
  })

  test("accepts exactly the declared keys", () => {
    expect(accepts(strict, { a: "x" })).toEqual({ a: "x" })
  })
})

describe("looseObject and passthrough", () => {
  test("keeps undeclared keys instead of dropping them", () => {
    expect(accepts(s.looseObject({ a: s.string() }), { a: "x", b: 1 })).toEqual({ a: "x", b: 1 })
    expect(accepts(s.object({ a: s.string() }).passthrough(), { a: "x", b: 1 })).toEqual({ a: "x", b: 1 })
  })

  test("still refuses a declared key that is wrong", () => {
    refuses(s.looseObject({ a: s.string() }), { a: 1, b: 2 })
    refuses(s.looseObject({ a: s.string() }), { b: 2 })
    refuses(s.looseObject({ a: s.string() }), null)
  })

  test("a nested strict-by-default object still strips inside a loose one", () => {
    const mixed = s.looseObject({ a: s.object({ b: s.string() }) })
    expect(accepts(mixed, { a: { b: "x", c: 1 }, d: 2 })).toEqual({ a: { b: "x" }, d: 2 })
  })
})

describe("__proto__ is dropped rather than honoured", () => {
  test("a payload naming __proto__ does not reach the prototype", () => {
    const payload = JSON.parse('{"a":"x","__proto__":{"polluted":true}}') as unknown
    const kept = accepts(s.looseObject({ a: s.string() }), payload) as Record<string, unknown>
    expect(Object.keys(kept)).toEqual(["a"])
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
    expect(Object.getPrototypeOf(kept)).toBe(Object.prototype)
  })

  test("a record drops it too, and does not count it against a strict shape", () => {
    const payload = JSON.parse('{"__proto__":"x","a":"y"}') as unknown
    expect(accepts(s.record(s.string(), s.string()), payload)).toEqual({ a: "y" })
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
    const strictPayload = JSON.parse('{"a":"x","__proto__":{"bad":1}}') as unknown
    expect(accepts(s.object({ a: s.string() }).strict(), strictPayload)).toEqual({ a: "x" })
  })
})

describe("array", () => {
  test("refuses anything that is not an array", () => {
    for (const value of [null, undefined, "a", 1, true, {}, { 0: "a", length: 1 }]) {
      refuses(s.array(s.string()), value)
    }
    expect(refusal(s.array(s.string()), {}).message).toBe("Invalid input: expected array, received object")
    expect(refusal(s.array(s.string()), "a").message).toBe("Invalid input: expected array, received string")
  })

  test("refuses a bad element at its index", () => {
    expect(refusal(s.array(s.string()), ["a", 1]).at).toBe("1")
    expect(refusal(s.array(s.string()), [1]).at).toBe("0")
    refuses(s.array(s.string()), [undefined])
    refuses(s.array(s.string()), [null])
  })

  test("accepts an empty array and a good one", () => {
    expect(accepts(s.array(s.string()), [])).toEqual([])
    expect(accepts(s.array(s.string()), ["a", "b"])).toEqual(["a", "b"])
  })
})

describe("tuple", () => {
  const single = s.tuple([s.string()])

  test("refuses the wrong length in both directions", () => {
    expect(refusal(single, []).message).toBe("Too small: expected array to have >=1 items")
    expect(refusal(single, ["a", "b"]).message).toBe("Too big: expected array to have <=1 items")
  })

  test("refuses what is not an array at all", () => {
    expect(refusal(single, {}).message).toBe("Invalid input: expected tuple, received object")
    refuses(single, null)
    refuses(single, "a")
  })

  test("refuses a bad member at its index", () => {
    expect(refusal(single, [1]).at).toBe("0")
  })

  test("accepts the exact length", () => {
    expect(accepts(single, ["a"])).toEqual(["a"])
  })
})

describe("record", () => {
  const strings = s.record(s.string(), s.string())

  test("refuses an array, a null and a scalar", () => {
    expect(refusal(strings, []).message).toBe("Invalid input: expected record, received array")
    expect(refusal(strings, null).message).toBe("Invalid input: expected record, received null")
    refuses(strings, "a")
    refuses(strings, 1)
    refuses(strings, undefined)
  })

  test("refuses a bad value at its key", () => {
    expect(refusal(strings, { a: 1 }).at).toBe("a")
    expect(refusal(strings, { a: "x", b: null }).at).toBe("b")
    refuses(strings, { a: undefined })
  })

  test("accepts an empty record and a good one", () => {
    expect(accepts(strings, {})).toEqual({})
    expect(accepts(strings, { a: "b", c: "d" })).toEqual({ a: "b", c: "d" })
  })

  test("a record of unknown holds any value but still refuses a non-record", () => {
    const loose = s.record(s.string(), s.unknown())
    expect(accepts(loose, { a: 1, b: null, c: "x" })).toEqual({ a: 1, b: null, c: "x" })
    refuses(loose, [])
    refuses(loose, null)
  })
})
