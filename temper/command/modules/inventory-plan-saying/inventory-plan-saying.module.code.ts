import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import type { ItemAction } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { planPhraseOf } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-route-venue/inventory-management-plan-route-venue.module.code.ts"
import type {
  ManagementPlan,
  PlanItem,
  VenueStop,
} from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import { withdraw } from "akasha/temper/items/rules/routing/core/temper-plan-phrase/pages/withdraw.temper-plan-phrase.ts"
import { stacksOf } from "akasha/temper/items/rules/routing/modules/inventory-management-plan-grouping/inventory-management-plan-grouping.module.code.ts"
import type { HousePlacement } from "akasha/temper/items/rules/routing/modules/inventory-management-plan-house-placement/inventory-management-plan-house-placement.module.code.ts"

const PLAN_HEADER = "[TemperItems] Plan:"

const HOUSES_HEADER = "[TemperItems] Houses:"

function verbOf(action: ItemAction): string {
  switch (action) {
    case "sell":
    case "destroy":
    case "fence-sell":
      return "sell"
    case "fence-launder":
      return "launder"
    case "list":
      return "list"
    case "mail":
      return "mail"
    case "deconstruct":
      return "deconstruct"
    case "refine":
      return "refine"
    case "fillet":
      return "fillet"
    case "research":
      return "research"
    case "character-equip":
    case "companion-equip":
      return "equip"
    case "stock":
      return "stock"
    case "move-to":
      return "deposit"
    case "use":
      return "use"
    case "open":
      return "open"
    case "fill":
      return "fill"
    case "nothing":
    case "lock":
    case "unlock":
    case "bind":
      return action
    default:
      return assertNever(action)
  }
}

function verbAt(item: PlanItem, venue: VenueStop): string {
  if (venue.venue === "house") return "place"
  if (item.note === planPhraseOf(withdraw)) return "withdraw"
  return verbOf(item.action)
}

function venueRows(plan: ManagementPlan): ReadonlyMap<string, Map<string, number>> {
  const labelToVerbs = new Map<string, Map<string, number>>()
  for (const session of plan.sessions) {
    for (const venue of session.venues) {
      const verbs = labelToVerbs.get(venue.label) ?? new Map<string, number>()
      labelToVerbs.set(venue.label, verbs)
      for (const group of venue.actionGroups) {
        for (const item of group.items) {
          const verb = verbAt(item, venue)
          verbs.set(verb, (verbs.get(verb) ?? 0) + stacksOf(item))
        }
      }
    }
  }
  return labelToVerbs
}

export function planSaid(plan: ManagementPlan): readonly string[] {
  const rows = venueRows(plan)
  if (rows.size === 0) return [PLAN_HEADER, "  (no actions pending)"]
  const lines: string[] = [PLAN_HEADER]
  for (const [label, verbs] of rows) {
    const parts: string[] = []
    for (const [verb, count] of verbs) parts.push(`${verb} ${count}`)
    if (parts.length === 0) continue
    lines.push(`  ${label} — ${parts.join(", ")}`)
  }
  return lines
}

export function housePlacementSaid(
  houses: HousePlacement,
  names: ReadonlyMap<number, string>,
  carrier: string
): readonly string[] {
  if (houses.houseRuleIds.size === 0) return []
  const nameOf = (collectibleId: number): string =>
    names.get(collectibleId) ?? `house ${collectibleId}`
  const lines: string[] = [HOUSES_HEADER]
  for (const collectibleId of houses.housesToScan) {
    lines.push(
      `  ${carrier} — scan ${nameOf(collectibleId)} first, entering it so its limits are read`
    )
  }
  let used = 0
  for (const tally of houses.placed) {
    used += tally.items
    lines.push(
      `  ${nameOf(tally.collectibleId)} — place ${tally.stacks} stacks, ${tally.items} items`
    )
  }
  lines.push(`  vault slots freed ${houses.vaultSlotsFreed}, house slots used ${used}`)
  return lines
}
