import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { SetCategoryId } from "akasha/temper/catalog/gear/equipment/modules/set-category-ids/set-category-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"

export type SetCatalog = DataFile<Slug, SetTemplate, SetCategoryId>

export interface SetCategoryTemplate {
  readonly id: SetCategoryId
  readonly name: string
  readonly displayOrder: number
}

function keyedById(rows: readonly SetTemplate[]): Record<Slug, SetTemplate> {
  const keyed: Partial<Record<Slug, SetTemplate>> = {}
  for (const row of rows) keyed[row.id] = row
  return keyed as Record<Slug, SetTemplate>
}

export function setCatalogOf(rows: readonly SetTemplate[]): SetCatalog {
  return createDataFile<SetTemplate>()(keyedById(rows))
}

const UNREAD =
  "the set catalogue is read from pages, and nothing has read it yet — await `loadSetCatalog()` where the work starts, or gate the screen on `SetCatalogGate`"

class SetCatalogUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "SetCatalogUnread"
  }
}

let held: SetCatalog | null = null

let heldCategories: readonly SetCategoryTemplate[] | null = null

export function holdSetCatalog(
  catalog: SetCatalog,
  categories: readonly SetCategoryTemplate[]
): SetCatalog {
  held = catalog
  heldCategories = categories
  return catalog
}

export function setCategoriesHeld(): readonly SetCategoryTemplate[] {
  if (heldCategories === null) throw new SetCatalogUnread()
  return heldCategories
}

export function heldSetCatalog(): SetCatalog | null {
  return held
}

export function setsAll(): SetCatalog {
  if (held === null) throw new SetCatalogUnread()
  return held
}

export function isSetsAllId(value: string): value is Slug {
  return setsAll().has(value)
}

const categoriesOf = new WeakMap<SetCatalog, ReadonlyMap<number, SetCategoryId>>()

export function setCategoryOfEsoSet(esoSetId: number): SetCategoryId | undefined | "unknown" {
  const catalog = held
  if (catalog === null) return "unknown"
  let found = categoriesOf.get(catalog)
  if (found === undefined) {
    found = new Map(catalog.list.map((one) => [one.esoSetId, one.subcategoryId]))
    categoriesOf.set(catalog, found)
  }
  return found.get(esoSetId)
}
