import type {
  MinedItemEntry,
  MinedQuestEntry,
} from "@akasha/temper-capture-datamining/datamining-payload"
import { readFirstAccountWide } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import type { z } from "zod"
import {
  minedItemSchema,
  minedQuestSchema,
} from "../saved-variables-schema/saved-variables-schema.module.code.ts"

const SAVED_VARIABLES_NAME = "TemperDataMining_SavedVariables"

export const TEMPER_DATA_MINING_SIBLINGS = ["version", "nextItemId"] as const

export type MinedItemRow = Omit<MinedItemEntry, "requiredCP"> & {
  itemId: number
  requiredCp: number
}
export type MinedQuestRow = MinedQuestEntry & { questId: number }

export interface MinedFailureReason {
  readonly reason: string
  readonly count: number
}

export interface MinedExtractDiagnostics {
  readonly unreadableIds: readonly number[]
  readonly nonIntegerKeys: readonly string[]
  readonly reasons: readonly MinedFailureReason[]
}

export interface MinedExtract<Row> {
  readonly rows: readonly Row[]
  readonly diagnostics: MinedExtractDiagnostics
}

export function isFullyRead(diagnostics: MinedExtractDiagnostics): boolean {
  return diagnostics.unreadableIds.length === 0 && diagnostics.nonIntegerKeys.length === 0
}

function issueSignatures(error: z.ZodError): readonly string[] {
  return error.issues.map((issue) =>
    issue.path.length === 0 ? issue.code : `${issue.code} at ${issue.path.join(".")}`
  )
}

function rankReasons(counts: ReadonlyMap<string, number>): readonly MinedFailureReason[] {
  return [...counts.entries()]
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => {
      const byCount = b.count - a.count
      return byCount !== 0 ? byCount : a.reason.localeCompare(b.reason)
    })
}

type EntryParse<Row> =
  | { readonly ok: true; readonly row: Row }
  | { readonly ok: false; readonly error: z.ZodError }

function extractMinedRows<Row>(
  rawMap: unknown,
  parse: (id: number, rawEntry: unknown) => EntryParse<Row>
): MinedExtract<Row> {
  const rows: Row[] = []
  const unreadableIds: number[] = []
  const nonIntegerKeys: string[] = []
  const reasonCounts = new Map<string, number>()

  const raw = asRecord(rawMap)
  if (!raw) {
    return { rows, diagnostics: { unreadableIds, nonIntegerKeys, reasons: [] } }
  }

  for (const [key, rawEntry] of Object.entries(raw)) {
    const id = parseInt(key, 10)
    if (Number.isNaN(id)) {
      nonIntegerKeys.push(key)
      continue
    }
    const result = parse(id, rawEntry)
    if (result.ok) {
      rows.push(result.row)
      continue
    }
    unreadableIds.push(id)
    for (const signature of issueSignatures(result.error)) {
      reasonCounts.set(signature, (reasonCounts.get(signature) ?? 0) + 1)
    }
  }

  return {
    rows,
    diagnostics: { unreadableIds, nonIntegerKeys, reasons: rankReasons(reasonCounts) },
  }
}

export function readMinedAccountWide(content: string): Record<string, unknown> {
  const root = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in TemperDataMining saved variables")
  }
  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error("Could not find $AccountWide in TemperDataMining saved variables")
  }
  return accountWide
}

export function extractMinedItemRows(
  accountWide: Record<string, unknown>
): MinedExtract<MinedItemRow> {
  return extractMinedRows(accountWide.items, (itemId, rawEntry) => {
    const parsed = minedItemSchema.safeParse(rawEntry)
    if (!parsed.success) return { ok: false, error: parsed.error }
    const { requiredCP, ...rest } = parsed.data
    return { ok: true, row: { itemId, requiredCp: requiredCP, ...rest } }
  })
}

export function extractMinedQuestRows(
  accountWide: Record<string, unknown>
): MinedExtract<MinedQuestRow> {
  return extractMinedRows(accountWide.quests, (questId, rawEntry) => {
    const parsed = minedQuestSchema.safeParse(rawEntry)
    if (!parsed.success) return { ok: false, error: parsed.error }
    return { ok: true, row: { questId, ...parsed.data } }
  })
}
