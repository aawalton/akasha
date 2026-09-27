"use client"

import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.ts"
import { useMemo } from "react"

const EVERY = 500

export type ConditionFieldTitles = ReadonlyMap<string, string>

function unread(slug: string, name: string): Error {
  return new Error(`useConditionFieldTitles: condition field \`${slug}\` states no \`${name}\``)
}

export function conditionFieldTitlesFrom(
  rows: readonly Record<string, unknown>[]
): ConditionFieldTitles {
  const titles = new Map<string, string>()
  for (const row of rows) {
    const slug = textAt(row, "slug") ?? "?"
    const key = textAt(row, "key")
    if (key === null) throw unread(slug, "key")
    const title = textAt(row, "title")
    if (title === null) throw unread(slug, "title")
    titles.set(key, title)
  }
  return titles
}

export function titleOfCondition(titles: ConditionFieldTitles, key: string): string {
  return titles.get(key) ?? key
}

export function useConditionFieldTitles(): ConditionFieldTitles | null {
  const pages = usePages({ pageTypeSlug: temperConditionField.slug, limit: EVERY })
  const titles = useMemo(
    () => (pages.isLoading ? null : conditionFieldTitlesFrom(pages.rows)),
    [pages.isLoading, pages.rows]
  )
  if (pages.error !== null) throw pages.error
  return titles
}
