"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import type {
  CategoryRule,
  MoveToDestination,
} from "@temper/game-items-rules-core/inventory-rule-types"
import { ChevronRight } from "lucide-react"
import type { ActionVariant } from "./action-options"
import { CharacterTargetSelect } from "./character-target-select"

interface DeconstructScopeSelectProps {
  conditions: CategoryRule["conditions"]
  destination: MoveToDestination | undefined
  onModeChange: (mode: "for-inspiration" | "for-materials") => void
  onTargetChange: (dest: MoveToDestination) => void
  variant?: ActionVariant
}

export function DeconstructScopeSelect({
  conditions,
  destination,
  onModeChange,
  onTargetChange,
  variant = "orange",
}: DeconstructScopeSelectProps) {
  const mode = conditions?.canInspire === "can-inspire" ? "for-inspiration" : "for-materials"

  return (
    <div className="flex items-center gap-1">
      <ChevronRight className="size-3 text-tertiary" />
      <Select
        value={mode}
        onValueChange={(v) => {
          if (v === "for-inspiration" || v === "for-materials") onModeChange(v)
        }}
      >
        <SelectTrigger hideChevron>
          <Badge variant={variant} className="shrink-0">
            <SelectValue />
          </Badge>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="for-inspiration">For Inspiration</SelectItem>
          <SelectItem value="for-materials">For Materials</SelectItem>
        </SelectContent>
      </Select>
      {mode === "for-inspiration" && (
        <CharacterTargetSelect
          action="deconstruct"
          destination={destination}
          onChange={onTargetChange}
          variant={variant}
        />
      )}
    </div>
  )
}
