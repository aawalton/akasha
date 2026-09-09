import { LIB_NAME } from "../data-encode-charset/data-encode-charset.module.code.ts"
import { performSelfTest } from "../data-encode-self-test/data-encode-self-test.module.code.ts"
import { DATA_ENCODE } from "../data-encode-surface/data-encode-surface.module.code.ts"

globalThis.LibDataEncode = DATA_ENCODE

function initialize(this: void, _eventCode: number, addon: string): undefined {
  if (addon !== LIB_NAME) {
    return undefined
  }
  EVENT_MANAGER.UnregisterForEvent(LIB_NAME, EVENT_ADD_ON_LOADED)
  performSelfTest()
  return undefined
}

EVENT_MANAGER.RegisterForEvent(LIB_NAME, EVENT_ADD_ON_LOADED, initialize)
