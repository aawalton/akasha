import { parseImageName } from "@alanwalton/personas-core/image-name"
import { selectFollowWallpaper } from "@alanwalton/personas-core/wallpaper-select"
import { computeLedger } from "../../alan/persona/ledger/ledger.ts"

export type { WallpaperCandidate } from "@alanwalton/personas-core/wallpaper-select"

export interface PersonaCore {
  readonly parseImageName: typeof parseImageName
  readonly computeLedger: typeof computeLedger
  readonly selectFollowWallpaper: typeof selectFollowWallpaper
}

export async function personaCore(): Promise<PersonaCore> {
  return { parseImageName, computeLedger, selectFollowWallpaper }
}
