
export const summary = "Play a track by query (top hit) or --uri (exact verified track)"

import * as trackResolving from "@akasha/music-choosing/track-resolving"
import * as spotifyPlayer from "@akasha/spotify/player"
import * as spotifyTracks from "@akasha/spotify/tracks"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--uri",
      argLabel: "<spotify:track:...>",
      valueShape: "token",
      description: "Play this exact track URI verbatim (no search). Omit the query when used.",
    },
    {
      name: "--artist",
      argLabel: "<name>",
      valueShape: "token",
      description: "Constrain the query resolve to this artist (case-insensitive contains)",
    },
    {
      name: "--device-id",
      argLabel: "<id>",
      valueShape: "token",
      description: "Target Spotify device id (default: the active device)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of human text" },
  ],
  positionals: [
    {
      name: "query",
      required: false,
      description: 'Track query to search for (e.g. "Phoebe Bridgers Motion Sickness")',
    },
  ],
  mutuallyExclusive: [["--uri", "--artist"]],
  exits: [
    { code: 0, meaning: "playback started" },
    { code: 1, meaning: "input error — missing query (and no --uri), or query given with --uri" },
    { code: 2, meaning: "data error — no track matched the query" },
    { code: 3, meaning: "operational error — no active Spotify device" },
  ],
  examples: [
    'ops music play "Phoebe Bridgers Motion Sickness"',
    'ops music play "Bulletproof" --artist "Em Beihold" --json',
    "ops music play --uri spotify:track:6gv6gQACUu1pZSU3Dq2qIN",
  ],
}

interface ResolvedTrack {
  readonly name: string | null
  readonly uri: string
  readonly id: string | null
  readonly artists: readonly string[]
}

type TrackDetail = unknown

interface StartResumeOptions {
  readonly uris: readonly string[]
  readonly deviceId?: string
}

interface PlayEnvelope {
  readonly query: string | null
  readonly track: ResolvedTrack
  readonly deviceId: string | null
}

function buildStartResumeOptions(uri: string, deviceId: string | undefined): StartResumeOptions {
  return { uris: [uri], ...(deviceId !== undefined && { deviceId }) }
}

function buildPlayEnvelope(
  query: string | null,
  track: ResolvedTrack,
  deviceId: string | undefined
): PlayEnvelope {
  return { query, track, deviceId: deviceId ?? null }
}

function formatPlayLine(track: ResolvedTrack): string {
  const label = track.name ?? track.uri
  const suffix = track.artists.length > 0 ? ` — ${track.artists.join(", ")}` : ""
  return `▶ Playing "${label}"${suffix}`
}

export default async function musicPlay(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const query = parsed.positionals[0]
  const uri = parsed.string("--uri")
  const artist = parsed.string("--artist")
  const json = parsed.boolean("--json")

  const resolve = trackResolving

  let resolvedQuery: string | null
  let track: ResolvedTrack
  if (uri !== undefined && uri !== "") {
    if (query !== undefined && query !== "") {
      throw inputError("--uri plays an exact track; do not also pass a query")
    }
    resolvedQuery = null
    const trackId = resolve.parseTrackId(uri)
    if (trackId !== null) {
      const tracks = spotifyTracks
      track = resolve.trackToResolved(uri, await tracks.getTrack(trackId))
    } else {
      track = { name: null, uri, id: null, artists: [] }
    }
  } else {
    if (query === undefined || query === "") {
      throw inputError("supply a track query to play, or --uri to play an exact track")
    }
    resolvedQuery = query
    track = await resolve.resolveQueryToTrack(query, artist)
  }

  const deviceId = await resolve.resolveDeviceId(parsed.string("--device-id"))
  const player = spotifyPlayer
  await player.startResumePlayback(buildStartResumeOptions(track.uri, deviceId))

  if (json) {
    process.stdout.write(`${JSON.stringify(buildPlayEnvelope(resolvedQuery, track, deviceId))}\n`)
    return
  }
  process.stdout.write(`${formatPlayLine(track)}\n`)
}
