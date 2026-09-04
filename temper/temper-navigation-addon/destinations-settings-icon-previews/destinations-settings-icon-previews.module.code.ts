import { PIN_TEXTURE_PATHS } from "../destinations-pin-texture-paths/destinations-pin-texture-paths.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  applyTint,
  texturePathAt,
} from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"

export interface IconPreviews {
  unknownPoi: TextureControl
  other: TextureControl
  otherDone: TextureControl
  champion: TextureControl
  championDone: TextureControl
  maiq: TextureControl
  maiqDone: TextureControl
  peacemaker: TextureControl
  peacemakerDone: TextureControl
  nosediver: TextureControl
  nosediverDone: TextureControl
  earthlyPos: TextureControl
  earthlyPosDone: TextureControl
  onMe: TextureControl
  onMeDone: TextureControl
  brawl: TextureControl
  brawlDone: TextureControl
  patron: TextureControl
  patronDone: TextureControl
  wrothgarJumper: TextureControl
  wrothgarJumperDone: TextureControl
  relicHunter: TextureControl
  relicHunterDone: TextureControl
  breaking: TextureControl
  breakingDone: TextureControl
  cutpurse: TextureControl
  cutpurseDone: TextureControl
  ayleid: TextureControl
  dwemer: TextureControl
  wwVamp: TextureControl
  vampAltar: TextureControl
  wwShrine: TextureControl
  collectible: TextureControl
  collectibleDone: TextureControl
  fish: TextureControl
  fishDone: TextureControl
}

let previews: IconPreviews | undefined

export function getIconPreviews(): IconPreviews {
  if (previews === undefined) {
    throw new Error("TemperDestinations settings: icon previews not created yet")
  }
  return previews
}

function createPreview(
  host: LamReferenceDropdownControl,
  offsetX: number,
  texture: string,
  size: number,
  tint: readonly number[]
): TextureControl {
  const preview = WINDOW_MANAGER.CreateControl(undefined, host, CT_TEXTURE)
  preview.SetAnchor(RIGHT, host.dropdown.GetControl(), LEFT, offsetX, 0)
  preview.SetTexture(texture)
  preview.SetDimensions(size, size)
  applyTint(preview, tint)
  return preview
}

interface PreviewSourceEntry {
  type: number
  size: number
  tint: number[]
}

function entryPreview(
  host: LamReferenceDropdownControl,
  offsetX: number,
  paths: readonly string[],
  entry: PreviewSourceEntry
): TextureControl {
  return createPreview(host, offsetX, texturePathAt(paths, entry.type), entry.size, entry.tint)
}

export function createAllIconPreviews(): undefined {
  const pins = getSavedVariables().pins
  const paths = PIN_TEXTURE_PATHS
  previews = {
    unknownPoi: entryPreview(previewpinTextureUnknown, -10, paths.Unknown, pins.pinTextureUnknown),
    other: entryPreview(previewpinTextureOther, -40, paths.Other, pins.pinTextureOther),
    otherDone: entryPreview(previewpinTextureOther, -5, paths.OtherDone, pins.pinTextureOtherDone),
    champion: entryPreview(previewpinTextureChampion, -40, paths.Champion, pins.pinTextureChampion),
    championDone: entryPreview(
      previewpinTextureChampion,
      -5,
      paths.ChampionDone,
      pins.pinTextureChampionDone
    ),
    maiq: entryPreview(previewpinTextureMaiq, -40, paths.Maiq, pins.pinTextureMaiq),
    maiqDone: entryPreview(previewpinTextureMaiq, -5, paths.MaiqDone, pins.pinTextureMaiqDone),
    peacemaker: entryPreview(
      previewpinTexturePeacemaker,
      -40,
      paths.Peacemaker,
      pins.pinTexturePeacemaker
    ),
    peacemakerDone: entryPreview(
      previewpinTexturePeacemaker,
      -5,
      paths.PeacemakerDone,
      pins.pinTexturePeacemakerDone
    ),
    nosediver: entryPreview(
      previewpinTextureNosediver,
      -40,
      paths.Nosediver,
      pins.pinTextureNosediver
    ),
    nosediverDone: entryPreview(
      previewpinTextureNosediver,
      -5,
      paths.NosediverDone,
      pins.pinTextureNosediverDone
    ),
    earthlyPos: entryPreview(
      previewpinTextureEarthlyPos,
      -40,
      paths.Earthlypos,
      pins.pinTextureEarthlyPos
    ),
    earthlyPosDone: entryPreview(
      previewpinTextureEarthlyPos,
      -5,
      paths.EarthlyposDone,
      pins.pinTextureEarthlyPosDone
    ),
    onMe: entryPreview(previewpinTextureOnMe, -40, paths.OnMe, pins.pinTextureOnMe),
    onMeDone: entryPreview(previewpinTextureOnMe, -5, paths.OnMeDone, pins.pinTextureOnMeDone),
    brawl: entryPreview(previewpinTextureBrawl, -40, paths.Brawl, pins.pinTextureBrawl),
    brawlDone: entryPreview(previewpinTextureBrawl, -5, paths.BrawlDone, pins.pinTextureBrawlDone),
    patron: entryPreview(previewpinTexturePatron, -40, paths.Patron, pins.pinTexturePatron),
    patronDone: entryPreview(
      previewpinTexturePatron,
      -5,
      paths.PatronDone,
      pins.pinTexturePatronDone
    ),
    wrothgarJumper: entryPreview(
      previewpinTextureWrothgarJumper,
      -40,
      paths.WrothgarJumper,
      pins.pinTextureWrothgarJumper
    ),
    wrothgarJumperDone: entryPreview(
      previewpinTextureWrothgarJumper,
      -5,
      paths.WrothgarJumperDone,
      pins.pinTextureWrothgarJumperDone
    ),
    relicHunter: entryPreview(
      previewpinTextureRelicHunter,
      -40,
      paths.RelicHunter,
      pins.pinTextureRelicHunter
    ),
    relicHunterDone: entryPreview(
      previewpinTextureRelicHunter,
      -5,
      paths.RelicHunterDone,
      pins.pinTextureRelicHunterDone
    ),
    breaking: entryPreview(previewpinTextureBreaking, -40, paths.Breaking, pins.pinTextureBreaking),
    breakingDone: entryPreview(
      previewpinTextureBreaking,
      -5,
      paths.BreakingDone,
      pins.pinTextureBreakingDone
    ),
    cutpurse: entryPreview(previewpinTextureCutpurse, -40, paths.Cutpurse, pins.pinTextureCutpurse),
    cutpurseDone: entryPreview(
      previewpinTextureCutpurse,
      -5,
      paths.CutpurseDone,
      pins.pinTextureCutpurseDone
    ),
    ayleid: entryPreview(previewpinTextureAyleid, -10, paths.Ayleid, pins.pinTextureAyleid),
    dwemer: entryPreview(previewpinTextureDwemer, -10, paths.dwemer, pins.pinTextureDwemer),
    wwVamp: entryPreview(previewpinTextureWWVamp, -10, paths.wwvamp, pins.pinTextureWWVamp),
    vampAltar: entryPreview(
      previewpinTextureVampAltar,
      -10,
      paths.vampirealtar,
      pins.pinTextureVampAltar
    ),
    wwShrine: entryPreview(
      previewpinTextureWWShrine,
      -10,
      paths.werewolfshrine,
      pins.pinTextureWWShrine
    ),
    collectible: entryPreview(
      previewpinTextureCollectible,
      -40,
      paths.collectible,
      pins.pinTextureCollectible
    ),
    collectibleDone: entryPreview(
      previewpinTextureCollectible,
      -5,
      paths.collectibledone,
      pins.pinTextureCollectibleDone
    ),
    fish: entryPreview(previewpinTextureFish, -40, paths.fish, pins.pinTextureFish),
    fishDone: entryPreview(previewpinTextureFish, -5, paths.fishdone, pins.pinTextureFishDone),
  }
}
