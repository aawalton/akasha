import "akasha/temper/eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import {
  refreshAllCompanionData,
  resetAllCompanionData,
} from "../companions-commands/companions-commands.module.code.ts"

globalThis.TemperCompanions_RefreshAllData = refreshAllCompanionData
globalThis.TemperCompanions_ResetAllData = resetAllCompanionData
