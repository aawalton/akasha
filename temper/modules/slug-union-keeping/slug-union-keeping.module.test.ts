import { expect, test } from "bun:test"
import { unionsBody } from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

test("each union names its slugs once each, in the order they sort in", () => {
  expect(unionsBody([["LineId", ["b", "a", "b"]]])).toBe('export type LineId =\n  | "a"\n  | "b"\n')
})

test("a union holding no slug names nothing, and unions are a blank line apart", () => {
  expect(
    unionsBody([
      ["One", ["x"]],
      ["Two", []],
    ])
  ).toBe('export type One =\n  | "x"\n\nexport type Two = never\n')
})
