import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  targetScopeName,
  targetTypeName,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-formatters/companion-effect-formatters.module.code.ts"
import type { Targeting } from "akasha/temper/catalog/skill-kind/modules/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"
import type { BadgeVariant } from "akasha/temper/web/modules/effect-badge-types/effect-badge-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { targetingBadgesMeters } from "akasha/temper/web/phrase/pages/targeting-badges-meters.temper-web-phrase.ts"
import { targetingBadgesRadius } from "akasha/temper/web/phrase/pages/targeting-badges-radius.temper-web-phrase.ts"
import { targetingBadgesRange } from "akasha/temper/web/phrase/pages/targeting-badges-range.temper-web-phrase.ts"

interface TargetingBadgeProps {
  targeting: Targeting
  variant: BadgeVariant
}

export function TargetingBadge({ targeting, variant }: TargetingBadgeProps) {
  const type = targetTypeName(targeting.type)
  const scope = targetScopeName(targeting.scope)

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
  const phrase = usePhrase()
  return (
    <Badge variant={variant}>
      <span className="font-mono">{phrase(targetingBadgesMeters.slug, { meters: range })}</span>
      <span>{phrase(targetingBadgesRange.slug)}</span>
    </Badge>
  )
}

interface RadiusBadgeProps {
  radius: number
  variant: BadgeVariant
}

export function RadiusBadge({ radius, variant }: RadiusBadgeProps) {
  const phrase = usePhrase()
  return (
    <Badge variant={variant}>
      <span className="font-mono">{phrase(targetingBadgesMeters.slug, { meters: radius })}</span>
      <span>{phrase(targetingBadgesRadius.slug)}</span>
    </Badge>
  )
}
