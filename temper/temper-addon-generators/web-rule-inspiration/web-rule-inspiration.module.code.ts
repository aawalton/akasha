export const WEB_INSPIRATION_CONDITION = `  // canInspire — at least one character's deconstruction passive is below cap
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
  }`
