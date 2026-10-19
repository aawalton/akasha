import { expect, test } from "bun:test"
import {
  findIn,
  plainText,
  sentencesOf,
  textPattern,
} from "akasha/temper/player/character/stat/modules/text-pattern/text-pattern.module.code.ts"

test("a pattern finds its numbers anywhere in the text, case ignored", () => {
  expect(findIn(textPattern("absorbs <n> damage"), "It ABSORBS 6381 Damage now.")).toEqual({
    0: 6381,
  })
})

test("an optional part that is missing leaves its number unfound", () => {
  const shield = textPattern("absorbs <n> damage[ for <n> second[s]]")
  expect(findIn(shield, "absorbs 10 damage for 6 seconds")).toEqual({ 0: 10, 1: 6 })
  expect(findIn(shield, "absorbs 10 damage.")).toEqual({ 0: 10 })
})

test("a choice takes the first option that lets the rest match", () => {
  const heal = textPattern("heal{s|ing|} for <n> health")
  expect(findIn(heal, "healing for 5 Health")).toEqual({ 0: 5 })
  expect(findIn(heal, "heal for 7 Health")).toEqual({ 0: 7 })
})

test("an edge refuses a word that runs on, and accepts the end of the text", () => {
  const edge = textPattern("heal<b>")
  expect(findIn(edge, "missing Health")).toBeUndefined()
  expect(findIn(edge, "you heal")).toEqual({})
})

test("anything between is the shortest run that lets the rest match", () => {
  expect(
    findIn(
      textPattern("heroism for <n> second[s]<*>every <d> second[s]"),
      "Heroism for 15 seconds, and 1 Ultimate every 1.5 seconds."
    )
  ).toEqual({ 0: 15, 1: 1.5 })
})

test("a word token matches any one word", () => {
  expect(findIn(textPattern("deals <n> <w> damage"), "Deals 2457 Magic Damage")).toEqual({
    0: 2457,
  })
})

test("plain text drops the game's colors and runs of white space", () => {
  expect(plainText("Deals |cffffff9021|r Flame\n\nDamage.  ")).toBe("Deals 9021 Flame Damage.")
})

test("sentences part after a full stop and keep it", () => {
  expect(sentencesOf("One 1.5 two. Three.")).toEqual(["One 1.5 two.", "Three."])
})
