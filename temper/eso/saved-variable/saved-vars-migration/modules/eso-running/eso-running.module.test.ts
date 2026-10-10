import { expect, test } from "bun:test"
import { isGameCommandLine } from "akasha/temper/eso/saved-variable/saved-vars-migration/modules/eso-running/eso-running.module.code.ts"

test("the game started through Proton is the game", () => {
  const line =
    "S:\\steamapps\\common\\Zenimax Online\\The Elder Scrolls Online\\game\\client\\eso64.exe\0Language.2=en\0"
  expect(isGameCommandLine(line)).toBe(true)
})

test("a program naming the game only in its arguments is not the game", () => {
  expect(isGameCommandLine("bash\0-c\0echo eso64.exe\0")).toBe(false)
})

test("a program spelled in another case is still the game", () => {
  expect(isGameCommandLine("C:/Games/ESO64.EXE\0")).toBe(true)
})

test("an empty command line is not the game", () => {
  expect(isGameCommandLine("")).toBe(false)
})
