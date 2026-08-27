type GroupRosterBuildFn = (this: void, ...args: unknown[]) => void

interface GroupListManager {
  BuildMasterList: ((this: GroupListManager, ...args: unknown[]) => void) | undefined
  [key: string]: unknown
}
declare const GROUP_LIST_MANAGER: GroupListManager | undefined

type CPGetter = (this: void, unitTag: string) => number

declare var GetLevelOrChampionPointsStringNoIcon: unknown

declare const ZO_GROUP_ELECTION_DESCRIPTORS: {
  readonly READY_CHECK: unknown
}
