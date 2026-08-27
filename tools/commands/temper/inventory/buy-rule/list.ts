
export const summary = "List every buy rule on settings.inventory.buyRules (TSV / --json)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson, emitTsv } from "../../../../lib/format-output.ts"
import { inventorySettings } from "../../../../lib/temper-inventory.ts"
import {
  assembleSnapshot,
  latestSnapshot,
  snapshotChunks,
} from "../../../../lib/temper-inventory/snapshot-read.ts"
import { USER_ID } from "../../../../lib/user-id.ts"

const COMPUTE_ITEM_STOCK = "@temper/game-items-core/compute-item-stock"
const BUY_RULE_EVAL = "@temper/game-items-rules-core/buy-rule-eval"

const NO_SNAPSHOT = "no-snapshot"

export const help: CommandHelp = {
  flags: [
    {
      name: "--json",
      description: "Emit each `BuyRule` plus `{ currentTotal, shortfall }` as JSON instead of TSV",
    },
  ],
  envVars: [
    {
      name: "USER_ID",
      description: "Override the account this reads against (defaults to Alan's).",
    },
  ],
  examples: ["ops temper inventory buy-rule list", "ops temper inventory buy-rule list --json"],
}

const COLUMNS = [
  "itemName",
  "itemId",
  "target",
  "current",
  "shortfall",
  "source",
  "active",
  "locked",
  "id",
] as const

interface BuyRule {
  readonly id: string
  readonly itemId: number
  readonly itemName: string
  readonly targetQuantity: number
  readonly source: string
  readonly active: boolean
  readonly locked?: boolean
}

interface ComputeItemStock {
  readonly computeItemStock: (
    inventory: unknown,
    itemIds: ReadonlySet<number>
  ) => Map<number, { readonly total: number }>
}

interface BuyRuleEval {
  readonly computeBuyShortfall: (targetQuantity: number, currentTotal: number) => number
}

interface Diagnostics {
  readonly currentTotal: number | null
  readonly shortfall: number | null
}

const ABSENT: Diagnostics = { currentTotal: null, shortfall: null }

async function latestInventory(): Promise<unknown> {
  const header = await latestSnapshot(USER_ID)
  if (header === null) return null
  return assembleSnapshot(await snapshotChunks(header.slug))
}

export default async function temperInventoryBuyRuleList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const settings = await (await inventorySettings()).read()
  const buyRules = (settings.buyRules ?? []) as unknown as readonly BuyRule[]

  const inventory = await latestInventory()

  const diagnostics = new Map<string, Diagnostics>()
  if (inventory === null) {
    for (const rule of buyRules) diagnostics.set(rule.id, ABSENT)
  } else {
    const { computeItemStock } = await codeModule<ComputeItemStock>(COMPUTE_ITEM_STOCK)
    const { computeBuyShortfall } = await codeModule<BuyRuleEval>(BUY_RULE_EVAL)
    const stock = computeItemStock(inventory, new Set(buyRules.map((rule) => rule.itemId)))
    for (const rule of buyRules) {
      const currentTotal = stock.get(rule.itemId)?.total ?? 0
      diagnostics.set(rule.id, {
        currentTotal,
        shortfall: computeBuyShortfall(rule.targetQuantity, currentTotal),
      })
    }
  }

  if (json) {
    const enriched = buyRules.map((rule) => {
      const diag = diagnostics.get(rule.id) ?? ABSENT
      return { ...rule, currentTotal: diag.currentTotal, shortfall: diag.shortfall }
    })
    process.stdout.write(`${emitJson(enriched)}\n`)
    return
  }

  const rows = buyRules.map((rule) => {
    const diag = diagnostics.get(rule.id) ?? ABSENT
    return {
      itemName: rule.itemName,
      itemId: rule.itemId,
      target: rule.targetQuantity,
      current: diag.currentTotal ?? NO_SNAPSHOT,
      shortfall: diag.shortfall ?? NO_SNAPSHOT,
      source: rule.source,
      active: rule.active,
      locked: rule.locked,
      id: rule.id,
    }
  })
  process.stdout.write(`${emitTsv(rows, COLUMNS)}\n`)
}
