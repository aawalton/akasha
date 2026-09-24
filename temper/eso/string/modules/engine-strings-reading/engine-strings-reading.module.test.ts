import { describe, expect, test } from "bun:test"
import {
  engineStringsIn,
  stringsBody,
} from "akasha/temper/eso/string/modules/engine-strings-reading/engine-strings-reading.module.code.ts"

const CAPTURE = `TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@zeta"] =
        {
            ["$AccountWide"] =
            {
                ["interfaceStringCatalog"] =
                {
                    ["apiVersion"] = 101050,
                    ["strings"] =
                    {
                        ["SI_ITEM_FORMAT_STR_SET_NAME"] = "<<1>> Set",
                        ["SI_DIALOG_ACCEPT"] = "Accept",
                        ["SI_NOT_TEXT"] = 12,
                    },
                },
            },
        },
    },
}
`

describe("engineStringsIn", () => {
  test("keeps each string's text under its name, ordered by name", () => {
    const held = engineStringsIn(CAPTURE)
    expect(held?.apiVersion).toBe(101050)
    expect(held?.strings).toEqual({
      SI_DIALOG_ACCEPT: "Accept",
      SI_ITEM_FORMAT_STR_SET_NAME: "<<1>> Set",
    })
  })

  test("reads a capture holding no strings as nothing", () => {
    expect(engineStringsIn(`TemperCatalog_SavedVariables =\n{\n}\n`)).toBeUndefined()
  })

  test("reads a file that will not parse as nothing", () => {
    expect(engineStringsIn("this is not lua at all")).toBeUndefined()
  })

  test("writes a body ending in one newline", () => {
    const held = engineStringsIn(CAPTURE)
    if (held === undefined) throw new Error("the capture read as nothing")
    expect(stringsBody(held).endsWith("}\n")).toBe(true)
  })
})
