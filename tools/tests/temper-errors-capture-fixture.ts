import { z } from "zod"
import {
  addonPath,
  addonSource,
  bundleToLua,
  type LuaVm,
  type Subject,
  withLua,
} from "../lib/temper-addon-lua.ts"

export const CLASSIFY_RESULT = z.object({ message: z.string(), traceback: z.string() })
export const CAPTURE_RESULT = z.object({
  entryCount: z.number(),
  messages: z.array(z.string()),
  tracebacks: z.array(z.string()),
  counts: z.array(z.number()),
})
export const BUILD_ID_RESULT = z.object({
  entryCount: z.number(),
  attributedAddon: z.string().nullish(),
  attributedBuildId: z.string().nullish(),
  count: z.number(),
})
export const BUILD_IDS_SNAPSHOT_RESULT = z.object({
  entryCount: z.number(),
  attributedAddon: z.string().nullish(),
  buildIds: z.record(z.string(), z.string()).nullish(),
})

const ERRORS_TYPES: Subject = {
  ref: "temper/shared-capture-errors-core/src/types.ts",
  holds: ["ErrorsPayload"],
}

const ERRORS_CONSTANTS: Subject = {
  ref: "temper/shared-capture-errors-addon/src/constants.ts",
  holds: ["errorsCaptureDescriptor"],
}

const ERRORS_CAPTURE: Subject = {
  ref: "temper/shared-capture-errors-addon/src/error-capture.ts",
  holds: ["classifyError", "captureError", "setSavedVariablesAccessor"],
}

export const SUBJECTS: readonly Subject[] = [ERRORS_TYPES, ERRORS_CONSTANTS, ERRORS_CAPTURE]

const ESO_TYPES_GLOB = `${addonPath("temper/addons/types/eso")}/**/*.d.ts`

const stripExports = (s: string): string => s.replace(/^import .*$/gm, "").replace(/\bexport /g, "")

const FIXTURE = [
  stripExports(addonSource(ERRORS_TYPES.ref, ERRORS_TYPES.holds)),
  `interface CaptureWriter<T> { initializeSavedVariables: (this: void) => T; getSavedVariables: (this: void) => T }`,
  `const errorsCaptureDescriptor = { addonName: "TemperErrors", savedVariablesName: "TemperErrors_SavedVariables", version: 1, defaults: { version: 1, entries: [] } }`,
  stripExports(addonSource(ERRORS_CONSTANTS.ref, ERRORS_CONSTANTS.holds)),
  `const __sv: ErrorsPayload = { version: 1, entries: [] }`,
  `declare const TemperBuildIds: Record<string, string> | undefined`,
  stripExports(addonSource(ERRORS_CAPTURE.ref, ERRORS_CAPTURE.holds)),
  `setSavedVariablesAccessor(function (this: void): ErrorsPayload { return __sv })`,
  `;(globalThis as Record<string, unknown>).__classify = (s: unknown, ev: number, ec: number | undefined) => classifyError(s, ev, ec)`,
  `;(globalThis as Record<string, unknown>).__capture = (ev: number, s: unknown, ec: number | undefined): ErrorsPayload["entries"] => { captureError(ev, s, ec); return __sv.entries }`,
  ``,
].join("\n")

const ESO_STUBS = `
  local __now = 1000
  function GetTimeStamp() __now = __now + 1; return __now end
  function GetDisplayName() return "@tester" end
  function GetUnitName() return "Tester" end
  function GetWorldName() return "NA Megaserver" end
  function GetESOVersionString() return "eso.test" end
  function GetAPIVersion() return 101000 end
`

const BUNDLE = await bundleToLua(FIXTURE, { noImplicitSelf: true, include: [ESO_TYPES_GLOB] })

export async function loaded<T>(run: (vm: LuaVm) => Promise<T>): Promise<T> {
  const bundle = BUNDLE
  return withLua(async (vm) => {
    await vm.run(ESO_STUBS)
    await vm.run(bundle)
    return run(vm)
  })
}

export const TC_FRAME_ERR = `"user:/AddOns/TemperCrafting/Main.lua:42: attempt to index a nil value\\nstack traceback:\\n\\tuser:/AddOns/TemperCrafting/Main.lua:42: in function 'foo'"`

export const LIBASYNC_TO_TEMPER_ERR = `"user:/AddOns/LibAsync/LibAsync.lua:806: attempt to call a nil value\\nstack traceback:\\n\\tuser:/AddOns/LibAsync/LibAsync.lua:806: in function 'taskCallback'\\n\\tuser:/AddOns/TemperInventory/Main.lua:42: in function 'onUpdate'"`

export const CRAFTSTORE_BARE_ERR = `"CraftStoreFixed_X:2: attempt to index a nil value\\nstack traceback:\\n\\tCraftStoreFixed_X:2: in function 'CraftStoreFixed_X_OnHide'"`

export const LIBASYNC_TO_EXTERNAL_ERR = `"user:/AddOns/LibAsync/LibAsync.lua:806: attempt to call a nil value\\nstack traceback:\\n\\tuser:/AddOns/LibAsync/LibAsync.lua:806: in function 'cb'\\n\\tuser:/AddOns/IIfA/IIfA.lua:99: in function 'scan'"`
