"use client"

import type { CompanionSkillSlotId } from "@temper/game-companions-core/skills/companion-skill-slots-data"
import type { CompanionSkillId } from "@temper/game-companions-core/skills/companion-skills-data"
import { useCallback, useState } from "react"

interface UseCompanionSkillBarsProps {
  skills: Record<CompanionSkillSlotId, CompanionSkillId>
  onUpdateSkills: (updates: { "skill-bar": Record<CompanionSkillSlotId, CompanionSkillId> }) => void
}

type ActiveCompanionSkillSlotId = Exclude<CompanionSkillSlotId, "ultimate">

export function useCompanionSkillBars({ skills, onUpdateSkills }: UseCompanionSkillBarsProps) {
  const [editingSkillSlot, setEditingSkillSlot] = useState<ActiveCompanionSkillSlotId | null>(null)
  const [editingUltimate, setEditingUltimate] = useState<boolean>(false)

  const openSkillDialog = useCallback((slotId: ActiveCompanionSkillSlotId) => {
    setEditingSkillSlot(slotId)
    setEditingUltimate(false)
  }, [])

  const openUltimateDialog = useCallback(() => {
    setEditingUltimate(true)
    setEditingSkillSlot(null)
  }, [])

  const closeDialogs = useCallback(() => {
    setEditingSkillSlot(null)
    setEditingUltimate(false)
  }, [])

  const setSkill = useCallback(
    (slotId: CompanionSkillSlotId, skillId: CompanionSkillId) => {
      onUpdateSkills({
        "skill-bar": {
          ...skills,
          [slotId]: skillId,
        },
      })
      closeDialogs()
    },
    [skills, onUpdateSkills, closeDialogs]
  )

  const setUltimate = useCallback(
    (skillId: CompanionSkillId) => {
      onUpdateSkills({
        "skill-bar": {
          ...skills,
          ultimate: skillId,
        },
      })
      closeDialogs()
    },
    [skills, onUpdateSkills, closeDialogs]
  )

  return {
    editingSkillSlot,
    editingUltimate,

    openSkillDialog,
    openUltimateDialog,
    closeDialogs,
    setSkill,
    setUltimate,
  }
}
