"use client"

import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardTitleBadges } from "@shared/design-primitives/components/card"
import { Text } from "@shared/design-primitives/components/text"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { useSetToggle } from "@shared/design-patterns/hooks/use-set-toggle"
import { buildNodePath } from "@shared/design-patterns/utils/path"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { ESO_QUALITY_TEXT_CLASSES } from "@temper/game-characters-equipment-ui/quality-text-classes"
import type {
  ActionGroup,
  CharacterSession,
  ManagementPlan,
  PlanItem,
  VenueStop,
} from "@temper/game-items-rules-routing-core/inventory-management-plan-types"
import { useCallback, useState } from "react"
import {
  decideManagementPlanPanelState,
  type InventoryReadState,
  type ManagementPlanPanelState,
} from "./rules-tab-panel-states"
import { type ValueExplanationData, ValueExplanationDialog } from "./value-explanation-dialog"

interface ManagementPlanPanelCardProps extends InventoryReadState {
  plan: ManagementPlan
}

function emptyHint(state: Exclude<ManagementPlanPanelState, "plan">): string {
  switch (state) {
    case "loading":
      return "Loading your inventory."
    case "no-inventory":
      return "No inventory has reached this page, so no plan has been built."
    case "no-actions":
      return "No actions pending."
    default:
      return assertNever(state)
  }
}

export function ManagementPlanPanelCard({
  plan,
  isInventoryLoading,
  hasInventory,
}: ManagementPlanPanelCardProps) {
  const { items: expanded, toggle } = useSetToggle([])
  const [valueDialogOpen, setValueDialogOpen] = useState(false)
  const [valueDialogData, setValueDialogData] = useState<ValueExplanationData | null>(null)

  const state = decideManagementPlanPanelState({
    isInventoryLoading,
    hasInventory,
    sessionCount: plan.sessions.length,
  })

  const onItemValueClick = useCallback((item: PlanItem) => {
    setValueDialogData({
      itemName: item.itemName,
      marketValue: item.marketValue,
      replacementValue: item.replacementValue,
      merchantValue: item.merchantValue,
      saleAvg: item.saleAvg,
      minPrice: item.minPrice,
      amountCount: item.amountCount,
      saleAmountCount: item.saleAmountCount,
      suggestedPrice: item.suggestedPrice,
    })
    setValueDialogOpen(true)
  }, [])

  return (
    <PanelCard
      id="management-plan"
      collapsible
      forceMount
      title="Inventory Management Plan"
      headerSubtitle={
        plan.sessions.length > 0 ? (
          <CardTitleBadges>
            <Badge variant="elevation-muted">
              {plan.sessions.length} {plan.sessions.length === 1 ? "login" : "logins"}
            </Badge>
            <Badge variant="elevation-muted">
              {plan.totalVenueVisits} {plan.totalVenueVisits === 1 ? "venue" : "venues"}
            </Badge>
            <Badge variant="elevation-muted">
              {plan.totalSlots} {plan.totalSlots === 1 ? "slot" : "slots"}
            </Badge>
          </CardTitleBadges>
        ) : undefined
      }
    >
      {state !== "plan" ? (
        <Text variant="hint" className="py-4 text-center">
          {emptyHint(state)}
        </Text>
      ) : (
        <div className="flex flex-col">
          <ItemRow
            label="Total"
            quantity={plan.totalSlots}
            value={plan.totalValue !== undefined ? formatGold(plan.totalValue) : undefined}
            accent
            actionButtonCount={1}
          />
          {plan.sessions.map((session, index) =>
            renderSession(
              session,
              index,
              plan.totalValue !== undefined,
              expanded,
              toggle,
              onItemValueClick
            )
          )}
        </div>
      )}
      <ValueExplanationDialog
        open={valueDialogOpen}
        onOpenChange={setValueDialogOpen}
        data={valueDialogData}
      />
    </PanelCard>
  )
}

function renderSession(
  session: CharacterSession,
  index: number,
  hasAnyValue: boolean,
  expanded: ReadonlySet<string>,
  toggle: (path: string) => void,
  onItemValueClick: (item: PlanItem) => void
) {
  const sessionKey = `${session.characterId}-${index}`
  const path = buildNodePath("", sessionKey)
  const isExpanded = expanded.has(path)

  const visitSuffix =
    session.visitNumber != null && session.visitNumber > 1 ? ` (Visit ${session.visitNumber})` : ""
  const label = `${session.characterName}${visitSuffix}`

  return (
    <div key={sessionKey}>
      <ItemRow
        label={label}
        quantity={session.totalSlots}
        value={
          hasAnyValue && session.totalValue !== undefined
            ? formatGold(session.totalValue)
            : undefined
        }
        depth={0}
        expanded={isExpanded}
        onToggle={() => toggle(path)}
        actionButtonCount={1}
      />
      {isExpanded &&
        session.venues.map((venue, venueIndex) =>
          renderVenue(venue, venueIndex, hasAnyValue, path, expanded, toggle, onItemValueClick)
        )}
    </div>
  )
}

function renderVenue(
  venue: VenueStop,
  venueIndex: number,
  hasAnyValue: boolean,
  parentPath: string,
  expanded: ReadonlySet<string>,
  toggle: (path: string) => void,
  onItemValueClick: (item: PlanItem) => void
) {
  const venueKey = `${venue.venue}-${venueIndex}`
  const path = buildNodePath(parentPath, venueKey)
  const isExpanded = expanded.has(path)

  return (
    <div key={venueKey}>
      <ItemRow
        label={venue.label}
        value={
          hasAnyValue && venue.totalValue !== undefined ? formatGold(venue.totalValue) : undefined
        }
        quantity={venue.slotCount}
        depth={1}
        expanded={isExpanded}
        onToggle={() => toggle(path)}
        actionButtonCount={1}
      />
      {isExpanded &&
        venue.actionGroups.map((group) =>
          renderActionGroup(group, hasAnyValue, path, expanded, toggle, onItemValueClick)
        )}
    </div>
  )
}

function renderActionGroup(
  group: ActionGroup,
  hasAnyValue: boolean,
  parentPath: string,
  expanded: ReadonlySet<string>,
  toggle: (path: string) => void,
  onItemValueClick: (item: PlanItem) => void
) {
  const path = buildNodePath(parentPath, group.label)
  const isExpanded = expanded.has(path)

  return (
    <div key={group.label}>
      <ItemRow
        label={group.label}
        value={
          hasAnyValue && group.totalValue !== undefined ? formatGold(group.totalValue) : undefined
        }
        quantity={group.slotCount}
        depth={2}
        expanded={isExpanded}
        onToggle={() => toggle(path)}
        actionButtonCount={1}
      />
      {isExpanded &&
        group.items.map((item, i) => renderItem(item, i, hasAnyValue, onItemValueClick))}
    </div>
  )
}

function renderItem(
  item: PlanItem,
  index: number,
  hasAnyValue: boolean,
  onItemValueClick: (item: PlanItem) => void
) {
  const qualityClass = ESO_QUALITY_TEXT_CLASSES[item.quality]
  const label = <span className={qualityClass}>{item.itemName}</span>
  const itemTotal = item.value !== undefined ? item.value * item.stackCount : undefined
  const hasValueBreakdown =
    item.replacementValue !== undefined ||
    item.merchantValue !== undefined ||
    item.saleAvg !== undefined
  const showValue = hasAnyValue && itemTotal !== undefined

  return (
    <ItemRow
      key={`${item.itemName}-${item.quality}-${index}`}
      label={label}
      value={showValue ? formatGold(itemTotal) : undefined}
      onValueClick={showValue && hasValueBreakdown ? () => onItemValueClick(item) : undefined}
      quantity={item.stackCount > 1 ? item.stackCount : undefined}
      depth={3}
      actionButtonCount={1}
    />
  )
}
