export const summary = "Open a live session with a descriptive title (refuses if one is already open)"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { relationshipsForTitle } from "../../lib/relationship-match.ts"
import {
  pagesAccess,
  pagesClient,
  sleepTitleWords,
  trackingDayAttribution,
  trackingFormat,
  trackingLevels,
  trackingRelationships,
  trackingResolve,
  trackingSessions,
  trackingTime,
} from "../../lib/tracking-capability.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Descriptive session name (required)",
    },
    {
      name: "--safety",
      argLabel: "<level>",
      valueShape: "token",
      description: "Safety level −2…5 (half-steps)",
    },
    {
      name: "--difficulty",
      argLabel: "<level>",
      valueShape: "token",
      description:
        "Difficulty level 0…5 (half-steps); required when no `session-activity` matches the title",
    },
    {
      name: "--relationship",
      aliases: ["--relationships"],
      argLabel: "<id|name>",
      valueShape: "token",
      repeat: true,
      description: "Tag with a relationship (id or name); repeatable / comma-separated",
    },
    {
      name: "--at",
      argLabel: "<time>",
      valueShape: "token",
      description:
        "Start instant — HH:MM / 'YYYY-MM-DD HH:MM' (Mountain local) / ISO (default now)",
    },
    {
      name: "--day",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description:
        "Experienced day to attach the session to (sleep-anchored); overrides the start-instant ESO default",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "title",
      required: false,
      aliasOfFlag: "--title",
      description: "Descriptive session name",
    },
  ],
  exits: [
    { code: 0, meaning: "session opened" },
    {
      code: 1,
      meaning:
        "missing title, a session already open, no --difficulty and no `session-activity` matching the title, or bad input",
    },
  ],
  examples: [
    'ops tracking start "Deep work — pages refactor" --safety 2 --difficulty 2',
    'ops tracking start "Lunch"',
    'ops tracking start "Morning email" --at 09:00',
    'ops tracking start "Call with Jen" --relationship "Jennifer Walton"',
  ],
}

export default async function trackingStart(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const title = parsed.string("--title")
  if (title === undefined || title.trim() === "") {
    throw inputError(
      'a descriptive --title is required (e.g. `ops tracking start "Deep work — X"`)'
    )
  }
  const json = parsed.boolean("--json")
  const now = new Date()
  const atRaw = parsed.string("--at")
  const time = await trackingTime()
  const startInstant = atRaw !== undefined ? time.parseInstantFlag(atRaw, now) : now
  const safetyRaw = parsed.string("--safety")
  const difficultyRaw = parsed.string("--difficulty")
  const dayRaw = parsed.string("--day")
  const explicitDay = dayRaw !== undefined ? time.parseDayFlag(dayRaw) : undefined
  const { parseRelationshipTokens, resolveRelationshipIds } = await trackingRelationships()
  const relationshipTokens = parseRelationshipTokens(parsed.repeated("--relationship"))

  const { getPageAccessClient } = await pagesClient()
  const { blockDay, findOpenSession, findPriorClosedSession, listSessionActivities } =
    await trackingResolve()
  const format = await trackingFormat()
  const { resolveCarriedSafety, resolveDifficulty } = await trackingLevels()
  const { resolveAttributedDay } = await trackingDayAttribution()
  const { createSession } = await trackingSessions()
  const { DAY_TURN_WORDS: dayTurnWords } = await sleepTitleWords()

  const sb = getPageAccessClient()
  const alreadyOpen = await findOpenSession(sb)
  if (alreadyOpen !== null) {
    throw inputError(
      `a session is already open: "${format.displayTitle(alreadyOpen)}" — ` +
        "close it with `ops tracking close`, or transition with `ops tracking switch`"
    )
  }
  const activities = await listSessionActivities(sb)
  const difficulty = resolveDifficulty(difficultyRaw, title, activities)
  const prior = await findPriorClosedSession(sb, startInstant)
  const safety = resolveCarriedSafety(prior, safetyRaw)
  const attributedDay = resolveAttributedDay({
    explicitDay,
    title,
    finishInstant: undefined,
    previousBlockDay: await blockDay(sb, prior),
    startInstant,
    dayTurnWords,
  })
  const { getPages } = await pagesAccess()
  const stated = await resolveRelationshipIds(sb, relationshipTokens)
  const relationships = await relationshipsForTitle({ sb, title, stated, getPages })
  console.error(`Starting "${title}"…`)
  const created = await createSession(sb, {
    title,
    startInstant,
    safety,
    difficulty,
    relationships,
    attributedDay,
  })

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: created.id,
        seq: created.seq,
        title,
        startTime: startInstant.toISOString(),
        day: created.dayStr,
        safety: safety ?? null,
        difficulty,
        relationships,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${created.id}\n` +
      `title\t${title}\n` +
      `start\t${startInstant.toISOString()}\n` +
      `day\t${created.dayStr}\n` +
      `safety\t${safety ?? "-"}\n` +
      `difficulty\t${difficulty}\n` +
      `relationships\t${relationships.length > 0 ? relationships.join(",") : "-"}\n`
  )
}
