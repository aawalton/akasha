import { ERRORS_CAPTURE_DESCRIPTOR } from "akasha/temper/capture-errors/errors-descriptor/errors-descriptor.module.code.ts"
import { defineCaptureWriter } from "akasha/temper/capture-writer/capture-writer/capture-writer.module.code.ts"
import {
  flushBuffered,
  registerErrorHooks,
  registerPreInitHooks,
  unregisterPreInitHooks,
} from "akasha/temper/errors-addon/errors-addon-hooks/errors-addon-hooks.module.code.ts"
import { setSavedVariablesAccessor } from "akasha/temper/errors-addon/errors-addon-record/errors-addon-record.module.code.ts"

registerPreInitHooks()

defineCaptureWriter(ERRORS_CAPTURE_DESCRIPTOR, (writer) => {
  setSavedVariablesAccessor(writer.getSavedVariables)
  flushBuffered()
  unregisterPreInitHooks()
  registerErrorHooks()
})
