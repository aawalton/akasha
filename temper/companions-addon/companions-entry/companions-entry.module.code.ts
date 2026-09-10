import "../../addon-library-types/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso-types/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import "../companions-globals/companions-globals.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/addon-init/addon-init.module.code.ts"
import {
  finishPerfTrace,
  startPerfTrace,
} from "akasha/temper/capture-perf/perf-trace/perf-trace.module.code.ts"
import { initializeFcoCompanion } from "../companion-qol-init/companion-qol-init.module.code.ts"
import { refreshAllCompanionData } from "../companions-commands/companions-commands.module.code.ts"
import { ADDON_NAME } from "../companions-constants/companions-constants.module.code.ts"
import { createCompanionEquipmentPanel } from "../companions-equipment-panel/companions-equipment-panel.module.code.ts"
import { refreshCompanionEquipmentPanel } from "../companions-equipment-refresh/companions-equipment-refresh.module.code.ts"
import { registerCompanionEvents } from "../companions-events/companions-events.module.code.ts"
import { installCompanionOverviewRapportOverlay } from "../companions-overview-rapport/companions-overview-rapport.module.code.ts"
import { refreshCompanionPanel } from "../companions-panel/companions-panel.module.code.ts"
import {
  getSavedVariables,
  initializeSavedVariables,
  restoreTargetBuildsFromSync,
} from "../companions-saved-variables/companions-saved-variables.module.code.ts"
import { restoreSelectedCompanionId } from "../companions-selector/companions-selector.module.code.ts"
import {
  createCompanionSkillsPanel,
  refreshCompanionSkillsPanel,
} from "../companions-skills-panel/companions-skills-panel.module.code.ts"
import { createCompanionSummaryPanel } from "../companions-summary-panel/companions-summary-panel.module.code.ts"
import { refreshCompanionSummaryPanel } from "../companions-summary-refresh/companions-summary-refresh.module.code.ts"

function registerCompanionSceneCallbacks(): undefined {
  const companionScenes = [
    "companionCharacterKeyboard",
    "companionSkillsKeyboard",
    "companionCollectionBookKeyboard",
  ]

  const onStateChange = (_oldState: number, newState: number): undefined => {
    if (newState === SCENE_HIDING) {
      TemperCharacters.HideWindow()
    }
  }

  for (const sceneName of companionScenes) {
    const scene = SCENE_MANAGER.GetScene(sceneName)
    if (scene !== undefined) {
      scene.RegisterCallback("StateChange", onStateChange)
    }
  }
}

function initialize(): undefined {
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
      "companion-summary": createCompanionSummaryPanel,
      "companion-equipment": createCompanionEquipmentPanel,
      "companion-skills": createCompanionSkillsPanel,
    },
    {
      "companion-companion": refreshCompanionPanel,
      "companion-summary": refreshCompanionSummaryPanel,
      "companion-equipment": refreshCompanionEquipmentPanel,
      "companion-skills": refreshCompanionSkillsPanel,
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

registerAddonInit(ADDON_NAME, initialize)
