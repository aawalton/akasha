import { describe, expect, test } from "bun:test"
import {
  buildGeminiEditRequest,
  imageFormatForPath,
  imageMimeType,
  magickTranscodeArgs,
  parseGeminiImageResponse,
} from "./gemini-image-client"

describe("imageMimeType", () => {
  test("maps known extensions, defaults to png", () => {
    expect(imageMimeType("anchor.png")).toBe("image/png")
    expect(imageMimeType("/a/b/photo.JPG")).toBe("image/jpeg")
    expect(imageMimeType("x.jpeg")).toBe("image/jpeg")
    expect(imageMimeType("y.webp")).toBe("image/webp")
    expect(imageMimeType("noext")).toBe("image/png")
  })
})

describe("imageFormatForPath", () => {
  test("returns the lowercased extension, defaulting to png", () => {
    expect(imageFormatForPath("reward.png")).toBe("png")
    expect(imageFormatForPath("/a/b/out.PNG")).toBe("png")
    expect(imageFormatForPath("shot.jpg")).toBe("jpg")
    expect(imageFormatForPath("shot.JPEG")).toBe("jpeg")
    expect(imageFormatForPath("anim.webp")).toBe("webp")
    expect(imageFormatForPath("noext")).toBe("png")
  })
})

describe("magickTranscodeArgs", () => {
  test("reads stdin and writes the requested format to stdout", () => {
    expect(magickTranscodeArgs("png")).toEqual(["-", "png:-"])
    expect(magickTranscodeArgs("jpg")).toEqual(["-", "jpg:-"])
  })
})

describe("buildGeminiEditRequest", () => {
  test("carries prompt text, inline image, and both response modalities", () => {
    const body = buildGeminiEditRequest({
      prompt: "make it a sunset",
      imageBase64: "QUJD",
      mimeType: "image/png",
    })
    expect(body.contents).toEqual([
      {
        parts: [
          { text: "make it a sunset" },
          { inlineData: { mimeType: "image/png", data: "QUJD" } },
        ],
      },
    ])
    expect(body.generationConfig.responseModalities).toEqual(["TEXT", "IMAGE"])
  })

  test("single image: an empty referenceImages list is byte-for-byte identical to omitting it", () => {
    const without = buildGeminiEditRequest({
      prompt: "p",
      imageBase64: "QUJD",
      mimeType: "image/png",
    })
    const withEmpty = buildGeminiEditRequest({
      prompt: "p",
      imageBase64: "QUJD",
      mimeType: "image/png",
      referenceImages: [],
    })
    expect(withEmpty).toEqual(without)
  })

  test("no imageConfig: generationConfig omits the key entirely (EXPAND default)", () => {
    const body = buildGeminiEditRequest({ prompt: "p", imageBase64: "QUJD", mimeType: "image/png" })
    expect(body.generationConfig).toEqual({ responseModalities: ["TEXT", "IMAGE"] })
    expect("imageConfig" in body.generationConfig).toBe(false)
  })

  test("imageConfig present: threaded onto generationConfig.imageConfig", () => {
    const body = buildGeminiEditRequest({
      prompt: "p",
      imageBase64: "QUJD",
      mimeType: "image/png",
      imageConfig: { aspectRatio: "16:9", imageSize: "2K" },
    })
    expect(body.generationConfig).toEqual({
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: { aspectRatio: "16:9", imageSize: "2K" },
    })
  })

  test("imageConfig with only aspectRatio is carried verbatim", () => {
    const body = buildGeminiEditRequest({
      prompt: "p",
      imageBase64: "QUJD",
      mimeType: "image/png",
      imageConfig: { aspectRatio: "21:9" },
    })
    expect(body.generationConfig.imageConfig).toEqual({ aspectRatio: "21:9" })
  })

  test("multi image: reference images are appended as inlineData parts after the primary, in order", () => {
    const body = buildGeminiEditRequest({
      prompt: "lock identity to the anchor",
      imageBase64: "U0NFTkU=",
      mimeType: "image/png",
      referenceImages: [
        { imageBase64: "UkVGMQ==", mimeType: "image/jpeg" },
        { imageBase64: "UkVGMg==", mimeType: "image/webp" },
      ],
    })
    expect(body.contents).toEqual([
      {
        parts: [
          { text: "lock identity to the anchor" },
          { inlineData: { mimeType: "image/png", data: "U0NFTkU=" } },
          { inlineData: { mimeType: "image/jpeg", data: "UkVGMQ==" } },
          { inlineData: { mimeType: "image/webp", data: "UkVGMg==" } },
        ],
      },
    ])
    expect(body.generationConfig.responseModalities).toEqual(["TEXT", "IMAGE"])
  })
})

describe("parseGeminiImageResponse", () => {
  test("extracts the first inline image, decoding base64", () => {
    const data = Buffer.from("hello").toString("base64")
    const bytes = parseGeminiImageResponse({
      candidates: [{ content: { parts: [{ inlineData: { mimeType: "image/png", data } }] } }],
    })
    expect(Buffer.from(bytes).toString()).toBe("hello")
  })

  test("skips leading text parts and returns the image", () => {
    const data = Buffer.from("img").toString("base64")
    const bytes = parseGeminiImageResponse({
      candidates: [
        {
          content: {
            parts: [
              { text: "Here is your image:" },
              { inlineData: { mimeType: "image/png", data } },
            ],
          },
        },
      ],
    })
    expect(Buffer.from(bytes).toString()).toBe("img")
  })

  test("tolerates unknown extra keys (non-strict boundary)", () => {
    const data = Buffer.from("z").toString("base64")
    const bytes = parseGeminiImageResponse({
      candidates: [
        {
          finishReason: "STOP",
          content: { role: "model", parts: [{ inlineData: { mimeType: "image/png", data } }] },
        },
      ],
      usageMetadata: { totalTokenCount: 42 },
    })
    expect(Buffer.from(bytes).toString()).toBe("z")
  })

  test("throws when no inline image part is present", () => {
    expect(() =>
      parseGeminiImageResponse({ candidates: [{ content: { parts: [{ text: "refused" }] } }] })
    ).toThrow(/no inline image/)
  })

  test("throws on an unrecognized response shape", () => {
    expect(() => parseGeminiImageResponse({ candidates: "nope" })).toThrow(/unexpected Gemini/)
  })
})
