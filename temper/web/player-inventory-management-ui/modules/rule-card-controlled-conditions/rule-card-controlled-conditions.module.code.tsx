"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import type { ControlledRule } from "akasha/temper/items/rules/core/modules/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import { qualityOptions } from "akasha/temper/items/rules/core/modules/rule-quality-filter/rule-quality-filter.module.code.ts"
import { useOperatorTitles } from "akasha/temper/web/player-inventory-management-ui/modules/comparison-op-picker/comparison-op-picker.module.code.tsx"
import {
  titleOfCondition,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"
import {
  useConditionValueOptions,
  valueLabelOf,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-value-options/use-condition-value-options.module.code.tsx"

interface ControlledRuleConditionsProps {
  conditions: NonNullable<ControlledRule["conditions"]>
}

export function ControlledRuleConditions({ conditions }: ControlledRuleConditionsProps) {
  const titles = useConditionFieldTitles()
  const values = useConditionValueOptions()
  const operators = useOperatorTitles()
  if (titles === null || values === null) return null
  const title = (key: string) => titleOfCondition(titles, key)
  const chips: { label: string }[] = []

  if (conditions.allStocked === "not-all-stocked")
    chips.push({ label: valueLabelOf(values, "all-stocked", conditions.allStocked) })
  if (conditions.targetQuantity !== undefined)
    chips.push({
      label: `${title("targetQuantity")} x${conditions.targetQuantity.toLocaleString()}`,
    })
  if (conditions.maxQuality !== undefined) {
    const qualityLabel =
      qualityOptions().find((q) => Number(q.value) === conditions.maxQuality)?.label ??
      String(conditions.maxQuality)
    const op = operators.get(conditions.qualityOp ?? "<=") ?? ""
    chips.push({ label: `${title("maxQuality")} ${op} ${qualityLabel}` })
  }
  if (conditions.isTargetEquip === "is-target-equip") chips.push({ label: title("isTargetEquip") })
  if (conditions.isTargetCompanionEquip === "is-target-companion-equip")
    chips.push({ label: title("isTargetCompanionEquip") })
  if (conditions.canCompanionEquip === "can-companion-equip")
    chips.push({ label: title("canCompanionEquip") })
  if (conditions.canSell === "can-sell") chips.push({ label: title("canSell") })
  if (conditions.stolen === "not-stolen")
    chips.push({ label: valueLabelOf(values, "stolen", conditions.stolen) })
  if (conditions.stolen === "stolen") chips.push({ label: title("stolen") })

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
