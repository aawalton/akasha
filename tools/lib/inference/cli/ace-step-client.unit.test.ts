import { describe, expect, test } from "bun:test"
import {
  assertWavBytes,
  buildReleaseTaskBody,
  interpretTaskStatus,
  parseQueryResult,
  parseReleaseTaskResponse,
} from "./ace-step-client"

describe("buildReleaseTaskBody", () => {
  test("carries prompt, duration, steps, seed, language, and fixed task fields", () => {
    expect(
      buildReleaseTaskBody({
        prompt: "lo-fi hip hop",
        lyrics: "la la la",
        durationSeconds: 30,
        inferenceSteps: 8,
        seed: 7,
        vocalLanguage: "en",
        audioFormat: "wav",
      })
    ).toEqual({
      prompt: "lo-fi hip hop",
      lyrics: "la la la",
      task_type: "text2music",
      duration: 30,
      inference_steps: 8,
      batch_size: 1,
      seed: 7,
      use_random_seed: false,
      vocal_language: "en",
      audio_format: "wav",
    })
  })

  test("defaults lyrics to empty string for an instrumental run", () => {
    expect(
      buildReleaseTaskBody({
        prompt: "ambient drone",
        durationSeconds: 60,
        inferenceSteps: 8,
        seed: 1,
        vocalLanguage: "en",
        audioFormat: "wav",
      }).lyrics
    ).toBe("")
  })

  test("seed 0 is carried (no truthiness foot-gun)", () => {
    expect(
      buildReleaseTaskBody({
        prompt: "p",
        durationSeconds: 10,
        inferenceSteps: 8,
        seed: 0,
        vocalLanguage: "en",
        audioFormat: "wav",
      }).seed
    ).toBe(0)
  })
})

describe("parseReleaseTaskResponse", () => {
  test("returns the task id from a 200 envelope", () => {
    expect(
      parseReleaseTaskResponse({
        data: { task_id: "abc-123", status: "queued", queue_position: 1 },
        code: 200,
        error: null,
      })
    ).toBe("abc-123")
  })

  test("throws on a non-200 code", () => {
    expect(() =>
      parseReleaseTaskResponse({ data: { task_id: "x" }, code: 429, error: "busy" })
    ).toThrow()
  })

  test("throws when error is populated even on code 200", () => {
    expect(() =>
      parseReleaseTaskResponse({ data: { task_id: "x" }, code: 200, error: "boom" })
    ).toThrow()
  })

  test("throws when the shape is wrong (boundary parse)", () => {
    expect(() => parseReleaseTaskResponse({ data: {}, code: 200 })).toThrow()
  })
})

describe("interpretTaskStatus", () => {
  test("maps 1 to succeeded, 2 to failed, everything else to running", () => {
    expect(interpretTaskStatus(1)).toBe("succeeded")
    expect(interpretTaskStatus(2)).toBe("failed")
    expect(interpretTaskStatus(0)).toBe("running")
    expect(interpretTaskStatus(7)).toBe("running")
  })
})

describe("parseQueryResult", () => {
  const succeededResult = JSON.stringify([{ file: "/v1/audio?path=%2Ftmp%2Fout.wav", status: 1 }])

  test("running when the task id is not present yet", () => {
    expect(parseQueryResult({ data: [], code: 200, error: null }, "t1")).toEqual({
      status: "running",
    })
  })

  test("running when the matching entry reports status 0", () => {
    expect(
      parseQueryResult({ data: [{ task_id: "t1", status: 0 }], code: 200, error: null }, "t1")
    ).toEqual({ status: "running" })
  })

  test("failed when the matching entry reports status 2", () => {
    expect(
      parseQueryResult({ data: [{ task_id: "t1", status: 2 }], code: 200, error: null }, "t1")
    ).toEqual({ status: "failed" })
  })

  test("succeeded extracts the audio url from the nested stringified result", () => {
    expect(
      parseQueryResult(
        { data: [{ task_id: "t1", status: 1, result: succeededResult }], code: 200, error: null },
        "t1"
      )
    ).toEqual({ status: "succeeded", audioUrl: "/v1/audio?path=%2Ftmp%2Fout.wav" })
  })

  test("throws when a succeeded task carries no result payload", () => {
    expect(() =>
      parseQueryResult({ data: [{ task_id: "t1", status: 1 }], code: 200, error: null }, "t1")
    ).toThrow()
  })

  test("throws when the result string is not valid JSON", () => {
    expect(() =>
      parseQueryResult(
        { data: [{ task_id: "t1", status: 1, result: "not json" }], code: 200, error: null },
        "t1"
      )
    ).toThrow()
  })

  test("throws on a non-200 envelope code", () => {
    expect(() => parseQueryResult({ data: [], code: 500, error: "server" }, "t1")).toThrow()
  })
})

describe("assertWavBytes", () => {
  test("accepts a RIFF-prefixed payload", () => {
    const wav = new Uint8Array(64)
    wav[0] = 0x52
    wav[1] = 0x49
    wav[2] = 0x46
    wav[3] = 0x46
    expect(assertWavBytes(wav)).toBeUndefined()
  })

  test("rejects a non-RIFF payload", () => {
    expect(() => assertWavBytes(new Uint8Array([1, 2, 3, 4, 5]))).toThrow()
  })
})
