"use client"

import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { CompanionPassiveSkillsPanelCard } from "@/components/companion-skills/companion-passive-skills-panel-card"
import { CompanionSkillBarPanelCard } from "@/components/companion-skills/companion-skill-bar-panel-card"
import { CompanionSkillSelectDialog } from "@/components/companion-skills/companion-skill-select-dialog"
import { useCompanionSkillBars } from "@/components/companion-skills/hooks/useCompanionSkillBars"
import { useCompanionFormulaStats } from "@/components/companions/context/use-companion-stats"

interface CompanionSkillsPanelProps {
  companionId: CompanionId
  skills: CompanionState["skills"]
  equipment: CompanionState["equipment"]
  onUpdate: (updates: Partial<CompanionState["skills"]>) => void
  columnCount: 1 | 2
  readOnly?: boolean
}

export function CompanionSkillsPanel({
  companionId,
  skills,
  equipment,
  onUpdate,
  columnCount,
  readOnly,
}: CompanionSkillsPanelProps) {
  const { formulaStats } = useCompanionFormulaStats()
  const skillBars = useCompanionSkillBars({
    skills: skills["skill-bar"],
    onUpdateSkills: (updates) => onUpdate(updates),
  })

  const noopSlotClick = () => {}
  const noopClearSkill = () => {}

  return (
    <>
      <ResponsiveColumns columnCount={columnCount}>
        <CompanionSkillBarPanelCard
          skills={skills["skill-bar"]}
          stats={formulaStats}
          onEmptySkillClick={readOnly ? noopSlotClick : skillBars.openSkillDialog}
          onClearSkill={
            readOnly ? noopClearSkill : (slotId) => skillBars.setSkill(slotId, "no-skill")
          }
          onEmptyUltimateClick={readOnly ? noopSlotClick : skillBars.openUltimateDialog}
          onClearUltimate={readOnly ? noopSlotClick : () => skillBars.setUltimate("no-skill")}
          readOnly={readOnly}
        />
        <CompanionPassiveSkillsPanelCard
          companionId={companionId}
          equipment={equipment}
          stats={formulaStats}
        />
      </ResponsiveColumns>

      {}
      {!readOnly && (
        <CompanionSkillSelectDialog
          open={skillBars.editingSkillSlot !== null}
          onOpenChange={(open) => !open && skillBars.closeDialogs()}
          title="Select Skill"
          companionId={companionId}
          isUltimate={false}
          stats={formulaStats}
          equipment={equipment}
          selectedSkills={skills["skill-bar"]}
          editingSlotId={skillBars.editingSkillSlot ?? undefined}
          onSelect={(skillId) => {
            if (skillBars.editingSkillSlot != null) {
              skillBars.setSkill(skillBars.editingSkillSlot, skillId)
            }
          }}
        />
      )}

      {}
      {!readOnly && (
        <CompanionSkillSelectDialog
          open={skillBars.editingUltimate}
          onOpenChange={(open) => !open && skillBars.closeDialogs()}
          title="Select Ultimate"
          companionId={companionId}
          isUltimate={true}
          stats={formulaStats}
          equipment={equipment}
          selectedSkills={skills["skill-bar"]}
          editingSlotId="ultimate"
          onSelect={(skillId) => skillBars.setUltimate(skillId)}
        />
      )}
    </>
  )
}
