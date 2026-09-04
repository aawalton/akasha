import { describe, expect, test } from "bun:test"
import {
  AUTO_QUEST_TRACE_ENTRY,
  TEMPER_QUESTS_SAVED_VARIABLES,
} from "./auto-quest-trace.module.code.ts"

describe("auto-quest-trace", () => {
  test("a menu entry keeps every option the addon listed", () => {
    const parsed = AUTO_QUEST_TRACE_ENTRY.parse({
      kind: "menu",
      at: 1717,
      interactionType: 3,
      offerPending: true,
      pendingCompletion: false,
      options: [
        {
          index: 1,
          optionType: 2,
          kind: "accept",
          important: true,
          chosenBefore: false,
          text: "I will help.",
        },
      ],
      decision: "accept",
    })
    expect(parsed.kind).toBe("menu")
    if (parsed.kind !== "menu") return
    expect(parsed.options).toHaveLength(1)
    expect(parsed.options[0]?.text).toBe("I will help.")
  })

  test("an action entry carries only its action", () => {
    const parsed = AUTO_QUEST_TRACE_ENTRY.parse({ kind: "action", at: 12, action: "advance" })
    expect(parsed).toEqual({ kind: "action", at: 12, action: "advance" })
  })

  test("a field the kind never names is refused", () => {
    expect(() =>
      AUTO_QUEST_TRACE_ENTRY.parse({ kind: "action", at: 12, action: "advance", extra: 1 })
    ).toThrow()
  })

  test("a trace the addon never wrote reads back as no entries", () => {
    const parsed = TEMPER_QUESTS_SAVED_VARIABLES.parse({
      Default: { "@someone": { $AccountWide: {} } },
    })
    expect(parsed.Default?.["@someone"]?.$AccountWide?.autoQuestDebugTrace).toBeUndefined()
  })

  test("a saved-variables table keeps a field beyond the trace", () => {
    const parsed = TEMPER_QUESTS_SAVED_VARIABLES.parse({
      Default: { "@someone": { $AccountWide: { autoQuestDebugTrace: [], somethingElse: 4 } } },
      Version: 1,
    })
    expect(parsed.Default?.["@someone"]?.$AccountWide?.autoQuestDebugTrace).toEqual([])
  })
})
