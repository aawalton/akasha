"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  holdItemCategories,
  type ItemCategories,
  itemCategoriesOf,
} from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import { temperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.ts"
import { useMemo } from "react"

const EVERY = 5000

export function useItemCategoryTree(): ItemCategories | null {
  const branches = usePages({ pageTypeSlug: temperItemCategoryTree.slug, limit: EVERY })
  const categories = useMemo(
    () => (branches.isLoading ? null : holdItemCategories(itemCategoriesOf(branches.rows))),
    [branches.isLoading, branches.rows]
  )
  if (branches.error !== null) throw branches.error
  return categories
}
