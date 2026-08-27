import { gameData } from "./data"
import { updateGuiTable } from "./gui-table"
import { questCompleted } from "./helpers"
import { requireSVar, state } from "./state"
import type { PointsData, PointTotals, Settings } from "./types"

export function calculateTotalPoints(this: void): PointTotals {
  let quests = 0
  let skyshards = 0
  for (const zi of gameData.zones) {
    quests = quests + zi.quests.length
    zi.skyshards = GetNumSkyshardsInZone(gameData.ZId.ZN[zi.key] ?? 0)
    skyshards = skyshards + zi.skyshards
  }

  const level = 64
  const mainQ = gameData.MQ.length
  const folDis = 2
  const pvpRank = 50
  const maelAr = 1
  const endlArch = 1
  const tutorial = 1
  const genTot = level + mainQ + folDis + tutorial + pvpRank + maelAr + endlArch
  const ssTot = math.floor(skyshards / 3)
  const gdTot = gameData.GD.length
  const pdTot = gameData.PD.length

  return {
    ZQTot: quests,
    numSSTot: skyshards,
    SSTot: ssTot,
    GDTot: gdTot,
    PDTot: pdTot,
    Level: level,
    MainQ: mainQ,
    FolDis: folDis,
    PvPRank: pvpRank,
    MaelAr: maelAr,
    EndlArch: endlArch,
    GenTot: genTot,
    Tot: genTot + gdTot + quests + ssTot + pdTot,
  }
}

function selectedPts(this: void): PointsData | undefined {
  return requireSVar().ptsData[state.selectedChar]
}

export function checkSavedVars(this: void, value: PointsData | Settings | undefined): boolean {
  const charId = GetCurrentCharacterId()
  if (state.selectedChar !== charId) {
    return false
  }
  if (value === undefined) {
    const sVar = requireSVar()
    sVar.settings[charId] = TemperTableFunctions.CopyTable(state.settings)
    sVar.ptsData[charId] = TemperTableFunctions.CopyTable(state.ptsData)
  }
  return true
}

function setLevelPoints(this: void): undefined {
  const level = GetUnitLevel("player")
  state.ptsData.Level = math.floor(level / 5) + math.floor(level / 10) + (level - 1)

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.Level = state.ptsData.Level
    }
  }
}

function setQuestPoints(this: void): undefined {
  for (const questId of gameData.MQ) {
    state.ptsData.MainQ = state.ptsData.MainQ + (questCompleted(questId) ? 1 : 0)
  }

  state.ptsData.tutorial =
    questCompleted(gameData.tutorials.MO) ||
    questCompleted(gameData.tutorials.SO) ||
    questCompleted(gameData.tutorials.EO) ||
    questCompleted(gameData.tutorials.GO) ||
    questCompleted(gameData.tutorials.BO) ||
    state.settings.TUT
      ? 1
      : 0

  state.ptsData.EndlArch = questCompleted(gameData.EA[0] ?? 0) ? 1 : 0

  for (const zd of gameData.zones) {
    let zoneQuests = 0
    for (const quest of zd.quests) {
      zoneQuests = zoneQuests + (questCompleted(quest) ? 1 : 0)
    }
    state.ptsData.ZQ[zd.key] = zoneQuests
    state.ptsData.ZQTot = state.ptsData.ZQTot + zoneQuests
  }

  for (const d of gameData.GD) {
    const done = questCompleted(d.quest) ? 1 : 0
    state.ptsData.GD[d.key] = done
    state.ptsData.GDTot = state.ptsData.GDTot + done
  }

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.MainQ = state.ptsData.MainQ
      pts.tutorial = state.ptsData.tutorial
      pts.EndlArch = state.ptsData.EndlArch
      pts.ZQ = TemperTableFunctions.CopyTable(state.ptsData.ZQ)
      pts.GD = TemperTableFunctions.CopyTable(state.ptsData.GD)
      pts.ZQTot = state.ptsData.ZQTot
      pts.GDTot = state.ptsData.GDTot
    }
  }
}

function setPublicDungeonPoints(this: void): undefined {
  for (const d of gameData.PD) {
    const done = IsAchievementComplete(d.achievement) ? 1 : 0
    state.ptsData.PD[d.key] = done
    state.ptsData.PDTot = state.ptsData.PDTot + done
  }

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.PD = TemperTableFunctions.CopyTable(state.ptsData.PD)
      pts.PDTot = state.ptsData.PDTot
    }
  }
}

function setSkyshardPoints(this: void): undefined {
  for (const zd of gameData.zones) {
    const zId = gameData.ZId.ZN[zd.key] ?? 0
    let found = 0
    for (let i = 1; i <= zd.skyshards; i++) {
      const ssId = GetZoneSkyshardId(zId, i)
      if (GetSkyshardDiscoveryStatus(ssId) === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
        found = found + 1
      }
    }
    state.ptsData.SS[zd.key] = found
    state.ptsData.numSSTot = state.ptsData.numSSTot + found
  }

  if ((state.ptsData.SS["WP"] ?? 0) === 0 && questCompleted(gameData.MQ[0] ?? 0)) {
    state.ptsData.SS["WP"] = 1
    state.ptsData.numSSTot = state.ptsData.numSSTot + 1
  }

  state.ptsData.SSTot = math.floor(state.ptsData.numSSTot / 3)

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.SS = TemperTableFunctions.CopyTable(state.ptsData.SS)
      pts.numSSTot = state.ptsData.numSSTot
      pts.SSTot = state.ptsData.SSTot
    }
  }
}

function getTypeSpentPoints(this: void, skillTypeData: SkillTypeData): number {
  let total = 0
  for (const skillLineData of skillTypeData.orderedSkillLines) {
    total = total + SKILL_POINT_ALLOCATION_MANAGER.GetNumPointsAllocatedInSkillLine(skillLineData)
  }
  return total
}

function getTotSkillPoints(this: void): number {
  let total = SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints()
  for (const [, skillTypeData] of SKILLS_DATA_MANAGER.SkillTypeIterator()) {
    total = total + getTypeSpentPoints(skillTypeData)
  }
  return total
}

function setFoliumDiscognitumPoints(
  this: void,
  skillPoints: number,
  countedSkillPoints: number
): undefined {
  if (state.settings.FD.override) {
    state.ptsData.FolDis = state.settings.FD.charHasFD ? 2 : 0
  } else if (questCompleted(3997)) {
    state.ptsData.FolDis = skillPoints - countedSkillPoints >= 2 ? 2 : 0
  } else {
    state.ptsData.FolDis = 0
  }

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.FolDis = state.ptsData.FolDis
    }
  }
}

function setAllianceWarRankPoints(this: void): undefined {
  const [avaRank] = GetUnitAvARank("player")
  state.ptsData.PvPRank = avaRank

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.PvPRank = state.ptsData.PvPRank
    }
  }
}

function setMaelArPoints(this: void): undefined {
  state.ptsData.MaelAr = IsAchievementComplete(gameData.MAAch) ? 1 : 0

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.MaelAr = state.ptsData.MaelAr
    }
  }
}

function setUnassigned(this: void): undefined {
  state.ptsData.Unassigned = GetAvailableSkillPoints()

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.Unassigned = state.ptsData.Unassigned
    }
  }
}

function setGeneralPoints(this: void): undefined {
  state.ptsData.GenTot =
    state.ptsData.Level +
    state.ptsData.MainQ +
    state.ptsData.FolDis +
    state.ptsData.tutorial +
    state.ptsData.PvPRank +
    state.ptsData.MaelAr +
    state.ptsData.EndlArch

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.GenTot = state.ptsData.GenTot
    }
  }
}

function setTotPoints(this: void): undefined {
  state.ptsData.Tot =
    state.ptsData.GenTot +
    state.ptsData.ZQTot +
    state.ptsData.SSTot +
    state.ptsData.GDTot +
    state.ptsData.PDTot

  if (checkSavedVars(selectedPts())) {
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.Tot = state.ptsData.Tot
    }
  }
}

export function updateAllSavedVars(this: void): undefined {
  requireSVar().ptsData[state.selectedChar] = TemperTableFunctions.CopyTable(state.ptsData)
}

function loadData(this: void, charId: string): undefined {
  const sVar = requireSVar()
  let sVarPtsData = sVar.ptsData[charId]
  if (sVarPtsData === undefined) {
    sVar.settings[charId] = TemperTableFunctions.CopyTable(state.settings)
    sVarPtsData = TemperTableFunctions.CopyTable(state.ptsData)
    sVar.ptsData[charId] = sVarPtsData
  }
  updateGuiTable(sVarPtsData)
}

export function refreshData(this: void): undefined {
  state.ptsData = TemperTableFunctions.SimpleResetTable(state.ptsData, 0)

  setLevelPoints()
  setQuestPoints()
  setPublicDungeonPoints()
  setSkyshardPoints()
  setAllianceWarRankPoints()
  setMaelArPoints()
  setUnassigned()

  const skillPoints = getTotSkillPoints()
  const countedSkillPoints =
    state.ptsData.Level +
    state.ptsData.MainQ +
    state.ptsData.tutorial +
    state.ptsData.PvPRank +
    state.ptsData.MaelAr +
    state.ptsData.EndlArch +
    state.ptsData.ZQTot +
    state.ptsData.SSTot +
    state.ptsData.GDTot +
    state.ptsData.PDTot
  setFoliumDiscognitumPoints(skillPoints, countedSkillPoints)

  if (state.ptsData.tutorial === 0 && skillPoints - countedSkillPoints - state.ptsData.FolDis > 0) {
    state.ptsData.tutorial = 1
    const pts = selectedPts()
    if (pts !== undefined) {
      pts.tutorial = state.ptsData.tutorial
    }
  }

  setGeneralPoints()
  setTotPoints()

  updateGuiTable(state.ptsData)
}

export function setupData(this: void, charId: string): undefined {
  if (charId === GetCurrentCharacterId()) {
    refreshData()
    updateAllSavedVars()
  } else {
    loadData(charId)
  }
}
