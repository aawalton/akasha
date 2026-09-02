import type { CompanionVisibility } from "@temper/game-companions-core/companion-types"
import type { useCompanionList } from "@temper/game-companions-ui/use-companions"
import type { useCompletionCompanions } from "@temper/player-completion-ui/use-completion"
import { companionUrl } from "@akasha/temper-build-support/build-url"
import { buildId as toBuildId } from "@akasha/temper-formula-framework/branded-id"
import { useMemo } from "react"

type CompletionCompanions = ReturnType<typeof useCompletionCompanions>["companions"]
type CompanionBuilds = ReturnType<typeof useCompanionList>["builds"]

export function useCompanionPartnerBuildUrl(
  visibility: CompanionVisibility | undefined,
  buildId: string,
  companionId: string,
  completionCompanions: CompletionCompanions,
  companionBuilds: CompanionBuilds
): { partnerBuildUrl: string | undefined; browseHref: string | undefined } {
  const partnerBuildUrl = useMemo(() => {
    if (visibility !== "live" && visibility !== "target") return undefined
    for (const entity of completionCompanions) {
      if (visibility === "live" && entity.liveBuildId === buildId && entity.targetBuildId != null) {
        const partner = companionBuilds.find((b) => b.id === entity.targetBuildId)
        return companionUrl(toBuildId(entity.targetBuildId), partner?.buildMetadata?.name)
      }
      if (
        visibility === "target" &&
        entity.targetBuildId === buildId &&
        entity.liveBuildId != null
      ) {
        const partner = companionBuilds.find((b) => b.id === entity.liveBuildId)
        return companionUrl(toBuildId(entity.liveBuildId), partner?.buildMetadata?.name)
      }
    }
    return undefined
  }, [visibility, buildId, completionCompanions, companionBuilds])

  const browseHref =
    visibility === "live" || visibility === "target"
      ? `/companion-builds?tab=browse&companion=${companionId}`
      : undefined

  return { partnerBuildUrl, browseHref }
}
