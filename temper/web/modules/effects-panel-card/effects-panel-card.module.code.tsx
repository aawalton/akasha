import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { StatRow } from "akasha/design/interface/pattern/modules/stat-row/stat-row.module.code.tsx"
import type { BuffOrDebuffSource } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import {
  type EffectSource,
  isNamedSource,
} from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import {
  filterEffectsBySearch,
  groupEffectsBySubcategory,
} from "akasha/temper/web/modules/stats-filtering/stats-filtering.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { effectsPanelCardMajorBuffs } from "akasha/temper/web/phrase/pages/effects-panel-card-major-buffs.temper-web-phrase.ts"
import { effectsPanelCardMajorDebuffs } from "akasha/temper/web/phrase/pages/effects-panel-card-major-debuffs.temper-web-phrase.ts"
import { effectsPanelCardMinorBuffs } from "akasha/temper/web/phrase/pages/effects-panel-card-minor-buffs.temper-web-phrase.ts"
import { effectsPanelCardMinorDebuffs } from "akasha/temper/web/phrase/pages/effects-panel-card-minor-debuffs.temper-web-phrase.ts"
import { effectsPanelCardOtherBuffs } from "akasha/temper/web/phrase/pages/effects-panel-card-other-buffs.temper-web-phrase.ts"
import { effectsPanelCardStatusEffects } from "akasha/temper/web/phrase/pages/effects-panel-card-status-effects.temper-web-phrase.ts"

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
  const phrase = usePhrase()
  const effects = sources.filter(isNamedSource).filter((s) => s.categoryId === effectCategory)
  const isBuffs = effectCategory === "buffs"

  const filteredEffects = filterEffectsBySearch(effects, searchTerm)
  if (filteredEffects.length === 0) return null

  const grouped = groupEffectsBySubcategory(filteredEffects)

  const subcategories = [
    {
      key: "major",
      name: phrase(isBuffs ? effectsPanelCardMajorBuffs.slug : effectsPanelCardMajorDebuffs.slug),
      effects: grouped.major,
    },
    {
      key: "minor",
      name: phrase(isBuffs ? effectsPanelCardMinorBuffs.slug : effectsPanelCardMinorDebuffs.slug),
      effects: grouped.minor,
    },
    {
      key: "other",
      name: phrase(isBuffs ? effectsPanelCardOtherBuffs.slug : effectsPanelCardStatusEffects.slug),
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
