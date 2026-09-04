import { PanelCard } from "@akasha/design-layout/panel-card"
import { StatRow } from "@akasha/design-patterns/stat-row"
import type { BuffOrDebuffSource } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import { type EffectSource, isNamedSource } from "@akasha/temper-formula-framework/effect-source"
import {
  filterEffectsBySearch,
  groupEffectsBySubcategory,
} from "../stats-filtering/stats-filtering.module.code.ts"

interface EffectsPanelCardProps {
  id: string
  cardTitle: string
  effectCategory: "buffs" | "debuffs"
  sources: readonly EffectSource[]
  searchTerm: string
  onEffectClick: (effect: BuffOrDebuffSource) => void
  className?: string
}

export function EffectsPanelCard({
  id,
  cardTitle,
  effectCategory,
  sources,
  searchTerm,
  onEffectClick,
  className,
}: EffectsPanelCardProps) {
  const effects = sources.filter(isNamedSource).filter((s) => s.categoryId === effectCategory)

  const filteredEffects = filterEffectsBySearch(effects, searchTerm)
  if (filteredEffects.length === 0) return null

  const grouped = groupEffectsBySubcategory(filteredEffects)

  const subcategories = [
    {
      key: "major",
      name: effectCategory === "buffs" ? "Major Buffs" : "Major Debuffs",
      effects: grouped.major,
    },
    {
      key: "minor",
      name: effectCategory === "buffs" ? "Minor Buffs" : "Minor Debuffs",
      effects: grouped.minor,
    },
    {
      key: "other",
      name: effectCategory === "buffs" ? "Other Buffs" : "Status Effects",
      effects: grouped.other,
    },
  ].filter((sub) => sub.effects.length > 0)

  if (subcategories.length === 0) return null

  return (
    <PanelCard id={id} collapsible={true} title={cardTitle} className={className}>
      {subcategories.map((subcategory) => (
        <div key={subcategory.key} className="space-y-2">
          <h4 className="font-medium text-secondary text-sm">{subcategory.name}</h4>
          <div className="space-y-1 pl-4">
            {subcategory.effects.map((effect) => (
              <StatRow
                key={effect.id}
                label={effect.name}
                value=""
                onClick={() => {
                  onEffectClick(effect)
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </PanelCard>
  )
}
