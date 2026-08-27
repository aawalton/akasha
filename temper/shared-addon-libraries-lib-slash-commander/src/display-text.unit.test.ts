import { describe, expect, test } from "bun:test"
import { keepDisplayTexts } from "./display-text"

describe("keepDisplayTexts", () => {
  test("drops nil/undefined entries (the on-load SetText crash)", () => {
    expect(keepDisplayTexts([undefined])).toEqual([])
    expect(keepDisplayTexts(["/wave", undefined, "/say"])).toEqual(["/wave", "/say"])
  })

  test("drops non-string entries (number / boolean / table)", () => {
    expect(keepDisplayTexts([5, true, {}, "/zone"])).toEqual(["/zone"])
  })

  test("drops empty-string entries", () => {
    expect(keepDisplayTexts(["", "/group", ""])).toEqual(["/group"])
  })

  test("passes a clean all-string list through unchanged and in order", () => {
    expect(keepDisplayTexts(["/a", "/b", "/c"])).toEqual(["/a", "/b", "/c"])
  })

  test("returns an empty array for an empty list", () => {
    expect(keepDisplayTexts([])).toEqual([])
  })
})
