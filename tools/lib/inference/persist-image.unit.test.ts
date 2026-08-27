import { describe, expect, test } from "bun:test"
import { buildInferenceRunRecord } from "./inference-run-record"
import {
  buildImagePageProperties,
  deriveEngine,
  IMAGE_PAGE_TYPE_SLUG,
  type PersistImageDeps,
  persistInferenceImage,
  shouldPersistImage,
} from "./persist-image"

const startedAt = "2026-06-29T00:00:00.000Z"

function generateRecord() {
  return buildInferenceRunRecord({
    service: "image-gen",
    operation: "generate",
    model: "Tongyi-MAI/Z-Image-Turbo",
    host: "macbook",
    commandLine: "generate --prompt x",
    startedAt,
    prompt: "a red leaf",
    seed: 42,
    size: "1024x1024",
    width: 1024,
    height: 1024,
  })
}

function editRecord() {
  return buildInferenceRunRecord({
    service: "image-edit-nano-banana",
    operation: "edit",
    model: "gemini-3-pro-image",
    host: "google",
    commandLine: "edit --image a.png --prompt y",
    startedAt,
    prompt: "make it real",
  })
}

function upscaleRecord() {
  return buildInferenceRunRecord({
    service: "seedvr2-upscale",
    operation: "upscale",
    model: "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16",
    host: "workstation",
    commandLine: "upscale --image a.png --resolution 1460",
    startedAt,
    seed: 12345,
    resolution: "1460",
  })
}

describe("deriveEngine", () => {
  test("generate on the image-gen service → z-image", () => {
    expect(deriveEngine("image-gen", "generate")).toBe("z-image")
  })
  test("edit → nano-banana", () => {
    expect(deriveEngine("image-edit-nano-banana", "edit")).toBe("nano-banana")
  })
  test("upscale → seedvr2", () => {
    expect(deriveEngine("seedvr2-upscale", "upscale")).toBe("seedvr2")
  })
  test("falls back to the service name for an unmapped service/op", () => {
    expect(deriveEngine("music-gen", "music")).toBe("music-gen")
  })
})

describe("shouldPersistImage", () => {
  test("the three image verbs persist by default (persist undefined)", () => {
    expect(shouldPersistImage("generate", undefined)).toBe(true)
    expect(shouldPersistImage("edit", undefined)).toBe(true)
    expect(shouldPersistImage("upscale", undefined)).toBe(true)
  })
  test("--no-persist (persist === false) skips even for image verbs", () => {
    expect(shouldPersistImage("generate", false)).toBe(false)
    expect(shouldPersistImage("edit", false)).toBe(false)
    expect(shouldPersistImage("upscale", false)).toBe(false)
  })
  test("persist === true persists an image verb", () => {
    expect(shouldPersistImage("generate", true)).toBe(true)
  })
  test("non-image operations never persist an image page", () => {
    for (const op of ["voice-design", "voice-clone", "music", "segment", "video-qa", "i2v"]) {
      expect(shouldPersistImage(op, undefined)).toBe(false)
      expect(shouldPersistImage(op, true)).toBe(false)
    }
  })
})

describe("buildImagePageProperties", () => {
  test("generate maps full provenance + scalar inferenceRun relation + imagePath", () => {
    const props = buildImagePageProperties({
      record: generateRecord(),
      inferenceRunId: "run-1",
      outputPath: "/home/walton/Pictures/Generated/generate-1.png",
    })
    expect(props).toMatchObject({
      title: "image-gen generate @ 2026-06-29T00:00:00.000Z",
      engine: "z-image",
      service: "image-gen",
      operation: "generate",
      model: "Tongyi-MAI/Z-Image-Turbo",
      prompt: "a red leaf",
      seed: 42,
      imagePath: "/home/walton/Pictures/Generated/generate-1.png",
      inferenceRun: "run-1",
    })
    expect(Array.isArray(props.inferenceRun)).toBe(false)
  })
  test("edit omits seed (nano-banana has none) and keeps prompt + nano-banana engine", () => {
    const props = buildImagePageProperties({
      record: editRecord(),
      inferenceRunId: "run-2",
      outputPath: "/out/edit.png",
    })
    expect(props).toMatchObject({
      engine: "nano-banana",
      prompt: "make it real",
      inferenceRun: "run-2",
    })
    expect("seed" in props).toBe(false)
  })
  test("upscale omits prompt (none) and keeps seed + seedvr2 engine", () => {
    const props = buildImagePageProperties({
      record: upscaleRecord(),
      inferenceRunId: "run-3",
      outputPath: "/out/up.png",
    })
    expect(props).toMatchObject({ engine: "seedvr2", seed: 12345, inferenceRun: "run-3" })
    expect("prompt" in props).toBe(false)
  })
})

describe("persistInferenceImage", () => {
  test("creates the image page then publishes the cover, returning the new page id", async () => {
    const calls: string[] = []
    const createCalls: Record<string, unknown>[] = []
    const publishCalls: { pageId: string; bytes: Uint8Array }[] = []
    const deps: PersistImageDeps = {
      createImagePage: async (properties) => {
        calls.push("create")
        createCalls.push(properties)
        return "img-42"
      },
      publishCover: async (pageId, bytes) => {
        calls.push("publish")
        publishCalls.push({ pageId, bytes })
      },
    }
    const bytes = new Uint8Array([1, 2, 3])
    const id = await persistInferenceImage(deps, {
      record: generateRecord(),
      inferenceRunId: "run-1",
      outputPath: "/out/g.png",
      outputBytes: bytes,
    })
    expect(id).toBe("img-42")
    expect(calls).toEqual(["create", "publish"])
    expect(createCalls[0]).toMatchObject({ inferenceRun: "run-1", engine: "z-image" })
    expect(publishCalls).toEqual([{ pageId: "img-42", bytes }])
  })
})

test("IMAGE_PAGE_TYPE_SLUG is the base image page-type", () => {
  expect(IMAGE_PAGE_TYPE_SLUG).toBe("image")
})
