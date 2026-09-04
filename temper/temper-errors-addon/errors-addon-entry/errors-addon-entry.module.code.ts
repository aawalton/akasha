import { ERRORS_CAPTURE_DESCRIPTOR } from "@akasha/temper-capture-errors/errors-descriptor"
import { defineCaptureWriter } from "@akasha/temper-capture-writer/capture-writer"
import {
  flushBuffered,
  registerErrorHooks,
  registerPreInitHooks,
  unregisterPreInitHooks,
} from "../errors-addon-hooks/errors-addon-hooks.module.code.ts"
import { setSavedVariablesAccessor } from "../errors-addon-record/errors-addon-record.module.code.ts"

registerPreInitHooks()

defineCaptureWriter(ERRORS_CAPTURE_DESCRIPTOR, (writer) => {
  setSavedVariablesAccessor(writer.getSavedVariables)
  flushBuffered()
  unregisterPreInitHooks()
  registerErrorHooks()
})
