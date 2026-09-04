import { expect, test } from "bun:test"
import { FILE_TYPES, isFileType } from "./watcher-file-type.module.code.ts"

test("every kind the watcher knows is named", () => {
  expect([...FILE_TYPES]).toEqual([
    "catalog",
    "characters",
    "companions",
    "data-mining",
    "errors",
    "inventory",
    "sales",
  ])
})

test("no kind is named twice", () => {
  expect(new Set(FILE_TYPES).size).toBe(FILE_TYPES.length)
})

test("a kind is spelled in lower kebab case", () => {
  for (const kind of FILE_TYPES) expect(kind).toMatch(/^[a-z]+(-[a-z]+)*$/)
})

test("a kind the watcher knows is recognised", () => {
  for (const kind of FILE_TYPES) expect(isFileType(kind)).toBe(true)
})

test("a kind the watcher does not know is refused", () => {
  expect(isFileType("quests")).toBe(false)
  expect(isFileType("Catalog")).toBe(false)
  expect(isFileType("")).toBe(false)
})
