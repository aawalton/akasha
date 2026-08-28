"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { activeSkillSlots, type SkillSlotId } from "@temper/game-characters-skills/skill-slots-data"
import type { Skill, SkillId } from "@temper/game-characters-skills/skills-data"
import { SkillSlotCard } from "@/components/skills/skill-slot-card"
import { UltimateSlotCard } from "@/components/skills/ultimate-slot-card"

interface SkillBarPanelCardProps {
  id: string
  title: string
  skills: readonly SkillId[]
  ultimate: SkillId
  findSkill: (skillId: SkillId) => Skill | undefined
  onSkillClick: (slotId: SkillSlotId) => void
  onClearSkill: (slotId: SkillSlotId) => void
  onUltimateClick: () => void
  onClearUltimate: () => void
  className?: string
  readOnly?: boolean
}

export function SkillBarPanelCard({
  id,
  title,
  skills,
  ultimate,
  findSkill,
  onSkillClick,
  onClearSkill,
  onUltimateClick,
  onClearUltimate,
  className,
  readOnly,
}: SkillBarPanelCardProps) {
  return (
    <PanelCard id={id} collapsible={true} title={title} className={className}>
      {activeSkillSlots.map((slot, i) => {
        const skillId = skills[i]
        return (
          <SkillSlotCard
            key={slot.id}
            skill={skillId != null ? findSkill(skillId) : undefined}
            onClick={() => onSkillClick(slot.id)}
            onClear={() => onClearSkill(slot.id)}
            slotLabel={slot.id.replace("active-", "")}
            readOnly={readOnly}
          />
        )
      })}
      <UltimateSlotCard
        ultimate={findSkill(ultimate)}
        onClick={onUltimateClick}
        onClear={onClearUltimate}
        readOnly={readOnly}
      />
    </PanelCard>
  )
}
