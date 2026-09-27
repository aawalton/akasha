"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperLoreCategory } from "akasha/temper/catalog/pursuit/temper-lore-category/temper-lore-category.page-type.ts"
import { temperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.ts"
import { temperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.ts"
import {
  holdLoreLibrary,
  LORE_LIBRARY_READS,
  type LoreLibrary,
  loreLibraryFrom,
} from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.code.ts"
import { createContext, useContext, useMemo } from "react"

const EVERY = 10000

const SELECTS = new Map(LORE_LIBRARY_READS)

function useEvery(pageTypeSlug: string) {
  return usePages({ pageTypeSlug, select: SELECTS.get(pageTypeSlug), limit: EVERY })
}

export const loreLibraryContext = createContext<LoreLibrary | null>(null)

export function useHeldLoreLibrary(): LoreLibrary | null {
  return useContext(loreLibraryContext)
}

export function useLoreLibrary(): LoreLibrary | null {
  const categories = useEvery(temperLoreCategory.slug)
  const collections = useEvery(temperLoreCollection.slug)
  const books = useEvery(temperLoreBook.slug)
  const read = [categories, collections, books]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const library = useMemo(() => {
    if (loading) return null
    const byType = new Map<string, readonly Record<string, unknown>[]>([
      [temperLoreCategory.slug, categories.rows],
      [temperLoreCollection.slug, collections.rows],
      [temperLoreBook.slug, books.rows],
    ])
    return holdLoreLibrary(loreLibraryFrom((pageTypeSlug) => byType.get(pageTypeSlug) ?? []))
  }, [loading, categories.rows, collections.rows, books.rows])
  if (failed !== null) throw failed
  return library
}
