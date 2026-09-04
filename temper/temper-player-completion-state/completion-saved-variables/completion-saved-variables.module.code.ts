import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-record"
import type { CompletionOverride } from "@akasha/temper-player-completion/completion-override"
import { deleteRecordKey } from "@akasha/utils-narrow/delete-record-key"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import {
  ADDON_NAME,
  SAVED_VARIABLES_NAME,
} from "../completion-addon-constants/completion-addon-constants.module.code.ts"
import type { DailyWritStates } from "../completion-daily-writs-state/completion-daily-writs-state.module.code.ts"
import type { SparseMotifKnowledge } from "../completion-motif-knowledge/completion-motif-knowledge.module.code.ts"
import { charactersToPrune } from "../completion-prune-characters/completion-prune-characters.module.code.ts"

export interface SavedNavigation {
  selectedTab: string
  selectedSubTab: string
  windowPosition?: { left: number; top: number }
}

export type SavedCharacterEntry = CharacterCompletion & {
  name: string
  priorityOrder?: number
  motifKnowledge?: SparseMotifKnowledge
  dailyWritStates?: DailyWritStates
}

export interface TaskData {
  title: string
  description?: string
  rrule?: string
  dueDate?: string
  dueTime?: string
  scope: string
  esoCharacterId?: string
  sortOrder: number
  priority?: string
  completionCardId?: string
  completionItemPath?: (string | number)[]
}

export interface SavedVariablesData {
  navigation: SavedNavigation
  account: AccountCompletion
  characters: Record<string, SavedCharacterEntry>
  tasks: Record<string, TaskData>
  completions: Record<string, number>
  taskProgressSnapshots: Record<string, { date: string; value: number; charId?: string }>
  characterPriority: string[]
  completionOverrides?: Record<string, CompletionOverride[]>
  taskPanelPosition: { x: number; y: number } | undefined
  guildSalesPostedDate?: string
  hirelingMails?: { date: string; count: number }
  migrationVersions: Record<string, number>
  perf?: { loadTimeMs: number }
}

const SAVED_VARIABLES_DEFAULTS: SavedVariablesData & Record<string, unknown> = {
  navigation: { selectedTab: "character", selectedSubTab: "character-character" },
  characters: {},
  account: { achievements: {} },
  characterPriority: [],
  tasks: {},
  completions: {},
  taskProgressSnapshots: {},
  taskPanelPosition: undefined,
  migrationVersions: {},
}

export let savedVarsInstance: SavedVariablesData | undefined

export function initializeSavedVariables(): SavedVariablesData {
  const raw = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    3,
    undefined,
    SAVED_VARIABLES_DEFAULTS
  )

  migrateFromFlatStructure(raw)
  savedVarsInstance = raw
  migrateFromTemperSavedVars()

  return savedVarsInstance
}

export function migrateFromFlatStructure(
  sv: SavedVariablesData & Record<string, unknown>
): undefined {
  const hasOldKeys =
    sv["builds"] !== undefined ||
    sv["selectedTab"] !== undefined ||
    sv["companionBuilds"] !== undefined ||
    sv["selectedBuilds"] !== undefined ||
    sv["targetBuildHashes"] !== undefined

  if (!hasOldKeys) return

  if (sv.navigation === undefined) {
    sv.navigation = {
      selectedTab: "character",
      selectedSubTab: "character-character",
    }
  }
  const oldSelectedTab = sv["selectedTab"]
  if (typeof oldSelectedTab === "string") {
    sv.navigation.selectedTab = oldSelectedTab
  }
  const oldSelectedSubTab = sv["selectedSubTab"]
  if (typeof oldSelectedSubTab === "string") {
    sv.navigation.selectedSubTab = oldSelectedSubTab
  }
  const oldWindowPosition = sv["windowPosition"]
  if (
    typeof oldWindowPosition === "object" &&
    oldWindowPosition !== null &&
    "left" in oldWindowPosition &&
    "top" in oldWindowPosition &&
    typeof oldWindowPosition.left === "number" &&
    typeof oldWindowPosition.top === "number"
  ) {
    sv.navigation.windowPosition = { left: oldWindowPosition.left, top: oldWindowPosition.top }
  }

  if (sv.characters === undefined) {
    sv.characters = {}
  }

  sv["selectedTab"] = undefined
  sv["selectedSubTab"] = undefined
  sv["windowPosition"] = undefined
  sv["selectedCompanionId"] = undefined
  sv["companionBuilds"] = undefined
  sv["selectedBuilds"] = undefined
  sv["targetBuildHashes"] = undefined
  sv["builds"] = undefined
  sv["validation"] = undefined
}

function isOptionalRecord(value: unknown): boolean {
  return value === undefined || isObjectRecord(value)
}

function isOptionalArray(value: unknown): boolean {
  return value === undefined || Array.isArray(value)
}

function isOptionalNumber(value: unknown): boolean {
  return value === undefined || typeof value === "number"
}

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === "string"
}

function isSavedCharacterEntry(x: unknown): x is SavedCharacterEntry {
  if (!isObjectRecord(x)) return false
  if (typeof x["name"] !== "string") return false
  if (!isOptionalString(x["buildHash"])) return false
  if (!isOptionalNumber(x["gender"])) return false
  if (!isOptionalNumber(x["level"])) return false
  if (!isOptionalNumber(x["classId"])) return false
  if (!isOptionalNumber(x["allianceId"])) return false
  if (!isOptionalNumber(x["raceId"])) return false
  if (!isOptionalString(x["curseState"])) return false
  if (!isOptionalString(x["className"])) return false
  if (!isOptionalString(x["classIcon"])) return false
  if (!isOptionalRecord(x["achievements"])) return false
  if (!isOptionalRecord(x["skillLineProgress"])) return false
  if (!isOptionalRecord(x["loreLibrary"])) return false
  if (!isOptionalRecord(x["recipes"])) return false
  if (!isOptionalRecord(x["scribing"])) return false
  if (!isOptionalRecord(x["skillPoints"])) return false
  if (!isOptionalRecord(x["traitResearch"])) return false
  if (!isOptionalRecord(x["companionRapport"])) return false
  if (!isOptionalArray(x["quests"])) return false
  if (!isOptionalRecord(x["cadwell"])) return false
  if (!isOptionalRecord(x["zoneCompletion"])) return false
  if (!isOptionalRecord(x["pointsOfInterest"])) return false
  if (!isOptionalRecord(x["mountTraining"])) return false
  if (!isOptionalNumber(x["bagSize"])) return false
  if (!isOptionalNumber(x["allianceRank"])) return false
  if (!isOptionalRecord(x["dailyWrits"])) return false
  if (!isOptionalRecord(x["dailyWritStates"])) return false
  if (!isOptionalRecord(x["motifKnowledge"])) return false
  return true
}

function isAccountCompletion(x: unknown): x is AccountCompletion {
  if (!isObjectRecord(x)) return false
  if (!isObjectRecord(x["achievements"])) return false
  if (!isOptionalRecord(x["itemSets"])) return false
  if (!isOptionalRecord(x["antiquityLore"])) return false
  if (!isOptionalNumber(x["championPointsEarned"])) return false
  if (!isOptionalArray(x["collectibles"])) return false
  if (!isOptionalRecord(x["subclassingSkillLineProgress"])) return false
  if (!isOptionalRecord(x["tributeCardUpgrades"])) return false
  const bankUpgrade = x["bankUpgrade"]
  if (bankUpgrade !== undefined) {
    if (!isObjectRecord(bankUpgrade)) return false
    if (typeof bankUpgrade["current"] !== "number") return false
    if (typeof bankUpgrade["max"] !== "number") return false
  }
  if (!isOptionalRecord(x["grandMasterStations"])) return false
  return true
}

export interface CharactersConfigGlobal {
  readonly version: number
  readonly characterPriority?: readonly string[]
  readonly tasks?: Record<string, TaskData>
  readonly completionOverrides?: Record<string, CompletionOverride[]>
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

  const oldCharacters = oldData["characters"]
  if (isObjectRecord(oldCharacters)) {
    for (const [id, entry] of Object.entries(oldCharacters)) {
      if (!isSavedCharacterEntry(entry)) continue
      if (sv.characters[id] === undefined) sv.characters[id] = entry
    }
  }

  const oldAccount = oldData["account"]
  if (
    isAccountCompletion(oldAccount) &&
    (sv.account.achievements === undefined || Object.keys(sv.account.achievements).length === 0)
  ) {
    sv.account = oldAccount
  }

  const oldNavigation = oldData["navigation"]
  if (isObjectRecord(oldNavigation)) {
    const oldWindowPosition = oldNavigation["windowPosition"]
    if (
      isObjectRecord(oldWindowPosition) &&
      typeof oldWindowPosition["left"] === "number" &&
      typeof oldWindowPosition["top"] === "number"
    ) {
      sv.navigation.windowPosition = {
        left: oldWindowPosition["left"],
        top: oldWindowPosition["top"],
      }
    }
    const oldSelectedTab = oldNavigation["selectedTab"]
    if (typeof oldSelectedTab === "string") {
      sv.navigation.selectedTab = oldSelectedTab
    }
    const oldSelectedSubTab = oldNavigation["selectedSubTab"]
    if (typeof oldSelectedSubTab === "string") {
      sv.navigation.selectedSubTab = oldSelectedSubTab
    }
  }
}

export function getSavedVariables(): SavedVariablesData {
  if (!savedVarsInstance) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return savedVarsInstance
}

export function pruneDeletedCharacters(): undefined {
  const savedVars = getSavedVariables()

  const activeCharacterIds: string[] = []
  const numCharacters = GetNumCharacters()
  for (let i = 1; i <= numCharacters; i++) {
    const [, , , , , , characterId] = GetCharacterInfo(i)
    activeCharacterIds.push(characterId)
  }

  const toPrune = charactersToPrune(Object.keys(savedVars.characters), activeCharacterIds)
  for (const charId of toPrune) {
    deleteRecordKey(savedVars.characters, charId)
  }

  if (toPrune.length > 0) {
    d(`[${ADDON_NAME}] Pruned ${toPrune.length} deleted character(s) from saved variables`)
  }
}
