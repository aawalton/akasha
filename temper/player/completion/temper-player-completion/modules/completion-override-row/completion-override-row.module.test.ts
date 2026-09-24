import { describe, expect, test } from "bun:test"
import {
  COMPLETION_CARD_PAGE_TYPE,
  completionCardAddress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-page/completion-card-page.module.test-fixtures.ts"
import { parseCompletionOverrideRow } from "akasha/temper/player/completion/temper-player-completion/modules/completion-override-row/completion-override-row.module.code.ts"

const CHARACTER_ID = "01970000-0000-7000-8000-aaaaaaaaaaaa"

const wellFormedRow = () => ({
  id: "01970000-0000-7000-8000-bbbbbbbbbbbb",
  character: CHARACTER_ID,
  completionCard: completionCardAddress("skill-points"),
  completionItemPath: ["general", "foliumDiscognitum"],
  floor: 1,
  reason: "ESO under-reports the Folium Discognitum skill point.",
})

describe("parseCompletionOverrideRow", () => {
  test("parses a well-formed override row", () => {
    const parsed = parseCompletionOverrideRow(wellFormedRow())
    expect(parsed).not.toBeNull()
    expect(parsed?.characterId).toBe(CHARACTER_ID)
    expect(parsed?.override).toEqual({
      completionCardId: "skill-points",
      completionItemPath: ["general", "foliumDiscognitum"],
      floor: 1,
    })
  })

  test("reads the character relation as a bare target page id string", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), character: { id: CHARACTER_ID } })
    ).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), character: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), character: "" })).toBeNull()
  })

  test("reads a character named by a qualified address as the slug in it", () => {
    const parsed = parseCompletionOverrideRow({
      ...wellFormedRow(),
      character: "temper-account-character/character-a",
    })
    expect(parsed?.characterId).toBe("character-a")
  })

  test("returns null for a missing or non-string completionCard", () => {
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), completionCard: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), completionCard: 42 })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), completionCard: "" })).toBeNull()
  })

  test("reads the card a row names by an address as the card that page is", () => {
    expect(
      parseCompletionOverrideRow({
        ...wellFormedRow(),
        completionCard: completionCardAddress("guild-sales"),
      })?.override.completionCardId
    ).toBe("guild-sales")
  })

  test("returns null for an address no completion card answers to", () => {
    expect(
      parseCompletionOverrideRow({
        ...wellFormedRow(),
        completionCard: `${COMPLETION_CARD_PAGE_TYPE}/not-a-card`,
      })
    ).toBeNull()
  })

  test("accepts numeric and string path segments", () => {
    const parsed = parseCompletionOverrideRow({
      ...wellFormedRow(),
      completionItemPath: ["skyshards", 5],
    })
    expect(parsed?.override.completionItemPath).toEqual(["skyshards", 5])
  })

  test("returns null when completionItemPath is not an array of string or number", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: undefined })
    ).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: "general" })
    ).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: ["general", { x: 1 }] })
    ).toBeNull()
  })

  test("accepts an empty completionItemPath array", () => {
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), completionItemPath: [] })?.override
        .completionItemPath
    ).toEqual([])
  })

  test("returns null for a missing or non-finite floor", () => {
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: undefined })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: "1" })).toBeNull()
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: Number.NaN })).toBeNull()
    expect(
      parseCompletionOverrideRow({ ...wellFormedRow(), floor: Number.POSITIVE_INFINITY })
    ).toBeNull()
  })

  test("accepts a floor of 0", () => {
    expect(parseCompletionOverrideRow({ ...wellFormedRow(), floor: 0 })?.override.floor).toBe(0)
  })
})
