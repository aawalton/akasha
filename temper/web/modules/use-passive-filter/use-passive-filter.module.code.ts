import type { BadgeToggleGroupItem } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { companion } from "akasha/temper/catalog/skill/line-category/pages/companion.temper-skill-line-category.ts"
import { none } from "akasha/temper/catalog/skill/line-category/pages/none.temper-skill-line-category.ts"
import { temperSkillLineCategory } from "akasha/temper/catalog/skill/line-category/temper-skill-line-category.page-type.ts"
import { titleOf } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import {
  type SkillLineCategoryId,
  skillLineCategories,
} from "akasha/temper/player/character/skill/line/modules/skill-line-category-data/skill-line-category-data.module.code.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { useMemo, useState } from "react"

const UNFILTERED: ReadonlySet<string> = new Set([none.key, companion.key])

export function usePassiveCategoryFilterItems(): BadgeToggleGroupItem[] {
  const categories = useKeyedTitles(temperSkillLineCategory.slug)
  return useMemo(() => {
    if (categories === null) return []
    return categories.keys
      .filter((key) => skillLineCategories.has(key) && !UNFILTERED.has(key))
      .map((key) => ({ value: key, label: titleOf(categories, key) }))
  }, [categories])
}

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
