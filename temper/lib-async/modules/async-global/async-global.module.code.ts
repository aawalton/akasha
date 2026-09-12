import type { GlobalTable } from "akasha/temper/lib-async/modules/async-casts/async-casts.module.code.ts"
import { lib } from "akasha/temper/lib-async/modules/async-state/async-state.module.code.ts"

;(globalThis as GlobalTable).LibAsync = lib
