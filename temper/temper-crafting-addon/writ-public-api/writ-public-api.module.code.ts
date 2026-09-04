import { ADDON_NAME, ADDON_VERSION } from "../writ-constants/writ-constants.module.code.ts"

interface WritGlobalTable {
  TemperWrit: TemperWritGlobal
}

function asGlobalTable(this: void, value: unknown): WritGlobalTable {
  return value as WritGlobalTable
}

asGlobalTable(globalThis).TemperWrit = {
  name: ADDON_NAME,
  version: ADDON_VERSION,
}
