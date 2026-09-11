import type { GlobalTable } from "akasha/temper/lib-media-provider/media-casts/media-casts.module.code.ts"

import { createProvider } from "akasha/temper/lib-media-provider/media-provider/media-provider.module.code.ts"

const LIB_GLOBAL_NAME = "LibMediaProvider"

const glob = globalThis as GlobalTable
if (glob[LIB_GLOBAL_NAME] !== undefined) {
  d("Warning : 'LibMediaProvider' has always been loaded.")
} else {
  glob[LIB_GLOBAL_NAME] = createProvider()
}
