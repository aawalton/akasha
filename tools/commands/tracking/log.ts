export const summary = "Retrospective: create a closed session with explicit start and end"

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
      name: "--start",
      argLabel: "<time>",
      valueShape: "token",
      description: "Start instant (required)",
    },
    {
      name: "--end",
      argLabel: "<time>",
      valueShape: "token",
      description: "End instant (required)",
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
    { code: 0, meaning: "session logged" },
    {
      code: 1,
      meaning:
        "missing title/start/end, end before start, no --difficulty and no `session-activity` matching the title, or bad input",
    },
  ],
  examples: [
    'ops tracking log "Morning email" --start 09:00 --end 10:30 --safety 2 --difficulty 2',
    'ops tracking log "Standup" --start "2026-06-18 11:00" --end "2026-06-18 11:30"',
    'ops tracking log "Dinner + Jen" --start 18:00 --end 19:30 --relationship "Jennifer Walton"',
  ],
}

export default async function trackingLog(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const title = parsed.string("--title")
  if (title === undefined || title.trim() === "") {
    throw inputError("a descriptive --title is required")
  }
  const startRaw = parsed.string("--start")
  const endRaw = parsed.string("--end")
  if (startRaw === undefined || endRaw === undefined) {
    throw inputError("both --start and --end are required for a retrospective entry")
  }
  const json = parsed.boolean("--json")
  const now = new Date()
  const time = await trackingTime()
  const startInstant = time.parseInstantFlag(startRaw, now)
  const endInstant = time.parseInstantFlag(endRaw, now)
  if (endInstant.getTime() < startInstant.getTime()) {
    throw inputError(
      `--end (${endInstant.toISOString()}) is before --start (${startInstant.toISOString()})`
    )
  }
  const safetyRaw = parsed.string("--safety")
  const difficultyRaw = parsed.string("--difficulty")
  const dayRaw = parsed.string("--day")
  const explicitDay = dayRaw !== undefined ? time.parseDayFlag(dayRaw) : undefined
  const { parseRelationshipTokens, resolveRelationshipIds } = await trackingRelationships()
  const relationshipTokens = parseRelationshipTokens(parsed.repeated("--relationship"))

  const format = await trackingFormat()
  const { getPageAccessClient } = await pagesClient()
  const { blockDay, findPriorClosedSession, listSessionActivities } = await trackingResolve()
  const { resolveCarriedSafety, resolveDifficulty } = await trackingLevels()
  const { resolveAttributedDay } = await trackingDayAttribution()
  const { createSession } = await trackingSessions()
  const { DAY_TURN_WORDS: dayTurnWords } = await sleepTitleWords()

  const sb = getPageAccessClient()
  const activities = await listSessionActivities(sb)
  const difficulty = resolveDifficulty(difficultyRaw, title, activities)
  const prior = await findPriorClosedSession(sb, startInstant)
  const safety = resolveCarriedSafety(prior, safetyRaw)
  const attributedDay = resolveAttributedDay({
    explicitDay,
    title,
    finishInstant: endInstant,
    previousBlockDay: await blockDay(sb, prior),
    startInstant,
    dayTurnWords,
  })
  const { getPages } = await pagesAccess()
  const stated = await resolveRelationshipIds(sb, relationshipTokens)
  const relationships = await relationshipsForTitle({ sb, title, stated, getPages })
  console.error(`Logging "${title}"…`)
  const created = await createSession(sb, {
    title,
    startInstant,
    endInstant,
    safety,
    difficulty,
    relationships,
    attributedDay,
  })
  const dur = format.durationSeconds(startInstant.toISOString(), endInstant.toISOString())

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: created.id,
        seq: created.seq,
        title,
        startTime: startInstant.toISOString(),
        endTime: endInstant.toISOString(),
        day: created.dayStr,
        durationSeconds: dur ?? null,
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
      `end\t${endInstant.toISOString()}\n` +
      `day\t${created.dayStr}\n` +
      `duration\t${dur !== undefined ? format.fmtDuration(dur) : "-"}\n` +
      `safety\t${safety ?? "-"}\n` +
      `difficulty\t${difficulty}\n` +
      `relationships\t${relationships.length > 0 ? relationships.join(",") : "-"}\n`
  )
}
