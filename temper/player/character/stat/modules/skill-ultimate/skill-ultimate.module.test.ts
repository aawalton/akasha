import { expect, test } from "bun:test"
import {
  readHealingPerUltimatePoint,
  readHeroism,
} from "akasha/temper/player/character/stat/modules/skill-ultimate/skill-ultimate.module.code.ts"

test("Heroism is read as the Ultimate it gives, how often, and for how long", () => {
  expect(
    readHeroism(
      "Healed targets gain Minor Fortitude and Minor Heroism for |cffffff15|r seconds, increasing Health Recovery by |cffffff15|r% and generating |cffffff1|r Ultimate every |cffffff1.5|r seconds."
    )
  ).toEqual({ ultimate: 1, everySeconds: 1.5, lastsSeconds: 15 })
})

test("a tooltip giving no Heroism reads as none", () => {
  expect(readHeroism("Slash your foe with a fiery claw.")).toBeUndefined()
})

test("healing for each point of Ultimate spent is the current amount the game gives", () => {
  expect(
    readHealingPerUltimatePoint(
      "The syllables of that ancient tongue live in the mouth of every Dragonknight.\n\nWhen you cast an Ultimate ability, you restore |cffffff8|r Health, |cffffff8|r Magicka, and |cffffff8|r Stamina for each point of the Ultimate spent. Each Dragonknight ability slotted increases this value by |cffffff3|r.\n\nCurrent amount:\n|cffffff51|r Health\n|cffffff46|r Magicka\n|cffffff46|r Stamina"
    )
  ).toBe(51)
})

test("the game's live wording, for every Ultimate spent, reads the same way", () => {
  expect(
    readHealingPerUltimatePoint(
      "When you cast an Ultimate ability, you restore |cffffff18|r Health, |cffffff16|r Magicka, and |cffffff16|r Stamina for every Ultimate spent. Each Dragonknight ability slotted increases this value by |cffffff6|r.\n\nCurrent amount:\n|cffffff53|r Health\n|cffffff46|r Magicka\n|cffffff46|r Stamina"
    )
  ).toBe(53)
})

test("a current amount on a tooltip that heals for no Ultimate spent reads as none", () => {
  expect(readHealingPerUltimatePoint("Current amount: |cffffff0|r")).toBeUndefined()
})
