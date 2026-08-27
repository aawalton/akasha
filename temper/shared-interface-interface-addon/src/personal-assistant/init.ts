import "./public-api"

import { createBindings } from "./bindings"
import { ADDON_NAME } from "./constants"

export function initPersonalAssistant(this: void): undefined {
  createBindings()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_COLLECTIBLE_UPDATED, createBindings)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_COLLECTION_UPDATED, createBindings)
  return undefined
}
