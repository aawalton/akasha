import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"
import { readInventoryDiagnostic } from "../inventory-diagnostics-reading/inventory-diagnostics-reading.module.code.ts"

const OUTCOME_SCHEMA = z.enum([
  "not-in-interaction",
  "idempotency-skip",
  "no-result-link",
  "set-mismatch",
  "trait-mismatch",
  "insufficient-mats",
  "crafted",
])

const TRACE_SCHEMA = z
  .object({
    timestamp: z.number(),
    craftType: z.number(),
    setId: z.number(),
    templateId: z.number(),
    traitType: z.number(),
    mode: z.number(),
    interactionType: z.number(),
    atConsolidated: z.boolean(),
    basePattern: z.number(),
    resolvedPattern: z.number(),
    materialIndex: z.number(),
    numMats: z.number(),
    styleId: z.number(),
    traitIndex: z.number(),
    resultLink: z.string().optional(),
    resultSetId: z.number().optional(),
    resultTrait: z.number().optional(),
    maxIter: z.number().optional(),
    existingMatchQuality: z.number().optional(),
    existingMatchLink: z.string().optional(),
    outcome: OUTCOME_SCHEMA,
  })
  .strict()

type MasterCraftTrace = z.infer<typeof TRACE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    masterCraftTraces: luaArrayOrEmpty(TRACE_SCHEMA).optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

export async function readMasterCraftTraces(inventoryPath: string): Promise<MasterCraftTrace[]> {
  return await readInventoryDiagnostic(
    inventoryPath,
    ACCOUNT_WIDE_SCHEMA,
    (wide) => wide.diagnostics?.masterCraftTraces,
    "no diagnostics.masterCraftTraces (have you accepted a master writ, opened the station, then /reloadui?)"
  )
}
