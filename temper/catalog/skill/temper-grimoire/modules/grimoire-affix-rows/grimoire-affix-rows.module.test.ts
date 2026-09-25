import { expect, test } from "bun:test"
import { slugIn } from "akasha/change/modules/target-narrowing/target-narrowing.module.code.ts"
import { majorResolve } from "akasha/temper/catalog/effect/temper-buff-major/pages/major-resolve/major-resolve.temper-buff-major.ts"
import { minorResolve } from "akasha/temper/catalog/effect/temper-buff-minor/pages/minor-resolve/minor-resolve.temper-buff-minor.ts"
import { minorMangle } from "akasha/temper/catalog/effect/temper-debuff-minor/pages/minor-mangle/minor-mangle.temper-debuff-minor.ts"
import {
  affixRowOf,
  GRIMOIRE_AFFIX_ROWS,
  type GrimoireWithAffixRows,
} from "akasha/temper/catalog/skill/temper-grimoire/modules/grimoire-affix-rows/grimoire-affix-rows.module.code.ts"

test("a grimoire's affix row is found by the affix script it holds", () => {
  expect(affixRowOf("wield-soul", "resolve")?.grantedBuffs?.map(slugIn)).toEqual([
    majorResolve.slug,
  ])
  expect(affixRowOf("banner-bearer", "resolve")?.grantedBuffs?.map(slugIn)).toEqual([
    minorResolve.slug,
  ])
})

test("every grimoire taking the mangle affix script applies Minor Mangle", () => {
  for (const grimoire of ["smash", "torchbearer", "trample"] as const) {
    expect(affixRowOf(grimoire, "mangle")?.appliedDebuffs?.map(slugIn)).toEqual([minorMangle.slug])
  }
})

test("an affix script a grimoire does not take has no row there", () => {
  expect(affixRowOf("banner-bearer", "lifesteal")).toBeUndefined()
})

test("every row a grimoire holds is found by its own affix script", () => {
  for (const [grimoire, rows] of Object.entries(GRIMOIRE_AFFIX_ROWS)) {
    expect(rows.length).toBeGreaterThan(0)
    for (const row of rows) {
      expect(affixRowOf(grimoire as GrimoireWithAffixRows, slugIn(row.scriptId))).toBe(row)
    }
  }
})
