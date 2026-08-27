
export const summary = "Print Alan's personal Spotify listening (recently-played + top items)"

import * as spotifyReads from "@collections/music/spotify-reads"
import type { TimeRange } from "@collections/music/spotify-reads"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--window",
      argLabel: "<short|medium|long>",
      valueShape: "token",
      choices: ["short", "medium", "long"],
      description: "Affinity window for the top lists (default medium)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      description: "Cap rows shown per list (default 10)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of human text" },
  ],
  positionals: [],
  exits: [
    { code: 0, meaning: "listening printed" },
    { code: 1, meaning: "input error — unknown --window value" },
  ],
  examples: [
    "ops music listening",
    "ops music listening --window short --limit 20",
    "ops music listening --json",
  ],
}

const DEFAULT_LIMIT = 10
const MAX_RECENTLY_PLAYED = 50

interface CurrentlyPlaying {
  readonly item?: { readonly name: string } | null
  readonly is_playing?: boolean
}

interface PlayHistory {
  readonly track: { readonly name: string }
  readonly played_at: string
}

interface TopArtist {
  readonly name: string
}

interface TopTrack {
  readonly name: string
  readonly artists?: readonly { readonly name: string }[]
}

interface ListeningData {
  readonly window: TimeRange
  readonly limit: number
  readonly currentlyPlaying: CurrentlyPlaying | null
  readonly recentlyPlayed: readonly PlayHistory[]
  readonly topArtists: readonly TopArtist[]
  readonly topTracks: readonly TopTrack[]
}

function resolveWindow(raw: string | undefined, ranges: readonly TimeRange[]): TimeRange | null {
  if (raw === undefined || raw === "") return "medium_term"
  const normalized = raw.endsWith("_term") ? raw : `${raw}_term`
  return ranges.find((w) => w === normalized) ?? null
}

function joinArtists(artists: readonly { readonly name: string }[] | undefined): string {
  if (artists === undefined || artists.length === 0) return ""
  return artists.map((a) => a.name).join(", ")
}

function formatListening(data: ListeningData): string {
  const lines: string[] = []

  const npName = data.currentlyPlaying?.item?.name
  if (npName === undefined) {
    lines.push("Currently playing: (nothing)")
  } else {
    const state = data.currentlyPlaying?.is_playing === true ? "playing" : "paused"
    lines.push(`Currently playing: ${npName} (${state})`)
  }

  lines.push("", `Recently played (${data.recentlyPlayed.length}):`)
  for (const [i, h] of data.recentlyPlayed.entries()) {
    lines.push(`  ${i + 1}. ${h.track.name}  · ${h.played_at}`)
  }

  lines.push("", `Top artists (${data.window}, ${data.topArtists.length}):`)
  for (const [i, a] of data.topArtists.entries()) {
    lines.push(`  ${i + 1}. ${a.name}`)
  }

  lines.push("", `Top tracks (${data.window}, ${data.topTracks.length}):`)
  for (const [i, t] of data.topTracks.entries()) {
    const by = joinArtists(t.artists)
    lines.push(by === "" ? `  ${i + 1}. ${t.name}` : `  ${i + 1}. ${t.name} — ${by}`)
  }

  return lines.join("\n")
}

export default async function musicListening(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const reads = spotifyReads

  const raw = parsed.string("--window")
  const window = resolveWindow(raw, reads.TIME_RANGES)
  if (window === null) {
    throw inputError(`unknown --window "${raw}" (expected one of: short, medium, long)`)
  }
  const limitRaw = parsed.nonNegativeInt("--limit")
  const limit = limitRaw === undefined || limitRaw === 0 ? DEFAULT_LIMIT : limitRaw
  const json = parsed.boolean("--json")

  const [currentlyPlaying, recentlyPage, topArtists, topTracks] = await Promise.all([
    reads.getCurrentlyPlaying(),
    reads.getRecentlyPlayed({ limit: Math.min(limit, MAX_RECENTLY_PLAYED) }),
    reads.getTopArtists(window),
    reads.getTopTracks(window),
  ])

  const data: ListeningData = {
    window,
    limit,
    currentlyPlaying,
    recentlyPlayed: recentlyPage.items.slice(0, limit),
    topArtists: topArtists.slice(0, limit),
    topTracks: topTracks.slice(0, limit),
  }

  process.stdout.write(json ? `${JSON.stringify(data)}\n` : `${formatListening(data)}\n`)
}
