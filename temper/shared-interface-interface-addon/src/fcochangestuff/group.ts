import { state } from "./state"

const EM = EVENT_MANAGER

const playerTag = "player"

function isCPGetter(this: void, value: unknown): value is (this: void, unitTag?: string) => number {
  return type(value) === "function"
}

function isRosterBuildFn(this: void, value: unknown): value is GroupRosterBuildFn {
  return type(value) === "function"
}

function WrapFunction(
  this: void,
  object: GroupListManager,
  functionName: string,
  wrapper: (this: void, originalFunction: unknown, ...args: unknown[]) => void
): undefined {
  const originalFunction = object[functionName]
  object[functionName] = (...args: unknown[]): undefined => {
    wrapper(originalFunction, ...args)
  }
}

export function hookChampionRankUtils(this: void): undefined {
  if (state.settingsVars.settings.showRealCPs !== true) {
    return
  }
  const CHAMPION_CAP_NEW = GetMaxSpendableChampionPointsInAttribute() * 10
  globalThis.GetLevelOrChampionPointsStringNoIcon = (
    level: number | undefined,
    championPoints: number | undefined
  ): string => {
    if (championPoints !== undefined && championPoints > 0) {
      if (championPoints > CHAMPION_CAP_NEW) {
        return tostring(CHAMPION_CAP_NEW)
      } else {
        return tostring(championPoints)
      }
    } else if (level !== undefined && level > 0) {
      return tostring(level)
    } else {
      return ""
    }
  }
}

export function hookGroupList(this: void, runItOnce?: boolean): undefined {
  if (state.settingsVars.settings.showRealCPs !== true) {
    return
  }
  const runOnce = runItOnce === true
  const groupListManager = GROUP_LIST_MANAGER
  if (groupListManager !== undefined) {
    const originalBuildMasterList = groupListManager.BuildMasterList
    if (originalBuildMasterList === undefined) {
      return
    }
    WrapFunction(
      groupListManager,
      "BuildMasterList",
      (originalBuildMasterListFn: unknown, ...args: unknown[]): undefined => {
        state.runGroupListCounter = state.runGroupListCounter + 1
        const cpFuncEffective = state.originalUnitCPEffectiveFunc
        if (cpFuncEffective === undefined) {
          return
        }
        globalThis.GetUnitEffectiveChampionPoints = globalThis.GetUnitChampionPoints
        if (isRosterBuildFn(originalBuildMasterListFn)) {
          originalBuildMasterListFn(...args)
        }
        if (isCPGetter(cpFuncEffective)) {
          globalThis.GetUnitEffectiveChampionPoints = cpFuncEffective
        }
      }
    )
    if (runOnce && groupListManager.BuildMasterList !== undefined) {
      groupListManager.BuildMasterList()
    }
  }
}

export function CPStuff(this: void): undefined {
  if (state.settingsVars.settings.showRealCPs === true) {
    hookChampionRankUtils()
    const runOnce = state.runGroupListCounter === 0
    hookGroupList(runOnce)
  } else {
    globalThis.GetLevelOrChampionPointsStringNoIcon = state.originalCPFunc
    if (isCPGetter(state.originalUnitCPEffectiveFunc)) {
      globalThis.GetUnitEffectiveChampionPoints = state.originalUnitCPEffectiveFunc
    }
    if (isCPGetter(state.originalUnitCPFunc)) {
      globalThis.GetUnitChampionPoints = state.originalUnitCPFunc
    }
  }
}

let eventGroupElectionsWasAdded = false

export function GroupElectionStuff(this: void): undefined {
  if (eventGroupElectionsWasAdded === true) {
    return
  }
  EM.RegisterForEvent(
    state.addonVars.addonName + "_GroupElection",
    EVENT_GROUP_ELECTION_NOTIFICATION_ADDED,
    (): undefined => {
      if (state.settingsVars.settings.autoDeclineGroupElections !== true) {
        return
      }
      if (IsInCyrodiil() || IsInImperialCity() || IsUnitInDungeon(playerTag) || IsPlayerInRaid()) {
        return
      }
      const [, , electionDescriptor] = GetGroupElectionInfo()
      if (electionDescriptor === ZO_GROUP_ELECTION_DESCRIPTORS.READY_CHECK) {
        CastGroupVote(GROUP_VOTE_CHOICE_AGAINST)
      }
    }
  )
}

export function toggleGroupElectionAutoDecline(this: void): undefined {
  state.settingsVars.settings.autoDeclineGroupElections =
    state.settingsVars.settings.autoDeclineGroupElections !== true
}
