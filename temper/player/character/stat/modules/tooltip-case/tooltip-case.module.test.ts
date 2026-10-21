import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { emeraldMoss } from "akasha/temper/catalog/skill/pages/emerald-moss/emerald-moss.temper-skill.ts"
import {
  equationsOf,
  heldOfCase,
  heldSetOf,
  pinnedTooltipCaseOf,
  skillLinesOf,
  skillValuesIn,
  tooltipCaseShape,
  tooltipCaseText,
} from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"
import { judgeTooltipCase } from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.test-fixtures.ts"
import { Glob } from "bun"

const ENDING = ".temper-tooltip-case.verified-tooltips.json"

const CASES = [
  ...new Glob(`temper/player/character/stat/temper-tooltip-case/pages/*/*${ENDING}`).scanSync(
    akashaRoot()
  ),
].sort()

const EQUATIONS = new Map([
  [
    38754,
    ["<<1>> = 0.1 MaxStat + 1 MaxPower (Ultimate, Dmg, Physical)", "<<2>> = 6 seconds (Constant)"],
  ],
  [20816, ["<<1>> = 0.1 MaxStat (Dmg)"]],
])

const READ = {
  character: "erin-solstice",
  bar: "primary-weapon-bar" as const,
  capturedAt: 1792545237,
  esoVersion: "eso.live.12.1.6.3309674",
  stats: { "stamina-maximum": 20000, "magicka-maximum": 10000, "power-spell": 3000 },
  skills: [
    {
      abilityId: 38754,
      name: "Brawler",
      description: "dealing |cffffff5000|r Physical Damage for |cffffff7|r seconds",
    },
    { abilityId: 20816, name: "Flame Lash", description: "dealing |cffffff2000|r and |cffffff9|r" },
    { abilityId: 1, name: "Nothing Known", description: "dealing |cffffff1|r" },
  ],
}

test("a number Temper gives exactly is pinned, another is a gap, and an unpaired skill is neither", () => {
  const pinned = pinnedTooltipCaseOf(READ, EQUATIONS)

  expect(pinned.pinned).toEqual({ "38754 <<1>>": 5000 })
  expect(pinned.gaps).toEqual({ "38754 <<2>>": 7 })
  expect(Object.keys(pinned.stats)).toEqual(["magicka-maximum", "power-spell", "stamina-maximum"])
})

test("a pinned number Temper no longer gives has drifted, and a gap it now gives is closed", () => {
  const pinned = pinnedTooltipCaseOf(READ, EQUATIONS)
  const changed = new Map([
    [38754, ["<<1>> = 0.1 MaxStat + 0.9 MaxPower (Dmg)", "<<2>> = 7 seconds (Constant)"]],
  ])

  expect(judgeTooltipCase(pinned, EQUATIONS)).toEqual({ drifted: [], closed: [] })
  expect(judgeTooltipCase(pinned, changed)).toEqual({
    drifted: [{ formula: "38754 <<1>>", game: 5000, temper: 4700 }],
    closed: ["38754 <<2>>"],
  })
})

test("a case holds the weapons its build held on its own bar, beside its passives and stars", () => {
  const build = {
    passives: ["ancient-knowledge"],
    stars: ["master-at-arms"],
    mediumPieces: 0,
    weapons: {
      "primary-weapon-bar": ["dagger", "shield"],
      "backup-weapon-bar": ["lightning-staff"],
    },
  }
  const back = heldOfCase(build, {}, "backup-weapon-bar")

  expect(back.weapons).toEqual(["lightning-staff"])
  expect([...heldSetOf(back)]).toEqual(["ancient-knowledge", "master-at-arms", "lightning-staff"])
  expect(heldOfCase(build, {}, "primary-weapon-bar").weapons).toEqual(["dagger", "shield"])
  expect(heldOfCase(build, {}).weapons).toBeUndefined()
})

test("a case keeps the stacks of each buff active with stacks, and no stacks where none has any", () => {
  const read = heldOfCase(undefined, {
    activeBuffs: [
      { name: "Gallop", stacks: 0 },
      { name: "Landslide", stacks: 6 },
    ],
  })

  expect(read.buffs).toEqual(["Gallop", "Landslide"])
  expect(read.stacks).toEqual({ Landslide: 6 })
  expect(heldOfCase(undefined, { activeBuffs: [{ name: "Gallop" }] }).stacks).toBeUndefined()
})

test("a case's heals are worked with the Healing Done it keeps", () => {
  const heal = new Map([[1, ["<<1>> = 0.1 MaxStat (Heal)"]]])
  const read = {
    ...READ,
    skills: [{ abilityId: 1, name: "Mend", description: "heals |cffffff2160|r" }],
  }

  expect(pinnedTooltipCaseOf({ ...read, healingDone: 0.08 }, heal).pinned).toEqual({
    "1 <<1>>": 2160,
  })
  expect(pinnedTooltipCaseOf(read, heal).gaps).toEqual({ "1 <<1>>": 2160 })
})

test("a variant takes its skill's equations unless it states its own", () => {
  const found = equationsOf([
    {
      esoSkillId: 20816,
      equations: ["<<1>> = 0.1 MaxStat (Dmg)"],
      variants: [
        { esoSkillId: 20824, equations: ["<<1>> = 0.2 MaxStat (Dmg)"] },
        { esoSkillId: 20825 },
      ],
    },
    { esoSkillId: 1, title: "no equations" },
  ])

  expect([...found]).toEqual([
    [20816, ["<<1>> = 0.1 MaxStat (Dmg)"]],
    [20824, ["<<1>> = 0.2 MaxStat (Dmg)"]],
    [20825, ["<<1>> = 0.1 MaxStat (Dmg)"]],
  ])
})

test("a skill page's skill line is found by its ability id and each variant's", () => {
  const found = skillLinesOf([
    {
      esoSkillId: 85863,
      skillLineId: emeraldMoss.skillLineId,
      variants: [{ esoSkillId: 85864 }],
    },
    { esoSkillId: 1, title: "no skill line" },
  ])

  expect([...found]).toEqual([
    [85863, emeraldMoss.skillLineId],
    [85864, emeraldMoss.skillLineId],
  ])
})

test("a Green Balance heal grows by Emerald Moss for each Green Balance skill on the bar", () => {
  const green = emeraldMoss.skillLineId
  const spores = new Map([[2, ["<<1>> = 0.1 MaxStat (Heal)"]]])
  const read = {
    ...READ,
    passives: [emeraldMoss.slug],
    skills: [
      { abilityId: 2, name: "Spores", description: "heals |cffffff2100|r" },
      { abilityId: 3, name: "Seed", description: "nothing named" },
    ],
  }
  const lines = new Map([
    [2, green],
    [3, green],
  ])

  expect(pinnedTooltipCaseOf(read, spores, new Map([[2, green]])).pinned).toEqual({
    "2 <<1>>": 2100,
  })
  expect(pinnedTooltipCaseOf(read, spores, lines).gaps).toEqual({ "2 <<1>>": 2100 })
})

test("a case is written as text that reads back as the same case", () => {
  const pinned = pinnedTooltipCaseOf(READ, EQUATIONS)

  expect(tooltipCaseShape.parse(JSON.parse(tooltipCaseText(pinned)))).toEqual(pinned)
})

const SKILLS = skillValuesIn(akashaRoot())

const HELD = equationsOf(SKILLS)

const LINES = skillLinesOf(SKILLS)

for (const path of CASES) {
  const text = readFileSync(join(akashaRoot(), path), "utf8")
  const tooltipCase = tooltipCaseShape.parse(JSON.parse(text))
  const named = `${tooltipCase.character} ${tooltipCase.bar} ${String(tooltipCase.capturedAt)}`

  test(`the ${named} case gives every pinned number, and closes no gap unpinned`, () => {
    const judged = judgeTooltipCase(tooltipCase, HELD, LINES)
    expect(judged.drifted).toEqual([])
    expect(judged.closed).toEqual([])
  })

  test(`the ${named} case pinned again from its own reading is written as it is`, () => {
    const { pinned, gaps, ...read } = tooltipCase
    expect(tooltipCaseText(pinnedTooltipCaseOf(read, HELD, LINES))).toBe(text)
  })
}
