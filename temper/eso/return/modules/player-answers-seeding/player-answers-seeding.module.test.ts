import { expect, test } from "bun:test"
import {
  playerAnswersIn,
  playerAnswersLua,
  playerScreenIn,
} from "akasha/temper/eso/return/modules/player-answers-seeding/player-answers-seeding.module.code.ts"

const capturedWith = (version: number) => ({
  version,
  answers: {
    "1,3": { GetItemName: { "1": "Rubedite Ingot" }, GetSlotStackSize: { "1": 5, "2": 200 } },
  },
})

test("the answers are read under the values asked, then the function", () => {
  expect(playerAnswersIn(capturedWith(2))).toEqual({
    "1,3": { GetItemName: ["Rubedite Ingot"], GetSlotStackSize: [5, 200] },
  })
})

test("the interface's size is read from beside the answers", () => {
  const sized = { ...capturedWith(2), screenWidth: 3840, screenHeight: 1607 }
  expect(playerScreenIn(sized)).toEqual({ width: 3840, height: 1607 })
})

test("a capture keeping no size gives none", () => {
  expect(playerScreenIn(capturedWith(2))).toBeNull()
})

test("answers kept by no capture's version are not read", () => {
  expect(playerAnswersIn(capturedWith(0))).toBeNull()
})

test("no answers landed gives none", () => {
  expect(playerAnswersIn(undefined)).toBeNull()
  expect(playerScreenIn(undefined)).toBeNull()
})

test("the answers go over in pieces, each set in place only once all have gone over", () => {
  const chunks = playerAnswersLua({ a: { F: [1] }, b: { G: ["x"] } }, 1)
  expect(chunks).toHaveLength(4)
  expect(chunks[1]).toBe('__ui_player_answers({["a"]={["F"]={1}}})')
  expect(chunks[3]).toContain("_G[name] = function(...)")
})

test("an answer about what the player was doing as the capture ran is not handed over", () => {
  const held = { "": { GetChatFontSize: [16], IsBankOpen: [true], IsInteracting: [true] } }
  expect(playerAnswersLua(held, 1)[1]).toBe(
    '__ui_player_answers({[""]={["GetChatFontSize"]={16}}})'
  )
})
