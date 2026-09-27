"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import type { CompanionSuggestion } from "akasha/temper/catalog/companion/companions-core/modules/companion-suggestion-generator/companion-suggestion-generator.module.code.ts"
import {
  useCompanion,
  useCompanionActions,
  useCompanionMetadata,
} from "akasha/temper/web/modules/use-companion/use-companion.module.code.ts"
import { useCompanionSuggestions } from "akasha/temper/web/modules/use-companion-suggestions/use-companion-suggestions.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionSuggestionsPanelCardApply } from "akasha/temper/web/phrase/pages/companion-suggestions-panel-card-apply.temper-web-phrase.ts"
import { companionSuggestionsPanelCardChange } from "akasha/temper/web/phrase/pages/companion-suggestions-panel-card-change.temper-web-phrase.ts"
import { companionSuggestionsPanelCardQuality } from "akasha/temper/web/phrase/pages/companion-suggestions-panel-card-quality.temper-web-phrase.ts"
import { companionSuggestionsPanelCardSkill } from "akasha/temper/web/phrase/pages/companion-suggestions-panel-card-skill.temper-web-phrase.ts"
import { companionSuggestionsPanelCardTitle } from "akasha/temper/web/phrase/pages/companion-suggestions-panel-card-title.temper-web-phrase.ts"
import { companionSuggestionsPanelCardTrait } from "akasha/temper/web/phrase/pages/companion-suggestions-panel-card-trait.temper-web-phrase.ts"

const NAMED_BY_TYPE = {
  trait: companionSuggestionsPanelCardTrait.slug,
  quality: companionSuggestionsPanelCardQuality.slug,
  skill: companionSuggestionsPanelCardSkill.slug,
} as const satisfies Record<CompanionSuggestion["type"], string>

interface CompanionSuggestionsPanelCardProps {
  className?: string
}

export function CompanionSuggestionsPanelCard({ className }: CompanionSuggestionsPanelCardProps) {
  const build = useCompanion()
  const { isOwner } = useCompanionMetadata()
  const { updateEquipment, updateSkills } = useCompanionActions()
  const suggestions = useCompanionSuggestions(build)
  const phrase = usePhrase()

  if (!isOwner || suggestions.length === 0) return null

  function applySuggestion(suggestion: CompanionSuggestion) {
    if (suggestion.mutation.kind === "equipment") {
      updateEquipment(suggestion.mutation.updates)
    } else {
      updateSkills(suggestion.mutation.updates)
    }
  }

  return (
    <PanelCard
      id="companion-suggestions"
      collapsible
      title={phrase(companionSuggestionsPanelCardTitle.slug)}
      className={className}
    >
      <div className="space-y-2">
        {suggestions.map((suggestion, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Badge variant="elevation-muted">{phrase(NAMED_BY_TYPE[suggestion.type])}</Badge>
              <span className="truncate text-secondary text-xs">
                {phrase(companionSuggestionsPanelCardChange.slug, {
                  slot: suggestion.slot,
                  from: suggestion.from,
                  to: suggestion.to,
                })}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="font-semibold text-green text-xs">
                +{suggestion.improvement.toFixed(1)}
              </span>
              <Button variant="secondary" size="sm" onClick={() => applySuggestion(suggestion)}>
                {phrase(companionSuggestionsPanelCardApply.slug)}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}
