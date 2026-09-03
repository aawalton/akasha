import type { Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { climbs, rungsIn } from "@akasha/readout-system/readout-tier"
import { sleepIn } from "@akasha/readout-system/upkeep-sleep"
import { surplusIn } from "@akasha/readout-system/upkeep-surplus"
import { onTheWorkstation } from "../push-notification/store.ts"
import { dayValuesByDate } from "../tracking/day-place.ts"
import { isTierColor, type Rung } from "./tier.ts"

// WHERE THE READOUT ITSELF COMES FROM. The readout this watches, and the scale it is read against,
// are akasha pages asked of the pages system service. They used to be resolved through
// `readouts/readout-resolver.ts`, which built its catalog by scanning the markdown `readouts/`
// tree — a second population of readout pages, kept beside the akasha one and free to disagree
// with it. A notifier is the worst place for that disagreement to sit: a threshold moved on the
// akasha page would have been read off the markdown twin, and the rung Alan is told about would
// have been a rung nothing else in the system stands on. So there is one population now, and it is
// the one every other reader of a readout already uses.
//
// WHERE THE TWO READINGS COME FROM. Both are keys on the day's tracking row, and the row is asked
// for through `dayValuesByDate` — the funnel's by-date reader, which is what says where a day is
// kept. Neither reading composes a query of its own any more: this file used to name the day page
// type and hand the query straight to the page client, which decided for itself which half of the
// migration the day was in, and would have gone on reading the markdown half after the day moved.
//
// What each reading *means* is still decided in akasha. `surplusIn` is the same reducer
// `fetchSurplusHours` uses and the same one the surplus reading service draws its tile from, so the
// tier said here and the tile on the website are taken off one function rather than two that can
// drift. The split is that akasha says what a reading means and the funnel says where the day is.
//
// The sleep half reads the same way. `sleepIn` is the reducer the `upkeep-sleep` readout reduces
// its own key with, so the sleep read here and the sleep on the website come off one function
// rather than two free to disagree. This file used to apply `statedAt` to the key itself, which
// was that same arithmetic written a second time under a comment saying no reducer existed.
export const SLEEP_HOURS_KEY = "sleep-hours"

const SURPLUS_KEYS = ["surplus-hours", SLEEP_HOURS_KEY, "spend-hours"] as const

export interface Readout {
  readonly slug: string
  readonly label: string
  readonly rungs: readonly Rung[]
}

const READOUT_PAGE_TYPE_SLUG = "readout"

const READOUT_SCALE_PAGE_TYPE_SLUG = "readout-scale"

type Values = Readonly<Record<string, unknown>>

function stated(held: unknown): string | null {
  return typeof held === "string" && held !== "" ? held : null
}

/**
 * The rows of one question, or a throw.
 *
 * `askingFor` hands back `{ refused }` rather than throwing, and a refusal read as no rows would
 * make an unreachable store look like a group holding no readout — which reads as a day with
 * nothing to say. Every refusal is thrown, so the tick that met it counts against the ratchet and
 * the service goes red instead of going quiet.
 */
async function rowsOf(query: Query, doing: string): Promise<readonly Values[]> {
  const asked = await askingFor(query, onTheWorkstation)
  if ("refused" in asked) throw new Error(`${doing}: ${asked.refused}`)
  return asked.rows as readonly Values[]
}

export async function rungsOf(scaleSlug: string): Promise<readonly Rung[]> {
  const rows = await rowsOf(
    {
      pageTypeSlug: READOUT_SCALE_PAGE_TYPE_SLUG,
      where: { slug: { is: scaleSlug } },
    },
    `rungsOf: the readout scale \`${scaleSlug}\` went unread, so no reading can be placed on a rung`
  )
  const [row, ...rest] = rows
  if (row === undefined) {
    throw new Error(
      `rungsOf: no \`${READOUT_SCALE_PAGE_TYPE_SLUG}\` page answers to \`${scaleSlug}\`, and a fall is said in the rungs a scale states`
    )
  }
  if (rest.length > 0) {
    throw new Error(
      `rungsOf: ${rows.length} \`${READOUT_SCALE_PAGE_TYPE_SLUG}\` pages answer to \`${scaleSlug}\`, and nothing says which of them the fall is read against`
    )
  }
  const rungs: Rung[] = []
  for (const rung of rungsIn(row)) {
    if (!isTierColor(rung.color)) {
      throw new Error(
        `rungsOf: the readout scale \`${scaleSlug}\` states a \`${rung.color}\` rung, and a fall is said in the five colors a tier carries`
      )
    }
    rungs.push({ at: rung.at, color: rung.color })
  }
  if (!climbs(rungs)) {
    throw new Error(
      `rungsOf: the readout scale \`${scaleSlug}\` states ${rungs.map((rung) => rung.color).join(", ")}, which does not climb from black through blue, so nothing on it says that a lower reading is the worse one`
    )
  }
  return rungs
}

/**
 * A readout a page stills is not watched, which is the rule `readout-group-serving` draws by: a
 * readout drawn nowhere is not one Alan is told has fallen.
 */
function stilled(row: Values): boolean {
  return row.enabled === false
}

export async function resolveOneReadout(groupSlug: string): Promise<Readout> {
  const rows = await rowsOf(
    {
      pageTypeSlug: READOUT_PAGE_TYPE_SLUG,
      where: { groupSlugs: { has: groupSlug } },
    },
    `resolveOneReadout: the readouts of the group \`${groupSlug}\` went unread, so what is being watched is unknown`
  )
  const drawn = rows.filter((row) => !stilled(row))
  const [row, ...rest] = drawn
  if (row === undefined || rest.length > 0) {
    throw new Error(
      `resolveOneReadout: the group \`${groupSlug}\` holds ${drawn.length} readouts, and this watches one reading rather than a strip`
    )
  }
  const slug = stated(row.slug)
  const label = stated(row.label)
  const scaleSlug = stated(row.scaleSlug)
  if (slug === null || label === null || scaleSlug === null) {
    throw new Error(
      `resolveOneReadout: the one readout of the group \`${groupSlug}\` states no slug, no label or no scale-slug, and a fall names the readout it fell on and the rung it reached`
    )
  }
  return { slug, label, rungs: await rungsOf(scaleSlug) }
}

export async function readReading(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day, SURPLUS_KEYS)
  if (values === null) return null
  return surplusIn(values)
}

export async function readSleepHours(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day, [SLEEP_HOURS_KEY])
  if (values === null) return null
  return sleepIn(values)
}
