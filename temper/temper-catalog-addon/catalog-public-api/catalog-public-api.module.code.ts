import "@akasha/temper-addon-library-types/temper-catalog-global"

import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

globalThis.TemperCatalog = {
  getSavedVariables,
}
