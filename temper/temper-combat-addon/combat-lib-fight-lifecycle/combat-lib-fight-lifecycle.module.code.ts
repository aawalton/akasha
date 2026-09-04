import { COMBAT_TIMEOUT } from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-lib-log"
import { DATA } from "@akasha/temper-combat-addon/combat-lib-state"
import type { Fight } from "@akasha/temper-combat-addon/combat-lib-types"

export function createFight(): Fight {
  return {
    char: DATA.playername,
    combatstart: 0 - COMBAT_TIMEOUT - 1,
    combatend: -150,
    combattime: 0,
    dpsstart: undefined,
    dpsend: undefined,
    hpsstart: undefined,
    hpsend: undefined,
    dpstime: 0,
    hpstime: 0,
    units: {},
    grplog: [],
    groupDamageOut: 0,
    groupDamageIn: 0,
    groupHealingOut: 0,
    groupHealingIn: 0,
    groupDPSOut: 0,
    groupDPSIn: 0,
    groupHPSOut: 0,
    groupHPSIn: 0,
    damageOutTotal: 0,
    healingOutTotal: 0,
    healingOutAbsolute: 0,
    damageInTotal: 0,
    damageInShielded: 0,
    healingInTotal: 0,
    DPSOut: 0,
    HPSOut: 0,
    HPSAOut: 0,
    DPSIn: 0,
    HPSIn: 0,
    group: DATA.inGroup,
    playerid: DATA.playerid,
    bosses: {},
    dataVersion: 2,
    special: {},
    prepared: undefined,
    date: undefined,
    time: undefined,
    zone: undefined,
    subzone: undefined,
    zoneId: undefined,
    ESOversion: undefined,
    APIversion: undefined,
    account: undefined,
    charData: undefined,
    CP: undefined,
    startBar: undefined,
    isWipe: undefined,
    bossfight: undefined,
    bossname: undefined,
    starttime: undefined,
    endtime: undefined,
    activetime: undefined,
  }
}

function getEquip(): Record<number, string> {
  const equip: Record<number, string> = {}
  for (let i = EQUIP_SLOT_ITERATION_BEGIN; i <= EQUIP_SLOT_ITERATION_END; i++) {
    equip[i] = GetItemLink(BAG_WORN, i, LINK_STYLE_DEFAULT)
  }

  return equip
}

function getPassiveSkills(): number[] {
  const passiveSkills: number[] = []
  const pool = SKILLS_DATA_MANAGER.passiveSkillObjectPool
  if (pool === undefined) {
    return passiveSkills
  }
  const passives = pool.GetActiveObjects()

  for (const [, passiveData] of pairs(passives)) {
    const skillType = passiveData.skillLineData.skillTypeData.skillType

    if (skillType < 8 && passiveData.isPurchased) {
      const rank = passiveData.currentRank
      const progression = passiveData.skillProgressions[rank]
      if (progression !== undefined) {
        passiveSkills[passiveSkills.length] = progression.abilityId
      }
    }
  }
  return passiveSkills
}

export function finishFight(fight: Fight): undefined {
  log("fight", LOG_LEVEL_DEBUG, "Finish fight")

  const charData = fight.charData

  if (charData === undefined) {
    return undefined
  }

  charData.skillBars = ZO_DeepTableCopy(DATA.skillBars)
  charData.scribedSkills = ZO_DeepTableCopy(DATA.scribedSkills)
  charData.passiveSkills = getPassiveSkills()
  charData.equip = getEquip()

  const timems = GetGameTimeMilliseconds()
  fight.combatend = timems
  fight.combattime = zo_round((timems - fight.combatstart) / 10) / 100

  fight.starttime = zo_min(
    fight.dpsstart ?? fight.hpsstart ?? 0,
    fight.hpsstart ?? fight.dpsstart ?? 0
  )
  fight.endtime = zo_max(fight.dpsend ?? 0, fight.hpsend ?? 0)
  fight.activetime = zo_max((fight.endtime - fight.starttime) / 1000, 1)
  return undefined
}
