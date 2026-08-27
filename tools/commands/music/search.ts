
export const summary = "Search Spotify for tracks (pure read — no playback); print artist + URI candidates"

import * as trackCandidate from "@collections/music/cli/track-candidate"
import * as spotifySearch from "@collections/music-spotify/endpoints/search"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--artist",
      argLabel: "<name>",
      valueShape: "token",
      description: "Keep only candidates by this artist (case-insensitive contains)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      aliases: ["--top"],
      description: "Max candidates to return (default 5)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of human text" },
  ],
  positionals: [
    {
      name: "query",
      required: true,
      description: 'Track query to search for (e.g. "Bulletproof")',
    },
  ],
  exits: [
    { code: 0, meaning: "search completed (zero or more candidates)" },
    { code: 1, meaning: "input error — missing query" },
  ],
  examples: [
    'ops music search "Motion Sickness" --json',
    'ops music search "Bulletproof" --artist "Em Beihold"',
    'ops music search "boygenius Not Strong Enough" --limit 10 --json',
  ],
}

const DEFAULT_LIMIT = 5
const MAX_FETCH = 10

type SearchItem = unknown

interface TrackCandidate {
  readonly trackName: string
  readonly artists: readonly string[]
  readonly album: string | null
  readonly uri: string
}

interface SearchEnvelope {
  readonly query: string
  readonly artist: string | null
  readonly candidates: readonly TrackCandidate[]
}

function buildSearchEnvelope(
  query: string,
  artist: string | undefined,
  candidates: readonly TrackCandidate[]
): SearchEnvelope {
  return { query, artist: artist ?? null, candidates }
}

function formatSearchHuman(envelope: SearchEnvelope): string {
  const { query, artist, candidates } = envelope
  const scope = artist !== null ? ` (artist: ${artist})` : ""
  const header = `Search "${query}"${scope} — ${candidates.length} candidate(s):`
  if (candidates.length === 0) return `${header}\n  (none)`
  const lines = candidates.map((c, i) => {
    const artistList = c.artists.length > 0 ? c.artists.join(", ") : "(unknown artist)"
    const album = c.album !== null ? ` · ${c.album}` : ""
    return `  ${i + 1}. ${c.trackName} — ${artistList}${album}\n     ${c.uri}`
  })
  return `${header}\n${lines.join("\n")}`
}

export default async function musicSearch(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const query = parsed.positionals[0]

  if (query === undefined || query === "") {
    throw inputError("supply a track query to search for")
  }
  const json = parsed.boolean("--json")
  const artist = parsed.string("--artist")
  const limit = parsed.nonNegativeInt("--limit") ?? DEFAULT_LIMIT
  const fetchLimit = artist !== undefined && artist !== "" ? MAX_FETCH : Math.min(limit, MAX_FETCH)

  const searchModule = spotifySearch
  const candidatesModule = trackCandidate

  const result = await searchModule.search({ q: query, types: ["track"], limit: fetchLimit })
  const candidates = candidatesModule.selectCandidates(result.tracks?.items ?? [], artist, limit)
  const envelope = buildSearchEnvelope(query, artist, candidates)

  if (json) {
    process.stdout.write(`${JSON.stringify(envelope)}\n`)
    return
  }
  process.stdout.write(`${formatSearchHuman(envelope)}\n`)
}
