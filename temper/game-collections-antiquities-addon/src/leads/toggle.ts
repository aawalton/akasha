import { setAlerts } from "./alerts"
import { dropdownData } from "./constants"
import { FIND_SCRY_DIFFERENT_ZONES } from "./data/find-scry-overrides"
import { locations } from "./data/locations/index"
import { UNKNOWN } from "./data/locations/location-types"
import { FAKE_ZONE_IDS } from "./data/zones"
import type { UnitData } from "./unit-list"
import { getUnitList, setSetsMinFound, setUnits } from "./unit-list"
import { zoneDisplayName } from "./zone-name"

let alreadyRun = false

export function toggleRDL(this: void, _extra?: string): undefined {
  if (TemperLeadsMainWindow.IsHidden()) {
    const units: Record<number, UnitData> = {}
    const setsMinFound: Record<number, number> = {}
    setUnits(units)
    setSetsMinFound(setsMinFound)
    const foundAlready: Record<string, string | undefined> = {}
    const zonesTable: string[] = []
    const setTypeTable: string[] = []
    let d7 = 0
    let d1 = 0
    let h1 = 0
    let antiquityId = GetNextAntiquityId(undefined)
    while (antiquityId !== undefined) {
      let haveLead = DoesAntiquityHaveLead(antiquityId)
      let zoneId = GetAntiquityZoneId(antiquityId)
      let zoneName = zoneDisplayName(zoneId)
      const antiquityName = ZO_CachedStrFormat("<<C:1>>", GetAntiquityName(antiquityId))
      const quality: number = GetAntiquityQuality(antiquityId)
      const setId = GetAntiquitySetId(antiquityId)
      let setName = ZO_CachedStrFormat("<<C:1>>", GetAntiquitySetName(setId))
      let setQuality: number = GetAntiquitySetQuality(setId)
      let diff: number = GetAntiquityDifficulty(antiquityId)
      const numRecovered = GetNumAntiquitiesRecovered(antiquityId)
      let repeatable = IsAntiquityRepeatable(antiquityId)
      if (setId > 0) {
        const currentMin = setsMinFound[setId]
        if (currentMin === undefined || (currentMin > numRecovered && !haveLead)) {
          setsMinFound[setId] = numRecovered
        }
      }
      if (setId === 22) {
        repeatable = false
      }
      if (
        antiquityId === 310 ||
        (antiquityId > 498 && antiquityId < 509) ||
        (antiquityId > 614 && antiquityId < 625)
      ) {
        repeatable = false
      }
      if (antiquityId === 248 && numRecovered === 1) {
        haveLead = false
      }
      const loreLeft =
        GetNumAntiquityLoreEntries(antiquityId) - GetNumAntiquityLoreEntriesAcquired(antiquityId)
      let leadTimeLeft = GetAntiquityLeadTimeRemainingSeconds(antiquityId)
      if (diff < 5 && (antiquityId < 401 || antiquityId > 415)) {
        diff = quality
      }
      if (haveLead) {
        if (leadTimeLeft === 0) {
          leadTimeLeft = 2851200
        }
        if (leadTimeLeft < 3600) {
          h1 = h1 + 1
        } else if (leadTimeLeft < 86400) {
          d1 = d1 + 1
        } else if (leadTimeLeft < 604800) {
          d7 = d7 + 1
        }
      } else {
        const findZoneId = FIND_SCRY_DIFFERENT_ZONES[antiquityId]
        if (findZoneId !== undefined) {
          zoneName = zoneDisplayName(findZoneId)
          zoneId = findZoneId
        }
      }
      const rewardId = GetAntiquityRewardId(antiquityId)
      if (setName === "" && rewardId > 0) {
        setQuality = GetAntiquityQuality(antiquityId)
        setName = REWARDS_MANAGER.GetRewardContextualTypeString(rewardId)
        if (setName === "Motif Chapter") {
          setQuality = 3
        }
      }
      if (zoneName !== "") {
        let locationEntry = locations[antiquityId]
        if (locationEntry === undefined) {
          locationEntry = { description: UNKNOWN, type: UNKNOWN, short: UNKNOWN, complete: false }
          locations[antiquityId] = locationEntry
        }
        units[antiquityId] = {
          Lead: antiquityName,
          Zone: zoneName,
          ZoneId: zoneId,
          Location: locationEntry.short,
          Diff: diff,
          Lore: loreLeft,
          Dug: numRecovered,
          Set: setName,
          SetId: setId,
          Expiration: leadTimeLeft,
          SetQuality: setQuality,
          HaveLead: haveLead,
          Repeatable: repeatable,
          Aid: antiquityId,
        }
      }
      if (!alreadyRun) {
        if (foundAlready[zoneName] === undefined && zoneId < FAKE_ZONE_IDS.ALLZONES) {
          foundAlready[zoneName] = zoneName
          zonesTable.push(zoneName)
        }
        if (foundAlready[setName] === undefined) {
          foundAlready[setName] = setName
          setTypeTable.push(setName)
        }
      }
      antiquityId = GetNextAntiquityId(antiquityId)
    }
    if (!alreadyRun) {
      alreadyRun = true
      zonesTable.sort()
      for (const zone of zonesTable) {
        dropdownData.ChoicesZone.push(zone)
        dropdownData.TooltipsZone.push(string.format(dropdownData.TooltipsZoneGenerated, zone))
      }
      setTypeTable.sort()
      for (const setType of setTypeTable) {
        dropdownData.ChoicesSetType.push(setType)
        dropdownData.TooltipsSetType.push(
          string.format(dropdownData.TooltipsSetTypeGenerated, setType)
        )
      }
    }
    setAlerts(d7, d1, h1)
    getUnitList().RefreshData()
  }
  SCENE_MANAGER.ToggleTopLevel(TemperLeadsMainWindow)
}
