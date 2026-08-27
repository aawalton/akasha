import { describe, expect, test } from "bun:test"
import {
  buildGenerationBody,
  GEN_SIZE_MAX,
  GEN_SIZE_MIN,
  GEN_SIZE_MULTIPLE,
  parseGenerationSize,
  parseSize,
} from "./mlx-image-client"

describe("buildGenerationBody", () => {
  test("carries model, prompt, size, and seed", () => {
    expect(
      buildGenerationBody({
        model: "Tongyi-MAI/Z-Image-Turbo",
        prompt: "a leaf",
        size: "1024x1024",
        seed: 7,
      })
    ).toEqual({ model: "Tongyi-MAI/Z-Image-Turbo", prompt: "a leaf", size: "1024x1024", seed: 7 })
  })

  test("seed 0 is carried (no truthiness foot-gun)", () => {
    expect(buildGenerationBody({ model: "m", prompt: "p", size: "512x512", seed: 0 }).seed).toBe(0)
  })

  test("forwards guidance as guidance_scale and steps for the base pipeline", () => {
    expect(
      buildGenerationBody({
        model: "Tongyi-MAI/Z-Image",
        prompt: "a leaf",
        size: "1024x1024",
        seed: 7,
        guidance: 4,
        steps: 50,
      })
    ).toEqual({
      model: "Tongyi-MAI/Z-Image",
      prompt: "a leaf",
      size: "1024x1024",
      seed: 7,
      guidance_scale: 4,
      steps: 50,
    })
  })

  test("guidance 0 is carried as guidance_scale (no truthiness foot-gun)", () => {
    expect(
      buildGenerationBody({ model: "m", prompt: "p", size: "512x512", seed: 0, guidance: 0 })
        .guidance_scale
    ).toBe(0)
  })

  test("omits guidance_scale and steps when unset (turbo body unchanged)", () => {
    const body = buildGenerationBody({
      model: "Tongyi-MAI/Z-Image-Turbo",
      prompt: "a leaf",
      size: "1024x1024",
      seed: 7,
    })
    expect("guidance_scale" in body).toBe(false)
    expect("steps" in body).toBe(false)
  })
})

describe("parseSize", () => {
  test("parses WxH", () => {
    expect(parseSize("1024x1024")).toEqual({ width: 1024, height: 1024 })
    expect(parseSize("256x512")).toEqual({ width: 256, height: 512 })
  })

  test("rejects a malformed size", () => {
    expect(() => parseSize("big")).toThrow()
    expect(() => parseSize("1024")).toThrow()
  })
})

describe("parseGenerationSize", () => {
  test("accepts the legacy square sizes", () => {
    expect(parseGenerationSize("256x256")).toEqual({ width: 256, height: 256 })
    expect(parseGenerationSize("512x512")).toEqual({ width: 512, height: 512 })
    expect(parseGenerationSize("1024x1024")).toEqual({ width: 1024, height: 1024 })
  })

  test("accepts non-square sizes within bounds and aligned to the multiple", () => {
    expect(parseGenerationSize("832x1216")).toEqual({ width: 832, height: 1216 })
    expect(parseGenerationSize("1216x832")).toEqual({ width: 1216, height: 832 })
    expect(parseGenerationSize("768x1024")).toEqual({ width: 768, height: 1024 })
  })

  test("rejects a malformed size", () => {
    expect(() => parseGenerationSize("big")).toThrow()
    expect(() => parseGenerationSize("1024")).toThrow()
  })

  test("rejects a dimension below the minimum", () => {
    expect(() => parseGenerationSize(`128x${GEN_SIZE_MIN}`)).toThrow()
  })

  test("rejects a dimension above the maximum", () => {
    expect(() => parseGenerationSize(`${GEN_SIZE_MAX + GEN_SIZE_MULTIPLE}x1024`)).toThrow()
  })

  test("rejects a dimension not divisible by the alignment multiple", () => {
    expect(() => parseGenerationSize("820x1024")).toThrow()
    expect(() => parseGenerationSize("1024x900")).toThrow()
  })
})
