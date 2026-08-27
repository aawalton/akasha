import "./public-api"

import {
  saveAccountSkillMorphProgress,
  saveSkillMorphProgress,
} from "@temper/game-characters-skills-morphs-addon/tracking/skill-morphs"
import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import { finishPerfTrace, startPerfTrace } from "@temper/shared-capture-perf/perf"
import { registerCommands } from "./commands"
import { ADDON_NAME } from "./constants"
import { registerBuildEvents } from "./events-build"
import { registerCompletionKnowledgeEvents } from "./events-completion-knowledge"
import { registerCompletionWorldEvents } from "./events-completion-world"
import { registerHirelingMailSubscriber } from "./hireling-mail-subscriber"
import { runMigrations } from "./migrations"
import { captureAndSaveCharacterStats } from "./player-stats"
import {
  getSavedVariables,
  initializeSavedVariables,
  pruneDeletedCharacters,
} from "./saved-variables"
import { initializeSkillPointFinder } from "./skill-point-finder/init"
import { cleanStaleCompletions, scheduleTaskAutoCompletionCheck } from "./task-auto-complete"
import { collectAchievements } from "./tracking/achievements"
import { collectAllianceRank } from "./tracking/alliance-rank"
import { collectAntiquityLore } from "./tracking/antiquity-lore"
import { collectBagSize } from "./tracking/bag-size"
import { collectCadwell } from "./tracking/cadwell"
import { saveCharacterList } from "./tracking/characters"
import { collectCollectibles } from "./tracking/collectibles"
import { probeDailyWrits, reconcileDailyWritStates } from "./tracking/daily-writs"
import { collectItemSets } from "./tracking/item-sets"
import { collectLoreLibrary } from "./tracking/lore-library"
import { collectMotifKnowledge } from "./tracking/motif-knowledge"
import { collectMountTraining } from "./tracking/mount-training"
import { collectPointsOfInterest } from "./tracking/points-of-interest"
import { collectQuests } from "./tracking/quests"
import { collectRecipes } from "./tracking/recipes"
import { collectScribing } from "./tracking/scribing"
import { saveAccountSkillLineProgress, saveSkillLineProgress } from "./tracking/skill-lines"
import { updateSkillPoints } from "./tracking/skill-points"
import { collectTraitResearch } from "./tracking/trait-research"
import { collectTributeCardUpgrades } from "./tracking/tribute-card-upgrades"
import { collectZoneCompletion } from "./tracking/zone-completion"
import { InitializeTaskHUD } from "./ui/task-hud"
import { ToggleWindow } from "./ui/window"

declare global {
  var TemperHud:
    | {
        registerCommand: (
          this: void,
          command: {
            name: string
            description: string
            addon: string
            handler?: (this: void, args: string) => undefined
          }
        ) => undefined
      }
    | undefined
}

function Initialize(): undefined {
  const perfStart = startPerfTrace()
  initializeSavedVariables()
  pruneDeletedCharacters()
  registerCommands()

  runMigrations()

  globalThis.TemperHud?.registerCommand({
    name: "characters",
    description: "Toggle the completion tracker window",
    addon: "TemperCharacters",
    handler: ToggleWindow,
  })
  SLASH_COMMANDS["/temperwritprobe"] = probeDailyWrits
  globalThis.TemperHud?.registerCommand({
    name: "/temperwritprobe",
    description: "Probe daily writs",
    addon: "TemperCharacters",
  })

  cleanStaleCompletions()

  InitializeTaskHUD()

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      captureAndSaveCharacterStats()
      saveCharacterList()

      zo_callLater(function (this: void): undefined {
        saveSkillLineProgress()
        saveSkillMorphProgress()
        saveAccountSkillLineProgress()
        saveAccountSkillMorphProgress()
        collectAchievements()
        collectLoreLibrary()
        collectRecipes()
        collectScribing()
        updateSkillPoints()
        collectQuests()
        collectItemSets()
        collectTraitResearch()
        collectAntiquityLore()
        collectCadwell()
        collectCollectibles()
        collectTributeCardUpgrades()
        collectZoneCompletion()
        collectPointsOfInterest()
        collectMountTraining()
        collectBagSize()
        collectAllianceRank()
        collectMotifKnowledge()
        const dwChar = getSavedVariables().characters[GetCurrentCharacterId()]
        if (dwChar !== undefined) reconcileDailyWritStates(dwChar)
        getSavedVariables().account.championPointsEarned = GetPlayerChampionPointsEarned()
        getSavedVariables().account.bankUpgrade = {
          current: GetCurrentBankUpgrade(),
          max: GetMaxBankUpgrade(),
        }
        scheduleTaskAutoCompletionCheck()
      }, 3000)
    }
  )

  registerBuildEvents()
  registerCompletionKnowledgeEvents()
  registerCompletionWorldEvents()
  registerHirelingMailSubscriber()

  getSavedVariables().perf = finishPerfTrace(ADDON_NAME, perfStart)

  initializeSkillPointFinder()
}

registerAddonInit(ADDON_NAME, Initialize)
