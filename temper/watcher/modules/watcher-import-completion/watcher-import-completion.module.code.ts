import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import { upsertPage } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { Page, PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  readFiles,
  readPages,
  writeFiles,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { parseSavedVariablesContent } from "akasha/temper/capture/completion-import/modules/completion-saved-variables-parser/completion-saved-variables-parser.module.code.ts"
import { getCompanionIdByDefId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { companionValuesOf } from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import { addressOfSlug } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import {
  type RaceAndClassNaming,
  raceAndClassOf,
} from "akasha/temper/player/character/temper-account-character/modules/character-race-class/character-race-class.module.code.ts"
import {
  accountCompletionSchema,
  type CharacterCompletion,
  type CompanionCompletion,
  characterCompletionSchema,
  companionCompletionSchema,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import {
  mergeAccountCompletionForward,
  mergeCharacterCompletionForward,
  mergeCompanionCompletionForward,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-merge-forward/completion-merge-forward.module.code.ts"
import { ACCOUNT_PAGE_TYPE_SLUG } from "akasha/temper/watcher/modules/watcher-account-page/watcher-account-page.module.code.ts"
import {
  type CompletionPageUpsert,
  type CompletionRoad,
  type CompletionSubject,
  type ForwardFold,
  landCompletions,
} from "akasha/temper/watcher/modules/watcher-completion-landing/watcher-completion-landing.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  noPagePathWhy,
  type ReadFiles,
  type ReadPages,
  type WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

const COMPANION_PAGE_TYPE_SLUG = "temper-companion-progress"

const CHILD_ROW_LIMIT = 1000

export const NO_SIGNED_IN_USER =
  "no user is signed in, so a completion import has no account to write under"

export const UNREADABLE_SAVED_VARIABLES =
  "the saved variables name no account, no characters and no companions, so the file is refused rather than read as an empty account"

interface CompletionRowsQuery {
  readonly pageTypeSlug: string
  readonly where?: PageWhere
  readonly select?: PageSelect
  readonly limit?: number
}

export type CompletionPageRead = (
  query: CompletionRowsQuery
) => Promise<{ readonly rows: readonly Page[] }>

type SignedInUserId = () => Promise<string | undefined>

type ReportLine = (message: string) => void

type CompanionIdByDefId = (defId: number) => string | undefined

interface ImportCompletionDeps {
  readonly userId?: string
  readonly signedInUserId?: SignedInUserId
  readonly read?: CompletionPageRead
  readonly upsert?: CompletionPageUpsert
  readonly readPages?: ReadPages
  readonly readFiles?: ReadFiles
  readonly writeFiles?: WriteFiles
  readonly report?: ReportLine
  readonly companionIdByDefId?: CompanionIdByDefId
  readonly raceAndClassNaming?: RaceAndClassNaming
}

interface ImportCompletionOutcome {
  readonly accountPageId: string
  readonly accountCompletionWritten: boolean
  readonly characterCount: number
  readonly companionCount: number
  readonly preservedLabels: readonly string[]
}

function foundCounts(characterCount: number, companionCount: number): string {
  return `found 1 account, ${characterCount} character(s), ${companionCount} companion(s)`
}

function skippedCharactersWhy(count: number): string {
  return `${count} character entry/entries were not readable and were skipped`
}

export function skippedCompanionsWhy(count: number): string {
  return `${count} companion(s) carry an ESO def-id this build does not know and were skipped, so companion data may be out of date`
}

function noAccountPageIdWhy(userId: string): string {
  return `the ${ACCOUNT_PAGE_TYPE_SLUG} page for ${userId} came back with no id`
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
    where: [{ key: "key", eq: userId }],
    select: ["id", "slug"],
    limit: 1,
  })
  const accountRow = await upsert({
    pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
    where: [{ key: "key", eq: userId }],
    set: { key: userId },
    select: ["id", "slug"],
  })
  const accountPageId = accountRow.id
  if (typeof accountPageId !== "string") throw new Error(noAccountPageIdWhy(userId))
  const accountSlug = slugOf(accountRead.rows[0]) ?? slugOf(accountRow)
  if (accountSlug === undefined) throw new Error(noPagePathWhy(ACCOUNT_PAGE_TYPE_SLUG, userId))
  const accountPage = addressOfSlug(accountSlug)
  const accountMerged = await landCompletions(
    fold,
    road,
    ACCOUNT_PAGE_TYPE_SLUG,
    accountCompletionSchema,
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
        accountPage,
        esoCharacterId,
        title: label,
        ...raceAndClassOf(completion, deps.raceAndClassNaming),
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
  await landCompletions(
    fold,
    road,
    CHARACTER_PAGE_TYPE_SLUG,
    characterCompletionSchema,
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
    const named = companionValuesOf(companionId)
    const row = await upsert({
      pageTypeSlug: COMPANION_PAGE_TYPE_SLUG,
      where: [{ key: "companionId", eq: named.companionId }],
      set: { ...named, accountPage },
      select: ["id", "slug"],
    })
    const slug = companionSlugs.get(named.companionId) ?? slugOf(row)
    if (slug === undefined) throw new Error(noPagePathWhy(COMPANION_PAGE_TYPE_SLUG, companionId))
    companionSubjects.push({ label: `Companion ${companionId}`, slug, fresh })
    report(`Companions: ${companionId} upserted`)
  }
  await landCompletions(
    fold,
    road,
    COMPANION_PAGE_TYPE_SLUG,
    companionCompletionSchema,
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
