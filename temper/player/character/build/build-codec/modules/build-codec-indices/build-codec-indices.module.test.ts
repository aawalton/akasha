import { expect, test } from "bun:test"
import {
  getClassIndex,
  getRaceIndex,
  getSetIndex,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"

test("an id these tables carry is its own place", () => {
  expect(getClassIndex("arcanist")).toBe(0)
  expect(getClassIndex("no-class")).toBe(4)
})

test("an id these tables do not carry stops the write rather than taking the first place", () => {
  expect(() => getClassIndex("a-class-the-game-added")).toThrow("is no id these tables carry")
  expect(() => getRaceIndex("a-race-the-game-added")).toThrow("is no id these tables carry")
  expect(() => getSetIndex("a-set-the-game-added")).toThrow("is no id these tables carry")
})

test("the refusal names the id it was handed", () => {
  expect(() => getClassIndex("a-class-the-game-added")).toThrow("a-class-the-game-added")
})
