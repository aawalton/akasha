import { describe, expect, it } from "bun:test"
import { emitJson, emitTsv, escapeTsvCell } from "../lib/format-output.ts"

describe("emitJson", () => {
  it("emits the canonical 2-space pretty JSON (literal-string)", () => {
    const value = {
      id: "rule-1",
      action: "move-to",
      destination: "bank",
      active: true,
      conditions: { maxQuality: 4, qualityOp: "<=" },
    }
    expect(emitJson(value)).toBe(JSON.stringify(value, null, 2))
  })

  it("emits 2-space indented pretty JSON for a nested object", () => {
    const out = emitJson({ a: 1, b: { c: 2 } })
    expect(out).toBe('{\n  "a": 1,\n  "b": {\n    "c": 2\n  }\n}')
  })
})

describe("escapeTsvCell", () => {
  it("replaces each row-breaking character with its two-character spelling", () => {
    expect(escapeTsvCell("a\nb")).toBe("a\\nb")
    expect(escapeTsvCell("a\rb")).toBe("a\\rb")
    expect(escapeTsvCell("a\tb")).toBe("a\\tb")
    expect(escapeTsvCell("a\r\nb\tc")).toBe("a\\r\\nb\\tc")
  })

  it("leaves a value carrying none of them byte-identical", () => {
    expect(escapeTsvCell('{"a":"x\\ny"}')).toBe('{"a":"x\\ny"}')
    expect(escapeTsvCell("C:\\path")).toBe("C:\\path")
    expect(escapeTsvCell("")).toBe("")
  })

  it("is NOT reversible, which is the bound this encoding is chosen with", () => {
    expect(escapeTsvCell("a\\nb")).toBe(escapeTsvCell("a\nb"))
  })
})

describe("emitTsv", () => {
  it("emits a header row + value rows tab-separated, with no trailing newline", () => {
    const rows = [
      { id: "r1", action: "nothing", active: true },
      { id: "r2", action: "move-to", active: false },
    ]
    const out = emitTsv(rows, ["id", "action", "active"])
    expect(out).toBe("id\taction\tactive\nr1\tnothing\ttrue\nr2\tmove-to\tfalse")
  })

  it("renders undefined values as the empty string", () => {
    const rows = [{ id: "r1", title: "First", goal: undefined }]
    const out = emitTsv(rows, ["id", "title", "goal"])
    expect(out).toBe("id\ttitle\tgoal\nr1\tFirst\t")
  })

  it("renders null values as the literal string 'null'", () => {
    const rows = [{ id: "r1", note: null }]
    const out = emitTsv(rows, ["id", "note"])
    expect(out).toBe("id\tnote\nr1\tnull")
  })

  it("renders non-string cells (object / array) as JSON", () => {
    const rows = [{ id: "r1", tags: ["a", "b"], meta: { k: 1 } }]
    const out = emitTsv(rows, ["id", "tags", "meta"])
    expect(out).toBe('id\ttags\tmeta\nr1\t["a","b"]\t{"k":1}')
  })

  it("emits only the header row for an empty input array", () => {
    const out = emitTsv([], ["id", "title"])
    expect(out).toBe("id\ttitle")
  })

  it("ignores extra keys not listed in the columns array", () => {
    const rows = [{ id: "r1", title: "First", extraIgnored: "x" }]
    const out = emitTsv(rows, ["id", "title"])
    expect(out).toBe("id\ttitle\nr1\tFirst")
  })
})
