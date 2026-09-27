import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  holdLoreLibrary,
  type LoreLibrary,
} from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.code.ts"
import { loreLibraryAt } from "akasha/temper/player/completion/modules/held-lore-library-loading/held-lore-library-loading.module.code.ts"

export function holdLoreLibraryFromCheckout(): LoreLibrary {
  return holdLoreLibrary(loreLibraryAt(akashaRoot()))
}
