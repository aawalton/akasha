import { DataError } from "@akasha/errors-core/exit-code"
import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { z } from "zod"

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

const ROOT_SCHEMA = savedVariablesRootSchema(ACCOUNT_WIDE_SCHEMA)

export async function readMasterCraftTraces(inventoryPath: string): Promise<MasterCraftTrace[]> {
  const file = Bun.file(inventoryPath)
  if (!(await file.exists())) {
    throw new DataError(`TemperInventory.lua: file not found at ${inventoryPath}`)
  }
  let content: string
  try {
    content = await file.text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new DataError(`TemperInventory.lua: failed to read ${inventoryPath} — ${reason}`)
  }

  const rawRoot = parseLuaSavedVariablesFile(content, "TemperInventory_SavedVariables")
  const root = ROOT_SCHEMA.parse(rawRoot)

  const defaultTable = root.Default
  if (!defaultTable) {
    throw new DataError(`TemperInventory.lua at ${inventoryPath}: missing Default table`)
  }

  const accountKeys = Object.keys(defaultTable).filter((k) => k.startsWith("@"))
  if (accountKeys.length === 0) {
    throw new DataError(
      `TemperInventory.lua at ${inventoryPath}: no @<account> entry under Default`
    )
  }

  for (const key of accountKeys) {
    const account = defaultTable[key]
    const traces = account?.$AccountWide?.diagnostics?.masterCraftTraces
    if (traces !== undefined) return traces
  }

  throw new DataError(
    `TemperInventory.lua at ${inventoryPath}: no diagnostics.masterCraftTraces under any ` +
      `@<account>/$AccountWide (have you accepted a master writ, opened the station, then /reloadui?)`
  )
}
