interface EventManager {
  RegisterForEvent: <T extends unknown[] = unknown[]>(
    namespace: string,
    event: number,
    callback: (eventCode: number, ...args: T) => void,
    registerOnce?: boolean
  ) => boolean
  UnregisterForEvent: (namespace: string, event: number) => boolean
  AddFilterForEvent: (
    namespace: string,
    event: number,
    filterType: number,
    ...args: unknown[]
  ) => boolean
  RegisterForUpdate: (
    namespace: string,
    interval: number,
    callback: () => void,
    registerOnce?: boolean
  ) => boolean
  UnregisterForUpdate: (namespace: string) => boolean
}

declare const EVENT_MANAGER: EventManager
declare const EVENT_QUEST_CONDITION_UPDATE: number
declare const EVENT_LUA_LOW_MEMORY: number
declare const EVENT_ACTION_SLOTS_FULL_UPDATE: number
