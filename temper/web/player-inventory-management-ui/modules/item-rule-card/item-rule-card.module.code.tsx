"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { NumberBadge } from "akasha/design/interface/badge/modules/number-badge/number-badge.module.code.tsx"
import { ItemCard } from "akasha/design/interface/pattern/modules/item-card/item-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import type { ItemRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  ACTION_OPTIONS,
  NOTHING_ACTION,
  SELL_ACTIONS,
  SELL_DESTINATION_OPTIONS,
} from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"
import { CharacterTargetSelect } from "akasha/temper/web/player-inventory-management-ui/modules/character-target-select/character-target-select.module.code.tsx"
import { CompanionTargetSelect } from "akasha/temper/web/player-inventory-management-ui/modules/companion-target-select/companion-target-select.module.code.tsx"
import { DestinationCascade } from "akasha/temper/web/player-inventory-management-ui/modules/destination-cascade/destination-cascade.module.code.tsx"
import { itemRuleActionHandlers } from "akasha/temper/web/player-inventory-management-ui/modules/item-rule-card-action-handlers/item-rule-card-action-handlers.module.code.ts"
import { ItemRuleCardDialogs } from "akasha/temper/web/player-inventory-management-ui/modules/item-rule-card-dialogs/item-rule-card-dialogs.module.code.tsx"
import { ItemRuleCardHeader } from "akasha/temper/web/player-inventory-management-ui/modules/item-rule-card-header/item-rule-card-header.module.code.tsx"
import { RuleCardDestinationChain } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-destination-chain/rule-card-destination-chain.module.code.tsx"
import { StockScopeSelect } from "akasha/temper/web/player-inventory-management-ui/modules/stock-scope-select/stock-scope-select.module.code.tsx"
import type { DestinationOptions } from "akasha/temper/web/player-inventory-management-ui/modules/use-destination-options/use-destination-options.module.code.ts"
import { memo, useEffect, useState } from "react"

interface ItemRuleCardProps {
  rule: ItemRule
  destinationOptions: DestinationOptions
  onUpdate: (
    ruleId: string,
    patch: Partial<
      Pick<
        ItemRule,
        | "action"
        | "destination"
        | "active"
        | "goal"
        | "title"
        | "notes"
        | "stockQuantity"
        | "stockScope"
        | "destinationChain"
      >
    >
  ) => void
  onRemove: (ruleId: string) => void
  onDuplicate: (ruleId: string) => void
  onLock: (ruleId: string, locked: boolean) => void
}

export const ItemRuleCard = memo(
  ({ rule, destinationOptions, onUpdate, onRemove, onDuplicate, onLock }: ItemRuleCardProps) => {
    const displayAction = SELL_ACTIONS.has(rule.action) ? "sell" : rule.action
    const actionOption = ACTION_OPTIONS.find((o) => o.value === displayAction) ?? NOTHING_ACTION
    const isActive = rule.active !== false
    const [optimisticLocked, setOptimisticLocked] = useState(rule.locked === true)
    useEffect(() => {
      setOptimisticLocked(rule.locked === true)
    }, [rule.locked])
    const isLocked = optimisticLocked
    const [notesDialogOpen, setNotesDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const {
      useChain,
      handleActionChange,
      handleDestinationChange,
      handleSellDestinationChange,
      handleStockScopeChange,
      handleDestinationChainChange,
      handleToggleDestinationChain,
    } = itemRuleActionHandlers(rule, onUpdate)

    return (
      <>
        <ItemCard
          renderContent={() => (
            <div className="flex flex-col gap-1.5">
              <ItemRuleCardHeader
                rule={rule}
                isLocked={isLocked}
                onTitleChange={(title) => onUpdate(rule.id, { title })}
                onGoalChange={(goal) => onUpdate(rule.id, { goal })}
                onDuplicate={onDuplicate}
                onOpenNotes={() => setNotesDialogOpen(true)}
                onOpenDelete={() => setDeleteDialogOpen(true)}
              />
              <div
                className={isLocked ? "pointer-events-none" : undefined}
                inert={isLocked || undefined}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {isLocked ? (
                      <Badge variant={isActive ? "accent" : "elevation-muted"} className="shrink-0">
                        {isActive ? "Active" : "Inactive"}
                      </Badge>
                    ) : (
                      <ButtonBadge
                        variant={isActive ? "accent" : "elevation-muted"}
                        className="shrink-0"
                        onClick={() => onUpdate(rule.id, { active: !isActive })}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </ButtonBadge>
                    )}
                    <ButtonBadge
                      variant="elevation-muted"
                      className="shrink-0"
                      onClick={() => {
                        setOptimisticLocked(!isLocked)
                        onLock(rule.id, !isLocked)
                      }}
                    >
                      {isLocked ? "Locked" : "Unlocked"}
                    </ButtonBadge>
                    <Select value={displayAction} onValueChange={handleActionChange}>
                      <SelectTrigger hideChevron>
                        <Badge variant={actionOption.variant} className="shrink-0">
                          <SelectValue />
                        </Badge>
                      </SelectTrigger>
                      <SelectContent
                        nullSentinel={{ value: NOTHING_ACTION.value, label: NOTHING_ACTION.label }}
                        sorted
                      >
                        {ACTION_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {}
                    {SELL_ACTIONS.has(rule.action) && (
                      <Select value={rule.action} onValueChange={handleSellDestinationChange}>
                        <SelectTrigger hideChevron>
                          <Badge variant={actionOption.variant} className="shrink-0">
                            <SelectValue />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {SELL_DESTINATION_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {}
                    {rule.action === "move-to" && (
                      <DestinationCascade
                        destination={rule.destination ?? "bank"}
                        options={destinationOptions}
                        onChange={handleDestinationChange}
                        variant={actionOption.variant}
                      />
                    )}

                    {}
                    {rule.action === "stock" && (
                      <>
                        {!useChain && (
                          <>
                            <StockScopeSelect
                              stockScope={rule.stockScope}
                              destination={rule.destination}
                              onChange={handleStockScopeChange}
                              variant={actionOption.variant}
                            />
                            <NumberBadge
                              editable
                              value={rule.stockQuantity ?? 200}
                              min={1}
                              max={99999}
                              onChange={(val) => onUpdate(rule.id, { stockQuantity: val })}
                              variant={actionOption.variant}
                              className="shrink-0"
                            />
                          </>
                        )}
                        <ButtonBadge
                          variant={useChain ? "accent" : "elevation-muted"}
                          className="shrink-0"
                          onClick={() => handleToggleDestinationChain(!useChain)}
                          aria-label={
                            useChain
                              ? "Switch to single destination"
                              : "Switch to cascading destinations"
                          }
                        >
                          {useChain ? "Single destination" : "Cascading destinations"}
                        </ButtonBadge>
                      </>
                    )}

                    {}
                    {(rule.action === "character-equip" ||
                      rule.action === "use" ||
                      rule.action === "research") && (
                      <CharacterTargetSelect
                        action={rule.action}
                        destination={rule.destination}
                        onChange={handleDestinationChange}
                        variant={actionOption.variant}
                      />
                    )}

                    {}
                    {rule.action === "companion-equip" && (
                      <CompanionTargetSelect
                        destination={rule.destination}
                        onChange={handleDestinationChange}
                        variant={actionOption.variant}
                      />
                    )}
                  </div>

                  {}
                  {rule.action === "stock" && useChain && (
                    <RuleCardDestinationChain
                      chain={rule.destinationChain}
                      destinationOptions={destinationOptions}
                      onChange={handleDestinationChainChange}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        />
        <ItemRuleCardDialogs
          rule={rule}
          isLocked={isLocked}
          notesDialogOpen={notesDialogOpen}
          onNotesDialogOpenChange={setNotesDialogOpen}
          deleteDialogOpen={deleteDialogOpen}
          onDeleteDialogOpenChange={setDeleteDialogOpen}
          onSaveNotes={(notes) => onUpdate(rule.id, { notes })}
          onRemove={onRemove}
        />
      </>
    )
  }
)
