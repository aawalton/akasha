import { installData } from "./data"
import { installLibCore } from "./lib-core"
import { installLibOverrides } from "./lib-overrides"
import { installProtected } from "./protected"
import { publishLibSavedVars } from "./public-api"
import { installSavedVarsManager } from "./saved-vars-manager"
import { registerUiStrings } from "./ui-strings"

installLibCore()
registerUiStrings()
installProtected()
installSavedVarsManager()
installData()
installLibOverrides()
publishLibSavedVars()
