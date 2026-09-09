import type {
  AsyncLib,
  AsyncSavedVarsTable,
  ConditionFunc,
  FuncOfTask,
  PairsIter,
  TaskInstance,
} from "../async-types/async-types.module.code.ts"

export function asAsyncLib(value: unknown): AsyncLib {
  return value as AsyncLib
}

export function asTaskInstance(value: unknown): TaskInstance {
  return value as TaskInstance
}

export interface GlobalTable {
  LibAsync?: unknown
  AsyncSavedVars?: AsyncSavedVarsTable
  [key: string]: unknown
}

export type ForMarkerFunc = (this: void) => LuaMultiReturn<[boolean, unknown, unknown, unknown]>

export function asForMarkerFunc(value: unknown): ForMarkerFunc {
  return value as ForMarkerFunc
}

export function asFuncOfTask(value: unknown): FuncOfTask {
  return value as FuncOfTask
}

export function asConditionFunc(value: unknown): ConditionFunc {
  return value as ConditionFunc
}

export function asPairsIter(value: unknown): PairsIter {
  return value as PairsIter
}
