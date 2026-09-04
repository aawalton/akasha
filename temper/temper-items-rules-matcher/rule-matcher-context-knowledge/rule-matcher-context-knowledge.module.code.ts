import { potions } from "@akasha/temper-alchemy/potion-source"
import { decodeBuild } from "@akasha/temper-build-codec/build-codec"
import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import { resolveCharacterToggles } from "@akasha/temper-build-support/automation-settings"
import { foodOrDrink } from "@akasha/temper-character-sources/food-or-drink-source"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { getScriptItemIdByName } from "@akasha/temper-items-core/script-knowledge-lookup"
import type {
  CharacterBuildInput,
  CompletionCharacterInput,
} from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

function getCompletionField(completion: unknown, field: string): unknown {
  if (!isObjectRecord(completion)) return undefined
  return completion[field]
}

function isExhaustiveRecipeList(
  value: unknown
): value is { name: string; recipes: Record<string, { known: boolean }> } {
  return typeof value === "object" && value !== null && "name" in value
}

export function compileKnownRecipes(
  characters: readonly CompletionCharacterInput[]
): Map<string, Set<number>> {
  const result = new Map<string, Set<number>>()
  for (const char of characters) {
    const recipes = getCompletionField(char.completion, "recipes")
    if (!isObjectRecord(recipes)) continue
    const known = new Set<number>()
    for (const listValue of Object.values(recipes)) {
      if (isExhaustiveRecipeList(listValue)) {
        for (const [itemIdStr, recipe] of Object.entries(listValue.recipes)) {
          if (recipe.known) known.add(Number(itemIdStr))
        }
      } else if (Array.isArray(listValue)) {
        for (const itemId of listValue) known.add(itemId)
      } else if (isObjectRecord(listValue)) {
        for (const itemId of Object.values(listValue)) {
          if (typeof itemId === "number") known.add(itemId)
        }
      }
    }
    result.set(char.esoCharacterId, known)
  }
  return result
}

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

export function compileKnownMotifs(
  characters: readonly CompletionCharacterInput[]
): Map<string, Map<number, Set<number>>> {
  const result = new Map<string, Map<number, Set<number>>>()
  for (const char of characters) {
    const loreLibrary = getCompletionField(char.completion, "loreLibrary")
    if (!isObjectRecord(loreLibrary)) continue
    const motifCategory = loreLibrary[CRAFTING_MOTIFS_CATEGORY_INDEX]
    if (!isObjectRecord(motifCategory)) continue
    const charMap = new Map<number, Set<number>>()
    for (const [collIdxStr, knownBooks] of Object.entries(motifCategory)) {
      const collIdx = Number(collIdxStr)
      const bookSet = new Set<number>()
      if (Array.isArray(knownBooks)) {
        for (const bookIdx of knownBooks) bookSet.add(bookIdx)
      } else if (isObjectRecord(knownBooks)) {
        for (const v of Object.values(knownBooks)) {
          if (typeof v === "number") bookSet.add(v)
        }
      }
      if (bookSet.size > 0) charMap.set(collIdx, bookSet)
    }
    result.set(char.esoCharacterId, charMap)
  }
  return result
}

export function compileKnownMotifsByStyleId(
  characters: readonly CompletionCharacterInput[]
): Map<string, Map<number, Set<number>>> {
  const result = new Map<string, Map<number, Set<number>>>()
  for (const char of characters) {
    const charMap = new Map<number, Set<number>>()
    const motifKnowledge = getCompletionField(char.completion, "motifKnowledge")
    if (isObjectRecord(motifKnowledge)) {
      for (const [styleIdStr, chapters] of Object.entries(motifKnowledge)) {
        const styleId = Number(styleIdStr)
        const chapterSet = new Set<number>()
        if (Array.isArray(chapters)) {
          for (const chapterId of chapters) {
            if (typeof chapterId === "number") chapterSet.add(chapterId)
          }
        } else if (isObjectRecord(chapters)) {
          for (const v of Object.values(chapters)) {
            if (typeof v === "number") chapterSet.add(v)
          }
        }
        if (chapterSet.size > 0) charMap.set(styleId, chapterSet)
      }
    }
    result.set(char.esoCharacterId, charMap)
  }
  return result
}

export function compileResearchableTraits(
  characters: readonly CompletionCharacterInput[]
): Map<string, Map<number, Map<string, boolean>>> {
  const result = new Map<string, Map<number, Map<string, boolean>>>()

  for (const char of characters) {
    const traitResearch = getCompletionField(char.completion, "traitResearch")
    if (!isObjectRecord(traitResearch)) continue

    const charMap = new Map<number, Map<string, boolean>>()

    for (const [craftTypeStr, craftType] of Object.entries(traitResearch)) {
      if (!isObjectRecord(craftType)) continue
      const craftingTypeNum = Number(craftTypeStr)
      const traitKnown = new Map<string, boolean>()

      const lines = craftType.lines
      if (!isObjectRecord(lines)) continue

      for (const line of Object.values(lines)) {
        if (!isObjectRecord(line)) continue
        const traits = line.traits
        if (!isObjectRecord(traits)) continue

        for (const trait of Object.values(traits)) {
          if (!isObjectRecord(trait)) continue
          const traitName = trait.name
          if (typeof traitName !== "string" || traitName === "") continue
          const key = traitName.toLowerCase()
          const isKnown = typeof trait.known === "boolean" ? trait.known : false
          if (!isKnown) {
            traitKnown.set(key, false)
          } else if (!traitKnown.has(key)) {
            traitKnown.set(key, true)
          }
        }
      }

      if (traitKnown.size > 0) charMap.set(craftingTypeNum, traitKnown)
    }

    if (charMap.size > 0) result.set(char.esoCharacterId, charMap)
  }

  return result
}

export function compileKnownScripts(
  characters: readonly CompletionCharacterInput[]
): Map<string, Set<number>> {
  const result = new Map<string, Set<number>>()
  for (const char of characters) {
    const scribing = getCompletionField(char.completion, "scribing")
    if (!isObjectRecord(scribing)) continue
    const scripts = scribing.scripts
    if (!isObjectRecord(scripts)) continue
    const known = new Set<number>()
    for (const entry of Object.values(scripts)) {
      if (!isObjectRecord(entry)) continue
      if (entry.unlocked !== true) continue
      const name = entry.name
      if (typeof name !== "string" || name === "") continue
      const itemId = getScriptItemIdByName(name)
      if (itemId !== undefined) known.add(itemId)
    }
    result.set(char.esoCharacterId, known)
  }
  return result
}

export function compileWantedConsumables(
  characters: readonly CompletionCharacterInput[],
  buildById: Map<string, CharacterBuildInput>,
  automationSettings?: AutomationSettings
): Map<number, string[]> {
  const result = new Map<number, string[]>()

  for (const char of characters) {
    if (char.targetBuildId == null) continue
    const build = buildById.get(char.targetBuildId)
    if (build?.buildHash == null) continue

    const esoCharId = char.esoCharacterId
    if (esoCharId === "") continue

    const decoded = decodeBuild(toBuildHash(build.buildHash))
    if (!decoded) continue

    const charToggles = resolveCharacterToggles(
      automationSettings?.characters[esoCharId],
      automationSettings?.global?.characters
    )

    if (charToggles.food) {
      const foodOrDrinkId = decoded.consumables.foodOrDrink
      if (foodOrDrinkId && foodOrDrink.has(foodOrDrinkId)) {
        const template = foodOrDrink.data[foodOrDrinkId]
        if (template.itemId > 0) {
          let charIds = result.get(template.itemId)
          if (!charIds) {
            charIds = []
            result.set(template.itemId, charIds)
          }
          if (!charIds.includes(esoCharId)) charIds.push(esoCharId)
        }
      }
    }

    if (charToggles.potions) {
      const potionId = decoded.consumables.potion
      if (potionId && potions.has(potionId)) {
        const template = potions.data[potionId]
        if (template.itemId > 0) {
          let charIds = result.get(template.itemId)
          if (!charIds) {
            charIds = []
            result.set(template.itemId, charIds)
          }
          if (!charIds.includes(esoCharId)) charIds.push(esoCharId)
        }
      }

      const potion2Id = decoded.consumables.potion2
      if (potion2Id && potions.has(potion2Id)) {
        const template = potions.data[potion2Id]
        if (template.itemId > 0) {
          let charIds = result.get(template.itemId)
          if (!charIds) {
            charIds = []
            result.set(template.itemId, charIds)
          }
          if (!charIds.includes(esoCharId)) charIds.push(esoCharId)
        }
      }
    }
  }

  return result
}

export function compileBankStock(inventory: InventoryDatabase | null): Map<number, number> {
  const result = new Map<number, number>()
  const bankLocation = inventory?.locations["Bank"]
  if (!bankLocation) return result

  for (const slots of Object.values(bankLocation.bags)) {
    for (const item of Object.values(slots)) {
      result.set(item.itemId, (result.get(item.itemId) ?? 0) + item.stackCount)
    }
  }

  return result
}

export function compileConsumableStock(
  inventory: InventoryDatabase | null,
  wantedConsumables: Map<number, string[]>
): Map<number, Map<string, number>> {
  const result = new Map<number, Map<string, number>>()
  if (!inventory?.locations || wantedConsumables.size === 0) return result

  for (const [locationKey, location] of Object.entries(inventory.locations)) {
    if (!/^\d+$/.test(locationKey)) continue

    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (!wantedConsumables.has(item.itemId)) continue

        let charStock = result.get(item.itemId)
        if (!charStock) {
          charStock = new Map()
          result.set(item.itemId, charStock)
        }
        charStock.set(locationKey, (charStock.get(locationKey) ?? 0) + item.stackCount)
      }
    }
  }

  return result
}
