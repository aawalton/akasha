"use client"

import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import {
  keysIn,
  setTemplatesOf,
} from "akasha/temper/catalog/gear/temper-set/modules/set-templates-reading/set-templates-reading.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { temperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import {
  holdSetCatalog,
  type SetCatalog,
  setCatalogOf,
} from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"
import { useMemo } from "react"

const EVERY = 5000

function useEvery(pageTypeSlug: string) {
  return usePages({ pageTypeSlug, limit: EVERY })
}

export function useSetCatalog(): SetCatalog | null {
  const sets = useEvery(temperSet.slug)
  const categories = useEvery(temperSetCategory.slug)
  const classes = useEvery(temperClass.slug)
  const major = useEvery(temperBuffMajor.slug)
  const minor = useEvery(temperBuffMinor.slug)
  const other = useEvery(temperBuffOther.slug)
  const metrics = useEvery(temperMetricTree.slug)
  const read = [sets, categories, classes, major, minor, other, metrics]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const catalog = useMemo(() => {
    if (loading) return null
    const byType = new Map<string, Iterable<Value>>([
      [temperSetCategory.slug, categories.rows],
      [temperClass.slug, classes.rows],
      [temperBuffMajor.slug, major.rows],
      [temperBuffMinor.slug, minor.rows],
      [temperBuffOther.slug, other.rows],
      [temperMetricTree.slug, metrics.rows],
    ])
    const keys = keysIn((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
    return holdSetCatalog(setCatalogOf(setTemplatesOf(sets.rows, keys)))
  }, [
    loading,
    sets.rows,
    categories.rows,
    classes.rows,
    major.rows,
    minor.rows,
    other.rows,
    metrics.rows,
  ])
  if (failed !== null) throw failed
  return catalog
}
