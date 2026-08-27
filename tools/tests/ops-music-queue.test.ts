import { beforeEach, describe, expect, mock, test } from "bun:test"

const PLAYER = "@collections/music-spotify/endpoints/player"
const RESOLVE = "@collections/music/cli/resolve"

interface ResolvedTrack {
  readonly name: string | null
  readonly uri: string
  readonly id: string | null
  readonly artists: readonly string[]
}

const MOTION: ResolvedTrack = {
  name: "Motion Sickness",
  uri: "spotify:track:1",
  id: "1",
  artists: ["Phoebe Bridgers"],
}

const NOT_STRONG: ResolvedTrack = {
  name: "Not Strong Enough",
  uri: "spotify:track:2",
  id: "2",
  artists: ["boygenius"],
}

const BARE: ResolvedTrack = { name: null, uri: "spotify:track:x", id: null, artists: [] }

let catalogue: Record<string, ResolvedTrack> = {}
let deviceId: string | undefined
let askedArtist: string | undefined
let askedDeviceFlag: string | undefined
const calls: string[] = []

const resolve = {
  resolveQueryToTrack: async (query: string, artist: string | undefined): Promise<ResolvedTrack> => {
    askedArtist = artist
    const track = catalogue[query]
    if (track === undefined) throw new Error(`no track for ${query}`)
    return track
  },
  resolveDeviceId: async (flag: string | undefined): Promise<string | undefined> => {
    askedDeviceFlag = flag
    return deviceId
  },
}

const player = {
  startResumePlayback: async (options: {
    readonly uris: readonly string[]
    readonly deviceId?: string
  }): Promise<void> => {
    calls.push(`start ${options.uris.join(",")} on ${options.deviceId ?? "active"}`)
  },
  addToQueue: async (uri: string, options: { readonly deviceId?: string }): Promise<void> => {
    calls.push(`queue ${uri} on ${options.deviceId ?? "active"}`)
  },
}

mock.module(RESOLVE, () => resolve)
mock.module(PLAYER, () => player)

const musicQueue = (await import("../commands/music/queue.ts")).default

type Write = typeof process.stdout.write

async function printed(args: readonly string[]): Promise<string> {
  const chunks: string[] = []
  const original: Write = process.stdout.write.bind(process.stdout)
  process.stdout.write = ((chunk: string | Uint8Array): boolean => {
    chunks.push(typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk))
    return true
  }) as Write
  try {
    await musicQueue(args)
  } finally {
    process.stdout.write = original
  }
  return chunks.join("")
}

interface QueueEnvelope {
  readonly queries: readonly string[]
  readonly tracks: readonly ResolvedTrack[]
  readonly deviceId: string | null
}

async function envelope(args: readonly string[]): Promise<QueueEnvelope> {
  return JSON.parse(await printed([...args, "--json"])) as QueueEnvelope
}

beforeEach(() => {
  catalogue = { a: MOTION, b: NOT_STRONG, bare: BARE }
  deviceId = undefined
  askedArtist = undefined
  askedDeviceFlag = undefined
  calls.length = 0
})

describe("ops music queue — the JSON envelope", () => {
  test("carries the queries as typed, the resolved tracks, and the device it played to", async () => {
    deviceId = "dev1"
    expect(await envelope(["a", "b", "--device-id", "dev1"])).toEqual({
      queries: ["a", "b"],
      tracks: [MOTION, NOT_STRONG],
      deviceId: "dev1",
    })
    expect(askedDeviceFlag).toBe("dev1")
  })

  test("nulls the device id when the active device is the one used", async () => {
    expect(await envelope(["a"])).toEqual({
      queries: ["a"],
      tracks: [MOTION],
      deviceId: null,
    })
  })

  test("--artist constrains every resolve, not just the first", async () => {
    await envelope(["a", "b", "--artist", "Em Beihold"])
    expect(askedArtist).toBe("Em Beihold")
  })
})

describe("ops music queue — what it prints", () => {
  test("marks the first track as playing and the rest as queued, in order", async () => {
    expect(await printed(["a", "b"])).toBe(
      '▶ Playing "Motion Sickness — Phoebe Bridgers"\n  + queued "Not Strong Enough — boygenius"\n'
    )
  })

  test("a single track produces just the playing line, no queued lines", async () => {
    expect(await printed(["a"])).toBe('▶ Playing "Motion Sickness — Phoebe Bridgers"\n')
  })

  test("falls back to the bare URI label when name and artists are both absent", async () => {
    expect(await printed(["bare"])).toBe('▶ Playing "spotify:track:x"\n')
  })
})

describe("ops music queue — how the set reaches Spotify", () => {
  test("the first track starts playback and the rest are server-side enqueued in order", async () => {
    await printed(["a", "b", "bare"])
    expect(calls).toEqual([
      "start spotify:track:1 on active",
      "queue spotify:track:2 on active",
      "queue spotify:track:x on active",
    ])
  })

  test("the resolved device carries into the start and every enqueue", async () => {
    deviceId = "dev1"
    await printed(["a", "b"])
    expect(calls).toEqual(["start spotify:track:1 on dev1", "queue spotify:track:2 on dev1"])
  })

  test("every query resolves before anything plays, so one bad query plays nothing", async () => {
    await expect(printed(["a", "nope"])).rejects.toThrow(/no track for nope/)
    expect(calls).toEqual([])
  })

  test("no query at all is an input error rather than an empty run", async () => {
    await expect(printed([])).rejects.toThrow(/at least one track query/)
    expect(calls).toEqual([])
  })
})
