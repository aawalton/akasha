import type { FocusScriptId } from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import type { Skill } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import {
  type SkillId,
  skills,
} from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"
import { getScribedSkillId } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import {
  type GrimoireId,
  grimoires,
} from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"
import type { PendingScriptEdits } from "akasha/temper/web/modules/skills-types/skills-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { useScribedSkillsEditNotSaved } from "akasha/temper/web/phrase/pages/use-scribed-skills-edit-not-saved.temper-web-phrase.ts"
import { useScribedSkillsSkillNotAdded } from "akasha/temper/web/phrase/pages/use-scribed-skills-skill-not-added.temper-web-phrase.ts"
import { useMemo, useState } from "react"
import { toast } from "sonner"

interface UseScribedSkillsReturn {
  scribedSkillDefinitions: readonly Skill[]
  sortedScribing: ReadonlyArray<{ skill: ScribedSkill; originalIndex: number }>
  editingIndex: number | null
  pendingEdits: PendingScriptEdits | null
  isScribingSelectionOpen: boolean
  openScribingSelection: () => void
  closeScribingSelection: () => void
  handleScribingSelectionComplete: (grimoireId: GrimoireId, focusScriptId: FocusScriptId) => void
  openScriptEdit: (index: number) => void
  saveScriptEdits: () => void
  cancelScriptEdits: () => void
  removeSkill: (index: number) => void
  setPendingEdits: (edits: PendingScriptEdits) => void
}

export function useScribedSkills(
  scribing: readonly ScribedSkill[],
  onUpdateScribing: (scribing: readonly ScribedSkill[]) => void
): UseScribedSkillsReturn {
  const [editingScribedSkillIndex, setEditingScribedSkillIndex] = useState<number | null>(null)
  const [pendingScriptEdits, setPendingScriptEdits] = useState<PendingScriptEdits | null>(null)
  const [isScribingSelectionOpen, setIsScribingSelectionOpen] = useState(false)
  const phrase = usePhrase()

  const skillsRead = skills.data
  const grimoiresRead = grimoires.data

  const scribedSkillDefinitions = useMemo((): readonly Skill[] => {
    return scribing.flatMap((scribedSkill) => {
      const skillId: SkillId = scribedSkill.skillId satisfies SkillId

      const baseSkill = skillsRead[skillId]
      if (!baseSkill) return []

      return [
        {
          ...baseSkill,
          grimoireId: scribedSkill.grimoireId,
          focusScriptId: scribedSkill.focusScriptId,
          signatureScriptId: scribedSkill.signatureScriptId,
          affixScriptId: scribedSkill.affixScriptId,
        },
      ]
    })
  }, [scribing, skillsRead])

  const sortedScribing = useMemo(() => {
    const nameOf = (grimoireId: GrimoireId | undefined): string =>
      grimoireId === undefined ? "" : (grimoiresRead[grimoireId]?.name ?? "")
    return [...scribing]
      .map((skill, originalIndex) => ({ skill, originalIndex }))
      .sort((a, b) => nameOf(a.skill.grimoireId).localeCompare(nameOf(b.skill.grimoireId)))
  }, [scribing, grimoiresRead])

  const handleOpenScribedSkillEdit = (index: number) => {
    const skill = scribing[index]
    if (!skill) return
    setEditingScribedSkillIndex(index)
    setPendingScriptEdits({
      focusScriptId: skill.focusScriptId,
      signatureScriptId: skill.signatureScriptId,
      affixScriptId: skill.affixScriptId,
    })
  }

  const handleSaveScriptEdits = () => {
    if (editingScribedSkillIndex !== null && pendingScriptEdits) {
      const originalSkill = scribing[editingScribedSkillIndex]
      if (!originalSkill) {
        setEditingScribedSkillIndex(null)
        setPendingScriptEdits(null)
        return
      }
      const newScribing = [...scribing]

      const focusScriptChanged = pendingScriptEdits.focusScriptId !== originalSkill.focusScriptId

      let updatedSkill: ScribedSkill
      if (focusScriptChanged) {
        const newSkillId = getScribedSkillId(
          originalSkill.grimoireId,
          pendingScriptEdits.focusScriptId
        )
        if (newSkillId == null) {
          toast.error(phrase(useScribedSkillsEditNotSaved.slug))
          setEditingScribedSkillIndex(null)
          setPendingScriptEdits(null)
          return
        }
        updatedSkill = {
          ...originalSkill,
          ...pendingScriptEdits,
          skillId: newSkillId,
        }
      } else {
        updatedSkill = {
          ...originalSkill,
          ...pendingScriptEdits,
        }
      }

      newScribing[editingScribedSkillIndex] = updatedSkill
      onUpdateScribing(newScribing)
    }
    setEditingScribedSkillIndex(null)
    setPendingScriptEdits(null)
  }

  const handleCancelScriptEdits = () => {
    setEditingScribedSkillIndex(null)
    setPendingScriptEdits(null)
  }

  const removeScribedSkill = (index: number) => {
    onUpdateScribing(scribing.filter((_, i) => i !== index))
  }

  const handleScribingSelectionComplete = (
    grimoireId: GrimoireId,
    focusScriptId: FocusScriptId
  ) => {
    const skillId = getScribedSkillId(grimoireId, focusScriptId)
    if (skillId == null) {
      toast.error(phrase(useScribedSkillsSkillNotAdded.slug))
      setIsScribingSelectionOpen(false)
      return
    }

    const newIndex = scribing.length
    const newSkill: ScribedSkill = {
      skillId,
      grimoireId: grimoireId,
      focusScriptId: focusScriptId,
      signatureScriptId: "no-signature-script",
      affixScriptId: "no-affix-script",
    }
    const newScribing: ScribedSkill[] = [...scribing, newSkill]
    onUpdateScribing(newScribing)
    setIsScribingSelectionOpen(false)
    setEditingScribedSkillIndex(newIndex)
    setPendingScriptEdits({
      focusScriptId: focusScriptId,
      signatureScriptId: "no-signature-script",
      affixScriptId: "no-affix-script",
    })
  }

  const openScribingSelection = () => setIsScribingSelectionOpen(true)
  const closeScribingSelection = () => setIsScribingSelectionOpen(false)

  return {
    scribedSkillDefinitions,
    sortedScribing,
    editingIndex: editingScribedSkillIndex,
    pendingEdits: pendingScriptEdits,
    isScribingSelectionOpen,
    openScribingSelection,
    closeScribingSelection,
    handleScribingSelectionComplete,
    openScriptEdit: handleOpenScribedSkillEdit,
    saveScriptEdits: handleSaveScriptEdits,
    cancelScriptEdits: handleCancelScriptEdits,
    removeSkill: removeScribedSkill,
    setPendingEdits: setPendingScriptEdits,
  }
}
