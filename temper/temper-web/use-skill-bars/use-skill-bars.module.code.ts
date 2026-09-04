import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { Skill, SkillId } from "@akasha/temper-character-skills/character-skills"
import { findSkillById } from "@akasha/temper-character-skills/find-skill-by-id"
import { filterSkillsForBar } from "@akasha/temper-character-skills/skill-bar-filtering"
import { keysOf } from "@akasha/temper-formula-framework/record-parts"
import type { SkillSlotId } from "@akasha/temper-skill-kinds/skill-slots"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { areConflictingMorphs } from "@akasha/temper-skill-morphs/morph-conflict"
import { type CategoryData, organizeSkills } from "@akasha/temper-skill-morphs/skill-organization"
import { useMemo, useState } from "react"
import type { BarType } from "../skills-types/skills-types.module.code.ts"

interface UseSkillBarsOptions {
  skills: CharacterState["skills"]
  availableSkills: readonly Skill[]
  scribedSkillDefinitions: readonly Skill[]
  character: CharacterState["character"]
  equipment: CharacterState["equipment"]
  primaryBarWeaponSkillLineIds: readonly SkillLineId[]
  backupBarWeaponSkillLineIds: readonly SkillLineId[]
  availableArmorSkillLineIds: readonly SkillLineId[]
  onUpdateSkills: (updates: Partial<CharacterState["skills"]>) => void
}

interface UseSkillBarsReturn {
  editingSkillSlot: { bar: BarType; slotId: SkillSlotId } | null
  editingUltimate: BarType | null
  searchFilter: string
  expandedSkillLines: Set<string>
  setSearchFilter: (value: string) => void
  toggleSkillLine: (key: string) => void
  expandAllSkillLines: (organizedSkills: readonly CategoryData[]) => void
  collapseAllSkillLines: () => void
  openSkillDialog: (bar: BarType, slotId: SkillSlotId) => void
  openUltimateDialog: (bar: BarType) => void
  closeDialogs: () => void
  setSkill: (bar: BarType, slotId: SkillSlotId, skillId: SkillId) => void
  setUltimate: (bar: BarType, ultId: SkillId) => void
  getOrganizedSkills: (isUltimate: boolean, barType: BarType) => readonly CategoryData[]
  findSkill: (id: SkillId) => Skill | undefined
}

export function useSkillBars(options: UseSkillBarsOptions): UseSkillBarsReturn {
  const {
    skills,
    availableSkills,
    scribedSkillDefinitions,
    character,
    primaryBarWeaponSkillLineIds,
    backupBarWeaponSkillLineIds,
    availableArmorSkillLineIds,
    onUpdateSkills,
  } = options

  const [editingSkillSlot, setEditingSkillSlot] = useState<{
    bar: BarType
    slotId: SkillSlotId
  } | null>(null)
  const [editingUltimate, setEditingUltimate] = useState<BarType | null>(null)
  const [searchFilter, setSearchFilter] = useState("")
  const [expandedSkillLines, setExpandedSkillLines] = useState<Set<string>>(new Set())

  const allSkillsIncludingScribed = useMemo(() => {
    const nonScribedSkills = availableSkills.filter((skill) => skill.subcategoryId !== "scribed")
    return [...nonScribedSkills, ...scribedSkillDefinitions]
  }, [availableSkills, scribedSkillDefinitions])

  const getOrganizedSkillsForDialog = (isUltimate: boolean, barType: BarType) => {
    const filteredSkills = filterSkillsForBar(allSkillsIncludingScribed, isUltimate, barType, {
      primaryBarWeaponSkillLineIds,
      backupBarWeaponSkillLineIds,
      availableArmorSkillLineIds,
      characterSkillLineIds: character.skillLineIds,
      curseState: character.curseState,
    })
    return organizeSkills(filteredSkills, searchFilter, character.skillLineIds)
  }

  const toggleSkillLine = (skillLineKey: string) => {
    setExpandedSkillLines((prev) => {
      const next = new Set(prev)
      if (next.has(skillLineKey)) {
        next.delete(skillLineKey)
      } else {
        next.add(skillLineKey)
      }
      return next
    })
  }

  const expandAllSkillLines = (organizedSkills: readonly CategoryData[]) => {
    const allKeys = organizedSkills.flatMap((cat) =>
      cat.skillLines.map((sl) => `${cat.name}::${sl.displayName}`)
    )
    setExpandedSkillLines(new Set(allKeys))
  }

  const collapseAllSkillLines = () => {
    setExpandedSkillLines(new Set())
  }

  const handleOpenSkillDialog = (bar: BarType, slotId: SkillSlotId) => {
    setEditingSkillSlot({ bar, slotId })
    setSearchFilter("")
    const organized = getOrganizedSkillsForDialog(false, bar)
    const allKeys = organized.flatMap((cat) =>
      cat.skillLines.map((sl) => `${cat.name}::${sl.displayName}`)
    )
    setExpandedSkillLines(new Set(allKeys))
  }

  const handleOpenUltimateDialog = (bar: BarType) => {
    setEditingUltimate(bar)
    setSearchFilter("")
    const organized = getOrganizedSkillsForDialog(true, bar)
    const allKeys = organized.flatMap((cat) =>
      cat.skillLines.map((sl) => `${cat.name}::${sl.displayName}`)
    )
    setExpandedSkillLines(new Set(allKeys))
  }

  const closeDialogs = () => {
    setEditingSkillSlot(null)
    setEditingUltimate(null)
  }

  const findSkillByIdWrapper = (id: SkillId): Skill | undefined => {
    return findSkillById(id, availableSkills, scribedSkillDefinitions)
  }

  const setSkill = (bar: BarType, slotId: SkillSlotId, skillId: SkillId) => {
    const updates: Partial<CharacterState["skills"]> = {}

    const newPrimaryBar = { ...skills["primary-skill-bar"] }
    const newBackupBar = { ...skills["backup-skill-bar"] }

    if (skillId !== "no-skill") {
      if (bar === "primary") {
        const slots = keysOf(newPrimaryBar)
        for (const slot of slots) {
          if (slot !== slotId && newPrimaryBar[slot] === skillId) {
            newPrimaryBar[slot] = "no-skill"
          }
        }
      } else {
        const slots = keysOf(newBackupBar)
        for (const slot of slots) {
          if (slot !== slotId && newBackupBar[slot] === skillId) {
            newBackupBar[slot] = "no-skill"
          }
        }
      }

      const primarySlots = keysOf(newPrimaryBar)
      for (const slot of primarySlots) {
        if (bar === "primary" && slot === slotId) continue
        if (
          areConflictingMorphs(
            newPrimaryBar[slot],
            skillId,
            availableSkills,
            scribedSkillDefinitions
          )
        ) {
          newPrimaryBar[slot] = "no-skill"
        }
      }
      const backupSlots = keysOf(newBackupBar)
      for (const slot of backupSlots) {
        if (bar === "backup" && slot === slotId) continue
        if (
          areConflictingMorphs(
            newBackupBar[slot],
            skillId,
            availableSkills,
            scribedSkillDefinitions
          )
        ) {
          newBackupBar[slot] = "no-skill"
        }
      }
    }

    if (bar === "primary") {
      newPrimaryBar[slotId] = skillId
      updates["primary-skill-bar"] = newPrimaryBar
    } else {
      newBackupBar[slotId] = skillId
      updates["backup-skill-bar"] = newBackupBar
    }

    if (bar !== "primary") {
      let modified = false
      const slots = keysOf(newPrimaryBar)
      for (const slot of slots) {
        if (newPrimaryBar[slot] !== skills["primary-skill-bar"][slot]) {
          modified = true
          break
        }
      }
      if (modified) {
        updates["primary-skill-bar"] = newPrimaryBar
      }
    }
    if (bar !== "backup") {
      let modified = false
      const slots = keysOf(newBackupBar)
      for (const slot of slots) {
        if (newBackupBar[slot] !== skills["backup-skill-bar"][slot]) {
          modified = true
          break
        }
      }
      if (modified) {
        updates["backup-skill-bar"] = newBackupBar
      }
    }

    onUpdateSkills(updates)
    setEditingSkillSlot(null)
  }

  const setUltimate = (bar: BarType, ultId: SkillId) => {
    const updates: Partial<CharacterState["skills"]> = {}

    const newPrimaryBar = { ...skills["primary-skill-bar"] }
    const newBackupBar = { ...skills["backup-skill-bar"] }

    if (ultId !== "no-skill") {
      if (
        bar !== "primary" &&
        areConflictingMorphs(
          skills["primary-skill-bar"]["ultimate"],
          ultId,
          availableSkills,
          scribedSkillDefinitions
        )
      ) {
        newPrimaryBar["ultimate"] = "no-skill"
      }
      if (
        bar !== "backup" &&
        areConflictingMorphs(
          skills["backup-skill-bar"]["ultimate"],
          ultId,
          availableSkills,
          scribedSkillDefinitions
        )
      ) {
        newBackupBar["ultimate"] = "no-skill"
      }
    }

    if (bar === "primary") {
      newPrimaryBar["ultimate"] = ultId
      updates["primary-skill-bar"] = newPrimaryBar
    } else {
      newBackupBar["ultimate"] = ultId
      updates["backup-skill-bar"] = newBackupBar
    }

    if (
      bar !== "primary" &&
      newPrimaryBar["ultimate"] !== skills["primary-skill-bar"]["ultimate"]
    ) {
      updates["primary-skill-bar"] = newPrimaryBar
    }
    if (bar !== "backup" && newBackupBar["ultimate"] !== skills["backup-skill-bar"]["ultimate"]) {
      updates["backup-skill-bar"] = newBackupBar
    }

    onUpdateSkills(updates)
    setEditingUltimate(null)
  }

  return {
    editingSkillSlot,
    editingUltimate,
    searchFilter,
    expandedSkillLines,
    setSearchFilter,
    toggleSkillLine,
    expandAllSkillLines,
    collapseAllSkillLines,
    openSkillDialog: handleOpenSkillDialog,
    openUltimateDialog: handleOpenUltimateDialog,
    closeDialogs,
    setSkill,
    setUltimate,
    getOrganizedSkills: getOrganizedSkillsForDialog,
    findSkill: findSkillByIdWrapper,
  }
}
