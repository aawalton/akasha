import "@akasha/temper-eso-types/eso-api"
import { requireNumericKey } from "@akasha/temper-narrow/require-numeric-key"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import {
  SAVED_VARIABLES_DEFAULTS,
  SAVED_VARIABLES_NAME,
} from "../companions-constants/companions-constants.module.code.ts"
export interface SavedCompanionEquipmentSlot {
  displayText: string
  qualityColor: [number, number, number]
  isEmpty: boolean
}

export interface SavedCompanionBuild {
  hash: string
  companionId: number
  armor: SavedCompanionEquipmentSlot[]
  jewelry: SavedCompanionEquipmentSlot[]
  weapons: SavedCompanionEquipmentSlot[]
  mainHandWeaponType: number
  skillAbilityIds: number[]
}

export interface SavedCompanionEntry {
  build?: SavedCompanionBuild
  selectedBuild?: string
  targetBuildHash?: string
  level?: number
  currentXP?: number
  rapport?: number
  skillLineProgress?: Record<number, SkillLineProgress>
}

export interface SkillLineProgress {
  currentRank: number
  currentXP: number
  nextRankXP: number
}

export interface SavedVariablesData {
  companions: Record<number, SavedCompanionEntry>
  selectedCompanionId?: number
  companionTargetBuilds?: Record<number, string>
  companionTargetTimestamps?: Record<number, number>
  perf?: { loadTimeMs: number }
}

export let savedVarsInstance: SavedVariablesData | undefined

export function initializeSavedVariables(): SavedVariablesData {
  savedVarsInstance = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    SAVED_VARIABLES_DEFAULTS
  )

  migrateFromTemperSavedVars()

  return savedVarsInstance
}

function isSavedCompanionEntry(x: unknown): x is SavedCompanionEntry {
  if (!isObjectRecord(x)) return false
  const build = x["build"]
  if (build !== undefined && !isObjectRecord(build)) return false
  const selectedBuild = x["selectedBuild"]
  if (selectedBuild !== undefined && typeof selectedBuild !== "string") return false
  const targetBuildHash = x["targetBuildHash"]
  if (targetBuildHash !== undefined && typeof targetBuildHash !== "string") return false
  const level = x["level"]
  if (level !== undefined && typeof level !== "number") return false
  const currentXP = x["currentXP"]
  if (currentXP !== undefined && typeof currentXP !== "number") return false
  const rapport = x["rapport"]
  if (rapport !== undefined && typeof rapport !== "number") return false
  const skillLineProgress = x["skillLineProgress"]
  if (skillLineProgress !== undefined && !isObjectRecord(skillLineProgress)) return false
  return true
}

export function migrateFromTemperSavedVars(): undefined {
  const oldVars: unknown = globalThis.Temper_SavedVariables
  if (!isObjectRecord(oldVars)) return

  const defaultTable = oldVars["Default"]
  if (!isObjectRecord(defaultTable)) return

  let oldData: Record<string, unknown> | undefined
  for (const [, accountEntry] of Object.entries(defaultTable)) {
    if (!isObjectRecord(accountEntry)) continue
    const accountWide = accountEntry["$AccountWide"]
    if (isObjectRecord(accountWide)) {
      oldData = accountWide
      break
    }
  }
  if (oldData === undefined) return

  const sv = getSavedVariables()

  const oldCompanions = oldData["companions"]
  if (isObjectRecord(oldCompanions)) {
    for (const [idStr, entry] of Object.entries(oldCompanions)) {
      if (!isSavedCompanionEntry(entry)) continue
      const id = requireNumericKey(idStr, "oldCompanions key")
      if (sv.companions[id] === undefined) sv.companions[id] = entry
    }
  }

  const oldNavigation = oldData["navigation"]
  if (isObjectRecord(oldNavigation)) {
    const oldSelectedCompanionId = oldNavigation["selectedCompanionId"]
    if (typeof oldSelectedCompanionId === "number" && sv.selectedCompanionId === undefined) {
      sv.selectedCompanionId = oldSelectedCompanionId
    }
  }
}

export function getSavedVariables(): SavedVariablesData {
  if (!savedVarsInstance) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return savedVarsInstance
}

export function setSavedVarsInstanceForTesting(value: SavedVariablesData | undefined): undefined {
  savedVarsInstance = value
}

export function ensureCompanionEntry(companionId: number): SavedCompanionEntry {
  const savedVars = getSavedVariables()
  let entry = savedVars.companions[companionId]
  if (entry === undefined) {
    entry = {}
    savedVars.companions[companionId] = entry
  }
  return entry
}

function isCompanionsConfig(value: unknown): value is CompanionsConfigGlobal {
  if (typeof value !== "object" || value === null) return false
  if (!("version" in value)) return false
  return typeof value.version === "number"
}

function getActiveCompanionsConfig(): CompanionsConfigGlobal | undefined {
  const candidate: unknown = globalThis.TemperCompanionsConfig
  if (!isCompanionsConfig(candidate)) return undefined
  if (candidate.version <= 0) return undefined
  return candidate
}

export function restoreTargetBuildsFromSync(): undefined {
  const sideFile = getActiveCompanionsConfig()
  const targetBuilds = sideFile?.companionTargetBuilds ?? getSavedVariables().companionTargetBuilds
  if (targetBuilds === undefined) return

  for (const [defIdStr, hash] of Object.entries(targetBuilds)) {
    const defId = tonumber(defIdStr)
    if (defId === undefined || hash === undefined || hash === "") continue
    ensureCompanionEntry(defId).targetBuildHash = hash
  }
}
