import { expect, test } from "bun:test"
import {
  characterAmong,
  playedAsLua,
} from "akasha/temper/eso/ui-harness/modules/played-character/played-character.module.code.ts"

const CHARACTERS = [
  { slug: "erin-solstice", title: "Erin Solstice", esoCharacterId: "8796093022338107" },
  { slug: "nirayicel", title: "Nirayicel", esoCharacterId: "8796093072548641" },
  { slug: "unplayed", title: "Unplayed" },
]

const ERIN = { id: "8796093022338107", name: "Erin Solstice" }

test("a character is found by its page's slug", () => {
  expect(characterAmong(CHARACTERS, "erin-solstice")).toEqual(ERIN)
})

test("a character is found by its title, whatever its case", () => {
  expect(characterAmong(CHARACTERS, "erin solstice")).toEqual(ERIN)
})

test("a character is found by the game's id for it", () => {
  expect(characterAmong(CHARACTERS, "8796093022338107")).toEqual(ERIN)
})

test("a character with no id of the game's is found by no name", () => {
  expect(characterAmong(CHARACTERS, "unplayed")).toBe(null)
})

test("a name no character carries finds none", () => {
  expect(characterAmong(CHARACTERS, "nobody")).toBe(null)
})

test("playing as a character answers the player's id and name as that character's", () => {
  const lua = playedAsLua(ERIN)
  expect(lua).toContain('local id, name = "8796093022338107", "Erin Solstice"')
  expect(lua).toContain("GetCurrentCharacterId = function() return id end")
  expect(lua).toContain('if tag == "player" then return name end')
})
