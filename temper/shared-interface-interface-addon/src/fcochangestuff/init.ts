import "./public-api"

import { afterLoginOrReloaduiFunctions, noEnlightenedSound } from "./after-login"
import { bankChanges } from "./bank"
import { BGHUDStandardSave, bgModifications } from "./battleground"
import { asString } from "./casts"
import { chatBlacklist, chatDisableNotificationStuff, chatWhisperAndFlaggedAsOffline } from "./chat"
import { collectibleChanges } from "./collectibles-tooltips"
import { favoriteMountChanges } from "./collectibles-mounts"
import { ADDON_NAME, BINDING_NAME_STRINGS, sceneDelays, scenesBlacklisted } from "./constants"
import { craftingModifications, OnEventCraftingStationOpened, saveVolumeLevels } from "./crafting"
import { dialogsChanges } from "./dialogs"
import { snapCursor } from "./functions"
import { CPStuff, GroupElectionStuff } from "./group"
import { GuildHistoryChanges } from "./guild-history"
import { inventoryChanges } from "./inventory"
import { mailStuff } from "./mail"
import {
  addMainMenuButtons,
  addNotificationsButtons,
  FixPlayerSpinFragments,
  hideStuff,
} from "./mainmenu"
import { mapStuff } from "./map"
import { overallFunctions } from "./overall"
import { questChanges } from "./quest"
import { getSettings } from "./settings"
import { buildAddonMenu } from "./settings-menu"
import { skillChanges } from "./skills"
import { slashCommands } from "./slash-commands"
import { soundChanges } from "./sounds"
import { hookStableScene, mountChanges } from "./stable"
import { state } from "./state"
import { tooltipChanges } from "./tooltips"
import { UIChanges } from "./ui"

const EM = EVENT_MANAGER

for (const binding of BINDING_NAME_STRINGS) {
  ZO_CreateStringId(binding[0], binding[1])
}

function disableOldSettings(this: void): undefined {
  state.settingsVars.settings.improvementWith100Percent = false
}

let wasSettingsFragmentShown = false
let wasGameMenuSceneShown = false
let openingNewSceneDirectlyFromSettings: string | undefined

function specialHooks(this: void): undefined {
  function runPlayerSpinFix(this: void): undefined {
    const sceneName = openingNewSceneDirectlyFromSettings
    let scene: Scene | undefined
    let delay: number | undefined
    if (sceneName !== undefined) {
      delay = sceneDelays[sceneName]
      scene = SCENE_MANAGER.GetScene(sceneName)
    }
    if (wasSettingsFragmentShown) {
      const effectiveDelay = delay ?? 0
      zo_callLater(() => {
        if (wasSettingsFragmentShown) {
          wasSettingsFragmentShown = false
          wasGameMenuSceneShown = false
          FixPlayerSpinFragments(scene)
        }
      }, effectiveDelay)
    }
    openingNewSceneDirectlyFromSettings = undefined
  }

  const gameMenuInGameScene = SCENE_MANAGER.GetScene("gameMenuInGame")
  if (gameMenuInGameScene !== undefined) {
    gameMenuInGameScene.RegisterCallback("StateChange", (_oldState: unknown, newState: unknown) => {
      if (newState === SCENE_SHOWN) {
        wasSettingsFragmentShown = false
        wasGameMenuSceneShown = true
      } else if (newState === SCENE_HIDDEN) {
        if (wasSettingsFragmentShown || wasGameMenuSceneShown) {
          runPlayerSpinFix()
        }
      }
    })
  }

  const gameMenuSettingsFragment = OPTIONS_WINDOW_FRAGMENT
  if (gameMenuSettingsFragment !== undefined) {
    gameMenuSettingsFragment.RegisterCallback(
      "StateChange",
      (_oldState: unknown, newState: unknown) => {
        if (newState === SCENE_FRAGMENT_SHOWN) {
          wasSettingsFragmentShown = true
        }
      }
    )
  }

  SecurePostHook(SCENE_MANAGER, "Show", (_sm: unknown, sceneName: unknown) => {
    if (wasSettingsFragmentShown && wasGameMenuSceneShown) {
      if (typeof sceneName === "string") {
        if (scenesBlacklisted[sceneName] === true) {
          return
        }
        openingNewSceneDirectlyFromSettings = sceneName
      }
    }
  })
}

function onPlayerActivated(this: void): undefined {
  if (NO_THANK_YOU_VARS !== undefined) {
    state.otherAddons.NoThankYou = true
  }

  saveVolumeLevels(SETTING_TYPE_AUDIO, AUDIO_SETTING_AUDIO_VOLUME)
  state.runGroupListCounter = 0
  disableOldSettings()

  afterLoginOrReloaduiFunctions()
  overallFunctions()
  hideStuff()
  mapStuff("all")
  mailStuff()
  CPStuff()
  hookStableScene()
  craftingModifications()
  slashCommands()
  addMainMenuButtons()
  inventoryChanges()
  bankChanges()

  state.blacklistKeyWords = [
    ...zo_strsplit("\n", asString(state.settingsVars.settings.chatKeyWords)),
  ]
  chatBlacklist()
  chatDisableNotificationStuff()
  chatWhisperAndFlaggedAsOffline()

  BGHUDStandardSave()
  bgModifications()
  mountChanges()
  GroupElectionStuff()
  soundChanges()
  tooltipChanges()
  snapCursor("-ALL-")
  skillChanges()
  collectibleChanges()
  favoriteMountChanges()
  dialogsChanges()
  GuildHistoryChanges()
  questChanges()
  UIChanges()
  addNotificationsButtons()

  state.playerActivatedDone = true
}

export function initFcoChangeStuff(this: void): undefined {
  if (PerfectPixel !== undefined) {
    state.otherAddons.PerfectPixel = true
  }
  if (NO_THANK_YOU_VARS !== undefined) {
    state.otherAddons.NoThankYou = true
  }

  EM.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED, onPlayerActivated)

  state.originalUnitCPEffectiveFunc = GetUnitEffectiveChampionPoints
  state.originalUnitCPFunc = GetUnitChampionPoints
  state.originalCPFunc = GetLevelOrChampionPointsStringNoIcon

  getSettings()
  noEnlightenedSound()

  state.LSB = LibShifterBox
  state.LAM = LibAddonMenu2
  buildAddonMenu()

  specialHooks()

  EM.RegisterForEvent(ADDON_NAME, EVENT_CRAFTING_STATION_INTERACT, OnEventCraftingStationOpened)
}
