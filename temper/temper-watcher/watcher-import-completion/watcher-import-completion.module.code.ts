import { getPages } from "@akasha/pages-access/get"
import type { PageSelect } from "@akasha/pages-access/types"
import { type UpsertPageArgs, upsertPage } from "@akasha/pages-access/upsert"
import type { Page, PageWhere } from "@akasha/pages-core/page-types"
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

export const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

export const COMPANION_PAGE_TYPE_SLUG = "temper-companion-progress"

export const CHILD_ROW_LIMIT = 1000

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

function storedCompletion<T>(row: unknown): T | undefined {
  const completion = asRecord(asRecord(row)?.completion)
  return completion === undefined ? undefined : (completion as T)
}

type MergeForward<T> = (stored: T | undefined, fresh: T | undefined) => T | undefined

interface ForwardFold {
  readonly report: ReportLine
  readonly preservedLabels: string[]
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

export async function runImportCompletion(
  content: string,
  deps: ImportCompletionDeps = {}
): Promise<ImportCompletionOutcome> {
  const read = deps.read ?? getPages
  const upsert = deps.upsert ?? upsertPage
  const report = deps.report ?? log
  const companionIdByDefId = deps.companionIdByDefId ?? getCompanionIdByDefId

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
    select: ["id", "title", "completion"],
    limit: 1,
  })
  const mergedAccount = mergedForward<AccountCompletion>(
    fold,
    "Account",
    storedCompletion<AccountCompletion>(accountRead.rows[0]),
    data.account,
    mergeAccountCompletionForward
  )
  const accountRow = await upsert({
    pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
    set: {
      userId,
      title: userId,
      ...(mergedAccount === undefined ? {} : { completion: JSON.stringify(mergedAccount) }),
    },
    select: ["id"],
  })
  const accountPageId = accountRow.id
  if (typeof accountPageId !== "string") throw new Error(noAccountPageIdWhy(userId))
  report(
    mergedAccount === undefined
      ? `Account: no completion data, so only the account page itself was written (${accountPageId})`
      : `Account: upserted (${accountPageId})`
  )

  report("--- Characters ---")
  const characterRead = await read({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    select: ["id", "title", "esoCharacterId", "sortOrder", "completion"],
    limit: CHILD_ROW_LIMIT,
  })
  const sortOrderAlreadySet = new Set<string>()
  const storedByEsoCharacterId = new Map<string, CharacterCompletion>()
  for (const row of characterRead.rows) {
    const attributes = asRecord(row) ?? {}
    const esoCharacterId = attributes.esoCharacterId
    if (typeof esoCharacterId !== "string") continue
    if (typeof attributes.sortOrder === "number") sortOrderAlreadySet.add(esoCharacterId)
    const stored = storedCompletion<CharacterCompletion>(attributes)
    if (stored !== undefined) storedByEsoCharacterId.set(esoCharacterId, stored)
  }
  for (const [esoCharacterId, entry] of Object.entries(data.characters)) {
    const { name, priorityOrder, ...completion } = entry
    const merged = mergedForward<CharacterCompletion>(
      fold,
      `Character ${name ?? esoCharacterId}`,
      storedByEsoCharacterId.get(esoCharacterId),
      completion,
      mergeCharacterCompletionForward
    )
    await upsert({
      pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
      where: [{ key: "esoCharacterId", eq: esoCharacterId }],
      set: {
        userId,
        accountPage: userId,
        esoCharacterId,
        title: name,
        ...(priorityOrder !== undefined && !sortOrderAlreadySet.has(esoCharacterId)
          ? { sortOrder: priorityOrder }
          : {}),
        completion: JSON.stringify(merged),
      },
      select: ["id"],
    })
    report(`Characters: ${name ?? esoCharacterId} upserted`)
  }
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
    select: ["id", "companionId", "completion"],
    limit: CHILD_ROW_LIMIT,
  })
  const storedByCompanionId = new Map<string, CompanionCompletion>()
  for (const row of companionRead.rows) {
    const attributes = asRecord(row) ?? {}
    const companionId = attributes.companionId
    if (typeof companionId !== "string") continue
    const stored = storedCompletion<CompanionCompletion>(attributes)
    if (stored !== undefined) storedByCompanionId.set(companionId, stored)
  }
  for (const { companionId, data: fresh } of Object.values(data.companions)) {
    const merged = mergedForward<CompanionCompletion>(
      fold,
      `Companion ${companionId}`,
      storedByCompanionId.get(companionId),
      fresh,
      mergeCompanionCompletionForward
    )
    await upsert({
      pageTypeSlug: COMPANION_PAGE_TYPE_SLUG,
      where: [{ key: "companionId", eq: companionId }],
      set: {
        userId,
        accountPage: userId,
        companionId,
        completion: JSON.stringify(merged),
      },
      select: ["id"],
    })
    report(`Companions: ${companionId} upserted`)
  }
  report(`Companions: ${companionCount} uploaded`)

  return {
    accountPageId,
    accountCompletionWritten: mergedAccount !== undefined,
    characterCount,
    companionCount,
    preservedLabels: fold.preservedLabels,
  }
}
