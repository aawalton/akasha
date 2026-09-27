"use client"

import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  namedShapeDescriptor,
  type ShapeDescriptor,
} from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
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

const EVERY = 5000

const BATCHES = 4

const COLLECTION = "collection"

const SELECTS = new Map(LORE_LIBRARY_READS)

function useEvery(pageTypeSlug: string) {
  return usePages({ pageTypeSlug, select: SELECTS.get(pageTypeSlug), limit: EVERY })
}

function batchesOf(collections: readonly Record<string, unknown>[]): readonly string[][] {
  const batches: string[][] = Array.from({ length: BATCHES }, () => [])
  collections.forEach((row, at) => {
    const slug = textAt(row, "slug")
    if (slug !== null) batches[at % BATCHES]?.push(namedAs(temperLoreCollection.slug, slug, null))
  })
  return batches
}

function useBooksIn(batch: readonly string[] | undefined, at: number) {
  const values = batch ?? []
  const shape: ShapeDescriptor =
    values.length === 0
      ? { shapeKey: `lore-books-unnamed-${String(at)}` }
      : namedShapeDescriptor(temperLoreBook.slug, { by: "where", key: COLLECTION, values })
  return usePages({
    pageTypeSlug: temperLoreBook.slug,
    select: SELECTS.get(temperLoreBook.slug),
    where: [{ key: COLLECTION, in: values }],
    limit: EVERY,
    shape,
  })
}

export const loreLibraryContext = createContext<LoreLibrary | null>(null)

export function useHeldLoreLibrary(): LoreLibrary | null {
  return useContext(loreLibraryContext)
}

export function useLoreLibrary(): LoreLibrary | null {
  const categories = useEvery(temperLoreCategory.slug)
  const collections = useEvery(temperLoreCollection.slug)
  const batches = useMemo(() => batchesOf(collections.rows), [collections.rows])
  const first = useBooksIn(batches[0], 0)
  const second = useBooksIn(batches[1], 1)
  const third = useBooksIn(batches[2], 2)
  const fourth = useBooksIn(batches[3], 3)
  const read = [categories, collections, first, second, third, fourth]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading) || collections.rows.length === 0
  const library = useMemo(() => {
    if (loading) return null
    const byType = new Map<string, readonly Record<string, unknown>[]>([
      [temperLoreCategory.slug, categories.rows],
      [temperLoreCollection.slug, collections.rows],
      [temperLoreBook.slug, [...first.rows, ...second.rows, ...third.rows, ...fourth.rows]],
    ])
    return holdLoreLibrary(loreLibraryFrom((pageTypeSlug) => byType.get(pageTypeSlug) ?? []))
  }, [loading, categories.rows, collections.rows, first.rows, second.rows, third.rows, fourth.rows])
  if (failed !== null) throw failed
  return library
}
