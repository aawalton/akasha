import { getSavedVariables } from "./saved-variables"

declare global {
  var TemperListings: {
    getSavedVariables: typeof getSavedVariables
  }
}

globalThis.TemperListings = {
  getSavedVariables,
}
