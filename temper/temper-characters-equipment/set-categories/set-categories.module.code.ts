import type { SetCategoryId } from "@akasha/temper-equipment/set-category-ids"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import { requireGet } from "@akasha/utils-narrow/require-get"

export const TEMPER_SET_CATEGORIES_BY_ID = {
  "none": { id: "none" as const, name: "No Set Category", displayOrder: 0 },
  "trial": { id: "trial" as const, name: "Trial", displayOrder: 1 },
  "dungeon": { id: "dungeon" as const, name: "Dungeon", displayOrder: 2 },
  "arena": { id: "arena" as const, name: "Arena", displayOrder: 3 },
  "overland": { id: "overland" as const, name: "Overland", displayOrder: 4 },
  "crafted": { id: "crafted" as const, name: "Crafted", displayOrder: 5 },
  "monster": { id: "monster" as const, name: "Monster", displayOrder: 6 },
  "mythic": { id: "mythic" as const, name: "Mythic", displayOrder: 7 },
  "pvp": { id: "pvp" as const, name: "PVP", displayOrder: 8 },
  "class": { id: "class" as const, name: "Class", displayOrder: 9 },
  "other": { id: "other" as const, name: "Other", displayOrder: 10 },
  "no-type": { id: "no-type" as const, name: "Unknown", displayOrder: 11 },
} as const satisfies Record<string, SetCategoryTemplate>

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
