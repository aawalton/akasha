"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import {
  CharacterTargetCascade,
  CompanionTargetCascade,
  DeconstructCascade,
  MoveToCascade,
  StockCascade,
  SubBadgeSelect,
} from "./action-filter-cascades"
import { buildActionFilter, NULL_SENTINEL, parseActionFilter } from "./action-filter-utils"
import { ACTION_OPTIONS, NOTHING_ACTION, SELL_DESTINATION_OPTIONS } from "./action-options"


export function RuleActionFilterSelect({
  ruleAction,
  onRuleActionChange,
}: {
  ruleAction: string | null
  onRuleActionChange: (value: string | null) => void
}) {
  const { action, sub, sub2 } = parseActionFilter(ruleAction)
  const selectValue = action ?? NULL_SENTINEL

  function handleActionChange(val: string) {
    if (val === NULL_SENTINEL) {
      onRuleActionChange(null)
    } else if (val === "move-to") {
      onRuleActionChange("move-to:bank")
    } else {
      onRuleActionChange(val)
    }
  }

  function handleSubChange(subValue: string | null) {
    onRuleActionChange(buildActionFilter(action, subValue, null))
  }

  function handleSub2Change(sub2Value: string | null) {
    onRuleActionChange(buildActionFilter(action, sub, sub2Value))
  }

  function renderSubCascade() {
    if (action == null) return null

    if (action === "move-to") {
      return (
        <MoveToCascade
          sub={sub}
          sub2={sub2}
          onSubChange={handleSubChange}
          onSub2Change={handleSub2Change}
        />
      )
    }

    if (action === "sell") {
      return (
        <SubBadgeSelect
          value={sub}
          options={SELL_DESTINATION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          allLabel="Any Destination"
          onChange={handleSubChange}
        />
      )
    }

    if (action === "stock") {
      return (
        <StockCascade
          sub={sub}
          sub2={sub2}
          onSubChange={handleSubChange}
          onSub2Change={handleSub2Change}
        />
      )
    }

    if (action === "deconstruct") {
      return (
        <DeconstructCascade
          sub={sub}
          sub2={sub2}
          onSubChange={handleSubChange}
          onSub2Change={handleSub2Change}
        />
      )
    }

    if (action === "character-equip" || action === "use" || action === "research") {
      return <CharacterTargetCascade action={action} sub={sub} onSubChange={handleSubChange} />
    }

    if (action === "companion-equip") {
      return <CompanionTargetCascade sub={sub} onSubChange={handleSubChange} />
    }

    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Select value={selectValue} onValueChange={handleActionChange}>
        <SelectTrigger hideChevron>
          <Badge variant="elevation-muted" className="shrink-0">
            <SelectValue placeholder="All Actions" />
          </Badge>
        </SelectTrigger>
        <SelectContent nullSentinel={{ value: NULL_SENTINEL, label: "All Actions" }} sorted>
          <SelectItem value={NOTHING_ACTION.value}>{NOTHING_ACTION.label}</SelectItem>
          {ACTION_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {renderSubCascade()}
    </div>
  )
}
