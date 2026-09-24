import { describe, expect, test } from "bun:test"
import {
  answersLua,
  engineAnswersTable,
} from "akasha/temper/eso/return/modules/engine-answers-seeding/engine-answers-seeding.module.code.ts"

const HELD = {
  apiVersion: 101050,
  answers: {
    GetAssignableAbilityBarStartAndEndSlots: [3, 8],
    GetKeyboardLayout: ['a "quoted" word'],
    GetNothing: [],
    IsConsoleUI: [false],
  },
}

describe("answersLua", () => {
  test("writes each function as Lua giving back its answers in order", () => {
    const lua = answersLua(HELD)
    expect(lua).toContain('["GetAssignableAbilityBarStartAndEndSlots"]=function() return 3,8 end')
    expect(lua).toContain('["IsConsoleUI"]=function() return false end')
  })

  test("writes a function answering nothing as one giving back nothing", () => {
    expect(answersLua(HELD)).toContain('["GetNothing"]=function() return  end')
  })

  test("hands every function over in one call that sets it over any empty answer", () => {
    expect(answersLua(HELD).startsWith("__eso_constants({")).toBe(true)
  })
})

describe("engineAnswersTable", () => {
  test("reads the table akasha holds", () => {
    expect(typeof engineAnswersTable().answers).toBe("object")
  })
})
