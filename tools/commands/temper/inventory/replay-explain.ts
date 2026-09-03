export const summary =
  "Pretty-print the addon's most recent explain trace from TemperInventory.lua diagnostics"

import { readLastExplain } from "@akasha/temper-commands/explain-replay-reading"
import {
  formatExplainWalk,
  type JsonOutput,
  type RuleTraceRow,
} from "@akasha/temper-explain/explain-walk"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { savedVarsFile, TEMPER_INVENTORY_LUA } from "../../../lib/temper-inventory-paths.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--inventory-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperInventory.lua (default: ${TEMPER_INVENTORY_LUA})`,
    },
    {
      name: "--itemlink",
      argLabel: "<link>",
      valueShape: "token",
      description:
        "Filter: only render the stored trace if its itemLink matches this " +
        "20-field ESO item link. Otherwise exit non-zero with stderr naming " +
        "the stored item.",
    },
  ],
  examples: [
    "ops temper inventory replay-explain",
    "ops temper inventory replay-explain --itemlink '|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h'",
    "ops temper inventory replay-explain --inventory-path /path/to/TemperInventory.lua",
  ],
}

interface Rejection {
  readonly index: number
  readonly categoryId: string
  readonly action: string
  readonly reason: string
  readonly detail?: string
}

interface MatchedWalk {
  readonly index: number
  readonly categoryId: string
  readonly action: string
  readonly destination: string
  readonly conditions: string
}

interface ExplainTrace {
  readonly timestamp: number
  readonly itemLink: string
  readonly itemId: number
  readonly itemName: string
  readonly classification: { readonly ancestorChain: readonly string[] }
  readonly itemKey: {
    readonly kind: string
    readonly detail: Readonly<Record<string, number | string | boolean>>
  }
  readonly orderedWalk: {
    readonly matched?: MatchedWalk
    readonly rejections: readonly Rejection[]
  }
  readonly outcome: {
    readonly action: string
    readonly destination: string
    readonly summary: string
  }
}

interface ExplainTraceReader {
  readonly readLastExplain: (inventoryPath: string) => Promise<ExplainTrace>
}

function reasonToVerdictDetail(reason: string, detail: string | undefined): string {
  return detail !== undefined ? `${reason} (${detail})` : reason
}

function rejectionToRow(rejection: Rejection): RuleTraceRow {
  return {
    index: rejection.index,
    ruleId: null,
    categoryId: rejection.categoryId,
    action: rejection.action,
    destination: null,
    verdict: "rejected",
    verdictDetail: reasonToVerdictDetail(rejection.reason, rejection.detail),
    resolvedDestination: null,
  }
}

function matchedToRow(matched: MatchedWalk, resolvedDestination: string): RuleTraceRow {
  return {
    index: matched.index,
    ruleId: null,
    categoryId: matched.categoryId,
    action: matched.action,
    destination: matched.destination,
    verdict: "matched",
    verdictDetail: matched.conditions === "" ? null : matched.conditions,
    resolvedDestination,
  }
}

function itemKeyLabel(itemKey: ExplainTrace["itemKey"]): string | null {
  if (itemKey.kind === "none") return null
  const entries = Object.entries(itemKey.detail)
  if (entries.length === 0) return itemKey.kind
  const tail = entries.map(([k, v]) => `${k}=${String(v)}`).join(",")
  return `${itemKey.kind}:${tail}`
}

function traceToJsonOutput(trace: ExplainTrace): JsonOutput {
  const perRule: RuleTraceRow[] = []

  if (trace.orderedWalk.matched !== undefined) {
    perRule.push(matchedToRow(trace.orderedWalk.matched, trace.outcome.destination))
  }
  for (const rejection of trace.orderedWalk.rejections) {
    perRule.push(rejectionToRow(rejection))
  }

  return {
    itemId: trace.itemId,
    itemName: trace.itemName,
    itemLink: trace.itemLink,
    categoryNodeIds: trace.classification.ancestorChain,
    itemKey: itemKeyLabel(trace.itemKey),
    ttc: null,
    perRule,
    outcome: {
      kind: trace.orderedWalk.matched !== undefined ? "matched" : "implicit-terminal",
      action: trace.outcome.action,
      destination: trace.outcome.destination,
      label: trace.outcome.summary,
      indeterminateRules: [],
    },
  }
}

export default async function temperInventoryReplayExplain(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))
  const filterItemLink = parsed.string("--itemlink")

  const trace = await readLastExplain(inventoryPath)

  if (filterItemLink !== undefined && filterItemLink !== trace.itemLink) {
    throw inputError(
      `no matching trace: stored explain trace is for itemId=${trace.itemId} ` +
        `(itemLink=${trace.itemLink}), does not match --itemlink ${filterItemLink}`
    )
  }

  const out = traceToJsonOutput(trace)
  process.stdout.write(`[addon @ ${trace.timestamp}]\n`)
  process.stdout.write(formatExplainWalk(out))
}
