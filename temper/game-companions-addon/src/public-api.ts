import { refreshAllCompanionData, resetAllCompanionData } from "./commands"

declare global {
  var TemperCompanions_RefreshAllData: typeof refreshAllCompanionData
  var TemperCompanions_ResetAllData: typeof resetAllCompanionData
}

globalThis.TemperCompanions_RefreshAllData = refreshAllCompanionData
globalThis.TemperCompanions_ResetAllData = resetAllCompanionData
