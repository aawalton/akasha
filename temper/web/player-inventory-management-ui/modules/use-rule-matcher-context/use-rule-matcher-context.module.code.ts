import type { InventoryDatabase } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type {
  CharacterBuildInput,
  RuleMatcherContext,
} from "akasha/temper/items/rules/core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import {
  buildDerivedContext,
  mergeInventoryContext,
} from "akasha/temper/items/rules/matcher/modules/rule-matcher-context/rule-matcher-context.module.code.ts"
import type { AutomationSettings } from "akasha/temper/player/character/build/build-support/modules/automation-settings/automation-settings.module.code.ts"
import { heldSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { heldSkillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { useCharacterList } from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { useCompanionList } from "akasha/temper/web/companions-ui/modules/use-companions/use-companions.module.code.ts"
import { useHeldCompanionCatalog } from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import { useHeldLoreLibrary } from "akasha/temper/web/modules/use-lore-library/use-lore-library.module.code.tsx"
import {
  useCompletionCharacters,
  useCompletionCompanions,
} from "akasha/temper/web/player-completion-ui/modules/use-completion/use-completion.module.code.ts"
import { useMemo } from "react"

export function useRuleMatcherContext(
  inventory: InventoryDatabase | null,
  automationSettings?: AutomationSettings
): RuleMatcherContext | null {
  const { characters: completionCharacters } = useCompletionCharacters()
  const { builds: characterBuilds } = useCharacterList()
  const { companions: completionCompanions } = useCompletionCompanions()
  const { builds: companionBuilds } = useCompanionList()

  const skillCatalogRead = heldSkillCatalog()
  const setCatalogRead = heldSetCatalog()
  const companionCatalogRead = useHeldCompanionCatalog()
  const loreLibraryRead = useHeldLoreLibrary()

  const hasCharactersOrCompanions =
    completionCharacters.length > 0 || completionCompanions.length > 0

  const buildDerived = useMemo(() => {
    if (!hasCharactersOrCompanions) return null
    const characterBuildInputs: CharacterBuildInput[] = characterBuilds.map((b) => ({
      id: b.id,
      buildHash: b.buildHash,
    }))
    return buildDerivedContext(
      completionCharacters,
      characterBuildInputs,
      completionCompanions,
      companionBuilds,
      automationSettings
    )
  }, [
    hasCharactersOrCompanions,
    completionCharacters,
    characterBuilds,
    completionCompanions,
    companionBuilds,
    automationSettings,
    skillCatalogRead,
    setCatalogRead,
    companionCatalogRead,
    loreLibraryRead,
  ])

  return useMemo(() => {
    if (!buildDerived) return null
    return mergeInventoryContext(buildDerived, inventory)
  }, [buildDerived, inventory])
}
