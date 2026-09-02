import { getEsoDayStr } from "@akasha/day/eso-day"
import { ALAN_PERSON } from "../notify.ts"
import { askComposed } from "../page-query-client.ts"
import { writeNotification } from "../push-notification/feed.ts"
import { NOTIFICATION_PAGE_TYPE_SLUG } from "../push-notification/payload.ts"
import { type Readout, readReading, readSleepHours, resolveOneReadout } from "./readout.ts"
import { decideFall, isTierColor, tierAt, TIER_ORDER, type TierColor } from "./tier.ts"

export const WORKER_NAME = "surplus-fall-notifier"

export const LOG = `${WORKER_NAME}:`

export const GROUP_SLUG = "surplus"

export const KIND = "surplus-fall"

export const SOURCE_PREFIX = "surplus-fall/"

export const SAID_AT_ONCE = 50

export const TICK_MS = 300_000

export const TICK_CEILING_MS = 60_000

export function fallBody(label: string, tier: TierColor): string {
  return `${label} has fallen to ${tier}.`
}

export function isWorse(tier: TierColor, than: TierColor): boolean {
  return TIER_ORDER.indexOf(tier) < TIER_ORDER.indexOf(than)
}

// WHAT WAS ALREADY SAID TODAY IS READ OFF WHAT WAS ALREADY SENT. It used to be a second mark,
// `surplus-tier-said`, written onto the day's own page after the notification went out. Two
// writes for one fact is one too many: the second could fail after the first succeeded, and then
// the same fall goes out again five minutes later.
//
// The notification carries the tier in its own `source`, so the feed is the record. Nothing else
// reads `source`, and the tier cannot disagree with what Alan was told, because it is what Alan
// was told.

export function sourceFor(tier: TierColor): string {
  return `${SOURCE_PREFIX}${tier}`
}

export function tierInSource(said: unknown): TierColor | null {
  if (typeof said !== "string" || !said.startsWith(SOURCE_PREFIX)) return null
  const held = said.slice(SOURCE_PREFIX.length)
  return isTierColor(held) ? held : null
}

// The day is matched by running each `sent-at` back through `getEsoDayStr`, the same function the
// tick takes its day from. A window of timestamps would have to know where Alan's day begins, and
// would drift from it the moment that moved.
export async function tierSaidOn(day: string): Promise<TierColor | null> {
  const asked = await askComposed({
    "page-type": NOTIFICATION_PAGE_TYPE_SLUG,
    where: { kind: { is: KIND } },
    keys: ["source", "sent-at"],
    "sort-by": "sent-at",
    descending: true,
    limit: SAID_AT_ONCE,
  })
  if (!asked.ok) {
    throw new Error(
      `tierSaidOn: the feed went unread, so what was already said today is unknown and saying it again would be a guess: ${asked.why}`
    )
  }
  let worst: TierColor | null = null
  for (const row of asked.rows) {
    const sentAt = row.values["sent-at"]
    if (typeof sentAt !== "string") continue
    const at = new Date(sentAt)
    if (Number.isNaN(at.getTime()) || getEsoDayStr(at) !== day) continue
    const tier = tierInSource(row.values.source)
    if (tier === null) continue
    if (worst === null || isWorse(tier, worst)) worst = tier
  }
  return worst
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
    tierOrNull(readout, readReading(day)),
    tierOrNull(readout, readSleepHours(day)),
  ])

  const decision = decideFall(opening, current)
  if (!decision.fell) {
    console.log(`${LOG} ${day}: nothing to say — ${decision.why}`)
    return
  }

  signal.throwIfAborted()
  const said = await tierSaidOn(day)
  if (said !== null && !isWorse(decision.tier, said)) {
    console.log(
      `${LOG} ${day}: ${decision.tier} is no worse than the ${said} already said today; nothing written`
    )
    return
  }

  const written = await writeNotification(
    ALAN_PERSON,
    {
      title: readout.label,
      body: fallBody(readout.label, decision.tier),
      kind: KIND,
      source: sourceFor(decision.tier),
    },
    writer
  )
  if (!written.ok) throw new Error(`${LOG} ${day}: ${written.why}`)

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
