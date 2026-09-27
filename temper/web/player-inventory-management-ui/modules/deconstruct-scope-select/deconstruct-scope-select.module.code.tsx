"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type {
  CategoryRule,
  MoveToDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { forInspiration } from "akasha/temper/items/rules/core/temper-deconstruct-mode/pages/for-inspiration.temper-deconstruct-mode.ts"
import { forMaterials } from "akasha/temper/items/rules/core/temper-deconstruct-mode/pages/for-materials.temper-deconstruct-mode.ts"
import { temperDeconstructMode } from "akasha/temper/items/rules/core/temper-deconstruct-mode/temper-deconstruct-mode.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import type { ActionVariant } from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"
import { CharacterTargetSelect } from "akasha/temper/web/player-inventory-management-ui/modules/character-target-select/character-target-select.module.code.tsx"
import { ChevronRight } from "lucide-react"

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
  const modes = useKeyedTitles(temperDeconstructMode.slug)

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
          {[forInspiration, forMaterials].map((one) => (
            <SelectItem key={one.key} value={one.key}>
              {titleIn(modes, one.key)}
            </SelectItem>
          ))}
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
