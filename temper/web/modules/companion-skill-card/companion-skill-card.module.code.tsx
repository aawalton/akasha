"use client"

import { BadgeRow } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { sortEffectsByCategory } from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-category/companion-effect-category.module.code.ts"
import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import { extractSkillTiming } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import { isResourceCostEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import {
  extractPrimaryTargeting,
  updateDescriptionWithCalculatedValues,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-tooltip/companion-skill-tooltip.module.code.ts"
import { temperResource } from "akasha/temper/catalog/skill/resource/temper-resource.page-type.ts"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { getEsoIconUrl } from "akasha/temper/player/character/formula-framework/modules/eso-icon-url/eso-icon-url.module.code.ts"
import { formatAbbreviated } from "akasha/temper/player/character/formula-framework/modules/number-format/number-format.module.code.ts"
import { CollapsibleSkillCard } from "akasha/temper/web/modules/collapsible-skill-card/collapsible-skill-card.module.code.tsx"
import { ConstraintBadges } from "akasha/temper/web/modules/constraint-badges/constraint-badges.module.code.tsx"
import { EffectBadge } from "akasha/temper/web/modules/effect-badge/effect-badge.module.code.tsx"
import type { ArmorPieceCounts } from "akasha/temper/web/modules/effect-badge-types/effect-badge-types.module.code.ts"
import { EffectCard } from "akasha/temper/web/modules/effect-card/effect-card.module.code.tsx"
import {
  RadiusBadge,
  RangeBadge,
  TargetingBadge,
} from "akasha/temper/web/modules/targeting-badges/targeting-badges.module.code.tsx"
import { TimingBadges } from "akasha/temper/web/modules/timing-badges/timing-badges.module.code.tsx"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionSkillCardCost } from "akasha/temper/web/phrase/pages/companion-skill-card-cost.temper-web-phrase.ts"
import { companionSkillCardEffects } from "akasha/temper/web/phrase/pages/companion-skill-card-effects.temper-web-phrase.ts"
import type { ReactNode } from "react"

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
  const phrase = usePhrase()
  const resources = useKeyedTitles(temperResource.slug)
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
      phrase(companionSkillCardCost.slug, {
        amount: formatAbbreviated(resourceCost.amount),
        resource: titleIn(resources, resourceCost.resource),
      })
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
          <Heading variant="label">{phrase(companionSkillCardEffects.slug)}</Heading>
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
