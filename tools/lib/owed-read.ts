
import { decideOwed, type OwedVerdict } from "./owed-decide.ts"
import { resolveSeatTarget } from "./seat-handle.ts"

export function readOwed(handle: string): OwedVerdict {
  const found = resolveSeatTarget(handle)
  if ("error" in found) throw new Error(found.error)
  return decideOwed({ rows: [] }).verdict
}
