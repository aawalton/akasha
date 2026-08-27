import { getSavedVariables } from "./saved-variables"

declare global {
  var TemperDataMining: {
    getSavedVariables: typeof getSavedVariables
  }
}

globalThis.TemperDataMining = {
  getSavedVariables,
}
