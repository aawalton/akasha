import { asStringRecord } from "../fco-casts/fco-casts.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

const SM = SCENE_MANAGER
const scenes = SM.scenes

const origEnlightenedSound = SOUNDS.ENLIGHTENED_STATE_GAINED ?? ""

const writableSounds = asStringRecord(SOUNDS)

export function noEnlightenedSound(this: void): undefined {
  const settings = STATE.settingsVars.settings
  if (settings.noEnlightenedSound === true) {
    writableSounds.ENLIGHTENED_STATE_GAINED = SOUNDS.NONE ?? ""
  } else {
    writableSounds.ENLIGHTENED_STATE_GAINED = origEnlightenedSound
  }
}

const gameMenuSceneSetState = (...args: unknown[]): boolean => {
  const newState = args[1]
  if (newState === SCENE_SHOWN) {
    STATE.gameMenuSceneActive = true
  }
  return false
}

const crownStoreAdvertisementsSetState = (...args: unknown[]): boolean => {
  const newState = args[1]
  if (newState === SCENE_SHOWN) {
    if (STATE.gameMenuSceneActive) {
      STATE.gameMenuSceneActive = false
      return false
    }

    const settings = STATE.settingsVars.settings
    const doNotShowCrownStoreAdvertisements = settings.noShopAdvertisementPopup === true
    if (doNotShowCrownStoreAdvertisements) {
      SM.ShowBaseScene()
    }
    return doNotShowCrownStoreAdvertisements
  }
  return false
}

const HOOK_WAS_DONE = {
  gameMenuInGame: false,
  marketAnnouncement: false,
}

export function noShopAdvertisement(this: void): undefined {
  const settings = STATE.settingsVars.settings
  if (settings.noShopAdvertisementPopup !== true) {
    return
  }
  const gameMenuInGame = scenes.gameMenuInGame
  if (gameMenuInGame !== undefined && !HOOK_WAS_DONE.gameMenuInGame) {
    ZO_PreHook(gameMenuInGame, "SetState", gameMenuSceneSetState)
    HOOK_WAS_DONE.gameMenuInGame = true
  }
  const marketAnnouncement = scenes.marketAnnouncement
  if (marketAnnouncement !== undefined && !HOOK_WAS_DONE.marketAnnouncement) {
    ZO_PreHook(marketAnnouncement, "SetState", crownStoreAdvertisementsSetState)
    HOOK_WAS_DONE.marketAnnouncement = true
  }
}

export function afterLoginOrReloaduiFunctions(this: void): undefined {
  noShopAdvertisement()
}
