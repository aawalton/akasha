"use client"

import { useAuth } from "@shared/auth/use-auth"
import { NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { upsertPage } from "@shared/pages-access/upsert"
import { useOptimisticUpsertPage } from "@shared/pages-ui/supabase/mutations/use-optimistic-upsert-page"
import { usePagesSupabase } from "@shared/pages-ui/supabase/use-pages"
import type { Json } from "../../../../../shared/supabase-database/src/generated/database"
import { asRecord } from "../../../../../shared/utils-narrow/src/as-record"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@temper/game-completion/completion-types"
import { parseSavedVariablesContent } from "@temper/player-build-validation/completion-saved-variables-parser"
import { classifyCompletionImport } from "@temper/player-completion/completion-import-outcome"
import { mergeAccountCompletionForward, mergeCharacterCompletionForward, mergeCompanionCompletionForward } from "@temper/player-completion/completion-merge-forward"
import { useCallback, useEffect, useRef, useState } from "react"
import type { ImportResult } from "@/app/import/actions"

function asJson(value: unknown): Json {
  return value as Json
}

function asT<T>(value: Record<string, unknown>): T {
  return value as T
}

function readCompletion<T>(row: Record<string, unknown> | undefined): T | undefined {
  const completion = asRecord(row?.completion)
  return completion === undefined ? undefined : asT<T>(completion)
}

type ImportState =
  | { phase: "idle" }
  | { phase: "reading" }
  | { phase: "importing" }
  | { phase: "success"; result: ImportResult }
  | { phase: "error"; message: string }

export function useTemperImport() {
  const { userId } = useAuth()
  const [state, setState] = useState<ImportState>({ phase: "idle" })
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const runUpsert = useOptimisticUpsertPage((args) => upsertPage(args))
  const runUpsertRef = useRef(runUpsert)
  useEffect(() => {
    runUpsertRef.current = runUpsert
  }, [runUpsert])

  const userWhere =
    userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }]

  const { rows: existingCharacterRows } = usePagesSupabase({
    pageTypeSlug: "temper-account-character",
    where: userWhere,
    limit: 1000,
  })
  const existingRowsRef = useRef(existingCharacterRows)
  useEffect(() => {
    existingRowsRef.current = existingCharacterRows
  }, [existingCharacterRows])

  const { rows: existingAccountRows } = usePagesSupabase({
    pageTypeSlug: "temper-account",
    where: userWhere,
    limit: 1,
  })
  const existingAccountRef = useRef(existingAccountRows)
  useEffect(() => {
    existingAccountRef.current = existingAccountRows
  }, [existingAccountRows])

  const { rows: existingCompanionRows } = usePagesSupabase({
    pageTypeSlug: "temper-companion-progress",
    where: userWhere,
    limit: 1000,
  })
  const existingCompanionRef = useRef(existingCompanionRows)
  useEffect(() => {
    existingCompanionRef.current = existingCompanionRows
  }, [existingCompanionRows])

  const processFile = useCallback(
    async (file: File) => {
      if (userId == null) {
        setState({ phase: "error", message: "Not authenticated." })
        return
      }
      if (!file.name.endsWith(".lua")) {
        setState({ phase: "error", message: "Please select a .lua file." })
        return
      }

      setState({ phase: "reading" })

      let content: string
      try {
        content = await file.text()
      } catch {
        setState({ phase: "error", message: "Failed to read file." })
        return
      }

      setState({ phase: "importing" })

      let data: ReturnType<typeof parseSavedVariablesContent>
      try {
        data = parseSavedVariablesContent(content)
      } catch (e) {
        setState({
          phase: "error",
          message: e instanceof Error ? e.message : "Failed to parse saved variables file.",
        })
        return
      }

      if (data.diagnostics.knownSectionCount === 0) {
        setState({
          phase: "error",
          message:
            "This file's contents weren't recognised. It may have been written by an out-of-date version of the Temper add-ons. Nothing was imported.",
        })
        return
      }

      try {
        const existingAccount = readCompletion<AccountCompletion>(existingAccountRef.current[0])
        const mergedAccount = mergeAccountCompletionForward(existingAccount, data.account)
        const accountVerdict = classifyCompletionImport(
          existingAccount,
          data.account,
          mergedAccount
        )
        await runUpsertRef.current({
          pageTypeSlug: "temper-account",
          where: [{ key: "title", eq: userId }],
          set: {
            userId,
            title: userId,
            ...(mergedAccount !== undefined ? { completion: asJson(mergedAccount) } : {}),
          },
          select: ["id"],
        })

        const sortOrderAlreadySet = new Set<string>()
        const existingCharacterCompletion = new Map<string, CharacterCompletion>()
        for (const row of existingRowsRef.current) {
          if (typeof row.esoCharacterId !== "string") continue
          if (typeof row.sortOrder === "number") sortOrderAlreadySet.add(row.esoCharacterId)
          const completion = readCompletion<CharacterCompletion>(row)
          if (completion !== undefined) {
            existingCharacterCompletion.set(row.esoCharacterId, completion)
          }
        }

        const existingCompanionCompletion = new Map<string, CompanionCompletion>()
        for (const row of existingCompanionRef.current) {
          if (typeof row.companionId !== "string") continue
          const completion = readCompletion<CompanionCompletion>(row)
          if (completion !== undefined) {
            existingCompanionCompletion.set(row.companionId, completion)
          }
        }

        const characterEntries = Object.entries(data.characters).map(
          ([esoCharacterId, charData]) => {
            const { name, priorityOrder, ...completion } = charData
            const existing = existingCharacterCompletion.get(esoCharacterId)
            const merged = mergeCharacterCompletionForward(existing, completion)
            return {
              esoCharacterId,
              name: name !== "" ? name : esoCharacterId,
              priorityOrder,
              merged,
              verdict: classifyCompletionImport(existing, completion, merged),
            }
          }
        )

        const companionEntries = Object.values(data.companions).map(({ companionId, data: c }) => {
          const existing = existingCompanionCompletion.get(companionId)
          const merged = mergeCompanionCompletionForward(existing, c)
          return {
            companionId,
            merged,
            verdict: classifyCompletionImport(existing, c, merged),
          }
        })

        const characterUpserts = characterEntries.map((entry) =>
          runUpsertRef.current({
            pageTypeSlug: "temper-account-character",
            where: [
              { key: "accountPage", eq: userId },
              { key: "esoCharacterId", eq: entry.esoCharacterId },
            ],
            set: {
              userId,
              accountPage: userId,
              esoCharacterId: entry.esoCharacterId,
              title: entry.name,
              ...(entry.priorityOrder !== undefined &&
              !sortOrderAlreadySet.has(entry.esoCharacterId)
                ? { sortOrder: entry.priorityOrder }
                : {}),
              completion: asJson(entry.merged),
            },
          })
        )

        const companionUpserts = companionEntries.map((entry) =>
          runUpsertRef.current({
            pageTypeSlug: "temper-companion-progress",
            where: [
              { key: "accountPage", eq: userId },
              { key: "companionId", eq: entry.companionId },
            ],
            set: {
              userId,
              accountPage: userId,
              companionId: entry.companionId,
              completion: asJson(entry.merged),
            },
          })
        )

        await Promise.all([...characterUpserts, ...companionUpserts])

        const result: ImportResult = {
          account: {
            name: "Account",
            status: data.account === undefined ? "skipped" : accountVerdict.outcome,
          },
          characters: characterEntries.map((entry) => ({
            esoCharacterId: entry.esoCharacterId,
            name: entry.name,
            status: entry.verdict.outcome,
          })),
          companions: companionEntries.map((entry) => ({
            companionId: entry.companionId,
            status: entry.verdict.outcome,
          })),
          diagnostics: data.diagnostics,
        }
        setState({ phase: "success", result })
      } catch (e) {
        setState({
          phase: "error",
          message: e instanceof Error ? e.message : "An unexpected error occurred during import.",
        })
      }
    },
    [userId]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
      e.target.value = ""
    },
    [processFile]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const reset = useCallback(() => {
    setState({ phase: "idle" })
  }, [])

  return {
    state,
    dragOver,
    inputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    reset,
  }
}
