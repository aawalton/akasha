import { describe, expect, it } from "bun:test"

import {
  ALL_CLASS_LINES,
  DK_ARDENT_FLAME,
  DK_CLASS_LINES,
  DK_DRACONIC_POWER,
  MORPHABLE_LINE_DISPLAY_ORDERS,
  SORC_DARK_MAGIC,
  VAMPIRE,
} from "./_select-morph-suggestions-test-helpers"
import { pickRelevantSkillLineIds } from "./select-morph-suggestions"

describe("pickRelevantSkillLineIds", () => {
  it("returns the single line from taskItemPath without applying class/morphable filters", () => {
    const result = pickRelevantSkillLineIds({
      taskItemPath: [SORC_DARK_MAGIC],
      skillLineKeys: [DK_ARDENT_FLAME],
      classLineEsoIds: ALL_CLASS_LINES,
      playerClassLineEsoIds: DK_CLASS_LINES,
      morphableLineDisplayOrders: MORPHABLE_LINE_DISPLAY_ORDERS,
    })
    expect(result).toEqual([SORC_DARK_MAGIC])
  })

  it("returns the same single line when path includes a skill suffix", () => {
    const result = pickRelevantSkillLineIds({
      taskItemPath: [DK_ARDENT_FLAME, 12345],
      skillLineKeys: [DK_ARDENT_FLAME, DK_DRACONIC_POWER],
      classLineEsoIds: ALL_CLASS_LINES,
      playerClassLineEsoIds: DK_CLASS_LINES,
      morphableLineDisplayOrders: MORPHABLE_LINE_DISPLAY_ORDERS,
    })
    expect(result).toEqual([DK_ARDENT_FLAME])
  })

  it("drops other-class lines and non-morphable lines without a path", () => {
    const result = pickRelevantSkillLineIds({
      skillLineKeys: [DK_ARDENT_FLAME, SORC_DARK_MAGIC, 99999],
      classLineEsoIds: ALL_CLASS_LINES,
      playerClassLineEsoIds: DK_CLASS_LINES,
      morphableLineDisplayOrders: MORPHABLE_LINE_DISPLAY_ORDERS,
    })
    expect(result).toEqual([DK_ARDENT_FLAME])
  })

  it("drops every class line when playerClassLineEsoIds is empty (unknown class)", () => {
    const result = pickRelevantSkillLineIds({
      skillLineKeys: [DK_ARDENT_FLAME, SORC_DARK_MAGIC, VAMPIRE],
      classLineEsoIds: ALL_CLASS_LINES,
      playerClassLineEsoIds: new Set<number>(),
      morphableLineDisplayOrders: MORPHABLE_LINE_DISPLAY_ORDERS,
    })
    expect(result).toEqual([VAMPIRE])
  })
})
