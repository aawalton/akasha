import { describe, expect, it } from "bun:test"
import {
  type ActiveQuest,
  formatConditionLine,
  normalizeStepText,
  pickActiveQuestHint,
  pickQuestHint,
  sortActiveQuests,
  stripTrailingCount,
} from "./active-quests"
import { formatProgressCount } from "./progress-format"

describe("pickQuestHint", () => {
  it("prefers the tracker override line when it is non-empty", () => {
    expect(pickQuestHint("Return to the Captain", "Talk to the Captain")).toBe(
      "Return to the Captain"
    )
  })

  it("falls back to the first objective when the override is empty", () => {
    expect(pickQuestHint("", "Talk to the Captain")).toBe("Talk to the Captain")
  })

  it("treats a whitespace-only override as empty and falls back to the objective", () => {
    expect(pickQuestHint("   ", "Talk to the Captain")).toBe("Talk to the Captain")
  })

  it("returns undefined when the override is empty and there is no objective", () => {
    expect(pickQuestHint("", undefined)).toBeUndefined()
  })

  it("trims surrounding whitespace from the override", () => {
    expect(pickQuestHint("  Board the ship  ", undefined)).toBe("Board the ship")
  })
})

describe("normalizeStepText", () => {
  it("returns the trimmed text when non-empty", () => {
    expect(normalizeStepText("  Talk to the Captain  ")).toBe("Talk to the Captain")
  })

  it("returns undefined for whitespace-only text", () => {
    expect(normalizeStepText("   ")).toBeUndefined()
  })

  it("returns undefined for empty text", () => {
    expect(normalizeStepText("")).toBeUndefined()
  })
})

describe("pickActiveQuestHint", () => {
  it("incomplete: prefers the tracker override over the first objective", () => {
    expect(
      pickActiveQuestHint(
        false,
        "Return to the Captain",
        "ignored step text",
        "Talk to the Captain"
      )
    ).toBe("Return to the Captain")
  })

  it("incomplete: falls back to the first objective when the override is empty", () => {
    expect(pickActiveQuestHint(false, "", "ignored step text", "Talk to the Captain")).toBe(
      "Talk to the Captain"
    )
  })

  it("incomplete: ignores the active step text and yields undefined with no objective", () => {
    expect(pickActiveQuestHint(false, "", "Long narrative step text", undefined)).toBeUndefined()
  })

  it("completed: prefers the tracker override for the turn-in step", () => {
    expect(
      pickActiveQuestHint(
        true,
        "Talk to Captain Kaleen",
        "Talk to Captain Kaleen at the docks",
        undefined
      )
    ).toBe("Talk to Captain Kaleen")
  })

  it("completed: falls back to the active step text when the override is empty", () => {
    expect(pickActiveQuestHint(true, "", "Talk to Captain Kaleen", undefined)).toBe(
      "Talk to Captain Kaleen"
    )
  })

  it("completed: ignores any stale first objective and uses the ending step text", () => {
    expect(pickActiveQuestHint(true, "", "Talk to Captain Kaleen", "Slay 5 bandits")).toBe(
      "Talk to Captain Kaleen"
    )
  })

  it("completed: undefined when neither override nor step text is present", () => {
    expect(pickActiveQuestHint(true, "  ", "   ", undefined)).toBeUndefined()
  })
})

describe("formatConditionLine", () => {
  it("returns the bare text for single objectives (max <= 1)", () => {
    expect(formatConditionLine("Talk to the Captain", 0, 1)).toBe("Talk to the Captain")
  })

  it("appends a counter for countable objectives (max > 1)", () => {
    expect(formatConditionLine("Bandits Slain", 2, 5)).toBe("Bandits Slain (2/5)")
  })

  it("trims surrounding whitespace from the condition text", () => {
    expect(formatConditionLine("  Collect Herbs  ", 0, 3)).toBe("Collect Herbs (0/3)")
  })

  it("returns empty string for whitespace-only text so the caller can skip it", () => {
    expect(formatConditionLine("   ", 0, 1)).toBe("")
  })

  it("strips ESO's embedded spaced count and re-appends the canonical form", () => {
    expect(formatConditionLine("Collect Heritance Bounty 0 / 10", 0, 10)).toBe(
      "Collect Heritance Bounty (0/10)"
    )
  })

  it("strips ESO's embedded bare count and re-appends the canonical form", () => {
    expect(formatConditionLine("Collect Heritance Bounty 0/10", 0, 10)).toBe(
      "Collect Heritance Bounty (0/10)"
    )
  })

  it("strips a half-spaced embedded count (slash spacing variance)", () => {
    expect(formatConditionLine("Collect Heritance Bounty 0/ 10", 0, 10)).toBe(
      "Collect Heritance Bounty (0/10)"
    )
    expect(formatConditionLine("Collect Heritance Bounty 0 /10", 0, 10)).toBe(
      "Collect Heritance Bounty (0/10)"
    )
  })

  it("strips an embedded count followed by a trailing ESO format code", () => {
    expect(formatConditionLine("Collect Heritance Bounty 0 / 10|r", 0, 10)).toBe(
      "Collect Heritance Bounty (0/10)"
    )
    expect(
      formatConditionLine("Collect Heritance Bounty 0 / 10|t16:16:/esoui/art/icon.dds|t", 0, 10)
    ).toBe("Collect Heritance Bounty (0/10)")
  })

  it("strips a comma-delimited embedded count and re-appends the canonical form", () => {
    expect(formatConditionLine("Gather Gold 1,000 / 2,000", 1000, 2000)).toBe(
      "Gather Gold (1000/2000)"
    )
  })

  it("strips a trailing label colon along with the embedded count", () => {
    expect(formatConditionLine("Steal Rare Gemstones: 4 / 7", 4, 7)).toBe(
      "Steal Rare Gemstones (4/7)"
    )
    expect(formatConditionLine("Steal Rare Gemstones: 4/7", 4, 7)).toBe(
      "Steal Rare Gemstones (4/7)"
    )
  })

  it("appends the canonical count when conditionText carries no embedded count", () => {
    expect(formatConditionLine("Bandits Slain", 2, 5)).toBe("Bandits Slain (2/5)")
  })

  it("does not strip a coincidental trailing number in the objective name", () => {
    expect(formatConditionLine("Reach District 7", 2, 5)).toBe("Reach District 7 (2/5)")
    expect(formatConditionLine("Reach District 5", 2, 5)).toBe("Reach District 5 (2/5)")
  })

  it("strips an embedded count but appends nothing for single objectives (max <= 1)", () => {
    expect(formatConditionLine("Defeat Boss 1 / 1", 1, 1)).toBe("Defeat Boss")
  })
})

describe("stripTrailingCount", () => {
  it("strips a trailing 'current / max' with spaces", () => {
    expect(stripTrailingCount("Steal Rare Gemstones: 4 / 7", 4, 7)).toBe("Steal Rare Gemstones")
  })

  it("strips a trailing 'current/max' without spaces", () => {
    expect(stripTrailingCount("Steal Rare Gemstones: 4/7", 4, 7)).toBe("Steal Rare Gemstones")
  })

  it("ignores surrounding whitespace", () => {
    expect(stripTrailingCount("  Collect Herbs 0 / 3  ", 0, 3)).toBe("Collect Herbs")
  })

  it("strips a comma-delimited trailing count", () => {
    expect(stripTrailingCount("Gather Gold 1,000 / 2,000", 1000, 2000)).toBe("Gather Gold")
  })

  it("strips a trailing count followed by an ESO format code", () => {
    expect(stripTrailingCount("Collect Heritance Bounty 0 / 10|r", 0, 10)).toBe(
      "Collect Heritance Bounty"
    )
  })

  it("leaves the text unchanged when the trailing numbers are not this objective's count", () => {
    expect(stripTrailingCount("Collect Herbs 1 / 9", 0, 3)).toBe("Collect Herbs 1 / 9")
  })

  it("leaves the text unchanged when there is no trailing count", () => {
    expect(stripTrailingCount("Bandits Slain", 2, 5)).toBe("Bandits Slain")
  })

  it("does not strip a count that appears mid-string with real text after it", () => {
    expect(stripTrailingCount("Defeat 2 / 5 then flee", 2, 5)).toBe("Defeat 2 / 5 then flee")
  })
})

describe("formatProgressCount", () => {
  it("appends the canonical parenthesized count to a label", () => {
    expect(formatProgressCount("Bandits Slain", 2, 5)).toBe("Bandits Slain (2/5)")
  })
})

describe("sortActiveQuests", () => {
  const q = (name: string): ActiveQuest => ({ name, hint: undefined, isAssisted: false })

  it("orders quests alphabetically by name", () => {
    const sorted = sortActiveQuests([q("Cadwell's Silver"), q("A Friend in Need"), q("Bolgrul")])
    expect(sorted.map((x) => x.name)).toEqual(["A Friend in Need", "Bolgrul", "Cadwell's Silver"])
  })

  it("is case-insensitive", () => {
    const sorted = sortActiveQuests([q("zebra"), q("Apple"), q("banana")])
    expect(sorted.map((x) => x.name)).toEqual(["Apple", "banana", "zebra"])
  })

  it("does not mutate the input array", () => {
    const input: ActiveQuest[] = [q("B"), q("A")]
    sortActiveQuests(input)
    expect(input.map((x) => x.name)).toEqual(["B", "A"])
  })
})
