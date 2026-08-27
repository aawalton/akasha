
export const summary = "Print the currently-playing Spotify track and playback state"

import * as spotifyPlayer from "@collections/music-spotify/endpoints/player"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit a JSON envelope instead of human text" }],
  positionals: [],
  exits: [{ code: 0, meaning: "state printed (including the no-active-device state)" }],
  examples: ["ops music now-playing", "ops music now-playing --json"],
}

interface PlayerItem {
  readonly name: string
  readonly uri: string
  readonly id: string | null
  readonly duration_ms?: number | null
}

interface PlaybackState {
  readonly is_playing: boolean
  readonly device: { readonly name: string }
  readonly progress_ms: number | null
  readonly item?: PlayerItem | null
}

interface CurrentlyPlaying {
  readonly item?: PlayerItem | null
  readonly progress_ms?: number | null
}

interface NowPlayingTrack {
  readonly name: string
  readonly uri: string
  readonly id: string | null
  readonly duration_ms: number | null
}

type NowPlayingEnvelope =
  | { readonly activeDevice: false; readonly track: null }
  | {
      readonly activeDevice: true
      readonly isPlaying: boolean
      readonly device: string
      readonly progress_ms: number | null
      readonly track: NowPlayingTrack | null
    }

function buildNowPlayingEnvelope(
  state: PlaybackState | null,
  current: CurrentlyPlaying | null
): NowPlayingEnvelope {
  if (state === null) {
    return { activeDevice: false, track: null }
  }
  const item = current?.item ?? state.item
  const track: NowPlayingTrack | null =
    item === null || item === undefined
      ? null
      : { name: item.name, uri: item.uri, id: item.id, duration_ms: item.duration_ms ?? null }
  return {
    activeDevice: true,
    isPlaying: state.is_playing,
    device: state.device.name,
    progress_ms: current?.progress_ms ?? state.progress_ms,
    track,
  }
}

export default async function musicNowPlaying(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const player = spotifyPlayer
  const [state, current] = await Promise.all([
    player.getPlaybackState(),
    player.getCurrentlyPlaying(),
  ])
  const envelope = buildNowPlayingEnvelope(state, current)

  if (json) {
    process.stdout.write(`${JSON.stringify(envelope)}\n`)
    return
  }

  if (!envelope.activeDevice) {
    process.stdout.write("No active Spotify device\n")
    return
  }

  const mark = envelope.isPlaying ? "▶" : "⏸"
  const name = envelope.track?.name ?? "(nothing)"
  process.stdout.write(`${mark} ${name} · ${envelope.device}\n`)
}
