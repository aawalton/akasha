import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { z } from "zod"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const JSON_FLAG = "--json"

const INVENTORY_LUA = "TemperInventory.lua"

const SAVED_VARIABLES = "TemperInventory_SavedVariables"

type MasterConsumableTrace = {
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

export type Read =
  | { readonly inventoryPath: string | null; readonly json: boolean }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("--")) {
        refusals.push(`\`${INVENTORY_PATH}\` names the file to read, and no file followed it`)
        continue
      }
      inventoryPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, json }
}

function num(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
}

function bool(value: boolean | undefined): string {
  return value === undefined ? "nil" : value ? "y" : "n"
}

export function consumableTraceSaid(traces: readonly MasterConsumableTrace[]): readonly string[] {
  const lines: string[] = [`[master consumable traces] ${traces.length} entry(ies), oldest first`]
  for (const one of traces) {
    lines.push(
      `@${one.timestamp} ${one.phase.toUpperCase()} OUTCOME=${one.outcome} ` +
        `craftType=${one.craftType} itemId=${one.itemId} needed=${one.needed} ` +
        `targetQuality=${one.targetQuality}`
    )
    lines.push(
      `  spec: materialItemId=${one.materialItemId} ` +
        `encodedAlchemyTraits=${one.encodedAlchemyTraits}`
    )
    if (one.solventFound !== undefined || one.reagent1Id !== undefined) {
      lines.push(
        `  alchemy: solventFound=${bool(one.solventFound)} reagents=[${num(one.reagent1Id)},` +
          `${num(one.reagent2Id)},${num(one.reagent3Id)}]`
      )
    }
    if (one.recipeListIndex !== undefined || one.recipeIndex !== undefined) {
      lines.push(
        `  provisioning: recipeListIndex=${num(one.recipeListIndex)} ` +
          `recipeIndex=${num(one.recipeIndex)}`
      )
    }
    if (
      one.potencyRuneId !== undefined ||
      one.essenceRuneId !== undefined ||
      one.aspectRuneId !== undefined
    ) {
      lines.push(
        `  enchanting: potency=${num(one.potencyRuneId)} essence=${num(one.essenceRuneId)} ` +
          `aspect=${num(one.aspectRuneId)}`
      )
    }
    if (
      one.interactionType !== undefined ||
      one.maxIter !== undefined ||
      one.iterations !== undefined ||
      one.yieldPerIter !== undefined
    ) {
      lines.push(
        `  execute: interactionType=${num(one.interactionType)} maxIter=${num(one.maxIter)} ` +
          `yieldPerIter=${num(one.yieldPerIter)} iterations=${num(one.iterations)}`
      )
    }
    if (one.diag !== undefined) lines.push(`  diag: ${one.diag}`)
  }
  return lines
}

function traceSchema(): z.ZodTypeAny {
  return z
    .object({
      timestamp: z.number(),
      craftType: z.number(),
      itemId: z.number(),
      materialItemId: z.number(),
      targetQuality: z.number(),
      encodedAlchemyTraits: z.number(),
      needed: z.number(),
      phase: z.enum(["resolve", "execute"]),
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
      outcome: z.enum([
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
      ]),
    })
    .strict()
}

type Held = { readonly traces: readonly MasterConsumableTrace[] } | { readonly why: string }

async function tracesIn(at: string): Promise<Held> {
  const file = Bun.file(at)
  if (!(await file.exists())) return { why: `${INVENTORY_LUA}: nothing stands at ${at}` }
  const content = await file.text()
  const rootSchema = savedVariablesRootSchema(
    z
      .object({
        diagnostics: z
          .object({ masterConsumableTraces: luaArrayOrEmpty(traceSchema()).optional() })
          .passthrough()
          .optional(),
      })
      .passthrough()
  )
  const root = rootSchema.parse(parseLuaSavedVariablesFile(content, SAVED_VARIABLES))
  const defaultTable = root.Default
  if (!defaultTable) return { why: `${INVENTORY_LUA} at ${at} carries no Default table` }
  const accountKeys = Object.keys(defaultTable).filter((one) => one.startsWith("@"))
  if (accountKeys.length === 0) {
    return { why: `${INVENTORY_LUA} at ${at} carries no @<account> entry under Default` }
  }
  for (const key of accountKeys) {
    const traces = defaultTable[key]?.$AccountWide?.diagnostics?.masterConsumableTraces
    if (traces !== undefined) return { traces: traces as readonly MasterConsumableTrace[] }
  }
  return {
    why:
      `${INVENTORY_LUA} at ${at} carries no diagnostics.masterConsumableTraces under any ` +
      "@<account>/$AccountWide — accept a consumable master writ, open the station, then reload",
  }
}

export async function temperInventoryMasterConsumableTrace(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  let held: Held
  try {
    held = await tracesIn(at)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if ("why" in held) return refused(held.why, DATA)
  if (read.json) return { report: [JSON.stringify(held.traces)], refusals: [], code: 0 }
  return { report: [...consumableTraceSaid(held.traces)], refusals: [], code: 0 }
}
