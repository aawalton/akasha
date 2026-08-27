import { describe, expect, it } from "bun:test"
import { formatActionLabel, getActionVerbLabel } from "./inventory-rule-action-labels"
import type { ItemAction } from "./inventory-rule-types"

describe("getActionVerbLabel", () => {
  const cases: Array<[ItemAction, string]> = [
    ["nothing", "Keep"],
    ["lock", "Lock"],
    ["unlock", "Unlock"],
    ["sell", "Sell"],
    ["fence-sell", "Fence"],
    ["fence-launder", "Launder"],
    ["list", "List"],
    ["deconstruct", "Deconstruct"],
    ["research", "Research"],
    ["use", "Use"],
    ["open", "Open"],
    ["destroy", "Destroy"],
    ["move-to", "Move"],
    ["character-equip", "Equip"],
    ["companion-equip", "Equip Companion"],
    ["stock", "Stock"],
    ["mail", "Mail"],
  ]

  for (const [action, label] of cases) {
    it(`returns "${label}" for action "${action}"`, () => {
      expect(getActionVerbLabel(action)).toBe(label)
    })
  }
})

describe("formatActionLabel", () => {
  describe("verb-only actions ignore destinationLabel", () => {
    const verbOnly: Array<[ItemAction, string]> = [
      ["nothing", "Keep"],
      ["lock", "Lock"],
      ["unlock", "Unlock"],
      ["sell", "Sell"],
      ["fence-sell", "Fence"],
      ["fence-launder", "Launder"],
      ["list", "List"],
      ["deconstruct", "Deconstruct"],
      ["research", "Research"],
      ["open", "Open"],
      ["destroy", "Destroy"],
    ]
    for (const [action, label] of verbOnly) {
      it(`renders "${label}" for "${action}" even with a destinationLabel`, () => {
        expect(formatActionLabel({ action })).toBe(label)
        expect(formatActionLabel({ action, destinationLabel: "Bank" })).toBe(label)
      })
    }
  })

  describe("move-to", () => {
    it("appends destinationLabel as 'Move to <X>'", () => {
      expect(formatActionLabel({ action: "move-to", destinationLabel: "Bank" })).toBe(
        "Move to Bank"
      )
      expect(formatActionLabel({ action: "move-to", destinationLabel: "Guild Bank" })).toBe(
        "Move to Guild Bank"
      )
      expect(formatActionLabel({ action: "move-to", destinationLabel: "Char-X" })).toBe(
        "Move to Char-X"
      )
    })

    it("falls back to bare verb when destinationLabel is missing", () => {
      expect(formatActionLabel({ action: "move-to" })).toBe("Move")
    })

    it("renders 'Keep on <X>' when atDestination is true (item already at target)", () => {
      expect(
        formatActionLabel({
          action: "move-to",
          destinationLabel: "Erin Solstice",
          atDestination: true,
        })
      ).toBe("Keep on Erin Solstice")
      expect(
        formatActionLabel({ action: "move-to", destinationLabel: "Bank", atDestination: true })
      ).toBe("Keep on Bank")
    })

    it("keeps 'Move to <X>' when atDestination is false or absent", () => {
      expect(
        formatActionLabel({ action: "move-to", destinationLabel: "Bank", atDestination: false })
      ).toBe("Move to Bank")
      expect(formatActionLabel({ action: "move-to", destinationLabel: "Bank" })).toBe(
        "Move to Bank"
      )
    })

    it("falls back to bare verb when destinationLabel is missing even if atDestination is true", () => {
      expect(formatActionLabel({ action: "move-to", atDestination: true })).toBe("Move")
    })
  })

  describe("character-equip", () => {
    it("renders 'Equip on <Char>' when destinationLabel resolves a character", () => {
      expect(formatActionLabel({ action: "character-equip", destinationLabel: "Char-X" })).toBe(
        "Equip on Char-X"
      )
    })

    it("falls back to bare verb when destinationLabel is missing", () => {
      expect(formatActionLabel({ action: "character-equip" })).toBe("Equip")
    })
  })

  describe("use", () => {
    it("renders 'Use on <Char>' when destinationLabel resolves a character", () => {
      expect(formatActionLabel({ action: "use", destinationLabel: "Drogalas the Wise" })).toBe(
        "Use on Drogalas the Wise"
      )
    })

    it("falls back to bare verb when destinationLabel is missing", () => {
      expect(formatActionLabel({ action: "use" })).toBe("Use")
    })
  })

  describe("companion-equip", () => {
    it("renders 'Equip on <X>' when destinationLabel resolves the owner+companion", () => {
      expect(
        formatActionLabel({
          action: "companion-equip",
          destinationLabel: "Char-X's Companion",
        })
      ).toBe("Equip on Char-X's Companion")
    })

    it("falls back to 'Equip Companion' when destinationLabel is missing", () => {
      expect(formatActionLabel({ action: "companion-equip" })).toBe("Equip Companion")
    })
  })

  describe("stock", () => {
    it("renders 'Stock on <X>' with destinationLabel only", () => {
      expect(formatActionLabel({ action: "stock", destinationLabel: "Char-X" })).toBe(
        "Stock on Char-X"
      )
    })

    it("appends quantity when targetQuantity is provided", () => {
      expect(
        formatActionLabel({
          action: "stock",
          destinationLabel: "Char-X",
          targetQuantity: 5,
        })
      ).toBe("Stock on Char-X (×5)")
    })

    it("renders quantity-only when destinationLabel is missing", () => {
      expect(formatActionLabel({ action: "stock", targetQuantity: 5 })).toBe("Stock (×5)")
    })

    it("falls back to bare verb when both destinationLabel and targetQuantity are missing", () => {
      expect(formatActionLabel({ action: "stock" })).toBe("Stock")
    })
  })

  describe("mail", () => {
    it("renders 'Mail to <recipient>' when destinationLabel is provided", () => {
      expect(formatActionLabel({ action: "mail", destinationLabel: "@Friend" })).toBe(
        "Mail to @Friend"
      )
    })

    it("falls back to bare verb when destinationLabel is missing", () => {
      expect(formatActionLabel({ action: "mail" })).toBe("Mail")
    })
  })
})
