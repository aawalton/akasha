import { Badge } from "@shared/design-badges/components/badge"
import { targetScopes } from "@temper/game-characters-skills/target-scope-data"
import { targetTypes } from "@temper/game-characters-skills/target-type-data"
import type { Targeting } from "@temper/game-companions-core/skills/companion-skill-effect-components"
import type { BadgeVariant } from "@/components/companion-skills/effect-badges/types"

interface TargetingBadgeProps {
  targeting: Targeting
  variant: BadgeVariant
}

export function TargetingBadge({ targeting, variant }: TargetingBadgeProps) {
  const type = targetTypes.data[targeting.type].name
  const scope = targetScopes.data[targeting.scope].name

  if (targeting.scope === "single") {
    return (
      <Badge variant={variant}>
        <span>{type}</span>
      </Badge>
    )
  }

  return (
    <>
      <Badge variant={variant}>
        <span>{scope}</span>
      </Badge>
      <Badge variant={variant}>
        <span>{type}</span>
      </Badge>
    </>
  )
}

interface RangeBadgeProps {
  range: number
  variant: BadgeVariant
}

export function RangeBadge({ range, variant }: RangeBadgeProps) {
  return (
    <Badge variant={variant}>
      <span className="font-mono">{range}m</span>
      <span>Range</span>
    </Badge>
  )
}

interface RadiusBadgeProps {
  radius: number
  variant: BadgeVariant
}

export function RadiusBadge({ radius, variant }: RadiusBadgeProps) {
  return (
    <Badge variant={variant}>
      <span className="font-mono">{radius}m</span>
      <span>Radius</span>
    </Badge>
  )
}
