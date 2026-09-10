import "akasha/temper/eso-types/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-globals/eso-globals.type-declaration.d.ts"

import type {
  ScribingCatalogGrimoire,
  ScribingCatalogScript,
} from "akasha/temper/capture-shapes/scribing-catalog/scribing-catalog.module.code.ts"
import { registerCatalogDomain } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"

export const SCRIBING_SLOTS = [
  SCRIBING_SLOT_PRIMARY,
  SCRIBING_SLOT_SECONDARY,
  SCRIBING_SLOT_TERTIARY,
]

export function collectScribingCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const grimoires: Record<number, ScribingCatalogGrimoire> = {}
  const scripts: Record<number, ScribingCatalogScript> = {}

  const numAbilities = GetNumCraftedAbilities()
  for (let i = 1; i <= numAbilities; i++) {
    const craftedAbilityId = GetCraftedAbilityIdAtIndex(i)
    if (craftedAbilityId === 0) continue

    const name = zo_strformat("<<1>>", GetCraftedAbilityDisplayName(craftedAbilityId))
    grimoires[craftedAbilityId] = { name }

    for (const slot of SCRIBING_SLOTS) {
      const numScripts = GetNumScriptsInSlotForCraftedAbility(craftedAbilityId, slot)
      for (let j = 1; j <= numScripts; j++) {
        const scriptId = GetScriptIdAtSlotIndexForCraftedAbility(craftedAbilityId, slot, j)
        if (scriptId === 0) continue
        if (scripts[scriptId] !== undefined) continue

        scripts[scriptId] = {
          name: zo_strformat("<<1>>", GetCraftedAbilityScriptDisplayName(scriptId)),
          slot: GetCraftedAbilityScriptScribingSlot(scriptId),
        }
      }
    }
  }

  savedVars.scribingCatalog = { grimoires, scripts }
  onComplete()
}
registerCatalogDomain({ key: "scribingCatalog", collect: collectScribingCatalog })
