import { describe, expect, test } from "bun:test"
import {
  definedNames,
  namesUnstubbedLua,
} from "akasha/temper/eso/ui-harness/modules/game-names/game-names.module.code.ts"

const FILE = `
assert(not BuildMarkupTest)
function BuildMarkupTest()
    local inner = 1
end
function ZO_Thing:Method() end
SOME_TABLE = {}
Counted = 1
if Counted == 1 then end
local Hidden = 2
`

describe("definedNames", () => {
  test("names each global a file defines at its top level, and nothing else", () => {
    expect([...definedNames(FILE)].sort()).toEqual(["BuildMarkupTest", "Counted", "SOME_TABLE"])
  })
})

describe("namesUnstubbedLua", () => {
  test("hands every name of every file over in one call, each once, in order", () => {
    expect(namesUnstubbedLua([FILE, "Counted = 2"])).toBe(
      'return __eso_leave_names_unstubbed({"BuildMarkupTest","Counted","SOME_TABLE"})'
    )
  })
})
