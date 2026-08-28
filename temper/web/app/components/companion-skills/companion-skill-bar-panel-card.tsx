"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import type { CompanionSkillTemplate } from "@temper/game-companions-core/skills/companion-skill-activation-effect-types"
import { companionSkillSlots } from "@temper/game-companions-core/skills/companion-skill-slots-data"
import {
  type CompanionSkillId,
  companionSkills,
} from "@temper/game-companions-core/skills/companion-skills-data"
import { CompanionSkillSlotCard } from "@/components/companion-skills/companion-skill-slot-card"
import { CompanionUltimateSlotCard } from "@/components/companion-skills/companion-ultimate-slot-card"

type ActiveCompanionSkillSlotId = "active-1" | "active-2" | "active-3" | "active-4" | "active-5"

type CompanionSkillSlot = (typeof companionSkillSlots.list)[number]
const activeCompanionSkillSlots = companionSkillSlots.list.filter(
  (slot): slot is Extract<CompanionSkillSlot, { id: ActiveCompanionSkillSlotId }> =>
    slot.id !== "ultimate"
)

type CompanionSkillSlotId = ActiveCompanionSkillSlotId | "ultimate"

interface CompanionSkillBarPanelCardProps {
  skills: Record<CompanionSkillSlotId, CompanionSkillId>
  stats?: CompanionFormulaStats
  onEmptySkillClick: (slotId: ActiveCompanionSkillSlotId) => void
  onClearSkill: (slotId: ActiveCompanionSkillSlotId) => void
  onEmptyUltimateClick: () => void
  onClearUltimate: () => void
  className?: string
  readOnly?: boolean
}

export function CompanionSkillBarPanelCard({
  skills,
  stats,
  onEmptySkillClick,
  onClearSkill,
  onEmptyUltimateClick,
  onClearUltimate,
  className,
  readOnly,
}: CompanionSkillBarPanelCardProps) {
  const findSkill = (skillId: CompanionSkillId): CompanionSkillTemplate | undefined => {
    if (skillId === "no-skill") return undefined
    return companionSkills.data[skillId]
  }

  return (
    <PanelCard id="companion-skill-bar" collapsible={true} title="Skills" className={className}>
      {activeCompanionSkillSlots.map((slot) => {
        const skillId = skills[slot.id]
        const skill = findSkill(skillId)

        return (
          <CompanionSkillSlotCard
            key={slot.id}
            skill={skill}
            stats={stats}
            onEmptyClick={() => onEmptySkillClick(slot.id)}
            onClear={() => onClearSkill(slot.id)}
            slotLabel={slot.id.replace("active-", "")}
            readOnly={readOnly}
          />
        )
      })}
      <CompanionUltimateSlotCard
        ultimate={findSkill(skills["ultimate"])}
        stats={stats}
        onEmptyClick={onEmptyUltimateClick}
        onClear={onClearUltimate}
        readOnly={readOnly}
      />
    </PanelCard>
  )
}
