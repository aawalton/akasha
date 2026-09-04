import { getPages } from "@akasha/pages-access/get"
import type { PageSelect } from "@akasha/pages-access/types"
import { type UpsertPageArgs, upsertPage } from "@akasha/pages-access/upsert"
import type { Page, PageWhere } from "@akasha/pages-core/page-types"
import { readFiles, readPages, writeFiles } from "@akasha/pages-query"
import { getCompanionIdByDefId } from "@akasha/temper-companions-core/companions"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"
import { parseSavedVariablesContent } from "@akasha/temper-completion-import/completion-saved-variables-parser"
import { classifyCompletionImport } from "@akasha/temper-player-completion/completion-import-outcome"
import {
  mergeAccountCompletionForward,
  mergeCharacterCompletionForward,
  mergeCompanionCompletionForward,
} from "@akasha/temper-player-completion/completion-merge-forward"
import { asRecord } from "@akasha/utils-narrow/as-record"
import type { Json } from "@akasha/utils-narrow/json-value"
import { ACCOUNT_PAGE_TYPE_SLUG } from "../watcher-account-page/watcher-account-page.module.code.ts"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"
import type {
  ReadFiles,
  ReadPages,
  WriteFiles,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  besidePathsFor,
  contentIn,
  noPagePathWhy,
  PAGE_LANDING_WRITER,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"

export const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

export const COMPANION_PAGE_TYPE_SLUG = "temper-companion-progress"

export const CHILD_ROW_LIMIT = 1000

export const COMPLETION_PROPERTY = "completion"

export const COMPLETION_ENDING = "json"

export const NO_SIGNED_IN_USER =
  "no user is signed in, so a completion import has no account to write under"

export const UNREADABLE_SAVED_VARIABLES =
  "the saved variables name no account, no characters and no companions, so the file is refused rather than read as an empty account"

export interface CompletionRowsQuery {
  readonly pageTypeSlug: string
  readonly where?: PageWhere
  readonly select?: PageSelect
  readonly limit?: number
}

export type CompletionPageRead = (
  query: CompletionRowsQuery
) => Promise<{ readonly rows: readonly Page[] }>

export type CompletionPageUpsert = (args: UpsertPageArgs<Record<string, Json>>) => Promise<Page>

export type SignedInUserId = () => Promise<string | undefined>

export type ReportLine = (message: string) => void

export type CompanionIdByDefId = (defId: number) => string | undefined

export interface ImportCompletionDeps {
  readonly userId?: string
  readonly signedInUserId?: SignedInUserId
  readonly read?: CompletionPageRead
  readonly upsert?: CompletionPageUpsert
  readonly readPages?: ReadPages
  readonly readFiles?: ReadFiles
  readonly writeFiles?: WriteFiles
  readonly report?: ReportLine
  readonly companionIdByDefId?: CompanionIdByDefId
}

export interface ImportCompletionOutcome {
  readonly accountPageId: string
  readonly accountCompletionWritten: boolean
  readonly characterCount: number
  readonly companionCount: number
  readonly preservedLabels: readonly string[]
}

export function foundCounts(characterCount: number, companionCount: number): string {
  return `found 1 account, ${characterCount} character(s), ${companionCount} companion(s)`
}

export function skippedCharactersWhy(count: number): string {
  return `${count} character entry/entries were not readable and were skipped`
}

export function skippedCompanionsWhy(count: number): string {
  return `${count} companion(s) carry an ESO def-id this build does not know and were skipped, so companion data may be out of date`
}

export function preservedWhy(label: string, fields: readonly string[]): string {
  return `${label}: the incoming completion was missing ${fields.join(", ")}, and the forward merge kept what was stored. A saved-variables wipe or a parse regression looks like this.`
}

export function noAccountPageIdWhy(userId: string): string {
  return `the ${ACCOUNT_PAGE_TYPE_SLUG} page for ${userId} came back with no id`
}

export function completionRoadWhy(pageTypeSlug: string, act: string, why: string): string {
  return `the completion files beside the ${pageTypeSlug} pages ${act}: ${why}`
}

export function unparsedCompletionWhy(path: string): string {
  return `the completion file at ${path} holds no JSON object, so a merge forward from it would lower what the game already counted`
}

export function completionBody(completion: unknown): string {
  return `${JSON.stringify(completion, null, 2)}\n`
}

function slugOf(row: unknown): string | undefined {
  const slug = asRecord(row)?.slug
  return typeof slug === "string" ? slug : undefined
}

function slugsBy(rows: readonly Page[], key: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const row of rows) {
    const named = asRecord(row)?.[key]
    const slug = slugOf(row)
    if (typeof named === "string" && slug !== undefined) found.set(named, slug)
  }
  return found
}

function storedCompletion<T>(path: string, held: string | null): T | undefined {
  if (held === null) return undefined
  let parsed: unknown
  try {
    parsed = JSON.parse(held)
  } catch {
    throw new Error(unparsedCompletionWhy(path))
  }
  const completion = asRecord(parsed)
  if (completion === undefined) throw new Error(unparsedCompletionWhy(path))
  return completion as T
}

type MergeForward<T> = (stored: T | undefined, fresh: T | undefined) => T | undefined

interface ForwardFold {
  readonly report: ReportLine
  readonly preservedLabels: string[]
}

interface CompletionRoad {
  readonly readPages: ReadPages
  readonly readFiles: ReadFiles
  readonly writeFiles: WriteFiles
  readonly upsert: CompletionPageUpsert
}

interface CompletionSubject<T> {
  readonly label: string
  readonly slug: string
  readonly fresh: T | undefined
}

function mergedForward<T>(
  fold: ForwardFold,
  label: string,
  stored: T | undefined,
  fresh: T | undefined,
  mergeForward: MergeForward<T>
): T | undefined {
  const merged = fresh === undefined ? undefined : mergeForward(stored, fresh)
  const verdict = classifyCompletionImport(stored, fresh, merged)
  if (verdict.outcome === "preserved") {
    fold.preservedLabels.push(label)
    fold.report(preservedWhy(label, verdict.preservedFields))
  }
  return merged
}

async function landCompletions<T>(
  fold: ForwardFold,
  road: CompletionRoad,
  pageTypeSlug: string,
  subjects: readonly CompletionSubject<T>[],
  mergeForward: MergeForward<T>
): Promise<readonly (T | undefined)[]> {
  if (subjects.length === 0) return []
  const beside = await besidePathsFor(
    road.readPages,
    pageTypeSlug,
    subjects.map((one) => one.slug),
    COMPLETION_PROPERTY,
    COMPLETION_ENDING
  )
  const found = await road.readFiles([...beside.values()])
  if (!found.ok) throw new Error(completionRoadWhy(pageTypeSlug, "went unread", found.why))
  const merged: (T | undefined)[] = []
  const puts: { path: string; content: string }[] = []
  const unnamed: string[] = []
  for (const subject of subjects) {
    const path = beside.get(subject.slug) ?? ""
    const held = contentIn(found.bodies, path)
    const one = mergedForward<T>(
      fold,
      subject.label,
      storedCompletion<T>(path, held),
      subject.fresh,
      mergeForward
    )
    merged.push(one)
    if (one === undefined) continue
    const content = completionBody(one)
    if (content === held) continue
    puts.push({ path, content })
    if (held === null) unnamed.push(subject.slug)
  }
  if (puts.length > 0) {
    const message = `temper: completion for ${puts.length} ${pageTypeSlug} page(s)`
    const landed = await road.writeFiles(puts, PAGE_LANDING_WRITER, message)
    if (!landed.ok) throw new Error(completionRoadWhy(pageTypeSlug, "did not land", landed.why))
  }
  for (const slug of unnamed) {
    await road.upsert({
      pageTypeSlug,
      where: [{ key: "slug", eq: slug }],
      set: { completion: COMPLETION_ENDING },
      select: ["id"],
    })
  }
  return merged
}

export async function runImportCompletion(
  content: string,
  deps: ImportCompletionDeps = {}
): Promise<ImportCompletionOutcome> {
  const read = deps.read ?? getPages
  const upsert = deps.upsert ?? upsertPage
  const report = deps.report ?? log
  const companionIdByDefId = deps.companionIdByDefId ?? getCompanionIdByDefId
  const road: CompletionRoad = {
    readPages: deps.readPages ?? readPages,
    readFiles: deps.readFiles ?? readFiles,
    writeFiles: deps.writeFiles ?? writeFiles,
    upsert,
  }

  const askUser = deps.signedInUserId
  const userId = deps.userId ?? (askUser === undefined ? undefined : await askUser())
  if (userId === undefined || userId === "") throw new Error(NO_SIGNED_IN_USER)

  const data = parseSavedVariablesContent(content, companionIdByDefId)
  const characterCount = Object.keys(data.characters).length
  const companionCount = Object.keys(data.companions).length
  report(foundCounts(characterCount, companionCount))

  if (data.diagnostics.knownSectionCount === 0) throw new Error(UNREADABLE_SAVED_VARIABLES)
  if (data.diagnostics.skippedCharacters > 0) {
    report(skippedCharactersWhy(data.diagnostics.skippedCharacters))
  }
  if (data.diagnostics.skippedCompanions > 0) {
    report(skippedCompanionsWhy(data.diagnostics.skippedCompanions))
  }

  const fold: ForwardFold = { report, preservedLabels: [] }

  report("--- Account ---")
  const accountRead = await read({
    pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
    select: ["id", "slug", "title"],
    limit: 1,
  })
  const accountRow = await upsert({
    pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
    set: { title: userId },
    select: ["id", "slug"],
  })
  const accountPageId = accountRow.id
  if (typeof accountPageId !== "string") throw new Error(noAccountPageIdWhy(userId))
  const accountSlug = slugOf(accountRead.rows[0]) ?? slugOf(accountRow)
  if (accountSlug === undefined) throw new Error(noPagePathWhy(ACCOUNT_PAGE_TYPE_SLUG, userId))
  const accountMerged = await landCompletions<AccountCompletion>(
    fold,
    road,
    ACCOUNT_PAGE_TYPE_SLUG,
    [{ label: "Account", slug: accountSlug, fresh: data.account }],
    mergeAccountCompletionForward
  )
  const mergedAccount = accountMerged[0]
  report(
    mergedAccount === undefined
      ? `Account: no completion data, so only the account page itself was written (${accountPageId})`
      : `Account: upserted (${accountPageId})`
  )

  report("--- Characters ---")
  const characterRead = await read({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    select: ["id", "slug", "esoCharacterId", "displayOrder"],
    limit: CHILD_ROW_LIMIT,
  })
  const characterSlugs = slugsBy(characterRead.rows, "esoCharacterId")
  const sortOrderAlreadySet = new Set<string>()
  for (const row of characterRead.rows) {
    const held = asRecord(row) ?? {}
    if (typeof held.esoCharacterId !== "string") continue
    if (typeof held.displayOrder === "number") sortOrderAlreadySet.add(held.esoCharacterId)
  }
  const characterSubjects: CompletionSubject<CharacterCompletion>[] = []
  for (const [esoCharacterId, entry] of Object.entries(data.characters)) {
    const { name, priorityOrder, ...completion } = entry
    const label = name ?? esoCharacterId
    const row = await upsert({
      pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
      where: [{ key: "esoCharacterId", eq: esoCharacterId }],
      set: {
        accountPage: userId,
        esoCharacterId,
        title: name,
        ...(priorityOrder !== undefined && !sortOrderAlreadySet.has(esoCharacterId)
          ? { displayOrder: priorityOrder }
          : {}),
      },
      select: ["id", "slug"],
    })
    const slug = characterSlugs.get(esoCharacterId) ?? slugOf(row)
    if (slug === undefined) throw new Error(noPagePathWhy(CHARACTER_PAGE_TYPE_SLUG, label))
    characterSubjects.push({ label: `Character ${label}`, slug, fresh: completion })
    report(`Characters: ${label} upserted`)
  }
  await landCompletions<CharacterCompletion>(
    fold,
    road,
    CHARACTER_PAGE_TYPE_SLUG,
    characterSubjects,
    mergeCharacterCompletionForward
  )
  if (characterCount > 0) report(`Characters: ${characterCount} uploaded`)

  report("--- Companions ---")
  if (companionCount === 0) {
    report("No companion data found")
    return {
      accountPageId,
      accountCompletionWritten: mergedAccount !== undefined,
      characterCount,
      companionCount,
      preservedLabels: fold.preservedLabels,
    }
  }

  const companionRead = await read({
    pageTypeSlug: COMPANION_PAGE_TYPE_SLUG,
    select: ["id", "slug", "companionId"],
    limit: CHILD_ROW_LIMIT,
  })
  const companionSlugs = slugsBy(companionRead.rows, "companionId")
  const companionSubjects: CompletionSubject<CompanionCompletion>[] = []
  for (const { companionId, data: fresh } of Object.values(data.companions)) {
    const row = await upsert({
      pageTypeSlug: COMPANION_PAGE_TYPE_SLUG,
      where: [{ key: "companionId", eq: companionId }],
      set: { accountPage: userId, companionId },
      select: ["id", "slug"],
    })
    const slug = companionSlugs.get(companionId) ?? slugOf(row)
    if (slug === undefined) throw new Error(noPagePathWhy(COMPANION_PAGE_TYPE_SLUG, companionId))
    companionSubjects.push({ label: `Companion ${companionId}`, slug, fresh })
    report(`Companions: ${companionId} upserted`)
  }
  await landCompletions<CompanionCompletion>(
    fold,
    road,
    COMPANION_PAGE_TYPE_SLUG,
    companionSubjects,
    mergeCompanionCompletionForward
  )
  report(`Companions: ${companionCount} uploaded`)

  return {
    accountPageId,
    accountCompletionWritten: mergedAccount !== undefined,
    characterCount,
    companionCount,
    preservedLabels: fold.preservedLabels,
  }
}
