import { describe, expect, test } from "bun:test"
import {
  buildFrameExtractArgs,
  buildVideoQaRequest,
  DEFAULT_FRAMES,
  MLX_VLM_MODEL,
  selectFrameIndices,
  toPngDataUrl,
  VIDEO_QA_MAX_TOKENS,
} from "./mlx-vlm-client"

describe("selectFrameIndices", () => {
  test("returns every index when asking for at least as many as exist", () => {
    expect(selectFrameIndices(4, 4)).toEqual([0, 1, 2, 3])
    expect(selectFrameIndices(3, 8)).toEqual([0, 1, 2])
  })

  test("samples evenly spaced indices spanning first to last", () => {
    expect(selectFrameIndices(10, 4)).toEqual([0, 3, 6, 9])
    expect(selectFrameIndices(81, 16)[0]).toBe(0)
    expect(selectFrameIndices(81, 16).at(-1)).toBe(80)
    expect(selectFrameIndices(81, 16)).toHaveLength(16)
  })

  test("a single wanted frame picks the middle", () => {
    expect(selectFrameIndices(9, 1)).toEqual([4])
  })

  test("degenerate inputs yield no indices", () => {
    expect(selectFrameIndices(0, 5)).toEqual([])
    expect(selectFrameIndices(5, 0)).toEqual([])
  })

  test("selected indices are strictly increasing and unique", () => {
    const idx = selectFrameIndices(50, 16)
    for (let i = 1; i < idx.length; i++) {
      const prev = idx[i - 1]
      const cur = idx[i]
      expect(prev).toBeDefined()
      expect(cur).toBeDefined()
      if (prev === undefined || cur === undefined) return
      expect(cur).toBeGreaterThan(prev)
    }
  })
})

describe("buildFrameExtractArgs", () => {
  test("extracts every frame to the out dir as zero-padded PNGs", () => {
    const args = buildFrameExtractArgs({ videoPath: "/tmp/clip.mp4", outDir: "/tmp/frames" })
    expect(args).toEqual(["-y", "-i", "/tmp/clip.mp4", "-vsync", "0", "/tmp/frames/frame_%05d.png"])
  })

  test("an fps override inserts an fps filter", () => {
    const args = buildFrameExtractArgs({ videoPath: "/tmp/c.mp4", outDir: "/tmp/f", fps: 8 })
    expect(args).toEqual([
      "-y",
      "-i",
      "/tmp/c.mp4",
      "-vf",
      "fps=8",
      "-vsync",
      "0",
      "/tmp/f/frame_%05d.png",
    ])
  })
})

describe("toPngDataUrl", () => {
  test("wraps bytes as a base64 image/png data URL", () => {
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47])
    expect(toPngDataUrl(bytes)).toBe(
      `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`
    )
  })
})

describe("buildVideoQaRequest", () => {
  test("carries the model, frames as image parts, and the checklist as the trailing text part", () => {
    const req = buildVideoQaRequest({
      model: MLX_VLM_MODEL,
      checklist: "Does the fabric fall by gravity, not morph?",
      imageDataUrls: ["data:image/png;base64,AAAA", "data:image/png;base64,BBBB"],
    })
    expect(req.model).toBe(MLX_VLM_MODEL)
    expect(req.max_tokens).toBe(VIDEO_QA_MAX_TOKENS)
    expect(req.temperature).toBe(0)
    expect(req.messages).toHaveLength(1)
    const [message] = req.messages
    expect(message).toBeDefined()
    if (message === undefined) return
    expect(message.role).toBe("user")
    expect(message.content).toHaveLength(3)
    expect(message.content[0]).toEqual({
      type: "image_url",
      image_url: { url: "data:image/png;base64,AAAA" },
    })
    expect(message.content[1]).toEqual({
      type: "image_url",
      image_url: { url: "data:image/png;base64,BBBB" },
    })
    expect(message.content[2]).toEqual({
      type: "text",
      text: "Does the fabric fall by gravity, not morph?",
    })
  })

  test("a custom maxTokens overrides the default", () => {
    const req = buildVideoQaRequest({
      model: MLX_VLM_MODEL,
      checklist: "x",
      imageDataUrls: ["data:image/png;base64,AAAA"],
      maxTokens: 256,
    })
    expect(req.max_tokens).toBe(256)
  })
})

describe("constants", () => {
  test("the pinned model is the Qwen3-VL MoE 4-bit", () => {
    expect(MLX_VLM_MODEL).toBe("mlx-community/Qwen3-VL-30B-A3B-Instruct-4bit")
  })

  test("the default frame count is 16", () => {
    expect(DEFAULT_FRAMES).toBe(16)
  })
})
