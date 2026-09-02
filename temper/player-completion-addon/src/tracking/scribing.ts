import type { GrimoireEntry, ScribingProgress, ScriptEntry } from "@akasha/temper-completion/completion-progress"
import { getSavedVariables } from "../saved-variables"
import { mergeScribing } from "./scribing-merge"

export const SCRIBING_SLOTS = [
  SCRIBING_SLOT_PRIMARY,
  SCRIBING_SLOT_SECONDARY,
  SCRIBING_SLOT_TERTIARY,
]

export function scanScribing(): ScribingProgress {
  const grimoires: Record<number, GrimoireEntry> = {}
  const scripts: Record<number, ScriptEntry> = {}

  const numAbilities = GetNumCraftedAbilities()
  for (let i = 1; i <= numAbilities; i++) {
    const craftedAbilityId = GetCraftedAbilityIdAtIndex(i)
    if (craftedAbilityId === 0) continue

    const name = zo_strformat("<<1>>", GetCraftedAbilityDisplayName(craftedAbilityId))
    grimoires[craftedAbilityId] = {
      name,
      unlocked: IsCraftedAbilityUnlocked(craftedAbilityId),
    }

    for (const slot of SCRIBING_SLOTS) {
      const numScripts = GetNumScriptsInSlotForCraftedAbility(craftedAbilityId, slot)
      for (let j = 1; j <= numScripts; j++) {
        const scriptId = GetScriptIdAtSlotIndexForCraftedAbility(craftedAbilityId, slot, j)
        if (scriptId === 0) continue
        if (scripts[scriptId] !== undefined) continue

        scripts[scriptId] = {
          name: zo_strformat("<<1>>", GetCraftedAbilityScriptDisplayName(scriptId)),
          slot: GetCraftedAbilityScriptScribingSlot(scriptId),
          unlocked: IsCraftedAbilityScriptUnlocked(scriptId),
        }
      }
    }
  }

  return { grimoires, scripts }
}

export function collectScribing(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.scribing = mergeScribing(charEntry.scribing, scanScribing())
}

export function updateGrimoire(craftedAbilityId: number, isUnlocked: boolean): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  const scribing = charEntry.scribing
  if (scribing === undefined) return

  const existing = scribing.grimoires[craftedAbilityId]
  if (existing !== undefined) {
    existing.unlocked = isUnlocked
  } else {
    scribing.grimoires[craftedAbilityId] = {
      name: zo_strformat("<<1>>", GetCraftedAbilityDisplayName(craftedAbilityId)),
      unlocked: isUnlocked,
    }
  }
}

export function updateScript(scriptId: number, isUnlocked: boolean): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  const scribing = charEntry.scribing
  if (scribing === undefined) return

  const existing = scribing.scripts[scriptId]
  if (existing !== undefined) {
    existing.unlocked = isUnlocked
  } else {
    scribing.scripts[scriptId] = {
      name: zo_strformat("<<1>>", GetCraftedAbilityScriptDisplayName(scriptId)),
      slot: GetCraftedAbilityScriptScribingSlot(scriptId),
      unlocked: isUnlocked,
    }
  }
}
