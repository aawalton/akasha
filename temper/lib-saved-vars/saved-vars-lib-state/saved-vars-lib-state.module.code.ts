import type { RegisteredSavedVarsInfo } from "akasha/temper/lib-saved-vars/saved-vars-types/saved-vars-types.module.code.ts"

export interface LibState {
  savedVarRegistry: LuaTable<object, RegisteredSavedVarsInfo>
  currentAddonName?: string
}

export const LIB_STATE: LibState = {
  savedVarRegistry: new LuaTable<object, RegisteredSavedVarsInfo>(),
  currentAddonName: undefined,
}
