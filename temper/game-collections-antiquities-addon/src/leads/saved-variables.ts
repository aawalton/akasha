import { dropdownData, SAVED_VARIABLES_NAME } from "./constants"

export interface SavedVariablesData {
  DropdownChoice?: Record<string, string | undefined>
}

type SavedVariablesDefaultsShape = SavedVariablesData & Record<string, unknown>

const SAVED_VARIABLES_DEFAULTS: SavedVariablesDefaultsShape = {}

let savedVarsInstance: SavedVariablesData | undefined

export function initializeSavedVariables(): SavedVariablesData {
  const sv: SavedVariablesData = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    SAVED_VARIABLES_DEFAULTS
  )
  if (sv.DropdownChoice === undefined) {
    sv.DropdownChoice = {
      Major: dropdownData.ChoicesMajor[0],
      Zone: dropdownData.ChoicesZone[0],
      SetType: dropdownData.ChoicesSetType[0],
    }
  }
  savedVarsInstance = sv
  return sv
}

export function getSavedVariables(): SavedVariablesData {
  if (savedVarsInstance === undefined) {
    throw new Error("TemperLeads saved variables not initialized")
  }
  return savedVarsInstance
}

export function getDropdownChoice(): Record<string, string | undefined> {
  const sv = getSavedVariables()
  if (sv.DropdownChoice === undefined) {
    sv.DropdownChoice = {}
  }
  return sv.DropdownChoice
}
