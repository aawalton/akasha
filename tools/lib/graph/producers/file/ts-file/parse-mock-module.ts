// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses when it is used; importing it does not throw.
import { goneRecord, oldGraphGone } from "../../../graph-gone.ts"

export type ParsedMockModuleCall = unknown

export const MockModuleAttrsSchema = goneRecord("MockModuleAttrsSchema")
export const MockModuleUnreadableSpecifierAttrsSchema = goneRecord(
  "MockModuleUnreadableSpecifierAttrsSchema"
)
export const visitForMockModuleCalls = ((...a: readonly unknown[]) =>
  oldGraphGone("visitForMockModuleCalls")) as never
