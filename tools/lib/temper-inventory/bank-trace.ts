import { DataError } from "@shared/errors-core/exit"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { savedVariablesRootSchema } from "@temper/shared-saved-variables/saved-variables-account-wide"
import { z } from "zod"

const NET_WORTH_SCHEMA = z
  .object({
    walkCount: z.number(),
    walkTotalMs: z.number(),
    walkMaxMs: z.number(),
  })
  .strict()

const BRACKET_SCHEMA = z
  .object({
    count: z.number(),
    totalMs: z.number(),
    maxMs: z.number(),
  })
  .strict()

const CRAFTING_SCHEMA = z
  .object({
    count: z.number(),
    totalMs: z.number(),
  })
  .strict()

const PACED_DISPATCH_SCHEMA = z
  .object({
    planned: z.number(),
    issued: z.number(),
    confirmed: z.number(),
    retries: z.number(),
    spanMs: z.number(),
    abortedEarly: z.boolean(),
  })
  .strict()

const SETTLING_SCHEMA = z
  .object({
    evaluateRules: BRACKET_SCHEMA,
    actionsChanged: BRACKET_SCHEMA,
    bankPanelRefresh: BRACKET_SCHEMA,
    slotUpdate: BRACKET_SCHEMA.optional(),
    fullUpdate: BRACKET_SCHEMA.optional(),
    scanCraftBag: BRACKET_SCHEMA.optional(),
    crafting: CRAFTING_SCHEMA.optional(),
    unattributedMs: z.number().optional(),
  })
  .strict()

export const TRACE_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    timestamp: z.number(),
    bankingBag: z.number(),
    scanBankBagsMs: z.number().optional(),
    refreshPanelMs: z.number().optional(),
    withdrawMs: z.number().optional(),
    depositMs: z.number().optional(),
    withdrawCount: z.number().optional(),
    depositCount: z.number().optional(),
    moveCount: z.number().optional(),
    openHandlerMs: z.number().optional(),
    openToCloseMs: z.number().optional(),
    netWorth: NET_WORTH_SCHEMA,
    settling: SETTLING_SCHEMA.optional(),
    pacedDispatch: PACED_DISPATCH_SCHEMA.optional(),
  })
  .strict()

type BankTrace = z.infer<typeof TRACE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    lastBankTrace: TRACE_SCHEMA.optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

const ROOT_SCHEMA = savedVariablesRootSchema(ACCOUNT_WIDE_SCHEMA)

export async function readBankTrace(inventoryPath: string): Promise<BankTrace> {
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
    const trace = account?.$AccountWide?.diagnostics?.lastBankTrace
    if (trace !== undefined) return trace
  }

  throw new DataError(
    `TemperInventory.lua at ${inventoryPath}: no diagnostics.lastBankTrace under any ` +
      `@<account>/$AccountWide (interact with a banker, then /reloadui, then re-run)`
  )
}
