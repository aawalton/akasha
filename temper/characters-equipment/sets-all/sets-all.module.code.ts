import { SETS_ROWS_FIRST } from "akasha/temper/characters-equipment/sets-rows-first/sets-rows-first.module.code.ts"
import { SETS_ROWS_SECOND } from "akasha/temper/characters-equipment/sets-rows-second/sets-rows-second.module.code.ts"
import type { SetCategoryId } from "akasha/temper/equipment/set-category-ids/set-category-ids.module.code.ts"
import type { SetId } from "akasha/temper/equipment/set-ids/set-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/equipment/set-template/set-template.module.code.ts"
import {
  createDataFile,
  type DataFile,
} from "akasha/utils/narrow/create-data-file/create-data-file.module.code.ts"

const SETS_ALL_ROWS: readonly SetTemplate[] = [...SETS_ROWS_FIRST, ...SETS_ROWS_SECOND]

function keyedById(rows: readonly SetTemplate[]): Record<SetId, SetTemplate> {
  const keyed: Partial<Record<SetId, SetTemplate>> = {}
  for (const row of rows) keyed[row.id] = row
  return keyed as Record<SetId, SetTemplate>
}

export const setsAll: DataFile<SetId, SetTemplate, SetCategoryId> = createDataFile<SetTemplate>()(
  keyedById(SETS_ALL_ROWS)
)

export function isSetsAllId(value: string): value is SetId {
  return setsAll.has(value)
}
