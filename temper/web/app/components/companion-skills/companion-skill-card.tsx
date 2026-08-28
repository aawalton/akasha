"use client"

import { BadgeRow } from "@shared/design-badges/components/badge"
import { Heading } from "@shared/design-primitives/components/heading"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
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
import { formatAbbreviated } from "@temper/shared-formula-framework/format"
import type { ReactNode } from "react"
import { ConstraintBadges } from "@/components/companion-skills/effect-badges/constraint-badges"
import { EffectBadge } from "@/components/companion-skills/effect-badges/effect-badge"
import { EffectCard } from "@/components/companion-skills/effect-badges/effect-card"
import {
  RadiusBadge,
  RangeBadge,
  TargetingBadge,
} from "@/components/companion-skills/effect-badges/targeting-badges"
import { TimingBadges } from "@/components/companion-skills/effect-badges/timing-badges"
import type { ArmorPieceCounts } from "@/components/companion-skills/effect-badges/types"
import { CollapsibleSkillCard } from "@/components/ui/collapsible-skill-card"

interface CompanionSkillCardProps {
  skill: CompanionSkillTemplate
  collapsible?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  stats?: CompanionFormulaStats
  armorPieceCounts?: ArmorPieceCounts
  renderAction?: () => ReactNode
  reserveActionSpace?: boolean
  effectsDisplay?: "badges" | "cards"
  className?: string
}

export function CompanionSkillCard({
  skill,
  collapsible,
  open,
  defaultOpen,
  onOpenChange,
  stats,
  armorPieceCounts,
  renderAction,
  reserveActionSpace,
  effectsDisplay = "badges",
  className,
}: CompanionSkillCardProps) {
  const iconUrl = getEsoIconUrl(skill.icon)
  const timing = extractSkillTiming(skill.effects)
  const resourceCost = skill.effects.find(isResourceCostEffect)

  const displayEffects = sortEffectsByCategory(
    skill.effects.filter(
      (e) =>
        e.type !== "cast-time" &&
        e.type !== "channel" &&
        e.type !== "cooldown" &&
        e.type !== "resource-cost"
    )
  )

  const primaryTargeting = extractPrimaryTargeting(skill.effects)

  const subtitleParts: string[] = []
  if (resourceCost && resourceCost.resource !== "ultimate") {
    subtitleParts.push(
      `${formatAbbreviated(resourceCost.amount)} ${capitalize(resourceCost.resource)}`
    )
  }
  const subtitleString = subtitleParts.join(" / ")

  const effectBadges =
    displayEffects.length > 0
      ? displayEffects.map((effect, index) => (
          <EffectBadge
            key={index}
            effect={effect}
            variant="elevation-muted"
            stats={stats}
            armorPieceCounts={armorPieceCounts}
          />
        ))
      : null

  return (
    <CollapsibleSkillCard
      iconUrl={iconUrl}
      name={skill.name}
      subtitle={subtitleString !== "" ? subtitleString : undefined}
      subtitleTrailing={effectBadges}
      collapsible={collapsible}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      renderAction={renderAction}
      reserveActionSpace={reserveActionSpace}
      className={className}
    >
      {}
      <BadgeRow>
        <TimingBadges
          timing={timing}
          variant="elevation-muted"
          ultimateCost={resourceCost?.resource === "ultimate" ? resourceCost.amount : undefined}
          stats={stats}
        />
        {primaryTargeting ? (
          <TargetingBadge targeting={primaryTargeting} variant="elevation-muted" />
        ) : null}
        {primaryTargeting?.range != null ? (
          <RangeBadge range={primaryTargeting.range} variant="elevation-muted" />
        ) : null}
        {primaryTargeting?.radius != null ? (
          <RadiusBadge radius={primaryTargeting.radius} variant="elevation-muted" />
        ) : null}
        {skill.castConditions && skill.castConditions.length > 0 ? (
          <ConstraintBadges conditions={skill.castConditions} variant="elevation-muted" />
        ) : null}
      </BadgeRow>

      {}
      <p className={cn("rounded-lg px-4 py-3 text-secondary text-sm", surfaceClass(3))}>
        {updateDescriptionWithCalculatedValues(skill.description, skill.effects, stats)}
      </p>

      {}
      {effectsDisplay === "cards" && displayEffects.length > 0 ? (
        <div className="flex flex-col gap-2">
          <Heading variant="label">Effects</Heading>
          <div className="flex flex-col gap-2">
            {displayEffects.map((effect, index) => (
              <EffectCard key={index} effect={effect} stats={stats} />
            ))}
          </div>
        </div>
      ) : null}
    </CollapsibleSkillCard>
  )
}
