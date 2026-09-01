import { patchPage, writePage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { getEsoDayStr } from "@shared/recurrence/reset-times"
import { ALAN_PERSON } from "../notify.ts"
import { writeNotification } from "../push-notification/feed.ts"
import { type Readout, readReading, readSleepHours, resolveOneReadout } from "./readout.ts"
import { decideFall, isTierColor, tierAt, TIER_ORDER, type TierColor } from "./tier.ts"

export const WORKER_NAME = "surplus-fall-notifier"

export const LOG = `${WORKER_NAME}:`

export const GROUP_SLUG = "surplus"

export const KIND = "surplus-fall"

export const SOURCE = "readouts"

export const TICK_MS = 300_000

export const TICK_CEILING_MS = 60_000

export const DAY_PAGE_TYPE = "eso-daily-tracking"

export const DAY_KEY = "eso-day"

export const TIER_SAID_KEY = "surplus-tier-said"

export interface TierSaid {
  readonly stands: boolean
  readonly said: TierColor | null
}

export function fallBody(label: string, tier: TierColor): string {
  return `${label} has fallen to ${tier}.`
}

export function isWorse(tier: TierColor, than: TierColor): boolean {
  return TIER_ORDER.indexOf(tier) < TIER_ORDER.indexOf(than)
}

export async function tierSaidOn(day: string): Promise<TierSaid> {
  const asked = await askComposed({
    "page-type": DAY_PAGE_TYPE,
    where: { [DAY_KEY]: { is: day } },
    keys: [TIER_SAID_KEY],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`tierSaidOn: ${asked.why}`)
  const row = asked.answer.rows[0]
  if (row === undefined) return { stands: false, said: null }
  const held = row.values[TIER_SAID_KEY]
  const said = typeof held === "string" && isTierColor(held) ? held : null
  return { stands: true, said }
}

export async function sayTierOn(
  day: string,
  tier: TierColor,
  stands: boolean,
  writer: string
): Promise<void> {
  const written = stands
    ? await patchPage(DAY_PAGE_TYPE, day, { [TIER_SAID_KEY]: tier }, writer)
    : await writePage(DAY_PAGE_TYPE, day, { [DAY_KEY]: day, [TIER_SAID_KEY]: tier }, writer)
  if (!written.ok) throw new Error(`sayTierOn: ${written.why}`)
}

async function tierOrNull(
  readout: Readout,
  reading: Promise<number | null>
): Promise<TierColor | null> {
  const held = await reading
  return held === null ? null : tierAt(held, readout.rungs)
}

export async function runSurplusFallTick(
  day: string,
  writer: string,
  signal: AbortSignal
): Promise<void> {
  const readout = await resolveOneReadout(GROUP_SLUG)
  const [current, opening] = await Promise.all([
    tierOrNull(readout, readReading(readout, day)),
    tierOrNull(readout, readSleepHours(day)),
  ])

  const decision = decideFall(opening, current)
  if (!decision.fell) {
    console.log(`${LOG} ${day}: nothing to say — ${decision.why}`)
    return
  }

  signal.throwIfAborted()
  const held = await tierSaidOn(day)
  if (held.said !== null && !isWorse(decision.tier, held.said)) {
    console.log(
      `${LOG} ${day}: ${decision.tier} is no worse than the ${held.said} already said today; nothing written`
    )
    return
  }

  const written = await writeNotification(
    ALAN_PERSON,
    {
      title: readout.label,
      body: fallBody(readout.label, decision.tier),
      kind: KIND,
      source: SOURCE,
    },
    writer
  )
  if (!written.ok) throw new Error(`${LOG} ${day}: ${written.why}`)

  await sayTierOn(day, decision.tier, held.stands, writer)
  console.log(`${LOG} ${day}: wrote a fall to ${decision.tier}`)
}

export async function runBoundedSurplusFallTick(
  writer: string,
  signal: AbortSignal
): Promise<void> {
  const day = getEsoDayStr(new Date())
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `${LOG} a tick has not answered inside ${TICK_CEILING_MS}ms while reading the surplus; ` +
              "ending rather than starting a second tick beside it"
          )
        ),
      TICK_CEILING_MS
    )
  })
  try {
    await Promise.race([runSurplusFallTick(day, writer, signal), ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}
