import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import {
  buildReadingsIn,
  combatCaseShape,
  combatCaseText,
  glyphTooltipOf,
  targetDamageTakenOf,
} from "akasha/temper/player/character/stat/modules/combat-case/combat-case.module.code.ts"
import {
  judgeCombatCase,
  pinnedReadingOf,
} from "akasha/temper/player/character/stat/modules/combat-case/combat-case.module.test-fixtures.ts"
import { glyphHitOf } from "akasha/temper/player/character/stat/modules/glyph-hit/glyph-hit.module.code.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"
import { Glob } from "bun"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()

const ENDING = ".temper-combat-case.verified-hits.json"

const CASES = [
  ...new Glob(`temper/player/character/stat/temper-combat-case/pages/*/*${ENDING}`).scanSync(
    akashaRoot()
  ),
].sort()

function caseSlug(path: string): string {
  return (path.split("/").at(-1) ?? path).replace(ENDING, "")
}

test("the combat cases are found", () => {
  expect(CASES.length).toBeGreaterThan(0)
})

test("a glyph's tooltip is the first number its enchant text gives", () => {
  expect(glyphTooltipOf("Deals |cffffff2534|r Shock Damage.")).toBe(2534)
  expect(
    glyphTooltipOf("Deals |cffffff1859|r Physical Damage and restores |cffffff327|r Stamina.")
  ).toBe(1859)
  expect(glyphTooltipOf("no number")).toBeNull()
})

test("a glyph's hit multiplies its two terms apart and rounds once", () => {
  expect(glyphHitOf({ tooltip: 2534, directDamageMonsters: 0.15, targetDamageTaken: 0 })).toBe(2914)
  expect(glyphHitOf({ tooltip: 2534, directDamageMonsters: 0.15, targetDamageTaken: 0.05 })).toBe(
    3060
  )
  expect(glyphHitOf({ tooltip: 1859, directDamageMonsters: 0, targetDamageTaken: 0.05 })).toBe(1952)
})

test("a build's readings name every glyph its weapons carry, so two tooltips show as two", () => {
  const worn = (enchant: string) => ({
    "1": { slot: 4, enchant },
    "2": { slot: 1, enchant: "Adds |cffffff174|r Weapon and Spell Damage." },
  })
  const body = [
    { id: "a", buildHash: "one", reading: { worn: worn("Deals |cffffff2534|r Shock Damage.") } },
    { id: "b", buildHash: "one", reading: { worn: worn("Deals |cffffff2711|r Shock Damage.") } },
    { id: "c", buildHash: "two", reading: { worn: worn("Deals |cffffff9|r Shock Damage.") } },
  ]
    .map((one) => JSON.stringify(one))
    .join("\n")

  expect(buildReadingsIn(body, "one")).toEqual({
    ids: ["a", "b"],
    enchants: ["Deals |cffffff2534|r Shock Damage.", "Deals |cffffff2711|r Shock Damage."],
  })
})

test("Abyssal Ink's page makes its target take 5% more, and no debuff makes it take none", () => {
  expect(targetDamageTakenOf(["abyssal-ink"])).toBe(0.05)
  expect(targetDamageTakenOf([])).toBe(0)
})

for (const path of CASES) {
  const text = readFileSync(join(akashaRoot(), path), "utf8")
  const combatCase = combatCaseShape.parse(JSON.parse(text))

  test(`the ${caseSlug(path)} case gives every pinned hit, and explains no unexplained one`, () => {
    const judged = judgeCombatCase(combatCase)
    expect(judged.drifted).toEqual([])
    expect(judged.closed).toEqual([])
  })

  test(`the ${caseSlug(path)} case's pinned reading is of its build and names its glyph`, () => {
    const read = pinnedReadingOf(akashaRoot(), caseSlug(path), combatCase)
    expect(read.ids).toEqual([combatCase.reading])
    expect(read.enchants).toEqual([combatCase.enchant])
  })

  test(`the ${caseSlug(path)} case is written as a case is written`, () => {
    expect(combatCaseText(combatCase)).toBe(text)
  })
}
