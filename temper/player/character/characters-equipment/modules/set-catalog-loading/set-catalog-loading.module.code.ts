import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
import {
  KEYED_BY,
  keysIn,
  SET_FIELDS,
  setTemplatesOf,
} from "akasha/temper/catalog/gear/temper-set/modules/set-templates-reading/set-templates-reading.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import {
  heldSetCatalog,
  holdSetCatalog,
  type SetCatalog,
  setCatalogOf,
} from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"

const EVERY = 5000

async function rowsOf(pageTypeSlug: string, select: readonly string[]): Promise<readonly Value[]> {
  const { rows } = await getPages({ pageTypeSlug, select, limit: EVERY })
  return rows
}

async function readSetCatalog(): Promise<SetCatalog> {
  const [sets, ...keyed] = await Promise.all([
    rowsOf(temperSet.slug, SET_FIELDS),
    ...KEYED_BY.map(([pageTypeSlug, field]) => rowsOf(pageTypeSlug, ["slug", field])),
  ])
  const byType = new Map(KEYED_BY.map(([pageTypeSlug], at) => [pageTypeSlug, keyed[at] ?? []]))
  const keys = keysIn((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
  return holdSetCatalog(setCatalogOf(setTemplatesOf(sets ?? [], keys)))
}

const kept = heldReading(
  [temperSet.slug, ...KEYED_BY.map(([pageTypeSlug]) => pageTypeSlug)],
  readSetCatalog
)

export async function loadSetCatalog(): Promise<SetCatalog> {
  return heldSetCatalog() ?? (await kept())
}
