import { describe, expect, test } from "bun:test"
import {
  calledImports,
  moduleTopCalledImports,
  performsLoadRegistration,
} from "./addon-entry-facts"
import {
  type AddonInitFacts,
  collectFieldAssignmentSteps,
  collectFiresBeforeAssignmentIssues,
  collectHookFieldCalls,
  collectInitOrder,
  collectModuleTopAssignedKeys,
  type HookFieldCall,
  parseAddonSource,
} from "./addon-hook-fires-before-assignment"

const parse = (src: string, filePath = "a.ts") => parseAddonSource(filePath, src)

describe("collectInitOrder", () => {
  test("orders bare and member calls by source position, first occurrence wins", () => {
    const src = `
EVENT_MANAGER.RegisterForEvent(NAME, EVENT_ADD_ON_LOADED, () => {
  LoadHooks()
  pChat.InitializeChatConfig()
})
`
    const order = collectInitOrder(parse(src, "main.ts"))
    const names = order.map((c) => c.name)
    expect(names.indexOf("LoadHooks")).toBeGreaterThanOrEqual(0)
    expect(names.indexOf("LoadHooks")).toBeLessThan(names.indexOf("InitializeChatConfig"))
  })

  test("member-call callee resolves to the property name", () => {
    const src = `pChat.InitializeSettings()`
    expect(collectInitOrder(parse(src, "main.ts")).map((c) => c.name)).toContain(
      "InitializeSettings"
    )
  })
})

describe("performsLoadRegistration", () => {
  test("true for the registration the addon actually runs", () => {
    const src = `EVENT_MANAGER.RegisterForEvent(N, EVENT_ADD_ON_LOADED, f)`
    expect(performsLoadRegistration(parse(src))).toBe(true)
  })

  test("a comment naming the event is not a registration", () => {
    const src = `
// Called once from the addon's EVENT_ADD_ON_LOADED, after saved variables load.
export const ADDON_NAME = "TemperCrafting"
`
    expect(performsLoadRegistration(parse(src))).toBe(false)
  })

  test("a string or a longer identifier holding the event's name is not a registration", () => {
    expect(performsLoadRegistration(parse(`const label = "EVENT_ADD_ON_LOADED"`))).toBe(false)
    expect(performsLoadRegistration(parse(`const EVENT_ADD_ON_LOADED_NAMESPACE = "x"`))).toBe(false)
  })

  test("tearing a handler down is not registering one", () => {
    const src = `EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)`
    expect(performsLoadRegistration(parse(src))).toBe(false)
  })

  test("registering some other event is not registering the load event", () => {
    const src = `EVENT_MANAGER.RegisterForEvent(N, EVENT_PLAYER_ACTIVATED, f)`
    expect(performsLoadRegistration(parse(src))).toBe(false)
  })
})

describe("moduleTopCalledImports", () => {
  test("reports an imported binding called at module top, with its specifier", () => {
    const src = `
import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import { ADDON_NAME } from "./constants"
registerAddonInit(ADDON_NAME, initialize)
`
    expect([...moduleTopCalledImports(parse(src, "main.ts"))]).toEqual([
      ["registerAddonInit", "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"],
    ])
  })

  test("a call buried in a function body is not module-top: it runs when called, not at load", () => {
    const src = `
import { registerAddonInit } from "./runtime"
export function later() { registerAddonInit(N, f) }
`
    expect([...moduleTopCalledImports(parse(src, "main.ts"))]).toEqual([])
  })

  test("an imported binding that is never called is not reported", () => {
    const src = `
import { registerAddonInit } from "./runtime"
export const unused = registerAddonInit
`
    expect([...moduleTopCalledImports(parse(src, "main.ts"))]).toEqual([])
  })

  test("a type-only import is erased and can register nothing", () => {
    const src = `
import type { Descriptor } from "./types"
import { defineCaptureWriter } from "./writer"
defineCaptureWriter(d, onInit)
`
    expect([...moduleTopCalledImports(parse(src, "main.ts"))]).toEqual([
      ["defineCaptureWriter", "./writer"],
    ])
  })

  test("a namespace import invoked as a member call counts as calling the namespace", () => {
    const src = `
import * as runtime from "./runtime"
runtime.registerAddonInit(N, f)
`
    expect([...moduleTopCalledImports(parse(src, "main.ts"))]).toEqual([["runtime", "./runtime"]])
  })
})

describe("calledImports", () => {
  test("carries seam-hood through a call at any depth, unlike the module-top form", () => {
    const src = `
import { registerAddonInit } from "./runtime"
export function defineCaptureWriter(d, onInit) { registerAddonInit(d.addonName, onInit) }
`
    expect([...calledImports(parse(src, "writer.ts"))]).toEqual([
      ["registerAddonInit", "./runtime"],
    ])
    expect([...moduleTopCalledImports(parse(src, "writer.ts"))]).toEqual([])
  })
})

describe("collectFieldAssignmentSteps", () => {
  test("maps a field assigned inside a function to that function's name", () => {
    const src = `
export function InitializeChatConfig() {
  pChat.SaveChatConfig = (from) => save(from)
}
`
    expect(collectFieldAssignmentSteps(parse(src, "a.ts"))).toEqual([
      { key: "pChat.SaveChatConfig", step: "InitializeChatConfig" },
    ])
  })

  test("uses the OUTERMOST function when the assignment nests in an inner arrow", () => {
    const src = `
export function InitializeChatConfig() {
  pChat.ApplyChatConfig = () => {
    pChat.SaveChatConfig = (from) => save(from)
  }
}
`
    const steps = collectFieldAssignmentSteps(parse(src, "a.ts"))
    expect(steps).toContainEqual({ key: "pChat.SaveChatConfig", step: "InitializeChatConfig" })
    expect(steps).toContainEqual({ key: "pChat.ApplyChatConfig", step: "InitializeChatConfig" })
  })

  test("element-access assignment inside a function is captured", () => {
    const src = `const init = () => { pChat["SaveX"] = fn }`
    expect(collectFieldAssignmentSteps(parse(src, "a.ts"))).toEqual([
      { key: "pChat.SaveX", step: "init" },
    ])
  })

  test("a module-top assignment is NOT a deferred publish", () => {
    const src = `pChat.ConvertHexToRGBA = ConvertHexToRGBA`
    expect(collectFieldAssignmentSteps(parse(src, "a.ts"))).toEqual([])
  })
})

describe("collectModuleTopAssignedKeys", () => {
  test("collects a module-top OBJ.FIELD assignment", () => {
    expect(collectModuleTopAssignedKeys(parse("pChat.Foo = bar", "a.ts"))).toEqual(["pChat.Foo"])
  })
  test("ignores an assignment inside a function body", () => {
    expect(collectModuleTopAssignedKeys(parse("function f() { pChat.Foo = bar }", "a.ts"))).toEqual(
      []
    )
  })
})

describe("collectHookFieldCalls", () => {
  test("records an ambient OBJ.FIELD call inside a ZO_PreHook callback", () => {
    const src = `
export function LoadHooks() {
  ZO_PreHook("SetCVar", () => { pChat.SaveChatConfig("SetCVar") })
}
`
    const calls = collectHookFieldCalls(parse(src, "hooks.ts"))
    expect(calls).toHaveLength(1)
    expect(calls[0]).toMatchObject({
      key: "pChat.SaveChatConfig",
      installer: "ZO_PreHook",
      hookTarget: "SetCVar",
      registeringStep: "LoadHooks",
    })
  })

  test("does NOT record a call of a LOCALLY-declared name (not ambient)", () => {
    const src = `
export function LoadHooks() {
  const ctx = {}
  ZO_PreHook("SetCVar", () => { ctx.save() })
}
`
    expect(collectHookFieldCalls(parse(src, "hooks.ts"))).toEqual([])
  })

  test("records EVENT_MANAGER.RegisterForEvent callbacks too", () => {
    const src = `
export function Init() {
  EVENT_MANAGER.RegisterForEvent(N, E, () => { pChat.OnActivated() })
}
`
    const calls = collectHookFieldCalls(parse(src, "x.ts"))
    expect(calls[0]).toMatchObject({
      key: "pChat.OnActivated",
      installer: "EVENT_MANAGER.RegisterForEvent",
      registeringStep: "Init",
    })
  })

  test("ignores a direct (non-hook) call in the function body", () => {
    const src = `export function LoadHooks() { pChat.TeleportChanges() }`
    expect(collectHookFieldCalls(parse(src, "hooks.ts"))).toEqual([])
  })
})

function facts(over: Partial<AddonInitFacts>): AddonInitFacts {
  return {
    initOrder: over.initOrder ?? new Map(),
    assignSteps: over.assignSteps ?? new Map(),
    moduleTopAssigned: over.moduleTopAssigned ?? new Set(),
    hookCalls: over.hookCalls ?? [],
  }
}

const hookCall = (over: Partial<HookFieldCall>): HookFieldCall => ({
  objectName: "pChat",
  fieldName: "SaveChatConfig",
  key: "pChat.SaveChatConfig",
  installer: "ZO_PreHook",
  hookTarget: "SetCVar",
  registeringStep: "LoadHooks",
  line: 10,
  filePath: "hooks.ts",
  ...over,
})

describe("collectFiresBeforeAssignmentIssues", () => {
  test("RED — registering step runs before the assigning step (the #12694 trap)", () => {
    const issues = collectFiresBeforeAssignmentIssues(
      facts({
        initOrder: new Map([
          ["LoadHooks", 100],
          ["InitializeChatConfig", 112],
        ]),
        assignSteps: new Map([["pChat.SaveChatConfig", new Set(["InitializeChatConfig"])]]),
        hookCalls: [hookCall({})],
      })
    )
    expect(issues).toHaveLength(1)
    expect(issues[0]).toMatchObject({
      registeringStep: "LoadHooks",
      assigningStep: "InitializeChatConfig",
      hookTarget: "SetCVar",
    })
    expect(issues[0]?.message).toContain("function expected instead of nil")
  })

  test("GREEN — registering step runs AFTER the assigning step (the fix)", () => {
    const issues = collectFiresBeforeAssignmentIssues(
      facts({
        initOrder: new Map([
          ["InitializeChatConfig", 112],
          ["LoadLifecycleSaveHooks", 120],
        ]),
        assignSteps: new Map([["pChat.SaveChatConfig", new Set(["InitializeChatConfig"])]]),
        hookCalls: [hookCall({ registeringStep: "LoadLifecycleSaveHooks" })],
      })
    )
    expect(issues).toEqual([])
  })

  test("GREEN — field assigned BEFORE the hook step (SaveChatHistory case)", () => {
    const issues = collectFiresBeforeAssignmentIssues(
      facts({
        initOrder: new Map([
          ["InitializeChatHistory", 97],
          ["LoadHooks", 100],
        ]),
        assignSteps: new Map([["pChat.SaveChatHistory", new Set(["InitializeChatHistory"])]]),
        hookCalls: [
          hookCall({
            fieldName: "SaveChatHistory",
            key: "pChat.SaveChatHistory",
            registeringStep: "LoadHooks",
          }),
        ],
      })
    )
    expect(issues).toEqual([])
  })

  test("GREEN — a module-top-assigned field is excluded (present before init)", () => {
    const issues = collectFiresBeforeAssignmentIssues(
      facts({
        initOrder: new Map([
          ["LoadHooks", 100],
          ["InitializeChatConfig", 112],
        ]),
        assignSteps: new Map([["pChat.SaveChatConfig", new Set(["InitializeChatConfig"])]]),
        moduleTopAssigned: new Set(["pChat.SaveChatConfig"]),
        hookCalls: [hookCall({})],
      })
    )
    expect(issues).toEqual([])
  })

  test("GREEN — field with no deferred publish is excluded (stable global)", () => {
    const issues = collectFiresBeforeAssignmentIssues(
      facts({
        initOrder: new Map([["LoadHooks", 100]]),
        assignSteps: new Map(),
        hookCalls: [hookCall({ key: "ZO_X.Y", objectName: "ZO_X", fieldName: "Y" })],
      })
    )
    expect(issues).toEqual([])
  })

  test("GREEN — registering step absent from init order is skipped (conservative)", () => {
    const issues = collectFiresBeforeAssignmentIssues(
      facts({
        initOrder: new Map([["InitializeChatConfig", 112]]),
        assignSteps: new Map([["pChat.SaveChatConfig", new Set(["InitializeChatConfig"])]]),
        hookCalls: [hookCall({ registeringStep: "SomeUncalledFn" })],
      })
    )
    expect(issues).toEqual([])
  })
})
