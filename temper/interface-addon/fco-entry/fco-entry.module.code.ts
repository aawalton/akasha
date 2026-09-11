import "akasha/temper/interface-addon/fco-global/fco-global.module.code.ts"

import {
  afterLoginOrReloaduiFunctions,
  noEnlightenedSound,
} from "akasha/temper/interface-addon/fco-after-login/fco-after-login.module.code.ts"
import { bankChanges } from "akasha/temper/interface-addon/fco-bank/fco-bank.module.code.ts"
import {
  bGHUDStandardSave,
  bgModifications,
} from "akasha/temper/interface-addon/fco-battleground/fco-battleground.module.code.ts"
import { asString } from "akasha/temper/interface-addon/fco-casts/fco-casts.module.code.ts"
import {
  chatBlacklist,
  chatDisableNotificationStuff,
  chatWhisperAndFlaggedAsOffline,
} from "akasha/temper/interface-addon/fco-chat/fco-chat.module.code.ts"
import { favoriteMountChanges } from "akasha/temper/interface-addon/fco-collectibles-mounts/fco-collectibles-mounts.module.code.ts"
import { collectibleChanges } from "akasha/temper/interface-addon/fco-collectibles-tooltips/fco-collectibles-tooltips.module.code.ts"
import {
  ADDON_NAME,
  BINDING_NAME_STRINGS,
  SCENE_DELAYS,
  SCENES_BLACKLISTED,
} from "akasha/temper/interface-addon/fco-constants/fco-constants.module.code.ts"
import {
  craftingModifications,
  onEventCraftingStationOpened,
  saveVolumeLevels,
} from "akasha/temper/interface-addon/fco-crafting/fco-crafting.module.code.ts"
import { dialogsChanges } from "akasha/temper/interface-addon/fco-dialogs/fco-dialogs.module.code.ts"
import { snapCursor } from "akasha/temper/interface-addon/fco-functions/fco-functions.module.code.ts"
import {
  cPStuff,
  groupElectionStuff,
} from "akasha/temper/interface-addon/fco-group/fco-group.module.code.ts"
import { guildHistoryChanges } from "akasha/temper/interface-addon/fco-guild-history/fco-guild-history.module.code.ts"
import { inventoryChanges } from "akasha/temper/interface-addon/fco-inventory/fco-inventory.module.code.ts"
import { mailStuff } from "akasha/temper/interface-addon/fco-mail/fco-mail.module.code.ts"
import {
  addMainMenuButtons,
  addNotificationsButtons,
  fixPlayerSpinFragments,
  hideStuff,
} from "akasha/temper/interface-addon/fco-mainmenu/fco-mainmenu.module.code.ts"
import { mapStuff } from "akasha/temper/interface-addon/fco-map/fco-map.module.code.ts"
import { overallFunctions } from "akasha/temper/interface-addon/fco-overall/fco-overall.module.code.ts"
import { questChanges } from "akasha/temper/interface-addon/fco-quest/fco-quest.module.code.ts"
import { getSettings } from "akasha/temper/interface-addon/fco-settings/fco-settings.module.code.ts"
import { buildAddonMenu } from "akasha/temper/interface-addon/fco-settings-menu/fco-settings-menu.module.code.ts"
import { skillChanges } from "akasha/temper/interface-addon/fco-skills/fco-skills.module.code.ts"
import { slashCommands } from "akasha/temper/interface-addon/fco-slash-commands/fco-slash-commands.module.code.ts"
import { soundChanges } from "akasha/temper/interface-addon/fco-sounds/fco-sounds.module.code.ts"
import {
  hookStableScene,
  mountChanges,
} from "akasha/temper/interface-addon/fco-stable/fco-stable.module.code.ts"
import { STATE } from "akasha/temper/interface-addon/fco-state/fco-state.module.code.ts"
import { tooltipChanges } from "akasha/temper/interface-addon/fco-tooltips/fco-tooltips.module.code.ts"
import { uiChanges } from "akasha/temper/interface-addon/fco-ui/fco-ui.module.code.ts"

const EM = EVENT_MANAGER

for (const binding of BINDING_NAME_STRINGS) {
  ZO_CreateStringId(binding[0], binding[1])
}

function disableOldSettings(this: void): undefined {
  STATE.settingsVars.settings.improvementWith100Percent = false
}

let WAS_SETTINGS_FRAGMENT_SHOWN = false
let WAS_GAME_MENU_SCENE_SHOWN = false
let openingNewSceneDirectlyFromSettings: string | undefined

function specialHooks(this: void): undefined {
  function runPlayerSpinFix(this: void): undefined {
    const sceneName = openingNewSceneDirectlyFromSettings
    let scene: Scene | undefined
    let delay: number | undefined
    if (sceneName !== undefined) {
      delay = SCENE_DELAYS[sceneName]
      scene = SCENE_MANAGER.GetScene(sceneName)
    }
    if (WAS_SETTINGS_FRAGMENT_SHOWN) {
      const effectiveDelay = delay ?? 0
      zo_callLater(() => {
        if (WAS_SETTINGS_FRAGMENT_SHOWN) {
          WAS_SETTINGS_FRAGMENT_SHOWN = false
          WAS_GAME_MENU_SCENE_SHOWN = false
          fixPlayerSpinFragments(scene)
        }
      }, effectiveDelay)
    }
    openingNewSceneDirectlyFromSettings = undefined
  }

  const gameMenuInGameScene = SCENE_MANAGER.GetScene("gameMenuInGame")
  if (gameMenuInGameScene !== undefined) {
    gameMenuInGameScene.RegisterCallback("StateChange", (_oldState: unknown, newState: unknown) => {
      if (newState === SCENE_SHOWN) {
        WAS_SETTINGS_FRAGMENT_SHOWN = false
        WAS_GAME_MENU_SCENE_SHOWN = true
      } else if (newState === SCENE_HIDDEN) {
        if (WAS_SETTINGS_FRAGMENT_SHOWN || WAS_GAME_MENU_SCENE_SHOWN) {
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
          WAS_SETTINGS_FRAGMENT_SHOWN = true
        }
      }
    )
  }

  SecurePostHook(SCENE_MANAGER, "Show", (_sm: unknown, sceneName: unknown) => {
    if (WAS_SETTINGS_FRAGMENT_SHOWN && WAS_GAME_MENU_SCENE_SHOWN) {
      if (typeof sceneName === "string") {
        if (SCENES_BLACKLISTED[sceneName] === true) {
          return
        }
        openingNewSceneDirectlyFromSettings = sceneName
      }
    }
  })
}

function onPlayerActivated(this: void): undefined {
  if (NO_THANK_YOU_VARS !== undefined) {
    STATE.otherAddons.NoThankYou = true
  }

  saveVolumeLevels(SETTING_TYPE_AUDIO, AUDIO_SETTING_AUDIO_VOLUME)
  STATE.runGroupListCounter = 0
  disableOldSettings()

  afterLoginOrReloaduiFunctions()
  overallFunctions()
  hideStuff()
  mapStuff("all")
  mailStuff()
  cPStuff()
  hookStableScene()
  craftingModifications()
  slashCommands()
  addMainMenuButtons()
  inventoryChanges()
  bankChanges()

  STATE.blacklistKeyWords = [
    ...zo_strsplit("\n", asString(STATE.settingsVars.settings.chatKeyWords)),
  ]
  chatBlacklist()
  chatDisableNotificationStuff()
  chatWhisperAndFlaggedAsOffline()

  bGHUDStandardSave()
  bgModifications()
  mountChanges()
  groupElectionStuff()
  soundChanges()
  tooltipChanges()
  snapCursor("-ALL-")
  skillChanges()
  collectibleChanges()
  favoriteMountChanges()
  dialogsChanges()
  guildHistoryChanges()
  questChanges()
  uiChanges()
  addNotificationsButtons()

  STATE.playerActivatedDone = true
}

export function initFcoChangeStuff(this: void): undefined {
  if (PerfectPixel !== undefined) {
    STATE.otherAddons.PerfectPixel = true
  }
  if (NO_THANK_YOU_VARS !== undefined) {
    STATE.otherAddons.NoThankYou = true
  }

  EM.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED, onPlayerActivated)

  STATE.originalUnitCPEffectiveFunc = GetUnitEffectiveChampionPoints
  STATE.originalUnitCPFunc = GetUnitChampionPoints
  STATE.originalCPFunc = GetLevelOrChampionPointsStringNoIcon

  getSettings()
  noEnlightenedSound()

  STATE.LSB = LibShifterBox
  STATE.LAM = LibAddonMenu2
  buildAddonMenu()

  specialHooks()

  EM.RegisterForEvent(ADDON_NAME, EVENT_CRAFTING_STATION_INTERACT, onEventCraftingStationOpened)
}
