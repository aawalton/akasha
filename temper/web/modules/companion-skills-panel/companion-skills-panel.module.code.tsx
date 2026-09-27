"use client"

import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import type { CompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { CompanionPassiveSkillsPanelCard } from "akasha/temper/web/modules/companion-passive-skills-panel-card/companion-passive-skills-panel-card.module.code.tsx"
import { CompanionSkillBarPanelCard } from "akasha/temper/web/modules/companion-skill-bar-panel-card/companion-skill-bar-panel-card.module.code.tsx"
import { CompanionSkillSelectDialog } from "akasha/temper/web/modules/companion-skill-select-dialog/companion-skill-select-dialog.module.code.tsx"
import { useCompanionSkillBars } from "akasha/temper/web/modules/use-companion-skill-bars/use-companion-skill-bars.module.code.ts"
import { useCompanionFormulaStats } from "akasha/temper/web/modules/use-companion-stats/use-companion-stats.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionSkillsPanelSelectSkill } from "akasha/temper/web/phrase/pages/companion-skills-panel-select-skill.temper-web-phrase.ts"
import { companionSkillsPanelSelectUltimate } from "akasha/temper/web/phrase/pages/companion-skills-panel-select-ultimate.temper-web-phrase.ts"

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
  const phrase = usePhrase()
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
          title={phrase(companionSkillsPanelSelectSkill.slug)}
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
          title={phrase(companionSkillsPanelSelectUltimate.slug)}
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
