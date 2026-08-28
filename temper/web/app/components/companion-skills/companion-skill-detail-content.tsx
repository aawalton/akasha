"use client"

import { BadgeRow } from "@shared/design-badges/components/badge"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { COLUMN_WIDTH } from "@shared/design-layout/components/layout-data"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { capitalize } from "@shared/utils-narrow/capitalize"
import { sortEffectsByCategory } from "@temper/game-companions-core/effect-display/effect-category"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import {
  extractPrimaryTargeting,
  updateDescriptionWithCalculatedValues,
} from "@temper/game-companions-core/formulas/companion-skill-tooltip"
import type { CompanionSkillTemplate } from "@temper/game-companions-core/skills/companion-skill-activation-effect-types"
import { extractSkillTiming } from "@temper/game-companions-core/skills/companion-skill-activation-effect-types"
import { isResourceCostEffect } from "@temper/game-companions-core/skills/companion-skill-effect-components"
import { getEsoIconUrl } from "@temper/shared-formula-framework/icon-utils"
import { ConstraintBadges } from "@/components/companion-skills/effect-badges/constraint-badges"
import { EffectBadge } from "@/components/companion-skills/effect-badges/effect-badge"
import {
  RadiusBadge,
  RangeBadge,
  TargetingBadge,
} from "@/components/companion-skills/effect-badges/targeting-badges"
import { TimingBadges } from "@/components/companion-skills/effect-badges/timing-badges"

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
