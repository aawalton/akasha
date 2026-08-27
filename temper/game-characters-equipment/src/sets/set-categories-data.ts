import { requireGet } from "../../../../shared/utils-narrow/src/require-get"
import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_SET_CATEGORIES_BY_ID } from "./generated/temper-set-category.generated"
import type { SetsAll } from "./sets-all-data"

export interface SetCategoryTemplate {
  id: string
  name: string
  displayOrder: number
}

export const setCategories = createDataFile<SetCategoryTemplate>()(TEMPER_SET_CATEGORIES_BY_ID)

export type SetCategoryId = (typeof setCategories.ids)[number]

export function filterAndOrganizeSets(
  sets: readonly SetsAll[]
): readonly { type: string; sets: readonly SetsAll[] }[] {
  const grouped = new Map<string, SetsAll[]>()

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

  const result: { type: string; sets: SetsAll[] }[] = []

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
