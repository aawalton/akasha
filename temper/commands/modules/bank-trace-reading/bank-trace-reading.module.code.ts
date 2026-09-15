import {
  pickInventoryDiagnostic,
  readInventoryDiagnostic,
} from "akasha/temper/command/modules/inventory-diagnostics-reading/inventory-diagnostics-reading.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/saved-variables/modules/lua-array/lua-array.module.code.ts"
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

const PACED_MOVE_SCHEMA = z
  .object({
    sourceBag: z.number(),
    sourceSlot: z.number(),
    targetBag: z.number(),
    targetSlot: z.number(),
    count: z.number(),
    attempts: z.number(),
    itemId: z.number(),
    stackAtIssue: z.number(),
    stackNow: z.number(),
    targetStack: z.number().optional(),
    targetMax: z.number().optional(),
  })
  .strict()

const PACED_ROUND_SCHEMA = z
  .object({
    elapsedMs: z.number(),
    confirmed: z.number(),
    retried: z.number(),
    left: z.number(),
    unconfirmed: luaArrayOrEmpty(PACED_MOVE_SCHEMA).optional(),
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
    rounds: luaArrayOrEmpty(PACED_ROUND_SCHEMA).optional(),
    abandoned: luaArrayOrEmpty(PACED_MOVE_SCHEMA).optional(),
  })
  .strict()

const STACKING_COUNT_SCHEMA = z
  .object({
    bag: z.number(),
    partialsBefore: z.number(),
    partialsAfter: z.number().optional(),
  })
  .strict()

const STACKING_SCHEMA = z
  .object({
    ran: z.boolean(),
    bags: luaArrayOrEmpty(z.number()).optional(),
    counts: luaArrayOrEmpty(STACKING_COUNT_SCHEMA).optional(),
    skipped: z.string().optional(),
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
    buildFacts: BRACKET_SCHEMA.optional(),
    walkRules: BRACKET_SCHEMA.optional(),
    crafting: CRAFTING_SCHEMA.optional(),
    unattributedMs: z.number().optional(),
  })
  .strict()

const TRACE_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    timestamp: z.number(),
    venue: z.enum(["bank", "store", "fence"]).optional(),
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
    handler: SETTLING_SCHEMA.optional(),
    settling: SETTLING_SCHEMA.optional(),
    pacedDispatch: PACED_DISPATCH_SCHEMA.optional(),
    stacking: STACKING_SCHEMA.optional(),
  })
  .strict()

export type BankTraceBracket = z.infer<typeof BRACKET_SCHEMA>

export type BankTraceSettling = z.infer<typeof SETTLING_SCHEMA>

export type BankTracePacedMove = z.infer<typeof PACED_MOVE_SCHEMA>

export type BankTracePacedDispatch = z.infer<typeof PACED_DISPATCH_SCHEMA>

export type BankTraceStacking = z.infer<typeof STACKING_SCHEMA>

export type BankTrace = z.infer<typeof TRACE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    bankTraces: luaArrayOrEmpty(TRACE_SCHEMA).optional(),
    lastBankTrace: TRACE_SCHEMA.optional(),
    storeTraces: luaArrayOrEmpty(TRACE_SCHEMA).optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

function visitsIn(wide: z.infer<typeof ACCOUNT_WIDE_SCHEMA>): BankTrace[] | undefined {
  const kept = wide.diagnostics?.bankTraces
  if (kept !== undefined && kept.length > 0) return [...kept].reverse()
  const last = wide.diagnostics?.lastBankTrace
  return last === undefined ? undefined : [last]
}

export async function readBankTraces(inventoryPath: string): Promise<BankTrace[]> {
  return await readInventoryDiagnostic(
    inventoryPath,
    ACCOUNT_WIDE_SCHEMA,
    visitsIn,
    "no diagnostics.bankTraces (interact with a banker, then /reloadui, then re-run)"
  )
}

function venueVisitsIn(wide: z.infer<typeof ACCOUNT_WIDE_SCHEMA>): BankTrace[] | undefined {
  const kept = wide.diagnostics?.storeTraces
  if (kept === undefined || kept.length === 0) return undefined
  return [...kept].reverse()
}

export async function readVenueTraces(inventoryPath: string): Promise<BankTrace[]> {
  const kept = await pickInventoryDiagnostic(inventoryPath, ACCOUNT_WIDE_SCHEMA, venueVisitsIn)
  return kept ?? []
}
