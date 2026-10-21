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
  healingDone: 0,
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
    healingDone: 0,
  })
  expect(equationStatsOf(stats, 0.08).healingDone).toBe(0.08)
})

test("a heal is rounded, grown by the build's healing done, and rounded again", () => {
  const line = "<<1>> = 0.04452 MaxStat + 0.46746 MaxPower (Heal, SingleTarget, Direct)"
  const worked = (healingDone: number) => {
    const paired = tooltipPairingOf(
      "heals |cffffff1|r",
      [line],
      { ...STATS, healingDone },
      new Set()
    )
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = Math.floor(0.04452 * 20000) + Math.floor(0.46746 * 5000)

  expect(raw).toBe(3227)
  expect(worked(0)).toBe(raw)
  expect(worked(0.08)).toBe(Math.round(1.08 * raw))
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

test("a damage shield floors each term, grows with Bastion and rank IV, and stops at half Health", () => {
  const shield = (line: string, held: ReadonlySet<string>, health = 40000) => {
    const paired = tooltipPairingOf("absorbs |cffffff1|r", [line], { ...STATS, health }, held)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const fatecarver = "<<4>> = 0.139474 MaxStat + 1.46406 MaxPower (DmgShield, at most half Health)"
  const raw = 0.139474 * 20000 + 1.46406 * 5000

  expect(shield(fatecarver, new Set())).toBe(Math.floor(raw))
  expect(shield(fatecarver, new Set(["bastion"]))).toBe(11625)
  expect(shield(fatecarver.replace("Health)", "Health, rank IV)"), new Set())).toBe(10442)
  expect(shield(fatecarver, new Set(), 19394)).toBe(9697)
  expect(shield("<<1>> = 0.1 MaxStat (Dmg)", new Set(["bastion"]))).toBe(2000)
})

test("each stack of Landslide makes a damage shield 1% stronger, added to Bastion", () => {
  const brawler = "<<2>> = 0.08 MaxStat + 0.84 MaxPower (DmgShield, SingleTarget, Direct)"
  const worked = (stacks: number) => {
    const active = {
      ...NOTHING_ACTIVE,
      buffs: new Set(["Landslide"]),
      stacks: { Landslide: stacks },
    }
    const paired = tooltipPairingOf(
      "absorbs |cffffff1|r",
      [brawler],
      STATS,
      new Set(["bastion"]),
      active
    )
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = 0.08 * 20000 + 0.84 * 5000

  expect(worked(12)).toBe(Math.floor((1 + 15 / 100 + 12 / 100) * raw))
  expect(worked(12)).toBeLessThan(Math.floor(1.15 * 1.12 * raw))
  expect(worked(0)).toBe(6670)
})

test("a shield's percent constant grows with Bastion slotted and is rounded", () => {
  const wall = ["<<5>> = 30% (Constant, DmgShield)"]
  const worked = (held: ReadonlySet<string>) => {
    const paired = tooltipPairingOf("equal to |cffffff1|r%", wall, STATS, held)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }

  expect(worked(new Set(["bastion"]))).toBe(35)
  expect(worked(new Set())).toBe(30)
})

test("a shield's percent constant grows with each stack of Landslide too", () => {
  const shell = ["<<3>> = 133% (Constant, DmgShield)"]
  const worked = (stacks: number) => {
    const active = { ...NOTHING_ACTIVE, stacks: { Landslide: stacks } }
    const paired = tooltipPairingOf("for |cffffff1|r%", shell, STATS, new Set(["bastion"]), active)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }

  expect(worked(0)).toBe(153)
  expect(worked(12)).toBe(169)
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
    stacks: {},
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

test("Ancient Knowledge makes direct damage 12% stronger only with a lightning staff on the bar", () => {
  const lash = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, Shock, SingleTarget, Direct)"
  const embers = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, Shock, SingleTarget, DOT)"
  const worked = (line: string, held: ReadonlySet<string>) => {
    const paired = tooltipPairingOf("dealing |cffffff1|r", [line], STATS, held)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = 0.1 * 20000 + 1.05 * 5000
  const staff = new Set(["ancient-knowledge", "lightning-staff", "master-at-arms"])

  expect(worked(lash, staff)).toBe(Math.floor(1.18 * raw))
  expect(worked(lash, new Set(["ancient-knowledge", "dagger"]))).toBe(Math.floor(raw))
  expect(worked(embers, staff)).toBe(Math.floor(raw))
})

test("Standard of Might on the caster makes damage 15% stronger, added to the stars slotted", () => {
  const lash = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, Flame, AOE, Direct)"
  const standard = { ...NOTHING_ACTIVE, buffs: new Set(["Standard of Might"]) }
  const paired = tooltipPairingOf(
    "dealing |cffffff1|r",
    [lash],
    STATS,
    new Set(["master-at-arms", "biting-aura"]),
    standard
  )

  expect(paired.paired ? paired.numbers[0]?.temper : undefined).toBe(
    Math.floor(1.27 * (0.1 * 20000 + 1.05 * 5000))
  )
})

test("Landslide adds 1% to the bonuses, and each of its stacks makes damage 1% stronger after", () => {
  const lash = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, Flame, SingleTarget, Direct)"
  const heal = "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Heal)"
  const worked = (line: string, stacks: number) => {
    const active = {
      ...NOTHING_ACTIVE,
      buffs: new Set(["Landslide"]),
      stacks: { Landslide: stacks },
    }
    const held = new Set(["master-at-arms"])
    const paired = tooltipPairingOf("dealing |cffffff1|r", [line], STATS, held, active)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = 0.1 * 20000 + 1.05 * 5000

  expect(worked(lash, 12)).toBe(Math.floor(1.07 * 1.12 * raw))
  expect(worked(lash, 1)).toBe(Math.floor(1.07 * 1.01 * raw))
  expect(worked(heal, 12)).toBe(Math.round(1.12 * raw))
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

test("a heal over time totals each tick grown by the healing done, unless it is shown per tick", () => {
  const vigor =
    "<<1>> = 0.025 MaxStat + 0.2625 MaxPower (Heal, AOE, DOT, 10s duration, 2s tick, ticks on application)"
  const worked = (line: string, durationMs?: number) => {
    const paired = tooltipPairingOf(
      "healing for |cffffff1|r",
      [line],
      { ...STATS, healingDone: 0.08 },
      new Set(),
      NOTHING_ACTIVE,
      durationMs
    )
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const tick = Math.round(1.08 * (Math.floor(0.025 * 20000) + Math.floor(0.2625 * 5000)))

  expect(worked(vigor, 16000)).toBe(9 * tick)
  expect(worked(vigor)).toBe(6 * tick)
  expect(worked(vigor.replace("ticks on application)", "own duration)"), 30000)).toBe(5 * tick)
  expect(worked(vigor.replace("ticks on application)", "per tick)"), 16000)).toBe(tick)
})

test("a heal tagged rank IV floors its term and grows 3.3% floored, in single precision", () => {
  const line = "<<4>> = 0.2066 Health (Heal, rank IV)"
  const worked = (health: number, stacks = 0) => {
    const active = { ...NOTHING_ACTIVE, stacks: { Landslide: stacks } }
    const stats = { ...STATS, health, healingDone: Math.fround(0.02) }
    const paired = tooltipPairingOf("|cffffff1|r", [line], stats, new Set(), active)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  expect([worked(43104), worked(32651, 1), worked(32454)]).toEqual([9382, 7177, 7064])
})

test("an onset share adds to damage's bonuses, but not to area damage over time", () => {
  const shares = { "Merciless Charge": 12 }
  const active = { ...NOTHING_ACTIVE, buffs: new Set(["Minor Berserk"]), shares }
  const worked = (tags: string) => {
    const line = `<<1>> = 0.1 MaxStat + 1.05 MaxPower (Dmg, ${tags})`
    const paired = tooltipPairingOf("|cffffff1|r", [line], STATS, new Set(), active)
    return paired.paired ? paired.numbers[0]?.temper : undefined
  }
  const raw = 0.1 * 20000 + 1.05 * 5000

  expect(worked("SingleTarget, Direct")).toBe(Math.floor(1.17 * raw))
  expect(worked("AOE, DOT, 1s tick")).toBe(Math.floor(1.05 * raw))
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
