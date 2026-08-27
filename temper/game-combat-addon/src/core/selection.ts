import { getDb } from "../saved-variables"
import {
  basicTable,
  type CategoryKey,
  CategoryList,
  createBasicValues,
  sumUnitTables,
} from "./categories"
import { getCalculated } from "./fight-model"
import type {
  BasicValues,
  CmxFight,
  DamageCategory,
  EffectInstance,
  EffectStackData,
  SelectedBuff,
  SelectionData,
  SelectionState,
} from "./types"

export const lastfights: CmxFight[] = []

export function checkNumberOfFights(): undefined {
  const db = getDb()
  if (lastfights.length > db.fighthistory) {
    let fighttodelete = 1

    if (db.keepbossfights) {
      for (let i = 1; i <= lastfights.length - 1; i++) {
        const fight = lastfights[i - 1]
        if (fight !== undefined && fight.bossfight !== true) {
          fighttodelete = i
          break
        }
      }
    }

    table.remove(lastfights, fighttodelete)
  }
  return undefined
}

export function getFightName(fight: CmxFight): undefined {
  let bigunitname = "Unkown"
  let dmgmax = 0

  for (const [, unitData] of pairs(fight.units)) {
    if (fight.bossfight === true && unitData.bossId != null && unitData.damageOutTotal > dmgmax) {
      bigunitname = unitData.name
      if (unitData.bossId === 1) {
        break
      }
      dmgmax = unitData.damageOutTotal
    } else if (unitData.unitType === COMBAT_UNIT_TYPE_NONE && unitData.damageOutTotal > dmgmax) {
      bigunitname = unitData.name
      dmgmax = unitData.damageOutTotal
    }
  }

  fight.fightlabel = fight.fightlabel ?? bigunitname
  return undefined
}

let showOverHeal = false

export function getShowOverHeal(): boolean {
  return showOverHeal
}

export function setShowOverHeal(value: boolean): undefined {
  showOverHeal = value
  return undefined
}

let selectiondata: SelectionData | undefined

export function getSelectionData(): SelectionData | undefined {
  return selectiondata
}

const categoryTotalKeys = {
  damageOut: "damageOutTotal",
  damageIn: "damageInTotal",
  healingOut: "healingOutTotal",
  healingIn: "healingInTotal",
} as const satisfies Record<DamageCategory, CategoryKey>

export function generateSelectionStats(
  fight: CmxFight | undefined,
  menuItem: DamageCategory,
  selections: SelectionState
): SelectionData | undefined {
  if (fight == null) {
    return undefined
  }

  const abilityselection = selections.ability[menuItem]
  const unitselection = selections.unit[menuItem]

  const useOverHeal = showOverHeal && menuItem === "healingOut"

  const data = getCalculated(fight)

  const selectionUnits: Record<number, BasicValues> = {}
  const selectionBuffs: Record<string, SelectedBuff> = {}
  const selection: SelectionData = {
    ...createBasicValues(),
    units: selectionUnits,
    buffs: selectionBuffs,
    totalValueSum: 0,
  }

  let totalValueSum = 0
  const totalkey: CategoryKey = useOverHeal ? "healingOutAbsolute" : categoryTotalKeys[menuItem]

  for (const [unitId] of pairs(unitselection ?? data.units)) {
    let unitTotalValue = 0

    const unit = data.units[unitId]

    if ((abilityselection != null || unitselection != null) && unit != null) {
      const selectedunit: BasicValues = createBasicValues()
      const selectedAbilities = selectedunit[menuItem]
      const abilitytable = unit[menuItem]

      for (const [abilityId, ability] of pairs(abilitytable)) {
        selectedAbilities[abilityId] = ability

        if (abilityselection == null) {
          ZO_DeepTableCopy(unit, selectedunit)
        } else if (ability != null && abilityselection[abilityId] != null) {
          for (const [, key] of ipairs(CategoryList[menuItem])) {
            selectedunit[key] = (selectedunit[key] ?? 0) + (ability[key] ?? 0)
          }
        }
      }

      selectionUnits[unitId] = selectedunit

      unitTotalValue = unit[totalkey] ?? 0
      totalValueSum = totalValueSum + unitTotalValue

      sumUnitTables(selection, selectedunit, basicTable)
    }

    const unitData = fight.units[unitId]

    const isNotEmpty = unitTotalValue > 0 || (unit != null && NonContiguousCount(unit.buffs) > 0)
    const isEnemy =
      unitData != null &&
      unitData.unitType !== COMBAT_UNIT_TYPE_GROUP &&
      unitData.unitType !== COMBAT_UNIT_TYPE_PLAYER_PET &&
      unitData.unitType !== COMBAT_UNIT_TYPE_PLAYER
    const isDamageCategory = menuItem === "damageIn" || menuItem === "damageOut"

    if (isNotEmpty && isEnemy === isDamageCategory && unitData != null && unit != null) {
      for (const [name, buff] of pairs(unit.buffs)) {
        const selectedbuff: SelectedBuff = selectionBuffs[name] ?? {
          uptime: 0,
          count: 0,
          groupUptime: 0,
          groupCount: 0,
          maxStacks: 0,
          effectType: buff.effectType,
        }

        selectedbuff.uptime = selectedbuff.uptime + buff.uptime
        selectedbuff.count = selectedbuff.count + buff.count
        selectedbuff.groupUptime = selectedbuff.groupUptime + buff.groupUptime
        selectedbuff.groupCount = selectedbuff.groupCount + buff.groupCount

        selectedbuff.maxStacks = zo_max(selectedbuff.maxStacks, buff.maxStacks ?? 0)

        if (buff.instances != null) {
          const selinstances = selectedbuff.instances

          if (selinstances == null) {
            const copy: Record<number, EffectInstance> = {}
            selectedbuff.instances = copy
            ZO_DeepTableCopy(buff.instances, copy)
          } else {
            for (const [abilityId, instance] of pairs(buff.instances)) {
              const selInstance = selinstances[abilityId]

              if (instance != null && selInstance == null) {
                const copy: EffectInstance = {}
                selinstances[abilityId] = copy
                ZO_DeepTableCopy(instance, copy)
              } else if (instance != null && selInstance != null) {
                for (let stacks = 1; stacks <= selectedbuff.maxStacks; stacks++) {
                  const stackdata = instance[stacks]
                  const selstackdata = selInstance[stacks]

                  if (stackdata != null && selstackdata == null) {
                    const copy: EffectStackData = {
                      uptime: 0,
                      count: 0,
                      groupUptime: 0,
                      groupCount: 0,
                    }
                    selInstance[stacks] = copy
                    ZO_DeepTableCopy(stackdata, copy)
                  } else if (stackdata != null && selstackdata != null) {
                    selstackdata.uptime = selstackdata.uptime + stackdata.uptime
                    selstackdata.count = selstackdata.count + stackdata.count
                    selstackdata.groupUptime = selstackdata.groupUptime + stackdata.groupUptime
                    selstackdata.groupCount = selstackdata.groupCount + stackdata.groupCount
                  }
                }

                selInstance.uptime = (selInstance.uptime ?? 0) + (instance.uptime ?? 0)
                selInstance.count = (selInstance.count ?? 0) + (instance.count ?? 0)
                selInstance.groupUptime =
                  (selInstance.groupUptime ?? 0) + (instance.groupUptime ?? 0)
                selInstance.groupCount = (selInstance.groupCount ?? 0) + (instance.groupCount ?? 0)
              }
            }
          }
        }

        selectedbuff.effectType = buff.effectType

        if (data.buffVersion == null) {
          selectedbuff.icon = buff.icon
        } else if (data.buffVersion >= 2) {
          selectedbuff.iconId = selectedbuff.iconId ?? buff.iconId
        }

        selectionBuffs[name] = selectedbuff
      }

      const fightEndTime = fight.endtime ?? fight.dpsend ?? 0
      const unitEndTime = unit.endtime ?? unitData.dpsend ?? 0
      const fightStartTime = fight.starttime ?? fight.dpsstart ?? 0
      const unitStartTime = unit.starttime ?? unitData.dpsstart ?? 0
      const startTime = zo_max(fightStartTime, unitStartTime)
      const endTime = zo_min(fightEndTime, unitEndTime)
      selection.totalUnitTime = (selection.totalUnitTime ?? 0) + (endTime - startTime)
    }
  }

  selection.totalValueSum = totalValueSum

  selectiondata = selection

  return selection
}
