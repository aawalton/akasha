"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  holdRecipeCatalog,
  type RecipeCatalog,
  recipeCatalogOf,
} from "akasha/temper/catalog/pursuit/temper-recipe-list/modules/recipe-list-catalog/recipe-list-catalog.module.code.ts"
import { temperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.ts"
import { useMemo } from "react"

const EVERY = 1000

export function useRecipeCatalog(): RecipeCatalog | null {
  const lists = usePages({ pageTypeSlug: temperRecipeList.slug, limit: EVERY })
  const catalog = useMemo(
    () => (lists.isLoading ? null : holdRecipeCatalog(recipeCatalogOf(lists.rows))),
    [lists.isLoading, lists.rows]
  )
  if (lists.error !== null) throw lists.error
  return catalog
}
