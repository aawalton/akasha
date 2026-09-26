import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  KEYED_BY,
  keysIn,
  SET_FIELDS,
  setTemplatesOf,
} from "akasha/temper/catalog/gear/temper-set/modules/set-templates-reading/set-templates-reading.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import {
  holdSetCatalog,
  type SetCatalog,
  setCatalogOf,
} from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"

function rowsOf(pageTypeSlug: string, keys: readonly string[]): readonly Value[] {
  const asked = asking(akashaRoot(), { pageTypeSlug, keys } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return asked.rows as readonly Value[]
}

export function holdSetCatalogFromCheckout(): SetCatalog {
  const byType = new Map<string, readonly Value[]>(
    KEYED_BY.map(([pageTypeSlug, field]) => [pageTypeSlug, rowsOf(pageTypeSlug, ["slug", field])])
  )
  const keys = keysIn((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
  return holdSetCatalog(setCatalogOf(setTemplatesOf(rowsOf(temperSet.slug, SET_FIELDS), keys)))
}
