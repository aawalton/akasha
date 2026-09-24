import { expect, test } from "bun:test"
import { parseEsoDocApiVersion } from "akasha/temper/eso/path/modules/eso-clone-stamp/eso-clone-stamp.module.code.ts"

const DOC = "preamble\nh1. ESO UI Documentation for API Version 101047\nrest\n"

test("the api version is read from the documentation's own header line", () => {
  expect(parseEsoDocApiVersion(DOC)).toBe(101047)
})

test("documentation carrying no header line is refused", () => {
  expect(() => parseEsoDocApiVersion("nothing here")).toThrow("carries no")
})
