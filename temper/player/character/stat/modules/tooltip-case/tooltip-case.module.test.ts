import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  equationsIn,
  pinnedTooltipCaseOf,
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

test("a case is written as text that reads back as the same case", () => {
  const pinned = pinnedTooltipCaseOf(READ, EQUATIONS)

  expect(tooltipCaseShape.parse(JSON.parse(tooltipCaseText(pinned)))).toEqual(pinned)
})

const HELD = equationsIn(akashaRoot())

for (const path of CASES) {
  const text = readFileSync(join(akashaRoot(), path), "utf8")
  const tooltipCase = tooltipCaseShape.parse(JSON.parse(text))
  const named = `${tooltipCase.character} ${tooltipCase.bar} ${String(tooltipCase.capturedAt)}`

  test(`the ${named} case gives every pinned number, and closes no gap unpinned`, () => {
    const judged = judgeTooltipCase(tooltipCase, HELD)
    expect(judged.drifted).toEqual([])
    expect(judged.closed).toEqual([])
  })

  test(`the ${named} case pinned again from its own reading is written as it is`, () => {
    const { pinned, gaps, ...read } = tooltipCase
    expect(tooltipCaseText(pinnedTooltipCaseOf(read, HELD))).toBe(text)
  })
}
