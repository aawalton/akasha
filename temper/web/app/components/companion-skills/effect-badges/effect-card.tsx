import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { assertNever } from "@shared/utils-narrow/assert-never"
import {
  formatDamageType,
  formatTargetInfo,
} from "@temper/game-companions-core/effect-display/effect-formatters"
import {
  formatBuffType,
  formatDebuffType,
  formatSpecialEffect,
  formatStatusEffect,
} from "@temper/game-companions-core/effect-display/effect-labels"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import { calculateEffectValue } from "@temper/game-companions-core/formulas/companion-skill-tooltip"
import type { CompanionEffect } from "@temper/game-companions-core/skills/companion-skill-effect-components"
import { formatAbbreviated } from "@temper/shared-formula-framework/format"

interface EffectCardProps {
  effect: CompanionEffect
  stats?: CompanionFormulaStats
}

export function EffectCard({ effect, stats }: EffectCardProps) {
  const surface = useSurface()
  const { label, value, targetInfo } = getEffectCardDisplay(effect, stats)

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
  stats?: CompanionFormulaStats
): {
  label: string
  value: string | null
  targetInfo: string | null
} {
  switch (effect.type) {
    case "damage": {
      const damageValue = calculateEffectValue(effect, stats)
      return {
        label: formatDamageType(effect.damageType) + " Damage",
        value: damageValue != null ? formatAbbreviated(Math.round(damageValue)) : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "dot": {
      const dotValue = calculateEffectValue(effect, stats)
      return {
        label: formatDamageType(effect.damageType) + " DoT",
        value:
          dotValue != null
            ? `${formatAbbreviated(Math.round(dotValue))} / ${effect.duration}s`
            : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "heal": {
      const healValue = calculateEffectValue(effect, stats)
      return {
        label: "Heal",
        value: healValue != null ? formatAbbreviated(Math.round(healValue)) : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "hot": {
      const hotValue = calculateEffectValue(effect, stats)
      return {
        label: "Heal over Time",
        value:
          hotValue != null
            ? `${formatAbbreviated(Math.round(hotValue))} / ${effect.duration}s`
            : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "shield": {
      const shieldValue = calculateEffectValue(effect, stats)
      return {
        label: "Shield",
        value: shieldValue != null ? formatAbbreviated(Math.round(shieldValue)) : null,
        targetInfo: formatTargetInfo(effect.target),
      }
    }

    case "multi-hit": {
      const hitValue = calculateEffectValue(effect, stats)
      return {
        label: formatDamageType(effect.damageType) + " Damage",
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
        value: `${effect.status.duration}s`,
        targetInfo: formatTargetInfo(effect.target),
      }

    case "apply-buff":
      return {
        label: formatBuffType(effect.buff.buff),
        value: `${effect.buff.duration}s`,
        targetInfo: formatTargetInfo(effect.target),
      }

    case "apply-debuff":
      return {
        label: formatDebuffType(effect.debuff.debuff),
        value: `${effect.debuff.duration}s`,
        targetInfo: formatTargetInfo(effect.target),
      }

    case "ultimate-generation":
      return {
        label: "Ultimate Generation",
        value: `+${effect.value}`,
        targetInfo: null,
      }

    case "cooldown":
      return {
        label: "Cooldown",
        value: `${effect.duration}s`,
        targetInfo: null,
      }

    case "cooldown-reduction":
      return {
        label: "Cooldown Reduction",
        value: effect.value === "reset" ? "Reset" : `-${effect.value}s`,
        targetInfo: effect.scope === "all" ? "All abilities" : "Other abilities",
      }

    case "special":
      return {
        label: formatSpecialEffect(effect.effect),
        value: effect.duration != null ? `${effect.duration}s` : null,
        targetInfo: null,
      }

    case "synergy":
      return {
        label: `Synergy: ${effect.name}`,
        value: null,
        targetInfo: null,
      }

    case "retaliation": {
      const retaliationValue = calculateEffectValue(effect, stats)
      return {
        label: "Retaliation",
        value: retaliationValue != null ? formatAbbreviated(Math.round(retaliationValue)) : null,
        targetInfo: formatDamageType(effect.damageType),
      }
    }

    case "periodic-trigger":
      return {
        label: "Periodic Effect",
        value: `${effect.interval}s interval`,
        targetInfo: `${effect.duration}s duration`,
      }

    case "delayed":
      return {
        label: "Delayed Effect",
        value: `${effect.delay}s delay`,
        targetInfo: null,
      }

    case "passive":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    case "multi-heal":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    case "player-trigger":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    case "light-attack-heal":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    case "resource-cost":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    case "armor-piece-scaling":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    case "cast-time":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    case "channel":
      return {
        label: effect.type,
        value: null,
        targetInfo: null,
      }

    default:
      assertNever(effect)
  }
}
