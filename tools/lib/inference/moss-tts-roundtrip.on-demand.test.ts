import { describe, expect, test } from "bun:test"
import { fleetReachable, roughMatchScore, synthMossTts, transcribe } from "./roundtrip-helpers"

const READY = await fleetReachable()

const PHRASE = "The chef prepared a delicious bowl of tomato basil soup."

describe.skipIf(!READY)("moss-tts TTS round-trip", () => {
  test("synthesizes speech whisper transcribes back to roughly the input", async () => {
    const wav = await synthMossTts(PHRASE)
    expect(wav.byteLength).toBeGreaterThan(1000)

    const transcript = await transcribe(wav)
    expect(transcript.trim().length).toBeGreaterThan(0)
    expect(roughMatchScore(PHRASE, transcript)).toBeGreaterThanOrEqual(0.34)
  }, 300000)
})
