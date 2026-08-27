export const summary = "Live safety change: split the open session at the instant, cloning title/difficulty/relationships with a new safety level"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  pagesClient,
  safetySplit,
  sleepTitleWords,
  trackingDayAttribution,
  trackingLevels,
  trackingResolve,
  trackingSessions,
  trackingTime,
} from "../../lib/tracking-capability.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--level",
      argLabel: "<level>",
      valueShape: "token",
      description: "New safety level −2…5 (half-steps) for the continued session (required)",
    },
    {
      name: "--at",
      argLabel: "<time>",
      valueShape: "token",
      description:
        "Split instant — HH:MM / 'YYYY-MM-DD HH:MM' (Mountain local) / ISO (default now)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "level",
      required: false,
      aliasOfFlag: "--level",
      description: "New safety level −2…5 (half-steps)",
    },
  ],
  exits: [
    { code: 0, meaning: "open session split and continued at the new safety" },
    { code: 1, meaning: "missing/invalid level, no open session, or bad input" },
  ],
  examples: [
    "ops tracking safety 1",
    "ops tracking safety 2.5",
    "ops tracking safety 0 --at 14:30",
  ],
}

export default async function trackingSafety(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const levelRaw = parsed.string("--level")
  if (levelRaw === undefined || levelRaw.trim() === "") {
    throw inputError("a new safety <level> is required (e.g. `ops tracking safety 1`)")
  }
  const { parseSafety } = await trackingLevels()
  const safety = parseSafety(levelRaw)
  const json = parsed.boolean("--json")
  const now = new Date()
  const atRaw = parsed.string("--at")
  const time = await trackingTime()
  const instant = atRaw !== undefined ? time.parseInstantFlag(atRaw, now) : now

  const { getPageAccessClient } = await pagesClient()
  const { blockDay, findOpenSession } = await trackingResolve()
  const { resolveAttributedDay } = await trackingDayAttribution()
  const { closeSession, createSession } = await trackingSessions()
  const { DAY_TURN_WORDS: dayTurnWords } = await sleepTitleWords()
  const { planSafetySplit } = await safetySplit()

  const sb = getPageAccessClient()
  const open = await findOpenSession(sb)
  if (open === null) {
    throw inputError('no open session — start one with `ops tracking start "<title>"`')
  }
  const plan = planSafetySplit(open, safety, instant)
  console.error(`Splitting "${plan.next.title}" at safety ${safety}…`)
  const finalizedDay = await closeSession(sb, open, plan.closeAt, dayTurnWords)
  const attributedDay = resolveAttributedDay({
    explicitDay: undefined,
    title: plan.next.title,
    finishInstant: undefined,
    previousBlockDay: finalizedDay ?? (await blockDay(sb, open)),
    startInstant: plan.next.startInstant,
    dayTurnWords,
  })
  const created = await createSession(sb, { ...plan.next, attributedDay })

  const { title, difficulty, relationships } = plan.next
  const rels = relationships ?? []
  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        closed: { id: open.id, title },
        opened: {
          id: created.id,
          seq: created.seq,
          title,
          startTime: instant.toISOString(),
          day: created.dayStr,
          safety,
          difficulty: difficulty ?? null,
          relationships: rels,
        },
        at: instant.toISOString(),
      })}\n`
    )
    return
  }
  process.stdout.write(
    `closed\t${open.id}\t${title}\n` +
      `opened\t${created.id}\t${title}\n` +
      `at\t${instant.toISOString()}\n` +
      `day\t${created.dayStr}\n` +
      `safety\t${safety}\n` +
      `difficulty\t${difficulty ?? "-"}\n` +
      `relationships\t${rels.length > 0 ? rels.join(",") : "-"}\n`
  )
}
