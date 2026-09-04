import { formatActionLabel } from "@akasha/temper-items-rules-core/inventory-rule-action-labels"
import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { resolveCharacterNameById } from "../inventory-character-names/inventory-character-names.module.code.ts"
import { isItemAtMoveToDestination } from "../inventory-location-keys/inventory-location-keys.module.code.ts"
import { resolveVenueLabel } from "../inventory-plan/inventory-plan.module.code.ts"
import {
  getPendingAction,
  getPendingDestination,
  getPendingTargetQuantity,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { findMatchedRule } from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
import type { AddonItemAction } from "../inventory-rules-types/inventory-rules-types.module.code.ts"
export interface TooltipDecision {
  action: ItemAction
  destination: string | undefined
  targetQuantity: number | undefined
}

function addonActionToItemAction(action: AddonItemAction): ItemAction {
  return action === "open-stolen-when-safe" ? "open" : action
}

export function resolveTooltipDecision(
  bagId: number,
  slotIndex: number
): TooltipDecision | undefined {
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

    this.AddLine(
      `Plan: ${label}`,
      "",
      1,
      1,
      1,
      BOTTOM,
      MODIFY_TEXT_TYPE_NONE,
      TEXT_ALIGN_CENTER,
      true
    )
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
