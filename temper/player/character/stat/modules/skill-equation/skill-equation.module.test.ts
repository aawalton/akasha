import { expect, test } from "bun:test"
import {
  equationOf,
  equationStatsOf,
  equationValue,
  NOTHING_ACTIVE,
  shownNumbersOf,
  tooltipPairingOf,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"

const STATS = {
  maxStat: 20000,
  maxPower: 5000,
  health: 40000,
  magicka: 18000,
  stamina: 20000,
  spellDamage: 5000,
  weaponDamage: 4000,
}

const at = (line: string) => equationValue(equationOf(line), STATS)

test("an equation on the higher stat and power sums its terms and constant", () => {
  const line =
    "<<2>> = 0.031026 MaxStat + 0.325426 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Flame)"
  expect(equationOf(line)?.placeholder).toBe(2)
  expect(equationOf(line)?.tags).toContain("Dmg")
  expect(at(line)).toBeCloseTo(0.031026 * 20000 + 0.325426 * 5000 - 1.91657)
})

test("a tag holding parentheses of its own leaves the equation read", () => {
  expect(at("<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, RankMod(1), Dmg, Flame)")).toBeCloseTo(
    0.1 * 20000 + 1.05 * 5000
  )
})

test("an equation on max health is read", () => {
  expect(at("<<4>> = 0.206642 Health - 1.14018 (Health, Heal)")).toBeCloseTo(
    0.206642 * 40000 - 1.14018
  )
})

test("a constant with a unit is its number and scales off nothing", () => {
  expect(equationOf("<<3>> = 10 seconds (Constant)")?.scaled).toBe(false)
  expect(at("<<3>> = 10 seconds (Constant)")).toBe(10)
})

test("a constant naming no number, or a variable no stat here reads, reads as nothing", () => {
  expect(at("<<6>> = Burning (Constant)")).toBeUndefined()
  expect(at("<<1>> = 120 MediumArmor (Medium Armor)")).toBeUndefined()
})

test("a tooltip's numbers are the ones the game colors, in the order the text gives them", () => {
  expect(
    shownNumbersOf("dealing |cffffff4582|r Damage for |cffffff6|r seconds, |cffffff0.5|r%")
  ).toEqual([4582, 6, 0.5])
  expect(shownNumbersOf("no number here")).toEqual([])
})

test("the stats an equation reads take the higher of Magicka and Stamina, and of the powers", () => {
  const stats = {
    "magicka-maximum": 16456,
    "stamina-maximum": 17141,
    "health-maximum": 43104,
    "power-spell": 3093,
    "power-weapon": 2900,
  }
  expect(equationStatsOf(stats)).toEqual({
    maxStat: 17141,
    maxPower: 3093,
    health: 43104,
    magicka: 16456,
    stamina: 17141,
    spellDamage: 3093,
    weaponDamage: 2900,
  })
})

const EMBERS = [
  "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame)",
  "<<2>> = 10 seconds (Constant)",
  "<<3>> = Burning (Constant)",
]

test("a tooltip's numbers pair in order with the equations naming a number", () => {
  const paired = tooltipPairingOf(
    "dealing |cffffff3526|r Flame Damage over |cffffff10|r seconds, applying Burning.",
    EMBERS,
    STATS,
    new Set()
  )
  expect(paired).toEqual({
    paired: true,
    numbers: [
      {
        placeholder: 1,
        equation: EMBERS[0] ?? "",
        scaled: true,
        game: 3526,
        temper: Math.round(0.05165 * 20000 + 0.542325 * 5000),
      },
      { placeholder: 2, equation: EMBERS[1] ?? "", scaled: false, game: 10, temper: 10 },
    ],
  })
})

test("a tooltip naming more or fewer numbers than the equations do is left unpaired", () => {
  expect(tooltipPairingOf("dealing |cffffff3526|r damage", EMBERS, STATS, new Set())).toEqual({
    paired: false,
    shown: [3526],
    equations: 2,
  })
})

test("a damage shield rounds down, grows with Bastion slotted, and a capped one stops at half Health", () => {
  const shield = (line: string, held: ReadonlySet<string>, health = 40000) => {
    const paired = tooltipPairingOf("absorbs |cffffff1|r", [line], { ...STATS, health }, held)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const fatecarver = "<<4>> = 0.139474 MaxStat + 1.46406 MaxPower (DmgShield, at most half Health)"
  const raw = 0.139474 * 20000 + 1.46406 * 5000

  expect(shield(fatecarver, new Set())).toBe(Math.floor(raw))
  expect(shield(fatecarver, new Set(["bastion"]))).toBe(Math.floor(1.15 * raw))
  expect(shield(fatecarver, new Set(), 19394)).toBe(9697)
  expect(shield("<<1>> = 0.1 MaxStat (Dmg)", new Set(["bastion"]))).toBe(2000)
})

test("direct damage grows with the damage stars slotted and rounds down", () => {
  const lash = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, Flame, AOE, Direct)"
  const worked = (held: ReadonlySet<string>) => {
    const paired = tooltipPairingOf("dealing |cffffff1|r", [lash], STATS, held)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = 0.1 * 20000 + 1.05 * 5000

  expect(worked(new Set())).toBe(Math.floor(raw))
  expect(worked(new Set(["master-at-arms", "biting-aura", "deadly-aim"]))).toBe(
    Math.floor(1.12 * raw)
  )
})

test("direct damage reads the power War Mage, Mighty and Wrathful Strikes add before buffs grow it", () => {
  const lash = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, Flame, SingleTarget, Direct)"
  const worked = (held: ReadonlySet<string>, active = NOTHING_ACTIVE) => {
    const paired = tooltipPairingOf("dealing |cffffff1|r", [lash], STATS, held, active)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const at = (power: number) => Math.floor(0.1 * 20000 + 1.05 * power)
  const brutal = {
    buffs: new Set(["Major Brutality"]),
    championPoints: { "war-mage": 30 },
    mediumPieces: 5,
  }

  expect(worked(new Set(["wrathful-strikes"]), brutal)).toBe(at(5366))
  expect(worked(new Set(["agility"]), brutal)).toBe(at(5130))
  expect(worked(new Set(), { ...brutal, championPoints: { mighty: 30 } })).toBe(at(5000))
  expect(worked(new Set(), { ...brutal, championPoints: { "war-mage": 29 } })).toBe(at(5000))
})

test("Minor Berserk on the caster makes damage 5% stronger, added to the stars slotted", () => {
  const lash = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, Flame, SingleTarget, Direct)"
  const heal = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Heal)"
  const berserk = { ...NOTHING_ACTIVE, buffs: new Set(["Minor Berserk"]) }
  const worked = (line: string, held: ReadonlySet<string>) => {
    const paired = tooltipPairingOf("dealing |cffffff1|r", [line], STATS, held, berserk)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = 0.1 * 20000 + 1.05 * 5000

  expect(worked(lash, new Set(["master-at-arms"]))).toBe(Math.floor(1.11 * raw))
  expect(worked(heal, new Set())).toBe(Math.round(raw))
})

test("damage over time totals a tick for each tick in the game's duration, and one more where it ticks on application", () => {
  const embers =
    "<<2>> = 0.03 MaxStat + 0.315 MaxPower (Dmg, Flame, SingleTarget, DOT, 8s duration, 2s tick)"
  const applied = embers.replace("2s tick)", "2s tick, ticks on application)")
  const worked = (line: string, held: ReadonlySet<string>, durationMs?: number) => {
    const paired = tooltipPairingOf(
      "over |cffffff1|r",
      [line],
      STATS,
      held,
      NOTHING_ACTIVE,
      durationMs
    )
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = 0.03 * 20000 + 0.315 * 5000

  expect(worked(embers, new Set(), 10000)).toBe(5 * Math.floor(raw))
  expect(worked(embers, new Set())).toBe(4 * Math.floor(raw))
  expect(worked(applied, new Set(), 10000)).toBe(6 * Math.floor(raw))
  expect(worked(embers, new Set(["thaumaturge", "master-at-arms"]), 10000)).toBe(
    5 * Math.floor(1.06 * raw)
  )
  expect(worked(embers.replace("8s duration, ", ""), new Set(), 10000)).toBe(Math.floor(raw))
})

test("a duration tagged with a passive is that much longer only where the build holds it", () => {
  const blur = ["<<1>> = 20 seconds (Constant, +2 seconds with dark-veil)"]
  const worked = (passives: ReadonlySet<string>) => {
    const paired = tooltipPairingOf("for |cffffff22|r seconds", blur, STATS, passives)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  expect(worked(new Set(["dark-veil"]))).toBe(22)
  expect(worked(new Set(["everlasting-magic"]))).toBe(20)
})
