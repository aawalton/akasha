import { getPages } from "@akasha/pages-access/get"
import { upsertPage } from "@akasha/pages-access/upsert"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { asRecord } from "@akasha/utils-narrow/as-record"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"
import {
  type ParsedSavedVariables,
  parseSavedVariablesContent,
} from "@temper/player-build-validation/completion-saved-variables-parser"
import { type CompletionImportVerdict, classifyCompletionImport } from "@temper/player-completion/completion-import-outcome"
import { mergeAccountCompletionForward, mergeCharacterCompletionForward, mergeCompanionCompletionForward } from "@temper/player-completion/completion-merge-forward"

type TemperSupabaseClient = SupabaseServiceRoleClient

function asT<T>(value: Record<string, unknown>): T {
  return value as T
}

function readCompletion<T>(attributes: unknown): T | undefined {
  const completion = asRecord(asRecord(attributes)?.completion)
  return completion === undefined ? undefined : asT<T>(completion)
}

function asFiledText(value: unknown): string {
  return JSON.stringify(value)
}

function reportOutcome(label: string, verdict: CompletionImportVerdict): undefined {
  if (verdict.outcome !== "preserved") return
  console.warn(
    `  ⚠ ${label}: incoming completion was missing ${verdict.preservedFields.join(", ")}; forward-merge preserved stored data. Possible saved-variables wipe or parse regression.`
  )
}

function parseSavedVariables(content: string): ParsedSavedVariables {
  return parseSavedVariablesContent(content)
}

export async function runImportCompletion(
  content: string,
  supabase: TemperSupabaseClient,
  options: { userId?: string } = {}
): Promise<void> {
  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runImportCompletion: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  const data = parseSavedVariables(content)

  const charCount = Object.keys(data.characters).length
  const companionCount = Object.keys(data.companions).length
  console.log(`Found: 1 account, ${charCount} character(s), ${companionCount} companion(s).\n`)

  if (data.diagnostics.knownSectionCount === 0) {
    throw new Error(
      "runImportCompletion: saved variables contained none of account/characters/companions — unrecognised shape, refusing to treat as an empty account"
    )
  }
  if (data.diagnostics.skippedCharacters > 0) {
    console.warn(
      `  ⚠ ${data.diagnostics.skippedCharacters} character entry/entries were not readable and were skipped.`
    )
  }
  if (data.diagnostics.skippedCompanions > 0) {
    console.warn(
      `  ⚠ ${data.diagnostics.skippedCompanions} companion(s) have an ESO def-id this build does not know and were skipped; companion data may be out of date.`
    )
  }

  console.log("--- Account ---")
  const { rows: existingAccountRows } = await getPages({
    pageTypeSlug: "temper-account",
    where: [{ key: "title", eq: userId }],
    select: ["id", "title", "completion"],
    limit: 1,
  })
  const existingAccountCompletion = readCompletion<AccountCompletion>(existingAccountRows[0])
  const mergedAccount = data.account
    ? mergeAccountCompletionForward(existingAccountCompletion, data.account)
    : undefined
  reportOutcome(
    "Account",
    classifyCompletionImport(existingAccountCompletion, data.account, mergedAccount)
  )
  const accountRow = await upsertPage({
    pageTypeSlug: "temper-account",
    where: [{ key: "title", eq: userId }],
    set: {
      userId,
      title: userId,
      ...(mergedAccount ? { completion: asFiledText(mergedAccount) } : {}),
    },
    select: ["id"],
  })
  const accountPageId = accountRow.id
  if (typeof accountPageId !== "string") {
    throw new Error("runImportCompletion: page_upsert(temper-account) returned no id")
  }
  if (data.account) {
    console.log(`  Account: upserted (${accountPageId})`)
  } else {
    console.log(`  Account: no completion data, upserted identity only (${accountPageId})`)
  }

  console.log("\n--- Characters ---")
  const { rows: existingCharacterRows } = await getPages({
    pageTypeSlug: "temper-account-character",
    select: ["id", "title", "esoCharacterId", "sortOrder", "completion"],
    limit: 1000,
  })
  const sortOrderAlreadySet = new Set<string>()
  const existingCompletionByEso = new Map<string, CharacterCompletion>()
  for (const row of existingCharacterRows) {
    const attrs = asRecord(row) ?? {}
    if (typeof attrs.esoCharacterId !== "string") continue
    if (typeof attrs.sortOrder === "number") {
      sortOrderAlreadySet.add(attrs.esoCharacterId)
    }
    const existingCompletion = readCompletion<CharacterCompletion>(attrs)
    if (existingCompletion !== undefined) {
      existingCompletionByEso.set(attrs.esoCharacterId, existingCompletion)
    }
  }
  for (const [esoCharacterId, charData] of Object.entries(data.characters)) {
    const { name, priorityOrder, ...completion } = charData
    const shouldSetSortOrder =
      priorityOrder !== undefined && !sortOrderAlreadySet.has(esoCharacterId)
    const existingCompletion = existingCompletionByEso.get(esoCharacterId)
    const mergedCompletion = mergeCharacterCompletionForward(existingCompletion, completion)
    reportOutcome(
      `Character ${name ?? esoCharacterId}`,
      classifyCompletionImport(existingCompletion, completion, mergedCompletion)
    )
    await upsertPage({
      pageTypeSlug: "temper-account-character",
      where: [{ key: "esoCharacterId", eq: esoCharacterId }],
      set: {
        userId,
        accountPage: userId,
        esoCharacterId,
        title: name,
        ...(shouldSetSortOrder ? { sortOrder: priorityOrder } : {}),
        completion: asFiledText(mergedCompletion),
      },
      select: ["id"],
    })
    console.log(`  Characters: ${name ?? esoCharacterId} upserted`)
  }
  if (charCount > 0) {
    console.log(`  Characters: ${charCount} uploaded`)
  }

  console.log("\n--- Companions ---")
  if (companionCount === 0) {
    console.log("  No companion data found")
  } else {
    const { rows: existingCompanionRows } = await getPages({
      pageTypeSlug: "temper-companion-progress",
      select: ["id", "companionId", "completion"],
      limit: 1000,
    })
    const existingCompletionByCompanion = new Map<string, CompanionCompletion>()
    for (const row of existingCompanionRows) {
      const attrs = asRecord(row) ?? {}
      if (typeof attrs.companionId !== "string") continue
      const existingCompletion = readCompletion<CompanionCompletion>(attrs)
      if (existingCompletion !== undefined) {
        existingCompletionByCompanion.set(attrs.companionId, existingCompletion)
      }
    }
    for (const { companionId, data: compData } of Object.values(data.companions)) {
      const existingCompletion = existingCompletionByCompanion.get(companionId)
      const mergedCompletion = mergeCompanionCompletionForward(existingCompletion, compData)
      reportOutcome(
        `Companion ${companionId}`,
        classifyCompletionImport(existingCompletion, compData, mergedCompletion)
      )
      await upsertPage({
        pageTypeSlug: "temper-companion-progress",
        where: [{ key: "companionId", eq: companionId }],
        set: {
          userId,
          accountPage: userId,
          companionId,
          completion: asFiledText(mergedCompletion),
        },
        select: ["id"],
      })
      console.log(`  Companions: ${companionId} upserted`)
    }
    console.log(`  Companions: ${companionCount} uploaded`)
  }
}
