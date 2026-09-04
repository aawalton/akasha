import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TEXTURE_PATHS } from "../destinations-pin-texture-paths/destinations-pin-texture-paths.module.code.ts"
import { PIN_TEXTURE_LISTS } from "../destinations-pin-textures/destinations-pin-textures.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  appendAchievementSection,
  championFrontToggle,
  championZoneToggle,
  standardSpec,
} from "../destinations-settings-achievement-sections/destinations-settings-achievement-sections.module.code.ts"
import { choiceAt } from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"

export function buildAchievementsSubmenu(): LamSubmenuData {
  const controls: LamControlData[] = []
  const lists = PIN_TEXTURE_LISTS
  const paths = PIN_TEXTURE_PATHS
  const dp = DEFAULTS.pins

  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_CHAMPION_PIN_HEADER",
      PIN_TYPES.CHAMPION,
      PIN_TYPES.CHAMPION_DONE,
      lists.Champion,
      paths.Champion,
      paths.ChampionDone,
      (pins) => pins.pinTextureChampion,
      (pins) => pins.pinTextureChampionDone,
      (previews) => previews.champion,
      (previews) => previews.championDone,
      "previewpinTextureChampion",
      choiceAt(lists.Champion, dp.pinTextureChampion.type),
      dp.pinTextureChampion.size
    ),
    [championZoneToggle(), championFrontToggle()]
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_OTHER_HEADER",
      PIN_TYPES.LB_GTTP_CP,
      PIN_TYPES.LB_GTTP_CP_DONE,
      lists.Other,
      paths.Other,
      paths.OtherDone,
      (pins) => pins.pinTextureOther,
      (pins) => pins.pinTextureOtherDone,
      (previews) => previews.other,
      (previews) => previews.otherDone,
      "previewpinTextureOther",
      choiceAt(lists.Other, dp.pinTextureOther.type),
      dp.pinTextureOther.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_MAIQ_HEADER",
      PIN_TYPES.MAIQ,
      PIN_TYPES.MAIQ_DONE,
      lists.Maiq,
      paths.Maiq,
      paths.MaiqDone,
      (pins) => pins.pinTextureMaiq,
      (pins) => pins.pinTextureMaiqDone,
      (previews) => previews.maiq,
      (previews) => previews.maiqDone,
      "previewpinTextureMaiq",
      choiceAt(lists.Maiq, dp.pinTextureMaiq.type),
      dp.pinTextureMaiq.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_PEACEMAKER_HEADER",
      PIN_TYPES.PEACEMAKER,
      PIN_TYPES.PEACEMAKER_DONE,
      lists.Peacemaker,
      paths.Peacemaker,
      paths.PeacemakerDone,
      (pins) => pins.pinTexturePeacemaker,
      (pins) => pins.pinTexturePeacemakerDone,
      (previews) => previews.peacemaker,
      (previews) => previews.peacemakerDone,
      "previewpinTexturePeacemaker",
      choiceAt(lists.Peacemaker, dp.pinTexturePeacemaker.type),
      dp.pinTexturePeacemaker.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_NOSEDIVER_HEADER",
      PIN_TYPES.NOSEDIVER,
      PIN_TYPES.NOSEDIVER_DONE,
      lists.Nosediver,
      paths.Nosediver,
      paths.NosediverDone,
      (pins) => pins.pinTextureNosediver,
      (pins) => pins.pinTextureNosediverDone,
      (previews) => previews.nosediver,
      (previews) => previews.nosediverDone,
      "previewpinTextureNosediver",
      choiceAt(lists.Nosediver, dp.pinTextureNosediver.type),
      dp.pinTextureNosediver.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_EARTHLYPOS_HEADER",
      PIN_TYPES.EARTHLYPOS,
      PIN_TYPES.EARTHLYPOS_DONE,
      lists.EarthlyPos,
      paths.Earthlypos,
      paths.EarthlyposDone,
      (pins) => pins.pinTextureEarthlyPos,
      (pins) => pins.pinTextureEarthlyPosDone,
      (previews) => previews.earthlyPos,
      (previews) => previews.earthlyPosDone,
      "previewpinTextureEarthlyPos",
      choiceAt(lists.Nosediver, dp.pinTextureNosediver.type),
      dp.pinTextureEarthlyPos.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_ON_ME_HEADER",
      PIN_TYPES.ON_ME,
      PIN_TYPES.ON_ME_DONE,
      lists.OnMe,
      paths.OnMe,
      paths.OnMeDone,
      (pins) => pins.pinTextureOnMe,
      (pins) => pins.pinTextureOnMeDone,
      (previews) => previews.onMe,
      (previews) => previews.onMeDone,
      "previewpinTextureOnMe",
      choiceAt(lists.OnMe, dp.pinTextureOnMe.type),
      dp.pinTextureOnMe.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_BRAWL_HEADER",
      PIN_TYPES.BRAWL,
      PIN_TYPES.BRAWL_DONE,
      lists.Brawl,
      paths.Brawl,
      paths.BrawlDone,
      (pins) => pins.pinTextureBrawl,
      (pins) => pins.pinTextureBrawlDone,
      (previews) => previews.brawl,
      (previews) => previews.brawlDone,
      "previewpinTextureBrawl",
      choiceAt(lists.Brawl, dp.pinTextureBrawl.type),
      dp.pinTextureBrawl.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_PATRON_HEADER",
      PIN_TYPES.PATRON,
      PIN_TYPES.PATRON_DONE,
      lists.Patron,
      paths.Patron,
      paths.PatronDone,
      (pins) => pins.pinTexturePatron,
      (pins) => pins.pinTexturePatronDone,
      (previews) => previews.patron,
      (previews) => previews.patronDone,
      "previewpinTexturePatron",
      choiceAt(lists.Patron, dp.pinTexturePatron.type),
      dp.pinTexturePatron.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_WROTHGAR_JUMPER_HEADER",
      PIN_TYPES.WROTHGAR_JUMPER,
      PIN_TYPES.WROTHGAR_JUMPER_DONE,
      lists.WrothgarJumper,
      paths.WrothgarJumper,
      paths.WrothgarJumperDone,
      (pins) => pins.pinTextureWrothgarJumper,
      (pins) => pins.pinTextureWrothgarJumperDone,
      (previews) => previews.wrothgarJumper,
      (previews) => previews.wrothgarJumperDone,
      "previewpinTextureWrothgarJumper",
      choiceAt(lists.WrothgarJumper, dp.pinTextureWrothgarJumper.type),
      dp.pinTextureWrothgarJumper.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_RELIC_HUNTER_HEADER",
      PIN_TYPES.RELIC_HUNTER,
      PIN_TYPES.RELIC_HUNTER_DONE,
      lists.RelicHunter,
      paths.RelicHunter,
      paths.RelicHunterDone,
      (pins) => pins.pinTextureRelicHunter,
      (pins) => pins.pinTextureRelicHunterDone,
      (previews) => previews.relicHunter,
      (previews) => previews.relicHunterDone,
      "previewpinTextureRelicHunter",
      choiceAt(lists.RelicHunter, dp.pinTextureRelicHunter.type),
      dp.pinTextureRelicHunter.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_BREAKING_HEADER",
      PIN_TYPES.BREAKING,
      PIN_TYPES.BREAKING_DONE,
      lists.Breaking,
      paths.Breaking,
      paths.BreakingDone,
      (pins) => pins.pinTextureBreaking,
      (pins) => pins.pinTextureBreakingDone,
      (previews) => previews.breaking,
      (previews) => previews.breakingDone,
      "previewpinTextureBreaking",
      choiceAt(lists.Breaking, dp.pinTextureBreaking.type),
      dp.pinTextureBreaking.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_CUTPURSE_HEADER",
      PIN_TYPES.CUTPURSE,
      PIN_TYPES.CUTPURSE_DONE,
      lists.Cutpurse,
      paths.Cutpurse,
      paths.CutpurseDone,
      (pins) => pins.pinTextureCutpurse,
      (pins) => pins.pinTextureCutpurseDone,
      (previews) => previews.cutpurse,
      (previews) => previews.cutpurseDone,
      "previewpinTextureCutpurse",
      choiceAt(lists.Cutpurse, dp.pinTextureCutpurse.type),
      dp.pinTextureCutpurse.size
    )
  )

  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextAchievements.Colorize(
      getSettingsString("DEST_SETTINGS_ACH_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_HEADER_TT"),
    controls,
  }
}
