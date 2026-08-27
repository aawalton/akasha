// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "../../../../graph-gone.ts"

export type ParsedMockModuleCall = unknown

export const MockModuleAttrsSchema = z
export const MockModuleUnreadableSpecifierAttrsSchema = z
export const visitForMockModuleCalls = ((...a: readonly unknown[]) => oldGraphGone("visitForMockModuleCalls")) as never
