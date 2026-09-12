import { expect, test } from "bun:test"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  copiedRule,
  droppedRule,
  lockedRule,
  wroteSaid,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  HELD,
  LOCKED_ID,
  WROTE,
  writingThat,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"

const THREW_AFTER_WRITING = writingThat(() => Promise.resolve("written"))

const REFUSED = writingThat(() => Promise.reject(new Error("the store would not take the write")))

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

test("a rule locked is said to have been locked in the game's settings", async () => {
  const done: string[] = []
  await lockedRule("category", HELD, true, WROTE, done)
  expect(done).toEqual([wroteSaid("category", HELD, "locked")])
})

test("a rule unlocked is said to have been unlocked rather than locked", async () => {
  const done: string[] = []
  await lockedRule("category", HELD, false, WROTE, done)
  expect(done[0]).toContain("unlocked")
})

test("an id the settings carry no rule for writes nothing and says nothing written", async () => {
  const done: string[] = []
  const said = await lockedRule("category", "no-rule-carries-this", true, WROTE, done)
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("no-rule-carries-this")
})

test("a write the store refuses says nothing was written, because nothing was", async () => {
  const said = await answered((done) => lockedRule("category", HELD, true, REFUSED, done))
  expect(said.refusals.join("\n")).toContain("would not take the write")
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})

test("an act that wrote and then threw names that write in its refusal", async () => {
  const said = await answered(async (done) => {
    await lockedRule("category", HELD, true, THREW_AFTER_WRITING, done)
    throw new Error("the answer would not be composed")
  })
  expect(said.refusals.join("\n")).toContain("would not be composed")
  expect(said.refusals.join("\n")).toContain("stopped part way")
  expect(said.refusals.join("\n")).toContain(wroteSaid("category", HELD, "locked"))
})

test("a locked rule refuses the taking away and writes nothing while refusing", async () => {
  const done: string[] = []
  const said = await droppedRule("category", LOCKED_ID, false, WROTE, done)
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("is locked")
})

test("a rule taken away is said to have been taken away", async () => {
  const done: string[] = []
  await droppedRule("category", HELD, false, WROTE, done)
  expect(done).toEqual([wroteSaid("category", HELD, "taken away")])
})

test("a rule copied is said to have been copied", async () => {
  const done: string[] = []
  await copiedRule("category", HELD, WROTE, done)
  expect(done).toEqual([wroteSaid("category", HELD, "copied")])
})

test("what a write is said by names the kind of rule and its id", () => {
  const said = wroteSaid("buy", HELD, "copied")
  expect(said).toContain("buy rule")
  expect(said).toContain(HELD)
  expect(said).toContain("copied")
})
