import { getPages } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
import { patchPageById } from "@akasha/pages-access/patch"
import type { Page } from "@akasha/pages-core/page-types"
import type { CompletionOverride } from "@akasha/temper-player-completion/completion-override"
import type { ParsedCompletionOverrideRow } from "@akasha/temper-player-completion/completion-override-row"
import { parseCompletionOverrideRow } from "@akasha/temper-player-completion/completion-override-row"
import { serializeLuaBlock } from "@akasha/temper-saved-variables/lua-serializer"
import { stringAt } from "@akasha/utils-narrow/string-at"
import type { CharactersConfigFileInputs } from "../watcher-config-file/watcher-config-file.module.code.ts"
import { serializeCharactersConfigFile } from "../watcher-config-file/watcher-config-file.module.code.ts"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"
import { compileCharacterPriority } from "../watcher-settings-consumables/watcher-settings-consumables.module.code.ts"
import {
  detectIndent,
  replaceOrInsertLuaBlock,
} from "../watcher-settings-lua-block/watcher-settings-lua-block.module.code.ts"
import { writeSideFileIfChanged } from "../watcher-side-file/watcher-side-file.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export const TASK_PAGE_TYPE_SLUG = "temper-task"

export const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

export const COMPLETION_OVERRIDE_PAGE_TYPE_SLUG = "temper-completion-override"

export const TASKS_KEY = "tasks"

export const CHARACTER_PRIORITY_KEY = "characterPriority"

export const TEMPER_CHARACTERS_SIBLINGS = ["characters", "account", "navigation"] as const

const ROWS_PER_READ = 1000

const DEFAULT_SCOPE = "account"

export interface TaskData {
  readonly title: string
  readonly description: string | null
  readonly rrule: string | null
  readonly dueDate: string | null
  readonly dueTime: string | null
  readonly scope: string
  readonly esoCharacterId: string | null
  readonly sortOrder: number
  readonly priority: string | null
  readonly completionCardId: string | null
  readonly completionItemPath: readonly (string | number)[] | null
}

export interface ExportTasksResult {
  readonly content: string
  readonly modified: boolean
  readonly charactersConfigSideFileHash: string | null
}

export type PageCollect = typeof collectPages

export type PageGet = typeof getPages

export type PagePatchById = typeof patchPageById

export type CharacterPriorityCompile = typeof compileCharacterPriority

export type SideFileWrite = typeof writeSideFileIfChanged

export type ExportReport = (message: string) => void

export interface ExportTasksOptions {
  readonly userId?: string
  readonly charactersConfigPath?: string
  readonly dryRun?: boolean
  readonly collect?: PageCollect
  readonly getRows?: PageGet
  readonly patchRow?: PagePatchById
  readonly compilePriority?: CharacterPriorityCompile
  readonly writeSideFile?: SideFileWrite
  readonly report?: ExportReport
}

export function itemPathAt(
  values: Readonly<Record<string, unknown>>,
  key: string
): readonly (string | number)[] | null {
  const value = values[key]
  if (!Array.isArray(value)) return null
  for (const segment of value) {
    if (typeof segment !== "string" && typeof segment !== "number") return null
  }
  return value
}

export function taskKey(row: Page): string {
  return stringAt(row, "pgId") ?? row.id
}

export function taskDataFrom(row: Page, esoCharacterId: string | null): TaskData {
  const sortOrder = row.sortOrder
  return {
    title: stringAt(row, "title") ?? "",
    description: stringAt(row, "description"),
    rrule: stringAt(row, "rruleRule"),
    dueDate: stringAt(row, "dueDate"),
    dueTime: stringAt(row, "dueTime"),
    scope: stringAt(row, "scope") ?? DEFAULT_SCOPE,
    esoCharacterId,
    sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
    priority: stringAt(row, "priority"),
    completionCardId: stringAt(row, "completionCardId"),
    completionItemPath: itemPathAt(row, "completionItemPath"),
  }
}

async function learnCharacterEsoIds(
  characterPageIds: readonly string[],
  into: Map<string, string>,
  getRows: PageGet
): Promise<undefined> {
  const wanted = Array.from(new Set(characterPageIds.filter((id) => !into.has(id))))
  if (wanted.length === 0) return
  const { rows } = await getRows({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where: [{ key: "id", in: wanted }],
    limit: wanted.length,
  })
  for (const row of rows) {
    const id = stringAt(row, "id")
    const esoCharacterId = stringAt(row, "esoCharacterId")
    if (id !== null && esoCharacterId !== null) into.set(id, esoCharacterId)
  }
  return
}

export async function completionOverridesByEsoCharacter(
  userId: string,
  characterEsoIdById: Map<string, string>,
  collect: PageCollect = collectPages,
  getRows: PageGet = getPages
): Promise<Record<string, CompletionOverride[]>> {
  const rows = await collect({
    pageTypeSlug: COMPLETION_OVERRIDE_PAGE_TYPE_SLUG,
    where: [{ key: "userId", eq: userId }],
    pageSize: ROWS_PER_READ,
  })

  const parsed: ParsedCompletionOverrideRow[] = []
  for (const row of rows) {
    const one = parseCompletionOverrideRow(row)
    if (one !== null) parsed.push(one)
  }
  if (parsed.length === 0) return {}

  await learnCharacterEsoIds(
    parsed.map((one) => one.characterId),
    characterEsoIdById,
    getRows
  )

  const grouped: Record<string, CompletionOverride[]> = {}
  for (const one of parsed) {
    const esoCharacterId = characterEsoIdById.get(one.characterId)
    if (esoCharacterId === undefined) continue
    const already = grouped[esoCharacterId]
    if (already === undefined) grouped[esoCharacterId] = [one.override]
    else already.push(one.override)
  }
  return grouped
}

function writeCharactersConfig(
  path: string,
  inputs: CharactersConfigFileInputs,
  writeSideFile: SideFileWrite
): string {
  return writeSideFile(path, serializeCharactersConfigFile(inputs))
}

export async function runExportTasks(
  content: string,
  supabase: SignedInReader,
  options: ExportTasksOptions = {}
): Promise<ExportTasksResult> {
  const collect = options.collect ?? collectPages
  const getRows = options.getRows ?? getPages
  const patchRow = options.patchRow ?? patchPageById
  const compilePriority = options.compilePriority ?? compileCharacterPriority
  const writeSideFile = options.writeSideFile ?? writeSideFileIfChanged
  const report = options.report ?? log
  const configPath = options.charactersConfigPath
  const sideFilePath = configPath != null && options.dryRun !== true ? configPath : null

  const userId = await userIdFor(supabase, options.userId, "export these tasks")

  const rows = await collect({
    pageTypeSlug: TASK_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: userId }],
    pageSize: ROWS_PER_READ,
  })
  const tasks = rows.filter((row) => typeof row.id === "string")

  if (tasks.length === 0) {
    report("No tasks to export.")
    if (sideFilePath === null) {
      return { content, modified: false, charactersConfigSideFileHash: null }
    }
    const characterPriority = await compilePriority(userId)
    const completionOverrides = await completionOverridesByEsoCharacter(
      userId,
      new Map<string, string>(),
      collect,
      getRows
    )
    return {
      content,
      modified: false,
      charactersConfigSideFileHash: writeCharactersConfig(
        sideFilePath,
        { characterPriority, tasks: {}, completionOverrides },
        writeSideFile
      ),
    }
  }

  const characterEsoIdById = new Map<string, string>()
  const taskCharacterIds: string[] = []
  for (const row of tasks) {
    const characterPageId = stringAt(row, "character")
    if (characterPageId !== null) taskCharacterIds.push(characterPageId)
  }
  await learnCharacterEsoIds(taskCharacterIds, characterEsoIdById, getRows)

  const tasksRecord: Record<string, TaskData> = {}
  for (const row of tasks) {
    const characterPageId = stringAt(row, "character")
    const esoCharacterId =
      characterPageId === null ? null : (characterEsoIdById.get(characterPageId) ?? null)
    tasksRecord[taskKey(row)] = taskDataFrom(row, esoCharacterId)
  }

  report(`Exporting ${tasks.length} task(s).`)

  let lines: readonly string[] = content.split("\n")
  const indent = detectIndent(lines, TASKS_KEY, TEMPER_CHARACTERS_SIBLINGS)
  lines = replaceOrInsertLuaBlock(
    lines,
    TASKS_KEY,
    serializeLuaBlock(TASKS_KEY, tasksRecord, indent),
    TEMPER_CHARACTERS_SIBLINGS
  )

  const characterPriority = await compilePriority(userId)
  lines = replaceOrInsertLuaBlock(
    lines,
    CHARACTER_PRIORITY_KEY,
    serializeLuaBlock(CHARACTER_PRIORITY_KEY, characterPriority, indent),
    TEMPER_CHARACTERS_SIBLINGS
  )

  const modifiedContent = lines.join("\n")

  const pending = tasks.filter((row) => row.pendingSync === true)
  for (const row of pending) {
    await patchRow({ pageTypeSlug: TASK_PAGE_TYPE_SLUG, id: row.id, set: { pendingSync: false } })
  }
  if (pending.length > 0) report(`Cleared pendingSync on ${pending.length} task(s).`)

  for (const row of tasks) {
    report(`Task ${row.id}: ${stringAt(row, "title") ?? ""}`)
  }

  let charactersConfigSideFileHash: string | null = null
  if (sideFilePath !== null) {
    const completionOverrides = await completionOverridesByEsoCharacter(
      userId,
      characterEsoIdById,
      collect,
      getRows
    )
    charactersConfigSideFileHash = writeCharactersConfig(
      sideFilePath,
      { characterPriority, tasks: tasksRecord, completionOverrides },
      writeSideFile
    )
  }

  return {
    content: modifiedContent,
    modified: modifiedContent !== content,
    charactersConfigSideFileHash,
  }
}
