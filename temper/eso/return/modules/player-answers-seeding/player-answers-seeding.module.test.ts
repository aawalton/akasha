import { expect, test } from "bun:test"
import {
  playerAnswersIn,
  playerAnswersLua,
  playerAnswersSource,
} from "akasha/temper/eso/return/modules/player-answers-seeding/player-answers-seeding.module.code.ts"

const savedWith = (version: number) => `TemperPlayerAnswers_SavedVariables =
{
    ["Default"] =
    {
        ["@a"] =
        {
            ["$AccountWide"] =
            {
                ["version"] = ${String(version)},
                ["answers"] =
                {
                    ["1,3"] =
                    {
                        ["GetItemName"] = { [1] = "Rubedite Ingot", },
                        ["GetSlotStackSize"] = { [1] = 5, [2] = 200, },
                    },
                },
            },
        },
    },
}
`

test("the answers are read under the values asked, then the function", () => {
  expect(playerAnswersIn(savedWith(2))).toEqual({
    "1,3": { GetItemName: ["Rubedite Ingot"], GetSlotStackSize: [5, 200] },
  })
})

test("answers kept an older way are not read", () => {
  expect(playerAnswersIn(savedWith(1))).toBeNull()
})

test("the answers go over in pieces, each set in place only once all have gone over", () => {
  const chunks = playerAnswersLua({ a: { F: [1] }, b: { G: ["x"] } }, 1)
  expect(chunks).toHaveLength(4)
  expect(chunks[1]).toBe('__ui_player_answers({["a"]={["F"]={1}}})')
  expect(chunks[3]).toContain("_G[name] = function(...)")
})

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
