import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export function collectMountTraining(this: void): undefined {
  const charEntry = currentCharacterEntry()
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
