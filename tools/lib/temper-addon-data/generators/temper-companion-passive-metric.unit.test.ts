import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionPassiveMetric } from "./temper-companion-passive-metric.ts"

const METRIC_ABILITY_COOLDOWN = "00000000-0000-0000-0000-00000000d001"
const METRIC_ARMOR = "00000000-0000-0000-0000-00000000d002"
const METRIC_BREAK_FREE_COOLDOWN = "00000000-0000-0000-0000-00000000d003"
const METRIC_WEAPON_DAMAGE = "00000000-0000-0000-0000-00000000d004"

const abilityCooldown = Page({
  id: METRIC_ABILITY_COOLDOWN,
  title: "Cooldowns",
  key: "companion-ability-cooldown",
})

const armor = Page({
  id: METRIC_ARMOR,
  title: "Armor",
  key: "companion-armor",
})

const breakFreeCooldown = Page({
  id: METRIC_BREAK_FREE_COOLDOWN,
  title: "Break Free CD",
  key: "companion-break-free-cooldown",
})

const weaponDamage = Page({
  id: METRIC_WEAPON_DAMAGE,
  title: "Weapon Damage",
  key: "companion-weapon-damage",
})

describe("generateTemperCompanionPassiveMetric", () => {
  test("emits metrics in alphabetical-by-key order regardless of input order", () => {
    const out = generateTemperCompanionPassiveMetric([
      weaponDamage,
      armor,
      breakFreeCooldown,
      abilityCooldown,
    ])
    const idxAbilityCooldown = out.indexOf('"companion-ability-cooldown":')
    const idxArmor = out.indexOf('"companion-armor":')
    const idxBreakFreeCooldown = out.indexOf('"companion-break-free-cooldown":')
    const idxWeaponDamage = out.indexOf('"companion-weapon-damage":')
    expect(idxAbilityCooldown).toBeGreaterThan(-1)
    expect(idxArmor).toBeGreaterThan(idxAbilityCooldown)
    expect(idxBreakFreeCooldown).toBeGreaterThan(idxArmor)
    expect(idxWeaponDamage).toBeGreaterThan(idxBreakFreeCooldown)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperCompanionPassiveMetric([armor])
    expect(out).toContain('"companion-armor": { id: "companion-armor", name: "Armor" },')
  })

  test("emits a satisfies clause against CompanionPassiveMetricTemplate", () => {
    const out = generateTemperCompanionPassiveMetric([armor])
    expect(out).toContain("} as const satisfies Record<string, CompanionPassiveMetricTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d0ff",
      title: null,
      key: "companion-armor",
    })
    expect(() => generateTemperCompanionPassiveMetric([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d0fe",
      title: "Armor",
    })
    expect(() => generateTemperCompanionPassiveMetric([broken])).toThrow()
  })
})
