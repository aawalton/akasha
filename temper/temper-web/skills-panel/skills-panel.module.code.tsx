"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import {
  getArmorSkillLineIds,
  getWeaponSkillLineIdsForBar,
} from "@akasha/temper-character-skills/skill-line-queries"
import { activeSkillSlots } from "@akasha/temper-skill-kinds/skill-slots"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { useDeferredValue, useMemo } from "react"
import { PassiveSkillsPanelCard } from "../passive-skills-panel-card/passive-skills-panel-card.module.code.tsx"
import { ScribingPanelCard } from "../scribing-panel-card/scribing-panel-card.module.code.tsx"
import { ScribingSelectionDialog } from "../scribing-selection-dialog/scribing-selection-dialog.module.code.tsx"
import { ScriptEditDialog } from "../script-edit-dialog/script-edit-dialog.module.code.tsx"
import { SkillBarPanelCard } from "../skill-bar-panel-card/skill-bar-panel-card.module.code.tsx"
import { SkillLinesPanelCard } from "../skill-lines-panel-card/skill-lines-panel-card.module.code.tsx"
import { SkillSelectionDialog } from "../skill-selection-dialog/skill-selection-dialog.module.code.tsx"
import type { SkillsPanelProps } from "../skills-types/skills-types.module.code.ts"
import { useScribedSkills } from "../use-scribed-skills/use-scribed-skills.module.code.ts"
import { useSkillBars } from "../use-skill-bars/use-skill-bars.module.code.ts"

export function SkillsPanel({
  skills,
  scribing,
  character,
  equipment,
  availableSkills,
  onUpdateSkills,
  onUpdateScribing,
  onUpdateCharacter,
  columnCount,
  readOnly,
  passiveSearch = "",
  passiveCategory = null,
}: SkillsPanelProps) {
  const deferredPassiveSearch = useDeferredValue(passiveSearch)
  const deferredPassiveCategory = useDeferredValue(passiveCategory)

  const primaryBarWeaponSkillLineIds = useMemo(
    () => getWeaponSkillLineIdsForBar(equipment["primary-weapon-bar"]),
    [equipment["primary-weapon-bar"]]
  )
  const backupBarWeaponSkillLineIds = useMemo(
    () => getWeaponSkillLineIdsForBar(equipment["backup-weapon-bar"]),
    [equipment["backup-weapon-bar"]]
  )
  const availableArmorSkillLineIds = useMemo(
    () => getArmorSkillLineIds(equipment.armor),
    [equipment.armor]
  )

  const scribedSkills = useScribedSkills(scribing, onUpdateScribing)
  const skillBars = useSkillBars({
    skills,
    availableSkills,
    scribedSkillDefinitions: scribedSkills.scribedSkillDefinitions,
    character,
    equipment,
    primaryBarWeaponSkillLineIds,
    backupBarWeaponSkillLineIds,
    availableArmorSkillLineIds,
    onUpdateSkills,
  })

  const handleSkillLineChange = (index: number, newSkillLineId: SkillLineId) => {
    const newSkillLineIds = [...character.skillLineIds]
    newSkillLineIds[index] = newSkillLineId
    onUpdateCharacter({ skillLineIds: newSkillLineIds })
  }

  return (
    <>
      <ResponsiveColumns columnCount={columnCount}>
        <SkillLinesPanelCard
          skillLineIds={character.skillLineIds}
          characterClass={character.class}
          onSkillLineChange={handleSkillLineChange}
          readOnly={readOnly}
          collapseProtected
        />
        <SkillBarPanelCard
          id="primary-skill-bar"
          title="Primary Bar"
          skills={activeSkillSlots.map((slot) => skills["primary-skill-bar"][slot.id])}
          ultimate={skills["primary-skill-bar"]["ultimate"]}
          findSkill={skillBars.findSkill}
          onSkillClick={(slotId) => skillBars.openSkillDialog("primary", slotId)}
          onClearSkill={(slotId) => skillBars.setSkill("primary", slotId, "no-skill")}
          onUltimateClick={() => skillBars.openUltimateDialog("primary")}
          onClearUltimate={() => skillBars.setUltimate("primary", "no-skill")}
          readOnly={readOnly}
        />
        <SkillBarPanelCard
          id="backup-skill-bar"
          title="Backup Bar"
          skills={activeSkillSlots.map((slot) => skills["backup-skill-bar"][slot.id])}
          ultimate={skills["backup-skill-bar"]["ultimate"]}
          findSkill={skillBars.findSkill}
          onSkillClick={(slotId) => skillBars.openSkillDialog("backup", slotId)}
          onClearSkill={(slotId) => skillBars.setSkill("backup", slotId, "no-skill")}
          onUltimateClick={() => skillBars.openUltimateDialog("backup")}
          onClearUltimate={() => skillBars.setUltimate("backup", "no-skill")}
          readOnly={readOnly}
        />
        <ScribingPanelCard
          sortedScribing={scribedSkills.sortedScribing}
          onOpenGrimoireSelect={scribedSkills.openScribingSelection}
          onOpenScriptEdit={scribedSkills.openScriptEdit}
          onRemoveSkill={scribedSkills.removeSkill}
          readOnly={readOnly}
        />
        <PassiveSkillsPanelCard
          character={character}
          equipment={equipment}
          search={deferredPassiveSearch}
          selectedCategory={deferredPassiveCategory}
        />
      </ResponsiveColumns>

      {}
      {!readOnly && (
        <SkillSelectionDialog
          open={skillBars.editingSkillSlot !== null}
          title="Select Skill"
          onClose={skillBars.closeDialogs}
          onSelect={(skillId) => {
            if (skillBars.editingSkillSlot) {
              skillBars.setSkill(
                skillBars.editingSkillSlot.bar,
                skillBars.editingSkillSlot.slotId,
                skillId
              )
            }
          }}
          organizedSkills={
            skillBars.editingSkillSlot
              ? skillBars.getOrganizedSkills(false, skillBars.editingSkillSlot.bar)
              : []
          }
          searchFilter={skillBars.searchFilter}
          onSearchChange={skillBars.setSearchFilter}
          expandedSkillLines={skillBars.expandedSkillLines}
          onToggleSkillLine={skillBars.toggleSkillLine}
          onExpandAll={() =>
            skillBars.expandAllSkillLines(
              skillBars.editingSkillSlot
                ? skillBars.getOrganizedSkills(false, skillBars.editingSkillSlot.bar)
                : []
            )
          }
          onCollapseAll={skillBars.collapseAllSkillLines}
        />
      )}

      {!readOnly && (
        <SkillSelectionDialog
          open={skillBars.editingUltimate !== null}
          title="Select Ultimate"
          onClose={skillBars.closeDialogs}
          onSelect={(skillId) => {
            if (skillBars.editingUltimate != null) {
              skillBars.setUltimate(skillBars.editingUltimate, skillId)
            }
          }}
          organizedSkills={
            skillBars.editingUltimate != null
              ? skillBars.getOrganizedSkills(true, skillBars.editingUltimate)
              : []
          }
          searchFilter={skillBars.searchFilter}
          onSearchChange={skillBars.setSearchFilter}
          expandedSkillLines={skillBars.expandedSkillLines}
          onToggleSkillLine={skillBars.toggleSkillLine}
          onExpandAll={() =>
            skillBars.expandAllSkillLines(
              skillBars.editingUltimate != null
                ? skillBars.getOrganizedSkills(true, skillBars.editingUltimate)
                : []
            )
          }
          onCollapseAll={skillBars.collapseAllSkillLines}
        />
      )}

      {!readOnly && (
        <ScriptEditDialog
          open={scribedSkills.editingIndex !== null}
          skill={
            scribedSkills.editingIndex !== null
              ? (scribing[scribedSkills.editingIndex] ?? null)
              : null
          }
          pendingEdits={scribedSkills.pendingEdits}
          onSave={scribedSkills.saveScriptEdits}
          onCancel={scribedSkills.cancelScriptEdits}
          onEditChange={scribedSkills.setPendingEdits}
        />
      )}

      {!readOnly && (
        <ScribingSelectionDialog
          open={scribedSkills.isScribingSelectionOpen}
          onClose={scribedSkills.closeScribingSelection}
          onComplete={scribedSkills.handleScribingSelectionComplete}
          scribing={scribing}
        />
      )}
    </>
  )
}
