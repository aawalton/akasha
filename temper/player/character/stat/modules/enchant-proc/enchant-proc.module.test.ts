import { expect, test } from "bun:test"
import {
  procsWithin,
  readEnchantProc,
} from "akasha/temper/player/character/stat/modules/enchant-proc/enchant-proc.module.code.ts"

test("an enchant that deals damage and restores health is read as both", () => {
  expect(
    readEnchantProc(
      "Deals |cffffff2457|r Magic Damage and restores |cffffff465|r Health and |cffffff177|r Magicka and Stamina."
    )
  ).toEqual({ damage: 2457, healing: 465 })
})

test("an enchant that restores no health is no proc read here", () => {
  expect(
    readEnchantProc("Increase your Weapon Damage and Spell Damage by |cffffff452|r for 5 seconds.")
  ).toBeUndefined()
})

test("an enchant procs once every 4 seconds of the fight", () => {
  expect(procsWithin(60)).toBe(15)
  expect(procsWithin(21)).toBe(5)
})
