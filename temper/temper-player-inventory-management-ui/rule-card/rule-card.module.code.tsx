"use client"

import { ItemCard } from "@akasha/design-patterns/item-card"
import type { ControlledRule } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { memo, useEffect, useState } from "react"
import { getActionLabel } from "../action-options/action-options.module.code.ts"
import { AffectedItemsDialog } from "../affected-items-dialog/affected-items-dialog.module.code.tsx"
import { RuleCardActionRow } from "../rule-card-action-row/rule-card-action-row.module.code.tsx"
import { RuleCardCategoryRow } from "../rule-card-category-row/rule-card-category-row.module.code.tsx"
import { RuleCardControlledContent } from "../rule-card-controlled-content/rule-card-controlled-content.module.code.tsx"
import { RuleCardDeleteDialog } from "../rule-card-delete-dialog/rule-card-delete-dialog.module.code.tsx"
import { RuleCardFilters } from "../rule-card-filters/rule-card-filters.module.code.tsx"
import { RuleCardHeaderRow } from "../rule-card-header-row/rule-card-header-row.module.code.tsx"
import { RuleCardPriorityRow } from "../rule-card-priority-row/rule-card-priority-row.module.code.tsx"
import { RuleNotesDialog } from "../rule-notes-dialog/rule-notes-dialog.module.code.tsx"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"
import type { RuleCardOnUpdate } from "../use-rule-card/use-rule-card.module.code.ts"
import { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

const noopUpdate: RuleCardOnUpdate = () => {}

interface RuleCardProps {
  rule: CategoryRule
  priorityIndex: number
  totalRules?: number
  controlledRulesCount?: number
  isDuplicate?: boolean
  affectedItems: readonly AffectedItem[]
  destinationOptions?: DestinationOptions
  isExpanded: boolean
  onToggleExpand: (ruleId: string) => void
  onUpdate?: (
    ruleId: string,
    patch: Partial<
      Pick<
        CategoryRule,
        | "categoryId"
        | "action"
        | "conditions"
        | "destination"
        | "stockScope"
        | "destinationChain"
        | "active"
        | "goal"
        | "title"
        | "notes"
      >
    >
  ) => void
  onRemove?: (ruleId: string) => void
  onReorder?: (ruleId: string, toIndex: number) => void
  onDuplicate?: (ruleId: string) => void
  onLock?: (ruleId: string, locked: boolean) => void
  isSortActive?: boolean
  controlled?: ControlledRule
}

export const RuleCard = memo(function RuleCard({
  rule,
  priorityIndex,
  totalRules,
  controlledRulesCount,
  isDuplicate,
  affectedItems,
  destinationOptions,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onRemove,
  onReorder,
  onDuplicate,
  onLock,
  isSortActive = false,
  controlled,
}: RuleCardProps) {
  const isControlled = !!controlled
  const localIndex = priorityIndex - 1 - (controlledRulesCount ?? 0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [notesDialogOpen, setNotesDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const ruleCardState = useRuleCard(rule, onUpdate ?? noopUpdate)
  const {
    path,
    deepestChildren,
    isCurrency,
    displayAction,
    actionOption,
    handleCategorySelect,
    handleActionChange,
    handleDestinationChange,
    handleDeconstructModeChange,
    handleSellDestinationChange,
    handleStockQuantityChange,
    handleStockScopeChange,
    handleDestinationChainChange,
    handleToggleDestinationChain,
  } = ruleCardState

  function handleMailRecipientChange(handle: string) {
    onUpdate?.(rule.id, { destination: `mail:${handle}` })
  }

  const isActive = rule.active !== false
  const [optimisticLocked, setOptimisticLocked] = useState(rule.locked === true)
  useEffect(() => {
    setOptimisticLocked(rule.locked === true)
  }, [rule.locked])
  const isLocked = optimisticLocked

  const affectedCount = affectedItems.reduce(
    (sum, i) => sum + (i.alreadyAtDestination ? 0 : i.item.stackCount),
    0
  )

  const actionLabel = getActionLabel(rule.action)

  function handleToggleLock() {
    setOptimisticLocked(!isLocked)
    onLock?.(rule.id, !isLocked)
  }

  function RenderRuleContent(countInteractive: boolean) {
    return (
      <div className="flex flex-col gap-1.5">
        {}
        <RuleCardHeaderRow
          rule={rule}
          isControlled={isControlled}
          isLocked={isLocked}
          isExpanded={isExpanded}
          isSortActive={isSortActive}
          localIndex={localIndex}
          totalRules={totalRules}
          controlledRulesCount={controlledRulesCount}
          countInteractive={countInteractive}
          onUpdate={onUpdate}
          onToggleExpand={onToggleExpand}
          onReorder={onReorder}
          onDuplicate={onDuplicate}
          openNotesDialog={() => setNotesDialogOpen(true)}
          openDeleteDialog={() => setDeleteDialogOpen(true)}
        />

        {}
        <RuleCardPriorityRow
          rule={rule}
          priorityIndex={priorityIndex}
          totalRules={totalRules}
          controlledRulesCount={controlledRulesCount}
          isControlled={isControlled}
          isSortActive={isSortActive}
          isDuplicate={isDuplicate}
          isActive={isActive}
          isLocked={isLocked}
          affectedItemCount={affectedCount}
          hasAffectedItems={affectedItems.length > 0}
          countInteractive={countInteractive}
          controlled={controlled}
          onUpdate={onUpdate}
          onReorder={onReorder}
          onToggleLock={handleToggleLock}
          openAffectedDialog={() => setDialogOpen(true)}
        />

        {}
        <div
          hidden={countInteractive && !isExpanded}
          className={!isControlled && isLocked ? "pointer-events-none" : undefined}
          inert={(!isControlled && isLocked) || undefined}
        >
          {isControlled && controlled ? (
            <RuleCardControlledContent
              rule={rule}
              actionLabel={actionLabel}
              path={path}
              controlled={controlled}
            />
          ) : destinationOptions !== undefined ? (
            <div className="flex flex-col gap-1.5">
              <RuleCardActionRow
                rule={rule}
                isCurrency={isCurrency}
                displayAction={displayAction}
                actionOption={actionOption}
                destinationOptions={destinationOptions}
                handleActionChange={handleActionChange}
                handleDestinationChange={handleDestinationChange}
                handleSellDestinationChange={handleSellDestinationChange}
                handleDeconstructModeChange={handleDeconstructModeChange}
                handleStockQuantityChange={handleStockQuantityChange}
                handleStockScopeChange={handleStockScopeChange}
                handleDestinationChainChange={handleDestinationChainChange}
                handleToggleDestinationChain={handleToggleDestinationChain}
                handleMailRecipientChange={handleMailRecipientChange}
              />
              <RuleCardCategoryRow
                path={path}
                deepestChildren={deepestChildren}
                onSelect={handleCategorySelect}
              />
              <RuleCardFilters state={ruleCardState} />
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <>
      <ItemCard renderContent={() => RenderRuleContent(true)} />
      <AffectedItemsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        header={<ItemCard renderContent={() => RenderRuleContent(false)} />}
        items={affectedItems.filter((i) => !i.alreadyAtDestination)}
      />
      <RuleNotesDialog
        open={notesDialogOpen}
        onOpenChange={setNotesDialogOpen}
        notes={isControlled ? controlled.description : rule.notes}
        onSave={isControlled ? () => {} : (notes) => onUpdate?.(rule.id, { notes })}
        readOnly={isControlled || isLocked}
      />
      {!isControlled && (
        <RuleCardDeleteDialog
          rule={rule}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          path={path}
          onConfirm={() => onRemove?.(rule.id)}
        />
      )}
    </>
  )
})
