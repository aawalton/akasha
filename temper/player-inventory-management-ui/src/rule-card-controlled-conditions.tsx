"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { QUALITY_OPTIONS } from "@temper/game-items-rules-core/filters/quality-filter"
import type { ControlledRule } from "@temper/game-items-rules-core/inventory-rule-controlled"

interface ControlledRuleConditionsProps {
  conditions: NonNullable<ControlledRule["conditions"]>
}

export function ControlledRuleConditions({ conditions }: ControlledRuleConditionsProps) {
  const chips: { label: string }[] = []

  if (conditions.allStocked === "not-all-stocked") chips.push({ label: "Not All Stocked" })
  if (conditions.targetQuantity !== undefined)
    chips.push({ label: `Target x${conditions.targetQuantity.toLocaleString()}` })
  if (conditions.maxQuality !== undefined) {
    const qualityLabel =
      QUALITY_OPTIONS.find((q) => Number(q.value) === conditions.maxQuality)?.label ??
      String(conditions.maxQuality)
    const op = conditions.qualityOp ?? "<="
    chips.push({ label: `Quality ${op} ${qualityLabel}` })
  }
  if (conditions.isTargetEquip === "is-target-equip") chips.push({ label: "Is Target Equip" })
  if (conditions.isTargetCompanionEquip === "is-target-companion-equip")
    chips.push({ label: "Is Target Companion Equip" })
  if (conditions.canCompanionEquip === "can-companion-equip")
    chips.push({ label: "Can Companion Equip" })
  if (conditions.canSell === "can-sell") chips.push({ label: "Can Sell to Merchant" })
  if (conditions.stolen === "not-stolen") chips.push({ label: "Not Stolen" })
  if (conditions.stolen === "stolen") chips.push({ label: "Stolen" })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((chip) => (
        <Badge key={chip.label} variant="elevation-muted" className="shrink-0">
          {chip.label}
        </Badge>
      ))}
    </div>
  )
}
