import { requireGet } from "akasha/code/type/narrowing/modules/require-get/require-get.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import {
  type SetCategoryTemplate,
  setCategoriesHeld,
} from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"

export function setCategories(): readonly SetCategoryTemplate[] {
  return setCategoriesHeld()
}

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

  const result: { type: string; sets: SetTemplate[] }[] = []

  for (const category of setCategories()) {
    if (grouped.has(category.id)) {
      result.push({
        type: category.name,
        sets: requireGet(grouped, category.id, "filterAndOrganizeSets:grouped"),
      })
    }
  }

  return result
}
