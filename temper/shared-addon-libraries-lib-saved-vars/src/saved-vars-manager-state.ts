import type { SavedVarsManagerInstance } from "./types"

export interface ManagerState {
  nextId: number
  registry: Record<number, SavedVarsManagerInstance>
  versionUpdateQueue: Record<number, SavedVarsManagerInstance | undefined>
  extraLazyLoadParams: Record<number, unknown[] | undefined>
  extraMigrateParams: Record<number, unknown[] | undefined>
}

export const managerState: ManagerState = {
  nextId: 1,
  registry: {},
  versionUpdateQueue: {},
  extraLazyLoadParams: {},
  extraMigrateParams: {},
}
