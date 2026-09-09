import type { BadgeToggleGroupItem } from "akasha/design/badges/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { useState } from "react"
import {
  type SkillLineCategoryId,
  skillLineCategories,
  skillLineCategoriesSorted,
} from "../../skill-lines/skill-line-category-data/skill-line-category-data.module.code.ts"

export const PASSIVE_CATEGORY_FILTER_ITEMS: BadgeToggleGroupItem[] = skillLineCategoriesSorted
  .filter((c) => c.id !== "none" && c.id !== "companion")
  .map((c) => ({ value: c.id, label: c.name }))

export function usePassiveFilter() {
  const [passiveSearch, setPassiveSearch] = useState("")
  const [passiveCategory, setPassiveCategory] = useState<SkillLineCategoryId | null>(null)
  const hasActivePassiveFilters = passiveSearch !== "" || passiveCategory !== null

  const handlePassiveReset = () => {
    setPassiveSearch("")
    setPassiveCategory(null)
  }

  const handlePassiveCategorySelect = (items: readonly BadgeToggleGroupItem[]) => {
    if (items.length === 0) {
      setPassiveCategory(null)
    } else {
      const newItem = items.find((item) => item.value !== passiveCategory)
      const value = newItem?.value
      setPassiveCategory(value != null && skillLineCategories.has(value) ? value : null)
    }
  }

  return {
    passiveSearch,
    setPassiveSearch,
    passiveCategory,
    hasActivePassiveFilters,
    handlePassiveReset,
    handlePassiveCategorySelect,
  }
}
