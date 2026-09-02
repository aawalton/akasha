export const summary = "Correct an existing session in place (title/ratings/timestamps); re-links the day on a start change"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { relationshipsForTitle } from "../../lib/relationship-match.ts"
import { dayById, sessionById } from "../../lib/tracking/day-place.ts"
import {
  echoedDay,
  pagesAccess,
  pagesClient,
  resetTimes,
  sleepTitleWords,
  titleWordMatch,
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
      name: "--id",
      argLabel: "<id>",
      valueShape: "token",
      description: "Session id to amend (required)",
    },
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "prose",
      description: "New descriptive session name",
    },
    { name: "--start", argLabel: "<time>", valueShape: "token", description: "New start instant" },
    { name: "--end", argLabel: "<time>", valueShape: "token", description: "New end instant" },
    {
      name: "--day",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description:
        "Re-anchor the block to an explicitly inferred experienced day (sleep-anchored); precedence over the day derived from `--start`",
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
      description: "Difficulty level 0…5 (half-steps)",
    },
    {
      name: "--relationship",
      aliases: ["--relationships"],
      argLabel: "<id|name>",
      valueShape: "token",
      repeat: true,
      description:
        "Replace the session's relationships with these (id or name); repeatable / comma-separated",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "id",
      required: false,
      aliasOfFlag: "--id",
      description: "Session id to amend",
    },
  ],
  exits: [
    { code: 0, meaning: "session amended" },
    {
      code: 1,
      meaning: "missing id, session not found, no fields given, end before start, or bad input",
    },
  ],
  examples: [
    "ops tracking edit abc12345 --end 13:00",
    'ops tracking edit --id abc12345 --start "2026-06-18 09:15" --title-file ./title.md',
    "ops tracking edit abc12345 --safety 2 --difficulty 2.5",
    'ops tracking edit abc12345 --relationship "Jennifer Walton"',
  ],
}

export default async function trackingEdit(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.string("--id")
  if (id === undefined || id.trim() === "") {
    throw inputError("a session --id is required (from `tracking status --json`)")
  }
  const json = parsed.boolean("--json")
  const now = new Date()

  const titleRaw = parsed.string("--title")
  const startRaw = parsed.string("--start")
  const endRaw = parsed.string("--end")
  const dayRaw = parsed.string("--day")
  const safetyRaw = parsed.string("--safety")
  const difficultyRaw = parsed.string("--difficulty")
  const relationshipOccurrences = parsed.repeated("--relationship")

  const title = titleRaw !== undefined ? titleRaw.trim() : undefined
  if (title !== undefined && title === "") {
    throw inputError("--title cannot be blank")
  }
  const time = await trackingTime()
  const { parseDifficulty, parseSafety } = await trackingLevels()
  const newStart = startRaw !== undefined ? time.parseInstantFlag(startRaw, now) : undefined
  const newEnd = endRaw !== undefined ? time.parseInstantFlag(endRaw, now) : undefined
  const newDay = dayRaw !== undefined ? time.parseDayFlag(dayRaw) : undefined
  const safety = safetyRaw !== undefined ? parseSafety(safetyRaw) : undefined
  const difficulty = difficultyRaw !== undefined ? parseDifficulty(difficultyRaw) : undefined
  const relationshipsGiven = relationshipOccurrences.length > 0

  if (
    title === undefined &&
    newStart === undefined &&
    newEnd === undefined &&
    newDay === undefined &&
    safety === undefined &&
    difficulty === undefined &&
    !relationshipsGiven
  ) {
    throw inputError(
      "nothing to amend — pass at least one of --title / --start / --end / --day / --safety / --difficulty / --relationship"
    )
  }

  const format = await trackingFormat()
  const { titleMatchesAnyWord } = await titleWordMatch()
  const { getMountainEveningDayStr } = await resetTimes()
  const { getPages } = await pagesAccess()
  const { getPageAccessClient } = await pagesClient()
  const { amendSession } = await trackingSessions()
  const { parseRelationshipTokens, resolveRelationshipIds } = await trackingRelationships()
  const { resolveOrCreateDaily } = await trackingResolve()
  const { DAY_TURN_WORDS: dayTurnWords } = await sleepTitleWords()
  const { resolveEchoedDay } = await echoedDay()

  const sb = getPageAccessClient()
  const stated = relationshipsGiven
    ? await resolveRelationshipIds(sb, parseRelationshipTokens(relationshipOccurrences))
    : undefined
  // The id is all this command has, and which day the row is beside is only known once the row is
  // back, so there is no day string to ask `dayPlaceOf` about first. `sessionById` is the funnel's
  // by-id reader, which answers the row wherever it is kept. The query used to be composed here and
  // handed to the page client, which decided that for itself: once the day had moved, the read would
  // answer nothing and the refusal below would say "session not found" about a session that is
  // there — a wrong statement about Alan's day rather than a refusal to state one.
  const session = await sessionById(id.trim())
  if (session == null) {
    throw inputError(`session not found: ${id.trim()}`)
  }

  const currentStartIso = format.fieldStr(session, "startTime")
  const currentEndIso = format.fieldStr(session, "endTime")
  const effectiveStartIso = newStart !== undefined ? newStart.toISOString() : currentStartIso
  const effectiveEndIso = newEnd !== undefined ? newEnd.toISOString() : currentEndIso
  if (
    effectiveStartIso !== undefined &&
    effectiveEndIso !== undefined &&
    Date.parse(effectiveEndIso) < Date.parse(effectiveStartIso)
  ) {
    throw inputError(
      `resulting span is inverted — end (${effectiveEndIso}) is before start (${effectiveStartIso})`
    )
  }

  const set: Record<string, unknown> = {}
  if (title !== undefined) set.title = title
  if (newStart !== undefined) set.startTime = newStart.toISOString()
  if (newEnd !== undefined) set.endTime = newEnd.toISOString()
  if (safety !== undefined) set.safetyLevel = safety
  if (difficulty !== undefined) set.difficultyLevel = difficulty
  const effectiveTitle = title ?? format.displayTitle(session)
  const currentIds = Array.isArray(session.relationships)
    ? session.relationships.filter((r): r is string => typeof r === "string")
    : []
  const relationships =
    relationshipsGiven || title !== undefined
      ? await relationshipsForTitle({
          sb,
          title: effectiveTitle,
          stated: stated ?? currentIds,
          getPages,
        })
      : undefined
  if (relationships !== undefined) set.relationships = relationships
  let relinkedDay: string | undefined
  if (newDay !== undefined) {
    relinkedDay = newDay
  } else if (newEnd !== undefined && titleMatchesAnyWord(effectiveTitle, dayTurnWords)) {
    relinkedDay = getMountainEveningDayStr(newEnd)
  } else if (newStart !== undefined) {
    relinkedDay = time.esoDayOf(newStart)
  }
  if (relinkedDay !== undefined) {
    const daily = await resolveOrCreateDaily(sb, relinkedDay)
    set.dailyTracking = daily.id
  }


  console.error(`Amending "${format.displayTitle(session)}"…`)
  await amendSession(session, set, relinkedDay)

  const finalTitle = title ?? format.displayTitle(session)
  const finalSafety = safety ?? format.fieldStr(session, "safetyLevel")
  const finalDifficulty = difficulty ?? format.fieldStr(session, "difficultyLevel")
  const finalRelationships = relationships ?? currentIds
  const startDerivedDay =
    effectiveStartIso !== undefined ? time.esoDayOf(new Date(effectiveStartIso)) : undefined
  let existingLinkedDay: string | undefined
  if (relinkedDay === undefined) {
    const existingDailyId = format.fieldStr(session, "dailyTracking")
    if (existingDailyId !== undefined) {
      const existingDaily = await dayById(existingDailyId)
      existingLinkedDay = existingDaily != null ? format.fieldStr(existingDaily, "date") : undefined
    }
  }
  const dayStr = resolveEchoedDay({ relinkedDay, existingLinkedDay, startDerivedDay })
  const dur = format.durationSeconds(effectiveStartIso, effectiveEndIso)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: session.id,
        seq: session.seq,
        title: finalTitle,
        startTime: effectiveStartIso ?? null,
        endTime: effectiveEndIso ?? null,
        day: dayStr ?? null,
        durationSeconds: dur ?? null,
        safety: finalSafety ?? null,
        difficulty: finalDifficulty ?? null,
        relationships: finalRelationships,
        relinkedDay: relinkedDay ?? null,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${session.id}\n` +
      `title\t${finalTitle}\n` +
      `start\t${effectiveStartIso ?? "-"}\n` +
      `end\t${effectiveEndIso ?? "-"}\n` +
      `day\t${dayStr ?? "-"}\n` +
      `duration\t${dur !== undefined ? format.fmtDuration(dur) : "-"}\n` +
      `safety\t${finalSafety ?? "-"}\n` +
      `difficulty\t${finalDifficulty ?? "-"}\n` +
      `relationships\t${finalRelationships.length > 0 ? finalRelationships.join(",") : "-"}\n`
  )
}
