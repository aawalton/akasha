import { asGlobalTable } from "./casts"
import { createProvider } from "./provider"
import type { LibMediaProviderApi } from "./types"

declare global {
  var LibMediaProvider: LibMediaProviderApi
}

const glob = asGlobalTable(globalThis)
if (glob.LibMediaProvider !== undefined) {
  d("Warning : 'LibMediaProvider' has always been loaded.")
} else {
  globalThis.LibMediaProvider = createProvider()
}
