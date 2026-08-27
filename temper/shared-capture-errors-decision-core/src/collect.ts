import { errorsCaptureDescriptor } from "@temper/shared-capture-errors-core/descriptor"
import type { rootSchema } from "./saved-variables-schema"
import type { ErrorEntry } from "@temper/shared-capture-errors-core/types"

export const SAVED_VARIABLES_NAME = errorsCaptureDescriptor.savedVariablesName

export function collectEntries(parsed: ReturnType<typeof rootSchema.parse>): readonly ErrorEntry[] {
  const defaultTable = parsed.Default
  if (defaultTable === undefined) return []
  const collected: ErrorEntry[] = []
  for (const account of Object.values(defaultTable)) {
    const entries = account.$AccountWide?.entries
    if (entries === undefined) continue
    for (const entry of entries) collected.push(entry)
  }
  return collected
}
