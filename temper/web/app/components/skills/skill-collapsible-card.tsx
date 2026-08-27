"use client"

import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import type { Skill } from "@temper/game-characters-skills/skills-data"
import { getEsoIconUrl } from "@temper/shared-formula-framework/icon-utils"
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
