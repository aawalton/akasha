"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "akasha/design/interface/primitive/modules/alert-dialog/alert-dialog.module.code.tsx"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import {
  type SkillLineId,
  skillLines,
} from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { Skill } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import {
  getSkillsToRemoveOnClassChange,
  validateSkillLinesForClass,
} from "akasha/temper/player/character/skill/modules/skill-line-queries/skill-line-queries.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { classChangeConfirmationDialogCancel } from "akasha/temper/web/phrase/pages/class-change-confirmation-dialog-cancel.temper-web-phrase.ts"
import { classChangeConfirmationDialogChangeClass } from "akasha/temper/web/phrase/pages/class-change-confirmation-dialog-change-class.temper-web-phrase.ts"
import { classChangeConfirmationDialogEmptySlot } from "akasha/temper/web/phrase/pages/class-change-confirmation-dialog-empty-slot.temper-web-phrase.ts"
import { classChangeConfirmationDialogNoClass } from "akasha/temper/web/phrase/pages/class-change-confirmation-dialog-no-class.temper-web-phrase.ts"
import { classChangeConfirmationDialogResetsLines } from "akasha/temper/web/phrase/pages/class-change-confirmation-dialog-resets-lines.temper-web-phrase.ts"
import { classChangeConfirmationDialogResetsLinesAndSkills } from "akasha/temper/web/phrase/pages/class-change-confirmation-dialog-resets-lines-and-skills.temper-web-phrase.ts"
import { classChangeConfirmationDialogTitle } from "akasha/temper/web/phrase/pages/class-change-confirmation-dialog-title.temper-web-phrase.ts"

interface ClassChangeConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentClass: ClassId
  newClass: ClassId | undefined
  currentEquippedSkillLineIds: readonly SkillLineId[]
  currentSkills: CharacterState["skills"]
  availableSkills: readonly Skill[]
  scribedSkillDefinitions?: readonly Skill[]
  onConfirm: () => void
}

export function ClassChangeConfirmationDialog({
  open,
  onOpenChange,
  currentClass,
  newClass,
  currentEquippedSkillLineIds,
  currentSkills,
  availableSkills,
  scribedSkillDefinitions = [],
  onConfirm,
}: ClassChangeConfirmationDialogProps) {
  const phrase = usePhrase()
  const newSkillLineIds =
    newClass != null ? validateSkillLinesForClass(newClass) : validateSkillLinesForClass("no-class")

  const getSkillLineDisplayName = (skillLineId: SkillLineId) => {
    return skillLines.data[skillLineId].name
  }

  const skillsToRemove = getSkillsToRemoveOnClassChange(
    currentSkills,
    currentEquippedSkillLineIds,
    newSkillLineIds,
    availableSkills,
    scribedSkillDefinitions
  )

  const uniqueSkillsToRemove = Array.from(
    new Map(skillsToRemove.map((item) => [item.skill.name, item.skill])).values()
  )

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{phrase(classChangeConfirmationDialogTitle.slug)}</AlertDialogTitle>
          <AlertDialogDescription>
            {phrase(
              skillsToRemove.length > 0
                ? classChangeConfirmationDialogResetsLinesAndSkills.slug
                : classChangeConfirmationDialogResetsLines.slug
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogBody className="space-y-1 py-4 text-primary text-sm">
          {}
          <div className="flex items-center gap-2">
            <span className="flex-1 text-right">{classes.data[currentClass].name}</span>
            <span>→</span>
            <span className="flex-1">
              {newClass != null
                ? classes.data[newClass].name
                : phrase(classChangeConfirmationDialogNoClass.slug)}
            </span>
          </div>

          {}
          {currentEquippedSkillLineIds.map((currentLineId, index) => {
            const newLineId = newSkillLineIds[index]
            return (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 text-right">{getSkillLineDisplayName(currentLineId)}</span>
                <span>→</span>
                <span className="flex-1">
                  {newLineId != null ? getSkillLineDisplayName(newLineId) : "—"}
                </span>
              </div>
            )
          })}

          {}
          {uniqueSkillsToRemove.map((skill) => (
            <div key={skill.id} className="flex items-center gap-2">
              <span className="flex-1 text-right">{skill.name}</span>
              <span>→</span>
              <span className="flex-1">{phrase(classChangeConfirmationDialogEmptySlot.slug)}</span>
            </div>
          ))}
        </AlertDialogBody>

        <AlertDialogFooter>
          <AlertDialogCancel>{phrase(classChangeConfirmationDialogCancel.slug)}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {phrase(classChangeConfirmationDialogChangeClass.slug)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
