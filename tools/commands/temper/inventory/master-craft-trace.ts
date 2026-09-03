export const summary =
  "Print the addon's rolling ring of equipment master-writ CRAFT traces (station context, resolved pattern, verify observations, and the outcome/bail of each craft execute()) from TemperInventory.lua diagnostics"

import { readMasterCraftTraces } from "@akasha/temper-commands/master-craft-trace-reading"
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
      description: "Emit the full MasterCraftTrace[] ring as single-line JSON instead of text",
    },
  ],
  examples: [
    "ops temper inventory master-craft-trace",
    "ops temper inventory master-craft-trace --json",
    "ops temper inventory master-craft-trace --inventory-path ./TemperInventory.lua",
  ],
}

interface MasterCraftTrace {
  readonly timestamp: number
  readonly craftType: number
  readonly setId: number
  readonly templateId: number
  readonly traitType: number
  readonly mode: number
  readonly interactionType: number
  readonly atConsolidated: boolean
  readonly basePattern: number
  readonly resolvedPattern: number
  readonly materialIndex: number
  readonly numMats: number
  readonly styleId: number
  readonly traitIndex: number
  readonly resultLink?: string
  readonly resultSetId?: number
  readonly resultTrait?: number
  readonly maxIter?: number
  readonly existingMatchQuality?: number
  readonly existingMatchLink?: string
  readonly outcome: string
}

interface MasterCraftTraceReader {
  readonly readMasterCraftTraces: (inventoryPath: string) => Promise<readonly MasterCraftTrace[]>
}

function num(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
}

function str(value: string | undefined): string {
  return value === undefined ? "nil" : `"${value}"`
}

function formatTraces(traces: readonly MasterCraftTrace[]): string {
  const lines: string[] = [`[master craft traces] ${traces.length} entry(ies), oldest first`]
  for (const t of traces) {
    lines.push(
      `@${t.timestamp} OUTCOME=${t.outcome} craftType=${t.craftType} setId=${t.setId} ` +
        `templateId=${t.templateId} traitType=${t.traitType}`
    )
    lines.push(
      `  station: mode=${t.mode} interactionType=${t.interactionType} ` +
        `atConsolidated=${t.atConsolidated ? "y" : "n"}`
    )
    lines.push(
      `  pattern: base=${t.basePattern} resolved=${t.resolvedPattern} mat=${t.materialIndex} ` +
        `num=${t.numMats} style=${t.styleId} traitIndex=${t.traitIndex}`
    )
    lines.push(
      `  verify: resultLink=${str(t.resultLink)} resultSetId=${num(t.resultSetId)} ` +
        `resultTrait=${num(t.resultTrait)} maxIter=${num(t.maxIter)}`
    )
    if (t.existingMatchQuality !== undefined || t.existingMatchLink !== undefined) {
      lines.push(
        `  idempotency: existingQuality=${num(t.existingMatchQuality)} ` +
          `existingLink=${str(t.existingMatchLink)}`
      )
    }
  }
  return lines.join("\n")
}

export default async function temperInventoryMasterCraftTrace(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))

  const traces = await readMasterCraftTraces(inventoryPath)

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(traces)}\n`)
    return
  }

  process.stdout.write(`${formatTraces(traces)}\n`)
}
