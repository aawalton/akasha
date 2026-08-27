import { describe, expect, it } from "bun:test"
import { type AutoQuestTraceEntry, rootSchema, traceEntrySchema } from "./saved-variables-schema"

const MENU_ENTRY: AutoQuestTraceEntry = {
  kind: "menu",
  at: 1_000,
  interactionType: 1,
  offerPending: true,
  pendingCompletion: false,
  options: [
    {
      index: 1,
      optionType: 1,
      kind: "accept-offer",
      important: true,
      chosenBefore: false,
      text: "Accept the quest",
    },
  ],
  decision: "select 1 (accept-offer)",
}

const ACTION_ENTRY: AutoQuestTraceEntry = {
  kind: "action",
  at: 1_250,
  action: "select 1 (accept-offer)",
}

const COMPLETE_DIALOG_ENTRY: AutoQuestTraceEntry = {
  kind: "complete-dialog",
  at: 2_000,
  journalIndex: 7,
  numRewards: 2,
}

const ENRICHED_MENU_ENTRY: AutoQuestTraceEntry = {
  kind: "menu",
  at: 1_000,
  interactionType: 14,
  interactionTypeName: "INTERACTION_QUEST",
  offerPending: true,
  pendingCompletion: false,
  options: [
    {
      index: 1,
      optionType: 30,
      optionTypeName: "CHATTER_START_COMPLETE_QUEST",
      kind: "accept-offer",
      important: true,
      chosenBefore: false,
      text: "Accept the quest",
    },
  ],
  decision: "select 1 (accept-offer)",
}

const KNOWN_ENTRIES: AutoQuestTraceEntry[] = [MENU_ENTRY, ACTION_ENTRY, COMPLETE_DIALOG_ENTRY]

describe("traceEntrySchema", () => {
  it("round-trips each entry kind", () => {
    expect(traceEntrySchema.parse(MENU_ENTRY)).toEqual(MENU_ENTRY)
    expect(traceEntrySchema.parse(ACTION_ENTRY)).toEqual(ACTION_ENTRY)
    expect(traceEntrySchema.parse(COMPLETE_DIALOG_ENTRY)).toEqual(COMPLETE_DIALOG_ENTRY)
  })

  it("rejects an extra field on an entry (.strict() boundary)", () => {
    expect(() => traceEntrySchema.parse({ ...ACTION_ENTRY, drift: 1 })).toThrow()
  })

  it("rejects an extra field on a menu option (.strict() boundary)", () => {
    expect(() =>
      traceEntrySchema.parse({
        ...MENU_ENTRY,
        options: [{ ...MENU_ENTRY.options[0], drift: 1 }],
      })
    ).toThrow()
  })

  it("rejects an unknown discriminant kind", () => {
    expect(() => traceEntrySchema.parse({ kind: "bogus", at: 1 })).toThrow()
  })

  it("round-trips a menu entry carrying resolved interactionTypeName / optionTypeName", () => {
    expect(traceEntrySchema.parse(ENRICHED_MENU_ENTRY)).toEqual(ENRICHED_MENU_ENTRY)
  })

  it("accepts a pre-enrichment menu entry that omits the resolved-name fields", () => {
    expect(traceEntrySchema.parse(MENU_ENTRY)).toEqual(MENU_ENTRY)
  })
})

describe("rootSchema", () => {
  it("walks Default → @<account> → $AccountWide → autoQuestDebugTrace", () => {
    const out = rootSchema.parse({
      Default: { "@alanwalton": { $AccountWide: { autoQuestDebugTrace: KNOWN_ENTRIES } } },
    })
    expect(out.Default?.["@alanwalton"]?.$AccountWide?.autoQuestDebugTrace).toEqual(KNOWN_ENTRIES)
  })

  it("normalizes a Lua integer-keyed table into an entry array", () => {
    const out = rootSchema.parse({
      Default: {
        "@alanwalton": {
          $AccountWide: {
            autoQuestDebugTrace: { "1": ACTION_ENTRY, "2": COMPLETE_DIALOG_ENTRY },
          },
        },
      },
    })
    expect(out.Default?.["@alanwalton"]?.$AccountWide?.autoQuestDebugTrace).toEqual([
      ACTION_ENTRY,
      COMPLETE_DIALOG_ENTRY,
    ])
  })

  it("accepts a $AccountWide block with no trace key", () => {
    const out = rootSchema.parse({ Default: { "@alanwalton": { $AccountWide: {} } } })
    expect(out.Default?.["@alanwalton"]?.$AccountWide?.autoQuestDebugTrace).toBeUndefined()
  })

  it("passes unknown sibling keys through the envelope (.passthrough())", () => {
    const out = rootSchema.parse({
      Default: { "@alanwalton": { $AccountWide: { tasks: {}, perf: { loadTimeMs: 5 } } } },
      futureRootField: 42,
    })
    expect(out.Default?.["@alanwalton"]?.$AccountWide?.autoQuestDebugTrace).toBeUndefined()
  })
})
