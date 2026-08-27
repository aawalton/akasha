import "./public-api"
import { defineCaptureWriter } from "@temper/shared-capture-core/define-capture-writer"
import { salesCaptureDescriptor } from "@temper/shared-capture-sales-core/descriptor"
import { setSalesAccessor, startSalesCapture } from "./capture"
import { ADDON_NAME } from "./constants"

defineCaptureWriter(salesCaptureDescriptor, (writer) => {
  const sv = writer.getSavedVariables()
  sv.displayName = GetDisplayName()
  setSalesAccessor(writer.getSavedVariables)
  startSalesCapture(ADDON_NAME)
})
