import { expect, test } from "bun:test"
import {
  type CharacterPieces,
  wantedHolderOf,
} from "akasha/temper/items/core/modules/equipment-signature-matcher/equipment-signature-matcher.module.code.ts"

const MASK = { equipType: 1, traitType: 18, quality: 5, armorType: 2, setId: 270 }
const RING = { equipType: 12, traitType: 31, quality: 5 }

const of111 = (pieces: ReadonlyArray<object>) => (charId: string) =>
  charId === "111" ? pieces : []

const wearing = (...pieces: ReadonlyArray<object>): CharacterPieces => ({
  wornBy: of111(pieces),
  heldBy: of111(pieces),
})

const equip = (esoCharId: string) => ({ esoCharId, worn: true })
const stow = (esoCharId: string) => ({ esoCharId, worn: false })

test("gear alike to what a character already wears goes to no character", () => {
  const wanted = [{ esoCharId: "111", ...MASK }]
  expect(wantedHolderOf(wanted, MASK, wearing(MASK))).toBeUndefined()
  expect(wantedHolderOf(wanted, MASK, wearing())).toEqual(equip("111"))
})

test("a piece of another set in the slot leaves the slot wanting", () => {
  const wanted = [{ esoCharId: "111", ...MASK }]
  expect(wantedHolderOf(wanted, MASK, wearing({ ...MASK, setId: 1 }))).toEqual(equip("111"))
})

test("a second piece alike goes where the build wants two and the character wears one", () => {
  const wanted = [
    { esoCharId: "111", ...RING },
    { esoCharId: "111", ...RING },
  ]
  expect(wantedHolderOf(wanted, RING, wearing(RING))).toEqual(equip("111"))
  expect(wantedHolderOf(wanted, RING, wearing(RING, RING))).toBeUndefined()
})

test("gear one character already wears goes to the next character wanting it", () => {
  const wanted = [
    { esoCharId: "111", ...MASK },
    { esoCharId: "222", ...MASK },
  ]
  expect(wantedHolderOf(wanted, MASK, wearing(MASK))).toEqual(equip("222"))
})

const SOLO = { esoCharId: "111", buildId: "solo", ...MASK }
const TRIAL = { esoCharId: "111", buildId: "trial", backpack: true, ...MASK }

test("gear a target build wants goes to the backpack of a character set up as another", () => {
  expect(wantedHolderOf([TRIAL], MASK, wearing())).toEqual(stow("111"))
})

test("gear the character holds already satisfies a build it is not set up as", () => {
  const holding: CharacterPieces = { wornBy: of111([]), heldBy: of111([MASK]) }
  expect(wantedHolderOf([TRIAL], MASK, holding)).toBeUndefined()
  expect(wantedHolderOf([TRIAL], MASK, { ...holding, holder: "111" })).toEqual(stow("111"))
})

test("gear worn for the build set up satisfies another build wanting the same piece", () => {
  expect(wantedHolderOf([SOLO, TRIAL], MASK, wearing(MASK))).toBeUndefined()
})

test("the build chosen in the game is the one equipped", () => {
  const chosen: CharacterPieces = { ...wearing(), chosenBuildOf: () => "trial" }
  expect(wantedHolderOf([{ ...SOLO, ...RING }, TRIAL], MASK, chosen)).toEqual(equip("111"))
  expect(wantedHolderOf([SOLO, { ...TRIAL, ...RING }], MASK, chosen)).toEqual(stow("111"))
})
