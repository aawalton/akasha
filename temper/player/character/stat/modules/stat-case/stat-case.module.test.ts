import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"
import {
  pinnedCaseOf,
  reproduces,
  sheetStatsOf,
  statCaseShape,
  statCaseText,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import { judgeStatCase } from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.test-fixtures.ts"
import { Glob } from "bun"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()

const ENDING = ".temper-stat-case.verified-stats.json"

const CASES = [
  ...new Glob(`temper/player/character/stat/temper-stat-case/pages/*/*${ENDING}`).scanSync(
    akashaRoot()
  ),
].sort()

function caseFolder(path: string): string {
  return path.split("/").at(-2) ?? path
}

test("the stat cases are found", () => {
  expect(CASES.length).toBeGreaterThan(0)
})

test("a sheet row is read as the stat whose page names that row and that part", () => {
  const sheet = {
    "physical-resist": { format: "flat-or-percent", flat: 9048, percent: 13.709091186523438 },
    "bash-cost": { format: "flat", flat: 554 },
  }

  expect(sheetStatsOf(sheet)).toEqual({
    "defense-physical-mitigation": 13.709091186523438,
    "bash-cost": 554,
  })
})

test("a sheet percent is reproduced by the float holding that percent over a hundred", () => {
  const fraction = Math.fround(Math.fround(15714 / 660) / 100)

  expect(reproduces("defense-spell-mitigation", fraction, 23.809091567993164)).toBe(true)
  expect(
    reproduces("defense-spell-mitigation", Math.fround(15714 / 66000), 23.809091567993164)
  ).toBe(false)
  expect(reproduces("bash-cost", 554, 554)).toBe(true)
})

test("a case pinned again from its own reading is written as it is", () => {
  const path = CASES[0] ?? ""
  const text = readFileSync(join(akashaRoot(), path), "utf8")
  const { pinned, gaps, ...read } = statCaseShape.parse(JSON.parse(text))
  expect(statCaseText(pinnedCaseOf({ ...read, stats: { ...pinned, ...gaps } }))).toBe(text)
})

for (const path of CASES) {
  const text = readFileSync(join(akashaRoot(), path), "utf8")
  const statCase = statCaseShape.parse(JSON.parse(text))

  test(`the ${caseFolder(path)} case gives every pinned stat, and closes no gap unpinned`, () => {
    const judged = judgeStatCase(statCase)
    expect(judged.drifted).toEqual([])
    expect(judged.closed).toEqual([])
  })

  test(`the ${caseFolder(path)} case is written as a case is written`, () => {
    expect(statCaseText(statCase)).toBe(text)
  })
}
