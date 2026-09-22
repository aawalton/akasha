import { expect, test } from "bun:test"
import {
  pageBodyFor,
  writtenBy,
} from "akasha/temper/eso/declaration/modules/eso-declaration-pages/eso-declaration-pages.module.code.ts"

const WRITER = "akasha temper eso generate declaration"

test("a page stating the command that wrote it is one that command writes", () => {
  expect(writtenBy({ generated: { writtenBy: WRITER } }, WRITER)).toBe(true)
})

test("a page stating another command, or nothing, is written by hand", () => {
  expect(writtenBy({ generated: { writtenBy: "akasha something else" } }, WRITER)).toBe(false)
  expect(writtenBy({}, WRITER)).toBe(false)
  expect(writtenBy({ generated: "yes" }, WRITER)).toBe(false)
})

test("a page made carries the stamp and the version it was built from", () => {
  const body = pageBodyFor("eso-enums-20", "a part of the numbers", WRITER, 101050)
  expect(body).toContain("export const esoEnums20 = {")
  expect(body).toContain('slug: "eso-enums-20"')
  expect(body).toContain(`generated: { writtenBy: "${WRITER}", sourceVersion: 101050 }`)
  expect(body).toContain('d: "ts"')
  expect(body.endsWith("} as const satisfies TypeDeclaration\n")).toBe(true)
})
