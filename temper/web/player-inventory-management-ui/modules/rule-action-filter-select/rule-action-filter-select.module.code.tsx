"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { ruleActionFilterSelectAllActions } from "akasha/temper/web/phrase/pages/rule-action-filter-select-all-actions.temper-web-phrase.ts"
import { ruleActionFilterSelectAnyDestination } from "akasha/temper/web/phrase/pages/rule-action-filter-select-any-destination.temper-web-phrase.ts"
import {
  CharacterTargetCascade,
  CompanionTargetCascade,
  DeconstructCascade,
  MoveToCascade,
  StockCascade,
  SubBadgeSelect,
} from "akasha/temper/web/player-inventory-management-ui/modules/action-filter-cascades/action-filter-cascades.module.code.tsx"
import {
  buildActionFilter,
  NULL_SENTINEL,
  parseActionFilter,
} from "akasha/temper/web/player-inventory-management-ui/modules/action-filter-utils/action-filter-utils.module.code.ts"
import {
  ACTION_OPTIONS,
  NOTHING_ACTION,
  SELL_DESTINATION_OPTIONS,
} from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"

export function RuleActionFilterSelect({
  ruleAction,
  onRuleActionChange,
}: {
  ruleAction: string | null
  onRuleActionChange: (value: string | null) => void
}) {
  const { action, sub, sub2 } = parseActionFilter(ruleAction)
  const selectValue = action ?? NULL_SENTINEL
  const actionTitles = useKeyedTitles(temperItemAction.slug)
  const venues = useKeyedTitles(temperVenue.slug)
  const phrase = usePhrase()
  const allActions = phrase(ruleActionFilterSelectAllActions.slug)

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

  function RenderSubCascade() {
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
          options={SELL_DESTINATION_OPTIONS.map((o) => ({
            value: o.value,
            label: titleIn(venues, o.venue),
          }))}
          allLabel={phrase(ruleActionFilterSelectAnyDestination.slug)}
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
            <SelectValue placeholder={allActions} />
          </Badge>
        </SelectTrigger>
        <SelectContent nullSentinel={{ value: NULL_SENTINEL, label: allActions }} sorted>
          <SelectItem value={NOTHING_ACTION.value}>
            {titleIn(actionTitles, NOTHING_ACTION.value)}
          </SelectItem>
          {ACTION_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {titleIn(actionTitles, opt.value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {RenderSubCascade()}
    </div>
  )
}
