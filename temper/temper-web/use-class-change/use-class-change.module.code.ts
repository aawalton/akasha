import {
  getSkillsToRemoveOnClassChange,
  validateSkillLinesForClass,
} from "@akasha/temper-character-skills/skill-line-queries"
import { clearIncompatibleSets } from "@akasha/temper-characters-equipment/clear-incompatible-sets"
import { getSetIdsClassCannotEquip } from "@akasha/temper-characters-equipment/set-class-restrictions"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { useState } from "react"
import {
  useCharacter,
  useCharacterActions,
  useCharacterMetadata,
} from "../use-character/use-character.module.code.ts"

export function useClassChangeWithContext() {
  const build = useCharacter()
  const { availableSkills } = useCharacterMetadata()
  const { setClassWithCleanup } = useCharacterActions()

  const [pendingClassChange, setPendingClassChange] = useState<ClassId | undefined>(undefined)
  const [showClassChangeDialog, setShowClassChangeDialog] = useState(false)

  const initiateClassChange = (newClass: ClassId, currentClass: ClassId) => {
    if (newClass !== undefined && newClass !== currentClass && currentClass !== "no-class") {
      setPendingClassChange(newClass)
      setShowClassChangeDialog(true)
      return true
    }

    if (newClass !== undefined && currentClass === "no-class") {
      const incompatibleSetIds = getSetIdsClassCannotEquip(newClass)
      const clearedEquipment = clearIncompatibleSets(build.equipment, incompatibleSetIds)
      const validatedSkillLineIds = validateSkillLinesForClass(newClass)

      setClassWithCleanup({
        newClass,
        validatedSkillLineIds,
        clearedEquipment,
        clearedSkills: build.skills,
      })
      return false
    }

    return false
  }

  const confirmClassChange = () => {
    if (pendingClassChange === undefined) return

    const incompatibleSetIds = getSetIdsClassCannotEquip(pendingClassChange)
    const clearedEquipment = clearIncompatibleSets(build.equipment, incompatibleSetIds)
    const validatedSkillLineIds = validateSkillLinesForClass(pendingClassChange)

    const skillsToRemove = getSkillsToRemoveOnClassChange(
      build.skills,
      build.character.skillLineIds,
      validatedSkillLineIds,
      availableSkills
    )

    const clearedSkills = { ...build.skills }
    for (const { barId, slotId } of skillsToRemove) {
      const bar = clearedSkills[barId]
      if (bar) {
        clearedSkills[barId] = { ...bar, [slotId]: "no-skill" }
      }
    }

    setClassWithCleanup({
      newClass: pendingClassChange,
      validatedSkillLineIds,
      clearedEquipment,
      clearedSkills,
    })

    setPendingClassChange(undefined)
    setShowClassChangeDialog(false)
  }

  const cancelClassChange = () => {
    setPendingClassChange(undefined)
    setShowClassChangeDialog(false)
  }

  return {
    pendingClassChange,
    showClassChangeDialog,
    initiateClassChange,
    confirmClassChange,
    cancelClassChange,
  }
}
