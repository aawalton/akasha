import { Badge } from "akasha/design/badges/badge/badge.module.code.tsx"
import type { Targeting } from "../../skill-kinds/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"
import { targetScopes } from "../../skill-kinds/target-scopes/target-scopes.module.code.ts"
import { targetTypes } from "../../skill-kinds/target-types/target-types.module.code.ts"
import type { BadgeVariant } from "../effect-badge-types/effect-badge-types.module.code.ts"

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
