import "./event-groups-combat"
import "./event-groups-tracking"
import "./event-groups-tracking-2"

import { initResources } from "./callbacks"
import { LIB_EVENT_NAMESPACE } from "./constants"
import { onBossesChanged } from "./fight"
import { createFight } from "./fight-2"
import { data, setCurrentFight } from "./state"
import { initAdvancedStats } from "./stats"
import { initStatusEffectBonuses } from "./stats-2"

export function initializeLibCombat(): undefined {
  data.inCombat = IsUnitInCombat("player")
  data.inGroup = IsUnitGrouped("player")
  data.rawPlayername = GetRawUnitName("player")
  data.playername = ZO_CachedStrFormat(SI_UNIT_NAME, data.rawPlayername)
  data.accountname = ZO_CachedStrFormat(SI_UNIT_NAME, GetDisplayName())
  data.bossInfo = {}
  data.groupInfo = { nameToId: {}, tagToId: {}, nameToTag: {}, nameToDisplayname: {} }
  data.PlayerPets = {}
  data.lastabilities = []
  data.backstabber = 0
  data.critBonusMundus = 0
  const [activeWeaponPair] = GetActiveWeaponPairInfo()
  data.bar = activeWeaponPair
  data.resources = {}
  data.stats = {}
  data.advancedStats = {}
  data.currentQuickslotIndex = GetCurrentQuickslot()

  setCurrentFight(createFight())

  initResources()
  onBossesChanged()
  initAdvancedStats()
  initStatusEffectBonuses()

  if (data.LoadCustomizations !== undefined) {
    data.LoadCustomizations()
  }

  EVENT_MANAGER.RegisterForEvent(`${LIB_EVENT_NAMESPACE}Active`, EVENT_PLAYER_ACTIVATED, () => {
    data.isUIActivated = true
  })
  EVENT_MANAGER.RegisterForEvent(`${LIB_EVENT_NAMESPACE}Active`, EVENT_PLAYER_DEACTIVATED, () => {
    data.isUIActivated = false
  })
  return undefined
}
