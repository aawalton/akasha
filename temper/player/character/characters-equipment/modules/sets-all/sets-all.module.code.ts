import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { SetCategoryId } from "akasha/temper/catalog/gear/equipment/modules/set-category-ids/set-category-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import { SETS_ROWS } from "akasha/temper/player/character/characters-equipment/modules/sets-rows/sets-rows.data-table.code.ts"

const SETS_ALL_ROWS: readonly SetTemplate[] = [...SETS_ROWS]

function keyedById(rows: readonly SetTemplate[]): Record<Slug, SetTemplate> {
  const keyed: Partial<Record<Slug, SetTemplate>> = {}
  for (const row of rows) keyed[row.id] = row
  return keyed as Record<Slug, SetTemplate>
}

export const setsAll: DataFile<Slug, SetTemplate, SetCategoryId> = createDataFile<SetTemplate>()(
  keyedById(SETS_ALL_ROWS)
)

export function isSetsAllId(value: string): value is Slug {
  return setsAll.has(value)
}
