export const ADDON_NAME = "TemperPotions"
export const SAVED_VARIABLES_NAME = "TemperPotionMaker_SavedVariables"

export const PAGE_SIZE = 10

export const TEXTURE_REAGENTUNKNOWN = "TemperCrafting/art/reagent.dds"
export const TEXTURE_TRAITUNKNOWN = "/esoui/art/progression/lock.dds"
export const TEXTURE_HIGHLIGHT = "TemperCrafting/art/gridItem_outline.dds"
export const TEXTURE_FAVORITE = "esoui/art/ava/ava_rankicon_general.dds"
export const TEXTURE_BAG = "/esoui/art/crafting/crafting_provisioner_inventorycolumn_icon.dds"
export const TEXTURE_BANK = "/esoui/art/icons/servicemappins/servicepin_bank.dds"
export const TEXTURE_ENABLEBUTTON = "/esoui/art/progression/icon_alchemist.dds"

export const TEXTURE_POISON_UP = "TemperCrafting/art/Poison_up.dds"
export const TEXTURE_POISON_DOWN = "TemperCrafting/art/Poison_down.dds"
export const TEXTURE_POISON_OVER = "TemperCrafting/art/Poison_over.dds"
export const TEXTURE_POISON_DISABLED = "TemperCrafting/art/Poison_disabled.dds"

export const TRAIT_EFFECT = {
  None: "",
  Bad: "-",
  VeryBad: "/",
  Good: "+",
  VeryGood: "*",
} as const

export type TraitEffect = (typeof TRAIT_EFFECT)[keyof typeof TRAIT_EFFECT]

export const TRAIT_CONTROL_NAMES: Record<number, string> = {
  1: "Trait1",
  2: "Trait2",
  3: "Trait3",
  4: "Trait4",
}

export const REAGENT_CONTROL_NAMES: Record<number, string> = {
  1: "Reagent1",
  2: "Reagent2",
  3: "Reagent3",
  4: "Reagent4",
}

export const COLOR_SELECT = ZO_ColorDef.New("FFFF6A00")
const [disabledR, disabledG, disabledB, disabledA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_DISABLED
)
export const COLOR_DISABLED = ZO_ColorDef.New(disabledR, disabledG, disabledB, disabledA)
const [buttonR, buttonG, buttonB, buttonA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_SELECTED
)
export const COLOR_BUTTON = ZO_ColorDef.New(buttonR, buttonG, buttonB, buttonA)
export const COLOR_USEABLE = ZO_ColorDef.New(1, 1, 1, 0)

export const FAVORITE_COLOR: Record<string, ZoColorDef> = {
  REAGENTS: ZO_ColorDef.New("FFE900"),
  POTION: ZO_ColorDef.New("FF6A00"),
  TRAITS: ZO_TOOLTIP_DEFAULT_COLOR,
}

export const DESCRIPTOR_POTION = "TemperPotions"
export const DESCRIPTOR_POISON = "PoisonMaker"
