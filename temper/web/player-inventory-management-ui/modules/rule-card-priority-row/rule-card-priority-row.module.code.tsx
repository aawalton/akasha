"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { NumberBadge } from "akasha/design/interface/badge/modules/number-badge/number-badge.module.code.tsx"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { ControlledRule } from "akasha/temper/items/rules/core/modules/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import {
  goalIdToValue,
  goalValueToId,
  inventoryRuleGoals,
} from "akasha/temper/items/rules/core/modules/inventory-rule-goals/inventory-rule-goals.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  goalTitleIn,
  useRuleGoalTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-goal-titles/use-rule-goal-titles.module.code.tsx"

interface RuleCardPriorityRowProps {
  rule: CategoryRule
  priorityIndex: number
  totalRules: number | undefined
  controlledRulesCount: number | undefined
  isControlled: boolean
  isSortActive: boolean
  isDuplicate: boolean | undefined
  isActive: boolean
  isLocked: boolean
  affectedItemCount: number
  hasAffectedItems: boolean
  countInteractive: boolean
  controlled: ControlledRule | undefined
  onUpdate?: (ruleId: string, patch: Partial<Pick<CategoryRule, "active" | "goal">>) => void
  onReorder?: (ruleId: string, toIndex: number) => void
  onToggleLock: () => void
  openAffectedDialog: () => void
}

export function RuleCardPriorityRow({
  rule,
  priorityIndex,
  totalRules,
  controlledRulesCount,
  isControlled,
  isSortActive,
  isDuplicate,
  isActive,
  isLocked,
  affectedItemCount,
  hasAffectedItems,
  countInteractive,
  controlled,
  onUpdate,
  onReorder,
  onToggleLock,
  openAffectedDialog,
}: RuleCardPriorityRowProps) {
  const phrases = useRuleCardPhrases()
  const goals = useRuleGoalTitles()
  const activeTitle = titleIn(phrases, isActive ? "rule-active" : "rule-inactive")
  const itemCount =
    phrases === null
      ? ""
      : phraseOf(phrases, affectedItemCount === 1 ? "count-item" : "count-items", {
          count: String(affectedItemCount),
        })

  return (
    <div className="flex items-center gap-1.5">
      {isControlled ? (
        <div inert className="contents">
          <NumberBadge
            editable
            value={priorityIndex}
            min={priorityIndex}
            max={priorityIndex}
            onChange={() => {}}
            variant="elevation-muted"
            className="shrink-0"
          />
        </div>
      ) : isSortActive ? (
        <Badge variant="elevation-muted" className="shrink-0 tabular-nums">
          #{priorityIndex}
        </Badge>
      ) : (
        <NumberBadge
          editable
          value={priorityIndex}
          min={1 + (controlledRulesCount ?? 0)}
          max={totalRules ?? priorityIndex}
          onChange={(val) => onReorder?.(rule.id, val - 1 - (controlledRulesCount ?? 0))}
          variant="elevation-muted"
          className="shrink-0"
        />
      )}
      {!isControlled && (
        <Select
          value={goalValueToId(rule.goal)}
          onValueChange={(val) => onUpdate?.(rule.id, { goal: goalIdToValue(val) })}
        >
          <SelectTrigger hideChevron>
            <Badge variant="elevation-muted" className="shrink-0">
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent
            nullSentinel={{ value: "none", label: titleIn(phrases, "no-goal") }}
            sorted
          >
            {inventoryRuleGoals.list
              .filter((g) => g.id !== "none")
              .map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {goalTitleIn(goals, g.id)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
      {isControlled && controlled ? (
        <>
          <Badge variant="accent" className="shrink-0 cursor-pointer" asChild>
            <LayoutLink href={controlled.settingsPath}>
              {titleIn(phrases, "rule-active")}
            </LayoutLink>
          </Badge>
          <Badge variant="elevation-muted" className="shrink-0 cursor-pointer" asChild>
            <LayoutLink href={controlled.settingsPath}>
              {titleIn(phrases, "rule-controlled")}
            </LayoutLink>
          </Badge>
        </>
      ) : isDuplicate ? (
        <Badge variant="elevation-muted" className="shrink-0">
          {titleIn(phrases, "rule-duplicate")}
        </Badge>
      ) : isLocked ? (
        <Badge variant={isActive ? "accent" : "elevation-muted"} className="shrink-0">
          {activeTitle}
        </Badge>
      ) : (
        <ButtonBadge
          variant={isActive ? "accent" : "elevation-muted"}
          className="shrink-0"
          onClick={() => onUpdate?.(rule.id, { active: !isActive })}
        >
          {activeTitle}
        </ButtonBadge>
      )}
      {!isControlled && (
        <ButtonBadge variant="elevation-muted" className="shrink-0" onClick={onToggleLock}>
          {titleIn(phrases, isLocked ? "rule-locked" : "rule-unlocked")}
        </ButtonBadge>
      )}
      {hasAffectedItems &&
        (countInteractive ? (
          <ButtonBadge
            variant="elevation-muted"
            className="shrink-0 tabular-nums"
            onClick={openAffectedDialog}
          >
            {itemCount}
          </ButtonBadge>
        ) : (
          <Badge variant="elevation-muted" className="shrink-0 tabular-nums">
            {itemCount}
          </Badge>
        ))}
    </div>
  )
}
