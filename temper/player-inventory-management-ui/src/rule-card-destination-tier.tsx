"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { EditableNumber } from "@shared/design-forms/components/editable-number"
import { Button } from "@shared/design-primitives/components/button"
import type {
  CharEligibility,
  MoveToDestination,
  Tier,
} from "@temper/game-items-rules-core/inventory-rule-types"
import { ArrowDown, ArrowUp, ChevronRight, Trash2 } from "lucide-react"
import { CharacterTargetSelect } from "./character-target-select"
import { DestinationCascade } from "./destination-cascade"
import { RuleCardDestinationTierEligibility } from "./rule-card-destination-tier-eligibility"
import type { DestinationOptions } from "./use-destination-options"

interface RuleCardDestinationTierProps {
  tier: Tier
  index: number
  totalTiers: number
  destinationOptions: DestinationOptions
  onChange: (next: Tier) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export function RuleCardDestinationTier({
  tier,
  index,
  totalTiers,
  destinationOptions,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: RuleCardDestinationTierProps) {
  const unbounded = tier.targetQuantity === undefined

  function handleDestinationChange(destination: MoveToDestination) {
    onChange({ ...tier, destination })
  }

  function handleTargetQuantityChange(value: number) {
    onChange({ ...tier, targetQuantity: value })
  }

  function handleUnboundedToggle() {
    onChange({ ...tier, targetQuantity: unbounded ? 200 : undefined })
  }

  function handleEligibilityChange(charEligibility: CharEligibility | undefined) {
    onChange({ ...tier, charEligibility })
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {}
      <Badge variant="elevation-muted" className="shrink-0">
        {`Tier ${index + 1}`}
      </Badge>

      {}
      <DestinationCascade
        destination={tier.destination}
        options={destinationOptions}
        onChange={handleDestinationChange}
      />

      {}
      {tier.destination === "character:by-priority" && (
        <CharacterTargetSelect
          action="character-equip"
          destination={tier.destination}
          onChange={handleDestinationChange}
        />
      )}

      {}
      <ChevronRight className="size-3 text-tertiary" />
      {unbounded ? (
        <ButtonBadge variant="elevation" onClick={handleUnboundedToggle} aria-label="Set target">
          x ∞
        </ButtonBadge>
      ) : (
        <Badge variant="elevation" className="shrink-0">
          <EditableNumber
            value={tier.targetQuantity ?? 200}
            max={99999}
            prefix="x "
            onChange={handleTargetQuantityChange}
            stopPropagation
          />
        </Badge>
      )}
      <ButtonBadge
        variant="elevation-muted"
        onClick={handleUnboundedToggle}
        aria-label={unbounded ? "Set bounded target quantity" : "Set unbounded target quantity"}
      >
        {unbounded ? "set bound" : "unbound"}
      </ButtonBadge>

      {}
      <ChevronRight className="size-3 text-tertiary" />
      <RuleCardDestinationTierEligibility
        charEligibility={tier.charEligibility}
        onChange={handleEligibilityChange}
      />

      {}
      <div className="ml-auto flex items-center gap-1">
        <Button
          type="button"
          variant="tertiary"
          size="icon-sm"
          onClick={onMoveUp}
          disabled={index === 0}
          aria-label="Move tier up"
        >
          <ArrowUp className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="tertiary"
          size="icon-sm"
          onClick={onMoveDown}
          disabled={index === totalTiers - 1}
          aria-label="Move tier down"
        >
          <ArrowDown className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="tertiary"
          size="icon-sm"
          onClick={onRemove}
          aria-label="Remove tier"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
