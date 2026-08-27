import { beforeEach, describe, expect, mock, test } from "bun:test"
import * as realReadsModule from "@collections/music/spotify-reads"

const READS = "@collections/music/spotify-reads"

interface Named {
  readonly name: string
}

interface PlayHistory {
  readonly track: Named
  readonly played_at: string
}

interface TopTrack extends Named {
  readonly artists?: readonly Named[]
}

interface CurrentlyPlaying {
  readonly item?: Named | null
  readonly is_playing?: boolean
}

const realReads: Record<string, unknown> = { ...realReadsModule }

let currentlyPlaying: CurrentlyPlaying | null = null
let recentlyPlayed: readonly PlayHistory[] = []
let topArtists: readonly Named[] = []
let topTracks: readonly TopTrack[] = []
let requestedLimit = -1

const reads = {
  ...realReads,
  getCurrentlyPlaying: async (): Promise<CurrentlyPlaying | null> => currentlyPlaying,
  getRecentlyPlayed: async (options: {
    readonly limit: number
  }): Promise<{ readonly items: readonly PlayHistory[] }> => {
    requestedLimit = options.limit
    return { items: recentlyPlayed }
  },
  getTopArtists: async (): Promise<readonly Named[]> => topArtists,
  getTopTracks: async (): Promise<readonly TopTrack[]> => topTracks,
}

mock.module(READS, () => reads)

const musicListening = (await import("../commands/music/listening.ts")).default

type Write = typeof process.stdout.write

async function printed(args: readonly string[]): Promise<string> {
  const chunks: string[] = []
  const original: Write = process.stdout.write.bind(process.stdout)
  process.stdout.write = ((chunk: string | Uint8Array): boolean => {
    chunks.push(typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk))
    return true
  }) as Write
  try {
    await musicListening(args)
  } finally {
    process.stdout.write = original
  }
  return chunks.join("")
}

const NOW_SONG: CurrentlyPlaying = { item: { name: "Now Song" }, is_playing: true }

const PLAYED: readonly PlayHistory[] = [
  { track: { name: "Song A" }, played_at: "2026-06-20T10:00:00Z" },
  { track: { name: "Song B" }, played_at: "2026-06-20T09:00:00Z" },
]

const ARTISTS: readonly Named[] = [{ name: "Artist One" }, { name: "Artist Two" }]

const TRACKS: readonly TopTrack[] = [
  { name: "Top Song", artists: [{ name: "Xavier" }, { name: "Yara" }] },
  { name: "Solo Song" },
]

beforeEach(() => {
  currentlyPlaying = null
  recentlyPlayed = []
  topArtists = []
  topTracks = []
  requestedLimit = -1
})

describe("ops music listening — the affinity window", () => {
  test("no --window reads the medium window", async () => {
    expect(await printed([])).toContain("Top artists (medium_term, 0):")
  })

  test("the short/medium/long aliases each name their own *_term window", async () => {
    expect(await printed(["--window", "short"])).toContain("Top artists (short_term, 0):")
    expect(await printed(["--window", "medium"])).toContain("Top artists (medium_term, 0):")
    expect(await printed(["--window", "long"])).toContain("Top artists (long_term, 0):")
  })

  test("the full *_term form is REFUSED, the flag admitting only the three aliases", async () => {
    await expect(printed(["--window", "long_term"])).rejects.toThrow(
      /expected one of: short, medium, long/
    )
  })

  test("an unknown window is refused rather than silently defaulted", async () => {
    await expect(printed(["--window", "bogus"])).rejects.toThrow(/--window/)
  })
})

describe("ops music listening — what it renders", () => {
  test("currently-playing, recently-played, and both top lists, each numbered in order", async () => {
    currentlyPlaying = NOW_SONG
    recentlyPlayed = PLAYED
    topArtists = ARTISTS
    topTracks = TRACKS
    const out = await printed([])

    expect(out).toContain("Currently playing: Now Song (playing)")
    expect(out).toContain("Recently played (2):")
    expect(out).toContain("1. Song A  · 2026-06-20T10:00:00Z")
    expect(out).toContain("2. Song B  · 2026-06-20T09:00:00Z")
    expect(out).toContain("Top artists (medium_term, 2):")
    expect(out).toContain("1. Artist One")
    expect(out).toContain("Top tracks (medium_term, 2):")
    expect(out).toContain("1. Top Song — Xavier, Yara")
    expect(out).toContain("2. Solo Song")
  })

  test("nothing playing and every list empty still names each section and its zero", async () => {
    const out = await printed(["--window", "short"])
    expect(out).toContain("Currently playing: (nothing)")
    expect(out).toContain("Recently played (0):")
    expect(out).toContain("Top artists (short_term, 0):")
    expect(out).toContain("Top tracks (short_term, 0):")
  })

  test("a held track reads as paused rather than as playing", async () => {
    currentlyPlaying = { ...NOW_SONG, is_playing: false }
    expect(await printed(["--window", "long"])).toContain("Currently playing: Now Song (paused)")
  })

  test("--limit caps every list and is what the recently-played read asks for", async () => {
    recentlyPlayed = PLAYED
    topArtists = ARTISTS
    topTracks = TRACKS
    const out = await printed(["--limit", "1"])
    expect(requestedLimit).toBe(1)
    expect(out).toContain("Recently played (1):")
    expect(out).toContain("Top artists (medium_term, 1):")
    expect(out).not.toContain("Artist Two")
  })

  test("--json carries the window and the rows rather than the rendered text", async () => {
    currentlyPlaying = NOW_SONG
    topArtists = ARTISTS
    const envelope = JSON.parse(await printed(["--json"])) as {
      readonly window: string
      readonly limit: number
      readonly topArtists: readonly Named[]
    }
    expect(envelope.window).toBe("medium_term")
    expect(envelope.limit).toBe(10)
    expect(envelope.topArtists).toEqual([{ name: "Artist One" }, { name: "Artist Two" }])
  })
})
