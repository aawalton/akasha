import type { CaptureDescriptor } from "@akasha/temper-capture-descriptor/descriptor"
import type { DataMiningPayload } from "./types"

const DEFAULTS: DataMiningPayload = {}

export const dataminingCaptureDescriptor: CaptureDescriptor<DataMiningPayload> = {
  addonName: "TemperDataMining",
  savedVariablesName: "TemperDataMining_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
