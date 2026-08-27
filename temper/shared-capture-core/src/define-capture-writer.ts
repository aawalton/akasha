import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import type { CaptureDescriptor, PerfSlot } from "@temper/shared-capture-descriptor/descriptor"
import { finishPerfTrace, startPerfTrace } from "@temper/shared-capture-perf/perf"
import { makeAccountWideSavedVars } from "./saved-vars"

export interface CaptureWriter<T> {
  readonly initializeSavedVariables: (this: void) => T
  readonly getSavedVariables: (this: void) => T
}

export function defineCaptureWriter<T extends object>(
  descriptor: CaptureDescriptor<T>,
  onInitialize?: (this: void, writer: CaptureWriter<T>) => void
): CaptureWriter<T> {
  const accessor = makeAccountWideSavedVars(
    descriptor.savedVariablesName,
    descriptor.version,
    descriptor.defaults
  )

  const writer: CaptureWriter<T> = {
    initializeSavedVariables: accessor.initializeSavedVariables,
    getSavedVariables: accessor.getSavedVariables,
  }

  function initialize(this: void): undefined {
    const perfStart = descriptor.perf === true ? startPerfTrace() : undefined
    accessor.initializeSavedVariables()
    if (onInitialize !== undefined) onInitialize(writer)
    if (perfStart !== undefined) {
      const perfHost: T & PerfSlot = accessor.getSavedVariables()
      perfHost.perf = finishPerfTrace(descriptor.addonName, perfStart)
    }
  }

  registerAddonInit(descriptor.addonName, initialize)
  return writer
}
