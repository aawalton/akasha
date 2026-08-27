import { describe, expect, it } from "bun:test"
import {
  lex,
  parseMappingLine,
  resolveMappingPath,
  splitDocs,
  unquote,
} from "@infra/k8s-types/k8s-manifest-walker"

const lines = (...text: readonly string[]): string => text.join("\n")

describe("lex", () => {
  it("gives every line a 1-based number, blank lines included", () => {
    const out = lex(lines("a: 1", "", "b: 2"))
    expect(out.map((line) => line.lineNumber)).toEqual([1, 2, 3])
    expect(out.map((line) => line.blank)).toEqual([false, true, false])
  })

  it("counts a trailing newline as a further blank line", () => {
    const out = lex("a: 1\n")
    expect(out.length).toBe(2)
    expect(out[1]?.lineNumber).toBe(2)
    expect(out[1]?.blank).toBe(true)
  })

  it("strips an unquoted comment and keeps a hash inside quotes", () => {
    const out = lex(lines("kind: Pod  # trailing", '  name: "a # b"', "# whole line"))
    expect(out[0]?.stripped).toBe("kind: Pod")
    expect(out[1]?.stripped).toBe('  name: "a # b"')
    expect(out[2]?.stripped).toBe("")
    expect(out[2]?.blank).toBe(true)
  })

  it("measures indent on the comment-stripped line", () => {
    const out = lex(lines("a: 1", "  b: 2", "    c: 3"))
    expect(out.map((line) => line.indent)).toEqual([0, 2, 4])
  })
})

describe("unquote", () => {
  it("removes a matched pair of quotes", () => {
    expect(unquote('"web"')).toBe("web")
    expect(unquote("'web'")).toBe("web")
  })

  it("trims before deciding, and trims when there is no pair to remove", () => {
    expect(unquote("  web  ")).toBe("web")
    expect(unquote('  "web"  ')).toBe("web")
  })

  it("leaves an unmatched quote in place", () => {
    expect(unquote('"web')).toBe('"web')
    expect(unquote("\"web'")).toBe("\"web'")
  })

  it("keeps the other quote character inside the pair", () => {
    expect(unquote("\"a'b\"")).toBe("a'b")
  })
})

describe("parseMappingLine", () => {
  it("splits on the first colon that a space or the line end follows", () => {
    expect(parseMappingLine("image: registry/app:1")).toEqual({
      key: "image",
      value: "registry/app:1",
    })
  })

  it("reads a key carrying no value as undefined", () => {
    expect(parseMappingLine("metadata:")).toEqual({ key: "metadata", value: undefined })
  })

  it("refuses a colon that no space follows", () => {
    expect(parseMappingLine("key:value")).toBeNull()
  })

  it("ignores a colon inside quotes and unquotes the key", () => {
    expect(parseMappingLine('"a:b": v')).toEqual({ key: "a:b", value: "v" })
  })

  it("refuses a sequence item", () => {
    expect(parseMappingLine("- name: app")).toBeNull()
    expect(parseMappingLine("-")).toBeNull()
  })

  it("refuses an empty key", () => {
    expect(parseMappingLine(": v")).toBeNull()
  })

  it("refuses a line holding no colon", () => {
    expect(parseMappingLine("plain")).toBeNull()
  })
})

describe("splitDocs", () => {
  it("returns one span per document, bounded by its first and last non-blank line", () => {
    const text = lines("a: 1", "---", "", "b: 2", "")
    const spans = splitDocs(lex(text), text)
    expect(spans.length).toBe(2)
    expect(spans[0]).toEqual({ startIndex: 0, endIndex: 1, startLine: 1, endLine: 1 })
    expect(spans[1]).toEqual({ startIndex: 3, endIndex: 4, startLine: 4, endLine: 4 })
  })

  it("drops a document holding nothing but blank lines", () => {
    const text = lines("---", "", "---", "a: 1")
    const spans = splitDocs(lex(text), text)
    expect(spans.length).toBe(1)
    expect(spans[0]?.startLine).toBe(4)
  })

  it("treats only a line that is exactly three dashes as a separator", () => {
    const text = lines("a: 1", "--- x", "b: 2")
    const spans = splitDocs(lex(text), text)
    expect(spans.length).toBe(1)
    expect(spans[0]).toEqual({ startIndex: 0, endIndex: 3, startLine: 1, endLine: 3 })
  })
})

describe("resolveMappingPath", () => {
  const text = lines("spec:", "  template:", "    spec:", "      nodeName: node-02")

  it("descends each segment and reports the reached block's own indent", () => {
    const parsed = lex(text)
    const found = resolveMappingPath(parsed, { startIndex: 0, endIndex: 4 }, [
      "spec",
      "template",
      "spec",
    ])
    expect(found).toEqual({ startIndex: 3, endIndex: 4, indent: 6 })
    expect(parsed[found?.startIndex ?? -1]?.stripped.trim()).toBe("nodeName: node-02")
  })

  it("returns null where a segment is missing", () => {
    const parsed = lex(text)
    expect(
      resolveMappingPath(parsed, { startIndex: 0, endIndex: 4 }, ["spec", "jobTemplate"])
    ).toBeNull()
  })
})
