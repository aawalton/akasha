import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
const GEMINI = "../lib/inference/cli/gemini-image-client.ts"
const STORE = "../lib/inference/inference-run-store.ts"

const realGemini = { ...(await import(GEMINI)) }
const realStore = { ...(await import(STORE)) }

const ASPECT_RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"]

interface GeminiEditRequest {
  readonly imagePath: string
  readonly referenceImagePaths?: readonly string[]
  readonly imageConfig?: Readonly<Record<string, string>>
}

let request: GeminiEditRequest | null = null

const gemini = {
  runGeminiEdit: async (input: GeminiEditRequest): Promise<Uint8Array> => {
    request = input
    return new Uint8Array([1, 2, 3])
  },
  transcodeImage: async (bytes: Uint8Array): Promise<Uint8Array> => bytes,
}

const store = {
  recordInferenceRun: async <T>(_record: unknown, run: () => Promise<T>): Promise<T> => await run(),
}

mock.module(GEMINI, () => ({ ...realGemini, ...gemini }))
mock.module(STORE, () => ({ ...realStore, ...store }))

const inferenceEdit = (await import("../commands/inference/edit.ts")).default

const root = mkdtempSync("/var/tmp/ops-inference-edit-")

function image(name: string): string {
  const path = join(root, name)
  writeFileSync(path, name)
  return path
}

const SCENE = image("scene.png")
const ANCHOR = image("anchor.png")
const REF2 = image("ref2.jpg")
const CSV1 = image("csvref1.png")
const CSV2 = image("csvref2.png")
const OUT = join(root, "out.png")

type Write = typeof process.stdout.write

async function edit(args: readonly string[]): Promise<void> {
  const original: Write = process.stdout.write.bind(process.stdout)
  process.stdout.write = ((): boolean => true) as Write
  try {
    await inferenceEdit([...args, "--prompt", "make it warmer", "--output", OUT, "--no-persist"])
  } finally {
    process.stdout.write = original
  }
}

async function sent(args: readonly string[]): Promise<GeminiEditRequest> {
  await edit(args)
  if (request === null) throw new Error("the edit never reached the engine")
  return request
}

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

beforeEach(() => {
  request = null
  process.env.GEMINI_API_KEY = "test-key"
})

describe("ops inference edit — which image is the subject and which are references", () => {
  test("one --image is the primary, and no references are sent at all", async () => {
    const call = await sent(["--image", SCENE])
    expect(call.imagePath).toBe(SCENE)
    expect(call.referenceImagePaths).toBeUndefined()
  })

  test("repeated --image makes the first primary and the rest references, in order", async () => {
    const call = await sent(["--image", SCENE, "--image", ANCHOR, "--image", REF2])
    expect(call.imagePath).toBe(SCENE)
    expect(call.referenceImagePaths).toEqual([ANCHOR, REF2])
  })

  test("--refs is split on commas, trimmed, and its empties dropped", async () => {
    const call = await sent(["--image", SCENE, "--refs", ` ${ANCHOR}, ${REF2} ,`])
    expect(call.referenceImagePaths).toEqual([ANCHOR, REF2])
  })

  test("repeated --image and --refs combine, the extra images first", async () => {
    const call = await sent([
      "--image",
      SCENE,
      "--image",
      ANCHOR,
      "--refs",
      `${CSV1},${CSV2}`,
    ])
    expect(call.referenceImagePaths).toEqual([ANCHOR, CSV1, CSV2])
  })

  test("an empty --refs contributes no references", async () => {
    const call = await sent(["--image", SCENE, "--refs", ""])
    expect(call.referenceImagePaths).toBeUndefined()
  })

  test("no --image at all is an input error naming the flag", async () => {
    await expect(edit([])).rejects.toThrow(/--image/)
  })

  test("a reference that cannot be read is named, rather than dropped", async () => {
    await expect(edit(["--image", SCENE, "--refs", join(root, "absent.png")])).rejects.toThrow(
      /cannot read reference image/
    )
  })
})

describe("ops inference edit — the Gemini image config", () => {
  test("neither flag omits imageConfig, so the output inherits the input's dimensions", async () => {
    expect((await sent(["--image", SCENE])).imageConfig).toBeUndefined()
  })

  test("an aspect ratio alone carries no size key", async () => {
    expect((await sent(["--image", SCENE, "--aspect-ratio", "16:9"])).imageConfig).toEqual({
      aspectRatio: "16:9",
    })
  })

  test("a size alone carries no aspect-ratio key", async () => {
    expect((await sent(["--image", SCENE, "--size", "2K"])).imageConfig).toEqual({
      imageSize: "2K",
    })
  })

  test("both are carried together", async () => {
    expect(
      (await sent(["--image", SCENE, "--aspect-ratio", "21:9", "--size", "4K"])).imageConfig
    ).toEqual({ aspectRatio: "21:9", imageSize: "4K" })
  })

  test("every supported aspect ratio is accepted", async () => {
    for (const ratio of ASPECT_RATIOS) {
      expect((await sent(["--image", SCENE, "--aspect-ratio", ratio])).imageConfig).toEqual({
        aspectRatio: ratio,
      })
    }
  })

  test("an unsupported aspect ratio is refused with the allowed list", async () => {
    const failing = edit(["--image", SCENE, "--aspect-ratio", "7:3"])
    await expect(failing).rejects.toThrow(/--aspect-ratio must be one of/)
    await expect(edit(["--image", SCENE, "--aspect-ratio", "7:3"])).rejects.toThrow(/16:9/)
  })

  test("a lowercase k size is refused, the uppercase K being required", async () => {
    await expect(edit(["--image", SCENE, "--size", "2k"])).rejects.toThrow(/--size must be one of/)
  })

  test("an unsupported size is refused with the allowed list", async () => {
    await expect(edit(["--image", SCENE, "--size", "8K"])).rejects.toThrow(/1K, 2K, 4K/)
  })
})
