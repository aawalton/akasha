"use client"

import { AlertDialog, AlertDialogAction, AlertDialogBody, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@shared/design-primitives/components/alert-dialog"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import { type ClassId, classes } from "@temper/game-characters-classes/classes-data"
import { type SkillLineId, skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import {
  getSkillsToRemoveOnClassChange,
  validateSkillLinesForClass,
} from "@temper/game-characters-skills/skill-line-queries"
import type { Skill } from "@temper/game-characters-skills/skills-data"

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
          <AlertDialogTitle>Change Character Class?</AlertDialogTitle>
          <AlertDialogDescription>
            Changing your character class will automatically reset all skill lines to the new
            class&apos;s skill lines
            {skillsToRemove.length > 0 && " and remove incompatible skills"}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogBody className="space-y-1 py-4 text-primary text-sm">
          {}
          <div className="flex items-center gap-2">
            <span className="flex-1 text-right">{classes.data[currentClass].name}</span>
            <span>→</span>
            <span className="flex-1">
              {newClass != null ? classes.data[newClass].name : "No class"}
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
              <span className="flex-1">Empty Slot</span>
            </div>
          ))}
        </AlertDialogBody>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Change Class</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
