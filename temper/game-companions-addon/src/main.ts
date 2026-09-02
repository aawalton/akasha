import "./public-api"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { finishPerfTrace, startPerfTrace } from "@akasha/temper-capture-perf/perf-trace"
import { refreshAllCompanionData } from "./commands"
import { initializeFcoCompanion } from "./companion-qol/init"
import { ADDON_NAME } from "./constants"
import { registerCompanionEvents } from "./events-companion"
import {
  getSavedVariables,
  initializeSavedVariables,
  restoreTargetBuildsFromSync,
} from "./saved-variables"
import {
  CreateCompanionEquipmentPanel,
  RefreshCompanionEquipmentPanel,
} from "./ui/companion-equipment-panel"
import { installCompanionOverviewRapportOverlay } from "./ui/companion-overview-rapport"
import { RefreshCompanionPanel } from "./ui/companion-panel"
import { restoreSelectedCompanionId } from "./ui/companion-selector"
import {
  CreateCompanionSkillsPanel,
  RefreshCompanionSkillsPanel,
} from "./ui/companion-skills-panel"
import {
  CreateCompanionSummaryPanel,
  RefreshCompanionSummaryPanel,
} from "./ui/companion-summary-panel"

function registerCompanionSceneCallbacks(): undefined {
  const companionScenes = [
    "companionCharacterKeyboard",
    "companionSkillsKeyboard",
    "companionCollectionBookKeyboard",
  ]

  const OnStateChange = (_oldState: number, newState: number): undefined => {
    if (newState === SCENE_HIDING) {
      TemperCharacters.HideWindow()
    }
  }

  for (const sceneName of companionScenes) {
    const scene = SCENE_MANAGER.GetScene(sceneName)
    if (scene !== undefined) {
      scene.RegisterCallback("StateChange", OnStateChange)
    }
  }
}

function Initialize(): undefined {
  const perfStart = startPerfTrace()
  initializeSavedVariables()
  restoreSelectedCompanionId()
  restoreTargetBuildsFromSync()
  registerCompanionSceneCallbacks()
  installCompanionOverviewRapportOverlay()

  TemperCharacters.TabManager.RegisterExternalTab(
    {
      id: "companion",
      title: "Companion",
      subTabs: [
        { id: "companion-summary", title: "Summary" },
        { id: "companion-equipment", title: "Equipment" },
        { id: "companion-skills", title: "Skills" },
      ],
    },
    {
      "companion-summary": CreateCompanionSummaryPanel,
      "companion-equipment": CreateCompanionEquipmentPanel,
      "companion-skills": CreateCompanionSkillsPanel,
    },
    {
      "companion-companion": RefreshCompanionPanel,
      "companion-summary": RefreshCompanionSummaryPanel,
      "companion-equipment": RefreshCompanionEquipmentPanel,
      "companion-skills": RefreshCompanionSkillsPanel,
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      refreshAllCompanionData()
    }
  )

  registerCompanionEvents()

  getSavedVariables().perf = finishPerfTrace(ADDON_NAME, perfStart)

  initializeFcoCompanion()
}

registerAddonInit(ADDON_NAME, Initialize)
