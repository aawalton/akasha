import { describe, expect, it } from "bun:test"
import type {
  ActionGroup,
  CharacterSession,
  ManagementPlan,
  VenueStop,
} from "@temper/game-items-rules-routing-core/inventory-management-plan-types"
import { formatPlanChecklist } from "./inventory-plan-checklist"

function group(label: string, slotCount: number): ActionGroup {
  return { label, items: [], slotCount }
}

function venue(label: string, groups: readonly ActionGroup[]): VenueStop {
  let slotCount = 0
  for (const g of groups) slotCount += g.slotCount
  return { venue: "bank", label, actionGroups: groups, slotCount }
}

function session(
  characterName: string,
  venues: readonly VenueStop[],
  visitNumber?: number
): CharacterSession {
  let totalSlots = 0
  for (const v of venues) totalSlots += v.slotCount
  const s: CharacterSession = { characterId: characterName, characterName, venues, totalSlots }
  if (visitNumber !== undefined) s.visitNumber = visitNumber
  return s
}

function plan(sessions: readonly CharacterSession[]): ManagementPlan {
  let totalSlots = 0
  let totalVenueVisits = 0
  for (const s of sessions) {
    totalSlots += s.totalSlots
    totalVenueVisits += s.venues.length
  }
  return {
    sessions,
    totalCharacterSwitches: Math.max(0, sessions.length - 1),
    totalVenueVisits,
    totalSlots,
  }
}

describe("formatPlanChecklist", () => {
  it("renders the empty-plan line when there are no sessions", () => {
    const out = formatPlanChecklist(plan([]))
    expect(out).toBe("[TemperInventory] Checklist\n  (no actions pending)\n")
  })

  it("renders exactly two levels: character logins and venue stops (never per-item)", () => {
    const out = formatPlanChecklist(
      plan([
        session("Azara", [
          venue("Bank", [group("Deposit", 2), group("Stock", 1)]),
          venue("Vendor", [group("Sell", 1)]),
        ]),
        session("Bastian", [venue("Bank", [group("Withdraw", 1)])], 2),
      ])
    )
    expect(out).toBe(
      "[TemperInventory] Checklist\n" +
        "2 logins · 3 stops · 5 items\n" +
        "\n" +
        "[ ] 1. Azara\n" +
        "    [ ] Bank — Deposit 2, Stock 1\n" +
        "    [ ] Vendor — Sell 1\n" +
        "[ ] 2. Bastian (Visit 2)\n" +
        "    [ ] Bank — Withdraw 1\n"
    )
  })

  it("singularizes the header counts for a one-login one-stop one-item plan", () => {
    const out = formatPlanChecklist(plan([session("Azara", [venue("Vendor", [group("Sell", 1)])])]))
    const lines = out.split("\n")
    expect(lines[1]).toBe("1 login · 1 stop · 1 item")
  })

  it("omits the visit suffix for a first visit and no per-item lines appear", () => {
    const out = formatPlanChecklist(
      plan([session("Azara", [venue("Bank", [group("Deposit", 3)])], 1)])
    )
    expect(out).toContain("[ ] 1. Azara\n")
    expect(out).not.toContain("Visit")
    const checkboxLines = out.split("\n").filter((l) => l.includes("[ ]"))
    expect(checkboxLines).toHaveLength(2)
  })
})
