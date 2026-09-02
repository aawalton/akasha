import type { CaptureDescriptor } from "@akasha/temper-capture-descriptor/descriptor"
import type { ErrorsPayload } from "./types"

const DEFAULTS: ErrorsPayload = { version: 1, entries: [] }

export const errorsCaptureDescriptor: CaptureDescriptor<ErrorsPayload> = {
  addonName: "TemperErrors",
  savedVariablesName: "TemperErrors_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
