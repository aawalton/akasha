"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import type { MoveToDestination } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { actionFilterCascadesByPriority } from "akasha/temper/web/phrase/pages/action-filter-cascades-by-priority.temper-web-phrase.ts"
import { characterTargetSelectNoTarget } from "akasha/temper/web/phrase/pages/character-target-select-no-target.temper-web-phrase.ts"
import { characterTargetSelectSelectTarget } from "akasha/temper/web/phrase/pages/character-target-select-select-target.temper-web-phrase.ts"
import { characterLabel } from "akasha/temper/web/player-inventory-management-ui/modules/action-filter-cascades/action-filter-cascades.module.code.tsx"
import type { ActionVariant } from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"
import { useInventory } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory/hooks-inventory.module.code.ts"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"

interface CharacterTargetSelectProps {
  action: "character-equip" | "use" | "research" | "deconstruct"
  destination: MoveToDestination | undefined
  onChange: (dest: MoveToDestination) => void
  variant?: ActionVariant
}

interface CharacterOption {
  value: MoveToDestination
  label: string
}

export function CharacterTargetSelect({
  action,
  destination,
  onChange,
  variant = "green",
}: CharacterTargetSelectProps) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)
  const phrase = usePhrase()

  const options = useMemo((): readonly CharacterOption[] => {
    const byPriority: CharacterOption = {
      value:
        action === "character-equip"
          ? (`character-worn:by-priority` satisfies MoveToDestination)
          : (`character:by-priority` satisfies MoveToDestination),
      label: phrase(actionFilterCascadesByPriority.slug),
    }

    const characters = inventory?.currencies?.characters
    if (!characters) return [byPriority]
    return [
      byPriority,
      ...Object.entries(characters).map(([charId, charData]) => ({
        value: `character:${charId}` satisfies MoveToDestination,
        label: characterLabel(phrase, charId, charData.displayName),
      })),
    ]
  }, [action, inventory, phrase])

  const currentLabel = options.find((o) => o.value === destination)?.label

  return (
    <div className="flex items-center gap-1">
      <ChevronRight className="size-3 text-tertiary" />
      <Select
        value={destination ?? "no-target"}
        onValueChange={(v) => {
          const match = options.find((o) => o.value === v)
          if (match) onChange(match.value)
        }}
      >
        <SelectTrigger hideChevron>
          <Badge variant={variant} className="shrink-0">
            <SelectValue>
              {currentLabel ?? phrase(characterTargetSelectSelectTarget.slug)}
            </SelectValue>
          </Badge>
        </SelectTrigger>
        <SelectContent
          nullSentinel={{ value: "no-target", label: phrase(characterTargetSelectNoTarget.slug) }}
          sorted
        >
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
