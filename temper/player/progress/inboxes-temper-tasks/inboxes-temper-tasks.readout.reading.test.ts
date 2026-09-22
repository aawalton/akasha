import { expect, test } from "bun:test"
import { temperTasksIn } from "akasha/temper/player/progress/inboxes-temper-tasks/inboxes-temper-tasks.readout.reading.code.ts"

test("a count stated as text is read as the number that count spells", () => {
  expect(temperTasksIn({ "inbox-temper-tasks": "22" })).toBe(22)
  expect(temperTasksIn({ "inbox-temper-tasks": 5 })).toBe(5)
})

test("a count of zero is a count", () => {
  expect(temperTasksIn({ "inbox-temper-tasks": "0" })).toBe(0)
  expect(temperTasksIn({ "inbox-temper-tasks": 0 })).toBe(0)
})

test("a day carrying no count is no reading rather than a count of zero", () => {
  expect(temperTasksIn({})).toBeNull()
  expect(temperTasksIn({ "inbox-temper-tasks": "" })).toBeNull()
  expect(temperTasksIn({ "inbox-temper-tasks": "   " })).toBeNull()
  expect(temperTasksIn({ "inbox-temper-tasks": "soon" })).toBeNull()
  expect(temperTasksIn({ "inbox-temper-tasks": null })).toBeNull()
})

test("the task count beside it is never read as the game task count", () => {
  expect(temperTasksIn({ "inbox-tasks": "24" })).toBeNull()
})
