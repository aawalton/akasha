import { expect, test } from "bun:test"
import { readSkillDamage } from "akasha/temper/player/character/stat/modules/skill-damage/skill-damage.module.code.ts"

test("the first damage a tooltip deals is the cast's direct hit", () => {
  expect(
    readSkillDamage(
      "Slash your foe with a fiery claw, dealing |cffffff5555|r Flame Damage and an additional |cffffff15840|r Flame Damage over |cffffff10|r seconds."
    )
  ).toEqual({ hit: 5555, wave: 0, waveSeconds: 0 })
})

test("damage dealt on completion is the cast's direct hit", () => {
  expect(
    readSkillDamage(
      "Let the fire within draw heat to your heart, healing |cffffff4025|r Health every |cffffff2|r seconds over |cffffff4|r seconds.\n\nWhen this ability completes, you release this heat as a blast of fire that deals |cffffff9326|r Flame Damage to nearby enemies."
    ).hit
  ).toBe(9326)
})

test("a wave every so many seconds is read as a wave at that interval", () => {
  expect(
    readSkillDamage(
      "Activate an aura of flames which launches a wave of flames every |cffffff5|r seconds, dealing |cffffff9215|r Flame Damage directly to enemies inside."
    )
  ).toEqual({ hit: 0, wave: 9215, waveSeconds: 5 })
})

test("damage no skill deals, such as a weapon's added damage, reads as none", () => {
  expect(
    readSkillDamage(
      "While active, dealing damage with Light and Heavy Attacks causes an additional |cffffff1988|r Flame Damage."
    )
  ).toEqual({ hit: 0, wave: 0, waveSeconds: 0 })
})
