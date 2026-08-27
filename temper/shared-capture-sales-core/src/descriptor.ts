import type { CaptureDescriptor } from "@temper/shared-capture-descriptor/descriptor"
import type { SalesPayload } from "./types"

const DEFAULTS: SalesPayload = { version: 1, sales: {} }

export const salesCaptureDescriptor: CaptureDescriptor<SalesPayload> = {
  addonName: "TemperSales",
  savedVariablesName: "TemperSales_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
