import "./public-api"
import { defineCaptureWriter } from "@akasha/temper-capture-writer/capture-writer"
import { SALES_CAPTURE_DESCRIPTOR } from "@akasha/temper-capture-sales/sales-descriptor"
import { setSalesAccessor, startSalesCapture } from "./capture"
import { ADDON_NAME } from "./constants"

defineCaptureWriter(SALES_CAPTURE_DESCRIPTOR, (writer) => {
  const sv = writer.getSavedVariables()
  sv.displayName = GetDisplayName()
  setSalesAccessor(writer.getSavedVariables)
  startSalesCapture(ADDON_NAME)
})
