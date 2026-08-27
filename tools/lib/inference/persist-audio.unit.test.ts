import { describe, expect, test } from "bun:test"
import { buildInferenceRunRecord } from "./inference-run-record"
import {
  AUDIO_PAGE_TYPE_SLUG,
  buildAudioPageProperties,
  deriveAudioEngine,
  type PersistAudioDeps,
  persistInferenceAudio,
  shouldPersistAudio,
} from "./persist-audio"

const startedAt = "2026-06-29T00:00:00.000Z"

function voiceDesignRecord() {
  return buildInferenceRunRecord({
    service: "voxcpm2",
    operation: "voice-design",
    model: "mlx-community/VoxCPM2-bf16",
    host: "macbook",
    commandLine: "voice-design --instruct x --text y",
    startedAt,
    instruct: "A warm, low-pitched British woman, calm and slow.",
    text: "Seven silver bells rang across the valley.",
  })
}

function voiceCloneRecord() {
  return buildInferenceRunRecord({
    service: "moss-tts",
    operation: "voice-clone",
    model: "OpenMOSS-Team/MOSS-TTS-v1.5",
    host: "macbook",
    commandLine: "voice-clone --text z",
    startedAt,
    text: "Welcome home.",
    refAudioPath: "/Users/walton/inference/moss-tts/ref-audio.wav",
    refText: "The quick brown fox jumps over the lazy dog.",
  })
}

function musicRecord() {
  return buildInferenceRunRecord({
    service: "music-gen",
    operation: "music",
    model: "acestep-v15-turbo",
    host: "macbook",
    commandLine: "music --prompt p",
    startedAt,
    prompt: "upbeat lo-fi hip hop",
    seed: 42,
    duration: 30,
  })
}

describe("deriveAudioEngine", () => {
  test("music (service music-gen) → ace-step", () => {
    expect(deriveAudioEngine("music-gen", "music")).toBe("ace-step")
  })
  test("voice services pass their human service label through", () => {
    expect(deriveAudioEngine("voxcpm2", "voice-design")).toBe("voxcpm2")
    expect(deriveAudioEngine("qwen3-tts", "voice-design")).toBe("qwen3-tts")
    expect(deriveAudioEngine("moss-tts", "voice-clone")).toBe("moss-tts")
  })
})

describe("shouldPersistAudio", () => {
  test("the three audio verbs persist by default (persist undefined)", () => {
    expect(shouldPersistAudio("voice-design", undefined)).toBe(true)
    expect(shouldPersistAudio("voice-clone", undefined)).toBe(true)
    expect(shouldPersistAudio("music", undefined)).toBe(true)
  })
  test("--no-persist (persist === false) skips even for audio verbs", () => {
    expect(shouldPersistAudio("voice-design", false)).toBe(false)
    expect(shouldPersistAudio("voice-clone", false)).toBe(false)
    expect(shouldPersistAudio("music", false)).toBe(false)
  })
  test("persist === true persists an audio verb", () => {
    expect(shouldPersistAudio("voice-design", true)).toBe(true)
  })
  test("non-audio operations never persist an audio page", () => {
    for (const op of ["generate", "edit", "upscale", "segment", "video-qa", "i2v"]) {
      expect(shouldPersistAudio(op, undefined)).toBe(false)
      expect(shouldPersistAudio(op, true)).toBe(false)
    }
  })
})

describe("buildAudioPageProperties", () => {
  test("voice-design maps provenance + instruct/text + scalar inferenceRun + audioPath", () => {
    const props = buildAudioPageProperties({
      record: voiceDesignRecord(),
      inferenceRunId: "run-1",
      outputPath: "/home/walton/Pictures/Generated/voice-design-1.wav",
    })
    expect(props).toMatchObject({
      title: "voxcpm2 voice-design @ 2026-06-29T00:00:00.000Z",
      engine: "voxcpm2",
      service: "voxcpm2",
      operation: "voice-design",
      model: "mlx-community/VoxCPM2-bf16",
      instruct: "A warm, low-pitched British woman, calm and slow.",
      text: "Seven silver bells rang across the valley.",
      audioPath: "/home/walton/Pictures/Generated/voice-design-1.wav",
      inferenceRun: "run-1",
    })
    expect(Array.isArray(props.inferenceRun)).toBe(false)
    expect("prompt" in props).toBe(false)
    expect("seed" in props).toBe(false)
    expect("durationSeconds" in props).toBe(false)
  })
  test("voice-clone keeps text and omits instruct/prompt/seed/duration", () => {
    const props = buildAudioPageProperties({
      record: voiceCloneRecord(),
      inferenceRunId: "run-2",
      outputPath: "/out/clone.wav",
    })
    expect(props).toMatchObject({
      engine: "moss-tts",
      operation: "voice-clone",
      text: "Welcome home.",
      inferenceRun: "run-2",
    })
    expect("instruct" in props).toBe(false)
    expect("prompt" in props).toBe(false)
    expect("seed" in props).toBe(false)
    expect("durationSeconds" in props).toBe(false)
  })
  test("music maps prompt + seed + durationSeconds and ace-step engine", () => {
    const props = buildAudioPageProperties({
      record: musicRecord(),
      inferenceRunId: "run-3",
      outputPath: "/out/song.wav",
    })
    expect(props).toMatchObject({
      engine: "ace-step",
      operation: "music",
      prompt: "upbeat lo-fi hip hop",
      seed: 42,
      durationSeconds: 30,
      inferenceRun: "run-3",
    })
    expect("instruct" in props).toBe(false)
    expect("text" in props).toBe(false)
  })
})

describe("persistInferenceAudio", () => {
  test("creates the audio page then publishes the WAV, returning the new page id", async () => {
    const calls: string[] = []
    const createCalls: Record<string, unknown>[] = []
    const publishCalls: { pageId: string; bytes: Uint8Array }[] = []
    const deps: PersistAudioDeps = {
      createAudioPage: async (properties) => {
        calls.push("create")
        createCalls.push(properties)
        return "aud-42"
      },
      publishAudio: async (pageId, bytes) => {
        calls.push("publish")
        publishCalls.push({ pageId, bytes })
      },
    }
    const bytes = new Uint8Array([0x52, 0x49, 0x46, 0x46])
    const id = await persistInferenceAudio(deps, {
      record: musicRecord(),
      inferenceRunId: "run-3",
      outputPath: "/out/song.wav",
      outputBytes: bytes,
    })
    expect(id).toBe("aud-42")
    expect(calls).toEqual(["create", "publish"])
    expect(createCalls[0]).toMatchObject({ inferenceRun: "run-3", engine: "ace-step" })
    expect(publishCalls).toEqual([{ pageId: "aud-42", bytes }])
  })
})

test("AUDIO_PAGE_TYPE_SLUG is the base audio page-type", () => {
  expect(AUDIO_PAGE_TYPE_SLUG).toBe("audio")
})
