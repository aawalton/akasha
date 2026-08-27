import { getSavedVariables } from "./saved-variables"
import { collectCompanionProgress } from "./tracking/companion-progress"
import { captureAndSaveActiveCompanionBuild, setSelectedCompanionId } from "./ui/companion-selector"

export function refreshAllCompanionData(): undefined {
  if (HasActiveCompanion()) {
    captureAndSaveActiveCompanionBuild()
    collectCompanionProgress()
    setSelectedCompanionId(GetActiveCompanionDefId())
  }
}

export function resetAllCompanionData(): undefined {
  const savedVars = getSavedVariables()
  savedVars.companions = {}
  savedVars.selectedCompanionId = undefined
}
