import "akasha/temper/eso-types/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import { getBaseAbilityId } from "akasha/temper/characters-capture-addon/character-capture-base-ability/character-capture-base-ability.module.code.ts"
import type { CharacterScribingData } from "akasha/temper/characters-capture-addon/character-capture-codec-types/character-capture-codec-types.module.code.ts"
import {
  getAffixScriptIndex,
  getFocusScriptIndex,
  getGrimoireIndex,
  getSignatureScriptIndex,
} from "akasha/temper/characters-capture-addon/character-capture-scribing-map/character-capture-scribing-map.module.code.ts"
import { getPlayerSkillIndex } from "akasha/temper/characters-capture-addon/character-capture-skill-map/character-capture-skill-map.module.code.ts"

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
