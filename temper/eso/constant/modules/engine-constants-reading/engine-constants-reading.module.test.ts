import { describe, expect, test } from "bun:test"
import {
  constantsBody,
  engineConstantsIn,
} from "akasha/temper/eso/constant/modules/engine-constants-reading/engine-constants-reading.module.code.ts"

const CAPTURE = `TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@zeta"] =
        {
            ["$AccountWide"] =
            {
                ["engineGlobalsCatalog"] =
                {
                    ["apiVersion"] = 101050,
                    ["listedBy"] = "InsecureNext",
                    ["numbers"] =
                    {
                        ["CT_LABEL"] = 1,
                        ["CT_CONTROL"] = 0,
                        ["BAD"] = "not a number",
                    },
                    ["words"] =
                    {
                        ["SCENE_SHOWN"] = "shown",
                    },
                    ["named"] =
                    {
                        [1] = "SCENE_SHOWN",
                    },
                    ["unwritable"] =
                    {
                    },
                },
            },
        },
        ["@alpha"] =
        {
            ["$AccountWide"] =
            {
            },
        },
    },
}
`

describe("engineConstantsIn", () => {
  test("reads the constants out of the first account holding them", () => {
    const held = engineConstantsIn(CAPTURE)
    expect(held?.apiVersion).toBe(101050)
    expect(held?.listedBy).toBe("InsecureNext")
    expect(held?.words.SCENE_SHOWN).toBe("shown")
    expect(held?.named).toEqual(["SCENE_SHOWN"])
    expect(held?.unwritable).toEqual([])
  })

  test("passes over a value of the wrong kind rather than coercing it", () => {
    const held = engineConstantsIn(CAPTURE)
    expect(held?.numbers.BAD).toBeUndefined()
    expect(held?.numbers.CT_LABEL).toBe(1)
  })

  test("sorts the names, so a capture writes the same body twice", () => {
    const held = engineConstantsIn(CAPTURE)
    expect(Object.keys(held?.numbers ?? {})).toEqual(["CT_CONTROL", "CT_LABEL"])
  })

  test("reads a file that will not parse as nothing", () => {
    expect(engineConstantsIn("this is not lua at all")).toBeUndefined()
  })

  test("reads a capture holding no constants as nothing", () => {
    expect(engineConstantsIn(`TemperCatalog_SavedVariables =\n{\n}\n`)).toBeUndefined()
  })

  test("writes a body ending in one newline", () => {
    const held = engineConstantsIn(CAPTURE)
    if (held === undefined) throw new Error("the capture read as nothing")
    const body = constantsBody(held)
    expect(body.endsWith("}\n")).toBe(true)
    expect(JSON.parse(body).apiVersion).toBe(101050)
  })
})
