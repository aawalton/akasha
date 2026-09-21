"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  activeSkillSlots,
  type SkillSlotId,
} from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import type {
  Skill,
  SkillId,
} from "akasha/temper/character-skill/modules/character-skills/character-skills.module.code.ts"
import { SkillSlotCard } from "akasha/temper/web/modules/skill-slot-card/skill-slot-card.module.code.tsx"
import { UltimateSlotCard } from "akasha/temper/web/modules/ultimate-slot-card/ultimate-slot-card.module.code.tsx"

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
