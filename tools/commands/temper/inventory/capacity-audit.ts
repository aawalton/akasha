export const summary = "Report destinations that overflow their storage capacity: per destination, slots needed vs free and which rules/items the capacity filter dropped (quiet when nothing overflows)"

import type { CommandHelp } from "../../../ops/surface.ts"
import { emitJson } from "../../../lib/format-output.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  TEMPER_CHARACTERS_LUA,
  TEMPER_INVENTORY_LUA,
} from "../../../lib/temper-inventory-paths.ts"
import {
  type CapacityAudit,
  capacityFilter,
  planInputs,
  ruleMatcher,
} from "../../../lib/temper-inventory-plan-code.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--inventory-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperInventory.lua (default: ${TEMPER_INVENTORY_LUA})`,
    },
    {
      name: "--characters-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperCharacters.lua (default: ${TEMPER_CHARACTERS_LUA})`,
    },
    {
      name: "--json",
      description: "Emit the raw CapacityAudit shape as pretty-printed JSON",
    },
  ],
  examples: [
    "ops temper inventory capacity-audit",
    "ops temper inventory capacity-audit --json",
    "ops temper inventory capacity-audit --inventory-path ./fixture.lua",
  ],
}

const AUDIT_HEADER = "[TemperInventory] Capacity audit:"

function formatAuditText(audit: CapacityAudit): string {
  if (audit.entries.length === 0) {
    return `${AUDIT_HEADER}\n  No capacity overflow — every destination fits.\n`
  }
  const lines: string[] = [AUDIT_HEADER]
  for (const entry of audit.entries) {
    lines.push(
      `  ${entry.destinationName} — needed ${entry.neededSlots} slots, ${entry.freeSlots} free, ` +
        `dropped ${entry.droppedStacks} (${entry.droppedUnits} items)`
    )
    for (const rule of entry.rules) {
      const label = rule.ruleTitle ?? rule.ruleId
      const items = rule.items.map((i) => `${i.itemName} ×${i.units}`).join(", ")
      lines.push(`    ${label} (${rule.action}): ${items}`)
    }
  }
  return `${lines.join("\n")}\n`
}

export default async function inventoryCapacityAudit(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const inputs = await planInputs()
  const inventoryPath = parsed.string("--inventory-path") ?? inputs.DEFAULT_INVENTORY_PATH
  const charactersPath = parsed.string("--characters-path") ?? inputs.DEFAULT_CHARACTERS_PATH
  const json = parsed.boolean("--json")

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

  if (json) {
    process.stdout.write(`${emitJson(audit)}\n`)
    return
  }
  process.stdout.write(formatAuditText(audit))
}
