import { expect, test } from "bun:test"
import { formatSeatProcKey, parseSeatProcKey } from "./seat-proc-key.ts"

test("a process key is written with a hyphen between the pid and the start time", () => {
  expect(formatSeatProcKey({ pid: 3112283, startTicks: 8876729 })).toBe("3112283-8876729")
})

test("a key reads back as the process it names, however its two halves were joined", () => {
  const named = { pid: 3112283, startTicks: 8876729 }
  expect(parseSeatProcKey("3112283-8876729")).toEqual(named)
  expect(parseSeatProcKey("3112283.8876729")).toEqual(named)
})

test("what names no two whole numbers names no process", () => {
  expect(parseSeatProcKey("3112283")).toBeNull()
  expect(parseSeatProcKey("3112283-8876729-1")).toBeNull()
  expect(parseSeatProcKey("window-8876729")).toBeNull()
  expect(parseSeatProcKey("")).toBeNull()
})
