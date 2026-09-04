import {
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
  type InventoryItemData,
} from "@akasha/temper-items-core/inventory-types"
import { STYLE_TO_CHAPTERS } from "@akasha/temper-items-core/motif-chapter-set"
import { parseMotifBookName } from "@akasha/temper-items-core/motif-name-parser"
import { getRecipeResultId } from "@akasha/temper-items-core/recipe-result-id-lookup"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { RuleMatcherContext } from "../rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import {
  type CharacterId,
  characterId,
  type ItemKey,
  type UseDestinationContext,
} from "../use-destination-types/use-destination-types.module.code.ts"

export function inventoryItemUseKey(
  item: InventoryItemData,
  action: string,
  destination: string | undefined,
  context: RuleMatcherContext
): ItemKey | undefined {
  if (action !== "use") return undefined
  if (destination === undefined || !destination.endsWith("by-priority")) return undefined

  if (item.itemType === ESO_ITEMTYPE_RECIPE && context.knownRecipesByCharacter !== undefined) {
    const resultItemId = getRecipeResultId(item.itemName) ?? item.itemId
    return { kind: "recipe", resultItemId }
  }

  if (
    (item.specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER ||
      item.specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK) &&
    ((context.knownMotifsByCharacter !== undefined && context.knownMotifsByCharacter.size > 0) ||
      (context.knownMotifsByStyleIdByCharacter !== undefined &&
        context.knownMotifsByStyleIdByCharacter.size > 0))
  ) {
    const parsed = parseMotifBookName(item.itemName)
    if (parsed !== undefined) {
      return { kind: "motif", styleId: parsed.styleId, chapterId: parsed.chapterId }
    }
    return undefined
  }

  if (
    item.itemType === ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT &&
    context.knownScriptsByCharacter !== undefined &&
    context.knownScriptsByCharacter.size > 0
  ) {
    return { kind: "script", scriptId: item.itemId }
  }

  return undefined
}

export function buildUseDestinationContext(context: RuleMatcherContext): UseDestinationContext {
  const characterPriority: ReadonlyArray<CharacterId> = context.characterPriority.map((id) =>
    characterId(id)
  )
  return {
    characterPriority,
    knowsItem: (charId, itemKey) => {
      switch (itemKey.kind) {
        case "recipe": {
          const known = context.knownRecipesByCharacter.get(charId)
          if (known === undefined) return true
          return known.has(itemKey.resultItemId)
        }
        case "motif": {
          const chaptersByStyleMap = context.knownMotifsByStyleIdByCharacter.get(charId)
          const loreMap = context.knownMotifsByCharacter.get(charId)
          if (chaptersByStyleMap === undefined && loreMap === undefined) {
            return true
          }
          const knownChapters =
            chaptersByStyleMap?.get(itemKey.styleId) ?? loreMap?.get(itemKey.styleId)
          if (knownChapters === undefined) return false
          if (itemKey.chapterId === null) {
            const styleChapters = STYLE_TO_CHAPTERS[itemKey.styleId]
            if (styleChapters === undefined || styleChapters.length === 0) {
              return false
            }
            return knownChapters.size === styleChapters.length
          }
          return knownChapters.has(itemKey.chapterId)
        }
        case "script": {
          const known = context.knownScriptsByCharacter.get(charId)
          if (known === undefined) return true
          return known.has(itemKey.scriptId)
        }
        case "consumable":
          return false
        default:
          return assertNever(itemKey)
      }
    },
    knownChapterCountForStyle: (charId, styleId) => {
      const chapters = lookupKnownMotifChapters(context, charId, styleId)
      return chapters?.size ?? 0
    },
  }
}

function lookupKnownMotifChapters(
  context: RuleMatcherContext,
  charId: string,
  styleId: number
): ReadonlySet<number> | undefined {
  const byStyleId = context.knownMotifsByStyleIdByCharacter.get(charId)?.get(styleId)
  if (byStyleId !== undefined) return byStyleId
  return context.knownMotifsByCharacter.get(charId)?.get(styleId)
}
