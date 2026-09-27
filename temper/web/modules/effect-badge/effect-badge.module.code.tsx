import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  formatCooldown,
  formatDamageType,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-formatters/companion-effect-formatters.module.code.ts"
import {
  formatBuffType,
  formatDebuffType,
  formatPassiveMetric,
  formatSpecialEffect,
  formatStatusEffect,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-labels/companion-effect-labels.module.code.ts"
import type { CompanionEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import { calculateEffectValue } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-tooltip/companion-skill-tooltip.module.code.ts"
import { formatAbbreviated } from "akasha/temper/player/character/formula-framework/modules/number-format/number-format.module.code.ts"
import type {
  ArmorPieceCounts,
  BadgeVariant,
} from "akasha/temper/web/modules/effect-badge-types/effect-badge-types.module.code.ts"
import {
  effectDamage,
  effectSeconds,
} from "akasha/temper/web/modules/effect-card/effect-card.module.code.tsx"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { effectBadgeCastTime } from "akasha/temper/web/phrase/pages/effect-badge-cast-time.temper-web-phrase.ts"
import { effectBadgeChannel } from "akasha/temper/web/phrase/pages/effect-badge-channel.temper-web-phrase.ts"
import { effectBadgeCooldownReduction } from "akasha/temper/web/phrase/pages/effect-badge-cooldown-reduction.temper-web-phrase.ts"
import { effectBadgeDamageAfter } from "akasha/temper/web/phrase/pages/effect-badge-damage-after.temper-web-phrase.ts"
import { effectBadgeDamageShield } from "akasha/temper/web/phrase/pages/effect-badge-damage-shield.temper-web-phrase.ts"
import { effectBadgeDamageTaken } from "akasha/temper/web/phrase/pages/effect-badge-damage-taken.temper-web-phrase.ts"
import { effectBadgeDelayed } from "akasha/temper/web/phrase/pages/effect-badge-delayed.temper-web-phrase.ts"
import { effectBadgeHealth } from "akasha/temper/web/phrase/pages/effect-badge-health.temper-web-phrase.ts"
import { effectBadgeLightAttackHeal } from "akasha/temper/web/phrase/pages/effect-badge-light-attack-heal.temper-web-phrase.ts"
import { effectBadgeOnPlayerHit } from "akasha/temper/web/phrase/pages/effect-badge-on-player-hit.temper-web-phrase.ts"
import { effectBadgePeriodic } from "akasha/temper/web/phrase/pages/effect-badge-periodic.temper-web-phrase.ts"
import { effectBadgeResetCooldowns } from "akasha/temper/web/phrase/pages/effect-badge-reset-cooldowns.temper-web-phrase.ts"
import { effectBadgeRetaliationDamage } from "akasha/temper/web/phrase/pages/effect-badge-retaliation-damage.temper-web-phrase.ts"
import { effectBadgeSynergy } from "akasha/temper/web/phrase/pages/effect-badge-synergy.temper-web-phrase.ts"
import { effectBadgeUltimate } from "akasha/temper/web/phrase/pages/effect-badge-ultimate.temper-web-phrase.ts"
import { effectCardCooldown } from "akasha/temper/web/phrase/pages/effect-card-cooldown.temper-web-phrase.ts"
import { effectCardMultiHeal } from "akasha/temper/web/phrase/pages/effect-card-multi-heal.temper-web-phrase.ts"
import { effectCardResourceCost } from "akasha/temper/web/phrase/pages/effect-card-resource-cost.temper-web-phrase.ts"

interface EffectBadgeProps {
  effect: CompanionEffect
  variant: BadgeVariant
  stats?: CompanionFormulaStats
  armorPieceCounts?: ArmorPieceCounts
}

export function EffectBadge({ effect, variant, stats, armorPieceCounts }: EffectBadgeProps) {
  const phrase = usePhrase()
  const { label, value } = getEffectBadgeDisplay(effect, phrase, stats, armorPieceCounts)

  return (
    <Badge variant={variant}>
      {value != null ? <span className="font-mono">{value}</span> : null}
      <span>{label}</span>
    </Badge>
  )
}

function getEffectBadgeDisplay(
  effect: CompanionEffect,
  phrase: Phrase,
  stats?: CompanionFormulaStats,
  armorPieceCounts?: ArmorPieceCounts
): { label: string; value: string | null } {
  const seconds = effectSeconds.bind(null, phrase)
  const damage = effectDamage.bind(null, phrase)
  switch (effect.type) {
    case "damage": {
      const damageValue = calculateEffectValue(effect, stats)
      return {
        value: damageValue != null ? formatAbbreviated(Math.round(damageValue)) : null,
        label: damage(formatDamageType(effect.damageType)),
      }
    }

    case "dot": {
      const dotValue = calculateEffectValue(effect, stats)
      const amount = dotValue != null ? formatAbbreviated(Math.round(dotValue)) : null
      const type = damage(formatDamageType(effect.damageType))
      return {
        value: amount != null ? `${amount} ${type} / ${seconds(effect.duration)}` : null,
        label: "",
      }
    }

    case "heal": {
      const healValue = calculateEffectValue(effect, stats)
      return {
        value: healValue != null ? formatAbbreviated(Math.round(healValue)) : null,
        label: phrase(effectBadgeHealth.slug),
      }
    }

    case "hot": {
      const hotValue = calculateEffectValue(effect, stats)
      const amount = hotValue != null ? formatAbbreviated(Math.round(hotValue)) : null
      const health = phrase(effectBadgeHealth.slug)
      return {
        value: amount != null ? `${amount} ${health} / ${seconds(effect.duration)}` : null,
        label: "",
      }
    }

    case "shield": {
      const shieldValue = calculateEffectValue(effect, stats)
      return {
        value: shieldValue != null ? formatAbbreviated(Math.round(shieldValue)) : null,
        label: phrase(effectBadgeDamageShield.slug),
      }
    }

    case "multi-hit": {
      const hitValue = calculateEffectValue(effect, stats)
      return {
        value:
          hitValue != null
            ? `${formatAbbreviated(Math.round(hitValue))} ×${effect.hitCount}`
            : null,
        label: damage(formatDamageType(effect.damageType)),
      }
    }

    case "apply-status":
      return {
        value: seconds(effect.status.duration),
        label: formatStatusEffect(effect.status.status),
      }

    case "apply-buff": {
      let valueStr: string
      if (effect.buff.value !== undefined) {
        if (effect.buff.valueType === "integer") {
          valueStr = `${Math.round(effect.buff.value)}`
        } else {
          const isNegative = effect.buff.buff === "flat-damage-reduction"
          valueStr = `${isNegative ? "-" : ""}${Math.round(effect.buff.value * 100)}%`
        }
      } else {
        valueStr = seconds(effect.buff.duration)
      }
      return {
        value: valueStr,
        label: formatBuffType(effect.buff.buff),
      }
    }

    case "apply-debuff": {
      if (effect.debuff.debuff === "damage-taken-increase" && effect.debuff.value !== undefined) {
        const valueStr = `+${Math.round(effect.debuff.value * 100)}%`
        return {
          value: valueStr,
          label: phrase(effectBadgeDamageTaken.slug),
        }
      }
      return {
        value: seconds(effect.debuff.duration),
        label: formatDebuffType(effect.debuff.debuff),
      }
    }

    case "ultimate-generation":
      return {
        value: `+${effect.value}`,
        label: phrase(effectBadgeUltimate.slug),
      }

    case "cast-time":
      return {
        value: seconds(effect.duration),
        label: phrase(effectBadgeCastTime.slug),
      }

    case "channel":
      return {
        value: seconds(effect.duration),
        label: phrase(effectBadgeChannel.slug),
      }

    case "cooldown": {
      const effectiveCooldown = stats
        ? effect.duration * (1 + stats.abilityCooldown)
        : effect.duration
      return {
        value: seconds(formatCooldown(effectiveCooldown)),
        label: phrase(effectCardCooldown.slug),
      }
    }

    case "cooldown-reduction":
      return {
        value: effect.value === "reset" ? null : `-${seconds(effect.value)}`,
        label: phrase(
          effect.value === "reset"
            ? effectBadgeResetCooldowns.slug
            : effectBadgeCooldownReduction.slug
        ),
      }

    case "special":
      return {
        value: effect.duration != null ? seconds(effect.duration) : null,
        label: formatSpecialEffect(effect.effect),
      }

    case "synergy":
      return {
        value: null,
        label: phrase(effectBadgeSynergy.slug, { name: effect.name }),
      }

    case "retaliation": {
      const retaliationValue = calculateEffectValue(effect, stats)
      return {
        value: retaliationValue != null ? formatAbbreviated(Math.round(retaliationValue)) : null,
        label: phrase(effectBadgeRetaliationDamage.slug),
      }
    }

    case "periodic-trigger":
      return {
        value: `${seconds(effect.interval)}/${seconds(effect.duration)}`,
        label: phrase(effectBadgePeriodic.slug),
      }

    case "delayed": {
      if (effect.effect.type === "damage") {
        const damageValue = calculateEffectValue(effect.effect, stats)
        return {
          value: damageValue != null ? formatAbbreviated(Math.round(damageValue)) : null,
          label: phrase(effectBadgeDamageAfter.slug, {
            type: formatDamageType(effect.effect.damageType),
            seconds: effect.delay,
          }),
        }
      }
      return {
        value: seconds(effect.delay),
        label: phrase(effectBadgeDelayed.slug),
      }
    }

    case "light-attack-heal": {
      const healValue = calculateEffectValue(effect, stats)
      return {
        value:
          healValue != null
            ? `${formatAbbreviated(Math.round(healValue))} / ${seconds(effect.duration)}`
            : null,
        label: phrase(effectBadgeLightAttackHeal.slug),
      }
    }

    case "player-trigger": {
      const triggerValue = calculateEffectValue(effect, stats)
      return {
        value: triggerValue != null ? formatAbbreviated(Math.round(triggerValue)) : null,
        label: phrase(effectBadgeOnPlayerHit.slug, {
          type: formatDamageType(effect.damageType),
        }),
      }
    }

    case "passive": {
      const percent = Math.round(effect.value * 100)
      const sign = percent >= 0 ? "+" : ""
      return {
        value: `${sign}${percent}%`,
        label: formatPassiveMetric(effect.metricId),
      }
    }

    case "armor-piece-scaling": {
      const pieceCount = armorPieceCounts?.[effect.armorWeight] ?? 0
      const totalValue = effect.valuePerPiece * pieceCount * 100
      const sign = totalValue >= 0 ? "+" : ""
      return {
        value: `${sign}${totalValue.toFixed(0)}%`,
        label: formatPassiveMetric(effect.metricId),
      }
    }

    case "multi-heal":
      return {
        value: null,
        label: phrase(effectCardMultiHeal.slug),
      }

    case "resource-cost":
      return {
        value: null,
        label: phrase(effectCardResourceCost.slug),
      }

    default:
      assertNever(effect)
  }
}
