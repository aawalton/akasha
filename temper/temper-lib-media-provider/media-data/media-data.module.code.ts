import type { MediaTypeMap, ProviderState } from "../media-types/media-types.module.code.ts"

function addSound(
  target: Record<string, string>,
  key: string,
  soundName: string | undefined
): undefined {
  if (soundName !== undefined) {
    target[key] = soundName
  }
}

const PREDEFINED_FONT_DEFAULT: Record<string, string> = {
  ProseAntique: "$(PROSE_ANTIQUE_FONT)",
  Consolas: "$(CONSOLAS_FONT)",
  "Futura Condensed": "$(FTN57_FONT)",
  "Futura Condensed Bold": "$(FTN87_FONT)",
  "Futura Condensed Light": "$(FTN47_FONT)",
  "Skyrim Handwritten": "$(HANDWRITTEN_BOLD_FONT)",
  "Trajan Pro": "$(TRAJAN_PRO_R_FONT)",
  "Univers 55": "$(UNIVERS55_FONT)",
  "Univers 57": "$(UNIVERS57_FONT)",
  "Univers 67": "$(UNIVERS67_FONT)",
}

const PREDEFINED_FONT_VANILLA: Record<string, string> = {
  ProseAntique: "EsoUI/Common/Fonts/ProseAntiquePSMT.slug",
  Consolas: "EsoUI/Common/Fonts/Consola.slug",
  "Futura Condensed": "EsoUI/Common/Fonts/FTN57.slug",
  "Futura Condensed Bold": "EsoUI/Common/Fonts/FTN87.slug",
  "Futura Condensed Light": "EsoUI/Common/Fonts/FTN47.slug",
  "Skyrim Handwritten": "EsoUI/Common/Fonts/Handwritten_Bold.slug",
  "Trajan Pro": "EsoUI/Common/Fonts/TrajanPro-Regular.slug",
  "Univers 55": "EsoUI/Common/Fonts/Univers55.slug",
  "Univers 57": "EsoUI/Common/Fonts/Univers57.slug",
  "Univers 67": "EsoUI/Common/Fonts/Univers67.slug",
}

const PREDEFINED_FONT_KR: Record<string, string> = {
  ProseAntique: "EsoKR/fonts/ProseAntiquePSMT.slug",
  Consolas: "$(CONSOLAS_FONT)",
  "Futura Condensed": "EsoKR/fonts/FTN57.slug",
  "Futura Condensed Bold": "EsoKR/fonts/FTN87.slug",
  "Futura Condensed Light": "EsoKR/fonts/FTN47.slug",
  "Skyrim Handwritten": "$(HANDWRITTEN_BOLD_FONT)",
  "Trajan Pro": "$(TRAJAN_PRO_R_FONT)",
  "Univers 55": "EsoKR/fonts/univers55.slug",
  "Univers 57": "EsoKR/fonts/univers57.slug",
  "Univers 67": "EsoKR/fonts/univers47.slug",
}

const PREDEFINED_FONT_PL: Record<string, string> = {
  ProseAntique: "fonts/ProseAntiquePSMT.slug",
  Consolas: "$(CONSOLAS_FONT)",
  "Futura Condensed": "fonts/FTN57.slug",
  "Futura Condensed Bold": "fonts/FTN87.slug",
  "Futura Condensed Light": "fonts/FTN47.slug",
  "Skyrim Handwritten": "fonts/Handwritten_Bold.slug",
  "Trajan Pro": "fonts/TrajanPro-Regular.slug",
  "Univers 55": "fonts/univers55.slug",
  "Univers 57": "fonts/univers57.slug",
  "Univers 67": "fonts/univers67.slug",
}

function fontPresetForLang(lang: string): Record<string, string> | undefined {
  if (lang === "kr" || lang === "kb") return PREDEFINED_FONT_KR
  if (lang === "pl") return PREDEFINED_FONT_PL
  if (lang === "th") return PREDEFINED_FONT_DEFAULT
  return undefined
}

function buildFontTable(lang: string): Record<string, string> {
  let base: Record<string, string>
  if (ZoGetOfficialGameLanguageDescriptor() === lang) {
    base = PREDEFINED_FONT_DEFAULT
  } else {
    base = fontPresetForLang(lang) ?? PREDEFINED_FONT_VANILLA
  }
  const font: Record<string, string> = { ...base }
  font["JP-StdFont"] = "$(LMP_FONT_PATH)ESO_FWNTLGUDC70-DB.slug"
  font["JP-ChatFont"] = "$(LMP_FONT_PATH)ESO_FWUDC_70-M.slug"
  font["JP-KafuPenji"] = "$(LMP_FONT_PATH)ESO_KafuPenji-M.slug"
  font["ZH-StdFont"] = "$(LMP_FONT_PATH)MYingHeiPRC-W5.slug"
  font["ZH-MYoyoPRC"] = "$(LMP_FONT_PATH)MYoyoPRC-Medium.slug"
  return font
}

export function buildInitialState(): ProviderState {
  const lang = GetCVar("Language.2")

  const mediaType: MediaTypeMap = {
    BACKGROUND: "background",
    BORDER: "border",
    FONT: "font",
    STATUSBAR: "statusbar",
    SOUND: "sound",
  }

  const mediaTable: Record<string, Record<string, string>> = {}
  const defaultMedia: Record<string, string> = {}
  const blacklistedFont: Record<string, boolean> = {}

  mediaTable.background = {
    "ESO Black": "EsoUI/Art/Miscellaneous/borderedInset_center.dds",
    "ESO Chat": "EsoUI/Art/ChatWindow/chat_BG_center.dds",
    "ESO Gray": "EsoUI/Art/ItemToolTip/simpleProgbarBG_center.dds",
    Solid: "",
  }
  defaultMedia.background = "Solid"

  mediaTable.border = {
    "ESO Gold": "EsoUI/Art/Miscellaneous/borderedInsetTransparent_edgeFile.dds",
    "ESO Chat": "EsoUI/Art/ChatWindow/chat_BG_edge.dds",
    "ESO Rounded": "EsoUI/Art/Miscellaneous/interactKeyFrame_edge.dds",
    "ESO Blue Highlight": "EsoUI/Art/Miscellaneous/textEntry_highlight_edge.dds",
    "ESO Blue Glow": "EsoUI/Art/Crafting/crafting_toolTip_glow_edge_blue64.dds",
    "ESO Red Glow": "EsoUI/Art/Crafting/crafting_toolTip_glow_edge_red64.dds",
    "ESO Red Overlay": "EsoUI/Art/UICombatOverlay/UICombatOverlayEdge.dds",
  }
  defaultMedia.border = "ESO Gold"

  mediaTable.font = buildFontTable(lang)
  defaultMedia.font = "Univers 57"

  if (IsConsoleUI()) {
    blacklistedFont["JP-KafuPenji"] = true
    blacklistedFont["ZH-MYoyoPRC"] = true
  }

  mediaTable.statusbar = { "ESO Basic": "" }
  defaultMedia.statusbar = "ESO Basic"

  const sound: Record<string, string> = { None: "" }
  addSound(sound, "AvA Gate Open", SOUNDS.AVA_GATE_OPENED)
  addSound(sound, "AvA Gate Close", SOUNDS.AVA_GATE_CLOSED)
  addSound(sound, "Emperor Coronated", SOUNDS.EMPEROR_CORONATED_DAGGERFALL)
  addSound(sound, "Level Up", SOUNDS.LEVEL_UP)
  addSound(sound, "Skill Gained", SOUNDS.SKILL_GAINED)
  addSound(sound, "Ability Purchased", SOUNDS.ABILITY_SKILL_PURCHASED)
  addSound(sound, "Book Acquired", SOUNDS.BOOK_ACQUIRED)
  addSound(sound, "Unlock", SOUNDS.LOCKPICKING_UNLOCKED)
  addSound(sound, "Enchanting Extract", SOUNDS.ENCHANTING_EXTRACT_START_ANIM)
  addSound(sound, "Enchanting Create", SOUNDS.ENCHANTING_CREATE_TOOLTIP_GLOW)
  addSound(sound, "Blacksmith Improve", SOUNDS.BLACKSMITH_IMPROVE_TOOLTIP_GLOW_SUCCESS)
  mediaTable.sound = sound
  defaultMedia.sound = "None"

  const sharedMediaTable: Record<string, Record<string, string>> = {}
  ZO_DeepTableCopy(mediaTable, sharedMediaTable)

  return {
    name: "LibMediaProvider",
    lang,
    defaultMedia,
    mediaList: {},
    mediaTable,
    sharedMediaTable,
    mediaType,
    blacklistedFont,
  }
}
