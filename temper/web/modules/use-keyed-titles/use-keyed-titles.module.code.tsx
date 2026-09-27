"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  holdKeyedTitles,
  type KeyedTitles,
  keyedTitlesFrom,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { useMemo } from "react"

const EVERY = 500

export function useKeyedTitles(pageTypeSlug: string): KeyedTitles | null {
  const pages = usePages({ pageTypeSlug, limit: EVERY })
  const titles = useMemo(
    () => (pages.isLoading ? null : holdKeyedTitles(keyedTitlesFrom(pageTypeSlug, pages.rows))),
    [pageTypeSlug, pages.isLoading, pages.rows]
  )
  if (pages.error !== null) throw pages.error
  return titles
}
