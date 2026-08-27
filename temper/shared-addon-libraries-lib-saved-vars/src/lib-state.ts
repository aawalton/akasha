import type { RegisteredSavedVarsInfo } from "./types"

export interface LibState {
  savedVarRegistry: LuaTable<object, RegisteredSavedVarsInfo>
  currentAddonName?: string
}

export const libState: LibState = {
  savedVarRegistry: new LuaTable<object, RegisteredSavedVarsInfo>(),
  currentAddonName: undefined,
}
