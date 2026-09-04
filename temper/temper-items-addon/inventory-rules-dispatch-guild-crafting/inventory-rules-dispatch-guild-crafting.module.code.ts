import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { requireAt } from "@akasha/utils-narrow/require-at"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getGuildBankLocationKey } from "../inventory-location-keys/inventory-location-keys.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
  getPendingAction,
  getPendingDestination,
  getPendingRuleIndex,
  getPendingTargetQuantity,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  shouldConfirmAction,
  showConfirmDialog,
} from "../inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import {
  formatItemList,
  reportAction,
  reportPendingAction,
} from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { runRefinePass } from "../inventory-rules-dispatch-refine/inventory-rules-dispatch-refine.module.code.ts"
import { evaluateRules } from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { dispatchWritCrafting } from "../inventory-writ-crafting-dispatch/inventory-writ-crafting-dispatch.module.code.ts"
export const MAX_OPS = 50

export function onOpenGuildBank(): undefined {
  const guildBankKey = getGuildBankLocationKey()
  if (guildBankKey === undefined) return

  const deposits: { bagId: number; slotIndex: number; action: ItemAction; ruleIndex: number }[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (bagId !== BAG_BACKPACK) return
    if (action !== "move-to" && action !== "stock") return
    const dest = destination ?? "bank"
    if (dest === "guild-bank") {
    } else if (dest.substring(0, 11) === "guild-bank:") {
      const guildName = dest.substring(11)
      if (guildName !== guildBankKey) return
    } else {
      return
    }
    deposits.push({
      bagId,
      slotIndex,
      action,
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })

  table.sort(deposits, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  const eligible: typeof deposits = []

  for (const dep of deposits) {
    if (eligible.length >= MAX_OPS) break
    const [stackCount] = GetSlotStackSize(dep.bagId, dep.slotIndex)
    if (stackCount === 0) continue

    if (dep.action === "stock") {
      const tq = getPendingTargetQuantity(dep.bagId, dep.slotIndex)
      if (tq !== undefined) {
        const itemLink = GetItemLink(dep.bagId, dep.slotIndex, LINK_STYLE_BRACKETS)
        const itemId = GetItemLinkItemId(itemLink)
        let alreadyAtDest = 0
        const guildBankSize = GetBagSize(BAG_GUILDBANK)
        for (let slot = 0; slot < guildBankSize; slot++) {
          const [ss] = GetSlotStackSize(BAG_GUILDBANK, slot)
          if (ss === 0) continue
          const gl = GetItemLink(BAG_GUILDBANK, slot, LINK_STYLE_BRACKETS)
          if (GetItemLinkItemId(gl) === itemId) alreadyAtDest += ss
        }
        const needed = math.max(0, tq - alreadyAtDest)
        if (needed === 0) {
          clearPendingAction(dep.bagId, dep.slotIndex)
          continue
        }
        if (stackCount > needed) {
          clearPendingAction(dep.bagId, dep.slotIndex)
          continue
        }
      }
    }

    eligible.push(dep)
  }

  if (eligible.length === 0) return

  const ns = `${ADDON_NAME}_GuildDeposit`
  let queueIndex = 0
  const depositedLinks: string[] = []

  function cleanup(): undefined {
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_GUILD_BANK_ITEM_ADDED)
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_GUILD_BANK_TRANSFER_ERROR)
  }

  function report(): undefined {
    if (depositedLinks.length > 0) {
      reportAction("Deposited to guild bank", depositedLinks)
    }
  }

  function transferNext(): undefined {
    while (queueIndex < eligible.length) {
      const dep = requireAt(eligible, queueIndex, "eligible")
      queueIndex++
      const [stackCount] = GetSlotStackSize(dep.bagId, dep.slotIndex)
      if (stackCount === 0) {
        clearPendingAction(dep.bagId, dep.slotIndex)
        continue
      }
      depositedLinks.push(GetItemLink(dep.bagId, dep.slotIndex, LINK_STYLE_BRACKETS))
      TransferToGuildBank(dep.bagId, dep.slotIndex)
      clearPendingAction(dep.bagId, dep.slotIndex)
      return
    }
    cleanup()
    report()
  }

  EVENT_MANAGER.RegisterForEvent(ns, EVENT_GUILD_BANK_ITEM_ADDED, function (this: void): undefined {
    transferNext()
  })

  EVENT_MANAGER.RegisterForEvent(
    ns,
    EVENT_GUILD_BANK_TRANSFER_ERROR,
    function (this: void): undefined {
      depositedLinks.pop()
      cleanup()
      report()
    }
  )

  transferNext()
}

export function countActiveResearch(craftType: number): number {
  let active = 0
  const numLines = GetNumSmithingResearchLines(craftType)
  for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
    const [, , numTraits] = GetSmithingResearchLineInfo(craftType, lineIndex)
    for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
      const [, timeRemaining] = GetSmithingResearchLineTraitTimes(craftType, lineIndex, traitIndex)
      if (timeRemaining !== undefined) active++
    }
  }
  return active
}

export const RESEARCH_CRAFT_TYPES = new LuaSet<number>()
RESEARCH_CRAFT_TYPES.add(CRAFTING_TYPE_BLACKSMITHING)
RESEARCH_CRAFT_TYPES.add(CRAFTING_TYPE_CLOTHIER)
RESEARCH_CRAFT_TYPES.add(CRAFTING_TYPE_WOODWORKING)
RESEARCH_CRAFT_TYPES.add(CRAFTING_TYPE_JEWELRYCRAFTING)

export function collectBankDeconTargets(
  this: void,
  bankBagId: number,
  deconTargets: { bagId: number; slotIndex: number; link: string; ruleIndex: number }[],
  currentCharId: string,
  deconCheckType: number | undefined
): undefined {
  const characterPrefix = "character:"
  const bagSize = GetBagSize(bankBagId)
  for (let slot = 0; slot < bagSize; slot++) {
    const [stackCount] = GetSlotStackSize(bankBagId, slot)
    if (stackCount === 0) continue

    evaluateRules(bankBagId, slot)

    const action = getPendingAction(bankBagId, slot)
    if (action === "deconstruct") {
      const destination = getPendingDestination(bankBagId, slot)
      if (
        destination !== undefined &&
        destination.substring(0, characterPrefix.length) === characterPrefix
      ) {
        const charId = destination.substring(characterPrefix.length)
        if (charId !== currentCharId) {
          clearPendingAction(bankBagId, slot)
          continue
        }
      }
      const itemLink = GetItemLink(bankBagId, slot, LINK_STYLE_BRACKETS)
      const itemCraftType = GetItemLinkCraftingSkillType(itemLink)
      if (itemCraftType === CRAFTING_TYPE_INVALID) {
        clearPendingAction(bankBagId, slot)
        continue
      }
      if (deconCheckType !== undefined && itemCraftType !== deconCheckType) {
        clearPendingAction(bankBagId, slot)
        continue
      }
      deconTargets.push({
        bagId: bankBagId,
        slotIndex: slot,
        link: itemLink,
        ruleIndex: getPendingRuleIndex(bankBagId, slot) ?? 999999,
      })
    } else if (action !== undefined) {
      clearPendingAction(bankBagId, slot)
    }
  }
}

export function onOpenCraftingStation(): undefined {
  if (dispatchWritCrafting()) return

  const currentCharId = tostring(GetCurrentCharacterId())
  const characterPrefix = "character:"

  const stationType = GetCraftingInteractionType()
  const deconCheckType = stationType === CRAFTING_TYPE_INVALID ? undefined : stationType
  const deconTargets: { bagId: number; slotIndex: number; link: string; ruleIndex: number }[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (action !== "deconstruct") return

    if (
      destination !== undefined &&
      destination.substring(0, characterPrefix.length) === characterPrefix
    ) {
      const charId = destination.substring(characterPrefix.length)
      if (charId !== currentCharId) return
    }

    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) return
    if (!CanItemBeDeconstructed(bagId, slotIndex, deconCheckType)) return

    deconTargets.push({
      bagId,
      slotIndex,
      link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })

  collectBankDeconTargets(BAG_BANK, deconTargets, currentCharId, deconCheckType)
  if (IsESOPlusSubscriber()) {
    collectBankDeconTargets(BAG_SUBSCRIBER_BANK, deconTargets, currentCharId, deconCheckType)
  }

  table.sort(deconTargets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  const canResearch = RESEARCH_CRAFT_TYPES.has(stationType)
  const researchTargets: { bagId: number; slotIndex: number; link: string; ruleIndex: number }[] =
    []

  if (canResearch) {
    const maxSlots = GetMaxSimultaneousSmithingResearch(stationType)
    const slotsAvailable = maxSlots - countActiveResearch(stationType)

    if (slotsAvailable > 0) {
      forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
        if (action !== "research") return

        if (
          destination !== undefined &&
          destination.substring(0, characterPrefix.length) === characterPrefix
        ) {
          const charId = destination.substring(characterPrefix.length)
          if (charId !== currentCharId) return
        }

        const [stackCount] = GetSlotStackSize(bagId, slotIndex)
        if (stackCount === 0) return

        const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
        const itemCraftType = GetItemLinkCraftingSkillType(itemLink)
        if (itemCraftType !== stationType) return
        if (!CanItemLinkBeTraitResearched(itemLink)) return

        researchTargets.push({
          bagId,
          slotIndex,
          link: itemLink,
          ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
        })
      })

      table.sort(researchTargets, function (this: void, a, b): boolean {
        if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
        return a.slotIndex < b.slotIndex
      })
      const maxResearch = math.min(slotsAvailable, MAX_OPS)
      if (researchTargets.length > maxResearch) {
        researchTargets.splice(maxResearch)
      }
    }
  }

  const confirmDecon = deconTargets.length > 0 && shouldConfirmAction("deconstruct")
  const confirmResearch = researchTargets.length > 0 && shouldConfirmAction("research")

  function executeDeconstruct(): undefined {
    if (deconTargets.length === 0) return
    PrepareDeconstructMessage()
    const sentLinks: string[] = []

    for (const t of deconTargets) {
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0) continue
      const success = AddItemToDeconstructMessage(t.bagId, t.slotIndex, stackCount)
      if (!success) continue
      sentLinks.push(t.link)
      clearPendingAction(t.bagId, t.slotIndex)
    }

    if (sentLinks.length > 0) {
      SendDeconstructMessage()
      reportAction("Deconstructed", sentLinks)
    }
  }

  function executeResearch(): undefined {
    if (researchTargets.length === 0) return
    const researchedLinks: string[] = []

    for (const t of researchTargets) {
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0) continue
      ResearchSmithingTrait(t.bagId, t.slotIndex)
      researchedLinks.push(t.link)
      clearPendingAction(t.bagId, t.slotIndex)
    }

    if (researchedLinks.length > 0) {
      reportAction("Researching", researchedLinks)
    }
  }

  if (confirmDecon || confirmResearch) {
    const parts: string[] = []
    if (confirmDecon) {
      const links = deconTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Deconstruct ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }
    if (confirmResearch) {
      const links = researchTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Research ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }

    if (confirmDecon)
      reportPendingAction(
        "Deconstruct",
        deconTargets.map((t) => t.link)
      )
    if (confirmResearch)
      reportPendingAction(
        "Research",
        researchTargets.map((t) => t.link)
      )

    if (!confirmDecon) executeDeconstruct()
    if (!confirmResearch) executeResearch()

    showConfirmDialog(`${parts.join("\n")}`, function (this: void): undefined {
      if (confirmDecon) executeDeconstruct()
      if (confirmResearch) executeResearch()
    })
  } else {
    executeDeconstruct()
    executeResearch()
  }

  if (deconTargets.length === 0 && researchTargets.length === 0) {
    runRefinePass(stationType)
  }
}
