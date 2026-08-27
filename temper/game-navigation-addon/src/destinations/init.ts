import "./public-api"

import { initializeDestinations } from "./pins/initialize"

export function initDestinations(this: void): undefined {
  initializeDestinations()
  return undefined
}
