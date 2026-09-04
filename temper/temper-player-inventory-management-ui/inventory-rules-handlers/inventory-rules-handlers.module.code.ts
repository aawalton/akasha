import {
  addBuyRule,
  duplicateBuyRule,
  lockBuyRule,
  removeBuyRule,
  updateBuyRule,
} from "@akasha/temper-items-rules-core/buy-rule-settings"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import {
  addCategoryRule,
  addItemRule,
  bulkLockCategoryRules,
  bulkLockItemRules,
  bulkRemoveCategoryRules,
  bulkRemoveItemRules,
  bulkUpdateCategoryRules,
  bulkUpdateItemRules,
  createDefaultRuleSettings,
  duplicateCategoryRule,
  duplicateItemRule,
  lockCategoryRule,
  lockItemRule,
  removeCategoryRule,
  removeItemRule,
  reorderCategoryRule,
  updateCategoryRule,
  updateItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-settings"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  type InventoryRuleSettings,
  type ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { type RefObject, useCallback } from "react"
import {
  preserveLocked,
  useStableSettingsHandler,
} from "../inventory-rules-state/inventory-rules-state.module.code.ts"

export const DEFAULT_BUY_TARGET_QUANTITY = 200

export interface InventoryRulesHandlers {
  handleAddRule: (onAdded?: ((id: string) => void) | unknown) => void
  handleUpdateRule: (
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
  handleRemoveRule: (ruleId: string) => void
  handleReorderRule: (ruleId: string, toIndex: number) => void
  handleDuplicateRule: (ruleId: string) => void
  handleLockRule: (ruleId: string, locked: boolean) => void
  handleResetCategoryRules: () => void

  handleAddItemRule: (params: { itemId: number; itemName: string }) => void
  handleUpdateItemRule: (
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
  handleRemoveItemRule: (ruleId: string) => void
  handleDuplicateItemRule: (ruleId: string) => void
  handleLockItemRule: (ruleId: string, locked: boolean) => void
  handleResetItemRules: () => void

  handleAddBuyRule: (params: { itemId: number; itemName: string }) => void
  handleUpdateBuyRule: (
    ruleId: string,
    patch: Partial<
      Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
    >
  ) => void
  handleRemoveBuyRule: (ruleId: string) => void
  handleDuplicateBuyRule: (ruleId: string) => void
  handleLockBuyRule: (ruleId: string, locked: boolean) => void

  handleBulkSetCategoryActive: (ruleIds: readonly string[]) => void
  handleBulkSetCategoryInactive: (ruleIds: readonly string[]) => void
  handleBulkDeleteCategoryRules: (ruleIds: readonly string[]) => void
  handleBulkLockCategoryRules: (ruleIds: readonly string[]) => void
  handleBulkUnlockCategoryRules: (ruleIds: readonly string[]) => void
  handleBulkForceSetCategoryActive: (ruleIds: readonly string[]) => void
  handleBulkForceSetCategoryInactive: (ruleIds: readonly string[]) => void

  handleBulkSetItemActive: (ruleIds: readonly string[]) => void
  handleBulkSetItemInactive: (ruleIds: readonly string[]) => void
  handleBulkDeleteItemRules: (ruleIds: readonly string[]) => void
  handleBulkLockItemRules: (ruleIds: readonly string[]) => void
  handleBulkUnlockItemRules: (ruleIds: readonly string[]) => void
  handleBulkForceSetItemActive: (ruleIds: readonly string[]) => void
  handleBulkForceSetItemInactive: (ruleIds: readonly string[]) => void
}

export function useInventoryRulesHandlers(
  settingsRef: RefObject<InventoryRuleSettings>,
  persist: (next: InventoryRuleSettings) => void,
  craftBagAccess = false
): InventoryRulesHandlers {
  const handleAddRule = useCallback(
    (onAdded?: ((id: string) => void) | unknown) => {
      const next = addCategoryRule(settingsRef.current, {
        categoryId: ALL_CATEGORIES_ID,
        action: "nothing",
      })
      persist(next)
      const newRule = next.rules[next.rules.length - 1]
      if (newRule && typeof onAdded === "function") onAdded(newRule.id)
    },
    [persist, settingsRef]
  )

  const handleUpdateRule = useStableSettingsHandler(settingsRef, persist, updateCategoryRule)
  const handleRemoveRule = useStableSettingsHandler(settingsRef, persist, removeCategoryRule)
  const handleReorderRule = useStableSettingsHandler(settingsRef, persist, reorderCategoryRule)
  const handleDuplicateRule = useStableSettingsHandler(settingsRef, persist, duplicateCategoryRule)
  const handleLockRule = useStableSettingsHandler(settingsRef, persist, lockCategoryRule)

  const handleAddItemRule = useCallback(
    ({ itemId, itemName }: { itemId: number; itemName: string }) => {
      persist(addItemRule(settingsRef.current, { itemId, itemName, action: "nothing" }))
    },
    [persist, settingsRef]
  )

  const handleUpdateItemRule = useStableSettingsHandler(settingsRef, persist, updateItemRule)
  const handleRemoveItemRule = useStableSettingsHandler(settingsRef, persist, removeItemRule)
  const handleDuplicateItemRule = useStableSettingsHandler(settingsRef, persist, duplicateItemRule)
  const handleLockItemRule = useStableSettingsHandler(settingsRef, persist, lockItemRule)

  const handleResetCategoryRules = useCallback(() => {
    const current = settingsRef.current
    persist({
      ...current,
      rules: preserveLocked(createDefaultRuleSettings(craftBagAccess).rules, current.rules),
    })
  }, [craftBagAccess, persist, settingsRef])

  const handleAddBuyRule = useCallback(
    ({ itemId, itemName }: { itemId: number; itemName: string }) => {
      persist(
        addBuyRule(settingsRef.current, {
          itemId,
          itemName,
          targetQuantity: DEFAULT_BUY_TARGET_QUANTITY,
        })
      )
    },
    [persist, settingsRef]
  )

  const handleUpdateBuyRule = useStableSettingsHandler(settingsRef, persist, updateBuyRule)
  const handleRemoveBuyRule = useStableSettingsHandler(settingsRef, persist, removeBuyRule)
  const handleDuplicateBuyRule = useStableSettingsHandler(settingsRef, persist, duplicateBuyRule)
  const handleLockBuyRule = useStableSettingsHandler(settingsRef, persist, lockBuyRule)

  const handleResetItemRules = useCallback(() => {
    const current = settingsRef.current
    persist({
      ...current,
      itemRules: preserveLocked([], current.itemRules ?? []),
    })
  }, [persist, settingsRef])

  const handleBulkSetCategoryActive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(bulkUpdateCategoryRules(settingsRef.current, ruleIds, { active: true })),
    [persist, settingsRef]
  )
  const handleBulkSetCategoryInactive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(bulkUpdateCategoryRules(settingsRef.current, ruleIds, { active: false })),
    [persist, settingsRef]
  )
  const handleBulkDeleteCategoryRules = useCallback(
    (ruleIds: readonly string[]) => persist(bulkRemoveCategoryRules(settingsRef.current, ruleIds)),
    [persist, settingsRef]
  )
  const handleBulkSetItemActive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(bulkUpdateItemRules(settingsRef.current, ruleIds, { active: true })),
    [persist, settingsRef]
  )
  const handleBulkSetItemInactive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(bulkUpdateItemRules(settingsRef.current, ruleIds, { active: false })),
    [persist, settingsRef]
  )
  const handleBulkDeleteItemRules = useCallback(
    (ruleIds: readonly string[]) => persist(bulkRemoveItemRules(settingsRef.current, ruleIds)),
    [persist, settingsRef]
  )
  const handleBulkLockCategoryRules = useCallback(
    (ruleIds: readonly string[]) =>
      persist(bulkLockCategoryRules(settingsRef.current, ruleIds, true)),
    [persist, settingsRef]
  )
  const handleBulkUnlockCategoryRules = useCallback(
    (ruleIds: readonly string[]) =>
      persist(bulkLockCategoryRules(settingsRef.current, ruleIds, false)),
    [persist, settingsRef]
  )
  const handleBulkLockItemRules = useCallback(
    (ruleIds: readonly string[]) => persist(bulkLockItemRules(settingsRef.current, ruleIds, true)),
    [persist, settingsRef]
  )
  const handleBulkUnlockItemRules = useCallback(
    (ruleIds: readonly string[]) => persist(bulkLockItemRules(settingsRef.current, ruleIds, false)),
    [persist, settingsRef]
  )
  const handleBulkForceSetCategoryActive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(
        bulkUpdateCategoryRules(settingsRef.current, ruleIds, { active: true }, { force: true })
      ),
    [persist, settingsRef]
  )
  const handleBulkForceSetCategoryInactive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(
        bulkUpdateCategoryRules(settingsRef.current, ruleIds, { active: false }, { force: true })
      ),
    [persist, settingsRef]
  )
  const handleBulkForceSetItemActive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(bulkUpdateItemRules(settingsRef.current, ruleIds, { active: true }, { force: true })),
    [persist, settingsRef]
  )
  const handleBulkForceSetItemInactive = useCallback(
    (ruleIds: readonly string[]) =>
      persist(
        bulkUpdateItemRules(settingsRef.current, ruleIds, { active: false }, { force: true })
      ),
    [persist, settingsRef]
  )

  return {
    handleAddRule,
    handleUpdateRule,
    handleRemoveRule,
    handleReorderRule,
    handleDuplicateRule,
    handleLockRule,
    handleResetCategoryRules,
    handleAddItemRule,
    handleUpdateItemRule,
    handleRemoveItemRule,
    handleDuplicateItemRule,
    handleLockItemRule,
    handleResetItemRules,
    handleAddBuyRule,
    handleUpdateBuyRule,
    handleRemoveBuyRule,
    handleDuplicateBuyRule,
    handleLockBuyRule,
    handleBulkSetCategoryActive,
    handleBulkSetCategoryInactive,
    handleBulkDeleteCategoryRules,
    handleBulkLockCategoryRules,
    handleBulkUnlockCategoryRules,
    handleBulkForceSetCategoryActive,
    handleBulkForceSetCategoryInactive,
    handleBulkSetItemActive,
    handleBulkSetItemInactive,
    handleBulkDeleteItemRules,
    handleBulkLockItemRules,
    handleBulkUnlockItemRules,
    handleBulkForceSetItemActive,
    handleBulkForceSetItemInactive,
  }
}
