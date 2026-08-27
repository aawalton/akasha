import { describe, expect, test } from "bun:test"
import {
  esoCloneHeaderLines,
  parseEsoCloneProvenance,
  parseEsoDocApiVersion,
  parseStampedApiVersion,
} from "./eso-clone-stamp"

const COMMAND = "ops eso generate-typings"

const COMMENT_PREFIXES = [" * ", "// "]

describe("a rendered header round-trips through the parsers", () => {
  for (const prefix of COMMENT_PREFIXES) {
    test(`under the ${JSON.stringify(prefix)} comment prefix`, () => {
      const rendered = esoCloneHeaderLines(COMMAND, 101050)
        .map((line) => `${prefix}${line}`)
        .join("\n")
      expect(parseEsoCloneProvenance(rendered)).toBe(COMMAND)
      expect(parseStampedApiVersion(rendered)).toBe(101050)
    })
  }
})

describe("membership survives a lost stamp", () => {
  test("provenance still parses when the stamp line is gone", () => {
    const [provenance] = esoCloneHeaderLines(COMMAND, 101050)
    const text = `// ${provenance}\n// (the stamp line was deleted)\n`
    expect(parseEsoCloneProvenance(text)).toBe(COMMAND)
    expect(parseStampedApiVersion(text)).toBeNull()
  })

  test("a file that is not clone-derived carries no provenance", () => {
    expect(parseEsoCloneProvenance("// AUTO-GENERATED from the sets database\n")).toBeNull()
  })
})

describe("esoCloneHeaderLines refuses what the parser would silently mangle", () => {
  test("a regenerating command carrying a newline, which would split the header line", () => {
    expect(() => esoCloneHeaderLines("ops eso generate-typings\nand then some", 101050)).toThrow()
  })

  test("a regenerating command padded with whitespace, which reads back trimmed", () => {
    expect(() => esoCloneHeaderLines(" ops eso generate-typings ", 101050)).toThrow()
  })

  test("an API version that is not a positive integer", () => {
    expect(() => esoCloneHeaderLines(COMMAND, 0)).toThrow()
  })
})

describe("parseEsoDocApiVersion", () => {
  test("reads the version off the doc's own header line", () => {
    const doc = "{TOC:maxLevel=3}\nh1. ESO UI Documentation for API Version 101051\nh2. VM\n"
    expect(parseEsoDocApiVersion(doc)).toBe(101051)
  })

  test("throws rather than returning a default when the header is absent", () => {
    expect(() => parseEsoDocApiVersion("h2. VM Functions\n* ScriptBuildInfo()\n")).toThrow(
      /version marker/
    )
  })
})
