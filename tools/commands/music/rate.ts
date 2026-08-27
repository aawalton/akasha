export const summary = "Record Alan's rating + reaction/insights onto an artist/song page"

import * as eppieSelect from "@collections/music/eppie/select"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { deriver } from "../../lib/page-derive.ts"
import { patchPage } from "../../lib/page-write.ts"
import { type Value } from "../../lib/page-write-values.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const ARTIST = "artist"

const SONG = "music-song"

const BY = "ops music rate"

export const help: CommandHelp = {
  flags: [
    {
      name: "--target",
      argLabel: "<artist|song>",
      valueShape: "token",
      choices: ["artist", "song"],
      description: "Which page type to record onto",
    },
    {
      name: "--id",
      argLabel: "<pageId>",
      valueShape: "token",
      description: "The artist/song page id to record onto",
    },
    {
      name: "--rating",
      argLabel: "<F..S+ e.g. A, A+, B->",
      valueShape: "token",
      choices: [
        "F",
        "D-",
        "D",
        "D+",
        "C-",
        "C",
        "C+",
        "B-",
        "B",
        "B+",
        "A-",
        "A",
        "A+",
        "S-",
        "S",
        "S+",
      ],
      description: "The 16-grade F→S +/- rating (worst→best)",
    },
    {
      name: "--reaction",
      argLabel: "<md>",
      valueShape: "prose",
      description: "Artist-level reaction (--target artist)",
    },
    {
      name: "--personal-connections",
      argLabel: "<md>",
      valueShape: "prose",
      description: "Song personal/emotional connections (--target song)",
    },
    {
      name: "--insights",
      argLabel: "<md>",
      valueShape: "prose",
      description: "Song insights (--target song)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of human text" },
  ],
  positionals: [],
  exits: [
    { code: 0, meaning: "recorded" },
    { code: 1, meaning: "input error — bad target/fields, or nothing to record" },
    { code: 2, meaning: "data error — no page matched the id" },
  ],
  examples: [
    "ops music rate --target song --id <songId> --rating S --insights-file ./insights.md",
    "ops music rate --target artist --id <artistId> --rating A --reaction-file ./reaction.md",
  ],
}

function namedById(pageType: string, id: string): string | null {
  const rows = deriver(resolveRoots()).rows(pageType)
  if (rows === null) return null
  for (const row of rows) {
    if (row.values.id !== id) continue
    const slug = row.values.slug
    if (typeof slug === "string" && slug !== "") return slug
  }
  return null
}

async function record(
  pageType: string,
  id: string,
  values: Readonly<Record<string, Value>>
): Promise<void> {
  const name = namedById(pageType, id)
  if (name === null) throw dataError(`no ${pageType} page with id ${id}`)
  const landed = patchPage(resolveRoots(), pageType, name, values, BY)
  if (landed === null) throw dataError(`no ${pageType} page stands at ${name}`)
  if (landed.commitError !== null) {
    throw dataError(`${landed.relPath} was written but its commit did not land: ${landed.commitError}`)
  }
}

async function resolveRating(
  raw: string | undefined,
  ratings: readonly string[]
): Promise<string | undefined> {
  if (raw === undefined || raw === "") return undefined
  const match = ratings.find((r) => r === raw)
  if (match === undefined) {
    throw inputError(`unknown --rating "${raw}" (expected one of: ${ratings.join(", ")})`)
  }
  return match
}

export default async function musicRate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const target = parsed.requireString("--target")
  const id = parsed.requireString("--id")
  const select = eppieSelect
  const rating = await resolveRating(parsed.string("--rating"), select.MUSIC_RATINGS)
  const reaction = parsed.string("--reaction")
  const personalConnections = parsed.string("--personal-connections")
  const insights = parsed.string("--insights")
  const json = parsed.boolean("--json")

  if (target === "artist") {
    if (personalConnections !== undefined || insights !== undefined) {
      throw inputError("--personal-connections/--insights apply to --target song, not artist")
    }
    if (rating === undefined && reaction === undefined) {
      throw inputError("nothing to record — supply --rating and/or --reaction")
    }
    await record(ARTIST, id, {
      ...(rating !== undefined && { rating }),
      ...(reaction !== undefined && { reaction }),
    })
  } else {
    if (reaction !== undefined) {
      throw inputError("--reaction applies to --target artist, not song")
    }
    if (rating === undefined && personalConnections === undefined && insights === undefined) {
      throw inputError(
        "nothing to record — supply --rating, --personal-connections, and/or --insights"
      )
    }
    await record(SONG, id, {
      ...(rating !== undefined && { rating }),
      ...(personalConnections !== undefined && { "personal-connections": personalConnections }),
      ...(insights !== undefined && { insights }),
    })
  }

  process.stdout.write(
    json
      ? `${JSON.stringify({ target, id, rating: rating ?? null })}\n`
      : `Recorded ${target} ${id}\n`
  )
}
