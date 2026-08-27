import { expect, test } from "bun:test"
import { registerAddonInit } from "./bundle-runtime"

const EVENT_ADD_ON_LOADED_SENTINEL = 65536

function makeMockEventManager() {
  const handlers: Array<{ name: string; event: number; fn: (e: number, n: string) => void }> = []
  return {
    RegisterForEvent(name: string, event: number, fn: (e: number, n: string) => void): undefined {
      handlers.push({ name, event, fn })
    },
    UnregisterForEvent(name: string, event: number): undefined {
      for (let i = handlers.length - 1; i >= 0; i = i - 1) {
        const h = handlers[i]
        if (h !== undefined && h.name === name && h.event === event) handlers.splice(i, 1)
      }
    },
    fire(event: number, addOnName: string): undefined {
      for (const h of [...handlers]) if (h.event === event) h.fn(0, addOnName)
    },
  }
}

function installMockEventManager(): ReturnType<typeof makeMockEventManager> {
  const mock = makeMockEventManager()
  Reflect.set(globalThis, "EVENT_MANAGER", mock)
  Reflect.set(globalThis, "EVENT_ADD_ON_LOADED", EVENT_ADD_ON_LOADED_SENTINEL)
  return mock
}

test("registerAddonInit runs the init when EVENT_ADD_ON_LOADED fires for the addon's own name", () => {
  const mock = installMockEventManager()
  const calls: string[] = []
  registerAddonInit("TemperThing", () => {
    calls.push("TemperThing")
    return undefined
  })
  mock.fire(EVENT_ADD_ON_LOADED_SENTINEL, "TemperThing")
  expect(calls).toEqual(["TemperThing"])
})

test("registerAddonInit stays inert when the event fires for a different addon name", () => {
  const mock = installMockEventManager()
  let ran = false
  registerAddonInit("TemperThing", () => {
    ran = true
    return undefined
  })
  mock.fire(EVENT_ADD_ON_LOADED_SENTINEL, "SomeOtherAddon")
  expect(ran).toBe(false)
})

test("registerAddonInit unregisters on fire so the init runs at most once", () => {
  const mock = installMockEventManager()
  let count = 0
  registerAddonInit("TemperThing", () => {
    count = count + 1
    return undefined
  })
  mock.fire(EVENT_ADD_ON_LOADED_SENTINEL, "TemperThing")
  mock.fire(EVENT_ADD_ON_LOADED_SENTINEL, "TemperThing")
  expect(count).toBe(1)
})
