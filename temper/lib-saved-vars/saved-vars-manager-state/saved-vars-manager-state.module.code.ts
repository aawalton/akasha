import type { SavedVarsManagerInstance } from "../saved-vars-types/saved-vars-types.module.code.ts"

export interface ManagerState {
  nextId: number
  registry: Record<number, SavedVarsManagerInstance>
  versionUpdateQueue: Record<number, SavedVarsManagerInstance | undefined>
  extraLazyLoadParams: Record<number, unknown[] | undefined>
  extraMigrateParams: Record<number, unknown[] | undefined>
}

export const MANAGER_STATE: ManagerState = {
  nextId: 1,
  registry: {},
  versionUpdateQueue: {},
  extraLazyLoadParams: {},
  extraMigrateParams: {},
}
