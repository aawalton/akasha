import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import type { TaskData } from "../saved-variables"

type GlobalsWithEsoStubs = typeof globalThis & {
  ZO_CreateStringId: (id: string, value: string) => undefined
  LuaSet: typeof Set
}

Object.assign(globalThis, {
  ZO_CreateStringId: (_id: string, _value: string): undefined => undefined,
  LuaSet: Set,
} satisfies Pick<GlobalsWithEsoStubs, "ZO_CreateStringId" | "LuaSet">)

const { isCurrentCharacterNext } = await import("./task-hud-visibility")

const NEXT = "char-next"
const OTHER = "char-other"

const originalGetCurrentCharacterId = globalThis.GetCurrentCharacterId

beforeEach(() => {
  globalThis.GetCurrentCharacterId = () => NEXT
})

afterEach(() => {
  globalThis.GetCurrentCharacterId = originalGetCurrentCharacterId
})

function nextCharTask(esoCharacterId: string | undefined): TaskData {
  return { title: "Shalidor's Library", scope: "next_character", sortOrder: 0, esoCharacterId }
}

describe("isCurrentCharacterNext", () => {
  it("shows for the character that is the server-computed next character", () => {
    expect(isCurrentCharacterNext(nextCharTask(NEXT))).toBe(true)
  })

  it("hides for an incomplete character that is not the next character", () => {
    expect(isCurrentCharacterNext(nextCharTask(OTHER))).toBe(false)
  })

  it("hides for everybody when there is no valid next character (esoCharacterId absent)", () => {
    expect(isCurrentCharacterNext(nextCharTask(undefined))).toBe(false)
  })
})
