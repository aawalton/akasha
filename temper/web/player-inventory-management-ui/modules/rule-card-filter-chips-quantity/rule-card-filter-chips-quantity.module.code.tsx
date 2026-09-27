"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { EditableNumber } from "akasha/design/interface/form/modules/editable-number/editable-number.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { KEEP_QUANTITY_OPTIONS } from "akasha/temper/items/rules/core/modules/keep-quantity-filter/keep-quantity-filter.module.code.ts"
import { STOCK_THRESHOLD_COUNTS } from "akasha/temper/items/rules/core/modules/stock-threshold-filter/stock-threshold-filter.module.code.ts"
import { TARGET_QUANTITY_OPTIONS } from "akasha/temper/items/rules/core/modules/target-quantity-filter/target-quantity-filter.module.code.ts"
import { ComparisonOpPicker } from "akasha/temper/web/player-inventory-management-ui/modules/comparison-op-picker/comparison-op-picker.module.code.tsx"
import { EditableTextValue } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-text/rule-card-filter-text.module.code.tsx"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  titleOfFilter,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"
import {
  optionsOf,
  useConditionValueOptions,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-value-options/use-condition-value-options.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import { ruleCardFilterChipsQuantityGoldSuffix } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-chips-quantity-gold-suffix.temper-rule-card-phrase.ts"
import type { ReactNode } from "react"

type RuleCardState = ReturnType<typeof useRuleCard>

export type QuantityFilterId =
  | "all-stocked"
  | "stock-threshold"
  | "value"
  | "market-value"
  | "merchant-value"
  | "replacement-value"
  | "keep-quantity"
  | "target-quantity"
  | "item-name"

interface RuleCardFilterChipQuantityProps {
  id: QuantityFilterId
  state: Pick<
    RuleCardState,
    | "allStockedValue"
    | "stockThresholdValue"
    | "valueValue"
    | "valueOp"
    | "marketValueValue"
    | "marketValueOp"
    | "merchantValueValue"
    | "merchantValueOp"
    | "replacementValueValue"
    | "replacementValueOp"
    | "keepQuantityValue"
    | "targetQuantityValue"
    | "itemNamePatternValue"
    | "handleAllStockedChange"
    | "handleStockThresholdChange"
    | "handleValueChange"
    | "handleValueOpChange"
    | "handleMarketValueChange"
    | "handleMarketValueOpChange"
    | "handleMerchantValueChange"
    | "handleMerchantValueOpChange"
    | "handleReplacementValueChange"
    | "handleReplacementValueOpChange"
    | "handleKeepQuantityChange"
    | "handleTargetQuantityChange"
    | "handleItemNamePatternChange"
    | "handleRemoveFilter"
  >
}

export function RuleCardFilterChipQuantity({
  id,
  state,
}: RuleCardFilterChipQuantityProps): ReactNode {
  const {
    allStockedValue,
    stockThresholdValue,
    valueValue,
    valueOp,
    marketValueValue,
    marketValueOp,
    merchantValueValue,
    merchantValueOp,
    replacementValueValue,
    replacementValueOp,
    keepQuantityValue,
    targetQuantityValue,
    itemNamePatternValue,
    handleAllStockedChange,
    handleStockThresholdChange,
    handleValueChange,
    handleValueOpChange,
    handleMarketValueChange,
    handleMarketValueOpChange,
    handleMerchantValueChange,
    handleMerchantValueOpChange,
    handleReplacementValueChange,
    handleReplacementValueOpChange,
    handleKeepQuantityChange,
    handleTargetQuantityChange,
    handleItemNamePatternChange,
    handleRemoveFilter,
  } = state
  const titles = useConditionFieldTitles()
  const values = useConditionValueOptions()
  const phrases = useRuleCardPhrases()
  if (titles === null || values === null || phrases === null) return null
  const title = titleOfFilter(titles, id)
  const remove = phraseOf(phrases, "remove-filter", { filter: title })
  const gold = phraseOf(phrases, ruleCardFilterChipsQuantityGoldSuffix.key)

  switch (id) {
    case "all-stocked":
      return (
        <Select value={allStockedValue} onValueChange={handleAllStockedChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("all-stocked")}
              removeLabel={remove}
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {optionsOf(values, "all-stocked").map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "stock-threshold":
      return (
        <Select value={stockThresholdValue} onValueChange={handleStockThresholdChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("stock-threshold")}
              removeLabel={remove}
            >
              {phraseOf(phrases, "stock-threshold-prefix")} <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {STOCK_THRESHOLD_COUNTS.map((count) => (
              <SelectItem key={count} value={String(count)}>
                {phraseOf(phrases, "count-per-character", { count: String(count) })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={<ComparisonOpPicker value={valueOp} onChange={handleValueOpChange} />}
          onRemove={() => handleRemoveFilter("value")}
          removeLabel={remove}
        >
          <EditableNumber
            value={Number(valueValue)}
            max={99_999_999}
            suffix={gold}
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleValueChange(String(n))}
          />{" "}
          {title}
        </Badge>
      )

    case "market-value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={
            <ComparisonOpPicker value={marketValueOp} onChange={handleMarketValueOpChange} />
          }
          onRemove={() => handleRemoveFilter("market-value")}
          removeLabel={remove}
        >
          <EditableNumber
            value={Number(marketValueValue)}
            max={99_999_999}
            suffix={gold}
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleMarketValueChange(String(n))}
          />{" "}
          {title}
        </Badge>
      )

    case "merchant-value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={
            <ComparisonOpPicker value={merchantValueOp} onChange={handleMerchantValueOpChange} />
          }
          onRemove={() => handleRemoveFilter("merchant-value")}
          removeLabel={remove}
        >
          <EditableNumber
            value={Number(merchantValueValue)}
            max={99_999_999}
            suffix={gold}
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleMerchantValueChange(String(n))}
          />{" "}
          {title}
        </Badge>
      )

    case "replacement-value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={
            <ComparisonOpPicker
              value={replacementValueOp}
              onChange={handleReplacementValueOpChange}
            />
          }
          onRemove={() => handleRemoveFilter("replacement-value")}
          removeLabel={remove}
        >
          <EditableNumber
            value={Number(replacementValueValue)}
            max={99_999_999}
            suffix={gold}
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleReplacementValueChange(String(n))}
          />{" "}
          {title}
        </Badge>
      )

    case "keep-quantity":
      return (
        <Select value={keepQuantityValue} onValueChange={handleKeepQuantityChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("keep-quantity")}
              removeLabel={remove}
            >
              {title} <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {KEEP_QUANTITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "target-quantity":
      return (
        <Select value={targetQuantityValue} onValueChange={handleTargetQuantityChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("target-quantity")}
              removeLabel={remove}
            >
              {title} <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {TARGET_QUANTITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "item-name":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("item-name")}
          removeLabel={remove}
        >
          <EditableTextValue value={itemNamePatternValue} onChange={handleItemNamePatternChange} />
        </Badge>
      )
    default:
      return assertNever(id)
  }
}
