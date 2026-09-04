import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import {
  type CapacityAudit,
  capacityFilter,
  planInputs,
  ruleMatcher,
} from "../inventory-plan-capabilities/inventory-plan-capabilities.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const CHARACTERS_PATH = "--characters-path"

const JSON_FLAG = "--json"

const SPACES = 2

const AUDIT_HEADER = "[TemperInventory] Capacity audit:"

export type Read =
  | {
      readonly inventoryPath: string | null
      readonly charactersPath: string | null
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let charactersPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH || one === CHARACTERS_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` takes a value, and none followed it`)
        continue
      }
      if (one === INVENTORY_PATH) inventoryPath = value
      else charactersPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\`, ` +
        `\`${CHARACTERS_PATH}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, charactersPath, json }
}

export function auditSaid(audit: CapacityAudit): readonly string[] {
  if (audit.entries.length === 0) {
    return [AUDIT_HEADER, "  No capacity overflow — every destination fits."]
  }
  const lines: string[] = [AUDIT_HEADER]
  for (const entry of audit.entries) {
    lines.push(
      `  ${entry.destinationName} — needed ${entry.neededSlots} slots, ${entry.freeSlots} free, ` +
        `dropped ${entry.droppedStacks} (${entry.droppedUnits} items)`
    )
    for (const rule of entry.rules) {
      const label = rule.ruleTitle ?? rule.ruleId
      const items = rule.items.map((one) => `${one.itemName} ×${one.units}`).join(", ")
      lines.push(`    ${label} (${rule.action}): ${items}`)
    }
  }
  return lines
}

export async function temperInventoryCapacityAudit(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  try {
    const inputs = await planInputs()
    const inventoryPath =
      read.inventoryPath === null
        ? inputs.DEFAULT_INVENTORY_PATH
        : resolve(root, read.inventoryPath)
    const charactersPath =
      read.charactersPath === null
        ? inputs.DEFAULT_CHARACTERS_PATH
        : resolve(root, read.charactersPath)
    const { db, orderedRules, itemRules, context, classifiedItems } =
      await inputs.loadInventoryPlanInputs(inventoryPath, charactersPath)
    const matcher = await ruleMatcher()
    const matched = matcher.computeAllRuleAffectedItems(
      orderedRules,
      classifiedItems,
      context,
      itemRules
    )
    const filter = await capacityFilter()
    const { audit } = filter.applyDestinationCapacityFilterWithAudit(
      orderedRules,
      itemRules,
      matched.ruleMap,
      db
    )
    if (read.json) {
      return {
        report: JSON.stringify(audit, null, SPACES).split("\n"),
        refusals: [],
        code: 0,
      }
    }
    return { report: [...auditSaid(audit)], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
