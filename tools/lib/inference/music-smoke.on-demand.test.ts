import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { runMusic } from "./cli/ace-step-client"
import { fleetReachable, MACBOOK_HOST } from "./roundtrip-helpers"

const PORT = 8097

const READY = await fleetReachable()

let dir = ""
beforeAll(async () => {
  dir = await mkdtemp(join(tmpdir(), "music-smoke-"))
})
afterAll(async () => {
  if (dir !== "") await rm(dir, { recursive: true, force: true })
})

describe.skipIf(!READY)("music-gen smoke", () => {
  test("generates a short instrumental clip and returns WAV bytes", async () => {
    const out = join(dir, "smoke.wav")
    const { outputBytes, outputPath } = await runMusic({
      baseUrl: `http://${MACBOOK_HOST}:${PORT}`,
      params: {
        prompt: "a short calm solo piano motif, no drums",
        durationSeconds: 8,
        inferenceSteps: 8,
        seed: 42,
        vocalLanguage: "en",
        audioFormat: "wav",
      },
      outputPath: out,
      submitTimeoutMs: 600_000,
      pollIntervalMs: 5_000,
      totalTimeoutMs: 900_000,
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      now: () => Date.now(),
    })
    expect(outputPath).toBe(out)
    expect(outputBytes.byteLength).toBeGreaterThan(1000)
  }, 960_000)
})
