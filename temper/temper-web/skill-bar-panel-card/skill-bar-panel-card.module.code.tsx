"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import type { Skill, SkillId } from "@akasha/temper-character-skills/character-skills"
import { activeSkillSlots, type SkillSlotId } from "@akasha/temper-skill-kinds/skill-slots"
import { SkillSlotCard } from "../skill-slot-card/skill-slot-card.module.code.tsx"
import { UltimateSlotCard } from "../ultimate-slot-card/ultimate-slot-card.module.code.tsx"

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
