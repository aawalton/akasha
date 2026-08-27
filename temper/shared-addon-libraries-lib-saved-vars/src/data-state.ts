import { asNextFn, asRawIpairs } from "./casts"
import type { DataInstance } from "./types"

export const DO_NOT_OVERWRITE = true

export const rawnext = LibLua52 !== undefined ? asNextFn(LibLua52.rawnext) : asNextFn(next)

export const rawipairs =
  LibLua52 !== undefined ? asRawIpairs(LibLua52.rawipairs) : asRawIpairs(ipairs)

export interface DataState {
  debugMode: boolean
  emptyObject?: DataInstance
}

export const dataState: DataState = {
  debugMode: false,
  emptyObject: undefined,
}
