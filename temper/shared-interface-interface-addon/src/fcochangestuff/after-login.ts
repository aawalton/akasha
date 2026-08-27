import { asStringRecord } from "./casts"
import { state } from "./state"

const SM = SCENE_MANAGER
const scenes = SM.scenes

const origEnlightenedSound = SOUNDS.ENLIGHTENED_STATE_GAINED ?? ""

const writableSounds = asStringRecord(SOUNDS)

export function noEnlightenedSound(this: void): undefined {
  const settings = state.settingsVars.settings
  if (settings.noEnlightenedSound === true) {
    writableSounds.ENLIGHTENED_STATE_GAINED = SOUNDS.NONE ?? ""
  } else {
    writableSounds.ENLIGHTENED_STATE_GAINED = origEnlightenedSound
  }
}

const gameMenuSceneSetState = (...args: unknown[]): boolean => {
  const newState = args[1]
  if (newState === SCENE_SHOWN) {
    state.gameMenuSceneActive = true
  }
  return false
}

const crownStoreAdvertisementsSetState = (...args: unknown[]): boolean => {
  const newState = args[1]
  if (newState === SCENE_SHOWN) {
    if (state.gameMenuSceneActive) {
      state.gameMenuSceneActive = false
      return false
    }

    const settings = state.settingsVars.settings
    const doNotShowCrownStoreAdvertisements = settings.noShopAdvertisementPopup === true
    if (doNotShowCrownStoreAdvertisements) {
      SM.ShowBaseScene()
    }
    return doNotShowCrownStoreAdvertisements
  }
  return false
}

const hookWasDone = {
  gameMenuInGame: false,
  marketAnnouncement: false,
}

export function noShopAdvertisement(this: void): undefined {
  const settings = state.settingsVars.settings
  if (settings.noShopAdvertisementPopup !== true) {
    return
  }
  const gameMenuInGame = scenes.gameMenuInGame
  if (gameMenuInGame !== undefined && !hookWasDone.gameMenuInGame) {
    ZO_PreHook(gameMenuInGame, "SetState", gameMenuSceneSetState)
    hookWasDone.gameMenuInGame = true
  }
  const marketAnnouncement = scenes.marketAnnouncement
  if (marketAnnouncement !== undefined && !hookWasDone.marketAnnouncement) {
    ZO_PreHook(marketAnnouncement, "SetState", crownStoreAdvertisementsSetState)
    hookWasDone.marketAnnouncement = true
  }
}

export function afterLoginOrReloaduiFunctions(this: void): undefined {
  noShopAdvertisement()
}
