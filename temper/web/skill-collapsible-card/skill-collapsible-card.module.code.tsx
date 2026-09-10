"use client"

import { cn } from "akasha/design/primitives/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/primitives/surface-class/surface-class.module.code.ts"
import type { Skill } from "akasha/temper/character-skills/character-skills/character-skills.module.code.ts"
import type { ReactNode } from "react"
import { getEsoIconUrl } from "../../formula-framework/eso-icon-url/eso-icon-url.module.code.ts"
import { skillLines } from "../../skill-lines/skill-lines/skill-lines.module.code.ts"
import { CollapsibleSkillCard } from "../collapsible-skill-card/collapsible-skill-card.module.code.tsx"

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
