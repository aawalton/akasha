import { expect, test } from "bun:test"
import {
  CURSOR_FILENAME,
  cursorPath,
  loadErrorCursor,
  parseErrorCursor,
  serializeErrorCursor,
  unreadCursorWhy,
} from "akasha/temper/watcher/modules/watcher-error-cursor/watcher-error-cursor.module.code.ts"

const AT = "/var/tmp/an-invented-temper-errors-cursor.json"

test("the cursor is kept beside the watcher log", () => {
  expect(cursorPath()).toEndWith(`/${CURSOR_FILENAME}`)
})

test("a cursor round-trips through text unchanged", () => {
  const seen = new Map([
    ["boom\nа.lua:1", 3],
    ["bang", 1],
  ])
  expect(parseErrorCursor(AT, serializeErrorCursor(seen))).toEqual(seen)
})

test("an empty cursor round-trips as empty", () => {
  expect(parseErrorCursor(AT, serializeErrorCursor(new Map())).size).toBe(0)
})

test("a cursor that is no valid json refuses the error import", () => {
  expect(() => parseErrorCursor(AT, "not json")).toThrow(unreadCursorWhy(AT))
  expect(() => parseErrorCursor(AT, "")).toThrow(unreadCursorWhy(AT))
})

test("a cursor of the wrong shape refuses the error import", () => {
  expect(() => parseErrorCursor(AT, '{"boom":"three"}')).toThrow(unreadCursorWhy(AT))
  expect(() => parseErrorCursor(AT, "[1,2,3]")).toThrow(unreadCursorWhy(AT))
  expect(() => parseErrorCursor(AT, "null")).toThrow(unreadCursorWhy(AT))
})

test("a cursor is never partly read", () => {
  expect(() => parseErrorCursor(AT, '{"good":1,"bad":"x"}')).toThrow(unreadCursorWhy(AT))
})

test("a refusal names the cursor file it read", () => {
  expect(unreadCursorWhy(AT)).toContain(AT)
  expect(unreadCursorWhy(AT)).toContain("send every error up again")
})

test("a well shaped cursor is read whole", () => {
  const read = parseErrorCursor(AT, '{"a":1,"b":2}')
  expect(read.get("a")).toBe(1)
  expect(read.get("b")).toBe(2)
  expect(read.size).toBe(2)
})

test("a cursor file that is not there reads as nothing carried up yet", () => {
  expect(loadErrorCursor("/var/tmp/a-cursor-file-that-is-not-there.json").size).toBe(0)
})
