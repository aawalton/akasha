"use client"

import { BadgeRow } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { COLUMN_WIDTH } from "akasha/design/interfaces/layout/layout-data/layout-data.module.code.ts"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { sortEffectsByCategory } from "akasha/temper/companions-core/modules/companion-effect-category/companion-effect-category.module.code.ts"
import type { CompanionSkillTemplate } from "akasha/temper/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import { extractSkillTiming } from "akasha/temper/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import { isResourceCostEffect } from "akasha/temper/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import {
  extractPrimaryTargeting,
  updateDescriptionWithCalculatedValues,
} from "akasha/temper/companions-core/modules/companion-skill-tooltip/companion-skill-tooltip.module.code.ts"
import { getEsoIconUrl } from "akasha/temper/formula-framework/eso-icon-url/eso-icon-url.module.code.ts"
import { ConstraintBadges } from "akasha/temper/web/constraint-badges/constraint-badges.module.code.tsx"
import { EffectBadge } from "akasha/temper/web/effect-badge/effect-badge.module.code.tsx"
import {
  RadiusBadge,
  RangeBadge,
  TargetingBadge,
} from "akasha/temper/web/targeting-badges/targeting-badges.module.code.tsx"
import { TimingBadges } from "akasha/temper/web/timing-badges/timing-badges.module.code.tsx"
import { capitalize } from "akasha/utils/text/modules/capitalize/capitalize.module.code.ts"

const SKILL_DETAIL_WIDTH = COLUMN_WIDTH

interface CompanionSkillDetailContentProps {
  skill: CompanionSkillTemplate
  stats?: CompanionFormulaStats
}

export function CompanionSkillDetailContent({ skill, stats }: CompanionSkillDetailContentProps) {
  const iconUrl = getEsoIconUrl(skill.icon)
  const timing = extractSkillTiming(skill.effects)

  const resourceCost = skill.effects.find(isResourceCostEffect)

  const displayEffects = sortEffectsByCategory(
    skill.effects.filter(
      (e) =>
        e.type !== "cast-time" &&
        e.type !== "channel" &&
        e.type !== "cooldown" &&
        e.type !== "resource-cost" &&
        e.type !== "passive" &&
        e.type !== "armor-piece-scaling"
    )
  )

  const primaryTargeting = extractPrimaryTargeting(skill.effects)

  const surface = useSurface()
  const nestedLevel = Math.min(surface + 1, 4)
  const nestedSurface = surfaceClass(nestedLevel)
  const badgeVariant = "elevation-muted" as const

  return (
    <div className="flex flex-col gap-4" style={{ width: SKILL_DETAIL_WIDTH }}>
      {}
      <div className="flex items-start gap-4">
        <div
          className={`flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg ${nestedSurface}`}
        >
          {iconUrl != null ? (
            <img
              src={iconUrl}
              alt={skill.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="pb-1 font-medium text-lg">{skill.name}</div>
          {}
          <div className="flex items-center gap-2 text-secondary text-sm">
            {resourceCost && resourceCost.resource !== "ultimate" ? (
              <span className="shrink-0">
                {resourceCost.amount} {capitalize(resourceCost.resource)}
              </span>
            ) : null}
            {displayEffects.length > 0 ? (
              <div className="flex min-w-0 flex-1 gap-1">
                {displayEffects.map((effect, index) => (
                  <EffectBadge key={index} effect={effect} variant={badgeVariant} stats={stats} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {}
      <BadgeRow>
        <TimingBadges
          timing={timing}
          variant={badgeVariant}
          ultimateCost={resourceCost?.resource === "ultimate" ? resourceCost.amount : undefined}
          stats={stats}
        />
        {primaryTargeting ? (
          <TargetingBadge targeting={primaryTargeting} variant={badgeVariant} />
        ) : null}
        {primaryTargeting?.range != null ? (
          <RangeBadge range={primaryTargeting.range} variant={badgeVariant} />
        ) : null}
        {primaryTargeting?.radius != null ? (
          <RadiusBadge radius={primaryTargeting.radius} variant={badgeVariant} />
        ) : null}
        {skill.castConditions && skill.castConditions.length > 0 ? (
          <ConstraintBadges conditions={skill.castConditions} variant={badgeVariant} />
        ) : null}
      </BadgeRow>

      {}
      <p className={`rounded-lg px-4 py-3 text-secondary text-sm ${nestedSurface}`}>
        {updateDescriptionWithCalculatedValues(skill.description, skill.effects, stats)}
      </p>
    </div>
  )
}
