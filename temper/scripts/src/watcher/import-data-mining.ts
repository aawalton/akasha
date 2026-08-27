import {
  extractMinedItemRows,
  extractMinedQuestRows,
  isFullyRead,
  type MinedExtract,
  type MinedExtractDiagnostics,
  type MinedItemRow,
  type MinedQuestRow,
  readMinedAccountWide,
  TEMPER_DATA_MINING_SIBLINGS,
} from "../mined-data-parse"
import { detectIndent, replaceOrInsertLuaBlock } from "./export-settings-lua"
import { withUploadRetry } from "./upload-retry"

function parseDataMining(content: string): {
  items: MinedExtract<MinedItemRow>
  quests: MinedExtract<MinedQuestRow>
} {
  const accountWide = readMinedAccountWide(content)
  return {
    items: extractMinedItemRows(accountWide),
    quests: extractMinedQuestRows(accountWide),
  }
}

const ITEM_BATCH_SIZE = 1000
const QUEST_BATCH_SIZE = 1000

const EXPIRED_TOKEN_MESSAGE = "Invalid or expired watcher token"

interface UpsertResponse {
  ok?: boolean
  upserted?: number
  error?: string
}

function parseUpsertResponse(value: unknown): UpsertResponse | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const ok = "ok" in value && typeof value.ok === "boolean" ? value.ok : undefined
  const upserted =
    "upserted" in value && typeof value.upserted === "number" ? value.upserted : undefined
  const error = "error" in value && typeof value.error === "string" ? value.error : undefined
  return { ok, upserted, error }
}

async function postBatch<T>(url: string, wtToken: string, items: readonly T[]): Promise<void> {
  let response: Response
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ wtToken, items }),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Network error calling ${url}: ${message}`)
  }

  if (response.ok) return

  let body: UpsertResponse | null = null
  try {
    body = parseUpsertResponse(await response.json())
  } catch {}

  if (response.status === 401) {
    throw new Error(EXPIRED_TOKEN_MESSAGE)
  }

  const message = body?.error ?? `HTTP ${response.status} from ${url}`
  throw new Error(message)
}

const MAX_NAMED_IDS = 20

function nameSome(values: readonly (number | string)[]): string {
  if (values.length <= MAX_NAMED_IDS) return values.join(", ")
  return `${values.slice(0, MAX_NAMED_IDS).join(", ")}, +${values.length - MAX_NAMED_IDS} more`
}

function decideBlockDrain(
  block: "items" | "quests",
  posted: number,
  diagnostics: MinedExtractDiagnostics
): boolean {
  if (isFullyRead(diagnostics)) {
    if (posted > 0) console.log(`  ${block}: posted ${posted}, read every entry — clearing block.`)
    return posted > 0
  }

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
  console.warn(
    `  ⚠ ${block}: posted ${posted}, ${losses.join(" and ")}. Leaving the ${block} block on disk — clearing it would destroy the entries this build cannot read, and the file is their only copy. The posted entries upsert by id, so re-posting them next pass is harmless.`
  )
  for (const { reason, count } of diagnostics.reasons) {
    console.warn(`      ${count}× ${reason}`)
  }
  return false
}

export async function runImportDataMining(
  content: string,
  serverUrl: string,
  wtToken: string
): Promise<{ content: string; modified: boolean }> {
  const { items, quests } = parseDataMining(content)

  const itemsUrl = `${serverUrl}/api/watcher/upsert-mined-items`
  const questsUrl = `${serverUrl}/api/watcher/upsert-mined-quests`

  for (let i = 0; i < items.rows.length; i += ITEM_BATCH_SIZE) {
    const batch = items.rows.slice(i, i + ITEM_BATCH_SIZE)
    await withUploadRetry(() => postBatch(itemsUrl, wtToken, batch))
  }
  for (let i = 0; i < quests.rows.length; i += QUEST_BATCH_SIZE) {
    const batch = quests.rows.slice(i, i + QUEST_BATCH_SIZE)
    await withUploadRetry(() => postBatch(questsUrl, wtToken, batch))
  }

  const clearItems = decideBlockDrain("items", items.rows.length, items.diagnostics)
  const clearQuests = decideBlockDrain("quests", quests.rows.length, quests.diagnostics)

  let lines: readonly string[] = content.split("\n")

  if (clearItems) {
    const itemsIndent = detectIndent(lines, "items", TEMPER_DATA_MINING_SIBLINGS)
    lines = replaceOrInsertLuaBlock(
      lines,
      "items",
      [`${itemsIndent}["items"] =`, `${itemsIndent}{},`],
      TEMPER_DATA_MINING_SIBLINGS
    )
  }

  if (clearQuests) {
    const questsIndent = detectIndent(lines, "quests", TEMPER_DATA_MINING_SIBLINGS)
    lines = replaceOrInsertLuaBlock(
      lines,
      "quests",
      [`${questsIndent}["quests"] =`, `${questsIndent}{},`],
      TEMPER_DATA_MINING_SIBLINGS
    )
  }

  const modifiedContent = lines.join("\n")
  return { content: modifiedContent, modified: modifiedContent !== content }
}
