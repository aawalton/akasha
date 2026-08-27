import { describe, expect, it } from "bun:test"
import { z } from "zod"
import { luaArrayOrEmpty } from "./lua-array"
import { readFirstAccountWide, savedVariablesRootSchema } from "./saved-variables-account-wide"

describe("luaArrayOrEmpty", () => {
  const schema = luaArrayOrEmpty(z.number())

  it("passes a real JS array through, parsing each element", () => {
    expect(schema.parse([1, 2, 3])).toEqual([1, 2, 3])
  })

  it("normalizes an empty record to an empty array", () => {
    expect(schema.parse({})).toEqual([])
  })

  it("normalizes a numeric-string-keyed record to an array of its values", () => {
    expect(schema.parse({ "1": 10, "2": 20 })).toEqual([10, 20])
  })

  it("rejects an element that fails the item schema", () => {
    expect(() => schema.parse({ "1": "not-a-number" })).toThrow()
  })

  it("returns success:false for a bad record element instead of throwing out of safeParse", () => {
    const result = schema.safeParse({ "1": 10, "2": "not-a-number" })
    expect(result.success).toBe(false)
  })

  it("names the offending record key at the head of the issue path", () => {
    const result = schema.safeParse({ "1": 10, "2": "not-a-number", "3": 30 })
    if (result.success) throw new Error("expected the malformed element to be rejected")
    expect(result.error.issues.map((issue) => issue.path[0])).toContain("2")
  })

  it("keeps the item schema's own path suffix beneath the record key", () => {
    const objectSchema = luaArrayOrEmpty(z.object({ n: z.number() }))
    const result = objectSchema.safeParse({ "4": { n: "five" } })
    if (result.success) throw new Error("expected the malformed element to be rejected")
    expect(result.error.issues[0]?.path).toEqual(["4", "n"])
  })

  it("does not throw for a bad element even when the array branch would have", () => {
    expect(() => schema.safeParse({ "1": "not-a-number" })).not.toThrow()
  })
})

describe("savedVariablesRootSchema", () => {
  const leaf = z.object({ entries: luaArrayOrEmpty(z.string()).optional() }).passthrough()
  const rootSchema = savedVariablesRootSchema(leaf)

  it("parses the Default → @account → $AccountWide envelope", () => {
    const parsed = rootSchema.parse({
      Default: { "@alice": { $AccountWide: { entries: ["a", "b"] } } },
    })
    expect(parsed.Default?.["@alice"]?.$AccountWide?.entries).toEqual(["a", "b"])
  })

  it("keeps unknown sibling keys via passthrough", () => {
    const parsed: Record<string, unknown> = rootSchema.parse({
      Default: { "@alice": { $AccountWide: {}, extra: 1 } },
      version: 3,
    })
    expect(parsed.version).toBe(3)
  })

  it("accepts a missing Default table", () => {
    expect(rootSchema.parse({}).Default).toBeUndefined()
  })
})

describe("readFirstAccountWide", () => {
  it("returns the first @account entry that carries a $AccountWide block", () => {
    const table = {
      "@alice": { $AccountWide: { id: 1 } },
      "@bob": { $AccountWide: { id: 2 } },
    }
    expect(readFirstAccountWide(table)).toEqual({ id: 1 })
  })

  it("skips non-@ keys and accounts lacking $AccountWide", () => {
    const table = {
      buildVersion: 7,
      "@alice": { somethingElse: true },
      "@bob": { $AccountWide: { id: 2 } },
    }
    expect(readFirstAccountWide(table)).toEqual({ id: 2 })
  })

  it("returns undefined when no account carries a $AccountWide block", () => {
    expect(readFirstAccountWide({ "@alice": {} })).toBeUndefined()
  })
})
