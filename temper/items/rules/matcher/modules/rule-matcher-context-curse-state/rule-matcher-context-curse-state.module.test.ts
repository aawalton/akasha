import { describe, expect, test } from "bun:test"
import {
  buildGetCharacterCurseState,
  compileCurseStates,
} from "akasha/temper/items/rules/matcher/modules/rule-matcher-context-curse-state/rule-matcher-context-curse-state.module.code.ts"

const CHARACTER = "1001"

const STRANGER = "9999"

function compiledFrom(completion: unknown): ReadonlyMap<string, "vampire" | "werewolf"> {
  return compileCurseStates([
    { esoCharacterId: CHARACTER, targetBuildId: undefined, sortOrder: undefined, completion },
  ])
}

describe("A curse the game named is kept under the character bearing it.", () => {
  test("a vampire is kept as a vampire", () => {
    expect(compiledFrom({ curseState: "vampire" }).get(CHARACTER)).toBe("vampire")
  })

  test("a werewolf is kept as a werewolf", () => {
    expect(compiledFrom({ curseState: "werewolf" }).get(CHARACTER)).toBe("werewolf")
  })

  test("a character the compiled curses name answers with that curse", () => {
    const reading = buildGetCharacterCurseState(new Map([[CHARACTER, "vampire"]]))

    expect(reading(CHARACTER)).toBe("vampire")
  })
})

describe("A character with neither curse answers as nothing.", () => {
  test("a character with no completion at all is kept out", () => {
    expect(compiledFrom(undefined).size).toBe(0)
  })

  test("a completion naming no curse keeps the character out", () => {
    expect(compiledFrom({}).size).toBe(0)
  })

  test("a curse named as no curse keeps the character out", () => {
    expect(compiledFrom({ curseState: "no-curse" }).has(CHARACTER)).toBe(false)
  })

  test("a curse that is no string keeps the character out", () => {
    expect(compiledFrom({ curseState: 42 }).size).toBe(0)
  })

  test("a character the compiled curses do not name answers as nothing", () => {
    const reading = buildGetCharacterCurseState(new Map([[CHARACTER, "werewolf"]]))

    expect(reading(STRANGER)).toBeUndefined()
  })

  test("a reader holding nothing answers as nothing", () => {
    expect(buildGetCharacterCurseState(new Map())(CHARACTER)).toBeUndefined()
  })
})
