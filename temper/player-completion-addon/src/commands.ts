import {
  saveAccountSkillMorphProgress,
  saveSkillMorphProgress,
} from "@temper/game-characters-skills-morphs-addon/tracking/skill-morphs"
import { getCharactersConfig } from "./characters-config"
import { captureAndSaveCharacterStats } from "./player-stats"
import { getSavedVariables } from "./saved-variables"
import { collectAchievements } from "./tracking/achievements"
import { collectAllianceRank } from "./tracking/alliance-rank"
import { refreshAllAntiquityLore } from "./tracking/antiquity-lore"
import { collectBagSize } from "./tracking/bag-size"
import { collectCadwell } from "./tracking/cadwell"
import { saveCharacterList } from "./tracking/characters"
import { refreshAllCollectibles } from "./tracking/collectibles"
import { refreshAllItemSets } from "./tracking/item-sets"
import { collectLoreLibrary } from "./tracking/lore-library"
import { collectMotifKnowledge } from "./tracking/motif-knowledge"
import { collectMountTraining } from "./tracking/mount-training"
import { collectPointsOfInterest } from "./tracking/points-of-interest"
import { collectQuests } from "./tracking/quests"
import { refreshAllRecipes } from "./tracking/recipes"
import { collectScribing } from "./tracking/scribing"
import { saveAccountSkillLineProgress, saveSkillLineProgress } from "./tracking/skill-lines"
import { updateSkillPoints } from "./tracking/skill-points"
import { refreshAllTraitResearch } from "./tracking/trait-research"
import { refreshAllTributeCardUpgrades } from "./tracking/tribute-card-upgrades"
import { collectZoneCompletion } from "./tracking/zone-completion"
import { RefreshTaskHUD } from "./ui/task-hud"

declare global {
  var TemperCompanions_RefreshAllData: (() => void) | undefined
  var TemperCompanions_ResetAllData: (() => void) | undefined
}

export function refreshAllData(): undefined {
  const savedVars = getSavedVariables()
  const charId = GetCurrentCharacterId()

  captureAndSaveCharacterStats()
  saveCharacterList()

  const charEntry = savedVars.characters[charId]
  if (charEntry !== undefined) {
    charEntry.skillLineProgress = undefined
    charEntry.achievements = undefined
    charEntry.scribing = undefined
    charEntry.quests = undefined
  }
  savedVars.account.subclassingSkillLineProgress = undefined

  saveSkillLineProgress()
  saveSkillMorphProgress()
  saveAccountSkillLineProgress()
  saveAccountSkillMorphProgress()
  collectAchievements()
  collectLoreLibrary()
  refreshAllRecipes()
  collectScribing()
  updateSkillPoints()
  refreshAllTraitResearch()
  refreshAllItemSets()
  refreshAllAntiquityLore()
  refreshAllCollectibles()
  refreshAllTributeCardUpgrades()
  collectQuests()
  collectCadwell()
  collectZoneCompletion()
  collectPointsOfInterest()
  collectMountTraining()
  collectBagSize()
  collectAllianceRank()
  collectMotifKnowledge()
  savedVars.account.championPointsEarned = GetPlayerChampionPointsEarned()

  globalThis.TemperCompanions_RefreshAllData?.()
}

export function onTemperRefreshCommand(this: void): undefined {
  d("[Temper] Refreshing all data...")
  refreshAllData()
  d("[Temper] All data refreshed")
}

export function onTemperResetCommand(this: void): undefined {
  d("[Temper] Resetting all saved variables...")

  const savedVars = getSavedVariables()
  savedVars.navigation = { selectedTab: "character", selectedSubTab: "character-character" }
  savedVars.characters = {}
  savedVars.account = { achievements: {} }

  globalThis.TemperCompanions_ResetAllData?.()

  refreshAllData()
  d("[Temper] All data refreshed")
  d("[Temper] Reset complete")
}

export function resetTaskCompletion(id: string): number {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  let cleared = 0
  const cfg = getCharactersConfig()
  for (const [taskId, task] of Object.entries(cfg.tasks)) {
    if (taskId !== id && task.completionCardId !== id) continue
    const scoped = task.scope === "all_characters" || task.scope === "next_character"
    const key = scoped ? `${taskId}:${charId}` : taskId
    if (sv.completions[key] !== undefined) {
      delete sv.completions[key]
      cleared++
    }
    if (sv.taskProgressSnapshots[key] !== undefined) {
      delete sv.taskProgressSnapshots[key]
    }
  }
  return cleared
}

export function onTemperTaskResetCommand(this: void, args: string): undefined {
  const id = args.trim()
  if (id === "") {
    d("[Temper] Usage: /tempertaskreset <taskId | completionCardId>")
    return
  }
  const cleared = resetTaskCompletion(id)
  if (cleared === 0) {
    d(`[Temper] No completions cleared — no task matched "${id}" or none were complete.`)
    return
  }
  d(`[Temper] Cleared ${cleared} completion(s) matching "${id}".`)
  RefreshTaskHUD()
}

export function registerCommands(): undefined {
  SLASH_COMMANDS["/temperrefresh"] = onTemperRefreshCommand
  SLASH_COMMANDS["/temperreset"] = onTemperResetCommand
  SLASH_COMMANDS["/tempertaskreset"] = onTemperTaskResetCommand

  for (const entry of [
    { name: "/temperrefresh", description: "Refresh all completion data" },
    { name: "/temperreset", description: "Reset all saved data" },
    { name: "/tempertaskreset", description: "Clear a task's completion" },
  ]) {
    globalThis.TemperHud?.registerCommand({
      name: entry.name,
      description: entry.description,
      addon: "TemperCharacters",
    })
  }
}
