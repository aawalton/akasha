/**
 * The rows a catalog page carries beside it, and the ways they went missing without a word.
 *
 * Every case here was measured against the live corpus before it was written. At one point 185
 * catalog pages carried sidecar data on 0 of them, and nothing failed and nothing was reported —
 * the generated addon tables were simply short.
 */

import { describe, expect, test } from "bun:test"
import { asPage, type Page } from "@akasha/temper-addon-generators/addon-data-page"
import { withSidecars } from "./catalog-sidecars.ts"

function pageOf(
  pageTypeSlug: string,
  key: string,
  carried: Readonly<Record<string, unknown>> = {}
): Page {
  return asPage({ pageTypeSlug, key, title: key, ...carried })
}

describe("what a catalog page carries once its rows are shaped", () => {
  test("the rows of a property reach the page in the order the page carries them", () => {
    const [one] = withSidecars("temper-armor-trait", [
      pageOf("temper-armor-trait", "sturdy", {
        effects: [
          { metricId: "first", value: 1 },
          { metricId: "second", value: 2 },
        ],
      }),
    ])
    expect(one?.effects).toEqual([
      { metricId: "first", effectValue: 1 },
      { metricId: "second", effectValue: 2 },
    ])
  })

  /**
   * Six buff and debuff types were named by `buffId` and `debuffId`, which none of those 77 pages
   * carries, so the lookup answered null and the page came back untouched — not even the empty
   * table its shape declares. Nothing names a page now: the rows arrive on it.
   */
  test("a buff page carries its effects with no name to look them up by", () => {
    const [one] = withSidecars("temper-buff-major", [
      asPage({
        pageTypeSlug: "temper-buff-major",
        title: "Major Aegis",
        effects: [{ metricId: "damage-taken-dungeon", type: "fractional-change", value: -0.1 }],
      }),
    ])
    expect(one?.effects).toEqual([
      { metricId: "damage-taken-dungeon", effectType: "fractional-change", effectValue: -0.1 },
    ])
  })

  /**
   * A markdown row states `effect-value`; the same row recreated beside an akasha page states
   * `value`. Reading one spelling only turned every akasha-side effect into a null value.
   */
  test("an effect is read under either spelling the two halves of the corpus give it", () => {
    const shaped = (entry: Readonly<Record<string, unknown>>): unknown =>
      withSidecars("temper-buff-major", [
        pageOf("temper-buff-major", "one", { effects: [entry] }),
      ])[0]?.effects
    const kebab = shaped({
      "metric-id": "m",
      "effect-type": "flat",
      "effect-value": 5,
      "effect-seconds": 3,
    })
    expect(kebab).toEqual([
      { metricId: "m", effectType: "flat", effectValue: { value: 5, seconds: 3 } },
    ])
    expect(shaped({ metricId: "m", type: "flat", value: 5, seconds: 3 })).toEqual(kebab as never)
  })

  test("a page whose rows are nowhere carries the empty table its shape declares", () => {
    const [one] = withSidecars("temper-armor-trait", [pageOf("temper-armor-trait", "sturdy")])
    expect(one?.effects).toEqual([])
    expect(one?.qualityValues).toBeNull()
  })

  test("a page type carrying no rows is answered unchanged", () => {
    const rows = [pageOf("temper-zone", "auridon")]
    expect(withSidecars("temper-zone", rows)).toBe(rows)
  })
})
