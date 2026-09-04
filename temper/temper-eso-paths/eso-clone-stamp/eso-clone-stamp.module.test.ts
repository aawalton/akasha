import { expect, test } from "bun:test"
import {
  esoCloneHeaderLines,
  parseEsoCloneProvenance,
  parseEsoDocApiVersion,
  parseStampedApiVersion,
} from "./eso-clone-stamp.module.code.ts"

const DOC = "preamble\nh1. ESO UI Documentation for API Version 101047\nrest\n"

test("the api version is read from the documentation's own header line", () => {
  expect(parseEsoDocApiVersion(DOC)).toBe(101047)
})

test("documentation carrying no header line is refused", () => {
  expect(() => parseEsoDocApiVersion("nothing here")).toThrow("carries no")
})

test("the header lines state the command and the version", () => {
  const [provenance, stamp] = esoCloneHeaderLines("bun run port", 101047)
  expect(provenance).toBe("Generated from the ~/esoui clone by bun run port")
  expect(stamp).toContain("ESO-API-Version: 101047")
})

test("a regenerating command running over a line is refused", () => {
  expect(() => esoCloneHeaderLines("bun run\nport", 1)).toThrow()
  expect(() => esoCloneHeaderLines(" bun run port", 1)).toThrow()
})

test("the command and the version are read back out of a stamped file", () => {
  const [provenance, stamp] = esoCloneHeaderLines("bun run port", 101047)
  const text = `-- ${provenance}\n-- ${stamp}\n`
  expect(parseEsoCloneProvenance(text)).toBe("bun run port")
  expect(parseStampedApiVersion(text)).toBe(101047)
})

test("a file carrying no marker reads as unstamped", () => {
  expect(parseEsoCloneProvenance("plain")).toBeNull()
  expect(parseStampedApiVersion("plain")).toBeNull()
})
