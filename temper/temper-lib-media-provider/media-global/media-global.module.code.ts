import type { GlobalTable } from "../media-casts/media-casts.module.code.ts"

import { createProvider } from "../media-provider/media-provider.module.code.ts"

const LIB_GLOBAL_NAME = "LibMediaProvider"

const glob = globalThis as GlobalTable
if (glob[LIB_GLOBAL_NAME] !== undefined) {
  d("Warning : 'LibMediaProvider' has always been loaded.")
} else {
  glob[LIB_GLOBAL_NAME] = createProvider()
}
