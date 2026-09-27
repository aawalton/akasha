import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import {
  formatDamageType,
  formatTargetInfo,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-formatters/companion-effect-formatters.module.code.ts"
import {
  formatBuffType,
  formatDebuffType,
  formatSpecialEffect,
  formatStatusEffect,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-labels/companion-effect-labels.module.code.ts"
import type { CompanionEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import { calculateEffectValue } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-tooltip/companion-skill-tooltip.module.code.ts"
import { formatAbbreviated } from "akasha/temper/player/character/formula-framework/modules/number-format/number-format.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { effectCardAllAbilities } from "akasha/temper/web/phrase/pages/effect-card-all-abilities.temper-web-phrase.ts"
import { effectCardArmorPieceScaling } from "akasha/temper/web/phrase/pages/effect-card-armor-piece-scaling.temper-web-phrase.ts"
import { effectCardCastTime } from "akasha/temper/web/phrase/pages/effect-card-cast-time.temper-web-phrase.ts"
import { effectCardChannel } from "akasha/temper/web/phrase/pages/effect-card-channel.temper-web-phrase.ts"
import { effectCardCooldown } from "akasha/temper/web/phrase/pages/effect-card-cooldown.temper-web-phrase.ts"
import { effectCardCooldownReduction } from "akasha/temper/web/phrase/pages/effect-card-cooldown-reduction.temper-web-phrase.ts"
import { effectCardDamage } from "akasha/temper/web/phrase/pages/effect-card-damage.temper-web-phrase.ts"
import { effectCardDamageOverTime } from "akasha/temper/web/phrase/pages/effect-card-damage-over-time.temper-web-phrase.ts"
import { effectCardDelay } from "akasha/temper/web/phrase/pages/effect-card-delay.temper-web-phrase.ts"
import { effectCardDelayedEffect } from "akasha/temper/web/phrase/pages/effect-card-delayed-effect.temper-web-phrase.ts"
import { effectCardDuration } from "akasha/temper/web/phrase/pages/effect-card-duration.temper-web-phrase.ts"
import { effectCardHeal } from "akasha/temper/web/phrase/pages/effect-card-heal.temper-web-phrase.ts"
import { effectCardHealOverTime } from "akasha/temper/web/phrase/pages/effect-card-heal-over-time.temper-web-phrase.ts"
import { effectCardInterval } from "akasha/temper/web/phrase/pages/effect-card-interval.temper-web-phrase.ts"
import { effectCardLightAttackHeal } from "akasha/temper/web/phrase/pages/effect-card-light-attack-heal.temper-web-phrase.ts"
import { effectCardMultiHeal } from "akasha/temper/web/phrase/pages/effect-card-multi-heal.temper-web-phrase.ts"
import { effectCardOtherAbilities } from "akasha/temper/web/phrase/pages/effect-card-other-abilities.temper-web-phrase.ts"
import { effectCardPassive } from "akasha/temper/web/phrase/pages/effect-card-passive.temper-web-phrase.ts"
import { effectCardPeriodicEffect } from "akasha/temper/web/phrase/pages/effect-card-periodic-effect.temper-web-phrase.ts"
import { effectCardPlayerTrigger } from "akasha/temper/web/phrase/pages/effect-card-player-trigger.temper-web-phrase.ts"
import { effectCardReset } from "akasha/temper/web/phrase/pages/effect-card-reset.temper-web-phrase.ts"
import { effectCardResourceCost } from "akasha/temper/web/phrase/pages/effect-card-resource-cost.temper-web-phrase.ts"
import { effectCardRetaliation } from "akasha/temper/web/phrase/pages/effect-card-retaliation.temper-web-phrase.ts"
import { effectCardSeconds } from "akasha/temper/web/phrase/pages/effect-card-seconds.temper-web-phrase.ts"
import { effectCardShield } from "akasha/temper/web/phrase/pages/effect-card-shield.temper-web-phrase.ts"
import { effectCardSynergy } from "akasha/temper/web/phrase/pages/effect-card-synergy.temper-web-phrase.ts"
import { effectCardUltimateGeneration } from "akasha/temper/web/phrase/pages/effect-card-ultimate-generation.temper-web-phrase.ts"

const NAMED_BY_TYPE = {
  passive: effectCardPassive.slug,
  "multi-heal": effectCardMultiHeal.slug,
  "player-trigger": effectCardPlayerTrigger.slug,
  "light-attack-heal": effectCardLightAttackHeal.slug,
  "resource-cost": effectCardResourceCost.slug,
  "armor-piece-scaling": effectCardArmorPieceScaling.slug,
  "cast-time": effectCardCastTime.slug,
  channel: effectCardChannel.slug,
} as const

export function effectSeconds(phrase: Phrase, count: number | string): string {
  return phrase(effectCardSeconds.slug, { seconds: count })
}

export function effectDamage(phrase: Phrase, type: string): string {
  return phrase(effectCardDamage.slug, { type })
}

interface EffectCardProps {
  effect: CompanionEffect
  stats?: CompanionFormulaStats
}

export function EffectCard({ effect, stats }: EffectCardProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const { label, value, targetInfo } = getEffectCardDisplay(effect, phrase, stats)

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg px-4 py-2.5",
        surfaceClass(Math.min(surface + 1, 4))
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm">{label}</span>
        {targetInfo != null ? <span className="text-secondary text-xs">{targetInfo}</span> : null}
      </div>
      {value != null ? <span className="font-mono text-sm">{value}</span> : null}
    </div>
  )
}

function getEffectCardDisplay(
  effect: CompanionEffect,
  phrase: Phrase,
  stats?: CompanionFormulaStats
): {
  label: string
  value: string | null
  targetInfo: string | null
} {
  const seconds = (count: number) => effectSeconds(phrase, count)
  const damage = (type: string) => effectDamage(phrase, type)
  switch (effect.type) {
    case "damage": {
      const damageValue = calculateEffectValue(effect, stats)
      return {
        label: damage(formatDamageType(effect.damageType)),
        value: damageValue != null ? formatAbbreviated(Math.round(damageValue)) : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "dot": {
      const dotValue = calculateEffectValue(effect, stats)
      return {
        label: phrase(effectCardDamageOverTime.slug, { type: formatDamageType(effect.damageType) }),
        value:
          dotValue != null
            ? `${formatAbbreviated(Math.round(dotValue))} / ${seconds(effect.duration)}`
            : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "heal": {
      const healValue = calculateEffectValue(effect, stats)
      return {
        label: phrase(effectCardHeal.slug),
        value: healValue != null ? formatAbbreviated(Math.round(healValue)) : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "hot": {
      const hotValue = calculateEffectValue(effect, stats)
      return {
        label: phrase(effectCardHealOverTime.slug),
        value:
          hotValue != null
            ? `${formatAbbreviated(Math.round(hotValue))} / ${seconds(effect.duration)}`
            : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "shield": {
      const shieldValue = calculateEffectValue(effect, stats)
      return {
        label: phrase(effectCardShield.slug),
        value: shieldValue != null ? formatAbbreviated(Math.round(shieldValue)) : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "multi-hit": {
      const hitValue = calculateEffectValue(effect, stats)
      return {
        label: damage(formatDamageType(effect.damageType)),
        value:
          hitValue != null
            ? `${formatAbbreviated(Math.round(hitValue))} x ${effect.hitCount}`
            : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "apply-status":
      return {
        label: formatStatusEffect(effect.status.status),
        value: seconds(effect.status.duration),
        targetInfo: formatTargetInfo(effect.target),
      }

    case "apply-buff":
      return {
        label: formatBuffType(effect.buff.buff),
        value: seconds(effect.buff.duration),
        targetInfo: formatTargetInfo(effect.target),
      }

    case "apply-debuff":
      return {
        label: formatDebuffType(effect.debuff.debuff),
        value: seconds(effect.debuff.duration),
        targetInfo: formatTargetInfo(effect.target),
      }

    case "ultimate-generation":
      return {
        label: phrase(effectCardUltimateGeneration.slug),
        value: `+${effect.value}`,
        targetInfo: null,
      }

    case "cooldown":
      return {
        label: phrase(effectCardCooldown.slug),
        value: seconds(effect.duration),
        targetInfo: null,
      }

    case "cooldown-reduction":
      return {
        label: phrase(effectCardCooldownReduction.slug),
        value:
          effect.value === "reset" ? phrase(effectCardReset.slug) : `-${seconds(effect.value)}`,
        targetInfo: phrase(
          effect.scope === "all" ? effectCardAllAbilities.slug : effectCardOtherAbilities.slug
        ),
      }

    case "special":
      return {
        label: formatSpecialEffect(effect.effect),
        value: effect.duration != null ? seconds(effect.duration) : null,
        targetInfo: null,
      }

    case "synergy":
      return {
        label: phrase(effectCardSynergy.slug, { name: effect.name }),
        value: null,
        targetInfo: null,
      }

    case "retaliation": {
      const retaliationValue = calculateEffectValue(effect, stats)
      return {
        label: phrase(effectCardRetaliation.slug),
        value: retaliationValue != null ? formatAbbreviated(Math.round(retaliationValue)) : null,
        targetInfo: formatDamageType(effect.damageType),
      }
    }

    case "periodic-trigger":
      return {
        label: phrase(effectCardPeriodicEffect.slug),
        value: phrase(effectCardInterval.slug, { seconds: effect.interval }),
        targetInfo: phrase(effectCardDuration.slug, { seconds: effect.duration }),
      }

    case "delayed":
      return {
        label: phrase(effectCardDelayedEffect.slug),
        value: phrase(effectCardDelay.slug, { seconds: effect.delay }),
        targetInfo: null,
      }

    case "passive":
    case "multi-heal":
    case "player-trigger":
    case "light-attack-heal":
    case "resource-cost":
    case "armor-piece-scaling":
    case "cast-time":
    case "channel":
      return {
        label: phrase(NAMED_BY_TYPE[effect.type]),
        value: null,
        targetInfo: null,
      }

    default:
      assertNever(effect)
  }
}
