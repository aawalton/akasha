import { defineCaptureWriter } from "@akasha/temper-capture-writer/capture-writer"
import { ERRORS_CAPTURE_DESCRIPTOR } from "@akasha/temper-capture-errors/errors-descriptor"
import {
  flushTempDb,
  registerErrorHooks,
  registerPreInitHooks,
  setSavedVariablesAccessor,
  unregisterPreInitHooks,
} from "./error-capture"

registerPreInitHooks()

defineCaptureWriter(ERRORS_CAPTURE_DESCRIPTOR, (writer) => {
  setSavedVariablesAccessor(writer.getSavedVariables)
  flushTempDb()
  unregisterPreInitHooks()
  registerErrorHooks()
})
