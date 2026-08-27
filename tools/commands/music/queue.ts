
export const summary = "Queue N tracks in one call: start the first, server-side enqueue the rest in order"

import * as cliResolve from "@collections/music/cli/resolve"
import * as spotifyPlayer from "@collections/music-spotify/endpoints/player"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--artist",
      argLabel: "<name>",
      valueShape: "token",
      description:
        "Constrain EVERY query resolve to this artist (case-insensitive contains). " +
        "Use only when all tracks are by one artist.",
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
      required: true,
      variadic: true,
      description:
        'One or more track queries, in play order (e.g. "Phoebe Bridgers Motion Sickness" "boygenius Not Strong Enough")',
    },
  ],
  exits: [
    { code: 0, meaning: "playback started and the rest of the set queued" },
    { code: 1, meaning: "input error — no query supplied" },
    { code: 2, meaning: "data error — a query matched no track" },
    { code: 3, meaning: "operational error — no active Spotify device" },
  ],
  examples: [
    'ops music queue "Phoebe Bridgers Motion Sickness" "boygenius Not Strong Enough"',
    'ops music queue "Bulletproof" "Numb Little Bug" --artist "Em Beihold"',
    'ops music queue "Holocene" "Skinny Love" "Re: Stacks" --json',
  ],
}

interface ResolvedTrack {
  readonly name: string | null
  readonly uri: string
  readonly id: string | null
  readonly artists: readonly string[]
}

interface DeviceOption {
  readonly deviceId?: string
}

interface QueueEnvelope {
  readonly queries: readonly string[]
  readonly tracks: readonly ResolvedTrack[]
  readonly deviceId: string | null
}

function buildQueueEnvelope(
  queries: readonly string[],
  tracks: readonly ResolvedTrack[],
  deviceId: string | undefined
): QueueEnvelope {
  return { queries, tracks, deviceId: deviceId ?? null }
}

function trackLabel(track: ResolvedTrack): string {
  const label = track.name ?? track.uri
  const suffix = track.artists.length > 0 ? ` — ${track.artists.join(", ")}` : ""
  return `${label}${suffix}`
}

function formatQueueLines(tracks: readonly ResolvedTrack[]): string {
  const [first, ...rest] = tracks
  if (first === undefined) return ""
  const lines = [`▶ Playing "${trackLabel(first)}"`]
  for (const track of rest) {
    lines.push(`  + queued "${trackLabel(track)}"`)
  }
  return lines.join("\n")
}

export default async function musicQueue(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const queries = parsed.positionals
  const artist = parsed.string("--artist")
  const json = parsed.boolean("--json")

  if (queries.length === 0) {
    throw inputError("supply at least one track query to queue")
  }

  const resolve = cliResolve

  const tracks: ResolvedTrack[] = []
  for (const query of queries) {
    tracks.push(await resolve.resolveQueryToTrack(query, artist))
  }

  const deviceId = await resolve.resolveDeviceId(parsed.string("--device-id"))
  const deviceOption = deviceId !== undefined ? { deviceId } : {}

  const [first, ...rest] = tracks
  if (first === undefined) {
    throw inputError("supply at least one track query to queue")
  }
  const player = spotifyPlayer
  await player.startResumePlayback({ uris: [first.uri], ...deviceOption })
  for (const track of rest) {
    await player.addToQueue(track.uri, deviceOption)
  }

  if (json) {
    process.stdout.write(`${JSON.stringify(buildQueueEnvelope(queries, tracks, deviceId))}\n`)
    return
  }
  process.stdout.write(`${formatQueueLines(tracks)}\n`)
}
