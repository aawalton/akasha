import {
  type CooldownGroup,
  isDlcDailyContainerByName,
  COOLDOWN_GROUPS as PURE_COOLDOWN_GROUPS,
  DLC_DAILY_DURATION as PURE_DLC_DAILY_DURATION,
  DLC_DAILY_KEYS as PURE_DLC_DAILY_KEYS,
  DLC_DAILY_PATTERNS as PURE_DLC_DAILY_PATTERNS,
  RFTW_GROUP as PURE_RFTW_GROUP,
  findCooldownGroup as pureFindCooldownGroup,
  matchesCooldownGroup as pureMatchesCooldownGroup,
} from "@akasha/temper-items-core/cooldown-groups"
import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getQuestAnnotation } from "../inventory-quest-annotations/inventory-quest-annotations.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
export const RFTW_GROUP = PURE_RFTW_GROUP
export const COOLDOWN_GROUPS = PURE_COOLDOWN_GROUPS
export const DLC_DAILY_PATTERNS = PURE_DLC_DAILY_PATTERNS
export const DLC_DAILY_KEYS = PURE_DLC_DAILY_KEYS
export const DLC_DAILY_DURATION = PURE_DLC_DAILY_DURATION

export function matchesCooldownGroup(
  bagId: number,
  slotIndex: number,
  group: CooldownGroup
): boolean {
  const itemName = GetItemName(bagId, slotIndex)
  return pureMatchesCooldownGroup({ itemName }, group)
}

export function isDlcDailyContainer(bagId: number, slotIndex: number): boolean {
  const itemName = GetItemName(bagId, slotIndex)
  return isDlcDailyContainerByName({ itemName })
}

export function resolveDlcDailyKeys(bagId: number, slotIndex: number): string[] | undefined {
  if (!isDlcDailyContainer(bagId, slotIndex)) return undefined
  const annotation = getQuestAnnotation(bagId, slotIndex)
  if (annotation !== undefined) {
    return [DLC_DAILY_KEYS[annotation.questType]]
  }
  return [DLC_DAILY_KEYS["delve"], DLC_DAILY_KEYS["group-boss"], DLC_DAILY_KEYS["world-event"]]
}

export function isCooldownActiveForAnyKey(keys: string[]): boolean {
  const sv = getSavedVariables()
  const now = GetTimeStamp()
  for (const key of keys) {
    const expiry = sv.openCooldowns?.[key]
    if (expiry !== undefined && now < expiry) return true
  }
  return false
}

export function isOpenCooldownEnabled(): boolean {
  return getInventoryConfig().safety?.openCooldownProtection !== false
}

export function findCooldownGroup(bagId: number, slotIndex: number): CooldownGroup | undefined {
  const itemName = GetItemName(bagId, slotIndex)
  return pureFindCooldownGroup({ itemName })
}

export function isCooldownActiveForGroup(group: CooldownGroup): boolean {
  const sv = getSavedVariables()
  const expiry = sv.openCooldowns?.[group.key]
  return expiry !== undefined && GetTimeStamp() < expiry
}

export function getActiveCooldownGroup(
  bagId: number,
  slotIndex: number
): CooldownGroup | undefined {
  const group = findCooldownGroup(bagId, slotIndex)
  if (!group) return undefined
  if (isCooldownActiveForGroup(group)) return group
  return undefined
}

export function shouldBlockOpen(bagId: number, slotIndex: number): boolean {
  const group = findCooldownGroup(bagId, slotIndex)
  if (group) return isCooldownActiveForGroup(group)

  const dlcKeys = resolveDlcDailyKeys(bagId, slotIndex)
  if (dlcKeys) return isCooldownActiveForAnyKey(dlcKeys)

  return false
}

export function isAnyCooldownActive(bagId: number, slotIndex: number): boolean {
  return shouldBlockOpen(bagId, slotIndex)
}

export function isRftwContainer(bagId: number, slotIndex: number): boolean {
  const itemName = GetItemName(bagId, slotIndex)
  return pureMatchesCooldownGroup({ itemName }, RFTW_GROUP)
}

export function isGameCooldownActive(bagId: number, slotIndex: number): boolean {
  const [remain] = GetItemCooldownInfo(bagId, slotIndex)
  return remain > 0
}

export function getDlcDailyCooldownRemaining(bagId: number, slotIndex: number): number | undefined {
  const dlcKeys = resolveDlcDailyKeys(bagId, slotIndex)
  if (!dlcKeys) return undefined
  const sv = getSavedVariables()
  const now = GetTimeStamp()
  let shortest: number | undefined
  for (const key of dlcKeys) {
    const expiry = sv.openCooldowns?.[key]
    if (expiry !== undefined && now < expiry) {
      const remaining = expiry - now
      if (shortest === undefined || remaining < shortest) shortest = remaining
    }
  }
  return shortest
}

export function onContainerOpenedForCooldown(bagId: number, slotIndex: number): undefined {
  if (!isOpenCooldownEnabled()) return

  for (const group of COOLDOWN_GROUPS) {
    if (!matchesCooldownGroup(bagId, slotIndex, group)) continue
    if (isCooldownActiveForGroup(group)) {
      d(`[${ADDON_NAME}] Container opened — ${group.key} cooldown already active, not resetting`)
      return
    }
    const sv = getSavedVariables()
    if (!sv.openCooldowns) sv.openCooldowns = {}
    sv.openCooldowns[group.key] = GetTimeStamp() + group.durationSeconds
    d(
      `[${ADDON_NAME}] Container opened — ${group.key} cooldown set for ${group.durationSeconds / 3600}h`
    )
    return
  }

  if (!isDlcDailyContainer(bagId, slotIndex)) return
  const annotation = getQuestAnnotation(bagId, slotIndex)
  if (annotation !== undefined) {
    const key = DLC_DAILY_KEYS[annotation.questType]
    if (isCooldownActiveForAnyKey([key])) {
      d(`[${ADDON_NAME}] Container opened — ${key} cooldown already active, not resetting`)
      return
    }
    const sv = getSavedVariables()
    if (!sv.openCooldowns) sv.openCooldowns = {}
    sv.openCooldowns[key] = GetTimeStamp() + DLC_DAILY_DURATION
    d(`[${ADDON_NAME}] Container opened — ${key} cooldown set for ${DLC_DAILY_DURATION / 3600}h`)
  } else {
    const sv = getSavedVariables()
    if (!sv.openCooldowns) sv.openCooldowns = {}
    const now = GetTimeStamp()
    const expiry = now + DLC_DAILY_DURATION
    for (const key of [
      DLC_DAILY_KEYS["delve"],
      DLC_DAILY_KEYS["group-boss"],
      DLC_DAILY_KEYS["world-event"],
    ]) {
      const existing = sv.openCooldowns[key]
      if (existing !== undefined && now < existing) continue
      sv.openCooldowns[key] = expiry
    }
    d(
      `[${ADDON_NAME}] DLC daily container opened without annotation — cooldowns written for inactive keys`
    )
  }
}

export function cleanupExpiredCooldowns(): undefined {
  const sv = getSavedVariables()
  if (!sv.openCooldowns) return

  const now = GetTimeStamp()
  let remaining = 0
  for (const [key, expiry] of Object.entries(sv.openCooldowns)) {
    if (expiry <= now) {
      delete sv.openCooldowns[key]
    } else {
      remaining++
    }
  }

  if (remaining === 0) {
    sv.openCooldowns = undefined
  }
}
