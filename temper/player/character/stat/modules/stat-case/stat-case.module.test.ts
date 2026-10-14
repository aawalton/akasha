import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"
import {
  judgeStatCase,
  pinnedCaseOf,
  statCaseShape,
  statCaseText,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
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

for (const path of CASES) {
  const text = readFileSync(join(akashaRoot(), path), "utf8")
  const statCase = statCaseShape.parse(JSON.parse(text))

  test(`the ${caseFolder(path)} case gives every pinned stat, and closes no gap unpinned`, () => {
    const judged = judgeStatCase(statCase)
    expect(judged.drifted).toEqual([])
    expect(judged.closed).toEqual([])
  })

  test(`the ${caseFolder(path)} case pinned again from its own reading is written as it is`, () => {
    const { pinned, gaps, ...read } = statCase
    expect(statCaseText(pinnedCaseOf({ ...read, stats: { ...pinned, ...gaps } }))).toBe(text)
  })
}
