import { installData } from "akasha/temper/lib-saved-vars/saved-vars-data/saved-vars-data.module.code.ts"
import { installLibCore } from "akasha/temper/lib-saved-vars/saved-vars-lib-core/saved-vars-lib-core.module.code.ts"
import { installLibOverrides } from "akasha/temper/lib-saved-vars/saved-vars-lib-overrides/saved-vars-lib-overrides.module.code.ts"
import { installSavedVarsManager } from "akasha/temper/lib-saved-vars/saved-vars-manager/saved-vars-manager.module.code.ts"
import { installProtected } from "akasha/temper/lib-saved-vars/saved-vars-protected/saved-vars-protected.module.code.ts"
import { publishLibSavedVars } from "akasha/temper/lib-saved-vars/saved-vars-public-api/saved-vars-public-api.module.code.ts"
import { registerUiStrings } from "akasha/temper/lib-saved-vars/saved-vars-ui-strings/saved-vars-ui-strings.module.code.ts"

installLibCore()
registerUiStrings()
installProtected()
installSavedVarsManager()
installData()
installLibOverrides()
publishLibSavedVars()
