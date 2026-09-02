/**
 * The rows a catalog page carries beside it, and the four ways they went missing without a word.
 *
 * Every case here was measured against the live corpus before it was written. At HEAD, 185 catalog
 * pages carried sidecar data on 0 of them: the mark a row was filed under never matched the mark
 * the page looked it up by. Nothing failed, nothing was reported, and the generated addon tables
 * were simply short.
 */

import { describe, expect, test } from "bun:test"
import { asPage, type Page } from "@akasha/temper-addon-generators/addon-data-page"
import {
  gatherSidecars,
  type Held,
  orderSidecars,
  type SidecarRow,
  type Sidecars,
  withSidecars,
} from "./catalog-sidecars.ts"

const MINE = "akasha/temper/temper-catalog/temper-gear/armor-traits/pages/sturdy"

function rowAt(
  path: string,
  index: number,
  pageType: string,
  named: string,
  values: Readonly<Record<string, unknown>>
): SidecarRow {
  return { at: `akasha:${path}#${index}`, values: { ...values, [`${pageType}-slug`]: named } }
}

function gathered(rows: readonly SidecarRow[]): Sidecars {
  const held = new Map<string, Held[]>()
  gatherSidecars(rows, held)
  return orderSidecars(held)
}

function pageOf(pageTypeSlug: string, key: string): Page {
  return asPage({ pageTypeSlug, key, title: key })
}

describe("a row is filed under the page and property it belongs to", () => {
  /**
   * The defect this file was written for. `([a-z-]+)` reads a property's key and cannot match
   * `part10`, so of the mine's 24 committed files a reader spelling it that way took 7,499 rows
   * of 155,440 and answered `null` for the rest.
   */
  test("a part past the first is filed under the same property as the first", () => {
    const held = gathered([
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.jsonl`, 0, "temper-armor-trait", "sturdy", {
        "metric-id": "one",
      }),
      rowAt(
        `${MINE}/sturdy.temper-armor-trait.effects.part2.jsonl`,
        0,
        "temper-armor-trait",
        "sturdy",
        { "metric-id": "two" }
      ),
      rowAt(
        `${MINE}/sturdy.temper-armor-trait.effects.part10.jsonl`,
        0,
        "temper-armor-trait",
        "sturdy",
        { "metric-id": "ten" }
      ),
    ])
    expect([...held.keys()]).toEqual(["temper-armor-trait sturdy effects"])
    expect(held.get("temper-armor-trait sturdy effects")?.length).toBe(3)
  })

  /**
   * A part numbers its lines from zero again, so the line alone is no order. Sorting by it puts
   * part 10's first row ahead of part 1's second — the same shape as the codec index that a table
   * division moved once already.
   */
  test("rows come back in part order rather than interleaved by line", () => {
    const held = gathered([
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.part2.jsonl`, 0, "temper-armor-trait", "sturdy", {
        "metric-id": "third",
      }),
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.jsonl`, 1, "temper-armor-trait", "sturdy", {
        "metric-id": "second",
      }),
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.part2.jsonl`, 1, "temper-armor-trait", "sturdy", {
        "metric-id": "fourth",
      }),
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.jsonl`, 0, "temper-armor-trait", "sturdy", {
        "metric-id": "first",
      }),
    ])
    expect(
      held.get("temper-armor-trait sturdy effects")?.map((one) => one.values["metric-id"])
    ).toEqual(["first", "second", "third", "fourth"])
  })

  /**
   * The mark is `<page type> <page name> <property>`. Reading the name off the file gave
   * `sturdy.temper-armor-trait`, which no page ever looks up, so every table came back empty.
   */
  test("the page a row belongs to is its name, rather than its name and its page type", () => {
    const held = gathered([
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.jsonl`, 0, "temper-armor-trait", "sturdy", {
        "metric-id": "one",
      }),
    ])
    expect([...held.keys()]).toEqual(["temper-armor-trait sturdy effects"])
    expect([...held.keys()]).not.toContain("temper-armor-trait sturdy.temper-armor-trait effects")
  })

  test("rows kept outside the commit are filed under their property, not under `uncommitted`", () => {
    const held = gathered([
      rowAt(
        `${MINE}/sturdy.temper-armor-trait.effects.uncommitted.jsonl`,
        0,
        "temper-armor-trait",
        "sturdy",
        { "metric-id": "one" }
      ),
      rowAt(
        `${MINE}/sturdy.temper-armor-trait.effects.part2.uncommitted.jsonl`,
        0,
        "temper-armor-trait",
        "sturdy",
        { "metric-id": "two" }
      ),
    ])
    expect([...held.keys()]).toEqual(["temper-armor-trait sturdy effects"])
  })

  test("a locator naming no rows file, and one naming no line, are both passed over", () => {
    const held = gathered([
      { at: null, values: { "temper-armor-trait-slug": "sturdy" } },
      { at: "akasha:pages/temper-armor-trait/sturdy.temper-armor-trait.md", values: { "temper-armor-trait-slug": "sturdy" } },
      { at: `akasha:${MINE}/sturdy.temper-armor-trait.effects.jsonl#nine`, values: { "temper-armor-trait-slug": "sturdy" } },
    ])
    expect(held.size).toBe(0)
  })
})

describe("what a catalog page carries once its rows are found", () => {
  test("a divided property reaches the page whole and in order", () => {
    const held = gathered([
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.part2.jsonl`, 0, "temper-armor-trait", "sturdy", {
        "metric-id": "second",
        "effect-value": 2,
      }),
      rowAt(`${MINE}/sturdy.temper-armor-trait.effects.jsonl`, 0, "temper-armor-trait", "sturdy", {
        "metric-id": "first",
        "effect-value": 1,
      }),
    ])
    const [one] = withSidecars("temper-armor-trait", [pageOf("temper-armor-trait", "sturdy")], held)
    expect(one?.effects).toEqual([
      { metricId: "first", effectValue: 1 },
      { metricId: "second", effectValue: 2 },
    ])
  })

  /**
   * Six buff and debuff types were held to `buffId` and `debuffId`. No page of those 77 carries
   * either, so the name read back null and `withSidecars` returned the page untouched — not even
   * the empty table its shape declares.
   */
  test("a buff page is named by the property every catalog page states", () => {
    const held = gathered([
      rowAt(
        "akasha/temper/x/major-aegis.temper-buff-major.effects.jsonl",
        0,
        "temper-buff-major",
        "major-aegis",
        { "metric-id": "damage-taken-dungeon", type: "fractional-change", value: -0.1 }
      ),
    ])
    const [one] = withSidecars("temper-buff-major", [pageOf("temper-buff-major", "major-aegis")], held)
    expect(one?.effects).toEqual([
      { metricId: "damage-taken-dungeon", effectType: "fractional-change", effectValue: -0.1 },
    ])
  })

  /**
   * A markdown row states `effect-value`; the same row recreated beside an akasha page states
   * `value`. Reading one spelling only turned every akasha-side effect into a null value.
   */
  test("an effect is read under either spelling the two halves of the corpus give it", () => {
    const kebab = gathered([
      rowAt("akasha/temper/x/one.temper-buff-major.effects.jsonl", 0, "temper-buff-major", "one", {
        "metric-id": "m",
        "effect-type": "flat",
        "effect-value": 5,
        "effect-seconds": 3,
      }),
    ])
    const camel = gathered([
      rowAt("akasha/temper/x/one.temper-buff-major.effects.jsonl", 0, "temper-buff-major", "one", {
        "metric-id": "m",
        type: "flat",
        value: 5,
        seconds: 3,
      }),
    ])
    const shaped = (sidecars: Sidecars): unknown =>
      withSidecars("temper-buff-major", [pageOf("temper-buff-major", "one")], sidecars)[0]?.effects
    expect(shaped(kebab)).toEqual([
      { metricId: "m", effectType: "flat", effectValue: { value: 5, seconds: 3 } },
    ])
    expect(shaped(camel)).toEqual(shaped(kebab) as never)
  })

  test("a page whose rows are nowhere carries the empty table its shape declares", () => {
    const [one] = withSidecars(
      "temper-armor-trait",
      [pageOf("temper-armor-trait", "sturdy")],
      gathered([])
    )
    expect(one?.effects).toEqual([])
    expect(one?.qualityValues).toBeNull()
  })
})
