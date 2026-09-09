import { asGlobalTable } from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
  LIBSAVEDVARS_CHARACTER_NAME_KEY,
  LIBSAVEDVARS_SCOPE_ACCOUNT,
  LIBSAVEDVARS_SCOPE_CHARACTER,
  LIBSAVEDVARS_SCOPE_MAX,
  LIBSAVEDVARS_SCOPE_MIN,
} from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"

export function publishLibSavedVars(this: void): undefined {
  const globals = asGlobalTable(_G)

  globals.LibSavedVars = LSV.lib
  globals.LSV_SavedVarsManager = LSV.manager
  globals.LSV_Data = LSV.data

  globals.LIBSAVEDVARS_CHARACTER_NAME_KEY = LIBSAVEDVARS_CHARACTER_NAME_KEY
  globals.LIBSAVEDVARS_CHARACTER_ID_KEY = LIBSAVEDVARS_CHARACTER_ID_KEY
  globals.LIBSAVEDVARS_ACCOUNT_KEY = LIBSAVEDVARS_ACCOUNT_KEY
  globals.LIBSAVEDVARS_SCOPE_CHARACTER = LIBSAVEDVARS_SCOPE_CHARACTER
  globals.LIBSAVEDVARS_SCOPE_ACCOUNT = LIBSAVEDVARS_SCOPE_ACCOUNT
  globals.LIBSAVEDVARS_SCOPE_MIN = LIBSAVEDVARS_SCOPE_MIN
  globals.LIBSAVEDVARS_SCOPE_MAX = LIBSAVEDVARS_SCOPE_MAX

  return undefined
}
