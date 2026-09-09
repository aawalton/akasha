import { companionUrl } from "@akasha/temper-build-support/build-url"
import type { CompanionVisibility } from "akasha/temper/temper-companions-core/companion-types/companion-types.module.code.ts"
import type { useCompanionList } from "akasha/temper/temper-companions-ui/use-companions/use-companions.module.code.ts"
import type { useCompletionCompanions } from "akasha/temper/temper-player-completion-ui/use-completion/use-completion.module.code.ts"
import { useMemo } from "react"
import { buildId as toBuildId } from "../../formula-framework/branded-id/branded-id.module.code.ts"

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
