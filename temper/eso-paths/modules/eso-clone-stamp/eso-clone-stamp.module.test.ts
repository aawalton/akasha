import { expect, test } from "bun:test"
import {
  esoCloneHeaderLines,
  parseEsoDocApiVersion,
} from "akasha/temper/eso-paths/modules/eso-clone-stamp/eso-clone-stamp.module.code.ts"

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
