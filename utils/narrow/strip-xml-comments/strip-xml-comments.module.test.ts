import { expect, test } from "bun:test"
import { stripXmlComments } from "akasha/utils/narrow/strip-xml-comments/strip-xml-comments.module.code.ts"

test("a comment becomes blanks of the same width", () => {
  expect(stripXmlComments("a<!--xy-->b")).toBe("a         b")
})

test("a newline inside a comment is kept", () => {
  expect(stripXmlComments("<!--a\nb-->").split("\n").length).toBe(2)
})

test("markup with no comment is left whole", () => {
  expect(stripXmlComments("<Tag />")).toBe("<Tag />")
})
