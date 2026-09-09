"use client"

import { upsertPage } from "@akasha/pages-access/upsert"
import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { useOptimisticUpsertPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-upsert-page"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "akasha/temper/completion/completion-progress/completion-progress.module.code.ts"
import { parseSavedVariablesContent } from "akasha/temper/completion-import/completion-saved-variables-parser/completion-saved-variables-parser.module.code.ts"
import { getCompanionIdByDefId } from "akasha/temper/temper-companions-core/companions/companions.module.code.ts"
import { classifyCompletionImport } from "akasha/temper/temper-player-completion/completion-import-outcome/completion-import-outcome.module.code.ts"
import {
  mergeAccountCompletionForward,
  mergeCharacterCompletionForward,
  mergeCompanionCompletionForward,
} from "akasha/temper/temper-player-completion/completion-merge-forward/completion-merge-forward.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"
import type { ImportResult } from "../import-result/import-result.module.code.ts"

const COMPLETION = "completion"

const ENDING = "json"

type Row = Readonly<Record<string, unknown>>

async function rowsWithCompletion(
  pageTypeSlug: string,
  where: Readonly<Record<string, unknown>>,
  keys: readonly string[]
): Promise<readonly Row[]> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where,
    keys: [...keys, COMPLETION],
    files: [COMPLETION],
  })
  if (!asked.ok) throw new Error(asked.why)
  return asked.answer.rows.map((one) => one.values)
}

function readCompletion<T>(row: Row | undefined): T | undefined {
  const held = row?.[COMPLETION]
  if (typeof held !== "string" || held === "") return undefined
  if (held === ENDING) {
    throw new Error(
      `\`${COMPLETION}\` came back as the ending \`${ENDING}\` rather than the body of the file beside the page, so what is already counted went unread. Nothing has been imported.`
    )
  }
  return JSON.parse(held) as T
}

type ImportState =
  | { phase: "idle" }
  | { phase: "reading" }
  | { phase: "importing" }
  | { phase: "success"; result: ImportResult }
  | { phase: "error"; message: string }

export function useTemperImport() {
  const userId = useUserId()
  const [state, setState] = useState<ImportState>({ phase: "idle" })
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const runUpsert = useOptimisticUpsertPage((args) => upsertPage(args))
  const runUpsertRef = useRef(runUpsert)
  useEffect(() => {
    runUpsertRef.current = runUpsert
  }, [runUpsert])

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
        data = parseSavedVariablesContent(content, getCompanionIdByDefId)
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
        const accountRows = await rowsWithCompletion("temper-account", { title: { is: userId } }, [
          "slug",
          "title",
        ])
        const characterRows = await rowsWithCompletion(
          "temper-account-character",
          { accountPage: { is: userId } },
          ["slug", "esoCharacterId", "displayOrder"]
        )
        const companionRows = await rowsWithCompletion(
          "temper-companion-progress",
          { accountPage: { is: userId } },
          ["slug", "companionId"]
        )

        const existingAccount = readCompletion<AccountCompletion>(accountRows[0])
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
            title: userId,
            ...(mergedAccount === undefined ? {} : { completion: ENDING }),
          },
          ...(mergedAccount === undefined
            ? {}
            : { bodies: { completion: JSON.stringify(mergedAccount) } }),
          select: ["id"],
        })

        const orderAlreadySet = new Set<string>()
        const existingCharacterCompletion = new Map<string, CharacterCompletion>()
        for (const row of characterRows) {
          if (typeof row.esoCharacterId !== "string") continue
          if (typeof row.displayOrder === "number") orderAlreadySet.add(row.esoCharacterId)
          const completion = readCompletion<CharacterCompletion>(row)
          if (completion !== undefined) {
            existingCharacterCompletion.set(row.esoCharacterId, completion)
          }
        }

        const existingCompanionCompletion = new Map<string, CompanionCompletion>()
        for (const row of companionRows) {
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
              accountPage: userId,
              esoCharacterId: entry.esoCharacterId,
              title: entry.name,
              ...(entry.priorityOrder !== undefined && !orderAlreadySet.has(entry.esoCharacterId)
                ? { displayOrder: entry.priorityOrder }
                : {}),
              completion: ENDING,
            },
            bodies: { completion: JSON.stringify(entry.merged) },
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
              accountPage: userId,
              companionId: entry.companionId,
              completion: ENDING,
            },
            bodies: { completion: JSON.stringify(entry.merged) },
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
