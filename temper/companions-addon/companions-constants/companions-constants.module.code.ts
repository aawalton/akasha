export const ADDON_NAME = "TemperCompanions"
export const ADDON_VERSION = "1.0.0"
export const ADDON_VERSION_NUMBER = 100
export const SAVED_VARIABLES_NAME = "TemperCompanions_SavedVariables"

type SavedVariablesDefaultsShape = {
  companions: Record<number, never>
  selectedCompanionId: number | undefined
} & Record<string, unknown>

export const SAVED_VARIABLES_DEFAULTS: SavedVariablesDefaultsShape = {
  companions: {},
  selectedCompanionId: undefined,
}
