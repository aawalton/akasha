"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { CompanionPassiveSkillsPanelCard } from "../companion-passive-skills-panel-card/companion-passive-skills-panel-card.module.code.tsx"
import { CompanionSkillBarPanelCard } from "../companion-skill-bar-panel-card/companion-skill-bar-panel-card.module.code.tsx"
import { CompanionSkillSelectDialog } from "../companion-skill-select-dialog/companion-skill-select-dialog.module.code.tsx"
import { useCompanionSkillBars } from "../use-companion-skill-bars/use-companion-skill-bars.module.code.ts"
import { useCompanionFormulaStats } from "../use-companion-stats/use-companion-stats.module.code.ts"

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
