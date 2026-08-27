import { describe, expect, test } from "bun:test"
import { buildFinishPatch, buildInferenceRunRecord, InferenceRunRecordSchema, sha256Hex } from "./inference-run-record"
import { SERVICE_VERSIONS } from "./inference-run-services"

describe("buildInferenceRunRecord", () => {
  test("a generation run captures the recipe + version pins + running status", () => {
    const record = buildInferenceRunRecord({
      service: "image-gen",
      operation: "generate",
      model: "Tongyi-MAI/Z-Image-Turbo",
      host: "macbook",
      commandLine: "generate --prompt 'a leaf' --size 1024x1024 --output /tmp/x.png",
      startedAt: "2026-06-08T12:00:00.000Z",
      prompt: "a leaf",
      size: "1024x1024",
      width: 1024,
      height: 1024,
    })
    expect(record.service).toBe("image-gen")
    expect(record.operation).toBe("generate")
    expect(record.status).toBe("running")
    expect(record.model).toBe("Tongyi-MAI/Z-Image-Turbo")
    expect(record.prompt).toBe("a leaf")
    expect(record.width).toBe(1024)
    expect(record.startedAt).toBe("2026-06-08T12:00:00.000Z")
    expect(record.serviceVersions).toEqual(SERVICE_VERSIONS["image-gen"])
    expect(record.inputImagePath).toBeUndefined()
  })

  test("a voice-design run captures instruct, text, lang, and the recorded sampling defaults (no seed)", () => {
    const record = buildInferenceRunRecord({
      service: "qwen3-tts",
      operation: "voice-design",
      model: "mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16",
      host: "macbook",
      commandLine: "voice-design --instruct 'warm' --text 'hello' --output o.wav",
      startedAt: "2026-06-08T12:00:00.000Z",
      instruct: "A warm, low-pitched female voice, slow and intimate.",
      text: "Seven silver bells rang across the valley.",
      lang: "English",
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      repetitionPenalty: 1.0,
      maxTokens: 1200,
    })
    expect(record.instruct).toBe("A warm, low-pitched female voice, slow and intimate.")
    expect(record.text).toBe("Seven silver bells rang across the valley.")
    expect(record.lang).toBe("English")
    expect(record.temperature).toBe(0.7)
    expect(record.topP).toBe(0.95)
    expect(record.topK).toBe(40)
    expect(record.maxTokens).toBe(1200)
    expect(record.seed).toBeUndefined()
    expect(record.serviceVersions).toEqual(SERVICE_VERSIONS["qwen3-tts"])
  })

  test("a voxcpm2 voice-design run captures instruct + text with no lang (lang_code is qwen3-tts-only)", () => {
    const record = buildInferenceRunRecord({
      service: "voxcpm2",
      operation: "voice-design",
      model: "mlx-community/VoxCPM2-bf16",
      host: "macbook",
      commandLine: "voice-design --instruct 'British' --text 'hello' --output o.wav",
      startedAt: "2026-06-08T12:00:00.000Z",
      instruct: "A warm, low-pitched British woman, calm and slow.",
      text: "Seven silver bells rang across the valley.",
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      repetitionPenalty: 1.0,
      maxTokens: 1200,
    })
    expect(record.service).toBe("voxcpm2")
    expect(record.operation).toBe("voice-design")
    expect(record.instruct).toBe("A warm, low-pitched British woman, calm and slow.")
    expect(record.text).toBe("Seven silver bells rang across the valley.")
    expect(record.lang).toBeUndefined()
    expect(record.seed).toBeUndefined()
    expect(record.serviceVersions).toEqual(SERVICE_VERSIONS.voxcpm2)
  })

  test("a voice-clone run captures the target text, resolved ref_audio path, and ref_text", () => {
    const record = buildInferenceRunRecord({
      service: "moss-tts",
      operation: "voice-clone",
      model: "OpenMOSS-Team/MOSS-TTS-v1.5",
      host: "macbook",
      commandLine: "voice-clone --text 'hello' --output o.wav",
      startedAt: "2026-06-08T12:00:00.000Z",
      text: "Seven silver bells rang across the valley.",
      refAudioPath: "/Users/walton/inference/moss-tts/ref-audio.wav",
      refText: "The quick brown fox jumps over the lazy dog.",
    })
    expect(record.service).toBe("moss-tts")
    expect(record.operation).toBe("voice-clone")
    expect(record.text).toBe("Seven silver bells rang across the valley.")
    expect(record.refAudioPath).toBe("/Users/walton/inference/moss-tts/ref-audio.wav")
    expect(record.refText).toBe("The quick brown fox jumps over the lazy dog.")
    expect(record.seed).toBeUndefined()
    expect(record.serviceVersions).toEqual(SERVICE_VERSIONS["moss-tts"])
  })

  test("a video-qa run captures the checklist prompt, frame sampling, and the input clip identity", () => {
    const record = buildInferenceRunRecord({
      service: "mlx-vlm",
      operation: "video-qa",
      model: "mlx-community/Qwen3-VL-30B-A3B-Instruct-4bit",
      host: "macbook",
      commandLine: "video-qa --video clip.mp4 --checklist 'any morphing fabric?'",
      startedAt: "2026-06-14T12:00:00.000Z",
      prompt: "any morphing fabric?",
      frames: 16,
      fps: 16,
      inputVideoPath: "/home/walton/clip.mp4",
      inputVideoSha256: "f".repeat(64),
    })
    expect(record.service).toBe("mlx-vlm")
    expect(record.operation).toBe("video-qa")
    expect(record.prompt).toBe("any morphing fabric?")
    expect(record.frames).toBe(16)
    expect(record.fps).toBe(16)
    expect(record.inputVideoPath).toBe("/home/walton/clip.mp4")
    expect(record.inputVideoSha256).toBe("f".repeat(64))
    expect(record.serviceVersions).toEqual(SERVICE_VERSIONS["mlx-vlm"])
  })

  test("seed 0 is honored (no truthiness foot-gun)", () => {
    const record = buildInferenceRunRecord({
      service: "image-edit-nano-banana",
      operation: "edit",
      model: "gemini-3-pro-image",
      host: "macbook",
      commandLine: "edit --image s.png --prompt 'x' --output o.png --seed 0",
      startedAt: "2026-06-08T12:00:00.000Z",
      prompt: "x",
      seed: 0,
    })
    expect(record.seed).toBe(0)
  })

  test("the built record satisfies its own Zod schema", () => {
    const record = buildInferenceRunRecord({
      service: "seedvr2-upscale",
      operation: "upscale",
      model: "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16",
      host: "cluster-3080ti",
      commandLine: "upscale --image i.png --resolution 1460 --output o.png",
      startedAt: "2026-06-08T12:00:00.000Z",
      inputImagePath: "/tmp/i.png",
      inputImageSha256: "b".repeat(64),
    })
    expect(() => InferenceRunRecordSchema.parse(record)).not.toThrow()
  })

  test("a multi-image edit records the additional references as parallel path + sha arrays", () => {
    const record = buildInferenceRunRecord({
      service: "image-edit-nano-banana",
      operation: "edit",
      model: "gemini-3-pro-image",
      host: "google",
      commandLine: "edit --image scene.png --refs anchor.png --output o.png",
      startedAt: "2026-06-08T12:00:00.000Z",
      inputImagePath: "/tmp/scene.png",
      inputImageSha256: "a".repeat(64),
      referenceImagePaths: ["/tmp/anchor.png", "/tmp/ref2.jpg"],
      referenceImageSha256s: ["b".repeat(64), "c".repeat(64)],
    })
    expect(record.inputImagePath).toBe("/tmp/scene.png")
    expect(record.referenceImagePaths).toEqual(["/tmp/anchor.png", "/tmp/ref2.jpg"])
    expect(record.referenceImageSha256s).toEqual(["b".repeat(64), "c".repeat(64)])
    expect(() => InferenceRunRecordSchema.parse(record)).not.toThrow()
  })

  test("a single-image edit omits the reference arrays (row identical to before)", () => {
    const record = buildInferenceRunRecord({
      service: "image-edit-nano-banana",
      operation: "edit",
      model: "gemini-3-pro-image",
      host: "google",
      commandLine: "edit --image scene.png --output o.png",
      startedAt: "2026-06-08T12:00:00.000Z",
      inputImagePath: "/tmp/scene.png",
      inputImageSha256: "a".repeat(64),
    })
    expect(record.referenceImagePaths).toBeUndefined()
    expect(record.referenceImageSha256s).toBeUndefined()
  })
})

describe("SERVICE_VERSIONS", () => {
  test("every local-toolchain image service has a non-empty pin set", () => {
    const services = ["image-gen", "seedvr2-upscale"] as const
    for (const s of services) {
      expect(SERVICE_VERSIONS[s]).toBeDefined()
      expect(Object.keys(SERVICE_VERSIONS[s]).length).toBeGreaterThan(0)
    }
  })

  test("image-edit-nano-banana carries an empty pin set (Google-hosted API)", () => {
    expect(SERVICE_VERSIONS["image-edit-nano-banana"]).toEqual({})
  })

  test("qwen3-tts pins the mlx-audio release (deploy.sh MLX_AUDIO_VERSION)", () => {
    expect(SERVICE_VERSIONS["qwen3-tts"].mlxAudio).toBe("0.4.3")
  })

  test("moss-tts pins the isolated 0.4.4 + mlx 0.31.2 split (deploy.sh moss-tts branch)", () => {
    expect(SERVICE_VERSIONS["moss-tts"].mlxAudio).toBe("0.4.4")
    expect(SERVICE_VERSIONS["moss-tts"].mlx).toBe("0.31.2")
  })

  test("voxcpm2 rides the same isolated 0.4.4 + mlx 0.31.2 pin (deploy.sh voxcpm2 branch)", () => {
    expect(SERVICE_VERSIONS.voxcpm2.mlxAudio).toBe("0.4.4")
    expect(SERVICE_VERSIONS.voxcpm2.mlx).toBe("0.31.2")
  })

  test("image-gen pins mlx 0.31.0 (the thread-safety downgrade)", () => {
    expect(SERVICE_VERSIONS["image-gen"].mlx).toBe("0.31.0")
  })

  test("mlx-vlm pins mlx-vlm 0.6.3 on mlx 0.31.2 (the dedicated env, not the 0.31.0 image env)", () => {
    expect(SERVICE_VERSIONS["mlx-vlm"].mlxVlm).toBe("0.6.3")
    expect(SERVICE_VERSIONS["mlx-vlm"].mlx).toBe("0.31.2")
  })
})

describe("buildFinishPatch", () => {
  test("a completed run records output identity + duration", () => {
    const patch = buildFinishPatch({
      status: "completed",
      completedAt: "2026-06-08T12:05:00.000Z",
      durationMs: 300000,
      outputImagePath: "/tmp/o.png",
      outputImageSha256: "c".repeat(64),
    })
    expect(patch.status).toBe("completed")
    expect(patch.durationMs).toBe(300000)
    expect(patch.outputImagePath).toBe("/tmp/o.png")
    expect(patch.outputImageSha256).toBe("c".repeat(64))
    expect(patch.errorMessage).toBeUndefined()
    expect(patch.identityCosine).toBeUndefined()
  })

  test("a verified expression run records the ArcFace identity cosine", () => {
    const patch = buildFinishPatch({
      status: "completed",
      completedAt: "2026-06-08T12:05:00.000Z",
      durationMs: 42000,
      outputImagePath: "/tmp/o.png",
      outputImageSha256: "c".repeat(64),
      identityCosine: 0.72,
    })
    expect(patch.identityCosine).toBe(0.72)
  })

  test("a video-qa run records the model's text answer", () => {
    const patch = buildFinishPatch({
      status: "completed",
      completedAt: "2026-06-14T12:01:00.000Z",
      durationMs: 60000,
      outputText: "No morphing fabric; the transition is a clean translate.",
    })
    expect(patch.outputText).toBe("No morphing fabric; the transition is a clean translate.")
    expect(patch.outputImagePath).toBeUndefined()
    expect(patch.outputAudioPath).toBeUndefined()
  })

  test("a completed voice run records audio output identity instead of image identity", () => {
    const patch = buildFinishPatch({
      status: "completed",
      completedAt: "2026-06-08T12:05:00.000Z",
      durationMs: 90000,
      outputAudioPath: "/tmp/clip.wav",
      outputAudioSha256: "e".repeat(64),
    })
    expect(patch.outputAudioPath).toBe("/tmp/clip.wav")
    expect(patch.outputAudioSha256).toBe("e".repeat(64))
    expect(patch.outputImagePath).toBeUndefined()
    expect(patch.outputImageSha256).toBeUndefined()
  })

  test("a failed run records the error message and no output", () => {
    const patch = buildFinishPatch({
      status: "failed",
      completedAt: "2026-06-08T12:05:00.000Z",
      durationMs: 1200,
      errorMessage: "500 from cop",
    })
    expect(patch.status).toBe("failed")
    expect(patch.errorMessage).toBe("500 from cop")
    expect(patch.outputImagePath).toBeUndefined()
  })
})

describe("sha256Hex", () => {
  test("matches the known vector for 'abc'", () => {
    const bytes = new TextEncoder().encode("abc")
    expect(sha256Hex(bytes)).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    )
  })

  test("is a 64-char lowercase hex string", () => {
    expect(sha256Hex(new Uint8Array([1, 2, 3]))).toMatch(/^[0-9a-f]{64}$/)
  })
})
