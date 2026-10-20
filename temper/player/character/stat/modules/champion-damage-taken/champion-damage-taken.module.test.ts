import { expect, test } from "bun:test"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  DAMAGE_TAKEN_STARS,
  EVERY,
  MAGICAL,
  MARTIAL,
  starShareOf,
  starsDamageTaken,
} from "akasha/temper/player/character/stat/modules/champion-damage-taken/champion-damage-taken.module.code.ts"
import { Glob } from "bun"

const STAR_PAGES =
  "temper/catalog/champion-point/temper-champion-star/pages/*.temper-champion-star.ts"

const READ = [EVERY, MARTIAL, MAGICAL]

type Loaded = { readonly slug: string; readonly effects?: readonly { readonly metric: string }[] }

test("every star moving damage taken is a star this module reads", async () => {
  const moving: string[] = []
  for (const path of new Glob(STAR_PAGES).scanSync(akashaRoot())) {
    const loaded: Record<string, Loaded> = await import(join(akashaRoot(), path))
    for (const page of Object.values(loaded)) {
      if (page.effects?.some((effect) => READ.includes(effect.metric))) moving.push(page.slug)
    }
  }
  expect(DAMAGE_TAKEN_STARS.map((star) => star.slug).sort()).toEqual(moving.sort())
})

test("Preparation, Hardy and Elemental Aegis at their most take 12% off each type", () => {
  const spent = [
    { championSkillId: 14, points: 20, maxPoints: 20 },
    { championSkillId: 15, points: 20, maxPoints: 20 },
    { championSkillId: 16, points: 20, maxPoints: 20 },
    { championSkillId: 266, points: 50, maxPoints: 50 },
  ]
  const taken = starsDamageTaken(spent, [])
  expect(taken.martial).toBeCloseTo(-0.12)
  expect(taken.magical).toBeCloseTo(-0.12)
})

test("Hardy moves martial damage taken alone", () => {
  const taken = starsDamageTaken([{ championSkillId: 16, points: 20, maxPoints: 20 }], [])
  expect(taken.martial).toBeCloseTo(-0.02)
  expect(taken.magical).toBe(0)
})

test("a star gives the share its highest jump point reached earns", () => {
  expect(starShareOf([0, 10, 20], 15, 20)).toBe(0.5)
  expect(starShareOf([], 15, 20)).toBe(0.75)
})

test("a slottable star counts only while slotted", () => {
  const spent = [{ championSkillId: 265, points: 50, maxPoints: 50 }]
  expect(starsDamageTaken(spent, []).martial).toBe(0)
  expect(starsDamageTaken(spent, [265]).martial).toBeCloseTo(-0.06)
})
