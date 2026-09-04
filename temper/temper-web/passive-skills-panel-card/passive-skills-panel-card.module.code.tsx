"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@akasha/design-primitives/collapsible"
import { Heading } from "@akasha/design-primitives/heading"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { Skill } from "@akasha/temper-character-skills/character-skills"
import { skills } from "@akasha/temper-character-skills/character-skills"
import {
  countArmorPiecesByWeight,
  getRacialSkillLineIdForRace,
} from "@akasha/temper-character-skills/passive-queries"
import { getWeaponSkillLineIdsForBar } from "@akasha/temper-character-skills/skill-line-queries"
import {
  type SkillLineCategoryId,
  skillLineCategoriesSorted,
} from "@akasha/temper-skill-lines/skill-line-category-data"
import { type SkillLineId, skillLines } from "@akasha/temper-skill-lines/skill-lines"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"
import { SkillCollapsibleCard } from "../skill-collapsible-card/skill-collapsible-card.module.code.tsx"

const passivesBySkillLine = new Map<SkillLineId, Skill[]>()
for (const skill of skills.list) {
  if (skill.skillType !== "passive") continue
  let group = passivesBySkillLine.get(skill.skillLineId)
  if (!group) {
    group = []
    passivesBySkillLine.set(skill.skillLineId, group)
  }
  group.push(skill)
}
for (const group of passivesBySkillLine.values()) {
  group.sort((a, b) => a.lineRankNeeded - b.lineRankNeeded)
}

const CATEGORY_ORDER = skillLineCategoriesSorted.filter((c) => c.id !== "none")

interface SkillLineGroup {
  skillLineId: SkillLineId
  name: string
  displayOrder: number
  passives: readonly Skill[]
}

interface CategoryGroup {
  categoryId: SkillLineCategoryId
  categoryName: string
  skillLines: readonly SkillLineGroup[]
}

interface PassiveSkillsPanelCardProps {
  character: CharacterState["character"]
  equipment: CharacterState["equipment"]
  search?: string
  selectedCategory?: SkillLineCategoryId | null
}

function getApplicableSkillLineIds(
  character: CharacterState["character"],
  equipment: CharacterState["equipment"]
): Set<SkillLineId> {
  const applicable = new Set<SkillLineId>()

  for (const slId of character.skillLineIds) {
    if (slId !== "no-skill-line") applicable.add(slId)
  }

  for (const slId of getWeaponSkillLineIdsForBar(equipment["primary-weapon-bar"])) {
    applicable.add(slId)
  }
  for (const slId of getWeaponSkillLineIdsForBar(equipment["backup-weapon-bar"])) {
    applicable.add(slId)
  }

  const armorCounts = countArmorPiecesByWeight(equipment.armor)
  if (armorCounts.heavy > 0) applicable.add("armor-heavy-armor")
  if (armorCounts.medium > 0) applicable.add("armor-medium-armor")
  if (armorCounts.light > 0) applicable.add("armor-light-armor")

  const racialSkillLine = getRacialSkillLineIdForRace(character.race)
  if (racialSkillLine != null) applicable.add(racialSkillLine)

  if (character.curseState === "vampire") applicable.add("world-vampire")
  if (character.curseState === "werewolf") applicable.add("world-werewolf")

  for (const skillLine of skillLines.list) {
    if (skillLine.id === "alliance-war-emperor") continue
    const cat = skillLine.subcategoryId
    if (cat === "guild" || cat === "alliance-war" || cat === "craft") {
      applicable.add(skillLine.id)
    }
    if (cat === "world" && skillLine.id !== "world-vampire" && skillLine.id !== "world-werewolf") {
      applicable.add(skillLine.id)
    }
  }

  return applicable
}

export function PassiveSkillsPanelCard({
  character,
  equipment,
  search = "",
  selectedCategory = null,
}: PassiveSkillsPanelCardProps) {
  const categories = useMemo(() => {
    const applicableSkillLineIds = getApplicableSkillLineIds(character, equipment)
    const searchLower = search.toLowerCase()

    const groupsByCategory = new Map<SkillLineCategoryId, SkillLineGroup[]>()
    for (const skillLineId of applicableSkillLineIds) {
      const passives = passivesBySkillLine.get(skillLineId)
      if (!passives || passives.length === 0) continue

      const skillLine = skillLines.data[skillLineId]
      const categoryId = skillLine.subcategoryId
      if (categoryId === "none") continue

      if (selectedCategory !== null && categoryId !== selectedCategory) continue

      let filteredPassives = passives
      if (search !== "") {
        const lineNameMatches = skillLine.name.toLowerCase().includes(searchLower)
        if (!lineNameMatches) {
          filteredPassives = passives.filter((s) => s.name.toLowerCase().includes(searchLower))
        }
        if (filteredPassives.length === 0) continue
      }

      let categoryGroups = groupsByCategory.get(categoryId)
      if (!categoryGroups) {
        categoryGroups = []
        groupsByCategory.set(categoryId, categoryGroups)
      }
      categoryGroups.push({
        skillLineId,
        name: skillLine.name,
        displayOrder: skillLine.displayOrder,
        passives: filteredPassives,
      })
    }

    for (const groups of groupsByCategory.values()) {
      groups.sort((a, b) => a.displayOrder - b.displayOrder)
    }

    const result: CategoryGroup[] = []
    for (const category of CATEGORY_ORDER) {
      const groups = groupsByCategory.get(category.id)
      if (!groups || groups.length === 0) continue
      result.push({
        categoryId: category.id,
        categoryName: category.name,
        skillLines: groups,
      })
    }

    return result
  }, [character, equipment, search, selectedCategory])

  const hasActiveFilters = search !== "" || selectedCategory !== null

  if (categories.length === 0 && !hasActiveFilters) {
    return null
  }

  return (
    <PanelCard id="passive-skills" collapsible title="Passive Skills">
      {categories.length === 0 ? (
        <div className="px-2 py-4 text-secondary text-sm">No passives match your search.</div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.categoryId} className="space-y-1">
              <Heading variant="label-muted" as="h3" className="px-2">
                {category.categoryName}
              </Heading>
              {category.skillLines.map((group) => (
                <Collapsible key={group.skillLineId} defaultOpen={false}>
                  <CollapsibleTrigger className="group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-primary/8">
                    <ChevronRight className="h-3 w-3 transition-transform group-data-[state=open]:rotate-90" />
                    <span className="text-sm">{group.name}</span>
                    <span className="text-secondary text-xs">({group.passives.length})</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 py-2">
                    {group.passives.map((skill) => (
                      <SkillCollapsibleCard key={skill.id} skill={skill} showSkillLine={false} />
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          ))}
        </div>
      )}
    </PanelCard>
  )
}
