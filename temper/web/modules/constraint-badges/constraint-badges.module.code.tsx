import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  formatEnemyType,
  formatStatusType,
  formatWeaponType,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-formatters/companion-effect-formatters.module.code.ts"
import type { EffectCondition } from "akasha/temper/catalog/skill-kind/modules/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"
import type { BadgeVariant } from "akasha/temper/web/modules/effect-badge-types/effect-badge-types.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { constraintBadgesAllConditions } from "akasha/temper/web/phrase/pages/constraint-badges-all-conditions.temper-web-phrase.ts"
import { constraintBadgesAllyHealth } from "akasha/temper/web/phrase/pages/constraint-badges-ally-health.temper-web-phrase.ts"
import { constraintBadgesAllyNearby } from "akasha/temper/web/phrase/pages/constraint-badges-ally-nearby.temper-web-phrase.ts"
import { constraintBadgesAnyCondition } from "akasha/temper/web/phrase/pages/constraint-badges-any-condition.temper-web-phrase.ts"
import { constraintBadgesCondition } from "akasha/temper/web/phrase/pages/constraint-badges-condition.temper-web-phrase.ts"
import { constraintBadgesEnemyNearby } from "akasha/temper/web/phrase/pages/constraint-badges-enemy-nearby.temper-web-phrase.ts"
import { constraintBadgesHasStatus } from "akasha/temper/web/phrase/pages/constraint-badges-has-status.temper-web-phrase.ts"
import { constraintBadgesHealth } from "akasha/temper/web/phrase/pages/constraint-badges-health.temper-web-phrase.ts"
import { constraintBadgesHealthThreshold } from "akasha/temper/web/phrase/pages/constraint-badges-health-threshold.temper-web-phrase.ts"
import { constraintBadgesImmovableTarget } from "akasha/temper/web/phrase/pages/constraint-badges-immovable-target.temper-web-phrase.ts"
import { constraintBadgesMeterRange } from "akasha/temper/web/phrase/pages/constraint-badges-meter-range.temper-web-phrase.ts"
import { constraintBadgesMeters } from "akasha/temper/web/phrase/pages/constraint-badges-meters.temper-web-phrase.ts"
import { constraintBadgesMovableTarget } from "akasha/temper/web/phrase/pages/constraint-badges-movable-target.temper-web-phrase.ts"
import { constraintBadgesNoStatus } from "akasha/temper/web/phrase/pages/constraint-badges-no-status.temper-web-phrase.ts"
import { constraintBadgesRange } from "akasha/temper/web/phrase/pages/constraint-badges-range.temper-web-phrase.ts"
import { constraintBadgesStatus } from "akasha/temper/web/phrase/pages/constraint-badges-status.temper-web-phrase.ts"
import { constraintBadgesTargetCasting } from "akasha/temper/web/phrase/pages/constraint-badges-target-casting.temper-web-phrase.ts"
import { constraintBadgesTargetNotCasting } from "akasha/temper/web/phrase/pages/constraint-badges-target-not-casting.temper-web-phrase.ts"
import { constraintBadgesWeapon } from "akasha/temper/web/phrase/pages/constraint-badges-weapon.temper-web-phrase.ts"

interface ConstraintBadgesProps {
  conditions: readonly EffectCondition[]
  variant: BadgeVariant
}

export function ConstraintBadges({ conditions, variant }: ConstraintBadgesProps) {
  const phrase = usePhrase()
  return (
    <>
      {conditions.map((condition, index) => (
        <ConstraintBadge key={index} condition={condition} variant={variant} phrase={phrase} />
      ))}
    </>
  )
}

interface ConstraintBadgeProps {
  condition: EffectCondition
  variant: BadgeVariant
  phrase: Phrase
}

function ConstraintBadge({ condition, variant, phrase }: ConstraintBadgeProps) {
  const { label, value } = formatCondition(condition, phrase)

  return (
    <Badge variant={variant}>
      {value != null ? <span className="font-mono">{value}</span> : null}
      <span>{label}</span>
    </Badge>
  )
}

function formatCondition(
  condition: EffectCondition,
  phrase: Phrase
): { label: string; value: string | null } {
  const meters = (distance: number) => phrase(constraintBadgesMeters.slug, { distance })
  switch (condition.type) {
    case "health-threshold": {
      const label = phrase(constraintBadgesHealth.slug)
      if (condition.below !== undefined) return { value: `<${condition.below}%`, label }
      if (condition.above !== undefined) return { value: `>${condition.above}%`, label }
      return { value: null, label: phrase(constraintBadgesHealthThreshold.slug) }
    }

    case "ally-health": {
      const label = phrase(constraintBadgesAllyHealth.slug)
      if (condition.below !== undefined) return { value: `<${condition.below}%`, label }
      if (condition.above !== undefined) return { value: `>${condition.above}%`, label }
      return { value: null, label }
    }

    case "range": {
      const label = phrase(constraintBadgesRange.slug)
      const { minDistance, maxDistance } = condition
      if (minDistance !== undefined && maxDistance !== undefined) {
        const value = phrase(constraintBadgesMeterRange.slug, {
          min: minDistance,
          max: maxDistance,
        })
        return { value, label }
      }
      if (minDistance !== undefined) return { value: `>${meters(minDistance)}`, label }
      if (maxDistance !== undefined) return { value: `<${meters(maxDistance)}`, label }
      return { value: null, label }
    }

    case "movable":
      return {
        value: null,
        label: phrase(
          condition.isMovable
            ? constraintBadgesMovableTarget.slug
            : constraintBadgesImmovableTarget.slug
        ),
      }

    case "enemy-type": {
      const types = condition.enemyTypes.map(formatEnemyType).join(", ")
      return { value: null, label: types }
    }

    case "status": {
      if (condition.hasStatus != null) {
        const status = formatStatusType(condition.hasStatus)
        return { value: null, label: phrase(constraintBadgesHasStatus.slug, { status }) }
      }
      if (condition.notStatus != null) {
        const status = formatStatusType(condition.notStatus)
        return { value: null, label: phrase(constraintBadgesNoStatus.slug, { status }) }
      }
      return { value: null, label: phrase(constraintBadgesStatus.slug) }
    }

    case "casting":
      return {
        value: null,
        label: phrase(
          condition.isCasting
            ? constraintBadgesTargetCasting.slug
            : constraintBadgesTargetNotCasting.slug
        ),
      }

    case "nearby": {
      const distance = condition.maxDistance ?? 8
      const nearby =
        condition.targetType === "enemy"
          ? constraintBadgesEnemyNearby.slug
          : constraintBadgesAllyNearby.slug
      return { value: `<${meters(distance)}`, label: phrase(nearby) }
    }

    case "weapon-type": {
      const weapon = formatWeaponType(condition.weaponType)
      return { value: null, label: phrase(constraintBadgesWeapon.slug, { weapon }) }
    }

    case "any":
      return { value: null, label: phrase(constraintBadgesAnyCondition.slug) }

    case "all":
      return { value: null, label: phrase(constraintBadgesAllConditions.slug) }

    default:
      return { value: null, label: phrase(constraintBadgesCondition.slug) }
  }
}
