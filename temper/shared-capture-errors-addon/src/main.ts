import { defineCaptureWriter } from "@temper/shared-capture-core/define-capture-writer"
import { errorsCaptureDescriptor } from "@temper/shared-capture-errors-core/descriptor"
import {
  flushTempDb,
  registerErrorHooks,
  registerPreInitHooks,
  setSavedVariablesAccessor,
  unregisterPreInitHooks,
} from "./error-capture"

registerPreInitHooks()

defineCaptureWriter(errorsCaptureDescriptor, (writer) => {
  setSavedVariablesAccessor(writer.getSavedVariables)
  flushTempDb()
  unregisterPreInitHooks()
  registerErrorHooks()
})
