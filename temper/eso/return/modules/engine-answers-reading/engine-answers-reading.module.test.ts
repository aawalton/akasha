import { describe, expect, test } from "bun:test"
import {
  answersBody,
  engineAnswersIn,
} from "akasha/temper/eso/return/modules/engine-answers-reading/engine-answers-reading.module.code.ts"

const CAPTURE = `TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@zeta"] =
        {
            ["$AccountWide"] =
            {
                ["engineAnswerCatalog"] =
                {
                    ["apiVersion"] = 101050,
                    ["answers"] =
                    {
                        ["IsConsoleUI"] =
                        {
                            [1] = false,
                        },
                        ["GetAssignableAbilityBarStartAndEndSlots"] =
                        {
                            [1] = 3,
                            [2] = 8,
                        },
                        ["GetKeyboardLayout"] =
                        {
                            [1] = "us",
                        },
                        ["GetNothing"] =
                        {
                        },
                    },
                    ["answersGiven"] =
                    {
                        ["GetSetting"] =
                        {
                            ["5,1"] =
                            {
                                [1] = "0",
                            },
                        },
                    },
                },
            },
        },
    },
}
`

describe("engineAnswersIn", () => {
  test("keeps each function's answers in order, under its name", () => {
    const held = engineAnswersIn(CAPTURE)
    expect(held?.apiVersion).toBe(101050)
    expect(held?.answers).toEqual({
      GetAssignableAbilityBarStartAndEndSlots: [3, 8],
      GetKeyboardLayout: ["us"],
      GetNothing: [],
      IsConsoleUI: [false],
    })
  })

  test("keeps a function's answers under the values it was asked with", () => {
    expect(engineAnswersIn(CAPTURE)?.answersGiven).toEqual({ GetSetting: { "5,1": ["0"] } })
  })

  test("orders the functions by name", () => {
    const held = engineAnswersIn(CAPTURE)
    expect(Object.keys(held?.answers ?? {})[0]).toBe("GetAssignableAbilityBarStartAndEndSlots")
  })

  test("reads a capture holding no answers as nothing", () => {
    expect(engineAnswersIn(`TemperCatalog_SavedVariables =\n{\n}\n`)).toBeUndefined()
  })

  test("reads a file that will not parse as nothing", () => {
    expect(engineAnswersIn("this is not lua at all")).toBeUndefined()
  })

  test("writes a body ending in one newline", () => {
    const held = engineAnswersIn(CAPTURE)
    if (held === undefined) throw new Error("the capture read as nothing")
    expect(answersBody(held).endsWith("}\n")).toBe(true)
  })
})
