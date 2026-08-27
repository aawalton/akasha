import { describe, expect, test } from "bun:test"
import {
  esoCloneHeaderLines,
  parseEsoCloneProvenance,
  parseEsoDocApiVersion,
  parseStampedApiVersion,
} from "./eso-clone-stamp"

const GENERATOR = "packages/temper/shared/build-deploy/checks/src/generate-eso-colon-methods.ts"

const COMMENT_PREFIXES = [" * ", "// "]

describe("a rendered header round-trips through the parsers", () => {
  for (const prefix of COMMENT_PREFIXES) {
    test(`under the ${JSON.stringify(prefix)} comment prefix`, () => {
      const rendered = esoCloneHeaderLines(GENERATOR, 101050)
        .map((line) => `${prefix}${line}`)
        .join("\n")
      expect(parseEsoCloneProvenance(rendered)).toBe(GENERATOR)
      expect(parseStampedApiVersion(rendered)).toBe(101050)
    })
  }
})

describe("membership survives a lost stamp", () => {
  test("provenance still parses when the stamp line is gone", () => {
    const [provenance] = esoCloneHeaderLines(GENERATOR, 101050)
    const text = `// ${provenance}\n// (the stamp line was deleted)\n`
    expect(parseEsoCloneProvenance(text)).toBe(GENERATOR)
    expect(parseStampedApiVersion(text)).toBeNull()
  })

  test("a file that is not clone-derived carries no provenance", () => {
    expect(parseEsoCloneProvenance("// AUTO-GENERATED from the sets database\n")).toBeNull()
  })
})

describe("esoCloneHeaderLines refuses what the parser would silently mangle", () => {
  test("a generator path carrying whitespace, which reads back truncated", () => {
    expect(() => esoCloneHeaderLines("packages/some dir/generate.ts", 101050)).toThrow()
  })

  test("an API version that is not a positive integer", () => {
    expect(() => esoCloneHeaderLines(GENERATOR, 0)).toThrow()
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
