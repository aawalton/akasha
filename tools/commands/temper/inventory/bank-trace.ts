export const summary =
  "Print the addon's most recent banking-session perf trace (per-phase ms brackets, move counts, net-worth recompute walk stats) from TemperInventory.lua diagnostics"

import { readBankTrace } from "@akasha/temper-commands/bank-trace-reading"
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
      name: "--json",
      description: "Emit the full BankTrace object as single-line JSON instead of text",
    },
  ],
  examples: [
    "ops temper inventory bank-trace",
    "ops temper inventory bank-trace --json",
    "ops temper inventory bank-trace --inventory-path ./TemperInventory.lua",
  ],
}

interface Bracket {
  readonly count: number
  readonly totalMs: number
  readonly maxMs: number
}

interface Settling {
  readonly evaluateRules: Bracket
  readonly actionsChanged: Bracket
  readonly bankPanelRefresh: Bracket
  readonly slotUpdate?: Bracket
  readonly fullUpdate?: Bracket
  readonly scanCraftBag?: Bracket
  readonly crafting?: { readonly count: number; readonly totalMs: number }
  readonly unattributedMs?: number
}

interface PacedDispatch {
  readonly planned: number
  readonly issued: number
  readonly confirmed: number
  readonly retries: number
  readonly spanMs: number
  readonly abortedEarly: boolean
}

interface BankTrace {
  readonly timestamp: number
  readonly bankingBag: number
  readonly scanBankBagsMs?: number
  readonly refreshPanelMs?: number
  readonly withdrawMs?: number
  readonly depositMs?: number
  readonly withdrawCount?: number
  readonly depositCount?: number
  readonly moveCount?: number
  readonly openHandlerMs?: number
  readonly openToCloseMs?: number
  readonly netWorth: {
    readonly walkCount: number
    readonly walkTotalMs: number
    readonly walkMaxMs: number
  }
  readonly settling?: Settling
  readonly pacedDispatch?: PacedDispatch
}

interface BankTraceReader {
  readonly readBankTrace: (inventoryPath: string) => Promise<BankTrace>
}

function ms(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}ms`
}

function num(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
}

function bracket(b: Bracket): string {
  return `n=${b.count} total=${b.totalMs}ms max=${b.maxMs}ms`
}

function optBracket(b: Bracket | undefined): string {
  return b === undefined ? "nil (pre-v3 trace)" : bracket(b)
}

function formatSettling(settling: Settling | undefined): readonly string[] {
  if (settling === undefined) {
    return ["settling: nil (v1 trace — bank once more to capture settling brackets)"]
  }
  const crafting =
    settling.crafting === undefined
      ? "crafting slot-handlers: nil (TemperCrafting absent)"
      : `crafting slot-handlers: n=${settling.crafting.count} total=${settling.crafting.totalMs}ms`
  return [
    `settling: evaluateRules ${bracket(settling.evaluateRules)}; ` +
      `actions-changed ${bracket(settling.actionsChanged)}; ` +
      `bank-panel-refresh ${bracket(settling.bankPanelRefresh)}`,
    `  slot-update ${optBracket(settling.slotUpdate)}; ` +
      `full-update ${optBracket(settling.fullUpdate)}; ` +
      `scan-craft-bag ${optBracket(settling.scanCraftBag)}`,
    crafting,
    `unattributed remainder: ${ms(settling.unattributedMs)}`,
  ]
}

function formatPacedDispatch(paced: PacedDispatch | undefined): string {
  if (paced === undefined) {
    return "paced dispatch: nil (pre-wave-3 trace or vault path)"
  }
  const aborted = paced.abortedEarly ? " ABORTED-EARLY" : ""
  return (
    `paced dispatch: planned=${paced.planned} issued=${paced.issued} ` +
    `confirmed=${paced.confirmed} retries=${paced.retries} span=${paced.spanMs}ms${aborted}`
  )
}

function formatTrace(trace: BankTrace): string {
  return [
    `[bank trace @ ${trace.timestamp}] bag=${trace.bankingBag} ` +
      `open-handler=${ms(trace.openHandlerMs)} open→close=${ms(trace.openToCloseMs)}`,
    `phases: scanBankBags=${ms(trace.scanBankBagsMs)} refreshPanel=${ms(trace.refreshPanelMs)} ` +
      `withdraw=${ms(trace.withdrawMs)} deposit=${ms(trace.depositMs)}`,
    `moves: ${num(trace.moveCount)} (withdraw ${num(trace.withdrawCount)}, ` +
      `deposit ${num(trace.depositCount)})`,
    formatPacedDispatch(trace.pacedDispatch),
    `net-worth walks: ${trace.netWorth.walkCount}, total ${trace.netWorth.walkTotalMs}ms, ` +
      `max ${trace.netWorth.walkMaxMs}ms`,
    ...formatSettling(trace.settling),
  ].join("\n")
}

export default async function temperInventoryBankTrace(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))

  const trace = await readBankTrace(inventoryPath)

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(trace)}\n`)
    return
  }

  process.stdout.write(`${formatTrace(trace)}\n`)
}
