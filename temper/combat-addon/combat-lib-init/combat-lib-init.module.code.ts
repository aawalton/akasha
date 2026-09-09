import "../combat-lib-groups-combat/combat-lib-groups-combat.module.code.ts"
import "../combat-lib-groups-tracking/combat-lib-groups-tracking.module.code.ts"
import "../combat-lib-groups-stats/combat-lib-groups-stats.module.code.ts"

import { initResources } from "../combat-lib-callbacks/combat-lib-callbacks.module.code.ts"
import { LIB_EVENT_NAMESPACE } from "../combat-lib-constants/combat-lib-constants.module.code.ts"
import { onBossesChanged } from "../combat-lib-fight/combat-lib-fight.module.code.ts"
import { createFight } from "../combat-lib-fight-lifecycle/combat-lib-fight-lifecycle.module.code.ts"
import { DATA, setCurrentFight } from "../combat-lib-state/combat-lib-state.module.code.ts"
import { initAdvancedStats } from "../combat-lib-stats/combat-lib-stats.module.code.ts"
import { initStatusEffectBonuses } from "../combat-lib-stats-boss/combat-lib-stats-boss.module.code.ts"

export function initializeLibCombat(): undefined {
  DATA.inCombat = IsUnitInCombat("player")
  DATA.inGroup = IsUnitGrouped("player")
  DATA.rawPlayername = GetRawUnitName("player")
  DATA.playername = ZO_CachedStrFormat(SI_UNIT_NAME, DATA.rawPlayername)
  DATA.accountname = ZO_CachedStrFormat(SI_UNIT_NAME, GetDisplayName())
  DATA.bossInfo = {}
  DATA.groupInfo = { nameToId: {}, tagToId: {}, nameToTag: {}, nameToDisplayname: {} }
  DATA.PlayerPets = {}
  DATA.lastabilities = []
  DATA.backstabber = 0
  DATA.critBonusMundus = 0
  const [activeWeaponPair] = GetActiveWeaponPairInfo()
  DATA.bar = activeWeaponPair
  DATA.resources = {}
  DATA.stats = {}
  DATA.advancedStats = {}
  DATA.currentQuickslotIndex = GetCurrentQuickslot()

  setCurrentFight(createFight())

  initResources()
  onBossesChanged()
  initAdvancedStats()
  initStatusEffectBonuses()

  if (DATA.LoadCustomizations !== undefined) {
    DATA.LoadCustomizations()
  }

  EVENT_MANAGER.RegisterForEvent(`${LIB_EVENT_NAMESPACE}Active`, EVENT_PLAYER_ACTIVATED, () => {
    DATA.isUIActivated = true
  })
  EVENT_MANAGER.RegisterForEvent(`${LIB_EVENT_NAMESPACE}Active`, EVENT_PLAYER_DEACTIVATED, () => {
    DATA.isUIActivated = false
  })
  return undefined
}
