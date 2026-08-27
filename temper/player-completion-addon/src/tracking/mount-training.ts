import { getSavedVariables } from "../saved-variables"
export function collectMountTraining(): undefined {
  const charId = GetCurrentCharacterId()
  const charEntry = getSavedVariables().characters[charId]
  if (charEntry === undefined) return
  const [inv, maxInv, sta, maxSta, spd, maxSpd] = GetRidingStats()
  charEntry.mountTraining = {
    speed: spd,
    maxSpeed: maxSpd,
    stamina: sta,
    maxStamina: maxSta,
    carryCapacity: inv,
    maxCarryCapacity: maxInv,
  }
}

export function updateMountTraining(): undefined {
  collectMountTraining()
}
