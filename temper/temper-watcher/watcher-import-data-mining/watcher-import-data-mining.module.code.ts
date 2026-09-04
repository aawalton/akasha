import {
  extractMinedItemRows,
  extractMinedQuestRows,
  isFullyRead,
  type MinedExtract,
  type MinedExtractDiagnostics,
  readMinedAccountWide,
  TEMPER_DATA_MINING_SIBLINGS,
} from "@akasha/temper-capture-datamining-reader/mined-data-parse"
import { z } from "zod"
import {
  detectIndent,
  replaceOrInsertLuaBlock,
} from "../watcher-settings-lua-block/watcher-settings-lua-block.module.code.ts"
import {
  type UploadRetryOptions,
  withUploadRetry,
} from "../watcher-upload-retry/watcher-upload-retry.module.code.ts"

const UPLOAD_BATCH_SIZE = 1000

const MAX_NAMED_IDS = 20

export const EXPIRED_TOKEN_MESSAGE = "Invalid or expired watcher token"

export type Fetching = (url: string, init: RequestInit) => Promise<Response>

export type MinedBlockKey = "items" | "quests"

export type ImportNoteLevel = "info" | "warning"

export interface ImportNote {
  readonly level: ImportNoteLevel
  readonly message: string
}

export interface BlockClearing {
  readonly clear: boolean
  readonly notes: readonly ImportNote[]
}

export interface ImportDataMiningOptions {
  readonly fetching?: Fetching
  readonly retry?: UploadRetryOptions
}

export interface ImportDataMiningResult {
  readonly content: string
  readonly modified: boolean
  readonly notes: readonly ImportNote[]
}

interface MinedBlockPlan {
  readonly path: string
  readonly extract: (accountWide: Record<string, unknown>) => MinedExtract<unknown>
}

const MINED_BLOCK_KEYS = ["items", "quests"] as const satisfies readonly MinedBlockKey[]

const MINED_BLOCKS = {
  items: { path: "/api/watcher/upsert-mined-items", extract: extractMinedItemRows },
  quests: { path: "/api/watcher/upsert-mined-quests", extract: extractMinedQuestRows },
} as const satisfies Record<MinedBlockKey, MinedBlockPlan>

const SERVER_FAULT = z.object({ error: z.string() })

const overHttp: Fetching = (url, init) => fetch(url, init)

async function faultTheServerNamed(response: Response): Promise<string | null> {
  let body: unknown
  try {
    body = await response.json()
  } catch {
    return null
  }
  const read = SERVER_FAULT.safeParse(body)
  return read.success ? read.data.error : null
}

async function postBatch(
  url: string,
  wtToken: string,
  items: readonly unknown[],
  fetching: Fetching
): Promise<void> {
  let response: Response
  try {
    response = await fetching(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ wtToken, items }),
    })
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new Error(`Network error calling ${url}: ${why}`)
  }

  if (response.ok) return
  if (response.status === 401) throw new Error(EXPIRED_TOKEN_MESSAGE)

  throw new Error((await faultTheServerNamed(response)) ?? `HTTP ${response.status} from ${url}`)
}

function nameSome(values: readonly (number | string)[]): string {
  if (values.length <= MAX_NAMED_IDS) return values.join(", ")
  return `${values.slice(0, MAX_NAMED_IDS).join(", ")}, +${values.length - MAX_NAMED_IDS} more`
}

function describeLosses(diagnostics: MinedExtractDiagnostics): string {
  const losses: string[] = []
  if (diagnostics.unreadableIds.length > 0) {
    losses.push(
      `${diagnostics.unreadableIds.length} unreadable (${nameSome(diagnostics.unreadableIds)})`
    )
  }
  if (diagnostics.nonIntegerKeys.length > 0) {
    losses.push(
      `${diagnostics.nonIntegerKeys.length} non-integer key(s) (${nameSome(diagnostics.nonIntegerKeys)})`
    )
  }
  return losses.join(" and ")
}

export function decideBlockClearing(
  block: MinedBlockKey,
  posted: number,
  diagnostics: MinedExtractDiagnostics
): BlockClearing {
  if (isFullyRead(diagnostics)) {
    if (posted === 0) return { clear: false, notes: [] }
    return {
      clear: true,
      notes: [
        {
          level: "info",
          message: `${block}: posted ${posted}, read every entry — clearing block.`,
        },
      ],
    }
  }

  return {
    clear: false,
    notes: [
      {
        level: "warning",
        message: `${block}: posted ${posted}, ${describeLosses(diagnostics)}. Leaving the ${block} block on disk — clearing it would destroy the entries this build cannot read, and the file is their only copy. The posted entries upsert by id, so re-posting them on the next run is harmless.`,
      },
      ...diagnostics.reasons.map(({ reason, count }) => ({
        level: "warning" as const,
        message: `    ${count}× ${reason}`,
      })),
    ],
  }
}

function emptiedBlock(lines: readonly string[], key: MinedBlockKey): readonly string[] {
  const indent = detectIndent(lines, key, TEMPER_DATA_MINING_SIBLINGS)
  return replaceOrInsertLuaBlock(
    lines,
    key,
    [`${indent}["${key}"] =`, `${indent}{},`],
    TEMPER_DATA_MINING_SIBLINGS
  )
}

export async function runImportDataMining(
  content: string,
  serverUrl: string,
  wtToken: string,
  options: ImportDataMiningOptions = {}
): Promise<ImportDataMiningResult> {
  const fetching = options.fetching ?? overHttp
  const accountWide = readMinedAccountWide(content)

  const notes: ImportNote[] = []
  let lines: readonly string[] = content.split("\n")

  for (const key of MINED_BLOCK_KEYS) {
    const plan: MinedBlockPlan = MINED_BLOCKS[key]
    const { rows, diagnostics } = plan.extract(accountWide)
    const url = `${serverUrl}${plan.path}`

    for (let at = 0; at < rows.length; at += UPLOAD_BATCH_SIZE) {
      const batch = rows.slice(at, at + UPLOAD_BATCH_SIZE)
      await withUploadRetry(() => postBatch(url, wtToken, batch, fetching), options.retry)
    }

    const clearing = decideBlockClearing(key, rows.length, diagnostics)
    notes.push(...clearing.notes)
    if (clearing.clear) lines = emptiedBlock(lines, key)
  }

  const modifiedContent = lines.join("\n")
  return { content: modifiedContent, modified: modifiedContent !== content, notes }
}
