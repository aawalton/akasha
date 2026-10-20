import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()

const READINGS =
  "temper/player/character/temper-account-character/pages/erin-solstice/erin-solstice.temper-account-character.readings.jsonl"

type Listed<T> = Readonly<Record<string, T>>

interface Reading {
  readonly id: string
  readonly buildHash: string
  readonly reading: {
    readonly stats: Readonly<Record<string, number>>
    readonly activeBuffs?: Listed<{ readonly abilityId: number; readonly name: string }>
    readonly championPoints?: Listed<{
      readonly championSkillId: number
      readonly points: number
      readonly maxPoints: number
    }>
  }
}

const READ: ReadonlyMap<string, Reading> = new Map(
  readFileSync(join(akashaRoot(), READINGS), "utf8")
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => JSON.parse(line) as Reading)
    .map((one) => [one.id, one] as const)
)

function readingOf(id: string): Reading {
  const found = READ.get(id)
  if (found === undefined) throw new Error(`Erin Solstice has no reading ${id}`)
  return found
}

type Slot = "chest" | "waist"

interface Glyph {
  readonly subtype: number
  readonly level: number
}

type Glyphs = Partial<Record<Slot, Glyph | null>>

function withGlyphs(build: CharacterState, glyphs: Glyphs): CharacterState {
  let armor = build.equipment.armor
  for (const [slot, glyph] of Object.entries(glyphs) as [Slot, Glyph | null][]) {
    const piece = armor[slot]
    const data =
      glyph === null
        ? { ...piece.data, enchantment: "no-enchant" }
        : {
            ...piece.data,
            enchantment: "health",
            enchantmentSubtype: glyph.subtype,
            enchantmentLevel: glyph.level,
          }
    armor = { ...armor, [slot]: { ...piece, data } }
  }
  return { ...build, equipment: { ...build.equipment, armor } } as CharacterState
}

function healthWith(base: Reading, glyphs: Glyphs): number {
  const build = decodeBuild(buildHash(base.buildHash))
  if (build === null) throw new Error(`the build of reading ${base.id} does not decode`)
  const buffs = Object.values(base.reading.activeBuffs ?? {}).map(({ abilityId, name }) => ({
    abilityId,
    name,
  }))
  const stars = Object.values(base.reading.championPoints ?? {}).map(
    ({ championSkillId, points, maxPoints }) => ({ championSkillId, points, maxPoints })
  )
  const worn = withGlyphs(build, glyphs)
  const { metrics } = calculateReadingStatsByBar(worn, "primary-weapon-bar", buffs, stars)
  return metrics["health-maximum"]?.value ?? 0
}

function sheetHealth(reading: Reading): number {
  return reading.reading.stats["health-maximum"] ?? 0
}

const BARE_CHEST = "01a15a62-1b4b-77dc-8a43-6c4305a00107"

const CHEST_GLYPHS: readonly (readonly [number, number, string])[] = [
  [20, 5, "01a15a63-7664-7bc9-829e-a17413f2323a"],
  [20, 10, "01a15a62-6719-7910-b83d-fac36076b705"],
  [20, 15, "01a15a63-0ec4-73a9-a2d9-574a25280bc7"],
  [20, 20, "01a15a63-26a6-7008-8012-c662ecc80a7f"],
  [20, 25, "01a15a62-c6fb-71bd-8591-3d2a7dd8f737"],
  [20, 30, "01a15a62-afed-770a-aca1-366ffd594b92"],
  [20, 35, "01a15a62-df1c-70b9-ab9e-8b001ae78af0"],
  [20, 40, "01a15a62-2b0d-7f76-be50-72bc2014c313"],
  [20, 45, "01a15a63-4e72-7f32-a220-7c5425af594c"],
  [125, 50, "01a15a62-b451-707a-87e4-fac4f495feb9"],
  [127, 50, "01a15a62-5770-725c-b3be-07f9658ae319"],
  [129, 50, "01a15a62-437a-7616-95be-bbe24becd2d4"],
  [131, 50, "01a15a63-3ab9-7989-be69-ed739fd485d2"],
  [272, 50, "01a15a62-f2ec-7dc0-8395-27fe59ad17bb"],
  [308, 50, "01a15a63-6261-7d1d-bf11-80c0a95c008e"],
  [366, 50, "01a15a63-8e2c-740e-9ff9-be925ebaa550"],
  [367, 50, "01a15a64-7543-7124-b8f5-51882a95ecdc"],
  [368, 50, "01a15a64-88bd-7471-99cf-bd05adcab19f"],
  [369, 50, "01a15a64-a0a4-7280-8dcb-92b29d2f9ddd"],
]

for (const [subtype, level, id] of CHEST_GLYPHS) {
  const bare = readingOf(BARE_CHEST)
  const worn = readingOf(id)
  test(`a health glyph of subtype ${subtype} at level ${level} on the CP160 normal heavy chest moves Maximum Health as Erin Solstice's reading ${id} did against ${BARE_CHEST}`, () => {
    expect(
      healthWith(bare, { chest: { subtype, level } }) - healthWith(bare, { chest: null })
    ).toBe(sheetHealth(worn) - sheetHealth(bare))
  })
}

const BARE_SASH = "01a15a68-1012-74d5-80f4-9cb474f673f9"

const SASH_GLYPH = "01a15a68-1c11-772e-bb35-d60dddd095c6"

const LEVEL_FIVE_CHEST_GLYPH: Glyph = { subtype: 20, level: 5 }

test(`a health glyph of subtype 366 on the CP160 light sash moves Maximum Health as Erin Solstice's reading ${SASH_GLYPH} did against ${BARE_SASH}, with the level-5 glyph on the chest`, () => {
  const bare = readingOf(BARE_SASH)
  const sash = healthWith(bare, {
    chest: LEVEL_FIVE_CHEST_GLYPH,
    waist: { subtype: 366, level: 50 },
  })
  const without = healthWith(bare, { chest: LEVEL_FIVE_CHEST_GLYPH, waist: null })
  expect(sash - without).toBe(sheetHealth(readingOf(SASH_GLYPH)) - sheetHealth(bare))
})
