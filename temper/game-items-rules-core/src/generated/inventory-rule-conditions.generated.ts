/**
 * Inventory Rule Conditions (Generated)
 *
 * Condition evaluation for the inventory rule matcher (web platform).
 * Source: tools/lib/temper-addon-data/generators/rule-conditions.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { findCooldownGroup, isRftwContainer } from "@temper/game-items-core/cooldown-groups"
import { isCraftingRankBelowCap } from "@temper/game-items-core/crafting-passive-ranks"
import { inferDeconCraftingTypeFromItem } from "@temper/game-items-core/decon-crafting-type-inference"
import { signatureMatchesItem } from "@temper/game-items-core/equipment-signature-matcher"
import { esoTraitToTemperId } from "@temper/game-items-core/eso-trait-reverse-map"
import { SET_ESO_ID_TO_CATEGORY } from "@temper/game-items-core/generated/set-category-mappings.generated"
import { computeValue } from "@temper/game-items-core/inventory-display-value"
import {
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
  type InventoryItemData,
} from "@temper/game-items-core/inventory-types"
import { itemNameMatchesPattern } from "@temper/game-items-core/item-name-pattern"
import { STYLE_TO_CHAPTERS } from "@temper/game-items-core/motif-chapter-set"
import { parseMotifBookName } from "@temper/game-items-core/motif-name-parser"
import { getRecipeResultId } from "@temper/game-items-core/recipe-result-id-lookup"
import { getScriptItemIdByName } from "@temper/game-items-core/script-knowledge-lookup"
import { compareWithOp } from "../filters/comparison-op"
import { TOTAL_SCRIPT_COUNT } from "./scribing-total-script-count.generated"
import { isTraitResearchableByAnyCharacter } from "../inventory-rule-trait-research"
import type { CategoryRule } from "../inventory-rule-types"
import { resolvePotionRestoreMetricIds } from "../potion-restore-resolve"
import { resolveThreshold } from "../rule-constants"
import type { RuleMatcherContext } from "../rule-matcher-context-types"

// =============================================================================
// Private helpers
// =============================================================================

/**
 * Compute the combined level scale from requiredLevel and requiredCP.
 * CP items: 50 + floor(requiredCP / 10). Otherwise: requiredLevel.
 */
function computeCombinedLevel(requiredLevel: number, requiredCP: number): number {
  return requiredCP > 0 ? 50 + Math.floor(requiredCP / 10) : requiredLevel
}

/**
 * Parse the PotionData field (last colon-separated numeric field before |h)
 * from an ESO item link. Web-side regex parse; feeds the shared
 * `resolvePotionRestoreMetricIds` classifier for web/addon parity.
 */
function parsePotionDataFromLink(itemLink: string): number {
  const match = /:(\d+)\|h/.exec(itemLink)
  if (match === null) return 0
  const parsed = Number.parseInt(match[1] ?? "", 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

// =============================================================================
// Condition checking
// =============================================================================

/**
 * Check if an item passes the verifiable conditions of a category rule.
 * Conditions checkable from scan data (quality, level, value, stolen, bound)
 * are enforced fail-closed: if the field is absent, the item is excluded.
 * Computed conditions (isTargetEquip, traits, canUse, etc.) require a context
 * object — without it they pass through (same as before).
 * canResearch uses completion trait research data when available; passes through without it.
 * canInspire uses per-character crafting passive ranks when available; passes through without them.
 */
export function itemPassesConditions(
  item: InventoryItemData,
  conditions: CategoryRule["conditions"],
  context?: RuleMatcherContext
): boolean {
  if (!conditions) return true

  if (conditions.maxQuality !== undefined) {
    const op = conditions.qualityOp ?? "<="
    if (!compareWithOp(op, item.quality, conditions.maxQuality)) return false
  }

  if (conditions.maxLevel !== undefined) {
    const level = computeCombinedLevel(item.requiredLevel, item.requiredCP)
    const op = conditions.levelOp ?? "<="
    if (!compareWithOp(op, level, conditions.maxLevel)) return false
  }

  // Combined value filter (max of market, merchant, replacement)
  if (conditions.value !== undefined) {
    const ruleValue = resolveThreshold(conditions.value)
    const cv = computeValue(item.estimatedValue, item.merchantValue, item.replacementCost)
    if (cv === undefined) {
      if (!(ruleValue === 0 && (conditions.valueOp ?? "<=") === "<=")) return false
    } else {
      const op = conditions.valueOp ?? "<="
      if (!compareWithOp(op, cv, ruleValue)) return false
    }
  }

  // Market value (TTC estimated guild store price)
  if (conditions.marketValue !== undefined) {
    const ruleMarketValue = resolveThreshold(conditions.marketValue)
    const ev = item.estimatedValue
    if (ev === undefined) {
      if (!(ruleMarketValue === 0 && (conditions.marketValueOp ?? "<=") === "<="))
        return false
    } else {
      const op = conditions.marketValueOp ?? "<="
      if (!compareWithOp(op, ev, ruleMarketValue)) return false
    }
  } else if (conditions.maxValue !== undefined || conditions.minValue !== undefined) {
    // Legacy fallback
    const ev = item.estimatedValue
    if (ev === undefined) return false
    if (conditions.maxValue !== undefined && ev > conditions.maxValue) return false
    if (conditions.minValue !== undefined && ev < conditions.minValue) return false
  }

  // Merchant value (vendor sell price)
  if (conditions.merchantValue !== undefined) {
    const ruleMerchantValue = resolveThreshold(conditions.merchantValue)
    const sellPrice = item.merchantValue ?? 0
    const op = conditions.merchantValueOp ?? "<="
    if (!compareWithOp(op, sellPrice, ruleMerchantValue)) return false
  }

  // Replacement value (TTC market price for bound items)
  if (conditions.replacementValue !== undefined) {
    const ruleReplacementValue = resolveThreshold(conditions.replacementValue)
    const rc = item.replacementCost ?? 0
    const op = conditions.replacementValueOp ?? "<="
    if (!compareWithOp(op, rc, ruleReplacementValue)) return false
  }

  // Stolen status — absent data fails (unknown items excluded from counts)
  if (conditions.stolen !== undefined) {
    if (item.stolen === undefined) return false
    if (conditions.stolen === "stolen" && !item.stolen) return false
    if (conditions.stolen === "not-stolen" && item.stolen) return false
  }

  // Bound status — absent data fails (unknown items excluded from counts)
  if (conditions.bound !== undefined) {
    if (item.bound === undefined) return false
    if (conditions.bound === "bound" && !item.bound) return false
    if (conditions.bound === "not-bound" && item.bound) return false
  }

  // BoP-tradeable status — absent data fails (unknown items excluded from counts)
  if (conditions.bopTradeable !== undefined) {
    if (item.bopTradeable === undefined) return false
    if (conditions.bopTradeable === "bop-tradeable" && !item.bopTradeable) return false
    if (conditions.bopTradeable === "not-bop-tradeable" && item.bopTradeable) return false
  }

  // Quest-relevant status — absent data fails (unknown items excluded from counts)
  if (conditions.questRelevant !== undefined) {
    if (item.questRelevant === undefined) return false
    if (conditions.questRelevant === "quest-relevant" && !item.questRelevant) return false
    if (conditions.questRelevant === "not-quest-relevant" && item.questRelevant) return false
  }

  // Locked status — absent means not locked (addon only writes true)
  if (conditions.locked !== undefined) {
    const isLocked = item.locked === true
    if (conditions.locked === "locked" && !isLocked) return false
    if (conditions.locked === "not-locked" && isLocked) return false
  }

  // Reconstructed status — absent means not reconstructed (addon only writes true)
  if (conditions.reconstructed !== undefined) {
    const isReconstructed = item.reconstructed === true
    if (conditions.reconstructed === "reconstructed" && !isReconstructed) return false
    if (conditions.reconstructed === "not-reconstructed" && isReconstructed) return false
  }

  // Transmuted status — absent means not transmuted (addon only writes true)
  if (conditions.transmuted !== undefined) {
    const isTransmuted = item.transmuted === true
    if (conditions.transmuted === "transmuted" && !isTransmuted) return false
    if (conditions.transmuted === "not-transmuted" && isTransmuted) return false
  }

  // Stack fullness — full ⇔ stackCount >= maxStackSize; fail-closed when either
  // signal is absent (matches the addon/CLI check-stack-fullness checker).
  if (conditions.stackFullness !== undefined) {
    if (item.stackCount === undefined || item.maxStackSize === undefined) return false
    const isFull = item.stackCount >= item.maxStackSize
    if (conditions.stackFullness === "full" && !isFull) return false
    if (conditions.stackFullness === "partial" && isFull) return false
  }

  // Potion restoration effects — resolved from the static @temper/game-items-alchemy
  // catalog via the SAME shared resolver the addon/CLI builders use, so the
  // condition classifies potions identically on both surfaces (parity).
  // Fail-closed: a non-potion / unresolvable potion (undefined) never matches.
  // "all" → potion grants every listed effect; "any" (default) → at least one.
  if (conditions.potionEffects !== undefined && conditions.potionEffects.length > 0) {
    const granted = resolvePotionRestoreMetricIds(
      item.itemId,
      parsePotionDataFromLink(item.itemLink)
    )
    if (granted === undefined) return false
    const grantedSet = new Set(granted)
    const required = conditions.potionEffects
    const matches =
      (conditions.potionEffectsMode ?? "any") === "all"
        ? required.every((effect) => grantedSet.has(effect))
        : required.some((effect) => grantedSet.has(effect))
    if (!matches) return false
  }

  // Can sell to merchant — item must have a positive merchant value
  if (conditions.canSell === "can-sell") {
    if ((item.merchantValue ?? 0) <= 0) return false
  }

  // Crafted status — absent means not crafted (addon only sets true when crafted)
  if (conditions.crafted !== undefined) {
    const isCrafted = item.crafted === true
    if (conditions.crafted === "crafted" && !isCrafted) return false
    if (conditions.crafted === "not-crafted" && isCrafted) return false
  }

  // Known/canUnlock — recipes, motifs, and scripts check per-character completion data, others use item.known
  if (conditions.known !== undefined || conditions.canUnlock !== undefined) {
    const isRecipe = item.itemType === ESO_ITEMTYPE_RECIPE
    const isMotifChapter =
      item.specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER ||
      item.specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK
    const isScribingScript = item.itemType === ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT

    if (isRecipe && context?.knownRecipesByCharacter && context.knownRecipesByCharacter.size > 0) {
      // Recipe: check across all characters' knowledge
      const resultId = getRecipeResultId(item.itemName) ?? item.itemId
      const allKnow = [...context.knownRecipesByCharacter.values()].every((set) =>
        set.has(resultId)
      )

      if (conditions.known !== undefined) {
        if (conditions.known === "known" && !allKnow) return false
        if (conditions.known === "not-known" && allKnow) return false
      }
      if (conditions.canUnlock !== undefined) {
        const canUnlock = !allKnow
        if (conditions.canUnlock === "can-unlock" && !canUnlock) return false
        if (conditions.canUnlock === "cannot-unlock" && canUnlock) return false
      }
    } else if (
      isMotifChapter &&
      context?.knownMotifsByCharacter &&
      context.knownMotifsByCharacter.size > 0
    ) {
      // Motif chapter: check across all characters' lore library knowledge.
      // Parse the cleaned item name to the (styleId, chapterId) axis;
      // chapterId === null denotes a master book (char knows iff every
      // chapter in the style is known).
      const parsed = parseMotifBookName(item.itemName)
      if (parsed) {
        const allKnow = [...context.knownMotifsByCharacter.values()].every((charMap) => {
          const knownChapters = charMap.get(parsed.styleId)
          if (knownChapters === undefined) return false
          if (parsed.chapterId === null) {
            const styleChapters = STYLE_TO_CHAPTERS[parsed.styleId]
            if (styleChapters === undefined || styleChapters.length === 0) return false
            return knownChapters.size === styleChapters.length
          }
          return knownChapters.has(parsed.chapterId)
        })

        if (conditions.known !== undefined) {
          if (conditions.known === "known" && !allKnow) return false
          if (conditions.known === "not-known" && allKnow) return false
        }
        if (conditions.canUnlock !== undefined) {
          const canUnlock = !allKnow
          if (conditions.canUnlock === "can-unlock" && !canUnlock) return false
          if (conditions.canUnlock === "cannot-unlock" && canUnlock) return false
        }
      }
    } else if (
      isScribingScript &&
      context?.knownScriptsByCharacter &&
      context.knownScriptsByCharacter.size > 0
    ) {
      // Scribing script: check across all characters' scribing knowledge
      // Resolve to base/unbound item ID via name lookup (inventory stores bound IDs)
      const scriptItemId =
        getScriptItemIdByName(
          item.itemName.includes(": ")
            ? item.itemName.slice(item.itemName.indexOf(": ") + 2)
            : item.itemName
        ) ?? item.itemId
      const allKnow = [...context.knownScriptsByCharacter.values()].every((set) =>
        set.has(scriptItemId)
      )

      if (conditions.known !== undefined) {
        if (conditions.known === "known" && !allKnow) return false
        if (conditions.known === "not-known" && allKnow) return false
      }
      if (conditions.canUnlock !== undefined) {
        const canUnlock = !allKnow
        if (conditions.canUnlock === "can-unlock" && !canUnlock) return false
        if (conditions.canUnlock === "cannot-unlock" && canUnlock) return false
      }
    } else if (item.known !== undefined) {
      // Collectibles / fallback: use scan-time item.known (account-wide)
      if (conditions.known !== undefined) {
        if (conditions.known === "known" && !item.known) return false
        if (conditions.known === "not-known" && item.known) return false
      }
      if (conditions.canUnlock !== undefined) {
        const canUnlock = !item.known
        if (conditions.canUnlock === "can-unlock" && !canUnlock) return false
        if (conditions.canUnlock === "cannot-unlock" && canUnlock) return false
      }
    }
  }

  // Item name — mini query language (terms AND'd, negation, quoted phrases)
  if (conditions.itemNamePattern) {
    if (!itemNameMatchesPattern(item.itemName, conditions.itemNamePattern)) return false
  }

  // =========================================================================
  // Computed conditions — require context, pass through without it
  // =========================================================================

  // canCompanionEquip — pure trait range check, no context needed
  if (conditions.canCompanionEquip !== undefined) {
    const isCompanionEquippable = item.traitType >= 34 && item.traitType <= 60
    if (conditions.canCompanionEquip === "can-companion-equip" && !isCompanionEquippable)
      return false
    if (conditions.canCompanionEquip === "cannot-companion-equip" && isCompanionEquippable)
      return false
  }

  // traits — map ESO trait number to Temper ID and check inclusion
  if (conditions.traits !== undefined && conditions.traits.length > 0) {
    const temperId = esoTraitToTemperId(item.traitType, item.equipType)
    if (!temperId) return false
    if (!conditions.traits.includes(temperId)) return false
  }

  // setSourceTypes — match item's setId against allowed source categories.
  // Items without a set fall through (addon's behavior: hasSet=false bypasses the check).
  // setId is captured at scan; absent on pre-existing data, in which case the check passes.
  if (conditions.setSourceTypes !== undefined && conditions.setSourceTypes.length > 0) {
    if (item.setId !== undefined) {
      const category = SET_ESO_ID_TO_CATEGORY[item.setId] ?? "no-type"
      if (!conditions.setSourceTypes.includes(category)) return false
    }
  }

  // canResearch — check completion trait research data; passes through without context/data
  if (conditions.canResearch !== undefined && context?.researchedTraitsByCharacter?.size) {
    const canResearch = isTraitResearchableByAnyCharacter(item, context.researchedTraitsByCharacter)
    if (conditions.canResearch === "can-research" && !canResearch) return false
    if (conditions.canResearch === "cannot-research" && canResearch) return false
  }

  // canOpen — item is a container that isn't blocked by an active cooldown group.
  // Mirrors the addon's isItemOpenable: not-a-container → fail; cooldown-group
  // active → fail. Per-character game cooldowns aren't part of the snapshot
  // (they tick down without an export trigger), so the matcher only enforces
  // the account-wide group-cooldown signal — same delayed-mirror contract as
  // the rest of the addon-only conditions. Without isContainer captured (older
  // snapshots), the check passes through.
  if (conditions.canOpen !== undefined) {
    if (item.isContainer === undefined) {
      // pass through — pre-capture data
    } else if (!item.isContainer) {
      return false
    } else if (context?.openCooldowns) {
      const group = findCooldownGroup({ itemName: item.itemName })
      if (group !== undefined) {
        const expiresAt = context.openCooldowns.get(group.key)
        if (expiresAt !== undefined && expiresAt > Date.now()) return false
      }
    }
  }

  // canGiveMaxRewards — container that, opened now, would yield the maximum
  // rewards. Mirrors the addon's evaluateScriptKnowledgeForOpen + canOpen-rule
  // combination over the snapshot:
  //   - Must be a container.
  //   - On cooldown:
  //       RFTW → false (transmute stones still matter; the addon treats RFTW
  //         as cap-respecting regardless of script knowledge)
  //       any-char-knows-all-scripts → true (one character can open without
  //         losing scripts; cooldown is wasted on them anyway)
  //       otherwise → false
  //   - Off cooldown:
  //       cooldown-group container (non-RFTW) AND any-char-knows-all AND
  //         not all-chars-know-all → false (save the guaranteed drop for the
  //         character that still needs scripts)
  //       otherwise → true
  // Pre-capture isContainer or no openCooldowns context → pass through.
  if (conditions.canGiveMaxRewards !== undefined) {
    if (item.isContainer === undefined) {
      // pass through — pre-capture data
    } else if (!item.isContainer) {
      return false
    } else if (context?.openCooldowns) {
      const group = findCooldownGroup({ itemName: item.itemName })
      const expiresAt = group !== undefined ? context.openCooldowns.get(group.key) : undefined
      const cooldownActive = expiresAt !== undefined && expiresAt > Date.now()
      const rftw = isRftwContainer({ itemName: item.itemName })
      const known = context.knownScriptsByCharacter
      let anyKnowsAll = false
      let allKnowAll = known !== undefined && known.size > 0
      if (known !== undefined) {
        for (const charScripts of known.values()) {
          if (charScripts.size >= TOTAL_SCRIPT_COUNT) {
            anyKnowsAll = true
          } else {
            allKnowAll = false
          }
        }
      }
      if (cooldownActive) {
        if (rftw) return false
        if (!anyKnowsAll) return false
      } else if (group !== undefined && !rftw && anyKnowsAll && !allKnowAll) {
        return false
      }
    }
  }

  // canInspire — at least one character's deconstruction passive is below cap
  // for the item's inferred craft type. "can-inspire" passes when any char would
  // still benefit from deconning the item; "cannot-inspire" passes when every
  // char is already capped. Scope = "any-character" by construction on web,
  // matching the routing-aware semantic of the addon under "character:by-priority"
  // destinations. Pass through without per-char crafting levels (no data yet).
  if (conditions.canInspire !== undefined && context?.craftingLevels?.size) {
    const craftingType = inferDeconCraftingTypeFromItem(item)
    if (craftingType === 0) return false
    let anyUseful = false
    for (const levels of context.craftingLevels.values()) {
      const rank = levels.get(craftingType)
      if (rank !== undefined && isCraftingRankBelowCap(rank, craftingType)) {
        anyUseful = true
        break
      }
    }
    if (conditions.canInspire === "can-inspire" && !anyUseful) return false
    if (conditions.canInspire === "cannot-inspire" && anyUseful) return false
  }

  if (context) {
    // isTargetEquip — match against wanted equipment signatures
    if (conditions.isTargetEquip !== undefined) {
      const matches = context.wantedEquipment.some((sig) => signatureMatchesItem(sig, item))
      if (conditions.isTargetEquip === "is-target-equip" && !matches) return false
      if (conditions.isTargetEquip === "not-target-equip" && matches) return false
    }

    // isTargetCompanionEquip — match against wanted companion equipment signatures
    if (conditions.isTargetCompanionEquip !== undefined) {
      const matches = context.wantedCompanionEquipment.some((sig) =>
        signatureMatchesItem(sig, item)
      )
      if (conditions.isTargetCompanionEquip === "is-target-companion-equip" && !matches)
        return false
      if (conditions.isTargetCompanionEquip === "not-target-companion-equip" && matches)
        return false
    }

    // allStocked — all characters wanting this consumable have enough stock
    if (conditions.allStocked !== undefined) {
      const threshold = conditions.stockThreshold ?? 200
      const wantingChars = context.wantedConsumables.get(item.itemId)
      let allStocked: boolean
      if (!wantingChars || wantingChars.length === 0) {
        // No characters want this — treat as stocked (vacuously true)
        allStocked = true
      } else {
        const charStock = context.consumableStock.get(item.itemId)
        allStocked = wantingChars.every((charId) => (charStock?.get(charId) ?? 0) >= threshold)
      }
      if (conditions.allStocked === "all-stocked" && !allStocked) return false
      if (conditions.allStocked === "not-all-stocked" && allStocked) return false
    }

    // targetQuantity — bank already has enough of this item, no need to stock more
    if (conditions.targetQuantity !== undefined) {
      const bankCount = context.bankStock.get(item.itemId) ?? 0
      if (bankCount >= conditions.targetQuantity) return false
    }
  }

  return true
}
