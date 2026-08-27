import { getPlayerSkillIndex } from "../generated/player-skill-mappings.generated"
import {
  getAffixScriptIndex,
  getFocusScriptIndex,
  getGrimoireIndex,
  getSignatureScriptIndex,
} from "../generated/scribing-mappings.generated"
import { getBaseAbilityId } from "./build-state"
import type { CharacterScribingData } from "./character-codec-types"

export function captureScribingData(): CharacterScribingData[] {
  const result: CharacterScribingData[] = []
  const numCrafted = GetNumCraftedAbilities()

  for (let i = 1; i <= numCrafted; i++) {
    const craftedAbilityId = GetCraftedAbilityIdAtIndex(i)
    if (!IsCraftedAbilityScribed(craftedAbilityId)) continue

    const abilityId = GetAbilityIdForCraftedAbilityId(craftedAbilityId)
    const baseAbility = getBaseAbilityId(abilityId)
    const scribedSkillIndex = getPlayerSkillIndex(baseAbility)

    const grimoireName = GetCraftedAbilityDisplayName(craftedAbilityId)
    const grimoireIndex = getGrimoireIndex(grimoireName)

    const [focusScriptId, signatureScriptId, affixScriptId] =
      GetCraftedAbilityActiveScriptIds(craftedAbilityId)

    result.push({
      scribedSkillIndex,
      grimoireIndex,
      focusIndex:
        focusScriptId > 0
          ? getFocusScriptIndex(GetCraftedAbilityScriptDisplayName(focusScriptId))
          : 0,
      signatureIndex:
        signatureScriptId > 0
          ? getSignatureScriptIndex(GetCraftedAbilityScriptDisplayName(signatureScriptId))
          : 0,
      affixIndex:
        affixScriptId > 0
          ? getAffixScriptIndex(GetCraftedAbilityScriptDisplayName(affixScriptId))
          : 0,
    })
  }

  return result
}
