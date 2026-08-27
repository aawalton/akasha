export const summary = "Live transition: close the open session and open the next in one step"

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
      description: "Descriptive name for the next session (required)",
    },
    {
      name: "--safety",
      argLabel: "<level>",
      valueShape: "token",
      description: "Safety level −2…5 (half-steps); defaults to the just-closed block's safety",
    },
    {
      name: "--difficulty",
      argLabel: "<level>",
      valueShape: "token",
      description:
        "Difficulty level 0…5 (half-steps) for the next session; required when no `session-activity` matches the title",
    },
    {
      name: "--relationship",
      aliases: ["--relationships"],
      argLabel: "<id|name>",
      valueShape: "token",
      repeat: true,
      description:
        "Tag the next session with a relationship (id or name); repeatable / comma-separated",
    },
    {
      name: "--at",
      argLabel: "<time>",
      valueShape: "token",
      description:
        "Transition instant — HH:MM / 'YYYY-MM-DD HH:MM' (Mountain local) / ISO (default now)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "title",
      required: false,
      aliasOfFlag: "--title",
      description: "Descriptive name for the next session",
    },
  ],
  exits: [
    { code: 0, meaning: "previous session closed and next opened" },
    {
      code: 1,
      meaning:
        "missing title, no open session, no --difficulty and no `session-activity` matching the title, or bad input",
    },
  ],
  examples: [
    'ops tracking switch "Lunch"',
    'ops tracking switch "Deep work — review" --safety 2 --difficulty 2',
    'ops tracking switch "Standup" --at 11:00',
    'ops tracking switch "Call with Jen" --relationship "Jennifer Walton"',
  ],
}

export default async function trackingSwitch(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const title = parsed.string("--title")
  if (title === undefined || title.trim() === "") {
    throw inputError("a descriptive --title for the next session is required")
  }
  const json = parsed.boolean("--json")
  const now = new Date()
  const atRaw = parsed.string("--at")
  const time = await trackingTime()
  const instant = atRaw !== undefined ? time.parseInstantFlag(atRaw, now) : now
  const safetyRaw = parsed.string("--safety")
  const difficultyRaw = parsed.string("--difficulty")
  const { parseRelationshipTokens, resolveRelationshipIds } = await trackingRelationships()
  const relationshipTokens = parseRelationshipTokens(parsed.repeated("--relationship"))

  const format = await trackingFormat()
  const { getPageAccessClient } = await pagesClient()
  const { blockDay, findOpenSession, listSessionActivities } = await trackingResolve()
  const { resolveCarriedSafety, resolveDifficulty } = await trackingLevels()
  const { resolveAttributedDay } = await trackingDayAttribution()
  const { closeSession, createSession } = await trackingSessions()
  const { DAY_TURN_WORDS: dayTurnWords } = await sleepTitleWords()

  const sb = getPageAccessClient()
  const open = await findOpenSession(sb)
  if (open === null) {
    throw inputError('no open session — start one with `ops tracking start "<title>"`')
  }
  const safety = resolveCarriedSafety(open, safetyRaw)
  const activities = await listSessionActivities(sb)
  const difficulty = resolveDifficulty(difficultyRaw, title, activities)
  const { getPages } = await pagesAccess()
  const stated = await resolveRelationshipIds(sb, relationshipTokens)
  const relationships = await relationshipsForTitle({ sb, title, stated, getPages })
  console.error(`Closing "${format.displayTitle(open)}" and opening "${title}"…`)
  const finalizedDay = await closeSession(sb, open, instant, dayTurnWords)
  const attributedDay = resolveAttributedDay({
    explicitDay: undefined,
    title,
    finishInstant: undefined,
    previousBlockDay: finalizedDay ?? (await blockDay(sb, open)),
    startInstant: instant,
    dayTurnWords,
  })
  const created = await createSession(sb, {
    title,
    startInstant: instant,
    safety,
    difficulty,
    relationships,
    attributedDay,
  })

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        closed: { id: open.id, title: format.displayTitle(open) },
        opened: {
          id: created.id,
          seq: created.seq,
          title,
          startTime: instant.toISOString(),
          day: created.dayStr,
          safety: safety ?? null,
          difficulty,
          relationships,
        },
        at: instant.toISOString(),
      })}\n`
    )
    return
  }
  process.stdout.write(
    `closed\t${open.id}\t${format.displayTitle(open)}\n` +
      `opened\t${created.id}\t${title}\n` +
      `at\t${instant.toISOString()}\n` +
      `day\t${created.dayStr}\n` +
      `safety\t${safety ?? "-"}\n` +
      `difficulty\t${difficulty}\n` +
      `relationships\t${relationships.length > 0 ? relationships.join(",") : "-"}\n`
  )
}
