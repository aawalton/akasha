import { muteMountSound } from "../fco-sounds/fco-sounds.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

export const STABLE_SKILLS: Record<number, { maxed?: boolean }> = {}

const STABLE_FEED_TYPES: number[] = [
  RIDING_TRAIN_SPEED,
  RIDING_TRAIN_STAMINA,
  RIDING_TRAIN_CARRYING_CAPACITY,
]

const STABLE_FEED_BUTTONS: Record<number, Control> = {
  [RIDING_TRAIN_SPEED]: ZO_StablePanelSpeedTrainRowTrainButton,
  [RIDING_TRAIN_STAMINA]: ZO_StablePanelStaminaTrainRowTrainButton,
  [RIDING_TRAIN_CARRYING_CAPACITY]: ZO_StablePanelCarryTrainRowTrainButton,
}

export function checkIfAllStableButtonsAreMaxedOut(this: void): boolean {
  let retVar = false
  let maxCnt = 0
  for (const [, stableFeedType] of ipairs(STABLE_FEED_TYPES)) {
    if (STABLE_SKILLS[stableFeedType]?.maxed === true) {
      maxCnt = maxCnt + 1
    }
  }
  if (maxCnt >= STABLE_FEED_TYPES.length) {
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
  for (const [, otherStableFeedType] of ipairs(STABLE_FEED_TYPES)) {
    if (otherStableFeedType !== stableFeedType) {
      if (STABLE_SKILLS[otherStableFeedType]?.maxed === true) {
        maxCnt = maxCnt + 1
      }
    }
  }
  if (maxCnt >= STABLE_FEED_TYPES.length - 1) {
    retVar = true
  }
  return retVar
}

let STABLE_SCENE_STATE_CHANGE_REGISTERED = false

export function hookStableScene(this: void): undefined {
  getRidingTrainInfo()

  if (!STABLE_SCENE_STATE_CHANGE_REGISTERED) {
    STABLES_SCENE.RegisterCallback(
      "StateChange",
      (_oldState: number, newState: number): undefined => {
        if (newState === SCENE_SHOWN) {
          const stableFeedSettings = STATE.settingsVars.settings.stableFeedSettings
          if (stableFeedSettings !== undefined) {
            for (const [stableFeedType, hideItRaw] of pairs(stableFeedSettings)) {
              let hideIt = hideItRaw
              const allOtherStableButtonsAreMaxedOut =
                checkIfOtherStableButtonsAreMaxedOut(stableFeedType)
              if (allOtherStableButtonsAreMaxedOut) {
                hideIt = false
              }
              if (hideIt === true && STABLE_FEED_BUTTONS[stableFeedType] !== undefined) {
                STABLE_FEED_BUTTONS[stableFeedType].SetHidden(true)
              }
            }
          }
        }
      }
    )
    STABLE_SCENE_STATE_CHANGE_REGISTERED = true
  }
}

export function getRidingTrainInfo(this: void): undefined {
  for (const [, stableFeedType] of ipairs(STABLE_FEED_TYPES)) {
    if (STABLE_SKILLS[stableFeedType] === undefined) {
      STABLE_SKILLS[stableFeedType] = {}
    }
  }
  const carrySkill = STABLE_SKILLS[RIDING_TRAIN_CARRYING_CAPACITY] ?? {}
  STABLE_SKILLS[RIDING_TRAIN_CARRYING_CAPACITY] = carrySkill
  const staminaSkill = STABLE_SKILLS[RIDING_TRAIN_STAMINA] ?? {}
  STABLE_SKILLS[RIDING_TRAIN_STAMINA] = staminaSkill
  const speedSkill = STABLE_SKILLS[RIDING_TRAIN_SPEED] ?? {}
  STABLE_SKILLS[RIDING_TRAIN_SPEED] = speedSkill
  const settings = STATE.settingsVars.settings
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
