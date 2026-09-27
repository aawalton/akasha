"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { EditableNumber } from "akasha/design/interface/form/modules/editable-number/editable-number.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type {
  CharEligibility,
  MoveToDestination,
  Tier,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { CharacterTargetSelect } from "akasha/temper/web/player-inventory-management-ui/modules/character-target-select/character-target-select.module.code.tsx"
import { DestinationCascade } from "akasha/temper/web/player-inventory-management-ui/modules/destination-cascade/destination-cascade.module.code.tsx"
import { RuleCardDestinationTierEligibility } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-destination-tier-eligibility/rule-card-destination-tier-eligibility.module.code.tsx"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import type { DestinationOptions } from "akasha/temper/web/player-inventory-management-ui/modules/use-destination-options/use-destination-options.module.code.ts"
import { ruleCardDestinationTierMoveDown } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-move-down.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierMoveUp } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-move-up.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierNumber } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-number.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierRemove } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-remove.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierSetBound } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-set-bound.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierSetBounded } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-set-bounded.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierSetTarget } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-set-target.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierSetUnbounded } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-set-unbounded.temper-rule-card-phrase.ts"
import { ruleCardDestinationTierUnbound } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-destination-tier-unbound.temper-rule-card-phrase.ts"
import { ArrowDown, ArrowUp, ChevronRight, Trash2 } from "lucide-react"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

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
  const phrases = useRuleCardPhrases()
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
        {phrases === null
          ? ""
          : phraseOf(phrases, ruleCardDestinationTierNumber.key, { number: String(index + 1) })}
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
        <ButtonBadge
          variant="elevation"
          onClick={handleUnboundedToggle}
          aria-label={titleIn(phrases, ruleCardDestinationTierSetTarget.key)}
        >
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
        aria-label={titleIn(
          phrases,
          unbounded
            ? ruleCardDestinationTierSetBounded.key
            : ruleCardDestinationTierSetUnbounded.key
        )}
      >
        {titleIn(
          phrases,
          unbounded ? ruleCardDestinationTierSetBound.key : ruleCardDestinationTierUnbound.key
        )}
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
          aria-label={titleIn(phrases, ruleCardDestinationTierMoveUp.key)}
        >
          <ArrowUp className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="tertiary"
          size="icon-sm"
          onClick={onMoveDown}
          disabled={index === totalTiers - 1}
          aria-label={titleIn(phrases, ruleCardDestinationTierMoveDown.key)}
        >
          <ArrowDown className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="tertiary"
          size="icon-sm"
          onClick={onRemove}
          aria-label={titleIn(phrases, ruleCardDestinationTierRemove.key)}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
