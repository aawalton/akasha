import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { getPages } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
import { patchPageById } from "@akasha/pages-access/patch"
import { type Page } from "@akasha/pages-core/page-types"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { isAnyCompletionCardId } from "@temper/player-completion/completion-card-id"
import type { CompletionOverride } from "@temper/player-completion/completion-overrides"
import { serializeLuaBlock } from "@akasha/temper-saved-variables/lua-serializer"
import { compileCharacterPriority } from "./export-settings-consumables"
import { detectIndent, replaceOrInsertLuaBlock } from "./export-settings-lua"
import {
  type CharactersConfigFileInputs,
  serializeCharactersConfigFile,
} from "./export-tasks-config-file"

const TEMPER_CHARACTERS_SIBLINGS = ["characters", "account", "navigation"] as const

interface TaskData {
  title: string
  description: string | null
  rrule: string | null
  dueDate: string | null
  dueTime: string | null
  scope: string
  esoCharacterId: string | null
  sortOrder: number
  priority: string | null
  completionCardId: string | null
  completionItemPath: readonly (string | number)[] | null
}

type TaskPageRow = Page & { id: string }

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" ? value : null
}

function asPath(value: unknown): readonly (string | number)[] | null {
  if (!Array.isArray(value)) return null
  for (const part of value) {
    if (typeof part !== "string" && typeof part !== "number") return null
  }
  return value
}

async function buildCompletionOverridesByEsoCharId(
  userId: string,
  characterEsoIdById: Map<string, string>
): Promise<Record<string, CompletionOverride[]>> {
  const rows = await collectPages({
    pageTypeSlug: "temper-completion-override",
    where: [{ key: "userId", eq: userId }],
    pageSize: 1000,
  })
  if (rows.length === 0) return {}

  const missingCharacterIds = Array.from(
    new Set(
      rows
        .map((r) => asString(r.character))
        .filter((id): id is string => id !== null && !characterEsoIdById.has(id))
    )
  )
  if (missingCharacterIds.length > 0) {
    const { rows: characterRows } = await getPages({
      pageTypeSlug: "temper-account-character",
      where: [{ key: "id", in: missingCharacterIds }],
      limit: missingCharacterIds.length,
    })
    for (const characterRow of characterRows) {
      const id = asString(characterRow.id)
      const esoCharacterId = asString(characterRow.esoCharacterId)
      if (id !== null && esoCharacterId !== null) {
        characterEsoIdById.set(id, esoCharacterId)
      }
    }
  }

  const grouped: Record<string, CompletionOverride[]> = {}
  for (const row of rows) {
    const characterPageId = asString(row.character)
    if (characterPageId === null) continue
    const esoCharacterId = characterEsoIdById.get(characterPageId)
    if (esoCharacterId === undefined) continue

    const completionCardId = asString(row.completionCardId)
    const completionItemPath = asPath(row.completionItemPath)
    const floor = asNumber(row.floor)
    if (completionCardId === null || completionItemPath === null || floor === null) continue
    if (!isAnyCompletionCardId(completionCardId)) continue

    const override: CompletionOverride = {
      completionCardId,
      completionItemPath,
      floor,
    }
    const existing = grouped[esoCharacterId]
    if (existing === undefined) {
      grouped[esoCharacterId] = [override]
    } else {
      existing.push(override)
    }
  }
  return grouped
}

export interface ExportTasksResult {
  content: string
  modified: boolean
  charactersConfigSideFileHash: string | null
}

export async function runExportTasks(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string; charactersConfigPath?: string; dryRun?: boolean } = {}
): Promise<ExportTasksResult> {
  const charactersConfigPath = options.charactersConfigPath
  const dryRun = options.dryRun ?? false
  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runExportTasks: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  const rows = await collectPages({
    pageTypeSlug: "temper-task",
    where: [{ key: "account", eq: userId }],
    pageSize: 1000,
  })

  if (rows.length === 0) {
    console.log("No tasks to export.")
    let charactersConfigSideFileHash: string | null = null
    if (charactersConfigPath != null && !dryRun) {
      const characterPriority = await compileCharacterPriority(userId)
      const completionOverrides = await buildCompletionOverridesByEsoCharId(
        userId,
        new Map<string, string>()
      )
      const inputs: CharactersConfigFileInputs = {
        characterPriority,
        tasks: {},
        completionOverrides,
      }
      const sideFileContent = serializeCharactersConfigFile(inputs)
      charactersConfigSideFileHash = writeSideFileIfChanged(charactersConfigPath, sideFileContent)
    }
    return { content, modified: false, charactersConfigSideFileHash }
  }

  const tasks: TaskPageRow[] = rows.filter((r): r is TaskPageRow => typeof r.id === "string")

  const characterIds = Array.from(
    new Set(tasks.map((r) => asString(r.character)).filter((id): id is string => id !== null))
  )
  const characterEsoIdById = new Map<string, string>()
  if (characterIds.length > 0) {
    const { rows: characterRows } = await getPages({
      pageTypeSlug: "temper-account-character",
      where: [{ key: "id", in: characterIds }],
      limit: characterIds.length,
    })
    for (const characterRow of characterRows) {
      const id = asString(characterRow.id)
      const esoCharacterId = asString(characterRow.esoCharacterId)
      if (id !== null && esoCharacterId !== null) {
        characterEsoIdById.set(id, esoCharacterId)
      }
    }
  }

  const tasksRecord: Record<string, TaskData> = {}
  for (const row of tasks) {
    const key = asString(row.pgId) ?? row.id
    const characterPageId = asString(row.character)
    const esoCharacterId =
      characterPageId !== null ? (characterEsoIdById.get(characterPageId) ?? null) : null
    tasksRecord[key] = {
      title: asString(row.title) ?? "",
      description: asString(row.description),
      rrule: asString(row.rruleRule),
      dueDate: asString(row.dueDate),
      dueTime: asString(row.dueTime),
      scope: asString(row.scope) ?? "account",
      esoCharacterId,
      sortOrder: asNumber(row.sortOrder) ?? 0,
      priority: asString(row.priority),
      completionCardId: asString(row.completionCardId),
      completionItemPath: asPath(row.completionItemPath),
    }
  }

  console.log(`Exporting ${tasks.length} task(s).\n`)

  let lines: readonly string[] = content.split("\n")
  const indent = detectIndent(lines, "tasks", TEMPER_CHARACTERS_SIBLINGS)

  const tasksBlock = serializeLuaBlock("tasks", tasksRecord, indent)
  lines = replaceOrInsertLuaBlock(lines, "tasks", tasksBlock, TEMPER_CHARACTERS_SIBLINGS)

  const characterPriority = await compileCharacterPriority(userId)
  const priorityBlock = serializeLuaBlock("characterPriority", characterPriority, indent)
  lines = replaceOrInsertLuaBlock(
    lines,
    "characterPriority",
    priorityBlock,
    TEMPER_CHARACTERS_SIBLINGS
  )

  const modifiedContent = lines.join("\n")

  const pendingRows = tasks.filter((r) => r.pendingSync === true)
  for (const row of pendingRows) {
    await patchPageById({
      pageTypeSlug: "temper-task",
      id: row.id,
      set: { pendingSync: false },
    })
  }
  if (pendingRows.length > 0) {
    console.log(`Cleared pending_sync flag for ${pendingRows.length} task(s).`)
  }

  for (const row of tasks) {
    console.log(`  Task ${row.id}: ${asString(row.title) ?? ""}`)
  }

  let charactersConfigSideFileHash: string | null = null
  if (charactersConfigPath != null && !dryRun) {
    const completionOverrides = await buildCompletionOverridesByEsoCharId(
      userId,
      characterEsoIdById
    )
    const inputs: CharactersConfigFileInputs = {
      characterPriority,
      tasks: tasksRecord,
      completionOverrides,
    }
    const sideFileContent = serializeCharactersConfigFile(inputs)
    charactersConfigSideFileHash = writeSideFileIfChanged(charactersConfigPath, sideFileContent)
  }

  return {
    content: modifiedContent,
    modified: modifiedContent !== content,
    charactersConfigSideFileHash,
  }
}

function writeSideFileIfChanged(path: string, desired: string): string {
  let current: string | null = null
  try {
    current = readFileSync(path, "utf-8")
  } catch {}
  if (current !== desired) {
    writeFileSync(path, desired)
  }
  return createHash("sha256").update(desired).digest("hex")
}
