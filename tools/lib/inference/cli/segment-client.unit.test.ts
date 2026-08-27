import { describe, expect, test } from "bun:test"
import { buildSegmentFields, deriveSiblingPath } from "./segment-client"

describe("buildSegmentFields", () => {
  test("matte request carries output/model/alpha_matting, no bgcolor", () => {
    expect(
      buildSegmentFields({ output: "matte", model: "birefnet-portrait", alphaMatting: false })
    ).toEqual({
      output: "matte",
      model: "birefnet-portrait",
      alpha_matting: "false",
    })
  })

  test("alpha matting toggles the stringified flag", () => {
    expect(
      buildSegmentFields({ output: "cutout", model: "birefnet-general", alphaMatting: true })
    ).toEqual({
      output: "cutout",
      model: "birefnet-general",
      alpha_matting: "true",
    })
  })

  test("flatten includes bgcolor only when provided", () => {
    expect(
      buildSegmentFields({
        output: "flatten",
        model: "birefnet-portrait",
        alphaMatting: false,
        bgColor: "#000000",
      })
    ).toEqual({
      output: "flatten",
      model: "birefnet-portrait",
      alpha_matting: "false",
      bgcolor: "#000000",
    })
  })
})

describe("deriveSiblingPath", () => {
  test("inserts the suffix before the extension", () => {
    expect(deriveSiblingPath("/p/segment-12.png", "cutout")).toBe("/p/segment-12-cutout.png")
    expect(deriveSiblingPath("/tmp/erin-matte.png", "flat")).toBe("/tmp/erin-matte-flat.png")
  })

  test("appends a .png extension when the matte path has none", () => {
    expect(deriveSiblingPath("/p/segment-12", "cutout")).toBe("/p/segment-12-cutout.png")
  })
})
