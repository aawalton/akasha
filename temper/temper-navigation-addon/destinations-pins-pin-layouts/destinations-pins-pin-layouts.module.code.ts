import {
  DEST_PIN_TINT_AYLEID,
  DEST_PIN_TINT_CHAMPION,
  DEST_PIN_TINT_CHAMPION_DONE,
  DEST_PIN_TINT_COLLECTIBLE,
  DEST_PIN_TINT_COLLECTIBLE_DONE,
  DEST_PIN_TINT_DEADLANDS,
  DEST_PIN_TINT_DWEMER,
  DEST_PIN_TINT_FISH,
  DEST_PIN_TINT_FISH_DONE,
  DEST_PIN_TINT_HIGHISLE,
  DEST_PIN_TINT_OTHER,
  DEST_PIN_TINT_OTHER_DONE,
  DEST_PIN_TINT_QOLPIN,
  DEST_PIN_TINT_UNKNOWN,
  DEST_PIN_TINT_VAMPALTAR,
  DEST_PIN_TINT_WWSHRINE,
  DEST_PIN_TINT_WWVAMP,
} from "../destinations-colors/destinations-colors.module.code.ts"
import { PIN_TEXTURES } from "../destinations-pin-textures/destinations-pin-textures.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getFakedPinTexture,
  getPinTextureUnknown,
} from "../destinations-pins-tooltips/destinations-pins-tooltips.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

interface SvPinEntry {
  maxDistance: number
  level: number
  size: number
  type: number
  tint: number[]
}

export type SharedPinLayout = MapPinLayoutData & CompassPinLayout

function onToggleCompassPin(this: void, compassPinType: string, enabled: boolean): undefined {
  COMPASS_PINS.SetCompassPinEnabled(compassPinType, enabled)
  COMPASS_PINS.RefreshPins(compassPinType)
}

function asTextureControl(control: Control): TextureControl {
  return control as TextureControl
}

function makeTintUpdateLayout(entry: { tint: number[] }): CompassPinAdditionalLayout {
  return {
    [CUSTOM_COMPASS_LAYOUT_UPDATE]: function (this: void, pin: Control): undefined {
      const background = pin.GetNamedChild("Background")
      const [r, g, b, a] = entry.tint
      if (background !== undefined && r !== undefined && g !== undefined && b !== undefined) {
        asTextureControl(background).SetColor(r, g, b, a)
      }
    },
  }
}

function makePinLayout(
  entry: SvPinEntry,
  texture: string | undefined,
  tint: ZoColorDef,
  mapPinTypeString: string
): SharedPinLayout {
  return {
    maxDistance: entry.maxDistance,
    level: entry.level,
    texture: texture,
    size: entry.size,
    tint: tint,
    additionalLayout: makeTintUpdateLayout(entry),
    mapPinTypeString: mapPinTypeString,
    onToggleCallback: onToggleCompassPin,
  }
}

function makeQolPinLayout(
  entry: { level: number; size: number },
  texture: string
): MapPinLayoutData {
  return {
    level: entry.level,
    size: entry.size,
    tint: DEST_PIN_TINT_QOLPIN,
    texture: texture,
  }
}

export interface DestinationsPinLayouts {
  Faked: MapPinLayoutData
  unknown: MapPinLayoutData
  other: SharedPinLayout
  other_Done: SharedPinLayout
  Maiq: SharedPinLayout
  Maiq_Done: SharedPinLayout
  Peacemaker: SharedPinLayout
  Peacemaker_Done: SharedPinLayout
  Nosediver: SharedPinLayout
  Nosediver_Done: SharedPinLayout
  EarthlyPos: SharedPinLayout
  EarthlyPos_Done: SharedPinLayout
  OnMe: SharedPinLayout
  OnMe_Done: SharedPinLayout
  Brawl: SharedPinLayout
  Brawl_Done: SharedPinLayout
  Patron: SharedPinLayout
  Patron_Done: SharedPinLayout
  WrothgarJumper: SharedPinLayout
  WrothgarJumper_Done: SharedPinLayout
  RelicHunter: SharedPinLayout
  RelicHunter_Done: SharedPinLayout
  Champion: SharedPinLayout
  Champion_Done: SharedPinLayout
  Breaking: SharedPinLayout
  Breaking_Done: SharedPinLayout
  Cutpurse: SharedPinLayout
  Cutpurse_Done: SharedPinLayout
  Collectible: SharedPinLayout
  CollectibleDone: SharedPinLayout
  Fish: SharedPinLayout
  FishDone: SharedPinLayout
  Ayleid: SharedPinLayout
  Deadlands: SharedPinLayout
  HighIsle: SharedPinLayout
  Dwemer: SharedPinLayout
  WWVamp: SharedPinLayout
  VampireAltar: SharedPinLayout
  WereWolfShrine: SharedPinLayout
  qolDock: MapPinLayoutData
  qolStable: MapPinLayoutData
  qolPortal: MapPinLayoutData
}

export function buildPinLayouts(): DestinationsPinLayouts {
  const sv = getSavedVariables()
  const pins = sv.pins
  const paths = PIN_TEXTURES.paths
  return {
    Faked: { maxDistance: 0.05, level: 30, texture: getFakedPinTexture, size: 26 },
    unknown: {
      maxDistance: pins.pinTextureUnknown.maxDistance,
      level: pins.pinTextureUnknown.level,
      texture: getPinTextureUnknown,
      size: pins.pinTextureUnknown.size,
      tint: DEST_PIN_TINT_UNKNOWN,
      additionalLayout: makeTintUpdateLayout(pins.pinTextureUnknown),
      mapPinTypeString: PIN_TYPES.UNKNOWN,
      onToggleCallback: onToggleCompassPin,
    },
    other: makePinLayout(
      pins.pinTextureOther,
      paths.Other[pins.pinTextureOther.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.LB_GTTP_CP
    ),
    other_Done: makePinLayout(
      pins.pinTextureOtherDone,
      paths.OtherDone[pins.pinTextureOtherDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.LB_GTTP_CP_DONE
    ),
    Maiq: makePinLayout(
      pins.pinTextureMaiq,
      paths.Maiq[pins.pinTextureMaiq.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.MAIQ
    ),
    Maiq_Done: makePinLayout(
      pins.pinTextureMaiqDone,
      paths.MaiqDone[pins.pinTextureMaiqDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.MAIQ_DONE
    ),
    Peacemaker: makePinLayout(
      pins.pinTexturePeacemaker,
      paths.Peacemaker[pins.pinTexturePeacemaker.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.PEACEMAKER
    ),
    Peacemaker_Done: makePinLayout(
      pins.pinTexturePeacemakerDone,
      paths.PeacemakerDone[pins.pinTexturePeacemakerDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.PEACEMAKER_DONE
    ),
    Nosediver: makePinLayout(
      pins.pinTextureNosediver,
      paths.Nosediver[pins.pinTextureNosediver.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.NOSEDIVER
    ),
    Nosediver_Done: makePinLayout(
      pins.pinTextureNosediverDone,
      paths.NosediverDone[pins.pinTextureNosediverDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.NOSEDIVER_DONE
    ),
    EarthlyPos: makePinLayout(
      pins.pinTextureEarthlyPos,
      paths.Earthlypos[pins.pinTextureEarthlyPos.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.EARTHLYPOS
    ),
    EarthlyPos_Done: makePinLayout(
      pins.pinTextureEarthlyPosDone,
      paths.EarthlyposDone[pins.pinTextureEarthlyPosDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.EARTHLYPOS_DONE
    ),
    OnMe: makePinLayout(
      pins.pinTextureOnMe,
      paths.OnMe[pins.pinTextureOnMe.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.ON_ME
    ),
    OnMe_Done: makePinLayout(
      pins.pinTextureOnMeDone,
      paths.OnMeDone[pins.pinTextureOnMeDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.ON_ME_DONE
    ),
    Brawl: makePinLayout(
      pins.pinTextureBrawl,
      paths.Brawl[pins.pinTextureBrawl.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.BRAWL
    ),
    Brawl_Done: makePinLayout(
      pins.pinTextureBrawlDone,
      paths.BrawlDone[pins.pinTextureBrawlDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.BRAWL_DONE
    ),
    Patron: makePinLayout(
      pins.pinTexturePatron,
      paths.Patron[pins.pinTexturePatron.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.PATRON
    ),
    Patron_Done: makePinLayout(
      pins.pinTexturePatronDone,
      paths.PatronDone[pins.pinTexturePatronDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.PATRON_DONE
    ),
    WrothgarJumper: makePinLayout(
      pins.pinTextureWrothgarJumper,
      paths.WrothgarJumper[pins.pinTextureWrothgarJumper.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.WROTHGAR_JUMPER
    ),
    WrothgarJumper_Done: makePinLayout(
      pins.pinTextureWrothgarJumperDone,
      paths.WrothgarJumperDone[pins.pinTextureWrothgarJumperDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.WROTHGAR_JUMPER_DONE
    ),
    RelicHunter: makePinLayout(
      pins.pinTextureRelicHunter,
      paths.RelicHunter[pins.pinTextureRelicHunter.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.RELIC_HUNTER
    ),
    RelicHunter_Done: makePinLayout(
      pins.pinTextureRelicHunterDone,
      paths.RelicHunterDone[pins.pinTextureRelicHunterDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.RELIC_HUNTER_DONE
    ),
    Champion: makePinLayout(
      pins.pinTextureChampion,
      paths.Champion[pins.pinTextureChampion.type - 1],
      DEST_PIN_TINT_CHAMPION,
      PIN_TYPES.CHAMPION
    ),
    Champion_Done: makePinLayout(
      pins.pinTextureChampionDone,
      paths.ChampionDone[pins.pinTextureChampionDone.type - 1],
      DEST_PIN_TINT_CHAMPION_DONE,
      PIN_TYPES.CHAMPION_DONE
    ),
    Breaking: makePinLayout(
      pins.pinTextureBreaking,
      paths.Breaking[pins.pinTextureBreaking.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.BREAKING
    ),
    Breaking_Done: makePinLayout(
      pins.pinTextureBreakingDone,
      paths.BreakingDone[pins.pinTextureBreakingDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.BREAKING_DONE
    ),
    Cutpurse: makePinLayout(
      pins.pinTextureCutpurse,
      paths.Cutpurse[pins.pinTextureCutpurse.type - 1],
      DEST_PIN_TINT_OTHER,
      PIN_TYPES.CUTPURSE
    ),
    Cutpurse_Done: makePinLayout(
      pins.pinTextureCutpurseDone,
      paths.CutpurseDone[pins.pinTextureCutpurseDone.type - 1],
      DEST_PIN_TINT_OTHER_DONE,
      PIN_TYPES.CUTPURSE_DONE
    ),
    Collectible: makePinLayout(
      pins.pinTextureCollectible,
      paths.collectible[pins.pinTextureCollectible.type - 1],
      DEST_PIN_TINT_COLLECTIBLE,
      PIN_TYPES.COLLECTIBLES
    ),
    CollectibleDone: makePinLayout(
      pins.pinTextureCollectibleDone,
      paths.collectibledone[pins.pinTextureCollectibleDone.type - 1],
      DEST_PIN_TINT_COLLECTIBLE_DONE,
      PIN_TYPES.COLLECTIBLESDONE
    ),
    Fish: makePinLayout(
      pins.pinTextureFish,
      paths.fish[pins.pinTextureFish.type - 1],
      DEST_PIN_TINT_FISH,
      PIN_TYPES.FISHING
    ),
    FishDone: makePinLayout(
      pins.pinTextureFishDone,
      paths.fishdone[pins.pinTextureFishDone.type - 1],
      DEST_PIN_TINT_FISH_DONE,
      PIN_TYPES.FISHINGDONE
    ),
    Ayleid: makePinLayout(
      pins.pinTextureAyleid,
      paths.Ayleid[pins.pinTextureAyleid.type - 1],
      DEST_PIN_TINT_AYLEID,
      PIN_TYPES.AYLEID
    ),
    Deadlands: makePinLayout(
      pins.pinTextureDeadlands,
      paths.Deadlands[pins.pinTextureDeadlands.type - 1],
      DEST_PIN_TINT_DEADLANDS,
      PIN_TYPES.DEADLANDS
    ),
    HighIsle: makePinLayout(
      pins.pinTextureHighIsle,
      paths.HighIsle[pins.pinTextureHighIsle.type - 1],
      DEST_PIN_TINT_HIGHISLE,
      PIN_TYPES.HIGHISLE
    ),
    Dwemer: makePinLayout(
      pins.pinTextureDwemer,
      paths.dwemer[pins.pinTextureDwemer.type - 1],
      DEST_PIN_TINT_DWEMER,
      PIN_TYPES.DWEMER
    ),
    WWVamp: makePinLayout(
      pins.pinTextureWWVamp,
      paths.wwvamp[pins.pinTextureWWVamp.type - 1],
      DEST_PIN_TINT_WWVAMP,
      PIN_TYPES.WWVAMP
    ),
    VampireAltar: makePinLayout(
      pins.pinTextureVampAltar,
      paths.vampirealtar[pins.pinTextureVampAltar.type - 1],
      DEST_PIN_TINT_VAMPALTAR,
      PIN_TYPES.VAMPIRE_ALTAR
    ),
    WereWolfShrine: makePinLayout(
      pins.pinTextureWWShrine,
      paths.werewolfshrine[pins.pinTextureWWShrine.type - 1],
      DEST_PIN_TINT_WWSHRINE,
      PIN_TYPES.WEREWOLF_SHRINE
    ),
    qolDock: makeQolPinLayout(
      pins.pinTextureQolPin,
      "/esoui/art/icons/servicemappins/servicepin_dock.dds"
    ),
    qolStable: makeQolPinLayout(
      pins.pinTextureQolPin,
      "/esoui/art/icons/servicemappins/servicepin_stable.dds"
    ),
    qolPortal: makeQolPinLayout(
      pins.pinTextureQolPin,
      "/esoui/art/icons/servicemappins/servicepin_fargraveportal.dds"
    ),
  }
}
