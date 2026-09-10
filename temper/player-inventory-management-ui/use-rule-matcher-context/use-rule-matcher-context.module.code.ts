import type { AutomationSettings } from "akasha/temper/build-support/automation-settings/automation-settings.module.code.ts"
import { useCharacterList } from "akasha/temper/characters-character-ui/use-characters/use-characters.module.code.ts"
import { useCompanionList } from "akasha/temper/companions-ui/use-companions/use-companions.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import type {
  CharacterBuildInput,
  RuleMatcherContext,
} from "akasha/temper/items-rules-core/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import {
  buildDerivedContext,
  mergeInventoryContext,
} from "akasha/temper/items-rules-matcher/rule-matcher-context/rule-matcher-context.module.code.ts"
import {
  useCompletionCharacters,
  useCompletionCompanions,
} from "akasha/temper/player-completion-ui/use-completion/use-completion.module.code.ts"
import { useMemo } from "react"

export function useRuleMatcherContext(
  inventory: InventoryDatabase | null,
  automationSettings?: AutomationSettings
): RuleMatcherContext | null {
  const { characters: completionCharacters } = useCompletionCharacters()
  const { builds: characterBuilds } = useCharacterList()
  const { companions: completionCompanions } = useCompletionCompanions()
  const { builds: companionBuilds } = useCompanionList()

  const hasCharactersOrCompanions =
    completionCharacters.length > 0 || completionCompanions.length > 0

  const buildDerived = useMemo(() => {
    if (!hasCharactersOrCompanions) return null
    const characterBuildInputs: CharacterBuildInput[] = characterBuilds.map((b) => ({
      id: b.id,
      buildHash: b.buildHash,
      esoCharacterId: b.esoCharacterId,
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
  ])

  return useMemo(() => {
    if (!buildDerived) return null
    return mergeInventoryContext(buildDerived, inventory)
  }, [buildDerived, inventory])
}
