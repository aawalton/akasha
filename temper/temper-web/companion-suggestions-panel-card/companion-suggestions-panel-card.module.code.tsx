"use client"

import { Badge } from "@akasha/design-badges/badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Button } from "@akasha/design-primitives/button"
import type { CompanionSuggestion } from "@akasha/temper-companions-core/companion-suggestion-generator"
import {
  useCompanion,
  useCompanionActions,
  useCompanionMetadata,
} from "../use-companion/use-companion.module.code.ts"
import { useCompanionSuggestions } from "../use-companion-suggestions/use-companion-suggestions.module.code.ts"

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
