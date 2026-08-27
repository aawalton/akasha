import { muteMountSound } from "./sounds"
import { state } from "./state"

export const stableSkills: Record<number, { maxed?: boolean }> = {}

const tesoStableFeedTypes: number[] = [
  RIDING_TRAIN_SPEED,
  RIDING_TRAIN_STAMINA,
  RIDING_TRAIN_CARRYING_CAPACITY,
]

const tesoStableFeedButtons: Record<number, Control> = {
  [RIDING_TRAIN_SPEED]: ZO_StablePanelSpeedTrainRowTrainButton,
  [RIDING_TRAIN_STAMINA]: ZO_StablePanelStaminaTrainRowTrainButton,
  [RIDING_TRAIN_CARRYING_CAPACITY]: ZO_StablePanelCarryTrainRowTrainButton,
}

export function checkIfAllStableButtonsAreMaxedOut(this: void): boolean {
  let retVar = false
  let maxCnt = 0
  for (const [, stableFeedType] of ipairs(tesoStableFeedTypes)) {
    if (stableSkills[stableFeedType]?.maxed === true) {
      maxCnt = maxCnt + 1
    }
  }
  if (maxCnt >= tesoStableFeedTypes.length) {
    retVar = true
  }
  return retVar
}

export function checkIfOtherStableButtonsAreMaxedOut(
  this: void,
  stableFeedType: number | undefined
): boolean {
  if (stableFeedType === undefined) {
    return false
  }
  let retVar = false
  let maxCnt = 0
  for (const [, otherStableFeedType] of ipairs(tesoStableFeedTypes)) {
    if (otherStableFeedType !== stableFeedType) {
      if (stableSkills[otherStableFeedType]?.maxed === true) {
        maxCnt = maxCnt + 1
      }
    }
  }
  if (maxCnt >= tesoStableFeedTypes.length - 1) {
    retVar = true
  }
  return retVar
}

let stableSceneStateChangeRegistered = false

export function hookStableScene(this: void): undefined {
  getRidingTrainInfo()

  if (!stableSceneStateChangeRegistered) {
    STABLES_SCENE.RegisterCallback(
      "StateChange",
      (_oldState: number, newState: number): undefined => {
        if (newState === SCENE_SHOWN) {
          const stableFeedSettings = state.settingsVars.settings.stableFeedSettings
          if (stableFeedSettings !== undefined) {
            for (const [stableFeedType, hideItRaw] of pairs(stableFeedSettings)) {
              let hideIt = hideItRaw
              const allOtherStableButtonsAreMaxedOut =
                checkIfOtherStableButtonsAreMaxedOut(stableFeedType)
              if (allOtherStableButtonsAreMaxedOut) {
                hideIt = false
              }
              if (hideIt === true && tesoStableFeedButtons[stableFeedType] !== undefined) {
                tesoStableFeedButtons[stableFeedType].SetHidden(true)
              }
            }
          }
        }
      }
    )
    stableSceneStateChangeRegistered = true
  }
}

export function getRidingTrainInfo(this: void): undefined {
  for (const [, stableFeedType] of ipairs(tesoStableFeedTypes)) {
    if (stableSkills[stableFeedType] === undefined) {
      stableSkills[stableFeedType] = {}
    }
  }
  const carrySkill = stableSkills[RIDING_TRAIN_CARRYING_CAPACITY] ?? {}
  stableSkills[RIDING_TRAIN_CARRYING_CAPACITY] = carrySkill
  const staminaSkill = stableSkills[RIDING_TRAIN_STAMINA] ?? {}
  stableSkills[RIDING_TRAIN_STAMINA] = staminaSkill
  const speedSkill = stableSkills[RIDING_TRAIN_SPEED] ?? {}
  stableSkills[RIDING_TRAIN_SPEED] = speedSkill
  const settings = state.settingsVars.settings
  const stableFeedSettings = settings.stableFeedSettings
  if (checkIfAllStableButtonsAreMaxedOut()) {
    stableFeedSettings[RIDING_TRAIN_CARRYING_CAPACITY] = false
    stableFeedSettings[RIDING_TRAIN_STAMINA] = false
    stableFeedSettings[RIDING_TRAIN_SPEED] = false
  } else {
    const [
      inventoryBonus,
      maxInventoryBonus,
      staminaBonus,
      maxStaminaBonus,
      speedBonus,
      maxSpeedBonus,
    ] = GetRidingStats()
    if (inventoryBonus >= maxInventoryBonus) {
      carrySkill.maxed = true
      stableFeedSettings[RIDING_TRAIN_CARRYING_CAPACITY] = false
    } else {
      carrySkill.maxed = false
    }
    if (staminaBonus >= maxStaminaBonus) {
      staminaSkill.maxed = true
      stableFeedSettings[RIDING_TRAIN_STAMINA] = false
    } else {
      staminaSkill.maxed = false
    }
    if (speedBonus >= maxSpeedBonus) {
      speedSkill.maxed = true
      stableFeedSettings[RIDING_TRAIN_SPEED] = false
    } else {
      speedSkill.maxed = false
    }
  }
}

export function mountChanges(this: void): undefined {
  muteMountSound()
}
