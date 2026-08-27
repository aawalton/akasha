import type { DataMiningPayload } from "@temper/shared-capture-datamining-core/types"

let accessor: ((this: void) => DataMiningPayload) | undefined

export function setSavedVariablesAccessor(fn: (this: void) => DataMiningPayload): undefined {
  accessor = fn
}

export function getSavedVariables(this: void): DataMiningPayload {
  if (!accessor) {
    throw new Error(
      "Saved variables accessor not set. defineCaptureWriter onInitialize must run first."
    )
  }
  return accessor()
}
