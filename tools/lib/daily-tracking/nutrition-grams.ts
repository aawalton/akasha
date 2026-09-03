import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { wakeDayWindow } from "../wake-day.ts"
import { numberOf } from "./tracking-modules.ts"

const FOOD_ENTRY_PAGE_TYPE_SLUG = "food-entry"

/**
 * How a food entry spells the two keys a day's plant grams are read off it.
 *
 * A page states its keys as its own file spells them, so these are humped rather than the kebab
 * slugs the old markdown query took. What stood here asked the markdown query client for
 * `food-entry` under `happened-at` and `plant-grams`, and got `ok` with no rows, no error, and
 * `unfound: ["id", "plant-grams"]`, so every day summed to nothing while 87 food entries stood in
 * akasha.
 *
 * Why that one answered where its siblings refuse: the client recognises a page type by the
 * declaration `pages/page-type/<slug>.page-type.md`, and `food-entry.page-type.md` survived the
 * migration while the 333 instance files under `pages/food-entry/` went with it. `completed-task`
 * lost both, so it refuses by name. A page type that keeps its declaration and loses its pages is
 * the shape that answers zero, and it is worth checking for rather than waiting to meet.
 */
const HAPPENED_AT = "happenedAt"

const PLANT_GRAMS = "plantGrams"

export function sumPlantGrams(rows: readonly Readonly<Record<string, unknown>>[]): number {
  let total = 0
  for (const row of rows) total += numberOf(row[PLANT_GRAMS]) ?? 0
  return total
}

function checkoutRoot(): string {
  const roots = resolveRoots() as unknown as Readonly<Record<string, string>>
  const root = roots[AKASHA]
  if (root === undefined || root === "") {
    throw new Error("loadDayPlantGrams: no akasha checkout stands here, so no food entry is read")
  }
  return root
}

/**
 * The grams of plant Alan ate across one wake day.
 *
 * `asking` rather than `valuesOfType` under it, and rather than the markdown query above it,
 * because both of those answer nothing where they cannot read. `asking` refuses a page type the
 * index does not hold and refuses a key the page type does not declare, so a spelling that has
 * moved shows up as a throw rather than as a zero on Alan's day. A zero here is kept as a reading
 * — `zero-plant-grams-is-a-reading-where-zero-surplus-hours-is-not` settles that — which is
 * exactly why the instrument has to refuse rather than sum over rows it never found.
 */
export async function loadDayPlantGrams(dayStr: string): Promise<number> {
  const window = wakeDayWindow(resolveRoots(), dayStr)
  const asked = asking(checkoutRoot(), {
    pageTypeSlug: FOOD_ENTRY_PAGE_TYPE_SLUG,
    where: { [HAPPENED_AT]: { "at-or-after": window.from, before: window.to } },
    keys: [PLANT_GRAMS],
  } as never)
  if ("refused" in asked) throw new Error(`loadDayPlantGrams: ${asked.refused}`)
  return sumPlantGrams(asked.rows)
}
