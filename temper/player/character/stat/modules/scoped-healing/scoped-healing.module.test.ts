import { expect, test } from "bun:test"
import { darkCloak25377 } from "akasha/temper/catalog/skill/pages/dark-cloak-25377/dark-cloak-25377.temper-skill.ts"
import { emeraldMoss } from "akasha/temper/catalog/skill/pages/emerald-moss/emerald-moss.temper-skill.ts"
import { healingDoneOfSkill } from "akasha/temper/player/character/stat/modules/scoped-healing/scoped-healing.module.code.ts"

test("Emerald Moss adds 5% healing done to a Green Balance skill for each one on the bar", () => {
  const green = emeraldMoss.skillLineId
  const shadow = darkCloak25377.skillLineId
  const moss = new Set([emeraldMoss.slug])
  const bar = [green, green, shadow, undefined]

  expect(healingDoneOfSkill(0.08, green, bar, moss)).toBeCloseTo(0.18)
  expect(healingDoneOfSkill(0.08, green, bar, new Set())).toBe(0.08)
  expect(healingDoneOfSkill(0.08, shadow, bar, moss)).toBe(0.08)
})
