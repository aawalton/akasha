"use client"

import { requireGet } from "akasha/code/type/narrowing/modules/require-get/require-get.module.code.ts"
import { CommandItem } from "akasha/design/interface/primitive/modules/command/command.module.code.tsx"
import {
  type CompanionSkillId,
  type CompanionSkillLineId,
  companionSkillAt,
  companionSkillLineAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import { isCompanionSkillAvailable } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-queries/companion-skill-line-queries.module.code.ts"
import { getAllSkillsForCompanion } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-queries/companion-skill-queries.module.code.ts"
import type { CompanionSkillSlotId } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-slots/companion-skill-slots.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { CompanionSkillCard } from "akasha/temper/web/modules/companion-skill-card/companion-skill-card.module.code.tsx"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogCategory,
  type FilterableSelectDialogConfig,
  type FilterableSelectDialogItem,
} from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import { useMemo } from "react"

interface CompanionSkillItem extends FilterableSelectDialogItem {
  id: CompanionSkillId
  name: string
  skillLineId: CompanionSkillLineId
  skillType: "active" | "passive" | "ultimate"
}

interface CompanionSkillSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  companionId: string
  isUltimate: boolean
  stats?: CompanionFormulaStats
  equipment?: CompanionState["equipment"]
  selectedSkills?: Record<CompanionSkillSlotId, CompanionSkillId>
  editingSlotId?: CompanionSkillSlotId
  onSelect: (skillId: CompanionSkillId) => void
}

const NO_SKILL_ITEM: CompanionSkillItem = {
  id: "no-skill",
  name: "No Skill",
  skillLineId: "weapon-two-handed",
  skillType: "active",
}

const CATEGORY_ORDER = ["Class", "Weapon", "Guild", "Armor"]

function getCategoryDisplayName(category: "class" | "weapon" | "guild" | "armor"): string {
  const categoryMap: Record<string, string> = {
    class: "Class",
    weapon: "Weapon",
    guild: "Guild",
    armor: "Armor",
  }
  return categoryMap[category] ?? category
}

export function CompanionSkillSelectDialog({
  open,
  onOpenChange,
  title,
  companionId,
  isUltimate,
  stats,
  equipment,
  selectedSkills,
  editingSlotId,
  onSelect,
}: CompanionSkillSelectDialogProps) {
  const { categories, allItems } = useMemo(() => {
    if (companionId === "no-companion") {
      return { categories: [], allItems: [] }
    }

    const allSkills = getAllSkillsForCompanion(companionId)

    const skillTypeFilter = isUltimate ? "ultimate" : "active"
    let filteredSkills = allSkills.filter((skill) => skill.skillType === skillTypeFilter)

    filteredSkills = filteredSkills.filter((skill) => skill.id !== "no-skill")

    if (selectedSkills) {
      const selectedSkillIds = new Set<CompanionSkillId>()
      for (const [slotId, skillId] of Object.entries(selectedSkills)) {
        if (slotId !== editingSlotId && skillId !== "no-skill") {
          selectedSkillIds.add(skillId)
        }
      }
      filteredSkills = filteredSkills.filter((skill) => !selectedSkillIds.has(skill.id))
    }

    if (equipment) {
      filteredSkills = filteredSkills.filter((skill) => isCompanionSkillAvailable(skill, equipment))
    }

    const items: CompanionSkillItem[] = filteredSkills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      skillLineId: skill.skillLineId,
      skillType: skill.skillType,
    }))

    const categoryMap = new Map<string, Map<CompanionSkillLineId, CompanionSkillItem[]>>()

    for (const item of items) {
      const skillLine = companionSkillLineAt(item.skillLineId)
      const category = getCategoryDisplayName(skillLine.category)

      if (!categoryMap.has(category)) {
        categoryMap.set(category, new Map())
      }
      const skillLineMap = requireGet(categoryMap, category, "categoryMap")
      if (!skillLineMap.has(item.skillLineId)) {
        skillLineMap.set(item.skillLineId, [])
      }
      requireGet(skillLineMap, item.skillLineId, "skillLineMap").push(item)
    }

    const resultCategories: FilterableSelectDialogCategory<CompanionSkillItem>[] = []

    for (const categoryName of CATEGORY_ORDER) {
      const skillLineMap = categoryMap.get(categoryName)
      if (!skillLineMap || skillLineMap.size === 0) continue

      const sortedSkillLines = Array.from(skillLineMap.entries()).sort(([a], [b]) => {
        const nameA = companionSkillLineAt(a).name
        const nameB = companionSkillLineAt(b).name
        return nameA.localeCompare(nameB)
      })

      for (const [skillLineId, skillLineItems] of sortedSkillLines) {
        const skillLineData = companionSkillLineAt(skillLineId)
        resultCategories.push({
          id: skillLineId,
          label: skillLineData.name,
          items: skillLineItems.sort((a, b) => a.name.localeCompare(b.name)),
        })
      }
    }

    return { categories: resultCategories, allItems: items }
  }, [companionId, isUltimate, selectedSkills, editingSlotId, equipment])

  const config: FilterableSelectDialogConfig<CompanionSkillItem> = useMemo(
    () => ({
      title,
      searchPlaceholder: "Search skills...",
      emptyMessage: "No skills found.",
      categories,
      allItems,
      showEffectFilter: false,
      filterItem: (item, searchTerm) => {
        const lower = searchTerm.toLowerCase()
        const fullSkill = companionSkillAt(item.id)
        return (
          item.name.toLowerCase().includes(lower) ||
          fullSkill.description.toLowerCase().includes(lower) ||
          item.skillLineId.toLowerCase().includes(lower)
        )
      },
      renderItem: ({ item, onSelect: select }) => {
        const fullSkill = companionSkillAt(item.id)

        return (
          <CommandItem key={item.id} value={item.id} onSelect={select} className="p-0">
            <CompanionSkillCard
              skill={fullSkill}
              stats={stats}
              collapsible={false}
              className="w-full"
            />
          </CommandItem>
        )
      },
    }),
    [title, categories, allItems, stats]
  )

  const handleSelect = (itemId: CompanionSkillId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<CompanionSkillItem>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId="no-skill"
      onSelect={handleSelect}
      defaultItem={NO_SKILL_ITEM}
      config={config}
    />
  )
}
