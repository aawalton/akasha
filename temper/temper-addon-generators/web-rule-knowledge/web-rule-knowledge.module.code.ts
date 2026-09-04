export const WEB_KNOWLEDGE_CONDITIONS = `  // Known/canUnlock — recipes, motifs, and scripts check per-character completion data, others use item.known
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
  }`
