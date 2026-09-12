"use client"

import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import type { Skill } from "akasha/temper/character-skills/modules/character-skills/character-skills.module.code.ts"
import { getEsoIconUrl } from "akasha/temper/formula-framework/eso-icon-url/eso-icon-url.module.code.ts"
import { skillLines } from "akasha/temper/skill-lines/skill-lines/skill-lines.module.code.ts"
import { CollapsibleSkillCard } from "akasha/temper/web/collapsible-skill-card/collapsible-skill-card.module.code.tsx"
import type { ReactNode } from "react"

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
