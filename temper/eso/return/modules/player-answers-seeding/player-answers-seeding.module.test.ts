import { expect, test } from "bun:test"
import { playerAnswersSource } from "akasha/temper/eso/return/modules/player-answers-seeding/player-answers-seeding.module.code.ts"

const HELD = 'TemperPlayerAnswers_SavedVariables={["Default"]={}}'

test("the answers are taken from between the tables around them", () => {
  const file = `TemperCatalog_SavedVariables={["a"]=1}\n${HELD}\nTemperDataMining_SavedVariables={}\n`
  expect(playerAnswersSource(file)).toBe(`${HELD}\n`)
})

test("answers written last run to the end of the file", () => {
  expect(playerAnswersSource(`Other =\n{\n}\n${HELD}\n`)).toBe(`${HELD}\n`)
})

test("a file holding no answers gives none", () => {
  expect(playerAnswersSource('TemperCatalog_SavedVariables={["a"]=1}\n')).toBeNull()
})

test("a line inside a table is never read as a table of its own", () => {
  const file = `${HELD.replace("{}", '{\n  ["x"] = 1,\n}')}\nNext = {}\n`
  expect(playerAnswersSource(file)).toBe(`${HELD.replace("{}", '{\n  ["x"] = 1,\n}')}\n`)
})
