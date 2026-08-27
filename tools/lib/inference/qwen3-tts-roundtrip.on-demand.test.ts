import { describe, expect, test } from "bun:test"
import { fleetReachable, roughMatchScore, synthQwen3Tts, transcribe } from "./roundtrip-helpers"

const READY = await fleetReachable()

const PHRASE = "Golden lanterns floated gently across the harbor at dusk."
const INSTRUCT =
  "A warm, clear female voice with an American accent, medium pitch, calm and friendly."

describe.skipIf(!READY)("qwen3-tts voice-design round-trip", () => {
  test("designs a voice whisper transcribes back to roughly the input", async () => {
    const wav = await synthQwen3Tts(PHRASE, INSTRUCT)
    expect(wav.byteLength).toBeGreaterThan(1000)

    const transcript = await transcribe(wav)
    expect(transcript.trim().length).toBeGreaterThan(0)
    expect(roughMatchScore(PHRASE, transcript)).toBeGreaterThanOrEqual(0.34)
  }, 600000)
})
