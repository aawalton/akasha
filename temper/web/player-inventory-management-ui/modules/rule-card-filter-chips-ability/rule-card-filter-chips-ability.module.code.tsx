"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { titleOf } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { temperDeconstructMode } from "akasha/temper/items/rules/core/temper-deconstruct-mode/temper-deconstruct-mode.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { FilterLock } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-lock/rule-card-filter-lock.module.code.tsx"
import {
  useLockReason,
  useRemoveFilterLabel,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  titleOfFilter,
  useConditionFieldTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-field-titles/use-condition-field-titles.module.code.tsx"
import {
  optionsOf,
  useConditionValueOptions,
  valueLabelOf,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-condition-value-options/use-condition-value-options.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import type { ReactNode } from "react"

type RuleCardState = ReturnType<typeof useRuleCard>

export type AbilityFilterId =
  | "can-inspire"
  | "can-research"
  | "can-unlock"
  | "can-open"
  | "can-sell"
  | "can-list-at-guild-trader"
  | "can-give-max-rewards"
  | "can-companion-equip"
  | "needed-for-target-character-build"
  | "needed-for-target-companion-build"

interface RuleCardFilterChipAbilityProps {
  id: AbilityFilterId
  state: Pick<
    RuleCardState,
    | "action"
    | "displayAction"
    | "canInspireValue"
    | "canResearchValue"
    | "canUnlockValue"
    | "canOpenValue"
    | "canGiveMaxRewardsValue"
    | "canCompanionEquipValue"
    | "handleCanInspireChange"
    | "handleCanUnlockChange"
    | "handleCanCompanionEquipChange"
    | "handleCanResearchChange"
    | "handleRemoveFilter"
  >
}

export function RuleCardFilterChipAbility({
  id,
  state,
}: RuleCardFilterChipAbilityProps): ReactNode {
  const {
    action,
    displayAction,
    canInspireValue,
    canResearchValue,
    canUnlockValue,
    canOpenValue,
    canGiveMaxRewardsValue,
    canCompanionEquipValue,
    handleCanInspireChange,
    handleCanResearchChange,
    handleCanUnlockChange,
    handleCanCompanionEquipChange,
    handleRemoveFilter,
  } = state
  const titles = useConditionFieldTitles()
  const values = useConditionValueOptions()
  const lockReason = useLockReason()
  const modes = useKeyedTitles(temperDeconstructMode.slug)
  const removeLabel = useRemoveFilterLabel()
  if (titles === null || values === null || lockReason === null || modes === null) return null
  if (removeLabel === null) return null
  const title = titleOfFilter(titles, id)
  const remove = removeLabel(id)
  const options = optionsOf(values, id)
  const chosen = (value: string) => valueLabelOf(values, id, value)

  switch (id) {
    case "can-inspire":
      return displayAction === "deconstruct" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {chosen(canInspireValue)}
          <FilterLock
            reason={lockReason("lock-deconstruct-scope", "deconstruct", id, {
              mode: titleOf(modes, "for-materials"),
            })}
          />
        </Badge>
      ) : (
        <Select value={canInspireValue} onValueChange={handleCanInspireChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-inspire")}
              removeLabel={remove}
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "can-research":
      return displayAction === "research" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {chosen(canResearchValue)}
          <FilterLock reason={lockReason("lock-research", "research", id)} />
        </Badge>
      ) : (
        <Select value={canResearchValue} onValueChange={handleCanResearchChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-research")}
              removeLabel={remove}
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "can-unlock":
      return displayAction === "use" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {chosen(canUnlockValue)}
          <FilterLock reason={lockReason("lock-use", "use", id)} />
        </Badge>
      ) : (
        <Select value={canUnlockValue} onValueChange={handleCanUnlockChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-unlock")}
              removeLabel={remove}
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "can-open":
      return displayAction === "open" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {chosen(canOpenValue)}
          <FilterLock reason={lockReason("lock-open", "open", id)} />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-open")}
          removeLabel={remove}
        >
          {chosen(canOpenValue)}
        </Badge>
      )

    case "can-sell":
      return action === "fence-sell" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {title}
          <FilterLock reason={lockReason("lock-fence-can-sell", "fence-sell", id)} />
        </Badge>
      ) : displayAction === "sell" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {title}
          <FilterLock reason={lockReason("lock-sell-can-sell", "sell", id)} />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-sell")}
          removeLabel={remove}
        >
          {title}
        </Badge>
      )

    case "can-list-at-guild-trader":
      return displayAction === "sell" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {title}
          <FilterLock reason={lockReason("lock-list", "list", id)} />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-list-at-guild-trader")}
          removeLabel={remove}
        >
          {title}
        </Badge>
      )

    case "can-give-max-rewards":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("can-give-max-rewards")}
          removeLabel={remove}
        >
          {chosen(canGiveMaxRewardsValue)}
        </Badge>
      )

    case "can-companion-equip":
      return displayAction === "companion-equip" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {chosen(canCompanionEquipValue)}
          <FilterLock reason={lockReason("lock-companion-can-equip", "companion-equip", id)} />
        </Badge>
      ) : (
        <Select value={canCompanionEquipValue} onValueChange={handleCanCompanionEquipChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("can-companion-equip")}
              removeLabel={remove}
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "needed-for-target-character-build":
      return displayAction === "character-equip" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {title}
          <FilterLock reason={lockReason("lock-character-build", "character-equip", id)} />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("needed-for-target-character-build")}
          removeLabel={remove}
        >
          {title}
        </Badge>
      )

    case "needed-for-target-companion-build":
      return displayAction === "companion-equip" ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {title}
          <FilterLock reason={lockReason("lock-companion-build", "companion-equip", id)} />
        </Badge>
      ) : (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("needed-for-target-companion-build")}
          removeLabel={remove}
        >
          {title}
        </Badge>
      )
    default:
      return assertNever(id)
  }
}
