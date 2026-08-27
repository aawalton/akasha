import { affixScripts } from "@temper/game-characters-skills/scribing/affix-scripts-data"
import { focusScripts } from "@temper/game-characters-skills/scribing/focus-scripts-data"
import { grimoires } from "@temper/game-characters-skills/scribing/grimoires-data"
import { signatureScripts } from "@temper/game-characters-skills/scribing/signature-scripts-data"
import type { RecipeList } from "@temper/game-completion/completion-types"
import { recipeData } from "@temper/game-completion/generated/recipe-data.generated"
import type { CompletionCardChecker } from "./completion-card-checker-types"
import type { CharacterCardId } from "./completion-card-registry"
import {
  isTraitResearchCardComplete,
  isTraitResearchItemComplete,
} from "./completion-trait-research-progress"
import { traitResearchData } from "./generated/trait-research-data.generated"

const TOTAL_RECIPES = recipeData.reduce((sum, list) => sum + list.recipes.length, 0)

const SCRIPT_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "focusScripts", label: "Focus Scripts" },
  { value: "signatureScripts", label: "Signature Scripts" },
  { value: "affixScripts", label: "Affix Scripts" },
]

function staticScriptNames(scriptType: string): readonly string[] {
  if (scriptType === "focusScripts") return focusScripts.list.map((s) => s.name)
  if (scriptType === "signatureScripts")
    return signatureScripts.list.filter((s) => s.itemId !== 0).map((s) => s.name)
  if (scriptType === "affixScripts")
    return affixScripts.list.filter((s) => s.itemId !== 0).map((s) => s.name)
  return []
}

const SCRIBING_ALL_SCRIPT_NAMES: readonly string[] = [
  ...staticScriptNames("focusScripts"),
  ...staticScriptNames("signatureScripts"),
  ...staticScriptNames("affixScripts"),
]

function isExhaustiveRecipeList(value: unknown): value is RecipeList {
  return typeof value === "object" && value !== null && "name" in value
}

export const CHARACTER_CRAFTING_CHECKERS: Partial<Record<CharacterCardId, CompletionCardChecker>> =
  {
    recipes: {
      isCardComplete(completion) {
        if (!completion) return false
        const recipes = completion.recipes
        if (!recipes) return false
        let known = 0
        for (const rawValue of Object.values(recipes)) {
          const value: RecipeList | number[] = rawValue
          if (isExhaustiveRecipeList(value)) {
            for (const recipe of Object.values(value.recipes)) {
              if (recipe.known) known++
            }
          } else if (Array.isArray(value)) {
            known += value.length
          } else if (typeof value === "object" && value !== null) {
            for (const itemId of Object.values(value)) {
              if (typeof itemId === "number") known++
            }
          }
        }
        return known >= TOTAL_RECIPES
      },
      isItemComplete(completion, itemPath) {
        if (!completion || itemPath.length === 0) return false
        const recipes = completion.recipes
        if (!recipes) return false
        const [rawListId, rawRecipeId] = itemPath
        const listId = Number(rawListId)
        const list = recipes[listId]
        if (!list) return false
        if (isExhaustiveRecipeList(list)) {
          if (rawRecipeId !== undefined) {
            return list.recipes[Number(rawRecipeId)]?.known ?? false
          }
          return Object.values(list.recipes).every((r) => r.known)
        }
        if (rawRecipeId === undefined) return false
        const wantedItemId = Number(rawRecipeId)
        if (Array.isArray(list)) return list.includes(wantedItemId)
        if (typeof list === "object") {
          for (const itemId of Object.values(list)) {
            if (typeof itemId === "number" && itemId === wantedItemId) return true
          }
        }
        return false
      },
      getItemPickerLevels(_completions, currentPath) {
        if (currentPath.length === 0) {
          return {
            label: "Recipe List",
            options: recipeData.map((list) => ({ value: list.listIndex, label: list.name })),
          }
        }

        if (currentPath.length === 1) {
          const listIndex = Number(currentPath[0])
          const list = recipeData.find((l) => l.listIndex === listIndex)
          if (!list) return null
          return {
            label: "Recipe",
            options: list.recipes.map((r) => ({ value: r.itemId, label: r.name })),
          }
        }

        return null
      },
    },

    "trait-research": {
      isCardComplete: isTraitResearchCardComplete,
      isItemComplete: isTraitResearchItemComplete,
      getItemPickerLevels(_completions, currentPath) {
        if (currentPath.length === 0) {
          return {
            label: "Craft Type",
            options: traitResearchData.map((c) => ({ value: c.craftTypeId, label: c.name })),
          }
        }

        if (currentPath.length === 1) {
          const craftTypeId = Number(currentPath[0])
          const craft = traitResearchData.find((c) => c.craftTypeId === craftTypeId)
          if (!craft) return null
          return {
            label: "Item Line",
            options: craft.lines.map((l) => ({ value: l.lineIndex, label: l.name })),
          }
        }

        if (currentPath.length === 2) {
          const craftTypeId = Number(currentPath[0])
          const lineIndex = Number(currentPath[1])
          const craft = traitResearchData.find((c) => c.craftTypeId === craftTypeId)
          const line = craft?.lines.find((l) => l.lineIndex === lineIndex)
          if (!line) return null
          return {
            label: "Trait",
            options: line.traits.map((t) => ({ value: t.traitIndex, label: t.name })),
          }
        }

        return null
      },
    },

    "scribing-knowledge": {
      isCardComplete(completion) {
        if (!completion) return false
        const scribing = completion.scribing
        if (!scribing) return false
        const grimoires = Object.values(scribing.grimoires)
        const scripts = Object.values(scribing.scripts)
        if (grimoires.length === 0 && scripts.length === 0) return false
        return grimoires.every((g) => g.unlocked) && scripts.every((s) => s.unlocked)
      },
      isItemComplete(completion, itemPath) {
        if (!completion || itemPath.length === 0) return false
        const scribing = completion.scribing
        if (!scribing) return false
        const unlockedGrimoires = new Set<string>()
        for (const g of Object.values(scribing.grimoires)) {
          if (g.unlocked) unlockedGrimoires.add(g.name)
        }
        const unlockedScripts = new Set<string>()
        for (const s of Object.values(scribing.scripts)) {
          if (s.unlocked) unlockedScripts.add(s.name)
        }
        const category = String(itemPath[0])
        if (category === "grimoires") {
          const name = itemPath[1]
          if (name === undefined) return grimoires.list.every((g) => unlockedGrimoires.has(g.name))
          return unlockedGrimoires.has(String(name))
        }
        if (category === "scripts") {
          const scriptType = itemPath[1]
          const name = itemPath[2]
          if (name !== undefined) return unlockedScripts.has(String(name))
          if (scriptType !== undefined) {
            return staticScriptNames(String(scriptType)).every((n) => unlockedScripts.has(n))
          }
          return SCRIBING_ALL_SCRIPT_NAMES.every((n) => unlockedScripts.has(n))
        }
        return false
      },
      getItemPickerLevels(_completions, currentPath) {
        if (currentPath.length === 0) {
          return {
            label: "Category",
            options: [
              { value: "grimoires", label: "Grimoires" },
              { value: "scripts", label: "Scripts" },
            ],
          }
        }

        if (currentPath.length === 1) {
          const category = String(currentPath[0])
          if (category === "grimoires") {
            return {
              label: "Grimoire",
              options: grimoires.list.map((g) => ({ value: g.name, label: g.name })),
            }
          }
          if (category === "scripts") {
            return {
              label: "Script Type",
              options: SCRIPT_TYPE_OPTIONS.map(({ value, label }) => ({ value, label })),
            }
          }
          return null
        }

        if (currentPath.length === 2 && currentPath[0] === "scripts") {
          const scriptType = String(currentPath[1])
          const names = staticScriptNames(scriptType)
          if (names.length === 0) return null
          return {
            label: "Script",
            options: names.map((name) => ({ value: name, label: name })),
          }
        }

        return null
      },
    },
  }
