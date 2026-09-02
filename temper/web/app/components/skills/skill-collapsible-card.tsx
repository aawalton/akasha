"use client"

import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { cn } from "@akasha/design-primitives/cn"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import type { Skill } from "@akasha/temper-character-skills/character-skills"
import { getEsoIconUrl } from "@akasha/temper-formula-framework/eso-icon-url"
import type { ReactNode } from "react"
import { CollapsibleSkillCard } from "@/components/ui/collapsible-skill-card"

interface SkillCollapsibleCardProps {
  skill: Skill
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  renderAction?: () => ReactNode
  showSkillLine?: boolean
  className?: string
}

export function SkillCollapsibleCard({
  skill,
  open,
  defaultOpen,
  onOpenChange,
  renderAction,
  showSkillLine = true,
  className,
}: SkillCollapsibleCardProps) {
  const iconUrl = getEsoIconUrl(skill.icon)
  const skillLine = skillLines.data[skill.skillLineId]

  const subtitle = showSkillLine ? skillLine?.name : undefined

  return (
    <CollapsibleSkillCard
      iconUrl={iconUrl}
      name={skill.name}
      subtitle={subtitle}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      renderAction={renderAction}
      className={className}
    >
      {}
      <p className={cn("rounded-lg px-4 py-3 text-secondary text-sm", surfaceClass(3))}>
        {skill.description}
      </p>
    </CollapsibleSkillCard>
  )
}
