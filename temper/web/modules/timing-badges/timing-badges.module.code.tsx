import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { formatCooldown } from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-formatters/companion-effect-formatters.module.code.ts"
import type { ExtractedSkillTiming } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import type { BadgeVariant } from "akasha/temper/web/modules/effect-badge-types/effect-badge-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { timingBadgesCastTime } from "akasha/temper/web/phrase/pages/timing-badges-cast-time.temper-web-phrase.ts"
import { timingBadgesChannelTime } from "akasha/temper/web/phrase/pages/timing-badges-channel-time.temper-web-phrase.ts"
import { timingBadgesCooldown } from "akasha/temper/web/phrase/pages/timing-badges-cooldown.temper-web-phrase.ts"
import { timingBadgesSeconds } from "akasha/temper/web/phrase/pages/timing-badges-seconds.temper-web-phrase.ts"
import { timingBadgesUltimate } from "akasha/temper/web/phrase/pages/timing-badges-ultimate.temper-web-phrase.ts"

interface TimingBadgesProps {
  timing: ExtractedSkillTiming
  variant: BadgeVariant
  ultimateCost?: number
  stats?: CompanionFormulaStats
}

export function TimingBadges({ timing, variant, ultimateCost, stats }: TimingBadgesProps) {
  const phrase = usePhrase()
  const effectiveCooldown =
    timing.cooldown > 0 && stats ? timing.cooldown * (1 + stats.abilityCooldown) : timing.cooldown

  return (
    <>
      {ultimateCost != null ? (
        <Badge variant={variant}>
          <span className="font-mono">{ultimateCost}</span>
          <span>{phrase(timingBadgesUltimate.slug)}</span>
        </Badge>
      ) : null}
      {timing.castTime > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">
            {phrase(timingBadgesSeconds.slug, { seconds: timing.castTime })}
          </span>
          <span>{phrase(timingBadgesCastTime.slug)}</span>
        </Badge>
      ) : null}
      {timing.channelDuration > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">
            {phrase(timingBadgesSeconds.slug, { seconds: timing.channelDuration })}
          </span>
          <span>{phrase(timingBadgesChannelTime.slug)}</span>
        </Badge>
      ) : null}
      {effectiveCooldown > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">
            {phrase(timingBadgesSeconds.slug, { seconds: formatCooldown(effectiveCooldown) })}
          </span>
          <span>{phrase(timingBadgesCooldown.slug)}</span>
        </Badge>
      ) : null}
    </>
  )
}
