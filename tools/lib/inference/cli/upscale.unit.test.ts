import { describe, expect, test } from "bun:test"
import { buildUpscaleScriptArgs } from "./upscale"

describe("buildUpscaleScriptArgs", () => {
  test("the positional args: input-name, output-name, resolution, seed", () => {
    expect(
      buildUpscaleScriptArgs({
        inName: "upscale-in-1.png",
        outName: "upscale-out-1.png",
        resolution: 1460,
        seed: 12345,
      })
    ).toEqual(["upscale-in-1.png", "upscale-out-1.png", "1460", "12345"])
  })

  test("seed 0 is carried (no truthiness foot-gun)", () => {
    const args = buildUpscaleScriptArgs({ inName: "i", outName: "o", resolution: 1440, seed: 0 })
    expect(args).toEqual(["i", "o", "1440", "0"])
  })
})
