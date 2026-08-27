import "./public-api"

import { LIB_NAME } from "./constants"
import { performSelfTest } from "./self-test"

function initialize(this: void, _eventCode: number, addon: string): undefined {
  if (addon !== LIB_NAME) {
    return undefined
  }
  EVENT_MANAGER.UnregisterForEvent(LIB_NAME, EVENT_ADD_ON_LOADED)
  performSelfTest()
  return undefined
}

EVENT_MANAGER.RegisterForEvent(LIB_NAME, EVENT_ADD_ON_LOADED, initialize)
