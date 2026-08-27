import { getSavedVariables } from "./saved-variables"

let scenes: Record<string, Scene | undefined> = {}
let chatScene: Scene | undefined

export function dontRotateGameCamera(this: void, doOverrideNoCameraSpin?: boolean): undefined {
  const SV = getSavedVariables()
  const doOverride = doOverrideNoCameraSpin ?? false

  const emotesFragments: SceneFragment[] = [
    FRAME_PLAYER_FRAGMENT,
    FRAME_EMOTE_FRAGMENT_INVENTORY,
    FRAME_EMOTE_FRAGMENT_SKILLS,
    FRAME_EMOTE_FRAGMENT_JOURNAL,
    FRAME_EMOTE_FRAGMENT_MAP,
    FRAME_EMOTE_FRAGMENT_SOCIAL,
    FRAME_EMOTE_FRAGMENT_AVA,
    FRAME_EMOTE_FRAGMENT_SYSTEM,
    FRAME_EMOTE_FRAGMENT_LOOT,
    FRAME_EMOTE_FRAGMENT_CHAMPION,
  ]

  const blacklistedScenes: Record<string, boolean> = {
    market: true,
    crownCrateGamepad: true,
    crownCrateKeyboard: true,
    keyboard_housing_furniture_scene: true,
    gamepad_housing_furniture_scene: true,
    dyeStampConfirmationGamepad: true,
    dyeStampConfirmationKeyboard: true,
    outfitStylesBook: true,
    stats: false,
    inventory: false,
  }

  function changeScenesBehavior(this: void, disableFragments: boolean): undefined {
    for (const [, scene] of pairs(scenes)) {
      if (scene !== undefined) {
        const toRestore = scene.toRestore
        if (toRestore !== undefined && typeof toRestore !== "boolean") {
          for (const [, fragment] of ipairs(toRestore)) {
            scene.AddFragment(fragment)
          }
        }
      }
    }
    scenes = {}
    if (disableFragments) {
      if (SV.noCameraSpin) {
        blacklistedScenes.stats = !SV.noCameraSpinStats
        blacklistedScenes.inventory = !SV.noCameraSpinInv
      }
      for (const [name, scene] of pairs(SCENE_MANAGER.scenes)) {
        if (scene !== undefined && blacklistedScenes[name] !== true) {
          let toRestore: SceneFragment[] | undefined
          for (const fragmentToRemove of emotesFragments) {
            if (scene.HasFragment(fragmentToRemove)) {
              scene.RemoveFragment(fragmentToRemove)
              if (toRestore === undefined) {
                toRestore = []
                scene.toRestore = toRestore
                scenes[name] = scene
              }
              toRestore.push(fragmentToRemove)
            }
          }
        }
      }
    }
  }

  const doDisableFragments = doOverride || SV.noCameraSpin
  changeScenesBehavior(doDisableFragments)
}

export function disableChatMinimize(this: void): undefined {
  const SV = getSavedVariables()
  const fragmentToRemove = MINIMIZE_CHAT_FRAGMENT
  const scene = TRADING_HOUSE_SCENE

  if (SV.chatForTradingHouse) {
    if (scene.HasFragment(fragmentToRemove)) {
      scene.RemoveFragment(fragmentToRemove)
      chatScene = scene
      chatScene.toRestore = true
    }
  } else if (chatScene !== undefined && chatScene.toRestore === true) {
    chatScene.AddFragment(fragmentToRemove)
  }
}
