import "akasha/temper/temper-eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import { getSavedVariables } from "../trading-saved-variables/trading-saved-variables.module.code.ts"

globalThis.TemperListings = {
  getSavedVariables,
}
