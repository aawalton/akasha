import { installData } from "../saved-vars-data/saved-vars-data.module.code.ts"
import { installLibCore } from "../saved-vars-lib-core/saved-vars-lib-core.module.code.ts"
import { installLibOverrides } from "../saved-vars-lib-overrides/saved-vars-lib-overrides.module.code.ts"
import { installSavedVarsManager } from "../saved-vars-manager/saved-vars-manager.module.code.ts"
import { installProtected } from "../saved-vars-protected/saved-vars-protected.module.code.ts"
import { publishLibSavedVars } from "../saved-vars-public-api/saved-vars-public-api.module.code.ts"
import { registerUiStrings } from "../saved-vars-ui-strings/saved-vars-ui-strings.module.code.ts"

installLibCore()
registerUiStrings()
installProtected()
installSavedVarsManager()
installData()
installLibOverrides()
publishLibSavedVars()
