import { asPresent, asString } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSetsSearchUIDescriptorExt,
  asSearchUIComboBox,
  asSearchUIComboBoxOpt,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"

const lib = LibSets

export const MAJOR = lib.name

const zif = zo_iconFormat
const zoitfns = zo_iconTextFormatNoSpace
const sgmatch = string.gmatch

const getLocalizedText = lib.GetLocalizedText

export const searchHistoryEventUpdaterName = `${MAJOR}_SearchHistory_Update`

export const clearSearchHistoryStr = getLocalizedText("clearHistory")
export const dropZonesStr = getLocalizedText("dropZones")
export const wayshrinesStr = getLocalizedText("wayshrines")
export const dropZoneAndWayshrinesStr = `${dropZonesStr} / ${wayshrinesStr}`
export const invertSelectionStr = getLocalizedText("invertSelection")
export const defaultActionLeftClickStr = getLocalizedText("defaultActionLeftClick")
export const linkToChatStr = getLocalizedText("linkToChat")
export const popupTooltipStr = getLocalizedText("popupTooltip")
export const tooltipsStr = getLocalizedText("tooltips")
export const showAsTooltipStr = getLocalizedText("showAsTooltip")
export const setSearchDropLocationTooltipPosStr = getLocalizedText(
  "setSearchDropLocationTooltipPos"
)
export const autoStr = getLocalizedText("auto")
export const topStr = getLocalizedText("top")
export const rightStr = getLocalizedText("right")
export const bottomStr = getLocalizedText("bottom")
export const leftStr = getLocalizedText("left")
export const setNamesStr = getLocalizedText("setNames")
export const favoritesStr = getLocalizedText("favorites")
export const showLibSetsSettingsStr = getLocalizedText("showLibSetsSettingsMenu")

const POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_UNSORTED =
  lib.possibleSetSearchFavoriteCategoriesUnsorted

export const searchUI = asLibSetsSearchUIDescriptorExt(lib.SearchUI)
export const searchUIName = searchUI.name

function favTexture(this: void, category: string): string {
  return asPresent(POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_UNSORTED[category])
}

const favoriteIconStar = favTexture("star")
const favoriteIconTank = favTexture("tank")
const favoriteIconStamDD = favTexture("stamDD")
const favoriteIconMagDD = favTexture("magDD")
const favoriteIconStamHeal = favTexture("stamHeal")
const favoriteIconMagHeal = favTexture("magHeal")
const favoriteIconHybrid = favTexture("hybrid")
const favoriteIconPVPTank = favTexture("PVPTank")
const favoriteIconPVPStamDD = favTexture("PVPStamDD")
const favoriteIconPVPMagDD = favTexture("PVPMagDD")
const favoriteIconPVPStamHeal = favTexture("PVPStamHeal")
const favoriteIconPVPMagHeal = favTexture("PVPMagHeal")
const favoriteIconPVPHybrid = favTexture("PVPHybrid")
const favoriteIconFarm = favTexture("farm")
const favoriteIconSneak = favTexture("sneak")
const favoriteIconBow = favTexture("bow")
const favoriteIconDualWield = favTexture("dualWield")
const favoriteIcon2HD = favTexture("twoHand")
const favoriteIconFrostStaff = favTexture("frostStaff")
const favoriteIconFireStaff = favTexture("fireStaff")
const favoriteIconLightningStaff = favTexture("lightningStaff")

searchUI.favoriteIcon = favoriteIconStar

searchUI.favoriteIconStar = favoriteIconStar
searchUI.favoriteIconTank = favoriteIconTank
searchUI.favoriteIconStamDD = favoriteIconStamDD
searchUI.favoriteIconMagDD = favoriteIconMagDD
searchUI.favoriteIconStamHeal = favoriteIconStamHeal
searchUI.favoriteIconMagHeal = favoriteIconMagHeal
searchUI.favoriteIconHybrid = favoriteIconHybrid
searchUI.favoriteIconPVPTank = favoriteIconPVPTank
searchUI.favoriteIconPVPStamDD = favoriteIconPVPStamDD
searchUI.favoriteIconPVPMagDD = favoriteIconPVPMagDD
searchUI.favoriteIconPVPStamHeal = favoriteIconPVPStamHeal
searchUI.favoriteIconPVPMagHeal = favoriteIconPVPMagHeal
searchUI.favoriteIconPVPHybrid = favoriteIconPVPHybrid
searchUI.favoriteIconFarm = favoriteIconFarm
searchUI.favoriteIconSneak = favoriteIconSneak
searchUI.favoriteIconBow = favoriteIconBow
searchUI.favoriteIconDualWield = favoriteIconDualWield
searchUI.favoriteIcon2HD = favoriteIcon2HD
searchUI.favoriteIconFrostStaff = favoriteIconFrostStaff
searchUI.favoriteIconFireStaff = favoriteIconFireStaff
searchUI.favoriteIconLightningStaff = favoriteIconLightningStaff

const favoriteIconTextStar = zif(favoriteIconStar, 24, 24)
const favoriteIconTextTank = zif(favoriteIconTank, 24, 24)
const favoriteIconTextStamDD = zif(favoriteIconStamDD, 24, 24)
const favoriteIconTextMagDD = zif(favoriteIconMagDD, 24, 24)
const favoriteIconTextStamHeal = zif(favoriteIconStamHeal, 24, 24)
const favoriteIconTextMagHeal = zif(favoriteIconMagHeal, 24, 24)
const favoriteIconTextHybrid = zif(favoriteIconHybrid, 24, 24)
const favoriteIconTextPVPTank = zif(favoriteIconPVPTank, 24, 24)
const favoriteIconTextPVPStamDD = zif(favoriteIconPVPStamDD, 24, 24)
const favoriteIconTextPVPMagDD = zif(favoriteIconPVPMagDD, 24, 24)
const favoriteIconTextPVPStamHeal = zif(favoriteIconPVPStamHeal, 24, 24)
const favoriteIconTextPVPMagHeal = zif(favoriteIconPVPMagHeal, 24, 24)
const favoriteIconTextPVPHybrid = zif(favoriteIconPVPHybrid, 24, 24)
const favoriteIconTextFarm = zif(favoriteIconFarm, 24, 24)
const favoriteIconTextSneak = zif(favoriteIconSneak, 24, 24)
const favoriteIconTextBow = zif(favoriteIconBow, 24, 24)
const favoriteIconTextDualWield = zif(favoriteIconDualWield, 24, 24)
const favoriteIconText2HD = zif(favoriteIcon2HD, 24, 24)
const favoriteIconTextFrostStaff = zif(favoriteIconFrostStaff, 24, 24)
const favoriteIconTextFireStaff = zif(favoriteIconFireStaff, 24, 24)
const favoriteIconTextLightningStaff = zif(favoriteIconLightningStaff, 24, 24)

searchUI.favoriteIconTextStar = favoriteIconTextStar
searchUI.favoriteIconTextTank = favoriteIconTextTank
searchUI.favoriteIconTextStamDD = favoriteIconTextStamDD
searchUI.favoriteIconTextMagDD = favoriteIconTextMagDD
searchUI.favoriteIconTextStamHeal = favoriteIconTextStamHeal
searchUI.favoriteIconTextMagHeal = favoriteIconTextMagHeal
searchUI.favoriteIconTextHybrid = favoriteIconTextHybrid
searchUI.favoriteIconTextPVPTank = favoriteIconTextPVPTank
searchUI.favoriteIconTextPVPStamDD = favoriteIconTextPVPStamDD
searchUI.favoriteIconTextPVPMagDD = favoriteIconTextPVPMagDD
searchUI.favoriteIconTextPVPStamHeal = favoriteIconTextPVPStamHeal
searchUI.favoriteIconTextPVPMagHeal = favoriteIconTextPVPMagHeal
searchUI.favoriteIconTextPVPHybrid = favoriteIconTextPVPHybrid
searchUI.favoriteIconTextFarm = favoriteIconTextFarm
searchUI.favoriteIconTextSneak = favoriteIconTextSneak
searchUI.favoriteIconTextBow = favoriteIconTextBow
searchUI.favoriteIconTextDualWield = favoriteIconTextDualWield
searchUI.favoriteIconText2HD = favoriteIconText2HD
searchUI.favoriteIconTextFrostStaff = favoriteIconTextFrostStaff
searchUI.favoriteIconTextFireStaff = favoriteIconTextFireStaff
searchUI.favoriteIconTextLightningStaff = favoriteIconTextLightningStaff

searchUI.favoriteIconTexts = {
  star: favoriteIconTextStar,
  tank: favoriteIconTextTank,
  stamDD: favoriteIconTextStamDD,
  magDD: favoriteIconTextMagDD,
  stamHeal: favoriteIconTextStamHeal,
  magHeal: favoriteIconTextMagHeal,
  hybrid: favoriteIconTextHybrid,
  PVPTank: favoriteIconTextPVPTank,
  PVPStamDD: favoriteIconTextPVPStamDD,
  PVPMagDD: favoriteIconTextPVPMagDD,
  PVPStamHeal: favoriteIconTextPVPStamHeal,
  PVPMagHeal: favoriteIconTextPVPMagHeal,
  PVPHybrid: favoriteIconTextPVPHybrid,
  farm: favoriteIconTextFarm,
  sneak: favoriteIconTextSneak,
  bow: favoriteIconTextBow,
  dualWield: favoriteIconTextDualWield,
  twoHand: favoriteIconText2HD,
  frostStaff: favoriteIconTextFrostStaff,
  fireStaff: favoriteIconTextFireStaff,
  lightningStaff: favoriteIconTextLightningStaff,
}

const FAVORITE_ICON_WITH_NAME_TEXTS_LOCAL: { [category: string]: string | undefined } = {}
for (const [favoriteIconCategory, favoriteIconTexture] of pairs(
  lib.possibleSetSearchFavoriteCategoriesUnsorted
)) {
  FAVORITE_ICON_WITH_NAME_TEXTS_LOCAL[favoriteIconCategory] = zoitfns(
    favoriteIconTexture,
    24,
    24,
    getLocalizedText("favorites")
  )
}
export const favoriteIconWithNameTexts = FAVORITE_ICON_WITH_NAME_TEXTS_LOCAL

export const settingsIconText = zif("esoui/art/chatwindow/chat_options_up.dds", 32, 32)

searchUI.MAX_NUM_SET_BONUS = 12

searchUI.searchTypeDefault = 1
searchUI.scrollListDataTypeDefault = 1

export const SEARCH_TYPE_NAME = "name"
export const SEARCH_TYPE_BONUS = "bonus"

export function getComboBoxFromDropdownControl(
  this: void,
  dropdownControl: SearchUIControl
): SearchUIComboBox {
  const comboBox = asSearchUIComboBoxOpt(dropdownControl.m_comboBox)
  return comboBox ?? asSearchUIComboBox(dropdownControl)
}

export function stringSplit(this: void, inputstr: string, sep?: string): string[] {
  const seperator = sep ?? "%s"
  const t: string[] = []
  for (const [str] of sgmatch(inputstr, `([^${seperator}]+)`)) {
    t.push(asString(str))
  }
  return t
}

export function isItemFilterTypeMatching(
  this: void,
  item: SearchUIComboBoxItem,
  filterType: number | string
): boolean {
  return item.filterType !== undefined && item.filterType === filterType
}
