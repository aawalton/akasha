export const summary = "Print the addon's rolling ring of consumable master-writ traces (alchemy/enchanting/provisioning: resolve + execute decisions, school-specific facts, and the outcome/bail of each) from TemperInventory.lua diagnostics"

import { luaArrayOrEmpty } from "@temper/shared-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { savedVariablesRootSchema } from "@temper/shared-saved-variables/saved-variables-account-wide"
import { z } from "zod"
import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { savedVarsFile, TEMPER_INVENTORY_LUA } from "../../../lib/temper-inventory-paths.ts"

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
      description: "Emit the full MasterConsumableTrace[] ring as single-line JSON instead of text",
    },
  ],
  examples: [
    "ops temper inventory master-consumable-trace",
    "ops temper inventory master-consumable-trace --json",
    "ops temper inventory master-consumable-trace --inventory-path ./TemperInventory.lua",
  ],
}

interface MasterConsumableTrace {
  readonly timestamp: number
  readonly craftType: number
  readonly itemId: number
  readonly materialItemId: number
  readonly targetQuality: number
  readonly encodedAlchemyTraits: number
  readonly needed: number
  readonly phase: string
  readonly outcome: string
  readonly solventFound?: boolean
  readonly reagent1Id?: number
  readonly reagent2Id?: number
  readonly reagent3Id?: number
  readonly recipeListIndex?: number
  readonly recipeIndex?: number
  readonly potencyRuneId?: number
  readonly essenceRuneId?: number
  readonly aspectRuneId?: number
  readonly interactionType?: number
  readonly maxIter?: number
  readonly yieldPerIter?: number
  readonly iterations?: number
  readonly diag?: string
}

function num(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
}

function bool(value: boolean | undefined): string {
  return value === undefined ? "nil" : value ? "y" : "n"
}

function formatTraces(traces: readonly MasterConsumableTrace[]): string {
  const lines: string[] = [`[master consumable traces] ${traces.length} entry(ies), oldest first`]
  for (const t of traces) {
    lines.push(
      `@${t.timestamp} ${t.phase.toUpperCase()} OUTCOME=${t.outcome} craftType=${t.craftType} ` +
        `itemId=${t.itemId} needed=${t.needed} targetQuality=${t.targetQuality}`
    )
    lines.push(
      `  spec: materialItemId=${t.materialItemId} encodedAlchemyTraits=${t.encodedAlchemyTraits}`
    )
    if (t.solventFound !== undefined || t.reagent1Id !== undefined) {
      lines.push(
        `  alchemy: solventFound=${bool(t.solventFound)} reagents=[${num(t.reagent1Id)},` +
          `${num(t.reagent2Id)},${num(t.reagent3Id)}]`
      )
    }
    if (t.recipeListIndex !== undefined || t.recipeIndex !== undefined) {
      lines.push(
        `  provisioning: recipeListIndex=${num(t.recipeListIndex)} recipeIndex=${num(t.recipeIndex)}`
      )
    }
    if (
      t.potencyRuneId !== undefined ||
      t.essenceRuneId !== undefined ||
      t.aspectRuneId !== undefined
    ) {
      lines.push(
        `  enchanting: potency=${num(t.potencyRuneId)} essence=${num(t.essenceRuneId)} ` +
          `aspect=${num(t.aspectRuneId)}`
      )
    }
    if (
      t.interactionType !== undefined ||
      t.maxIter !== undefined ||
      t.iterations !== undefined ||
      t.yieldPerIter !== undefined
    ) {
      lines.push(
        `  execute: interactionType=${num(t.interactionType)} maxIter=${num(t.maxIter)} ` +
          `yieldPerIter=${num(t.yieldPerIter)} iterations=${num(t.iterations)}`
      )
    }
    if (t.diag !== undefined) {
      lines.push(`  diag: ${t.diag}`)
    }
  }
  return lines.join("\n")
}

async function readMasterConsumableTraces(
  inventoryPath: string
): Promise<readonly MasterConsumableTrace[]> {
  const file = Bun.file(inventoryPath)
  if (!(await file.exists())) {
    throw dataError(`TemperInventory.lua: file not found at ${inventoryPath}`)
  }
  let content: string
  try {
    content = await file.text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw dataError(`TemperInventory.lua: failed to read ${inventoryPath} — ${reason}`)
  }

  const outcomeSchema = z.enum([
    "nothing-needed",
    "no-solvent",
    "no-reagent-combo",
    "unknown-recipe",
    "unresolved-glyph",
    "enqueued",
    "not-in-interaction",
    "missing-ingredients",
    "ingredient-bounded",
    "crafted",
  ])
  const phaseSchema = z.enum(["resolve", "execute"])
  const traceSchema = z
    .object({
      timestamp: z.number(),
      craftType: z.number(),
      itemId: z.number(),
      materialItemId: z.number(),
      targetQuality: z.number(),
      encodedAlchemyTraits: z.number(),
      needed: z.number(),
      phase: phaseSchema,
      solventFound: z.boolean().optional(),
      reagent1Id: z.number().optional(),
      reagent2Id: z.number().optional(),
      reagent3Id: z.number().optional(),
      recipeListIndex: z.number().optional(),
      recipeIndex: z.number().optional(),
      potencyRuneId: z.number().optional(),
      essenceRuneId: z.number().optional(),
      aspectRuneId: z.number().optional(),
      interactionType: z.number().optional(),
      maxIter: z.number().optional(),
      yieldPerIter: z.number().optional(),
      iterations: z.number().optional(),
      diag: z.string().optional(),
      outcome: outcomeSchema,
    })
    .strict()
  const diagnosticsSchema = z
    .object({
      masterConsumableTraces: luaArrayOrEmpty(traceSchema).optional(),
    })
    .passthrough()
  const accountWideSchema = z
    .object({
      diagnostics: diagnosticsSchema.optional(),
    })
    .passthrough()
  const rootSchema = savedVariablesRootSchema(accountWideSchema)

  const rawRoot = parseLuaSavedVariablesFile(content, "TemperInventory_SavedVariables")
  const root = rootSchema.parse(rawRoot)

  const defaultTable = root.Default
  if (!defaultTable) {
    throw dataError(`TemperInventory.lua at ${inventoryPath}: missing Default table`)
  }

  const accountKeys = Object.keys(defaultTable).filter((k) => k.startsWith("@"))
  if (accountKeys.length === 0) {
    throw dataError(
      `TemperInventory.lua at ${inventoryPath}: no @<account> entry under Default`
    )
  }

  for (const key of accountKeys) {
    const account = defaultTable[key]
    const traces = account?.$AccountWide?.diagnostics?.masterConsumableTraces
    if (traces !== undefined) return traces
  }

  throw dataError(
    `TemperInventory.lua at ${inventoryPath}: no diagnostics.masterConsumableTraces under any ` +
      `@<account>/$AccountWide (have you accepted a consumable master writ, opened the station, then /reloadui?)`
  )
}

export default async function inventoryMasterConsumableTrace(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))

  const traces = await readMasterConsumableTraces(inventoryPath)

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(traces)}\n`)
    return
  }

  process.stdout.write(`${formatTraces(traces)}\n`)
}
