import { Badge } from "@akasha/design-badges/badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Button } from "@akasha/design-primitives/button"
import { CardContent, CardTitle } from "@akasha/design-primitives/card"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { companionUrl } from "@akasha/temper-build-support/build-url"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { getWeaponRole } from "@akasha/temper-companions-core/companion-weapon-role-match"
import { companionWeaponRoles } from "@akasha/temper-companions-core/companion-weapon-roles"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { buildId } from "@akasha/temper-formula-framework/branded-id"

interface LiveOnlyBuild {
  id: string
  name: string
  buildData: CompanionState | null
  updatedAt: number
  score: number
}

export interface CompanionLiveOnlyEntity {
  entityId: string
  companionId: CompanionId
  liveBuild: LiveOnlyBuild
  sortOrder: number | null
}

function LiveBuildRow({ build }: { build: LiveOnlyBuild }) {
  const surface = useSurface()
  const weaponRoleId = build.buildData ? getWeaponRole(build.buildData) : null
  const weaponName =
    weaponRoleId != null && weaponRoleId !== "no-weapon-role"
      ? companionWeaponRoles.data[weaponRoleId].name
      : null

  return (
    <Link
      href={`${companionUrl(buildId(build.id), build.name)}?tab=companion`}
      className={`flex cursor-pointer flex-col gap-1 rounded-lg ${surfaceClass(surface + 1)} px-3 py-2.5 transition-colors hover:bg-surface-3`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-primary text-sm">
          {build.name !== "" ? build.name : "Untitled Build"}
        </span>
        <Badge variant="elevation" className="shrink-0">
          Live
        </Badge>
      </div>
      {(build.score > 0 || weaponName != null) && (
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          {weaponName != null && <Badge variant="elevation-muted">{weaponName}</Badge>}
          {build.score > 0 && (
            <Badge variant="accent" className="font-semibold">
              <span>Score</span>
              <span className="font-mono">{Math.round(build.score).toLocaleString()}</span>
            </Badge>
          )}
        </div>
      )}
    </Link>
  )
}

interface CompanionLiveOnlyPanelCardProps {
  entity: CompanionLiveOnlyEntity
  getCompanionName: (companionId: CompanionId) => string
  onSetTarget: (entityId: string, sourceBuildId: string, companionName: string) => void
}

export function CompanionLiveOnlyPanelCard({
  entity,
  getCompanionName,
  onSetTarget,
}: CompanionLiveOnlyPanelCardProps) {
  const companionName = getCompanionName(entity.companionId)

  return (
    <PanelCard id={`companion-entity-${entity.entityId}`} className="h-auto justify-between">
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-lg">{companionName}</CardTitle>
        <LiveBuildRow build={entity.liveBuild} />
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onSetTarget(entity.entityId, entity.liveBuild.id, companionName)}
        >
          Set target build
        </Button>
      </CardContent>
    </PanelCard>
  )
}
