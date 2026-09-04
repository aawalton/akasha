"use client"

import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import { usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"
import { useMemo } from "react"

const ACCOUNT_PAGE_TYPE_SLUG = "temper-account"
const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"
const COMPANION_PAGE_TYPE_SLUG = "temper-companion-progress"

const CHILD_ROW_LIMIT = 200

export interface CompletionCharacterRow {
  id: string
  userId: string
  accountPage: string | null
  esoCharacterId: string
  title: string | undefined
  completion: CharacterCompletion | null
  sortOrder: number | undefined
  roles: readonly string[]
  liveBuildId: string | undefined
  targetBuildId: string | undefined
  createdAt: number
  updatedAt: number
}

export interface CompletionCompanionRow {
  id: string
  userId: string
  accountPage: string | null
  companionId: string
  completion: CompanionCompletion | null
  sortOrder: number | undefined
  roles: readonly string[]
  liveBuildId: string | undefined
  targetBuildId: string | undefined
  createdAt: number
  updatedAt: number
}

function parseTimestamp(value: unknown): number {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Date.parse(value)
    if (!Number.isNaN(parsed)) return parsed
  }
  return 0
}

function parseString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function parseStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

function parseOptionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function parseOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

function parseStringArray(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === "string")
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function asCharacterCompletion(value: unknown): CharacterCompletion {
  return value as CharacterCompletion
}

function asCompanionCompletion(value: unknown): CompanionCompletion {
  return value as CompanionCompletion
}

function asAccountCompletion(value: unknown): AccountCompletion {
  return value as AccountCompletion
}

function parseCharacterCompletion(value: unknown): CharacterCompletion | null {
  return isObject(value) ? asCharacterCompletion(value) : null
}

function parseCompanionCompletion(value: unknown): CompanionCompletion | null {
  return isObject(value) ? asCompanionCompletion(value) : null
}

function parseAccountCompletion(value: unknown): AccountCompletion | null {
  return isObject(value) ? asAccountCompletion(value) : null
}

function mapCharacterRow(row: Record<string, unknown>): CompletionCharacterRow {
  return {
    id: parseString(row.id),
    userId: parseString(row.userId),
    accountPage: parseStringOrNull(row.accountPage),
    esoCharacterId: parseString(row.esoCharacterId),
    title: parseOptionalString(row.title),
    completion: parseCharacterCompletion(row.completion),
    sortOrder: parseOptionalNumber(row.sortOrder),
    roles: parseStringArray(row.roles),
    liveBuildId: parseOptionalString(row.liveBuildId),
    targetBuildId: parseOptionalString(row.targetBuildId),
    createdAt: parseTimestamp(row.createdAt),
    updatedAt: parseTimestamp(row.updatedAt),
  }
}

function mapCompanionRow(row: Record<string, unknown>): CompletionCompanionRow {
  return {
    id: parseString(row.id),
    userId: parseString(row.userId),
    accountPage: parseStringOrNull(row.accountPage),
    companionId: parseString(row.companionId),
    completion: parseCompanionCompletion(row.completion),
    sortOrder: parseOptionalNumber(row.sortOrder),
    roles: parseStringArray(row.roles),
    liveBuildId: parseOptionalString(row.liveBuildId),
    targetBuildId: parseOptionalString(row.targetBuildId),
    createdAt: parseTimestamp(row.createdAt),
    updatedAt: parseTimestamp(row.updatedAt),
  }
}

function sortBySortOrderAscNullsLast<T extends { sortOrder: number | undefined }>(
  rows: readonly T[]
): readonly T[] {
  return [...rows].sort((a, b) => {
    const aOrder = a.sortOrder ?? Number.POSITIVE_INFINITY
    const bOrder = b.sortOrder ?? Number.POSITIVE_INFINITY
    return aOrder - bOrder
  })
}

export function useCompletionCharacters() {
  const userId = useUserId()
  return useCompletionCharactersByUserInternal(userId)
}

export function useCompletionCharactersByUser(userId: string | null) {
  return useCompletionCharactersByUserInternal(userId)
}

function useCompletionCharactersByUserInternal(userId: string | null) {
  const { rows, isLoading, isDegraded, error } = usePagesSupabase({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "sortOrder", dir: "asc" }],
    limit: CHILD_ROW_LIMIT,
  })

  const characters = useMemo<readonly CompletionCharacterRow[]>(() => {
    if (userId == null) return []
    return sortBySortOrderAscNullsLast(rows.map(mapCharacterRow))
  }, [rows, userId])

  return {
    characters,
    isLoading: userId != null ? isLoading : false,
    isDegraded: userId != null ? isDegraded : false,
    isError: error !== null,
    error,
    retry: undefined,
  }
}

export function useCompletionCompanions() {
  const userId = useUserId()
  return useCompletionCompanionsByUserInternal(userId)
}

export function useCompletionCompanionsByUser(userId: string) {
  return useCompletionCompanionsByUserInternal(userId)
}

function useCompletionCompanionsByUserInternal(userId: string | null) {
  const { rows, isLoading, error } = usePagesSupabase({
    pageTypeSlug: COMPANION_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    order: [{ by: "sortOrder", dir: "asc" }],
    limit: CHILD_ROW_LIMIT,
  })

  const companions = useMemo<readonly CompletionCompanionRow[]>(() => {
    if (userId == null) return []
    return sortBySortOrderAscNullsLast(rows.map(mapCompanionRow))
  }, [rows, userId])

  return {
    companions,
    isLoading: userId != null ? isLoading : false,
    isError: error !== null,
    error,
    retry: undefined,
  }
}

export function useAccountCompletion() {
  const userId = useUserId()
  return useAccountCompletionByUserInternal(userId)
}

export function useAccountCompletionByUser(userId: string) {
  return useAccountCompletionByUserInternal(userId)
}

function useAccountCompletionByUserInternal(userId: string | null) {
  const { rows, isLoading, error } = usePagesSupabase({
    pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    limit: 1,
  })

  const account = useMemo<AccountCompletion | null>(() => {
    if (userId == null) return null
    const row = rows[0]
    if (!row) return null
    return parseAccountCompletion(row.completion)
  }, [rows, userId])

  return {
    account,
    isLoading: userId != null ? isLoading : false,
    isError: error !== null,
    error,
    retry: undefined,
  }
}
