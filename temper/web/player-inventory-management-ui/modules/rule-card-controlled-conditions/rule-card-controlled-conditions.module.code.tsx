"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ALL_STOCKED_OPTIONS } from "akasha/temper/items/rules/core/modules/all-stocked-filter/all-stocked-filter.module.code.ts"
import type { ControlledRule } from "akasha/temper/items/rules/core/modules/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { FilterOption } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { qualityOptions } from "akasha/temper/items/rules/core/modules/rule-quality-filter/rule-quality-filter.module.code.ts"
import { STOLEN_OPTIONS } from "akasha/temper/items/rules/core/modules/stolen-filter/stolen-filter.module.code.ts"
import {
  titleOfCondition,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"

interface ControlledRuleConditionsProps {
  conditions: NonNullable<ControlledRule["conditions"]>
}

function optionLabel(options: readonly FilterOption[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}

export function ControlledRuleConditions({ conditions }: ControlledRuleConditionsProps) {
  const titles = useConditionFieldTitles()
  if (titles === null) return null
  const title = (key: string) => titleOfCondition(titles, key)
  const chips: { label: string }[] = []

  if (conditions.allStocked === "not-all-stocked")
    chips.push({ label: optionLabel(ALL_STOCKED_OPTIONS, conditions.allStocked) })
  if (conditions.targetQuantity !== undefined)
    chips.push({
      label: `${title("targetQuantity")} x${conditions.targetQuantity.toLocaleString()}`,
    })
  if (conditions.maxQuality !== undefined) {
    const qualityLabel =
      qualityOptions().find((q) => Number(q.value) === conditions.maxQuality)?.label ??
      String(conditions.maxQuality)
    const op = conditions.qualityOp ?? "<="
    chips.push({ label: `${title("maxQuality")} ${op} ${qualityLabel}` })
  }
  if (conditions.isTargetEquip === "is-target-equip") chips.push({ label: title("isTargetEquip") })
  if (conditions.isTargetCompanionEquip === "is-target-companion-equip")
    chips.push({ label: title("isTargetCompanionEquip") })
  if (conditions.canCompanionEquip === "can-companion-equip")
    chips.push({ label: title("canCompanionEquip") })
  if (conditions.canSell === "can-sell") chips.push({ label: title("canSell") })
  if (conditions.stolen === "not-stolen")
    chips.push({ label: optionLabel(STOLEN_OPTIONS, conditions.stolen) })
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
