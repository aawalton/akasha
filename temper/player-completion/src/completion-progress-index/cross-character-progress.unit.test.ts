import { describe, expect, it } from "bun:test"
import {
  buildCrossCharacterCompletionIndex,
  buildCrossCharacterEntryHref,
  materializeCrossCharacterProgress,
} from "../completion-progress-index"
import { CHAR_EMPTY, CHAR_FULL, CHAR_PARTIAL } from "./character-fixtures"
import { EMPTY_ACCOUNT, mkRosterEntry } from "./roster-fixtures"

describe("buildCrossCharacterEntryHref", () => {
  it("builds the Characters-tab deep link pre-filtered to the character and card", () => {
    expect(
      buildCrossCharacterEntryHref("019dbae0-aaaa-7747-bc83-000000000001", "mount-training")
    ).toBe(
      "/completion?tab=characters&character=019dbae0-aaaa-7747-bc83-000000000001&scrollTo=mount-training"
    )
  })

  it("URL-encodes character ids that contain special characters", () => {
    expect(buildCrossCharacterEntryHref("a/b c?d", "mount-training")).toBe(
      "/completion?tab=characters&character=a%2Fb%20c%3Fd&scrollTo=mount-training"
    )
  })
})

describe("materializeCrossCharacterProgress", () => {
  it("round-trips a built slim index back to the full legacy shape with derived hrefs", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL),
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const full = materializeCrossCharacterProgress(idx, "mount-training")
    expect(full).toEqual({
      current: 30,
      total: 360,
      activeEntryKey: "c1",
      entries: {
        c1: {
          current: 30,
          total: 180,
          sortOrder: 1,
          label: "Alpha",
          href: "/completion?tab=characters&character=c1&scrollTo=mount-training",
        },
        c2: {
          current: 0,
          total: 180,
          sortOrder: 2,
          label: "Beta",
          href: "/completion?tab=characters&character=c2&scrollTo=mount-training",
        },
      },
    })
  })

  it("derives scrollTo from the cardId only for sub-path keys (not the joined path)", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL)]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const full = materializeCrossCharacterProgress(idx, "mount-training/speed")
    if (full === null) throw new Error("mount-training/speed missing")
    expect(full.entries.c1?.href).toBe(
      "/completion?tab=characters&character=c1&scrollTo=mount-training"
    )
    expect(full.entries.c1?.current).toBe(30)
    expect(full.entries.c1?.total).toBe(60)
  })

  it("URL-encodes character ids in derived hrefs", () => {
    const roster = [mkRosterEntry("a/b c?d", "Weird", 1, CHAR_PARTIAL)]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const full = materializeCrossCharacterProgress(idx, "mount-training")
    if (full === null) throw new Error("mount-training missing")
    expect(full.entries["a/b c?d"]?.href).toBe(
      "/completion?tab=characters&character=a%2Fb%20c%3Fd&scrollTo=mount-training"
    )
  })

  it("omits activeEntryKey when the slim entry has none", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_FULL)]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const full = materializeCrossCharacterProgress(idx, "mount-training")
    if (full === null) throw new Error("mount-training missing")
    expect(full.activeEntryKey).toBeUndefined()
  })

  it("returns null when the pathKey is absent", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL)]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(materializeCrossCharacterProgress(idx, "no-such-card")).toBeNull()
  })

  it("returns null for the old flat-shaped stored index (pre-deploy transition tolerance)", () => {
    const legacyFlat: unknown = {
      "mount-training": {
        current: 30,
        total: 180,
        activeEntryKey: "c1",
        entries: {
          c1: { current: 30, total: 180, sortOrder: 1, label: "Alpha", href: "/x" },
        },
      },
    }
    expect(materializeCrossCharacterProgress(legacyFlat, "mount-training")).toBeNull()
  })

  it("returns null for non-container inputs", () => {
    expect(materializeCrossCharacterProgress(null, "mount-training")).toBeNull()
    expect(materializeCrossCharacterProgress(undefined, "mount-training")).toBeNull()
    expect(materializeCrossCharacterProgress("nope", "mount-training")).toBeNull()
    expect(materializeCrossCharacterProgress(42, "mount-training")).toBeNull()
  })

  it("falls back when a character is missing from the characters map", () => {
    const container: unknown = {
      characters: {},
      paths: {
        "mount-training": {
          current: 1,
          total: 2,
          entries: { ghost: { current: 1, total: 2 } },
        },
      },
    }
    const full = materializeCrossCharacterProgress(container, "mount-training")
    if (full === null) throw new Error("mount-training missing")
    const ghost = full.entries.ghost
    if (!ghost) throw new Error("ghost entry missing")
    expect(ghost.current).toBe(1)
    expect(ghost.total).toBe(2)
    expect(ghost.sortOrder).toBe(Number.MAX_SAFE_INTEGER)
    expect(ghost.label).toBeUndefined()
    expect(ghost.href).toBe("/completion?tab=characters&character=ghost&scrollTo=mount-training")
  })
})
