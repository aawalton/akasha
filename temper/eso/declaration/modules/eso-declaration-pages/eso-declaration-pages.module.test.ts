import { expect, test } from "bun:test"
import {
  pageBodyFor,
  stampRestated,
  writtenBy,
} from "akasha/temper/eso/declaration/modules/eso-declaration-pages/eso-declaration-pages.module.code.ts"

const WRITER = "akasha temper eso generate declaration"

const PAGE = [
  "export const esoEnums01 = {",
  '  id: "01a0608f-b07c-7e34-94ed-8d96236ccd6b",',
  '  definition: "a part of the numbers the game gives its kinds",',
  `  generated: { writtenBy: "${WRITER}", sourceVersion: 101050 },`,
  "} as const satisfies TypeDeclaration",
].join("\n")

test("a stamp already stating the version is restated as nothing", () => {
  expect(stampRestated(PAGE, WRITER, 101050)).toBeNull()
})

test("a stamp behind the version is restated, and only that line is touched", () => {
  const said = stampRestated(PAGE, WRITER, 101051)
  expect(said?.old).toBe(`  generated: { writtenBy: "${WRITER}", sourceVersion: 101050 },`)
  expect(said?.new).toBe(`  generated: { writtenBy: "${WRITER}", sourceVersion: 101051 },`)
  expect(PAGE.replace(said?.old ?? "", said?.new ?? "")).toContain(
    'id: "01a0608f-b07c-7e34-94ed-8d96236ccd6b"'
  )
})

test("a page stating no stamp is restated as nothing", () => {
  expect(stampRestated("export const one = {}", WRITER, 101050)).toBeNull()
})

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
