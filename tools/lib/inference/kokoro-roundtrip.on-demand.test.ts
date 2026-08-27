import { describe, expect, test } from "bun:test"
import { fleetReachable, roughMatchScore, synthKokoro, transcribe } from "./roundtrip-helpers"

const READY = await fleetReachable()

const PHRASE = "Seven silver kites drifted above the quiet mountain village."

describe.skipIf(!READY)("kokoro TTS round-trip", () => {
  test("synthesizes speech whisper transcribes back to roughly the input", async () => {
    const wav = await synthKokoro(PHRASE)
    expect(wav.byteLength).toBeGreaterThan(1000)

    const transcript = await transcribe(wav)
    expect(transcript.trim().length).toBeGreaterThan(0)
    expect(roughMatchScore(PHRASE, transcript)).toBeGreaterThanOrEqual(0.34)
  }, 300000)
})
