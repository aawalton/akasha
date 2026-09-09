import { createBindings } from "../assistant-bindings/assistant-bindings.module.code.ts"
import { ASSISTANT_COLLECTIBLES } from "../assistant-collectibles/assistant-collectibles.module.code.ts"

const ADDON_NAME = "TemperPersonalAssistant"

export function initPersonalAssistant(this: void): undefined {
  globalThis.PERSONNAL_ASSISTANTS = ASSISTANT_COLLECTIBLES
  createBindings()
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_COLLECTIBLE_UPDATED, createBindings)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_COLLECTION_UPDATED, createBindings)
  return undefined
}
