import { describe, expect, test } from "bun:test"
import {
  CLONE_REF_TEXT,
  fleetReachable,
  refAudioPath,
  roughMatchScore,
  synthMossContinuation,
  transcribe,
} from "./roundtrip-helpers"

const READY = await fleetReachable()

const NEW_PHRASE = "Seventeen violet lanterns drifted across the harbor at midnight."

describe.skipIf(!READY)("moss-tts continuation round-trip", () => {
  test("continuation speaks the new text, proving the mode field is honored", async () => {
    const wav = await synthMossContinuation(NEW_PHRASE, refAudioPath("moss-tts"), CLONE_REF_TEXT)
    expect(wav.byteLength).toBeGreaterThan(1000)

    const transcript = await transcribe(wav)
    expect(transcript.trim().length).toBeGreaterThan(0)

    const newScore = roughMatchScore(NEW_PHRASE, transcript)
    expect(newScore).toBeGreaterThanOrEqual(0.34)

    const prefixScore = roughMatchScore(CLONE_REF_TEXT, transcript)
    console.warn(
      `[moss-continuation] newScore=${newScore.toFixed(2)} prefixScore=${prefixScore.toFixed(2)}` +
        ` — transcript: ${transcript.trim()}`
    )
    expect(prefixScore).toBeLessThan(0.34)
  }, 300000)
})
