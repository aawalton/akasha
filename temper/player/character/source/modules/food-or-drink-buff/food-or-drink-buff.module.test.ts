import { expect, test } from "bun:test"
import { slugOf as statOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  buffOf,
  buffTextOf,
} from "akasha/temper/player/character/source/modules/food-or-drink-buff/food-or-drink-buff.module.code.ts"

test("a buff naming several stats is read as one effect a stat", () => {
  const buff = buffOf(
    buffTextOf(
      "Increase Max Health by |cffffff4620|r, Max Stamina and Magicka by |cffffff4250|r, and Health Recovery by |cffffff462|r for |cffffff2.5|r hours.\nThese effects are scaled based on your level."
    )
  )
  expect(buff.effects.map((effect) => [statOf(effect.metric), effect.value])).toEqual([
    ["health-maximum", 4620],
    ["stamina-maximum", 4250],
    ["magicka-maximum", 4250],
    ["health-recovery", 462],
  ])
  expect(buff.status).toBe("supported")
  expect(buff.seconds).toBe(9000)
  expect(buff.scaled).toBe(true)
})

test("stats sharing a closing word each take that word", () => {
  const buff = buffOf("Increase Health, Magicka and Stamina Recovery by 357 for 2 hours.")
  expect(buff.effects.map((effect) => statOf(effect.metric))).toEqual([
    "health-recovery",
    "magicka-recovery",
    "stamina-recovery",
  ])
})

test("a buff whose amount reads zero is unsupported and moves nothing", () => {
  const buff = buffOf("Increase Max Magicka and Stamina by 0 for 1.5 hours.")
  expect(buff.effects).toEqual([])
  expect(buff.status).toBe("unsupported")
})

test("a buff with a sentence naming no stat is partially supported", () => {
  const buff = buffOf(
    "Increase Max Health by 385 for 1.1 hours.\nConsuming this might not be good for your health."
  )
  expect(buff.status).toBe("partially-supported")
  expect(buff.effects).toHaveLength(1)
  expect(buff.seconds).toBe(3960)
})

test("an experience bonus is read as experience gained", () => {
  const buff = buffOf(
    "You gain a 50% Experience Point bonus from all sources for 30 minutes. The timer pauses when you are offline, and resumes when you return."
  )
  expect(buff.effects.map((effect) => [statOf(effect.metric), effect.effectType])).toEqual([
    ["experience-gain", "fractional-change"],
  ])
  expect(buff.effects[0]?.value).toBe(0.5)
  expect(buff.status).toBe("supported")
  expect(buff.seconds).toBe(1800)
})
