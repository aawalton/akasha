import { describe, expect, test } from "bun:test"
import { parseCompletionOverrideRow } from "./completion-override-row"

const CHARACTER_ID = "01970000-0000-7000-8000-aaaaaaaaaaaa"

const validRow = () => ({
  id: "01970000-0000-7000-8000-bbbbbbbbbbbb",
  character: CHARACTER_ID,
  completionCardId: "skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  floor: 1,
  reason: "ESO under-reports the Folium Discognitum skill point.",
})

describe("parseCompletionOverrideRow", () => {
  test("parses a well-formed override row", () => {
    const parsed = parseCompletionOverrideRow(validRow())
    expect(parsed).not.toBeNull()
    expect(parsed?.characterId).toBe(CHARACTER_ID)
    expect(parsed?.override).toEqual({
      completionCardId: "skill-points",
      completionItemPath: ["general", "foliumDiscognitum"],
      floor: 1,
    })
  })

  test("reads the `character` relation as a bare target page-id string", () => {
    expect(
      parseCompletionOverrideRow({ ...validRow(), character: { id: CHARACTER_ID } })
    ).toBeNull()
    expect(parseCompletionOverrideRow({ ...validRow(), character: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...validRow(), character: "" })).toBeNull()
  })

  test("returns null for missing or non-string completionCardId", () => {
    expect(parseCompletionOverrideRow({ ...validRow(), completionCardId: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...validRow(), completionCardId: 42 })).toBeNull()
    expect(parseCompletionOverrideRow({ ...validRow(), completionCardId: "" })).toBeNull()
  })

  test("accepts numeric and string path segments", () => {
    const parsed = parseCompletionOverrideRow({
      ...validRow(),
      completionItemPath: ["skyshards", 5],
    })
    expect(parsed?.override.completionItemPath).toEqual(["skyshards", 5])
  })

  test("returns null when completionItemPath is not an array of string|number", () => {
    expect(parseCompletionOverrideRow({ ...validRow(), completionItemPath: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...validRow(), completionItemPath: "general" })).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...validRow(), completionItemPath: ["general", { x: 1 }] })
    ).toBeNull()
  })

  test("accepts an empty completionItemPath array", () => {
    expect(
      parseCompletionOverrideRow({ ...validRow(), completionItemPath: [] })?.override
        .completionItemPath
    ).toEqual([])
  })

  test("returns null for missing or non-finite floor", () => {
    expect(parseCompletionOverrideRow({ ...validRow(), floor: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...validRow(), floor: "1" })).toBeNull()
    expect(parseCompletionOverrideRow({ ...validRow(), floor: Number.NaN })).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...validRow(), floor: Number.POSITIVE_INFINITY })
    ).toBeNull()
  })

  test("accepts floor of 0", () => {
    expect(parseCompletionOverrideRow({ ...validRow(), floor: 0 })?.override.floor).toBe(0)
  })
})
