"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Button } from "@shared/design-primitives/components/button"
import type { CompanionSuggestion } from "@temper/game-companions-core/optimizer/companion-suggestion-generator"
import { useCompanionSuggestions } from "@/components/companion-skills/hooks/use-companion-suggestions"
import {
  useCompanion,
  useCompanionActions,
  useCompanionMetadata,
} from "@/components/companions/context/use-companion"

interface CompanionSuggestionsPanelCardProps {
  className?: string
}

export function CompanionSuggestionsPanelCard({ className }: CompanionSuggestionsPanelCardProps) {
  const build = useCompanion()
  const { isOwner } = useCompanionMetadata()
  const { updateEquipment, updateSkills } = useCompanionActions()
  const suggestions = useCompanionSuggestions(build)

  if (!isOwner || suggestions.length === 0) return null

  function applySuggestion(suggestion: CompanionSuggestion) {
    if (suggestion.mutation.kind === "equipment") {
      updateEquipment(suggestion.mutation.updates)
    } else {
      updateSkills(suggestion.mutation.updates)
    }
  }

  return (
    <PanelCard id="companion-suggestions" collapsible title="Suggestions" className={className}>
      <div className="space-y-2">
        {suggestions.map((suggestion, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Badge variant="elevation-muted" className="capitalize">
                {suggestion.type}
              </Badge>
              <span className="truncate text-secondary text-xs">{suggestion.label}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="font-semibold text-green text-xs">
                +{suggestion.improvement.toFixed(1)}
              </span>
              <Button variant="secondary" size="sm" onClick={() => applySuggestion(suggestion)}>
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}
