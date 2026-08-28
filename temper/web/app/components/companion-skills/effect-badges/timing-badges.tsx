import { Badge } from "@shared/design-badges/components/badge"
import { formatCooldown } from "@temper/game-companions-core/effect-display/effect-formatters"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import type { ExtractedSkillTiming } from "@temper/game-companions-core/skills/companion-skill-activation-effect-types"
import type { BadgeVariant } from "@/components/companion-skills/effect-badges/types"

interface TimingBadgesProps {
  timing: ExtractedSkillTiming
  variant: BadgeVariant
  ultimateCost?: number
  stats?: CompanionFormulaStats
}

export function TimingBadges({ timing, variant, ultimateCost, stats }: TimingBadgesProps) {
  const effectiveCooldown =
    timing.cooldown > 0 && stats ? timing.cooldown * (1 + stats.abilityCooldown) : timing.cooldown

  return (
    <>
      {ultimateCost != null ? (
        <Badge variant={variant}>
          <span className="font-mono">{ultimateCost}</span>
          <span>Ultimate</span>
        </Badge>
      ) : null}
      {timing.castTime > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">{timing.castTime}s</span>
          <span>Cast Time</span>
        </Badge>
      ) : null}
      {timing.channelDuration > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">{timing.channelDuration}s</span>
          <span>Channel</span>
        </Badge>
      ) : null}
      {effectiveCooldown > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">{formatCooldown(effectiveCooldown)}s</span>
          <span>Cooldown</span>
        </Badge>
      ) : null}
    </>
  )
}
