import "../characters-public-api/characters-public-api.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { finishPerfTrace, startPerfTrace } from "@akasha/temper-capture-perf/perf-trace"
import {
  saveAccountSkillMorphProgress,
  saveSkillMorphProgress,
} from "@akasha/temper-characters-skills-morphs-addon/skill-morph-tracking"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import { collectMotifKnowledge } from "@akasha/temper-player-completion-state/completion-motif-knowledge"
import {
  getSavedVariables,
  initializeSavedVariables,
  pruneDeletedCharacters,
} from "@akasha/temper-player-completion-state/completion-saved-variables"
import { initializeSkillPointFinder } from "@akasha/temper-skill-point-finder/init"
import { collectAchievements } from "../characters-achievements/characters-achievements.module.code.ts"
import { collectAllianceRank } from "../characters-alliance-rank/characters-alliance-rank.module.code.ts"
import { collectAntiquityLore } from "../characters-antiquity-lore/characters-antiquity-lore.module.code.ts"
import { collectBagSize } from "../characters-bag-size/characters-bag-size.module.code.ts"
import { collectCadwell } from "../characters-cadwell/characters-cadwell.module.code.ts"
import { collectCollectibles } from "../characters-collectibles/characters-collectibles.module.code.ts"
import { registerCommands } from "../characters-commands/characters-commands.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import {
  probeDailyWrits,
  reconcileDailyWritStates,
} from "../characters-daily-writs/characters-daily-writs.module.code.ts"
import { registerBuildEvents } from "../characters-events-build/characters-events-build.module.code.ts"
import { registerCompletionKnowledgeEvents } from "../characters-events-knowledge/characters-events-knowledge.module.code.ts"
import { registerCompletionWorldEvents } from "../characters-events-world/characters-events-world.module.code.ts"
import { registerHirelingMailSubscriber } from "../characters-hireling-mail-subscriber/characters-hireling-mail-subscriber.module.code.ts"
import { collectItemSets } from "../characters-item-sets/characters-item-sets.module.code.ts"
import { saveCharacterList } from "../characters-list/characters-list.module.code.ts"
import { collectLoreLibrary } from "../characters-lore-library/characters-lore-library.module.code.ts"
import { runMigrations } from "../characters-migrations/characters-migrations.module.code.ts"
import { collectMountTraining } from "../characters-mount-training/characters-mount-training.module.code.ts"
import { captureAndSaveCharacterStats } from "../characters-player-stats/characters-player-stats.module.code.ts"
import { collectPointsOfInterest } from "../characters-points-of-interest/characters-points-of-interest.module.code.ts"
import { collectQuests } from "../characters-quests/characters-quests.module.code.ts"
import { collectRecipes } from "../characters-recipes/characters-recipes.module.code.ts"
import { collectScribing } from "../characters-scribing/characters-scribing.module.code.ts"
import {
  saveAccountSkillLineProgress,
  saveSkillLineProgress,
} from "../characters-skill-lines/characters-skill-lines.module.code.ts"
import { updateSkillPoints } from "../characters-skill-points/characters-skill-points.module.code.ts"
import {
  cleanStaleCompletions,
  scheduleTaskAutoCompletionCheck,
} from "../characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import { initializeTaskHud } from "../characters-task-hud/characters-task-hud.module.code.ts"
import { collectTraitResearch } from "../characters-trait-research/characters-trait-research.module.code.ts"
import { collectTributeCardUpgrades } from "../characters-tribute-card-upgrades/characters-tribute-card-upgrades.module.code.ts"
import { toggleWindow } from "../characters-window/characters-window.module.code.ts"
import { collectZoneCompletion } from "../characters-zone-completion/characters-zone-completion.module.code.ts"

const FIRST_READ_DELAY_MS = 3000

function readEverythingOnce(this: void): undefined {
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

  const charEntry = currentCharacterEntry()
  if (charEntry !== undefined) reconcileDailyWritStates(charEntry)

  const savedVars = getSavedVariables()
  savedVars.account.championPointsEarned = GetPlayerChampionPointsEarned()
  savedVars.account.bankUpgrade = {
    current: GetCurrentBankUpgrade(),
    max: GetMaxBankUpgrade(),
  }
  scheduleTaskAutoCompletionCheck()
}

function initialize(): undefined {
  const perfStart = startPerfTrace()
  initializeSavedVariables()
  pruneDeletedCharacters()
  registerCommands()

  runMigrations()

  globalThis.TemperHud?.registerCommand({
    name: "characters",
    description: "Toggle the completion tracker window",
    addon: ADDON_NAME,
    handler: toggleWindow,
  })
  SLASH_COMMANDS["/temperwritprobe"] = probeDailyWrits
  globalThis.TemperHud?.registerCommand({
    name: "/temperwritprobe",
    description: "Probe daily writs",
    addon: ADDON_NAME,
  })

  cleanStaleCompletions()

  initializeTaskHud()

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      captureAndSaveCharacterStats()
      saveCharacterList()
      zo_callLater(readEverythingOnce, FIRST_READ_DELAY_MS)
    }
  )

  registerBuildEvents()
  registerCompletionKnowledgeEvents()
  registerCompletionWorldEvents()
  registerHirelingMailSubscriber()

  getSavedVariables().perf = finishPerfTrace(ADDON_NAME, perfStart)

  initializeSkillPointFinder()
}

registerAddonInit(ADDON_NAME, initialize)
