import { resolveCharacterNameById } from "akasha/temper/items-addon/inventory-character-names/inventory-character-names.module.code.ts"
import { isItemAtMoveToDestination } from "akasha/temper/items-addon/inventory-location-keys/inventory-location-keys.module.code.ts"
import { resolveVenueLabel } from "akasha/temper/items-addon/inventory-plan/inventory-plan.module.code.ts"
import {
  getPendingAction,
  getPendingDestination,
  getPendingTargetQuantity,
} from "akasha/temper/items-addon/inventory-rules-core/inventory-rules-core.module.code.ts"
import { countItemInBag } from "akasha/temper/items-addon/inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import { findMatchedRule } from "akasha/temper/items-addon/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import type { AddonItemAction } from "akasha/temper/items-addon/inventory-rules-types/inventory-rules-types.module.code.ts"
import { computeStockTierDeposit } from "akasha/temper/items-addon/inventory-stock-deposit-decision/inventory-stock-deposit-decision.module.code.ts"
import { formatActionLabel } from "akasha/temper/items-rules-core/inventory-rule-action-labels/inventory-rule-action-labels.module.code.ts"
import type { ItemAction } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
export interface TooltipDecision {
  action: ItemAction
  destination: string | undefined
  targetQuantity: number | undefined
}

function addonActionToItemAction(action: AddonItemAction): ItemAction {
  return action === "open-stolen-when-safe" ? "open" : action
}

function resolveTooltipDecision(bagId: number, slotIndex: number): TooltipDecision | undefined {
  const pending = getPendingAction(bagId, slotIndex)
  if (pending !== undefined) {
    return {
      action: addonActionToItemAction(pending),
      destination: getPendingDestination(bagId, slotIndex),
      targetQuantity: getPendingTargetQuantity(bagId, slotIndex),
    }
  }
  const matched = findMatchedRule(bagId, slotIndex)
  if (matched === undefined) return undefined
  return {
    action: matched.action,
    destination: matched.destination,
    targetQuantity: matched.targetQuantity,
  }
}

function stockSurplus(
  bagId: number,
  slotIndex: number,
  targetQuantity: number | undefined
): number {
  if (targetQuantity === undefined) return 0
  const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
  const itemId = GetItemLinkItemId(itemLink)
  const carried = countItemInBag(BAG_BACKPACK, itemId)
  return computeStockTierDeposit({
    stackCount: carried,
    backpackCount: carried,
    selfTarget: targetQuantity,
    alreadyDispatched: 0,
    tierCap: undefined,
    tierAccountWideCount: 0,
  })
}

export function registerRuleTooltipHook(): undefined {
  const originalSetBagItem = ItemTooltip.SetBagItem

  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    displayFlags?: number
  ): undefined {
    originalSetBagItem.call(this, bagId, slotIndex, displayFlags)

    const decision = resolveTooltipDecision(bagId, slotIndex)
    if (decision === undefined) return

    const destinationLabel = resolveDestinationLabel(decision.action, decision.destination)
    const atDestination =
      decision.action === "move-to" &&
      decision.destination !== undefined &&
      isItemAtMoveToDestination(bagId, decision.destination)
    const label = formatActionLabel({
      action: decision.action,
      destinationLabel,
      targetQuantity: decision.targetQuantity,
      atDestination,
    })

    const tooltip = this
    const addPlanLine = function (this: void, text: string): undefined {
      tooltip.AddLine(text, "", 1, 1, 1, BOTTOM, MODIFY_TEXT_TYPE_NONE, TEXT_ALIGN_CENTER, true)
    }

    addPlanLine(`Plan: ${label}`)

    if (decision.action === "stock" && destinationLabel !== undefined) {
      const surplus = stockSurplus(bagId, slotIndex, decision.targetQuantity)
      if (surplus > 0) {
        addPlanLine(
          `Plan: ${formatActionLabel({
            action: "move-to",
            destinationLabel,
            quantity: surplus,
          })}`
        )
      }
    }
  }
}

function resolveDestinationLabel(
  action: ItemAction,
  destination: string | undefined
): string | undefined {
  if (destination === undefined) return undefined

  if (action === "character-equip" || destination.startsWith("character-worn:")) {
    const charId = destination.substring("character-worn:".length)
    return resolveCharacterNameById(charId) ?? charId
  }

  if (action === "companion-equip" || destination.startsWith("companion-worn:")) {
    const companionName = destination.substring("companion-worn:".length)
    return companionName !== "" ? companionName : undefined
  }

  if (action === "mail" || destination.startsWith("mail:")) {
    const recipient = destination.substring("mail:".length)
    return recipient !== "" ? recipient : undefined
  }

  if (destination.startsWith("character:")) {
    const charId = destination.substring("character:".length)
    return resolveCharacterNameById(charId) ?? charId
  }

  if (destination === "bank") return "Bank"
  if (destination === "craft-bag") return "Craft Bag"
  if (destination === "furniture-vault") return "Furniture Vault"
  if (destination === "house-storage" || destination.startsWith("house-storage:")) {
    return resolveVenueLabel(destination)
  }
  if (destination === "guild-bank" || destination.startsWith("guild-bank:")) {
    return "Guild Bank"
  }

  return undefined
}
