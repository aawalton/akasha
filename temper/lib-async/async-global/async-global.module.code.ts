import type { GlobalTable } from "akasha/temper/lib-async/async-casts/async-casts.module.code.ts"
import { lib } from "akasha/temper/lib-async/async-state/async-state.module.code.ts"

;(globalThis as GlobalTable).LibAsync = lib
