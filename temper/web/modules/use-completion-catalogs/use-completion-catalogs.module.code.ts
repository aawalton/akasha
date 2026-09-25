"use client"

import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import {
  type CompletionCatalogs,
  completionCatalogsFrom,
  NO_COMPLETION_CATALOGS,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import { useEffect, useState } from "react"

const held = new Map<string, Promise<readonly Record<string, unknown>[]>>()

const CEILING = 1000

function rowsOf(pageType: string): Promise<readonly Record<string, unknown>[]> {
  const already = held.get(pageType)
  if (already !== undefined) return already
  const asking = askComposed({ "page-type": pageType, limit: CEILING }).then((asked) =>
    asked.ok ? asked.answer.rows.map((row) => row.values) : []
  )
  held.set(pageType, asking)
  return asking
}

export function useCompletionCatalogs(): { catalogs: CompletionCatalogs; isLoading: boolean } {
  const [catalogs, setCatalogs] = useState<CompletionCatalogs | null>(null)

  useEffect(() => {
    let watching = true
    void completionCatalogsFrom(rowsOf).then((answered) => {
      if (watching) setCatalogs(answered)
    })
    return () => {
      watching = false
    }
  }, [])

  return { catalogs: catalogs ?? NO_COMPLETION_CATALOGS, isLoading: catalogs === null }
}
