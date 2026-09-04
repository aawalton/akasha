import { characterUrl } from "@akasha/temper-build-support/build-url"
import type { CharacterVisibility } from "@akasha/temper-character-build/build-types"
import type { useCharacterList } from "@akasha/temper-characters-character-ui/use-characters"
import { buildId as toBuildId } from "@akasha/temper-formula-framework/branded-id"
import type { useCompletionCharacters } from "@akasha/temper-player-completion-ui/use-completion"
import { useMemo } from "react"

type CompletionCharacters = ReturnType<typeof useCompletionCharacters>["characters"]
type CharacterBuilds = ReturnType<typeof useCharacterList>["builds"]

export function usePartnerBuildUrl(
  visibility: CharacterVisibility | undefined,
  buildId: string,
  completionCharacters: CompletionCharacters,
  characterBuilds: CharacterBuilds
): string | undefined {
  return useMemo(() => {
    if (visibility !== "live" && visibility !== "target") return undefined
    for (const entity of completionCharacters) {
      if (visibility === "live" && entity.liveBuildId === buildId && entity.targetBuildId != null) {
        const partner = characterBuilds.find((b) => b.id === entity.targetBuildId)
        return characterUrl(toBuildId(entity.targetBuildId), partner?.buildMetadata?.name)
      }
      if (
        visibility === "target" &&
        entity.targetBuildId === buildId &&
        entity.liveBuildId != null
      ) {
        const partner = characterBuilds.find((b) => b.id === entity.liveBuildId)
        return characterUrl(toBuildId(entity.liveBuildId), partner?.buildMetadata?.name)
      }
    }
    return undefined
  }, [visibility, buildId, completionCharacters, characterBuilds])
}
