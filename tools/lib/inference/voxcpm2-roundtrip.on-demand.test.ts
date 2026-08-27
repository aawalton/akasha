import { describe, expect, test } from "bun:test"
import { fleetReachable, roughMatchScore, synthVoxcpm2, transcribe } from "./roundtrip-helpers"

const READY = await fleetReachable()

const PHRASE = "Golden lanterns floated gently across the harbor at dusk."
const INSTRUCT = "A warm, low-pitched British woman, calm and slow."

describe.skipIf(!READY)("voxcpm2 voice-design round-trip", () => {
  test("designs a voice whisper transcribes back to roughly the input", async () => {
    const wav = await synthVoxcpm2(PHRASE, INSTRUCT)
    expect(wav.byteLength).toBeGreaterThan(1000)

    const transcript = await transcribe(wav)
    expect(transcript.trim().length).toBeGreaterThan(0)
    expect(roughMatchScore(PHRASE, transcript)).toBeGreaterThanOrEqual(0.34)
  }, 600000)
})
