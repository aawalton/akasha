import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"

export function registerAddonInit(
  addonName: string,
  init: () => undefined,
  namespace: string = addonName
): undefined {
  EVENT_MANAGER.RegisterForEvent(
    namespace,
    EVENT_ADD_ON_LOADED,
    function (this: void, _event: number, loaded: string): undefined {
      if (loaded !== addonName) return
      EVENT_MANAGER.UnregisterForEvent(namespace, EVENT_ADD_ON_LOADED)
      init()
    }
  )
}
