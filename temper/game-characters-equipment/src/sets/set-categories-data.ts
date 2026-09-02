import { requireGet } from "@akasha/utils-narrow/require-get"
import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SetCategoryId } from "@akasha/temper-equipment/set-category-ids"
import { TEMPER_SET_CATEGORIES_BY_ID } from "./generated/temper-set-category.generated"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"

export type { SetCategoryId }

export interface SetCategoryTemplate {
  id: SetCategoryId
  name: string
  displayOrder: number
}

export const setCategories: DataFile<SetCategoryId, SetCategoryTemplate> =
  createDataFile<SetCategoryTemplate>()(TEMPER_SET_CATEGORIES_BY_ID)

export function filterAndOrganizeSets(
  sets: readonly SetTemplate[]
): readonly { type: string; sets: readonly SetTemplate[] }[] {
  const grouped = new Map<string, SetTemplate[]>()

  for (const set of sets) {
    const category = set.subcategoryId
    if (!grouped.has(category)) {
      grouped.set(category, [])
    }
    requireGet(grouped, category, "filterAndOrganizeSets:grouped").push(set)
  }

  for (const setList of grouped.values()) {
    setList.sort((a, b) => a.name.localeCompare(b.name))
  }

  const sortedCategories = [...setCategories.ids].sort(
    (a, b) => setCategories.data[a].displayOrder - setCategories.data[b].displayOrder
  )

  const result: { type: string; sets: SetTemplate[] }[] = []

  for (const category of sortedCategories) {
    if (grouped.has(category)) {
      result.push({
        type: setCategories.data[category].name,
        sets: requireGet(grouped, category, "filterAndOrganizeSets:grouped"),
      })
    }
  }

  return result
}
