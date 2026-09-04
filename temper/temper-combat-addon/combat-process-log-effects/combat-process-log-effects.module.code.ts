import type {
  CmxFight,
  CoreLogLine,
  EffectInstance,
  EffectStackData,
  ResourceAbilityData,
  ResourceData,
} from "@akasha/temper-combat-addon/combat-core-types"
import {
  acquireEffectData,
  acquireResourceData,
  acquireStatData,
  acquireUnitData,
  checkInstance,
  getCalculated,
} from "@akasha/temper-combat-addon/combat-fight-model"
import { ABILITY_ID_ZEN } from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  isEffectLogLine,
  isPlayerStatsLogLine,
  isResourcesLogLine,
} from "@akasha/temper-combat-addon/combat-lib-log-lines"
import { countSlots, updateUnitStats } from "@akasha/temper-combat-addon/combat-unit-stats"

function getStackData(instance: EffectInstance | undefined, stacks: number): EffectStackData {
  const stackData = instance !== undefined ? instance[stacks] : undefined
  if (stackData === undefined) {
    error("effect stack data missing during log processing")
  }
  return stackData
}

export function processLogEffects(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isEffectLogLine(logline)) {
    return undefined
  }
  const timems = logline[1]
  const unitId = logline[2]
  const abilityId = logline[3]
  const changeType = logline[4]
  const effectType = logline[5]
  const stacks = logline[6]
  const sourceType = logline[7]
  const slotId = logline[8]

  const currentstacks = stacks ?? 0

  if (timems < fight.combatstart - 500 || unitId == null || fight.units[unitId] == null) {
    return undefined
  }

  const unit = acquireUnitData(fight, unitId, timems)
  const effectdata = acquireEffectData(unit, abilityId, effectType, currentstacks)

  const isPlayerSource =
    sourceType === COMBAT_UNIT_TYPE_PLAYER || sourceType === COMBAT_UNIT_TYPE_PLAYER_PET

  const slots = effectdata.slots
  if (slots === undefined) {
    error("effect slots missing during log processing")
  }
  let [slotcount, groupSlotCount] = countSlots(slots)

  let slotdata = slots[slotId]

  if (
    (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) &&
    timems < fight.endtime
  ) {
    const starttime = zo_max(timems, fight.starttime)

    if (slotcount === 0 && isPlayerSource) {
      effectdata.firstStartTime = starttime
    }
    if (groupSlotCount === 0) {
      effectdata.firstGroupStartTime = starttime
    }

    if (slotdata === undefined) {
      slotdata = {
        isPlayerSource: isPlayerSource,
        abilityId: abilityId,
      }

      slots[slotId] = slotdata
    }

    const minStacks = abilityId === ABILITY_ID_ZEN ? 0 : 1

    for (let stackLevel = minStacks; stackLevel <= currentstacks; stackLevel++) {
      if (slotdata[stackLevel] == null) {
        slotdata[stackLevel] = starttime
        checkInstance(effectdata, abilityId, stackLevel)
      }
    }

    const instance = effectdata.instances[abilityId]

    for (const [stackLevel, stackStarttime] of pairs(slotdata)) {
      if (
        typeof stackLevel === "number" &&
        typeof stackStarttime === "number" &&
        stackLevel > currentstacks
      ) {
        const stackData = getStackData(instance, stackLevel)
        const duration = zo_min(timems, fight.endtime) - stackStarttime

        if (isPlayerSource) {
          stackData.uptime = stackData.uptime + duration
          stackData.count = stackData.count + 1
        }

        stackData.groupUptime = stackData.groupUptime + duration
        stackData.groupCount = stackData.groupCount + 1

        delete slotdata[stackLevel]
      }
    }
  } else if (changeType === EFFECT_RESULT_FADED) {
    delete slots[slotId]

    if (slotdata !== undefined && timems > fight.starttime) {
      if (slotdata.isPlayerSource === true) {
        slotcount = slotcount - 1
      }
      groupSlotCount = groupSlotCount - 1

      delete slotdata.isPlayerSource
      delete slotdata.abilityId

      const instance = effectdata.instances[abilityId]

      for (const [stackLevel, stackStarttime] of pairs(slotdata)) {
        if (typeof stackLevel !== "number" || typeof stackStarttime !== "number") {
          continue
        }
        const stackData = getStackData(instance, stackLevel)
        const duration = zo_min(timems, fight.endtime) - stackStarttime

        if (isPlayerSource) {
          stackData.uptime = stackData.uptime + duration
          stackData.count = stackData.count + 1
        }

        stackData.groupUptime = stackData.groupUptime + duration
        stackData.groupCount = stackData.groupCount + 1
      }

      if (slotcount === 0 && effectdata.firstStartTime != null) {
        const duration = zo_min(timems, fight.endtime) - effectdata.firstStartTime

        effectdata.uptime = effectdata.uptime + duration
        effectdata.count = effectdata.count + 1

        effectdata.firstStartTime = undefined
      }

      if (groupSlotCount === 0 && effectdata.firstGroupStartTime != null) {
        const duration = zo_min(timems, fight.endtime) - effectdata.firstGroupStartTime

        effectdata.groupUptime = effectdata.groupUptime + duration
        effectdata.groupCount = effectdata.groupCount + 1

        effectdata.firstGroupStartTime = undefined
      }
    }
  }

  updateUnitStats(unit, fight, effectdata, abilityId)
  return undefined
}

function isUltimateResourceData(data: ResourceData | ResourceAbilityData): data is ResourceData {
  return "totalgains" in data
}

export function processLogResources(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isResourcesLogLine(logline)) {
    return undefined
  }
  const abilityId = logline[2] ?? 0
  const powerValueChange = logline[3]
  const powerType = logline[4]

  if (powerType === COMBAT_MECHANIC_FLAGS_HEALTH) {
    return undefined
  }

  const resourceData = acquireResourceData(fight, abilityId, powerValueChange, powerType)

  const change = zo_abs(powerValueChange)

  if (isUltimateResourceData(resourceData)) {
    const tablekey = powerValueChange >= 0 ? "totalgains" : "totaldrains"
    resourceData[tablekey] = resourceData[tablekey] + change
  } else {
    resourceData.value = resourceData.value + change
    resourceData.ticks = resourceData.ticks + 1
  }
  return undefined
}

export function processLogStats(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isPlayerStatsLogLine(logline)) {
    return undefined
  }
  const newvalue = logline[3]
  const statId = logline[4]

  const data = getCalculated(fight)

  const temp = data.temp
  if (temp === undefined) {
    error("processLogStats called outside a calculation pass")
  }
  temp.stats[statId] = newvalue

  const statData = acquireStatData(fight, statId)

  statData.max = zo_max(newvalue, statData.max)
  statData.min = zo_min(newvalue, statData.min)
  return undefined
}
