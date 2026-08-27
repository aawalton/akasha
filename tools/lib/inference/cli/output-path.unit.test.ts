import { describe, expect, test } from "bun:test"
import { homedir } from "node:os"
import { join } from "node:path"
import { resolveOutputPath } from "./output-path"

describe("resolveOutputPath", () => {
  test("an explicit path wins regardless of operation or timestamp", () => {
    expect(resolveOutputPath("generate", "/tmp/leaf.png", 1_700_000_000_000)).toBe("/tmp/leaf.png")
    expect(resolveOutputPath("upscale", "out.png", 0)).toBe("out.png")
  })

  test("the default lands in ~/Pictures/Generated keyed by operation", () => {
    const base = join(homedir(), "Pictures", "Generated")
    expect(resolveOutputPath("generate", undefined, 1_700_000_000_000)).toBe(
      join(base, "generate-1700000000.png")
    )
    expect(resolveOutputPath("edit", undefined, 1_700_000_000_000)).toBe(
      join(base, "edit-1700000000.png")
    )
    expect(resolveOutputPath("upscale", undefined, 1_700_000_000_000)).toBe(
      join(base, "upscale-1700000000.png")
    )
    expect(resolveOutputPath("fill", undefined, 1_700_000_000_000)).toBe(
      join(base, "fill-1700000000.png")
    )
  })

  test("voice-design defaults to a .wav in the same directory", () => {
    const base = join(homedir(), "Pictures", "Generated")
    expect(resolveOutputPath("voice-design", undefined, 1_700_000_000_000)).toBe(
      join(base, "voice-design-1700000000.wav")
    )
    expect(resolveOutputPath("voice-design", "/tmp/clip.wav", 0)).toBe("/tmp/clip.wav")
  })

  test("voice-clone defaults to a .wav in the same directory", () => {
    const base = join(homedir(), "Pictures", "Generated")
    expect(resolveOutputPath("voice-clone", undefined, 1_700_000_000_000)).toBe(
      join(base, "voice-clone-1700000000.wav")
    )
    expect(resolveOutputPath("voice-clone", "/tmp/cloned.wav", 0)).toBe("/tmp/cloned.wav")
  })

  test("the timestamp is whole seconds derived from nowMs (sub-second truncated)", () => {
    const path = resolveOutputPath("generate", undefined, 1_700_000_000_999)
    expect(path.endsWith("generate-1700000000.png")).toBe(true)
  })

  test("segment defaults to a .png matte in ~/Pictures/Generated", () => {
    const base = join(homedir(), "Pictures", "Generated")
    expect(resolveOutputPath("segment", undefined, 1_700_000_000_000)).toBe(
      join(base, "segment-1700000000.png")
    )
    expect(resolveOutputPath("segment", "/tmp/matte.png", 0)).toBe("/tmp/matte.png")
  })
})
