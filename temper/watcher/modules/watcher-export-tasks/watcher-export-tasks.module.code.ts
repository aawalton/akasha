import { stringAt } from "akasha/code/type/narrowing/modules/string-at/string-at.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import { patchPageById } from "akasha/page/access/modules/patch/patch.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  completionShapeOf,
  readsAsDone,
} from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { serializeLuaBlock } from "akasha/temper/eso/saved-variable/modules/lua-serializer/lua-serializer.module.code.ts"
import { accountAddressOf } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { completionCardOfPageSlug } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-page/completion-card-page.module.code.ts"
import type { CompletionOverride } from "akasha/temper/player/completion/temper-player-completion/modules/completion-override/completion-override.module.code.ts"
import type { ParsedCompletionOverrideRow } from "akasha/temper/player/completion/temper-player-completion/modules/completion-override-row/completion-override-row.module.code.ts"
import { parseCompletionOverrideRow } from "akasha/temper/player/completion/temper-player-completion/modules/completion-override-row/completion-override-row.module.code.ts"
import type { CharactersConfigFileInputs } from "akasha/temper/watcher/modules/watcher-config-file/watcher-config-file.module.code.ts"
import { serializeCharactersConfigFile } from "akasha/temper/watcher/modules/watcher-config-file/watcher-config-file.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import { compileCharacterPriority } from "akasha/temper/watcher/modules/watcher-settings-consumables/watcher-settings-consumables.module.code.ts"
import {
  detectIndent,
  replaceOrInsertLuaBlock,
} from "akasha/temper/watcher/modules/watcher-settings-lua-block/watcher-settings-lua-block.module.code.ts"
import { writeSideFileIfChanged } from "akasha/temper/watcher/modules/watcher-side-file/watcher-side-file.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export const TASK_PAGE_TYPE_SLUG = "temper-task"

export const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

export const COMPLETION_OVERRIDE_PAGE_TYPE_SLUG = "temper-completion-override"

const TASKS_KEY = "tasks"

const CHARACTER_PRIORITY_KEY = "characterPriority"

const TEMPER_CHARACTERS_SIBLINGS = ["characters", "account", "navigation"] as const

const ROWS_PER_READ = 1000

const DEFAULT_SCOPE = "account"

interface TaskData {
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

interface ExportTasksResult {
  readonly content: string
  readonly modified: boolean
  readonly charactersConfigSideFileHash: string | null
}

export type PageCollect = typeof collectPages

export type PageGet = typeof getPages

export type PagePatchById = typeof patchPageById

type CharacterPriorityCompile = typeof compileCharacterPriority

type SideFileWrite = typeof writeSideFileIfChanged

type ExportReport = (message: string) => void

type AccountAddressOf = (userId: string) => Promise<string>

export interface ExportTasksOptions {
  readonly userId?: string
  readonly addressOf?: AccountAddressOf
  readonly charactersConfigPath?: string
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
  return row.id
}

function cardIdOf(named: string | null): string | null {
  return named === null || named === "" ? null : completionCardOfPageSlug(slugOf(named))
}

function stillToDo(row: Page): boolean {
  const shape = completionShapeOf(TASK_PAGE_TYPE_SLUG)
  if (shape === null) return true
  return !readsAsDone(shape, row)
}

export function taskDataFrom(row: Page, esoCharacterId: string | null): TaskData {
  const sortOrder = row.displayOrder
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
    completionCardId: cardIdOf(stringAt(row, "completionCard")),
    completionItemPath: itemPathAt(row, "completionItemPath"),
  }
}

async function learnCharacterEsoIds(
  characterSlugs: readonly string[],
  into: Map<string, string>,
  getRows: PageGet
): Promise<undefined> {
  const wanted = Array.from(new Set(characterSlugs.filter((slug) => !into.has(slug))))
  if (wanted.length === 0) return
  const { rows } = await getRows({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where: [{ key: "slug", in: wanted }],
    limit: wanted.length,
  })
  for (const row of rows) {
    const slug = stringAt(row, "slug")
    const esoCharacterId = stringAt(row, "esoCharacterId")
    if (slug !== null && esoCharacterId !== null) into.set(slug, esoCharacterId)
  }
  return
}

async function completionOverridesByEsoCharacter(
  accountPage: string,
  characterEsoIdBySlug: Map<string, string>,
  collect: PageCollect = collectPages,
  getRows: PageGet = getPages
): Promise<Record<string, CompletionOverride[]>> {
  const rows = await collect({
    pageTypeSlug: COMPLETION_OVERRIDE_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: accountPage }],
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
    characterEsoIdBySlug,
    getRows
  )

  const grouped: Record<string, CompletionOverride[]> = {}
  for (const one of parsed) {
    const esoCharacterId = characterEsoIdBySlug.get(one.characterId)
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
  const sideFilePath = options.charactersConfigPath ?? null

  const userId = await userIdFor(supabase, options.userId, "export these tasks")
  const accountPage = await (options.addressOf ?? accountAddressOf)(userId)

  const rows = await collect({
    pageTypeSlug: TASK_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: accountPage }],
    pageSize: ROWS_PER_READ,
  })
  const tasks = rows.filter((row) => typeof row.id === "string" && stillToDo(row))

  if (tasks.length === 0) {
    report("No tasks to export.")
    if (sideFilePath === null) {
      return { content, modified: false, charactersConfigSideFileHash: null }
    }
    const characterPriority = await compilePriority(accountPage)
    const completionOverrides = await completionOverridesByEsoCharacter(
      accountPage,
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

  const characterEsoIdBySlug = new Map<string, string>()
  const taskCharacterSlugs: string[] = []
  for (const row of tasks) {
    const named = stringAt(row, "character")
    if (named !== null) taskCharacterSlugs.push(slugOf(named))
  }
  await learnCharacterEsoIds(taskCharacterSlugs, characterEsoIdBySlug, getRows)

  const tasksRecord: Record<string, TaskData> = {}
  for (const row of tasks) {
    const named = stringAt(row, "character")
    const esoCharacterId = named === null ? null : (characterEsoIdBySlug.get(slugOf(named)) ?? null)
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

  const characterPriority = await compilePriority(accountPage)
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
      accountPage,
      characterEsoIdBySlug,
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
